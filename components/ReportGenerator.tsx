"use client";

import { useState } from "react";
import { getDailyLogsRange, MoodEntry, DailyLog } from "@/lib/storage";
import { useI18n } from "@/lib/i18n";
import { generate } from "@/lib/ai-service";
import {
  FileText, Download, Calendar, Sparkles, Brain, BarChart2,
  UserRound, Stethoscope,
} from "lucide-react";

type Period     = "1w" | "1m" | "1y";
type Step       = "idle" | "data" | "ai" | "pdf" | "done";
type ReportType = "therapist" | "self";

// ── helpers ────────────────────────────────────────────────────────────────────
function isoToday()  { return new Date().toISOString().split("T")[0]; }
function subtractDays(iso: string, days: number) {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
}
function avg(arr: (number | undefined)[]): number | null {
  const v = arr.filter((x): x is number => x !== undefined);
  return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length * 10) / 10 : null;
}
function minOf(arr: (number | undefined)[]): number | null {
  const v = arr.filter((x): x is number => x !== undefined);
  return v.length ? Math.min(...v) : null;
}
function maxOf(arr: (number | undefined)[]): number | null {
  const v = arr.filter((x): x is number => x !== undefined);
  return v.length ? Math.max(...v) : null;
}
function trend(recent: (number|undefined)[], earlier: (number|undefined)[]): "up" | "down" | "stable" {
  const a = avg(recent), b = avg(earlier);
  if (a === null || b === null) return "stable";
  if (a - b > 0.5) return "up";
  if (b - a > 0.5) return "down";
  return "stable";
}
function trendLabel(t: "up"|"down"|"stable", lang: string): string {
  const map: Record<string, Record<string, string>> = {
    up:     { fr: "↑ en hausse", es: "↑ al alza", zh: "↑ 上升", en: "↑ improving" },
    down:   { fr: "↓ en baisse", es: "↓ a la baja", zh: "↓ 下降", en: "↓ declining" },
    stable: { fr: "→ stable", es: "→ estable", zh: "→ 稳定", en: "→ stable" },
  };
  return map[t][lang] ?? map[t]["en"];
}

// ── medication adherence helper ────────────────────────────────────────────────
interface MedStats {
  name: string;
  daysTaken: number;
  daysRecorded: number;
  pct: number;
}
function computeMedStats(entries: MoodEntry[]): MedStats[] {
  const medMap: Record<string, { taken: number; recorded: number }> = {};
  for (const e of entries) {
    if (!e.medicationsTaken) continue;
    for (const [med, taken] of Object.entries(e.medicationsTaken)) {
      if (!medMap[med]) medMap[med] = { taken: 0, recorded: 0 };
      medMap[med].recorded++;
      if (taken) medMap[med].taken++;
    }
  }
  return Object.entries(medMap).map(([name, { taken, recorded }]) => ({
    name,
    daysTaken: taken,
    daysRecorded: recorded,
    pct: recorded > 0 ? Math.round((taken / recorded) * 100) : 0,
  })).sort((a, b) => b.pct - a.pct);
}

// ── AI prompt builder ──────────────────────────────────────────────────────────
function buildPrompt(
  entries: MoodEntry[],
  dailyLogs: DailyLog[],
  startDate: string,
  endDate: string,
  lang: string,
  period: string,
  reportType: ReportType,
): string {
  const locale   = lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : lang === "zh" ? "zh-CN" : "en-US";
  const totalDays = dailyLogs.length;
  const avgMood   = avg(entries.map(e => e.mood));
  const minMood   = minOf(entries.map(e => e.mood));
  const maxMood   = maxOf(entries.map(e => e.mood));
  const avgSleep  = avg(entries.map(e => e.sleep));
  const minSleep  = minOf(entries.map(e => e.sleep));
  const maxSleep  = maxOf(entries.map(e => e.sleep));
  const avgApp    = avg(entries.map(e => e.appetite));
  const avgEnergy = avg(entries.map(e => e.energy));
  const daysAlcohol = entries.filter(e => e.alcohol != null && e.alcohol > 0).length;
  const avgAlcohol  = avg(entries.filter(e => e.alcohol != null && e.alcohol! > 0).map(e => e.alcohol));
  const daysSubst   = entries.filter(e => e.substances != null && e.substances > 0).length;
  const daysRisk    = entries.filter(e => e.riskBehavior === true).length;
  const medStats    = computeMedStats(entries);

  const slice = Math.max(3, Math.floor(entries.length / 3));
  const early = entries.slice(0, slice);
  const late  = entries.slice(-slice);
  const moodTrend   = trendLabel(trend(late.map(e => e.mood),   early.map(e => e.mood)),   lang);
  const sleepTrend  = trendLabel(trend(late.map(e => e.sleep),  early.map(e => e.sleep)),  lang);
  const energyTrend = trendLabel(trend(late.map(e => e.energy), early.map(e => e.energy)), lang);

  const notes = entries
    .filter(e => e.note && e.note.trim().length > 15)
    .slice(-5)
    .map(e => {
      const d  = new Date(e.date + "T12:00:00").toLocaleDateString(locale, { day: "numeric", month: "short" });
      const t2 = e.datetime.split("T")[1]?.slice(0,5) ?? "";
      return `  - ${d} ${t2}: "${e.note!.slice(0, 120)}${e.note!.length > 120 ? "…" : ""}"`;
    }).join("\n");

  const startLabel = new Date(startDate + "T12:00:00").toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
  const endLabel   = new Date(endDate   + "T12:00:00").toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });

  const langInstruction = lang === "fr" ? "Réponds en français."
    : lang === "es" ? "Responde en español."
    : lang === "zh" ? "请用中文回复。"
    : "Reply in English.";

  const medSection = medStats.length > 0
    ? `\nMEDICATION ADHERENCE:\n${medStats.map(m => `  - ${m.name}: taken ${m.daysTaken}/${m.daysRecorded} days recorded (${m.pct}%)`).join("\n")}`
    : "\nMEDICATION ADHERENCE: No medication data recorded.";

  const therapistInstructions = `You are a professional mental health data analyst writing a clinical wellness report for a therapist.
Write in the THIRD PERSON ("the patient", "they", "their"). Use professional, clinical language.
Structure the report with clear paragraphs: Clinical Overview, Mood & Emotional State, Sleep & Physical Health, Behavioural Observations (if relevant), Medication Adherence (if relevant), Journal Themes (if notes provided), Clinical Recommendations.
Be precise, objective, and evidence-based. Highlight both positive indicators and clinical concerns.
Do NOT diagnose. End with a reminder that this is self-reported data to support clinical discussion.
Use plain text only (no markdown, no bullet points, no titles — this will be rendered in a PDF).`;

  const selfInstructions = `You are a warm, supportive wellness companion writing a personal wellness summary for the person themselves.
Write in the SECOND PERSON ("you", "your"). Use warm, encouraging, accessible language.
Structure the report naturally: How have you been doing? Your mood & energy, Your sleep, Your habits (if relevant), What your journal reveals (if notes), Things to celebrate, Gentle suggestions for improvement.
Be empathetic and encouraging. Focus on strengths and progress. Gently flag any patterns worth discussing with a professional.
Do NOT diagnose. End with an encouraging reminder to be kind to themselves.
Use plain text only (no markdown, no bullet points, no titles — this will be rendered in a PDF).`;

  return `${langInstruction}

${reportType === "therapist" ? therapistInstructions : selfInstructions}

=== SELF-TRACKING DATA ===
Period: ${startLabel} → ${endLabel} (${totalDays} days tracked out of ${period})

AVERAGES:
- Mood: ${avgMood ?? "—"}/10  (min ${minMood ?? "—"}, max ${maxMood ?? "—"})
- Sleep: ${avgSleep ?? "—"} hours  (min ${minSleep ?? "—"}, max ${maxSleep ?? "—"})
- Appetite: ${avgApp ?? "—"}/5
- Energy: ${avgEnergy ?? "—"}/5
- Alcohol: ${daysAlcohol > 0 ? `consumed on ${daysAlcohol} days (avg ${avgAlcohol} drinks/day)` : "none recorded"}
- Substances: ${daysSubst > 0 ? `${daysSubst} days` : "none"}
- Risk behaviours: ${daysRisk > 0 ? `${daysRisk} days` : "none"}
${medSection}

TRENDS (recent vs earlier):
- Mood: ${moodTrend}
- Sleep: ${sleepTrend}
- Energy: ${energyTrend}

JOURNAL EXCERPTS:
${notes || "  No notes recorded."}
`;
}

// ── AI call ────────────────────────────────────────────────────────────────────
async function callAI(prompt: string, reportType: ReportType): Promise<string> {
  const systemPrompt = reportType === "therapist"
    ? "You are a professional mental health data analyst. You produce formal, clinical wellness reports in the third person for therapists and healthcare providers. You never diagnose. You are objective, precise, and evidence-based."
    : "You are a warm, supportive personal wellness companion. You write encouraging, personal wellness summaries in the second person for individuals tracking their wellbeing. You never diagnose. You are empathetic, positive, and gently constructive.";

  return generate([
    { role: "system", content: systemPrompt },
    { role: "user",   content: prompt },
  ]);
}

// ── PDF helpers ─────────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function drawHeader(doc: any, title: string, subtitle: string, dateRange: string, reportTypeLabel: string, pageW: number, margin: number) {
  // Background gradient-ish (two rects)
  doc.setFillColor(30, 58, 138); // blue-900
  doc.rect(0, 0, pageW, 50, "F");
  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(0, 28, pageW, 22, "F");

  // MindScope brand
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(147, 197, 253); // blue-300
  doc.text("MINDSCOPE", margin, 12);

  // Report title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text(title, margin, 24);

  // Subtitle line (subtitle + date)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(191, 219, 254); // blue-200
  doc.text(subtitle, margin, 35);

  // Date range
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(dateRange, margin, 44);

  // Report type badge
  const badgeW = 36;
  doc.setFillColor(99, 102, 241); // indigo
  doc.roundedRect(pageW - margin - badgeW, 8, badgeW, 9, 2, 2, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(reportTypeLabel, pageW - margin - badgeW + 3, 14);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function drawSectionTitle(doc: any, title: string, y: number, margin: number, pageW: number, color: [number, number, number] = [37, 99, 235]) {
  doc.setFillColor(...color);
  doc.rect(margin, y - 1, 3, 6, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(title, margin + 6, y + 4);
  doc.setDrawColor(226, 232, 240);
  doc.line(margin + 6, y + 6, pageW - margin, y + 6);
  return y + 12;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addAISection(
  doc: any,
  analysis: string,
  pageW: number,
  margin: number,
  title: string,
  disclaimer: string,
  reportType: ReportType,
) {
  doc.addPage();
  let y = 15;

  // Header bar
  const headerColor: [number, number, number] = reportType === "therapist" ? [79, 70, 229] : [16, 185, 129];
  doc.setFillColor(...headerColor);
  doc.rect(0, 0, pageW, 30, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(title, margin, 13);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(reportType === "therapist" ? 199 : 209, reportType === "therapist" ? 210 : 250, 254);
  doc.text("Mistral AI · MindScope", margin, 23);
  y = 40;

  // Disclaimer box
  const disclaimerBg: [number, number, number] = reportType === "therapist" ? [254, 243, 199] : [236, 253, 245];
  const disclaimerBorder: [number, number, number] = reportType === "therapist" ? [253, 230, 138] : [167, 243, 208];
  const disclaimerText: [number, number, number] = reportType === "therapist" ? [146, 64, 14] : [6, 78, 59];
  doc.setFillColor(...disclaimerBg);
  doc.setDrawColor(...disclaimerBorder);
  doc.roundedRect(margin, y, pageW - margin * 2, 10, 2, 2, "FD");
  doc.setFontSize(7.5);
  doc.setTextColor(...disclaimerText);
  doc.text(disclaimer, margin + 3, y + 7);
  y += 16;

  // Analysis text
  const paragraphs = analysis.split(/\n{2,}/).filter(p => p.trim().length > 0);
  for (const para of paragraphs) {
    const cleanPara = para.trim().replace(/\n/g, " ");
    const lines = doc.splitTextToSize(cleanPara, pageW - margin * 2);
    if (y + lines.length * 5 > 278) { doc.addPage(); y = 15; }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 41, 59);
    doc.text(lines, margin, y);
    y += lines.length * 5 + 5;
  }
}

// ── Component ──────────────────────────────────────────────────────────────────
export function ReportGenerator() {
  const { t, lang } = useI18n();
  const [period,     setPeriod]     = useState<Period>("1w");
  const [step,       setStep]       = useState<Step>("idle");
  const [reportType, setReportType] = useState<ReportType>("self");

  const locale = lang === "zh" ? "zh-CN" : lang === "es" ? "es-ES" : lang === "fr" ? "fr-FR" : "en-US";
  const periodDays: Record<Period, number>   = { "1w": 7,  "1m": 30,  "1y": 365 };
  const periodLabels: Record<Period, string> = {
    "1w": t.mood.reportPeriod1w,
    "1m": t.mood.reportPeriod1m,
    "1y": t.mood.reportPeriod1y,
  };

  const stepLabels: Record<Exclude<Step, "idle">, string> = {
    data: lang === "fr" ? "Collecte des données…"    : lang === "es" ? "Recopilando datos…"       : lang === "zh" ? "收集数据中…"    : "Collecting data…",
    ai:   lang === "fr" ? "Analyse IA en cours…"     : lang === "es" ? "Análisis de IA en curso…" : lang === "zh" ? "AI 分析中…"     : "AI analyzing your data…",
    pdf:  lang === "fr" ? "Génération du PDF…"        : lang === "es" ? "Generando PDF…"           : lang === "zh" ? "生成 PDF 中…"   : "Generating PDF…",
    done: lang === "fr" ? "Téléchargement…"           : lang === "es" ? "Descargando…"             : lang === "zh" ? "下载中…"        : "Downloading…",
  };

  const aiSectionTitle = reportType === "therapist"
    ? (lang === "fr" ? "Rapport Clinique — Analyse IA"  : lang === "es" ? "Informe Clínico — Análisis IA"  : lang === "zh" ? "临床报告 — AI 分析" : "Clinical Report — AI Analysis")
    : (lang === "fr" ? "Votre Bilan de Bien-être — IA"  : lang === "es" ? "Tu Resumen de Bienestar — IA"   : lang === "zh" ? "您的健康总结 — AI" : "Your Wellness Summary — AI");

  const aiDisclaimer = reportType === "therapist"
    ? (lang === "fr" ? "⚠  Données auto-déclarées à des fins cliniques uniquement. Ce rapport ne constitue pas un diagnostic. À utiliser comme complément à l'évaluation clinique."
       : lang === "es" ? "⚠  Datos autodeclarados solo para fines clínicos. No constituye diagnóstico. Usar como complemento a la evaluación clínica."
       : lang === "zh" ? "⚠  自我报告数据，仅供临床参考。不构成诊断。应作为临床评估的补充。"
       : "⚠  Self-reported data for clinical use only. Not a diagnosis. Use as a complement to clinical assessment.")
    : (lang === "fr" ? "⚠  Analyse automatisée à titre informatif. Ce résumé ne remplace pas l'avis d'un professionnel de santé. Parlez à un médecin ou thérapeute si besoin."
       : lang === "es" ? "⚠  Análisis automatizado solo informativo. No reemplaza el consejo médico. Hable con un profesional si lo necesita."
       : lang === "zh" ? "⚠  仅供参考的自动分析。不替代专业医疗建议。如有需要，请咨询医疗专业人员。"
       : "⚠  Automated analysis for informational purposes only. Not medical advice. Please consult a professional if needed.");

  const reportTypeLabel = reportType === "therapist"
    ? (lang === "fr" ? "Pour mon thérapeute" : lang === "es" ? "Para mi terapeuta" : lang === "zh" ? "给治疗师" : "For therapist")
    : (lang === "fr" ? "Pour moi" : lang === "es" ? "Para mí" : lang === "zh" ? "给自己" : "For myself");

  const generatePDF = async () => {
    setStep("data");
    try {
      const endDate   = isoToday();
      const startDate = subtractDays(endDate, periodDays[period] - 1);
      const dailyLogs = getDailyLogsRange(startDate, endDate);
      const entries: MoodEntry[] = dailyLogs.flatMap((d: DailyLog) => d.entries);

      // ── AI analysis ─────────────────────────────────────────────────────
      setStep("ai");
      let aiAnalysis = "";
      if (entries.length > 0) {
        try {
          const prompt = buildPrompt(entries, dailyLogs, startDate, endDate, lang, `${periodDays[period]} days`, reportType);
          aiAnalysis = await callAI(prompt, reportType);
        } catch {
          aiAnalysis = lang === "fr"
            ? "L'analyse IA n'a pas pu être générée. Veuillez vérifier votre connexion internet."
            : lang === "es" ? "El análisis IA no pudo generarse. Verifique su conexión."
            : lang === "zh" ? "AI 分析无法生成。请检查您的网络连接。"
            : "AI analysis could not be generated. Please check your internet connection.";
        }
      }

      // ── Build PDF ────────────────────────────────────────────────────────
      setStep("pdf");
      const { jsPDF } = await import("jspdf");
      const autoTable  = (await import("jspdf-autotable")).default;

      const doc    = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW  = doc.internal.pageSize.getWidth();
      const margin = 15;
      let y = margin;

      const endLabel   = new Date(endDate   + "T12:00:00").toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
      const startLabel = new Date(startDate + "T12:00:00").toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
      const dateRange  = `${t.mood.reportFrom} ${startLabel} ${t.mood.reportTo} ${endLabel}`;

      // ── Cover header ─────────────────────────────────────────────────────
      drawHeader(doc, t.mood.reportTitle, reportTypeLabel, dateRange, reportTypeLabel, pageW, margin);
      y = 62;

      // ── No data ───────────────────────────────────────────────────────────
      if (dailyLogs.length === 0) {
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(12);
        doc.text(t.mood.reportNoData, margin, y);
        doc.save(`mindscope-report-${period}.pdf`);
        setStep("idle");
        return;
      }

      // ── Summary stats ─────────────────────────────────────────────────────
      y = drawSectionTitle(doc, t.mood.reportSummary, y, margin, pageW);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text(`${dailyLogs.length} ${t.mood.reportDaysTracked} / ${periodDays[period]}  ·  ${entries.length} ${entries.length > 1 ? "entrées" : "entrée"}`, margin, y);
      y += 8;

      const stats = [
        { label: t.mood.reportMood,    avgV: avg(entries.map(e => e.mood)),     minV: minOf(entries.map(e => e.mood)),     maxV: maxOf(entries.map(e => e.mood)),     unit: "/10" },
        { label: t.mood.reportSleep,   avgV: avg(entries.map(e => e.sleep)),    minV: minOf(entries.map(e => e.sleep)),    maxV: maxOf(entries.map(e => e.sleep)),    unit: t.mood.hoursUnit },
        { label: t.mood.appetiteLabel, avgV: avg(entries.map(e => e.appetite)), minV: minOf(entries.map(e => e.appetite)), maxV: maxOf(entries.map(e => e.appetite)), unit: "/5" },
        { label: t.mood.energyLabel,   avgV: avg(entries.map(e => e.energy)),   minV: minOf(entries.map(e => e.energy)),   maxV: maxOf(entries.map(e => e.energy)),   unit: "/5" },
        { label: t.mood.reportAlcohol, avgV: avg(entries.map(e => e.alcohol)),  minV: minOf(entries.map(e => e.alcohol)),  maxV: maxOf(entries.map(e => e.alcohol)),  unit: ` ${t.mood.alcoholDrinks}` },
      ].filter(s => s.avgV !== null);

      autoTable(doc, {
        startY: y,
        head:   [[t.mood.reportSummary, t.mood.reportAvg, t.mood.reportMin, t.mood.reportMax]],
        body:   stats.map(s => [s.label, `${s.avgV}${s.unit}`, `${s.minV ?? "—"}${s.unit}`, `${s.maxV ?? "—"}${s.unit}`]),
        styles:             { fontSize: 9, cellPadding: 3 },
        headStyles:         { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: "bold" },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { left: margin, right: margin },
      });
      y = (doc as any).lastAutoTable.finalY + 12;

      // ── Medication adherence section ───────────────────────────────────────
      const medStats = computeMedStats(entries);
      if (medStats.length > 0) {
        if (y > 220) { doc.addPage(); y = margin; }
        y = drawSectionTitle(doc, t.mood.medSectionTitle, y, margin, pageW, [124, 58, 237]);
        autoTable(doc, {
          startY: y,
          head: [[t.mood.medTitle, lang === "fr" ? "Jours pris" : lang === "es" ? "Días tomado" : lang === "zh" ? "服用天数" : "Days taken", lang === "fr" ? "Jours enregistrés" : lang === "es" ? "Días registrados" : lang === "zh" ? "记录天数" : "Days recorded", "%"]],
          body: medStats.map(m => [m.name, `${m.daysTaken}`, `${m.daysRecorded}`, `${m.pct}%`]),
          styles:             { fontSize: 9, cellPadding: 3 },
          headStyles:         { fillColor: [124, 58, 237], textColor: [255, 255, 255], fontStyle: "bold" },
          alternateRowStyles: { fillColor: [245, 243, 255] },
          margin: { left: margin, right: margin },
        });
        y = (doc as any).lastAutoTable.finalY + 12;
      }

      // ── Behaviour summary ─────────────────────────────────────────────────
      const withAlcohol = entries.filter(e => e.alcohol  != null && e.alcohol  > 0).length;
      const withSubst   = entries.filter(e => e.substances != null && e.substances > 0).length;
      const withRisk    = entries.filter(e => e.riskBehavior === true).length;
      if (withAlcohol + withSubst + withRisk > 0) {
        if (y > 220) { doc.addPage(); y = margin; }
        y = drawSectionTitle(doc, t.mood.reportBehaviours, y, margin, pageW, [234, 88, 12]);
        autoTable(doc, {
          startY: y,
          head: [[t.mood.reportBehaviours, `${lang === "fr" ? "Jours" : lang === "es" ? "Días" : lang === "zh" ? "天数" : "Days"} / ${dailyLogs.length}`]],
          body: [
            [t.mood.reportAlcohol,    `${withAlcohol}`],
            [t.mood.reportSubstances, `${withSubst}`],
            [t.mood.reportRisk,       `${withRisk}`],
          ],
          styles:             { fontSize: 9, cellPadding: 3 },
          headStyles:         { fillColor: [234, 88, 12], textColor: [255, 255, 255], fontStyle: "bold" },
          alternateRowStyles: { fillColor: [255, 247, 237] },
          margin: { left: margin, right: margin },
        });
        y = (doc as any).lastAutoTable.finalY + 12;
      }

      // ── AI Analysis page ──────────────────────────────────────────────────
      if (aiAnalysis) {
        addAISection(doc, aiAnalysis, pageW, margin, aiSectionTitle, aiDisclaimer, reportType);
      }

      // ── Daily log table ───────────────────────────────────────────────────
      doc.addPage();
      y = margin;
      y = drawSectionTitle(doc, t.mood.reportDailyLog, y, margin, pageW);
      const subOpts   = t.mood.substanceOpts;
      const tableRows: string[][] = [];
      for (const day of dailyLogs) {
        const d       = new Date(day.date + "T12:00:00");
        const dateStr = d.toLocaleDateString(locale, { weekday: "short", day: "numeric", month: "short" });
        for (const e of day.entries) {
          const medSummary = e.medicationsTaken
            ? Object.entries(e.medicationsTaken).map(([m, taken]) => `${m.slice(0,10)}: ${taken ? "✓" : "✗"}`).join(", ")
            : "-";
          tableRows.push([
            `${dateStr}\n${e.datetime.split("T")[1]?.slice(0,5) ?? ""}`,
            `${e.mood}/10`,
            e.sleep     != null ? `${e.sleep}${t.mood.hoursUnit}` : "-",
            e.appetite  != null ? `${e.appetite}/5` : "-",
            e.energy    != null ? `${e.energy}/5`   : "-",
            e.alcohol   != null && e.alcohol > 0 ? `${e.alcohol}` : "0",
            e.substances != null ? subOpts[e.substances] : "-",
            e.riskBehavior === true ? t.mood.riskYes : e.riskBehavior === false ? t.mood.riskNo : "-",
            medSummary.length > 50 ? medSummary.slice(0, 48) + "…" : medSummary,
            e.note ? (e.note.length > 45 ? e.note.slice(0, 42) + "…" : e.note) : "",
          ]);
        }
      }
      autoTable(doc, {
        startY: y,
        head: [[t.mood.reportDate, t.mood.reportMood, t.mood.reportSleep, t.mood.appetiteLabel, t.mood.energyLabel, t.mood.reportAlcohol, t.mood.reportSubstances, t.mood.reportRisk, t.mood.medTitle, t.mood.reportJournal]],
        body: tableRows,
        styles:             { fontSize: 7, cellPadding: 2, overflow: "linebreak" },
        headStyles:         { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: "bold", fontSize: 7 },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        columnStyles:       { 8: { cellWidth: 28 }, 9: { cellWidth: 30 } },
        margin: { left: margin, right: margin },
      });

      // ── Journal section ───────────────────────────────────────────────────
      const journalEntries = entries.filter(e => e.note);
      if (journalEntries.length > 0) {
        doc.addPage(); y = margin;
        y = drawSectionTitle(doc, t.mood.journalLabel, y, margin, pageW);
        for (const e of journalEntries) {
          if (y > 270) { doc.addPage(); y = margin; }
          const d  = new Date(e.date + "T12:00:00");
          const ds = d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
          const ts = e.datetime.split("T")[1]?.slice(0,5) ?? "";
          doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(37, 99, 235);
          doc.text(`${ds}  ${ts}`, margin, y); y += 5;
          doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(71, 85, 105);
          const lines = doc.splitTextToSize(e.note ?? "", pageW - margin * 2);
          doc.text(lines, margin, y); y += lines.length * 4.5 + 7;
        }
      }

      // ── Footer on every page ──────────────────────────────────────────────
      const totalPages = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(148, 163, 184);
        doc.text(`${t.mood.reportGenBy}  ·  ${reportTypeLabel}${aiAnalysis ? "  ·  ✦ Mistral AI" : ""}`, margin, 290);
        doc.text(`${i} / ${totalPages}`, pageW - margin, 290, { align: "right" });
      }

      setStep("done");
      doc.save(`mindscope-${reportType}-${period}-${endDate}.pdf`);
      setTimeout(() => setStep("idle"), 2000);
    } catch {
      setStep("idle");
    }
  };

  const loading = step !== "idle";

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className={`p-5 ${reportType === "therapist" ? "bg-gradient-to-r from-indigo-600 to-violet-600" : "bg-gradient-to-r from-teal-500 to-blue-600"}`}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{t.mood.reportTitle}</h3>
            <p className="text-xs text-white/70">
              {lang === "fr" ? "Rapport PDF avec analyse IA Mistral"
               : lang === "es" ? "Informe PDF con análisis IA Mistral"
               : lang === "zh" ? "带 Mistral AI 分析的 PDF 报告"
               : "PDF Report with Mistral AI analysis"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">

        {/* Report type toggle */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            {t.mood.reportTypeLabel}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => !loading && setReportType("self")}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                reportType === "self"
                  ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300"
                  : "border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-teal-300"}`}>
              <UserRound className={`h-4 w-4 flex-shrink-0 ${reportType === "self" ? "text-teal-500" : "text-slate-400"}`} />
              <div className="text-left">
                <div>{t.mood.reportForSelf}</div>
                <div className="text-[10px] opacity-60 font-normal">
                  {lang === "fr" ? "encourageant, à toi" : lang === "es" ? "alentador, personal" : lang === "zh" ? "鼓励性，个人" : "warm, personal"}
                </div>
              </div>
            </button>
            <button onClick={() => !loading && setReportType("therapist")}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                reportType === "therapist"
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300"
                  : "border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-indigo-300"}`}>
              <Stethoscope className={`h-4 w-4 flex-shrink-0 ${reportType === "therapist" ? "text-indigo-500" : "text-slate-400"}`} />
              <div className="text-left">
                <div>{t.mood.reportForTherapist}</div>
                <div className="text-[10px] opacity-60 font-normal">
                  {lang === "fr" ? "clinique, 3ème personne" : lang === "es" ? "clínico, 3ª persona" : lang === "zh" ? "临床，第三人称" : "clinical, 3rd person"}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* What's included */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: <BarChart2 className="h-4 w-4" />, label: lang === "fr" ? "Statistiques" : lang === "es" ? "Estadísticas" : lang === "zh" ? "统计" : "Statistics" },
            { icon: <Brain    className="h-4 w-4" />, label: lang === "fr" ? "Analyse IA"   : lang === "es" ? "Análisis IA"  : lang === "zh" ? "AI 分析" : "AI Analysis" },
            { icon: <FileText className="h-4 w-4" />, label: lang === "fr" ? "Journal"      : lang === "es" ? "Diario"       : lang === "zh" ? "日记" : "Journal" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400">
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Period selector */}
        <div className="grid grid-cols-3 gap-2">
          {(["1w", "1m", "1y"] as Period[]).map((p) => (
            <button key={p} onClick={() => !loading && setPeriod(p)}
              className={`flex flex-col items-center gap-1 py-3 rounded-xl border-2 text-sm font-medium transition-all active:scale-95 ${
                period === p
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-blue-300"}`}>
              <Calendar className="h-4 w-4" />
              {periodLabels[p]}
            </button>
          ))}
        </div>

        {/* Date range */}
        <div className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-xs text-slate-500 dark:text-slate-400">
          {(() => {
            const end   = isoToday();
            const start = subtractDays(end, periodDays[period] - 1);
            const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
            return `${t.mood.reportFrom} ${new Date(start + "T12:00:00").toLocaleDateString(locale, opts)} ${t.mood.reportTo} ${new Date(end + "T12:00:00").toLocaleDateString(locale, opts)}`;
          })()}
        </div>

        {/* Loading steps indicator */}
        {loading && (
          <div className="space-y-2">
            {(["data", "ai", "pdf"] as const).map((s) => {
              const stepOrder = ["data", "ai", "pdf", "done"];
              const curIdx  = stepOrder.indexOf(step);
              const thisIdx = stepOrder.indexOf(s);
              const done    = curIdx > thisIdx;
              const current = step === s;
              return (
                <div key={s} className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                  current ? "bg-blue-50 dark:bg-blue-900/20" : done ? "bg-green-50 dark:bg-green-900/10" : "opacity-40"}`}>
                  {current ? (
                    <span className="h-4 w-4 flex-shrink-0 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                  ) : done ? (
                    <span className="h-4 w-4 flex-shrink-0 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold">✓</span>
                  ) : (
                    <span className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                  )}
                  <span className={`text-sm font-medium ${current ? "text-blue-600 dark:text-blue-400" : done ? "text-green-600 dark:text-green-400" : "text-slate-400"}`}>
                    {stepLabels[s]}
                  </span>
                  {s === "ai" && current && (
                    <span className="text-xs text-blue-400 ml-auto">Mistral AI</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Generate button */}
        <button onClick={generatePDF} disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
            loading ? "bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
                    : reportType === "therapist"
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl"
                    : "bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"}`}>
          {loading ? (
            <>
              <span className="h-4 w-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
              {(stepLabels as Record<string, string>)[step] ?? stepLabels["data"]}
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              {t.mood.reportGenerate} — {periodLabels[period]}
              <Sparkles className="h-4 w-4 opacity-70" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          {reportType === "therapist"
            ? (lang === "fr" ? "✦ Rapport clinique en 3ème personne, adapté à votre thérapeute."
               : lang === "es" ? "✦ Informe clínico en 3ª persona, adaptado para su terapeuta."
               : lang === "zh" ? "✦ 第三人称临床报告，专为治疗师定制。"
               : "✦ Clinical report in 3rd person, tailored for your therapist.")
            : (lang === "fr" ? "✦ Bilan personnel chaleureux et encourageant, rédigé pour vous."
               : lang === "es" ? "✦ Resumen personal cálido y alentador, escrito para usted."
               : lang === "zh" ? "✦ 温暖鼓励的个人健康总结，专为您编写。"
               : "✦ Warm, encouraging personal wellness summary, written for you.")}
        </p>
      </div>
    </div>
  );
}

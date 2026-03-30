"use client";

import { useState, useEffect, useCallback } from "react";
import {
  saveMoodEntry, deleteMoodEntry, clearAllMood,
  getTodayEntries, getDailyLogs, migrateLegacyMoodData,
  getMedicationProfile, saveMedicationProfile,
  MoodEntry, DailyLog, MedicationProfile,
} from "@/lib/storage";
import { useI18n, tf } from "@/lib/i18n";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import {
  Moon, Utensils, Zap, BookOpen, ChevronDown, ChevronUp,
  Trash2, Wine, Pill, AlertTriangle, Plus, Minus, Clock,
  PlusCircle, Edit2, X, Settings,
} from "lucide-react";

// ── constants ──────────────────────────────────────────────────────────────────
const moodEmojis     = ["😞","😟","😔","😐","🙂","😊","😄","😁","🤩","🥳"];
const appetiteEmojis = ["🚫","😕","😐","😋","🤤"];
const energyEmojis   = ["🪫","😩","😐","⚡","🚀"];
const subColors = [
  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
];

function pad(n: number) { return n < 10 ? `0${n}` : `${n}`; }

function nowDatetime(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}
function todayISO(): string { return nowDatetime().slice(0, 10); }
function fmtTime(dt: string): string {
  const [, time] = dt.split("T");
  return time?.slice(0, 5) ?? "";
}
function avg(arr: (number | undefined)[]): number | null {
  const v = arr.filter((x): x is number => x !== undefined);
  return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length * 10) / 10 : null;
}

// ── sub-components ─────────────────────────────────────────────────────────────

function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-slate-400 dark:text-slate-500">{icon}</span>
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</span>
    </div>
  );
}

function ScaleButtons({ value, onChange, emojis, labels }: {
  value: number | null; onChange: (v: number) => void;
  emojis?: string[]; labels?: readonly string[];
}) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${emojis?.length ?? 5}, 1fr)` }}>
      {(emojis ?? Array.from({ length: 5 })).map((_, i) => {
        const v = i + 1; const active = value === v;
        return (
          <button key={v} onClick={() => onChange(v)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all active:scale-95 ${
              active ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-105 shadow-md"
                     : "border-transparent bg-slate-50 dark:bg-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600"}`}>
            {emojis && <span className="text-xl">{emojis[i]}</span>}
            {labels && <span className="text-[10px] text-slate-500 dark:text-slate-400 text-center leading-tight">{labels[i]}</span>}
          </button>
        );
      })}
    </div>
  );
}

function SleepPicker({ value, onChange, unit }: { value: number | null; onChange: (v: number) => void; unit: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {[3,4,5,6,7,8,9,10,11,12].map((h) => (
        <button key={h} onClick={() => onChange(h)}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium border-2 transition-all active:scale-95 ${
            value === h ? "border-blue-500 bg-blue-600 text-white shadow-md"
                        : "border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-300"}`}>
          {h}{unit}
        </button>
      ))}
      <input type="number" min={0} max={24} placeholder="?"
        value={value !== null && ![3,4,5,6,7,8,9,10,11,12].includes(value) ? value : ""}
        onChange={(e) => { const v = parseInt(e.target.value); if (!isNaN(v) && v >= 0 && v <= 24) onChange(v); }}
        className="w-14 px-2 py-1.5 rounded-xl text-sm border-2 border-dashed border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 focus:outline-none focus:border-blue-400 text-center" />
    </div>
  );
}

function AlcoholCounter({ value, onChange, drinks, none }: {
  value: number; onChange: (v: number) => void; drinks: string; none: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={() => onChange(Math.max(0, value - 1))}
        className="h-9 w-9 rounded-full border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500 hover:border-blue-400 hover:text-blue-500 transition-all active:scale-95">
        <Minus className="h-4 w-4" />
      </button>
      <div className="flex-1 text-center">
        <span className="text-2xl font-bold text-slate-700 dark:text-slate-200">{value}</span>
        <span className="text-sm text-slate-400 ml-1">{value === 0 ? none : drinks}</span>
      </div>
      <button onClick={() => onChange(Math.min(20, value + 1))}
        className="h-9 w-9 rounded-full border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-500 hover:border-blue-400 hover:text-blue-500 transition-all active:scale-95">
        <Plus className="h-4 w-4" />
      </button>
      <div className="flex gap-1.5 ml-2">
        {[1,2,3,5].map((n) => (
          <button key={n} onClick={() => onChange(n)}
            className={`h-7 w-7 rounded-lg text-xs font-semibold border transition-all ${
              value === n ? "border-blue-500 bg-blue-600 text-white"
                          : "border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-blue-300"}`}>
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Entry form ─────────────────────────────────────────────────────────────────

interface FormState {
  id?: string;
  mood: number | null;
  sleep: number | null;
  appetite: number | null;
  energy: number | null;
  note: string;
  alcohol: number;
  substances: number | null;
  substanceNote: string;
  riskBehavior: boolean | null;
  riskNote: string;
  medicationsTaken: Record<string, boolean>;
  showBehaviours: boolean;
  showMeds: boolean;
}

const emptyForm = (): FormState => ({
  id: undefined,
  mood: null, sleep: null, appetite: null, energy: null, note: "",
  alcohol: 0, substances: null, substanceNote: "",
  riskBehavior: null, riskNote: "",
  medicationsTaken: {},
  showBehaviours: false,
  showMeds: false,
});

function EntryForm({ form, setForm, onSave, onCancel, onManageMeds, medProfile, t }: {
  form: FormState;
  setForm: (f: FormState) => void;
  onSave: () => void;
  onCancel: () => void;
  onManageMeds: () => void;
  medProfile: MedicationProfile;
  t: ReturnType<typeof useI18n>["t"];
}) {
  const up = (partial: Partial<FormState>) => setForm({ ...form, ...partial });
  const takenCount = Object.values(form.medicationsTaken).filter(Boolean).length;
  const totalMeds  = medProfile.medications.length;

  return (
    <div className="space-y-5">
      {/* Mood */}
      <div>
        <SectionLabel icon={<span className="text-base">😊</span>} label={t.mood.moodLabel} />
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => up({ mood: n })}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 border-2 transition-all active:scale-95 ${
                form.mood === n ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-110 shadow-md"
                                : "border-transparent bg-slate-50 dark:bg-slate-700/50 hover:border-slate-300"}`}>
              <span className="text-lg sm:text-xl">{moodEmojis[n - 1]}</span>
              <span className="text-[10px] text-slate-400">{n}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sleep */}
      <div>
        <SectionLabel icon={<Moon className="h-4 w-4" />} label={t.mood.sleepLabel} />
        <SleepPicker value={form.sleep} onChange={(v) => up({ sleep: v })} unit={t.mood.hoursUnit} />
      </div>

      {/* Appetite */}
      <div>
        <SectionLabel icon={<Utensils className="h-4 w-4" />} label={t.mood.appetiteLabel} />
        <ScaleButtons value={form.appetite} onChange={(v) => up({ appetite: v })} emojis={appetiteEmojis} labels={t.mood.appetiteOpts} />
      </div>

      {/* Energy */}
      <div>
        <SectionLabel icon={<Zap className="h-4 w-4" />} label={t.mood.energyLabel} />
        <ScaleButtons value={form.energy} onChange={(v) => up({ energy: v })} emojis={energyEmojis} labels={t.mood.energyOpts} />
      </div>

      {/* Journal */}
      <div>
        <SectionLabel icon={<BookOpen className="h-4 w-4" />} label={t.mood.journalLabel} />
        <textarea value={form.note} onChange={(e) => up({ note: e.target.value })}
          placeholder={t.mood.journalPlaceholder} rows={3}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      </div>

      {/* Medications collapsible */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <button onClick={() => up({ showMeds: !form.showMeds })}
          className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <div className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{t.mood.medSectionTitle}</span>
            {totalMeds > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                takenCount === totalMeds && totalMeds > 0
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : takenCount > 0
                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-500"}`}>
                {takenCount}/{totalMeds}
              </span>
            )}
          </div>
          {form.showMeds ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>

        {form.showMeds && (
          <div className="p-4">
            {totalMeds === 0 ? (
              <div className="text-center py-2">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{t.mood.medEmpty}</p>
                <button onClick={onManageMeds}
                  className="text-xs text-blue-500 dark:text-blue-400 hover:underline font-medium">
                  + {t.mood.medManage}
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {medProfile.medications.map((med) => {
                  const taken = form.medicationsTaken[med];
                  return (
                    <div key={med} className="flex items-center gap-2">
                      <Pill className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                      <span className="flex-1 text-sm text-slate-700 dark:text-slate-300 truncate">{med}</span>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => up({ medicationsTaken: { ...form.medicationsTaken, [med]: true } })}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border-2 transition-all active:scale-95 ${
                            taken === true
                              ? "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                              : "border-slate-200 dark:border-slate-600 text-slate-400 hover:border-green-300 dark:hover:border-green-700"}`}>
                          {t.mood.medTaken}
                        </button>
                        <button
                          onClick={() => up({ medicationsTaken: { ...form.medicationsTaken, [med]: false } })}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium border-2 transition-all active:scale-95 ${
                            taken === false
                              ? "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                              : "border-slate-200 dark:border-slate-600 text-slate-400 hover:border-red-300 dark:hover:border-red-700"}`}>
                          {t.mood.medNotTaken}
                        </button>
                      </div>
                    </div>
                  );
                })}
                <button onClick={onManageMeds}
                  className="mt-1 flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <Settings className="h-3 w-3" />
                  {t.mood.medManage}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Behaviours collapsible */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <button onClick={() => up({ showBehaviours: !form.showBehaviours })}
          className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <div className="flex items-center gap-2">
            <Wine className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{t.mood.behaviourTitle}</span>
          </div>
          {form.showBehaviours ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </button>
        {form.showBehaviours && (
          <div className="p-4 space-y-5">
            {/* Alcohol */}
            <div>
              <SectionLabel icon={<Wine className="h-4 w-4" />} label={t.mood.alcoholLabel} />
              <AlcoholCounter value={form.alcohol} onChange={(v) => up({ alcohol: v })} drinks={t.mood.alcoholDrinks} none={t.mood.alcoholNone} />
            </div>
            {/* Substances */}
            <div>
              <SectionLabel icon={<Pill className="h-4 w-4" />} label={t.mood.substancesLabel} />
              <div className="grid grid-cols-4 gap-2 mb-3">
                {t.mood.substanceOpts.map((opt, i) => (
                  <button key={i} onClick={() => up({ substances: i })}
                    className={`py-2 rounded-xl text-xs font-medium border-2 transition-all active:scale-95 ${
                      form.substances === i ? `border-current ${subColors[i]}`
                                            : "border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-slate-300"}`}>
                    {opt}
                  </button>
                ))}
              </div>
              {form.substances !== null && form.substances > 0 && (
                <input value={form.substanceNote} onChange={(e) => up({ substanceNote: e.target.value })}
                  placeholder={t.mood.substancesNote}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              )}
            </div>
            {/* Risk */}
            <div>
              <SectionLabel icon={<AlertTriangle className="h-4 w-4" />} label={t.mood.riskLabel} />
              <div className="flex gap-3 mb-3">
                {[false, true].map((v) => (
                  <button key={String(v)} onClick={() => up({ riskBehavior: v })}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium border-2 transition-all active:scale-95 ${
                      form.riskBehavior === v
                        ? v ? "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                            : "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        : "border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-slate-300"}`}>
                    {v ? t.mood.riskYes : t.mood.riskNo}
                  </button>
                ))}
              </div>
              {form.riskBehavior === true && (
                <input value={form.riskNote} onChange={(e) => up({ riskNote: e.target.value })}
                  placeholder={t.mood.riskNote}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button onClick={onCancel}
          className="flex-1 py-3 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-[0.98]">
          <X className="h-4 w-4 inline mr-1" />
          Annuler
        </button>
        <button onClick={onSave} disabled={form.mood === null}
          className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
            form.mood === null ? "bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
                               : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"}`}>
          {t.mood.saveBtn}
        </button>
      </div>
    </div>
  );
}

// ── Today timeline ─────────────────────────────────────────────────────────────

function TodayTimeline({ entries, onEdit, onDelete, t }: {
  entries: MoodEntry[];
  onEdit: (e: MoodEntry) => void;
  onDelete: (id: string) => void;
  t: ReturnType<typeof useI18n>["t"];
}) {
  if (entries.length === 0) return null;
  return (
    <div className="space-y-2 mb-5">
      {entries.map((e) => (
        <div key={e.id}
          className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
          {/* time pill */}
          <div className="flex-shrink-0 flex items-center gap-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg px-2 py-1">
            <Clock className="h-3 w-3" />
            <span className="text-xs font-semibold">{fmtTime(e.datetime)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg">{moodEmojis[e.mood - 1]}</span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{e.mood}/10</span>
              {e.sleep   != null && <span className="flex items-center gap-1 text-xs text-slate-500"><Moon className="h-3 w-3" />{e.sleep}h</span>}
              {e.appetite != null && <span className="text-sm">{appetiteEmojis[e.appetite - 1]}</span>}
              {e.energy   != null && <span className="text-sm">{energyEmojis[e.energy - 1]}</span>}
              {e.alcohol  != null && e.alcohol > 0 && <span className="flex items-center gap-1 text-xs text-amber-600"><Wine className="h-3 w-3" />{e.alcohol}</span>}
              {e.riskBehavior === true && <AlertTriangle className="h-3.5 w-3.5 text-red-500" />}
              {e.medicationsTaken && Object.keys(e.medicationsTaken).length > 0 && (
                <span className="flex items-center gap-1 text-xs text-purple-500">
                  <Pill className="h-3 w-3" />
                  {Object.values(e.medicationsTaken).filter(Boolean).length}/{Object.keys(e.medicationsTaken).length}
                </span>
              )}
            </div>
            {e.note && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{e.note}</p>}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={() => onEdit(e)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"><Edit2 className="h-3.5 w-3.5" /></button>
            <button onClick={() => onDelete(e.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── DailyLog card ──────────────────────────────────────────────────────────────

function DayLogCard({ log, locale, t }: { log: DailyLog; locale: string; t: ReturnType<typeof useI18n>["t"] }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(log.date + "T12:00:00");
  const formattedDate = date.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long" });
  const avgMood = avg(log.entries.map(e => e.mood));

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left">
        {/* Date box */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex flex-col items-center justify-center">
          <span className="text-xs text-blue-500 font-semibold leading-none">
            {date.toLocaleDateString(locale, { month: "short" }).replace(".", "").toUpperCase()}
          </span>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400 leading-none">{pad(date.getDate())}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-400 capitalize truncate">{formattedDate} {date.getFullYear()}</p>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {avgMood !== null ? `${moodEmojis[Math.round(avgMood) - 1]} ${avgMood}/10` : "—"}
            </span>
            <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
              {log.entries.length} {log.entries.length > 1 ? "entrées" : "entrée"}
            </span>
          </div>
        </div>
        {expanded ? <ChevronUp className="h-4 w-4 text-slate-400 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />}
      </button>

      {expanded && (
        <div className="border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30">
          {log.entries.map((e, idx) => (
            <div key={e.id} className={`p-4 ${idx < log.entries.length - 1 ? "border-b border-slate-100 dark:border-slate-700/50" : ""}`}>
              {/* Time header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg px-2 py-1">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs font-bold">{fmtTime(e.datetime)}</span>
                </div>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              </div>
              {/* Metrics grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <MiniMetric icon={<span className="text-lg">{moodEmojis[e.mood - 1]}</span>}  label={t.mood.moodLabel}     value={`${e.mood}/10`} />
                {e.sleep    != null && <MiniMetric icon={<Moon className="h-4 w-4 text-indigo-400" />} label={t.mood.sleepLabel}    value={`${e.sleep}${t.mood.hoursUnit}`} />}
                {e.appetite != null && <MiniMetric icon={<span className="text-lg">{appetiteEmojis[e.appetite - 1]}</span>} label={t.mood.appetiteLabel} value={t.mood.appetiteOpts[e.appetite - 1]} />}
                {e.energy   != null && <MiniMetric icon={<span className="text-lg">{energyEmojis[e.energy - 1]}</span>}    label={t.mood.energyLabel}   value={t.mood.energyOpts[e.energy - 1]} />}
                {e.alcohol  != null && e.alcohol > 0 && <MiniMetric icon={<Wine className="h-4 w-4 text-amber-500" />}   label={t.mood.alcoholLabel}  value={`${e.alcohol} ${t.mood.alcoholDrinks}`} />}
                {e.substances != null && <MiniMetric icon={<Pill className="h-4 w-4 text-purple-400" />} label={t.mood.substancesLabel} value={t.mood.substanceOpts[e.substances]} />}
                {e.riskBehavior != null && <MiniMetric icon={<AlertTriangle className={`h-4 w-4 ${e.riskBehavior ? "text-red-400" : "text-green-400"}`} />} label={t.mood.riskLabel} value={e.riskBehavior ? t.mood.riskYes : t.mood.riskNo} />}
              </div>
              {/* Medication adherence */}
              {e.medicationsTaken && Object.keys(e.medicationsTaken).length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {Object.entries(e.medicationsTaken).map(([med, taken]) => (
                    <span key={med} className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                      taken ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`}>
                      <Pill className="h-2.5 w-2.5" />
                      {med.length > 20 ? med.slice(0, 18) + "…" : med}
                      {taken ? " ✓" : " ✗"}
                    </span>
                  ))}
                </div>
              )}
              {e.note && (
                <div className="mt-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-1.5 mb-1"><BookOpen className="h-3.5 w-3.5 text-slate-400" /><p className="text-xs text-slate-400">{t.mood.journalLabel}</p></div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{e.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MiniMetric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-800 p-2.5 border border-slate-100 dark:border-slate-700">
      <p className="text-[10px] text-slate-400 mb-1 leading-none">{label}</p>
      <div className="flex items-center gap-1.5">{icon}<span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{value}</span></div>
    </div>
  );
}

// ── Medication Manager ─────────────────────────────────────────────────────────

function MedManager({ medProfile, onUpdate, onClose, t }: {
  medProfile: MedicationProfile;
  onUpdate: (profile: MedicationProfile) => void;
  onClose: () => void;
  t: ReturnType<typeof useI18n>["t"];
}) {
  const [newMed, setNewMed] = useState("");

  const addMed = () => {
    const med = newMed.trim();
    if (!med || medProfile.medications.includes(med)) return;
    const updated = { medications: [...medProfile.medications, med] };
    saveMedicationProfile(updated);
    onUpdate(updated);
    setNewMed("");
  };

  const removeMed = (med: string) => {
    const updated = { medications: medProfile.medications.filter(m => m !== med) };
    saveMedicationProfile(updated);
    onUpdate(updated);
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="flex items-center gap-2">
          <Pill className="h-5 w-5 text-white" />
          <h3 className="font-semibold text-white">{t.mood.medTitle}</h3>
        </div>
        <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-5">
        {/* Add new */}
        <div className="flex gap-2 mb-5">
          <input
            value={newMed}
            onChange={(e) => setNewMed(e.target.value)}
            placeholder={t.mood.medPlaceholder}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addMed(); } }}
            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          <button onClick={addMed} disabled={!newMed.trim()}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-40 transition-all active:scale-95">
            {t.mood.medAdd}
          </button>
        </div>

        {/* List */}
        {medProfile.medications.length === 0 ? (
          <div className="text-center py-6">
            <Pill className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400 dark:text-slate-500">{t.mood.medEmpty}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {medProfile.medications.map((med) => (
              <div key={med}
                className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30">
                <Pill className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <span className="flex-1 text-sm text-slate-700 dark:text-slate-200 font-medium">{med}</span>
                <button onClick={() => removeMed(med)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function MoodTracker() {
  const { t, lang } = useI18n();
  const [todayEntries,   setTodayEntries]   = useState<MoodEntry[]>([]);
  const [logs,           setLogs]           = useState<DailyLog[]>([]);
  const [form,           setForm]           = useState<FormState>(emptyForm());
  const [showForm,       setShowForm]       = useState(false);
  const [confirmClear,   setConfirmClear]   = useState(false);
  const [medProfile,     setMedProfile]     = useState<MedicationProfile>({ medications: [] });
  const [showMedManager, setShowMedManager] = useState(false);

  const locale = lang === "zh" ? "zh-CN" : lang === "es" ? "es-ES" : lang === "fr" ? "fr-FR" : "en-US";

  const reload = useCallback(() => {
    const today = getTodayEntries();
    setTodayEntries(today);
    setLogs(getDailyLogs());
  }, []);

  useEffect(() => {
    migrateLegacyMoodData();
    const today = getTodayEntries();
    setTodayEntries(today);
    setLogs(getDailyLogs());
    setShowForm(today.length === 0);
    setMedProfile(getMedicationProfile());
  }, []);

  const handleSave = () => {
    if (form.mood === null) return;
    const dt = nowDatetime();
    saveMoodEntry({
      id:               form.id,
      datetime:         form.id ? (todayEntries.find(e => e.id === form.id)?.datetime ?? dt) : dt,
      date:             todayISO(),
      mood:             form.mood,
      sleep:            form.sleep ?? undefined,
      appetite:         form.appetite ?? undefined,
      energy:           form.energy ?? undefined,
      note:             form.note.trim() || undefined,
      alcohol:          form.alcohol > 0 ? form.alcohol : undefined,
      substances:       form.substances !== null ? form.substances : undefined,
      substanceNote:    form.substanceNote.trim() || undefined,
      riskBehavior:     form.riskBehavior !== null ? form.riskBehavior : undefined,
      riskNote:         form.riskNote.trim() || undefined,
      medicationsTaken: Object.keys(form.medicationsTaken).length > 0 ? form.medicationsTaken : undefined,
    });
    setForm(emptyForm());
    setShowForm(false);
    reload();
  };

  const handleEdit = (e: MoodEntry) => {
    setForm({
      id: e.id,
      mood: e.mood, sleep: e.sleep ?? null, appetite: e.appetite ?? null, energy: e.energy ?? null,
      note: e.note ?? "",
      alcohol: e.alcohol ?? 0, substances: e.substances ?? null, substanceNote: e.substanceNote ?? "",
      riskBehavior: e.riskBehavior ?? null, riskNote: e.riskNote ?? "",
      medicationsTaken: e.medicationsTaken ?? {},
      showBehaviours: !!(e.alcohol || e.substances || e.riskBehavior != null),
      showMeds: !!(e.medicationsTaken && Object.keys(e.medicationsTaken).length > 0),
    });
    setShowForm(true);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const handleDelete = (id: string) => {
    deleteMoodEntry(id);
    reload();
  };

  const handleClearAll = () => {
    if (confirmClear) { clearAllMood(); setConfirmClear(false); reload(); }
    else { setConfirmClear(true); setTimeout(() => setConfirmClear(false), 3000); }
  };

  // chart — last 30 days avg mood per day
  const chartData = (() => {
    const allLogs = [...logs].reverse().slice(-30);
    return allLogs.map((l) => ({
      date:     new Date(l.date + "T12:00:00").toLocaleDateString(locale, { month: "short", day: "numeric" }),
      mood:     avg(l.entries.map(e => e.mood)),
      sleep:    avg(l.entries.map(e => e.sleep  != null ? Math.min(10, Math.round((e.sleep / 12) * 10)) : undefined)),
      appetite: avg(l.entries.map(e => e.appetite != null ? Math.round((e.appetite - 1) * 2.25 + 1) : undefined)),
      energy:   avg(l.entries.map(e => e.energy   != null ? Math.round((e.energy   - 1) * 2.25 + 1) : undefined)),
    }));
  })();

  const today = new Date().toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="space-y-6">

      {/* ── Today card ──────────────────────────────────────────────────── */}
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4">
          <p className="text-blue-100 text-xs font-medium uppercase tracking-widest mb-0.5">{t.mood.title}</p>
          <p className="text-white font-semibold capitalize">{today}</p>
        </div>

        <div className="p-5">
          {/* Today's entries so far */}
          <TodayTimeline entries={todayEntries} onEdit={handleEdit} onDelete={handleDelete} t={t} />

          {/* Form or add-entry button */}
          {showForm ? (
            <EntryForm
              form={form}
              setForm={setForm}
              onSave={handleSave}
              onManageMeds={() => setShowMedManager(true)}
              medProfile={medProfile}
              onCancel={() => {
                setForm(emptyForm());
                if (todayEntries.length > 0) setShowForm(false);
              }}
              t={t}
            />
          ) : (
            <button
              onClick={() => { setForm(emptyForm()); setShowForm(true); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all active:scale-[0.98] font-medium text-sm"
            >
              <PlusCircle className="h-5 w-5" />
              {lang === "fr" ? "Mon humeur a changé — ajouter une entrée"
               : lang === "es" ? "Mi estado de ánimo cambió — añadir entrada"
               : lang === "zh" ? "我的心情变了 — 添加记录"
               : "My mood changed — add an entry"}
            </button>
          )}
        </div>
      </div>

      {/* ── Medication Manager ───────────────────────────────────────────── */}
      {showMedManager && (
        <MedManager
          medProfile={medProfile}
          onUpdate={(p) => setMedProfile(p)}
          onClose={() => setShowMedManager(false)}
          t={t}
        />
      )}

      {/* ── Chart ───────────────────────────────────────────────────────── */}
      {chartData.length > 1 && (
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-0.5">{t.mood.chartTitle}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{tf(t.mood.chartSub, { n: chartData.length })}</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <YAxis domain={[1, 10]} ticks={[1,3,5,7,10]} tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "12px" }} />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
              <Line type="monotone" dataKey="mood"     name={t.mood.moodLabel}     stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} connectNulls />
              <Line type="monotone" dataKey="sleep"    name={t.mood.sleepLabel}    stroke="#8b5cf6" strokeWidth={2}   dot={{ r: 3 }} connectNulls strokeDasharray="4 2" />
              <Line type="monotone" dataKey="appetite" name={t.mood.appetiteLabel} stroke="#f97316" strokeWidth={2}   dot={{ r: 3 }} connectNulls strokeDasharray="4 2" />
              <Line type="monotone" dataKey="energy"   name={t.mood.energyLabel}   stroke="#10b981" strokeWidth={2}   dot={{ r: 3 }} connectNulls strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ── Daily log ───────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">{t.mood.historyTitle}</h3>
          {logs.length > 0 && (
            <button onClick={handleClearAll}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                confirmClear ? "border-red-400 text-red-600 bg-red-50 dark:bg-red-900/20"
                             : "border-slate-200 dark:border-slate-600 text-slate-400 hover:text-red-500 hover:border-red-300"}`}>
              <Trash2 className="h-3.5 w-3.5" />
              {confirmClear ? t.mood.confirmClear : t.mood.clearJournal}
            </button>
          )}
        </div>

        {logs.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 text-center">
            <p className="text-4xl mb-3">📓</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{t.mood.noEntries}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <DayLogCard key={log.date} log={log} locale={locale} t={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

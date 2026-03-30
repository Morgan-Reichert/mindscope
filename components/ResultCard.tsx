"use client";

import { CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { ScoreInterpretation, Test } from "@/data/tests";
import { useI18n, tf } from "@/lib/i18n";
import { CrisisBox } from "@/components/CrisisBox";

interface ResultCardProps {
  test: Test;
  score: number;
  interpretation: ScoreInterpretation;
}

const severityConfig = {
  minimal: {
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-700",
    badge: "bg-green-100 text-green-800 dark:bg-green-800/40 dark:text-green-300",
    icon: CheckCircle,
    iconColor: "text-green-500",
  },
  low: {
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-700",
    badge: "bg-green-100 text-green-800 dark:bg-green-800/40 dark:text-green-300",
    icon: CheckCircle,
    iconColor: "text-green-500",
  },
  normal: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-700",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-800/40 dark:text-blue-300",
    icon: Info,
    iconColor: "text-blue-500",
  },
  mild: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-700",
    badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/40 dark:text-yellow-300",
    icon: Info,
    iconColor: "text-yellow-500",
  },
  moderate: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-700",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-800/40 dark:text-orange-300",
    icon: AlertTriangle,
    iconColor: "text-orange-500",
  },
  "moderately-severe": {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-700",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-800/40 dark:text-orange-300",
    icon: AlertTriangle,
    iconColor: "text-orange-500",
  },
  high: {
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-700",
    badge: "bg-red-100 text-red-800 dark:bg-red-800/40 dark:text-red-300",
    icon: AlertCircle,
    iconColor: "text-red-500",
  },
  severe: {
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-700",
    badge: "bg-red-100 text-red-800 dark:bg-red-800/40 dark:text-red-300",
    icon: AlertCircle,
    iconColor: "text-red-500",
  },
};

export function ResultCard({ test, score, interpretation }: ResultCardProps) {
  const { t, lang } = useI18n();
  const config = severityConfig[interpretation.severity] ?? severityConfig.normal;
  const Icon = config.icon;
  const percentage = Math.round((score / test.scoring.maxScore) * 100);

  // Use translated interpretation content if available
  type TranslatedLang = "fr" | "es" | "zh";
  const i18nInterp = lang !== "en" ? interpretation.i18n?.[lang as TranslatedLang] : undefined;
  const interpLabel = i18nInterp?.label || interpretation.label;
  const interpDescription = i18nInterp?.description || interpretation.description;
  const interpRecommendation = i18nInterp?.recommendation || interpretation.recommendation;

  return (
    <div className="space-y-6">
      {/* Score display */}
      <div className={`rounded-2xl border-2 ${config.bg} ${config.border} p-6 text-center`}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Icon className={`h-6 w-6 ${config.iconColor}`} />
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${config.badge}`}>
            {interpLabel}
          </span>
        </div>
        <div className="text-5xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          {score}
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {tf(t.testPage.scoreOf, { max: test.scoring.maxScore })} ({percentage}%)
        </div>

        {/* Score bar */}
        <div className="mt-4 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${
              interpretation.isHigh
                ? "bg-gradient-to-r from-orange-400 to-red-500"
                : "bg-gradient-to-r from-blue-400 to-green-400"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* What this means */}
      <div className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
          <span>📊</span> {t.testPage.whatSuggests}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          {interpDescription}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-3 italic">
          {tf(t.testPage.disclaimer, { label: interpLabel.toLowerCase() })}
        </p>
      </div>

      {/* Recommendation */}
      <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-5">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
          <span>💡</span> {t.testPage.whatToDo}
        </h3>
        <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
          {interpRecommendation}
        </p>
      </div>

      {/* High score supportive message + geo-adapted crisis resources */}
      {interpretation.isHigh && (
        <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 p-5">
          <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-2">
            <span>🤝</span> {t.testPage.notAlone}
          </h3>
          <p className="text-purple-700 dark:text-purple-300 text-sm leading-relaxed">
            {t.testPage.notAloneText}
          </p>
        </div>
      )}

      {/* Geo-adapted crisis resources (shown when high) */}
      {interpretation.isHigh && <CrisisBox />}

      {/* Limitations */}
      <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-5">
        <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
          <span>⚠️</span> {t.testPage.limitationsTitle}
        </h3>
        <ul className="text-slate-500 dark:text-slate-400 text-sm space-y-1 list-disc list-inside">
          <li>{t.testPage.lim1}</li>
          <li>{t.testPage.lim2}</li>
          <li>{t.testPage.lim3}</li>
          <li>{t.testPage.lim4}</li>
          <li>{t.testPage.lim5}</li>
        </ul>
      </div>
    </div>
  );
}

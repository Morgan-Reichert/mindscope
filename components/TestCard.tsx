"use client";

import Link from "next/link";
import { Clock, ChevronRight } from "lucide-react";
import { Test } from "@/data/tests";
import { useI18n } from "@/lib/i18n";

type TranslatedLang = "fr" | "es" | "zh";

interface TestCardProps {
  test: Test;
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  red: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800",
  yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
  teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800",
  amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
  violet: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800",
  rose: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
  green: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
  emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  cyan: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
  slate: "bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
};

export function TestCard({ test }: TestCardProps) {
  const { t, lang } = useI18n();
  const colorClass = colorMap[test.color] || colorMap.blue;

  const i18nTest = lang !== "en" ? test.i18n?.[lang as TranslatedLang] : undefined;
  const testName = i18nTest?.shortName || test.shortName;
  const testDesc = i18nTest?.description || test.description;
  const testCategory = i18nTest?.category || test.category;

  return (
    <Link
      href={`/tests/${test.id}`}
      className="group block rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{test.icon}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colorClass}`}>
              {testCategory}
            </span>
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-snug mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {testName}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {testDesc}
          </p>
        </div>
        <ChevronRight className="h-5 w-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
          <Clock className="h-3.5 w-3.5" />
          <span>{test.timeMinutes} {t.tests.minLabel}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <span>{test.questions.length} {t.tests.qLabel}</span>
          <span>·</span>
          <span className="capitalize">{test.type === "screening" ? t.tests.typeScreening : t.tests.typeSelf}</span>
        </div>
      </div>
    </Link>
  );
}

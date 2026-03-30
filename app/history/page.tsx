"use client";

import { useState, useEffect } from "react";
import { getResults, deleteResult, clearAllResults, TestResult } from "@/lib/storage";
import { MoodTracker } from "@/components/MoodTracker";
import { ReportGenerator } from "@/components/ReportGenerator";
import { Trash2, BarChart2, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";
import { tests } from "@/data/tests";
import { useI18n, tf } from "@/lib/i18n";

const severityColors: Record<string, string> = {
  minimal: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  normal: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  mild: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  moderate: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  "moderately-severe": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  severe: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export default function HistoryPage() {
  const { t, lang } = useI18n();
  const [results, setResults] = useState<TestResult[]>([]);
  const [activeTab, setActiveTab] = useState<"tests" | "mood">("tests");
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setResults(getResults());
  }, []);

  const handleDelete = (id: string) => {
    deleteResult(id);
    setResults(getResults());
  };

  const handleClearAll = () => {
    if (confirmClear) {
      clearAllResults();
      setResults([]);
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
    }
  };

  const getTestIcon = (testId: string) => {
    const test = tests.find((t) => t.id === testId);
    return test?.icon || "📋";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
          {t.history.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {t.history.subtitle}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab("tests")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px ${
            activeTab === "tests"
              ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <BarChart2 className="h-4 w-4" />
          {t.history.tabTests} ({results.length})
        </button>
        <button
          onClick={() => setActiveTab("mood")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px ${
            activeTab === "mood"
              ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Calendar className="h-4 w-4" />
          {t.history.tabMood}
        </button>
      </div>

      {activeTab === "tests" && (
        <div>
          {results.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">📋</p>
              <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">{t.history.noResultsTitle}</h3>
              <p className="text-slate-400 dark:text-slate-500 text-sm mb-6">{t.history.noResultsText}</p>
              <Link
                href="/tests"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all"
              >
                {t.history.browseBtn}
              </Link>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {tf(t.history.resultsCount, { n: results.length })}
                </p>
                <button
                  onClick={handleClearAll}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    confirmClear
                      ? "border-red-400 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
                      : "border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:border-red-300 dark:hover:border-red-600 hover:text-red-600"
                  }`}
                >
                  {confirmClear ? t.history.confirmClear : t.history.clearAll}
                </button>
              </div>

              {/* Privacy note */}
              <div className="mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 px-3 py-2 flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                {t.history.privacyNote}
              </div>

              <div className="space-y-3">
                {results.map((result) => {
                  const percentage = Math.round((result.score / result.maxScore) * 100);
                  const colorClass = severityColors[result.severity] || severityColors.normal;
                  const icon = getTestIcon(result.testId);
                  const date = new Date(result.completedAt);

                  return (
                    <div
                      key={result.id}
                      className="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <span className="text-2xl flex-shrink-0">{icon}</span>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                                {result.testName}
                              </h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colorClass}`}>
                                {result.severityLabel}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-500">
                              {date.toLocaleDateString(lang, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden max-w-[120px]">
                                <div
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {result.score}/{result.maxScore}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Link
                            href={`/tests/${result.testId}`}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                          >
                            {t.history.retake}
                          </Link>
                          <button
                            onClick={() => handleDelete(result.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "mood" && (
        <div className="space-y-6">
          <MoodTracker />
          <ReportGenerator />
        </div>
      )}
    </div>
  );
}

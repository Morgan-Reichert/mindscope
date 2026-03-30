"use client";

import { Question } from "@/data/tests";
import { useI18n, tf } from "@/lib/i18n";

type TranslatedLang = "fr" | "es" | "zh";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedValue?: number;
  onSelect: (value: number) => void;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedValue,
  onSelect,
}: QuestionCardProps) {
  const { t, lang } = useI18n();

  const questionText = lang !== "en" ? (question.i18n?.[lang as TranslatedLang] || question.text) : question.text;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
          {tf(t.testPage.questionOf, { n: questionNumber, total: totalQuestions })}
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
          {questionText}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedValue === option.value;
          const optionLabel = lang !== "en" ? (option.i18n?.[lang as TranslatedLang] || option.label) : option.label;
          return (
            <button
              key={`${option.value}-${option.label}`}
              onClick={() => onSelect(option.value)}
              className={`w-full text-left rounded-xl border-2 px-5 py-4 transition-all duration-200 ${
                isSelected
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400 text-blue-800 dark:text-blue-200 shadow-md"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-5 w-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                >
                  {isSelected && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="font-medium text-sm sm:text-base">{optionLabel}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

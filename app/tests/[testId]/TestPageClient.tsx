"use client";

import { useState } from "react";
import { getTest, calculateScore, getInterpretation } from "@/data/tests";
import { saveResult } from "@/lib/storage";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { ResultCard } from "@/components/ResultCard";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { ArrowLeft, ArrowRight, RotateCcw, History, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { useI18n, tf } from "@/lib/i18n";

export function TestPageClient({ testId }: { testId: string }) {
  const { t, lang } = useI18n();
  const test = getTest(testId);

  type TranslatedLang = "fr" | "es" | "zh";
  const i18nTest = lang !== "en" && test ? test.i18n?.[lang as TranslatedLang] : undefined;
  const testShortName = i18nTest?.shortName || test?.shortName || "";
  const testAbout = i18nTest?.about || test?.about || "";
  const testCategory = i18nTest?.category || test?.category || "";

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [savedResultId, setSavedResultId] = useState<string | null>(null);
  const [started, setStarted] = useState(false);

  if (!test) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.testPage.notFoundTitle}</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">{t.testPage.notFoundText}</p>
        <Link href="/tests" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
          {t.testPage.notFoundLink}
        </Link>
      </div>
    );
  }

  const question = test.questions[currentQuestion];
  const totalQuestions = test.questions.length;
  const answeredCount = Object.keys(answers).length;
  const currentAnswer = answers[question?.id];
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const allAnswered = answeredCount === totalQuestions;

  const handleSelect = (value: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleNext = () => {
    if (isLastQuestion && allAnswered) {
      finishTest();
    } else if (!isLastQuestion) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const finishTest = () => {
    const score = calculateScore(test, answers);
    const interpretation = getInterpretation(test, score);
    if (!interpretation) return;

    const result = saveResult({
      testId: test.id,
      testName: test.shortName,
      score,
      maxScore: test.scoring.maxScore,
      severityLabel: interpretation.label,
      severity: interpretation.severity,
      completedAt: new Date().toISOString(),
      answers,
    });
    setSavedResultId(result.id);
    setShowResult(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResult(false);
    setSavedResultId(null);
  };

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href="/tests"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> {t.testPage.backToTests}
        </Link>

        <div className="animate-slide-up">
          {/* Test header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{test.icon}</span>
            <div>
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-0.5">
                {testCategory} · {test.type === "screening" ? t.tests.typeScreening : t.tests.typeSelf}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">
                {testShortName}
              </h1>
            </div>
          </div>

          {/* About */}
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 mb-5">
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{testAbout}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <FileText className="h-4 w-4" />
                <span>{totalQuestions} {t.tests.qLabel}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>~{test.timeMinutes} {t.tests.minLabel}</span>
              </div>
            </div>
          </div>

          <DisclaimerBanner />

          <button
            onClick={() => setStarted(true)}
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            {t.testPage.begin}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const score = calculateScore(test, answers);
    const interpretation = getInterpretation(test, score);
    if (!interpretation) return null;

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{test.icon}</span>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.testPage.resultsFor}</p>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">{testShortName}</h1>
          </div>
        </div>

        <DisclaimerBanner compact />

        <div className="mt-5">
          <ResultCard test={test} score={score} interpretation={interpretation} />
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRestart}
            className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 text-slate-700 dark:text-slate-300 font-medium py-3 rounded-xl transition-all"
          >
            <RotateCcw className="h-4 w-4" /> {t.testPage.retake}
          </button>
          <Link
            href="/history"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all"
          >
            <History className="h-4 w-4" /> {t.testPage.viewHistory}
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/tests"
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t.testPage.browseMore}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/tests"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> {t.testPage.exit}
        </Link>
        <div className="flex items-center gap-1.5">
          <span className="text-lg">{test.icon}</span>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400 truncate max-w-[200px]">
            {testShortName}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <ProgressBar current={currentQuestion + 1} total={totalQuestions} />
      </div>

      {/* Disclaimer compact */}
      <div className="mb-6">
        <DisclaimerBanner compact />
      </div>

      {/* Question */}
      <div className="min-h-[300px]">
        <QuestionCard
          key={question.id}
          question={question}
          questionNumber={currentQuestion + 1}
          totalQuestions={totalQuestions}
          selectedValue={currentAnswer}
          onSelect={handleSelect}
        />
      </div>

      {/* Navigation */}
      <div className="mt-8 flex gap-3">
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-300 dark:hover:border-slate-500 transition-all text-sm"
        >
          <ArrowLeft className="h-4 w-4" /> {t.testPage.prev}
        </button>

        <button
          onClick={handleNext}
          disabled={currentAnswer === undefined}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all text-sm ${
            currentAnswer !== undefined
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
              : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isLastQuestion ? (
            <>{t.testPage.seeResults} <ArrowRight className="h-4 w-4" /></>
          ) : (
            <>{t.testPage.next} <ArrowRight className="h-4 w-4" /></>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
        {tf(t.testPage.answeredOf, { n: answeredCount, total: totalQuestions })}
      </p>
    </div>
  );
}

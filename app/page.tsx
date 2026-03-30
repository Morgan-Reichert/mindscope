"use client";

import Link from "next/link";
import { ArrowRight, Shield, BookOpen, BarChart2, Lock, ClipboardList } from "lucide-react";
import { tests } from "@/data/tests";
import { learnTopics } from "@/data/learn";
import { useI18n } from "@/lib/i18n";

type TranslatedLang = "fr" | "es" | "zh";

export default function HomePage() {
  const { t, lang } = useI18n();
  const featuredTests = tests.slice(0, 6);
  const featuredTopics = learnTopics.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-full px-4 py-1.5 text-sm text-blue-700 dark:text-blue-300 font-medium mb-6">
          <Shield className="h-4 w-4" />
          {t.home.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-50 leading-tight mb-5">
          {t.home.headline1}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-300">
            {t.home.headline2}
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
          {t.home.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tests"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            {t.home.startTest}
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/learn"
            className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold px-7 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
          >
            <BookOpen className="h-5 w-5" />
            {t.home.learnMore}
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto mb-14">
        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-4 text-sm text-amber-800 dark:text-amber-300 text-center">
          {t.home.importantNote}
        </div>
      </div>

      {/* Features */}
      <section className="grid sm:grid-cols-3 gap-5 mb-16">
        {[
          { icon: ClipboardList, color: "blue", title: t.home.feat1Title, description: t.home.feat1Desc },
          { icon: BookOpen, color: "green", title: t.home.feat2Title, description: t.home.feat2Desc },
          { icon: BarChart2, color: "purple", title: t.home.feat3Title, description: t.home.feat3Desc },
        ].map(({ icon: Icon, color, title, description }) => (
          <div
            key={title}
            className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
          >
            <div
              className={`h-10 w-10 rounded-xl ${
                color === "blue"
                  ? "bg-blue-100 dark:bg-blue-900/40"
                  : color === "green"
                  ? "bg-green-100 dark:bg-green-900/40"
                  : "bg-purple-100 dark:bg-purple-900/40"
              } flex items-center justify-center mb-4`}
            >
              <Icon
                className={`h-5 w-5 ${
                  color === "blue"
                    ? "text-blue-600 dark:text-blue-400"
                    : color === "green"
                    ? "text-green-600 dark:text-green-400"
                    : "text-purple-600 dark:text-purple-400"
                }`}
              />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
          </div>
        ))}
      </section>

      {/* Featured Tests */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t.home.popularTests}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t.tests.subtitle}</p>
          </div>
          <Link
            href="/tests"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            {t.home.viewAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTests.map((test) => (
            <Link
              key={test.id}
              href={`/tests/${test.id}`}
              className="group rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{test.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lang !== "en" ? (test.i18n?.[lang as TranslatedLang]?.shortName || test.shortName) : test.shortName}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {test.timeMinutes} {t.tests.minLabel} · {test.questions.length} {t.tests.qLabel}
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{lang !== "en" ? (test.i18n?.[lang as TranslatedLang]?.description || test.description) : test.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Learn Section Preview */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t.home.learnSection}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{t.home.learnSub}</p>
          </div>
          <Link
            href="/learn"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            {t.home.viewAll} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTopics.map((topic) => (
            <Link
              key={topic.id}
              href={`/learn/${topic.id}`}
              className="group rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:-translate-y-0.5"
            >
              <div className="text-3xl mb-3">{topic.icon}</div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {lang !== "en" ? (topic.i18n?.[lang as TranslatedLang]?.title || topic.title) : topic.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{lang !== "en" ? (topic.i18n?.[lang as TranslatedLang]?.subtitle || topic.subtitle) : topic.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Privacy note */}
      <section className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-800 dark:to-slate-900 p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">{t.home.privacyTitle}</h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">{t.home.privacyDesc}</p>
      </section>
    </div>
  );
}

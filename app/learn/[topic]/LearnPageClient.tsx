"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { getLearnTopic, learnTopics } from "@/data/learn";
import { tests } from "@/data/tests";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Stethoscope } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Lang } from "@/lib/translations";

const colorClasses: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  blue: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-700", badge: "bg-blue-100 text-blue-800 dark:bg-blue-800/40 dark:text-blue-300" },
  purple: { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-700", badge: "bg-purple-100 text-purple-800 dark:bg-purple-800/40 dark:text-purple-300" },
  orange: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-300", border: "border-orange-200 dark:border-orange-700", badge: "bg-orange-100 text-orange-800 dark:bg-orange-800/40 dark:text-orange-300" },
  amber: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-700", badge: "bg-amber-100 text-amber-800 dark:bg-amber-800/40 dark:text-amber-300" },
  yellow: { bg: "bg-yellow-50 dark:bg-yellow-900/20", text: "text-yellow-700 dark:text-yellow-300", border: "border-yellow-200 dark:border-yellow-700", badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/40 dark:text-yellow-300" },
  green: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-300", border: "border-green-200 dark:border-green-700", badge: "bg-green-100 text-green-800 dark:bg-green-800/40 dark:text-green-300" },
};

export function LearnPageClient({ topicId }: { topicId: string }) {
  const { t, lang } = useI18n();
  const topic = getLearnTopic(topicId);

  if (!topic) notFound();

  const colors = colorClasses[topic.color] || colorClasses.blue;
  const relatedTests = topic.relatedTests.map((id) => tests.find((t) => t.id === id)).filter(Boolean);
  const otherTopics = learnTopics.filter((t) => t.id !== topic.id);

  // Use i18n content if available (en is the default, i18n only has fr/es/zh)
  type TranslatedLang = "fr" | "es" | "zh";
  const i18nContent = lang !== "en" ? topic.i18n?.[lang as TranslatedLang] : undefined;
  const title = i18nContent?.title || topic.title;
  const subtitle = i18nContent?.subtitle || topic.subtitle;
  const overview = i18nContent?.overview || topic.overview;

  const treatmentTypeLabels: Record<string, string> = {
    therapy: t.learn.typeTherapy,
    lifestyle: t.learn.typeLifestyle,
    medical: t.learn.typeMedical,
    "self-help": t.learn.typeSelf,
  };

  const treatmentTypeStyles: Record<string, string> = {
    therapy: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    lifestyle: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    medical: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "self-help": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 animate-slide-up">
      <Link
        href="/learn"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> {t.learn.back}
      </Link>

      {/* Hero */}
      <div className={`rounded-2xl border ${colors.bg} ${colors.border} p-8 mb-8`}>
        <div className="text-5xl mb-4">{topic.icon}</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
          {title}
        </h1>
        <p className={`text-lg font-medium ${colors.text} mb-4`}>{subtitle}</p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          {overview}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Symptoms */}
          <section className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-5 flex items-center gap-2">
              <span>🔍</span> {t.learn.symptomsTitle}
            </h2>
            <div className="space-y-5">
              {topic.symptoms.map((group) => (
                <div key={group.title}>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-2 uppercase tracking-wide">
                    {group.title}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle className="h-4 w-4 text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Causes */}
          <section className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-5 flex items-center gap-2">
              <span>🔬</span> {t.learn.causesTitle}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {topic.causes.map((cause) => (
                <div key={cause.title} className="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1.5">
                    {cause.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cause.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Treatment */}
          <section className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2 flex items-center gap-2">
              <Stethoscope className="h-5 w-5" /> {t.learn.treatmentsTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 italic">
              {t.learn.treatmentNote}
            </p>
            <div className="space-y-3">
              {topic.treatments.map((treatment) => (
                <div
                  key={treatment.name}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 p-4"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                      {treatment.name}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${treatmentTypeStyles[treatment.type]}`}>
                      {treatmentTypeLabels[treatment.type] || treatment.type.replace("-", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {treatment.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Myths vs Facts */}
          <section className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-5 flex items-center gap-2">
              <span>💡</span> {t.learn.mythsTitle}
            </h2>
            <div className="space-y-4">
              {topic.myths.map((item, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 px-4 py-3">
                    <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700 dark:text-red-300 font-medium">{item.myth}</p>
                  </div>
                  <div className="flex items-start gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-3">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-700 dark:text-green-300">{item.fact}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Related tests */}
          {relatedTests.length > 0 && (
            <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4 text-sm uppercase tracking-wide">
                {t.learn.relatedTests}
              </h3>
              <div className="space-y-2">
                {relatedTests.map((test) => test && (
                  <Link
                    key={test.id}
                    href={`/tests/${test.id}`}
                    className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-transparent hover:border-blue-200 dark:hover:border-blue-700 transition-all group"
                  >
                    <span className="text-lg">{test.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                        {test.shortName}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{test.timeMinutes} {t.tests.minLabel}</p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-blue-500 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {topic.resources.length > 0 && (
            <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4 text-sm uppercase tracking-wide">
                {t.learn.resources}
              </h3>
              <div className="space-y-3">
                {topic.resources.map((resource) => (
                  <div key={resource.name} className="text-sm">
                    <p className="font-medium text-slate-700 dark:text-slate-300">{resource.name}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{resource.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other topics */}
          <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4 text-sm uppercase tracking-wide">
              {t.learn.otherTopics}
            </h3>
            <div className="space-y-1">
              {otherTopics.map((tp) => (
                <Link
                  key={tp.id}
                  href={`/learn/${tp.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                >
                  <span>{tp.icon}</span>
                  <span>{tp.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Important note */}
          <div className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-4 text-xs text-amber-800 dark:text-amber-300">
            <p className="font-semibold mb-1">{t.learn.eduOnly}</p>
            <p>{t.learn.eduOnlyText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

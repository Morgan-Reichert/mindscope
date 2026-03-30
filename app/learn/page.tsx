"use client";

import { useState } from "react";
import Link from "next/link";
import { learnTopics } from "@/data/learn";
import { useI18n } from "@/lib/i18n";
import { Search, Clock } from "lucide-react";

export default function LearnLibraryPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");

  const filtered = learnTopics.filter((topic) =>
    topic.title.toLowerCase().includes(search.toLowerCase()) ||
    topic.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
          {t.learn.libraryTitle}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          {learnTopics.length} {t.learn.librarySubtitle.toLowerCase()}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder={t.learn.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((topic) => (
            <Link
              key={topic.id}
              href={`/learn/${topic.id}`}
              className="group rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all hover:-translate-y-0.5"
            >
              <div className="text-3xl mb-3">{topic.icon}</div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                {topic.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">{topic.subtitle}</p>
              <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                <Clock className="h-3 w-3" />
                <span>{topic.readTime} {t.learn.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400 dark:text-slate-500">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">{t.learn.noResults}</p>
          <p className="text-sm mt-1">{t.learn.noResultsHint}</p>
        </div>
      )}
    </div>
  );
}

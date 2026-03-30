"use client";

import { useState } from "react";
import { tests } from "@/data/tests";
import { TestCard } from "@/components/TestCard";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Search } from "lucide-react";
import { useI18n, tf } from "@/lib/i18n";

type TranslatedLang = "fr" | "es" | "zh";

const categories = ["All", ...Array.from(new Set(tests.map((t) => t.category)))];

export default function TestsPage() {
  const { t, lang } = useI18n();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const getCategoryTranslation = (cat: string) => {
    if (cat === "All") return t.tests.all;
    if (lang === "en") return cat;
    // Find a test with this category and use its i18n category
    const testWithCat = tests.find((te) => te.category === cat);
    if (testWithCat) {
      return testWithCat.i18n?.[lang as TranslatedLang]?.category || cat;
    }
    return cat;
  };

  const getTranslatedName = (te: typeof tests[0]) => {
    if (lang === "en") return te.shortName;
    return te.i18n?.[lang as TranslatedLang]?.shortName || te.shortName;
  };

  const getTranslatedDesc = (te: typeof tests[0]) => {
    if (lang === "en") return te.description;
    return te.i18n?.[lang as TranslatedLang]?.description || te.description;
  };

  const getTranslatedCat = (te: typeof tests[0]) => {
    if (lang === "en") return te.category;
    return te.i18n?.[lang as TranslatedLang]?.category || te.category;
  };

  const filtered = tests.filter((test) => {
    const matchesSearch =
      getTranslatedName(test).toLowerCase().includes(search.toLowerCase()) ||
      getTranslatedDesc(test).toLowerCase().includes(search.toLowerCase()) ||
      getTranslatedCat(test).toLowerCase().includes(search.toLowerCase()) ||
      test.shortName.toLowerCase().includes(search.toLowerCase()) ||
      test.description.toLowerCase().includes(search.toLowerCase()) ||
      test.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || test.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
          {t.tests.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          {tests.length} {t.tests.subtitle}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mb-6">
        <DisclaimerBanner />
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder={t.tests.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${
                category === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600"
              }`}
            >
              {getCategoryTranslation(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Category pills - rest */}
      {categories.length > 5 && (
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.slice(5).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${
                category === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600"
              }`}
            >
              {getCategoryTranslation(cat)}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-4">
        {tf(t.tests.showing, { n: filtered.length, total: tests.length })}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400 dark:text-slate-500">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">{t.tests.noResults}</p>
          <p className="text-sm mt-1">{t.tests.noResultsHint}</p>
        </div>
      )}
    </div>
  );
}

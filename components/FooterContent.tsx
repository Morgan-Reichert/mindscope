"use client";

import { useI18n } from "@/lib/i18n";
import { getEmergency } from "@/lib/emergency";
import { Lang } from "@/lib/translations";

export function FooterContent() {
  const { t, lang, country } = useI18n();
  const info = getEmergency(country);
  const countryName = info.country[lang as Lang] || info.country.en;
  const crisisResource = info.resources.find((r) => r.type === "suicide" || r.type === "crisis");

  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-700 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          <strong>MindScope</strong> — {t.footer.disclaimer}
        </p>
        {crisisResource && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            {countryName} — {t.crisis.crisisLine}: <span className="font-semibold text-slate-500 dark:text-slate-400">{crisisResource.number}</span>
            {info.generalEmergency && (
              <> · {t.crisis.emergency}: <span className="font-semibold text-slate-500 dark:text-slate-400">{info.generalEmergency}</span></>
            )}
          </p>
        )}
      </div>
    </footer>
  );
}

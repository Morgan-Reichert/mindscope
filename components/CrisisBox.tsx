"use client";

import { Phone, MessageSquare, Shield } from "lucide-react";
import { getEmergency } from "@/lib/emergency";
import { useI18n } from "@/lib/i18n";
import { Lang } from "@/lib/translations";

const typeIcons: Record<string, React.ReactNode> = {
  emergency: <Shield className="h-3.5 w-3.5" />,
  crisis: <Phone className="h-3.5 w-3.5" />,
  suicide: <Phone className="h-3.5 w-3.5" />,
  text: <MessageSquare className="h-3.5 w-3.5" />,
  chat: <MessageSquare className="h-3.5 w-3.5" />,
};

const typeColors: Record<string, string> = {
  emergency: "text-red-600 dark:text-red-400",
  crisis: "text-blue-600 dark:text-blue-400",
  suicide: "text-purple-600 dark:text-purple-400",
  text: "text-green-600 dark:text-green-400",
  chat: "text-green-600 dark:text-green-400",
};

export function CrisisBox() {
  const { t, lang, country } = useI18n();
  const info = getEmergency(country);
  const countryName = info.country[lang as Lang] || info.country.en;

  return (
    <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-red-800 dark:text-red-300 flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4" />
          {t.crisis.title} — {countryName}
        </h3>
      </div>

      {/* Emergency numbers */}
      <div className="flex flex-wrap gap-2 mb-3">
        {info.generalEmergency && (
          <div className="flex items-center gap-1.5 bg-red-100 dark:bg-red-800/30 text-red-700 dark:text-red-300 px-2.5 py-1 rounded-lg text-xs font-semibold">
            <Shield className="h-3 w-3" />
            {t.crisis.emergency}: {info.generalEmergency}
          </div>
        )}
        {info.ambulance && info.ambulance !== info.generalEmergency && (
          <div className="flex items-center gap-1.5 bg-orange-100 dark:bg-orange-800/30 text-orange-700 dark:text-orange-300 px-2.5 py-1 rounded-lg text-xs font-semibold">
            <Phone className="h-3 w-3" />
            {t.crisis.ambulance}: {info.ambulance}
          </div>
        )}
        {info.police && info.police !== info.generalEmergency && (
          <div className="flex items-center gap-1.5 bg-blue-100 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-lg text-xs font-semibold">
            <Shield className="h-3 w-3" />
            {t.crisis.police}: {info.police}
          </div>
        )}
      </div>

      {/* Resources */}
      <div className="space-y-2">
        {info.resources.slice(0, 3).map((r) => (
          <div key={r.number} className="flex items-start gap-2">
            <span className={`mt-0.5 flex-shrink-0 ${typeColors[r.type]}`}>
              {typeIcons[r.type]}
            </span>
            <div className="min-w-0">
              <span className="text-xs text-slate-600 dark:text-slate-300">{r.name}</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 ml-1.5">{r.number}</span>
              {r.available && (
                <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">({r.available})</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

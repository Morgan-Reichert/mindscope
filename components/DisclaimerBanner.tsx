"use client";

import { AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface DisclaimerBannerProps {
  compact?: boolean;
}

export function DisclaimerBanner({ compact = false }: DisclaimerBannerProps) {
  const { t } = useI18n();

  if (compact) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-3 py-2 text-xs text-amber-800 dark:text-amber-300">
        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
        <span>{t.disclaimer.compact}</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800 dark:text-amber-300">
          <p className="font-semibold mb-1">{t.disclaimer.title}</p>
          <p>{t.disclaimer.full}</p>
        </div>
      </div>
    </div>
  );
}

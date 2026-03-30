"use client";

import { useState, useEffect } from "react";
import { MapPin, Shield, ChevronDown } from "lucide-react";
import { emergencyData, countryGroups } from "@/lib/emergency";
import { useI18n } from "@/lib/i18n";
import { Lang } from "@/lib/translations";

interface GeoModalProps {
  onClose: () => void;
}

export function GeoModal({ onClose }: GeoModalProps) {
  const { t, lang, country, setCountry } = useI18n();
  const [selected, setSelected] = useState(country || "XX");
  const [openRegion, setOpenRegion] = useState<string | null>("europe");

  const handleConfirm = () => {
    setCountry(selected);
    onClose();
  };

  const handleSkip = () => {
    setCountry("XX");
    onClose();
  };

  // Group countries by region
  const grouped = countryGroups.map((g) => ({
    region: g.region,
    label: t.geo_modal.regions[g.region] || g.region,
    countries: g.countries.map((code) => emergencyData.find((e) => e.countryCode === code)!).filter(Boolean),
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{t.geo.title}</h2>
              <p className="text-blue-100 text-sm">{t.geo.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {/* Why we ask */}
          <div className="mb-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 p-3 flex items-start gap-2">
            <Shield className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-700 dark:text-blue-300">
              <span className="font-semibold">{t.geo.whyAsk} </span>{t.geo.whyText}
            </div>
          </div>

          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">{t.geo.selectLabel}</p>

          {/* Country groups */}
          <div className="space-y-2">
            {grouped.map((group) => (
              <div key={group.region} className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <button
                  onClick={() => setOpenRegion(openRegion === group.region ? null : group.region)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-700/50 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <span>{group.label}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openRegion === group.region ? "rotate-180" : ""}`} />
                </button>
                {openRegion === group.region && (
                  <div className="p-2 space-y-1">
                    {group.countries.map((country) => {
                      if (!country) return null;
                      const name = country.country[lang as Lang] || country.country.en;
                      return (
                        <button
                          key={country.countryCode}
                          onClick={() => setSelected(country.countryCode)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2 ${
                            selected === country.countryCode
                              ? "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 font-medium"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                          }`}
                        >
                          <span className={`h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            selected === country.countryCode
                              ? "border-blue-500 bg-blue-500"
                              : "border-slate-300 dark:border-slate-600"
                          }`}>
                            {selected === country.countryCode && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </span>
                          {name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-700 flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            {t.geo.skipBtn}
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            {t.geo.confirmBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

export function GeoModalTrigger() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenGeo = localStorage.getItem("mindscope_country");
    if (!hasSeenGeo) {
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;
  return <GeoModal onClose={() => setShow(false)} />;
}

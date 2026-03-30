"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, Translations, translations } from "./translations";

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  country: string;
  setCountry: (code: string) => void;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
  country: "XX",
  setCountry: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [country, setCountryState] = useState("XX");

  useEffect(() => {
    // Language
    const storedLang = localStorage.getItem("mindscope_lang") as Lang | null;
    if (storedLang && translations[storedLang]) {
      setLangState(storedLang);
    } else {
      const browser = navigator.language.slice(0, 2).toLowerCase();
      const detected = (["en", "fr", "es", "zh"].includes(browser) ? browser : "en") as Lang;
      setLangState(detected);
    }
    // Country
    const storedCountry = localStorage.getItem("mindscope_country");
    if (storedCountry) setCountryState(storedCountry);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("mindscope_lang", l);
  };

  const setCountry = (code: string) => {
    setCountryState(code);
    localStorage.setItem("mindscope_country", code);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang], country, setCountry }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

/** Fill template placeholders: tf("Hello {name}", { name: "World" }) */
export function tf(template: string, vars: Record<string, string | number>): string {
  return Object.entries(vars).reduce(
    (str, [k, v]) => str.replaceAll(`{${k}}`, String(v)),
    template
  );
}

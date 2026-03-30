"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain, ClipboardList, BookOpen, History,
  Sun, Moon, MapPin, MessageCircle, Home,
} from "lucide-react";
import { useState, useEffect } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { GeoModal } from "./GeoModal";
import { useI18n } from "@/lib/i18n";
import { useChatContext } from "@/lib/chat-context";

export function Navigation() {
  const pathname = usePathname();
  const { t } = useI18n();
  const { chatOpen, setChatOpen } = useChatContext();
  const [darkMode, setDarkMode] = useState(false);
  const [showGeo, setShowGeo] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("mindscope_dark");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "true" : prefersDark;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("mindscope_dark", String(next));
    document.documentElement.classList.toggle("dark", next);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinks = [
    { href: "/tests", label: t.nav.tests, icon: ClipboardList },
    { href: "/learn", label: t.nav.learn, icon: BookOpen },
    { href: "/history", label: t.nav.history, icon: History },
  ];

  // Bottom tab items (mobile)
  const tabItems = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: "/tests", label: t.nav.tests, icon: ClipboardList },
    { href: "/learn", label: t.nav.learn, icon: BookOpen },
    { href: "/history", label: t.nav.history, icon: History },
  ];

  return (
    <>
      {/* ── Desktop top nav (hidden on mobile) ──────────────────────────── */}
      <nav className="hidden sm:block sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Brain className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg text-slate-800 dark:text-slate-100 tracking-tight">
                Mind<span className="text-blue-600 dark:text-blue-400">Scope</span>
              </span>
            </Link>

            {/* Links */}
            <div className="flex items-center gap-1 flex-1 justify-center">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(href)
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <LanguageSwitcher />
              <button
                onClick={() => setShowGeo(true)}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Change location"
              >
                <MapPin className="h-5 w-5" />
              </button>
              <button
                onClick={toggleDark}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setChatOpen(!chatOpen)}
                className="flex p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
                aria-label="Open chat"
              >
                <MessageCircle className="h-5 w-5" />
                {chatOpen && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile top utility bar ───────────────────────────────────────── */}
      {/* Outer div handles safe-area-inset-top (notch), inner div is the 48px bar */}
      <div
        className="sm:hidden sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-700/80"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="flex items-center justify-between px-4 h-12">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-1.5">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Brain className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-sm text-slate-800 dark:text-slate-100 tracking-tight">
              Mind<span className="text-blue-600 dark:text-blue-400">Scope</span>
            </span>
          </Link>

          {/* Utility controls */}
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <button
              onClick={() => setShowGeo(true)}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Change location"
            >
              <MapPin className="h-4 w-4" />
            </button>
            <button
              onClick={toggleDark}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── iOS-style bottom tab bar (mobile only) ──────────────────────── */}
      <div
        className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          // Force GPU layer so iOS PWA keyboard doesn't displace fixed elements
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
        }}
      >
        <div className="flex items-stretch h-14">
          {tabItems.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95"
              >
                <div className={`p-1 rounded-xl transition-all ${active ? "bg-blue-50 dark:bg-blue-900/30" : ""}`}>
                  <Icon
                    className={`h-5 w-5 transition-colors ${
                      active ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"
                    }`}
                    strokeWidth={active ? 2.5 : 2}
                  />
                </div>
                <span className={`text-[10px] font-medium transition-colors leading-none ${
                  active ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"
                }`}>
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Chat tab */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95"
          >
            <div className={`p-1 rounded-xl transition-all ${chatOpen ? "bg-blue-50 dark:bg-blue-900/30" : ""}`}>
              <MessageCircle
                className={`h-5 w-5 transition-colors ${
                  chatOpen ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"
                }`}
                strokeWidth={chatOpen ? 2.5 : 2}
              />
            </div>
            <span className={`text-[10px] font-medium transition-colors leading-none ${
              chatOpen ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"
            }`}>
              Assistant
            </span>
          </button>
        </div>
      </div>

      {showGeo && <GeoModal onClose={() => setShowGeo(false)} />}
    </>
  );
}

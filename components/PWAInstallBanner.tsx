"use client";

/**
 * PWAInstallBanner
 *
 * Handles 3 distinct install scenarios:
 *  1. iOS in-app browser (FB, Instagram, etc.)  → "Open in Safari" redirect
 *  2. iOS Safari                                → "Share → Add to Home Screen" instructions
 *  3. Android / Chrome / Edge                  → native beforeinstallprompt button
 */

import { useEffect, useRef, useState } from "react";
import { X, Download, Share2, ArrowUpFromLine } from "lucide-react";

const STORAGE_KEY  = "mindscope_pwa";
const DISMISS_DAYS = 30;  // re-show after 30 days of dismissal

interface PWAState {
  visits?: number;
  dismissedAt?: number;
  installed?: boolean;
}

function readState(): PWAState {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}"); }
  catch { return {}; }
}
function writeState(s: PWAState) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

type Mode = "in-app-ios" | "safari-ios" | "android";

// ── Browser detection helpers ────────────────────────────────────────────────
function detect(): Mode | null {
  if (typeof window === "undefined") return null;

  // Already installed as PWA
  if (window.matchMedia("(display-mode: standalone)").matches) return null;
  if ((window.navigator as any).standalone === true) return null;

  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod/i.test(ua) && !("MSStream" in window);

  if (!isIOS) {
    // Android / Desktop Chrome / Edge — beforeinstallprompt will handle it
    return "android";
  }

  // Is this real Safari?
  // Safari UA contains "Safari" and NOT any of the in-app / alternative browser tokens
  const isRealSafari = /safari/i.test(ua) &&
    !/crios|fxios|opios|fbav|fban|instagram|twitter|linkedin|snapchat|tiktok|line|wechat|micromessenger/i.test(ua);

  if (isRealSafari) return "safari-ios";
  return "in-app-ios";
}

// ── Detect which in-app browser for tailored instructions ────────────────────
function detectInAppBrowser(): "facebook" | "instagram" | "chrome" | "other" {
  const ua = navigator.userAgent;
  if (/FBAN|FBAV/i.test(ua)) return "facebook";
  if (/Instagram/i.test(ua)) return "instagram";
  if (/CriOS/i.test(ua))     return "chrome";
  return "other";
}

// ── Component ────────────────────────────────────────────────────────────────
export function PWAInstallBanner() {
  const [visible, setVisible] = useState(false);
  const [mode,    setMode]    = useState<Mode | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const promptRef = useRef<any>(null);

  useEffect(() => {
    const m = detect();
    if (!m) return;

    if (m === "in-app-ios") {
      // Show immediately (no visit counter — they NEED to know to switch to Safari)
      const timer = setTimeout(() => { setMode("in-app-ios"); setVisible(true); }, 1800);
      return () => clearTimeout(timer);
    }

    // For safari-ios and android: respect visit counter + dismiss cooldown
    const state = readState();
    if (state.installed) return;
    if (state.dismissedAt && (Date.now() - state.dismissedAt) / 86_400_000 < DISMISS_DAYS) return;

    const visits = (state.visits ?? 0) + 1;
    writeState({ ...state, visits });

    if (m === "safari-ios") {
      // Show from 1st real Safari visit
      const timer = setTimeout(() => { setMode("safari-ios"); setVisible(true); }, 3500);
      return () => clearTimeout(timer);
    }

    // android: wait for the beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      promptRef.current = e;
      if (visits >= 2) { setMode("android"); setVisible(true); }
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Track actual installation
  useEffect(() => {
    const handler = () => {
      writeState({ ...readState(), installed: true });
      setVisible(false);
    };
    window.addEventListener("appinstalled", handler);
    return () => window.removeEventListener("appinstalled", handler);
  }, []);

  const handleAndroidInstall = async () => {
    if (!promptRef.current) return;
    promptRef.current.prompt();
    const { outcome } = await promptRef.current.userChoice;
    if (outcome === "accepted") writeState({ ...readState(), installed: true });
    setVisible(false);
  };

  const handleOpenInSafari = () => {
    // x-safari-https:// forces iOS to hand the URL to Safari
    window.location.href = "x-safari-" + window.location.href;
  };

  const handleDismiss = () => {
    writeState({ ...readState(), dismissedAt: Date.now() });
    setVisible(false);
  };

  if (!visible || !mode) return null;

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const inApp = mode === "in-app-ios" ? detectInAppBrowser() : null;

  // ── in-app browser (iOS): redirect to Safari ─────────────────────────────
  if (mode === "in-app-ios") {
    return (
      <div className="fixed bottom-[5.5rem] sm:bottom-6 inset-x-3 z-[9990]">
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-orange-200 dark:border-orange-800/50
          shadow-[0_8px_40px_rgba(0,0,0,0.2)] overflow-hidden animate-sheet-up">

          {/* Orange accent — signals "action required" */}
          <div className="h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400" />

          <div className="p-4">
            <div className="flex items-start gap-3">
              {/* App icon */}
              <div className="flex-shrink-0 h-12 w-12 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${base}/icon.svg`} alt="MindScope" className="h-full w-full" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                  Ouvrir dans Safari
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  Pour installer MindScope sur votre écran d&rsquo;accueil, vous devez ouvrir ce lien dans <strong>Safari</strong>.
                </p>
              </div>

              <button onClick={handleDismiss} aria-label="Fermer"
                className="flex-shrink-0 h-7 w-7 flex items-center justify-center rounded-full text-slate-400
                  hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Primary action: redirect to Safari */}
            <button onClick={handleOpenInSafari}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white text-sm font-semibold
                shadow transition-all">
              <ArrowUpFromLine className="h-4 w-4" />
              Ouvrir dans Safari
            </button>

            {/* Manual fallback instructions */}
            <div className="mt-2.5 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-xs text-slate-500 dark:text-slate-400">
              {inApp === "instagram" && (
                <span>Sur Instagram : appuyez sur <strong>···</strong> (en bas à droite) puis <strong>Ouvrir dans le navigateur</strong>.</span>
              )}
              {inApp === "facebook" && (
                <span>Sur Facebook : appuyez sur <strong>···</strong> (en bas à droite) puis <strong>Ouvrir dans Safari</strong>.</span>
              )}
              {inApp === "chrome" && (
                <span>Sur Chrome : appuyez sur <strong>···</strong> (en haut à droite) puis <strong>Ouvrir dans Safari</strong>.</span>
              )}
              {inApp === "other" && (
                <span>Cherchez le menu <strong>···</strong> ou <strong>⋮</strong> et sélectionnez <strong>Ouvrir dans Safari</strong>.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Safari iOS: Add to Home Screen instructions ───────────────────────────
  if (mode === "safari-ios") {
    return (
      <div className="fixed bottom-[5.5rem] sm:bottom-6 inset-x-3 z-[9990]">
        <div className="rounded-2xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800/50
          shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden animate-sheet-up">

          <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-12 w-12 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${base}/icon.svg`} alt="MindScope" className="h-full w-full" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                  Installer MindScope
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  Accès rapide depuis votre écran d&rsquo;accueil, fonctionne même hors ligne.
                </p>
              </div>

              <button onClick={handleDismiss} aria-label="Fermer"
                className="flex-shrink-0 h-7 w-7 flex items-center justify-center rounded-full text-slate-400
                  hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Step-by-step instructions */}
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">1</span>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Appuyez sur l&rsquo;icône{" "}
                  <Share2 className="h-3.5 w-3.5 inline -mt-0.5 text-blue-500" />
                  {" "}<strong>Partager</strong> en bas de Safari
                </p>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">2</span>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Faites défiler et appuyez sur{" "}
                  <strong>«&nbsp;Sur l&rsquo;écran d&rsquo;accueil&nbsp;»</strong>
                </p>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">3</span>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Appuyez sur <strong>Ajouter</strong> — c&rsquo;est tout !
                </p>
              </div>
            </div>

            <button onClick={handleDismiss}
              className="mt-3 w-full py-2 rounded-xl text-xs text-slate-400 hover:text-slate-600
                dark:hover:text-slate-300 border border-slate-200 dark:border-slate-600 transition-colors">
              Plus tard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Android / Chrome: native install prompt ───────────────────────────────
  return (
    <div className="fixed bottom-6 inset-x-3 z-[9990]">
      <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
        shadow-[0_8px_40px_rgba(0,0,0,0.18)] overflow-hidden animate-sheet-up">

        <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        <div className="flex items-center gap-3 p-4">
          <div className="flex-shrink-0 h-12 w-12 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${base}/icon.svg`} alt="MindScope" className="h-full w-full" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">Installer MindScope</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Rapide, privé, sans App Store.
            </p>
            <button onClick={handleAndroidInstall}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl
                bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold
                shadow transition-all">
              <Download className="h-3.5 w-3.5" />
              Installer
            </button>
          </div>

          <button onClick={handleDismiss} aria-label="Fermer"
            className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full text-slate-400
              hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

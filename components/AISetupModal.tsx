"use client";

import { useAI } from "@/lib/ai-context";
import { MODEL_SIZE } from "@/lib/ai-service";
import { Brain, Cloud, Shield, Wifi, WifiOff, CheckCircle2, X, Cpu } from "lucide-react";

export function AISetupModal() {
  const { showSetup, closeSetup, setMode, canUseLocal, status, progress, progressText } = useAI();

  if (!showSetup) return null;

  const downloading = status === "downloading" || status === "loading";

  return (
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => !downloading && closeSetup()}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-800 shadow-2xl overflow-hidden animate-sheet-up">

        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white text-base">Intelligence Artificielle</h2>
                <p className="text-blue-200 text-xs">Choisissez comment l&rsquo;IA fonctionne</p>
              </div>
            </div>
            {!downloading && (
              <button onClick={closeSetup}
                className="h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="p-5 space-y-3">

          {/* Download in progress */}
          {downloading && (
            <div className="rounded-2xl border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Cpu className="h-4 w-4 text-white animate-pulse" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                    {status === "loading" ? "Chargement du modèle…" : "Téléchargement en cours…"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-[260px]">
                    {progressText || "Llama 3.2 · 1B paramètres"}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-500">{progress}%</span>
                <span className="text-xs text-slate-400">
                  {progress > 0 ? `~${Math.round((870 * progress) / 100)} / 870 MB` : MODEL_SIZE}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
                Téléchargement unique · Mis en cache dans votre navigateur
              </p>
            </div>
          )}

          {/* Options (hide during download) */}
          {!downloading && (
            <>
              {/* Option 1: Local AI */}
              <div className={`rounded-2xl border-2 p-4 ${
                canUseLocal
                  ? "border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10"
                  : "border-slate-200 dark:border-slate-700 opacity-50"
              }`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    canUseLocal ? "bg-blue-600" : "bg-slate-400"
                  }`}>
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                        IA Locale
                      </p>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        canUseLocal
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                      }`}>
                        {canUseLocal ? "WebGPU ✓" : "Non disponible"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Tourne sur votre appareil — aucune donnée envoyée
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mb-3 text-xs text-slate-600 dark:text-slate-400">
                  {[
                    { icon: <Shield className="h-3 w-3" />, text: "100% privé" },
                    { icon: <WifiOff className="h-3 w-3" />, text: "Hors ligne" },
                    { icon: <Cpu className="h-3 w-3" />, text: "Llama 3.2 · 1B" },
                    { icon: <Cloud className="h-3 w-3 line-through opacity-50" />, text: `${MODEL_SIZE} (1 fois)` },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-1.5">
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setMode("local")}
                  disabled={!canUseLocal}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                    canUseLocal
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {canUseLocal ? "Télécharger et utiliser (870 MB)" : "WebGPU non disponible"}
                </button>
              </div>

              {/* Option 2: Mistral API */}
              <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/10 p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-500 flex items-center justify-center flex-shrink-0">
                    <Cloud className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
                      IA en ligne · Mistral AI
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Connexion requise · Réponses rapides
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mb-3 text-xs text-slate-600 dark:text-slate-400">
                  {[
                    { icon: <Wifi className="h-3 w-3" />, text: "Connexion internet" },
                    { icon: <CheckCircle2 className="h-3 w-3" />, text: "Sans téléchargement" },
                    { icon: <CheckCircle2 className="h-3 w-3" />, text: "Haute qualité" },
                    { icon: <Cloud className="h-3 w-3" />, text: "Mistral AI (France)" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-1.5">
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setMode("api")}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all active:scale-[0.98]"
                >
                  Utiliser Mistral AI
                </button>
              </div>

              <p className="text-center text-xs text-slate-400 dark:text-slate-500 pt-1">
                Vous pourrez changer ce choix à tout moment dans les paramètres.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

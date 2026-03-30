"use client";

import {
  createContext, useContext, useEffect, useState,
  useCallback, useRef, ReactNode,
} from "react";
import * as AI from "./ai-service";

// ── Types ──────────────────────────────────────────────────────────────────────
interface AIContextValue {
  mode:         AI.AIMode | null;
  status:       AI.AIStatus;
  progress:     number;
  progressText: string;
  canUseLocal:  boolean;
  /** true when AI is ready to use (local model loaded, or API mode selected) */
  ready:        boolean;
  setMode:      (m: AI.AIMode) => void;
  loadLocal:    () => Promise<boolean>;
  /** Call this before using AI — opens setup modal if mode not set */
  requestAI:    () => void;
  /** Whether the setup modal should be visible */
  showSetup:    boolean;
  closeSetup:   () => void;
}

const AICtx = createContext<AIContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────────
export function AIProvider({ children }: { children: ReactNode }) {
  const [mode,         setModeState]    = useState<AI.AIMode | null>(null);
  const [status,       setStatus]       = useState<AI.AIStatus>("idle");
  const [progress,     setProgress]     = useState(0);
  const [progressText, setProgressText] = useState("");
  const [showSetup,    setShowSetup]    = useState(false);
  const [canUseLocal,  setCanUseLocal]  = useState(false);
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;

    setCanUseLocal(AI.hasWebGPU());

    // Sync reactive state from singleton
    const unsub = AI.subscribe((s, p, t) => {
      setStatus(s);
      setProgress(p);
      setProgressText(t);
    });

    // Restore saved mode — do NOT auto-load the local model on startup
    // (causes PWA crashes on mobile due to memory pressure from WebGPU/WebLLM)
    // Loading is triggered only when the user explicitly sends a message in chat.
    const saved = AI.getSavedMode();
    setModeState(saved);

    return unsub;
  }, []);

  const setMode = useCallback((m: AI.AIMode) => {
    AI.saveMode(m);
    setModeState(m);
    setShowSetup(false);
    if (m === "local") AI.loadLocalModel();
  }, []);

  const loadLocal = useCallback(() => AI.loadLocalModel(), []);

  const requestAI = useCallback(() => {
    if (!AI.getSavedMode()) setShowSetup(true);
  }, []);

  const closeSetup = useCallback(() => setShowSetup(false), []);

  const ready = status === "ready" || mode === "api";

  return (
    <AICtx.Provider value={{
      mode, status, progress, progressText, canUseLocal,
      ready, setMode, loadLocal, requestAI, showSetup, closeSetup,
    }}>
      {children}
    </AICtx.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────────
export function useAI() {
  const ctx = useContext(AICtx);
  if (!ctx) throw new Error("useAI must be used inside <AIProvider>");
  return ctx;
}

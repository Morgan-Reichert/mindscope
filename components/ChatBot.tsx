"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Minus, Brain, Cloud, Settings, Database, DatabaseZap, Mic, MicOff } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useChatContext } from "@/lib/chat-context";
import { useAI } from "@/lib/ai-context";
import { generate } from "@/lib/ai-service";
import { getResults, getAllMoodEntries, type TestResult, type MoodEntry } from "@/lib/storage";

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

const SYSTEM_PROMPT = `You are MindScope Assistant, a compassionate mental health information chatbot embedded in the MindScope app — a platform offering validated self-assessment tools for mental health awareness.

Your role:
- Answer questions about mental health conditions, symptoms, coping strategies, and treatments
- Help users understand their assessment results (PHQ-9, GAD-7, ASRS, PCL-5, etc.)
- Explain psychological concepts in accessible, non-clinical language
- Provide psychoeducation about depression, anxiety, ADHD, PTSD, burnout, sleep issues, and related topics
- Gently suggest professional help when appropriate

Critical rules:
- You are NOT a therapist and NEVER provide diagnosis or treatment
- Always recommend consulting a mental health professional for personal concerns
- If someone expresses suicidal ideation or crisis, IMMEDIATELY urge them to contact emergency services or a crisis line
- Never give specific medication advice
- Keep answers clear, warm, and evidence-based
- Respond in the same language as the user's question

Always remind users: "I'm an educational assistant, not a substitute for professional care."`;

const DATA_ACCESS_KEY = "mindscope_chat_data";

function avg(arr: (number | undefined)[]): number | null {
  const v = arr.filter((x): x is number => x !== undefined);
  return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length * 10) / 10 : null;
}

function buildDataContext(): string {
  const results: TestResult[] = getResults();
  const entries: MoodEntry[]  = getAllMoodEntries();

  // ── Test results: latest per test ─────────────────────────────────────────
  const latestByTest: Record<string, TestResult> = {};
  for (const r of results) {
    if (!latestByTest[r.testId] || r.completedAt > latestByTest[r.testId].completedAt) {
      latestByTest[r.testId] = r;
    }
  }
  const testLines = Object.values(latestByTest)
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
    .slice(0, 12)
    .map(r => {
      const date = r.completedAt.split("T")[0];
      return `  - ${r.testName}: ${r.score}/${r.maxScore} — ${r.severityLabel} (${date})`;
    });

  // ── Mood: last 30 days ────────────────────────────────────────────────────
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const cutStr  = cutoff.toISOString().split("T")[0];
  const recent  = entries.filter(e => e.date >= cutStr);
  const avgMood  = avg(recent.map(e => e.mood));
  const avgSleep = avg(recent.map(e => e.sleep));
  const avgNrg   = avg(recent.map(e => e.energy));
  const daysTracked = new Set(recent.map(e => e.date)).size;

  const lastNotes = recent
    .filter(e => e.note && e.note.trim().length > 10)
    .slice(-3)
    .map(e => `  - ${e.date}: "${e.note!.slice(0, 100)}${e.note!.length > 100 ? "..." : ""}"`);

  const sections: string[] = [];

  if (testLines.length > 0) {
    sections.push(`RECENT TEST RESULTS (latest per assessment):\n${testLines.join("\n")}`);
  }
  if (recent.length > 0) {
    const moodLines = [
      `Days tracked (last 30d): ${daysTracked}`,
      avgMood   !== null ? `Average mood: ${avgMood}/10`     : null,
      avgSleep  !== null ? `Average sleep: ${avgSleep}h`     : null,
      avgNrg    !== null ? `Average energy: ${avgNrg}/5`     : null,
    ].filter(Boolean).map(l => `  - ${l}`);
    sections.push(`MOOD TRACKING (last 30 days):\n${moodLines.join("\n")}`);
  }
  if (lastNotes.length > 0) {
    sections.push(`RECENT JOURNAL NOTES:\n${lastNotes.join("\n")}`);
  }

  if (sections.length === 0) return "";

  return `\n\n=== USER'S PERSONAL DATA (shared with explicit consent) ===\nUse this context to give more personalised, relevant answers. Do NOT repeat raw numbers back unless asked.\n${sections.join("\n\n")}`;
}

export function ChatBot() {
  const { t, lang }                 = useI18n();
  const { chatOpen, setChatOpen }   = useChatContext();
  const { mode, status, requestAI, ready, showSetup } = useAI();

  const [minimized,   setMinimized]   = useState(false);
  const [messages,    setMessages]    = useState<Message[]>([
    { role: "assistant", content: t.chat.welcome },
  ]);
  const [input,      setInput]      = useState("");
  const [loading,    setLoading]    = useState(false);
  const [isMobile,   setIsMobile]   = useState(false);
  const [dataAccess, setDataAccess] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(DATA_ACCESS_KEY) === "true";
  });
  const [showDataHint, setShowDataHint] = useState(false);

  // Voice input state
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const toggleDataAccess = useCallback(() => {
    setDataAccess(prev => {
      const next = !prev;
      localStorage.setItem(DATA_ACCESS_KEY, String(next));
      setShowDataHint(true);
      setTimeout(() => setShowDataHint(false), 2500);
      return next;
    });
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Lock body scroll when chat is open on mobile
  useEffect(() => {
    if (isMobile && chatOpen) {
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
      };
    }
  }, [isMobile, chatOpen]);

  // Desktop drag state
  const [position,   setPosition]   = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset   = useRef({ x: 0, y: 0 });
  const panelRef     = useRef<HTMLDivElement>(null);
  const messagesEnd  = useRef<HTMLDivElement>(null);
  const initialized  = useRef(false);
  const textareaRef  = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!initialized.current && !isMobile) {
      initialized.current = true;
      setPosition({ x: window.innerWidth - 400 - 24, y: window.innerHeight - 560 - 24 });
    }
  }, [isMobile]);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => { if (!chatOpen) setMinimized(false); }, [chatOpen]);

  // Initialize speech recognition
  const initSpeechRecognition = useCallback(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError(t.chat.micUnsupported);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.language = lang === "en" ? "en-US" : lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : "zh-CN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setInput(prev => prev + transcript);
        } else {
          interim += transcript;
        }
      }
      setTranscript(interim);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setVoiceError(t.chat.micError);
      setTimeout(() => setVoiceError(null), 3000);
    };

    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
  }, [lang, t.chat.micError, t.chat.micUnsupported]);

  // Toggle voice input
  const toggleVoiceInput = useCallback(() => {
    if (!recognitionRef.current) {
      initSpeechRecognition();
    }
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setTranscript("");
    } else {
      setTranscript("");
      setVoiceError(null);
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening, initSpeechRecognition]);

  // Stop recording when sending message
  const stopVoiceRecording = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setTranscript("");
    }
  }, [isListening]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button, textarea, input")) return;
    setIsDragging(true);
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.preventDefault();
  }, [position]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 400,  e.clientX - dragOffset.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - 56,  e.clientY - dragOffset.current.y)),
      });
    };
    const onUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup",   onUp);
    }
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [isDragging]);

  // ── Send message ──────────────────────────────────────────────────────────────
  const sendMessage = async () => {
    stopVoiceRecording();
    const text = input.trim();
    if (!text || loading) return;

    // If AI mode not set, open setup modal
    if (!mode) { requestAI(); return; }

    const history = messages.filter(m => !m.streaming);
    const updated: Message[] = [...history, { role: "user", content: text }];
    setMessages(updated);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);

    // Add streaming placeholder
    setMessages(prev => [...prev, { role: "assistant", content: "", streaming: true }]);

    try {
      const systemContent = dataAccess
        ? SYSTEM_PROMPT + buildDataContext()
        : SYSTEM_PROMPT;
      const apiMsgs = [
        { role: "system" as const, content: systemContent },
        ...updated.map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
      ];

      await generate(apiMsgs, (tok) => {
        setMessages(prev => {
          const last = { ...prev[prev.length - 1], content: prev[prev.length - 1].content + tok };
          return [...prev.slice(0, -1), last];
        });
      });

      // Mark streaming done
      setMessages(prev => {
        const last = { ...prev[prev.length - 1], streaming: false };
        return [...prev.slice(0, -1), last];
      });
    } catch {
      setMessages(prev => {
        const last = { ...prev[prev.length - 1], content: t.chat.error, streaming: false };
        return [...prev.slice(0, -1), last];
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // ── Data access badge ────────────────────────────────────────────────────────
  const dataToggleBtn = (small = false) => (
    <div className="relative">
      <button
        onClick={e => { e.stopPropagation(); toggleDataAccess(); }}
        title={dataAccess ? "Données partagées — cliquer pour désactiver" : "Partager mes données avec l'IA"}
        className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-medium transition-colors ${
          dataAccess
            ? "bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30"
            : "bg-white/10 text-blue-200/60 hover:bg-white/20 hover:text-blue-200"
        }`}
      >
        {dataAccess
          ? <DatabaseZap className={`${small ? "h-2.5 w-2.5" : "h-3 w-3"}`} />
          : <Database    className={`${small ? "h-2.5 w-2.5" : "h-3 w-3"}`} />}
        {!small && (dataAccess ? "Données ON" : "Données")}
      </button>
      {showDataHint && (
        <div className="absolute bottom-full mb-1.5 right-0 whitespace-nowrap rounded-lg bg-slate-900 text-white text-[10px] px-2 py-1 shadow-lg pointer-events-none z-10">
          {dataAccess ? "Accès aux données activé" : "Accès aux données désactivé"}
        </div>
      )}
    </div>
  );

  // ── AI status badge ───────────────────────────────────────────────────────────
  const aiBadge = (
    <div className="flex items-center gap-1">
      {mode === "local" ? (
        <span className="flex items-center gap-1 text-[10px] font-medium text-blue-200 bg-white/10 px-1.5 py-0.5 rounded-full">
          <Brain className="h-2.5 w-2.5" />
          {status === "ready" ? "IA locale" : status === "downloading" ? "Chargement…" : "IA locale"}
        </span>
      ) : mode === "api" ? (
        <span className="flex items-center gap-1 text-[10px] font-medium text-blue-200 bg-white/10 px-1.5 py-0.5 rounded-full">
          <Cloud className="h-2.5 w-2.5" />
          Mistral
        </span>
      ) : (
        <span className="text-[10px] text-blue-200/60">—</span>
      )}
    </div>
  );

  // ── Not ready notice ──────────────────────────────────────────────────────────
  const notReadyBanner = !ready && mode === "local" && (
    <div className="mx-3 mt-2 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-xs text-blue-700 dark:text-blue-300 flex items-center gap-2">
      <span className="h-3 w-3 rounded-full border-2 border-blue-400 border-t-blue-700 animate-spin flex-shrink-0" />
      <span>
        {status === "downloading"
          ? `Téléchargement du modèle IA…`
          : "Chargement du modèle local…"}
      </span>
    </div>
  );

  // ── Input area ────────────────────────────────────────────────────────────────
  const inputArea = (
    <div className="flex items-end gap-2 p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <textarea
        ref={textareaRef}
        value={input + transcript}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isListening ? t.chat.listeningLabel : (mode ? t.chat.placeholder : "Choisissez d'abord une IA…")}
        rows={1}
        className={`flex-1 resize-none rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 px-3 py-2 text-slate-700 dark:text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-28 overflow-y-auto ${
          isMobile ? "text-base" : "text-sm"
        }`}
        style={{ cursor: "text", fontSize: isMobile ? "16px !important" : undefined }}
        onMouseDown={e => e.stopPropagation()}
        onInput={e => {
          const el = e.currentTarget;
          el.style.height = "auto";
          el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
        }}
      />
      <button
        onClick={e => { e.stopPropagation(); toggleVoiceInput(); }}
        className={`flex-shrink-0 h-9 w-9 rounded-xl flex items-center justify-center transition-colors ${
          isListening
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-600"
        }`}
        aria-label={t.chat.micButton}
        title={isListening ? t.chat.listeningLabel : t.chat.micButton}
        onMouseDown={e => e.stopPropagation()}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </button>
      <button
        onClick={e => { e.stopPropagation(); sendMessage(); }}
        disabled={!input.trim() || loading}
        className="flex-shrink-0 h-9 w-9 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
        aria-label={t.chat.send}
        onMouseDown={e => e.stopPropagation()}
      >
        <Send className="h-4 w-4" />
      </button>
    </div>
  );

  // ── Messages list ─────────────────────────────────────────────────────────────
  const messagesList = (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-900/50">
      {messages.map((msg, i) => (
        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
            msg.role === "user"
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-bl-sm"
          }`}>
            {msg.content}
            {msg.streaming && (
              <span className="inline-block w-1.5 h-4 bg-current rounded-full ml-0.5 animate-pulse align-middle" />
            )}
          </div>
        </div>
      ))}
      {loading && !messages[messages.length - 1]?.streaming && (
        <div className="flex justify-start">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm px-3 py-2">
            <span className="flex gap-1">
              {[0,1,2].map(i => (
                <span key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </span>
          </div>
        </div>
      )}
      <div ref={messagesEnd} />
    </div>
  );

  // ── MOBILE ────────────────────────────────────────────────────────────────────
  if (isMobile) {
    if (!chatOpen) return null;
    return (
      <>
        <div className="fixed inset-0 bg-black/40 z-[9998]" onClick={() => setChatOpen(false)} />
        <div
          className="fixed inset-x-0 bottom-14 z-[9999] flex flex-col rounded-t-3xl bg-white dark:bg-slate-800 shadow-2xl animate-sheet-up"
          style={{
            height: "calc(100vh - 3.5rem)",
            overflow: "hidden",
            maxHeight: "calc(100vh - 3.5rem)"
          }}
        >
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          </div>
          <div className="flex items-center justify-between px-5 py-3 flex-shrink-0 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-900 dark:text-slate-100 text-base leading-none">{t.chat.title}</p>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.chat.subtitle}</p>
                  {mode === "local" && <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full font-medium flex items-center gap-0.5 flex-shrink-0"><Brain className="h-2.5 w-2.5" />locale</span>}
                  {mode === "api"   && <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500 px-1.5 py-0.5 rounded-full font-medium flex items-center gap-0.5 flex-shrink-0"><Cloud className="h-2.5 w-2.5" />Mistral</span>}
                  {!mode            && <button onClick={requestAI} className="text-[10px] text-blue-500 underline flex-shrink-0">Configurer IA</button>}
                  <button
                    onClick={toggleDataAccess}
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium flex items-center gap-0.5 transition-colors ${
                      dataAccess
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {dataAccess ? <DatabaseZap className="h-2.5 w-2.5" /> : <Database className="h-2.5 w-2.5" />}
                    {dataAccess ? "Données ON" : "Données"}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={requestAI} className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                <Settings className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setChatOpen(false)} className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          {notReadyBanner}
          {messagesList}
          <div className="flex-shrink-0" style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 8px)" }}>
            {inputArea}
          </div>
        </div>
      </>
    );
  }

  // ── DESKTOP ───────────────────────────────────────────────────────────────────
  if (!chatOpen) {
    return (
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      ref={panelRef}
      style={{ position: "fixed", left: position.x, top: position.y, zIndex: 9999, width: 400, cursor: isDragging ? "grabbing" : "grab" }}
      onMouseDown={onMouseDown}
      className="rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden select-none flex flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white flex-shrink-0">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <div>
            <p className="text-sm font-semibold leading-none">{t.chat.title}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs opacity-80">{t.chat.subtitle}</p>
              {aiBadge}
              {dataToggleBtn(true)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={e => { e.stopPropagation(); requestAI(); }} className="p-1.5 rounded-lg hover:bg-blue-700 transition-colors" title="Paramètres IA">
            <Settings className="h-3.5 w-3.5" />
          </button>
          <button onClick={e => { e.stopPropagation(); setMinimized(!minimized); }} className="p-1.5 rounded-lg hover:bg-blue-700 transition-colors">
            <Minus className="h-4 w-4" />
          </button>
          <button onClick={e => { e.stopPropagation(); setChatOpen(false); }} className="p-1.5 rounded-lg hover:bg-blue-700 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {notReadyBanner}
          <div className="h-80 flex flex-col overflow-hidden">
            {messagesList}
          </div>
          {inputArea}
        </>
      )}
    </div>
  );
}

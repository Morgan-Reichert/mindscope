/**
 * ai-service.ts
 * Singleton AI service — local WebLLM (WebGPU) with Mistral API fallback.
 * WebLLM 0.2.82+ does NOT require cross-origin isolation headers.
 */
import type { MLCEngine } from "@mlc-ai/web-llm";

// ── Constants ──────────────────────────────────────────────────────────────────
export const MODEL_ID   = "Llama-3.2-1B-Instruct-q4f16_1-MLC";
export const MODEL_SIZE = "~870 MB";

const STORAGE_KEY   = "mindscope_ai_mode";
const MISTRAL_KEY   = "2LitVaCxXcwT2RYBz63xKEoPxGHcgAKJ";
const MISTRAL_URL   = "https://api.mistral.ai/v1/chat/completions";

// ── Types ──────────────────────────────────────────────────────────────────────
export type AIMode   = "local" | "api";
export type AIStatus = "idle" | "downloading" | "loading" | "ready" | "error";
export type ChatMsg  = { role: "system" | "user" | "assistant"; content: string };
export type Listener = (status: AIStatus, progress: number, text: string) => void;

// ── Singleton state ────────────────────────────────────────────────────────────
let _engine:   MLCEngine | null = null;
let _status:   AIStatus = "idle";
let _progress  = 0;
let _text      = "";
let _listeners: Listener[] = [];

function emit() { _listeners.forEach(fn => fn(_status, _progress, _text)); }

// ── Capability check ───────────────────────────────────────────────────────────
export function hasWebGPU(): boolean {
  if (typeof navigator === "undefined") return false;
  // iOS WebGPU is too unstable for large ML inference — causes PWA crashes
  if (/iphone|ipad|ipod/i.test(navigator.userAgent)) return false;
  return "gpu" in navigator;
}

// ── Persisted mode ─────────────────────────────────────────────────────────────
export function getSavedMode(): AIMode | null {
  try { return localStorage.getItem(STORAGE_KEY) as AIMode | null; } catch { return null; }
}
export function saveMode(mode: AIMode) {
  // iOS cannot use local mode — force API even if user tries to select local
  const finalMode = mode === "local" && !hasWebGPU() ? "api" : mode;
  try { localStorage.setItem(STORAGE_KEY, finalMode); } catch {}
}
export function clearMode() {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}

// ── State getters ──────────────────────────────────────────────────────────────
export const getStatus   = () => _status;
export const getProgress = () => _progress;
export const getText     = () => _text;
export const isReady     = () => _status === "ready";
export const isLoading   = () => _status === "downloading" || _status === "loading";

export function subscribe(fn: Listener): () => void {
  _listeners.push(fn);
  return () => { _listeners = _listeners.filter(f => f !== fn); };
}

// ── Model lifecycle ────────────────────────────────────────────────────────────
export async function loadLocalModel(): Promise<boolean> {
  if (_engine) {
    _status = "ready"; emit(); return true;
  }
  if (!hasWebGPU()) return false;

  try {
    _status = "downloading"; _progress = 0; _text = ""; emit();

    // Dynamic import keeps the ~5 MB package out of the main bundle
    const { CreateMLCEngine } = await import("@mlc-ai/web-llm");

    _engine = await CreateMLCEngine(MODEL_ID, {
      initProgressCallback: (r) => {
        _progress = Math.round(r.progress * 100);
        _text     = r.text ?? "";
        _status   = r.progress < 1 ? "downloading" : "loading";
        emit();
      },
    });

    _status = "ready"; emit();
    return true;
  } catch (err) {
    console.error("[WebLLM] init error:", err);
    _status = "error"; emit();
    _engine = null;
    return false;
  }
}

export async function unloadModel() {
  if (_engine) {
    try { await (_engine as any).unload?.(); } catch {}
    _engine = null;
  }
  _status = "idle"; _progress = 0; emit();
}

// ── Text generation ────────────────────────────────────────────────────────────
/**
 * Generate a response from the active AI mode.
 * @param onChunk  Optional callback for streaming tokens.
 */
export async function generate(
  messages: ChatMsg[],
  onChunk?: (token: string) => void,
): Promise<string> {
  const mode = getSavedMode();
  if (mode === "local" && _engine) {
    return _generateLocal(messages, onChunk);
  }
  return _generateAPI(messages, onChunk);
}

async function _generateLocal(messages: ChatMsg[], onChunk?: (t: string) => void): Promise<string> {
  if (!_engine) throw new Error("Model not loaded");

  if (onChunk) {
    const stream = await _engine.chat.completions.create({
      messages,
      stream:      true,
      temperature: 0.65,
      max_tokens:  1400,
    });
    let full = "";
    for await (const chunk of stream) {
      const tok = chunk.choices[0]?.delta?.content ?? "";
      if (tok) { full += tok; onChunk(tok); }
    }
    return full;
  }

  const res = await _engine.chat.completions.create({
    messages, temperature: 0.65, max_tokens: 1400,
  });
  return res.choices[0]?.message?.content ?? "";
}

async function _generateAPI(messages: ChatMsg[], onChunk?: (t: string) => void): Promise<string> {
  const body: Record<string, unknown> = {
    model: "mistral-small-latest", messages, temperature: 0.65, max_tokens: 1400,
  };

  if (onChunk) {
    body.stream = true;
    const res = await fetch(MISTRAL_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${MISTRAL_KEY}` },
      body:    JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Mistral ${res.status}`);

    const reader  = res.body?.getReader();
    if (!reader) throw new Error("No stream body");
    const decoder = new TextDecoder();
    let full = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      for (const line of decoder.decode(value).split("\n")) {
        if (!line.startsWith("data: ")) continue;
        const raw = line.slice(6);
        if (raw === "[DONE]") continue;
        try {
          const tok = JSON.parse(raw).choices?.[0]?.delta?.content ?? "";
          if (tok) { full += tok; onChunk(tok); }
        } catch {}
      }
    }
    return full;
  }

  const res = await fetch(MISTRAL_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${MISTRAL_KEY}` },
    body:    JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Mistral ${res.status}`);
  return (await res.json()).choices?.[0]?.message?.content ?? "";
}

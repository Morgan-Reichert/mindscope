// MindScope Service Worker — v3
const CACHE = "mindscope-v3";

// App shell — lightweight HTML pages only
const SHELL = [
  "./",
  "./tests/",
  "./history/",
  "./learn/",
];

// Skip caching resources matching these patterns (large ML libs, API calls)
const SKIP_CACHE_PATTERNS = [
  /web-llm/i,
  /mlc-ai/i,
  /mistral/i,
  /googleapis/i,
  /fonts\.g/i,
  // Skip large JS chunks (WebLLM dynamic import can be ~5MB+)
];

function shouldSkip(url) {
  return SKIP_CACHE_PATTERNS.some((p) => p.test(url.href));
}

// ── Install: pre-cache app shell ───────────────────────────────────────────────
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => {
      return cache.addAll(SHELL).catch(() => {});
    })
  );
  self.skipWaiting();
});

// ── Activate: clean old caches ─────────────────────────────────────────────────
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch ──────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  // Only handle GET, same-origin, within app scope
  if (e.request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;
  if (shouldSkip(url)) return;

  const scope = self.registration.scope.replace(self.location.origin, "");
  if (!url.pathname.startsWith(scope)) return;

  // Navigation: network-first, fall back to cached shell
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match("./") || caches.match(e.request))
    );
    return;
  }

  // Static assets: cache-first, but skip very large files (>1MB)
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        if (!res || res.status !== 200 || res.type === "opaque") return res;
        // Don't cache chunks above ~500KB to protect iOS Cache Storage quota
        const cl = res.headers.get("content-length");
        if (cl && parseInt(cl) > 500_000) return res;
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, clone));
        return res;
      });
    })
  );
});

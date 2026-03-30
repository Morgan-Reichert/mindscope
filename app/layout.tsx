import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { I18nProvider } from "@/lib/i18n";
import { GeoModalTrigger } from "@/components/GeoModal";
import { FooterContent } from "@/components/FooterContent";
import { ChatBot } from "@/components/ChatBot";
import { ChatProvider } from "@/lib/chat-context";
import { PWAInstallBanner } from "@/components/PWAInstallBanner";
import { AIProvider } from "@/lib/ai-context";
import { AISetupModal } from "@/components/AISetupModal";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "MindScope — Santé Mentale",
  description: "Évaluations de santé mentale validées, suivi de l'humeur, journal de bien-être. Gratuit, anonyme, 100% privé.",
  keywords: "santé mentale, auto-évaluation, dépression, anxiété, humeur, bien-être",
  manifest: `${BASE}/manifest.json`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MindScope",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#2563eb",
    "msapplication-tap-highlight": "no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)",  color: "#1e3a8a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

        {/* PWA icons */}
        <link rel="icon" href={`${BASE}/icon.svg`} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={`${BASE}/icon.svg`} />

        {/* Service Worker registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('${BASE}/sw.js', { scope: '${BASE}/' })
                    .catch(function() {});
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 antialiased">
        <I18nProvider>
          <AIProvider>
            <ChatProvider>
              <Navigation />
              <GeoModalTrigger />
              {/* Extra bottom padding on mobile for the tab bar */}
              <main className="pb-20 sm:pb-0">{children}</main>
              <div className="pb-20 sm:pb-0">
                <FooterContent />
              </div>
              <ChatBot />
              <AISetupModal />
              {/* PWA install banner — shown intelligently from 2nd visit */}
              <PWAInstallBanner />
            </ChatProvider>
          </AIProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

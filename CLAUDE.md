# MindScope — Project Guide for Claude

## Project Overview

**MindScope** is a Next.js 14 mental health self-assessment web app. It offers 20 validated psychological screening tools (PHQ-9, GAD-7, ASRS, PCL-5, etc.), a mood tracker, an educational library, and a history log — all anonymous, local-only (no auth, no database), with full multilingual support (EN/FR/ES/ZH) and dark mode.

## Tech Stack

- **Framework:** Next.js 14 with App Router (`app/` directory)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS with dark mode (`dark:` prefix)
- **State:** React Context (`I18nProvider`), React `useState`/`useEffect`
- **Storage:** `localStorage` only — no backend, no auth
- **Charts:** Recharts (mood tracker line chart)
- **Icons:** Lucide React
- **Fonts:** Inter (Google Fonts)
- **AI Chatbot:** Google Gemini API (`gemini-2.0-flash` model)

## Project Structure

```
app/
  layout.tsx          — Root layout: Navigation, I18nProvider, GeoModalTrigger, FooterContent, ChatBot
  page.tsx            — Home page
  tests/
    page.tsx          — Tests listing page
    [id]/page.tsx     — Individual test page (question flow + results)
  history/page.tsx    — Test history + mood history
  learn/
    page.tsx          — Learning library
    [id]/page.tsx     — Topic detail page

components/
  Navigation.tsx      — Top nav with language switcher + dark mode toggle
  TestCard.tsx        — Card for each test in the listing
  QuestionCard.tsx    — Renders a single question with options
  ProgressBar.tsx     — Progress indicator during test
  ResultCard.tsx      — Displays test result with score interpretation
  MoodTracker.tsx     — Mood entry + 14-day line chart
  CrisisBox.tsx       — Crisis resources box
  DisclaimerBanner.tsx
  FooterContent.tsx
  GeoModal.tsx        — Country/region selection modal
  LanguageSwitcher.tsx
  ChatBot.tsx         — Draggable floating Gemini-powered chatbot

lib/
  i18n.tsx            — I18nContext, I18nProvider, useI18n() hook, tf() interpolation helper
  translations.ts     — All UI strings in EN/FR/ES/ZH (Translations interface + 4 lang objects)
  storage.ts          — localStorage helpers: saveMoodEntry, getMoodEntries, getTodayMood, saveTestResult, getTestResults

data/
  tests.ts            — All 20 test definitions (questions, options, scoring, interpretations) + i18n
  learn.ts            — 20 educational topic definitions
```

## Internationalization (i18n)

### UI Strings
- Defined in `lib/translations.ts` as `Translations` interface
- 4 language objects: `en`, `fr`, `es`, `zh`
- Accessed via `const { t, lang } = useI18n()` — `t` is the full translations object for the current language
- Template interpolation: `tf(t.some.key, { n: value, total: value })` where `{n}` and `{total}` are placeholders
- Always add new UI strings to the `Translations` interface AND all 4 language objects

### Test/Question Translations (inline i18n)
Tests, questions, options, and score interpretations each carry their own `i18n` field:

```typescript
// Test level
test.i18n?.fr?.{ name, shortName, description, about, category }

// Question level
question.i18n?.{ fr: "text", es: "text", zh: "text" }

// Option level
option.i18n?.{ fr: "label", es: "label", zh: "label" }

// Interpretation level
interpretation.i18n?.fr?.{ label, description, recommendation }
```

Shared option sets (`FREQUENCY_OPTIONS`, `FREQUENCY_OPTIONS_5`, `AGREE_OPTIONS`, `AGREE_OPTIONS_REVERSE`, `YES_NO_OPTIONS`) already include i18n on every option.

### Usage in components
```typescript
const { t, lang } = useI18n();
type TranslatedLang = "fr" | "es" | "zh"; // avoids TS error on index
const i18nTest = lang !== "en" ? test.i18n?.[lang as TranslatedLang] : undefined;
const testName = i18nTest?.name || test.name;
```

## Style Rules

- **Dark mode:** Every element needs `dark:` variants. Use `slate-*` color scale for backgrounds/text.
- **Cards:** `rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6`
- **Buttons (primary):** `bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2`
- **Buttons (secondary):** `bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg`
- **Text:** `text-slate-800 dark:text-slate-100` (headings), `text-slate-500 dark:text-slate-400` (secondary)
- **Spacing:** `space-y-6` for section gaps, `gap-4` for grids
- **Transitions:** `transition-all duration-200` on interactive elements
- **No emojis** in code unless already present in the existing codebase (the test icons use emojis intentionally)

## Data Structures

### Test
```typescript
interface Test {
  id: string;
  name: string; shortName: string;
  description: string; about: string;
  category: string;
  type: "screening" | "self-assessment";
  timeMinutes: number; color: string; icon: string;
  questions: Question[];
  scoringNote?: string;
  scoring: { maxScore: number; interpretations: ScoreInterpretation[] };
  i18n?: { fr?: {...}; es?: {...}; zh?: {...} };
}
```

### Question
```typescript
interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  i18n?: { fr?: string; es?: string; zh?: string };
}
```

### QuestionOption
```typescript
interface QuestionOption {
  label: string; value: number;
  i18n?: { fr?: string; es?: string; zh?: string };
}
```

### ScoreInterpretation
```typescript
interface ScoreInterpretation {
  min: number; max: number;
  severity: "low" | "moderate" | "high" | "normal";
  label: string; description: string; recommendation: string;
  isHigh: boolean;
  i18n?: { fr?: { label, description, recommendation }; es?: {...}; zh?: {...} };
}
```

## ChatBot

- **Component:** `components/ChatBot.tsx` — draggable floating panel, opens via chat bubble (bottom-right corner)
- **API:** Google Gemini `gemini-2.0-flash` via REST
- **System prompt:** Configured as mental health educational assistant; refuses diagnosis, always refers to professionals, handles crisis with emergency referral
- **i18n:** Uses `t.chat.*` keys (title, subtitle, placeholder, send, welcome, error, thinking)
- **Draggable:** Mouse and touch drag on the header area; textarea/buttons stop propagation

## Key Invariants

1. **No backend** — all data in `localStorage`. Never introduce server-side data storage.
2. **No auth** — fully anonymous. Never add login/signup.
3. **All 20 tests fully translated** — if adding a new test, add `i18n` blocks for FR/ES/ZH on test metadata, every question, every option (if custom), and every interpretation.
4. **All UI strings translated** — if adding new UI text, add to `Translations` interface + all 4 lang objects in `translations.ts`.
5. **Dark mode on every element** — no component should have un-dark-moded colors.
6. **"use client"** — all interactive components need this directive (they use hooks/events).
7. **Type safety** — use `TranslatedLang = "fr" | "es" | "zh"` when indexing `i18n` objects to avoid TypeScript errors.

## Tests (all 20)

| # | ID | Name | Category |
|---|----|----|---------|
| 1 | phq9 | PHQ-9 | Depression |
| 2 | gad7 | GAD-7 | Anxiety |
| 3 | asrs | ASRS | ADHD |
| 4 | pcl5 | PCL-5 | Trauma |
| 5 | rosenberg | Rosenberg Self-Esteem | Self-Esteem |
| 6 | pss | PSS | Stress |
| 7 | spin | SPIN | Social Anxiety |
| 8 | burnout | Burnout | Burnout |
| 9 | isi | ISI | Sleep |
| 10 | mdq | MDQ | Mood Disorders |
| 11 | audit | AUDIT | Substance Use |
| 12 | ocd | OCD Scale | OCD |
| 13 | scoff | SCOFF | Eating Disorders |
| 14 | wellbeing | WHO-5 Wellbeing | Wellbeing |
| 15 | emotional-regulation | Emotional Regulation | Emotional Health |
| 16 | impulsivity | Impulsivity Scale | Impulse Control |
| 17 | motivation | Motivation Scale | Motivation |
| 18 | fatigue | Fatigue Assessment | Fatigue |
| 19 | loneliness | UCLA Loneliness Scale | Social Connection |
| 20 | life-satisfaction | SWLS | Life Satisfaction |

All 20 have complete EN/FR/ES/ZH translations.

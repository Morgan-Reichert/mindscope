<div align="center">

# 🧠 MindScope

### Suivi de bien-être mental · IA locale · STARIAX

---

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-installable-0f766e?style=flat-square&logo=pwa&logoColor=white)
![IA Locale](https://img.shields.io/badge/IA-100%25_locale-1e293b?style=flat-square&logo=openai&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0-64748b?style=flat-square)

</div>

---

## 🧪 Tester MindScope en version bêta

> **Tu veux tester MindScope avant tout le monde ?**
> L'app est en phase bêta — je cherche des utilisateurs pour tester, donner leur avis et m'aider à améliorer l'expérience. Pas besoin d'être dev !

**→ [Rejoindre la bêta](mailto:morgan.reichert.pro@outlook.com?subject=Beta%20MindScope&body=Bonjour%20Morgan%2C%20je%20souhaite%20tester%20MindScope%20en%20version%20bêta.)** — Réponse sous 48h 📬

---

## Présentation

**MindScope** est une application web progressive (PWA) conçue pour accompagner les utilisateurs dans le suivi de leur bien-être mental. Grâce à l'intégration d'un modèle de langage embarqué (WebLLM), l'analyse se fait entièrement **en local**, sans envoi de données vers un serveur externe — garantissant une confidentialité totale.

L'application génère des rapports PDF exportables et propose des visualisations de données pour mieux comprendre ses tendances émotionnelles dans le temps.

---

## Fonctionnalités

| | Fonctionnalité | Détail |
|---|---|---|
| 📓 | **Suivi du bien-être** | Journalisation quotidienne de l'état mental |
| 🤖 | **Analyse IA locale** | Modèle LLM via WebLLM — aucune donnée transmise |
| 📈 | **Graphiques & visualisations** | Courbes d'évolution via Recharts |
| 📄 | **Export PDF** | Rapports complets via jsPDF + jsPDF-AutoTable |
| 📱 | **PWA** | Installable sur écran d'accueil (mobile & desktop) |
| 🎨 | **Interface responsive** | Tailwind CSS, design mobile-first |

---

## Stack Technique

| Composant       | Technologie                        |
|-----------------|------------------------------------|
| Framework       | Next.js 14 (App Router)            |
| UI              | React 18 + TypeScript              |
| Styles          | Tailwind CSS 3                     |
| LLM embarqué    | WebLLM — @mlc-ai/web-llm ^0.2.82   |
| Graphiques      | Recharts ^2.12                     |
| Export          | jsPDF ^4.2 + jsPDF-AutoTable ^5.0  |
| Icônes          | Lucide React                       |
| Déploiement     | Export statique (next output: export) |

---

## Installation & Lancement

**Prérequis** : Node.js 18+

```bash
# Cloner le repo
git clone https://github.com/Morgan-Reichert/mindscope.git
cd mindscope

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build
```

L'application sera disponible sur `http://localhost:3000`.

---

## Structure du Projet

```
mindscope/
├── app/              # Routes Next.js (App Router)
├── components/       # Composants React réutilisables
├── data/             # Données statiques / seeds
├── lib/              # Utilitaires et helpers
├── public/           # Assets statiques (icônes, manifest PWA)
├── next.config.js    # Config Next.js (export statique, basePath)
└── tailwind.config.ts
```

---

## Notes Techniques

- L'export statique (`output: "export"`) permet un déploiement sur n'importe quel CDN (GitHub Pages, Vercel, Netlify).
- Le modèle WebLLM est téléchargé et mis en cache côté client lors du premier lancement — pas de backend requis.
- Le `basePath` est configuré sur `/MindLoop-1.0` pour la compatibilité avec le déploiement GitHub Pages.

---

## Groupe Stariax

MindScope fait partie du portfolio **Stariax Belgium**, groupe technologique basé à Bruxelles.

| Projet | Description |
|--------|-------------|
| [MindScope](https://github.com/Morgan-Reichert/mindscope) | Suivi santé mentale avec IA locale |
| [NightWatch](https://github.com/Morgan-Reichert/nightwatch) | PWA sociale de suivi en soirée |
| [Stariax Showcase](https://github.com/Morgan-Reichert/stariax-showcase) | Site vitrine du groupe |
| [Challenger IA](https://github.com/Morgan-Reichert/challenger-ia) | Plateforme IA — bientôt disponible |

---

<div align="center">

*Stariax Belgium — Bruxelles, 2026*

</div>

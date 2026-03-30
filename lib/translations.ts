export type Lang = "en" | "fr" | "es" | "zh";

export interface Translations {
  lang: {
    en: string; fr: string; es: string; zh: string;
  };
  nav: {
    home: string; tests: string; learn: string; history: string; darkMode: string; lightMode: string;
  };
  disclaimer: {
    title: string; full: string; compact: string;
  };
  home: {
    badge: string;
    headline1: string; headline2: string;
    subtitle: string;
    startTest: string; learnMore: string;
    importantNote: string;
    feat1Title: string; feat1Desc: string;
    feat2Title: string; feat2Desc: string;
    feat3Title: string; feat3Desc: string;
    popularTests: string; viewAll: string;
    learnSection: string; learnSub: string;
    privacyTitle: string; privacyDesc: string;
  };
  tests: {
    title: string; subtitle: string;
    searchPlaceholder: string;
    showing: string;
    noResults: string; noResultsHint: string;
    minLabel: string; qLabel: string; typeScreening: string; typeSelf: string;
    all: string;
  };
  testPage: {
    backToTests: string;
    begin: string; exit: string;
    prev: string; next: string; seeResults: string;
    answeredOf: string;
    retake: string; viewHistory: string; browseMore: string;
    resultsFor: string; resultsLabel: string;
    whatSuggests: string; whatToDo: string;
    notAlone: string; notAloneText: string;
    limitationsTitle: string;
    lim1: string; lim2: string; lim3: string; lim4: string; lim5: string;
    notFoundTitle: string; notFoundText: string; notFoundLink: string;
    questionOf: string;
    scoreOf: string;
    disclaimer: string;
  };
  resultCard: {
    suggests: string; notDiagnosis: string;
    crisis1: string; crisis2: string;
    screening: string; notScreening: string; clinical: string; tools: string; professional: string;
  };
  history: {
    title: string; subtitle: string;
    tabTests: string; tabMood: string;
    noResultsTitle: string; noResultsText: string;
    browseBtn: string;
    clearAll: string; confirmClear: string;
    privacyNote: string;
    retake: string; resultsCount: string;
    saved: string;
  };
  mood: {
    title: string; today: string;
    addNote: string; saveBtn: string; savedBtn: string;
    chartTitle: string; chartSub: string;
    moodLabel: string;
    sleepLabel: string; sleepHours: string;
    appetiteLabel: string;
    energyLabel: string;
    journalLabel: string; journalPlaceholder: string;
    historyTitle: string; noEntries: string;
    clearJournal: string; confirmClear: string;
    appetiteOpts: [string, string, string, string, string];
    energyOpts: [string, string, string, string, string];
    hoursUnit: string;
    // Behaviours
    behaviourTitle: string;
    alcoholLabel: string; alcoholDrinks: string; alcoholNone: string;
    substancesLabel: string; substancesNote: string;
    substanceOpts: [string, string, string, string];
    riskLabel: string; riskNote: string;
    riskYes: string; riskNo: string;
    // Medications
    medTitle: string; medManage: string; medAdd: string; medSave: string;
    medRemove: string; medEmpty: string; medPlaceholder: string;
    medTaken: string; medNotTaken: string; medSectionTitle: string;
    // Report
    reportTitle: string; reportGenerate: string;
    reportForTherapist: string; reportForSelf: string; reportTypeLabel: string;
    reportPeriod1w: string; reportPeriod1m: string; reportPeriod1y: string;
    reportFrom: string; reportTo: string;
    reportDaysTracked: string; reportAvg: string; reportMin: string; reportMax: string;
    reportSummary: string; reportDailyLog: string; reportBehaviours: string;
    reportNoData: string; reportDownloading: string;
    reportDate: string; reportMood: string; reportSleep: string;
    reportAlcohol: string; reportSubstances: string; reportRisk: string;
    reportJournal: string; reportGenBy: string;
  };
  learn: {
    back: string;
    libraryTitle: string; librarySubtitle: string;
    searchPlaceholder: string; noResults: string; noResultsHint: string;
    symptomsTitle: string; causesTitle: string;
    treatmentsTitle: string; treatmentNote: string;
    mythsTitle: string; mythLabel: string; factLabel: string;
    relatedTests: string; resources: string; otherTopics: string;
    eduOnly: string; eduOnlyText: string;
    typeTherapy: string; typeLifestyle: string; typeMedical: string; typeSelf: string;
    readTime: string;
  };
  geo: {
    title: string; subtitle: string;
    selectLabel: string; confirmBtn: string; skipBtn: string;
    whyAsk: string; whyText: string;
    region: string; country: string;
  };
  crisis: {
    title: string;
    emergency: string; police: string; ambulance: string;
    crisisLine: string; textLine: string; suicide: string;
  };
  footer: {
    disclaimer: string; crisisText: string;
  };
  geo_modal: {
    regions: { [key: string]: string };
  };
  chat: {
    title: string; subtitle: string;
    placeholder: string; send: string;
    welcome: string;
    error: string;
    thinking: string;
    micButton: string; listeningLabel: string; micError: string; micUnsupported: string;
  };
}

const en: Translations = {
  lang: { en: "English", fr: "Français", es: "Español", zh: "中文" },
  nav: { home: "Home", tests: "Tests", learn: "Learn", history: "History", darkMode: "Dark mode", lightMode: "Light mode" },
  disclaimer: {
    title: "Important Disclaimer",
    full: "This tool does not provide medical diagnosis. It is for informational and self-awareness purposes only. Results are not a substitute for professional medical or mental health advice. If you are concerned about your mental health, please consult a qualified healthcare professional.",
    compact: "Not a medical tool. This is for informational purposes only and does not provide medical diagnosis.",
  },
  home: {
    badge: "Free · Anonymous · Not a medical tool",
    headline1: "Understand your", headline2: "mental wellbeing",
    subtitle: "MindScope offers validated self-assessment tools to help you understand your emotional health — not to diagnose, but to inform and empower. Take the first step toward awareness.",
    startTest: "Start a test", learnMore: "Learn more",
    importantNote: "Important: MindScope does not provide medical diagnoses. All assessments are for self-awareness and informational purposes only. Always consult a qualified professional for medical advice.",
    feat1Title: "Validated Assessments", feat1Desc: "20+ tools covering depression, anxiety, ADHD, PTSD, burnout, stress, sleep, and more — based on clinically recognized screening scales.",
    feat2Title: "Evidence-Based Education", feat2Desc: "Learn about symptoms, causes, treatments, and myths surrounding common mental health conditions.",
    feat3Title: "Track Your Mood", feat3Desc: "Log your daily mood and visualize patterns over time. All data stays private on your device.",
    popularTests: "Popular Assessments", viewAll: "View all",
    learnSection: "Learn & Understand", learnSub: "Evidence-based education on mental health topics",
    privacyTitle: "Your privacy is protected", privacyDesc: "MindScope requires no account, no login, and stores all your data locally on your device. Nothing is ever sent to a server. Your responses are completely private.",
  },
  tests: {
    title: "Assessment Library", subtitle: "validated self-assessment tools for mental health awareness",
    searchPlaceholder: "Search assessments...",
    showing: "Showing {n} of {total} assessments",
    noResults: "No assessments found", noResultsHint: "Try a different search or category",
    minLabel: "min", qLabel: "questions", typeScreening: "Screening", typeSelf: "Self-assessment",
    all: "All",
  },
  testPage: {
    backToTests: "Back to tests", begin: "Begin Assessment", exit: "Exit",
    prev: "Previous", next: "Next question", seeResults: "See results",
    answeredOf: "{n} of {total} answered",
    retake: "Retake assessment", viewHistory: "View history", browseMore: "← Browse more assessments",
    resultsFor: "Results for", resultsLabel: "Your results",
    whatSuggests: "What your results may suggest", whatToDo: "What you can do",
    notAlone: "You are not alone", notAloneText: "These scores can feel heavy, but please know that what you are experiencing is real, valid, and — most importantly — something that support can help with. Millions of people face similar challenges and find their way to feeling better. Reaching out for help is a sign of strength, not weakness.",
    limitationsTitle: "Limitations of this assessment",
    lim1: "This is a screening tool, not a clinical diagnosis",
    lim2: "Scores can vary depending on how you're feeling on a given day",
    lim3: "Many conditions share overlapping symptoms",
    lim4: "Only a qualified professional can provide a proper assessment",
    lim5: "Cultural, contextual, and individual factors affect how symptoms present",
    notFoundTitle: "Assessment not found", notFoundText: "This assessment doesn't exist.", notFoundLink: "Browse all assessments →",
    questionOf: "Question {n} of {total}",
    scoreOf: "out of {max}",
    disclaimer: "Your results suggest symptoms that may be consistent with {label}. This is not a diagnosis.",
  },
  resultCard: {
    suggests: "What your results may suggest",
    notDiagnosis: "Your results suggest symptoms that may be consistent with {label}. This is not a diagnosis.",
    crisis1: "Crisis Text Line: Text HOME to 741741",
    crisis2: "Suicide & Crisis Lifeline: Call or text 988",
    screening: "This is a screening tool, not a clinical diagnosis",
    notScreening: "Scores can vary depending on how you're feeling on a given day",
    clinical: "Many conditions share overlapping symptoms",
    tools: "Only a qualified professional can provide a proper assessment",
    professional: "Cultural, contextual, and individual factors affect how symptoms present",
  },
  history: {
    title: "Your History", subtitle: "Your past assessment results and mood tracking — stored only on your device.",
    tabTests: "Test Results", tabMood: "Mood Tracker",
    noResultsTitle: "No results yet", noResultsText: "Complete an assessment to see your results here.",
    browseBtn: "Browse assessments",
    clearAll: "Clear all", confirmClear: "Click again to confirm",
    privacyNote: "These results are stored locally in your browser. They are not sent anywhere.",
    retake: "Retake", resultsCount: "{n} result(s) saved",
    saved: "saved",
  },
  mood: {
    title: "How are you feeling today?",
    today: "",
    addNote: "Add a note about how you're feeling (optional)...",
    saveBtn: "Save today's mood", savedBtn: "✓ Saved",
    chartTitle: "Mood over time", chartSub: "Last {n} entries",
    moodLabel: "Mood",
    sleepLabel: "Sleep", sleepHours: "hours",
    appetiteLabel: "Appetite",
    energyLabel: "Energy",
    journalLabel: "Journal", journalPlaceholder: "How was your day? Any thoughts, feelings, events to note…",
    historyTitle: "Daily log",
    noEntries: "No entries yet. Start tracking today!",
    clearJournal: "Clear all entries", confirmClear: "Confirm delete",
    appetiteOpts: ["Very low", "Low", "Normal", "Good", "Excellent"],
    energyOpts: ["Exhausted", "Tired", "Okay", "Good", "Full of energy"],
    hoursUnit: "h",
    medTitle: "Medication", medManage: "Manage medications", medAdd: "Add",
    medSave: "Save list", medRemove: "Remove", medEmpty: "No medication saved yet.",
    medPlaceholder: "e.g. Sertraline 50mg", medTaken: "Taken", medNotTaken: "Not taken",
    medSectionTitle: "Treatment",
    behaviourTitle: "Behaviours (optional)",
    alcoholLabel: "Alcohol", alcoholDrinks: "drinks", alcoholNone: "None",
    substancesLabel: "Substances", substancesNote: "Note (optional)",
    substanceOpts: ["None", "Light", "Moderate", "Heavy"],
    riskLabel: "Risk-taking behaviour", riskNote: "Describe (optional)",
    riskYes: "Yes", riskNo: "No",
    reportForTherapist: "For my therapist", reportForSelf: "For myself",
    reportTypeLabel: "Report recipient",
    reportTitle: "Wellness Report", reportGenerate: "Generate report",
    reportPeriod1w: "1 week", reportPeriod1m: "1 month", reportPeriod1y: "1 year",
    reportFrom: "From", reportTo: "to",
    reportDaysTracked: "days tracked", reportAvg: "Avg", reportMin: "Min", reportMax: "Max",
    reportSummary: "Summary", reportDailyLog: "Daily log", reportBehaviours: "Behaviours",
    reportNoData: "No data for this period.", reportDownloading: "Generating PDF…",
    reportDate: "Date", reportMood: "Mood", reportSleep: "Sleep",
    reportAlcohol: "Alcohol", reportSubstances: "Substances", reportRisk: "Risk",
    reportJournal: "Journal", reportGenBy: "Generated by MindScope",
  },
  learn: {
    back: "Back to library",
    libraryTitle: "Learning Library", librarySubtitle: "Evidence-based mental health education",
    searchPlaceholder: "Search topics...", noResults: "No topics found", noResultsHint: "Try a different search term",
    symptomsTitle: "Symptoms", causesTitle: "Causes & Contributing Factors",
    treatmentsTitle: "Treatment Options", treatmentNote: "Always discuss treatment options with a qualified healthcare professional.",
    mythsTitle: "Myths vs. Facts", mythLabel: "Myth", factLabel: "Fact",
    relatedTests: "Related Assessments", resources: "Support Resources", otherTopics: "Other Topics",
    eduOnly: "Educational content only", eduOnlyText: "This information is for educational purposes and does not constitute medical advice. Always consult a healthcare professional for personal guidance.",
    typeTherapy: "therapy", typeLifestyle: "lifestyle", typeMedical: "medical", typeSelf: "self-help",
    readTime: "min read",
  },
  geo: {
    title: "Where are you located?", subtitle: "We'll show you local emergency and mental health resources tailored to your country.",
    selectLabel: "Select your country or region",
    confirmBtn: "Confirm", skipBtn: "Skip for now",
    whyAsk: "Why do we ask?", whyText: "MindScope adapts crisis helpline numbers and local mental health resources based on your location. This information is stored only on your device and never shared.",
    region: "Region", country: "Country",
  },
  crisis: {
    title: "Emergency Resources",
    emergency: "Emergency", police: "Police", ambulance: "Ambulance",
    crisisLine: "Crisis Line", textLine: "Text Line", suicide: "Suicide Prevention",
  },
  footer: {
    disclaimer: "MindScope is for informational and educational purposes only. It does not provide medical diagnoses or replace professional mental health care.",
    crisisText: "If you are in crisis, please contact your local emergency services or a crisis helpline.",
  },
  geo_modal: {
    regions: { "north-america": "North America", "europe": "Europe", "asia": "Asia", "latin-america": "Latin America", "oceania": "Oceania", "africa": "Africa", "middle-east": "Middle East", "other": "Other / International" },
  },
  chat: {
    title: "MindScope Assistant",
    subtitle: "Ask about mental health",
    placeholder: "Ask a mental health question…",
    send: "Send",
    welcome: "Hi! I'm the MindScope assistant. I can answer questions about mental health, explain assessment results, or point you toward resources. How can I help you today?",
    error: "Something went wrong. Please try again.",
    thinking: "Thinking…",
    micButton: "Voice",
    listeningLabel: "Listening…",
    micError: "Microphone error. Please try again.",
    micUnsupported: "Voice input not supported in your browser",
  },
};

const fr: Translations = {
  lang: { en: "English", fr: "Français", es: "Español", zh: "中文" },
  nav: { home: "Accueil", tests: "Tests", learn: "Apprendre", history: "Historique", darkMode: "Mode sombre", lightMode: "Mode clair" },
  disclaimer: {
    title: "Avis important",
    full: "Cet outil ne fournit pas de diagnostic médical. Il est destiné à des fins d'information et de prise de conscience uniquement. Les résultats ne remplacent pas l'avis d'un professionnel de santé mentale ou médical. Si vous êtes préoccupé par votre santé mentale, veuillez consulter un professionnel de santé qualifié.",
    compact: "Pas un outil médical. À des fins informatives uniquement, sans diagnostic médical.",
  },
  home: {
    badge: "Gratuit · Anonyme · Pas un outil médical",
    headline1: "Comprenez votre", headline2: "bien-être mental",
    subtitle: "MindScope propose des outils d'auto-évaluation validés pour vous aider à comprendre votre santé émotionnelle — non pas pour diagnostiquer, mais pour informer et responsabiliser. Faites le premier pas vers la conscience de soi.",
    startTest: "Commencer un test", learnMore: "En savoir plus",
    importantNote: "Important : MindScope ne fournit pas de diagnostics médicaux. Toutes les évaluations sont à des fins de prise de conscience et d'information uniquement. Consultez toujours un professionnel qualifié pour des conseils médicaux.",
    feat1Title: "Évaluations validées", feat1Desc: "Plus de 20 outils couvrant la dépression, l'anxiété, le TDAH, le PTSD, l'épuisement, le stress, le sommeil et plus — basés sur des échelles cliniquement reconnues.",
    feat2Title: "Éducation fondée sur des preuves", feat2Desc: "Apprenez les symptômes, causes, traitements et mythes des conditions de santé mentale courantes.",
    feat3Title: "Suivez votre humeur", feat3Desc: "Enregistrez votre humeur quotidienne et visualisez les tendances. Toutes les données restent privées sur votre appareil.",
    popularTests: "Évaluations populaires", viewAll: "Voir tout",
    learnSection: "Apprendre & Comprendre", learnSub: "Éducation fondée sur des preuves sur les sujets de santé mentale",
    privacyTitle: "Votre confidentialité est protégée", privacyDesc: "MindScope ne nécessite pas de compte ni de connexion, et stocke toutes vos données localement sur votre appareil. Rien n'est jamais envoyé à un serveur. Vos réponses sont complètement privées.",
  },
  tests: {
    title: "Bibliothèque d'évaluations", subtitle: "outils d'auto-évaluation validés pour la santé mentale",
    searchPlaceholder: "Rechercher des évaluations...",
    showing: "Affichage de {n} sur {total} évaluations",
    noResults: "Aucune évaluation trouvée", noResultsHint: "Essayez une autre recherche ou catégorie",
    minLabel: "min", qLabel: "questions", typeScreening: "Dépistage", typeSelf: "Auto-évaluation",
    all: "Tous",
  },
  testPage: {
    backToTests: "Retour aux tests", begin: "Commencer l'évaluation", exit: "Quitter",
    prev: "Précédent", next: "Question suivante", seeResults: "Voir les résultats",
    answeredOf: "{n} sur {total} répondues",
    retake: "Reprendre l'évaluation", viewHistory: "Voir l'historique", browseMore: "← Parcourir d'autres évaluations",
    resultsFor: "Résultats pour", resultsLabel: "Vos résultats",
    whatSuggests: "Ce que vos résultats peuvent indiquer", whatToDo: "Ce que vous pouvez faire",
    notAlone: "Vous n'êtes pas seul(e)", notAloneText: "Ces résultats peuvent sembler lourds, mais sachez que ce que vous vivez est réel, valide et — surtout — quelque chose avec lequel un soutien peut aider. Des millions de personnes font face à des défis similaires et trouvent leur chemin vers un mieux-être. Chercher de l'aide est un signe de force, pas de faiblesse.",
    limitationsTitle: "Limites de cette évaluation",
    lim1: "Il s'agit d'un outil de dépistage, pas d'un diagnostic clinique",
    lim2: "Les scores peuvent varier selon votre état le jour de l'évaluation",
    lim3: "De nombreuses conditions partagent des symptômes similaires",
    lim4: "Seul un professionnel qualifié peut fournir une évaluation appropriée",
    lim5: "Les facteurs culturels, contextuels et individuels influencent la présentation des symptômes",
    notFoundTitle: "Évaluation introuvable", notFoundText: "Cette évaluation n'existe pas.", notFoundLink: "Parcourir toutes les évaluations →",
    questionOf: "Question {n} sur {total}",
    scoreOf: "sur {max}",
    disclaimer: "Vos résultats suggèrent des symptômes pouvant être compatibles avec {label}. Ce n'est pas un diagnostic.",
  },
  resultCard: {
    suggests: "Ce que vos résultats peuvent indiquer",
    notDiagnosis: "Vos résultats suggèrent des symptômes pouvant être compatibles avec {label}. Ce n'est pas un diagnostic.",
    crisis1: "Numéro national de prévention du suicide : 3114",
    crisis2: "SAMU : 15 · Police : 17 · Pompiers : 18",
    screening: "Il s'agit d'un outil de dépistage, pas d'un diagnostic clinique",
    notScreening: "Les scores peuvent varier selon votre état le jour de l'évaluation",
    clinical: "De nombreuses conditions partagent des symptômes similaires",
    tools: "Seul un professionnel qualifié peut fournir une évaluation appropriée",
    professional: "Les facteurs culturels, contextuels et individuels influencent la présentation des symptômes",
  },
  history: {
    title: "Votre historique", subtitle: "Vos résultats d'évaluation passés et le suivi de l'humeur — stockés uniquement sur votre appareil.",
    tabTests: "Résultats des tests", tabMood: "Suivi de l'humeur",
    noResultsTitle: "Aucun résultat pour l'instant", noResultsText: "Complétez une évaluation pour voir vos résultats ici.",
    browseBtn: "Parcourir les évaluations",
    clearAll: "Tout effacer", confirmClear: "Cliquez à nouveau pour confirmer",
    privacyNote: "Ces résultats sont stockés localement dans votre navigateur. Ils ne sont envoyés nulle part.",
    retake: "Reprendre", resultsCount: "{n} résultat(s) enregistré(s)",
    saved: "enregistré",
  },
  mood: {
    title: "Comment vous sentez-vous aujourd'hui ?",
    today: "",
    addNote: "Ajoutez une note sur votre ressenti (facultatif)...",
    saveBtn: "Enregistrer l'humeur du jour", savedBtn: "✓ Enregistré",
    chartTitle: "Humeur au fil du temps", chartSub: "{n} dernières entrées",
    moodLabel: "Humeur",
    sleepLabel: "Sommeil", sleepHours: "heures",
    appetiteLabel: "Appétit",
    energyLabel: "Énergie",
    journalLabel: "Journal", journalPlaceholder: "Comment s'est passée ta journée ? Pensées, émotions, événements à noter…",
    historyTitle: "Journal quotidien",
    noEntries: "Aucune entrée pour l'instant. Commence à suivre aujourd'hui !",
    clearJournal: "Effacer toutes les entrées", confirmClear: "Confirmer la suppression",
    appetiteOpts: ["Très faible", "Faible", "Normal", "Bon", "Excellent"],
    energyOpts: ["Épuisé(e)", "Fatigué(e)", "Correct", "Bien", "Plein(e) d'énergie"],
    hoursUnit: "h",
    medTitle: "Médicament", medManage: "Gérer mes médicaments", medAdd: "Ajouter",
    medSave: "Enregistrer", medRemove: "Supprimer", medEmpty: "Aucun traitement enregistré.",
    medPlaceholder: "ex: Sertraline 50mg", medTaken: "Pris", medNotTaken: "Non pris",
    medSectionTitle: "Traitement",
    behaviourTitle: "Comportements (optionnel)",
    alcoholLabel: "Alcool", alcoholDrinks: "verres", alcoholNone: "Aucun",
    substancesLabel: "Substances", substancesNote: "Note (optionnel)",
    substanceOpts: ["Aucune", "Légère", "Modérée", "Importante"],
    riskLabel: "Comportement à risque", riskNote: "Décrire (optionnel)",
    riskYes: "Oui", riskNo: "Non",
    reportForTherapist: "Pour mon thérapeute", reportForSelf: "Pour moi",
    reportTypeLabel: "Destinataire du rapport",
    reportTitle: "Rapport de suivi", reportGenerate: "Générer le rapport",
    reportPeriod1w: "1 semaine", reportPeriod1m: "1 mois", reportPeriod1y: "1 an",
    reportFrom: "Du", reportTo: "au",
    reportDaysTracked: "jours suivis", reportAvg: "Moy.", reportMin: "Min", reportMax: "Max",
    reportSummary: "Résumé", reportDailyLog: "Journal quotidien", reportBehaviours: "Comportements",
    reportNoData: "Aucune donnée pour cette période.", reportDownloading: "Génération du PDF…",
    reportDate: "Date", reportMood: "Humeur", reportSleep: "Sommeil",
    reportAlcohol: "Alcool", reportSubstances: "Substances", reportRisk: "Risque",
    reportJournal: "Journal", reportGenBy: "Généré par MindScope",
  },
  learn: {
    back: "Retour à la bibliothèque",
    libraryTitle: "Bibliothèque d'apprentissage", librarySubtitle: "Éducation fondée sur des preuves en santé mentale",
    searchPlaceholder: "Rechercher des sujets...", noResults: "Aucun sujet trouvé", noResultsHint: "Essayez un autre terme de recherche",
    symptomsTitle: "Symptômes", causesTitle: "Causes et facteurs contributifs",
    treatmentsTitle: "Options de traitement", treatmentNote: "Discutez toujours des options de traitement avec un professionnel de santé qualifié.",
    mythsTitle: "Mythes vs. Réalités", mythLabel: "Mythe", factLabel: "Réalité",
    relatedTests: "Évaluations associées", resources: "Ressources de soutien", otherTopics: "Autres sujets",
    eduOnly: "Contenu éducatif uniquement", eduOnlyText: "Ces informations sont à des fins éducatives et ne constituent pas un avis médical. Consultez toujours un professionnel de santé pour des conseils personnels.",
    typeTherapy: "thérapie", typeLifestyle: "mode de vie", typeMedical: "médical", typeSelf: "auto-soin",
    readTime: "min de lecture",
  },
  geo: {
    title: "Où êtes-vous situé(e) ?", subtitle: "Nous vous afficherons les ressources locales d'urgence et de santé mentale adaptées à votre pays.",
    selectLabel: "Sélectionnez votre pays ou région",
    confirmBtn: "Confirmer", skipBtn: "Passer pour l'instant",
    whyAsk: "Pourquoi nous demandons ?", whyText: "MindScope adapte les numéros d'aide en situation de crise et les ressources locales de santé mentale en fonction de votre localisation. Ces informations sont stockées uniquement sur votre appareil et ne sont jamais partagées.",
    region: "Région", country: "Pays",
  },
  crisis: {
    title: "Ressources d'urgence",
    emergency: "Urgences", police: "Police", ambulance: "Ambulance",
    crisisLine: "Ligne de crise", textLine: "Ligne de texto", suicide: "Prévention du suicide",
  },
  footer: {
    disclaimer: "MindScope est à des fins informatives et éducatives uniquement. Il ne fournit pas de diagnostics médicaux et ne remplace pas les soins professionnels de santé mentale.",
    crisisText: "En cas de crise, contactez le 15 (SAMU), le 17 (Police) ou le 3114 (numéro national de prévention du suicide).",
  },
  geo_modal: {
    regions: { "north-america": "Amérique du Nord", "europe": "Europe", "asia": "Asie", "latin-america": "Amérique latine", "oceania": "Océanie", "africa": "Afrique", "middle-east": "Moyen-Orient", "other": "Autre / International" },
  },
  chat: {
    title: "Assistant MindScope",
    subtitle: "Posez vos questions sur la santé mentale",
    placeholder: "Posez une question sur la santé mentale…",
    send: "Envoyer",
    welcome: "Bonjour ! Je suis l'assistant MindScope. Je peux répondre à vos questions sur la santé mentale, expliquer les résultats de tests, ou vous orienter vers des ressources. Comment puis-je vous aider ?",
    error: "Une erreur s'est produite. Veuillez réessayer.",
    thinking: "Réflexion en cours…",
    micButton: "Voix",
    listeningLabel: "À l'écoute…",
    micError: "Erreur microphone. Veuillez réessayer.",
    micUnsupported: "L'entrée vocale n'est pas supportée dans votre navigateur",
  },
};

const es: Translations = {
  lang: { en: "English", fr: "Français", es: "Español", zh: "中文" },
  nav: { home: "Inicio", tests: "Tests", learn: "Aprender", history: "Historial", darkMode: "Modo oscuro", lightMode: "Modo claro" },
  disclaimer: {
    title: "Aviso importante",
    full: "Esta herramienta no proporciona diagnósticos médicos. Es solo para fines informativos y de autoconciencia. Los resultados no sustituyen el consejo médico o de salud mental profesional. Si le preocupa su salud mental, consulte a un profesional de la salud calificado.",
    compact: "No es una herramienta médica. Solo con fines informativos, no proporciona diagnóstico médico.",
  },
  home: {
    badge: "Gratis · Anónimo · No es una herramienta médica",
    headline1: "Comprenda su", headline2: "bienestar mental",
    subtitle: "MindScope ofrece herramientas de autoevaluación validadas para ayudarle a comprender su salud emocional — no para diagnosticar, sino para informar y empoderar. Dé el primer paso hacia la autoconciencia.",
    startTest: "Comenzar un test", learnMore: "Aprender más",
    importantNote: "Importante: MindScope no proporciona diagnósticos médicos. Todas las evaluaciones son solo para autoconciencia e información. Consulte siempre a un profesional cualificado.",
    feat1Title: "Evaluaciones validadas", feat1Desc: "Más de 20 herramientas que cubren depresión, ansiedad, TDAH, PTSD, agotamiento, estrés, sueño y más, basadas en escalas clínicamente reconocidas.",
    feat2Title: "Educación basada en evidencia", feat2Desc: "Aprenda sobre síntomas, causas, tratamientos y mitos de las condiciones de salud mental comunes.",
    feat3Title: "Registre su estado de ánimo", feat3Desc: "Registre su estado de ánimo diario y visualice patrones con el tiempo. Todos los datos permanecen privados en su dispositivo.",
    popularTests: "Evaluaciones populares", viewAll: "Ver todas",
    learnSection: "Aprender y Entender", learnSub: "Educación basada en evidencia sobre temas de salud mental",
    privacyTitle: "Su privacidad está protegida", privacyDesc: "MindScope no requiere cuenta ni inicio de sesión, y almacena todos sus datos localmente en su dispositivo. Nada se envía jamás a un servidor. Sus respuestas son completamente privadas.",
  },
  tests: {
    title: "Biblioteca de Evaluaciones", subtitle: "herramientas de autoevaluación validadas para la salud mental",
    searchPlaceholder: "Buscar evaluaciones...",
    showing: "Mostrando {n} de {total} evaluaciones",
    noResults: "No se encontraron evaluaciones", noResultsHint: "Pruebe una búsqueda o categoría diferente",
    minLabel: "min", qLabel: "preguntas", typeScreening: "Detección", typeSelf: "Autoevaluación",
    all: "Todos",
  },
  testPage: {
    backToTests: "Volver a los tests", begin: "Comenzar la Evaluación", exit: "Salir",
    prev: "Anterior", next: "Siguiente pregunta", seeResults: "Ver resultados",
    answeredOf: "{n} de {total} respondidas",
    retake: "Repetir la evaluación", viewHistory: "Ver historial", browseMore: "← Explorar más evaluaciones",
    resultsFor: "Resultados para", resultsLabel: "Sus resultados",
    whatSuggests: "Lo que pueden indicar sus resultados", whatToDo: "Qué puede hacer",
    notAlone: "No está solo/a", notAloneText: "Estos resultados pueden sentirse pesados, pero sepa que lo que está experimentando es real, válido y, lo más importante, algo con lo que el apoyo puede ayudar. Millones de personas enfrentan desafíos similares y encuentran su camino hacia sentirse mejor.",
    limitationsTitle: "Limitaciones de esta evaluación",
    lim1: "Es una herramienta de detección, no un diagnóstico clínico",
    lim2: "Las puntuaciones pueden variar según cómo se sienta ese día",
    lim3: "Muchas condiciones comparten síntomas similares",
    lim4: "Solo un profesional cualificado puede proporcionar una evaluación adecuada",
    lim5: "Los factores culturales, contextuales e individuales afectan cómo se presentan los síntomas",
    notFoundTitle: "Evaluación no encontrada", notFoundText: "Esta evaluación no existe.", notFoundLink: "Explorar todas las evaluaciones →",
    questionOf: "Pregunta {n} de {total}",
    scoreOf: "de {max}",
    disclaimer: "Sus resultados sugieren síntomas que pueden ser consistentes con {label}. Esto no es un diagnóstico.",
  },
  resultCard: {
    suggests: "Lo que pueden indicar sus resultados",
    notDiagnosis: "Sus resultados sugieren síntomas que pueden ser consistentes con {label}. Esto no es un diagnóstico.",
    crisis1: "Línea de crisis: 024 (España)",
    crisis2: "Emergencias: 112",
    screening: "Es una herramienta de detección, no un diagnóstico clínico",
    notScreening: "Las puntuaciones pueden variar según cómo se sienta ese día",
    clinical: "Muchas condiciones comparten síntomas similares",
    tools: "Solo un profesional cualificado puede proporcionar una evaluación adecuada",
    professional: "Los factores culturales, contextuales e individuales afectan cómo se presentan los síntomas",
  },
  history: {
    title: "Su Historial", subtitle: "Sus resultados de evaluaciones pasados y seguimiento del estado de ánimo — almacenados solo en su dispositivo.",
    tabTests: "Resultados de tests", tabMood: "Seguimiento del estado de ánimo",
    noResultsTitle: "Aún no hay resultados", noResultsText: "Complete una evaluación para ver sus resultados aquí.",
    browseBtn: "Explorar evaluaciones",
    clearAll: "Borrar todo", confirmClear: "Haga clic de nuevo para confirmar",
    privacyNote: "Estos resultados se almacenan localmente en su navegador. No se envían a ningún lugar.",
    retake: "Repetir", resultsCount: "{n} resultado(s) guardado(s)",
    saved: "guardado",
  },
  mood: {
    title: "¿Cómo se siente hoy?",
    today: "",
    addNote: "Añada una nota sobre cómo se siente (opcional)...",
    saveBtn: "Guardar el estado de ánimo de hoy", savedBtn: "✓ Guardado",
    chartTitle: "Estado de ánimo en el tiempo", chartSub: "Últimas {n} entradas",
    moodLabel: "Ánimo",
    sleepLabel: "Sueño", sleepHours: "horas",
    appetiteLabel: "Apetito",
    energyLabel: "Energía",
    journalLabel: "Diario", journalPlaceholder: "¿Cómo fue tu día? Pensamientos, emociones, eventos a destacar…",
    historyTitle: "Registro diario",
    noEntries: "Sin entradas todavía. ¡Empieza a registrar hoy!",
    clearJournal: "Borrar todas las entradas", confirmClear: "Confirmar eliminación",
    appetiteOpts: ["Muy bajo", "Bajo", "Normal", "Bueno", "Excelente"],
    energyOpts: ["Agotado/a", "Cansado/a", "Regular", "Bien", "Lleno/a de energía"],
    hoursUnit: "h",
    behaviourTitle: "Comportamientos (opcional)",
    alcoholLabel: "Alcohol", alcoholDrinks: "copas", alcoholNone: "Ninguno",
    substancesLabel: "Sustancias", substancesNote: "Nota (opcional)",
    substanceOpts: ["Ninguna", "Ligera", "Moderada", "Intensa"],
    riskLabel: "Comportamiento de riesgo", riskNote: "Describir (opcional)",
    riskYes: "Sí", riskNo: "No",
    medTitle: "Medicamento", medManage: "Gestionar medicamentos", medAdd: "Añadir",
    medSave: "Guardar lista", medRemove: "Eliminar", medEmpty: "Ningún tratamiento registrado.",
    medPlaceholder: "ej: Sertralina 50mg", medTaken: "Tomado", medNotTaken: "No tomado",
    medSectionTitle: "Tratamiento",
    reportForTherapist: "Para mi terapeuta", reportForSelf: "Para mí",
    reportTypeLabel: "Destinatario del informe",
    reportTitle: "Informe de seguimiento", reportGenerate: "Generar informe",
    reportPeriod1w: "1 semana", reportPeriod1m: "1 mes", reportPeriod1y: "1 año",
    reportFrom: "Del", reportTo: "al",
    reportDaysTracked: "días registrados", reportAvg: "Prom.", reportMin: "Mín", reportMax: "Máx",
    reportSummary: "Resumen", reportDailyLog: "Registro diario", reportBehaviours: "Comportamientos",
    reportNoData: "Sin datos para este período.", reportDownloading: "Generando PDF…",
    reportDate: "Fecha", reportMood: "Ánimo", reportSleep: "Sueño",
    reportAlcohol: "Alcohol", reportSubstances: "Sustancias", reportRisk: "Riesgo",
    reportJournal: "Diario", reportGenBy: "Generado por MindScope",
  },
  learn: {
    back: "Volver a la biblioteca",
    libraryTitle: "Biblioteca de aprendizaje", librarySubtitle: "Educación sobre salud mental basada en evidencia",
    searchPlaceholder: "Buscar temas...", noResults: "No se encontraron temas", noResultsHint: "Pruebe un término de búsqueda diferente",
    symptomsTitle: "Síntomas", causesTitle: "Causas y factores contribuyentes",
    treatmentsTitle: "Opciones de tratamiento", treatmentNote: "Siempre consulte las opciones de tratamiento con un profesional de salud cualificado.",
    mythsTitle: "Mitos vs. Hechos", mythLabel: "Mito", factLabel: "Hecho",
    relatedTests: "Evaluaciones relacionadas", resources: "Recursos de apoyo", otherTopics: "Otros temas",
    eduOnly: "Solo contenido educativo", eduOnlyText: "Esta información es para fines educativos y no constituye consejo médico. Siempre consulte a un profesional de salud para orientación personal.",
    typeTherapy: "terapia", typeLifestyle: "estilo de vida", typeMedical: "médico", typeSelf: "autoayuda",
    readTime: "min de lectura",
  },
  geo: {
    title: "¿Dónde está ubicado/a?", subtitle: "Le mostraremos recursos locales de emergencia y salud mental adaptados a su país.",
    selectLabel: "Seleccione su país o región",
    confirmBtn: "Confirmar", skipBtn: "Omitir por ahora",
    whyAsk: "¿Por qué lo pedimos?", whyText: "MindScope adapta los números de línea de crisis y los recursos locales de salud mental según su ubicación. Esta información se almacena solo en su dispositivo y nunca se comparte.",
    region: "Región", country: "País",
  },
  crisis: {
    title: "Recursos de emergencia",
    emergency: "Emergencia", police: "Policía", ambulance: "Ambulancia",
    crisisLine: "Línea de crisis", textLine: "Línea de texto", suicide: "Prevención del suicidio",
  },
  footer: {
    disclaimer: "MindScope es solo para fines informativos y educativos. No proporciona diagnósticos médicos ni reemplaza la atención profesional de salud mental.",
    crisisText: "Si está en crisis, contacte a los servicios de emergencia locales o a una línea de ayuda en crisis.",
  },
  geo_modal: {
    regions: { "north-america": "América del Norte", "europe": "Europa", "asia": "Asia", "latin-america": "América Latina", "oceania": "Oceanía", "africa": "África", "middle-east": "Oriente Medio", "other": "Otro / Internacional" },
  },
  chat: {
    title: "Asistente MindScope",
    subtitle: "Haga preguntas sobre salud mental",
    placeholder: "Haga una pregunta sobre salud mental…",
    send: "Enviar",
    welcome: "¡Hola! Soy el asistente de MindScope. Puedo responder preguntas sobre salud mental, explicar resultados de evaluaciones o guiarle hacia recursos. ¿Cómo puedo ayudarle hoy?",
    error: "Algo salió mal. Por favor, inténtelo de nuevo.",
    thinking: "Pensando…",
    micButton: "Voz",
    listeningLabel: "Escuchando…",
    micError: "Error de micrófono. Por favor, inténtelo de nuevo.",
    micUnsupported: "La entrada de voz no es compatible con su navegador",
  },
};

const zh: Translations = {
  lang: { en: "English", fr: "Français", es: "Español", zh: "中文" },
  nav: { home: "首页", tests: "测试", learn: "学习", history: "历史", darkMode: "深色模式", lightMode: "浅色模式" },
  disclaimer: {
    title: "重要声明",
    full: "本工具不提供医疗诊断。仅供参考和自我认知之用。结果不能替代专业医疗或心理健康建议。如果您担心自己的心理健康，请咨询合格的医疗保健专业人员。",
    compact: "非医疗工具。仅供参考，不提供医疗诊断。",
  },
  home: {
    badge: "免费 · 匿名 · 非医疗工具",
    headline1: "了解您的", headline2: "心理健康",
    subtitle: "MindScope 提供经过验证的自我评估工具，帮助您了解自己的情绪健康——不是为了诊断，而是为了告知和赋能。迈出自我认知的第一步。",
    startTest: "开始测试", learnMore: "了解更多",
    importantNote: "重要：MindScope 不提供医疗诊断。所有评估仅供自我认知和参考之用。请始终咨询合格的专业人员以获取医疗建议。",
    feat1Title: "经过验证的评估", feat1Desc: "20多种工具，涵盖抑郁、焦虑、多动症、创伤后应激障碍、倦怠、压力、睡眠等——基于临床认可的筛查量表。",
    feat2Title: "循证教育", feat2Desc: "了解常见心理健康状况的症状、原因、治疗方法和误解。",
    feat3Title: "追踪您的情绪", feat3Desc: "记录每日情绪并随时间可视化规律。所有数据都保存在您的设备上，完全私密。",
    popularTests: "热门评估", viewAll: "查看全部",
    learnSection: "学习与理解", learnSub: "基于证据的心理健康主题教育",
    privacyTitle: "您的隐私受到保护", privacyDesc: "MindScope 不需要账户或登录，所有数据都本地存储在您的设备上。任何信息都不会发送到服务器。您的回答完全保密。",
  },
  tests: {
    title: "评估库", subtitle: "项经过验证的心理健康自我评估工具",
    searchPlaceholder: "搜索评估...",
    showing: "显示 {n} 项，共 {total} 项",
    noResults: "未找到评估", noResultsHint: "请尝试不同的搜索词或类别",
    minLabel: "分钟", qLabel: "题", typeScreening: "筛查", typeSelf: "自我评估",
    all: "全部",
  },
  testPage: {
    backToTests: "返回测试列表", begin: "开始评估", exit: "退出",
    prev: "上一题", next: "下一题", seeResults: "查看结果",
    answeredOf: "已答 {n} / {total} 题",
    retake: "重新评估", viewHistory: "查看历史", browseMore: "← 浏览更多评估",
    resultsFor: "评估结果", resultsLabel: "您的结果",
    whatSuggests: "您的结果可能表明", whatToDo: "您可以做什么",
    notAlone: "您并不孤单", notAloneText: "这些分数可能让您感到沉重，但请知道，您所经历的是真实的、有效的——最重要的是，支持可以帮助您。数百万人面临类似的挑战，并找到了感觉更好的方法。寻求帮助是力量的表现，而不是软弱。",
    limitationsTitle: "本评估的局限性",
    lim1: "这是一个筛查工具，不是临床诊断",
    lim2: "分数可能因您当天的状态而有所不同",
    lim3: "许多疾病共享重叠的症状",
    lim4: "只有合格的专业人员才能提供适当的评估",
    lim5: "文化、情境和个人因素影响症状的表现方式",
    notFoundTitle: "未找到评估", notFoundText: "此评估不存在。", notFoundLink: "浏览所有评估 →",
    questionOf: "第 {n} 题，共 {total} 题",
    scoreOf: "满分 {max}",
    disclaimer: "您的结果表明可能与 {label} 相符的症状。这不是诊断。",
  },
  resultCard: {
    suggests: "您的结果可能表明",
    notDiagnosis: "您的结果表明可能与 {label} 相符的症状。这不是诊断。",
    crisis1: "心理援助热线：400-161-9995（北京）",
    crisis2: "急救：120 · 报警：110",
    screening: "这是一个筛查工具，不是临床诊断",
    notScreening: "分数可能因您当天的状态而有所不同",
    clinical: "许多疾病共享重叠的症状",
    tools: "只有合格的专业人员才能提供适当的评估",
    professional: "文化、情境和个人因素影响症状的表现方式",
  },
  history: {
    title: "您的历史记录", subtitle: "您过去的评估结果和情绪追踪——仅存储在您的设备上。",
    tabTests: "测试结果", tabMood: "情绪追踪",
    noResultsTitle: "暂无结果", noResultsText: "完成评估后，您的结果将显示在此处。",
    browseBtn: "浏览评估",
    clearAll: "全部清除", confirmClear: "再次点击确认",
    privacyNote: "这些结果存储在您的浏览器本地。不会发送到任何地方。",
    retake: "重新测试", resultsCount: "已保存 {n} 个结果",
    saved: "已保存",
  },
  mood: {
    title: "今天感觉如何？",
    today: "",
    addNote: "添加关于您感受的备注（可选）...",
    saveBtn: "保存今日情绪", savedBtn: "✓ 已保存",
    chartTitle: "情绪随时间变化", chartSub: "最近 {n} 条记录",
    moodLabel: "情绪",
    sleepLabel: "睡眠", sleepHours: "小时",
    appetiteLabel: "食欲",
    energyLabel: "精力",
    journalLabel: "日记", journalPlaceholder: "今天过得怎么样？记录一下你的想法、感受或发生的事情……",
    historyTitle: "每日记录",
    noEntries: "还没有任何记录。今天开始追踪吧！",
    clearJournal: "清除所有记录", confirmClear: "确认删除",
    appetiteOpts: ["非常差", "较差", "一般", "良好", "极佳"],
    energyOpts: ["精疲力竭", "疲惫", "还好", "良好", "精力充沛"],
    hoursUnit: "时",
    behaviourTitle: "行为记录（可选）",
    alcoholLabel: "酒精", alcoholDrinks: "杯", alcoholNone: "无",
    substancesLabel: "物质使用", substancesNote: "备注（可选）",
    substanceOpts: ["无", "轻度", "中度", "重度"],
    riskLabel: "冒险行为", riskNote: "描述（可选）",
    riskYes: "是", riskNo: "否",
    medTitle: "药物", medManage: "管理药物", medAdd: "添加",
    medSave: "保存列表", medRemove: "删除", medEmpty: "暂无已记录的药物。",
    medPlaceholder: "例: 舍曲林 50mg", medTaken: "已服用", medNotTaken: "未服用",
    medSectionTitle: "治疗",
    reportForTherapist: "给我的治疗师", reportForSelf: "给自己",
    reportTypeLabel: "报告收件人",
    reportTitle: "健康追踪报告", reportGenerate: "生成报告",
    reportPeriod1w: "1周", reportPeriod1m: "1个月", reportPeriod1y: "1年",
    reportFrom: "从", reportTo: "至",
    reportDaysTracked: "天已记录", reportAvg: "均值", reportMin: "最低", reportMax: "最高",
    reportSummary: "摘要", reportDailyLog: "每日日志", reportBehaviours: "行为",
    reportNoData: "该时段无数据。", reportDownloading: "正在生成PDF…",
    reportDate: "日期", reportMood: "情绪", reportSleep: "睡眠",
    reportAlcohol: "酒精", reportSubstances: "物质", reportRisk: "风险",
    reportJournal: "日记", reportGenBy: "由 MindScope 生成",
  },
  learn: {
    back: "返回图书馆",
    libraryTitle: "学习库", librarySubtitle: "循证心理健康教育",
    searchPlaceholder: "搜索主题...", noResults: "未找到主题", noResultsHint: "请尝试不同的搜索词",
    symptomsTitle: "症状", causesTitle: "原因与影响因素",
    treatmentsTitle: "治疗选项", treatmentNote: "请始终与合格的医疗保健专业人员讨论治疗选项。",
    mythsTitle: "误解与事实", mythLabel: "误解", factLabel: "事实",
    relatedTests: "相关评估", resources: "支持资源", otherTopics: "其他主题",
    eduOnly: "仅供教育用途", eduOnlyText: "本信息仅供教育目的，不构成医疗建议。请始终咨询医疗保健专业人员以获取个人指导。",
    typeTherapy: "心理治疗", typeLifestyle: "生活方式", typeMedical: "药物治疗", typeSelf: "自助",
    readTime: "分钟阅读",
  },
  geo: {
    title: "您在哪里？", subtitle: "我们将为您显示根据您所在国家定制的本地紧急和心理健康资源。",
    selectLabel: "选择您的国家或地区",
    confirmBtn: "确认", skipBtn: "暂时跳过",
    whyAsk: "为什么我们询问？", whyText: "MindScope 根据您的位置调整危机热线号码和本地心理健康资源。此信息仅存储在您的设备上，从不共享。",
    region: "地区", country: "国家",
  },
  crisis: {
    title: "紧急资源",
    emergency: "紧急情况", police: "警察", ambulance: "救护车",
    crisisLine: "危机热线", textLine: "短信热线", suicide: "自杀预防",
  },
  footer: {
    disclaimer: "MindScope 仅供参考和教育目的。不提供医疗诊断，也不能替代专业心理健康护理。",
    crisisText: "如果您处于危机中，请联系当地紧急服务或危机热线。",
  },
  geo_modal: {
    regions: { "north-america": "北美洲", "europe": "欧洲", "asia": "亚洲", "latin-america": "拉丁美洲", "oceania": "大洋洲", "africa": "非洲", "middle-east": "中东", "other": "其他 / 国际" },
  },
  chat: {
    title: "MindScope 助手",
    subtitle: "咨询心理健康问题",
    placeholder: "提问心理健康相关问题…",
    send: "发送",
    welcome: "您好！我是MindScope助手。我可以回答心理健康相关问题、解释评估结果，或为您提供资源指引。今天我能帮您什么？",
    error: "出现了问题，请重试。",
    thinking: "思考中…",
    micButton: "语音",
    listeningLabel: "聆听中…",
    micError: "麦克风错误，请重试。",
    micUnsupported: "您的浏览器不支持语音输入",
  },
};

export const translations: Record<Lang, Translations> = { en, fr, es, zh };

export function t(lang: Lang): Translations {
  return translations[lang] ?? translations.en;
}

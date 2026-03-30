export interface EmergencyResource {
  name: string;
  number: string;
  type: "emergency" | "crisis" | "suicide" | "text" | "chat";
  available?: string;
}

export interface CountryEmergency {
  countryCode: string;
  country: { en: string; fr: string; es: string; zh: string };
  region: string;
  generalEmergency: string;
  police?: string;
  ambulance?: string;
  fire?: string;
  resources: EmergencyResource[];
}

export const emergencyData: CountryEmergency[] = [
  // FRANCE
  {
    countryCode: "FR", region: "europe",
    country: { en: "France", fr: "France", es: "Francia", zh: "法国" },
    generalEmergency: "112", police: "17", ambulance: "15", fire: "18",
    resources: [
      { name: "Numéro national prévention suicide", number: "3114", type: "suicide", available: "24h/7j" },
      { name: "SOS Amitié", number: "09 72 39 40 50", type: "crisis", available: "24h/7j" },
      { name: "Écoute Alcool", number: "09 74 75 13 13", type: "crisis" },
      { name: "Drogues Info Service", number: "0800 23 13 13", type: "crisis" },
      { name: "Fil Santé Jeunes (13-25 ans)", number: "3114", type: "crisis" },
    ],
  },
  // USA
  {
    countryCode: "US", region: "north-america",
    country: { en: "United States", fr: "États-Unis", es: "Estados Unidos", zh: "美国" },
    generalEmergency: "911", police: "911", ambulance: "911",
    resources: [
      { name: "988 Suicide & Crisis Lifeline", number: "988", type: "suicide", available: "24/7" },
      { name: "Crisis Text Line", number: "Text HOME to 741741", type: "text", available: "24/7" },
      { name: "NAMI Helpline", number: "1-800-950-6264", type: "crisis" },
      { name: "SAMHSA Helpline", number: "1-800-662-4357", type: "crisis", available: "24/7" },
    ],
  },
  // UK
  {
    countryCode: "GB", region: "europe",
    country: { en: "United Kingdom", fr: "Royaume-Uni", es: "Reino Unido", zh: "英国" },
    generalEmergency: "999", police: "999", ambulance: "999",
    resources: [
      { name: "Samaritans", number: "116 123", type: "crisis", available: "24/7" },
      { name: "Crisis Text Line", number: "Text SHOUT to 85258", type: "text", available: "24/7" },
      { name: "Mind Infoline", number: "0300 123 3393", type: "crisis" },
      { name: "CALM (Men)", number: "0800 58 58 58", type: "crisis", available: "17h–00h" },
    ],
  },
  // CANADA
  {
    countryCode: "CA", region: "north-america",
    country: { en: "Canada", fr: "Canada", es: "Canadá", zh: "加拿大" },
    generalEmergency: "911", police: "911", ambulance: "911",
    resources: [
      { name: "Talk Suicide Canada", number: "1-833-456-4566", type: "suicide", available: "24/7" },
      { name: "Crisis Text Line", number: "Text HOME to 686868", type: "text", available: "24/7" },
      { name: "Canada Suicide Prevention", number: "1-800-456-4566", type: "crisis" },
      { name: "Kids Help Phone", number: "1-800-668-6868", type: "crisis", available: "24/7" },
    ],
  },
  // SPAIN
  {
    countryCode: "ES", region: "europe",
    country: { en: "Spain", fr: "Espagne", es: "España", zh: "西班牙" },
    generalEmergency: "112", police: "091", ambulance: "061",
    resources: [
      { name: "Teléfono de la Esperanza", number: "717 003 717", type: "crisis", available: "24h/7d" },
      { name: "Línea de atención conducta suicida", number: "024", type: "suicide", available: "24h/7d" },
      { name: "Cruz Roja", number: "900 107 917", type: "crisis" },
    ],
  },
  // CHINA
  {
    countryCode: "CN", region: "asia",
    country: { en: "China", fr: "Chine", es: "China", zh: "中国" },
    generalEmergency: "120", police: "110", fire: "119",
    resources: [
      { name: "北京心理危机研究与干预中心", number: "010-82951332", type: "suicide", available: "24h" },
      { name: "全国心理援助热线", number: "400-161-9995", type: "crisis" },
      { name: "希望24热线", number: "400-161-9995", type: "crisis", available: "24h" },
      { name: "生命热线", number: "400-821-1215", type: "crisis", available: "24h" },
    ],
  },
  // GERMANY
  {
    countryCode: "DE", region: "europe",
    country: { en: "Germany", fr: "Allemagne", es: "Alemania", zh: "德国" },
    generalEmergency: "112", police: "110",
    resources: [
      { name: "Telefonseelsorge (evangelisch)", number: "0800 111 0 111", type: "crisis", available: "24h/7" },
      { name: "Telefonseelsorge (katholisch)", number: "0800 111 0 222", type: "crisis", available: "24h/7" },
      { name: "Nummero gegen Kummer", number: "0800 111 0 550", type: "crisis" },
    ],
  },
  // AUSTRALIA
  {
    countryCode: "AU", region: "oceania",
    country: { en: "Australia", fr: "Australie", es: "Australia", zh: "澳大利亚" },
    generalEmergency: "000", police: "000", ambulance: "000",
    resources: [
      { name: "Lifeline", number: "13 11 14", type: "crisis", available: "24/7" },
      { name: "Beyond Blue", number: "1300 22 4636", type: "crisis", available: "24/7" },
      { name: "Suicide Call Back Service", number: "1300 659 467", type: "suicide", available: "24/7" },
      { name: "Crisis Text Line", number: "Text START to 0477 13 11 14", type: "text" },
    ],
  },
  // BELGIUM
  {
    countryCode: "BE", region: "europe",
    country: { en: "Belgium", fr: "Belgique", es: "Bélgica", zh: "比利时" },
    generalEmergency: "112", police: "101", ambulance: "100",
    resources: [
      { name: "Centre de Prévention du Suicide", number: "0800 32 123", type: "suicide", available: "24h/7j" },
      { name: "Télé-Accueil", number: "0800 555 66", type: "crisis", available: "24h/7j" },
      { name: "Zelfmoordlijn", number: "0800 32 123", type: "suicide" },
    ],
  },
  // SWITZERLAND
  {
    countryCode: "CH", region: "europe",
    country: { en: "Switzerland", fr: "Suisse", es: "Suiza", zh: "瑞士" },
    generalEmergency: "112", police: "117", ambulance: "144",
    resources: [
      { name: "La Main Tendue / Die Dargebotene Hand", number: "143", type: "crisis", available: "24h/7j" },
      { name: "Pro Juventute (jeunes)", number: "147", type: "crisis" },
    ],
  },
  // MEXICO
  {
    countryCode: "MX", region: "latin-america",
    country: { en: "Mexico", fr: "Mexique", es: "México", zh: "墨西哥" },
    generalEmergency: "911", police: "911", ambulance: "911",
    resources: [
      { name: "SAPTEL", number: "55 5259-8121", type: "crisis", available: "24h/7d" },
      { name: "CAPA (CDMX)", number: "55 5484-7345", type: "crisis" },
      { name: "CONADIC", number: "800 911 2000", type: "crisis" },
    ],
  },
  // BRAZIL
  {
    countryCode: "BR", region: "latin-america",
    country: { en: "Brazil", fr: "Brésil", es: "Brasil", zh: "巴西" },
    generalEmergency: "192", police: "190", ambulance: "192",
    resources: [
      { name: "CVV (Centro de Valorização da Vida)", number: "188", type: "suicide", available: "24h/7d" },
      { name: "CVV Chat", number: "cvv.org.br", type: "chat", available: "24h/7d" },
    ],
  },
  // JAPAN
  {
    countryCode: "JP", region: "asia",
    country: { en: "Japan", fr: "Japon", es: "Japón", zh: "日本" },
    generalEmergency: "119", police: "110",
    resources: [
      { name: "よりそいホットライン", number: "0120-279-338", type: "crisis", available: "24h" },
      { name: "いのちの電話", number: "0120-783-556", type: "suicide" },
      { name: "TELL Lifeline (English)", number: "03-5774-0992", type: "crisis" },
    ],
  },
  // SOUTH KOREA
  {
    countryCode: "KR", region: "asia",
    country: { en: "South Korea", fr: "Corée du Sud", es: "Corea del Sur", zh: "韩国" },
    generalEmergency: "119", police: "112",
    resources: [
      { name: "자살예방상담전화", number: "1393", type: "suicide", available: "24h" },
      { name: "정신건강 위기상담전화", number: "1577-0199", type: "crisis", available: "24h" },
    ],
  },
  // INDIA
  {
    countryCode: "IN", region: "asia",
    country: { en: "India", fr: "Inde", es: "India", zh: "印度" },
    generalEmergency: "112", police: "100", ambulance: "108",
    resources: [
      { name: "iCall", number: "9152987821", type: "crisis" },
      { name: "Vandrevala Foundation", number: "1860-2662-345", type: "crisis", available: "24/7" },
      { name: "AASRA", number: "9820466627", type: "suicide", available: "24/7" },
    ],
  },
  // NETHERLANDS
  {
    countryCode: "NL", region: "europe",
    country: { en: "Netherlands", fr: "Pays-Bas", es: "Países Bajos", zh: "荷兰" },
    generalEmergency: "112", police: "0900-8844",
    resources: [
      { name: "Luisterlijn", number: "0900 0767", type: "crisis", available: "24h/7d" },
      { name: "113 Zelfmoordpreventie", number: "113", type: "suicide", available: "24h/7d" },
    ],
  },
  // ITALY
  {
    countryCode: "IT", region: "europe",
    country: { en: "Italy", fr: "Italie", es: "Italia", zh: "意大利" },
    generalEmergency: "112", police: "113", ambulance: "118",
    resources: [
      { name: "Telefono Amico", number: "02 2327 2327", type: "crisis" },
      { name: "Telefono Azzurro (enfants)", number: "19696", type: "crisis" },
    ],
  },
  // OTHER / INTERNATIONAL
  {
    countryCode: "XX", region: "other",
    country: { en: "Other / International", fr: "Autre / International", es: "Otro / Internacional", zh: "其他 / 国际" },
    generalEmergency: "112",
    resources: [
      { name: "International Association for Suicide Prevention", number: "www.iasp.info/resources/Crisis_Centres", type: "crisis" },
      { name: "Befrienders Worldwide", number: "www.befrienders.org", type: "crisis" },
      { name: "Crisis Text Line (US)", number: "Text HOME to 741741", type: "text" },
      { name: "988 Suicide & Crisis Lifeline (US)", number: "988", type: "suicide", available: "24/7" },
    ],
  },
];

export const countryGroups: { region: string; countries: string[] }[] = [
  { region: "europe", countries: ["FR", "GB", "DE", "ES", "BE", "CH", "IT", "NL"] },
  { region: "north-america", countries: ["US", "CA"] },
  { region: "latin-america", countries: ["MX", "BR"] },
  { region: "asia", countries: ["CN", "JP", "KR", "IN"] },
  { region: "oceania", countries: ["AU"] },
  { region: "other", countries: ["XX"] },
];

export function getEmergency(countryCode: string): CountryEmergency {
  return emergencyData.find((c) => c.countryCode === countryCode) ?? emergencyData[emergencyData.length - 1];
}

export function getStoredCountry(): string {
  if (typeof window === "undefined") return "XX";
  return localStorage.getItem("mindscope_country") || "XX";
}

export function setStoredCountry(code: string): void {
  localStorage.setItem("mindscope_country", code);
}

import { TEMPLATE_STYLE_PRESETS } from "@/components/template-presets";

export interface OnboardingData {
  source: string;
  platforms: string[];
  template: string;
  templateId: string;
  logo: string | null;
  logoMediaId: string | null;
  title: string;
  description: string;
  socials: Record<string, string>;
  websites: Array<{ name: string; url: string }>;
  workHours: string;
  phones: string[];
  googleMaps: string;
}

export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

export const INITIAL_DATA: OnboardingData = {
  source: "",
  platforms: [],
  template: "",
  templateId: "",
  logo: null,
  logoMediaId: null,
  title: "",
  description: "",
  socials: {},
  websites: [{ name: "", url: "" }],
  workHours: "",
  phones: [""],
  googleMaps: "",
};

export const TEMPLATE_NAMES = [
  "Minimal oq",
  "Qora premium",
  "Gradient",
  "Biznes",
  "Kreativ",
  "Soft pastel",
  "Dark glass",
  "Bold social",
] as const;

export const THEME_TEMPLATES = TEMPLATE_NAMES.reduce((acc, name, index) => {
  const preset = TEMPLATE_STYLE_PRESETS[index];
  acc[name] = {
    bg: preset.bg,
    header: preset.headerBg,
    btn: preset.btnBg,
    btnText: preset.btnText,
    text: preset.textColor,
    sub: preset.subText,
  };
  return acc;
}, {} as Record<(typeof TEMPLATE_NAMES)[number], {
  bg: string;
  header: string;
  btn: string;
  btnText: string;
  text: string;
  sub: string;
}>);


export const ONBOARDING_STEPS = [
  {
    id: "source",
    title: "Shunidir?",
    subtitle: "Bizneslari topib, qaysi manbadan bilib oldingiz?",
    icon: "📍",
  },
  {
    id: "platforms",
    title: "Qaysi platformalarda?",
    subtitle: "Qaysi platformalar uchun profil sahifasi kerak?",
    icon: "📱",
  },
  {
    id: "template",
    title: "Shablon tanlash",
    subtitle: "Sahifangizning dizaynini tanlang",
    icon: "🎨",
  },
  {
    id: "basic",
    title: "Asosiy ma'lumot",
    subtitle: "Kompaniya ma'lumotlarini kiriting",
    icon: "📝",
  },
  {
    id: "contacts",
    title: "Aloqa ma'lumotlari",
    subtitle: "Raqam va manzil",
    icon: "☎️",
  },
  {
    id: "socials",
    title: "Ijtimoiy tarmoqlar",
    subtitle: "Social media havolalarini qo'shing",
    icon: "🔗",
  },
];

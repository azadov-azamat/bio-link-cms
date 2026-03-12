export interface OnboardingData {
  source: string;
  platforms: string[];
  template: string;
  logo: string | null;
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
  logo: null,
  title: "",
  description: "",
  socials: {},
  websites: [{ name: "", url: "" }],
  workHours: "",
  phones: [""],
  googleMaps: "",
};

export const THEME_TEMPLATES = {
  "Minimal oq": {
    bg: "bg-white",
    header: "bg-zinc-100",
    btn: "bg-zinc-900",
    btnText: "text-white",
    text: "text-zinc-900",
    sub: "text-zinc-400",
  },
  "Qora premium": {
    bg: "bg-zinc-950",
    header: "bg-zinc-800",
    btn: "bg-white",
    btnText: "text-zinc-900",
    text: "text-white",
    sub: "text-zinc-400",
  },
  Gradient: {
    bg: "bg-gradient-to-br from-violet-50 to-pink-50",
    header: "bg-gradient-to-r from-violet-500 to-pink-500",
    btn: "bg-gradient-to-r from-violet-500 to-pink-500",
    btnText: "text-white",
    text: "text-violet-900",
    sub: "text-violet-400",
  },
  Biznes: {
    bg: "bg-slate-50",
    header: "bg-slate-800",
    btn: "bg-slate-800",
    btnText: "text-white",
    text: "text-slate-900",
    sub: "text-slate-400",
  },
  Kreativ: {
    bg: "bg-amber-50",
    header: "bg-gradient-to-r from-amber-400 to-orange-500",
    btn: "bg-amber-500",
    btnText: "text-white",
    text: "text-amber-900",
    sub: "text-amber-500",
  },
  "Soft pastel": {
    bg: "bg-rose-50",
    header: "bg-gradient-to-r from-rose-300 to-pink-300",
    btn: "bg-rose-400",
    btnText: "text-white",
    text: "text-rose-900",
    sub: "text-rose-400",
  },
  "Dark glass": {
    bg: "bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900",
    header: "bg-white/5",
    btn: "bg-white/10",
    btnText: "text-white",
    text: "text-white",
    sub: "text-purple-300",
  },
  "Bold social": {
    bg: "bg-gradient-to-br from-yellow-400 to-orange-500",
    header: "bg-black/20",
    btn: "bg-black",
    btnText: "text-white",
    text: "text-white",
    sub: "text-yellow-100",
  },
};

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

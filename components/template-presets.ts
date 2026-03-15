export type TemplateStylePreset = {
  bg: string;
  headerBg: string;
  textColor: string;
  subText: string;
  btnBg: string;
  btnText: string;
  secondBtn: string;
  border: string;
  avatarBg: string;
  avatarText: string;
};

export const TEMPLATE_STYLE_PRESETS: TemplateStylePreset[] = [
  {
    bg: "bg-white",
    headerBg: "bg-zinc-100",
    textColor: "text-zinc-900",
    subText: "text-zinc-500",
    btnBg: "bg-zinc-900",
    btnText: "text-white",
    secondBtn: "bg-zinc-100 text-zinc-700",
    border: "border border-zinc-200",
    avatarBg: "bg-zinc-200",
    avatarText: "text-zinc-700",
  },
  {
    bg: "bg-zinc-950",
    headerBg: "bg-zinc-800",
    textColor: "text-white",
    subText: "text-zinc-400",
    btnBg: "bg-white",
    btnText: "text-zinc-900",
    secondBtn: "bg-zinc-800 text-zinc-300",
    border: "border border-zinc-800",
    avatarBg: "bg-zinc-700",
    avatarText: "text-white",
  },
  {
    bg: "bg-gradient-to-br from-violet-50 to-pink-50",
    headerBg: "bg-gradient-to-r from-violet-500 to-pink-500",
    textColor: "text-violet-900",
    subText: "text-violet-500",
    btnBg: "bg-gradient-to-r from-violet-500 to-pink-500",
    btnText: "text-white",
    secondBtn: "bg-violet-100 text-violet-700",
    border: "border border-violet-100",
    avatarBg: "bg-violet-200",
    avatarText: "text-violet-800",
  },
  {
    bg: "bg-slate-50",
    headerBg: "bg-slate-800",
    textColor: "text-slate-900",
    subText: "text-slate-500",
    btnBg: "bg-slate-800",
    btnText: "text-white",
    secondBtn: "bg-slate-200 text-slate-700",
    border: "border border-slate-200",
    avatarBg: "bg-slate-300",
    avatarText: "text-slate-700",
  },
  {
    bg: "bg-amber-50",
    headerBg: "bg-gradient-to-r from-amber-400 to-orange-500",
    textColor: "text-amber-900",
    subText: "text-amber-600",
    btnBg: "bg-amber-500",
    btnText: "text-white",
    secondBtn: "bg-amber-100 text-amber-800",
    border: "border border-amber-200",
    avatarBg: "bg-amber-200",
    avatarText: "text-amber-800",
  },
  {
    bg: "bg-rose-50",
    headerBg: "bg-gradient-to-r from-rose-300 to-pink-300",
    textColor: "text-rose-900",
    subText: "text-rose-500",
    btnBg: "bg-rose-400",
    btnText: "text-white",
    secondBtn: "bg-rose-100 text-rose-700",
    border: "border border-rose-100",
    avatarBg: "bg-rose-200",
    avatarText: "text-rose-700",
  },
  {
    bg: "bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900",
    headerBg: "bg-white/5",
    textColor: "text-white",
    subText: "text-purple-300",
    btnBg: "bg-white/10 border border-white/20",
    btnText: "text-white",
    secondBtn: "bg-white/5 text-white/70 border border-white/10",
    border: "border border-white/10",
    avatarBg: "bg-purple-500/30",
    avatarText: "text-white",
  },
  {
    bg: "bg-gradient-to-br from-yellow-400 to-orange-500",
    headerBg: "bg-black/20",
    textColor: "text-white",
    subText: "text-yellow-100",
    btnBg: "bg-black",
    btnText: "text-white",
    secondBtn: "bg-white/20 text-white",
    border: "border border-yellow-300/30",
    avatarBg: "bg-white/30",
    avatarText: "text-orange-900",
  },
];

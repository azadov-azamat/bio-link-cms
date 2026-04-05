import { BarChart3, Clock3, Sparkles } from "lucide-react";

export default function DashboardAnalyticsPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)]">
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_42%),linear-gradient(135deg,_#18181b_0%,_#27272a_100%)] px-8 py-10 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
            <Clock3 className="h-3.5 w-3.5" />
            Analytics
          </div>
          <h1
            className="mt-4 text-4xl font-black tracking-tight sm:text-5xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Coming soon
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/72 sm:text-base">
            Bu bo‘limda tashriflar, bosilgan linklar, CTA samaradorligi va
            auditoriya trendlarini ko‘rsatamiz. Hozircha studio va sayt preview
            oqimini mukammallashtirishga fokus qilyapmiz.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Traffic overview",
            desc: "Kunlik ko‘rishlar, source kesimlari va eng kuchli kirish kanallari.",
            icon: BarChart3,
          },
          {
            title: "Session behavior",
            desc: "Userlar qaysi tugmalarni ko‘proq bosayotgani va qayerda chiqib ketayotgani.",
            icon: Sparkles,
          },
          {
            title: "Conversion map",
            desc: "Qo‘ng‘iroq, Telegram, Instagram va website bosilishlari bo‘yicha funnel.",
            icon: Clock3,
          },
        ].map(({ title, desc, icon: Icon }) => (
          <article
            key={title}
            className="rounded-[28px] border border-dashed border-zinc-300 bg-white/80 p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-lg font-bold text-zinc-900">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">{desc}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

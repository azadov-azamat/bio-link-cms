import { notFound } from "next/navigation";

type Profile = {
  slug: string;
  title: string;
  description: string | null;
  logoUrl: string | null;
  socials: Record<string, string>;
  websites: Array<{ name: string; url: string }>;
  phones: string[];
  workHours: string | null;
  googleMaps: string | null;
};

async function getProfile(slug: string): Promise<Profile | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/profiles/${slug}`, { cache: "no-store" });
  if (!response.ok) return null;
  return response.json();
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getProfile(slug);

  if (!profile) notFound();

  const websites = Array.isArray(profile.websites) ? profile.websites.filter((item) => item.url) : [];
  const socials = Object.entries(profile.socials || {}).filter(([, url]) => Boolean(url));

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        {profile.logoUrl ? (
          <img src={profile.logoUrl} alt={profile.title} className="mx-auto mb-4 h-24 w-24 rounded-2xl object-cover" />
        ) : null}

        <h1 className="text-center text-3xl font-bold text-zinc-900">{profile.title}</h1>
        {profile.description ? <p className="mt-3 text-center text-zinc-600">{profile.description}</p> : null}

        <div className="mt-8 space-y-3">
          {websites.map((site, index) => (
            <a
              key={`${site.url}-${index}`}
              href={site.url}
              target="_blank"
              rel="noreferrer"
              className="block w-full rounded-xl bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              {site.name || site.url}
            </a>
          ))}
        </div>

        {socials.length > 0 ? (
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Social links</h2>
            <div className="space-y-2">
              {socials.map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                >
                  {name}
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-8 space-y-2 text-sm text-zinc-600">
          {profile.workHours ? <p>Ish vaqti: {profile.workHours}</p> : null}
          {profile.phones?.filter(Boolean).map((phone) => <p key={phone}>Tel: {phone}</p>)}
          {profile.googleMaps ? (
            <a href={profile.googleMaps} target="_blank" rel="noreferrer" className="text-zinc-900 underline">
              Google Maps
            </a>
          ) : null}
        </section>
      </div>
    </main>
  );
}

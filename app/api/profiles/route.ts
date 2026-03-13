import { NextResponse } from "next/server";
import { profileInputSchema } from "@/lib/server/profile-schema";
import { prisma } from "@/lib/server/prisma";
import { uploadBase64Image } from "@/lib/server/s3";
import { toSlug } from "@/components/onboarding/utils";

const generateUniqueSlug = async (baseTitle: string) => {
  const base = toSlug(baseTitle) || "profile";
  let attempt = base;
  let counter = 1;

  while (true) {
    const exists = await prisma.bioProfile.findUnique({ where: { slug: attempt } });
    if (!exists) return attempt;
    counter += 1;
    attempt = `${base}-${counter}`;
  }
};

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = profileInputSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const input = parsed.data;
    const logoUrl = input.logo ? await uploadBase64Image(input.logo) : null;
    const slug = await generateUniqueSlug(input.title);

    const profile = await prisma.bioProfile.create({
      data: {
        slug,
        source: input.source,
        platforms: input.platforms,
        template: input.template,
        logoUrl,
        title: input.title,
        description: input.description,
        socials: input.socials,
        websites: input.websites,
        workHours: input.workHours,
        phones: input.phones,
        googleMaps: input.googleMaps,
      },
    });

    return NextResponse.json({ id: profile.id, slug: profile.slug });
  } catch (error) {
    console.error("POST /api/profiles error", error);
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 });
  }
}

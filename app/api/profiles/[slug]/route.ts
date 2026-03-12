import { NextResponse } from "next/server";
import { prisma } from "@/lib/server/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const profile = await prisma.bioProfile.findUnique({ where: { slug } });
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}

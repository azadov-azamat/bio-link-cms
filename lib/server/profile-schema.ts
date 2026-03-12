import { z } from "zod";

const websiteSchema = z.object({
  name: z.string().trim().optional().default(""),
  url: z.string().trim().optional().default(""),
});

export const profileInputSchema = z.object({
  source: z.string().trim().min(1),
  platforms: z.array(z.string().trim()).default([]),
  template: z.string().trim().min(1),
  logo: z.string().nullable().optional(),
  title: z.string().trim().min(1),
  description: z.string().trim().optional().default(""),
  socials: z.record(z.string(), z.string()).default({}),
  websites: z.array(websiteSchema).default([]),
  workHours: z.string().trim().optional().default(""),
  phones: z.array(z.string().trim()).default([]),
  googleMaps: z.string().trim().optional().default(""),
});

export type ProfileInput = z.infer<typeof profileInputSchema>;

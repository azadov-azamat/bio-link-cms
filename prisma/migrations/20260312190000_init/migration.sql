CREATE TABLE IF NOT EXISTS "bio_profiles" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "source" TEXT NOT NULL,
  "platforms" JSONB NOT NULL,
  "template" TEXT NOT NULL,
  "logoUrl" TEXT,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "socials" JSONB NOT NULL,
  "websites" JSONB NOT NULL,
  "workHours" TEXT,
  "phones" JSONB NOT NULL,
  "googleMaps" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "bio_profiles_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "bio_profiles_slug_key" ON "bio_profiles"("slug");

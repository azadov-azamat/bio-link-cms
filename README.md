# bio-link-cms

Next.js asosidagi bio-link CMS. Onboarding orqali profil yaratiladi, ma'lumotlar Postgres'ga yoziladi va logo AWS S3'ga upload bo'ladi.

## Environment

`.env.example` dan nusxa oling:

```bash
cp .env.example .env.local
```

Kerakli env:

- `DATABASE_URL` — Render Postgres ulanish satri.
- `NEXT_PUBLIC_BASE_URL` — production domen (`https://...onrender.com`).
- `S3_REGION`, `S3_BUCKET`, `S3_PUBLIC_BASE_URL`.
- `AWS_ACCESS_KEY`, `AWS_SECRET_KEY`.

## Local ishga tushirish

```bash
npm install
npm run prisma:generate
npm run dev
```

## Migration

```bash
npm run prisma:migrate:deploy
```

## Render deploy (Backend + Frontend)

Render Web Service uchun:

- **Build Command**
  ```bash
  npm install && npm run prisma:generate && npm run build
  ```
- **Start Command**
  ```bash
  npm run prisma:migrate:deploy && npm run start
  ```

Shunda deploy paytida migration ham qo'llanadi.

## API

- `POST /api/profiles` — onboarding payload ni saqlaydi, logo'ni S3'ga yuklaydi.
- `GET /api/profiles/:slug` — public profil ma'lumotlari.
- `/:slug` — profile sahifasi.

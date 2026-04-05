# bio-link-cms

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_VxAhuOFtEqJrUDBaDDby8Uz5ufC3)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Backend Setup

Frontend `Next.js`, backend esa alohida `Fastify + Sequelize + PostgreSQL` app sifatida [`backend`](/Users/azadov.za/repos/bio-link-cms/backend) ichida turadi.

1. Postgres'ni ishga tushiring:

```bash
cd backend
docker compose up -d
```

2. Env ni tayyorlang:

```bash
cp .env.example .env
```

Telegram auth ishlashi uchun `.env` ichida quyidagilar ham bo'lishi kerak:

```bash
FRONTEND_URL=http://localhost:3000
TELEGRAM_BOT_TOKEN=...
TELEGRAM_WEBHOOK_URL=https://your-public-backend-url
BOT_TRANSPORT=webhook
JWT_ACCESS_SECRET=replace-with-long-random-secret
```

`TELEGRAM_WEBHOOK_URL` backend'ning internetdan ko'rinadigan HTTPS manzili bo'lishi kerak. Lokal ishlatsangiz tunnel (`ngrok`, `cloudflared`) kerak bo'ladi.
`BOT_TRANSPORT` default `webhook`; faqat development fallback kerak bo'lsa `polling` qilib yoqiladi.

3. Migrationlarni yuring:

```bash
yarn migrate
```

4. Backendni ishga tushiring:

```bash
yarn dev
# yoki
yarn start
```

Default `DATABASE_URL`:

```bash
postgres://postgres:postgres@127.0.0.1:5432/biosahifa
```

Hosted Postgres ishlatsangiz ko'pincha SSL kerak bo'ladi. Bunday holatda `.env` ga quyidagini qo'shing:

```bash
DATABASE_SSL=true
```

Telegram bot env'lari hali berilmagan bo'lsa backend baribir ishga tushadi, lekin Telegram auth endpointlari `503` qaytaradi. Botni yoqish uchun quyidagilar to'liq bo'lishi kerak:

```bash
TELEGRAM_BOT_TOKEN=...
TELEGRAM_WEBHOOK_URL=https://your-public-backend-url
BOT_TRANSPORT=webhook
JWT_ACCESS_SECRET=replace-with-long-random-secret
```

Frontend Telegram tugmasi uchun esa root `.env` ichida quyidagini yozing:

```bash
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=your_bot_username
```

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

<a href="https://v0.app/chat/api/kiro/clone/azadov-azamat/bio-link-cms" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>

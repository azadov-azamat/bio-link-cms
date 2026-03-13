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


## Formik + React Query + Yup (forma yuborish namunasi)

Ha, bu stack birga juda yaxshi ishlaydi:

- `Formik` — forma state va validation handling
- `Yup` — schema validation
- `@tanstack/react-query` — API mutation va cache invalidation

```tsx
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const ProfileSchema = Yup.object({
  fullName: Yup.string().min(2, "Kamida 2 ta harf").required("Ism majburiy"),
  bio: Yup.string().max(160, "Bio 160 belgidan oshmasin").required("Bio majburiy"),
})

async function createProfile(payload: { fullName: string; bio: string }) {
  const res = await fetch("/api/profiles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Xatolik yuz berdi" }))
    throw new Error(error.message ?? "Xatolik yuz berdi")
  }

  return res.json()
}

export function ProfileForm() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] })
    },
  })

  return (
    <Formik
      initialValues={{ fullName: "", bio: "" }}
      validationSchema={ProfileSchema}
      onSubmit={async (values, { setSubmitting, resetForm, setStatus }) => {
        try {
          await mutation.mutateAsync(values)
          resetForm()
          setStatus({ ok: "Saqlandi" })
        } catch (err) {
          setStatus({ error: err instanceof Error ? err.message : "Noma'lum xatolik" })
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-3">
          <div>
            <Field name="fullName" placeholder="To'liq ism" />
            <ErrorMessage name="fullName" component="p" />
          </div>

          <div>
            <Field as="textarea" name="bio" placeholder="Qisqa bio" />
            <ErrorMessage name="bio" component="p" />
          </div>

          <button type="submit" disabled={isSubmitting || mutation.isPending}>
            {mutation.isPending ? "Yuborilmoqda..." : "Saqlash"}
          </button>

          {status?.ok ? <p>{status.ok}</p> : null}
          {status?.error ? <p>{status.error}</p> : null}
        </Form>
      )}
    </Formik>
  )
}
```

`package.json` dependency'lar:

```bash
npm i formik yup @tanstack/react-query
```

import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { I18nProvider } from '@/components/i18n-provider'
import { QueryProvider } from '@/components/providers/query-provider'


export const metadata: Metadata = {
  title: 'BioSahifa - Online Tarjimon va Sertifikat Xizmatlari',
  description: 'Biologiya, kimyo, fizika va boshqa fan sohalari uchun professional tarjima va sertifikat xizmatlari',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <QueryProvider>
          <I18nProvider>{children}</I18nProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Manrope, Roboto } from 'next/font/google'
import { Toaster } from 'sonner'
import { StoreProvider } from '@/store/provider'

import './globals.css'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['700'],
})

export const metadata: Metadata = {
  title: 'Bookmarks App',
  description: 'A simple bookmarks app built with Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${roboto.variable}`}>
        <StoreProvider>{children}</StoreProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}

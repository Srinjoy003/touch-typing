import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { theme } from '@/assets/colour'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Touch Typing',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const modifiedClass = `${inter.className} h-screen overflow-hidden`
  return (
    <html lang="en">
      <body className={modifiedClass}>{children}</body>
    </html>
  )
}

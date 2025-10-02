import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const utopia = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-utopia",
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  title: "Camera Confidence Lab - Newsletter Signup",
  description: "Join our community and build camera confidence in just 5 minutes a day",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${utopia.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}

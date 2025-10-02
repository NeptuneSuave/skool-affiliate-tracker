import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
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
      <body className="font-sans">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZXS8MGYMRM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZXS8MGYMRM');
          `}
        </Script>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}

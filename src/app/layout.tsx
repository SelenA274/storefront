import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import Navbar from "@/shared/components/Navbar"
import AnnouncementBar from "@/shared/components/AnnouncementBar"
import Footer from "@/shared/components/Footer"
import Providers from "@/shared/components/Providers"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "VELO — Luxury Beauty & Fragrance",
    template: "%s | VELO",
  },
  description:
    "Discover luxury makeup, skincare, and fragrances at VELO. Curated beauty essentials delivered to your door.",
  keywords: ["luxury beauty", "makeup", "skincare", "fragrance", "perfume", "cosmetics"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "VELO",
    title: "VELO — Luxury Beauty & Fragrance",
    description: "Discover luxury makeup, skincare, and fragrances at VELO.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VELO — Luxury Beauty & Fragrance",
    description: "Discover luxury makeup, skincare, and fragrances at VELO.",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-white text-gray-900">
        <Providers>
          <AnnouncementBar />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
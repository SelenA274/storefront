"use client"

import { store } from "@/store/store"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Navbar from "@/shared/components/Navbar"
import AuthProvider from "@/shared/components/AuthProvider"
import "./globals.css"
import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-white text-gray-900">
        <Provider store={store}>
          <AuthProvider>
            <Navbar />
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </AuthProvider>
        </Provider>
      </body>
    </html>
  )
}
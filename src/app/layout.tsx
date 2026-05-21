"use client"

import { store } from "@/store/store"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </Provider>
      </body>
    </html>
  )
}
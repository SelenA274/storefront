"use client"

import { store } from "@/store/store"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AuthProvider from "@/shared/components/AuthProvider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </Provider>
  )
}
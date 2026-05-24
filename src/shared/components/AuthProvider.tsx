"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/store/hooks"
import { setUser } from "@/features/auth/authSlice"
import { authService } from "@/features/auth/authService"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return
    authService.me()
      .then((res) => dispatch(setUser(res.data.data)))
      .catch(() => localStorage.removeItem("token"))
  }, [dispatch])

  return <>{children}</>
}
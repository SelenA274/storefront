"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { authService } from "@/features/auth/authService"
import { toast } from "react-toastify"

export default function ResetPasswordPage() {
  const { token } = useParams()
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.resetPassword(token as string, password)
      toast.success("Password reset successfully!")
      router.push("/login")
    } catch {
      toast.error("Failed to reset password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </main>
  )
}
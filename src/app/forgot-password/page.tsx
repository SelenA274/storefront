"use client"

import { useState } from "react"
import { authService } from "@/features/auth/authService"
import { toast } from "react-toastify"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.forgotPassword(email)
      setSent(true)
      toast.success("Reset link sent to your email!")
    } catch {
      toast.error("Failed to send reset email")
    } finally {
      setLoading(false)
    }
  }

  if (sent) return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-center">Check your email for the reset link.</p>
    </main>
  )

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </main>
  )
}
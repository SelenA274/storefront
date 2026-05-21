"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import api from "@/lib/axios"

export default function VerifyEmailForm() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.get(`/auth/verify-email/${token}`)
      toast.success("Email verified! You can now login.")
      router.push("/login")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <input
        placeholder="Enter verification code"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Verifying..." : "Verify Email"}
      </button>
    </form>
  )
}
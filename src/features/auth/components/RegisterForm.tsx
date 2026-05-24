"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "../authService"
import { toast } from "react-toastify"

export default function RegisterForm() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.register(form)
      toast.success("Account created! Please verify your email.")
      router.push("/verify-email")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <input
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-[#c97a8f] transition"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-[#c97a8f] transition"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-[#c97a8f] transition"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-gray-900 text-white py-4 rounded-full hover:bg-[#c97a8f] transition text-sm uppercase tracking-widest disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  )
}
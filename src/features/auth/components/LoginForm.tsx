"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authService } from "../authService"
import { useAppDispatch } from "@/store/hooks"
import { setUser } from "../authSlice"
import { toast } from "react-toastify"

export default function LoginForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authService.login(form)
      const token = res.data.data
      localStorage.setItem("token", token)
      const meRes = await authService.me()
      dispatch(setUser(meRes.data.data))
      toast.success("Welcome back!")
      router.push("/")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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
      <a href="/forgot-password" className="text-sm text-[#c9a96e] hover:underline text-right">
        Forgot password?
      </a>
      <button
        type="submit"
        disabled={loading}
        className="bg-gray-900 text-white py-4 rounded-full hover:bg-[#c97a8f] transition text-sm uppercase tracking-widest disabled:opacity-50"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  )
}
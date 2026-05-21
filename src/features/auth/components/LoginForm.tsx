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
      dispatch(setUser(res.data.user))
      toast.success("Welcome back!")
      router.push("/")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  )
} 
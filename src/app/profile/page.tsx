"use client"

import { useAppSelector } from "@/store/hooks"
import Link from "next/link"

export default function ProfilePage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  if (!isAuthenticated) return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="font-serif text-2xl mb-4">Please login to view your profile</p>
        <Link href="/login" className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-[#c97a8f] transition text-sm uppercase tracking-widest">
          Login
        </Link>
      </div>
    </main>
  )

  return (
    <main>
      <div className="bg-[#fde8ed] py-16 text-center">
        <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-3">Welcome back</p>
        <h1 className="font-serif text-5xl text-gray-900">{user?.name}</h1>
      </div>
      <div className="max-w-2xl mx-auto px-8 py-16">
        <div className="bg-[#faf7f4] rounded-2xl p-8 flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#fde8ed] flex items-center justify-center">
              <span className="font-serif text-3xl text-[#c97a8f]">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-serif text-2xl">{user?.name}</p>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6 flex flex-col gap-4">
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm uppercase tracking-widest">Role</p>
              <p className="font-medium capitalize">{user?.role}</p>
            </div>
          </div>
          <Link
            href="/orders"
            className="bg-gray-900 text-white text-center py-4 rounded-full hover:bg-[#c97a8f] transition text-sm uppercase tracking-widest"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </main>
  )
}
"use client"

import { useAppSelector } from "@/store/hooks"
import Link from "next/link"

export default function ProfilePage() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  if (!isAuthenticated) return (
    <main className="flex min-h-screen items-center justify-center">
      <p>Please <Link href="/login" className="underline">login</Link> to view your profile.</p>
    </main>
  )

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <div className="border rounded-lg p-6 flex flex-col gap-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-semibold">{user?.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-semibold">{user?.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Role</p>
          <p className="font-semibold">{user?.role}</p>
        </div>
        <Link
          href="/orders"
          className="bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800 transition"
        >
          My Orders
        </Link>
      </div>
    </main>
  )
}
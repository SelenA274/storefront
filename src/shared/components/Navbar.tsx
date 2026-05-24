"use client"

import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { clearUser } from "@/features/auth/authSlice"
import { authService } from "@/features/auth/authService"
import { toast } from "react-toastify"
import { ShoppingCart, User, LogOut } from "lucide-react"

export default function Navbar() {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const { items } = useAppSelector((state) => state.cart)

  const handleLogout = async () => {
    try {
      await authService.logout()
      dispatch(clearUser())
      toast.success("Logged out")
    } catch {
      toast.error("Logout failed")
    }
  }

  return (
    <nav className="border-b px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold">
        Store
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/products">Products</Link>
        <Link href="/cart" className="relative">
          <ShoppingCart size={20} />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Link>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <User size={20} />
            </Link>
            <button onClick={handleLogout}>
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}
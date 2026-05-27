"use client"

import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { clearUser } from "@/features/auth/authSlice"
import { authService } from "@/features/auth/authService"
import { DEPARTMENTS } from "@/features/products/types"
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
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
      <Link href="/" className="font-serif text-2xl font-bold tracking-widest text-gray-900">
        VELO
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider text-gray-600">
        <Link href="/products" className="hover:text-[#c97a8f] transition uppercase">Shop</Link>
        {DEPARTMENTS.map(({ slug, label }) => (
          <Link
            key={slug}
            href={`/products?department=${slug}`}
            className="hover:text-[#c97a8f] transition uppercase"
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-5">
        <Link href="/cart" className="relative">
          <ShoppingCart size={20} className="text-gray-700 hover:text-[#c97a8f] transition" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#c97a8f] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Link>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <User size={20} className="text-gray-700 hover:text-[#c97a8f] transition" />
            </Link>
            <button onClick={handleLogout}>
              <LogOut size={20} className="text-gray-700 hover:text-[#c97a8f] transition" />
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-sm font-medium uppercase tracking-wider hover:text-[#c97a8f] transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

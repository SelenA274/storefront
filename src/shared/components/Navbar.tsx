"use client"

import Link from "next/link"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { clearUser } from "@/features/auth/authSlice"
import { authService } from "@/features/auth/authService"
import { DEPARTMENTS } from "@/features/products/types"
import { toast } from "react-toastify"
import { ShoppingCart, User, LogOut } from "lucide-react"

const SUBCATEGORIES: Record<string, string[]> = {
  makeup: ["lips", "face", "eyes", "brows", "tools"],
  skincare: ["morning-routine", "evening-routine", "spf-sun-care", "masks-treatments"],
  fragrance: ["floral", "woody", "fresh", "oriental"],
  "hair-care": ["shampoo-conditioner", "hair-masks-treatments", "styling"],
  "body-care": ["moisturizers", "scrubs", "bath-shower"],
}

export default function Navbar() {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  const { items } = useAppSelector((state) => state.cart)
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

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
    <header className="sticky top-0 z-50 bg-[#faf7f4]">
      <div
        className="h-[3px] w-full"
        style={{ background: "linear-gradient(to right, #fde8ed, #f4a7b9, #c97a8f)" }}
      />

      <nav className="max-w-7xl mx-auto px-3 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-4xl tracking-[3px] text-gray-900 hover:text-[#c97a8f] transition-colors"
        >
          VELO
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-11">
          <Link
            href="/products"
            className="relative text-[15px] tracking-[1.5px] uppercase text-gray-500 hover:text-gray-900 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 inline-block after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-0 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
          >
            Shop
          </Link>

          {DEPARTMENTS.map(({ slug, label }) => (
            <div
              key={slug}
              className="relative"
              onMouseEnter={() => setActiveSlug(slug)}
              onMouseLeave={() => setActiveSlug(null)}
            >
              <Link
                href={`/products?department=${slug}`}
                className="relative text-[15px] tracking-[1.5px] uppercase text-gray-500 hover:text-gray-900 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 inline-block after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-0 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </Link>

              {/* Dropdown */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ease-out
    ${activeSlug === slug
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
              >
                <div className="bg-[#faf7f4] border border-gray-100 shadow-lg rounded-sm py-3 px-2 flex flex-col gap-1 min-w-[180px]">
                  {SUBCATEGORIES[slug]?.map((sub, i) => (
                    <Link
                      key={sub}
                      href={`/products?department=${slug}&subcategory=${sub}`}
                      className="text-[12px] tracking-[1.5px] uppercase text-gray-400 hover:text-gray-900 hover:bg-[#fde8ed] px-3 py-2 rounded-sm transition-all duration-200 whitespace-nowrap"
                      style={{ transitionDelay: `${i * 40}ms` }}
                    >
                      {sub.replace(/-/g, " ")}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <Link href="/cart" className="relative">
            <ShoppingCart size={18} className="text-gray-700 hover:text-[#c97a8f] transition-colors" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#c97a8f] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <User size={18} className="text-gray-700 hover:text-[#c97a8f] transition-colors" />
              </Link>
              <button onClick={handleLogout}>
                <LogOut size={18} className="text-gray-700 hover:text-[#c97a8f] transition-colors" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-[15px] tracking-[1.5px] uppercase text-gray-700 hover:text-[#c97a8f] transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
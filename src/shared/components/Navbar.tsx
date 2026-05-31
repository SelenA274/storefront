"use client"

import Link from "next/link"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { clearUser } from "@/features/auth/authSlice"
import { authService } from "@/features/auth/authService"
import { DEPARTMENTS } from "@/features/products/types"
import { toast } from "react-toastify"
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react"
import { clearCart } from "@/features/cart/cartSlice"

const SUBCATEGORIES: Record<string, string[]> = {
  makeup: ["lips", "face", "eyes", "brows", "tools"],
  skincare: ["morning-routine", "evening-routine", "spf-sun-care", "masks-treatments"],
  fragrance: ["floral", "woody", "fresh", "oriental"],
  "hair-care": ["shampoo-conditioner", "hair-masks-treatments", "styling"],
  "body-care": ["moisturizers", "scrubs", "bath-shower"],
}

export default function Navbar() {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const { items } = useAppSelector((state) => state.cart)
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await authService.logout()
      localStorage.removeItem("token")
      dispatch(clearUser())
      dispatch(clearCart())
      toast.success("Logged out")
      setIsMenuOpen(false)
    } catch {
      toast.error("Logout failed")
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-[#faf7f4]">
      <div className="h-[3px] w-full" style={{ background: "linear-gradient(to right, #fde8ed, #f4a7b9, #c97a8f)" }} />

      <nav className="max-w-7xl mx-auto px-3 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-4xl tracking-[3px] text-gray-900 hover:text-[#c97a8f] transition-colors">
          VELO
        </Link>

        <div className="hidden md:flex items-center gap-11">
          <Link href="/products" className="relative text-[15px] tracking-[1.5px] uppercase text-gray-500 hover:text-gray-900 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 inline-block after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-0 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full">
            Shop
          </Link>
          {DEPARTMENTS.map(({ slug, label }) => (
            <div key={slug} className="relative" onMouseEnter={() => setActiveSlug(slug)} onMouseLeave={() => setActiveSlug(null)}>
              <Link href={`/products?department=${slug}`} className="relative text-[15px] tracking-[1.5px] uppercase text-gray-500 hover:text-gray-900 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 inline-block after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-0 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full">
                {label}
              </Link>
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ease-out ${activeSlug === slug ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
                <div className="bg-[#faf7f4] border border-gray-100 shadow-lg rounded-sm py-3 px-2 flex flex-col gap-1 min-w-[180px]">
                  {SUBCATEGORIES[slug]?.map((sub, i) => (
                    <Link key={sub} href={`/products?department=${slug}&subcategory=${sub}`} className="text-[12px] tracking-[1.5px] uppercase text-gray-400 hover:text-gray-900 hover:bg-[#fde8ed] px-3 py-2 rounded-sm transition-all duration-200 whitespace-nowrap" style={{ transitionDelay: `${i * 40}ms` }}>
                      {sub.replace(/-/g, " ")}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <Link href="/cart" className="relative">
            <ShoppingCart size={18} className="text-gray-700 hover:text-[#c97a8f] transition-colors" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#c97a8f] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link href="/profile"><User size={18} className="text-gray-700 hover:text-[#c97a8f] transition-colors" /></Link>
              <button onClick={handleLogout}><LogOut size={18} className="text-gray-700 hover:text-[#c97a8f] transition-colors" /></button>
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden md:block text-sm uppercase tracking-wider text-gray-700 hover:text-[#c97a8f]">Login</Link>
              <Link href="/login" className="md:hidden"><User size={18} className="text-gray-700 hover:text-[#c97a8f] transition-colors" /></Link>
            </>
          )}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </button>
        </div>
      </nav>


      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? "max-h-[1000px]" : "max-h-0"}`}>
        <div className="bg-[#faf7f4] border-t border-gray-200 px-5 py-5">
          <div className="flex flex-col gap-5">
            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="uppercase tracking-wider text-gray-700">Shop</Link>
            {DEPARTMENTS.map(({ slug, label }) => (
              <div key={slug}>
                <Link href={`/products?department=${slug}`} onClick={() => setIsMenuOpen(false)} className="block uppercase tracking-wider text-gray-900 font-medium">{label}</Link>
                <div className="flex flex-col gap-2 mt-3 ml-4">
                  {SUBCATEGORIES[slug]?.map((sub) => (
                    <Link key={sub} href={`/products?department=${slug}&subcategory=${sub}`} onClick={() => setIsMenuOpen(false)} className="text-sm text-gray-500 hover:text-[#c97a8f]">
                      {sub.replace(/-/g, " ")}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <hr className="border-gray-100" />
            {isAuthenticated ? (
              <>
                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="uppercase tracking-wider">Profile</Link>
                <button onClick={handleLogout} className="text-left uppercase tracking-wider">Logout</button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="uppercase tracking-wider">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
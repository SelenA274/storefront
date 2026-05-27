"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setCart } from "@/features/cart/cartSlice"
import { cartService } from "@/features/cart/cartService"
import { toast } from "react-toastify"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { getProductImage } from "@/features/products/types"

export default function CartPage() {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.cart)
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) return
    const fetch = async () => {
      try {
        const res = await cartService.getCart()
        dispatch(setCart(res.data.data?.items || []))
      } catch {
        toast.error("Failed to load cart")
      }
    }
    fetch()
  }, [isAuthenticated, dispatch])

  const handleRemove = async (productId: string) => {
    try {
      await cartService.removeItem(productId)
      const res = await cartService.getCart()
      dispatch(setCart(res.data.data?.items || res.data.cart?.items || []))
      toast.success("Item removed")
    } catch {
      toast.error("Failed to remove item")
    }
  }

  const validItems = items.filter((item: any) => item.product)
  const total = validItems.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0)

  if (!isAuthenticated) return (
    <main className="flex min-h-screen items-center justify-center">
      <p>Please <Link href="/login" className="underline">login</Link> to view your cart.</p>
    </main>
  )

  return (
    <main>
      <div className="bg-[#fde8ed] py-16 text-center">
        <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-3">Your</p>
        <h1 className="font-serif text-5xl text-gray-900">Shopping Cart</h1>
      </div>
      <div className="max-w-4xl mx-auto px-8 py-16">
        {validItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-3xl text-gray-300 mb-6">Your cart is empty</p>
            <Link href="/products" className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-[#c97a8f] transition text-sm uppercase tracking-widest">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {validItems.map((item: any) => {
              const image = getProductImage(item.product)
              return (
              <div key={item._id} className="flex items-center justify-between py-6 border-b border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-[#faf7f4] rounded-xl overflow-hidden flex items-center justify-center">
                    {image ? (
                      <img
                        src={image}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">🧴</span>
                    )}
                  </div>
                  <div>
                    <p className="font-serif text-lg">{item.product.name}</p>
                    <p className="text-sm text-gray-400 mt-1">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="font-semibold text-lg">${item.product.price * item.quantity}</p>
                  <button onClick={() => handleRemove(item.product._id)} className="text-gray-300 hover:text-red-400 transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )})}
            <div className="flex justify-between items-center pt-8">
              <div>
                <p className="text-sm text-gray-400 uppercase tracking-widest">Total</p>
                <p className="font-serif text-3xl">${total}</p>
              </div>
              <Link
                href="/cart/checkout"
                className="bg-gray-900 text-white px-10 py-4 rounded-full hover:bg-[#c97a8f] transition text-sm uppercase tracking-widest"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
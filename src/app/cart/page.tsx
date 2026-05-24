"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setCart } from "@/features/cart/cartSlice"
import { cartService } from "@/features/cart/cartService"
import { toast } from "react-toastify"
import Link from "next/link"

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
      dispatch(setCart(res.data.data?.items || res.data.cart?.items || []));
            toast.success("Item removed")
    } catch {
      toast.error("Failed to remove item")
    }
  }

  const total = items.reduce((sum: any, item: any) => sum + item.product.price * item.quantity, 0)
  if (!isAuthenticated) return (
    <main className="flex min-h-screen items-center justify-center">
      <p>Please <Link href="/login" className="underline">login</Link> to view your cart.</p>
    </main>
  )

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty. <Link href="/products" className="underline">Shop now</Link></p>
      ) : (
        <div className="flex flex-col gap-4">
{items.map((item: any) => (
  <div key={item._id} className="flex items-center justify-between border p-4 rounded-lg">
    <div className="flex items-center gap-4">
      <div>
        <p className="font-semibold">{item.product.name}</p>
        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <p className="font-bold">${item.product.price * item.quantity}</p>
      <button
        onClick={() => handleRemove(item.product._id)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Remove
      </button>
    </div>
  </div>
))}
          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <p className="text-xl font-bold">Total: ${total}</p>
            <Link
              href="/checkout"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { clearCart } from "@/features/cart/cartSlice"
import { cartService } from "@/features/cart/cartService"
import { toast } from "react-toastify"
import api from "@/lib/axios"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.cart)
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    country: "",
    zip: "",
  })

  const total = items.reduce((sum: any, item: any) => sum + (item.product?.price || 0) * item.quantity, 0)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post("/order", {
        items: items.map((i: any) => ({ product: i.product._id, quantity: i.quantity })),
        shippingAddress: {
          fullName: address.fullName,
          phone: address.phone,
          street: address.street,
          city: address.city,
          zipCode: address.zip,
          country: address.country,
        },
        paymentMethod: "simulated",
      })
      await cartService.clearCart()
      dispatch(clearCart())
      toast.success("Order placed successfully!")
      router.push("/orders")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to place order")
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) return (
    <main className="flex min-h-screen items-center justify-center">
      <p>Please <Link href="/login" className="underline">login</Link> first.</p>
    </main>
  )

  if (items.length === 0) return (
    <main className="flex min-h-screen items-center justify-center">
      <p>Your cart is empty. <Link href="/products" className="underline">Shop now</Link></p>
    </main>
  )

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleChange} className="border p-2 rounded" required />
      <input name="phone" placeholder="Phone" value={address.phone} onChange={handleChange} className="border p-2 rounded" required />
        <input name="street" placeholder="Street" value={address.street} onChange={handleChange} className="border p-2 rounded" required />
        <input name="city" placeholder="City" value={address.city} onChange={handleChange} className="border p-2 rounded" required />
        <input name="country" placeholder="Country" value={address.country} onChange={handleChange} className="border p-2 rounded" required />
        <input name="zip" placeholder="ZIP Code" value={address.zip} onChange={handleChange} className="border p-2 rounded" required />
        <div className="border-t pt-4 mt-4">
          <p className="text-xl font-bold mb-4">Total: ${total}</p>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </div>
      </form>
    </main>
  )
}
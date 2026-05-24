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
    fullName: "", phone: "", street: "", city: "", country: "", zip: "",
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
      <p>Please <Link href="/login" className="underline text-[#c97a8f]">login</Link> first.</p>
    </main>
  )

  return (
    <main>
      <div className="bg-[#fde8ed] py-16 text-center">
        <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-3">Almost there</p>
        <h1 className="font-serif text-5xl text-gray-900">Checkout</h1>
      </div>
      <div className="max-w-4xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl mb-2">Shipping Details</h2>
          {[
            { name: "fullName", placeholder: "Full Name" },
            { name: "phone", placeholder: "Phone" },
            { name: "street", placeholder: "Street Address" },
            { name: "city", placeholder: "City" },
            { name: "country", placeholder: "Country" },
            { name: "zip", placeholder: "ZIP Code" },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={(address as any)[field.name]}
              onChange={handleChange}
              className="border border-gray-200 p-3 rounded-xl focus:outline-none focus:border-[#c97a8f] transition"
              required
            />
          ))}
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-white py-4 rounded-full hover:bg-[#c97a8f] transition text-sm uppercase tracking-widest mt-4 disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
        <div>
          <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
          <div className="flex flex-col gap-4">
            {items.map((item: any) => (
              <div key={item._id} className="flex justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">${item.product.price * item.quantity}</p>
              </div>
            ))}
            <div className="flex justify-between pt-4">
              <p className="font-serif text-xl">Total</p>
              <p className="font-serif text-xl">${total}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
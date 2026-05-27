"use client"

import { useEffect, useState } from "react"
import { useAppSelector } from "@/store/hooks"
import api from "@/lib/axios"
import { toast } from "react-toastify"
import Link from "next/link"

export default function OrdersPage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) return
    api.get("/order/my-orders")
      .then((res) => setData(res.data.data || null))
      .catch(() => toast.error("Failed to load orders"))
      .finally(() => setLoading(false))
  }, [isAuthenticated])

  if (!isAuthenticated) return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="font-serif text-2xl mb-4">Please login to view your orders</p>
        <Link href="/login" className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-[#c97a8f] transition text-sm uppercase tracking-widest">
          Login
        </Link>
      </div>
    </main>
  )

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-400 font-serif text-xl">Loading...</p>
    </div>
  )

  return (
    <main>
      <div className="bg-[#fde8ed] py-16 text-center">
        <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-3">Your</p>
        <h1 className="font-serif text-5xl text-gray-900">Orders</h1>
      </div>
      <div className="max-w-3xl mx-auto px-8 py-16">
        {!data ? (
          <div className="text-center py-20">
            <p className="font-serif text-3xl text-gray-300 mb-6">No orders yet</p>
            <Link href="/products" className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-[#c97a8f] transition text-sm uppercase tracking-widest">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="bg-[#faf7f4] rounded-2xl p-6">
              <p className="text-[#c9a96e] text-xs uppercase tracking-widest mb-4">Summary</p>
              <div className="flex justify-between mb-2">
                <p className="text-gray-500 text-sm">Total Items</p>
                <p className="font-semibold">{data.totalItemsCount}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="font-semibold">{data.totalProducts}</p>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200 mt-3">
                <p className="font-serif text-lg">Grand Total</p>
                <p className="font-serif text-lg">${data.grandTotal}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {data.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-4 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#faf7f4] rounded-xl overflow-hidden flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl">🧴</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
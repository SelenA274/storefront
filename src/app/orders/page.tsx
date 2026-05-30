"use client"

import { useEffect, useState } from "react"
import { useAppSelector } from "@/store/hooks"
import api from "@/lib/axios"
import { toast } from "react-toastify"
import Link from "next/link"

export default function OrdersPage() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) return
    api.get("/order/my-orders")
      .then((res) => {
        const d = res.data.data
        setOrders(Array.isArray(d) && d.length > 0 ? d : [])
      })
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

  const statusColor: Record<string, string> = {
    pending:   "bg-amber-100 text-amber-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipped:   "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-500",
  }

  return (
    <main>
      <div className="bg-[#fde8ed] py-16 text-center">
        <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-3">Your</p>
        <h1 className="font-serif text-5xl text-gray-900">Orders</h1>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-3xl text-gray-300 mb-6">No orders yet</p>
            <Link href="/products" className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-[#c97a8f] transition text-sm uppercase tracking-widest">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {orders.map((order: any, i: number) => (
              <div key={order._id} className="bg-[#faf7f4] rounded-2xl p-6">
                {/* Order header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[#c9a96e] text-xs uppercase tracking-widest mb-1">
                      Order {orders.length - i}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric"
                      })}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${statusColor[order.orderStatus] ?? "bg-gray-100 text-gray-500"}`}>
                    {order.orderStatus}
                  </span>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-3 mb-4">
                  {order.items.map((item: any, j: number) => (
                    <div key={j} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl overflow-hidden flex items-center justify-center">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl">🧴</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-sm">${item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Order total */}
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <p className="font-serif text-lg">Total</p>
                  <p className="font-serif text-lg">${order.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
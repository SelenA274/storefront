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
      <p>Please <Link href="/login" className="underline">login</Link> to view your orders.</p>
    </main>
  )

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (!data) return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <p>No orders yet. <Link href="/products" className="underline">Shop now</Link></p>
    </main>
  )

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="border p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Summary</h2>
        <p className="text-sm text-gray-500">Total Items: {data.totalItemsCount}</p>
        <p className="text-sm text-gray-500">Total Products: {data.totalProducts}</p>
        <p className="font-bold mt-1">Grand Total: ${data.grandTotal}</p>
      </div>
      <div className="flex flex-col gap-4">
        {data.items.map((item: any, index: number) => (
          <div key={index} className="flex justify-between border p-4 rounded-lg">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-bold">${item.price * item.quantity}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
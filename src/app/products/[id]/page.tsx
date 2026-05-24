"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setSelectedProduct, setLoading } from "@/features/products/productSlice"
import { setCart } from "@/features/cart/cartSlice"
import { productService } from "@/features/products/productService"
import { cartService } from "@/features/cart/cartService"
import { toast } from "react-toastify"
import Link from "next/link"

export default function ProductPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { selectedProduct, loading } = useAppSelector((state) => state.products)
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const fetch = async () => {
      dispatch(setLoading(true))
      try {
        const res = await productService.getById(id as string)
        dispatch(setSelectedProduct(res.data.data || res.data.product || res.data))      } catch {
        toast.error("Failed to load product")
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetch()
  }, [id, dispatch])

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first")
      return
    }
    try {
      await cartService.addToCart(id as string, 1)
      const res = await cartService.getCart()
      dispatch(setCart(res.data.cart?.items || []))
      toast.success("Added to cart!")
    } catch {
      toast.error("Failed to add to cart")
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (!selectedProduct) return <p className="text-center mt-10">Product not found.</p>

  return (
<main className="max-w-6xl mx-auto px-8 py-16">
      <Link href="/products" className="text-sm text-[#c9a96e] uppercase tracking-widest hover:underline mb-8 inline-block">
        ← Back to Collection
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
        <div className="bg-[#faf7f4] rounded-3xl aspect-square flex items-center justify-center overflow-hidden">
          {selectedProduct.image ? (
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover rounded-3xl" />
          ) : (
            <p className="text-9xl">🧴</p>
          )}
        </div>
        <div className="flex flex-col justify-center gap-6">
          <p className="text-[#c9a96e] text-sm uppercase tracking-widest">{selectedProduct.category}</p>
          <h1 className="font-serif text-5xl text-gray-900">{selectedProduct.name}</h1>
          <p className="text-3xl font-semibold text-gray-900">${selectedProduct.price}</p>
          <p className="text-gray-500 leading-relaxed">{selectedProduct.description}</p>
          <p className="text-sm text-gray-400">
            {selectedProduct.stock > 0 ? (
              <span className="text-green-600">✓ In Stock ({selectedProduct.stock} available)</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-gray-900 text-white py-4 rounded-full hover:bg-[#c97a8f] transition text-sm font-semibold tracking-widest uppercase mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  )
}
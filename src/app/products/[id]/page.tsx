"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setSelectedProduct, setLoading } from "@/features/products/productSlice"
import { setCart } from "@/features/cart/cartSlice"
import { productService } from "@/features/products/productService"
import { cartService } from "@/features/cart/cartService"
import { toast } from "react-toastify"

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
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="w-full rounded-lg object-cover"
        />
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">{selectedProduct.category}</p>
          <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
          <p className="text-2xl font-bold">${selectedProduct.price}</p>
          <p className="text-gray-600">{selectedProduct.description}</p>
          <p className="text-sm">
            Stock: <span className="font-semibold">{selectedProduct.stock}</span>
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  )
}
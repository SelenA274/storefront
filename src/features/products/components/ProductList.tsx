"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setProducts, setLoading } from "../productSlice"
import { productService } from "../productService"
import ProductCard from "./ProductCard"
import { toast } from "react-toastify"

export default function ProductList() {
  const dispatch = useAppDispatch()
  const { products, loading } = useAppSelector((state) => state.products)

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true))
      try {
        const res = await productService.getAll()
        dispatch(setProducts(res.data.data || res.data.products || res.data))      } catch (err: any) {
        toast.error("Failed to load products")
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchProducts()
  }, [dispatch])

  if (loading) return <p className="text-center">Loading...</p>
  if (!products.length) return <p className="text-center">No products found.</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}
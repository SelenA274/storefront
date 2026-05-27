"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setProducts, setLoading } from "../productSlice"
import { productService } from "../productService"
import ProductCard from "./ProductCard"
import { formatSlug } from "../types"
import { toast } from "react-toastify"

function getFilterSlug(searchParams: URLSearchParams): string | null {
  return (
    searchParams.get("department") ||
    searchParams.get("subcategory") ||
    searchParams.get("category")
  )
}

export default function ProductList() {
  const dispatch = useAppDispatch()
  const { products, loading } = useAppSelector((state) => state.products)
  const searchParams = useSearchParams()
  const filterSlug = getFilterSlug(searchParams)

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true))
      try {
        const res = filterSlug
          ? await productService.getByCategory(filterSlug)
          : await productService.getAll()
        dispatch(setProducts(res.data.data || res.data.products || res.data))
      } catch {
        toast.error("Failed to load products")
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchProducts()
  }, [dispatch, filterSlug])

  if (loading) return <p className="text-center py-20 text-gray-400">Loading...</p>
  if (!products.length)
    return (
      <p className="text-center py-20 text-gray-400">
        No products found{filterSlug ? ` in "${formatSlug(filterSlug)}"` : ""}.
      </p>
    )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

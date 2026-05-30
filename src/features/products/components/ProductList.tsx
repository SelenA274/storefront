"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setProducts, setLoading } from "../productSlice"
import { productService } from "../productService"
import ProductCard from "./ProductCard"
import { formatSlug } from "../types"
import { toast } from "react-toastify"

function getFilterSlug(searchParams: URLSearchParams): string | null {
  return (
    searchParams.get("subcategory") ||
    searchParams.get("category") ||
    searchParams.get("department")
  )
}

export default function ProductList() {
  const dispatch = useAppDispatch()
  const { products, loading } = useAppSelector((state) => state.products)
  const searchParams = useSearchParams()
  const filterSlug = getFilterSlug(searchParams)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setPage(1)
  }, [filterSlug])

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true))
      try {
        const res = filterSlug
          ? await productService.getByCategory(filterSlug, page)
          : await productService.getAll(page)
        const data = res.data.data || res.data.products || res.data
        dispatch(setProducts(Array.isArray(data) ? data : data.products ?? []))
        setTotalPages(res.data.totalPages ?? 1)
      } catch {
        toast.error("Failed to load products")
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchProducts()
  }, [dispatch, filterSlug, page])

  if (loading) return <p className="text-center py-20 text-gray-400">Loading...</p>
  if (!products.length)
    return (
      <p className="text-center py-20 text-gray-400">
        No products found{filterSlug ? ` in "${formatSlug(filterSlug)}"` : ""}.
      </p>
    )

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-12">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-5 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-gray-400 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-full text-sm font-semibold transition ${
                p === page
                  ? "bg-gray-900 text-white"
                  : "border border-gray-200 text-gray-600 hover:border-gray-400"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-5 py-2 rounded-full border border-gray-200 text-sm text-gray-600 hover:border-gray-400 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
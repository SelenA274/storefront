"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setSelectedProduct, setLoading } from "@/features/products/productSlice"
import { setCart } from "@/features/cart/cartSlice"
import { productService } from "@/features/products/productService"
import { cartService } from "@/features/cart/cartService"
import VariantPicker, { ProductMeta } from "@/features/products/components/VariantPicker"
import type { ProductVariant } from "@/features/products/types"
import { toast } from "react-toastify"
import Link from "next/link"
import { isColorVariant } from "@/features/products/types"

function StarRating({ average, count }: { average: number; count: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i + 1 <= Math.round(average) ? "text-amber-400" : "text-gray-300"}>★</span>
  ))
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl">{stars}</span>
      <span className="text-sm text-gray-500">
        {average.toFixed(1)} ({count} {count === 1 ? "review" : "reviews"})
      </span>
    </div>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { selectedProduct, loading } = useAppSelector((state) => state.products)
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const [qty, setQty] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  useEffect(() => {
    setQty(1)
    setSelectedVariant(null)
    const fetch = async () => {
      dispatch(setLoading(true))
      try {
        const res = await productService.getById(id as string)
        const product = res.data.data || res.data.product || res.data
        dispatch(setSelectedProduct(product))
        setActiveImage(product.mainImage ?? product.images?.[0] ?? null)
        setSelectedVariant(product?.variants?.[0] ?? null)
      } catch {
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
      const variantId = selectedVariant && !isColorVariant(selectedVariant)
        ? selectedProduct?.variants.find(
          (v) => !isColorVariant(v) && (v as any).sizeLabel === (selectedVariant as any).sizeLabel
        )?._id
        : selectedVariant?._id

      console.log("sending variantId:", variantId)

      await cartService.addToCart(id as string, qty, variantId as string | undefined)
      const res = await cartService.getCart()
      dispatch(setCart(res.data.data?.items || res.data.cart?.items || []))
      toast.success("Added to cart!")
    } catch {
      toast.error("Failed to add to cart")
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (!selectedProduct) return <p className="text-center mt-10">Product not found.</p>

  const allImages = [
    selectedProduct.mainImage,
    ...(selectedProduct.images ?? []).filter(img => img !== selectedProduct.mainImage)
  ].filter(Boolean) as string[]

  const displayImage = activeImage ?? allImages[0]
  const variantStock = selectedVariant?.stock ?? selectedProduct.totalStock
  const inStock = variantStock > 0
  const maxQty = Math.min(variantStock, 10)
  const ratings = selectedProduct.ratings ?? []
  const averageRating = selectedProduct.averageRating ?? 0
  const displayPrice = (selectedVariant && !isColorVariant(selectedVariant) && selectedVariant.price)
    ? selectedVariant.price
    : selectedProduct.price

  console.log("variant:", selectedVariant)
  console.log("stock:", selectedVariant?.stock, selectedProduct.totalStock)

  return (
    <main className="max-w-6xl mx-auto px-8 py-16">
      <Link href="/products" className="text-sm text-[#c9a96e] uppercase tracking-widest hover:underline mb-8 inline-block">
        ← Back to Collection
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">

        <div className="flex flex-col gap-4">
          <div className="bg-[#faf7f4] rounded-3xl aspect-square flex items-center justify-center overflow-hidden">
            {displayImage ? (
              <img src={displayImage} alt={selectedProduct.name} className="w-full h-full object-cover rounded-3xl" />
            ) : (
              <p className="text-9xl">🧴</p>
            )}
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-3">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    activeImage === img ? "border-gray-900" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center gap-6">
          <ProductMeta product={selectedProduct} />
          <h1 className="font-serif text-5xl text-gray-900">{selectedProduct.name}</h1>
          <p className="text-3xl font-semibold text-gray-900">${displayPrice}</p>

          {ratings.length > 0 && (
            <StarRating average={averageRating} count={ratings.length} />
          )}

          <p className="text-gray-500 leading-relaxed">{selectedProduct.description}</p>

          <VariantPicker
            product={selectedProduct}
            selected={selectedVariant}
            onSelect={(v) => { setSelectedVariant(v); setQty(1) }}
          />

          <p className="text-sm">
            {inStock ? (
              <span className="text-green-600">✓ In Stock</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </p>

          {inStock && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 uppercase tracking-widest">Qty</span>
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 text-lg hover:bg-gray-100 transition"
                >−</button>
                <span className="px-4 py-2 text-sm font-semibold min-w-[2rem] text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                  className="px-4 py-2 text-lg hover:bg-gray-100 transition"
                >+</button>
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="bg-gray-900 text-white py-4 rounded-full hover:bg-[#c97a8f] transition text-sm font-semibold tracking-widest uppercase mt-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </main>
  )
}
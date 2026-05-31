"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setSelectedProduct, setLoading } from "@/features/products/productSlice"
import { setCart } from "@/features/cart/cartSlice"
import { productService } from "@/features/products/productService"
import { cartService } from "@/features/cart/cartService"
import VariantPicker, { ProductMeta } from "@/features/products/components/VariantPicker"
import type { ProductVariant, IRating } from "@/features/products/types"
import { toast } from "react-toastify"
import Link from "next/link"
import { isColorVariant } from "@/features/products/types"
import { useProductSocket } from "@/hooks/useProductSocket"

function StarRating({ average, count }: { average: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <Stars value={Math.round(average)} interactive={false} />
      <span className="text-sm text-gray-500">
        {average.toFixed(1)} ({count} {count === 1 ? "review" : "reviews"})
      </span>
    </div>
  )
}

function Stars({
  value,
  interactive,
  onSelect,
}: {
  value: number
  interactive: boolean
  onSelect?: (v: number) => void
}) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => onSelect?.(i + 1)}
          className={`text-2xl transition ${i < value ? "text-amber-400" : "text-gray-300"
            } ${interactive ? "hover:text-amber-300 cursor-pointer" : "cursor-default"}`}
        >
          ★
        </button>
      ))}
    </span>
  )
}



function ReviewsSection({
  productId,
  ratings,
  isAuthenticated,
  onReviewAdded,
}: {
  productId: string
  ratings: IRating[]
  isAuthenticated: boolean
  onReviewAdded: () => void
}) {
  const [starValue, setStarValue] = useState(0)
  const [comment, setComment] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (starValue === 0) {
      toast.error("Please select a star rating")
      return
    }
    setSubmitting(true)
    try {
      await productService.addRating(productId, starValue, comment)
      toast.success("Review added!")
      setStarValue(0)
      setComment("")
      onReviewAdded()
    } catch {
      toast.error("Failed to submit review")
    } finally {
      setSubmitting(false)
    }
  }

  const getUserName = (user: IRating["user"]) => {
    if (typeof user === "string") return "Anonymous"
    return user.name ?? "Anonymous"
  }

  const getUserAvatar = (user: IRating["user"]) => {
    if (typeof user === "object" && user.avatar) return user.avatar
    return null
  }

  return (
    <section className="max-w-6xl mx-auto px-8 pb-20">
      <hr className="border-gray-100 mb-14" />
      <h2 className="font-serif text-3xl text-gray-900 mb-10">Customer Reviews</h2>


      {isAuthenticated && (
        <div className="bg-[#faf7f4] rounded-2xl p-8 mb-12">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">Leave a Review</p>
          <Stars value={starValue} interactive onSelect={setStarValue} />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts (optional)"
            rows={3}
            className="mt-4 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none bg-white"
          />
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-4 bg-gray-900 text-white text-sm font-semibold tracking-widest uppercase px-8 py-3 rounded-full hover:bg-[#c97a8f] transition disabled:opacity-40"
          >
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
        </div>
      )}


      {ratings.length === 0 ? (
        <p className="text-gray-400 text-sm">No reviews yet. Be the first!</p>
      ) : (
        <div className="flex flex-col gap-6">
          {ratings.map((r) => {
            const avatar = getUserAvatar(r.user)
            const name = getUserName(r.user)
            const initials = name.slice(0, 2).toUpperCase()
            const date = new Date(r.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
            return (
              <div key={r._id} className="flex gap-5 items-start border-b border-gray-100 pb-6">

                <div className="w-10 h-10 rounded-full bg-[#e8d8c4] flex items-center justify-center text-sm font-semibold text-[#a07850] shrink-0 overflow-hidden">
                  {avatar ? (
                    <img src={avatar} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-800">{name}</span>
                    <span className="text-xs text-gray-400">{date}</span>
                  </div>
                  <Stars value={r.rating} interactive={false} />
                  {r.comment && (
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{r.comment}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
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


  useProductSocket(
    id as string,
    (newStock) => {
        if (selectedProduct) {
            dispatch(setSelectedProduct({ ...selectedProduct, totalStock: newStock }))
        }
    },
    () => {
        if (selectedProduct) {
            dispatch(setSelectedProduct({ ...selectedProduct, totalStock: 0 }))
        }
    }
)
  
  const fetchProduct = async () => {
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

  useEffect(() => {
    setQty(1)
    setSelectedVariant(null)
    fetchProduct()
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
    ...(selectedProduct.images ?? []).filter((img) => img !== selectedProduct.mainImage),
  ].filter(Boolean) as string[]

  const displayImage = activeImage ?? allImages[0]
  const variantStock = selectedVariant?.stock ?? selectedProduct.totalStock
  const inStock = variantStock > 0
  const maxQty = Math.min(variantStock, 10)
  const ratings: IRating[] = selectedProduct.ratings ?? []
  const averageRating = selectedProduct.averageRating ?? 0
  const displayPrice =
    selectedVariant && !isColorVariant(selectedVariant) && selectedVariant.price
      ? selectedVariant.price
      : selectedProduct.price

  return (
    <>
      <main className="max-w-6xl mx-auto px-8 py-16">
        <Link
          href="/products"
          className="text-sm text-[#c9a96e] uppercase tracking-widest hover:underline mb-8 inline-block"
        >
          ← Back to Collection
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">

          <div className="flex flex-col gap-4">
            <div className="bg-[#faf7f4] rounded-3xl aspect-square flex items-center justify-center overflow-hidden">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover rounded-3xl"
                />
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
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${activeImage === img ? "border-gray-900" : "border-transparent"
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


      <ReviewsSection
        productId={id as string}
        ratings={ratings}
        isAuthenticated={isAuthenticated}
        onReviewAdded={fetchProduct}
      />
    </>
  )
}
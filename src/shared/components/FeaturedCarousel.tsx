"use client"

import { useEffect, useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Link from "next/link"
import { productService } from "@/features/products/productService"

export default function FeaturedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    productService.getAll(1).then((res) => {
      const data = res.data.data || res.data.products || res.data
      setProducts(Array.isArray(data) ? data.slice(0, 8) : [])
    })
  }, [])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!products.length) return null

  return (
    <section className="py-16 bg-[#faf7f4]">
      <div className="max-w-7xl mx-auto px-8 mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Handpicked for you</p>
          <h2 className="font-serif text-4xl">Featured <em>Products</em></h2>
        </div>
        <div className="flex gap-2">
          <button onClick={scrollPrev} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition text-gray-600">←</button>
          <button onClick={scrollNext} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition text-gray-600">→</button>
        </div>
      </div>

      <div className="overflow-hidden px-8" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="flex-shrink-0 w-56"
            >
              <div className="bg-white rounded-2xl overflow-hidden group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.mainImage || product.images?.[0] || ""}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h3>
                  <p className="text-[#c97a8f] font-semibold mt-1">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
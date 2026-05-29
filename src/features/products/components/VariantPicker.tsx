"use client"

import type { Product, ProductVariant } from "../types"
import { formatSlug, isColorVariant } from "../types"

interface VariantPickerProps {
  product: Product
  selected: ProductVariant | null
  onSelect: (variant: ProductVariant) => void
}

export default function VariantPicker({ product, selected, onSelect }: VariantPickerProps) {
  if (product.variants.length <= 1) return null

  if (product.variantKind === "color") {
    return (
      <div>
        <p className="text-sm text-gray-500 mb-3">
          Shade:{" "}
          <span className="text-gray-900 font-medium">
            {selected && isColorVariant(selected) ? selected.colorName : "—"}
          </span>
        </p>
        <div className="flex flex-wrap gap-3">
          {product.variants.map((variant) => {
            if (!isColorVariant(variant)) return null
            const isSelected = selected?._id === variant._id
            const outOfStock = variant.stock === 0
            return (
              <button
                key={variant._id}
                type="button"
                title={`${variant.colorName}${outOfStock ? " (Out of stock)" : ""}`}
                onClick={() => onSelect(variant)}
                disabled={outOfStock}
                className={`w-10 h-10 rounded-full border-2 transition ${
                  isSelected ? "border-gray-900 scale-110" : "border-gray-200"
                } ${outOfStock ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}`}
                style={{ backgroundColor: variant.colorCode }}
              />
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">Size</p>
      <div className="flex flex-wrap gap-2">
        {product.variants.map((variant) => {
          if (isColorVariant(variant)) return null
          const isSelected = selected?._id === variant._id
          const outOfStock = variant.stock === 0
          const displayPrice = variant.price ?? product.price
          return (
            <button
              key={variant._id}
              type="button"
              onClick={() => onSelect(variant)}
              disabled={outOfStock}
              className={`px-4 py-2 rounded-full border-2 text-sm transition ${
                isSelected
                  ? "border-gray-900 bg-white text-gray-900 font-bold"
                  : "border-gray-200 bg-gray-900 text-white hover:border-gray-400"
              } ${outOfStock ? "opacity-40 cursor-not-allowed line-through" : ""}`}
            >
              {variant.sizeLabel}
              {variant.price != null && variant.price !== product.price && (
                <span className="ml-1 text-xs opacity-75">${displayPrice}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ProductMeta({ product }: { product: Product }) {
  return (
    <p className="text-[#c9a96e] text-sm uppercase tracking-widest">
      {product.brand} · {formatSlug(product.department)} · {formatSlug(product.subcategory)}
    </p>
  )
}
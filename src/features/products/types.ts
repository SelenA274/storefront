export type Department =
  | "makeup"
  | "skincare"
  | "fragrance"
  | "hair-care"
  | "body-care"

export type VariantKind = "color" | "size"

export interface ColorVariant {
  _id: string
  colorName: string
  colorCode: string
  stock: number
  sku?: string
}

export interface SizeVariant {
  _id: string
  sizeLabel: string
  stock: number
  sku?: string
  price?: number
}

export type ProductVariant = ColorVariant | SizeVariant

export interface Product {
  _id: string
  name: string
  brand: string
  description: string
  price: number
  department: Department
  subcategory: string
  mainImage: string
  images: string[]
  variantKind: VariantKind
  variants: ProductVariant[]
  totalStock: number
  sold: number
  isActive: boolean
  averageRating: number
  ratings: number[]
  createdAt: string
  updatedAt: string
}

export interface CartProduct {
  _id: string
  name: string
  price: number
  mainImage?: string
  images: string[]
  variants?: ProductVariant[]
  isActive?: boolean
}

export const DEPARTMENTS: { slug: Department; label: string }[] = [
  { slug: "makeup", label: "Makeup" },
  { slug: "skincare", label: "Skincare" },
  { slug: "fragrance", label: "Fragrance" },
  { slug: "hair-care", label: "Hair Care" },
  { slug: "body-care", label: "Body Care" },
]

export function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function getProductImage(product: {
  mainImage?: string
  images?: string[]
}): string | undefined {
  return product.mainImage || product.images?.[0]
}

export function isColorVariant(variant: ProductVariant): variant is ColorVariant {
  return "colorName" in variant
}

export function getVariantLabel(product: Product): string | null {
  const count = product.variants.length
  if (count <= 1) return null
  return product.variantKind === "color"
    ? `${count} shades available`
    : `${count} sizes available`
}

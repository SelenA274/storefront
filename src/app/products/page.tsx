import { Suspense } from "react"
import ProductList from "@/features/products/components/ProductList"

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams
  const title = category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`
    : "Our Collection"

  return (
    <main>
      <div className="bg-[#fde8ed] py-16 text-center">
        <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-3">Discover</p>
        <h1 className="font-serif text-5xl text-gray-900">{title}</h1>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-16">
        <Suspense fallback={<p className="text-center py-20 text-gray-400">Loading...</p>}>
          <ProductList />
        </Suspense>
      </div>
    </main>
  )
}
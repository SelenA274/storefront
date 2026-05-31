import { Suspense } from "react"
import Link from "next/link"
import ProductList from "@/features/products/components/ProductList"
import { formatSlug, DEPARTMENTS } from "@/features/products/types"

const SUBCATEGORIES: Record<string, string[]> = {
  makeup: ["lips", "face", "eyes", "brows", "tools"],
  skincare: ["morning-routine", "evening-routine", "spf-sun-care", "masks-treatments"],
  fragrance: ["floral", "woody", "fresh", "oriental"],
  "hair-care": ["shampoo-conditioner", "hair-masks-treatments", "styling"],
  "body-care": ["moisturizers", "scrubs", "bath-shower"],
}

interface Props {
  searchParams: Promise<{ department?: string; subcategory?: string; category?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams
  const department = params.department
  const activeSubcategory = params.subcategory || null
  const filterSlug = activeSubcategory || department
  const title = department
    ? `${formatSlug(department)} Collection`
    : "Our Collection"

  const subcategories = department ? SUBCATEGORIES[department] ?? [] : []

  return (
    <main>
      <div className="bg-[#fde8ed] py-16 text-center">
        <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-3">Discover</p>
        <h1 className="font-serif text-5xl text-gray-900">{title}</h1>
      </div>


      {subcategories.length > 0 && (
        <div className="border-b border-gray-100 bg-[#faf7f4]">
          <div className="max-w-7xl mx-auto px-18 flex items-center justify-center gap-15 h-12">
            <Link
              href={`/products?department=${department}`}
              className={`text-[15px] tracking-[3px] uppercase transition-all duration-200 inline-block ${!activeSubcategory
                  ? "text-gray-900 font-medium scale-110"
                  : "text-gray-400 hover:text-gray-900 hover:scale-105"
                }`}
            >
              All
            </Link>
            {subcategories.map((sub) => (
              <Link
                key={sub}
                href={`/products?department=${department}&subcategory=${sub}`}
                className={`text-[13px] tracking-[1.5px] uppercase transition-all duration-200 inline-block ${activeSubcategory === sub
                    ? "text-gray-900 font-medium scale-110"
                    : "text-gray-400 hover:text-gray-900 hover:scale-105"
                  }`}
              >
                {sub.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-8 py-16">
        <Suspense fallback={<p className="text-center py-20 text-gray-400">Loading...</p>}>
          <ProductList />
        </Suspense>
      </div>
    </main>
  )
}
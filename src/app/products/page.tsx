import ProductList from "@/features/products/components/ProductList"

export default function ProductsPage() {
  return (
    <main>
      <div className="bg-[#fde8ed] py-16 text-center">
        <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-3">Discover</p>
        <h1 className="font-serif text-5xl text-gray-900">Our Collection</h1>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-16">
        <ProductList />
      </div>
    </main>
  )
}
import ProductList from "@/features/products/components/ProductList"

export default function ProductsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <ProductList />
    </main>
  )
}
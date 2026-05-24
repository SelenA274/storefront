import Link from "next/link"

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-4">
      <h1 className="text-5xl font-bold">Welcome to Store</h1>
      <p className="text-gray-500 text-lg max-w-md">
        Discover our latest products and shop with ease.
      </p>
      <Link
        href="/products"
        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition text-lg"
      >
        Shop Now
      </Link>
    </main>
  )
}
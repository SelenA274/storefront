import Link from "next/link"

interface Product {
  _id: string
  name: string
  price: number
  images: string[]
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="group cursor-pointer">
        <div className="bg-[#faf7f4] rounded-2xl overflow-hidden aspect-square relative mb-4">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🧴
            </div>
          )}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300" />
        </div>
        <p className="text-xs text-[#c9a96e] uppercase tracking-widest mb-1">{product.category}</p>
        <h2 className="font-serif text-lg mb-1 group-hover:text-[#c97a8f] transition">{product.name}</h2>
        <p className="font-semibold text-gray-900">${product.price}</p>
      </div>
    </Link>
  )
}
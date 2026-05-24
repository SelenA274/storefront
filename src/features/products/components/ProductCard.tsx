import Link from "next/link"

interface Product {
  _id: string
  name: string
  price: number
  image: string
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <p className="text-sm text-gray-500">{product.category}</p>
          <h2 className="font-semibold text-lg">{product.name}</h2>
          <p className="text-black font-bold">${product.price}</p>
        </div>
      </div>
    </Link>
  )
}
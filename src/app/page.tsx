import Link from "next/link"

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-[#fde8ed] min-h-[90vh] flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          <div className="flex flex-col gap-6">
            <p className="text-[#c9a96e] text-sm font-semibold tracking-[0.3em] uppercase">
              New Collection
            </p>
            <h1 className="font-serif text-6xl md:text-7xl leading-tight text-gray-900">
              Glow Like <br />
              <span className="text-[#c97a8f]">Never Before</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-md leading-relaxed">
              Discover luxury beauty essentials — from bold makeup to gentle skincare and captivating fragrances.
            </p>
            <div className="flex gap-4 mt-4">
              <Link
                href="/products"
                className="bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-700 transition text-sm font-semibold tracking-wider inline-block"
              >
                SHOP NOW
              </Link>
              <Link
                href="/products"
                className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full hover:bg-gray-100 transition text-sm font-semibold tracking-wider inline-block"
              >
                EXPLORE
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <div className="w-96 h-96 bg-[#f4a7b9] rounded-full opacity-20 absolute right-0" />
            <p className="text-[#c97a8f] font-serif text-9xl opacity-10 absolute right-8">V</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="font-serif text-4xl text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Makeup", desc: "Bold looks for every occasion", emoji: "💄" },
            { name: "Skincare", desc: "Nourish and protect your skin", emoji: "🌿" },
            { name: "Fragrance", desc: "Scents that tell your story", emoji: "✨" },
          ].map((cat) => (
            <Link href={`/products?category=${cat.name.toLowerCase()}`} key={cat.name}>
              <div className="bg-[#faf7f4] rounded-2xl p-10 text-center hover:shadow-lg transition group cursor-pointer">
                <p className="text-5xl mb-4">{cat.emoji}</p>
                <h3 className="font-serif text-2xl mb-2 group-hover:text-[#c97a8f] transition">
                  {cat.name}
                </h3>
                <p className="text-gray-500 text-sm">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="bg-gray-900 text-white py-16 text-center">
        <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-4">Limited Time</p>
        <h2 className="font-serif text-5xl mb-6">Spring Beauty Sale</h2>
        <p className="text-gray-400 mb-8">Up to 40% off on selected products</p>
        <Link
          href="/products"
          className="bg-[#c9a96e] text-white px-10 py-4 rounded-full hover:bg-[#b8935a] transition text-sm font-semibold tracking-wider"
        >
          SHOP THE SALE
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
            { icon: "💝", title: "Luxury Packaging", desc: "Gift-ready presentation" },
            { icon: "↩️", title: "Easy Returns", desc: "30-day return policy" },
          ].map((f) => (
            <div key={f.title}>
              <p className="text-4xl mb-4">{f.icon}</p>
              <h3 className="font-serif text-xl mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
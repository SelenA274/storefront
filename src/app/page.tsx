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
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Shop by Category</p>
        <h2 className="font-serif text-4xl mb-12">A world of <em>beauty.</em></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: "Makeup",
              sub: "Color & Glow",
              href: "/products?category=makeup",
              img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
            },
            {
              name: "Skincare",
              sub: "Ritual & Care",
              href: "/products?category=skincare",
              img: "https://i.pinimg.com/1200x/f5/4d/43/f54d43ea6791f51c8a5e2998a13c2b5c.jpg",
            },
            {
              name: "Fragrance",
              sub: "Signature Scents",
              href: "/products?category=fragrance",
              img: "https://i.pinimg.com/1200x/31/bf/85/31bf85768b622cdc84f0d18ca78ab0bb.jpg",
            },
          ].map((cat) => (
            <Link href={cat.href} key={cat.name}>
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] group cursor-pointer">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white/70 text-xs uppercase tracking-widest mb-1">{cat.sub}</p>
                  <h3 className="font-serif text-4xl text-white">{cat.name}</h3>
                </div>
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
      <section className="bg-[#faf7f4] py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e8ddd5]">

            {[
              {
                title: "Free Shipping",
                desc: "Complimentary delivery on all orders over $50",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V11" />
                ),
              },
              {
                title: "Luxury Packaging",
                desc: "Every order arrives in signature gift-ready presentation",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                ),
              },
              {
                title: "Easy Returns",
                desc: "Hassle-free returns within 30 days of purchase",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                ),
              },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center px-12 py-10 group">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:shadow-md transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#c9a96e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {f.icon}
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>
    </main>
  )
}
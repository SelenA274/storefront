import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#faf7f4] mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-3xl">VELO</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Luxury beauty essentials curated for the modern woman.
          </p>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 mb-2">Join the insider list.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="border border-gray-200 p-2 rounded-lg text-sm flex-1 focus:outline-none focus:border-[#c97a8f]"
              />
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-[#c97a8f] transition">
                →
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Shop</p>
          <div className="flex flex-col gap-3">
            {["Makeup", "Skincare", "Fragrance", "New Arrivals", "Sale"].map((item) => (
              <Link key={item} href={`/products?category=${item.toLowerCase()}`} className="text-sm text-gray-600 hover:text-[#c97a8f] transition">
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Help</p>
          <div className="flex flex-col gap-3">
            {["Contact Us", "Shipping & Returns", "Order Tracking", "FAQ"].map((item) => (
              <p key={item} className="text-sm text-gray-600">{item}</p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">About</p>
          <div className="flex flex-col gap-3">
            {["Our Story", "Sustainability", "Careers", "Press"].map((item) => (
              <p key={item} className="text-sm text-gray-600">{item}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 py-6 px-8 flex justify-between items-center max-w-7xl mx-auto">
        <p className="text-xs text-gray-400">© 2026 VELO BEAUTY. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-4 text-xs text-gray-400">
          <p>PRIVACY</p>
          <p>TERMS</p>
          <p>COOKIES</p>
        </div>
      </div>
    </footer>
  )
}
"use client"

import Link from "next/link"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import SplitText from "../shared/components/SplitText"
import BorderGlow from "../shared/components/BorderGlow"

gsap.registerPlugin()

export default function HeroSection() {
  const badgeRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl.fromTo(badgeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
    tl.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "+=0.3")
    tl.fromTo(buttonsRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#faf7f4] min-h-[90vh] flex items-center px-8 py-16 overflow-visible">
        <div className="max-w-7xl mx-auto w-full pr-[400px]">
          <div className="relative flex items-center">

            {/* BorderGlow Box */}
            <div className="relative z-10" style={{ width: "900px", flexShrink: 0 }}>
            <BorderGlow
                edgeSensitivity={20}
                glowColor="340 60 75"
                backgroundColor="#faf7f4"
                borderRadius={20}
                glowRadius={32}
                glowIntensity={1.8}
                coneSpread={20}
                animated={true}
                colors={["#f4a7b9", "#c9a96e", "#c97a8f"]}
                className="w-full"
              >
                <div className="flex items-stretch min-h-[480px]">
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center gap-6 px-12 py-12 border-r border-[#f4a7b9]/30">
                    <p
                      ref={badgeRef}
                      style={{ opacity: 0 }}
                      className="text-[#c9a96e] text-sm font-semibold tracking-[0.3em] uppercase"
                    >
                      New Collection
                    </p>
                    <div className="font-serif text-6xl md:text-7xl leading-tight text-gray-900">
                      <SplitText
                        text="Glow Like"
                        tag="span"
                        className="block font-serif text-6xl md:text-7xl leading-tight text-gray-900"
                        delay={40} duration={0.8} ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 60 }} to={{ opacity: 1, y: 0 }}
                        threshold={0.1} rootMargin="0px" textAlign="left"
                      />
                      <SplitText
                        text="Never Before"
                        tag="span"
                        className="block font-serif text-6xl md:text-7xl leading-tight text-[#c97a8f]"
                        delay={40} duration={0.8} ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 60 }} to={{ opacity: 1, y: 0 }}
                        threshold={0.1} rootMargin="0px" textAlign="left"
                      />
                    </div>
                    <p
                      ref={subtitleRef}
                      style={{ opacity: 0 }}
                      className="text-gray-500 text-lg max-w-md leading-relaxed"
                    >
                      Discover luxury beauty essentials — from bold makeup to gentle skincare and captivating fragrances.
                    </p>
                    <div ref={buttonsRef} style={{ opacity: 0 }} className="flex gap-4 mt-2">
                      <Link
                        href="/products"
                        className="bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-700 transition text-sm font-semibold tracking-wider inline-block"
                      >
                        SHOP NOW
                      </Link>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </div>

            {/* Floating Video — يطلع من ورا الـ box */}
            <div
              className="absolute z-0"
              style={{
                right: "0px",           // ← قربيه أكثر
                left: "840px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "360px",
                height: "565px",
                borderRadius: "180px 180px 180px 180px / 260px 260px 260px 260px",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(201, 122, 143, 0.2)",
              }}
            >
              <div
                className="absolute inset-0 z-10"
                style={{
                  background: "linear-gradient(to right, #faf7f4 -20%, #faf7f4 -20%, transparent 45%)"
                }}
              />
              <video
                src="/videos/WhatsApp Video.mp4"
                autoPlay muted loop playsInline
                className="w-full h-full object-cover object-top" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Strip */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8 mb-8">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Shop by Category</p>
          <h2 className="font-serif text-4xl">A world of <em>beauty.</em></h2>
        </div>
        <div className="flex gap-4 px-8 overflow-x-scroll scrollbar-hide">
          {[
            { name: "Makeup", sub: "Color & Glow", href: "/products?department=makeup", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80" },
            { name: "Skincare", sub: "Ritual & Care", href: "/products?department=skincare", img: "https://i.pinimg.com/1200x/f5/4d/43/f54d43ea6791f51c8a5e2998a13c2b5c.jpg" },
            { name: "Fragrance", sub: "Signature Scents", href: "/products?department=fragrance", img: "https://i.pinimg.com/1200x/31/bf/85/31bf85768b622cdc84f0d18ca78ab0bb.jpg" },
            { name: "Hair Care", sub: "Shine & Strength", href: "/products?department=haircare", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80" },
            { name: "Body Care", sub: "Nourish & Glow", href: "/products?department=bodycare", img: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=800&q=80" },
          ].map((cat) => (
            <Link href={cat.href} key={cat.name} className="flex-shrink-0 w-80 md:w-96">
              <div className="relative overflow-hidden rounded-2xl aspect-[3/4] group cursor-pointer">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
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
    </>
  )
}
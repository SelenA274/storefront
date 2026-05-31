"use client"

import { useEffect, useRef } from "react"
import LoginForm from "@/features/auth/components/LoginForm"
import Link from "next/link"
import Grainient from "../../components/Grainient"

export default function AuthPage() {
  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeSlideUp 0.32s ease both; }
      `}</style>

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fde8ed]">


        <div className="absolute inset-0 w-full h-full">
          <Grainient
            color1="#fde8ed"
            color2="#f4a7bb"
            color3="#c97a8f"
            timeSpeed={0.9}
            warpStrength={1.2}
            warpFrequency={4.0}
            warpSpeed={1.8}
            warpAmplitude={60}
            blendAngle={15}
            blendSoftness={0.15}
            rotationAmount={200}
            noiseScale={1.5}
            grainAmount={0.04}
            grainScale={1.8}
            grainAnimated={true}
            contrast={1.2}
            gamma={1.0}
            saturation={0.9}
            zoom={0.85}
          />
        </div>


        <div
          className="relative z-10 w-full max-w-md mx-4 rounded-3xl border border-white/40 shadow-[0_8px_64px_rgba(201,122,143,0.25)] overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(28px) saturate(1.6)",
            WebkitBackdropFilter: "blur(28px) saturate(1.6)"
          }}
        >
          <div className="px-10 pt-10 pb-6 text-center">
            <Link href="/" className="font-serif text-4xl font-bold tracking-[0.3em] text-[#8a3f57] select-none">
              VELO
            </Link>
            <p className="mt-1 text-[11px] tracking-[0.25em] text-[#c97a8f] uppercase font-light">Luxury Beauty</p>
          </div>

          <div className="px-10 pb-10">
            <div className="fade-up">
              <h1 className="font-serif text-xl text-gray-800 mb-1">Welcome back</h1>
              <p className="text-gray-400 text-xs mb-6">Sign in to your account to continue</p>
              <LoginForm />
              <p className="text-xs text-center text-gray-400 mt-6">
                New here?{" "}
                <Link href="/register" className="text-[#c97a8f] hover:underline">
                  Create an account
                </Link>
              </p>
              <p className="text-xs text-center text-gray-400">
                Are you an admin?{" "}
                <a href="http://localhost:5173/login" className="text-[#c9a96e] hover:underline">
                  Admin Portal
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
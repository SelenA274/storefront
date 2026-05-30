"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import api from "@/lib/axios"
import { ShieldCheck } from "lucide-react"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.get(`/auth/verify-email/${token}`)
      toast.success("Email verified! You can now login.")
      router.push("/login")
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #faf7f2 0%, #efe7da 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      padding: "24px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');
        .verify-input:focus { outline: none; border-color: #c9a96e !important; box-shadow: 0 0 0 3px rgba(201,169,110,0.12) !important; }
        .verify-input::placeholder { color: #c8b99a; letter-spacing: 0.2em; }
        .gold-btn:hover:not(:disabled) { background: linear-gradient(135deg, #d4b87a, #b8904a) !important; box-shadow: 0 8px 32px rgba(201,169,110,0.45) !important; transform: translateY(-1px); }
        .gold-btn { transition: all 0.25s ease !important; }
      `}</style>

      {/* Decorative circles */}
      <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,169,110,0.18) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-100px", left: "-100px", width: "520px", height: "520px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", left: "60%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(239,213,170,0.15) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />

      <div style={{
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: "32px",
        border: "1px solid rgba(201,169,110,0.18)",
        boxShadow: "0 8px 48px rgba(180,150,100,0.13), 0 2px 8px rgba(0,0,0,0.04)",
        padding: "56px 48px",
        width: "100%",
        maxWidth: "420px",
        zIndex: 1,
        position: "relative" as const,
        textAlign: "center" as const,
      }}>

        {/* Icon */}
        <div style={{
          width: "68px", height: "68px", borderRadius: "50%",
          background: "linear-gradient(135deg, #f5e6cc, #e8d5b0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(201,169,110,0.25)",
          margin: "0 auto 28px",
        }}>
          <ShieldCheck size={30} color="#c9a96e" />
        </div>

        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <p style={{
            fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase" as const,
            color: "#c9a96e", marginBottom: "10px", fontFamily: "sans-serif", fontWeight: 500,
          }}>
            Security
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.2rem", fontWeight: 600,
            color: "#2a1f14", margin: "0 0 12px", lineHeight: 1.2,
          }}>
            Verify Your Email
          </h1>
          <p style={{ fontSize: "0.88rem", color: "#9a8870", margin: 0, fontFamily: "sans-serif", fontWeight: 300, lineHeight: 1.6 }}>
            Enter the verification code sent to your email address
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" as const, gap: "14px" }}>
          <input
            placeholder="Enter verification code"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="verify-input"
            required
            style={{
              width: "100%", border: "1.5px solid rgba(201,169,110,0.25)", borderRadius: "14px",
              padding: "14px 16px", fontSize: "0.95rem", textAlign: "center" as const,
              background: "rgba(255,255,255,0.8)", color: "#2a1f14",
              boxSizing: "border-box" as const, fontFamily: "sans-serif",
              transition: "border-color 0.2s, box-shadow 0.2s",
              letterSpacing: "0.15em",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className="gold-btn"
            style={{
              marginTop: "8px",
              background: loading ? "rgba(201,169,110,0.5)" : "linear-gradient(135deg, #c9a96e, #a8803d)",
              color: "#fff", border: "none", borderRadius: "50px",
              padding: "15px", fontSize: "0.78rem", fontFamily: "sans-serif",
              fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" as const,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 20px rgba(201,169,110,0.35)",
            }}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

      </div>
    </main>
  )
}
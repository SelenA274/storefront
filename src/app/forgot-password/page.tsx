"use client"

import { useState } from "react"
import { authService } from "@/features/auth/authService"
import { toast } from "react-toastify"
import { ArrowLeft, Mail, Eye, EyeOff, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.forgotPassword(email)
      setSent(true)
      toast.success("Reset link sent to your email!")
    } catch {
      toast.error("Failed to send reset email")
    } finally {
      setLoading(false)
    }
  }

  if (sent) return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #faf7f2 0%, #efe7da 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative blurred circles */}
      <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,169,110,0.18) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-100px", left: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

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
        textAlign: "center",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        gap: "20px",
        zIndex: 1,
      }}>
        <div style={{
          width: "72px", height: "72px", borderRadius: "50%",
          background: "linear-gradient(135deg, #f5e6cc, #e8d5b0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(201,169,110,0.25)",
        }}>
          <CheckCircle size={32} color="#c9a96e" />
        </div>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, color: "#2a1f14", margin: "0 0 8px" }}>Email Sent</h1>
          <p style={{ fontSize: "0.92rem", color: "#8a7560", lineHeight: 1.7, margin: 0 }}>
            We sent a reset link to<br />
            <span style={{ color: "#c9a96e", fontWeight: 600 }}>{email}</span>
          </p>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#b0a090", margin: 0 }}>Check your inbox and follow the instructions.</p>
        <Link href="/login" style={{
          marginTop: "8px",
          fontSize: "0.82rem",
          color: "#c9a96e",
          textDecoration: "none",
          letterSpacing: "0.15em",
          textTransform: "uppercase" as const,
          borderBottom: "1px solid rgba(201,169,110,0.4)",
          paddingBottom: "2px",
          transition: "opacity 0.2s",
        }}>
          Back to Login
        </Link>
      </div>
    </main>
  )

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #faf7f2 0%, #efe7da 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      position: "relative",
      overflow: "hidden",
      padding: "24px",
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Cormorant+Garamond:wght@300;400;500&display=swap');
        .reset-input:focus { outline: none; border-color: #c9a96e !important; box-shadow: 0 0 0 3px rgba(201,169,110,0.12) !important; }
        .reset-input::placeholder { color: #c8b99a; }
        .gold-btn:hover { background: linear-gradient(135deg, #d4b87a, #b8904a) !important; box-shadow: 0 8px 32px rgba(201,169,110,0.45) !important; transform: translateY(-1px); }
        .gold-btn:active { transform: translateY(0); }
        .gold-btn { transition: all 0.25s ease !important; }
        .back-link:hover { opacity: 0.7; }
        .back-link { transition: opacity 0.2s; }
      `}</style>

      {/* Decorative blurred circles */}
      <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,169,110,0.18) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-100px", left: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
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
      }}>

        <Link href="/login" className="back-link" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "0.78rem", color: "#b0a090", textDecoration: "none",
          letterSpacing: "0.1em", textTransform: "uppercase" as const,
          marginBottom: "40px",
        }}>
          <ArrowLeft size={13} /> Back
        </Link>

        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <p style={{
            fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase" as const,
            color: "#c9a96e", marginBottom: "10px", fontFamily: "sans-serif", fontWeight: 500,
          }}>
            Password Recovery
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.4rem", fontWeight: 600,
            color: "#2a1f14", margin: "0 0 12px", lineHeight: 1.2,
          }}>
            Forgot your<br />password?
          </h1>
          <p style={{ fontSize: "0.92rem", color: "#9a8870", lineHeight: 1.7, margin: 0, fontFamily: "sans-serif", fontWeight: 300 }}>
            Enter your email address and we'll send you a secure link to reset it.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" as const, gap: "16px" }}>
          {/* Email input with icon */}
          <div style={{ position: "relative" as const }}>
            <Mail
              size={16}
              color={focused ? "#c9a96e" : "#c8b99a"}
              style={{
                position: "absolute", left: "16px", top: "50%",
                transform: "translateY(-50%)", transition: "color 0.2s", pointerEvents: "none",
              }}
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="reset-input"
              required
              style={{
                width: "100%",
                border: "1.5px solid rgba(201,169,110,0.25)",
                borderRadius: "14px",
                padding: "14px 16px 14px 44px",
                fontSize: "0.9rem",
                background: "rgba(255,255,255,0.8)",
                color: "#2a1f14",
                boxSizing: "border-box" as const,
                fontFamily: "sans-serif",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            />
          </div>

          {/* Gold gradient button */}
          <button
            type="submit"
            disabled={loading}
            className="gold-btn"
            style={{
              marginTop: "8px",
              background: loading ? "rgba(201,169,110,0.5)" : "linear-gradient(135deg, #c9a96e, #a8803d)",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              padding: "15px",
              fontSize: "0.78rem",
              fontFamily: "sans-serif",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 20px rgba(201,169,110,0.35)",
            }}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "28px 0 0" }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(201,169,110,0.15)" }} />
          <span style={{ fontSize: "0.75rem", color: "#c8b99a", fontFamily: "sans-serif" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "rgba(201,169,110,0.15)" }} />
        </div>

        <div style={{ textAlign: "center" as const, marginTop: "20px" }}>
          <Link href="/login" style={{
            fontSize: "0.82rem", color: "#9a8870", textDecoration: "none",
            fontFamily: "sans-serif",
          }}>
            Remember your password?{" "}
            <span style={{ color: "#c9a96e", fontWeight: 600, borderBottom: "1px solid rgba(201,169,110,0.4)", paddingBottom: "1px" }}>
              Sign in
            </span>
          </Link>
        </div>

      </div>
    </main>
  )
}
"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setUser } from "@/features/auth/authSlice"
import api from "@/lib/axios"
import { toast } from "react-toastify"
import Link from "next/link"
import { MapPin, User, Mail, Crown, Calendar, Plus, Pencil, Trash2, X, Check, ShoppingBag } from "lucide-react"

interface Address {
  _id?: string
  city: string
  street: string
  zipCode: string
  country: string
}

const gold = "#c9a96e"
const goldLight = "rgba(201,169,110,0.15)"
const goldBorder = "rgba(201,169,110,0.25)"

const glassCard = {
  background: "rgba(255,255,255,0.6)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: "32px",
  border: `1px solid ${goldBorder}`,
  boxShadow: "0 8px 40px rgba(180,150,100,0.10), 0 2px 8px rgba(0,0,0,0.04)",
  padding: "40px",
}

const luxuryInput = {
  width: "100%",
  border: `1.5px solid ${goldBorder}`,
  borderRadius: "14px",
  padding: "13px 16px",
  fontSize: "0.88rem",
  background: "rgba(255,255,255,0.8)",
  color: "#2a1f14",
  boxSizing: "border-box" as const,
  fontFamily: "sans-serif",
  transition: "border-color 0.2s, box-shadow 0.2s",
}

const goldBtn = {
  background: "linear-gradient(135deg, #c9a96e, #a8803d)",
  color: "#fff",
  border: "none",
  borderRadius: "50px",
  padding: "12px 28px",
  fontSize: "0.75rem",
  fontFamily: "sans-serif",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  cursor: "pointer",
  boxShadow: "0 4px 16px rgba(201,169,110,0.30)",
  transition: "all 0.25s ease",
}

export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  const [editingInfo, setEditingInfo] = useState(false)
  const [editingAddress, setEditingAddress] = useState<string | null>(null)
  const [addingAddress, setAddingAddress] = useState(false)
  const [savingInfo, setSavingInfo] = useState(false)
  const [savingAddress, setSavingAddress] = useState(false)
  const [name, setName] = useState(user?.name ?? "")

  const emptyAddress: Address = { city: "", street: "", zipCode: "", country: "" }
  const [addressForm, setAddressForm] = useState<Address>(emptyAddress)

  if (!isAuthenticated) return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #faf7f2 0%, #efe7da 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#2a1f14", marginBottom: "24px" }}>Please sign in to view your account</p>
        <Link href="/login" style={{ ...goldBtn, textDecoration: "none", padding: "14px 36px" }}>Sign In</Link>
      </div>
    </main>
  )

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : null

  const handleSaveInfo = async () => {
    setSavingInfo(true)
    try {
      const res = await api.put(`/users/profile/${user?._id}`, { name })
      dispatch(setUser(res.data.data || res.data.user || res.data))
      toast.success("Profile updated!")
      setEditingInfo(false)
    } catch {
      toast.error("Failed to update profile")
    } finally {
      setSavingInfo(false)
    }
  }

  const handleSaveAddress = async () => {
    setSavingAddress(true)
    try {
      if (editingAddress) {
        await api.put(`/users/addresses/${editingAddress}`, addressForm)
      } else {
        await api.post(`/users/addresses/${user?._id}`, addressForm)
      }
      const res = await api.get("/users/profile")
      dispatch(setUser(res.data.data || res.data.user || res.data))
      toast.success(editingAddress ? "Address updated!" : "Address added!")
      setEditingAddress(null)
      setAddingAddress(false)
      setAddressForm(emptyAddress)
    } catch {
      toast.error("Failed to save address")
    } finally {
      setSavingAddress(false)
    }
  }

  const handleDeleteAddress = async (addrId: string) => {
    try {
      await api.delete(`/users/addresses/${addrId}`)
      const res = await api.get("/users/profile")
      dispatch(setUser(res.data.data || res.data.user || res.data))
      toast.success("Address removed")
    } catch {
      toast.error("Failed to delete address")
    }
  }

  const addresses: Address[] = (user as any)?.addresses ?? []

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(160deg, #faf7f2 0%, #f2ebe0 50%, #ede4d3 100%)", fontFamily: "sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        .lux-input:focus { outline: none; border-color: #c9a96e !important; box-shadow: 0 0 0 3px rgba(201,169,110,0.12) !important; }
        .lux-input::placeholder { color: #c8b99a; }
        .gold-btn-hover:hover { background: linear-gradient(135deg, #d4b87a, #b8904a) !important; box-shadow: 0 8px 24px rgba(201,169,110,0.4) !important; transform: translateY(-1px); }
        .ghost-btn:hover { color: #2a1f14 !important; }
        .addr-card:hover { border-color: rgba(201,169,110,0.4) !important; box-shadow: 0 4px 20px rgba(201,169,110,0.10) !important; }
        .icon-btn:hover { color: #c9a96e !important; }
      `}</style>


      <div style={{ position: "fixed", top: "-120px", right: "-120px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,169,110,0.14) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-150px", left: "-150px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,169,110,0.10) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none", zIndex: 0 }} />


      <div style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(245,235,215,0.6) 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${goldBorder}`,
        padding: "60px 24px",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}>

        <div style={{
          width: "88px", height: "88px", borderRadius: "50%",
          background: "linear-gradient(135deg, #f5e6cc, #e8d0a0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
          boxShadow: "0 8px 32px rgba(201,169,110,0.30), 0 0 0 4px rgba(201,169,110,0.15)",
          fontSize: "2.2rem",
          fontFamily: "'Playfair Display', serif",
          color: gold,
          fontWeight: 600,
        }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <p style={{ fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase", color: gold, marginBottom: "8px", fontWeight: 500 }}>
          Welcome 
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", fontWeight: 500, color: "#2a1f14", margin: "0 0 8px", lineHeight: 1.2 }}>
          {user?.name}
        </h1>
        
      </div>


      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: "24px", position: "relative", zIndex: 1 }}>


        <div style={glassCard}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: goldLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <User size={14} color={gold} />
              </div>
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: gold, fontWeight: 600 }}>Personal Info</span>
            </div>
            {!editingInfo && (
              <button className="ghost-btn" onClick={() => setEditingInfo(true)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: "#b0a090", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.2s" }}>
                <Pencil size={12} /> Edit
              </button>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>


            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "rgba(255,255,255,0.5)", borderRadius: "16px", border: `1px solid ${goldBorder}` }}>
              <User size={15} color={gold} style={{ flexShrink: 0 }} />
              {editingInfo ? (
                <input value={name} onChange={(e) => setName(e.target.value)} className="lux-input" style={{ ...luxuryInput, padding: "8px 12px" }} />
              ) : (
                <div>
                  <p style={{ fontSize: "0.7rem", color: "#b0a090", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 2px" }}>Full Name</p>
                  <p style={{ fontSize: "0.95rem", color: "#2a1f14", margin: 0, fontFamily: "'Playfair Display', serif" }}>{user?.name}</p>
                </div>
              )}
            </div>


            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "rgba(255,255,255,0.5)", borderRadius: "16px", border: `1px solid ${goldBorder}` }}>
              <Mail size={15} color={gold} style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "0.7rem", color: "#b0a090", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 2px" }}>Email</p>
                <p style={{ fontSize: "0.95rem", color: "#2a1f14", margin: 0 }}>{user?.email}</p>
              </div>
            </div>


            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "rgba(255,255,255,0.5)", borderRadius: "16px", border: `1px solid ${goldBorder}` }}>
                <Crown size={15} color={gold} style={{ flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: "0.65rem", color: "#b0a090", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 2px" }}>Role</p>
                  <p style={{ fontSize: "0.88rem", color: "#2a1f14", margin: 0, textTransform: "capitalize" }}>{user?.role}</p>
                </div>
              </div>
              {joinDate && (
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px", background: "rgba(255,255,255,0.5)", borderRadius: "16px", border: `1px solid ${goldBorder}` }}>
                  <Calendar size={15} color={gold} style={{ flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "0.65rem", color: "#b0a090", textTransform: "uppercase", letterSpacing: "0.15em", margin: "0 0 2px" }}>Member Since</p>
                    <p style={{ fontSize: "0.88rem", color: "#2a1f14", margin: 0 }}>{joinDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {editingInfo && (
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button className="gold-btn-hover" onClick={handleSaveInfo} disabled={savingInfo} style={{ ...goldBtn, opacity: savingInfo ? 0.5 : 1 }}>
                {savingInfo ? "Saving…" : "Save Changes"}
              </button>
              <button className="ghost-btn" onClick={() => { setEditingInfo(false); setName(user?.name ?? "") }} style={{ background: "none", border: "none", cursor: "pointer", color: "#b0a090", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.2s" }}>
                Cancel
              </button>
            </div>
          )}
        </div>


        <div style={glassCard}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: goldLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={14} color={gold} />
              </div>
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.3em", textTransform: "uppercase", color: gold, fontWeight: 600 }}>Addresses</span>
            </div>
            {!addingAddress && !editingAddress && (
              <button className="ghost-btn" onClick={() => { setAddingAddress(true); setAddressForm(emptyAddress) }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", color: "#b0a090", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.2s" }}>
                <Plus size={12} /> Add
              </button>
            )}
          </div>

          {addresses.length === 0 && !addingAddress && (
            <p style={{ fontSize: "0.88rem", color: "#b0a090", textAlign: "center", padding: "24px 0" }}>No addresses saved yet.</p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {addresses.map((addr: any) => (
              <div key={addr._id} className="addr-card" style={{ border: `1px solid ${goldBorder}`, borderRadius: "20px", padding: "20px", transition: "all 0.2s", background: "rgba(255,255,255,0.5)" }}>
                {editingAddress === addr._id ? (
                  <AddressForm form={addressForm} onChange={setAddressForm} onSave={handleSaveAddress} onCancel={() => { setEditingAddress(null); setAddressForm(emptyAddress) }} saving={savingAddress} />
                ) : (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <MapPin size={15} color={gold} style={{ marginTop: "2px", flexShrink: 0 }} />
                      <div style={{ fontSize: "0.88rem", color: "#5a4a3a", lineHeight: 1.7 }}>
                        <p style={{ margin: 0 }}>{addr.street}</p>
                        <p style={{ margin: 0 }}>{addr.city}, {addr.zipCode}</p>
                        <p style={{ margin: 0, color: "#9a8870" }}>{addr.country}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <button className="icon-btn" onClick={() => { setEditingAddress(addr._id); setAddressForm(addr) }} style={{ background: "none", border: "none", cursor: "pointer", color: "#c8b99a", transition: "color 0.2s", padding: "4px" }}>
                        <Pencil size={14} />
                      </button>
                      <button className="icon-btn" onClick={() => handleDeleteAddress(addr._id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#c8b99a", transition: "color 0.2s", padding: "4px" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {addingAddress && (
              <div style={{ border: `1px solid ${goldBorder}`, borderRadius: "20px", padding: "20px", background: "rgba(255,255,255,0.5)" }}>
                <AddressForm form={addressForm} onChange={setAddressForm} onSave={handleSaveAddress} onCancel={() => { setAddingAddress(false); setAddressForm(emptyAddress) }} saving={savingAddress} />
              </div>
            )}
          </div>
        </div>

        <Link href="/orders" className="gold-btn-hover" style={{
          ...goldBtn,
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "18px",
          borderRadius: "20px",
          fontSize: "0.78rem",
        }}>
          <ShoppingBag size={16} />
          View My Orders
        </Link>

      </div>
    </main>
  )
}

function AddressForm({ form, onChange, onSave, onCancel, saving }: {
  form: Address
  onChange: (a: Address) => void
  onSave: () => void
  onCancel: () => void
  saving: boolean
}) {
  const fields = [
    { key: "street", placeholder: "Street address", icon: "📍" },
    { key: "city", placeholder: "City", icon: "🏙" },
    { key: "zipCode", placeholder: "ZIP / Postal code", icon: "📮" },
    { key: "country", placeholder: "Country", icon: "🌍" },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {fields.map((f) => (
        <input
          key={f.key}
          placeholder={f.placeholder}
          value={(form as any)[f.key]}
          onChange={(e) => onChange({ ...form, [f.key]: e.target.value })}
          className="lux-input"
          style={{
            width: "100%", border: "1.5px solid rgba(201,169,110,0.25)", borderRadius: "12px",
            padding: "12px 16px", fontSize: "0.88rem",
            background: "rgba(255,255,255,0.8)", color: "#2a1f14",
            boxSizing: "border-box" as const, fontFamily: "sans-serif",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        />
      ))}
      <div style={{ display: "flex", gap: "12px", marginTop: "6px" }}>
        <button className="gold-btn-hover" onClick={onSave} disabled={saving} style={{
          background: "linear-gradient(135deg, #c9a96e, #a8803d)", color: "#fff", border: "none",
          borderRadius: "50px", padding: "11px 24px", fontSize: "0.72rem", fontFamily: "sans-serif",
          fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" as const,
          cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.5 : 1,
          boxShadow: "0 4px 14px rgba(201,169,110,0.28)", transition: "all 0.25s ease",
        }}>
          {saving ? "Saving…" : "Save"}
        </button>
        <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", color: "#b0a090", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" as const, transition: "color 0.2s" }}>
          Cancel
        </button>
      </div>
    </div>
  )
}
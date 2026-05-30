"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setUser } from "@/features/auth/authSlice"
import api from "@/lib/axios"
import { toast } from "react-toastify"
import Link from "next/link"

interface Address {
  _id?: string
  city: string
  street: string
  zipCode: string
  country: string
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
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="font-serif text-2xl mb-4">Please login to view your profile</p>
        <Link href="/login" className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-[#c97a8f] transition text-sm uppercase tracking-widest">
          Login
        </Link>
      </div>
    </main>
  )

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
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
  console.log(user)
  return (
    <main>
      <div className="bg-[#fde8ed] py-16 text-center">
        <p className="text-[#c9a96e] text-sm tracking-[0.3em] uppercase mb-3">Welcome!</p>
        <h1 className="font-serif text-5xl text-gray-900">{user?.name}</h1>
      </div>

      <div className="max-w-2xl mx-auto px-8 py-16 flex flex-col gap-6">

        {/* ── Personal Info ── */}
        <div className="bg-[#faf7f4] rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs uppercase tracking-widest text-[#c9a96e]">Personal Info</p>
            {!editingInfo && (
              <button
                onClick={() => setEditingInfo(true)}
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition"
              >
                Edit
              </button>
            )}
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#fde8ed] flex items-center justify-center shrink-0">
              <span className="font-serif text-2xl text-[#c97a8f]">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              {editingInfo ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-200 rounded-xl px-4 py-2 text-sm w-full focus:outline-none focus:border-[#c97a8f] transition"
                />
              ) : (
                <p className="font-serif text-xl">{user?.name}</p>
              )}
              <p className="text-gray-400 text-sm mt-1">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-200 pt-5">
            <div className="flex justify-between">
              <p className="text-gray-400 text-sm uppercase tracking-widest">Role</p>
              <p className="text-sm font-medium capitalize">{user?.role}</p>
            </div>
            {joinDate && (
              <div className="flex justify-between">
                <p className="text-gray-400 text-sm uppercase tracking-widest">Member since</p>
                <p className="text-sm font-medium">{joinDate}</p>
              </div>
            )}
          </div>

          {editingInfo && (
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveInfo}
                disabled={savingInfo}
                className="bg-gray-900 text-white text-sm uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#c97a8f] transition disabled:opacity-40"
              >
                {savingInfo ? "Saving…" : "Save"}
              </button>
              <button
                onClick={() => { setEditingInfo(false); setName(user?.name ?? "") }}
                className="text-sm uppercase tracking-widest text-gray-400 hover:text-gray-900 transition px-6 py-3"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* ── Addresses ── */}
        <div className="bg-[#faf7f4] rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs uppercase tracking-widest text-[#c9a96e]">Addresses</p>
            {!addingAddress && !editingAddress && (
              <button
                onClick={() => { setAddingAddress(true); setAddressForm(emptyAddress) }}
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 transition"
              >
                + Add
              </button>
            )}
          </div>

          {addresses.length === 0 && !addingAddress && (
            <p className="text-gray-400 text-sm">No addresses saved yet.</p>
          )}

          <div className="flex flex-col gap-4">
            {addresses.map((addr: any) => (
              <div key={addr._id} className="border border-gray-100 rounded-xl p-4">
                {editingAddress === addr._id ? (
                  <AddressForm
                    form={addressForm}
                    onChange={setAddressForm}
                    onSave={handleSaveAddress}
                    onCancel={() => { setEditingAddress(null); setAddressForm(emptyAddress) }}
                    saving={savingAddress}
                  />
                ) : (
                  <div className="flex justify-between items-start">
                    <div className="text-sm text-gray-600 leading-relaxed">
                      <p>{addr.street}</p>
                      <p>{addr.city}, {addr.zipCode}</p>
                      <p>{addr.country}</p>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-400">
                      <button
                        onClick={() => { setEditingAddress(addr._id); setAddressForm(addr) }}
                        className="hover:text-gray-900 transition uppercase tracking-widest"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(addr._id)}
                        className="hover:text-red-400 transition uppercase tracking-widest"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {addingAddress && (
              <div className="border border-gray-100 rounded-xl p-4">
                <AddressForm
                  form={addressForm}
                  onChange={setAddressForm}
                  onSave={handleSaveAddress}
                  onCancel={() => { setAddingAddress(false); setAddressForm(emptyAddress) }}
                  saving={savingAddress}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Orders link ── */}
        <Link
          href="/orders"
          className="bg-gray-900 text-white text-center py-4 rounded-full hover:bg-[#c97a8f] transition text-sm uppercase tracking-widest"
        >
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
    { key: "street", placeholder: "Street" },
    { key: "city", placeholder: "City" },
    { key: "zipCode", placeholder: "ZIP Code" },
    { key: "country", placeholder: "Country" },
  ]
  return (
    <div className="flex flex-col gap-3">
      {fields.map((f) => (
        <input
          key={f.key}
          placeholder={f.placeholder}
          value={(form as any)[f.key]}
          onChange={(e) => onChange({ ...form, [f.key]: e.target.value })}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#c97a8f] transition"
        />
      ))}
      <div className="flex gap-3 mt-1">
        <button
          onClick={onSave}
          disabled={saving}
          className="bg-gray-900 text-white text-sm uppercase tracking-widest px-6 py-2 rounded-full hover:bg-[#c97a8f] transition disabled:opacity-40"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="text-sm uppercase tracking-widest text-gray-400 hover:text-gray-900 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
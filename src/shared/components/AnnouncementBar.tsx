"use client"

import { useEffect, useState } from "react"

const announcements = [
  "NEW ARRIVALS WEEKLY",
  "BEAUTY INSIDER REWARDS",
  "COMPLIMENTARY SHIPPING OVER $50",
  "FREE SAMPLES WITH EVERY ORDER",
]

export default function AnnouncementBar() {
  const announcements = [
    "NEW ARRIVALS WEEKLY",
    "BEAUTY INSIDER REWARDS",
    "COMPLIMENTARY SHIPPING OVER $50",
    "FREE SAMPLES WITH EVERY ORDER",
  ]

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...announcements, ...announcements].map((text, i) => (
          <span key={i} className="text-xs tracking-widest uppercase mx-12">
            · {text}
          </span>
        ))}
      </div>
    </div>
  )
}
"use client"

import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import type { PremiumCategory } from "@/lib/premium-categories"

interface CategoryCardProps {
  category: PremiumCategory
  index?: number
}

function Icon({ name }: { name?: string }) {
  // refined minimal stroke-based icons for a premium aesthetic
  const stroke = 1.6
  switch (name) {
    case "clipper":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-black-900" aria-hidden>
          <path d="M3 7h18" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 7v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 11h8" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "razor":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-black-900" aria-hidden>
          <path d="M3 12h18" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
          <path d="M6 12l3 6 9-12" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "scissors":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-black-900" aria-hidden>
          <circle cx="6" cy="7" r="2" stroke="currentColor" strokeWidth={stroke} />
          <circle cx="18" cy="17" r="2" stroke="currentColor" strokeWidth={stroke} />
          <path d="M8 9l8 8M8 15l8-8" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
      )
    case "brush":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-black-900" aria-hidden>
          <path d="M3 21s4-2 6-4 6-6 6-6 4-3 6-2v5s-3 2-6 3-6 4-6 4H3z" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case "bottle":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-black-900" aria-hidden>
          <rect x="7" y="3" width="10" height="14" rx="2" stroke="currentColor" strokeWidth={stroke} />
          <path d="M10 3v-1h4v1" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
        </svg>
      )
    case "comb":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-black-900" aria-hidden>
          <path d="M3 6s2-2 8-2 10 4 10 8-3 6-7 6-9-2-11-4v-8z" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-black-900" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={stroke} />
        </svg>
      )
  }
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const pathname = usePathname() || ""
  const isActive = pathname.startsWith(category.href)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Link href="/categories">
      <div
        ref={ref}
        role="link"
        aria-label={category.name}
        className={`group block w-full transform-gpu transition-all duration-500 ${visible ? "animate-fade-in-up" : "opacity-0 translate-y-6"}`}
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <div
          className={`relative overflow-hidden rounded-2xl p-8 bg-black-900 text-white shadow-subtle transition-transform duration-400 ${
            isActive ? "ring-4 ring-gold-500/25" : "hover:scale-105 hover:shadow-medium"
          } focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-500/25`}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)' }} />

          <div className="relative z-10 flex items-center gap-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 text-black-900 shadow-lg">
              <Icon name={category.icon} />
            </div>

            <div>
              <h3 className="text-2xl font-heading tracking-tight">{category.name}</h3>
              <p className="text-sm text-silver-300 mt-1 uppercase tracking-wide">Professionnel</p>
            </div>
          </div>

          <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 20px 50px rgba(212,175,55,0.12)' }} />
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard

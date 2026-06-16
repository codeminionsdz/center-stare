"use client"

import React from "react"
import { PREMIUM_CATEGORIES } from "@/lib/premium-categories"
import CategoryCard from "@/components/home/category-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CategoriesShowcase() {
  return (
    <section className="py-20 md:py-28 bg-black-900 text-white relative overflow-hidden">
      <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-gold-500/6 rounded-full blur-3xl" />
      <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-gold-500/6 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <span className="inline-block text-sm font-semibold text-gold-500 tracking-widest uppercase">NOS CATÉGORIES</span>
          <h2 id="premium-cats" className="text-4xl md:text-5xl font-heading font-bold mt-3 mb-3 tracking-tight">
            NOS CATÉGORIES
          </h2>
          <p className="text-lg text-silver-300">Découvrez notre sélection professionnelle pour la coiffure et les accessoires.</p>
        </div>

        {/* Desktop grid: responsive, shows all categories in a single row on large screens */}
        <div className="hidden lg:grid grid-cols-6 gap-6 items-stretch">
          {PREMIUM_CATEGORIES.map((cat, idx) => (
            <div key={cat.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 80}ms` }}>
              <CategoryCard category={cat} index={idx} />
            </div>
          ))}
        </div>

        {/* Mobile carousel: touch optimized with snap behavior */}
        <div className="lg:hidden -mx-4 px-4">
          <div className="flex gap-5 overflow-x-auto touch-pan-x snap-x snap-mandatory py-4 scrollbar-hide">
            {PREMIUM_CATEGORIES.map((cat, idx) => (
              <div key={cat.id} className="snap-start" style={{ minWidth: '78%' }}>
                <CategoryCard category={cat} index={idx} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" className="btn-primary rounded-lg px-8 shadow-lg hover:shadow-xl">
            <Link href="/categories">Voir Tous Les Produits</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CategoriesShowcase

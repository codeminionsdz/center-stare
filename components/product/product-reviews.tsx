"use client"

import React from "react"
import { Star } from "lucide-react"
import type { Product } from "@/lib/types"

export function ProductReviews({ product }: { product: Product }) {
  // Placeholder: reviews are loaded from backend in a full implementation
  return (
    <section className="pt-6 border-t border-border" aria-labelledby="reviews-heading">
      <h3 id="reviews-heading" className="font-semibold mb-3">Reviews</h3>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={i < 4 ? "h-4 w-4 text-gold-500" : "h-4 w-4 text-border"} />
          ))}
        </div>
        <div className="text-sm text-muted-foreground">4.0 · <span className="text-muted-foreground">(No public reviews yet)</span></div>
      </div>

      <div className="text-sm text-muted-foreground">Be the first to leave a review for this product.</div>
    </section>
  )
}

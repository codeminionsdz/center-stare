"use client"

import React from "react"
import type { Product } from "@/lib/types"
import { ProductCard } from "./product-card"

export function UpsellSection({ relatedProducts = [] }: { relatedProducts?: Product[] }) {
  if (!relatedProducts || relatedProducts.length === 0) return null

  return (
    <section aria-label="You may also like" className="mt-6">
      <h4 className="text-lg font-semibold mb-4">You may also like</h4>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {relatedProducts.map((p) => (
          <div key={p.id} className="min-w-[180px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}

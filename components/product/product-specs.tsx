"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

export function ProductSpecifications({ product }: { product: Product }) {
  return (
    <section className="pt-6 border-t border-border">
      <h3 className="font-semibold mb-3">Specifications</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <div className="text-sm text-muted-foreground">Brand</div>
          <div className="font-medium">{product.brandName}</div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">SKU</div>
          <div className="font-medium">{product.sku}</div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">Availability</div>
          <div className="font-medium">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</div>
        </div>

        <div>
          <div className="text-sm text-muted-foreground">Tags</div>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.tags && product.tags.length > 0 ? (
              product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))
            ) : (
              <div className="text-muted-foreground">No specifications available.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

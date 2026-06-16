"use client"

import React from "react"
import { formatPrice } from "@/lib/format"
import type { Product } from "@/lib/types"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <div className="text-lg text-primary">{formatPrice(product.price)}</div>
      <p className="text-muted-foreground">{product.shortDescription}</p>
    </div>
  )
}

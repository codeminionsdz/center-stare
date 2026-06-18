"use client"

import React, { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { ScissorsIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/format"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
    router.push("/checkout")
  }

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/80 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[1/1] overflow-hidden bg-gradient-to-br from-stone-50 to-silver-100">
        {/* Background gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:to-gold-500/10 transition-all duration-500 z-10 pointer-events-none" />
        
        {/* Skeleton shown until image finishes loading */}
        <div className={imgLoaded ? "hidden" : "absolute inset-0 z-15 bg-gradient-to-br from-silver-100/80 to-silver-200/80 animate-pulse"} />

        <Image
          src={product.images[0] || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          fill
          loading="lazy"
          onLoadingComplete={() => setImgLoaded(true)}
          className={
            `object-cover transition-transform duration-700 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`
          }
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={false}
        />

        {/* Premium Badges */}
        <div className="absolute top-4 left-4 mt-auto flex flex-col gap-2 z-20">
          {hasDiscount && (
            <Badge className="bg-gradient-to-r from-gold-500 to-gold-600 text-black-800 font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
              <ScissorsIcon className="h-3 w-3 mr-1 text-black-800" />
              -{discountPercentage}%
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="secondary" className="rounded-full bg-black-800 px-3 py-1 text-white">
              Sold Out
            </Badge>
          )}
          {product.featured && (
            <Badge className="rounded-full bg-black-900 px-3 py-1 font-semibold text-gold-500 shadow-lg">
              ✦ Featured
            </Badge>
          )}
        </div>

        {/* Wishlist button - Premium */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-20 rounded-full bg-white/95 text-black-800 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-white"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <Heart className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </Link>

      {/* Content Section */}
      <div className="flex h-full flex-col p-5 md:p-6">
        {/* Brand - Premium Style */}
        <Link
          href={`/brands/${product.brandId}`}
          className="text-xs font-bold text-gold-600 hover:text-gold-700 transition-colors tracking-widest uppercase"
          onClick={(e) => e.stopPropagation()}
        >
          {product.brandName}
        </Link>

        {/* Product Name - Elegant */}
        <h3 className="mt-3 min-h-[3.2rem] font-heading text-xl font-bold leading-tight text-black-800 line-clamp-2">
          <Link href={`/products/${product.slug}`} className="hover:text-gold-600 transition-colors duration-300">
            {product.name}
          </Link>
        </h3>

        {/* Rating - Luxury Style */}
        <div className="flex items-center gap-1.5 mt-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5 transition-all duration-300",
                  i < 4
                    ? "fill-gold-500 text-gold-500"
                    : "fill-border text-border"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-medium">(24)</span>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Price - Premium Display */}
        <div className="mb-4 mt-5 rounded-2xl bg-gradient-to-r from-stone-50 to-white p-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-black-800 tracking-tight">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through font-medium">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col gap-2">
          <Button
            className={cn(
              "w-full rounded-xl py-3 font-semibold text-sm tracking-wide transition-all duration-300",
              product.stock === 0
                ? "bg-silver-200 text-muted-foreground cursor-not-allowed"
                : "bg-black-800 text-white hover:bg-black-700 hover:shadow-lg hover:shadow-gold-500/20"
            )}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
          
          {product.stock > 0 && (
            <Button
              className="w-full rounded-xl py-3 font-semibold text-sm tracking-wide transition-all duration-300 bg-gold-600 hover:bg-gold-700 text-black hover:shadow-lg hover:shadow-gold-500/30"
              onClick={handleBuyNow}
            >
              <ScissorsIcon className="h-4 w-4 mr-2 text-black-800" />
              Buy Now
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

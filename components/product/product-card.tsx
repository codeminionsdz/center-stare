"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, ShoppingCart, Star, Zap } from "lucide-react"
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
        "group relative bg-white rounded-xl overflow-hidden transition-all duration-500 border border-border hover:border-gold-500/30 hover:shadow-2xl",
        className,
      )}
    >
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-silver-50">
        {/* Background gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:to-gold-500/10 transition-all duration-500 z-10 pointer-events-none" />
        
        <Image
          src={product.images[0] || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={false}
        />

        {/* Premium Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {hasDiscount && (
            <Badge className="bg-gradient-to-r from-gold-500 to-gold-600 text-black-800 font-bold px-3 py-1 rounded-full shadow-lg">
              <Zap className="h-3 w-3 mr-1" />
              -{discountPercentage}%
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="secondary" className="bg-black-800 text-white px-3 py-1 rounded-full">
              Sold Out
            </Badge>
          )}
          {product.featured && (
            <Badge className="bg-gradient-to-r from-black-800 to-black-900 text-gold-500 px-3 py-1 rounded-full font-semibold">
              ✦ Featured
            </Badge>
          )}
        </div>

        {/* Wishlist button - Premium */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 hover:bg-white text-black-800 rounded-full shadow-lg z-20"
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
      <div className="p-5 md:p-6 flex flex-col h-full">
        {/* Brand - Premium Style */}
        <Link
          href={`/brands/${product.brandId}`}
          className="text-xs font-bold text-gold-600 hover:text-gold-700 transition-colors tracking-widest uppercase"
          onClick={(e) => e.stopPropagation()}
        >
          {product.brandName}
        </Link>

        {/* Product Name - Elegant */}
        <h3 className="mt-3 font-bold text-black-800 line-clamp-2 min-h-[2.8rem] leading-snug">
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
        <div className="mt-4 mb-4">
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
        <div className="flex flex-col gap-2">
          <Button
            className={cn(
              "w-full py-3 rounded-lg font-semibold transition-all duration-300 text-sm tracking-wide",
              product.stock === 0
                ? "bg-silver-200 text-muted-foreground cursor-not-allowed"
                : "bg-black-800 hover:bg-black-700 text-white hover:shadow-lg hover:shadow-gold-500/20"
            )}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.stock === 0 ? "Out of Stock" : "Add to Collection"}
          </Button>
          
          {product.stock > 0 && (
            <Button
              className="w-full py-3 rounded-lg font-semibold transition-all duration-300 text-sm tracking-wide bg-gold-600 hover:bg-gold-700 text-black hover:shadow-lg hover:shadow-gold-500/30"
              onClick={handleBuyNow}
            >
              <Zap className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

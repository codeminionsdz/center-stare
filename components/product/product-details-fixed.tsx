"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Minus,
  Plus,
  Share2,
  Facebook,
  MessageCircle,
  Mail,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductSpecifications } from "@/components/product/product-specs"
import { ProductReviews } from "@/components/product/product-reviews"
import { UpsellSection } from "@/components/product/product-upsell"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import { formatPrice, calculateDiscount } from "@/lib/format"
import type { Product } from "@/lib/types"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const router = useRouter()
  const { addItem, toggleCart } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercentage = hasDiscount ? calculateDiscount(product.originalPrice!, product.price) : 0
  const isInStock = product.stock > 0
  const isLowStock = product.stock > 0 && product.stock <= 5

  const productUrl = typeof window !== "undefined" ? `${window.location.origin}/products/${product.slug}` : ""

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast({
      title: "Added to cart",
      description: `${product.name} x${quantity} has been added to your cart.`,
    })
    toggleCart()
  }

  const handleBuyNow = () => {
    addItem(product, quantity)
    toast({
      title: "Added to cart",
      description: `${product.name} x${quantity} has been added to your cart.`,
    })
    router.push("/checkout")
  }

  const handleWishlist = async () => {
    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id)
        toast({
          title: "Removed from Wishlist",
          description: `${product.name} has been removed from your wishlist.`,
        })
      } else {
        await addToWishlist(product)
        toast({
          title: "Added to Wishlist",
          description: `${product.name} has been added to your wishlist.`,
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Please log in to save to wishlist.",
        variant: "destructive",
      })
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl)
    toast({
      title: "Link copied",
      description: "Product link has been copied to clipboard.",
    })
    setShowShareMenu(false)
  }

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`
    window.open(url, "_blank", "width=600,height=400")
    setShowShareMenu(false)
  }

  const handleShareWhatsApp = () => {
    const text = `Check out this product: ${product.name} - ${formatPrice(product.price)}\n${productUrl}`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
    setShowShareMenu(false)
  }

  const handleShareEmail = () => {
    const subject = `Check out: ${product.name}`
    const body = `I found this product that I thought you might like:\n\n${product.name}\nPrice: ${formatPrice(product.price)}\n\n${productUrl}`
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = url
    setShowShareMenu(false)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
      {showShareMenu && <div className="fixed inset-0 z-0" onClick={() => setShowShareMenu(false)} />}

      {/* Gallery */}
      <div className="space-y-4 lg:col-span-1">
        <div className="relative rounded-lg overflow-hidden bg-white border border-border">
          <div className="relative w-full pb-[100%] lg:pb-[110%]">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg?height=600&width=600&query=product image"}
              alt={product.name}
              fill
              className="object-contain p-4"
              priority
            />
            {hasDiscount && (
              <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">-{discountPercentage}%</Badge>
            )}
          </div>
        </div>

        {product.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                aria-label={`View image ${index + 1}`}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-border hover:border-muted-foreground"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg?height=80&width=80&query=product thumbnail"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info & Details */}
      <div className="space-y-6 lg:col-span-1">
        <div className="text-sm text-muted-foreground">{product.brandName}</div>

        <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

        <div className="text-sm text-muted-foreground">SKU: {product.sku}</div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
          {hasDiscount && <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice!)}</span>}
        </div>

        <div className="flex items-center gap-2">
          {isInStock ? (
            <>
              <Check className="h-5 w-5 text-green-600" />
              <span className={`font-medium ${isLowStock ? "text-orange-600" : "text-green-600"}`}>
                {isLowStock ? `Only ${product.stock} left in stock` : "In Stock"}
              </span>
            </>
          ) : (
            <span className="text-destructive font-medium">Out of Stock</span>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed">{product.shortDescription}</p>

        {/* Compact mobile CTAs */}
        <div className="lg:hidden space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center overflow-hidden rounded-full border border-border bg-background">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="grid h-10 w-10 place-items-center transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isInStock}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-12 px-3 text-center text-base font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="grid h-10 w-10 place-items-center transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isInStock || quantity >= product.stock}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!isInStock}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleWishlist} title="Add to Wishlist">
              <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
              <span className="ml-2">Wishlist</span>
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setShowShareMenu(!showShareMenu)}>
              <Share2 className="h-5 w-5" />
              <span className="ml-2">Share</span>
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="font-semibold mb-3">Description</h3>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</p>
        </div>

        <ProductSpecifications product={product} />
        <ProductReviews product={product} />
      </div>

      {/* Sticky Add-to-Cart Panel */}
      <aside className="lg:col-span-1">
        <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-subtle">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Price</div>
              <div className="text-2xl font-bold">{formatPrice(product.price)}</div>
              {hasDiscount && <div className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice!)}</div>}
            </div>
            <div className="w-20 h-20 relative rounded-md overflow-hidden bg-secondary/10">
              <Image src={product.images[0] || "/placeholder.svg?height=80&width=80"} alt={product.name} fill className="object-contain p-2" />
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">Quantity</div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="grid h-12 w-12 place-items-center rounded-full border border-border hover:bg-muted"
                disabled={!isInStock}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="min-w-[56px] text-center font-semibold text-lg">{quantity}</div>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="grid h-12 w-12 place-items-center rounded-full border border-border hover:bg-muted"
                disabled={!isInStock || quantity >= product.stock}
                aria-label="Increase quantity"
              >
            return (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="text-lg text-primary">{formatPrice(product.price)}</div>
                <p className="text-muted-foreground">{product.shortDescription}</p>
              </div>
            )
              className="object-contain p-4"
              priority
            />
            {hasDiscount && (
              <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">-{discountPercentage}%</Badge>
            )}
          </div>
        </div>

        {product.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                aria-label={`View image ${index + 1}`}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-border hover:border-muted-foreground"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg?height=80&width=80&query=product thumbnail"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info & Details */}
      <div className="space-y-6 lg:col-span-1">
        <div className="text-sm text-muted-foreground">{product.brandName}</div>

        <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

        <div className="text-sm text-muted-foreground">SKU: {product.sku}</div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
          {hasDiscount && <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice!)}</span>}
        </div>

        <div className="flex items-center gap-2">
          {isInStock ? (
            <>
              <Check className="h-5 w-5 text-green-600" />
              <span className={`font-medium ${isLowStock ? "text-orange-600" : "text-green-600"}`}>
                {isLowStock ? `Only ${product.stock} left in stock` : "In Stock"}
              </span>
            </>
          ) : (
            <span className="text-destructive font-medium">Out of Stock</span>
          )}
        </div>

        <p className="text-muted-foreground leading-relaxed">{product.shortDescription}</p>

        {/* Compact mobile CTAs */}
        <div className="lg:hidden space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center overflow-hidden rounded-full border border-border bg-background">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="grid h-10 w-10 place-items-center transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isInStock}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-12 px-3 text-center text-base font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="grid h-10 w-10 place-items-center transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!isInStock || quantity >= product.stock}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!isInStock}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleWishlist} title="Add to Wishlist">
              <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
              <span className="ml-2">Wishlist</span>
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setShowShareMenu(!showShareMenu)}>
              <Share2 className="h-5 w-5" />
              <span className="ml-2">Share</span>
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="font-semibold mb-3">Description</h3>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</p>
        </div>

        <ProductSpecifications product={product} />
        <ProductReviews product={product} />
      </div>

      {/* Sticky Add-to-Cart Panel */}
      <aside className="lg:col-span-1">
        <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-subtle">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Price</div>
              <div className="text-2xl font-bold">{formatPrice(product.price)}</div>
              {hasDiscount && <div className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice!)}</div>}
            </div>
            <div className="w-20 h-20 relative rounded-md overflow-hidden bg-secondary/10">
              <Image src={product.images[0] || "/placeholder.svg?height=80&width=80"} alt={product.name} fill className="object-contain p-2" />
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">Quantity</div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="grid h-12 w-12 place-items-center rounded-full border border-border hover:bg-muted"
                disabled={!isInStock}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>

... (file truncated for brevity) ...
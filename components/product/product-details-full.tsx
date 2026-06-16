"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShoppingCart, Heart, Plus, Minus, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/format"
import { ProductSpecifications } from "@/components/product/product-specs"
import type { Product } from "@/lib/types"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<string>("description")
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)
  const { addItem, toggleCart } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const isInStock = (product.stock ?? 0) > 0
  const total = (product.price ?? 0) * quantity

  useEffect(() => {
    // reset selected image when product changes
    setSelectedImage(0)
  }, [product?.id])

  useEffect(() => {
    // Debug: log images array to help diagnose empty image issue
    try {
      // eslint-disable-next-line no-console
      console.log("Product images:", product.images)
    } catch (e) {
      // ignore
    }
  }, [product.images])

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation?.()
    if (!product.images || product.images.length === 0) return
    setSelectedImage((s) => (s - 1 + product.images.length) % product.images.length)
  }

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation?.()
    if (!product.images || product.images.length === 0) return
    setSelectedImage((s) => (s + 1) % product.images.length)
  }

  

  const onAddToCart = () => {
    addItem(product, quantity)
    toast({ title: "تمت الإضافة", description: `${product.name} ×${quantity} أضيف إلى السلة.` })
    toggleCart()
  }

  const onBuyNow = () => {
    addItem(product, quantity)
    toast({ title: "تمت الإضافة", description: `${product.name} ×${quantity} أضيف إلى السلة.` })
    router.push("/checkout")
  }

  const toggleWishlist = async () => {
    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id)
        toast({ title: "أُزيل من المفضلة" })
      } else {
        await addToWishlist(product)
        toast({ title: "أُضيف إلى المفضلة" })
      }
    } catch (e) {
      toast({ title: "خطأ", description: "سجل دخولك لحفظ المنتج في المفضلة." })
    }
  }

  const onShare = async () => {
    try {
      const url = window.location.href
      // Use native share where available, otherwise copy to clipboard
      if ((navigator as any).share) {
        await (navigator as any).share({ title: product.name, url })
      } else {
        await navigator.clipboard.writeText(url)
        toast({ title: "تم نسخ الرابط", description: "رابط المنتج نُسخ للحافظة." })
      }
    } catch (e) {
      toast({ title: "خطأ", description: "تعذّر مشاركة الرابط." })
    }
  }

  // Structured data (JSON-LD) for SEO
  const ldJson = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images ?? [],
    description: product.shortDescription || product.description || "",
    sku: product.sku || "",
    brand: { "@type": "Brand", name: product.brandName || "" },
    offers: {
      "@type": "Offer",
      priceCurrency: "DZD",
      price: (product.price ?? 0).toString(),
      availability: isInStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-36">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />

      <div className="lg:grid lg:grid-cols-3 lg:gap-10 items-start">
        {/* Gallery / Hero */}
        <div className="lg:col-span-2">
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg">
            <div className="absolute inset-0 -z-10 flex items-end justify-center">
              <div className="w-3/4 h-56 bg-gradient-to-r from-gold-300 to-primary rounded-full filter blur-3xl opacity-20 transform scale-110"></div>
            </div>

            <div className="relative w-full aspect-[4/3] bg-white cursor-zoom-in" onClick={() => setLightboxOpen(true)}>
              <Image
                src={product.images?.[selectedImage] ?? "/placeholder.svg?height=800&width=800"}
                alt={product.name}
                fill
                className="object-contain p-6"
                priority
              />

              {/* Prev / Next (mobile) */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    aria-label="السابق"
                    onClick={(e) => prevImage(e)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-md lg:hidden"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    aria-label="التالي"
                    onClick={(e) => nextImage(e)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 shadow-md lg:hidden"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Dots */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2 lg:hidden">
                    {product.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(idx) }}
                        aria-label={`انتقل إلى الصورة ${idx + 1}`}
                        className={`w-2 h-2 rounded-full ${selectedImage === idx ? "bg-primary" : "bg-gray-300"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className="w-20 h-20 rounded-lg overflow-hidden border border-border shrink-0">
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-contain p-1" />
                </button>
              ))}
            </div>
          )}

          {/* Mobile condensed title + CTA (always visible on small screens) */}
          <div className="lg:hidden mt-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-foreground leading-tight">{product.name}</h1>
                <div className="text-sm text-muted-foreground mt-1">{product.brandName ?? ""}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{formatPrice(product.price)}</div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</div>
                )}
              </div>
            </div>

            {/* rating and trust badges removed per request */}

            {/* Mobile CTA block */}
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">SKU: {product.sku ?? ""}</div>
                  <div className="text-2xl font-bold">{formatPrice(product.price)}</div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</div>
                  )}
                  <div className="text-sm text-green-600 mt-1">{isInStock ? "In Stock" : "Out of stock"}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button aria-label="Decrease" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-9 w-9 grid place-items-center rounded-full border">
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="w-12 text-center font-medium">{quantity}</div>
                  <button aria-label="Increase" onClick={() => setQuantity(Math.min(product.stock ?? 999, quantity + 1))} className="h-9 w-9 grid place-items-center rounded-full border">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3 grid gap-3">
                <button onClick={onBuyNow} disabled={!isInStock} className="w-full bg-gold-500 text-black py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4" /> اشتري الآن
                </button>
                <button onClick={onBuyNow} disabled={!isInStock} className="w-full bg-primary text-white py-3 rounded-lg font-semibold">
                  اشتري الآن
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <button onClick={toggleWishlist} className="py-2 border rounded-lg flex items-center justify-center gap-2">
                  <Heart className="h-4 w-4" /> <span>المفضلة</span>
                </button>
                <button onClick={onShare} className="py-2 border rounded-lg flex items-center justify-center gap-2">
                  <Share2 className="h-4 w-4" /> <span>مشاركة</span>
                </button>
              </div>

              {/* trust badges removed */}
            </div>
          </div>

          {/* Tabs for content */}
          <div className="mt-6">
            <div className="flex gap-3 border-b border-border pb-3">
              <button onClick={() => setActiveTab("description")} className={`py-2 ${activeTab === "description" ? "border-b-2 border-primary font-semibold" : "text-muted-foreground"}`}>الوصف</button>
              <button onClick={() => setActiveTab("specs")} className={`py-2 ${activeTab === "specs" ? "border-b-2 border-primary font-semibold" : "text-muted-foreground"}`}>المواصفات</button>
              <button onClick={() => setActiveTab("shipping")} className={`py-2 ${activeTab === "shipping" ? "border-b-2 border-primary font-semibold" : "text-muted-foreground"}`}>الشحن والإرجاع</button>
            </div>

            <div className="mt-4">
              {activeTab === "description" && <div className="text-sm text-muted-foreground whitespace-pre-line">{product.description}</div>}
              {activeTab === "specs" && <ProductSpecifications product={product} />}
              {activeTab === "shipping" && (
                <div className="text-sm text-muted-foreground">
                  <p>الشحن: شحن سريع متوفر داخل الجزائر. التوصيل خلال 2-5 أيام عمل.</p>
                  <p className="mt-2">الإرجاع: يمكنك إرجاع المنتج خلال 14 يومًا بشروط الإرجاع.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky panel / actions */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">السعر</div>
                <div className="text-2xl font-bold">{formatPrice(product.price)}</div>
              </div>
              <button onClick={toggleWishlist} className="inline-flex items-center justify-center p-2 rounded-md border border-border">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button aria-label="Decrease" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 grid place-items-center rounded-full border">
                <Minus className="h-4 w-4" />
              </button>
              <div className="text-lg font-medium">{quantity}</div>
              <button aria-label="Increase" onClick={() => setQuantity(Math.min(product.stock ?? 999, quantity + 1))} className="h-10 w-10 grid place-items-center rounded-full border">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              <button onClick={onBuyNow} disabled={!isInStock} className="w-full bg-gold-500 text-black py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                <ShoppingCart className="h-4 w-4" /> اشتري الآن
              </button>
              <button onClick={onBuyNow} disabled={!isInStock} className="w-full bg-primary text-white py-3 rounded-lg font-semibold">
                اشتري الآن
              </button>
            </div>

            {/* trust badges removed from sticky panel */}
          </div>
        </aside>
      </div>

      {/* Mobile fixed action bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white border-t border-border rounded-t-xl shadow-lg py-3 px-3 flex items-center justify-between gap-3">
            <div>
              <div className="text-sm text-muted-foreground">السعر</div>
              <div className="text-lg font-bold">{formatPrice(product.price)}</div>
            </div>

            <div className="flex items-center gap-2">
              <button aria-label="Decrease" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-9 w-9 grid place-items-center rounded-full border bg-white">
                <Minus className="h-4 w-4" />
              </button>
              <div className="w-10 text-center font-medium">{quantity}</div>
              <button aria-label="Increase" onClick={() => setQuantity(Math.min(product.stock ?? 999, quantity + 1))} className="h-9 w-9 grid place-items-center rounded-full border bg-white">
                <Plus className="h-4 w-4" />
              </button>
              <button onClick={onBuyNow} disabled={!isInStock} className="ml-2 bg-gold-500 text-black py-2 px-4 rounded-lg font-semibold">
                اشتري الآن
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <div className="relative w-full max-w-3xl h-[70vh]">
            <Image src={product.images?.[selectedImage] ?? "/placeholder.svg?height=1200&width=1200"} alt={product.name} fill className="object-contain" />
          </div>
        </div>
      )}
    </div>
  )
}

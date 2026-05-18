"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Shield, Clock, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { MainCategoryCard } from "@/components/category/main-category-card"
import { BrandCard } from "@/components/brand/brand-card"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { HeroCarousel } from "@/components/layout/hero-carousel"
import { useTranslation } from "@/hooks/use-translation"
import type { Category, Product, Brand } from "@/lib/types"

interface HomeContentProps {
  categories: Category[]
  brands: Brand[]
  featuredProducts: Product[]
}

export function HomeContent({ categories, brands, featuredProducts }: HomeContentProps) {
  const { t } = useTranslation()

  return (
    <>
      <CartDrawer />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Luxury Trust Section */}
      <section className="py-12 md:py-24 border-b border-border/20 bg-gradient-to-b from-silver-50 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {/* Authentic Timepieces */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur" />
              <div className="relative p-5 sm:p-6 md:p-8 rounded-xl border border-border/30 hover:border-gold-500/50 transition-all duration-500 bg-background/50 backdrop-blur-sm">
                <div className="mb-3 sm:mb-4 md:mb-5">
                  <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-500">
                    <Crown className="h-5 sm:h-5.5 md:h-6 w-5 sm:w-5.5 md:w-6" />
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-black-800 mb-1 sm:mb-2 tracking-tight">
                  {t("home.authentic_products") || "Authentic Timepieces"}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                  {t("home.authentic_guarantee") || "Verified luxury watches from authorized dealers"}
                </p>
              </div>
            </div>

            {/* World-Class Delivery */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur" />
              <div className="relative p-5 sm:p-6 md:p-8 rounded-xl border border-border/30 hover:border-gold-500/50 transition-all duration-500 bg-background/50 backdrop-blur-sm">
                <div className="mb-3 sm:mb-4 md:mb-5">
                  <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-500">
                    <Zap className="h-5 sm:h-5.5 md:h-6 w-5 sm:w-5.5 md:w-6" />
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-black-800 mb-1 sm:mb-2 tracking-tight">
                  {t("home.fast_delivery") || "World-Class Delivery"}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                  {t("home.delivery_time") || "Secure and swift shipping worldwide"}
                </p>
              </div>
            </div>

            {/* Expert Concierge */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur" />
              <div className="relative p-5 sm:p-6 md:p-8 rounded-xl border border-border/30 hover:border-gold-500/50 transition-all duration-500 bg-background/50 backdrop-blur-sm">
                <div className="mb-3 sm:mb-4 md:mb-5">
                  <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-500">
                    <Shield className="h-5 sm:h-5.5 md:h-6 w-5 sm:w-5.5 md:w-6" />
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-black-800 mb-1 sm:mb-2 tracking-tight">
                  {t("home.expert_support") || "Expert Concierge"}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                  {t("home.support_hours") || "Dedicated support for watch enthusiasts"}
                </p>
              </div>
            </div>

            {/* Luxury Guarantee */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur" />
              <div className="relative p-5 sm:p-6 md:p-8 rounded-xl border border-border/30 hover:border-gold-500/50 transition-all duration-500 bg-background/50 backdrop-blur-sm">
                <div className="mb-3 sm:mb-4 md:mb-5">
                  <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-500">
                    <Clock className="h-5 sm:h-5.5 md:h-6 w-5 sm:w-5.5 md:w-6" />
                  </div>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-black-800 mb-1 sm:mb-2 tracking-tight">
                  {t("home.best_prices") || "Best Prices"}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("home.guaranteed") || "Competitive pricing without compromise"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-12 md:mb-16 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-black-800 mb-4 tracking-tight">
              {t("home.categories") || "Explore Collections"}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("home.find_what_you_need") || "Discover curated collections of premium timepieces"}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.slice(0, 8).map((category, index) => (
              <div key={category.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <MainCategoryCard category={category} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-black-800 hover:bg-black-700 text-white rounded-lg px-8 transition-all duration-300">
              <Link href="/categories" className="inline-flex items-center gap-3">
                {t("home.view_all") || "View All Collections"}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Timepieces - Premium Showcase */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-silver-50/50 to-background">
        <div className="container mx-auto px-4">
          <div className="mb-12 md:mb-16 max-w-2xl">
            <span className="text-sm font-semibold text-gold-500 tracking-widest uppercase">Curated Selection</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black-800 mt-3 mb-4 tracking-tight">
              {t("home.featured_products") || "Featured Timepieces"}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("home.bestsellers_and_new") || "Hand-picked watches from the world's most prestigious brands"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.slice(0, 8).map((product, index) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 75}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-black-800 hover:bg-black-700 text-white rounded-lg px-8 transition-all duration-300">
              <Link href="/products" className="inline-flex items-center gap-3">
                {t("home.see_more") || "Explore All Watches"}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Prestigious Brands */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-12 md:mb-16 max-w-2xl">
            <span className="text-sm font-semibold text-gold-500 tracking-widest uppercase">Global Heritage</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black-800 mt-3 mb-4 tracking-tight">
              {t("home.popular_brands") || "Prestigious Brands"}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("home.trusted_brands") || "Authorized partner of the world's most luxurious watchmakers"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {brands.slice(0, 6).map((brand, index) => (
              <div key={brand.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <BrandCard brand={brand} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="border-black-800 text-black-800 hover:bg-silver-100 rounded-lg px-8 transition-all duration-300">
              <Link href="/brands" className="inline-flex items-center gap-3">
                {t("home.all_brands") || "View All Brands"}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Premium CTA - Newsletter */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-black-800 via-black-800 to-black-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6 inline-block">
              <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-500 text-sm font-semibold rounded-full tracking-wider">
                EXCLUSIVE ACCESS
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Join the Elite Circle
            </h2>
            
            <p className="text-lg text-silver-200 mb-8 leading-relaxed">
              Receive early access to limited editions, exclusive previews, and VIP collector insights
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gold-500 hover:bg-gold-600 text-black-800 font-semibold rounded-lg px-8 transition-all duration-300 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="/register" className="inline-flex items-center gap-2">
                  Join Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-gold-500/50 text-white hover:bg-gold-500/10 rounded-lg px-8 transition-all duration-300"
                asChild
              >
                <Link href="/contact">Learn More</Link>
              </Button>
            </div>

            <p className="text-sm text-silver-400 mt-8 tracking-wide">
              ✓ No spam • ✓ Cancel anytime • ✓ Limited to 50,000 members
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

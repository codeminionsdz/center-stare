"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"
import { useLanguage } from "@/lib/language-context"

function HeroCarouselContent() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const isRTL = language === "ar"
  
  const heroSlides: Array<{
    id: number
    badgeKey: string
    titleKey: string
    descriptionKey: string
    primaryBtnKey: string
    secondaryBtnKey: string
    primaryBtnHref: string
    secondaryBtnHref: string
    backgroundImage: string
    icon: any
    gradientOpacity: string
  }> = [
    {
      id: 1,
      badgeKey: "hero.satisfied",
      titleKey: "hero.timepieces",
      descriptionKey: "hero.timepieces_desc",
      primaryBtnKey: "hero.buy_now",
      secondaryBtnKey: "hero.explore_brands",
      primaryBtnHref: "/categories",
      secondaryBtnHref: "/brands",
      backgroundImage: "/images/banners/hero-1.webp",
      icon: Star,
      gradientOpacity: "rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.25)",
    },
    {
      id: 2,
      badgeKey: "hero.new",
      titleKey: "hero.collections",
      descriptionKey: "hero.collections_desc",
      primaryBtnKey: "hero.view_new",
      secondaryBtnKey: "hero.browse_all",
      primaryBtnHref: "/categories",
      secondaryBtnHref: "/products",
      backgroundImage: "/images/banners/hero-2.webp",
      icon: Sparkles,
      gradientOpacity: "rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.25)",
    },
    {
      id: 3,
      badgeKey: "hero.promo",
      titleKey: "hero.discount",
      descriptionKey: "hero.discount_desc",
      primaryBtnKey: "hero.see_promo",
      secondaryBtnKey: "hero.our_brands",
      primaryBtnHref: "/categories",
      secondaryBtnHref: "/brands",
      backgroundImage: "/images/banners/hero-3.webp",
      icon: Heart,
      gradientOpacity: "rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.25)",
    },
  ]
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      direction: isRTL ? "rtl" : "ltr",
    }, 
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Reinitialize carousel when language changes (for RTL support)
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit({
        direction: isRTL ? "rtl" : "ltr",
      })
    }
  }, [isRTL, emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect()

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  const scrollTo = (index: number) => emblaApi?.scrollTo(index)

  return (
    <div className="relative overflow-hidden">
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide, index) => {
            const Icon = slide.icon
            return (
              <div key={slide.id} className="flex-[0_0_100%] min-w-0 shrink-0">
                <section 
                  className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]"
                  style={{
                    backgroundImage: `url('${slide.backgroundImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#1a1a2e',
                  }}
                >
                  {/* Premium cinematic overlay gradient */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)`,
                    }}
                  />

                  <div className="container relative mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32 z-10 h-full flex items-center justify-center">
                  <div className="max-w-4xl mx-auto text-center w-full">
                    {/* Luxury animated badge */}
                    <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-gold-500/20 to-gold-600/20 backdrop-blur-md border border-gold-500/50 text-gold-300 text-xs sm:text-sm font-bold rounded-full mb-4 sm:mb-8 shadow-lg animate-fade-in-up hover:from-gold-500/30 hover:to-gold-600/30 transition-all duration-300 tracking-widest uppercase">
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-pulse" />
                      <span>{t(slide.badgeKey as any)}</span>
                    </div>

                    {/* Title with premium styling - responsive */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight mb-4 sm:mb-6 animate-fade-in-up !text-white drop-shadow-xl" style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                      {t(slide.titleKey as any).split("\n").map((line, i) => (
                        <span key={i} className="block tracking-tight">
                          {line}
                        </span>
                      ))}
                    </h1>

                    {/* Elegant description - responsive */}
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-10 animate-fade-in-up font-light tracking-wide drop-shadow-lg px-2 sm:px-0">
                      {t(slide.descriptionKey as any)}
                    </p>

                    {/* Premium action buttons - responsive */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 animate-fade-in-up animation-delay-600">
                      <Button 
                        size="lg" 
                        className="group shadow-2xl hover:shadow-3xl transition-all bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black-800 font-bold rounded-lg px-6 sm:px-8 text-sm sm:text-base w-full sm:w-auto" 
                        asChild
                      >
                        <Link href={slide.primaryBtnHref} className="inline-flex items-center justify-center gap-2">
                          {t(slide.primaryBtnKey as any)}
                          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="bg-white/10 backdrop-blur-md text-white border-2 border-white/40 hover:bg-white/20 hover:border-white/60 font-bold rounded-lg px-6 sm:px-8 text-sm sm:text-base shadow-xl transition-all duration-300 w-full sm:w-auto" 
                        asChild
                      >
                        <Link href={slide.secondaryBtnHref}>{t(slide.secondaryBtnKey as any)}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )
        })}
        </div>
      </div>

      {/* Luxury navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "rounded-full transition-all duration-500 shadow-lg backdrop-blur-sm",
              index === selectedIndex
                ? "w-10 h-3 bg-gradient-to-r from-gold-500 to-gold-600 shadow-gold-500/50"
                : "w-3 h-3 bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export function HeroCarousel() {
  return <HeroCarouselContent />
}
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useCart } from "@/lib/cart-context"
import type { Category } from "@/lib/types"
import { getCategoryIcon } from "@/lib/category-icons"
import { useTranslation } from "@/hooks/use-translation"
import { LanguageSwitcher } from "@/components/layout/language-switcher"

interface HeaderProps {
  categories?: Category[]
}

interface Settings {
  free_shipping_threshold: number
  enable_free_shipping: boolean
}

export function Header({ categories: initialCategories }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [settings, setSettings] = useState<Settings | null>(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const { itemCount, toggleCart } = useCart()
  const { t } = useTranslation()
  
  const categories = initialCategories || []
  const hasCategories = categories.length > 0

  useEffect(() => {
    fetchSettings()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings")
      const data = await response.json()
      if (data.success) {
        setSettings(data.data)
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
    }
  }

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        hasScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-xl" 
          : "bg-background border-b border-border/30"
      }`}
    >
      {/* Premium Top Bar */}
      {settings?.enable_free_shipping && (
        <div className="bg-gradient-to-r from-black-800 to-black-900 text-silver-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between text-sm font-light tracking-wider">
              <p className="hidden md:block">
                ✨ {t("header.free_shipping")} {settings?.free_shipping_threshold} DZD
              </p>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <Link href="/account/orders" className="hover:text-gold-500 transition-colors duration-300">
                  {t("header.track")}
                </Link>
                <span className="text-border">|</span>
                <Link href="/contact" className="hover:text-gold-500 transition-colors duration-300">
                  {t("header.support")}
                </Link>
              </div>
              <p className="md:hidden text-xs">Premium Watches • Global Shipping</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-5 md:py-6">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-silver-100 to-silver-200 rounded-lg p-1 shadow-xl group-hover:shadow-2xl transition-all duration-500">
              <Image
                src="/images/image.png"
                alt="TimeDZ"
                width={56}
                height={56}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-black-800 tracking-wider">TIMEDZ</span>
              <span className="text-xs text-gold-500 tracking-[0.15em] font-light">LUXURY WATCHES</span>
            </div>
          </Link>

          {/* Desktop Search - Premium Style */}
          <div className="hidden lg:flex flex-1 max-w-lg">
            <form action="/search" method="get" className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-gold-500 transition-colors duration-300" />
              <Input
                type="search"
                name="q"
                placeholder="Search collections..."
                className="w-full pl-12 pr-5 py-3 h-12 bg-silver-100 border border-border rounded-lg focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:border-transparent transition-all duration-300"
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Mobile Search Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden hover:bg-silver-100 rounded-lg transition-all duration-300"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5 text-black-800" />
              <span className="sr-only">{t("action.search")}</span>
            </Button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Account Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-silver-100 rounded-lg transition-all duration-300 hidden sm:flex"
                >
                  <User className="h-5 w-5 text-black-800" />
                  <span className="sr-only">{t("header.account")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl border-border/50 shadow-2xl">
                <DropdownMenuItem asChild>
                  <Link href="/login" className="px-4 py-3 text-black-800 hover:bg-silver-100 cursor-pointer transition-colors">
                    {t("header.login")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register" className="px-4 py-3 text-black-800 hover:bg-silver-100 cursor-pointer transition-colors">
                    {t("header.register")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="px-4 py-3 text-black-800 hover:bg-silver-100 cursor-pointer transition-colors">
                    {t("header.my_account")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders" className="px-4 py-3 text-black-800 hover:bg-silver-100 cursor-pointer transition-colors">
                    {t("header.my_orders")}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart Button - Premium */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-silver-100 rounded-lg transition-all duration-300"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5 text-black-800" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-gold-500 text-black-800 font-bold shadow-lg">
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">
                {t("header.cart")} ({itemCount})
              </span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden hover:bg-silver-100 rounded-lg transition-all duration-300"
                >
                  <Menu className="h-5 w-5 text-black-800" />
                  <span className="sr-only">{t("header.menu")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto bg-background border-l border-border/30">
                <SheetTitle className="text-2xl font-bold text-black-800 tracking-wide">Menu</SheetTitle>
                <nav className="flex flex-col gap-1 mt-8">
                  <Link
                    href="/categories"
                    className="text-lg font-semibold text-black-800 hover:text-gold-500 py-3 px-4 rounded-lg hover:bg-silver-100 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    All Collections
                  </Link>

                  {categories.map((category) => (
                    <div key={category.id} className="border-b border-border/20 pb-2">
                      <button
                        className="flex items-center justify-between w-full py-3 px-4 text-left font-semibold text-black-800 hover:text-gold-500 hover:bg-silver-100 rounded-lg transition-all duration-300"
                        onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                      >
                        <Link
                          href={`/categories/${category.slug}`}
                          className="flex-1 text-black-800 hover:text-gold-500 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          {category.name}
                        </Link>
                        {category.children && category.children.length > 0 && (
                          <span className={`text-gold-500 transition-transform duration-300 ${expandedCategory === category.id ? "rotate-180" : ""}`}>
                            ▼
                          </span>
                        )}
                      </button>

                      {expandedCategory === category.id && category.children && (
                        <div className="pl-6 flex flex-col gap-1 mt-2 animate-fade-in">
                          {category.children.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/categories/${sub.slug}`}
                              className="text-muted-foreground hover:text-gold-500 py-2 px-4 text-sm rounded-lg hover:bg-silver-100 transition-all duration-300"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <Link
                    href="/brands"
                    className="text-lg font-semibold text-black-800 hover:text-gold-500 py-3 px-4 rounded-lg hover:bg-silver-100 transition-all duration-300 mt-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Brands
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden mt-4 animate-slide-in-from-top">
            <form action="/search" method="get" className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                name="q"
                placeholder="Search collections..."
                className="w-full pl-12 pr-5 py-3 h-11 bg-silver-100 border border-border rounded-lg"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>

      {/* Desktop Navigation Menu */}
      <nav className="hidden md:block border-t border-border/20 bg-gradient-to-r from-silver-50/50 to-transparent">
        <div className="container mx-auto px-4">
          <NavigationMenu className="max-w-none">
            <NavigationMenuList className="gap-1 py-0">
              {/* Collections */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-semibold text-black-800 hover:text-gold-500 text-base py-4 transition-all duration-300">
                  Collections
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[1000px] p-8 bg-background">
                    {!hasCategories ? (
                      <div className="flex items-center justify-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold-500 border-t-transparent"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-6">
                        {categories.map((category) => {
                          const Icon = getCategoryIcon(category.slug)
                          return (
                            <Link
                              key={category.id}
                              href={`/categories/${category.slug}`}
                              className="group relative overflow-hidden rounded-xl border border-border/30 bg-silver-50 p-6 transition-all duration-500 hover:shadow-2xl hover:border-gold-500/50 hover:bg-gradient-to-br hover:from-silver-50 hover:to-gold-400/5"
                            >
                              <div className="relative z-10">
                                <div className="p-3 rounded-lg bg-gold-500/10 text-gold-500 w-fit mb-3 group-hover:bg-gold-500 group-hover:text-black-800 transition-all duration-500">
                                  <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg text-black-800 group-hover:text-gold-500 transition-colors duration-300 mb-2">
                                  {category.name}
                                </h3>
                                {category.description && (
                                  <p className="text-sm text-muted-foreground group-hover:text-black-800/70 transition-colors duration-300 line-clamp-2">
                                    {category.description}
                                  </p>
                                )}
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:to-gold-500/10 transition-all duration-500" />
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/brands" className="group inline-flex h-12 items-center justify-center px-5 py-2 text-base font-semibold text-black-800 hover:text-gold-500 transition-colors duration-300">
                    Brands
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </header>
  )
}

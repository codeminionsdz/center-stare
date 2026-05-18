import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Category } from "@/lib/types"
import { getCategoryIcon } from "@/lib/category-icons"
import { cn } from "@/lib/utils"

interface MainCategoryCardProps {
  category: Category
  className?: string
}

export function MainCategoryCard({ category, className }: MainCategoryCardProps) {
  const Icon = getCategoryIcon(category.slug)

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        "group relative flex flex-col items-center justify-center p-8 overflow-hidden rounded-xl bg-gradient-to-br from-white to-silver-50 border border-border/30 transition-all duration-500",
        "hover:shadow-2xl hover:border-gold-500/50 hover:-translate-y-2 hover:from-silver-50 hover:to-gold-400/5",
        "aspect-square",
        className,
      )}
    >
      {/* Gradient overlay background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:to-gold-500/10 transition-all duration-500 pointer-events-none" />

      {/* Icon container - Premium */}
      <div className="relative mb-6 p-5 rounded-full bg-gradient-to-br from-gold-500/10 to-gold-400/5 text-gold-600 transition-all duration-500 group-hover:scale-125 group-hover:bg-gradient-to-br group-hover:from-gold-500 group-hover:to-gold-600 group-hover:text-white group-hover:shadow-2xl group-hover:shadow-gold-500/30">
        <Icon className="h-8 w-8 md:h-10 md:w-10" strokeWidth={1.5} />
      </div>

      {/* Category info - Elegant typography */}
      <div className="relative text-center z-10">
        <h3 className="text-base md:text-lg font-bold text-black-800 group-hover:text-gold-600 transition-colors duration-300 tracking-tight">
          {category.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-2 font-medium tracking-wide">
          {category.children && category.children.length > 0
            ? `${category.children.length} Collections`
            : `${category.productCount || 0} Pieces`}
        </p>
        
        {/* Discovery arrow - Premium */}
        <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-600 mt-4 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 tracking-widest uppercase">
          <span>Explore</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Link>
  )
}

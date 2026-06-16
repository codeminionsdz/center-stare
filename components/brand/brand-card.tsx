import Image from "next/image"
import Link from "next/link"
import type { Brand } from "@/lib/types"
import { cn } from "@/lib/utils"

interface BrandCardProps {
  brand: Brand
  className?: string
}

export function BrandCard({ brand, className }: BrandCardProps) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className={cn(
        "group relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-silver-50 rounded-xl border border-border/30 transition-all duration-500 hover:shadow-2xl hover:border-gold-500/50 hover:-translate-y-2",
        className,
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:to-gold-500/10 transition-all duration-500 rounded-xl pointer-events-none" />
      
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
        <Image
          src={brand.logo || "/placeholder.svg?height=128&width=128&query=brand logo"}
          alt={brand.name}
          fill
          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
          sizes="128px"
        />
      </div>

      <h3 className="mt-5 font-bold text-center text-black-800 group-hover:text-gold-600 transition-colors duration-300 tracking-tight">
        {brand.name}
      </h3>
      
      <p className="text-sm text-muted-foreground font-medium mt-1">
        {brand.productCount} Products
      </p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
    </Link>
  )
}


import type React from "react"
import {
  ScissorsIcon,
  ClipperIcon,
  RazorIcon,
  BrushIcon,
  BottleIcon,
  CombIcon,
} from "@/lib/icons"

// Fallback icon: scissors (neutral barber tool)
const DefaultCategoryIcon: React.ComponentType<React.SVGProps<SVGSVGElement>> = ScissorsIcon

export const categoryIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  // New barber-focused slugs
  tondeuses: ClipperIcon,
  rasoirs: RazorIcon,
  ciseaux: ScissorsIcon,
  brosses: BrushIcon,
  produits: BottleIcon,
  peignes: CombIcon,

  // Graceful fallbacks for older slugs mapped to barber icons
  "mens-watches": ScissorsIcon,
  "womens-watches": ScissorsIcon,
  accessories: CombIcon,
  "limited-edition": ScissorsIcon,
  preowned: ScissorsIcon,
}

/**
 * Get icon for category - returns default icon if not found
 */
export function getCategoryIcon(slug: string): React.ComponentType<React.SVGProps<SVGSVGElement>> {
  return categoryIcons[slug] || DefaultCategoryIcon
}

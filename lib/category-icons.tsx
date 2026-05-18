import {
  Watch,
  Users,
  Sparkles,
  Gift,
  Clock,
  Crown,
  type LucideIcon,
} from "lucide-react"

// Fallback icon
const DefaultCategoryIcon: LucideIcon = Watch

export const categoryIcons: Record<string, LucideIcon> = {
  "mens-watches": Watch,
  "womens-watches": Users,
  "luxury-sports": Sparkles,
  accessories: Gift,
  "limited-edition": Clock,
  "preowned": Crown,
}

/**
 * Get icon for category - returns default icon if not found
 */
export function getCategoryIcon(slug: string): LucideIcon {
  return categoryIcons[slug] || DefaultCategoryIcon
}

export type PremiumCategory = {
  id: string
  name: string
  slug: string
  href: string
  icon?: string
}

export const PREMIUM_CATEGORIES: PremiumCategory[] = [
  { id: "tondeuses", name: "Tondeuses", slug: "tondeuses", href: "/categories/tondeuses", icon: "clipper" },
  { id: "rasoirs", name: "Rasoirs", slug: "rasoirs", href: "/categories/rasoirs", icon: "razor" },
  { id: "ciseaux", name: "Ciseaux", slug: "ciseaux", href: "/categories/ciseaux", icon: "scissors" },
  { id: "brosses", name: "Brosses", slug: "brosses", href: "/categories/brosses", icon: "brush" },
  { id: "produits", name: "Produits", slug: "produits", href: "/categories/produits", icon: "bottle" },
  { id: "peignes", name: "Peignes", slug: "peignes", href: "/categories/peignes", icon: "comb" },
]

export default PREMIUM_CATEGORIES

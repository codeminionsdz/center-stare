import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ClientLayout } from "@/components/layout/client-layout"
import { CartProvider } from "@/lib/cart-context"
import { WishlistProvider } from "@/lib/wishlist-context"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "CENTER STARE | Professional Hair & Barber Accessories",
  description:
    "CENTER STARE — Professional hairdressing and barber accessories. Curated tools, grooming products and pro-grade supplies for stylists and enthusiasts.",
  keywords: ["hair accessories", "barber supplies", "grooming products", "professional hair tools", "CENTER STARE"],
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning dir="ltr">
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <CartProvider>
          <WishlistProvider>
            <ClientLayout>{children}</ClientLayout>
          </WishlistProvider>
        </CartProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

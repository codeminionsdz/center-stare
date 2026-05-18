"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, Phone, MapPin, Zap, Shield, CreditCard, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"

function FooterContent() {
  const { t } = useTranslation()

  const footerLinks = {
    shop: [
      { name: t("footer.all_categories") || "Collections", href: "/categories" },
      { name: t("footer.skincare") || "Men's Watches", href: "/categories/skincare" },
      { name: t("footer.vitamins") || "Women's Watches", href: "/categories/vitamins-supplements" },
      { name: t("footer.hair_care") || "Accessories", href: "/categories/hair-care" },
      { name: "Pre-Owned", href: "/categories/baby-mom" },
      { name: t("footer.brands") || "All Brands", href: "/brands" },
    ],
    support: [
      { name: t("footer.contact_us") || "Contact Us", href: "/contact" },
      { name: "Warranty", href: "/warranty" },
      { name: "Returns", href: "/returns" },
      { name: "Shipping Info", href: "/shipping" },
    ],
  }

  const trustFeatures = [
    { icon: Shield, title: "Authentic Luxury", description: "Verified timepieces guaranteed" },
    { icon: Zap, title: "Premium Selection", description: "Hand-curated collections" },
    { icon: CreditCard, title: "Secure Payments", description: "Protected transactions" },
    { icon: Clock, title: "Expert Support", description: "24/7 concierge service" },
  ]

  return (
    <footer className="bg-black-800 text-white mt-auto">
      {/* Premium Trust Features */}
      <div className="border-b border-border/10">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {trustFeatures.map((feature, index) => (
              <div key={feature.title} className="group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-400/10 text-gold-400 group-hover:bg-gradient-to-br group-hover:from-gold-500 group-hover:to-gold-600 group-hover:text-black-800 transition-all duration-500">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 group-hover:text-gold-500 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-silver-300">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-14 h-14 bg-gradient-to-br from-silver-200 to-silver-300 rounded-lg p-1 shadow-xl group-hover:shadow-2xl group-hover:shadow-gold-500/20 transition-all duration-500">
                <Image
                  src="/images/image.png"
                  alt="TimeDZ"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-bold text-white tracking-wider">TIMEDZ</span>
                <span className="text-xs text-gold-400 tracking-widest font-bold">LUXURY TIMEPIECES</span>
              </div>
            </Link>

            <p className="text-silver-300 mb-8 max-w-sm leading-relaxed">
              Discover an exclusive collection of premium timepieces from the world's most prestigious watchmakers. Authentic. Certified. Guaranteed.
            </p>

            {/* Premium Newsletter */}
            <div className="mb-8">
              <h4 className="font-bold text-white mb-3 tracking-wide uppercase text-sm">
                Join The Elite Circle
              </h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-black-900 border-border/20 text-white placeholder:text-silver-500 rounded-lg"
                />
                <Button className="shrink-0 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black-800 font-bold rounded-lg px-6 transition-all duration-300">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-silver-400 mt-2">✓ Exclusive previews • ✓ VIP access • ✓ Limited editions</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/share/18qWG8JTva/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-black-900 hover:bg-gold-500 text-silver-300 hover:text-black-800 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/timedz.store?igsh=MW10Z2sxanBhMHZjdA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-black-900 hover:bg-gold-500 text-silver-300 hover:text-black-800 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/@timedz2?_r=1&_t=ZS-96RoqmeBgLY"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-black-900 hover:bg-gold-500 text-silver-300 hover:text-black-800 transition-all duration-300 hover:scale-110"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.53.02C13.201 0 13.988 0 14.868 0c.12 1.211.23 2.778.23 4.037v16.026c0 1.3-.115 2.622-.23 3.937-.88 0-1.667 0-2.338 0-.502-4.783-.502-9.26 0-14.043z"/><path d="M9.6 4.21c.7-.394 1.473-.599 2.268-.599V8.004A4.026 4.026 0 0 1 8 7.97c0-.88.22-1.706.6-2.76zm6.53 3.02A8.062 8.062 0 0 1 20.066 8v3.974a12.04 12.04 0 0 1-3.936-.784v9.237c0 2.21-.905 4.215-2.363 5.615-1.457-1.4-2.363-3.405-2.363-5.615V7.23c.766.34 1.61.524 2.496.524z"/></svg>
                <span className="sr-only">TikTok</span>
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-bold text-white mb-6 tracking-wider text-sm uppercase">Collections</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-silver-300 hover:text-gold-400 transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-6 tracking-wider text-sm uppercase">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-silver-300 hover:text-gold-400 transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-6 tracking-wider text-sm uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/N7o8sWZ7zf9bVn4E7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-silver-300 hover:text-gold-400 transition-colors duration-300 text-sm leading-relaxed font-medium"
                >
                  Algiers, Algeria
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold-400 shrink-0" />
                <a href="tel:+213770867403" className="text-silver-300 hover:text-gold-400 transition-colors duration-300 font-medium">
                  +213 770 867 403
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold-400 shrink-0" />
                <a href="mailto:info@timedz.com" className="text-silver-300 hover:text-gold-400 transition-colors duration-300 font-medium">
                  info@timedz.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Premium */}
      <div className="border-t border-border/10 bg-black-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-silver-400 font-medium">
              © {new Date().getFullYear()} TimeDZ. All rights reserved. Premium luxury watches curated for collectors.
            </p>
            <div className="flex gap-8 text-sm">
              <Link href="/privacy" className="text-silver-400 hover:text-gold-400 transition-colors duration-300 font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-silver-400 hover:text-gold-400 transition-colors duration-300 font-medium">
                Terms & Conditions
              </Link>
              <Link href="/faq" className="text-silver-400 hover:text-gold-400 transition-colors duration-300 font-medium">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function Footer() {
  return <FooterContent />
}

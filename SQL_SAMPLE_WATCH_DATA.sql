-- TIMEDZ Luxury Watch Store - Sample Data SQL
-- Use this in Supabase SQL Editor to populate categories and brands

-- =============================================
-- CATEGORIES - Watch Collections
-- =============================================

INSERT INTO public.categories (name, slug, description, parent_id, image) VALUES
('Men''s Watches', 'mens-watches', 'Premium timepieces for the modern gentleman', NULL, '/images/categories/mens-watches.webp'),
('Women''s Watches', 'womens-watches', 'Elegant luxury watches for sophisticated women', NULL, '/images/categories/womens-watches.webp'),
('Luxury Sports', 'luxury-sports', 'High-performance professional timepieces', NULL, '/images/categories/luxury-sports.webp'),
('Accessories', 'accessories', 'Premium straps, cases, and watch accessories', NULL, '/images/categories/accessories.webp'),
('Limited Edition', 'limited-edition', 'Rare and exclusive limited edition watches', NULL, '/images/categories/limited-edition.webp'),
('Pre-Owned', 'preowned', 'Certified pre-owned luxury timepieces', NULL, '/images/categories/preowned.webp');

-- Subcategories for Men's Watches
INSERT INTO public.categories (name, slug, description, parent_id, image) VALUES
('Dress Watches', 'dress-watches', 'Elegant dress watches for formal occasions', 1, NULL),
('Sport Watches', 'sport-watches', 'Rugged and reliable sports watches', 1, NULL),
('Casual Watches', 'casual-watches', 'Everyday luxury timepieces', 1, NULL);

-- Subcategories for Women's Watches
INSERT INTO public.categories (name, slug, description, parent_id, image) VALUES
('Elegant Collections', 'elegant-collections', 'Classic elegant women''s watches', 2, NULL),
('Diamond Watches', 'diamond-watches', 'Luxury watches with diamonds', 2, NULL),
('Rose Gold', 'rose-gold', 'Sophisticated rose gold timepieces', 2, NULL);

-- =============================================
-- BRANDS - Luxury Watch Manufacturers
-- =============================================

INSERT INTO public.brands (name, slug, description, logo, featured) VALUES
('Rolex', 'rolex', 'The most prestigious luxury watch brand in the world', '/images/brands/rolex-logo.png', true),
('Omega', 'omega', 'Swiss precision and innovation', '/images/brands/omega-logo.png', true),
('Tag Heuer', 'tag-heuer', 'Swiss-Made luxury sports watches', '/images/brands/tag-heuer-logo.png', true),
('Patek Philippe', 'patek-philippe', 'The most coveted watches among collectors', '/images/brands/patek-philippe-logo.png', true),
('Breitling', 'breitling', 'Professional aviator and chronograph watches', '/images/brands/breitling-logo.png', true),
('IWC', 'iwc', 'International Watch Company - Engineering precision', '/images/brands/iwc-logo.png', false),
('Cartier', 'cartier', 'Luxury and elegance for centuries', '/images/brands/cartier-logo.png', false),
('Longines', 'longines', 'Elegant timekeeping since 1832', '/images/brands/longines-logo.png', false),
('Tudor', 'tudor', 'Rolex sister brand - Sophisticated timepieces', '/images/brands/tudor-logo.png', false),
('Grand Seiko', 'grand-seiko', 'Japanese horological masterpiece', '/images/brands/grand-seiko-logo.png', false);

-- =============================================
-- SAMPLE PRODUCTS - Luxury Watches
-- =============================================

INSERT INTO public.products (
  name, slug, description, short_description, 
  price, original_price, discount, 
  category_id, brand_id, stock, featured, sku
) VALUES
(
  'Rolex Submariner Stealth', 'rolex-submariner-stealth',
  'The ultimate dive watch. Crafted in titanium with extended water resistance, automatic movement, and perpetual rotor. Reference 126660-0001. Includes original box and certificate.',
  'Iconic dive watch in titanium with 4000m water resistance',
  950000, 950000, NULL, 1, 1, 1, true, 'ROLEX-SUB-001'
),
(
  'Omega Seamaster Professional', 'omega-seamaster-pro',
  'Swiss chronometer certified. Blue dial, stainless steel case, helium escape valve for saturation diving. Co-Axial movement. Reference 2254.50.00.',
  'Professional dive watch with helium escape valve',
  850000, 850000, NULL, 1, 2, 2, true, 'OMEGA-SEAMASTER-001'
),
(
  'Tag Heuer Carrera Chronograph', 'tag-heuer-carrera-chrono',
  'Precision timing at its finest. Automatic chronograph, blue dial, 44mm stainless steel case. Tachymeter bezel. Reference CAR2A90.BH0742.',
  'Legendary chronograph for racing enthusiasts',
  650000, 750000, 13.33, 1, 3, 1, true, 'TAG-CARRERA-001'
),
(
  'Patek Philippe Nautilus', 'patek-philippe-nautilus',
  'The most sought-after luxury sports watch. Integrated bracelet, perpetual rotor, Gyromax balance wheel. Reference 5711/1A-010. A collector''s item.',
  'Iconic luxury sports watch with integrated bracelet',
  2500000, 2500000, NULL, 5, 4, 0, true, 'PATEK-NAUTILUS-001'
),
(
  'Breitling Navitimer', 'breitling-navitimer-1',
  'Pilot''s chronograph since 1952. Automatic movement, slide rule bezel, bi-directional rotating bezel. 46mm steel case. Reference A13322121B1A1.',
  'Professional aviator chronograph watch',
  750000, 850000, 11.76, 1, 5, 3, false, 'BREITLING-NAV-001'
),
(
  'Cartier Ballon Bleu Women', 'cartier-ballon-bleu-women',
  'Elegant and refined. Round blue dial, automatic movement, 33mm steel case. Crown guard feature. Reference WE902067. A timeless classic.',
  'Elegant round watch with iconic crown design',
  550000, 550000, NULL, 2, 7, 2, true, 'CARTIER-BALLON-001'
),
(
  'Longines Heritage Classic', 'longines-heritage-classic',
  'Vintage-inspired elegance. Automatic movement, sub-dial chronograph, 42mm stainless steel. Reference L2.828.4.73.2. A true horological gem.',
  'Vintage-inspired automatic chronograph',
  450000, 500000, 10, 1, 8, 4, false, 'LONGINES-HERITAGE-001'
),
(
  'Grand Seiko Spring Drive', 'grand-seiko-spring-drive',
  'Japanese precision engineering. Spring Drive movement with smooth sweep second hand. 40mm titanium case. 72-hour power reserve. Reference SBGA283.',
  'Masterpiece of Japanese watchmaking',
  1200000, 1200000, NULL, 1, 10, 1, true, 'SEIKO-SPRING-001'
);

-- =============================================
-- NOTES for Integration
-- =============================================
-- 1. Update category IDs if they differ from sequence
-- 2. Update brand IDs if they differ from sequence
-- 3. Add product images via admin panel or separate INSERT:
--    INSERT INTO public.product_images (product_id, url, alt, position) VALUES
-- 4. Ensure images exist in /public/images/ folder
-- 5. Test all links before going live
-- =============================================

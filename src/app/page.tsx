'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Headphones,
  Users,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import VirtualFittingRoom from '@/components/commerce/VirtualFittingRoom';
import CommunityPraise from '@/components/commerce/CommunityPraise';
import OurPhilosophy from '@/components/commerce/OurPhilosophy';
import { useStore } from '@/mocks/store';
import { formatINR } from '@/lib/format';



// 2. Best-Selling Products matching Figma & Blackout specimen
interface ProductColorVariant {
  name: string;
  hex: string;
  image: string;
}

interface BestSellerItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  colorCount: number;
  priceINR: number;
  compareAtPriceINR?: number;
  discountPercent?: number;
  image: string;
  hoverImage?: string;
  isBestseller?: boolean;
  colors?: ProductColorVariant[];
  sizes?: string[];
}

const BEST_SELLING_PRODUCTS: BestSellerItem[] = [
  {
    id: 'bs-1',
    slug: 'satin-finish-tailored-blazer',
    title: 'Satin-Finish Tailored Blazer',
    category: 'Jacket',
    colorCount: 4,
    discountPercent: 30,
    priceINR: 3099,
    compareAtPriceINR: 4499,
    image: '/images/products/satin-blazer/pink.png',
    hoverImage: '/images/products/satin-blazer/black.png',
    isBestseller: true,
    colors: [
      { name: 'Rose', hex: '#D7A19E', image: '/images/products/satin-blazer/pink.png' },
      { name: 'Crimson', hex: '#E60000', image: '/images/products/satin-blazer/red.png' },
      { name: 'Neon Lime', hex: '#B8FA1B', image: '/images/products/satin-blazer/lime.png' },
      { name: 'Onyx Black', hex: '#1B1B1B', image: '/images/products/satin-blazer/black.png' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'bs-2',
    slug: 'linen-blend-two-piece-suit-set',
    title: 'Linen-Blend Two-Piece Suit Set',
    category: 'Jacket',
    colorCount: 2,
    discountPercent: 25,
    priceINR: 1805,
    compareAtPriceINR: 2400,
    image: '/images/products/linen-suit/VGDui1szaI2AyRJ8NpHOYaN5lP0.webp',
    hoverImage: '/images/products/linen-suit/blue.png',
    isBestseller: true,
    colors: [
      { name: 'Oatmeal', hex: '#D9D0C1', image: '/images/products/linen-suit/VGDui1szaI2AyRJ8NpHOYaN5lP0.webp' },
      { name: 'Royal Blue', hex: '#1D5BD8', image: '/images/products/linen-suit/blue.png' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'bs-3',
    slug: 'oversized-logo-graphic-tee',
    title: 'Oversized Logo Graphic Tee',
    category: 'T-shirt',
    colorCount: 2,
    discountPercent: 20,
    priceINR: 2099,
    compareAtPriceINR: 2600,
    image: '/images/products/graphic-tee/lime.png',
    hoverImage: '/images/products/graphic-tee/black.webp',
    isBestseller: true,
    colors: [
      { name: 'Neon Lime', hex: '#B8FA1B', image: '/images/products/graphic-tee/lime.png' },
      { name: 'Noir Black', hex: '#1B1B1B', image: '/images/products/graphic-tee/black.webp' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'bs-4',
    slug: 'tailored-wide-leg-pantsuit',
    title: 'Tailored Wide-Leg Pantsuit',
    category: 'Pant',
    colorCount: 2,
    discountPercent: 30,
    priceINR: 3499,
    compareAtPriceINR: 4999,
    image: '/images/products/pantsuit/blue.png',
    hoverImage: '/images/products/pantsuit/brown.webp',
    colors: [
      { name: 'Royal Blue', hex: '#1D5BD8', image: '/images/products/pantsuit/blue.png' },
      { name: 'Espresso Brown', hex: '#4A3525', image: '/images/products/pantsuit/brown.webp' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'bs-5',
    slug: 'short-sleeve-relaxed-fit-shirt',
    title: 'Short-Sleeve Relaxed Fit Shirt',
    category: 'Long Sleeve',
    colorCount: 2,
    discountPercent: 55,
    priceINR: 1899,
    compareAtPriceINR: 3999,
    image: '/images/products/relaxed-shirt/red.png',
    hoverImage: '/images/products/relaxed-shirt/ecru.webp',
    colors: [
      { name: 'Crimson Red', hex: '#C21B26', image: '/images/products/relaxed-shirt/red.png' },
      { name: 'Ecru Linen', hex: '#E8E2D5', image: '/images/products/relaxed-shirt/ecru.webp' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'bs-6',
    slug: 'corduroy-teddy-bomber-jacket',
    title: 'Corduroy Teddy Bomber Jacket',
    category: 'Jacket',
    colorCount: 2,
    discountPercent: 40,
    priceINR: 3150,
    compareAtPriceINR: 5250,
    image: '/images/products/bomber-jacket/black.png',
    hoverImage: '/images/products/bomber-jacket/camel.png',
    isBestseller: true,
    colors: [
      { name: 'Pitch Black', hex: '#1B1B1B', image: '/images/products/bomber-jacket/black.png' },
      { name: 'Warm Camel', hex: '#C49760', image: '/images/products/bomber-jacket/camel.png' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

const CATEGORY_PILLS = [
  'All Collection',
  'Pullover',
  'Pant',
  'Tippers',
  'T-shirt',
  'Jacket',
  'Long Sleeve',
  'Swim Shorts',
];

// 3. Virtual fitting room data + interaction live in @/components/commerce/VirtualFittingRoom.tsx

// 4. Product Recommendations / Lookbook Stories
const RECOMMENDATION_STORIES = [
  {
    id: 'story-1',
    title: 'The Urban Denim Style, Comfortable Feel for City Life',
    subtitle: 'Crafted for seamless movement, combining structural cotton duck twill with relaxed tailoring.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80',
    slug: 'urban-denim-style',
  },
  {
    id: 'story-2',
    title: 'The Eco-Friendly Wardrobe: Sustainable Choice for Everyday Wear',
    subtitle: 'Zero inventory waste, water-based non-toxic inks, and 100% GOTS certified organic fibers.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80',
    slug: 'sustainable-choice',
  },
  {
    id: 'story-3',
    title: 'The Minimal Approach: Designed for Performance and Comfort',
    subtitle: 'Architectural cuts that hold their shape over years without synthetic polyester blends.',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=900&auto=format&fit=crop&q=80',
    slug: 'minimal-performance',
  },
];

// Interactive Best-Selling Card with Blackout-style Swatch Hover & Size Chips
function BestSellingCard({
  item,
  isFav,
  onToggleWishlist,
}: {
  item: BestSellerItem;
  isFav: boolean;
  onToggleWishlist: () => void;
}) {
  const [selectedColor, setSelectedColor] = useState<ProductColorVariant | null>(item.colors?.[0] || null);
  const [hoveredColor, setHoveredColor] = useState<ProductColorVariant | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  // Active display image: hovered color if mouse is over a swatch, otherwise selected color image, otherwise base image
  const displayImage = hoveredColor?.image || selectedColor?.image || item.image;
  const activeColorName = hoveredColor?.name || selectedColor?.name || '';
  const sizes = item.sizes || ['S', 'M', 'L', 'XL'];

  return (
    <div className="group flex flex-col bg-store-surface rounded-2xl border border-store-border overflow-hidden transition-all duration-300 hover:border-store-action-primary/30 hover:shadow-lg">
      {/* Image Container matching Blackout Template (Fast, clean dual-image swap on hover) */}
      <div className="relative aspect-card-tall w-full bg-store-cream overflow-hidden">
        <Link href={`/products/${item.slug}`} className="block relative w-full h-full">
          {/* Default / Active Color Image */}
          <img
            src={displayImage}
            alt={`${item.title} ${activeColorName}`}
            loading="lazy"
            className={`w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-105 ${
              item.hoverImage && !hoveredColor ? 'group-hover:opacity-0' : ''
            }`}
          />

          {/* Hover Image (Fast snappy reveal on card hover when not hovering a swatch) */}
          {item.hoverImage && !hoveredColor && (
            <img
              src={item.hoverImage}
              alt={`${item.title} hover view`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-hover:scale-105 pointer-events-none"
            />
          )}
        </Link>

        {/* Discount Pill Badge (e.g. -30%, -25%) */}
        {item.discountPercent ? (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-red-600 shadow-xs">
              -{item.discountPercent}%
            </span>
          </div>
        ) : item.isBestseller ? (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <Badge variant="dark" size="sm">
              Bestseller
            </Badge>
          </div>
        ) : null}

        {/* Wishlist Heart Button (Clean, crisp, no blur) */}
        <button
          type="button"
          aria-label={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWishlist();
          }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white border border-store-border flex items-center justify-center text-store-text-primary hover:scale-110 active:scale-95 transition-transform duration-150 cursor-pointer shadow-xs"
        >
          <Heart
            size={16}
            className={isFav ? 'fill-secondary-purple text-secondary-purple' : 'text-store-text-primary'}
          />
        </button>
      </div>

      {/* Product Details matching Blackout Specimen */}
      <div className="p-4 flex flex-col gap-2.5">
        {/* Row 1: Title & Price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-sans font-bold text-sm text-store-text-primary leading-tight">
            <Link href={`/products/${item.slug}`} className="hover:text-store-action-primary transition-colors">
              {item.title}
            </Link>
          </h3>
          <div className="flex items-baseline gap-1.5 text-right shrink-0">
            <span className="font-heading font-extrabold text-sm text-store-text-primary block tuw-tabular-nums">
              {formatINR(item.priceINR * 100)}
            </span>
            {item.compareAtPriceINR && (
              <span className="text-2xs text-store-text-secondary line-through tuw-tabular-nums">
                {formatINR(item.compareAtPriceINR * 100)}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: View Details & Size Selector Buttons */}
        <div className="flex items-center justify-between pt-0.5">
          <Link
            href={`/products/${item.slug}`}
            className="text-xs text-store-text-secondary hover:text-store-text-primary underline underline-offset-2 transition-colors font-medium"
          >
            View details
          </Link>

          {/* Size Pills: [S] [M] [L] [XL] */}
          <div className="flex items-center gap-1">
            {sizes.map((s) => {
              const isSelected = selectedSize === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`h-5 min-w-5 px-1 text-2xs font-semibold border rounded transition-all cursor-pointer flex items-center justify-center ${
                    isSelected
                      ? 'bg-store-text-primary text-white border-store-text-primary'
                      : 'bg-white text-store-text-secondary border-store-border hover:border-store-text-primary hover:text-store-text-primary'
                  }`}
                  aria-label={`Select size ${s}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Color Swatches with Real-Time Hover Color Swap */}
        {item.colors && item.colors.length > 0 && (
          <div className="flex items-center justify-between pt-1.5 border-t border-store-border/60">
            <div className="flex items-center gap-1.5">
              {item.colors.map((color) => {
                const isActive = (hoveredColor?.name || selectedColor?.name) === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    title={color.name}
                    aria-label={`View ${item.title} in ${color.name}`}
                    onMouseEnter={() => setHoveredColor(color)}
                    onMouseLeave={() => setHoveredColor(null)}
                    onClick={() => setSelectedColor(color)}
                    className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                      isActive
                        ? 'ring-2 ring-store-text-primary ring-offset-1 scale-110'
                        : 'border-store-border hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
            <span className="text-2xs text-store-text-secondary font-medium lowercase first-letter:uppercase">
              {hoveredColor ? hoveredColor.name : selectedColor?.name || `${item.colorCount} colors`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { isInWishlist, toggleWishlist } = useStore();

  const [activeCategory, setActiveCategory] = useState('All Collection');

  // Filter best sellers
  const filteredProducts =
    activeCategory === 'All Collection'
      ? BEST_SELLING_PRODUCTS
      : BEST_SELLING_PRODUCTS.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col bg-store-canvas text-store-text-primary selection:bg-store-action-primary selection:text-white">
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* =========================================================================
            SECTION 1: HERO SHOWCASE (Dedicated Video h1, Minimal Text, Rich Interactive Controls)
            ========================================================================= */}
        <section
          aria-label="Hero Showcase"
          className="relative w-full overflow-hidden bg-primary-dark hero-viewport-height flex flex-col justify-end border-b border-store-border select-none"
        >
          {/* Background Video (Dedicated Benchmark Hero Video h1, full muted in continuous loop) */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              src="/videos/h1.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover video-watermark-cloak"
            />
          </div>

          {/* Cinematic Scrim Gradients (Guarantee 100% WCAG 2.1 AA Contrast) */}
          <div className="absolute inset-0 hero-scrim-horizontal z-10 pointer-events-none" />
          <div className="absolute inset-0 hero-scrim-gradient z-10 pointer-events-none" />

          {/* Quiet Luxury Minimal Editorial Presentation (Bottom Anchored, Unified Cohesive Group) */}
          <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 lg:pb-16 flex-1 flex flex-col justify-end">
            <div className="max-w-xl space-y-4">
              {/* Delicate Architectural Eyebrow */}
              <div className="flex items-center gap-3 text-2xs uppercase tracking-editorial text-white/70 font-sans font-medium">
                <span className="w-7 h-px bg-store-gold" />
                <span>SS26 • Slow-Living Atelier</span>
              </div>

              {/* Ultra-Refined Minimal Headline */}
              <h1 className="font-heading tracking-tight text-white leading-[1.04]">
                <span className="block font-light text-[clamp(2rem,5vw+0.5rem,4.5rem)]">
                  Architectural Form<span className="text-store-gold">.</span>
                </span>
                <span className="block font-normal text-[clamp(1.375rem,3vw+0.5rem,3rem)] text-white/80 tracking-wide mt-1">
                  Pure Permanence
                </span>
              </h1>

              {/* Minimal Single-Line Subtitle */}
              <p className="text-xs sm:text-sm text-white/75 font-sans font-light max-w-sm leading-relaxed tracking-wide">
                Dense 500 GSM organic essentials, tailored on-demand.
              </p>

              {/* Refined Luxury Action Buttons (Directly unified beneath subtitle, zero excessive gap) */}
              <div className="pt-2 sm:pt-3 flex flex-wrap gap-4 items-center">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-3 px-8 h-12 rounded-full bg-white text-primary-dark font-sans font-medium text-xs tracking-luxury uppercase hover:bg-store-cream active:scale-95 transition-all shadow-md"
                >
                  <span>Explore Collection</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform text-primary-dark" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-7 h-12 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 text-white font-sans font-medium text-xs tracking-luxury uppercase active:scale-95 transition-all"
                >
                  <span>The Manifesto</span>
                </Link>
              </div>
            </div>
          </div>

        </section>

        {/* =========================================================================
            SECTION 1.5: OUR PHILOSOPHY (Editorial Slow-Living Fashion Manifesto)
            ========================================================================= */}
        <OurPhilosophy />

        {/* =========================================================================
            SECTION 2: EXPLORE OUR BEST SELLING PRODUCT COLLECTION (Figma Specimen)
            ========================================================================= */}
        <section id="best-sellers" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-store-border">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="font-heading text-[clamp(1.75rem,4vw+0.5rem,3rem)] font-medium tracking-tight text-store-text-primary">
                Explore Our Best Selling
                <br className="hidden sm:inline" />
                {' '}Product Collection
              </h2>
            </div>

            <div className="max-w-md space-y-4">
              <p className="text-base text-store-text-secondary font-sans leading-relaxed">
                Discover a curated selection of our most popular and best-selling styles, chosen for
                quality and modern appeal.
              </p>
              <div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-store-action-primary hover:bg-store-action-hover text-white font-sans font-medium text-xs tracking-wider uppercase transition-colors"
                >
                  <span>Let&apos;s Shop Now</span>
                  <ShoppingBag size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Filter Pills matching Figma */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10" role="tablist">
            {CATEGORY_PILLS.map((pill) => {
              const isActive = activeCategory === pill;
              return (
                <button
                  key={pill}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(pill)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-store-action-primary text-white shadow-xs'
                      : 'bg-transparent text-store-text-secondary border border-store-border hover:border-store-action-primary hover:text-store-text-primary'
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>

          {/* 6 Product Cards Grid (3 columns x 2 rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((item) => (
              <BestSellingCard
                key={item.id}
                item={item}
                isFav={isInWishlist(item.id)}
                onToggleWishlist={() => toggleWishlist(item.id)}
              />
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: WE DELIVER EXCEPTIONAL CUSTOMER EXPERIENCES (Figma Teal Banner)
            ========================================================================= */}
        <section className="bg-primary-dark text-white py-20 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Row matching Explore section format */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
              <div>
                <h2 className="font-heading text-[clamp(1.75rem,4vw+0.5rem,3rem)] font-medium tracking-tight text-white">
                  We Deliver Exceptional
                  <br className="hidden sm:inline" />
                  {' '}Customer Experiences
                </h2>
              </div>

              <div className="max-w-md">
                <p className="text-base text-white/70 font-sans leading-relaxed">
                  Take advantage of our dedicated customer service team ready to assist with any
                  questions or issues you may encounter.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {/* Feature 1 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-secondary-mint">
                  <Headphones size={22} />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">Quick and Friendly Support</h3>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  Our support team is always ready to assist you quickly and efficiently, resolving your
                  issues in no time with human care.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-secondary-blue">
                  <Users size={22} />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">New Collection Everyday</h3>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  Explore our new arrivals and trendiest additions added to our store daily. Stay ahead of
                  fashion and refreshed styles.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-store-gold">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">Satisfaction Guaranteed</h3>
                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  We guarantee your complete satisfaction with every purchase. Enjoy high-quality
                  products and customer care you can rely on.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3.5: WORDS OF PRAISE FROM OTHERS (Single-Line Testimonial Marquee)
            ========================================================================= */}
        <CommunityPraise />

        {/* =========================================================================
            SECTION 4: VIRTUAL FITTING ROOM
            ========================================================================= */}
        <section aria-label="Virtual fitting room" className="py-20 sm:py-28 border-b border-store-border">
          <VirtualFittingRoom />
        </section>

        {/* =========================================================================
            SECTION 5: PRODUCT RECOMMENDATIONS (Figma Editorial Cards)
            ========================================================================= */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-store-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-heading text-[clamp(1.75rem,3vw+0.5rem,2.25rem)] font-medium tracking-tight text-store-text-primary">
                Product Recommendations
              </h2>
              <p className="text-base text-store-text-secondary font-sans mt-1">
                Curated editorial content & stories behind every piece we create.
              </p>
            </div>

            <Link
              href="/journal"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-store-action-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-store-action-hover transition-colors shrink-0 self-start sm:self-auto"
            >
              <span>2024 Trends</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {RECOMMENDATION_STORIES.map((story) => (
              <div
                key={story.id}
                className="group bg-store-surface rounded-2xl border border-store-border overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-card-story w-full bg-store-cream overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-heading font-bold text-base text-store-text-primary leading-snug group-hover:text-store-action-primary transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs text-store-text-secondary leading-relaxed font-sans">
                    {story.subtitle}
                  </p>
                  <div className="pt-2">
                    <Link
                      href={`/journal/${story.slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-store-text-primary hover:text-store-action-primary inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Read Story</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: STRATOSPHERE LIFESTYLE BANNER (4th Atelier Video Integration)
            ========================================================================= */}
        <section className="relative overflow-hidden py-28 sm:py-36 bg-primary-dark text-white text-center">
          {/* Full-width 4th Benchmark Video (public/videos/h4.mp4) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              src="/videos/h4.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover video-watermark-cloak"
            />
          </div>

          {/* Cinematic Scrim Gradient (Guarantee 100% WCAG Contrast) */}
          <div className="absolute inset-0 bg-primary-dark/65 hero-scrim-gradient z-1 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="font-heading text-[clamp(2rem,4.5vw+0.5rem,3.75rem)] font-extrabold tracking-tight text-white leading-tight">
              Let&apos;s Take Your Fashion to
              <br className="hidden sm:inline" />
              {' '}The Stratosphere
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed font-sans">
              Ready to elevate your style journey? Step into our latest line crafted for every moment.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 px-8 h-12 rounded-full bg-white text-primary-dark font-sans font-semibold text-sm hover:bg-store-cream active:scale-95 transition-all shadow-lg"
              >
                <span>Get Started</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

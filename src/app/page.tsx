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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Badge from '@/components/ui/Badge';
import { useStore } from '@/mocks/store';
import { formatINR } from '@/lib/format';
import { cn } from '@/lib/cn';



// 2. Best-Selling Products matching Figma specimen
interface BestSellerItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  colorCount: number;
  priceINR: number;
  image: string;
  hoverImage?: string;
  isBestseller?: boolean;
}

const BEST_SELLING_PRODUCTS: BestSellerItem[] = [
  {
    id: 'bs-1',
    slug: 'suede-classic-shirts',
    title: 'Suede Classic Shirts',
    category: 'Long Sleeve',
    colorCount: 2,
    priceINR: 3099,
    image: '/images/images/image%201.avif',
    hoverImage: '/images/images/image%201%20hover.avif',
    isBestseller: true,
  },
  {
    id: 'bs-2',
    slug: 'eolo-x-zip-shirt',
    title: 'Eolo X Zip Shirt',
    category: 'Jacket',
    colorCount: 4,
    priceINR: 1805,
    image: '/images/images/image%202.avif',
    hoverImage: '/images/images/image%202%20hover.avif',
    isBestseller: true,
  },
  {
    id: 'bs-3',
    slug: 'suede-3d-shirt',
    title: 'Suede 3D Shirt',
    category: 'T-shirt',
    colorCount: 2,
    priceINR: 2099,
    image: '/images/images/image%203.webp',
    hoverImage: '/images/images/image%203%20hover.webp',
    isBestseller: true,
  },
  {
    id: 'bs-4',
    slug: 'modern-crew-neck-plum',
    title: 'Modern Crew Neck',
    category: 'Pullover',
    colorCount: 3,
    priceINR: 1100,
    image: '/images/images/image%204.webp',
    hoverImage: '/images/images/image%204%20hover.webp',
  },
  {
    id: 'bs-5',
    slug: 'modern-crew-neck-charcoal',
    title: 'Modern Crew Neck',
    category: 'Pullover',
    colorCount: 3,
    priceINR: 1100,
    image: '/images/images/image%205.avif',
    hoverImage: '/images/images/image%205%20hover.avif',
  },
  {
    id: 'bs-6',
    slug: 'sundero-zip-hoodie',
    title: 'Sundero Hoodie',
    category: 'Pullover',
    colorCount: 2,
    priceINR: 1150,
    image: '/images/images/image%206.avif',
    hoverImage: '/images/images/image%206%20hover.avif',
    isBestseller: true,
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

// 3. New Collection — premium audience sets backed by local atelier imagery
interface NewCollectionItem {
  id: string;
  slug: string;
  title: string;
  colors: string;
  priceINR: number;
  image: string;
  badge?: string;
}

type CollectionKey = 'men' | 'women' | 'kids';

const COLLECTION_ORDER: CollectionKey[] = ['men', 'women', 'kids'];

const COLLECTION_LABELS: Record<CollectionKey, string> = {
  men: 'Men',
  women: 'Women',
  kids: 'Kids',
};

const NEW_COLLECTION_SETS: Record<CollectionKey, NewCollectionItem[]> = {
  men: [
    {
      id: 'nc-m1',
      slug: 'men-tailored-ivory-oxford',
      title: 'Tailored Ivory Oxford',
      colors: '2 Colors',
      priceINR: 1899,
      image: '/images/section image/m1.png',
    },
    {
      id: 'nc-m2',
      slug: 'men-sandstone-camp-shirt',
      title: 'Sandstone Camp Shirt',
      colors: '2 Colors',
      priceINR: 1450,
      image: '/images/section image/m2.png',
    },
    {
      id: 'nc-m3',
      slug: 'men-atelier-signature-overshirt',
      title: 'Atelier Signature Overshirt',
      colors: '3 Colors',
      priceINR: 2100,
      image: '/images/section image/m3.png',
      badge: 'Signature Drop',
    },
    {
      id: 'nc-m4',
      slug: 'men-canyon-twill-overshirt',
      title: 'Canyon Twill Overshirt',
      colors: '2 Colors',
      priceINR: 1750,
      image: '/images/section image/m4.png',
    },
    {
      id: 'nc-m5',
      slug: 'men-onyx-minimal-tee',
      title: 'Onyx Minimal Tee',
      colors: '3 Colors',
      priceINR: 1299,
      image: '/images/section image/m5.png',
    },
  ],
  women: [
    {
      id: 'nc-w1',
      slug: 'women-ivory-draped-blouse',
      title: 'Ivory Draped Blouse',
      colors: '2 Colors',
      priceINR: 1799,
      image: '/images/section image/w1.png',
    },
    {
      id: 'nc-w2',
      slug: 'women-rosewood-soft-knit',
      title: 'Rosewood Soft Knit',
      colors: '3 Colors',
      priceINR: 1599,
      image: '/images/section image/w2.png',
    },
    {
      id: 'nc-w3',
      slug: 'women-atelier-sculpted-dress',
      title: 'Atelier Sculpted Dress',
      colors: '3 Colors',
      priceINR: 2299,
      image: '/images/section image/w3.png',
      badge: 'Signature Drop',
    },
    {
      id: 'nc-w4',
      slug: 'women-ecru-relaxed-shirt',
      title: 'Ecru Relaxed Shirt',
      colors: '2 Colors',
      priceINR: 1499,
      image: '/images/section image/w4.png',
    },
    {
      id: 'nc-w5',
      slug: 'women-noir-gallery-tee',
      title: 'Noir Gallery Tee',
      colors: '3 Colors',
      priceINR: 1399,
      image: '/images/section image/w5.png',
    },
  ],
  kids: [
    {
      id: 'nc-k1',
      slug: 'kids-mini-ivory-shirt',
      title: 'Mini Ivory Shirt',
      colors: '2 Colors',
      priceINR: 999,
      image: '/images/section image/k1.png',
    },
    {
      id: 'nc-k2',
      slug: 'kids-playdate-soft-set',
      title: 'Playdate Soft Set',
      colors: '3 Colors',
      priceINR: 1199,
      image: '/images/section image/k2.png',
    },
    {
      id: 'nc-k3',
      slug: 'kids-little-atelier-pinafore',
      title: 'Little Atelier Pinafore',
      colors: '3 Colors',
      priceINR: 1299,
      image: '/images/section image/k3.png',
      badge: 'Signature Drop',
    },
    {
      id: 'nc-k4',
      slug: 'kids-dune-twill-shirt',
      title: 'Dune Twill Shirt',
      colors: '2 Colors',
      priceINR: 1099,
      image: '/images/section image/k4.png',
    },
    {
      id: 'nc-k5',
      slug: 'kids-cloud-soft-sweatshirt',
      title: 'Cloud Soft Sweatshirt',
      colors: '3 Colors',
      priceINR: 899,
      image: '/images/section image/k5.png',
    },
  ],
};

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

export default function HomePage() {
  const { isInWishlist, toggleWishlist } = useStore();

  const [activeCategory, setActiveCategory] = useState('All Collection');
  const [activeCollection, setActiveCollection] = useState<CollectionKey>('men');

  const activeIndex = COLLECTION_ORDER.indexOf(activeCollection);
  const activeItems = NEW_COLLECTION_SETS[activeCollection];
  const leftCards = activeItems.slice(0, 2);
  const centerCard = activeItems[2];
  const rightCards = activeItems.slice(3, 5);

  const goToCollection = (key: CollectionKey) => setActiveCollection(key);
  const goPrevCollection = () =>
    setActiveCollection(COLLECTION_ORDER[(activeIndex + COLLECTION_ORDER.length - 1) % COLLECTION_ORDER.length]);
  const goNextCollection = () =>
    setActiveCollection(COLLECTION_ORDER[(activeIndex + 1) % COLLECTION_ORDER.length]);

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
                <span className="block font-light text-4xl sm:text-6xl lg:text-7xl">
                  Architectural Form<span className="text-store-gold">.</span>
                </span>
                <span className="block font-normal text-2xl sm:text-4xl lg:text-5xl text-white/80 tracking-wide mt-1">
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
            SECTION 2: EXPLORE OUR BEST SELLING PRODUCT COLLECTION (Figma Specimen)
            ========================================================================= */}
        <section id="best-sellers" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-store-border">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-2xs font-bold uppercase tracking-widest text-store-text-secondary block mb-2 font-sans">
                Curated Bestsellers
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-store-text-primary">
                Explore Our Best Selling
                <br />
                Product Collection
              </h2>
            </div>

            <div className="max-w-md space-y-4">
              <p className="text-sm text-store-text-secondary font-sans leading-relaxed">
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
            {filteredProducts.map((item) => {
              const isFav = isInWishlist(item.id);
              return (
                <div
                  key={item.id}
                  className="group flex flex-col bg-store-surface rounded-2xl border border-store-border overflow-hidden transition-all duration-300 hover:border-store-action-primary/30 hover:shadow-lg"
                >
                  {/* Image Container with Smooth Dual-Image Crossfade on Hover */}
                  <div className="relative aspect-card-tall w-full bg-store-cream overflow-hidden">
                    <Link href={`/products/${item.slug}`} className="block relative w-full h-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                          item.hoverImage ? 'group-hover:opacity-0' : ''
                        }`}
                      />
                      {item.hoverImage && (
                        <img
                          src={item.hoverImage}
                          alt={`${item.title} alternate view`}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105 pointer-events-none"
                        />
                      )}
                      {/* Subtle Luxury Ambient Vignette */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </Link>

                    {/* Wishlist Heart Button */}
                    <button
                      type="button"
                      aria-label={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs border border-store-border flex items-center justify-center text-store-text-primary hover:bg-white hover:scale-110 active:scale-90 transition-all cursor-pointer shadow-xs"
                    >
                      <Heart
                        size={16}
                        className={isFav ? 'fill-secondary-purple text-secondary-purple' : 'text-store-text-primary'}
                      />
                    </button>

                    {item.isBestseller && (
                      <div className="absolute top-3 left-3 z-10">
                        <Badge variant="dark" size="sm">
                          Bestseller
                        </Badge>
                      </div>
                    )}

                    {/* Floating Luxury Quick View Pill (Slides Up on Card Hover) */}
                    <div className="absolute inset-x-4 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10 pointer-events-none">
                      <div className="w-full py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-white/60 text-store-text-primary text-center font-sans text-2xs font-semibold tracking-luxury uppercase shadow-md flex items-center justify-center gap-1.5">
                        <span>Quick View</span>
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-sans font-bold text-sm text-store-text-primary">
                        <Link href={`/products/${item.slug}`} className="hover:text-store-action-primary transition-colors">
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-2xs text-store-text-secondary mt-0.5">
                        {item.colorCount} Colors • {item.category}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-heading font-extrabold text-sm text-store-text-primary block tuw-tabular-nums">
                        {formatINR(item.priceINR * 100)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
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
                <span className="text-2xs font-bold uppercase tracking-widest text-store-gold block mb-2 font-sans">
                  Customer Experience
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                  We Deliver Exceptional
                  <br />
                  Customer Experiences
                </h2>
              </div>

              <div className="max-w-md">
                <p className="text-sm text-white/70 font-sans leading-relaxed">
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
            SECTION 4: EXPLORE OUR NEW COLLECTION (Premium Audience Showcase)
            ========================================================================= */}
        <section
          aria-label="Explore our new collection"
          id="new-collection"
          className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-store-border"
        >
          {/* Header Row */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-8 sm:mb-10">
            <div>
              <span className="flex items-center gap-3 text-2xs font-bold uppercase tracking-widest text-store-text-secondary font-sans mb-2">
                <span aria-hidden="true" className="w-7 h-px bg-store-gold" />
                Curated Aesthetics
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-store-text-primary">
                Explore Our New Collection
              </h2>
              <p className="text-sm text-store-text-secondary font-sans mt-2 max-w-lg">
                Discover curated items with minimal aesthetics tailored for the modern daily spirit.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <p aria-live="polite" className="text-xs text-store-text-secondary font-sans tuw-tabular-nums">
                {COLLECTION_LABELS[activeCollection]} • 0{activeIndex + 1} / 03
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrevCollection}
                  aria-label="Previous collection"
                  className="w-10 h-10 rounded-full border border-store-border bg-store-surface hover:bg-store-cream flex items-center justify-center text-store-text-primary transition-all duration-200 cursor-pointer"
                >
                  <ChevronLeft size={18} color="currentColor" className="text-store-text-primary" />
                </button>
                <button
                  type="button"
                  onClick={goNextCollection}
                  aria-label="Next collection"
                  className="w-10 h-10 rounded-full bg-store-action-primary text-white hover:bg-store-action-hover flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  <ChevronRight size={18} color="currentColor" className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Audience Tabs */}
          <div role="tablist" aria-label="Shop new collection by audience" className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 mb-8 sm:mb-10">
            {COLLECTION_ORDER.map((key) => {
              const isActive = key === activeCollection;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => goToCollection(key)}
                  className={cn(
                    'px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer',
                    isActive
                      ? 'bg-store-action-primary text-white shadow-xs'
                      : 'bg-transparent text-store-text-secondary border border-store-border hover:border-store-action-primary hover:text-store-text-primary'
                  )}
                >
                  {COLLECTION_LABELS[key]}
                </button>
              );
            })}
          </div>

          {/* Asymmetric 3-Column Grid */}
          <div key={activeCollection} aria-live="polite" className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Left Col: 2 Stacked Cards */}
            <div className="flex flex-col gap-6 justify-between">
              {leftCards.map((card) => {
                const isFav = isInWishlist(card.id);
                return (
                  <article
                    key={card.id}
                    className="group flex flex-col bg-store-surface rounded-2xl border border-store-border overflow-hidden transition-all duration-200 hover:border-store-action-primary/30 hover:shadow-lg"
                  >
                    <div className="relative aspect-card-tall w-full bg-store-cream overflow-hidden">
                      <Link href={`/products/${card.slug}`} aria-label={`View ${card.title}`} className="block w-full h-full">
                        <img
                          src={card.image}
                          alt={card.title}
                          width={900}
                          height={1200}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                      </Link>
                      <button
                        type="button"
                        aria-label={isFav ? `Remove ${card.title} from wishlist` : `Save ${card.title} to wishlist`}
                        aria-pressed={isFav}
                        onClick={() => toggleWishlist(card.id)}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 border border-store-border flex items-center justify-center transition-all duration-200 hover:bg-white shadow-xs cursor-pointer"
                      >
                        <Heart
                          size={14}
                          color="currentColor"
                          className={cn(isFav ? 'fill-secondary-purple text-secondary-purple' : 'text-store-text-primary')}
                        />
                      </button>
                      <Link
                        href={`/products/${card.slug}`}
                        aria-label={`Quick view ${card.title}`}
                        className="absolute inset-x-4 bottom-3 z-10 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-white/95 border border-white/60 text-store-text-primary font-sans text-2xs font-semibold tracking-luxury uppercase shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 transition-all duration-200"
                      >
                        <span>Quick View</span>
                        <ArrowRight size={12} color="currentColor" className="text-store-text-primary" />
                      </Link>
                    </div>
                    <div className="p-4 flex items-center justify-between gap-3">
                      <div>
                        <h4 className="font-sans font-bold text-xs text-store-text-primary">
                          <Link href={`/products/${card.slug}`} className="hover:text-store-action-primary transition-colors duration-200">
                            {card.title}
                          </Link>
                        </h4>
                        <p className="text-2xs text-store-text-secondary mt-0.5">
                          {card.colors} • {COLLECTION_LABELS[activeCollection]}
                        </p>
                      </div>
                      <span className="font-heading font-extrabold text-xs text-store-text-primary tuw-tabular-nums">
                        {formatINR(card.priceINR * 100)}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Center Col: Tall Feature Hero Card */}
            <article className="group bg-store-surface rounded-2xl border border-store-border overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-store-action-primary/30 hover:shadow-lg">
              <div className="relative w-full flex-1 aspect-asymmetric-tall bg-store-cream overflow-hidden">
                <Link href={`/products/${centerCard.slug}`} aria-label={`View ${centerCard.title}`} className="block w-full h-full">
                  <img
                    src={centerCard.image}
                    alt={centerCard.title}
                    width={1000}
                    height={1400}
                    loading="eager"
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </Link>
                <button
                  type="button"
                  aria-label={isInWishlist(centerCard.id) ? `Remove ${centerCard.title} from wishlist` : `Save ${centerCard.title} to wishlist`}
                  aria-pressed={isInWishlist(centerCard.id)}
                  onClick={() => toggleWishlist(centerCard.id)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 border border-store-border flex items-center justify-center transition-all duration-200 hover:bg-white shadow-xs cursor-pointer"
                >
                  <Heart
                    size={16}
                    color="currentColor"
                    className={cn(isInWishlist(centerCard.id) ? 'fill-secondary-purple text-secondary-purple' : 'text-store-text-primary')}
                  />
                </button>
                {centerCard.badge ? (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant="dark" size="sm">
                      {centerCard.badge}
                    </Badge>
                  </div>
                ) : null}
                <Link
                  href={`/products/${centerCard.slug}`}
                  aria-label={`Quick view ${centerCard.title}`}
                  className="absolute inset-x-5 bottom-4 z-10 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-white/95 border border-white/60 text-store-text-primary font-sans text-2xs font-semibold tracking-luxury uppercase shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 transition-all duration-200"
                >
                  <span>Quick View</span>
                  <ArrowRight size={12} color="currentColor" className="text-store-text-primary" />
                </Link>
              </div>

              <div className="p-5 flex items-center justify-between gap-3 bg-white border-t border-store-border">
                <div>
                  <h4 className="font-heading font-bold text-sm text-store-text-primary">
                    <Link href={`/products/${centerCard.slug}`} className="hover:text-store-action-primary transition-colors duration-200">
                      {centerCard.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-store-text-secondary mt-0.5">
                    {centerCard.colors} • {COLLECTION_LABELS[activeCollection]} Atelier
                  </p>
                </div>
                <span className="font-heading font-extrabold text-base text-store-text-primary tuw-tabular-nums">
                  {formatINR(centerCard.priceINR * 100)}
                </span>
              </div>
            </article>

            {/* Right Col: 2 Stacked Cards */}
            <div className="flex flex-col gap-6 justify-between">
              {rightCards.map((card) => {
                const isFav = isInWishlist(card.id);
                return (
                  <article
                    key={card.id}
                    className="group flex flex-col bg-store-surface rounded-2xl border border-store-border overflow-hidden transition-all duration-200 hover:border-store-action-primary/30 hover:shadow-lg"
                  >
                    <div className="relative aspect-card-tall w-full bg-store-cream overflow-hidden">
                      <Link href={`/products/${card.slug}`} aria-label={`View ${card.title}`} className="block w-full h-full">
                        <img
                          src={card.image}
                          alt={card.title}
                          width={900}
                          height={1200}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        />
                      </Link>
                      <button
                        type="button"
                        aria-label={isFav ? `Remove ${card.title} from wishlist` : `Save ${card.title} to wishlist`}
                        aria-pressed={isFav}
                        onClick={() => toggleWishlist(card.id)}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 border border-store-border flex items-center justify-center transition-all duration-200 hover:bg-white shadow-xs cursor-pointer"
                      >
                        <Heart
                          size={14}
                          color="currentColor"
                          className={cn(isFav ? 'fill-secondary-purple text-secondary-purple' : 'text-store-text-primary')}
                        />
                      </button>
                      <Link
                        href={`/products/${card.slug}`}
                        aria-label={`Quick view ${card.title}`}
                        className="absolute inset-x-4 bottom-3 z-10 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-white/95 border border-white/60 text-store-text-primary font-sans text-2xs font-semibold tracking-luxury uppercase shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 focus-visible:opacity-100 focus-visible:translate-y-0 transition-all duration-200"
                      >
                        <span>Quick View</span>
                        <ArrowRight size={12} color="currentColor" className="text-store-text-primary" />
                      </Link>
                    </div>
                    <div className="p-4 flex items-center justify-between gap-3">
                      <div>
                        <h4 className="font-sans font-bold text-xs text-store-text-primary">
                          <Link href={`/products/${card.slug}`} className="hover:text-store-action-primary transition-colors duration-200">
                            {card.title}
                          </Link>
                        </h4>
                        <p className="text-2xs text-store-text-secondary mt-0.5">
                          {card.colors} • {COLLECTION_LABELS[activeCollection]}
                        </p>
                      </div>
                      <span className="font-heading font-extrabold text-xs text-store-text-primary tuw-tabular-nums">
                        {formatINR(card.priceINR * 100)}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: PRODUCT RECOMMENDATIONS (Figma Editorial Cards)
            ========================================================================= */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-store-border">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-2xs font-bold uppercase tracking-widest text-store-text-secondary block mb-2 font-sans">
                Stories & Insights
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-store-text-primary">
                Product Recommendations
              </h2>
              <p className="text-sm text-store-text-secondary font-sans mt-1">
                Curated editorial content & stories behind every piece we create.
              </p>
            </div>

            <Link
              href="/journal"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-store-action-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-store-action-hover transition-colors"
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
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Let&apos;s Take Your Fashion to
              <br />
              The Stratosphere
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

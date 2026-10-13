'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShoppingBag,
  Heart,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ShieldCheck,
  Sparkles,
  Headphones,
  Users,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BrandIntro from '@/components/layout/BrandIntro';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useStore } from '@/mocks/store';
import { formatINR } from '@/lib/format';

// 1. Hero Video Carousel slides (using videos from public/videos/)
interface HeroSlide {
  id: string;
  videoSrc: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    videoSrc: '/videos/h1.mp4',
    badge: 'Heavyweight 500 GSM • Zero Deadstock',
    title: 'Architectural Form. Pure Permanence.',
    subtitle:
      'Dense French terry hoodies and combed organic essentials crafted for quiet permanence. Zero deadstock inventory. Cured on-demand in Tiruppur.',
    ctaText: 'Explore Collection',
    ctaHref: '/shop',
  },
  {
    id: 'slide-2',
    videoSrc: '/videos/h2.mp4',
    badge: 'New Collection • SS26',
    title: 'Unleash Your Style with Our New Collection',
    subtitle:
      'Unleash your style with our latest collection. Discover designs that elevate your confidence and natural tone in every modern day outfit.',
    ctaText: 'Shop New Arrivals',
    ctaHref: '/shop?category=hoodies',
  },
  {
    id: 'slide-3',
    videoSrc: '/videos/h3.mp4',
    badge: '360° Studio Form • Boxy Cut',
    title: 'Engineered Without Excess.',
    subtitle:
      'Minimalist silhouettes structured with architectural weight. Eliminating overproduction with made-to-order accuracy.',
    ctaText: 'The POD Manifesto',
    ctaHref: '/about',
  },
  {
    id: 'slide-4',
    videoSrc: '/videos/h4.mp4',
    badge: 'Artisanal Atelier • GOTS Certified',
    title: 'Rooted in Quiet Craftsmanship.',
    subtitle:
      'Every thread is sourced from certified organic cotton fields and tailored with precision in our Tiruppur atelier.',
    ctaText: 'Explore Capsule',
    ctaHref: '/collections',
  },
];

// 2. Best-Selling Products matching Figma specimen
interface BestSellerItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  colorCount: number;
  priceINR: number;
  image: string;
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
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&auto=format&fit=crop&q=80',
    isBestseller: true,
  },
  {
    id: 'bs-2',
    slug: 'eolo-x-zip-shirt',
    title: 'Eolo X Zip Shirt',
    category: 'Jacket',
    colorCount: 4,
    priceINR: 1805,
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=900&auto=format&fit=crop&q=80',
    isBestseller: true,
  },
  {
    id: 'bs-3',
    slug: 'suede-3d-shirt',
    title: 'Suede 3D Shirt',
    category: 'T-shirt',
    colorCount: 2,
    priceINR: 2099,
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=900&auto=format&fit=crop&q=80',
    isBestseller: true,
  },
  {
    id: 'bs-4',
    slug: 'modern-crew-neck-plum',
    title: 'Modern Crew Neck',
    category: 'Pullover',
    colorCount: 3,
    priceINR: 1100,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 'bs-5',
    slug: 'modern-crew-neck-charcoal',
    title: 'Modern Crew Neck',
    category: 'Pullover',
    colorCount: 3,
    priceINR: 1100,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 'bs-6',
    slug: 'sundero-zip-hoodie',
    title: 'Sundero Hoodie',
    category: 'Pullover',
    colorCount: 2,
    priceINR: 1150,
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&auto=format&fit=crop&q=80',
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

// 3. New Collection Asymmetric Grid Products
const NEW_COLLECTION_LEFT = [
  {
    id: 'nc-1',
    slug: 'sand-safari-shirt',
    title: 'Tauri Sand Shirt',
    colors: '2 Colors',
    priceINR: 1450,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 'nc-2',
    slug: 'camp-collar-black',
    title: 'Resort Black Shirt',
    colors: '3 Colors',
    priceINR: 1600,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80',
  },
];

const NEW_COLLECTION_CENTER = {
  id: 'nc-center',
  slug: 'dust-splatter-denim-set',
  title: 'Dust Splatter and Dark Jeans',
  colors: '3 Colors',
  priceINR: 1600,
  image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=1000&auto=format&fit=crop&q=80',
};

const NEW_COLLECTION_RIGHT = [
  {
    id: 'nc-3',
    slug: 'safari-twill-overshirt',
    title: 'Canyon Twill Shirt',
    colors: '2 Colors',
    priceINR: 1750,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&auto=format&fit=crop&q=80',
  },
  {
    id: 'nc-4',
    slug: 'linen-relaxed-yellow',
    title: 'Lauro Soft Shirt',
    colors: '3 Colors',
    priceINR: 1300,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&auto=format&fit=crop&q=80',
  },
];

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
  const { isInWishlist, toggleWishlist, addToCart } = useStore();

  // Video Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Collection');
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Auto-advance video carousel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Synchronize video play state when slide changes
  useEffect(() => {
    videoRefs.current.forEach((vid, index) => {
      if (!vid) return;
      if (index === activeSlide) {
        vid.currentTime = 0;
        if (isPlaying) {
          vid.play().catch(() => {});
        }
      } else {
        vid.pause();
      }
    });
  }, [activeSlide, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      const currentVid = videoRefs.current[activeSlide];
      if (currentVid) {
        if (next) {
          currentVid.play().catch(() => {});
        } else {
          currentVid.pause();
        }
      }
      return next;
    });
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      videoRefs.current.forEach((vid) => {
        if (vid) vid.muted = next;
      });
      return next;
    });
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Filter best sellers
  const filteredProducts =
    activeCategory === 'All Collection'
      ? BEST_SELLING_PRODUCTS
      : BEST_SELLING_PRODUCTS.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col bg-store-canvas text-store-text-primary selection:bg-store-action-primary selection:text-white">
      <BrandIntro />
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* =========================================================================
            SECTION 1: HERO VIDEO CAROUSEL (Figma Lifestyle Specimen + Public Videos)
            ========================================================================= */}
        <section
          aria-label="Hero Video Carousel"
          className="relative w-full overflow-hidden bg-primary-dark hero-viewport-height flex items-center border-b border-store-border select-none"
        >
          {/* Background Video Elements */}
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === activeSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10 pointer-events-none'
              }`}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={slide.videoSrc}
                autoPlay={index === 0}
                loop
                muted={isMuted}
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Cinematic Scrim Gradient (Guarantee 100% WCAG 2.1 AA Text Contrast) */}
          <div className="absolute inset-0 hero-scrim-horizontal z-10 pointer-events-none" />
          <div className="absolute inset-0 hero-scrim-gradient z-10 pointer-events-none" />

          {/* Carousel Text & Content Overlay */}
          <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
            <div className="max-w-2xl space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
                <Sparkles size={14} className="text-store-gold" />
                <span>{HERO_SLIDES[activeSlide].badge}</span>
              </div>

              {/* Heading */}
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
                {HERO_SLIDES[activeSlide].title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-white/80 max-w-xl leading-relaxed font-sans font-normal">
                {HERO_SLIDES[activeSlide].subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <Link
                  href={HERO_SLIDES[activeSlide].ctaHref}
                  className="inline-flex items-center gap-2.5 px-8 h-12 rounded-full bg-white text-primary-dark font-sans font-semibold text-sm hover:bg-store-cream active:scale-95 transition-all shadow-md"
                >
                  <span>{HERO_SLIDES[activeSlide].ctaText}</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-7 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-sans font-medium text-sm hover:bg-white/20 active:scale-95 transition-all"
                >
                  <span>The POD Manifesto</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Floating Carousel Controls & Segment Indicators */}
          <div className="absolute bottom-6 inset-x-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Slide Progress Lines (Best-in-class e-commerce indicators) */}
            <div className="flex items-center gap-3 w-full sm:w-auto" role="tablist" aria-label="Hero carousel slides">
              {HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeSlide}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className="group flex flex-col gap-1.5 cursor-pointer py-2 focus:outline-hidden"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-2xs font-bold tracking-wider transition-colors ${
                        index === activeSlide ? 'text-white' : 'text-white/40'
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <div className="w-12 sm:w-16 h-1 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className={`h-full bg-white transition-all duration-300 ${
                        index === activeSlide ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Play/Pause, Audio Mute, and Slide Arrows */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                aria-label={isPlaying ? 'Pause carousel auto-play' : 'Resume carousel auto-play'}
                onClick={togglePlayPause}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 active:scale-90 transition-all cursor-pointer"
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              </button>

              <button
                type="button"
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 active:scale-90 transition-all cursor-pointer"
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              <div className="w-px h-5 bg-white/20 mx-1" />

              <button
                type="button"
                aria-label="Previous slide"
                onClick={handlePrevSlide}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 active:scale-90 transition-all cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                aria-label="Next slide"
                onClick={handleNextSlide}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 active:scale-90 transition-all cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: EXPLORE OUR BEST SELLING PRODUCT COLLECTION (Figma Specimen)
            ========================================================================= */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-store-border">
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
                  className="group flex flex-col bg-store-surface rounded-2xl border border-store-border overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  {/* Image Container */}
                  <div className="relative aspect-card-tall w-full bg-store-cream overflow-hidden">
                    <Link href={`/products/${item.slug}`} className="block w-full h-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>

                    {/* Wishlist Heart Button */}
                    <button
                      type="button"
                      aria-label={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(item.id);
                      }}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs border border-store-border flex items-center justify-center text-store-text-primary hover:bg-white active:scale-90 transition-transform cursor-pointer shadow-xs"
                    >
                      <Heart
                        size={16}
                        className={isFav ? 'fill-secondary-purple text-secondary-purple' : 'text-store-text-primary'}
                      />
                    </button>

                    {item.isBestseller && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="dark" size="sm">
                          Bestseller
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-sans font-bold text-sm text-store-text-primary">
                        <Link href={`/products/${item.slug}`} className="hover:underline">
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
            <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                We Deliver Exceptional
                <br />
                Customer Experiences
              </h2>
              <p className="text-sm text-white/70 font-sans leading-relaxed">
                Take advantage of our dedicated customer service team ready to assist with any
                questions or issues you may encounter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
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
            SECTION 4: EXPLORE OUR NEW COLLECTION (Asymmetric / Masonry Layout)
            ========================================================================= */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-store-border">
          {/* Header Row */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-2xs font-bold uppercase tracking-widest text-store-text-secondary block mb-2 font-sans">
                Curated Aesthetics
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-store-text-primary">
                Explore Our New Collection
              </h2>
              <p className="text-sm text-store-text-secondary font-sans mt-2 max-w-lg">
                Discover curated items with minimal aesthetics tailored for the modern daily spirit.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous collection"
                className="w-10 h-10 rounded-full border border-store-border bg-store-surface hover:bg-store-cream flex items-center justify-center text-store-text-primary transition-colors cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next collection"
                className="w-10 h-10 rounded-full bg-store-action-primary text-white hover:bg-store-action-hover flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Asymmetric 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Left Col: 2 Stacked Cards */}
            <div className="flex flex-col gap-6 justify-between">
              {NEW_COLLECTION_LEFT.map((card) => (
                <div
                  key={card.id}
                  className="group bg-store-surface rounded-2xl border border-store-border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-card-tall w-full bg-store-cream overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      type="button"
                      aria-label="Save to wishlist"
                      onClick={() => toggleWishlist(card.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-store-border flex items-center justify-center text-store-text-primary hover:bg-white transition-all shadow-xs"
                    >
                      <Heart size={14} className={isInWishlist(card.id) ? 'fill-secondary-purple text-secondary-purple' : ''} />
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-store-text-primary">{card.title}</h4>
                      <p className="text-2xs text-store-text-secondary">{card.colors}</p>
                    </div>
                    <span className="font-heading font-extrabold text-xs text-store-text-primary tuw-tabular-nums">
                      {formatINR(card.priceINR * 100)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Center Col: Tall Feature Hero Card */}
            <div className="group bg-store-surface rounded-2xl border border-store-border overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="relative w-full flex-1 aspect-asymmetric-tall bg-store-cream overflow-hidden">
                <img
                  src={NEW_COLLECTION_CENTER.image}
                  alt={NEW_COLLECTION_CENTER.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  type="button"
                  aria-label="Save to wishlist"
                  onClick={() => toggleWishlist(NEW_COLLECTION_CENTER.id)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 border border-store-border flex items-center justify-center text-store-text-primary hover:bg-white transition-all shadow-xs"
                >
                  <Heart
                    size={16}
                    className={isInWishlist(NEW_COLLECTION_CENTER.id) ? 'fill-secondary-purple text-secondary-purple' : ''}
                  />
                </button>
                <div className="absolute top-4 left-4">
                  <Badge variant="dark" size="sm">
                    Signature Drop
                  </Badge>
                </div>
              </div>

              <div className="p-5 flex items-center justify-between bg-white border-t border-store-border">
                <div>
                  <h4 className="font-heading font-bold text-sm text-store-text-primary">
                    {NEW_COLLECTION_CENTER.title}
                  </h4>
                  <p className="text-xs text-store-text-secondary mt-0.5">
                    {NEW_COLLECTION_CENTER.colors}
                  </p>
                </div>
                <span className="font-heading font-extrabold text-base text-store-text-primary tuw-tabular-nums">
                  {formatINR(NEW_COLLECTION_CENTER.priceINR * 100)}
                </span>
              </div>
            </div>

            {/* Right Col: 2 Stacked Cards */}
            <div className="flex flex-col gap-6 justify-between">
              {NEW_COLLECTION_RIGHT.map((card) => (
                <div
                  key={card.id}
                  className="group bg-store-surface rounded-2xl border border-store-border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-card-tall w-full bg-store-cream overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      type="button"
                      aria-label="Save to wishlist"
                      onClick={() => toggleWishlist(card.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 border border-store-border flex items-center justify-center text-store-text-primary hover:bg-white transition-all shadow-xs"
                    >
                      <Heart size={14} className={isInWishlist(card.id) ? 'fill-secondary-purple text-secondary-purple' : ''} />
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-store-text-primary">{card.title}</h4>
                      <p className="text-2xs text-store-text-secondary">{card.colors}</p>
                    </div>
                    <span className="font-heading font-extrabold text-xs text-store-text-primary tuw-tabular-nums">
                      {formatINR(card.priceINR * 100)}
                    </span>
                  </div>
                </div>
              ))}
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
            SECTION 6: STRATOSPHERE LIFESTYLE BANNER (Figma Full-Width Specimen)
            ========================================================================= */}
        <section className="relative overflow-hidden py-24 sm:py-36 bg-primary-dark text-white text-center">
          {/* Full-width Lifestyle Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=1600&auto=format&fit=crop&q=80"
              alt="Lifestyle Editorial Stratosphere"
              className="w-full h-full object-cover opacity-35"
            />
          </div>

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

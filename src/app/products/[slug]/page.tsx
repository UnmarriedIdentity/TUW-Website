'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import ProductGallery from '@/components/commerce/ProductGallery';
import VariantSelector from '@/components/commerce/VariantSelector';
import ProductCard from '@/components/commerce/ProductCard';
import { useStore } from '@/mocks/store';
import { ProductColor } from '@/lib/types';
import {
  Truck,
  RefreshCw,
  CheckCircle,
  ChevronDown,
  Star,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Coffee,
  HeartHandshake,
} from 'lucide-react';

interface ReviewItem {
  id: string;
  author: string;
  role: string;
  verified: boolean;
  rating: number;
  date: string;
  title: string;
  content: string;
  variant: string;
}

// 1. Shirt / Apparel Reviews
const SHIRT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-s1',
    author: 'Isabella Rodriguez',
    role: 'Architect & Spatial Designer',
    verified: true,
    rating: 5,
    date: 'October 18, 2026',
    title: 'Incredible loopback terry drape',
    content:
      'The weight is uncompromising. You immediately feel the density of the custom-milled organic cotton. It holds an architectural silhouette all day without buckling.',
    variant: 'Size L • Vintage Black',
  },
  {
    id: 'rev-s2',
    author: 'Gabrielle Williams',
    role: 'Creative Director, Studio Monolith',
    verified: true,
    rating: 5,
    date: 'October 14, 2026',
    title: 'The perfect unbranded luxury staple',
    content:
      'No screaming logos, no artificial polyester sheen. Just pure, dense combed cotton that feels substantial and honest. The collar construction is the best I have experienced.',
    variant: 'Size M • Washed Slate',
  },
  {
    id: 'rev-s3',
    author: 'Samantha Johnson',
    role: 'Founder, Nordic Living',
    verified: true,
    rating: 4,
    date: 'October 09, 2026',
    title: 'Exceeded expectations in fabric permanence',
    content:
      'Washed it multiple times now on cold gentle cycle — zero shrinkage and zero seam twisting. The zero-deadstock POD model is the true definition of modern luxury.',
    variant: 'Size S • Bone White',
  },
  {
    id: 'rev-s4',
    author: 'Victoria Thompson',
    role: 'Senior Textile Curator',
    verified: true,
    rating: 5,
    date: 'September 28, 2026',
    title: 'Quiet permanence personified',
    content:
      'Dense, heavy, and thoughtfully cut. The dropped shoulder and neckline drape naturally without needing synthetic elastane. A masterclass in minimalist tailoring.',
    variant: 'Size XL • Vintage Black',
  },
];

// 2. Mug / Object Reviews
const MUG_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-m1',
    author: 'Marcus Vance',
    role: 'Industrial Designer, Oona Studio',
    verified: true,
    rating: 5,
    date: 'October 21, 2026',
    title: 'Substantial hand-weight & tactile matte finish',
    content:
      'The 380-gram dry weight feels grounded and purposeful on my workspace desk. The matte glaze does not show fingerprints, and the two-finger handle balance is ergonomic perfection.',
    variant: 'Standard (350 ml) • Matte Charcoal',
  },
  {
    id: 'rev-m2',
    author: 'Elena Rostova',
    role: 'Ceramics Enthusiast & Architect',
    verified: true,
    rating: 5,
    date: 'October 15, 2026',
    title: 'Withstood daily dishwasher cycles effortlessly',
    content:
      'Fired at high temperatures as advertised. Glaze has zero crazing or dullness after two weeks of daily espresso and upper-rack dishwasher runs. The raw clay foot is a gorgeous touch.',
    variant: 'Studio Grande (450 ml) • Matte Charcoal',
  },
  {
    id: 'rev-m3',
    author: 'Devon Hayes',
    role: 'Creative Director, Slow Coffee Journal',
    verified: true,
    rating: 5,
    date: 'October 11, 2026',
    title: 'Holds brewing temperature exceptionally well',
    content:
      'Dense stoneware walls keep my pour-over brew warm for over 35 minutes. No metallic aftertaste, clean drinking lip geometry, and subtle tone-on-tone stag emblem.',
    variant: 'Standard (350 ml) • Bone White',
  },
  {
    id: 'rev-m4',
    author: 'Aria Patel',
    role: 'Interior Stylist',
    verified: true,
    rating: 4,
    date: 'September 29, 2026',
    title: 'Minimalist desk sculpture as much as a mug',
    content:
      'Beautiful proportions that look striking on open studio shelving. Packaged in completely recyclable molded paper pulp with zero plastic tape.',
    variant: 'Studio Grande (450 ml) • Raw Terracotta',
  },
];

// 3. Kids Organic Cotton Reviews
const KIDS_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-k1',
    author: 'Meera Kapur',
    role: 'Mother of two & Pediatric Nurse',
    verified: true,
    rating: 5,
    date: 'October 22, 2026',
    title: 'Zero scratchy tags — gentle on eczema-prone skin',
    content:
      'My 4-year-old usually complains about neck tags and seam friction. The flatlock stitching and screenprinted interior label on this tee are completely irritation-free. Ultra-soft combed cotton.',
    variant: '4-5Y (104-110cm) • Royal Blue',
  },
  {
    id: 'rev-k2',
    author: 'David Chen',
    role: 'Architect & Father',
    verified: true,
    rating: 5,
    date: 'October 16, 2026',
    title: 'Survived 20 wash cycles without shrinking',
    content:
      'Kids clothes often warp after a few tumble dries, but the pre-shrunk organic jersey holds its square shape and neckline stretch. The jumping stag graphic hasn’t cracked at all.',
    variant: '6-7Y (116-122cm) • Royal Blue',
  },
  {
    id: 'rev-k3',
    author: 'Priya Sharma',
    role: 'Sustainable Living Advocate',
    verified: true,
    rating: 5,
    date: 'October 12, 2026',
    title: 'GOTS organic certified reassurance',
    content:
      'Knowing that zero toxic azo dyes or formaldehyde were used gives immense peace of mind. Generous room to crawl, run, and play without restrictive armholes.',
    variant: '2-3Y (92-98cm) • Sage Mist',
  },
  {
    id: 'rev-k4',
    author: 'Liam O’Connor',
    role: 'Product Designer',
    verified: true,
    rating: 5,
    date: 'October 03, 2026',
    title: 'Vibrant royal blue and wonderful drape',
    content:
      'The shade is rich without feeling neon. Easy over-the-head stretch neckline means zero morning dressing meltdowns. Will definitely order the next size up when he grows.',
    variant: '4-5Y (104-110cm) • Bone White',
  },
];

// Sizing Charts
const SHIRT_MEASUREMENTS = [
  { size: 'XS', chest: 108, length: 66, shoulder: 54, sleeve: 59 },
  { size: 'S', chest: 114, length: 69, shoulder: 57, sleeve: 61 },
  { size: 'M', chest: 120, length: 72, shoulder: 60, sleeve: 63 },
  { size: 'L', chest: 126, length: 74, shoulder: 63, sleeve: 64 },
  { size: 'XL', chest: 132, length: 76, shoulder: 66, sleeve: 65 },
  { size: 'XXL', chest: 138, length: 78, shoulder: 69, sleeve: 66 },
];

const KIDS_MEASUREMENTS = [
  { age: '2-3 Years', height: '92 - 98', chest: 54, waist: 51, weight: '12 - 14.5 kg' },
  { age: '4-5 Years', height: '104 - 110', chest: 58, waist: 53, weight: '15 - 18.5 kg' },
  { age: '6-7 Years', height: '116 - 122', chest: 62, waist: 56, weight: '19 - 22.5 kg' },
  { age: '8-9 Years', height: '128 - 134', chest: 66, waist: 59, weight: '23 - 28 kg' },
  { age: '10-11 Years', height: '140 - 146', chest: 71, waist: 62, weight: '29 - 35 kg' },
];

const MUG_SPECS = [
  {
    label: 'Standard Brim Volume',
    metric: '350 ml',
    imperial: '12 fl oz',
    note: 'Ideal for espresso flat white & drip',
  },
  {
    label: 'Grande Brim Volume',
    metric: '450 ml',
    imperial: '15 fl oz',
    note: 'Generous morning pour-over volume',
  },
  {
    label: 'Vessel Height',
    metric: '9.5 cm',
    imperial: '3.7 inches',
    note: 'Fits under standard portafilters',
  },
  {
    label: 'Upper Rim Diameter',
    metric: '8.2 cm',
    imperial: '3.2 inches',
    note: 'Ergonomic smooth drinking lip',
  },
  {
    label: 'Unladen Dry Weight',
    metric: '380 grams',
    imperial: '13.4 oz',
    note: 'Grounded weighted bottom stability',
  },
  {
    label: 'Kiln Firing Temperature',
    metric: '1,240°C',
    imperial: '2,264°F',
    note: 'Fully vitrified non-porous ceramic',
  },
  {
    label: 'Care Certification',
    metric: 'Dishwasher & Microwave',
    imperial: '100% Certified Safe',
    note: 'Lead-free & cadmium-free food glaze',
  },
];

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const { getProductBySlug, products } = useStore();

  const product = getProductBySlug(resolvedParams.slug);

  // Maintain active color selection synchronized with gallery
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product ? product.colors[0] : undefined
  );

  // Measurement unit toggle (CM vs Inches / Metric vs Imperial)
  const [measurementUnit, setMeasurementUnit] = useState<'cm' | 'in'>('cm');

  // FAQ expanded state
  const [activeFaq, setActiveFaq] = useState<number>(2);

  // Accordion state for product details
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  // Write a Review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-store-canvas">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-heading font-medium uppercase tracking-wide text-store-text-primary">
            Piece Not Found
          </h1>
          <p className="text-sm text-store-text-secondary mt-2">
            The requested piece could not be located in our active catalog.
          </p>
          <div className="mt-6">
            <Link
              href="/shop"
              className="inline-flex px-6 py-3 rounded-full bg-store-charcoal text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
            >
              Browse All Pieces
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 1. Template Classification (Matching Figma Node 354:24651 FINAL PDP)
  const isKids =
    product.category === 'kids' ||
    product.slug.includes('kids') ||
    product.sizes.some((s) => s.size.includes('Y'));

  const isMug =
    product.slug.includes('mug') ||
    product.slug.includes('cup') ||
    (product.category === 'accessories' && product.sizes.some((s) => s.size.includes('ml')));

  const templateType: 'shirt' | 'mug' | 'kids' = isKids ? 'kids' : isMug ? 'mug' : 'shirt';

  // 2. Reviews dataset based on category
  const activeReviews =
    templateType === 'kids'
      ? KIDS_REVIEWS
      : templateType === 'mug'
      ? MUG_REVIEWS
      : SHIRT_REVIEWS;

  const ratingScore = templateType === 'shirt' ? '4.6' : '4.8';
  const reviewsCount =
    templateType === 'kids' ? '86' : templateType === 'mug' ? '94' : '128';

  // 3. Related "Pairs Well With" items (4 cards matching Figma)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .filter((p) => {
      if (templateType === 'kids') {
        return p.category === 'kids' || p.slug.includes('kids') || true;
      }
      if (templateType === 'mug') {
        return p.category === 'accessories' || p.slug.includes('tote') || true;
      }
      return p.category === 'hoodies' || p.category === 'tees' || p.category === 'pants';
    })
    .slice(0, 4);

  const activeColor = selectedColor || product.colors[0];

  const discountPercent =
    product.compareAtPriceINR && product.compareAtPriceINR > product.priceINR
      ? Math.round(
          ((product.compareAtPriceINR - product.priceINR) / product.compareAtPriceINR) * 100
        )
      : null;

  const toInches = (cm: number) => (cm / 2.54).toFixed(1);

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="min-h-screen flex flex-col bg-store-canvas">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb Trail */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Catalog', href: '/shop' },
              {
                label:
                  templateType === 'kids'
                    ? 'Kids Atelier'
                    : templateType === 'mug'
                    ? 'Utilitarian Objects'
                    : 'Apparel',
                href: `/shop?category=${product.category}`,
              },
              { label: product.title },
            ]}
          />
        </div>

        {/* ======================================================== */}
        {/* 1. HERO SECTION: Left Gallery (7 cols) + Right Buy Box (5 cols) */}
        {/* Matching Figma Node 354:24651 FINAL PDP Layout Invariant */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Quad Photo Gallery (7 cols on lg) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              title={product.title}
              videoUrl={product.videoUrl}
              selectedColorValue={activeColor.value}
            />
          </div>

          {/* Right Column: Sticky Purchase Rail (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-store-muted block mb-2">
                {templateType === 'kids'
                  ? 'The Unplugged Wear • Little Atelier Kids'
                  : templateType === 'mug'
                  ? 'The Unplugged Wear • Living & Utilitarian Objects'
                  : 'The Unplugged Wear • Atelier Drop'}
              </span>

              <div className="flex items-center gap-2 mb-2.5">
                {product.isNew && <Badge variant="dark">New Arrival</Badge>}
                {product.sustainabilityBadge && (
                  <Badge variant="outline">{product.sustainabilityBadge}</Badge>
                )}
                <span className="text-xs uppercase tracking-wider text-store-muted font-semibold">
                  SKU: {product.id.toUpperCase()}-POD
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-heading font-medium uppercase tracking-wide text-store-text-primary">
                {product.title}
              </h1>
              <p className="text-sm font-medium text-store-text-secondary mt-1">
                {product.subtitle}
              </p>

              {/* Atelier Rating Badge */}
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex text-store-gold text-xs tracking-tight">
                  ★★★★★
                </div>
                <a
                  href="#reviews"
                  className="text-xs text-store-text-secondary font-medium hover:text-store-charcoal hover:underline transition-colors"
                >
                  {ratingScore} ({reviewsCount} Verified{' '}
                  {templateType === 'kids'
                    ? 'Parent'
                    : templateType === 'mug'
                    ? 'Studio'
                    : 'Atelier'}{' '}
                  Reviews)
                </a>
              </div>

              {/* Price display */}
              <div className="flex flex-wrap items-baseline gap-3 mt-4">
                <span className="text-2xl sm:text-3xl font-bold text-store-text-primary">
                  ₹{product.priceINR.toLocaleString()}
                </span>
                {product.compareAtPriceINR && (
                  <span className="text-base text-store-muted line-through">
                    ₹{product.compareAtPriceINR.toLocaleString()}
                  </span>
                )}
                {discountPercent && (
                  <span className="text-xs font-bold text-store-terracotta bg-store-terracotta/10 px-2.5 py-0.5 rounded-full">
                    -{discountPercent}% OFF
                  </span>
                )}
              </div>
              <span className="text-xs text-emerald-700 font-medium block mt-1.5">
                Inclusive of all taxes & doorstep delivery eligibility
              </span>
            </div>

            {/* Narrative description */}
            <p className="text-sm text-store-text-secondary leading-relaxed">
              {product.description}
            </p>

            {/* Interactive Variant Selector (Color, Size/Capacity, Qty, Add to Bag) */}
            <div className="pt-2 border-t border-store-card-border">
              <VariantSelector
                product={product}
                selectedColor={activeColor}
                onColorChange={setSelectedColor}
              />
            </div>

            {/* Product Accordion Disclosures (Figma Hero Right Column) */}
            <div className="pt-4 border-t border-store-card-border space-y-2">
              {/* Accordion 1: Details */}
              <div className="border border-store-card-border rounded-xl bg-store-surface overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('details')}
                  className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider text-store-text-primary cursor-pointer hover:bg-store-cream transition-colors"
                >
                  <span>
                    {templateType === 'mug'
                      ? 'Object Details & Craft'
                      : templateType === 'kids'
                      ? 'Garment Details & Anti-Chafe Fit'
                      : 'Product Details & Cut'}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openAccordion === 'details' ? 'rotate-180 text-store-charcoal' : 'text-store-muted'
                    }`}
                  />
                </button>
                {openAccordion === 'details' && (
                  <div className="p-4 pt-0 text-xs text-store-text-secondary leading-relaxed border-t border-store-card-border bg-store-cream/40">
                    <ul className="space-y-1.5 list-disc list-inside mt-2">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Material & Safety */}
              <div className="border border-store-card-border rounded-xl bg-store-surface overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('material')}
                  className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider text-store-text-primary cursor-pointer hover:bg-store-cream transition-colors"
                >
                  <span>
                    {templateType === 'mug'
                      ? 'Stoneware Clay & Glaze Safety'
                      : templateType === 'kids'
                      ? '100% GOTS Certified Cotton'
                      : 'Composition & Fabric Weight'}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openAccordion === 'material' ? 'rotate-180 text-store-charcoal' : 'text-store-muted'
                    }`}
                  />
                </button>
                {openAccordion === 'material' && (
                  <div className="p-4 pt-0 text-xs text-store-text-secondary leading-relaxed border-t border-store-card-border bg-store-cream/40">
                    <p className="mt-2 font-medium text-store-text-primary">
                      {product.composition}
                    </p>
                    <p className="mt-1">
                      {templateType === 'mug'
                        ? 'High-density vitrified ceramic with non-toxic, lead-free mineral glaze formulation safe for high microwave heat.'
                        : templateType === 'kids'
                        ? 'Spun from long-staple organic fibers with zero harsh chemical pesticides or toxic fixation salts. Safe for direct skin contact.'
                        : 'Milled from high-density organic combed cotton with pre-shrunk treatment to maintain silhouette after laundering.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Care Guide */}
              <div className="border border-store-card-border rounded-xl bg-store-surface overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('care')}
                  className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider text-store-text-primary cursor-pointer hover:bg-store-cream transition-colors"
                >
                  <span>
                    {templateType === 'mug' ? 'Care & Dishwasher Instructions' : 'Laundering & Care Guide'}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openAccordion === 'care' ? 'rotate-180 text-store-charcoal' : 'text-store-muted'
                    }`}
                  />
                </button>
                {openAccordion === 'care' && (
                  <div className="p-4 pt-0 text-xs text-store-text-secondary leading-relaxed border-t border-store-card-border bg-store-cream/40">
                    <ul className="space-y-1.5 list-disc list-inside mt-2">
                      {product.careInstructions.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 4: Delivery & Returns */}
              <div className="border border-store-card-border rounded-xl bg-store-surface overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full px-4 py-3 text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider text-store-text-primary cursor-pointer hover:bg-store-cream transition-colors"
                >
                  <span>
                    {templateType === 'mug'
                      ? 'Fragile Packaging & Transit'
                      : 'Doorstep Delivery & Exchanges'}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openAccordion === 'shipping' ? 'rotate-180 text-store-charcoal' : 'text-store-muted'
                    }`}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="p-4 pt-0 text-xs text-store-text-secondary leading-relaxed border-t border-store-card-border bg-store-cream/40 space-y-1.5">
                    <p className="mt-2">
                      {templateType === 'mug'
                        ? 'Dispatched in reinforced molded pulp buffers with 100% zero-breakage transit guarantee.'
                        : 'Dispatched directly from regional distribution hubs with live SMS & tracking.'}
                    </p>
                    <p>
                      {templateType === 'kids'
                        ? '14-Day seamless size exchanges collected directly from your doorstep if child outgrows.'
                        : 'Hassle-free 14-day doorstep reverse collection across India.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. SPECIFIC MID-SECTION: SHIRT VS MUG VS KIDS FIT GUIDE */}
        {/* ======================================================== */}

        {/* 2A. PDP FOR SHIRT: Garment Measurement Table & Fit Guide */}
        {templateType === 'shirt' && (
          <section className="my-16 pt-8 border-t border-store-card-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-6">
              {/* Left: Fit Guide Description & Fit Scale */}
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs uppercase tracking-widest text-store-gold font-semibold block">
                  Fit Guide
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-medium uppercase tracking-wide text-store-text-primary">
                  Regular Fit, True to Size
                </h2>
                <p className="text-xs text-store-text-secondary leading-relaxed">
                  Engineered with a relaxed, architectural drape. Cut true to standard international sizing with generous chest room.
                </p>

                {/* Visual Fit Scale (Figma Node 354:24651) */}
                <div className="p-4 rounded-xl bg-store-cream border border-store-card-border space-y-2">
                  <div className="flex justify-between text-xs text-store-muted font-medium">
                    <span>Runs Small</span>
                    <span className="font-bold text-store-charcoal">True to Size</span>
                    <span>Runs Large</span>
                  </div>
                  <div className="relative h-2 rounded-full bg-store-card-border">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-store-charcoal border-2 border-white shadow-xs" />
                  </div>
                </div>

                <div className="text-xs text-store-muted">
                  Model is 185cm / 6&apos;1&quot; wearing size L
                </div>
              </div>

              {/* Right: Dimension Table with CM/IN Toggle */}
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-store-text-primary">
                    Flat Garment Dimensions
                  </h3>
                  {/* Unit Toggle */}
                  <div className="flex items-center p-1 rounded-xl bg-store-cream border border-store-card-border shrink-0">
                    <button
                      type="button"
                      onClick={() => setMeasurementUnit('cm')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        measurementUnit === 'cm'
                          ? 'bg-store-surface text-store-charcoal shadow-xs'
                          : 'text-store-muted hover:text-store-charcoal'
                      }`}
                    >
                      Centimeters (CM)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMeasurementUnit('in')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        measurementUnit === 'in'
                          ? 'bg-store-surface text-store-charcoal shadow-xs'
                          : 'text-store-muted hover:text-store-charcoal'
                      }`}
                    >
                      Inches (IN)
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-store-card-border bg-store-surface shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-store-cream border-b border-store-card-border font-bold text-store-charcoal uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">Size</th>
                        <th className="p-3.5">Chest Circumference</th>
                        <th className="p-3.5">Body Length</th>
                        <th className="p-3.5">Shoulder Width</th>
                        <th className="p-3.5">Sleeve Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-store-card-border font-medium text-store-text-secondary">
                      {SHIRT_MEASUREMENTS.map((row) => (
                        <tr key={row.size} className="hover:bg-store-canvas transition-colors">
                          <td className="p-3.5 font-bold text-store-charcoal">{row.size}</td>
                          <td className="p-3.5">
                            {measurementUnit === 'cm' ? `${row.chest} cm` : `${toInches(row.chest)}"`}
                          </td>
                          <td className="p-3.5">
                            {measurementUnit === 'cm' ? `${row.length} cm` : `${toInches(row.length)}"`}
                          </td>
                          <td className="p-3.5">
                            {measurementUnit === 'cm' ? `${row.shoulder} cm` : `${toInches(row.shoulder)}"`}
                          </td>
                          <td className="p-3.5">
                            {measurementUnit === 'cm' ? `${row.sleeve} cm` : `${toInches(row.sleeve)}"`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2B. PDP FOR MUG: Stoneware Ceramic Specifications Table */}
        {templateType === 'mug' && (
          <section className="my-16 pt-8 border-t border-store-card-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-6">
              {/* Left: Craft Guide & Handfeel Scale */}
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs uppercase tracking-widest text-store-gold font-semibold block">
                  Craft Guide
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-medium uppercase tracking-wide text-store-text-primary">
                  High-Fire Stoneware Ceramic
                </h2>
                <p className="text-xs text-store-text-secondary leading-relaxed">
                  Wheel-thrown and kiln-fired at 1,240°C for exceptional density and non-porous permanence. Ergonomic pulled handle and satin matte finish.
                </p>

                {/* Handfeel Weight Scale */}
                <div className="p-4 rounded-xl bg-store-cream border border-store-card-border space-y-2">
                  <div className="flex justify-between text-xs text-store-muted font-medium">
                    <span>Lightweight</span>
                    <span className="font-bold text-store-charcoal">Substantial (380g)</span>
                    <span>Heavy</span>
                  </div>
                  <div className="relative h-2 rounded-full bg-store-card-border">
                    <div className="absolute top-1/2 left-3/5 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-store-charcoal border-2 border-white shadow-xs" />
                  </div>
                </div>

                <div className="text-xs text-store-muted">
                  Handcrafted in verified small studio batches. Dishwasher & microwave tested.
                </div>
              </div>

              {/* Right: Object Specs Table */}
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-store-text-primary">
                    Dimensions & Vessel Specifications
                  </h3>
                  <Badge variant="outline">Kiln-Fired 1,240°C</Badge>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-store-card-border bg-store-surface shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-store-cream border-b border-store-card-border font-bold text-store-charcoal uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">Specification</th>
                        <th className="p-3.5">Metric</th>
                        <th className="p-3.5">Imperial</th>
                        <th className="p-3.5">Verification Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-store-card-border font-medium text-store-text-secondary">
                      {MUG_SPECS.map((spec) => (
                        <tr key={spec.label} className="hover:bg-store-canvas transition-colors">
                          <td className="p-3.5 font-bold text-store-charcoal">{spec.label}</td>
                          <td className="p-3.5">{spec.metric}</td>
                          <td className="p-3.5">{spec.imperial}</td>
                          <td className="p-3.5 text-store-muted">{spec.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2C. PDP FOR KIDS: Kids Growth Chart & Age Bracket Table */}
        {templateType === 'kids' && (
          <section className="my-16 pt-8 border-t border-store-card-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-6">
              {/* Left: Fit Guide Description & Growth Scale */}
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs uppercase tracking-widest text-store-gold font-semibold block">
                  Fit Guide
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-medium uppercase tracking-wide text-store-text-primary">
                  True to Age & Height
                </h2>
                <p className="text-xs text-store-text-secondary leading-relaxed">
                  Designed with room to play, crawl, and grow. Generous cut through chest and neckline for tear-free dressing.
                </p>

                {/* Kids Fit Scale */}
                <div className="p-4 rounded-xl bg-store-cream border border-store-card-border space-y-2">
                  <div className="flex justify-between text-xs text-store-muted font-medium">
                    <span>Slim Fit</span>
                    <span className="font-bold text-store-charcoal">Room to Grow</span>
                    <span>Oversized</span>
                  </div>
                  <div className="relative h-2 rounded-full bg-store-card-border">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-store-charcoal border-2 border-white shadow-xs" />
                  </div>
                </div>

                <div className="text-xs text-store-muted">
                  Tip: If between age brackets, we recommend choosing the larger size for extended wear.
                </div>
              </div>

              {/* Right: Kids Growth Table */}
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-store-text-primary">
                    Age & Height Growth Chart
                  </h3>
                  {/* Unit Toggle */}
                  <div className="flex items-center p-1 rounded-xl bg-store-cream border border-store-card-border shrink-0">
                    <button
                      type="button"
                      onClick={() => setMeasurementUnit('cm')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        measurementUnit === 'cm'
                          ? 'bg-store-surface text-store-charcoal shadow-xs'
                          : 'text-store-muted hover:text-store-charcoal'
                      }`}
                    >
                      Centimeters (CM)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMeasurementUnit('in')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        measurementUnit === 'in'
                          ? 'bg-store-surface text-store-charcoal shadow-xs'
                          : 'text-store-muted hover:text-store-charcoal'
                      }`}
                    >
                      Inches (IN)
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-store-card-border bg-store-surface shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-store-cream border-b border-store-card-border font-bold text-store-charcoal uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">Age Bracket</th>
                        <th className="p-3.5">Child Height</th>
                        <th className="p-3.5">Chest Width</th>
                        <th className="p-3.5">Waist</th>
                        <th className="p-3.5">Typical Weight</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-store-card-border font-medium text-store-text-secondary">
                      {KIDS_MEASUREMENTS.map((row) => (
                        <tr key={row.age} className="hover:bg-store-canvas transition-colors">
                          <td className="p-3.5 font-bold text-store-charcoal">{row.age}</td>
                          <td className="p-3.5">{row.height} cm</td>
                          <td className="p-3.5">
                            {measurementUnit === 'cm' ? `${row.chest} cm` : `${toInches(row.chest)}"`}
                          </td>
                          <td className="p-3.5">
                            {measurementUnit === 'cm' ? `${row.waist} cm` : `${toInches(row.waist)}"`}
                          </td>
                          <td className="p-3.5 text-store-muted">{row.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* 3. CUSTOMER REVIEWS & RATINGS BREAKDOWN (Figma Specimen) */}
        {/* ======================================================== */}
        <section id="reviews" className="my-16 pt-12 border-t border-store-card-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-store-gold font-semibold block mb-1">
                Verified Customer Experiences
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-medium uppercase tracking-wide text-store-text-primary">
                {templateType === 'kids'
                  ? 'Parent Reviews & Growth Feedback'
                  : templateType === 'mug'
                  ? 'Studio & Tableware Feedback'
                  : 'Customer Reviews & Atelier Feedback'}
              </h2>
            </div>
            <Button
              variant="dark"
              size="md"
              onClick={() => setIsReviewModalOpen(true)}
              icon={<MessageSquare size={16} />}
            >
              Write a Review
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Rating Breakdown Summary Panel (4 cols on lg) */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-store-cream border border-store-card-border space-y-6">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold font-heading text-store-text-primary">
                  {ratingScore}
                </span>
                <div>
                  <div className="flex text-store-gold text-sm tracking-tight">
                    ★★★★★
                  </div>
                  <span className="text-xs text-store-text-secondary block mt-0.5">
                    {reviewsCount} verified experiences
                  </span>
                </div>
              </div>

              {/* Progress bars matching Figma */}
              <div className="space-y-2.5 text-xs text-store-text-secondary">
                <div className="flex items-center gap-2">
                  <span className="w-12 shrink-0">5 Stars</span>
                  <div className="flex-1 h-2 rounded-full bg-store-card-border overflow-hidden">
                    <div className="h-full bg-store-charcoal w-11/12 rounded-full" />
                  </div>
                  <span className="w-8 text-right font-medium">91%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 shrink-0">4 Stars</span>
                  <div className="flex-1 h-2 rounded-full bg-store-card-border overflow-hidden">
                    <div className="h-full bg-store-charcoal w-1/12 rounded-full" />
                  </div>
                  <span className="w-8 text-right font-medium">7%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 shrink-0">3 Stars</span>
                  <div className="flex-1 h-2 rounded-full bg-store-card-border overflow-hidden">
                    <div className="h-full bg-store-charcoal w-0.5 rounded-full" />
                  </div>
                  <span className="w-8 text-right font-medium">2%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 shrink-0">2 Stars</span>
                  <div className="flex-1 h-2 rounded-full bg-store-card-border overflow-hidden">
                    <div className="h-full bg-store-charcoal w-0 rounded-full" />
                  </div>
                  <span className="w-8 text-right font-medium">0%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 shrink-0">1 Star</span>
                  <div className="flex-1 h-2 rounded-full bg-store-card-border overflow-hidden">
                    <div className="h-full bg-store-charcoal w-0 rounded-full" />
                  </div>
                  <span className="w-8 text-right font-medium">0%</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-store-surface border border-store-card-border text-xs text-store-text-secondary space-y-1">
                <span className="font-bold text-store-charcoal block">100% Authentic Feedback</span>
                <p>Only verified purchasers who received catalog orders can submit reviews.</p>
              </div>
            </div>

            {/* Review Cards Grid (8 cols on lg: 4 cards in 2x2 grid matching Figma) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-store-surface border border-store-card-border flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex text-store-gold text-xs tracking-tight">
                        ★★★★★
                      </div>
                      <span className="text-xs text-store-muted">{rev.date}</span>
                    </div>

                    <h4 className="text-sm font-bold text-store-charcoal mb-1.5">
                      {rev.title}
                    </h4>

                    <p className="text-xs text-store-text-secondary leading-relaxed mb-4">
                      {rev.content}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-store-card-border flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-store-charcoal block">
                        {rev.author}
                      </span>
                      <span className="text-store-muted">{rev.role}</span>
                    </div>
                    <Badge variant="success" size="sm">
                      Verified
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. "PAIRS WELL WITH" (4-Card Row matching Figma Node 354:24651) */}
        {/* ======================================================== */}
        {relatedProducts.length > 0 && (
          <section className="my-16 pt-12 border-t border-store-card-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-store-muted block mb-1">
                  {templateType === 'kids'
                    ? 'Kids Wardrobe Essentials'
                    : templateType === 'mug'
                    ? 'Studio Tableware Capsule'
                    : 'Complete The Outfit'}
                </span>
                <h2 className="text-2xl font-heading font-medium uppercase tracking-wide text-store-text-primary">
                  Pairs Well With
                </h2>
              </div>
              <Link
                href="/shop"
                className="px-5 py-2.5 rounded-full bg-store-charcoal text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
              >
                View Catalog
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* 5. FREQUENTLY ASKED QUESTIONS (Matching Figma Specimen) */}
        {/* ======================================================== */}
        <section className="my-16 pt-12 border-t border-store-card-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left title & context (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs uppercase tracking-widest text-store-gold font-semibold block">
                Atelier Specifications
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-medium uppercase tracking-wide text-store-text-primary">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-store-text-secondary leading-relaxed">
                Clear transparency on how our slow-living garments and studio objects are milled, crafted, and delivered to your doorstep.
              </p>
            </div>

            {/* Right Accordion List (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {/* FAQ 1 */}
              <div
                className={`rounded-2xl transition-all border ${
                  activeFaq === 0
                    ? 'bg-store-deep-teal text-white border-store-deep-teal p-6 shadow-xs'
                    : 'bg-store-surface border-store-card-border p-5 text-store-text-primary hover:border-store-charcoal'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === 0 ? -1 : 0)}
                  className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none"
                >
                  <span className="text-sm font-bold tracking-wide">
                    {templateType === 'mug'
                      ? 'Are the glazes 100% lead-free and food-safe?'
                      : 'How does TUW sizing compare to standard brands?'}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 shrink-0 ${
                      activeFaq === 0 ? 'rotate-180 text-store-gold' : 'text-store-muted'
                    }`}
                  />
                </button>
                {activeFaq === 0 && (
                  <div className="mt-3 text-xs leading-relaxed opacity-90 space-y-1.5">
                    {templateType === 'mug' ? (
                      <p>
                        Yes. Every batch is kiln-fired at 1,240°C with certified non-toxic, lead-free, and cadmium-free glazes. Completely safe for boiling liquids and daily microwave warming.
                      </p>
                    ) : (
                      <p>
                        Our garments are tailored with relaxed architectural proportions. If you prefer a tailored look, order your true size; for a statement slouchy silhouette, size up.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* FAQ 2 */}
              <div
                className={`rounded-2xl transition-all border ${
                  activeFaq === 1
                    ? 'bg-store-deep-teal text-white border-store-deep-teal p-6 shadow-xs'
                    : 'bg-store-surface border-store-card-border p-5 text-store-text-primary hover:border-store-charcoal'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === 1 ? -1 : 1)}
                  className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none"
                >
                  <span className="text-sm font-bold tracking-wide">
                    {templateType === 'mug'
                      ? 'What happens if a ceramic piece chips in transit?'
                      : 'Laundering and preserving natural cotton handfeel'}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 shrink-0 ${
                      activeFaq === 1 ? 'rotate-180 text-store-gold' : 'text-store-muted'
                    }`}
                  />
                </button>
                {activeFaq === 1 && (
                  <div className="mt-3 text-xs leading-relaxed opacity-90 space-y-1.5">
                    {templateType === 'mug' ? (
                      <p>
                        Every piece is enveloped in custom molded paper pulp cushioning. In the rare event of transit damage, we dispatch an immediate replacement at zero cost upon photo verification.
                      </p>
                    ) : (
                      <p>
                        Machine wash inside-out in cold water on gentle cycle. Hang or lay flat to dry in shade to preserve deep natural pigments and dense loopback fibers.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* FAQ 3 (Active Item in Deep Teal) */}
              <div
                className={`rounded-2xl transition-all border ${
                  activeFaq === 2
                    ? 'bg-store-deep-teal text-white border-store-deep-teal p-6 shadow-xs'
                    : 'bg-store-surface border-store-card-border p-5 text-store-text-primary hover:border-store-charcoal'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === 2 ? -1 : 2)}
                  className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none"
                >
                  <span className="text-sm font-bold tracking-wide">
                    Zero-Deadstock Sustainable Production Protocol
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 shrink-0 ${
                      activeFaq === 2 ? 'rotate-180 text-store-gold' : 'text-store-muted'
                    }`}
                  />
                </button>
                {activeFaq === 2 && (
                  <div className="mt-3 text-xs leading-relaxed opacity-90 space-y-2">
                    <p>
                      The Unplugged Wear operates on purposeful small-batch and zero-deadstock production. Every piece is custom-prepared upon order placement to eliminate overproduction waste.
                    </p>
                    <p>
                      <strong>Dispatch Window:</strong> Orders are cured, inspected, and dispatched within 24 to 48 hours via Delhivery surface express.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ 4 */}
              <div
                className={`rounded-2xl transition-all border ${
                  activeFaq === 3
                    ? 'bg-store-deep-teal text-white border-store-deep-teal p-6 shadow-xs'
                    : 'bg-store-surface border-store-card-border p-5 text-store-text-primary hover:border-store-charcoal'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === 3 ? -1 : 3)}
                  className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none"
                >
                  <span className="text-sm font-bold tracking-wide">
                    14-Day Doorstep Reverse Collection & Exchanges
                  </span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 shrink-0 ${
                      activeFaq === 3 ? 'rotate-180 text-store-gold' : 'text-store-muted'
                    }`}
                  />
                </button>
                {activeFaq === 3 && (
                  <div className="mt-3 text-xs leading-relaxed opacity-90 space-y-1.5">
                    <p>
                      We provide complimentary 14-day doorstep exchange and reverse collection across all serviceable pin codes in India.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. FULL-BLEED OUTDOOR LIFESTYLE BANNER (Figma Specimen) */}
        {/* ======================================================== */}
        <section className="relative my-16 rounded-3xl overflow-hidden bg-store-deep-teal text-white min-h-72 flex items-center justify-center text-center p-8 sm:p-14 shadow-xs">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-store-gold font-semibold block">
              The Unplugged Wear • Slow Living Luxury
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-medium uppercase tracking-wide text-white">
              Crafted for Quiet Permanence
            </h2>
            <p className="text-sm text-white/80 leading-relaxed max-w-lg mx-auto">
              Objects and garments made to outlast fast-fashion cycles. Dense natural fibers, lead-free ceramics, and purposeful daily design.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-store-charcoal font-bold text-xs uppercase tracking-wider hover:bg-store-cream transition-all active:scale-95 shadow-xs"
              >
                <span>Explore The Collection</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Review submission modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setReviewSubmitted(false);
        }}
        maxWidth="max-w-lg"
        title="Share Your Experience"
        subtitle={`Submit verified feedback for ${product.title}`}
      >
        {reviewSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle size={24} />
            </div>
            <h4 className="text-base font-bold text-store-charcoal">Review Received</h4>
            <p className="text-xs text-store-text-secondary max-w-xs mx-auto">
              Thank you for sharing your experience. Your verified review has been recorded.
            </p>
            <Button
              variant="dark"
              size="sm"
              onClick={() => {
                setIsReviewModalOpen(false);
                setReviewSubmitted(false);
              }}
            >
              Done
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setReviewSubmitted(true);
            }}
            className="space-y-4 pt-2"
          >
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-store-charcoal block mb-1">
                Your Rating
              </label>
              <div className="flex gap-1 text-store-gold text-lg cursor-pointer">
                ★★★★★
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-store-charcoal block mb-1">
                Headline
              </label>
              <input
                required
                placeholder="e.g. Exceptional weight and handfeel"
                className="w-full h-11 px-3 rounded-xl border border-store-card-border bg-store-surface text-xs text-store-charcoal focus:outline-none focus:border-store-charcoal"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-store-charcoal block mb-1">
                Detailed Comments
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe your tactile handfeel, durability, or sizing experience..."
                className="w-full p-3 rounded-xl border border-store-card-border bg-store-surface text-xs text-store-charcoal focus:outline-none focus:border-store-charcoal"
              />
            </div>

            <Button variant="dark" size="md" fullWidth type="submit">
              Submit Verified Feedback
            </Button>
          </form>
        )}
      </Modal>

      <Footer />
    </div>
  );
}

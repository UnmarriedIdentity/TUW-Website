'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import ProductGallery from '@/components/commerce/ProductGallery';
import VariantSelector from '@/components/commerce/VariantSelector';
import DynamicDataTable from '@/components/commerce/DynamicDataTable';
import DynamicAccordionFaq from '@/components/commerce/DynamicAccordionFaq';
import ProductReviews from '@/components/commerce/ProductReviews';
import RelatedProductsSection from '@/components/commerce/RelatedProductsSection';
import { EditorialFeatureSplit } from '@/components/editorial';
import { useStore } from '@/mocks/store';
import { ProductColor } from '@/lib/types';
import {
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

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
    product?.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );

  // Accordion state for product details
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');


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

  // 1. Template Classification
  const isKids =
    product.category === 'kids' ||
    product.slug.includes('kids') ||
    Boolean(product.sizes?.some((s) => s.size.includes('Y')));

  const isMug =
    product.slug.includes('mug') ||
    product.slug.includes('cup') ||
    (product.category === 'accessories' &&
      Boolean(product.sizes?.some((s) => s.size.includes('ml'))));

  const templateType: 'shirt' | 'mug' | 'kids' = isKids ? 'kids' : isMug ? 'mug' : 'shirt';

  // 2. "Pairs well with": real catalog pieces, photographed ones first
  const pairProducts = products
    .filter((p) => p.id !== product.id)
    .filter((p) =>
      templateType === 'shirt'
        ? ['hoodies', 'tees', 'pants'].includes(p.category)
        : true
    )
    .sort((a, b) => Number(b.images.length > 0) - Number(a.images.length > 0))
    .slice(0, 4);

  const activeColor = selectedColor || (product.colors && product.colors[0]);

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="min-h-screen flex flex-col bg-store-canvas">
      <Header />

      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10">
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
              selectedColorValue={activeColor?.value}
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

              {/* Price display */}
              <div className="flex flex-wrap items-baseline gap-3 mt-4">
                <span className="text-2xl sm:text-3xl font-bold text-store-text-primary">
                  ₹{product.priceINR.toLocaleString()}
                </span>
              </div>
              <span className="text-xs text-emerald-700 font-medium block mt-1.5">
                Inclusive of all taxes & doorstep delivery eligibility
              </span>
            </div>

            {/* Narrative description */}
            <p className="text-sm text-store-text-secondary leading-relaxed">
              {product.description}
            </p>

            {/* Interactive Variant Selector (Color, Size/Capacity, Radio Groups, Qty, Add to Bag) */}
            <div className="pt-2 border-t border-store-card-border">
              <VariantSelector
                product={product}
                selectedColor={activeColor}
                onColorChange={setSelectedColor}
              />
            </div>

            {/* Product Accordion Disclosures */}
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
                    {templateType === 'mug' ? 'Material' : 'Composition & Weight'}
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
                      {product.details.find((d) => d.startsWith('Approximate')) || ''}
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
                      Printed after you order by our print partner in Tiruppur, then shipped with tracking. Delivery usually takes 3-5 business days after dispatch (draft timeline).
                    </p>
                    <p>
                      Returns and exchanges follow our Returns &amp; Exchanges policy, which is still a draft.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. DYNAMIC SPECIFICATION / MEASUREMENT / TEXTURE TABLE */}
        {/* User Invariant: If specTable is null, the entire section is omitted */}
        {/* ======================================================== */}
        {product.specTable && (
          <section className="my-16 pt-8 border-t border-store-card-border">
            <DynamicDataTable table={product.specTable} />
          </section>
        )}

        {/* ======================================================== */}
        {/* 3. REUSABLE CUSTOMER REVIEWS & RATINGS BREAKDOWN */}
        {/* ======================================================== */}
        <ProductReviews reviews={[]} productTitle={product.title} />

        {/* ======================================================== */}
        {/* 4. 'PAIRS WELL WITH' — drawn from the live catalog */}
        {/* ======================================================== */}
        <RelatedProductsSection
          products={pairProducts}
          title="Pairs well with"
          catalogLink="/shop"
          catalogLabel="SHOP ALL"
        />

        {/* ======================================================== */}
        {/* 6. REUSABLE SPLIT FEATURE STORY (Figma Node 197:17352) */}
        {/* ======================================================== */}
        <EditorialFeatureSplit
          title="Products made with love."
          eyebrow="Atelier Craftsmanship"
          description="Every piece is printed only after you order it, by our print partner in Tiruppur. Nothing is made in advance, so nothing goes unsold."
          imageSrc="/images/editorial/products-made-with-love.png"
        />

        {/* ======================================================== */}
        {/* 7. DYNAMIC FREQUENTLY ASKED QUESTIONS */}
        {/* ======================================================== */}
        {product.faqs && product.faqs.length > 0 && (
          <DynamicAccordionFaq
            faqs={product.faqs}
            eyebrow="Atelier Specifications"
            title="Frequently Asked Questions"
            description="How your piece is made, cared for and delivered."
          />
        )}

        {/* ======================================================== */}
        {/* 6. FULL-BLEED OUTDOOR LIFESTYLE BANNER */}
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
              Everyday pieces printed with the leaping deer, made only after you order them.
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

      <Footer />
    </div>
  );
}

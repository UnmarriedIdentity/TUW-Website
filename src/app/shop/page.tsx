'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/commerce/ProductGrid';
import FilterBar, { FilterState } from '@/components/commerce/FilterBar';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { useStore } from '@/mocks/store';
import { ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import Link from 'next/link';

const availableCategories = [
  { value: '', label: 'View all' },
  { value: 'tees', label: 'T-shirts' },
  { value: 'hoodies', label: 'Hoodies & sweats' },
  { value: 'pants', label: 'Joggers' },
  { value: 'kids', label: 'Kids' },
  { value: 'wall-art', label: 'Wall art' },
  { value: 'accessories', label: 'Accessories' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  const { products } = useStore();

  const [filters, setFilters] = useState<FilterState>({
    category: categoryParam,
    size: '',
    color: '',
    sort: sortParam,
    price: '',
  });

  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (filters.category) {
      if (filters.category === 'kids') {
        result = result.filter(
          (p) => p.category === 'kids' || p.slug.includes('kids')
        );
      } else if (filters.category === 'wall-art') {
        result = result.filter(
          (p) =>
            p.slug.includes('frame') ||
            p.slug.includes('art') ||
            p.slug.includes('minimal')
        );
      } else {
        result = result.filter((p) => p.category === filters.category);
      }
    }

    // Filter by size
    if (filters.size) {
      result = result.filter((p) =>
        p.sizes.some((s) => s.size === filters.size && s.inStock)
      );
    }

    // Filter by color (supports multi-selection or matching values)
    if (filters.color) {
      const selectedColorValues = filters.color
        .toLowerCase()
        .split(',')
        .filter(Boolean);
      result = result.filter((p) =>
        p.colors.some((c) => {
          const val = c.value.toLowerCase();
          const name = c.name.toLowerCase();
          return selectedColorValues.some(
            (sc) =>
              val.includes(sc) ||
              name.includes(sc) ||
              sc.includes(val) ||
              sc.includes(name) ||
              (sc === 'black' && (val.includes('black') || val.includes('carbon'))) ||
              (sc === 'white' && (val.includes('white') || val.includes('bone') || val.includes('ecru'))) ||
              (sc === 'navy-blue' && (val.includes('navy') || val.includes('blue') || val.includes('slate'))) ||
              (sc === 'grey-melange' && (val.includes('grey') || val.includes('melange') || val.includes('slate'))) ||
              (sc === 'bottle-green' && (val.includes('green') || val.includes('olive'))) ||
              (sc === 'maroon' && (val.includes('maroon') || val.includes('burgundy'))) ||
              (sc === 'red' && (val.includes('red') || val.includes('maroon')))
          );
        })
      );
    }

    // Filter by price
    if (filters.price) {
      if (filters.price === 'under-1500') {
        result = result.filter((p) => p.priceINR < 1500);
      } else if (filters.price === '1500-3000') {
        result = result.filter((p) => p.priceINR >= 1500 && p.priceINR <= 3000);
      } else if (filters.price === '3000-5000') {
        result = result.filter((p) => p.priceINR > 3000 && p.priceINR <= 5000);
      } else if (filters.price === 'above-5000') {
        result = result.filter((p) => p.priceINR > 5000);
      }
    }

    // Sort
    if (filters.sort === 'price-low') {
      result.sort((a, b) => a.priceINR - b.priceINR);
    } else if (filters.sort === 'price-high') {
      result.sort((a, b) => b.priceINR - a.priceINR);
    } else if (filters.sort === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [products, filters]);

  const showEditorialBanners =
    !filters.category && !filters.size && !filters.color && !filters.price;

  return (
    <div className="w-full">
      {/* ======================================================== */}
      {/* 1. TOP ANNOUNCEMENT BANNER (< Discover the Acid Wash >)  */}
      {/* ======================================================== */}
      <div className="w-full bg-store-cream/70 border-b border-store-card-border/60 py-2.5 px-4 text-center">
        <div className="flex items-center justify-center gap-4 text-xs tracking-wider text-store-charcoal font-medium">
          <ChevronLeft size={14} className="text-store-muted cursor-pointer" />
          <Link
            href="/shop?category=hoodies"
            className="hover:underline transition-all"
          >
            Discover the Acid Wash Collection
          </Link>
          <ChevronRight size={14} className="text-store-muted cursor-pointer" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* ======================================================== */}
        {/* 2. FIGMA SHOP HEADER (Shop / New In)                     */}
        {/* ======================================================== */}
        <div className="text-center mb-8">
          <div className="mb-2">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Catalog' },
              ]}
              className="justify-center"
            />
          </div>
          <span className="text-xs uppercase tracking-widest text-store-muted font-medium block">
            Shop
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-medium tracking-tight text-store-charcoal mt-1">
            {filters.category
              ? availableCategories.find((c) => c.value === filters.category)?.label || 'Catalog'
              : 'New In'}
          </h1>
        </div>

        {/* ======================================================== */}
        {/* 3. CATEGORY PILLS & FILTER BAR                           */}
        {/* ======================================================== */}
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          resultCount={filteredProducts.length}
          availableCategories={availableCategories}
        />

        {/* ======================================================== */}
        {/* 4. PRODUCT GRID (WITH 2-ROW X 2-COL DARK BANNER)         */}
        {/* ======================================================== */}
        <div className="pt-6">
          <ProductGrid
            products={filteredProducts}
            showEditorialBanners={showEditorialBanners}
            onResetFilters={() =>
              setFilters({ category: '', size: '', color: '', sort: 'featured', price: '' })
            }
          />
        </div>

        {/* ======================================================== */}
        {/* 5. FIGMA TRUST PILLARS RIBBON                            */}
        {/* ======================================================== */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-store-card-border/80 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-store-cream flex items-center justify-center text-store-charcoal shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-store-charcoal">
                01. Zero Deadstock POD
              </h3>
              <p className="text-xs text-store-text-secondary mt-1 leading-relaxed">
                Every garment is constructed upon demand through ethical, localized ateliers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-store-cream flex items-center justify-center text-store-charcoal shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-store-charcoal">
                02. 500+ GSM Heavyweight
              </h3>
              <p className="text-xs text-store-text-secondary mt-1 leading-relaxed">
                Bespoke architectural textiles engineered for enduring drape and structure.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-store-cream flex items-center justify-center text-store-charcoal shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-store-charcoal">
                03. Doorstep Delivery
              </h3>
              <p className="text-xs text-store-text-secondary mt-1 leading-relaxed">
                Transparent chronological transit tracking powered by Delhivery Surface Express.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col bg-store-canvas">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="p-12 text-center text-sm text-store-muted">Loading catalog...</div>}>
          <ShopContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';
import EmptyState from '../ui/EmptyState';
import Skeleton from '../ui/Skeleton';
import TuwEmblem from '../layout/TuwEmblem';

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onResetFilters?: () => void;
  className?: string;
  showEditorialBanners?: boolean;
}

export default function ProductGrid({
  products,
  isLoading = false,
  emptyTitle = 'No garments match your filters',
  emptyDescription = 'Try removing some filters or exploring our other capsules.',
  onResetFilters,
  className = '',
  showEditorialBanners = false,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton variant="rect" className="aspect-[3/4] w-full rounded-2xl" />
            <Skeleton variant="text" className="w-3/4" />
            <Skeleton variant="text" className="w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onResetFilters ? 'Clear All Filters' : 'View All Apparel'}
        actionHref={!onResetFilters ? '/shop' : undefined}
        onAction={onResetFilters}
      />
    );
  }

  // If banners are disabled (e.g. filtered view), render standard grid
  if (!showEditorialBanners || products.length < 4) {
    return (
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  // =========================================================================
  // FIGMA SHOP ALL V4 EDITORIAL MAGAZINE GRID LAYOUT
  // Row 1 & 2: Products 0 & 1 (Col 1 & 2, Row 1), Products 2 & 3 (Col 1 & 2, Row 2)
  //            Col 3 & 4 (Rows 1 & 2): 2-Row x 2-Col Dark "Acid Wash Collection" Banner
  // Row 3:     Products 4, 5, 6, 7 (Full 4-column row)
  // Row 4 & 5: Col 1 & 2 (Rows 4 & 5): 2-Row x 2-Col Warm "The Minimal Frame" Story
  //            Col 3 & 4 (Rows 4 & 5): Products 8, 9, 10, 11
  // Row 6+:    Remaining catalog products
  // =========================================================================
  const card0 = products[0];
  const card1 = products[1];
  const card2 = products[2];
  const card3 = products[3];
  const middleRow = products.slice(4, 8);
  const card8 = products[8];
  const card9 = products[9];
  const card10 = products[10];
  const card11 = products[11];
  const remaining = products.slice(12);

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {/* ---------------------------------------------------- */}
      {/* ROW 1: Left 2 Cards (Cols 1 & 2, Row 1)              */}
      {/* ---------------------------------------------------- */}
      {card0 && <ProductCard product={card0} />}
      {card1 && <ProductCard product={card1} />}

      {/* ---------------------------------------------------- */}
      {/* FIGMA SHOP ALL V4: DARK BANNER (Cols 3 & 4, Rows 1 & 2) */}
      {/* Spans 2 Columns AND 2 Rows in height!                */}
      {/* ---------------------------------------------------- */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 rounded-2xl bg-primary-dark text-white p-8 sm:p-12 flex flex-col justify-between h-full min-h-[500px] lg:min-h-full relative overflow-hidden group">
        {/* Subtle Ambient Radial Wash */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-store-accent/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-secondary-mint font-semibold">
            Atelier Drop • Limited Release
          </span>
          <TuwEmblem className="w-8 h-8 text-white/50" />
        </div>

        {/* Center Artwork Graphic: Maroon Hoodie + Washed Tee with Deer Emblem */}
        <div className="relative z-10 my-auto py-8 flex items-center justify-center">
          {/* Burgundy/Maroon Hoodie (Behind) */}
          <div className="relative w-44 sm:w-56 aspect-[3/4] flex items-center justify-center -mr-10 sm:-mr-14">
            <svg
              viewBox="0 0 200 240"
              fill="none"
              className="w-full h-full drop-shadow-xl"
            >
              {/* Hoodie Body & Arms in Burgundy (#6E1E2A) */}
              <path
                d="M60 40 L40 60 L10 110 L30 120 L45 85 L45 220 L155 220 L155 85 L170 120 L190 110 L160 60 L140 40 Z"
                fill="#6E1E2A"
              />
              {/* Hood */}
              <path
                d="M60 45 C60 20, 140 20, 140 45 C130 55, 70 55, 60 45 Z"
                fill="#551520"
              />
              {/* Kangaroo Pocket */}
              <path
                d="M65 160 L135 160 L145 210 L55 210 Z"
                fill="#551520"
                opacity="0.8"
              />
              {/* Cords */}
              <line
                x1="85"
                y1="48"
                x2="85"
                y2="90"
                stroke="#FAF9F6"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
              <line
                x1="115"
                y1="48"
                x2="115"
                y2="90"
                stroke="#FAF9F6"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>
            {/* White Leaping Deer on Hoodie Chest */}
            <div className="absolute top-[38%] left-1/2 -translate-x-1/2 w-11 h-11 text-white pointer-events-none">
              <TuwEmblem className="w-full h-full text-white" />
            </div>
          </div>

          {/* Black Acid Wash Tee (In Front) */}
          <div className="relative w-36 sm:w-44 aspect-[3/4] flex items-center justify-center z-10 -ml-4">
            <svg
              viewBox="0 0 180 220"
              fill="none"
              className="w-full h-full drop-shadow-2xl"
            >
              {/* Washed Charcoal/Black Body (#1C1C1E) */}
              <path
                d="M50 35 L30 50 L10 90 L32 98 L44 75 L44 205 L136 205 L136 75 L148 98 L170 90 L150 50 L130 35 Z"
                fill="#1C1C1E"
              />
              {/* Crewneck Collar */}
              <path d="M56 35 C56 50, 124 50, 124 35 Z" fill="#2A2A2E" />
            </svg>
            {/* White Leaping Deer on Tee Chest */}
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-9 h-9 text-white pointer-events-none">
              <TuwEmblem className="w-full h-full text-white" />
            </div>
          </div>
        </div>

        {/* Bottom Editorial Copy matching Figma */}
        <div className="relative z-10 pt-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-medium tracking-wide text-white">
            Acid Wash Collection
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-2.5 max-w-sm leading-relaxed">
            A hoodie and an oversized tee on acid-washed blanks, printed with the deer.
          </p>
          <div className="mt-5">
            <Link
              href="/shop?category=hoodies"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white underline underline-offset-4 hover:text-secondary-mint transition-colors"
            >
              Discover the collection
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ROW 2: Bottom 2 Cards under Row 1 (Cols 1 & 2, Row 2) */}
      {/* ---------------------------------------------------- */}
      {card2 && <ProductCard product={card2} />}
      {card3 && <ProductCard product={card3} />}

      {/* ---------------------------------------------------- */}
      {/* ROW 3: Full 4-Card Row                               */}
      {/* ---------------------------------------------------- */}
      {middleRow.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {/* ---------------------------------------------------- */}
      {/* ROW 4 & 5: Warm Minimal Frame Banner (Cols 1 & 2)    */}
      {/* Spans 2 Columns AND 2 Rows in height!                */}
      {/* ---------------------------------------------------- */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 rounded-2xl bg-store-cream border border-store-card-border p-8 sm:p-12 flex flex-col justify-between h-full min-h-[500px] lg:min-h-full relative overflow-hidden group">
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-store-muted font-semibold">
            Conscious Craft • Zero Deadstock
          </span>
          <TuwEmblem className="w-8 h-8 text-store-charcoal/40" />
        </div>

        {/* Framed Graphic Frame */}
        <div className="relative z-10 my-auto py-8 flex items-center justify-center">
          <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-lg bg-store-charcoal p-2.5 shadow-xl flex items-center justify-center border-4 border-white">
            <div className="w-full h-full border border-white/20 flex flex-col items-center justify-center text-center p-3">
              <span className="text-2xs uppercase tracking-widest text-white/60">
                Atelier No. 01
              </span>
              <div className="w-12 h-12 my-2 text-white">
                <TuwEmblem className="w-full h-full text-white" />
              </div>
              <span className="text-xs font-heading text-white">100% Organic</span>
            </div>
          </div>
        </div>

        {/* Bottom Copy */}
        <div className="relative z-10 pt-4">
          <h2 className="text-3xl sm:text-4xl font-heading font-medium tracking-wide text-store-charcoal">
            The Minimal Frame
          </h2>
          <p className="text-xs sm:text-sm text-store-text-secondary mt-2.5 max-w-sm leading-relaxed">
            Every piece is cut, sewn, and numbered upon order demand to eliminate warehouse deadstock.
          </p>
          <div className="mt-5">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-store-charcoal underline underline-offset-4 hover:text-black transition-colors"
            >
              Discover our philosophy
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ROW 4 & 5: Right 4 Cards (Cols 3 & 4 for Rows 4 & 5) */}
      {/* ---------------------------------------------------- */}
      {card8 && <ProductCard product={card8} />}
      {card9 && <ProductCard product={card9} />}
      {card10 && <ProductCard product={card10} />}
      {card11 && <ProductCard product={card11} />}

      {/* ---------------------------------------------------- */}
      {/* ROW 6+: Remaining Products                           */}
      {/* ---------------------------------------------------- */}
      {remaining.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

export interface RelatedProductsSectionProps {
  products?: Product[];
  title?: string;
  eyebrow?: string;
  catalogLink?: string;
  catalogLabel?: string;
  className?: string;
}

export default function RelatedProductsSection({
  products,
  title = 'Pairs Well With',
  eyebrow = 'Complete The Outfit',
  catalogLink = '/shop',
  catalogLabel = 'View Catalog',
  className = '',
}: RelatedProductsSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className={`my-16 pt-12 border-t border-store-card-border ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          {eyebrow && (
            <span className="text-xs font-bold uppercase tracking-wider text-store-muted block mb-1">
              {eyebrow}
            </span>
          )}
          <h2 className="text-2xl font-heading font-medium uppercase tracking-wide text-store-text-primary">
            {title}
          </h2>
        </div>
        {catalogLink && (
          <Link
            href={catalogLink}
            className="px-5 py-2.5 rounded-full bg-store-charcoal text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors"
          >
            {catalogLabel}
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}


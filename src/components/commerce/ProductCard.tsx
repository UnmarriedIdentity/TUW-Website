'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/mocks/store';
import { formatINR } from '@/lib/format';
import ImageWithFallback from '../ui/ImageWithFallback';

export interface ProductCardProps {
  product: Product;
  className?: string;
  collectionName?: string;
}

// The collection each category is sold under (matches /collections).
const COLLECTION_BY_CATEGORY: Record<Product['category'], string> = {
  hoodies: 'Hoodies & Sweats',
  tees: 'Everyday Tees',
  pants: 'Joggers & Sweatpants',
  jackets: 'Outerwear',
  kids: 'Kids',
  accessories: 'Objects',
  mugs: 'Objects',
  capsules: 'Capsules',
};

// Shown on hover (and on keyboard focus). Both layers sit on top of existing
// space, so the card never changes height. Touch screens skip the hover layer
// and go straight to the product page, where size and colour are chosen.
const HOVER_LAYER =
  'opacity-0 pointer-events-none transition duration-300 ease-out group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto';

/**
 * Borderless product card from the Figma Website UI: photo on a warm grey
 * panel, wishlist heart, then collection, name and price. On hover the sizes
 * slide over the bottom of the photo for a quick add, and the collection line
 * turns into the colour swatches.
 */
export default function ProductCard({ product, className = '', collectionName }: ProductCardProps) {
  const { isInWishlist, toggleWishlist, addToCart } = useStore();
  const isFavorite = isInWishlist(product.id);
  const href = `/products/${product.slug}`;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.value || '');
  const [previewColor, setPreviewColor] = useState<string | null>(null);
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const activeColor =
    product.colors.find((c) => c.value === (previewColor || selectedColor)) || product.colors[0];
  const image =
    product.images.find((img) => img.color === activeColor?.value) || product.images[0];

  const collectionLabel =
    collectionName ||
    (product.title.startsWith('Acid Wash') ? 'Acid Wash Collection' : COLLECTION_BY_CATEGORY[product.category]);

  const quickAdd = (size: string) => {
    addToCart({
      productId: product.id,
      title: product.title,
      color: activeColor?.name || 'Standard',
      size,
      priceINR: product.priceINR,
      priceMinorINR: product.priceMinorINR,
      quantity: 1,
      image: image?.url || '',
    });
    setAddedSize(size);
    setTimeout(() => setAddedSize(null), 1500);
  };

  return (
    <article
      className={`@container group relative flex flex-col w-full bg-store-card-panel ${className}`}
      onMouseLeave={() => setPreviewColor(null)}
    >
      <button
        type="button"
        aria-label={isFavorite ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
        aria-pressed={isFavorite}
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className="absolute top-4 right-4 z-20 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/85 text-primary-dark hover:bg-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-store-gold"
      >
        <Heart
          size={20}
          strokeWidth={1.5}
          aria-hidden="true"
          className={isFavorite ? 'fill-store-terracotta text-store-terracotta' : ''}
        />
      </button>

      <div className="relative aspect-4/5 overflow-hidden">
        <ImageWithFallback
          src={image?.url || ''}
          alt=""
          fallbackText="Photo coming soon"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
        />

        {/* Quick add: sizes slide up over the bottom of the photo */}
        {product.sizes.length > 0 && (
          <div
            className={`absolute inset-x-0 bottom-0 z-20 translate-y-3 group-hover:translate-y-0 group-focus-within:translate-y-0 bg-white/95 backdrop-blur-xs px-3 py-2.5 ${HOVER_LAYER}`}
          >
            <p className="sr-only">
              Quick add {product.title} in {activeColor?.name}
            </p>
            <div className="flex items-center justify-between gap-1">
              {product.sizes.map((s) => (
                <button
                  key={s.size}
                  type="button"
                  disabled={!s.inStock}
                  onClick={() => quickAdd(s.size)}
                  aria-label={s.inStock ? `Add size ${s.size} to bag` : `Size ${s.size} sold out`}
                  className={`flex-1 min-h-8 rounded-md text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-store-gold disabled:cursor-not-allowed disabled:line-through disabled:opacity-40 ${
                    addedSize === s.size ? 'bg-primary-dark text-white' : 'text-primary-dark hover:bg-store-card-panel'
                  }`}
                >
                  {addedSize === s.size ? '✓' : s.size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Text follows the card width (container query), not the screen, so it fits 3 or 4 per row */}
      <div className="px-5 pt-5 pb-6 @[22rem]:px-6 space-y-1.5">
        {/* Collection line; on hover the colour swatches take its place */}
        <div className="relative h-6">
          <p className="absolute inset-0 flex items-center text-sm text-store-text-secondary truncate transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
            {collectionLabel}
          </p>
          {product.colors.length > 0 && (
            <div className={`absolute inset-0 z-20 flex items-center justify-between gap-3 ${HOVER_LAYER}`}>
              <div className="flex items-center gap-1.5" role="group" aria-label={`${product.title} colours`}>
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    aria-label={color.name}
                    aria-pressed={color.value === selectedColor}
                    onMouseEnter={() => setPreviewColor(color.value)}
                    onMouseLeave={() => setPreviewColor(null)}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-4 h-4 rounded-full border border-black/15 transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-store-gold ${
                      color.value === activeColor?.value
                        ? 'ring-1 ring-offset-2 ring-offset-store-card-panel ring-primary-dark'
                        : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
              <span className="text-sm text-store-text-secondary truncate">{activeColor?.name}</span>
            </div>
          )}
        </div>

        <h3 className="text-lg @[22rem]:text-xl font-medium text-primary-dark leading-snug">
          {/* Stretched link: the whole card opens the product */}
          <Link
            href={href}
            className="underline-offset-4 decoration-1 group-hover:underline focus-visible:outline-none focus-visible:underline after:absolute after:inset-0"
          >
            {product.title}
          </Link>
        </h3>
        <p className="text-base text-store-text-secondary tuw-tabular-nums">
          {formatINR(product.priceMinorINR ?? product.priceINR * 100).replace(/\.00$/, '')}
        </p>
      </div>
    </article>
  );
}

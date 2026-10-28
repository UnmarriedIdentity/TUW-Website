'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Heart, Ruler, Check, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Product, ProductColor, ProductSize } from '@/lib/types';
import { useStore } from '@/mocks/store';
import Button from '../ui/Button';
import SizeGuideModal from './SizeGuideModal';

export interface VariantSelectorProps {
  product: Product;
  selectedColor?: ProductColor;
  onColorChange?: (color: ProductColor) => void;
  selectedSize?: ProductSize | null;
  onSizeChange?: (size: ProductSize | null) => void;
}

export default function VariantSelector({
  product,
  selectedColor: controlledColor,
  onColorChange,
  selectedSize: controlledSize,
  onSizeChange,
}: VariantSelectorProps) {
  const router = useRouter();
  const { addToCart, isInWishlist, toggleWishlist } = useStore();

  const isMug =
    product.slug.includes('mug') ||
    product.slug.includes('cup') ||
    (product.category === 'accessories' && product.sizes.some((s) => s.size.includes('ml')));
  const isKids =
    product.category === 'kids' ||
    product.slug.includes('kids') ||
    product.sizes.some((s) => s.size.includes('Y'));

  const [internalColor, setInternalColor] = useState<ProductColor>(product.colors[0]);
  const [internalSize, setInternalSize] = useState<ProductSize | null>(
    product.sizes.find((s) => s.inStock) || null
  );

  const selectedColor = controlledColor !== undefined ? controlledColor : internalColor;
  const selectedSize = controlledSize !== undefined ? controlledSize : internalSize;

  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const isFavorite = isInWishlist(product.id);

  const handleColorSelect = (color: ProductColor) => {
    if (onColorChange) {
      onColorChange(color);
    } else {
      setInternalColor(color);
    }
  };

  const handleSizeSelect = (size: ProductSize) => {
    setValidationError(null);
    if (onSizeChange) {
      onSizeChange(size);
    } else {
      setInternalSize(size);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setValidationError(
        isMug ? 'Please choose a capacity to continue.' : 'Please choose a size to continue.'
      );
      return;
    }
    if (!selectedSize.inStock) {
      setValidationError(
        isMug ? 'This capacity is currently sold out.' : 'This size is currently sold out.'
      );
      return;
    }

    setValidationError(null);
    const activeImage =
      product.images.find((img) => img.color === selectedColor.value)?.url ||
      product.images[0]?.url;

    addToCart({
      productId: product.id,
      title: product.title,
      color: selectedColor.name,
      size: selectedSize.size,
      priceINR: product.priceINR,
      quantity,
      image: activeImage,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setValidationError(
        isMug ? 'Please choose a capacity to continue.' : 'Please choose a size to continue.'
      );
      return;
    }
    handleAddToCart();
    router.push('/checkout');
  };

  // Determine grid layout for size/capacity chips
  const sizeGridClass = isMug
    ? 'grid grid-cols-2 gap-3'
    : isKids
    ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2'
    : product.sizes.length <= 4
    ? 'grid grid-cols-2 sm:grid-cols-4 gap-2'
    : 'grid grid-cols-6 gap-2';

  const sizeLabel = isMug
    ? 'Capacity / Volume:'
    : isKids
    ? 'Age & Growth Size:'
    : 'Size:';

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Color / Glaze Selection */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2.5">
          <span className="text-store-text-secondary">
            {isMug ? 'Glaze Finish:' : 'Dye / Shade:'}{' '}
            <strong className="text-store-text-primary font-bold">
              {selectedColor.name}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {product.colors.map((color) => {
            const isSelected = selectedColor.value === color.value;
            return (
              <button
                key={color.value}
                type="button"
                onClick={() => handleColorSelect(color)}
                aria-label={`Select shade ${color.name}`}
                className={`relative w-8 h-8 rounded-full border transition-all cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-store-charcoal ring-offset-2 scale-105'
                    : 'border-black/20 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {isSelected && (
                  <Check
                    size={13}
                    className={`absolute inset-0 m-auto ${
                      color.value === 'bone-white' ||
                      color.value === 'raw-sand' ||
                      color.value === 'raw-ecru' ||
                      color.value === 'soft-heather'
                        ? 'text-black'
                        : 'text-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Size / Capacity Selection */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2.5">
          <span className="text-store-text-secondary">
            {sizeLabel}{' '}
            <strong className="text-store-text-primary font-bold">
              {selectedSize ? selectedSize.size : isMug ? 'Select capacity' : 'Select a size'}
            </strong>
          </span>

          {!isMug && (
            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-store-action-primary hover:text-store-gold transition-colors cursor-pointer lowercase first-letter:uppercase"
            >
              <Ruler size={13} />
              <span>{isKids ? 'Kids Growth Guide' : 'Size Guide'}</span>
            </button>
          )}
        </div>

        <div className={sizeGridClass}>
          {product.sizes.map((s) => {
            const isSelected = selectedSize?.size === s.size;
            return (
              <button
                key={s.size}
                type="button"
                disabled={!s.inStock}
                onClick={() => handleSizeSelect(s)}
                className={`${
                  isMug ? 'h-13 px-4 py-2' : isKids ? 'h-12 px-2 py-1' : 'h-11'
                } rounded-xl text-xs font-bold uppercase transition-all flex flex-col items-center justify-center cursor-pointer border ${
                  !s.inStock
                    ? 'opacity-40 cursor-not-allowed bg-store-canvas border-store-card-border line-through text-store-muted'
                    : isSelected
                    ? 'border-store-charcoal bg-store-charcoal text-white shadow-xs'
                    : 'border-store-card-border bg-store-surface text-store-text-primary hover:border-store-charcoal'
                }`}
              >
                <span className="text-center truncate w-full">{s.size}</span>
                {s.inStock && s.stockCount <= 3 && (
                  <span className="text-xs font-normal text-store-terracotta leading-none -mt-0.5">
                    {s.stockCount} left
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Real-time stock availability message */}
        {selectedSize && (
          <div className="mt-2 text-xs flex items-center gap-1.5">
            {selectedSize.inStock ? (
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <Check size={13} />
                In stock for next-day dispatch • {selectedSize.stockCount} {isMug ? 'vessels' : 'pieces'} allocated
              </span>
            ) : (
              <span className="text-red-700 font-medium flex items-center gap-1">
                <AlertCircle size={13} />
                Out of stock in {selectedSize.size}
              </span>
            )}
          </div>
        )}

        {validationError && (
          <div className="mt-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
            <AlertCircle size={14} />
            <span>{validationError}</span>
          </div>
        )}
      </div>

      {/* 3. Quantity & Purchase Actions */}
      <div className="space-y-3 pt-2">
        <div className="flex gap-3">
          {/* Quantity Selector */}
          <div className="flex items-center border border-store-card-border rounded-full bg-store-surface h-14 px-3 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
              className="w-8 h-8 flex items-center justify-center text-store-text-secondary hover:text-store-text-primary font-bold text-base cursor-pointer"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-bold text-store-text-primary">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                setQuantity(
                  selectedSize ? Math.min(selectedSize.stockCount, quantity + 1) : quantity + 1
                )
              }
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center text-store-text-secondary hover:text-store-text-primary font-bold text-base cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Add to Bag Button */}
          <Button
            variant="dark"
            size="lg"
            fullWidth
            onClick={handleAddToCart}
            icon={<ShoppingBag size={18} />}
          >
            Add to Bag • ₹{(product.priceINR * quantity).toLocaleString()}
          </Button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
            className="w-14 h-14 rounded-full border border-store-card-border bg-store-surface flex items-center justify-center text-store-charcoal hover:bg-store-cream transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            <Heart
              size={20}
              className={isFavorite ? 'fill-store-gold text-store-gold' : 'text-store-charcoal'}
            />
          </button>
        </div>

        {/* Buy Now Instant Action */}
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={handleBuyNow}
        >
          Express Checkout
        </Button>
      </div>

      {/* Guarantee Badge */}
      <div className="p-4 rounded-2xl bg-store-cream border border-store-card-border space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-store-text-primary">
          <ShieldCheck size={16} className="text-emerald-700" />
          <span>The Unplugged Wear Guarantee</span>
        </div>
        <ul className="space-y-1 text-store-text-secondary list-disc list-inside">
          {isMug ? (
            <>
              <li>High-fire 1,240°C durable stoneware ceramic</li>
              <li>100% Dishwasher safe, microwave safe, food-grade glaze</li>
              <li>Shatterproof recyclable protective transit packaging</li>
            </>
          ) : isKids ? (
            <>
              <li>100% GOTS certified organic long-staple combed cotton</li>
              <li>Skin-safe non-toxic inks & itch-free flatlock seams</li>
              <li>14-day hassle-free doorstep size exchanges across India</li>
            </>
          ) : (
            <>
              <li>Pre-shrunk 100% GOTS certified organic cotton</li>
              <li>Complimentary domestic delivery on orders over ₹3,000</li>
              <li>14-day hassle-free doorstep returns and exchanges</li>
            </>
          )}
        </ul>
      </div>

      {/* Size Guide Modal */}
      {!isMug && (
        <SizeGuideModal
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
          category={product.category}
        />
      )}
    </div>
  );
}

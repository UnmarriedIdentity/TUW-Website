'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  RefreshCw,
  Sparkles,
  PackageCheck,
  Mail,
  MapPin,
} from 'lucide-react';
import { useStore } from '@/mocks/store';
import TuwEmblem from './TuwEmblem';

export default function Footer() {
  const { scenario, setScenario, resetStoreData } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer aria-label="Site Footer" className="jitter-footer-shell pt-4 pb-0 select-none">
      {/* Upper Card: Scooped Ivory Canvas with Primary Directory & Disclosures (Z-index 20) */}
        <div className="jitter-footer-inner pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-t border-store-border">
          <div className="max-w-7xl mx-auto">
            {/* Top Grid: Brand Ethos + Navigation Directory */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-store-border">
              {/* Brand Statement Col */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2.5">
                  <TuwEmblem className="h-7 w-auto text-primary-dark" />
                  <span className="font-heading font-extrabold text-2xl tracking-tighter uppercase text-store-text-primary">
                    The Unplugged Wear
                  </span>
                </div>
                <p className="text-sm text-store-text-secondary max-w-sm leading-relaxed font-sans font-light">
                  Quiet, dense organic garments built to outlast fast-paced digital cycles. Printed
                  purely on-demand in Tiruppur to guarantee zero deadstock and zero excess inventory.
                </p>
                <div className="flex items-center gap-4 text-xs text-store-text-secondary pt-1 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Shield size={14} className="text-store-action-primary" />
                    GOTS Organic Certified
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RefreshCw size={14} className="text-store-action-primary" />
                    Zero Deadstock
                  </span>
                </div>
              </div>

              {/* Col 2: Catalog Links */}
              <div className="space-y-3">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-store-text-primary">
                  Catalog
                </h4>
                <ul className="space-y-2.5 text-xs text-store-text-secondary">
                  <li>
                    <Link href="/shop" className="hover:text-store-text-primary transition-colors">
                      All Apparel
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?category=hoodies" className="hover:text-store-text-primary transition-colors">
                      500 GSM French Terry Hoodies
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?category=tees" className="hover:text-store-text-primary transition-colors">
                      280 GSM Combed Jersey Tees
                    </Link>
                  </li>
                  <li>
                    <Link href="/shop?category=pants" className="hover:text-store-text-primary transition-colors">
                      Pleated Duck Canvas Pants
                    </Link>
                  </li>
                  <li>
                    <Link href="/collections" className="hover:text-store-text-primary transition-colors">
                      Capsule Collections
                    </Link>
                  </li>
                  <li>
                    <Link href="/wishlist" className="hover:text-store-text-primary transition-colors">
                      Saved Wishlist
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 3: Company & Ethos */}
              <div className="space-y-3">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-store-text-primary">
                  Ethos
                </h4>
                <ul className="space-y-2.5 text-xs text-store-text-secondary">
                  <li>
                    <Link href="/about" className="hover:text-store-text-primary transition-colors">
                      About The Unplugged Wear
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/sustainability" className="hover:text-store-text-primary transition-colors">
                      Sustainability Manifesto
                    </Link>
                  </li>
                  <li>
                    <Link href="/journal" className="hover:text-store-text-primary transition-colors">
                      Editorial Journal
                    </Link>
                  </li>
                  <li>
                    <Link href="/size-guide" className="hover:text-store-text-primary transition-colors">
                      Fit & Sizing Architecture
                    </Link>
                  </li>
                  <li>
                    <Link href="/track-order" className="hover:text-store-text-primary transition-colors">
                      Track Shipment
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-store-text-primary transition-colors">
                      Contact Studio Concierge
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 4: Policies */}
              <div className="space-y-3">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-store-text-primary">
                  Policies
                </h4>
                <ul className="space-y-2.5 text-xs text-store-text-secondary">
                  <li>
                    <Link href="/faq" className="hover:text-store-text-primary transition-colors">
                      Disclosures & FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/policies/returns" className="hover:text-store-text-primary transition-colors">
                      Returns & Exchanges
                    </Link>
                  </li>
                  <li>
                    <Link href="/policies/shipping" className="hover:text-store-text-primary transition-colors">
                      Shipping & Delivery
                    </Link>
                  </li>
                  <li>
                    <Link href="/policies/privacy" className="hover:text-store-text-primary transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/policies/terms" className="hover:text-store-text-primary transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Row: Copyright + Mindful Legal Notice matching Jitter format */}
            <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-store-text-secondary">
              <div>
                © {new Date().getFullYear()} The Unplugged Wear. Mindful POD apparel. All rights reserved.
              </div>
              <div className="flex items-center gap-5 text-2xs uppercase tracking-wider">
                <Link href="/about" className="hover:text-store-text-primary transition-colors">
                  Tiruppur Atelier
                </Link>
                <span>•</span>
                <Link href="/policies/privacy" className="hover:text-store-text-primary transition-colors">
                  Privacy
                </Link>
                <span>•</span>
                <Link href="/policies/terms" className="hover:text-store-text-primary transition-colors">
                  Terms
                </Link>
              </div>
            </div>

            {/* Slow-Living Disclaimer Note matching Jitter footer disclaimer */}
            <div className="pt-3 pb-6 text-3xs text-store-text-secondary/70 max-w-4xl leading-relaxed">
              All architectural garments from The Unplugged Wear are tailored on-demand from 500 GSM organic French terry and combed jersey in Tiruppur, India. Zero deadstock inventory is held. Constructed intentionally for slow-living slow fashion permanence.
            </div>

            {/* Interactive Demo Controls Ribbon per MOCK_DATA.md */}
            <div className="pt-4 border-t border-store-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-store-text-secondary">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-store-text-primary uppercase tracking-wider text-2xs">
                  Demo Scenarios:
                </span>
                {[
                  { id: 'normal', label: 'Normal Baseline' },
                  { id: 'empty', label: 'Empty States' },
                  { id: 'error', label: 'Simulated Error' },
                  { id: 'long_content', label: 'Long Multiline Text' },
                ].map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setScenario(sc.id as any)}
                    className={`px-2.5 py-1 rounded-full text-2xs font-medium transition-all cursor-pointer ${
                      scenario === sc.id
                        ? 'bg-primary-dark text-white font-semibold'
                        : 'bg-store-canvas border border-store-border text-store-text-secondary hover:text-store-text-primary hover:bg-store-cream'
                    }`}
                  >
                    {sc.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset storefront demo state (cart, wishlist, orders) to baseline?')) {
                      resetStoreData();
                    }
                  }}
                  className="text-store-gold hover:underline font-medium text-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>Reset Demo State</span>
                </button>
                <span className="text-store-text-secondary/60 text-2xs hidden sm:inline">
                  Local mock storage (tuw_website_v2) · Independent client state
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Reveal Section: Dark Canvas Revealed Under the Scooped Curtain (Sticky Bottom) */}
        <div className="jitter-footer-reveal px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 pb-8 sm:pb-10 border-b border-white/10">
              {/* Left: Animated Motion Sticker with Fabric Looping Video */}
              <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
                <div className="jitter-video-badge shrink-0">
                  <video
                    src="/videos/h3.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-primary-dark/20 pointer-events-none" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-store-gold" />
                    <span className="text-2xs uppercase tracking-luxury text-store-gold font-medium">
                      Slow-Living Motion • Tiruppur
                    </span>
                  </div>
                  <h3 className="font-heading font-medium text-xl sm:text-2xl text-white tracking-tight leading-snug">
                    Crafted for Quiet Permanence.
                  </h3>
                  <p className="text-xs text-white/70 max-w-sm font-sans leading-relaxed">
                    Heavyweight 500 GSM organic French terry tailored on-demand with zero deadstock inventory.
                  </p>
                </div>
              </div>

              {/* Right: Join the Dispatch Form with Gold CTA Button (Strictly No Admin Purple) */}
              <div className="w-full lg:max-w-md space-y-3 text-center sm:text-left">
                <span className="text-2xs uppercase tracking-luxury text-white/80 font-medium block">
                  The TUW Dispatch
                </span>
                <p className="text-xs text-white/60 font-sans leading-relaxed">
                  Quiet letters on architectural slow-living form and seasonal capsule drops.
                </p>

                {subscribed ? (
                  <div className="flex items-center gap-2 p-3 rounded-full bg-white/10 border border-white/20 text-xs text-secondary-mint">
                    <CheckCircle2 size={16} />
                    <span>You are subscribed to the TUW Dispatch. Welcome.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 h-11 px-4 text-xs rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-store-gold focus:bg-white/15 outline-hidden transition-all"
                    />
                    <button
                      type="submit"
                      className="h-11 px-7 rounded-full bg-store-gold hover:bg-store-gold/90 text-primary-dark font-sans font-medium text-xs uppercase tracking-luxury transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      <span>Join</span>
                      <ArrowRight size={14} />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Monumental Architectural Brand Signature with High Visibility & Leaping Deer Emblem */}
            <div className="w-full flex flex-col items-center justify-center text-center select-none pt-6 sm:pt-8 pb-16 sm:pb-20">
              <div className="flex items-center justify-center gap-2.5 mb-2">
                <TuwEmblem className="h-6 sm:h-7 w-auto text-store-gold" />
                <span className="text-3xs sm:text-2xs uppercase tracking-widest text-store-gold font-sans font-semibold">
                  Slow-Living Atelier • Tiruppur
                </span>
              </div>

              <h2 className="font-heading font-black uppercase jitter-brand-signature">
                The Unplugged Wear
              </h2>

              <div className="flex items-center gap-3 sm:gap-5 text-3xs sm:text-2xs uppercase tracking-wider text-white/50 font-sans font-medium mt-2.5">
                <span>100% GOTS Organic</span>
                <span>•</span>
                <span>Zero Deadstock</span>
                <span>•</span>
                <span>Tailored On-Demand</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}

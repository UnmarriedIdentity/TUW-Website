'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';
import { useStore } from '@/mocks/store';

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
    <footer className="bg-primary-dark text-white/90 pt-16 pb-0 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Brand Manifesto Col (Spans 2 on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-heading font-extrabold text-2xl tracking-tighter uppercase text-white">
              The Unplugged Wear
            </span>
            <p className="text-sm text-white/70 max-w-sm leading-relaxed font-sans">
              Quiet, dense organic garments built to outlast fast-paced digital cycles. Printed
              purely on-demand in Tiruppur to guarantee zero deadstock and zero excess inventory.
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white block mb-2">
                Join the Dispatch (1-2 Quiet Letters per Month)
              </span>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/10 border border-white/20 text-xs text-secondary-blue">
                  <CheckCircle2 size={16} />
                  <span>You are subscribed to the TUW Dispatch. Welcome.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-11 px-4 text-xs rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-white transition-colors"
                  />
                  <Button variant="primary" size="sm" type="submit" icon={<ArrowRight size={14} />} iconPosition="right">
                    Join
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Catalog Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Catalog</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Apparel
                </Link>
              </li>
              <li>
                <Link href="/shop?category=hoodies" className="hover:text-white transition-colors">
                  500 GSM French Terry Hoodies
                </Link>
              </li>
              <li>
                <Link href="/shop?category=tees" className="hover:text-white transition-colors">
                  280 GSM Combed Tees
                </Link>
              </li>
              <li>
                <Link href="/shop?category=pants" className="hover:text-white transition-colors">
                  Pleated Duck Canvas Pants
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  Capsule Collections
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Ethos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Ethos</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About TUW
                </Link>
              </li>
              <li>
                <Link href="/about/sustainability" className="hover:text-white transition-colors">
                  Sustainability Manifesto
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-white transition-colors">
                  Editorial Journal
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white transition-colors">
                  Fit & Sizing Guide
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Shipment
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Policies</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Disclosures & FAQ
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & POD Note */}
        <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} The Unplugged Wear. Mindful POD apparel. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-secondary-mint" />
              GOTS Organic Cotton
            </span>
            <span className="flex items-center gap-1.5">
              <RefreshCw size={14} className="text-secondary-blue" />
              Zero Surplus Inventory
            </span>
            <span>Made with Care in India</span>
          </div>
        </div>

        {/* Interactive Demo Controls Ribbon per MOCK_DATA.md */}
        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white uppercase tracking-wider text-2xs">
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
                className={`px-2.5 py-1 rounded-full text-2xs font-medium transition-all ${
                  scenario === sc.id
                    ? 'bg-white text-tertiary-black font-semibold'
                    : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
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
              className="text-store-gold hover:underline font-medium text-2xs flex items-center gap-1"
            >
              <span>Reset Demo State</span>
            </button>
            <span className="text-white/40 text-2xs hidden sm:inline">
              Local mock storage (tuw_website_v2) · Independent client state
            </span>
          </div>
        </div>
      </div>

      {/* Massive Architectural Typography Watermark matching Figma "MONALISA" specimen */}
      <div className="w-full overflow-hidden pt-8 select-none pointer-events-none border-t border-white/5">
        <div className="font-heading font-black text-white/10 uppercase tracking-tighter text-center watermark-brand-display translate-y-3">
          The Unplugged Wear
        </div>
      </div>
    </footer>
  );
}

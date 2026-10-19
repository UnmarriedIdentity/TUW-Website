'use client';

import React from 'react';
import Link from 'next/link';
import { X, Search, Heart, User, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Drawer from '../ui/Drawer';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

// Secondary account & tracking shortcuts shown below the primary nav list.
// Module scope so the array is stable across renders.
const SECONDARY_LINKS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'Search Catalog', href: '/search', icon: Search },
  { label: 'My Account & Orders', href: '/account', icon: User },
  { label: 'Saved Wishlist', href: '/wishlist', icon: Heart },
  { label: 'Track My Order', href: '/track-order', icon: RefreshCw },
];

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="left"
      maxWidth="max-w-sm"
      title="The Unplugged Wear"
      subtitle="Intentional POD Apparel"
    >
      <div className="flex flex-col h-full justify-between gap-8">
        {/* Navigation Link List */}
        <div className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center justify-between py-3 text-base font-semibold tracking-wide text-[#1A1A1A] hover:text-[#7539FF] border-b border-[#F4F1EA] transition-colors"
            >
              <span>{link.label}</span>
              <ArrowRight size={14} className="text-[#8A8A8A]" />
            </Link>
          ))}
        </div>

        {/* Secondary Account & Tracking Links */}
        <div className="flex flex-col gap-3 pt-6 border-t border-[#E2DDCF]">
          {SECONDARY_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-3 text-sm font-medium text-[#5A5A5A] hover:text-[#1A1A1A]"
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer Brand Notes */}
        <div className="p-4 rounded-xl bg-[#F4F1EA] text-xs text-[#666] leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-[#1A1A1A] mb-1">
            <ShieldCheck size={16} className="text-[#10B981]" />
            <span>Ethical POD Promise</span>
          </div>
          Zero overproduction. Every garment custom-cured on 100% GOTS organic cotton.
        </div>
      </div>
    </Drawer>
  );
}

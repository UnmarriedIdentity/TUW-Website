'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  ChevronDown,
  X,
} from 'lucide-react';
import { useStore } from '@/mocks/store';
import MobileMenu from './MobileMenu';
import CartDrawer from './CartDrawer';
import TuwEmblem from './TuwEmblem';

export default function Header() {
  const pathname = usePathname();
  const { cartCount, wishlist, setIsCartDrawerOpen } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 24;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies = ['USD', 'INR', 'EUR', 'GBP'];

  // Left navigation links matching Figma node 221:12626
  const navLinks = [
    { label: 'Men', href: '/shop?category=men' },
    { label: 'Women', href: '/shop?category=women' },
    { label: 'Kids', href: '/shop?category=kids' },
    { label: 'New Collection', href: '/collections' },
    { label: 'About', href: '/about' },
  ];

  // Top bar utility links matching Figma node 221:12602
  const topBarLinks = [
    { label: 'Blogs', href: '/journal' },
    { label: "FAQ's", href: '/faq' },
    { label: 'Support', href: '/contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchVal.trim())}`;
    }
  };

  return (
    <>
      {/* 1. Figma Top Bar (36px, topbar-navy) — Node 221:12599 */}
      <div className="w-full bg-header-topbar text-white header-topbar-height border-b border-white/10 hidden md:block select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-xs font-sans">
          {/* Top Bar Left: Utility links */}
          <nav className="flex items-center gap-6" aria-label="Utility Links">
            {topBarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Top Bar Right: Social Icons & Currency Selector */}
          <div className="flex items-center gap-5">
            {/* Social Icons matching Figma node 221:12607 */}
            <div className="flex items-center gap-3 text-white/80">
              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>

            {/* Currency Selector matching Figma node 221:12620 */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1.5 text-white/90 hover:text-white font-medium cursor-pointer"
                aria-expanded={isCurrencyDropdownOpen}
                aria-haspopup="true"
              >
                <span>{currency}</span>
                <ChevronDown size={13} className="text-white/70" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-20 bg-store-surface text-store-text-primary border border-store-border rounded-xl shadow-lg py-1 z-50">
                  {currencies.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCurrency(c);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (73px, store-canvas) — Node 221:12623 */}
      <header
        className={`sticky top-0 z-40 border-b border-store-border transition-all duration-300 ${
          isScrolled
            ? 'bg-store-canvas/95 backdrop-blur-md shadow-xs'
            : 'bg-store-canvas'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between header-main-height">
            {/* Left: Mobile Hamburger & Desktop Navigation Links */}
            <div className="flex items-center gap-6 lg:gap-8">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                className="lg:hidden p-2 rounded-xl text-store-text-primary hover:bg-black/5"
              >
                <Menu size={22} />
              </button>

              <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-medium tracking-wide transition-colors hover:text-black ${
                        isActive
                          ? 'text-store-text-primary border-b-2 border-primary-dark pb-0.5'
                          : 'text-store-text-primary/80'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Center: Rolls-Royce Inspired Morphing Brand Wordmark & Emblem */}
            <div className="relative flex items-center justify-center h-12 w-64 sm:w-72 lg:w-80">
              {/* 1. Full Wordmark: "THE UNPLUGGED WEAR" (Visible at top) */}
              <Link
                href="/"
                aria-label="The Unplugged Wear - Homepage"
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${
                  isScrolled
                    ? 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
                    : 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                }`}
              >
                <span className="font-heading font-medium text-lg sm:text-xl lg:text-2xl uppercase tracking-widest text-store-text-primary hover:text-black transition-colors whitespace-nowrap">
                  The Unplugged Wear
                </span>
              </Link>

              {/* 2. Signature Logo Emblem: TuwEmblem (Visible when scrolled) */}
              <Link
                href="/"
                aria-label="The Unplugged Wear - Homepage"
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${
                  isScrolled
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                    : 'opacity-0 translate-y-2 scale-90 pointer-events-none'
                }`}
              >
                <TuwEmblem className="h-9 w-auto text-store-text-primary hover:text-black transition-transform duration-200 hover:scale-105" />
              </Link>
            </div>

            {/* Right: 4 Action Icons matching Figma node 221:12633 */}
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-7">
              {/* 1. Search */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search catalog"
                className="p-1.5 rounded-full text-store-text-primary hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
              >
                <Search size={21} />
              </button>

              {/* 2. Wishlist */}
              <Link
                href="/wishlist"
                aria-label="View wishlist"
                className="relative p-1.5 rounded-full text-store-text-primary hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
              >
                <Heart size={21} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary-coral text-white text-2xs font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* 3. Account / User Profile */}
              <Link
                href="/login"
                aria-label="My Account"
                className="p-1.5 rounded-full text-store-text-primary hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
              >
                <User size={21} />
              </Link>

              {/* 4. Cart */}
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                aria-label="Open shopping cart"
                className="relative p-1.5 rounded-full text-store-text-primary hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
              >
                <ShoppingBag size={21} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-dark text-white text-2xs font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Live Search Overlay */}
        {isSearchOpen && (
          <div className="border-t border-store-border bg-store-surface px-4 py-4 sm:px-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search size={18} className="text-store-text-secondary" />
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <input
                  type="search"
                  placeholder="Search heavyweight apparel, organic hoodies, cotton essentials..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  autoFocus
                  className="w-full text-sm bg-transparent outline-none text-store-text-primary placeholder:text-store-text-secondary"
                />
              </form>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
                className="p-1 rounded-md text-store-text-secondary hover:text-store-text-primary cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Slide-out Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={[...navLinks, ...topBarLinks]}
      />

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}

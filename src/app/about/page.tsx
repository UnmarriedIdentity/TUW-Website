'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowRight } from 'lucide-react';
import {
  AboutHero,
  AboutStorySection,
  AboutMissionSection,
  AboutValuePillars,
  AboutAtelierProcess,
  AboutTeamSection,
  AboutCraftHighlight,
  AboutCustomerReviews,
  InstagramFeedSection,
} from '@/components/editorial';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-store-canvas text-store-charcoal">
      {/* Primary Storefront Navigation */}
      <Header />

      <main className="flex-1 w-full">
        {/* 1. Cinematic Black & White Editorial Hero */}
        <AboutHero />

        {/* 2. Our Story: Two-Column Split with Founder Signature */}
        <AboutStorySection />

        {/* 3. Our Mission: Asymmetric Reverse Split with Pill CTA */}
        <AboutMissionSection />

        {/* 4. 3-Pillar Value Proposition Strip */}
        <AboutValuePillars />

        {/* 5. Craftsmanship & Atelier Process Showcase */}
        <AboutAtelierProcess />

        {/* 6. Meet Our Team: 4-Person Executive & Design Grid */}
        <AboutTeamSection />

        {/* 7. Brand Story Highlight: A Simple Idea in Thoughtful Matter */}
        <AboutCraftHighlight />

        {/* 8. Happy Customers: 3 Verified Testimonial Cards */}
        <AboutCustomerReviews />

        {/* 9. Sustainability Manifesto Banner Callout */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-store-surface border border-store-card-border shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs uppercase font-semibold tracking-luxury text-store-gold block">
                Planetary Responsibility
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-medium text-store-charcoal">
                Read the Sustainability Manifesto
              </h3>
              <p className="text-sm text-store-text-secondary leading-relaxed font-sans">
                Explore our GOTS organic certifications, solar curing tunnels, zero-deadstock print-on-demand infrastructure, and carbon-neutral freight logistics.
              </p>
            </div>
            <Link
              href="/about/sustainability"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-store-action-primary hover:bg-store-action-hover text-white transition-colors duration-200 text-xs uppercase tracking-luxury font-medium shrink-0 shadow-xs"
            >
              <span>Explore Manifesto</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* 10. Curated Instagram Community & Studio Feed */}
        <InstagramFeedSection />
      </main>

      {/* Signature Scooped-Bottom Storefront Footer */}
      <Footer />
    </div>
  );
}

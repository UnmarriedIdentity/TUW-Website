'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import TuwEmblem from '@/components/layout/TuwEmblem';
import { STORE_PRODUCTS } from '@/mocks/fixtures';
import {
  ArrowRight,
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Stats are computed from the live catalog so they can never go stale.
const STYLE_COUNT = STORE_PRODUCTS.length;
const COLOUR_COUNT = new Set(STORE_PRODUCTS.flatMap((p) => p.colors.map((c) => c.name))).size;

const CHAPTERS = [
  { id: 'our-story', label: 'Our story' },
  { id: 'our-way', label: 'Our way' },
  { id: 'values', label: 'What we hold on to' },
  { id: 'details', label: 'Every detail' },
  { id: 'quality', label: 'Small batches' },
  { id: 'lifestyle', label: 'Slow days' },
];

interface BrandValue {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  changes: string;
}

const VALUES: BrandValue[] = [
  {
    id: 'honesty',
    icon: ShieldCheck,
    title: 'Honesty',
    body: 'Real prices, real photos, clear answers. No hidden costs at checkout.',
    changes:
      'Anything we have not confirmed yet, like fabric composition, is marked as a draft on the site instead of guessed.',
  },
  {
    id: 'patience',
    icon: Clock,
    title: 'Patience',
    body: 'Made when you order it. Worth a few extra days.',
    changes:
      'Your piece is printed after you order, so it takes a few business days longer than something off a shelf.',
  },
  {
    id: 'simplicity',
    icon: Sparkles,
    title: 'Simplicity',
    body: 'One deer, quiet colours, shapes that last beyond a season.',
    changes: `We keep the range small on purpose: ${STYLE_COUNT} styles, one mark.`,
  },
  {
    id: 'care',
    icon: Heart,
    title: 'Care',
    body: 'If a print comes out wrong, we make it right.',
    changes:
      'Write to us with a photo and your order number and we will sort it out with our print partner.',
  },
];

// Hotspot positions are percentages of the 4:5 frame, which shows the top
// 920 px of the 736x1186 placeholder model photo (object-top), so they stay
// on the garment at every width.
const DETAILS = [
  {
    id: 'chest',
    x: 70,
    y: 49,
    title: 'A small chest mark',
    body: 'The deer sits small on the chest, so it is something people notice up close rather than from across the room.',
  },
  {
    id: 'back',
    x: 58,
    y: 40,
    title: 'Room for a back print',
    body: 'Turn it around and the back can carry a larger print. Like everything else, it is printed only after you order.',
  },
  {
    id: 'sleeve',
    x: 45,
    y: 59,
    title: 'Quiet sleeves',
    body: 'Sleeves can take a small mark too. We keep them simple, so the piece goes with everything.',
  },
  {
    id: 'weight',
    x: 60,
    y: 63,
    title: 'Real weight',
    body: 'About 640 g in size M, according to our print partner. It feels like a hoodie should.',
  },
];

const QUALITY_CARDS = [
  { image: '/images/about/cream-polo.jpg', label: 'Printed on its own', alt: 'Woman in a cream knit polo and wide trousers walking outdoors' },
  { image: '/images/lifestyle/linen-man.jpg', label: 'Checked on its own', alt: 'Man in a green linen shirt carrying a leather weekend bag' },
  { image: '/images/about/street-polo.jpg', label: 'Packed on its own', alt: 'Woman in a navy knit polo and cream trousers on a city street' },
];

const QUALITY_CHECKS = [
  'Print lined up and sharp',
  'Colours match your order',
  'No marks or loose threads',
  'Folded and packed with care',
];

const SECTION = 'scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
const EYEBROW = 'text-xs uppercase tracking-widest text-store-gold font-medium';
const H2 = 'font-heading text-[clamp(1.75rem,3vw+0.75rem,2.75rem)] font-medium tracking-tight text-store-text-primary';

export default function AboutPage() {
  const [activeValue, setActiveValue] = useState(VALUES[1].id);
  const [activeDetail, setActiveDetail] = useState(0);
  const value = VALUES.find((v) => v.id === activeValue) || VALUES[0];
  const detail = DETAILS[activeDetail];

  return (
    <div className="min-h-screen flex flex-col bg-store-canvas">
      <Header />

      <main className="flex-1 w-full pb-16 sm:pb-24">
        <div className={`${SECTION} pt-6 sm:pt-8`}>
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
        </div>

        {/* HERO */}
        <section id="about-top" aria-labelledby="about-heading" className={`${SECTION} pt-6`}>
          <div className="relative overflow-hidden rounded-3xl bg-primary-dark aspect-4/5 sm:aspect-16/9 lg:aspect-21/9">
            <img
              src="/images/about/our-story-couple.webp"
              alt="Two people sitting together on coastal rocks, one holding a bouquet"
              className="absolute inset-0 w-full h-full object-cover object-[60%_30%] grayscale"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
              <span className="text-xs uppercase tracking-widest text-white/80 font-medium">About Us</span>
              <h1
                id="about-heading"
                className="mt-2 max-w-2xl font-heading text-[clamp(2rem,4vw+1rem,4rem)] font-medium tracking-tight text-white leading-[1.05]"
              >
                Everyday pieces, made when you order them.
              </h1>
            </div>
          </div>
        </section>

        {/* 01 · OUR STORY */}
        <section id="our-story" aria-labelledby="our-story-heading" className={`${SECTION} py-16 sm:py-24`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative overflow-hidden rounded-3xl bg-store-cream aspect-4/5">
              <img
                src="/images/about/cream-polo.jpg"
                alt="Woman in a cream polo and wide trousers walking through a garden terrace"
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-store-text-primary">
                Part of Opalworks · A house of ventures
              </span>
            </div>

            <div>
              <span className={EYEBROW}>01 · Behind the brand</span>
              <h2 id="our-story-heading" className={`${H2} mt-3`}>
                A small team in Surat
              </h2>
              <p className="mt-5 text-base sm:text-lg text-store-text-secondary leading-relaxed max-w-xl">
                The Unplugged Wear is a venture of Opalworks, a house of ventures founded by Urvil
                Kargathala in Surat. We design, photograph and look after every order ourselves, and work
                with a print-on-demand partner in India who prints and ships each piece.
              </p>
              <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { value: STYLE_COUNT, label: 'Styles' },
                  { value: COLOUR_COUNT, label: 'Colours shown' },
                  { value: 1, label: 'Print partner' },
                ].map((stat) => (
                  <div key={stat.label} className="border-t border-store-border pt-3 flex flex-col-reverse">
                    <dt className="mt-1 text-sm text-store-text-secondary">{stat.label}</dt>
                    <dd className="font-heading text-3xl sm:text-4xl font-medium text-store-text-primary tuw-tabular-nums">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 02 · OUR WAY */}
        <section id="our-way" aria-labelledby="our-way-heading" className={`${SECTION} pb-12 sm:pb-16`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-flex rounded-full bg-store-cream border border-store-border px-3 py-1 text-xs font-medium text-store-text-secondary">
                02 · Our philosophy
              </span>
              <h2
                id="our-way-heading"
                className="mt-5 font-heading text-[clamp(2.5rem,5vw+0.5rem,4.5rem)] font-medium tracking-tight text-primary-dark leading-[1.02]"
              >
                Made slowly.
                <br />
                Worn often.
              </h2>
              <p className="mt-6 text-base sm:text-lg text-store-text-secondary leading-relaxed max-w-md">
                The Unplugged Wear makes everyday clothes and objects with one quiet mark. We print each
                piece only after it is ordered, so nothing is made just to sit on a shelf.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary-dark text-white text-sm font-medium hover:bg-store-charcoal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-store-gold focus-visible:ring-offset-2"
                >
                  Shop the collection
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/journal/unplugging-the-digital-noise"
                  className="inline-flex items-center h-11 px-6 rounded-full border border-store-border bg-white text-sm font-medium text-store-text-primary hover:border-store-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-store-gold focus-visible:ring-offset-2"
                >
                  What &ldquo;unplugged&rdquo; means
                </Link>
              </div>
            </div>

            <div className="order-1 md:order-2 relative overflow-hidden rounded-3xl bg-store-cream aspect-4/5">
              <img
                src="/images/about/street-polo.jpg"
                alt="Woman in a black polo and cream trousers on a city street, holding a coffee"
                loading="lazy"
                className="w-full h-full object-cover object-[50%_20%]"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl bg-white/90 backdrop-blur-sm px-4 py-3">
                <p className="text-sm text-store-text-primary leading-snug">
                  Printed only when you order.
                  <span className="block text-store-text-secondary">Shipped from India.</span>
                </p>
                <TuwEmblem className="h-6 w-auto text-store-text-primary shrink-0" />
              </div>
            </div>
          </div>
        </section>

        {/* ON THIS PAGE */}
        <nav aria-label="On this page" className={`${SECTION}`}>
          <ul className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {CHAPTERS.map((chapter, i) => (
              <li key={chapter.id} className="shrink-0">
                <a
                  href={`#${chapter.id}`}
                  className="inline-flex items-center gap-1.5 min-h-9 px-4 rounded-full border border-store-border bg-white text-sm text-store-text-secondary hover:text-store-text-primary hover:border-store-text-primary transition-colors"
                >
                  <span className="text-store-gold tuw-tabular-nums">0{i + 1}</span>
                  {chapter.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* 03 · VALUES */}
        <section id="values" aria-labelledby="values-heading" className={`${SECTION} py-16 sm:py-24`}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <span className={EYEBROW}>03 · Our core values</span>
              <h2 id="values-heading" className={`${H2} mt-3`}>
                What we hold on to
              </h2>
            </div>
            <p className="text-sm text-store-text-secondary">Tap a value to see what it changes.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((item, i) => {
              const Icon = item.icon;
              const isActive = item.id === activeValue;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveValue(item.id)}
                  className={`text-left rounded-2xl border p-6 min-h-52 flex flex-col justify-between transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-store-gold focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-primary-dark border-primary-dark text-white'
                      : 'bg-store-cream/60 border-store-border text-store-text-primary hover:border-store-text-primary'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <Icon size={22} aria-hidden="true" className={isActive ? 'text-store-gold' : 'text-store-text-primary'} />
                    <span className={`text-xs tuw-tabular-nums ${isActive ? 'text-white/60' : 'text-store-text-secondary'}`}>
                      0{i + 1}
                    </span>
                  </div>
                  <div className="mt-10">
                    <h3 className="font-heading text-xl font-medium">{item.title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${isActive ? 'text-white/75' : 'text-store-text-secondary'}`}>
                      {item.body}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <p aria-live="polite" className="mt-6 rounded-2xl bg-white border border-store-border px-5 py-4 text-base text-store-text-primary">
            <span className="font-medium">{value.title}:</span> {value.changes}
          </p>
        </section>

        {/* 04 · DETAILS */}
        <section id="details" aria-labelledby="details-heading" className={`${SECTION} pb-16 sm:pb-24`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative overflow-hidden rounded-3xl bg-store-cream aspect-4/5">
              <img
                src="/images/lifestyle/linen-man.jpg"
                alt="Man in a green linen shirt and cream trousers"
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
              {DETAILS.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveDetail(i)}
                  aria-pressed={i === activeDetail}
                  aria-label={`Detail ${i + 1}: ${d.title}`}
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full text-sm font-semibold shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-store-gold focus-visible:ring-offset-2 ${
                    i === activeDetail
                      ? 'bg-store-gold text-primary-dark scale-110'
                      : 'bg-white/95 text-store-text-primary hover:scale-105'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div>
              <span className={EYEBROW}>04 · Designed with intention</span>
              <h2 id="details-heading" className={`${H2} mt-3`}>
                Every detail has a reason
              </h2>
              <p className="mt-3 text-sm text-store-text-secondary">Tap the numbers to see each detail.</p>

              <div aria-live="polite" className="mt-8 rounded-2xl bg-white border border-store-border p-6">
                <p className="text-xs uppercase tracking-widest text-store-text-secondary tuw-tabular-nums">
                  Detail {activeDetail + 1} of {DETAILS.length}
                </p>
                <h3 className="mt-2 font-heading text-xl font-medium text-store-text-primary">{detail.title}</h3>
                <p className="mt-2 text-base text-store-text-secondary leading-relaxed">{detail.body}</p>
                <div className="mt-6 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveDetail((activeDetail - 1 + DETAILS.length) % DETAILS.length)}
                    aria-label="Previous detail"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-store-border hover:border-store-text-primary transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDetail((activeDetail + 1) % DETAILS.length)}
                    aria-label="Next detail"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-store-border hover:border-store-text-primary transition-colors cursor-pointer"
                  >
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                  <Link
                    href="/products/everyday-pullover-hoodie"
                    className="ml-auto inline-flex items-center gap-1.5 min-h-6 text-sm font-medium text-store-text-primary underline underline-offset-4 hover:text-black"
                  >
                    See the hoodie
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 · QUALITY */}
        <section id="quality" aria-labelledby="quality-heading" className={`${SECTION} pb-16 sm:pb-24`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mb-10">
            <div>
              <span className={EYEBROW}>05 · Quality &amp; care</span>
              <h2 id="quality-heading" className={`${H2} mt-3`}>
                Small batches of one
              </h2>
            </div>
            <p className="text-base text-store-text-secondary leading-relaxed md:max-w-md md:justify-self-end">
              Because every order is printed on its own, each piece gets looked at on its own. Here is
              what we check before yours leaves.{' '}
              <Link href="/about/sustainability" className="underline underline-offset-4 text-store-text-primary hover:text-black">
                How printing to order works
              </Link>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {QUALITY_CARDS.map((card) => (
              <figure key={card.label}>
                <div className="overflow-hidden rounded-2xl bg-store-cream aspect-3/4">
                  <img src={card.image} alt={card.alt} loading="lazy" className="w-full h-full object-cover object-top" />
                </div>
                <figcaption className="mt-3 text-center text-sm font-medium text-store-text-primary">{card.label}</figcaption>
              </figure>
            ))}
          </div>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {QUALITY_CHECKS.map((check) => (
              <li key={check} className="flex items-center gap-2.5 text-sm text-store-text-primary">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary-mint/20 text-emerald-700 shrink-0">
                  <Check size={14} aria-hidden="true" />
                </span>
                {check}
              </li>
            ))}
          </ul>
        </section>

        {/* 06 · LIFESTYLE */}
        <section id="lifestyle" aria-labelledby="lifestyle-heading" className={`${SECTION} pb-16 sm:pb-24`}>
          <span className={EYEBROW}>06 · Our lifestyle</span>
          <h2 id="lifestyle-heading" className={`${H2} mt-3 mb-10`}>
            Clothes for the slow parts of the day
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-3 sm:gap-4">
            <figure className="relative row-span-2 overflow-hidden rounded-2xl bg-store-cream">
              <img src="/images/lifestyle/linen-man.jpg" alt="Man in a green linen shirt carrying a leather weekend bag" loading="lazy" className="w-full h-full object-cover object-[60%_0%]" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-store-text-primary">Weekends</figcaption>
            </figure>

            <div className="col-span-1 md:col-span-2 rounded-2xl bg-store-gold/80 p-5 sm:p-6 flex flex-col justify-between">
              <p className="font-heading text-xl sm:text-2xl font-medium text-primary-dark leading-snug">
                Phone face down.
                <br />
                Kettle on.
              </p>
              <p className="text-xs text-primary-dark/80">Our idea of a good day</p>
            </div>

            <figure className="relative row-span-2 overflow-hidden rounded-2xl bg-store-cream">
              <img src="/images/about/street-polo.jpg" alt="Close-up of a hand holding a takeaway coffee on a morning walk" loading="lazy" className="w-full h-full object-cover object-center scale-[1.9] origin-[69%_66%]" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-store-text-primary">Slow mornings</figcaption>
            </figure>

            <div className="rounded-2xl bg-primary-dark p-5 sm:p-6 flex flex-col justify-between text-white">
              <TuwEmblem className="h-8 w-auto text-store-gold" />
              <p className="text-sm text-white/80">Home</p>
            </div>

            {/* Bottom-anchored crop keeps the shirt's third-party chest logo out of frame */}
            <figure className="relative col-span-2 md:col-span-1 overflow-hidden rounded-2xl bg-store-cream">
              <img src="/images/about/office-polo.jpg" alt="Wide cream trousers and white heels by an office desk" loading="lazy" className="w-full h-full object-cover object-bottom scale-125 origin-bottom" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-store-text-primary">Desk days</figcaption>
            </figure>
          </div>
        </section>

        {/* CLOSING */}
        <section aria-labelledby="closing-heading" className={SECTION}>
          <div className="relative overflow-hidden rounded-3xl bg-primary-dark px-6 py-14 sm:px-12 sm:py-20">
            <TuwEmblem className="pointer-events-none absolute -right-10 -bottom-10 h-72 w-auto text-white/5" />
            <h2
              id="closing-heading"
              className="relative font-heading text-[clamp(2.25rem,4vw+0.75rem,4rem)] font-medium tracking-tight text-white leading-[1.05]"
            >
              Fewer things.
              <br />
              <span className="text-store-gold">Better kept.</span>
            </h2>
            <p className="relative mt-5 max-w-md text-base text-white/75 leading-relaxed">
              Tees, hoodies and a few everyday objects, each with the same small deer.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white text-primary-dark text-sm font-medium hover:bg-store-cream transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-store-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark"
              >
                Explore the collection
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a
                href="#about-top"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-white/30 text-sm font-medium text-white hover:border-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-store-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark"
              >
                Back to top
                <ArrowUp size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

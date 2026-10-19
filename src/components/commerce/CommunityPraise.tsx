import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarText: string;
  avatarBg: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'Their ability to capture architectural form in organic cotton is unparalleled. The 500 GSM weight is unlike anything else in modern apparel.',
    name: 'Isabella Rodriguez',
    role: 'Architect & Spatial Designer',
    avatarText: 'IR',
    avatarBg: 'bg-primary-dark text-white',
  },
  {
    id: 't-2',
    quote: 'Creative minds who listen, understand, and craft with quiet permanence. An atelier that genuinely respects material purity and timeless cuts.',
    name: 'Gabrielle Williams',
    role: 'Creative Director, Studio Monolith',
    avatarText: 'GW',
    avatarBg: 'bg-store-gold text-primary-dark',
  },
  {
    id: 't-3',
    quote: 'Exceeded our expectations with thoughtful cuts that outlast digital cycles. The zero-deadstock Tiruppur model is the definition of true modern luxury.',
    name: 'Samantha Johnson',
    role: 'Founder, Nordic Living',
    avatarText: 'SJ',
    avatarBg: 'bg-secondary-mint text-primary-dark',
  },
  {
    id: 't-4',
    quote: 'A refreshing and mindful approach that consistently delivers exceptional results. No logos, no noise, just dense, honest cotton built for life.',
    name: 'Victoria Thompson',
    role: 'Senior Textile Curator',
    avatarText: 'VT',
    avatarBg: 'bg-primary-dark text-store-gold',
  },
  {
    id: 't-5',
    quote: 'Their artistic flair and slow-production philosophy resulted in something truly remarkable. The drape and dense weave hold structure all day.',
    name: 'John Peter',
    role: 'Art Director & Visual Artist',
    avatarText: 'JP',
    avatarBg: 'bg-store-cream text-store-text-primary',
  },
  {
    id: 't-6',
    quote: 'From tactile touch to drape, their artistic restraint results in garments you keep for decades. It has completely replaced fast fashion in my wardrobe.',
    name: 'Natalie Martinez',
    role: 'Industrial Design Lead',
    avatarText: 'NM',
    avatarBg: 'bg-store-border text-primary-dark',
  },
];

export default function CommunityPraise() {
  return (
    <section
      aria-label="Community Testimonials"
      className="relative overflow-hidden py-20 sm:py-28 bg-store-canvas border-b border-store-border select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
        {/* Rating Pill Badge matching benchmark video */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary-dark text-white text-xs font-sans font-medium shadow-sm mb-4">
          <div className="flex items-center text-store-gold">
            <Star size={13} className="fill-store-gold text-store-gold" />
            <Star size={13} className="fill-store-gold text-store-gold" />
            <Star size={13} className="fill-store-gold text-store-gold" />
            <Star size={13} className="fill-store-gold text-store-gold" />
            <Star size={13} className="fill-store-gold text-store-gold" />
          </div>
          <span className="text-white/90 text-2xs sm:text-xs">
            Rated 4.9/5 by over 3,800+ patrons
          </span>
        </div>

        {/* Section Heading matching benchmark video */}
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-store-text-primary">
          Words of praise from others
          <br className="hidden sm:inline" />
          {' '}about our presence.
        </h2>
        <p className="text-xs sm:text-sm text-store-text-secondary max-w-lg mx-auto font-sans mt-3 leading-relaxed">
          Unfiltered reflections on tactile permanence, architectural fit, and zero-deadstock Tiruppur tailoring.
        </p>
      </div>

      {/* Single-line continuous marquee track */}
      <div className="relative w-full overflow-hidden">
        {/* Left and right soft edge scrim gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-store-canvas to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-store-canvas to-transparent z-10" />

        {/* Sliding row: duplicate the array for a seamless infinite loop */}
        <div className="tuw-marquee-container flex items-stretch gap-6 py-2 px-3">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-80 sm:w-96 shrink-0 bg-store-surface border border-store-border rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-store-gold/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-store-gold mb-3.5">
                  <Quote size={24} className="fill-store-gold/20 text-store-gold rotate-180" />
                </div>
                <p className="text-xs sm:text-sm text-store-text-primary font-sans leading-relaxed mb-6 font-normal">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-store-border/60">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-xs shrink-0 ${item.avatarBg}`}
                >
                  {item.avatarText}
                </div>
                <div>
                  <h4 className="text-xs font-heading font-bold text-store-text-primary tracking-tight">
                    {item.name}
                  </h4>
                  <p className="text-2xs text-store-text-secondary font-sans mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

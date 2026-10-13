'use client';

import React, { useState, useEffect } from 'react';
import TuwEmblem from './TuwEmblem';

interface BrandIntroProps {
  forceShow?: boolean;
}

const BRAND_WORDS = [
  ['T', 'H', 'E'],
  ['U', 'N', 'P', 'L', 'U', 'G', 'G', 'E', 'D'],
  ['W', 'E', 'A', 'R'],
];

export default function BrandIntro({ forceShow = false }: BrandIntroProps) {
  // Phase progression matching Homespace ID Framer reference
  // 1. 'mounted': black screen
  // 2. 'emblem': leaping deer logo moves up into view (replaces "H")
  // 3. 'letters': letters animate in one by one (translateX 40px -> 0, opacity 0 -> 1)
  // 4. 'tagline': subtle architectural tagline fades in
  // 5. 'curtain': entire container lifts upwards with 60fps cubic-bezier curve
  // 6. 'done': completely unmounts from DOM
  const [phase, setPhase] = useState<'mounted' | 'emblem' | 'letters' | 'tagline' | 'curtain' | 'done'>('mounted');

  useEffect(() => {
    // 1. Accessibility: check for prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setPhase('done');
        return;
      }

      // Check session storage unless explicitly forced
      const hasSeen = sessionStorage.getItem('tuw_intro_seen');
      if (hasSeen && !forceShow) {
        setPhase('done');
        return;
      }
      sessionStorage.setItem('tuw_intro_seen', 'true');
    }

    // Choreographed timeline matching Homespace ID
    const tEmblem = setTimeout(() => setPhase('emblem'), 150);
    const tLetters = setTimeout(() => setPhase('letters'), 600);
    const tTagline = setTimeout(() => setPhase('tagline'), 1400);
    const tCurtain = setTimeout(() => setPhase('curtain'), 2200);
    const tDone = setTimeout(() => setPhase('done'), 3150);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPhase('done');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(tEmblem);
      clearTimeout(tLetters);
      clearTimeout(tTagline);
      clearTimeout(tCurtain);
      clearTimeout(tDone);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forceShow]);

  if (phase === 'done') {
    return null;
  }

  const handleSkip = () => {
    setPhase('done');
  };

  const isEmblemActive = phase !== 'mounted';
  const areLettersActive = phase === 'letters' || phase === 'tagline' || phase === 'curtain';
  const isTaglineActive = phase === 'tagline' || phase === 'curtain';
  const isCurtainLifting = phase === 'curtain';

  // Calculate flat letter index for staggering
  let globalLetterIndex = 0;

  return (
    <div
      aria-label="The Unplugged Wear Brand Introduction"
      aria-live="polite"
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white select-none overflow-hidden cursor-pointer intro-curtain-ultra ${
        isCurtainLifting ? 'intro-curtain-sliding' : ''
      }`}
    >
      {/* Center Container Loading matching Homespace ID structure */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto text-center">
        {/* Logo Wrapper: Official Leaping Deer Stag Emblem (In place of "H") */}
        <div
          className={`intro-emblem-motion flex items-center justify-center mb-6 sm:mb-8 transition-all duration-700 ${
            isEmblemActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'
          }`}
        >
          <TuwEmblem className="intro-emblem-size text-white drop-shadow-xl" />
        </div>

        {/* Brand Text Wrapper with Staggered Letter Spans */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 intro-display-typography font-heading font-extrabold text-white tracking-tight">
          {BRAND_WORDS.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-flex items-center whitespace-nowrap">
              {word.map((char, charIndex) => {
                const currentDelay = globalLetterIndex * 45;
                globalLetterIndex += 1;
                return (
                  <span
                    key={charIndex}
                    style={{
                      transitionDelay: areLettersActive ? `${currentDelay}ms` : '0ms',
                    }}
                    className={`intro-letter ${
                      areLettersActive ? 'intro-letter-visible' : 'intro-letter-hidden'
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </div>

        {/* Subtext Tagline & Thin Gold Rule */}
        <div
          className={`flex flex-col items-center space-y-3 mt-6 sm:mt-8 transition-all duration-700 ${
            isTaglineActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="w-16 h-px bg-store-gold opacity-75" />
          <p className="font-sans font-medium text-2xs sm:text-xs uppercase tracking-widest text-white/70">
            Architectural Form • Zero Deadstock
          </p>
        </div>
      </div>

      {/* Subtle Skip Prompt in Corner */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-2xs font-sans uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-pointer"
      >
        Skip [Esc]
      </button>
    </div>
  );
}

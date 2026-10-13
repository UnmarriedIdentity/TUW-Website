'use client';

import React, { useState, useEffect } from 'react';
import TuwEmblem from './TuwEmblem';

interface BrandIntroProps {
  forceShow?: boolean;
}

export default function BrandIntro({ forceShow = false }: BrandIntroProps) {
  // Stages: 'initial' -> 'emblem' -> 'reveal' -> 'exit' -> 'done'
  const [stage, setStage] = useState<'initial' | 'emblem' | 'reveal' | 'exit' | 'done'>('initial');

  useEffect(() => {
    // 1. Accessibility: Check for prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setStage('done');
        return;
      }

      // 2. Check if intro has already played in this session
      const hasSeen = sessionStorage.getItem('tuw_intro_seen');
      if (hasSeen && !forceShow) {
        setStage('done');
        return;
      }

      // Mark as seen for this session
      sessionStorage.setItem('tuw_intro_seen', 'true');
    }

    // Sequence timing
    // Step 1: Emblem enters smoothly
    const t1 = setTimeout(() => {
      setStage('emblem');
    }, 100);

    // Step 2: Typographic brand name expands
    const t2 = setTimeout(() => {
      setStage('reveal');
    }, 850);

    // Step 3: Shutter / curtain lift begins
    const t3 = setTimeout(() => {
      setStage('exit');
    }, 2000);

    // Step 4: Complete unmount
    const t4 = setTimeout(() => {
      setStage('done');
    }, 2850);

    // Escape key listener to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setStage('done');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forceShow]);

  // Once done, completely unmount from DOM
  if (stage === 'done') {
    return null;
  }

  const handleSkip = () => {
    setStage('done');
  };

  const isEmblemVisible = stage === 'emblem' || stage === 'reveal' || stage === 'exit';
  const isTextVisible = stage === 'reveal' || stage === 'exit';
  const isCurtainExiting = stage === 'exit';

  return (
    <aside
      aria-label="Brand introduction"
      aria-live="polite"
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-primary-dark text-white select-none overflow-hidden cursor-pointer intro-curtain-exit ${
        isCurtainExiting ? 'intro-curtain-sliding' : ''
      }`}
    >
      {/* Background Subtle Ambient Grain / Radial Wash */}
      <div className="absolute inset-0 bg-primary-dark pointer-events-none" />

      {/* Center Presentation Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        {/* 1. Official Leaping Deer Stag Logo (In place of "H") */}
        <div
          className={`intro-emblem-motion flex items-center justify-center text-white mb-6 ${
            isEmblemVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <TuwEmblem className="intro-emblem-size text-white drop-shadow-md" />
        </div>

        {/* 2. Typographic Reveal: The Unplugged Wear */}
        <div
          className={`intro-text-motion flex flex-col items-center space-y-3 ${
            isTextVisible
              ? 'opacity-100 translate-y-0 tracking-widest'
              : 'opacity-0 translate-y-4 tracking-normal'
          }`}
        >
          <span className="font-heading font-extrabold text-2xl sm:text-4xl uppercase text-white leading-none">
            The Unplugged Wear
          </span>

          {/* Thin Gold Accent Line */}
          <div
            className={`h-px bg-store-gold intro-line-motion ${
              isTextVisible ? 'w-24 opacity-80' : 'w-0 opacity-0'
            }`}
          />

          {/* Slow-Fashion Ethos Tagline */}
          <span className="font-sans font-medium text-2xs sm:text-xs uppercase tracking-widest text-white/70">
            Architectural Form • Zero Deadstock
          </span>
        </div>
      </div>

      {/* Floating Skip Prompt in Top Right */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-2xs font-sans uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/20 transition-colors z-20 cursor-pointer"
      >
        Skip [Esc]
      </button>
    </aside>
  );
}

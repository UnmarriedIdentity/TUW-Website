'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, RotateCcw } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { useStore } from '@/mocks/store';
import { formatINR } from '@/lib/format';
import { cn } from '@/lib/cn';

export type FittingAudience = 'men' | 'women' | 'kids';

interface FittingLook {
  id: string;
  title: string;
  cat: string;
  priceINR: number;
  image: string;
}

interface FittingSet {
  base: FittingLook & { badge: string };
  cards: FittingLook[];
}

const AUDIENCE_ORDER: FittingAudience[] = ['men', 'women', 'kids'];

const AUDIENCE_LABELS: Record<FittingAudience, string> = {
  men: 'Men',
  women: 'Women',
  kids: 'Kids',
};

const FITTING_SETS: Record<FittingAudience, FittingSet> = {
  men: {
    base: {
      id: 'nc-m3',
      title: 'Atelier Signature Overshirt',
      cat: 'OVERSHIRT',
      priceINR: 2100,
      image: '/images/section image/m3.png',
      badge: 'Signature Drop',
    },
    cards: [
      {
        id: 'nc-m1',
        title: 'Tailored Ivory Oxford',
        cat: 'OXFORD SHIRT',
        priceINR: 1899,
        image: '/images/section image/m1.png',
      },
      {
        id: 'nc-m2',
        title: 'Sandstone Camp Shirt',
        cat: 'CAMP SHIRT',
        priceINR: 1450,
        image: '/images/section image/m2.png',
      },
      {
        id: 'nc-m4',
        title: 'Canyon Twill Overshirt',
        cat: 'OVERSHIRT',
        priceINR: 1750,
        image: '/images/section image/m4.png',
      },
      {
        id: 'nc-m5',
        title: 'Onyx Minimal Tee',
        cat: 'T-SHIRT',
        priceINR: 1299,
        image: '/images/section image/m5.png',
      },
    ],
  },
  women: {
    base: {
      id: 'nc-w3',
      title: 'Atelier Sculpted Dress',
      cat: 'DRESS',
      priceINR: 2299,
      image: '/images/section image/w3.png',
      badge: 'Signature Drop',
    },
    cards: [
      {
        id: 'nc-w1',
        title: 'Ivory Draped Blouse',
        cat: 'BLOUSE',
        priceINR: 1799,
        image: '/images/section image/w1.png',
      },
      {
        id: 'nc-w2',
        title: 'Rosewood Soft Knit',
        cat: 'KNIT',
        priceINR: 1599,
        image: '/images/section image/w2.png',
      },
      {
        id: 'nc-w4',
        title: 'Ecru Relaxed Shirt',
        cat: 'SHIRT',
        priceINR: 1499,
        image: '/images/section image/w4.png',
      },
      {
        id: 'nc-w5',
        title: 'Noir Gallery Tee',
        cat: 'T-SHIRT',
        priceINR: 1399,
        image: '/images/section image/w5.png',
      },
    ],
  },
  kids: {
    base: {
      id: 'nc-k3',
      title: 'Little Atelier Pinafore',
      cat: 'PINAFORE',
      priceINR: 1299,
      image: '/images/section image/k3.png',
      badge: 'Signature Drop',
    },
    cards: [
      {
        id: 'nc-k1',
        title: 'Mini Ivory Shirt',
        cat: 'SHIRT',
        priceINR: 999,
        image: '/images/section image/k1.png',
      },
      {
        id: 'nc-k2',
        title: 'Playdate Soft Set',
        cat: 'SET',
        priceINR: 1199,
        image: '/images/section image/k2.png',
      },
      {
        id: 'nc-k4',
        title: 'Dune Twill Shirt',
        cat: 'SHIRT',
        priceINR: 1099,
        image: '/images/section image/k4.png',
      },
      {
        id: 'nc-k5',
        title: 'Cloud Soft Sweatshirt',
        cat: 'SWEATSHIRT',
        priceINR: 899,
        image: '/images/section image/k5.png',
      },
    ],
  },
};

export default function VirtualFittingRoom() {
  const { isInWishlist, toggleWishlist } = useStore();
  const [audience, setAudience] = useState<FittingAudience>('men');
  const [current, setCurrent] = useState(-1);
  const [liveMsg, setLiveMsg] = useState('Men base look.');

  const busyRef = useRef(false);
  const queuedRef = useRef<number | null>(null);
  const currentRef = useRef(-1);
  const audienceRef = useRef<FittingAudience>('men');
  const reducedRef = useRef(false);
  const runRef = useRef(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const baseImgRef = useRef<HTMLImageElement>(null);
  const topLayerRef = useRef<HTMLDivElement>(null);
  const topImgRef = useRef<HTMLImageElement>(null);
  const scanRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const slotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardBtnRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const set = FITTING_SETS[audience];
  const worn = current >= 0 ? set.cards[current] : null;

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Pre-decode every frame so first tap and repeat taps behave identically (cached).
  useEffect(() => {
    const urls = [FITTING_SETS[audience].base.image, ...FITTING_SETS[audience].cards.map((c) => c.image)];
    urls.forEach((src) => {
      const im = new Image();
      im.src = src;
      void im.decode?.().catch(() => undefined);
    });
  }, [audience]);

  const preloadSrc = useCallback((src: string): Promise<void> => {
    return new Promise((resolve) => {
      const im = new Image();
      let done = false;
      const finish = () => {
        if (!done) {
          done = true;
          resolve();
        }
      };
      const timer = window.setTimeout(finish, 1500);
      im.onload = () => {
        window.clearTimeout(timer);
        if (im.decode) {
          im.decode().then(finish, finish);
        } else finish();
      };
      im.onerror = () => {
        window.clearTimeout(timer);
        finish();
      };
      im.src = src;
    });
  }, []);

  // Gentle idle float on the garment slots (desktop delight, skipped for reduced motion)
  useEffect(() => {
    if (reducedRef.current) return;
    const anims = slotRefs.current.map((el, i) => {
      if (!el) return null;
      return el.animate([{ transform: 'translateY(-4px)' }, { transform: 'translateY(4px)' }], {
        duration: 3000 + i * 400,
        direction: 'alternate',
        iterations: Infinity,
        easing: 'ease-in-out',
        delay: i * 220,
      });
    });
    return () => anims.forEach((a) => a?.cancel());
  }, [audience]);

  const flyCardToStage = useCallback((t: number): Promise<void> => {
    const src = cardBtnRefs.current[t];
    const stage = stageRef.current;
    if (!src || !stage) return Promise.resolve();
    const r = src.getBoundingClientRect();
    const sr = stage.getBoundingClientRect();
    const clone = src.cloneNode(true) as HTMLElement;
    clone.setAttribute('aria-hidden', 'true');
    clone.style.position = 'fixed';
    clone.style.left = `${r.left}px`;
    clone.style.top = `${r.top}px`;
    clone.style.width = `${r.width}px`;
    clone.style.height = `${r.height}px`;
    clone.style.margin = '0';
    clone.style.zIndex = '60';
    clone.style.pointerEvents = 'none';
    document.body.append(clone);
    const sx = r.left + r.width / 2;
    const sy = r.top + r.height / 2;
    const ex = sr.left + sr.width / 2;
    const ey = sr.top + sr.height * 0.4;
    const dx = ex - sx;
    const dy = ey - sy;
    const lift = Math.min(-60, -Math.hypot(dx, dy) * 0.15);
    const anim = clone.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${dx * 0.5}px, ${dy * 0.5 + lift}px) scale(0.72)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.42)`, opacity: 0.4 },
      ],
      { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
    return anim.finished.then(
      () => clone.remove(),
      () => clone.remove()
    );
  }, []);

  const pulseRing = useCallback(() => {
    const ring = ringRef.current;
    if (!ring) return Promise.resolve();
    const anim = ring.animate(
      [
        { transform: 'scale(0.4)', opacity: 1 },
        { transform: 'scale(1.7)', opacity: 0 },
      ],
      { duration: 450, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
    return anim.finished.then(
      () => undefined,
      () => undefined
    );
  }, []);

  const revealLook = useCallback((top: HTMLElement, wear: boolean): Promise<void> => {
    const scan = scanRef.current;
    const stage = stageRef.current;
    const height = stage?.offsetHeight ?? 600;
    const from = wear ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)';
    const to = wear ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)';
    top.style.clipPath = from;
    void top.offsetWidth;
    const D = 780;
    const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const clipAnim = top.animate([{ clipPath: from }, { clipPath: to }], {
      duration: D,
      easing: EASE,
      fill: 'forwards',
    });
    const jobs: Array<Promise<unknown>> = [
      clipAnim.finished.then(
        () => undefined,
        () => undefined
      ),
    ];
    if (scan) {
      // Scan edge rides exactly on the clip boundary: same duration + easing.
      const scanAnim = wear
        ? scan.animate(
            [
              { transform: 'translateY(-4px)', opacity: 1 },
              { transform: `translateY(${height}px)`, opacity: 1, offset: 0.85 },
              { transform: `translateY(${height}px)`, opacity: 0 },
            ],
            { duration: D, easing: EASE, fill: 'forwards' }
          )
        : scan.animate(
            [
              { transform: `translateY(${height}px)`, opacity: 1 },
              { transform: 'translateY(-4px)', opacity: 1, offset: 0.85 },
              { transform: 'translateY(-4px)', opacity: 0 },
            ],
            { duration: D, easing: EASE, fill: 'forwards' }
          );
      jobs.push(
        scanAnim.finished.then(
          () => undefined,
          () => undefined
        )
      );
    }
    if (stage) {
      const settle = stage.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.012)', offset: 0.5 }, { transform: 'scale(1)' }],
        { duration: D, easing: 'ease-in-out' }
      );
      jobs.push(
        settle.finished.then(
          () => undefined,
          () => undefined
        )
      );
    }
    return Promise.all(jobs).then(() => {
      top.style.clipPath = to;
      if (scan) {
        scan.getAnimations().forEach((a) => {
          try {
            a.cancel();
          } catch {
            /* noop */
          }
        });
      }
    });
  }, []);

  // Every wear uses revealLook so the scan line always leads the cloth.
  const play = useCallback(
    (t: number) => {
      const startedAudience = audienceRef.current;
      const activeSet = FITTING_SETS[startedAudience];
      const prev = currentRef.current;
      const wear = t >= 0;
      const look = wear ? activeSet.cards[t] : null;
      const top = topLayerRef.current;
      const img = topImgRef.current;
      if (!top || !img) return;
      busyRef.current = true;
      const finish = () => {
        busyRef.current = false;
        if (audienceRef.current !== startedAudience) {
          const next = queuedRef.current;
          queuedRef.current = null;
          if (next !== null) play(next);
          return;
        }
        currentRef.current = t;
        setCurrent(t);
        setLiveMsg(look ? `Now wearing: ${look.title}` : `${AUDIENCE_LABELS[startedAudience]} base look.`);
        const next = queuedRef.current;
        queuedRef.current = null;
        if (next !== null) play(next);
      };
      if (reducedRef.current) {
        if (baseImgRef.current) baseImgRef.current.src = activeSet.base.image;
        img.src = look ? look.image : activeSet.base.image;
        top.style.clipPath = look ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)';
        finish();
        return;
      }
      (async () => {
        const runId = ++runRef.current;
        const isStale = () => runId !== runRef.current || audienceRef.current !== startedAudience;
        const abort = () => {
          // Never leave the room locked: release busy and drain one queued tap.
          busyRef.current = false;
          const next = queuedRef.current;
          queuedRef.current = null;
          if (next !== null && audienceRef.current === startedAudience) play(next);
        };
        if (wear && look) {
          // Every wear uses the same cinematic order: line first, cloth second.
          // 1. Keep the old look on stage during fly + pulse (no pop).
          // 2. Preload the target so decode never flashes mid-reveal.
          const preload = preloadSrc(look.image);
          if (prev >= 0) {
            await flyCardToStage(t);
            if (isStale()) {
              abort();
              return;
            }
            await pulseRing();
            if (isStale()) {
              abort();
              return;
            }
            await preload;
            if (isStale()) {
              abort();
              return;
            }
          } else {
            top.style.clipPath = 'inset(0 0 100% 0)';
            img.src = look.image;
            await flyCardToStage(t);
            if (isStale()) {
              abort();
              return;
            }
            await pulseRing();
            if (isStale()) {
              abort();
              return;
            }
            await preload;
            if (isStale()) {
              abort();
              return;
            }
          }
          if (prev >= 0) {
            const oldLook = activeSet.cards[prev];
            // Stage the old look underneath so hiding the top never flashes base.
            if (baseImgRef.current && oldLook) baseImgRef.current.src = oldLook.image;
            top.style.clipPath = 'inset(0 0 100% 0)';
            img.src = look.image;
            try {
              await img.decode?.();
            } catch {
              // Ignore decode errors; reveal still runs.
            }
            if (isStale()) {
              abort();
              return;
            }
          } else {
            try {
              await img.decode?.();
            } catch {
              // Ignore decode errors; reveal still runs.
            }
            if (isStale()) {
              abort();
              return;
            }
          }
          await revealLook(top, true);
          if (isStale()) {
            abort();
            return;
          }
          if (baseImgRef.current) baseImgRef.current.src = activeSet.base.image;
        } else {
          // Look -> base: reverse reveal back to the base look.
          if (baseImgRef.current) baseImgRef.current.src = activeSet.base.image;
          await revealLook(top, false);
          if (isStale()) {
            abort();
            return;
          }
        }
        finish();
      })().catch(() => {
        if (look) img.src = look.image;
        top.style.clipPath = look ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)';
        if (baseImgRef.current) baseImgRef.current.src = activeSet.base.image;
        finish();
      });
    },
    [flyCardToStage, pulseRing, revealLook, preloadSrc]
  );

  const enqueue = useCallback(
    (t: number) => {
      if (busyRef.current) {
        queuedRef.current = t;
        return;
      }
      play(t);
    },
    [play]
  );

  const requestWear = useCallback(
    (i: number) => {
      if (!busyRef.current && i === currentRef.current) {
        if (i === -1) {
          const stage = stageRef.current;
          if (stage && !reducedRef.current) {
            const pulse = stage.animate(
              [{ transform: 'scale(1)' }, { transform: 'scale(1.012)' }, { transform: 'scale(1)' }],
              { duration: 350, easing: 'ease-in-out' }
            );
            pulse.finished.catch(() => undefined);
          }
          setLiveMsg(`${AUDIENCE_LABELS[audienceRef.current]} base look.`);
          return;
        }
        enqueue(-1);
        return;
      }
      enqueue(i);
    },
    [enqueue]
  );

  const stepLook = useCallback(
    (dir: 1 | -1) => {
      const base = currentRef.current;
      const next = base < 0 ? (dir > 0 ? 0 : 3) : (base + dir + 4) % 4;
      enqueue(next);
    },
    [enqueue]
  );

  const switchAudience = useCallback((key: FittingAudience) => {
    if (key === audienceRef.current) return;
    runRef.current += 1;
    audienceRef.current = key;
    setAudience(key);
    queuedRef.current = null;
    currentRef.current = -1;
    setCurrent(-1);
    const nextSet = FITTING_SETS[key];
    if (baseImgRef.current) baseImgRef.current.src = nextSet.base.image;
    if (topImgRef.current) topImgRef.current.src = nextSet.base.image;
    if (topLayerRef.current) topLayerRef.current.style.clipPath = 'inset(0 0 100% 0)';
    setLiveMsg(`${AUDIENCE_LABELS[key]} base look.`);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentRef.current !== -1) requestWear(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [requestWear]);

  const handleTilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reducedRef.current || e.pointerType === 'touch' || busyRef.current) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 14}deg) rotateX(${-py * 14}deg) translateY(-4px)`;
  };

  const resetTilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = '';
  };

  const handleRoomMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedRef.current || e.pointerType === 'touch') return;
    const tilt = tiltRef.current;
    if (!tilt) return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    tilt.style.transform = `perspective(1200px) rotateY(${nx * 3}deg) rotateX(${-ny * 3}deg)`;
  };

  const resetRoomTilt = () => {
    if (tiltRef.current) tiltRef.current.style.transform = '';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-8 sm:mb-10">
        <div>
          <span className="flex items-center gap-3 text-2xs font-bold uppercase tracking-widest text-store-text-secondary font-sans mb-2">
            <span aria-hidden="true" className="w-7 h-px bg-store-gold" />
            Virtual Fitting Room
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-store-text-primary">
            Choose a piece. Watch it get worn.
          </h2>
          <p className="text-sm text-store-text-secondary font-sans mt-2 max-w-lg">
            Tap any garment and it slides onto the same model — no changing room needed.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <p aria-live="polite" className="text-xs text-store-text-secondary font-sans tuw-tabular-nums">
            {AUDIENCE_LABELS[audience]} • {current >= 0 ? `0${current + 1} / 04` : 'Base / 04'}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => stepLook(-1)}
              aria-label="Wear previous look"
              className="w-10 h-10 rounded-full border border-store-border bg-store-surface hover:bg-store-cream flex items-center justify-center text-store-text-primary transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft size={18} color="currentColor" className="text-store-text-primary" />
            </button>
            <button
              type="button"
              onClick={() => stepLook(1)}
              aria-label="Wear next look"
              className="w-10 h-10 rounded-full bg-store-action-primary text-white hover:bg-store-action-hover flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <ChevronRight size={18} color="currentColor" className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Audience tabs */}
      <div
        role="tablist"
        aria-label="Fitting room audience"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 mb-8 sm:mb-10"
      >
        {AUDIENCE_ORDER.map((key) => {
          const isActive = key === audience;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => switchAudience(key)}
              className={cn(
                'px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer',
                isActive
                  ? 'bg-store-action-primary text-white shadow-xs'
                  : 'bg-transparent text-store-text-secondary border border-store-border hover:border-store-action-primary hover:text-store-text-primary'
              )}
            >
              {AUDIENCE_LABELS[key]}
            </button>
          );
        })}
      </div>

      {/* Fitting room */}
      <div
        className="vfr-room"
        onPointerMove={handleRoomMove}
        onPointerLeave={resetRoomTilt}
      >
        <div className="vfr-track">
          {set.cards.map((look, i) => {
            const isOn = current === i;
            const isFav = isInWishlist(look.id);
            return (
              <div
                key={look.id}
                ref={(el) => {
                  slotRefs.current[i] = el;
                }}
                className="vfr-slot"
              >
                <button
                  ref={(el) => {
                    cardBtnRefs.current[i] = el;
                  }}
                  type="button"
                  aria-pressed={isOn}
                  aria-label={isOn ? `${look.title} is on the model, tap to remove` : `Wear ${look.title}`}
                  onClick={() => requestWear(i)}
                  onPointerMove={handleTilt}
                  onPointerLeave={resetTilt}
                  className={cn('vfr-card', isOn ? 'vfr-card-on' : '')}
                >
                  <span className="vfr-ph">
                    <span aria-hidden="true" className="vfr-num">
                      {i + 1}
                    </span>
                    <img
                      src={look.image}
                      alt={look.title}
                      width={941}
                      height={1672}
                      loading="lazy"
                      draggable={false}
                    />
                  </span>
                </button>
                <div className="flex items-start justify-between gap-2 px-1 pt-2">
                  <div>
                    <p className="font-sans font-semibold text-sm text-store-text-primary">{look.title}</p>
                    <p className="text-2xs text-store-text-secondary mt-0.5">
                      {isOn ? 'ON THE MODEL' : `0${i + 1} / ${look.cat} · TAP TO WEAR`}
                    </p>
                    <p className="font-heading font-extrabold text-xs text-store-text-primary tuw-tabular-nums mt-1">
                      {formatINR(look.priceINR * 100)}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-pressed={isFav}
                    aria-label={isFav ? `Remove ${look.title} from wishlist` : `Save ${look.title} to wishlist`}
                    onClick={() => toggleWishlist(look.id)}
                    className="w-8 h-8 rounded-full bg-store-surface border border-store-border flex items-center justify-center transition-all duration-200 hover:bg-store-cream cursor-pointer shrink-0"
                  >
                    <Heart
                      size={14}
                      color="currentColor"
                      className={cn(isFav ? 'fill-secondary-purple text-secondary-purple' : 'text-store-text-primary')}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="vfr-stage-col">
          <div ref={tiltRef} className="vfr-stage-tilt">
            <div
              ref={stageRef}
              role="img"
              aria-label={`Model wearing ${worn ? worn.title : set.base.title}`}
              className="vfr-stage"
            >
              <div className="vfr-layer">
                <img ref={baseImgRef} src={set.base.image} alt="" width={941} height={1672} draggable={false} />
              </div>
              <div ref={topLayerRef} className="vfr-layer" style={{ clipPath: 'inset(0 0 100% 0)' }}>
                <img ref={topImgRef} src={set.base.image} alt="" width={941} height={1672} draggable={false} />
              </div>
              <span ref={scanRef} aria-hidden="true" className="vfr-scan" />
              <span ref={ringRef} aria-hidden="true" className="vfr-ring" />
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="dark" size="sm">
                  {set.base.badge}
                </Badge>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-2xs font-bold uppercase tracking-widest text-store-text-secondary font-sans">
              {worn ? 'Now wearing' : 'Base look'} • {AUDIENCE_LABELS[audience]}
            </p>
            <p className="font-heading font-bold text-sm text-store-text-primary mt-1">
              {worn ? worn.title : set.base.title}{' '}
              <span className="tuw-tabular-nums">{formatINR((worn ? worn.priceINR : set.base.priceINR) * 100)}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => requestWear(-1)}
            className="inline-flex items-center gap-2 px-6 h-11 rounded-full border border-store-action-primary bg-transparent text-store-action-primary hover:bg-store-action-primary hover:text-white font-sans font-medium text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer"
          >
            <RotateCcw size={14} color="currentColor" aria-hidden="true" />
            <span>Reset look</span>
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {liveMsg}
      </p>
    </div>
  );
}

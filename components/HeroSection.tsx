'use client';

import React, { useState, useRef } from 'react';
import HotspotModal from './HotspotModal';
import { CONTACT_INFO, HOTSPOTS_DATA } from '@/lib/data';
import { HotspotInfo } from '@/types';
import { useScrollMotion } from '@/hooks/useScrollMotion';
import { PhoneIcon, ArrowRightIcon, StarIcon, ShieldCheckIcon, LeafIcon, SparklesIcon, WhatsAppIcon } from './Icons';

export default function HeroSection() {
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'render'>('3d');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: scrollRef, offsetY: heroScrollY } = useScrollMotion(0.1, 'down');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const hotspots = [
    { id: 'smoothie', top: '53%', left: '57%', label: 'Avocado Smoothie' },
    { id: 'toast', top: '61%', left: '44%', label: 'Avocado Toast' },
    { id: 'soup', top: '57%', left: '35%', label: 'Broccoli Soup' },
    { id: 'buttermilk', top: '57%', left: '69%', label: 'Green Buttermilk' },
  ];

  const handleFocusDish = (id: string) => {
    if (typeof window !== 'undefined' && (window as any).focusItemOnKart) {
      (window as any).focusItemOnKart(id);
    } else {
      setActiveHotspot(HOTSPOTS_DATA[id] || null);
    }
  };

  const waOrderUrl = `https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodeURIComponent(
    'Hi Fruitopia! I want to order fresh avocado treats from your Ashok Nagar kart.'
  )}`;

  return (
    <section
      id="hero"
      aria-label="Welcome to Fruitopia"
      className="relative min-h-screen flex items-center pt-32 pb-20 px-6 sm:px-8 overflow-hidden bg-transparent"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-avocado-400/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-0 w-[30rem] h-[30rem] rounded-full bg-cream-300/30 dark:bg-avocado-900/10 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16 relative z-10">
        
        {/* Left Column: Visual Hierarchy & 3-Second Rule Clarity */}
        <div className="lg:col-span-6 text-center lg:text-left space-y-6">
          
          {/* Eyebrow Value Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--cream-card)]/95 backdrop-blur-md border border-[var(--border)] text-xs font-semibold text-avocado-800 dark:text-avocado-300 shadow-soft-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" aria-hidden="true" />
            <span className="tracking-wide">Artisanal Street Kart • Ashok Nagar, Chennai</span>
          </div>

          {/* Large, Bold Heading (H1) Stating Value within 3 Seconds */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold text-[var(--text-main)] leading-[1.08] tracking-tight">
            Pure Hass Avocado Eats.{' '}
            <span className="text-avocado-700 dark:text-avocado-400 relative inline-block">
              Crafted on the Street.
              <span className="absolute left-0 bottom-1 w-full h-3 bg-avocado-300/30 -z-10 rounded-md" aria-hidden="true" />
            </span>
          </h1>

          {/* Spacious, Highly Legible Sub-headline */}
          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Chennai&apos;s first dedicated Hass avocado food kart. Indulge in velvety fresh smoothies, artisan multigrain sourdough toasts, slow-simmered broccoli soup, and probiotic green buttermilk.
          </p>

          {/* Clear Call to Action (CTA) Group: High-Contrast Primary vs Secondary */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            {/* Primary High-Contrast Pop Button */}
            <a
              href={waOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-avocado-700 hover:bg-avocado-800 text-white font-bold text-base px-7 py-3.5 rounded-full shadow-soft hover:shadow-accent-glow hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-avocado-600"
            >
              <WhatsAppIcon size={19} className="text-emerald-300" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Secondary Clear Link */}
            <a
              href="#menu"
              className="inline-flex items-center gap-2 bg-[var(--cream-card)]/90 hover:bg-[var(--cream-dark)] text-[var(--text-main)] font-semibold text-base px-6 py-3.5 rounded-full border border-[var(--border)] shadow-soft-sm hover:border-avocado-600 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] backdrop-blur-md transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-avocado-600"
            >
              <span>Explore Curated Menu</span>
              <ArrowRightIcon size={16} />
            </a>
          </div>

          {/* Credibility & Perks Grid (Strict Scale & Ample Spacing) */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[var(--border)] max-w-lg mx-auto lg:mx-0">
            <div>
              <div className="font-display text-2xl lg:text-3xl font-bold text-avocado-700 dark:text-avocado-400">100%</div>
              <div className="text-xs text-[var(--text-muted)] font-medium leading-tight mt-0.5">Fresh Hass Avocados</div>
            </div>
            <div>
              <div className="font-display text-2xl lg:text-3xl font-bold text-avocado-700 dark:text-avocado-400">Artisan</div>
              <div className="text-xs text-[var(--text-muted)] font-medium leading-tight mt-0.5">Multigrain Breads</div>
            </div>
            <div>
              <div className="font-display text-2xl lg:text-3xl font-bold text-avocado-700 dark:text-avocado-400">₹76</div>
              <div className="text-xs text-[var(--text-muted)] font-medium leading-tight mt-0.5">Starting Healthy Sips</div>
            </div>
          </div>

        </div>

        {/* Right Column: Visual 3D Hero Portal & Micro-Interactions */}
        <div className="lg:col-span-6 relative w-full">
          
          {/* View Mode Switcher Pill */}
          <div className="flex items-center justify-center sm:justify-end gap-2 mb-3">
            <div className="inline-flex p-1 rounded-full bg-[var(--cream-card)]/95 backdrop-blur-md border border-[var(--border)] shadow-soft-sm">
              <button
                onClick={() => setViewMode('3d')}
                aria-pressed={viewMode === '3d'}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ease-in-out ${
                  viewMode === '3d'
                    ? 'bg-avocado-700 text-white shadow-soft-sm'
                    : 'text-[var(--text-muted)] hover:text-avocado-700'
                }`}
              >
                🎮 Interactive 3D Kart
              </button>
              <button
                onClick={() => setViewMode('render')}
                aria-pressed={viewMode === 'render'}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ease-in-out ${
                  viewMode === 'render'
                    ? 'bg-avocado-700 text-white shadow-soft-sm'
                    : 'text-[var(--text-muted)] hover:text-avocado-700'
                }`}
              >
                ✨ Studio 4K View
              </button>
            </div>
          </div>

          {/* Card Container with Soft Shadow & Rounded Corners */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full rounded-3xl overflow-hidden border border-[var(--border)] shadow-soft-lg transition-all duration-300 will-change-transform bg-[var(--cream-card)]/80 backdrop-blur-md"
            style={{
              perspective: '1000px',
              transform: `translateY(${heroScrollY}px)`,
            }}
          >
            {viewMode === '3d' ? (
              /* LIVE 3D PORTAL */
              <div className="relative w-full min-h-[460px] sm:min-h-[500px] p-6 flex flex-col justify-between rounded-3xl bg-gradient-to-b from-white/30 via-transparent to-white/10 dark:from-black/30 dark:to-black/10 backdrop-blur-[1px]">
                
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="px-3.5 py-1.5 rounded-full bg-[var(--cream-card)]/95 backdrop-blur-md border border-[var(--border)] text-xs font-semibold text-avocado-800 dark:text-avocado-300 shadow-soft-sm flex items-center gap-1.5">
                    <LeafIcon size={14} className="text-avocado-600" />
                    <span>Pure Haas Avocado • Fresh Daily</span>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-full bg-[var(--cream-card)]/95 backdrop-blur-md border border-[var(--border)] text-xs font-semibold text-[var(--text-muted)] shadow-soft-sm flex items-center gap-1.5">
                    <StarIcon size={13} className="text-amber-500" />
                    <span>4.9★ Local Rating</span>
                  </div>
                </div>

                {/* Center Prompt Guidance */}
                <div className="text-center my-auto pointer-events-none select-none py-10">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-avocado-900/70 text-white text-xs font-medium backdrop-blur-md shadow-soft-md border border-white/20">
                    <SparklesIcon size={14} className="text-amber-300 animate-spin" />
                    <span>Drag to spin 3D Kart • Scroll down to tour</span>
                  </span>
                </div>

                {/* Bottom Interactive Dish Selector */}
                <div className="space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-between">
                    <span>Quick Camera Focus</span>
                    <span className="text-avocado-700 dark:text-avocado-400 font-semibold text-[11px]">Tap dish to inspect on kart ↗</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <button
                      onClick={() => handleFocusDish('smoothie')}
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[var(--cream-card)]/95 hover:bg-avocado-700 hover:text-white backdrop-blur-md border border-[var(--border)] shadow-soft-sm hover:shadow-soft active:scale-95 transition-all duration-200 ease-in-out group cursor-pointer text-[var(--text-main)]"
                    >
                      <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🥑</span>
                      <span className="text-xs font-bold leading-tight">Smoothie</span>
                      <span className="text-[11px] opacity-80 font-medium">₹195</span>
                    </button>

                    <button
                      onClick={() => handleFocusDish('toast')}
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[var(--cream-card)]/95 hover:bg-avocado-700 hover:text-white backdrop-blur-md border border-[var(--border)] shadow-soft-sm hover:shadow-soft active:scale-95 transition-all duration-200 ease-in-out group cursor-pointer text-[var(--text-main)]"
                    >
                      <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🍞</span>
                      <span className="text-xs font-bold leading-tight">Guac Toast</span>
                      <span className="text-[11px] opacity-80 font-medium">₹129+</span>
                    </button>

                    <button
                      onClick={() => handleFocusDish('soup')}
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[var(--cream-card)]/95 hover:bg-avocado-700 hover:text-white backdrop-blur-md border border-[var(--border)] shadow-soft-sm hover:shadow-soft active:scale-95 transition-all duration-200 ease-in-out group cursor-pointer text-[var(--text-main)]"
                    >
                      <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🥣</span>
                      <span className="text-xs font-bold leading-tight">Broccoli Soup</span>
                      <span className="text-[11px] opacity-80 font-medium">₹99</span>
                    </button>

                    <button
                      onClick={() => handleFocusDish('buttermilk')}
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[var(--cream-card)]/95 hover:bg-avocado-700 hover:text-white backdrop-blur-md border border-[var(--border)] shadow-soft-sm hover:shadow-soft active:scale-95 transition-all duration-200 ease-in-out group cursor-pointer text-[var(--text-main)]"
                    >
                      <span className="text-xl mb-1 group-hover:scale-110 transition-transform">🥛</span>
                      <span className="text-xs font-bold leading-tight">Buttermilk</span>
                      <span className="text-[11px] opacity-80 font-medium">₹76</span>
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* Studio 3D High-Res Visual with Soft Parallax */
              <div
                ref={scrollRef}
                className="relative w-full aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center overflow-hidden transition-transform duration-200 ease-out bg-[var(--cream-card)]"
                style={{
                  transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
                }}
              >
                <img
                  src="/images/hero-cart.jpg"
                  alt="Fruitopia 3D Avocado Street Food Kart in Ashok Nagar Chennai"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="eager"
                />

                {/* Floating Hotspots on the Dishes */}
                {hotspots.map((spot) => {
                  const data = HOTSPOTS_DATA[spot.id];
                  if (!data) return null;

                  return (
                    <button
                      key={spot.id}
                      onClick={() => setActiveHotspot(data)}
                      style={{ top: spot.top, left: spot.left }}
                      className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center cursor-pointer"
                      title={`Click to view ${data.title}`}
                      aria-label={`View ${data.title}`}
                    >
                      <span className="absolute w-8 h-8 rounded-full bg-emerald-400/40 animate-ping" />
                      <span className="relative w-5 h-5 rounded-full bg-emerald-600 border-2 border-white shadow-soft flex items-center justify-center text-[10px] text-white font-bold group-hover:scale-125 transition-transform duration-200">
                        •
                      </span>
                      <span className="absolute bottom-full mb-2 hidden group-hover:flex px-3 py-1.5 rounded-xl bg-[var(--nav-bg)] backdrop-blur-md text-xs font-bold text-avocado-800 dark:text-avocado-300 shadow-soft-md border border-[var(--border)] whitespace-nowrap pointer-events-none">
                        {spot.label} • {data.price}
                      </span>
                    </button>
                  );
                })}

                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[var(--nav-bg)] backdrop-blur-md border border-[var(--border)] text-xs font-semibold text-avocado-800 dark:text-avocado-300 shadow-soft-sm flex items-center gap-1.5">
                  <LeafIcon size={13} className="text-avocado-600" />
                  <span>100% Hass Avocado</span>
                </div>

                <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[var(--nav-bg)] backdrop-blur-md border border-[var(--border)] text-xs font-semibold text-[var(--text-muted)] shadow-soft-sm flex items-center gap-1.5">
                  <StarIcon size={13} className="text-amber-500" />
                  <span>4.9★ Ashok Nagar</span>
                </div>

                <div className="absolute bottom-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-avocado-700 text-white text-[11px] font-semibold shadow-soft-sm pointer-events-none">
                  👆 Tap glowing pins to preview
                </div>
              </div>
            )}
          </div>

          {/* Hotspot Flyout Modal */}
          <HotspotModal hotspot={activeHotspot} onClose={() => setActiveHotspot(null)} />
        </div>

      </div>
    </section>
  );
}

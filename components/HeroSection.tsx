'use client';

import React, { useState, useRef } from 'react';
import HotspotModal from './HotspotModal';
import { CONTACT_INFO, HOTSPOTS_DATA } from '@/lib/data';
import { HotspotInfo } from '@/types';
import { useScrollMotion } from '@/hooks/useScrollMotion';

export default function HeroSection() {
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'render'>('3d');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: scrollRef, offsetY: heroScrollY } = useScrollMotion(0.12, 'down');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
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

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 px-6 overflow-hidden bg-transparent">
      {/* Background Decorative Glow Circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-avocado-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[30rem] h-[30rem] rounded-full bg-cream-300/30 dark:bg-avocado-900/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
        
        {/* Left Column: Hero Typography & Actions */}
        <div className="lg:col-span-5 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--cream-card)]/90 backdrop-blur-md border border-[var(--border)] text-xs font-semibold text-avocado-700 dark:text-avocado-300 shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
            <span>Chennai&apos;s Healthy Street Food Kart • Ashok Nagar</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-main)] leading-[1.08] mb-5 tracking-tight">
            Fresh, wholesome{' '}
            <span className="text-avocado-600 relative inline-block">
              bites and sips.
              <span className="absolute left-0 bottom-1.5 w-full h-3 bg-avocado-400/25 -z-10 rounded-md" />
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed mb-8">
            Experience real Hass avocado goodness crafted fresh before your eyes. Creamy silky smoothies, warm artisanal multigrain guac toasts, soothing warm soups, and cooling herbal sips.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="inline-flex items-center gap-2.5 bg-avocado-600 hover:bg-avocado-700 text-white font-bold text-base px-7 py-3.5 rounded-full shadow-lg shadow-avocado-600/30 hover:-translate-y-0.5 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Call to Order ({CONTACT_INFO.phone})</span>
            </a>

            <a
              href="#menu"
              className="inline-flex items-center gap-2 bg-[var(--cream-card)]/90 hover:bg-[var(--cream-dark)] text-[var(--text-main)] font-semibold text-base px-6 py-3.5 rounded-full border border-[var(--border)] shadow-sm hover:border-avocado-600 backdrop-blur-md transition-all"
            >
              <span>Explore Menu</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-dashed border-[var(--border)] max-w-lg mx-auto lg:mx-0">
            <div>
              <div className="font-display text-2xl font-bold text-avocado-600">100%</div>
              <div className="text-xs text-[var(--text-muted)] font-medium leading-tight">Hass Avocado Good Fats</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-avocado-600">Fresh</div>
              <div className="text-xs text-[var(--text-muted)] font-medium leading-tight">Artisan Multigrain Breads</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-avocado-600">₹76</div>
              <div className="text-xs text-[var(--text-muted)] font-medium leading-tight">Starting Healthy Sips</div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual 3D Hero Portal */}
        <div className="lg:col-span-7 relative w-full">
          
          {/* View Mode Switcher Pill */}
          <div className="flex items-center justify-center sm:justify-end gap-2 mb-3">
            <div className="inline-flex p-1 rounded-full bg-[var(--cream-card)]/90 backdrop-blur-md border border-[var(--border)] shadow-md">
              <button
                onClick={() => setViewMode('3d')}
                className={`interactive-control px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === '3d'
                    ? 'bg-avocado-600 text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-avocado-600'
                }`}
              >
                🎮 3D Animated World
              </button>
              <button
                onClick={() => setViewMode('render')}
                className={`interactive-control px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'render'
                    ? 'bg-avocado-600 text-white shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-avocado-600'
                }`}
              >
                ✨ Studio 4K Render
              </button>
            </div>
          </div>

          {/* Card Container with Scroll Motion and Tilt */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl transition-all duration-300 will-change-transform"
            style={{
              perspective: '1000px',
              transform: `translateY(${heroScrollY}px)`,
            }}
          >
            {viewMode === '3d' ? (
              /* LIVE 3D PORTAL: Lets the 3D cart in the background shine through cleanly */
              <div className="relative w-full min-h-[460px] sm:min-h-[520px] p-6 flex flex-col justify-between rounded-3xl bg-gradient-to-b from-white/20 via-transparent to-white/10 dark:from-black/20 dark:to-black/10 backdrop-blur-[1px]">
                
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="px-3.5 py-1.5 rounded-full bg-[var(--cream-card)]/90 backdrop-blur-md border border-[var(--border)] text-xs font-semibold text-avocado-700 dark:text-avocado-300 shadow-md flex items-center gap-1.5">
                    <span>🥑</span>
                    <span>100% Hass Avocado • Ashok Nagar</span>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-full bg-[var(--cream-card)]/90 backdrop-blur-md border border-[var(--border)] text-xs font-semibold text-[var(--text-muted)] shadow-md flex items-center gap-1.5">
                    <span className="text-amber-500">⭐</span>
                    <span>4.9★ Local Street Cart</span>
                  </div>
                </div>

                {/* Center Prompt Guidance */}
                <div className="text-center my-auto pointer-events-none select-none py-12">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-avocado-900/60 dark:bg-black/60 text-white text-xs font-medium backdrop-blur-md shadow-lg border border-white/20">
                    <span className="animate-spin text-sm">✦</span>
                    <span>Drag anywhere to spin 3D cart • Scroll to tour</span>
                  </span>
                </div>

                {/* Bottom Interactive Dish Selector & Camera Zoom Hotspot Pills */}
                <div className="space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] text-center sm:text-left flex items-center justify-between">
                    <span>Quick Dish Camera Zoom:</span>
                    <span className="text-avocado-600 text-[10px]">Tap to inspect on cart ↗</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => handleFocusDish('smoothie')}
                      className="interactive-control flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[var(--cream-card)]/90 hover:bg-avocado-600 hover:text-white backdrop-blur-md border border-[var(--border)] shadow-md transition-all group cursor-pointer"
                    >
                      <span className="text-lg mb-0.5 group-hover:scale-125 transition-transform">🥑</span>
                      <span className="text-xs font-bold leading-tight">Smoothie</span>
                      <span className="text-[11px] opacity-75 font-medium">₹195</span>
                    </button>

                    <button
                      onClick={() => handleFocusDish('toast')}
                      className="interactive-control flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[var(--cream-card)]/90 hover:bg-avocado-600 hover:text-white backdrop-blur-md border border-[var(--border)] shadow-md transition-all group cursor-pointer"
                    >
                      <span className="text-lg mb-0.5 group-hover:scale-125 transition-transform">🍞</span>
                      <span className="text-xs font-bold leading-tight">Guac Toast</span>
                      <span className="text-[11px] opacity-75 font-medium">₹129+</span>
                    </button>

                    <button
                      onClick={() => handleFocusDish('soup')}
                      className="interactive-control flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[var(--cream-card)]/90 hover:bg-avocado-600 hover:text-white backdrop-blur-md border border-[var(--border)] shadow-md transition-all group cursor-pointer"
                    >
                      <span className="text-lg mb-0.5 group-hover:scale-125 transition-transform">🥣</span>
                      <span className="text-xs font-bold leading-tight">Broccoli Soup</span>
                      <span className="text-[11px] opacity-75 font-medium">₹99</span>
                    </button>

                    <button
                      onClick={() => handleFocusDish('buttermilk')}
                      className="interactive-control flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[var(--cream-card)]/90 hover:bg-avocado-600 hover:text-white backdrop-blur-md border border-[var(--border)] shadow-md transition-all group cursor-pointer"
                    >
                      <span className="text-lg mb-0.5 group-hover:scale-125 transition-transform">🥛</span>
                      <span className="text-xs font-bold leading-tight">Buttermilk</span>
                      <span className="text-[11px] opacity-75 font-medium">₹76</span>
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* Studio 3D High-Res Visual with Parallax & Pulsing Hotspots */
              <div
                ref={scrollRef}
                className="relative w-full aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center overflow-hidden transition-transform duration-200 ease-out bg-[var(--cream-card)]"
                style={{
                  transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
                }}
              >
                <img
                  src="/images/hero-cart.jpg"
                  alt="Fruitopia 3D Avocado Street Food Kart"
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
                      className="interactive-control group absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center cursor-pointer"
                      title={`Click to view ${data.title}`}
                      aria-label={`View ${data.title}`}
                    >
                      <span className="absolute w-8 h-8 rounded-full bg-emerald-400/40 animate-ping" />
                      <span className="relative w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-lg flex items-center justify-center text-[10px] text-white font-bold group-hover:scale-125 transition-transform">
                        •
                      </span>
                      <span className="absolute bottom-full mb-2 hidden group-hover:flex px-2.5 py-1 rounded-lg bg-[var(--nav-bg)] backdrop-blur-md text-xs font-bold text-avocado-700 dark:text-avocado-300 shadow-md border border-[var(--border)] whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-90">
                        {spot.label} • {data.price}
                      </span>
                    </button>
                  );
                })}

                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[var(--nav-bg)] backdrop-blur-md border border-[var(--border)] text-xs font-semibold text-avocado-700 dark:text-avocado-300 shadow-md flex items-center gap-1.5">
                  <span>🥑</span>
                  <span>100% Hass Avocado • Fresh Daily</span>
                </div>

                <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-[var(--nav-bg)] backdrop-blur-md border border-[var(--border)] text-xs font-semibold text-[var(--text-muted)] shadow-md flex items-center gap-1.5">
                  <span className="text-amber-500">⭐</span>
                  <span>4.9★ Local Love in Ashok Nagar</span>
                </div>

                <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-avocado-600/90 text-white text-[11px] font-semibold shadow-md pointer-events-none">
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

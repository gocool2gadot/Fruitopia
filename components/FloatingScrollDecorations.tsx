'use client';

import React, { useEffect, useState } from 'react';

export default function FloatingScrollDecorations() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none">
      {/* 1. Floating High-Res Avocado on Upper Left */}
      <div
        className="absolute top-[22%] -left-6 sm:left-4 w-20 sm:w-28 transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(0, ${scrollY * -0.16}px, 0) rotate(${scrollY * 0.04}deg)`,
        }}
      >
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-2xl border-2 border-white/60 bg-white/40 backdrop-blur-sm animate-float-avo">
          <img
            src="/images/floating-avocado.jpg"
            alt="Floating Fresh Avocado"
            className="w-full h-full object-cover scale-110"
            loading="lazy"
          />
        </div>
      </div>

      {/* 2. Floating High-Res Lime on Right Margin */}
      <div
        className="absolute top-[48%] -right-4 sm:right-6 w-16 sm:w-24 transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(0, ${scrollY * 0.14}px, 0) rotate(${scrollY * -0.06}deg)`,
        }}
      >
        <div
          className="w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-2xl border-2 border-white/60 bg-white/40 backdrop-blur-sm"
          style={{ animation: 'floatAvo 4s ease-in-out infinite' }}
        >
          <img
            src="/images/floating-lime.jpg"
            alt="Floating Juicy Lime"
            className="w-full h-full object-cover scale-110"
            loading="lazy"
          />
        </div>
      </div>

      {/* 3. Floating Botanical Herb Pill */}
      <div
        className="absolute top-[72%] left-3 sm:left-8 transition-transform duration-200 ease-out opacity-80"
        style={{
          transform: `translate3d(0, ${scrollY * -0.1}px, 0) rotate(${scrollY * 0.08}deg)`,
        }}
      >
        <div className="px-3 py-1.5 rounded-full bg-[var(--cream-card)]/90 backdrop-blur-md border border-[var(--border)] shadow-lg flex items-center gap-2 text-xs font-semibold text-avocado-700 dark:text-avocado-300">
          <span className="text-base">🌿</span>
          <span className="hidden sm:inline">Fresh Herbs &amp; Lime</span>
        </div>
      </div>

      {/* 4. Floating Hass Good Fats Pill on Bottom Right */}
      <div
        className="absolute top-[88%] right-4 sm:right-12 transition-transform duration-200 ease-out opacity-85"
        style={{
          transform: `translate3d(0, ${scrollY * -0.15}px, 0) rotate(${scrollY * -0.03}deg)`,
        }}
      >
        <div className="px-3.5 py-1.5 rounded-full bg-[var(--cream-card)]/90 backdrop-blur-md border border-[var(--border)] shadow-xl flex items-center gap-2 text-xs font-bold text-avocado-600">
          <span className="text-base">🥑</span>
          <span>100% Hass Good Fats</span>
        </div>
      </div>
    </div>
  );
}

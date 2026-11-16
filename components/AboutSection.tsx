'use client';

import React from 'react';
import { useScrollMotion } from '@/hooks/useScrollMotion';

export default function AboutSection() {
  const { ref, offsetY } = useScrollMotion(0.14, 'down');

  return (
    <section id="about" className="py-24 px-6 bg-[var(--bg-page)]/75 backdrop-blur-md relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-14">
        
        {/* Left Column: Visual Quote Card with Scroll Parallax Motion */}
        <div ref={ref} className="lg:col-span-5 relative will-change-transform" style={{ transform: `translateY(${offsetY}px)` }}>
          <div className="bg-gradient-to-br from-avocado-600 to-avocado-800 text-white p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            <span className="text-4xl block mb-4">🌱🥑✨</span>
            <blockquote className="font-display text-2xl sm:text-3xl italic leading-snug mb-6">
              &ldquo;We started Fruitopia with a simple premise: street food can be utterly delicious, affordable, and deeply nourishing for your body.&rdquo;
            </blockquote>
            <div className="text-sm opacity-90 font-medium">
              <strong>Fruitopia Kitchen</strong> • Ashok Nagar, Chennai
            </div>
            {/* Background watermark */}
            <span className="absolute -right-8 -bottom-10 text-9xl opacity-10 select-none pointer-events-none">
              🥑
            </span>
          </div>

          <div className="mt-6 sm:mt-0 sm:absolute sm:-bottom-5 sm:left-6 bg-[var(--cream-card)] text-[var(--text-main)] p-4 sm:px-6 sm:py-3.5 rounded-2xl shadow-xl border border-[var(--border)] flex items-center gap-4">
            <div className="font-display text-3xl font-bold text-avocado-600">100%</div>
            <div className="text-xs font-semibold text-[var(--text-muted)] leading-tight">
              Grade-A Hass Avocados<br />Pure Good Fats Only
            </div>
          </div>
        </div>

        {/* Right Column: Mission and Pillars */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-avocado-600 bg-avocado-600/10 mb-3">
            <span>About Fruitopia</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-main)] mb-6">
            Chennai&apos;s First Avocado-Centered Street Food Kart
          </h2>

          <p className="text-base text-[var(--text-muted)] leading-relaxed mb-4">
            Nestled in the vibrant neighborhood of Ashok Nagar, Fruitopia is redefining quick street bites. We believe fast food doesn&apos;t have to mean refined oils, heavy sugars, or preservatives.
          </p>

          <p className="text-base text-[var(--text-muted)] leading-relaxed mb-6">
            From our velvety signature avocado smoothie to hearty multigrain guacamole toasts layered with fresh cottage cheese and warm simmering broccoli soup, every dish is prepared with clean ingredients, conscious hygiene, and uncompromising flavor.
          </p>

          <div className="space-y-3.5 pt-2">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-avocado-600/10 text-avocado-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                ✓
              </span>
              <p className="text-sm text-[var(--text-main)]">
                <strong>Guilt-Free Indulgence:</strong> Powered by heart-healthy monounsaturated fats from real Hass avocados.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-avocado-600/10 text-avocado-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                ✓
              </span>
              <p className="text-sm text-[var(--text-main)]">
                <strong>Pure & Wholesome:</strong> Multigrain artisan breads, house-crafted low-fat paneer, and fresh garden herbs.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-avocado-600/10 text-avocado-600 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                ✓
              </span>
              <p className="text-sm text-[var(--text-main)]">
                <strong>Pocket Friendly:</strong> Premium wellness café quality brought right onto the street at honest, accessible prices.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { useScrollMotion } from '@/hooks/useScrollMotion';
import { LeafIcon, ShieldCheckIcon, HeartPulseIcon, SparklesIcon, CheckIcon } from './Icons';

export default function AboutSection() {
  const { ref, offsetY } = useScrollMotion(0.12, 'down');

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-28 sm:py-36 px-6 sm:px-8 bg-[var(--bg-page)]/80 backdrop-blur-md relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-14 lg:gap-16">
        
        {/* Left Column: Artisanal Quote Card with Soft Parallax */}
        <div
          ref={ref}
          className="lg:col-span-5 relative will-change-transform"
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {/* Main Editorial Card */}
          <div className="bg-gradient-to-br from-avocado-800 via-avocado-900 to-[#12220B] text-white p-8 sm:p-10 rounded-3xl shadow-soft-xl border border-white/10 relative overflow-hidden">
            {/* Ambient Watermark */}
            <div className="text-3xl mb-4 text-emerald-300 flex items-center gap-2" aria-hidden="true">
              <LeafIcon size={28} />
              <SparklesIcon size={24} />
            </div>

            <blockquote className="font-display text-2xl sm:text-3xl italic leading-snug mb-6 text-cream-100 font-normal">
              &ldquo;We started Fruitopia with a simple conviction: street food can be utterly delicious, remarkably affordable, and deeply nourishing for your body.&rdquo;
            </blockquote>

            <div className="text-sm text-cream-200/90 font-medium">
              <strong className="text-white font-semibold">Fruitopia Kitchen</strong> • Ashok Nagar, Chennai
            </div>

            {/* Subtle background decoration */}
            <span className="absolute -right-6 -bottom-8 text-9xl opacity-10 select-none pointer-events-none" aria-hidden="true">
              🥑
            </span>
          </div>

          {/* Floating Authenticity Seal */}
          <div className="mt-6 sm:mt-0 sm:absolute sm:-bottom-6 sm:left-6 bg-[var(--cream-card)]/95 backdrop-blur-md text-[var(--text-main)] p-4 sm:px-6 sm:py-4 rounded-2xl shadow-soft-lg border border-[var(--border)] flex items-center gap-4 transition-transform hover:-translate-y-0.5 duration-200">
            <div className="w-12 h-12 rounded-xl bg-[var(--primary-subtle)] text-avocado-700 dark:text-avocado-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheckIcon size={26} />
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-avocado-700 dark:text-avocado-400 leading-none">100%</div>
              <div className="text-xs font-semibold text-[var(--text-muted)] leading-tight mt-1">
                Imported Hass Avocados<br />Zero Palm Oil or Refined Fats
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mission and Pillars with Generous Whitespace */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-avocado-800 dark:text-avocado-300 bg-[var(--primary-subtle)] border border-[var(--border)]">
            <LeafIcon size={13} className="text-avocado-600" />
            <span>Our Origin &amp; Philosophy</span>
          </div>
          
          <h2 id="about-heading" className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-[var(--text-main)] leading-tight tracking-tight">
            Chennai&apos;s First Avocado-Centered Street Food Kart
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Nestled on 10th Avenue in Ashok Nagar, Fruitopia re-imagines Indian street food culture through an uncompromising lens of wellness and culinary craftsmanship.
          </p>

          <p className="text-base text-[var(--text-muted)] leading-relaxed">
            From our velvety, rich signature avocado smoothie to warm sourdough multigrain guacamole toasts layered with fresh low-fat paneer and soothing broccoli soup, every dish is prepared in an open, squeaky-clean environment right before your eyes.
          </p>

          {/* Three Classic Pillars */}
          <div className="space-y-4 pt-3">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--cream-card)]/80 border border-[var(--border)] shadow-soft-sm hover:shadow-soft hover:border-avocado-600/30 transition-all duration-200 ease-in-out">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <HeartPulseIcon size={20} />
              </div>
              <div>
                <h4 className="text-base font-bold text-[var(--text-main)] mb-1">
                  Heart-Healthy Monounsaturated Fats
                </h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Real Hass avocados provide wholesome nourishment that fuels long-lasting energy without blood sugar spikes or heavy digestion.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--cream-card)]/80 border border-[var(--border)] shadow-soft-sm hover:shadow-soft hover:border-avocado-600/30 transition-all duration-200 ease-in-out">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <ShieldCheckIcon size={20} />
              </div>
              <div>
                <h4 className="text-base font-bold text-[var(--text-main)] mb-1">
                  Pure Multigrain &amp; Garden Fresh
                </h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Artisan whole-grain sourdough slices, freshly made low-fat cottage cheese, crunchy sweet corn, and crisp hydroponic herbs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--cream-card)]/80 border border-[var(--border)] shadow-soft-sm hover:shadow-soft hover:border-avocado-600/30 transition-all duration-200 ease-in-out">
              <div className="w-10 h-10 rounded-xl bg-avocado-600/10 text-avocado-700 dark:text-avocado-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <SparklesIcon size={20} />
              </div>
              <div>
                <h4 className="text-base font-bold text-[var(--text-main)] mb-1">
                  Honest Street-Side Pricing
                </h4>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  Experience Michelin-level café freshness at honest street-food prices starting at just ₹76 for our invigorating probiotic green buttermilk.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

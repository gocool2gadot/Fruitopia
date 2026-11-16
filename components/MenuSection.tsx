'use client';

import React, { useState } from 'react';
import { MENU_ITEMS, CONTACT_INFO } from '@/lib/data';
import { CategoryType, MenuItem } from '@/types';
import MotionImage from './MotionImage';
import { WhatsAppIcon, EyeIcon, SparklesIcon, LeafIcon } from './Icons';

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<CategoryType>('all');
  const [imageStyle, setImageStyle] = useState<'micro' | 'studio' | 'ref'>('micro');

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const handleFocusOnKart = (hotspotId?: string) => {
    if (hotspotId && typeof window !== 'undefined' && (window as any).focusItemOnKart) {
      (window as any).focusItemOnKart(hotspotId);
    }
  };

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="py-28 sm:py-36 px-6 sm:px-8 bg-[var(--cream)]/85 backdrop-blur-md border-y border-[var(--border-subtle)] relative overflow-hidden"
    >
      {/* Background Ambient Soft Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] rounded-full bg-avocado-400/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header with Spacious Editorial Typography */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-avocado-800 dark:text-avocado-300 bg-[var(--primary-subtle)] border border-[var(--border)] mb-4">
            <LeafIcon size={13} className="text-avocado-600" />
            <span>Handcrafted Street Gastronomy</span>
          </div>

          <h2 id="menu-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] mb-5 tracking-tight">
            Nutritious, Delicious &amp; 100% Real
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed mb-8">
            Honest ingredients, imported Hass avocados, warm artisanal multigrain sourdough toasts, and cold-pressed botanical elixirs. Made clean right before your eyes.
          </p>

          {/* Visual Presentation Mode Switcher Pill */}
          <div className="inline-flex flex-wrap items-center justify-center p-1 rounded-2xl sm:rounded-full bg-[var(--cream-card)] border border-[var(--border)] shadow-soft-sm text-xs gap-1">
            <button
              onClick={() => setImageStyle('micro')}
              aria-pressed={imageStyle === 'micro'}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ease-in-out ${
                imageStyle === 'micro'
                  ? 'bg-avocado-700 text-white shadow-soft-sm'
                  : 'text-[var(--text-muted)] hover:text-avocado-700'
              }`}
            >
              🔬 Cellular Microscopic Visuals
            </button>
            <button
              onClick={() => setImageStyle('studio')}
              aria-pressed={imageStyle === 'studio'}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ease-in-out ${
                imageStyle === 'studio'
                  ? 'bg-avocado-700 text-white shadow-soft-sm'
                  : 'text-[var(--text-muted)] hover:text-avocado-700'
              }`}
            >
              🥑 Studio Photography
            </button>
            <button
              onClick={() => setImageStyle('ref')}
              aria-pressed={imageStyle === 'ref'}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ease-in-out ${
                imageStyle === 'ref'
                  ? 'bg-avocado-700 text-white shadow-soft-sm'
                  : 'text-[var(--text-muted)] hover:text-avocado-700'
              }`}
            >
              📸 Fresh Street Gallery
            </button>
          </div>

          {/* Microscopic Cellular Info Badge */}
          {imageStyle === 'micro' && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200 animate-in fade-in duration-200">
              <SparklesIcon size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>
                Ultra-high-definition cellular microscopy: glowing plant lattices, natural lipid spheres &amp; cold-pressed avocado oil droplets.
              </span>
            </div>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap mb-14" role="tablist" aria-label="Menu categories">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'smoothies', label: '🥑 Smoothies' },
            { id: 'toasts', label: '🍞 Artisan Toasts' },
            { id: 'soups', label: '🥣 Warm Soups' },
            { id: 'drinks', label: '🥤 Cooling Drinks' },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id as CategoryType)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ease-in-out ${
                activeTab === tab.id
                  ? 'bg-avocado-700 text-white shadow-soft hover:bg-avocado-800'
                  : 'bg-[var(--cream-card)]/90 backdrop-blur-sm border border-[var(--border)] text-[var(--text-muted)] hover:border-avocado-600 hover:text-[var(--text-main)] hover:-translate-y-0.5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid: Spacious Layout with Soft Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredItems.map((item: MenuItem, index: number) => {
            const waUrl = `https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodeURIComponent(
              `Hi Fruitopia! I would like to order ${item.name} (₹${item.price}) from your Ashok Nagar kart.`
            )}`;

            let displayImage = item.microImage || item.image;
            if (imageStyle === 'studio') {
              displayImage = item.image;
            } else if (imageStyle === 'ref') {
              displayImage = item.refImage || item.image;
            }

            return (
              <article
                key={item.id}
                className="group bg-[var(--cream-card)]/95 backdrop-blur-md rounded-2xl border border-[var(--border)] p-6 sm:p-7 flex flex-col justify-between shadow-soft hover:shadow-soft-xl hover:border-avocado-600/40 hover:-translate-y-1.5 transition-all duration-200 ease-in-out relative overflow-hidden"
              >
                {/* Subtle Top Accent Indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-avocado-600 via-avocado-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />

                <div>
                  {/* Food Image with Parallax & Soft Borders */}
                  {displayImage && (
                    <div className="rounded-xl overflow-hidden mb-5 border border-[var(--border-subtle)] bg-avocado-100/40 dark:bg-avocado-950/40">
                      <MotionImage
                        src={displayImage}
                        alt={`Fresh preparation of ${item.name} at Fruitopia`}
                        containerClassName="h-56 w-full"
                        parallaxSpeed={0.08 + (index % 3) * 0.03}
                        enableTilt={true}
                      />
                    </div>
                  )}

                  {/* Badges Row */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-avocado-700 dark:text-avocado-300 bg-[var(--primary-subtle)] px-2.5 py-0.5 rounded-full border border-[var(--border)]">
                      {item.category}
                    </span>

                    {item.customizable && (
                      <span className="text-[11px] font-semibold text-salsa-600 dark:text-salsa-500 bg-salsa-500/10 border border-salsa-500/20 px-2.5 py-0.5 rounded-full">
                        ✨ Custom Toppings
                      </span>
                    )}

                    {item.badge && !item.customizable && (
                      <span className="text-[11px] font-semibold text-avocado-800 dark:text-avocado-200 bg-avocado-600/10 px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Price adhering to strict typographic scale */}
                  <div className="flex items-baseline justify-between gap-3 mb-3">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-main)] group-hover:text-avocado-700 dark:group-hover:text-avocado-400 transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <span className="font-display text-2xl font-bold text-avocado-700 dark:text-avocado-400 whitespace-nowrap">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Description with room to breathe */}
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="flex items-center justify-between gap-3 pt-5 border-t border-[var(--border-subtle)]">
                  {item.hotspotId ? (
                    <button
                      onClick={() => handleFocusOnKart(item.hotspotId)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-avocado-700 dark:text-avocado-300 hover:text-white bg-[var(--primary-subtle)] hover:bg-avocado-700 px-3.5 py-2 rounded-full transition-all duration-200 ease-in-out cursor-pointer active:scale-95"
                    >
                      <EyeIcon size={14} />
                      <span>View in 3D</span>
                    </button>
                  ) : (
                    <span className="text-xs font-medium text-[var(--text-muted)]">Prepared Fresh</span>
                  )}

                  {/* Primary High-Contrast WhatsApp CTA */}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-soft hover:shadow-soft-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 ease-in-out"
                  >
                    <WhatsAppIcon size={15} />
                    <span>Order Now</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

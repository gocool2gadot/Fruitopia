'use client';

import React, { useState } from 'react';
import { MENU_ITEMS, CONTACT_INFO } from '@/lib/data';
import { CategoryType, MenuItem } from '@/types';
import MotionImage from './MotionImage';

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
    <section id="menu" className="py-24 px-6 bg-[var(--cream)]/80 backdrop-blur-md border-y border-[var(--border-subtle)]/60 relative overflow-hidden">
      {/* Background ambient motion glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] rounded-full bg-avocado-400/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-avocado-600 bg-avocado-600/10 mb-3">
            <span>🥑 Handcrafted Healthy Bites</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] mb-4">
            Nutritious, Delicious & Real
          </h2>
          <p className="text-base text-[var(--text-muted)] max-w-2xl mx-auto mb-6">
            Fresh ingredients, authentic Hass avocados, warm multigrain toasts, and cold-pressed elixirs. Made clean right before your eyes.
          </p>

          {/* 3-Way Visual Mode Switcher Pill */}
          <div className="inline-flex flex-wrap items-center justify-center p-1 rounded-2xl sm:rounded-full bg-[var(--cream-card)] border border-[var(--border)] shadow-md text-xs gap-1">
            <button
              onClick={() => setImageStyle('micro')}
              className={`interactive-control px-4 py-2 rounded-full font-semibold transition-all ${
                imageStyle === 'micro'
                  ? 'bg-avocado-600 text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-avocado-600'
              }`}
            >
              🔬 Cellular Microscopic (Prompt Style)
            </button>
            <button
              onClick={() => setImageStyle('studio')}
              className={`interactive-control px-4 py-2 rounded-full font-semibold transition-all ${
                imageStyle === 'studio'
                  ? 'bg-avocado-600 text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-avocado-600'
              }`}
            >
              🥑 Studio Food Photography
            </button>
            <button
              onClick={() => setImageStyle('ref')}
              className={`interactive-control px-4 py-2 rounded-full font-semibold transition-all ${
                imageStyle === 'ref'
                  ? 'bg-avocado-600 text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-avocado-600'
              }`}
            >
              📸 Reference Gallery
            </button>
          </div>

          {/* Microscopic Cellular Concept Banner */}
          {imageStyle === 'micro' && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 animate-in fade-in zoom-in-95">
              <span>✨</span>
              <span>
                Extreme microscopic view: glowing cellular lattices, natural capillary strands &amp; oozing golden-green avocado oil droplets in motion.
              </span>
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'smoothies', label: '🥑 Smoothies' },
            { id: 'toasts', label: '🍞 Avocado Toasts' },
            { id: 'soups', label: '🥣 Soups' },
            { id: 'drinks', label: '🥤 Drinks & Sips' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CategoryType)}
              className={`interactive-control px-5 py-2.5 rounded-full font-semibold text-sm shadow-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-avocado-600 text-white shadow-md shadow-avocado-600/25'
                  : 'bg-[var(--cream-card)]/90 backdrop-blur-sm border border-[var(--border)] text-[var(--text-muted)] hover:border-avocado-600 hover:text-[var(--text-main)] hover:-translate-y-0.5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Grid with Scroll Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="group bg-[var(--cream-card)]/90 backdrop-blur-md rounded-2xl border border-[var(--border)] p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-2xl hover:border-avocado-400 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                {/* Accent top gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-avocado-500 to-avocado-300 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Motion-based Food Image with Scroll Parallax */}
                  {displayImage && (
                    <div className="rounded-xl overflow-hidden mb-4 border border-[var(--border-subtle)] bg-avocado-100/50 dark:bg-avocado-950/40">
                      <MotionImage
                        src={displayImage}
                        alt={item.name}
                        containerClassName="h-56 w-full"
                        parallaxSpeed={0.12 + (index % 3) * 0.04}
                        enableTilt={true}
                      />
                    </div>
                  )}

                  {/* Category and Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-avocado-600 bg-avocado-600/10 px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    {item.customizable && (
                      <span className="text-[11px] font-semibold text-salsa-500 bg-salsa-500/10 border border-salsa-500/20 px-2.5 py-0.5 rounded-full">
                        ✨ Customizable
                      </span>
                    )}
                    {item.badge && !item.customizable && (
                      <span className="text-[11px] font-semibold text-avocado-700 dark:text-avocado-300 bg-avocado-600/10 px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title and Price */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <h3 className="font-display text-xl font-bold text-[var(--text-main)] group-hover:text-avocado-600 transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-display text-2xl font-bold text-avocado-600 whitespace-nowrap">
                      ₹{item.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom Actions */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--border-subtle)]">
                  {item.hotspotId ? (
                    <button
                      onClick={() => handleFocusOnKart(item.hotspotId)}
                      className="interactive-control inline-flex items-center gap-1.5 text-xs font-semibold text-avocado-600 hover:text-white bg-avocado-600/10 hover:bg-avocado-600 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      <span>🔍 View on 3D Kart</span>
                    </button>
                  ) : (
                    <span className="text-xs text-[var(--text-muted)]">Fresh Daily</span>
                  )}

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive-control inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md shadow-[#25D366]/20 hover:-translate-y-0.5 transition-all"
                  >
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

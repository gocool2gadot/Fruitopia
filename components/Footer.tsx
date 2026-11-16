'use client';

import React from 'react';
import { CONTACT_INFO } from '@/lib/data';
import { MapPinIcon, PhoneIcon } from './Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-[var(--cream-dark)]/90 backdrop-blur-md py-16 px-6 sm:px-8 border-t border-[var(--border)] text-[var(--text-muted)] text-sm"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top Info Grid */}
        <div className="flex flex-wrap justify-between items-start gap-10 pb-10 border-b border-[var(--border-subtle)]">
          <div className="max-w-sm">
            <a
              href="#hero"
              className="flex items-center gap-2.5 text-2xl font-bold text-avocado-700 dark:text-avocado-400 mb-3"
            >
              <span className="text-3xl select-none" aria-hidden="true">🥑</span>
              <span className="font-display tracking-tight text-[var(--text-main)]">Fruitopia</span>
            </a>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              Chennai&apos;s pioneering artisanal avocado street food kart. Pure Hass goodness, fresh sourdough toasts, and wholesome sips in Ashok Nagar.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-[var(--text-main)] text-sm uppercase tracking-wider">
              Visit the Kart
            </h4>
            <div className="flex items-start gap-2 text-xs leading-relaxed max-w-xs">
              <MapPinIcon size={14} className="text-avocado-600 mt-0.5 flex-shrink-0" />
              <span>{CONTACT_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2 text-xs pt-1">
              <PhoneIcon size={14} className="text-avocado-600 flex-shrink-0" />
              <span>{CONTACT_INFO.phone}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 text-xs">
          <div>
            &copy; {currentYear} Fruitopia Street Food Kart. Handcrafted with passion &amp; Hass avocados.
          </div>
          <div className="flex items-center gap-6 font-medium">
            <a
              href="#hero"
              className="hover:text-avocado-700 dark:hover:text-avocado-400 transition-colors"
            >
              Back to top &uarr;
            </a>
            <a
              href="#menu"
              className="hover:text-avocado-700 dark:hover:text-avocado-400 transition-colors"
            >
              View Menu
            </a>
            <a
              href="#about"
              className="hover:text-avocado-700 dark:hover:text-avocado-400 transition-colors"
            >
              Our Story
            </a>
            <a
              href="#location"
              className="hover:text-avocado-700 dark:hover:text-avocado-400 transition-colors"
            >
              Find Us
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

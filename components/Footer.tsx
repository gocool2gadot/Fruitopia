'use client';

import React from 'react';
import { CONTACT_INFO } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--cream-dark)]/90 backdrop-blur-md py-14 px-6 border-t border-[var(--border)] text-[var(--text-muted)] text-sm">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-wrap justify-between items-start gap-8 pb-8 border-b border-[var(--border-subtle)]">
          <div>
            <a href="#hero" className="flex items-center gap-2 text-2xl font-bold text-avocado-600 mb-2">
              <span className="text-3xl">🥑</span>
              <span className="font-display">Fruitopia</span>
            </a>
            <p className="text-xs max-w-xs leading-relaxed">
              Fresh, wholesome street food kart in Ashok Nagar, Chennai. Good fats, genuine ingredients.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-[var(--text-main)] mb-1 text-sm">Visit the Kart</h5>
            <p className="text-xs">{CONTACT_INFO.address}</p>
            <p className="text-xs mt-1">Phone: {CONTACT_INFO.phone}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 text-xs">
          <div>
            © {currentYear} Fruitopia Street Food Kart. Handcrafted with love &amp; avocados.
          </div>
          <div className="flex gap-6 font-medium">
            <a href="#hero" className="hover:text-avocado-600 transition-colors">Back to top ↑</a>
            <a href="#menu" className="hover:text-avocado-600 transition-colors">View Menu</a>
            <a href="#location" className="hover:text-avocado-600 transition-colors">Find Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

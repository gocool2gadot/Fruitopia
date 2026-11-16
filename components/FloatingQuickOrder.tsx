'use client';

import React from 'react';
import { CONTACT_INFO } from '@/lib/data';
import { WhatsAppIcon } from './Icons';

export default function FloatingQuickOrder() {
  const waUrl = `https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodeURIComponent(
    'Hi Fruitopia! I would like to order fresh avocado treats from your Ashok Nagar kart.'
  )}`;

  return (
    <aside aria-label="Quick WhatsApp Order" className="fixed bottom-6 right-6 z-40">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order fresh avocado dishes on WhatsApp"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-3 rounded-full font-bold text-sm shadow-soft-xl hover:shadow-accent-glow hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-[#25D366]"
      >
        <WhatsAppIcon size={20} />
        <span className="tracking-wide">Quick WhatsApp Order</span>
      </a>
    </aside>
  );
}

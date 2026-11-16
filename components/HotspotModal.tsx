'use client';

import React from 'react';
import { HotspotInfo } from '@/types';
import { CONTACT_INFO } from '@/lib/data';

interface HotspotModalProps {
  hotspot: HotspotInfo | null;
  onClose: () => void;
}

export default function HotspotModal({ hotspot, onClose }: HotspotModalProps) {
  if (!hotspot) return null;

  const waUrl = `https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodeURIComponent(hotspot.waText)}`;

  return (
    <div className="absolute top-6 right-6 w-80 max-w-[calc(100%-48px)] bg-[var(--cream-card)] border border-[var(--border)] rounded-2xl p-5 shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-200">
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[var(--cream-dark)] hover:bg-salsa-500 hover:text-white flex items-center justify-center text-xs text-[var(--text-muted)] transition-colors"
      >
        ✕
      </button>

      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-avocado-600 bg-avocado-600/10 px-2 py-0.5 rounded-full mb-1">
        {hotspot.tag}
      </span>

      <h3 className="font-display text-xl font-bold text-[var(--text-main)] mb-0.5">
        {hotspot.title}
      </h3>

      <div className="font-display text-lg font-bold text-avocado-600 mb-2">
        {hotspot.price}
      </div>

      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
        {hotspot.desc}
      </p>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs py-2.5 rounded-full shadow-md shadow-[#25D366]/20 transition-all"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
        </svg>
        <span>Order via WhatsApp</span>
      </a>
    </div>
  );
}

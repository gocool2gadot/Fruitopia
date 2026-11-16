'use client';

import React from 'react';
import { HotspotInfo } from '@/types';
import { CONTACT_INFO } from '@/lib/data';
import { WhatsAppIcon, XIcon } from './Icons';

interface HotspotModalProps {
  hotspot: HotspotInfo | null;
  onClose: () => void;
}

export default function HotspotModal({ hotspot, onClose }: HotspotModalProps) {
  if (!hotspot) return null;

  const waUrl = `https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodeURIComponent(hotspot.waText)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={hotspot.title}
      className="absolute top-6 right-6 w-80 max-w-[calc(100%-48px)] bg-[var(--cream-card)]/95 backdrop-blur-md border border-[var(--border)] rounded-2xl p-5 shadow-soft-xl z-30 animate-in fade-in zoom-in-95 duration-200"
    >
      <button
        onClick={onClose}
        aria-label="Close dialog"
        className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-[var(--cream-dark)] hover:bg-salsa-600 hover:text-white flex items-center justify-center text-[var(--text-muted)] transition-colors active:scale-95"
      >
        <XIcon size={14} />
      </button>

      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-avocado-800 dark:text-avocado-300 bg-[var(--primary-subtle)] px-2.5 py-0.5 rounded-full mb-1.5 border border-[var(--border)]">
        {hotspot.tag}
      </span>

      <h3 className="font-display text-xl font-bold text-[var(--text-main)] mb-0.5 leading-snug">
        {hotspot.title}
      </h3>

      <div className="font-display text-lg font-bold text-avocado-700 dark:text-avocado-400 mb-2">
        {hotspot.price}
      </div>

      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 font-normal">
        {hotspot.desc}
      </p>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs py-2.5 rounded-full shadow-soft hover:shadow-soft-md active:scale-95 transition-all duration-200 ease-in-out"
      >
        <WhatsAppIcon size={15} />
        <span>Order via WhatsApp</span>
      </a>
    </div>
  );
}

'use client';

import React from 'react';
import { CONTACT_INFO } from '@/lib/data';

export default function LocationSection() {
  const waUrl = `https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodeURIComponent(
    'Hi Fruitopia! I would like to place an order for pickup/delivery in Ashok Nagar.'
  )}`;

  return (
    <section id="location" className="py-24 px-6 bg-[var(--cream)]/85 backdrop-blur-md border-t border-[var(--border-subtle)]/60 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-avocado-600 bg-avocado-600/10 mb-3">
            <span>Find Our 3D Kart</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] mb-4">
            Come Say Hello in Ashok Nagar
          </h2>
          <p className="text-base text-[var(--text-muted)]">
            Drop by our street food kart for your morning boost or evening wholesome cravings, or place an order via phone &amp; WhatsApp.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Card */}
          <div className="lg:col-span-5 bg-[var(--cream-card)]/90 backdrop-blur-md rounded-3xl border border-[var(--border)] p-8 sm:p-10 shadow-xl flex flex-col justify-between">
            <div className="space-y-7 mb-8">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-avocado-600/10 text-avocado-600 flex items-center justify-center text-xl flex-shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Address
                  </h4>
                  <p className="text-base font-semibold text-[var(--text-main)] leading-snug">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-avocado-600/10 text-avocado-600 flex items-center justify-center text-xl flex-shrink-0">
                  📞
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Call to Order / Inquiries
                  </h4>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="font-display text-2xl font-bold text-avocado-600 hover:underline block"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Fast local pick-up & delivery in and around Ashok Nagar
                  </p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-avocado-600/10 text-avocado-600 flex items-center justify-center text-xl flex-shrink-0">
                  ⏰
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Kart Timings
                  </h4>
                  <p className="text-base font-semibold text-[var(--text-main)]">
                    {CONTACT_INFO.timings}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Morning sips, post-workout bowls & evening warm toasts
                  </p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[var(--border-subtle)]">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-avocado-600 hover:bg-avocado-700 text-white font-bold text-sm py-3 px-5 rounded-full shadow-md shadow-avocado-600/25 hover:-translate-y-0.5 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call Us Direct</span>
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm py-3 px-5 rounded-full shadow-md shadow-[#25D366]/25 hover:-translate-y-0.5 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                <span>WhatsApp Order</span>
              </a>
            </div>

          </div>

          {/* Map Embed */}
          <div className="lg:col-span-7 bg-[var(--cream-card)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-lg min-h-[420px]">
            <iframe
              title="Fruitopia Ashok Nagar Location Map"
              src={CONTACT_INFO.googleMapsEmbedUrl}
              className="w-full h-full min-h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

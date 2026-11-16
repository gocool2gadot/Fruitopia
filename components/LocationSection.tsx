'use client';

import React, { useState } from 'react';
import { CONTACT_INFO } from '@/lib/data';
import { MapPinIcon, PhoneIcon, ClockIcon, CopyIcon, CheckCircleIcon, WhatsAppIcon } from './Icons';

export default function LocationSection() {
  const [copied, setCopied] = useState(false);

  const waUrl = `https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodeURIComponent(
    'Hi Fruitopia! I would like to place an order for pickup/delivery in Ashok Nagar.'
  )}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="py-28 sm:py-36 px-6 sm:px-8 bg-[var(--cream)]/90 backdrop-blur-md border-t border-[var(--border-subtle)] relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-avocado-800 dark:text-avocado-300 bg-[var(--primary-subtle)] border border-[var(--border)] mb-4">
            <MapPinIcon size={13} className="text-avocado-600" />
            <span>Visit Our Artisan Kart</span>
          </div>

          <h2 id="location-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-main)] mb-4 tracking-tight">
            Come Say Hello in Ashok Nagar
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            Drop by our street food kart for your morning vitality boost, post-workout nourishment, or comforting evening toast.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Information & Action Card */}
          <div className="lg:col-span-5 bg-[var(--cream-card)]/95 backdrop-blur-md rounded-3xl border border-[var(--border)] p-8 sm:p-10 shadow-soft-lg flex flex-col justify-between">
            <div className="space-y-8 mb-8">
              
              {/* Address with Interactive Copy Micro-Interaction */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--primary-subtle)] text-avocado-700 dark:text-avocado-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPinIcon size={22} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Street Kart Address
                    </h3>
                    <button
                      onClick={handleCopyAddress}
                      aria-label="Copy address to clipboard"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-avocado-700 dark:text-avocado-400 hover:text-avocado-900 bg-[var(--primary-subtle)] px-2.5 py-1 rounded-full transition-colors active:scale-95"
                    >
                      {copied ? (
                        <>
                          <CheckCircleIcon size={13} className="text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon size={13} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <address className="not-italic text-base font-semibold text-[var(--text-main)] leading-snug">
                    {CONTACT_INFO.address}
                  </address>
                </div>
              </div>

              {/* Phone Ordering */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--primary-subtle)] text-avocado-700 dark:text-avocado-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <PhoneIcon size={22} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Call to Order / Inquiries
                  </h3>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="font-display text-2xl font-bold text-avocado-700 dark:text-avocado-400 hover:underline block leading-tight"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Instant local pickup &amp; delivery around Ashok Nagar
                  </p>
                </div>
              </div>

              {/* Operating Timings */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--primary-subtle)] text-avocado-700 dark:text-avocado-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ClockIcon size={22} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                    Daily Timings
                  </h3>
                  <p className="text-base font-semibold text-[var(--text-main)]">
                    {CONTACT_INFO.timings}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Morning energizers, afternoon vitality bowls &amp; evening warm sourdough toasts
                  </p>
                </div>
              </div>

            </div>

            {/* High-Contrast Interactive CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[var(--border-subtle)]">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-avocado-700 hover:bg-avocado-800 text-white font-bold text-sm py-3.5 px-5 rounded-full shadow-soft hover:shadow-soft-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-in-out"
              >
                <PhoneIcon size={16} />
                <span>Call Directly</span>
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm py-3.5 px-5 rounded-full shadow-soft hover:shadow-soft-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-in-out"
              >
                <WhatsAppIcon size={17} />
                <span>WhatsApp Order</span>
              </a>
            </div>

          </div>

          {/* Clean Google Map Embed with Soft Shadow */}
          <div className="lg:col-span-7 bg-[var(--cream-card)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-soft-md min-h-[440px] flex">
            <iframe
              title="Fruitopia Ashok Nagar Chennai Location Map"
              src={CONTACT_INFO.googleMapsEmbedUrl}
              className="w-full h-full min-h-[440px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

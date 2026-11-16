'use client';

import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '@/lib/data';
import { PhoneIcon, SunIcon, MoonIcon, MenuIcon, XIcon, MapPinIcon } from './Icons';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('fruitopia_theme') as 'light' | 'dark' | null;
    const initial = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    document.body.setAttribute('data-theme', initial);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('fruitopia_theme', next);
    if ((window as any).updateSceneThemeColors) {
      (window as any).updateSceneThemeColors(next);
    }
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-200 ease-in-out ${
        scrolled
          ? 'py-3.5 bg-[var(--nav-bg)] backdrop-blur-md shadow-soft border-b border-[var(--border-subtle)]'
          : 'py-5 bg-[var(--nav-bg)]/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo with Editorial Serif & Classic Subtitle */}
        <a
          href="#hero"
          className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-avocado-600 focus-visible:outline-none rounded-xl p-1"
          aria-label="Fruitopia Homepage"
        >
          <span className="text-2xl sm:text-3xl animate-float-avo drop-shadow-sm select-none" aria-hidden="true">
            🥑
          </span>
          <div className="flex flex-col">
            <span className="font-display text-2xl sm:text-[26px] font-bold text-[var(--text-main)] tracking-tight leading-none group-hover:text-avocado-600 transition-colors">
              Fruitopia
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)] mt-1">
              Artisan Avocado Kart
            </span>
          </div>
        </a>

        {/* Location Pill Badge */}
        <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[var(--primary-subtle)] text-avocado-700 dark:text-avocado-300 border border-[var(--border)]">
          <MapPinIcon size={14} className="text-avocado-600 dark:text-avocado-400" />
          <span>Ashok Nagar, Chennai</span>
        </div>

        {/* Desktop Semantic Navigation */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
          <a
            href="#hero"
            className="text-sm font-semibold text-[var(--text-muted)] hover:text-avocado-600 dark:hover:text-avocado-400 transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-avocado-600 rounded-md"
          >
            Home
          </a>
          <a
            href="#menu"
            className="text-sm font-semibold text-[var(--text-muted)] hover:text-avocado-600 dark:hover:text-avocado-400 transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-avocado-600 rounded-md"
          >
            Menu
          </a>
          <a
            href="#about"
            className="text-sm font-semibold text-[var(--text-muted)] hover:text-avocado-600 dark:hover:text-avocado-400 transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-avocado-600 rounded-md"
          >
            Our Story
          </a>
          <a
            href="#location"
            className="text-sm font-semibold text-[var(--text-muted)] hover:text-avocado-600 dark:hover:text-avocado-400 transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-avocado-600 rounded-md"
          >
            Location
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--cream-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-avocado-600 shadow-soft-sm hover:shadow-soft hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-avocado-600"
            title="Toggle Light / Dark mode"
          >
            {theme === 'dark' ? (
              <SunIcon size={18} className="text-amber-400" />
            ) : (
              <MoonIcon size={18} className="text-avocado-700" />
            )}
          </button>

          {/* High-Contrast Primary Call-to-Action */}
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="hidden sm:inline-flex items-center gap-2.5 bg-avocado-700 hover:bg-avocado-800 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-soft hover:shadow-accent-glow hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-avocado-600"
          >
            <PhoneIcon size={15} />
            <span>Call to Order</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--cream-card)] border border-[var(--border)] text-[var(--text-main)] shadow-soft-sm active:scale-95 transition-all"
          >
            {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden mt-3 pt-4 pb-4 border-t border-[var(--border)] flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <a
            href="#hero"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-base font-semibold text-[var(--text-main)] hover:bg-[var(--primary-subtle)] rounded-lg transition-colors"
          >
            Home
          </a>
          <a
            href="#menu"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-base font-semibold text-[var(--text-main)] hover:bg-[var(--primary-subtle)] rounded-lg transition-colors"
          >
            Menu
          </a>
          <a
            href="#about"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-base font-semibold text-[var(--text-main)] hover:bg-[var(--primary-subtle)] rounded-lg transition-colors"
          >
            Our Story
          </a>
          <a
            href="#location"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2 text-base font-semibold text-[var(--text-main)] hover:bg-[var(--primary-subtle)] rounded-lg transition-colors"
          >
            Location &amp; Timings
          </a>
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-avocado-700 text-white font-semibold py-3 px-4 rounded-xl shadow-soft active:scale-[0.98] transition-all"
          >
            <PhoneIcon size={16} />
            <span>Call to Order ({CONTACT_INFO.phone})</span>
          </a>
        </nav>
      )}
    </header>
  );
}

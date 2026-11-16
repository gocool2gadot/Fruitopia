'use client';

import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '@/lib/data';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('fruitopia_theme') as 'light' | 'dark' | null;
    const initial = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    document.body.setAttribute('data-theme', initial);
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
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 text-2xl font-bold text-avocado-600 dark:text-avocado-400">
          <span className="text-3xl animate-float-avo drop-shadow-sm">🥑</span>
          <span className="font-display tracking-tight">Fruitopia</span>
        </a>

        {/* Location Pill */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--primary-subtle)] text-avocado-700 dark:text-avocado-300 border border-[var(--border)]">
          <span>📍 Ashok Nagar, Chennai</span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          <a href="#hero" className="text-sm font-medium text-[var(--text-muted)] hover:text-avocado-600 dark:hover:text-avocado-400 transition-colors">
            Home
          </a>
          <a href="#menu" className="text-sm font-medium text-[var(--text-muted)] hover:text-avocado-600 dark:hover:text-avocado-400 transition-colors">
            Menu
          </a>
          <a href="#about" className="text-sm font-medium text-[var(--text-muted)] hover:text-avocado-600 dark:hover:text-avocado-400 transition-colors">
            About Us
          </a>
          <a href="#location" className="text-sm font-medium text-[var(--text-muted)] hover:text-avocado-600 dark:hover:text-avocado-400 transition-colors">
            Location
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--cream-card)] border border-[var(--border)] text-lg shadow-sm hover:scale-105 transition-transform"
            title="Toggle Light / Dark mode"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Call to Order Button */}
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="hidden sm:inline-flex items-center gap-2 bg-avocado-600 hover:bg-avocado-700 text-white font-semibold text-sm px-4 py-2.5 rounded-full shadow-md shadow-avocado-600/20 hover:-translate-y-0.5 transition-all"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Call to Order</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Mobile Navigation"
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--cream-card)] border border-[var(--border)] text-lg"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-3 pt-4 pb-2 border-t border-[var(--border)] flex flex-col gap-3">
          <a
            href="#hero"
            onClick={() => setMobileOpen(false)}
            className="px-2 py-1.5 text-base font-medium text-[var(--text-main)] hover:text-avocado-600"
          >
            Home
          </a>
          <a
            href="#menu"
            onClick={() => setMobileOpen(false)}
            className="px-2 py-1.5 text-base font-medium text-[var(--text-main)] hover:text-avocado-600"
          >
            Menu
          </a>
          <a
            href="#about"
            onClick={() => setMobileOpen(false)}
            className="px-2 py-1.5 text-base font-medium text-[var(--text-main)] hover:text-avocado-600"
          >
            About Us
          </a>
          <a
            href="#location"
            onClick={() => setMobileOpen(false)}
            className="px-2 py-1.5 text-base font-medium text-[var(--text-main)] hover:text-avocado-600"
          >
            Location
          </a>
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="mt-2 flex items-center justify-center gap-2 bg-avocado-600 text-white font-semibold py-2.5 rounded-full"
          >
            <span>Call to Order ({CONTACT_INFO.phone})</span>
          </a>
        </div>
      )}
    </header>
  );
}

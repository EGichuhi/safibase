// ── Navbar ─────────────────────────────────────────────────────────────────
// Sticky top bar with logo + CTA. Fades in a border on scroll.

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-50/95 backdrop-blur-sm border-b border-brand-100 shadow-warm-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center shadow-warm-sm">
            <span className="text-brand-100 font-display font-semibold text-sm">S</span>
          </div>
          <span className="font-display font-semibold text-brand-900 text-lg tracking-tight">
            SafiBase
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Problem', href: '#problem' },
            { label: 'Solution', href: '#solution' },
            { label: 'Results', href: '#results' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-body text-brand-600 hover:text-brand-900 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={scrollToForm}
          className="text-sm font-body font-medium px-5 py-2.5 rounded-xl bg-brand-800 text-brand-50
            hover:bg-brand-900 transition-all duration-200 shadow-warm-sm hover:shadow-warm-md"
        >
          Book Free Audit
        </button>
      </div>
    </motion.nav>
  );
}

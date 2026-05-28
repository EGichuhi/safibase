// ── CtaSection ──────────────────────────────────────────────────────────────
// Final conversion push before the footer.

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 px-6 lg:px-8 mesh-bg relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[400px] rounded-full bg-brand-200/30 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center" ref={ref}>
        {/* Divider ornament */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 justify-center mb-10"
        >
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-brand-200" />
          <div className="w-2 h-2 rounded-full bg-brand-400" />
          <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-brand-200" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-display font-semibold text-brand-950 text-3xl md:text-4xl lg:text-5xl
            leading-tight tracking-tight mb-5"
        >
          Stop Losing Leads to Slow Follow-Ups
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="font-body text-brand-500 text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Book a free workflow audit and see exactly how SafiBase can automate your
          consultation process — no tech experience needed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.26 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:hello@safibase.ca"
            href="https://linkedin.com/company/safibase"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl
              bg-brand-800 text-brand-50 font-body font-semibold text-base
              hover:bg-brand-900 transition-all duration-200 shadow-warm-lg hover:shadow-warm-xl
              hover:-translate-y-0.5"
          >
            Book Free Audit
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <p className="text-sm font-body text-brand-400">
            Takes 30 minutes · Completely free
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-400 py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-brand-700 flex items-center justify-center">
                <span className="text-brand-100 font-display font-semibold text-xs">S</span>
              </div>
              <span className="font-display font-semibold text-brand-100 text-lg">SafiBase</span>
            </div>
            <p className="text-xs font-body text-brand-500 max-w-xs leading-relaxed">
              AI appointment & reminder workflows for immigration consultants and law firms.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: 'Problem', href: '#problem' },
              { label: 'Solution', href: '#solution' },
              { label: 'Results',  href: '#results'  },
              { label: 'Book Audit', href: '#audit-form' },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-body text-brand-500 hover:text-brand-200 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Social / contact */}
          <div className="flex items-center gap-4">
            {/* Email */}
            <a
              href="mailto:hello@safibase.ca" /* ← update this */
              className="text-sm font-body text-brand-500 hover:text-brand-200 transition-colors duration-200"
              aria-label="Email SafiBase"
            >
              hello@safibase.ca
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/safibase" /* ← update this */
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center
                hover:bg-brand-700 transition-colors duration-200"
              aria-label="SafiBase on LinkedIn"
            >
              <svg className="w-4 h-4 text-brand-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-800 pt-6 flex flex-col sm:flex-row items-center
          justify-between gap-3">
          <p className="text-xs font-body text-brand-600">
            © {new Date().getFullYear()} SafiBase. All rights reserved.
          </p>
          <p className="text-xs font-body text-brand-700">
            Built for immigration consultants who want to grow smarter.
          </p>
        </div>
      </div>
    </footer>
  );
}

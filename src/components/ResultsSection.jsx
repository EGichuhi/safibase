// ── ResultsSection ──────────────────────────────────────────────────────────
// Dark section highlighting outcomes for immigration firms.

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CalendarCheck, Zap, Clock, Star, LayoutList,
} from 'lucide-react';

const RESULTS = [
  {
    icon: CalendarCheck,
    headline: 'Book more consultations',
    sub: 'Automated reminders and follow-ups fill your calendar without extra effort from your team.',
  },
  {
    icon: Zap,
    headline: 'Respond faster to new leads',
    sub: "Instant automated responses mean you're the first firm a prospect hears from — every time.",
  },
  {
    icon: Clock,
    headline: 'Reduce admin workload',
    sub: 'Reclaim hours each week by automating the repetitive tasks that drain your team\'s capacity.',
  },
  {
    icon: Star,
    headline: 'Improve client experience',
    sub: 'Clients feel guided and supported from first inquiry to consultation — increasing trust and referrals.',
  },
  {
    icon: LayoutList,
    headline: 'Create an organized intake process',
    sub: 'Every lead, appointment, and document flows through a structured system — no more scrambling.',
  },
];

function ResultCard({ icon: Icon, headline, sub, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group flex gap-4 p-5 rounded-2xl bg-brand-800/50 border border-brand-700/50
        hover:bg-brand-700/50 hover:border-brand-600/60
        transition-all duration-300 cursor-default"
    >
      <div className="w-10 h-10 rounded-xl bg-brand-700/60 border border-brand-600/40
        flex items-center justify-center flex-shrink-0
        group-hover:bg-brand-600/60 transition-colors duration-300">
        <Icon className="w-5 h-5 text-brand-300" />
      </div>
      <div>
        <h3 className="font-body font-semibold text-brand-50 text-base mb-1">{headline}</h3>
        <p className="text-sm font-body text-brand-400 leading-relaxed">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function ResultsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="results" className="py-24 px-6 lg:px-8 dark-mesh-bg grain-overlay relative overflow-hidden">
      {/* Decorative top line */}
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-600 to-transparent" />

      {/* Large decorative letter */}
      <div aria-hidden
        className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2
          font-display font-semibold text-[18rem] text-brand-800/30 leading-none select-none">
        S
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16" ref={ref}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-brand-400 mb-4"
          >
            What You'll See
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display font-semibold text-brand-50 text-3xl md:text-4xl lg:text-[2.75rem]
              leading-tight tracking-tight mb-4"
          >
            Designed to Help Immigration Firms Grow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="font-body text-brand-400 text-lg leading-relaxed"
          >
            When the right workflows are in place, growth becomes systematic — not stressful.
          </motion.p>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESULTS.map((r, i) => (
            <ResultCard key={r.headline} {...r} index={i} />
          ))}

          {/* Audit CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: RESULTS.length * 0.09 }}
            className="flex flex-col justify-between p-6 rounded-2xl
              bg-gradient-to-br from-brand-400/20 to-brand-600/20
              border border-brand-500/30 md:col-span-2 lg:col-span-1"
          >
            <p className="font-display font-semibold text-brand-50 text-xl leading-snug mb-3">
              Ready to see results in your practice?
            </p>
            <p className="text-sm font-body text-brand-400 leading-relaxed mb-6">
              Our free workflow audit takes 30 minutes and maps out exactly what to automate first.
            </p>
            <a
              href="#audit-form"
              className="self-start inline-flex items-center gap-2 px-5 py-3 rounded-xl
                bg-brand-400 text-brand-950 font-body font-semibold text-sm
                hover:bg-brand-300 transition-all duration-200 shadow-warm-md"
            >
              Book Free Audit →
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-600 to-transparent" />
    </section>
  );
}

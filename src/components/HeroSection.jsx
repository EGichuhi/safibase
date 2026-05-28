// ── HeroSection ─────────────────────────────────────────────────────────────
// Two-column layout: headline + trust signals left, lead form right.

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Users } from 'lucide-react';
import LeadForm from './LeadForm';

const TRUST_ITEMS = [
  { icon: ShieldCheck, text: 'Purpose-built for immigration practices' },
  { icon: Clock,       text: 'Automates follow-ups in under 24 hrs' },
  { icon: Users,       text: 'Supports solo consultants to large firms' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function HeroSection() {
  return (
    <section className="relative min-h-screen mesh-bg grain-overlay pt-28 pb-20 px-6 lg:px-8 flex items-center">
      {/* Decorative blurred circles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 rounded-full bg-brand-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full bg-brand-200/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ── Left: Copy ── */}
        <div>
          {/* Eyebrow badge */}
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-body font-medium
              text-brand-700 bg-brand-100 border border-brand-200 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              AI Workflow for Immigration Consultants
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            {...fadeUp(0.08)}
            className="font-display font-semibold text-brand-950 text-4xl md:text-5xl lg:text-[3.4rem]
              leading-[1.15] tracking-tight text-balance mb-6"
          >
            Reduce Missed{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Immigration</span>
              <span
                aria-hidden
                className="absolute bottom-1 left-0 right-0 h-3 bg-brand-200/70 -rotate-1 rounded"
              />
            </span>{' '}
            Consultations with AI-Powered Follow-Up
          </motion.h1>

          {/* Subheading */}
          <motion.p
            {...fadeUp(0.16)}
            className="font-body text-brand-600 text-lg leading-relaxed mb-8 max-w-lg text-balance"
          >
            SafiBase helps immigration consultants automate appointment reminders, lead follow-ups,
            and client intake — so more prospects book consultations{' '}
            <strong className="font-medium text-brand-800">without adding admin work.</strong>
          </motion.p>

          {/* Primary CTA (mobile only — desktop uses the form) */}
          <motion.div {...fadeUp(0.22)} className="lg:hidden mb-8">
            <a
              href="#audit-form"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-800 text-brand-50
                font-body font-medium text-sm shadow-warm-md hover:bg-brand-900 hover:shadow-warm-lg
                transition-all duration-200"
            >
              Book Free Workflow Audit
            </a>
          </motion.div>

          {/* Trust items */}
          <motion.div {...fadeUp(0.28)} className="flex flex-col gap-3">
            {TRUST_ITEMS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-brand-600" />
                </div>
                <span className="text-sm font-body text-brand-600">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Small trust line */}
          <motion.p
            {...fadeUp(0.36)}
            className="mt-8 text-xs font-body text-brand-400 border-l-2 border-brand-200 pl-3 leading-relaxed"
          >
            Built for immigration consultants handling high lead volume and manual follow-ups.
          </motion.p>
        </div>

        {/* ── Right: Form ── */}
        <div className="w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

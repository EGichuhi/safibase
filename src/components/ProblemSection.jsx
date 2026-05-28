// ── ProblemSection ──────────────────────────────────────────────────────────
// Shows the pain points immigration firms face without automation.

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CalendarX, Hourglass, BellOff, TrendingDown, FolderOpen } from 'lucide-react';

const PROBLEMS = [
  {
    icon: CalendarX,
    title: 'Prospects Forget Consultations',
    desc: "Without timely reminders, clients reschedule or simply don't show — costing you billable time and revenue.",
  },
  {
    icon: BellOff,
    title: 'Leads Go Cold After Inquiry',
    desc: 'Prospects who fill out your contact form disappear when follow-up is slow or inconsistent.',
  },
  {
    icon: Hourglass,
    title: 'Hours Lost to Manual Reminders',
    desc: 'Your staff spends valuable hours on calls and texts that an automated system could handle in seconds.',
  },
  {
    icon: TrendingDown,
    title: 'Slow Responses Reduce Conversions',
    desc: 'Immigration leads shop around. A 24-hour response gap is enough to lose a prospect to a competitor.',
  },
  {
    icon: FolderOpen,
    title: 'Admin Work Keeps Piling Up',
    desc: 'Intake paperwork, follow-up emails, status updates — the backlog grows faster than your team can handle it.',
  },
];

function ProblemCard({ icon: Icon, title, desc, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex gap-5 p-5 rounded-2xl bg-white border border-brand-100
        shadow-card hover:shadow-warm-md hover:border-brand-200
        transition-all duration-300 cursor-default"
    >
      <div className="w-11 h-11 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center flex-shrink-0
        group-hover:bg-brand-100 transition-colors duration-300">
        <Icon className="w-5 h-5 text-brand-600" />
      </div>
      <div>
        <h3 className="font-body font-semibold text-brand-900 text-base mb-1">{title}</h3>
        <p className="text-sm font-body text-brand-500 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="problem" className="py-24 px-6 lg:px-8 bg-brand-50 relative overflow-hidden">
      {/* Background accent */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-16" ref={ref}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-body font-semibold uppercase tracking-widest
              text-brand-500 mb-4"
          >
            The Problem
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display font-semibold text-brand-950 text-3xl md:text-4xl lg:text-[2.75rem]
              leading-tight tracking-tight mb-4"
          >
            Still Manually Following Up with Leads?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="font-body text-brand-500 text-lg leading-relaxed"
          >
            Most immigration firms lose consultations and leads not because of a poor service —
            but because of gaps in their follow-up process.
          </motion.p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROBLEMS.map((p, i) => (
            <ProblemCard key={p.title} {...p} index={i} />
          ))}
          {/* Filler card — CTA nudge */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: PROBLEMS.length * 0.08 }}
            className="flex flex-col justify-between p-5 rounded-2xl
              bg-brand-800 text-brand-100 border border-brand-700 shadow-warm-md md:col-span-2 lg:col-span-1"
          >
            <p className="font-display font-semibold text-brand-50 text-xl leading-snug mb-4">
              Sound familiar?
            </p>
            <p className="text-sm font-body text-brand-300 leading-relaxed mb-6">
              You're not alone. These are the most common bottlenecks we fix for immigration consultants in the first week.
            </p>
            <a
              href="#audit-form"
              className="inline-flex items-center gap-1.5 text-sm font-body font-medium
                text-brand-100 hover:text-white underline underline-offset-4 decoration-brand-500
                hover:decoration-brand-200 transition-colors duration-200"
            >
              Get a free workflow audit →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── SolutionSection ─────────────────────────────────────────────────────────
// Four feature cards showing what SafiBase automates.

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Bell, MessageSquareDot, ClipboardList, Zap } from 'lucide-react';

const FEATURES = [
  {
    icon: Bell,
    color: 'from-amber-50 to-orange-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    accent: 'border-amber-200',
    title: 'AI Appointment Reminders',
    desc: 'Automated multi-channel reminders (SMS, email, WhatsApp) sent at the right time — days, hours, and minutes before each consultation. Reduce no-shows without lifting a finger.',
    tag: 'Reduce no-shows',
  },
  {
    icon: MessageSquareDot,
    color: 'from-sky-50 to-blue-50',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-700',
    accent: 'border-sky-200',
    title: 'Lead Follow-Up Automation',
    desc: 'Every new inquiry triggers an instant, personalized follow-up sequence. Warm leads don\'t go cold — SafiBase nurtures them until they book.',
    tag: 'Convert more leads',
  },
  {
    icon: ClipboardList,
    color: 'from-emerald-50 to-teal-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    accent: 'border-emerald-200',
    title: 'Client Intake Automation',
    desc: 'Send intake forms automatically after booking. Collect documents, signatures, and data before the appointment — so your team arrives prepared.',
    tag: 'Save hours per week',
  },
  {
    icon: Zap,
    color: 'from-violet-50 to-purple-50',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-700',
    accent: 'border-violet-200',
    title: 'Workflow Automation',
    desc: 'Connect your CRM, calendar, and communication tools into one seamless flow. Tasks get assigned, statuses get updated, and nothing falls through the cracks.',
    tag: 'Eliminate admin chaos',
  },
];

function FeatureCard({ icon: Icon, color, iconBg, iconColor, accent, title, desc, tag, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col p-6 rounded-2xl bg-gradient-to-br ${color}
        border ${accent} shadow-card hover:shadow-warm-lg
        transition-all duration-300 hover:-translate-y-1 cursor-default overflow-hidden`}
    >
      {/* Subtle corner glow */}
      <div aria-hidden
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/60 blur-2xl
          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-5 flex-shrink-0
        shadow-sm transition-transform duration-300 group-hover:scale-110`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>

      {/* Tag */}
      <span className={`self-start text-xs font-body font-semibold uppercase tracking-wider
        ${iconColor} mb-2 opacity-70`}>
        {tag}
      </span>

      <h3 className="font-body font-semibold text-brand-900 text-base mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-sm font-body text-brand-500 leading-relaxed flex-1">{desc}</p>

      {/* Arrow hint */}
      <div className={`mt-5 flex items-center gap-1 text-xs font-body font-medium ${iconColor}
        opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0`}>
        <span>Learn how it works</span>
        <span>→</span>
      </div>
    </motion.div>
  );
}

export default function SolutionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="solution" className="py-24 px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Divider */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-100 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16" ref={ref}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-brand-500 mb-4"
          >
            The Solution
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display font-semibold text-brand-950 text-3xl md:text-4xl lg:text-[2.75rem]
              leading-tight tracking-tight mb-4"
          >
            What SafiBase Automates
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="font-body text-brand-500 text-lg leading-relaxed"
          >
            Four core workflows that eliminate the manual work slowing your practice down.
          </motion.p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>

        {/* Bottom connector note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm font-body text-brand-400">
            SafiBase connects with your existing tools — no tech overhaul required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

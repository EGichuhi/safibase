// ── LeadForm ────────────────────────────────────────────────────────────────
// Handles form state + submission to your chosen integration:
//   - Formspree (default, zero-config)
//   - Airtable REST API
//   - Notion API (via proxy / Make.com)
//   - Make.com / Zapier webhook
//
// Set REACT_APP_FORM_BACKEND in .env to switch:
//   REACT_APP_FORM_BACKEND=formspree   → uses REACT_APP_FORMSPREE_ID
//   REACT_APP_FORM_BACKEND=airtable    → uses REACT_APP_AIRTABLE_*
//   REACT_APP_FORM_BACKEND=webhook     → uses REACT_APP_WEBHOOK_URL

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

// ─── Submission helpers ───────────────────────────────────────────────────

async function submitToFormspree(data) {
  const id = process.env.REACT_APP_FORMSPREE_ID; // e.g. "xpwzabcd"
  if (!id) throw new Error('REACT_APP_FORMSPREE_ID not set');
  const res = await fetch(`https://formspree.io/f/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Formspree submission failed');
}

async function submitToAirtable(data) {
  // Required env vars:
  //   REACT_APP_AIRTABLE_API_KEY   → your Personal Access Token
  //   REACT_APP_AIRTABLE_BASE_ID   → e.g. "appXXXXXXXXXXXXXX"
  //   REACT_APP_AIRTABLE_TABLE_NAME → e.g. "Leads"
  const { REACT_APP_AIRTABLE_API_KEY, REACT_APP_AIRTABLE_BASE_ID, REACT_APP_AIRTABLE_TABLE_NAME } = process.env;
  if (!REACT_APP_AIRTABLE_API_KEY) throw new Error('REACT_APP_AIRTABLE_API_KEY not set');

  const res = await fetch(
    `https://api.airtable.com/v0/${REACT_APP_AIRTABLE_BASE_ID}/${encodeURIComponent(REACT_APP_AIRTABLE_TABLE_NAME)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${REACT_APP_AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Name: data.name,
          Company: data.company,
          Email: data.email,
          Phone: data.phone,
          'Monthly Consultations': data.consultations,
          'Biggest Bottleneck': data.bottleneck,
          'Submitted At': new Date().toISOString(),
        },
      }),
    }
  );
  if (!res.ok) throw new Error('Airtable submission failed');
}

async function submitToWebhook(data) {
  // Use this for Make.com / Zapier / n8n custom webhooks
  const url = process.env.REACT_APP_WEBHOOK_URL;
  if (!url) throw new Error('REACT_APP_WEBHOOK_URL not set');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, source: 'safibase-landing', timestamp: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error('Webhook submission failed');
}

async function submitForm(data) {
  const backend = process.env.REACT_APP_FORM_BACKEND || 'formspree';
  switch (backend) {
    case 'airtable': return submitToAirtable(data);
    case 'webhook':  return submitToWebhook(data);
    default:         return submitToFormspree(data);
  }
}

// ─── Component ────────────────────────────────────────────────────────────

const CONSULTATIONS = [
  '1–10 / month',
  '11–30 / month',
  '31–60 / month',
  '61–100 / month',
  '100+ / month',
];

const BOTTLENECKS = [
  'Following up with new leads',
  'Appointment no-shows',
  'Client intake paperwork',
  'Slow response times',
  'Manual reminder calls/texts',
  'Disorganized workflow',
  'Other',
];

export default function LeadForm() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', consultations: '', bottleneck: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await submitForm(form);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again or email us directly.');
      setStatus('error');
    }
  };

  return (
    <motion.div
      id="audit-form"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      className="relative bg-white rounded-2xl shadow-warm-xl border border-brand-100 overflow-hidden"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-brand-600 via-brand-400 to-brand-300" />

      <div className="p-6 md:p-8">
        <h3 className="font-display font-semibold text-brand-900 text-xl mb-1">
          Book Your Free Workflow Audit
        </h3>
        <p className="text-sm text-brand-500 font-body mb-6">
          Takes 2 minutes · No obligation
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-10 gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <p className="font-display font-semibold text-brand-900 text-lg">You're booked!</p>
                <p className="text-sm text-brand-500 mt-1 font-body">
                  We'll reach out within 1 business day to schedule your audit.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Row: Name + Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-body font-medium text-brand-700 mb-1.5">
                    Full Name <span className="text-brand-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body font-medium text-brand-700 mb-1.5">
                    Company / Firm <span className="text-brand-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    placeholder="Smith Immigration Law"
                    value={form.company}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Row: Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-body font-medium text-brand-700 mb-1.5">
                    Work Email <span className="text-brand-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jane@firm.com"
                    value={form.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-body font-medium text-brand-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (416) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Monthly consultations */}
              <div>
                <label className="block text-xs font-body font-medium text-brand-700 mb-1.5">
                  Monthly Consultations <span className="text-brand-400">*</span>
                </label>
                <select
                  name="consultations"
                  required
                  value={form.consultations}
                  onChange={handleChange}
                  className="input-field appearance-none cursor-pointer bg-white"
                >
                  <option value="" disabled>Select volume...</option>
                  {CONSULTATIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Biggest bottleneck */}
              <div>
                <label className="block text-xs font-body font-medium text-brand-700 mb-1.5">
                  Biggest Bottleneck <span className="text-brand-400">*</span>
                </label>
                <select
                  name="bottleneck"
                  required
                  value={form.bottleneck}
                  onChange={handleChange}
                  className="input-field appearance-none cursor-pointer bg-white"
                >
                  <option value="" disabled>Select your biggest challenge...</option>
                  {BOTTLENECKS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Error */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 text-red-600 text-sm bg-red-50 rounded-xl p-3"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span className="font-body">{errorMsg}</span>
                </motion.div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 px-6 rounded-xl bg-brand-800 text-brand-50 font-body font-medium
                  text-sm tracking-wide hover:bg-brand-900 active:scale-[0.98]
                  transition-all duration-200 shadow-warm-md hover:shadow-warm-lg
                  disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  'Get My Free Audit →'
                )}
              </button>

              <p className="text-center text-xs text-brand-400 font-body leading-relaxed">
                No pressure. We'll review your current workflow and identify <br className="hidden sm:block" />
                automation opportunities — completely free.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

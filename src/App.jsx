// ── App.jsx ──────────────────────────────────────────────────────────────────
// Root component. Composes all page sections in order.

import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import ResultsSection from './components/ResultsSection';
import { CtaSection, Footer } from './components/CtaAndFooter';

export default function App() {
  return (
    <div className="min-h-screen font-body">
      {/* Sticky navigation */}
      <Navbar />

      {/* Page sections */}
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ResultsSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}

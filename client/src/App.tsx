import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { useLanguage } from './i18n';
import {
  Hero,
  Problem,
  HowItWorks,
  ProductShowcase,
  Benefits,
  UseCases,
  BusinessValue,
  CTA,
  FAQ,
  Contact,
} from './components/sections';
import { PrivacyPolicy } from './components/legal/PrivacyPolicy';
import { TermsOfService } from './components/legal/TermsOfService';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Problem />
        <HowItWorks />
        <ProductShowcase />
        <Benefits />
        <UseCases />
        <BusinessValue />
        <CTA />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}

function App() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only
          fixed top-4 left-4 z-[var(--z-toast)]
          px-4 py-2
          bg-[var(--color-primary)] text-white
          rounded-[var(--radius-md)]
          font-medium
          focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2
        "
      >
        {t.accessibility.skipToContent}
      </a>

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/privacy"
          element={
            <LegalLayout>
              <PrivacyPolicy />
            </LegalLayout>
          }
        />
        <Route
          path="/terms"
          element={
            <LegalLayout>
              <TermsOfService />
            </LegalLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

function MobileCTA() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (roughly 100vh)
      const show = window.scrollY > window.innerHeight * 0.8;
      // Hide when near the contact section
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const contactRect = contactEl.getBoundingClientRect();
        if (contactRect.top < window.innerHeight && contactRect.bottom > 0) {
          setVisible(false);
          return;
        }
      }
      setVisible(show);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`mobile-cta-bar lg:hidden ${visible ? 'visible' : ''}`}
      role="complementary"
      aria-label="Contact call to action"
    >
      <a
        href="#contact"
        className="
          block w-full
          px-6 py-3
          bg-[var(--color-blue-500)] text-white
          rounded-[var(--radius-md)]
          text-center font-semibold text-base
          hover:bg-[var(--color-blue-600)]
          transition-colors duration-200
          active:scale-[0.98]
        "
      >
        {t.nav.getQuote}
      </a>
    </div>
  );
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
      <MobileCTA />
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
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-16 lg:pb-0">
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

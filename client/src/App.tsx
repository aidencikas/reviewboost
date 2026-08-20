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
    </div>
  );
}

export default App;

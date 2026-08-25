import { useRef } from 'react';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../hooks/useTheme';
import { useGsapContext, useScrollTriggerRefresh } from '../../hooks/useGsapContext';
import { gsap } from 'gsap';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ProductImage } from '../product/ProductImage';

export function Hero() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Hero entrance animation
  useGsapContext(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    });

    // Set initial states
    gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
    gsap.set(headlineRef.current, { opacity: 0, y: 40 });
    gsap.set(subheadlineRef.current, { opacity: 0, y: 30 });
    gsap.set(priceRef.current, { opacity: 0, y: 16 });
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });
    gsap.set(productRef.current, { opacity: 0, scale: 0.9, y: 30 });
    gsap.set(glowRef.current, { opacity: 0, scale: 0.6 });
    gsap.set(starRef.current, { opacity: 0, scale: 0, rotation: -45 });
    gsap.set(scrollIndicatorRef.current, { opacity: 0 });
    gsap.set(badgeRef.current, { opacity: 0, y: 10 });

    // Entrance sequence — fast, premium, purposeful
    tl.to(glowRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'power2.out',
    })
      .to(
        eyebrowRef.current,
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.9'
      )
      .to(
        headlineRef.current,
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .to(
        subheadlineRef.current,
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.5'
      )
      .to(
        priceRef.current,
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.35'
      )
      .to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      )
      .to(
        productRef.current,
        { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power2.out' },
        '-=0.7'
      )
      .to(
        badgeRef.current,
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.6'
      )
      .to(
        starRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      )
      .to(
        scrollIndicatorRef.current,
        { opacity: 1, duration: 0.5 },
        '-=0.3'
      );

    // Subtle product parallax on scroll
    if (productRef.current && sectionRef.current) {
      gsap.to(productRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -40,
        ease: 'none',
      });
    }
  }, [t, theme]);

  // Refresh ScrollTrigger when theme changes
  useScrollTriggerRefresh([theme]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden noise-overlay"
    >
      {/* Premium background treatment */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-[#060a14] via-[#0a0e1a] to-[#0f1629]'
            : 'bg-gradient-to-br from-white via-[#f8fafc] to-[#f1f5f9]'
        }`} />

        {/* Animated glow orbs */}
        <div
          ref={glowRef}
          className="absolute top-[10%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-60"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%)',
          }}
        />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(212, 168, 67, 0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(212, 168, 67, 0.04) 0%, transparent 70%)',
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(${theme === 'dark' ? 'rgba(37, 99, 235, 0.3)' : 'rgba(37, 99, 235, 0.15)'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? 'rgba(37, 99, 235, 0.3)' : 'rgba(37, 99, 235, 0.15)'} 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <Container className="relative z-10 pt-28 pb-16 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text Content — takes more space */}
          <div className="order-2 lg:order-1 lg:col-span-6 text-center lg:text-left">
            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2 mb-5 md:mb-7"
            >
              <div className="w-8 h-px bg-[var(--color-blue-500)]" />
              <span className="text-eyebrow">{t.hero.eyebrow}</span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-display text-[var(--text-primary)] mb-5 md:mb-7 whitespace-pre-line !text-[clamp(2.25rem,5vw+1rem,4.5rem)]"
            >
              {t.hero.headline}
            </h1>

            {/* Supporting text */}
            <p
              ref={subheadlineRef}
              className="text-lg md:text-xl text-[var(--text-secondary)] mb-6 md:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {t.hero.subheadline}
            </p>

            {/* Price — elegant, not a discount badge */}
            <div
              ref={priceRef}
              className="inline-flex items-baseline gap-3 mb-6 md:mb-8 px-5 py-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--color-gold-500)]/50 shadow-[0_4px_24px_-8px_rgba(212,168,67,0.35)]"
            >
              <span className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-[var(--text-primary)]">
                {t.hero.priceLabel}
              </span>
              <span className="text-sm text-[var(--text-muted)] font-medium">
                {t.hero.priceNote}
              </span>
            </div>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 justify-center lg:justify-start mb-7 md:mb-9 max-w-md sm:max-w-none mx-auto lg:mx-0"
            >
              {/* CTA glow ring behind primary button */}
              <div className="relative flex-1 sm:flex-none">
                <div className="absolute -inset-2 rounded-[var(--radius-lg)] bg-[var(--color-blue-600)]/10 blur-lg opacity-60 pointer-events-none" />
                <Button variant="primary" size="lg" href="#contact" className="w-full sm:w-auto">
                  {t.hero.cta}
                </Button>
              </div>
              <Button variant="secondary" size="lg" href="#how-it-works" className="flex-1 sm:flex-none">
                {t.hero.secondary}
              </Button>
            </div>

            {/* Trust row — real claims only */}
            <div
              ref={badgeRef}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-1" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-[var(--color-gold-500)]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-caption font-medium">
                  {t.hero.trustBadge}
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-[var(--border-primary)]" aria-hidden="true" />
              <p className="text-caption font-medium flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[var(--color-blue-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {t.hero.locationLine}
              </p>
            </div>
          </div>

          {/* Product Image — dominant visual */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex justify-center lg:justify-end">
            <div ref={productRef} className="relative w-full max-w-[17rem] sm:max-w-md lg:max-w-xl">
              {/* Background glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-[120%] h-[120%] rounded-full blur-[100px]"
                  style={{
                    background: theme === 'dark'
                      ? 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(212, 168, 67, 0.05) 40%, transparent 65%)'
                      : 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(212, 168, 67, 0.03) 40%, transparent 65%)',
                  }}
                />
              </div>

              {/* Product image — large and dominant, framed as a premium photo */}
              <div className="relative z-10 product-shine rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(6,10,20,0.35)] ring-1 ring-black/5 dark:ring-white/10">
                {theme === 'dark' ? (
                  <ProductImage
                    variant="dark"
                    alt="ReviewBoost NFC Google Review Card"
                    className="w-full h-auto"
                    loading="eager"
                  />
                ) : (
                  <ProductImage
                    variant="bright"
                    alt="ReviewBoost NFC Google Review Card"
                    className="w-full h-auto"
                    loading="eager"
                  />
                )}
              </div>

              {/* Gold star accent — hidden on small screens to avoid crowding */}
              <div ref={starRef} className="absolute -top-6 -right-4 hidden sm:block md:-top-4 md:right-4">
                <div className="w-14 h-14 md:w-24 md:h-24 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full text-[var(--color-gold-500)] drop-shadow-lg"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>

              {/* NFC badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 md:-bottom-2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-light dark:glass-dark shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-blue-500)] animate-pulse" aria-hidden="true" />
                  <span className="text-xs font-medium text-[var(--text-primary)]">{t.hero.nfcBadge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 scroll-pulse"
        >
          <span className="text-caption uppercase tracking-widest">{t.hero.scrollIndicator}</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--color-blue-500)]/50 to-transparent" aria-hidden="true" />
        </div>
      </Container>
    </section>
  );
}

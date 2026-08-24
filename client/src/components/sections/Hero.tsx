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
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });
    gsap.set(productRef.current, { opacity: 0, scale: 0.9, y: 30 });
    gsap.set(glowRef.current, { opacity: 0, scale: 0.6 });
    gsap.set(starRef.current, { opacity: 0, scale: 0, rotation: -45 });
    gsap.set(scrollIndicatorRef.current, { opacity: 0 });
    gsap.set(badgeRef.current, { opacity: 0, y: 10 });

    // Entrance sequence — dramatic and paced
    tl.to(glowRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.4,
      ease: 'power2.out',
    })
      .to(
        eyebrowRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        '-=1.0'
      )
      .to(
        headlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .to(
        subheadlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        '-=0.5'
      )
      .to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        '-=0.5'
      )
      .to(
        productRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=1.0'
      )
      .to(
        badgeRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        '-=0.6'
      )
      .to(
        starRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.7,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      )
      .to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          duration: 0.6,
        },
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
      className="relative min-h-screen flex items-center overflow-hidden noise-overlay"
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

      <Container className="relative z-10 pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Content — takes more space */}
          <div className="order-2 lg:order-1 lg:col-span-6 text-center lg:text-left">
            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center gap-2 mb-6 md:mb-8"
            >
              <div className="w-8 h-px bg-[var(--color-blue-500)]" />
              <span className="text-eyebrow">{t.hero.eyebrow}</span>
            </div>

            {/* Headline — massive and impactful */}
            <h1
              ref={headlineRef}
              className="text-display text-[var(--text-primary)] mb-6 md:mb-8 whitespace-pre-line"
            >
              {t.hero.headline}
            </h1>

            {/* Supporting text */}
            <p
              ref={subheadlineRef}
              className="text-[var(--text-hero-sub)] text-[var(--text-secondary)] mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {t.hero.subheadline}
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8"
            >
              {/* CTA glow ring behind primary button */}
              <div className="relative">
                <div className="absolute -inset-2 rounded-[var(--radius-lg)] bg-[var(--color-blue-500)]/10 blur-lg opacity-60 pointer-events-none" />
                <Button variant="primary" size="lg">
                  <a href="#contact">{t.hero.cta}</a>
                </Button>
              </div>
              <Button variant="ghost" size="lg">
                <a href="#how-it-works">{t.hero.secondary}</a>
              </Button>
            </div>

            {/* Trust badge */}
            <div
              ref={badgeRef}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 text-[var(--color-gold-500)]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-caption">
                {t.hero.trustBadge}
              </span>
            </div>
          </div>

          {/* Product Image — dominant visual */}
          <div className="order-1 lg:order-2 lg:col-span-6 flex justify-center lg:justify-end">
            <div ref={productRef} className="relative w-full max-w-lg lg:max-w-xl">
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

              {/* Product image — large and dominant */}
              <div className="relative z-10 product-shine">
                {theme === 'dark' ? (
                  <ProductImage
                    variant="dark"
                    alt="ReviewBoost NFC Google Review Card"
                    className="w-full h-auto drop-shadow-2xl"
                    loading="eager"
                  />
                ) : (
                  <ProductImage
                    variant="bright"
                    alt="ReviewBoost NFC Google Review Card"
                    className="w-full h-auto drop-shadow-2xl"
                    loading="eager"
                  />
                )}
              </div>

              {/* Gold star accent */}
              <div ref={starRef} className="absolute -top-6 -right-4 md:-top-4 md:right-4">
                <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
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
              <div className="absolute -bottom-4 -left-4 md:-bottom-2 md:left-0">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-light dark:glass-dark shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-blue-500)] animate-pulse" />
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
          <div className="w-px h-12 bg-gradient-to-b from-[var(--color-blue-500)]/50 to-transparent" />
        </div>
      </Container>
    </section>
  );
}

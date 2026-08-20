import { useRef } from 'react';
import { useLanguage } from '../../i18n';
import { useGsapContext } from '../../hooks/useGsapContext';
import { gsap } from 'gsap';
import { Container } from '../ui/Container';
import { ProductImage } from '../product/ProductImage';

export function Benefits() {
  const { t } = useLanguage();
  const benefits = t.benefits.items;
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const benefit1Ref = useRef<HTMLDivElement>(null);
  const benefit2Ref = useRef<HTMLDivElement>(null);
  const benefit3Ref = useRef<HTMLDivElement>(null);
  const benefit4Ref = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!sectionRef.current) return;

    // Headline reveal
    gsap.set(headlineRef.current, { opacity: 0, y: 30 });
    gsap.to(headlineRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Benefit 1 - Large visual card: fade + upward
    gsap.set(benefit1Ref.current, { opacity: 0, y: 50 });
    gsap.to(benefit1Ref.current, {
      scrollTrigger: {
        trigger: benefit1Ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
    });

    // Benefit 2 - Lateral reveal from right
    gsap.set(benefit2Ref.current, { opacity: 0, x: 40 });
    gsap.to(benefit2Ref.current, {
      scrollTrigger: {
        trigger: benefit2Ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Benefit 3 - Scale/opacity
    gsap.set(benefit3Ref.current, { opacity: 0, scale: 0.92 });
    gsap.to(benefit3Ref.current, {
      scrollTrigger: {
        trigger: benefit3Ref.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Benefit 4 - Full width: slide up
    gsap.set(benefit4Ref.current, { opacity: 0, y: 40 });
    gsap.to(benefit4Ref.current, {
      scrollTrigger: {
        trigger: benefit4Ref.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
    });
  });

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      <Container className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-6 h-px bg-[var(--color-blue-500)]" />              <span className="text-eyebrow text-[var(--color-blue-500)]">
                {t.benefits.eyebrow}
              </span>
            <div className="w-6 h-px bg-[var(--color-blue-500)]" />
          </div>

          <h2
            ref={headlineRef}
            className="text-section-title text-[var(--text-primary)] mb-4"
          >
            {t.benefits.headline}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-gold-500)] to-[var(--color-gold-400)] mx-auto rounded-full" />
        </div>

        {/* Benefits grid - asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* First benefit — large visual card with product */}
          <div
            ref={benefit1Ref}
            className="lg:row-span-2 relative rounded-3xl overflow-hidden p-8 md:p-12 flex flex-col justify-between min-h-[420px] group"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy-900)] via-[var(--color-navy-800)] to-[var(--color-navy-700)]" />
            <div className="absolute inset-0 bg-[var(--color-blue-500)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Content */}
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-[var(--color-blue-500)]/20 text-[var(--color-blue-300)] rounded-full mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-400)]" />
                {benefits[0].title}
              </span>
              <h3 className="text-h2 text-white mb-4 leading-tight">
                {benefits[0].description}
              </h3>
            </div>

            {/* Product image */}
            <div className="relative z-10 mt-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[80%] h-[80%] rounded-full bg-[var(--color-blue-500)]/10 blur-[40px]" />
                </div>
                <ProductImage
                  variant="secondary"
                  alt="ReviewBoost card close-up"
                  className="w-full max-w-[240px] drop-shadow-2xl relative z-10"
                />
              </div>
            </div>
          </div>

          {/* Second benefit */}
          <div
            ref={benefit2Ref}
            className="rounded-3xl bg-[var(--bg-secondary)] p-8 md:p-10 border border-[var(--border-subtle)] hover:border-[var(--color-blue-500)]/20 transition-all duration-500 group"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-[var(--color-gold-500)]/10 text-[var(--color-gold-500)] rounded-full mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-500)]" />
              {benefits[1].title}
            </span>
            <h3 className="text-h3 text-[var(--text-primary)] mb-3 leading-snug">
              {benefits[1].description}
            </h3>
            <div className="mt-4 flex items-center gap-2 text-[var(--color-blue-500)] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-sm font-medium">{t.benefits.learnMore}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>

          {/* Third benefit */}
          <div
            ref={benefit3Ref}
            className="rounded-3xl bg-[var(--bg-secondary)] p-8 md:p-10 border border-[var(--border-subtle)] hover:border-[var(--color-blue-500)]/20 transition-all duration-500 group"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-[var(--color-blue-500)]/10 text-[var(--color-blue-500)] rounded-full mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-500)]" />
              {benefits[2].title}
            </span>
            <h3 className="text-h3 text-[var(--text-primary)] mb-3 leading-snug">
              {benefits[2].description}
            </h3>
            <div className="mt-4 flex items-center gap-2 text-[var(--color-blue-500)] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-sm font-medium">{t.benefits.learnMore}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Fourth benefit — full width with visual */}
        <div
          ref={benefit4Ref}
          className="mt-6 lg:mt-8 rounded-3xl overflow-hidden group"
        >
          <div className="relative p-8 md:p-12 bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-primary)] border border-[var(--border-subtle)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-[var(--color-gold-500)]/10 text-[var(--color-gold-500)] rounded-full mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-500)]" />
                  {benefits[3].title}
                </span>
                <h3 className="text-h3 text-[var(--text-primary)] mb-3 leading-snug">
                  {benefits[3].description}
                </h3>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="flex gap-3">
                  {/* Placement icons */}
                  {[
                    <svg key="store" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                    </svg>,
                    <svg key="desk" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
                    </svg>,
                    <svg key="profile" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>,
                  ].map((icon, i) => (
                    <div
                      key={i}
                      className="w-14 h-14 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--color-blue-500)] hover:border-[var(--color-blue-500)]/30 hover:bg-[var(--color-blue-500)]/5 transition-all duration-300"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

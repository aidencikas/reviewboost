import { useRef } from 'react';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../hooks/useTheme';
import { useGsapContext } from '../../hooks/useGsapContext';
import { gsap } from 'gsap';
import { Container } from '../ui/Container';

import mainBright from '../../assets/images/product-main-bright.jfif';
import mainDark from '../../assets/images/product-main-dark.jfif';

export function HowItWorks() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  const steps = [t.howItWorks.step1, t.howItWorks.step2, t.howItWorks.step3];
  const stepRefs = [step1Ref, step2Ref, step3Ref];

  useGsapContext(() => {
    if (!sectionRef.current) return;

    // Set initial states
    gsap.set(headlineRef.current, { opacity: 0, y: 30 });
    gsap.set(lineRef.current, { scaleX: 0 });
    gsap.set(stepRefs.map((r) => r.current), {
      opacity: 0,
      y: 50,
    });

    // Headline reveal
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

    // Connection line draw
    gsap.to(lineRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 55%',
        toggleActions: 'play none none none',
      },
      scaleX: 1,
      duration: 1.5,
      ease: 'power2.inOut',
    });

    // Steps stagger reveal
    stepRefs.forEach((ref, index) => {
      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top ${65 - index * 5}%`,
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
      });
    });
  });

  const stepIcons = [
    // Card / See
    <svg key="see" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>,
    // NFC / Tap
    <svg key="tap" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>,
    // Star / Review
    <svg key="review" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>,
  ];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-20 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      {/* Subtle accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent" />

      <Container className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-6 h-px bg-[var(--color-blue-500)]" />              <span className="text-eyebrow">
                {t.howItWorks.eyebrow}
              </span>
            <div className="w-6 h-px bg-[var(--color-blue-500)]" />
          </div>

          <h2
            ref={headlineRef}
            className="text-section-title text-[var(--text-primary)] mb-4"
          >
            {t.howItWorks.headline}
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-blue-500)] to-[var(--color-blue-400)] mx-auto rounded-full" />
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop only) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[72px] left-[18%] right-[18%] h-px origin-left"
            style={{
              background: `linear-gradient(90deg, transparent 0%, var(--color-blue-500) 15%, var(--color-gold-500) 50%, var(--color-blue-500) 85%, transparent 100%)`,
              opacity: 0.4,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={stepRefs[index]}
                className="relative text-center group"
              >
                {/* Step number with icon */}
                <div className="relative inline-flex mb-8">
                  {/* Outer ring */}
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-[var(--color-blue-500)]/20 flex items-center justify-center relative z-10 bg-[var(--bg-primary)] group-hover:border-[var(--color-blue-500)]/40 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] transition-all duration-500">
                    {/* Inner content */}
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[var(--color-blue-500)]">
                        {stepIcons[index]}
                      </span>
                      <span className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-full bg-[var(--color-blue-500)]/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Visual — fixed height so nothing overlaps the title below */}
                <div className="mb-6 flex justify-center h-44 items-center">
                  {index === 0 && (
                    <div className="w-44 rounded-xl overflow-hidden shadow-lg border border-[var(--border-subtle)] group-hover:shadow-xl transition-shadow duration-500">
                      <img
                        src={theme === 'dark' ? mainDark : mainBright}
                        alt="ReviewBoost card"
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}
                  {index === 1 && (
                    <div className="relative">
                      {/* NFC wave animation */}
                      <div className="relative w-20 h-20">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="absolute inset-0 border border-[var(--color-blue-500)]/20 rounded-full"
                            style={{
                              animation: `ping 2s cubic-bezier(0, 0, 0.2, 1) ${i * 0.5}s infinite`,
                            }}
                          />
                        ))}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-8 h-8 text-[var(--color-blue-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-8 h-8 text-[var(--color-gold-500)] drop-shadow-sm"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  )}
                </div>

                {/* Text content */}
                <h3 className="text-h3 text-[var(--text-primary)] mb-3">
                  {step.title}
                </h3>
                <p className="text-body text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow (mobile only) */}
                {index < 2 && (
                  <div className="lg:hidden flex justify-center mt-10">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-px h-8 bg-gradient-to-b from-[var(--color-blue-500)]/30 to-transparent" />
                      <svg
                        className="w-5 h-5 text-[var(--color-blue-500)]/50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

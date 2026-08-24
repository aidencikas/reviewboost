import { useRef } from 'react';
import { useLanguage } from '../../i18n';
import { useGsapContext } from '../../hooks/useGsapContext';
import { gsap } from 'gsap';
import { Container } from '../ui/Container';

export function BusinessValue() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!sectionRef.current) return;

    // Set initial states
    gsap.set(headlineRef.current, { opacity: 0, y: 30 });
    gsap.set(pointsRef.current?.children || [], {
      opacity: 0,
      x: -40,
    });

    // Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    }).to(
      pointsRef.current?.children || [],
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      },
      '-=0.3'
    );
  });

  return (
    <section
      ref={sectionRef}
      id="business-value"
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-secondary)]" />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <h2
            ref={headlineRef}
            className="text-section-title text-[var(--text-primary)] mb-12 md:mb-20 whitespace-pre-line text-center"
          >
            {t.businessValue.headline}
          </h2>

          {/* Value points — editorial list */}
          <div ref={pointsRef} className="space-y-4">
            {t.businessValue.points.map((point, index) => (
              <div
                key={index}
                className="group relative flex items-center gap-6 p-6 md:p-8 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--color-blue-500)]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500"
              >
                {/* Number */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-blue-500)]/10 to-[var(--color-blue-500)]/5 flex items-center justify-center flex-shrink-0 group-hover:from-[var(--color-blue-500)]/20 group-hover:to-[var(--color-blue-500)]/10 transition-all duration-500">
                  <span className="text-lg font-bold text-[var(--color-blue-500)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Text */}
                <p className="text-body-lg text-[var(--text-primary)] font-medium flex-1 leading-relaxed">
                  {point}
                </p>

                {/* Arrow */}
                <svg
                  className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

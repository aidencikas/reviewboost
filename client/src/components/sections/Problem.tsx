import { useRef } from 'react';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../hooks/useTheme';
import { useGsapContext } from '../../hooks/useGsapContext';
import { gsap } from 'gsap';
import { Container } from '../ui/Container';

export function Problem() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const detailRef = useRef<HTMLParagraphElement>(null);
  const separatorRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!sectionRef.current) return;

    // Set initial states
    gsap.set(eyebrowRef.current, { opacity: 0, y: 15 });
    gsap.set(headlineRef.current, { opacity: 0, y: 30 });
    gsap.set(descriptionRef.current, { opacity: 0, y: 25 });
    gsap.set(detailRef.current, { opacity: 0, y: 20 });
    gsap.set(separatorRef.current, { opacity: 0, scaleX: 0 });
    gsap.set(phoneRef.current, { opacity: 0, y: 40, rotateY: -5 });
    gsap.set(starsRef.current, { opacity: 0, scale: 0.8 });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(eyebrowRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    })
      .to(
        headlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      )
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        '-=0.5'
      )
      .to(
        detailRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        '-=0.4'
      )
      .to(
        separatorRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      .to(
        phoneRef.current,
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 1.0,
          ease: 'power3.out',
        },
        '-=0.8'
      )
      .to(
        starsRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.5)',
        },
        '-=0.4'
      );
  });

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative py-20 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background treatment */}
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-[#060a14] via-[#0a0e1a] to-[#0f1629]'
          : 'bg-gradient-to-b from-white via-[#f8fafc] to-[#f1f5f9]'
      }`} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-blue-500)]/30 to-transparent" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content — editorial style */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-[var(--color-gold-500)]" />
              <span className="text-eyebrow text-[var(--color-gold-500)]">
                {t.problem.eyebrow}
              </span>
            </div>

            {/* Headline — large and impactful */}
            <h2
              ref={headlineRef}
              className="text-section-title text-[var(--text-primary)] mb-6 md:mb-8 whitespace-pre-line"
            >
              {t.problem.headline}
            </h2>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-[var(--text-secondary)] mb-6 leading-relaxed max-w-lg"
            >
              {t.problem.description}
            </p>

            {/* Detail text */}
            <p
              ref={detailRef}
              className="text-base md:text-lg text-[var(--text-primary)] font-medium leading-relaxed max-w-lg"
            >
              {t.problem.detail}
            </p>

            {/* Visual separator */}
            <div
              ref={separatorRef}
              className="mt-10 flex items-center gap-4 max-w-md"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-blue-500)]/30 to-transparent" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-500)]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-500)]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue-500)]" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-[var(--color-blue-500)]/30 to-transparent" />
            </div>
          </div>

          {/* Visual — Premium phone mockup */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div ref={phoneRef} className="relative perspective-[1000px]">
              {/* Phone frame */}
              <div className="relative w-64 h-[480px] md:w-72 md:h-[540px] rounded-[44px] border-[3px] border-[var(--border-primary)] bg-[var(--bg-primary)] shadow-[0_20px_60px_-15px_rgba(37,99,235,0.15)] overflow-hidden">
                {/* Dynamic notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[var(--border-primary)] rounded-b-2xl z-10" />

                {/* Screen content */}
                <div className="absolute inset-0 pt-12 px-5">
                  {/* Google header */}
                  <div className="text-center mb-5">
                    <div className="inline-flex items-center gap-0.5">
                      <span className="text-[15px] font-medium text-[#4285f4]">G</span>
                      <span className="text-[15px] font-medium text-[#ea4335]">o</span>
                      <span className="text-[15px] font-medium text-[#fbbc05]">o</span>
                      <span className="text-[15px] font-medium text-[#4285f4]">g</span>
                      <span className="text-[15px] font-medium text-[#34a853]">l</span>
                      <span className="text-[15px] font-medium text-[#ea4335]">e</span>
                    </div>
                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5 tracking-wide uppercase">Reviews</p>
                  </div>

                  {/* Star rating */}
                  <div className="flex justify-center gap-0.5 mb-5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-7 h-7 text-[var(--color-gold-500)]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review prompt */}
                  <div className="text-center mb-4">
                    <p className="text-xs font-medium text-[var(--text-primary)]">
                      {t.hero.phoneReviewLabel}
                    </p>
                  </div>

                  {/* Review form mockup */}
                  <div className="space-y-2.5">
                    <div className="h-2.5 bg-[var(--bg-tertiary)] rounded-full w-3/4 mx-auto" />
                    <div className="h-2.5 bg-[var(--bg-tertiary)] rounded-full w-1/2 mx-auto" />
                    <div className="h-16 bg-[var(--bg-tertiary)] rounded-xl mt-3" />
                    <div className="h-9 bg-gradient-to-r from-[var(--color-blue-500)] to-[var(--color-blue-600)] rounded-xl mt-3 flex items-center justify-center shadow-lg">
                      <span className="text-white text-[11px] font-semibold tracking-wide uppercase">
                        {t.hero.phoneSubmitLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom home indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-[var(--text-muted)]/30 rounded-full" />
              </div>

              {/* NFC wave effect */}
              <div className="absolute -left-16 top-1/2 -translate-y-1/2 pointer-events-none">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute border border-[var(--color-blue-500)]/15 rounded-full"
                    style={{
                      width: `${50 + i * 25}px`,
                      height: `${50 + i * 25}px`,
                      left: `${-10 - i * 12}px`,
                      top: `${-25 - i * 12}px`,
                      animation: `ping 3s cubic-bezier(0, 0, 0.2, 1) ${i * 0.8}s infinite`,
                    }}
                  />
                ))}
              </div>

              {/* Floating star rating */}
              <div
                ref={starsRef}
                className="absolute -top-4 -right-8 md:-right-12"
              >
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full glass-light dark:glass-dark shadow-lg">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-3.5 h-3.5 text-[var(--color-gold-500)]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="text-[10px] font-semibold text-[var(--text-primary)] ml-1">5.0</span>
                </div>
              </div>

              {/* Tap indicator */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-light dark:glass-dark shadow-md">
                  <svg className="w-3.5 h-3.5 text-[var(--color-blue-500)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                  </svg>
                  <span className="text-[10px] font-medium text-[var(--text-primary)]">
                    {t.hero.phoneTapLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

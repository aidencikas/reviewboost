import { useRef } from 'react';
import { useLanguage } from '../../i18n';
import { useGsapContext } from '../../hooks/useGsapContext';
import { gsap } from 'gsap';
import { Container } from '../ui/Container';
import { ProductImage } from '../product/ProductImage';

const BEFORE_BARS = [30, 42, 35, 50, 40, 48, 38];
const AFTER_BARS = [35, 45, 55, 65, 78, 90, 100];

function Stars({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < filled ? 'text-[var(--color-gold-500)]' : 'text-[var(--text-muted)]/40'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Bars({
  barsRef,
  heights,
  variant,
}: {
  barsRef: React.RefObject<HTMLDivElement | null>;
  heights: number[];
  variant: 'before' | 'after';
}) {
  return (
    <div ref={barsRef} className="flex items-end gap-1 h-12 mt-4" aria-hidden="true">
      {heights.map((h, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm ${
            variant === 'after'
              ? 'bg-gradient-to-t from-[var(--color-blue-600)] to-[var(--color-blue-400)]'
              : 'bg-[var(--text-muted)]/40'
          }`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function FlowArrow() {
  return (
    <div
      className="rotate-90 md:rotate-0 shrink-0 text-[var(--color-blue-500)]/60"
      aria-hidden="true"
    >
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeDasharray="4 4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m0 0l-6-6m6 6l-6 6" />
      </svg>
    </div>
  );
}

export function Results() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const beforeBarsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const afterBarsRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useGsapContext(() => {
    if (!sectionRef.current) return;

    gsap.set(headlineRef.current, { opacity: 0, y: 24 });
    gsap.set(beforeRef.current, { opacity: 0, y: 24 });
    gsap.set(cardRef.current, { opacity: 0, scale: 0.85 });
    gsap.set(afterRef.current, { opacity: 0, y: 24 });
    gsap.set(captionRef.current, { opacity: 0, y: 16 });
    gsap.set(beforeBarsRef.current?.children || [], { scaleY: 0.25, transformOrigin: 'bottom' });
    gsap.set(afterBarsRef.current?.children || [], { scaleY: 0.1, transformOrigin: 'bottom' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to(beforeRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
      .to(
        beforeBarsRef.current?.children || [],
        { scaleY: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' },
        '-=0.2'
      )
      .to(cardRef.current, { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.3)' }, '-=0.3')
      .to(afterRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
      .to(
        afterBarsRef.current?.children || [],
        { scaleY: 1, duration: 0.7, stagger: 0.06, ease: 'power2.out' },
        '-=0.2'
      )
      .to(captionRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2');
  });

  return (
    <section
      ref={sectionRef}
      id="results"
      className="relative py-20 md:py-32 lg:py-40 overflow-hidden"
      aria-label={t.results.headline}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent" />

      <Container className="relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-6 h-px bg-[var(--color-gold-500)]" />
            <span className="text-eyebrow text-[var(--color-gold-500)]">{t.results.eyebrow}</span>
            <div className="w-6 h-px bg-[var(--color-gold-500)]" />
          </div>
          <h2
            ref={headlineRef}
            className="text-section-title text-[var(--text-primary)]"
          >
            {t.results.headline}
          </h2>
        </div>

        {/* Before → Card → After flow */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 lg:gap-6">
          {/* Before card */}
          <div
            ref={beforeRef}
            className="w-full max-w-xs rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-6"
          >
            <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-muted)] mb-3">
              {t.results.before}
            </p>
            <h3 className="text-h3 text-[var(--text-primary)]">{t.results.business}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-extrabold text-[var(--text-primary)]">3,2</span>
              <Stars filled={3} />
            </div>
            <p className="text-caption text-[var(--text-muted)] mt-1">{t.results.reviewsBefore}</p>
            <Bars barsRef={beforeBarsRef} heights={BEFORE_BARS} variant="before" />
          </div>

          <FlowArrow />

          {/* Product card — the catalyst */}
          <div
            ref={cardRef}
            className="relative w-full max-w-[11rem] md:max-w-[9rem] lg:max-w-[11rem] shrink-0"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[130%] h-[130%] rounded-full blur-[60px] bg-[var(--color-blue-500)]/20" />
            </div>
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(6,10,20,0.45)] ring-1 ring-black/5 dark:ring-white/10 product-shine">
              <ProductImage
                variant="secondary"
                alt="ReviewBoost NFC Google Review Card"
                className="w-full h-auto"
              />
            </div>
          </div>

          <FlowArrow />

          {/* After card */}
          <div
            ref={afterRef}
            className="w-full max-w-xs rounded-2xl bg-[var(--bg-secondary)] border border-[var(--color-blue-500)]/30 p-6 shadow-[0_0_40px_-12px_rgba(37,99,235,0.25)]"
          >
            <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-blue-500)] mb-3">
              {t.results.after}
            </p>
            <h3 className="text-h3 text-[var(--text-primary)]">{t.results.business}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl font-extrabold text-[var(--text-primary)]">4,8</span>
              <Stars filled={5} />
            </div>
            <p className="text-caption text-[var(--text-muted)] mt-1">{t.results.reviewsAfter}</p>
            <Bars barsRef={afterBarsRef} heights={AFTER_BARS} variant="after" />
          </div>
        </div>

        {/* Caption */}
        <p
          ref={captionRef}
          className="text-center text-body text-[var(--text-secondary)] mt-10 md:mt-12"
        >
          {t.results.caption}
        </p>
      </Container>
    </section>
  );
}

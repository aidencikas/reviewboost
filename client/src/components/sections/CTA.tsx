import { useRef } from 'react';
import { useLanguage } from '../../i18n';
import { useGsapContext } from '../../hooks/useGsapContext';
import { gsap } from 'gsap';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ProductImage } from '../product/ProductImage';

export function CTA() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!sectionRef.current) return;

    // Set initial states
    gsap.set(headlineRef.current, { opacity: 0, y: 30 });
    gsap.set(descriptionRef.current, { opacity: 0, y: 20 });
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });
    gsap.set(productRef.current, { opacity: 0, scale: 0.9, x: 40 });

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
    })
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
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        '-=0.4'
      )
      .to(
        productRef.current,
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.0,
          ease: 'power2.out',
        },
        '-=0.7'
      );
  });

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Deep navy background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-navy-950)] via-[var(--color-navy-900)] to-[var(--color-navy-800)]" />

      {/* Glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 168, 67, 0.1) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-blue-500)]/40 to-transparent" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text content — takes more space */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h2
              ref={headlineRef}
              className="text-section-title text-white mb-6 md:mb-8 whitespace-pre-line"
            >
              {t.cta.headline}
            </h2>
            <p
              ref={descriptionRef}
              className="text-body-lg text-[var(--color-blue-200)]/60 mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {t.cta.description}
            </p>
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Button variant="primary" size="lg">
                <a href="#contact">{t.cta.primary}</a>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="border-white/20 text-white hover:border-white/40 hover:text-white"
              >
                <a href="#contact">{t.cta.secondary}</a>
              </Button>
            </div>
          </div>

          {/* Product visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div ref={productRef} className="relative">
              {/* Glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-[120%] h-[120%] rounded-full blur-[80px]"
                  style={{
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 50%)',
                  }}
                />
              </div>

              {/* Product */}
              <div className="relative z-10">
                <ProductImage
                  variant="dark"
                  alt="ReviewBoost NFC Card"
                  className="w-full max-w-sm drop-shadow-2xl"
                />
              </div>

              {/* Gold stars */}
              <div className="absolute -top-6 -right-6 flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-[var(--color-gold-500)] drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

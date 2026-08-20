import { useRef } from 'react';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../hooks/useTheme';
import { useGsapContext } from '../../hooks/useGsapContext';
import { gsap } from 'gsap';
import { Container } from '../ui/Container';
import { ProductImage } from '../product/ProductImage';

export function ProductShowcase() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useGsapContext(() => {
    if (!sectionRef.current) return;

    gsap.set(headlineRef.current, { opacity: 0, y: 30 });
    gsap.set(descriptionRef.current, { opacity: 0, y: 20 });
    gsap.set(productRef.current, { opacity: 0, scale: 0.92, y: 20 });
    gsap.set(detailRef.current, { opacity: 0, scale: 0.85, y: 30 });
    gsap.set(featuresRef.current?.children || [], { opacity: 0, x: -20 });
    gsap.set(specsRef.current, { opacity: 0, y: 20 });

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
      .to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .to(productRef.current, { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power2.out' }, '-=0.4')
      .to(detailRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.3)' }, '-=0.6')
      .to(featuresRef.current?.children || [], { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
      .to(specsRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3');

    if (productRef.current && sectionRef.current) {
      gsap.to(productRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
        y: -25,
        ease: 'none',
      });
    }
  });

  // Specs: translated label + actual value based on language
  const specs = [
    { label: t.product.specs.material, value: language === 'lt' ? 'Akrilas' : 'Acrylic' },
    { label: t.product.specs.size, value: '100 × 100 mm' },
    { label: t.product.specs.chip, value: 'NTAG213' },
    { label: t.product.specs.adhesive, value: '3M 467MP' },
    { label: t.product.specs.finish, value: language === 'lt' ? 'Blizgus' : 'Glossy' },
    { label: t.product.specs.design, value: language === 'lt' ? 'Priekyje spausdintas' : 'Front printed' },
  ];

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-[#0f1629] via-[#0a0e1a] to-[#060a14]'
            : 'bg-gradient-to-b from-[#f1f5f9] via-white to-[#f8fafc]'
        }`} />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(212, 168, 67, 0.06) 0%, transparent 60%)'
              : 'radial-gradient(circle, rgba(212, 168, 67, 0.03) 0%, transparent 60%)',
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-6 h-px bg-[var(--color-gold-500)]" />
            <span className="text-eyebrow text-[var(--color-gold-500)]">
              {t.product.eyebrow}
            </span>
            <div className="w-6 h-px bg-[var(--color-gold-500)]" />
          </div>

          <h2
            ref={headlineRef}
            className="text-section-title text-[var(--text-primary)] mb-4 whitespace-pre-line"
          >
            {t.product.headline}
          </h2>
          <p
            ref={descriptionRef}
            className="text-body-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
          >
            {t.product.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 flex justify-center">
            <div ref={productRef} className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-[120%] h-[120%] rounded-full blur-[100px]"
                  style={{
                    background: theme === 'dark'
                      ? 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 50%)'
                      : 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 50%)',
                  }}
                />
              </div>

              <div className="relative z-10">
                {theme === 'dark' ? (
                  <ProductImage
                    variant="dark"
                    alt="ReviewBoost NFC Google Review Card - Dark"
                    className="w-full max-w-lg drop-shadow-2xl"
                  />
                ) : (
                  <ProductImage
                    variant="bright"
                    alt="ReviewBoost NFC Google Review Card - Bright"
                    className="w-full max-w-lg drop-shadow-2xl"
                  />
                )}
              </div>

              <div
                ref={detailRef}
                className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 z-20"
              >
                <ProductImage
                  variant="secondary"
                  alt="ReviewBoost card detail"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-[var(--color-gold-500)] drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3 className="text-h2 text-[var(--text-primary)] mb-8">
              {t.product.features[0]}
            </h3>

            <div ref={featuresRef} className="space-y-5">
              {t.product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-blue-500)]/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[var(--color-blue-500)]/20 transition-colors duration-300">
                    <svg
                      className="w-4 h-4 text-[var(--color-blue-500)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>

            <div ref={specsRef} className="mt-10 pt-10 border-t border-[var(--border-subtle)]">
              <h4 className="text-label text-[var(--text-muted)] mb-5">{t.product.specsTitle}</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {specs.map((spec, index) => (
                  <div key={index} className="group">
                    <p className="text-caption mb-1">{spec.label}</p>
                    <p className="text-body-sm text-[var(--text-primary)] font-semibold group-hover:text-[var(--color-blue-500)] transition-colors duration-300">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

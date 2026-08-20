import { useLanguage } from '../../i18n';
import { Container } from '../ui/Container';
import { Accordion } from '../ui/Accordion';

export function FAQ() {
  const { t } = useLanguage();

  return (
    <section
      id="faq"
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-[var(--color-blue-500)]" />
              <span className="text-eyebrow">
                {t.faq.eyebrow}
              </span>
              <div className="w-6 h-px bg-[var(--color-blue-500)]" />
            </div>

            <h2 className="text-section-title text-[var(--text-primary)] mb-4">
              {t.faq.headline}
            </h2>

            <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-blue-500)] to-[var(--color-blue-400)] mx-auto rounded-full" />
          </div>

          {/* Accordion */}
          <Accordion items={t.faq.questions} />
        </div>
      </Container>
    </section>
  );
}

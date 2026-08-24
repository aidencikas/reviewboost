import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../hooks/useTheme';
import { Container } from '../ui/Container';

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <section
      className={`relative min-h-screen py-28 md:py-36 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-[#060a14] via-[#0a0e1a] to-[#060a14]'
          : 'bg-gradient-to-b from-white via-[#f8fafc] to-white'
      }`}
    >
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 mb-8 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.nav.getQuote}
          </button>

          {/* Title */}
          <h1 className="text-section-title text-[var(--text-primary)] mb-2">
            {title}
          </h1>
          <p className="text-caption mb-12">
            {t.legal.lastUpdated}: {lastUpdated}
          </p>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-[var(--text-secondary)] leading-relaxed space-y-8">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}

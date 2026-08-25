import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n';
import { siteConfig } from '../../config/siteConfig';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

export function Footer() {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-blue-500)]/20 to-transparent" />
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <Logo />
              <p className="text-[var(--text-secondary)] text-sm">
                {t.footer.description}
              </p>
              <Button variant="primary" size="sm" href="#contact">
                {t.nav.getQuote}
              </Button>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
                {t.footer.quickLinks}
              </h3>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    href="#how-it-works"
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {t.nav.howItWorks}
                  </a>
                </li>
                <li>
                  <a
                    href="#product"
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {t.nav.product}
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {t.nav.faq}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
                {t.footer.contactInfo}
              </h3>
              <ul className="flex flex-col gap-2 text-sm text-[var(--text-secondary)]">
                {siteConfig.contact.email && (
                  <li>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="hover:text-[var(--text-primary)] transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </li>
                )}
                {siteConfig.contact.phone && (
                  <li>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="hover:text-[var(--text-primary)] transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </li>
                )}
                {siteConfig.contact.address && (
                  <li>{siteConfig.contact.address}</li>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-muted)]">
              © {currentYear} {siteConfig.brand}. {t.footer.rights}
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/privacy"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {t.footer.privacyPolicy}
              </Link>
              <Link
                to="/terms"
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {t.footer.termsOfService}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n';
import { Logo } from '../ui/Logo';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageToggle } from '../ui/LanguageToggle';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export function Navbar() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#benefits', label: t.nav.benefits },
    { href: '#product', label: t.nav.product },
    { href: '#faq', label: t.nav.faq },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0
        z-[var(--z-sticky)]
        transition-all duration-[var(--duration-normal)] ease-[var(--ease-default)]
        ${isScrolled 
          ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md shadow-[var(--shadow-sm)]' 
          : 'bg-transparent'
        }
      `}
      aria-label={t.accessibility.mainNavigation}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="
                  text-sm font-medium
                  text-[var(--text-secondary)]
                  hover:text-[var(--text-primary)]
                  transition-colors duration-[var(--duration-fast)]
                "
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <Button variant="primary" size="sm">
              <a href="#contact">
                {t.nav.getQuote}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? t.accessibility.closeMenu : t.accessibility.openMenu}
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[var(--border-subtle)]">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="
                    text-base font-medium
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors duration-[var(--duration-fast)]
                  "
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <a href="#contact" className="w-full text-center">
                  {t.nav.getQuote}
                </a>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}

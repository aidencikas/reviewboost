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

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#product', label: t.nav.product },
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0
        z-[var(--z-sticky)]
        transition-all duration-[var(--duration-normal)] ease-[var(--ease-default)]
        ${isScrolled && !isMobileMenuOpen
          ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md shadow-[var(--shadow-sm)]'
          : isScrolled || isMobileMenuOpen
            ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md'
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
                  nav-link
                  text-sm font-medium
                  text-[var(--text-secondary)]
                  hover:text-[var(--text-primary)]
                  py-2
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
            <Button variant="primary" size="sm" href="#contact">
              {t.nav.getQuote}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 -mr-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-[var(--radius-md)] focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? t.accessibility.closeMenu : t.accessibility.openMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
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
          <div id="mobile-menu" className="lg:hidden pb-6 pt-4 border-t border-[var(--border-subtle)] max-h-[calc(100svh-4rem)] overflow-y-auto">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="
                    text-lg font-medium
                    text-[var(--text-primary)]
                    hover:text-[var(--color-blue-500)]
                    py-3.5 px-2
                    border-b border-[var(--border-subtle)]
                    transition-colors duration-[var(--duration-fast)]
                  "
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center justify-between gap-3 py-5">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <Button
                variant="primary"
                size="lg"
                href="#contact"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.getQuote}
              </Button>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}

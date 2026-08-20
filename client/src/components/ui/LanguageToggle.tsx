import { useLanguage, type Language } from '../../i18n';

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'lt', label: t.language.lt },
    { code: 'en', label: t.language.en },
  ];

  return (
    <div
      className="flex items-center gap-1 p-1 rounded-[var(--radius-md)] bg-[var(--bg-secondary)]"
      role="radiogroup"
      aria-label={t.accessibility.languageToggle}
    >
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`
            px-3 py-1.5
            text-sm font-medium
            rounded-[var(--radius-sm)]
            transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)]
            focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2
            ${
              language === code
                ? 'bg-[var(--color-primary)] text-white shadow-[var(--shadow-xs)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
            }
          `}
          role="radio"
          aria-checked={language === code}
          aria-label={code.toUpperCase()}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

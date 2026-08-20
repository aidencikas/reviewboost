import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from 'react';
import { lt } from './lt';
import { en } from './en';

export type Language = 'lt' | 'en';

export type Translations = typeof lt | typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'reviewboost-language';

const translations: Record<Language, Translations> = {
  lt,
  en,
};

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'lt' || stored === 'en') {
      return stored;
    }
  }
  return 'lt';
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    document.documentElement.lang = newLang;
  }, []);

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { lt, en };

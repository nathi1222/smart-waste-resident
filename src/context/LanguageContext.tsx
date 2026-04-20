import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, languageNames, languageFlags } from '../i18n/languages';
import type { Language } from '../i18n/languages';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
  languageNames: Record<Language, string>;
  languageFlags: Record<Language, string>;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return a default context instead of throwing error during development
    return {
      language: 'en',
      setLanguage: () => {},
      t: (key: string) => key,
      formatCurrency: (amount: number) => `R${amount.toFixed(2)}`,
      languageNames: languageNames,
      languageFlags: languageFlags,
      availableLanguages: ['en', 'zu', 'xh', 'af', 'st', 'tn', 'ts', 've', 'ss', 'nr', 'nso'],
    };
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved && Object.keys(translations).includes(saved) ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    return value || key;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const availableLanguages: Language[] = ['en', 'zu', 'xh', 'af', 'st', 'tn', 'ts', 've', 'ss', 'nr', 'nso'];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, formatCurrency, languageNames, languageFlags, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};
import { create } from 'zustand';
import { Language, translations } from './translations';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
  initializeLanguage: () => void;
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: 'NL',
  setLanguage: (lang: Language) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    set({ language: lang });
  },
  initializeLanguage: () => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('language');
    const lang = (stored === 'EN' || stored === 'NL') ? stored : 'NL';
    set({ language: lang });
  },
  t: (section: string, key: string) => {
    const { language } = get();
    const sectionTranslations = translations[language]?.[section];
    if (typeof sectionTranslations === 'object' && sectionTranslations !== null) {
      return sectionTranslations[key] || key;
    }
    return key;
  },
}));

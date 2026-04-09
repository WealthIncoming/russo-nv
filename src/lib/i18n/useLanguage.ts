import { create } from 'zustand';
import { Language, translations } from './translations';

// Get initial language from localStorage or default to Dutch
const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'NL';
  try {
    const stored = localStorage.getItem('language');
    return (stored === 'EN' || stored === 'NL') ? stored : 'NL';
  } catch {
    return 'NL';
  }
};

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: getInitialLanguage(),
  setLanguage: (lang: Language) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('language', lang);
      } catch {}
    }
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

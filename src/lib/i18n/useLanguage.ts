import { create } from 'zustand';
import { Language, translations } from './translations';
import { detectLocale, DEFAULT_LOCALE } from './routes';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  try {
    return detectLocale(window.location.pathname);
  } catch {
    return DEFAULT_LOCALE;
  }
};

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: getInitialLanguage(),
  setLanguage: (lang: Language) => set({ language: lang }),
  t: (section: string, key: string) => {
    const { language } = get();
    const sectionTranslations = translations[language]?.[section];
    if (typeof sectionTranslations === 'object' && sectionTranslations !== null) {
      return sectionTranslations[key] || key;
    }
    return key;
  },
}));

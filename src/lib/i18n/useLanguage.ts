import { create } from 'zustand';
import { Language, translations } from './translations';
import { DEFAULT_LOCALE } from './routes';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
}

// The store initializes deterministically to DEFAULT_LOCALE on BOTH server and
// client so the first render matches (no hydration mismatch). The real locale is
// seeded from the request path in AppRouter's initializer (server + client first
// paint), and LanguageSync keeps it in sync on subsequent client navigations.
export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: DEFAULT_LOCALE,
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

import type { Language } from './translations';

// NL lives at the root, EN under /en, FR under /fr. Slugs are shared across locales.
export const SUPPORTED_LOCALES: Language[] = ['NL', 'FR', 'EN'];
export const DEFAULT_LOCALE: Language = 'NL';

const PREFIX: Record<Language, string> = { NL: '', EN: '/en', FR: '/fr' };

export function detectLocale(pathname: string): Language {
  if (pathname === '/en' || pathname === '/en/' || pathname.startsWith('/en/')) return 'EN';
  if (pathname === '/fr' || pathname === '/fr/' || pathname.startsWith('/fr/')) return 'FR';
  return 'NL';
}

export function delocalize(pathname: string): string {
  for (const p of ['/en', '/fr']) {
    if (pathname === p || pathname === `${p}/`) return '/';
    if (pathname.startsWith(`${p}/`)) return pathname.slice(p.length);
  }
  return pathname;
}

export function localize(path: string, locale: Language): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const prefix = PREFIX[locale];
  if (!prefix) return clean;
  if (clean === '/') return prefix;
  return `${prefix}${clean}`;
}

export function swapLocale(pathname: string, target: Language): string {
  return localize(delocalize(pathname), target);
}

/** Pick the value for the current locale from a small per-locale map. */
export function pick<T>(locale: Language, values: Record<Language, T>): T {
  return values[locale];
}

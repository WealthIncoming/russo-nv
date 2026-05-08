import type { Language } from './translations';

export const SUPPORTED_LOCALES: Language[] = ['NL', 'EN'];
export const DEFAULT_LOCALE: Language = 'NL';

export function detectLocale(pathname: string): Language {
  if (pathname === '/en' || pathname === '/en/' || pathname.startsWith('/en/')) {
    return 'EN';
  }
  return 'NL';
}

export function delocalize(pathname: string): string {
  if (pathname === '/en' || pathname === '/en/') return '/';
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  return pathname;
}

export function localize(path: string, locale: Language): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'EN') {
    if (clean === '/') return '/en';
    return `/en${clean}`;
  }
  return clean;
}

export function swapLocale(pathname: string, target: Language): string {
  return localize(delocalize(pathname), target);
}

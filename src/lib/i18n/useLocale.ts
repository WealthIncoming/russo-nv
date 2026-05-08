import { useLocation } from 'react-router-dom';
import type { Language } from './translations';
import { detectLocale, delocalize, localize, swapLocale } from './routes';

export function useLocale() {
  const location = useLocation();
  const locale = detectLocale(location.pathname);
  return {
    locale,
    pathname: location.pathname,
    localize: (path: string) => localize(path, locale),
    swap: (target: Language) => swapLocale(location.pathname, target),
    delocalized: delocalize(location.pathname),
  };
}

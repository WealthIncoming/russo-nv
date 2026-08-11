import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { useLocale } from '@/lib/i18n/useLocale';
import { useCopyPhone } from '@/lib/use-copy-phone';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Globe, Menu, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Image } from '@/components/ui/image';

const HEADER_PHONE_DISPLAY = '+32 475 43 48 19';
const HEADER_PHONE_HREF = '+32475434819';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { t } = useLanguageStore();
  const { locale, localize, swap } = useLocale();
  const location = useLocation();
  const navigate = useNavigate();
  const { copied, copy } = useCopyPhone();
  const onCallClick = () => copy(HEADER_PHONE_DISPLAY);

  // Close mobile menu on route change so navigation always exits the overlay.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when the user clicks/taps anywhere outside the header.
  useEffect(() => {
    if (!isMenuOpen) return;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isMenuOpen]);

  const navLinks = [
    { path: '/', labelKey: 'home' },
    { path: '/services', labelKey: 'services' },
    { path: '/industries', labelKey: 'industries' },
    { path: '/projects', labelKey: 'projects' },
    { path: '/safety', labelKey: 'safety' },
    { path: '/about', labelKey: 'about' },
    { path: '/insights', labelKey: 'insights' },
    { path: '/contact', labelKey: 'contact' },
  ];

  const languages = ['NL', 'EN'] as const;

  const isActive = (path: string) => location.pathname === localize(path);

  const onLanguageChange = (lang: 'EN' | 'NL') => {
    if (lang === locale) return;
    navigate(swap(lang));
  };

  return (
    <header ref={headerRef} className="w-full bg-white border-b border-dark-grey/20 sticky top-0 z-50">
      {/* Skip-to-content link: invisible until a keyboard user tabs into it,
          then slides into view. Lets keyboard / screen-reader users bypass
          the header nav on every page. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-primary focus:text-primary-foreground focus:font-paragraph focus:font-bold focus:uppercase focus:px-4 focus:py-2 focus:tracking-wider focus:text-sm"
      >
        {t('header', 'skipToContent')}
      </a>
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 xl:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-20 xl:h-24 gap-4 xl:gap-6">
          {/* Logo */}
          <Link to={localize('/')} className="flex items-center flex-shrink-0 whitespace-nowrap">
            <Image
              src="/images/logo-header.jpg"
              alt="RUSSO N.V. Logo"
              width={459}
              height={320}
              className="h-16 xl:h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-3 xl:gap-5 min-w-0 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={localize(link.path)}
                className={`font-paragraph text-[12px] xl:text-sm uppercase tracking-[0.08em] transition-colors relative whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-primary font-bold'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {t('nav', link.labelKey)}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
            {/* Language Selector */}
            <div className="flex items-center gap-2 border border-dark-grey/20 px-3 py-2 whitespace-nowrap">
              <Globe className="w-4 h-4 text-foreground" />
              <select
                value={locale}
                onChange={(e) => onLanguageChange(e.target.value as 'EN' | 'NL')}
                className="font-paragraph text-sm bg-transparent border-none outline-none cursor-pointer text-foreground"
                aria-label="Language"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone CTA */}
            <a
              href={`tel:${HEADER_PHONE_HREF}`}
              onClick={onCallClick}
              className="flex items-center gap-2 bg-primary text-primary-foreground font-paragraph font-bold uppercase px-4 xl:px-6 py-3 hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              {copied ? <Check className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
              <span>{copied ? t('header', 'numberCopied') : t('header', 'callNow')}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-foreground p-2 justify-self-end"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-dark-grey/20"
          >
            <nav className="px-8 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={localize(link.path)}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block font-paragraph text-sm uppercase tracking-wider py-2 ${
                    isActive(link.path)
                      ? 'text-primary font-bold border-l-4 border-primary pl-4'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {t('nav', link.labelKey)}
                </Link>
              ))}

              <div className="pt-4 space-y-4">
                {/* Language Selector Mobile */}
                <div className="flex items-center gap-2 border border-dark-grey/20 px-4 py-3">
                  <Globe className="w-4 h-4 text-foreground" />
                  <select
                    value={locale}
                    onChange={(e) => onLanguageChange(e.target.value as 'EN' | 'NL')}
                    className="font-paragraph text-sm bg-transparent border-none outline-none cursor-pointer text-foreground flex-1"
                    aria-label="Language"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Phone CTA Mobile */}
                <a
                  href={`tel:${HEADER_PHONE_HREF}`}
                  onClick={onCallClick}
                  className="flex items-center justify-center gap-3 bg-primary text-primary-foreground font-paragraph font-bold uppercase px-6 py-3 hover:bg-primary/90 transition-colors w-full"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                  <span>{copied ? t('header', 'numberCopied') : t('header', 'callNow')}</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { scrollBehavior } from '@/lib/motion';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { useLocale } from '@/lib/i18n/useLocale';
import { ArrowUp, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

const FOOTER_HQ_ADDRESS = 'Taxandriastraat 35, 2170 Antwerp';
const FOOTER_GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(FOOTER_HQ_ADDRESS)}`;

const SERVICES = [
  { labelKey: 'industrialPainting',   anchor: 'industrialCoatingApplication' },
  { labelKey: 'sandblasting',         anchor: 'sandblastingAbrasive' },
  { labelKey: 'fireproofingCoatings', anchor: 'fireproofingThermal' },
  { labelKey: 'protectiveCoatings',   anchor: 'corrosionProtection' },
  { labelKey: 'surfacePreparation',   anchor: 'sandblastingAbrasive' },
  { labelKey: 'coatRemoval',          anchor: 'sandblastingAbrasive' },
];

const QUICK_LINKS = [
  { to: '/',           labelKey: 'home',             namespace: 'nav' },
  { to: '/services',   labelKey: 'services',         namespace: 'nav' },
  { to: '/industries', labelKey: 'industriesServed', namespace: 'footer' },
  { to: '/projects',   labelKey: 'projects',         namespace: 'nav' },
  { to: '/safety',     labelKey: 'safety',           namespace: 'nav' },
  { to: '/about',      labelKey: 'aboutUs',          namespace: 'footer' },
  { to: '/insights',   labelKey: 'insights',         namespace: 'nav' },
] as const;

const CERTIFICATIONS = [
  'vcaCertified',
  'naceCertified',
  'isoCertified',
  'safetyCompliant',
];

export default function Footer() {
  const { t } = useLanguageStore();
  const { localize } = useLocale();

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  };

  return (
    <footer className="w-full bg-foreground text-white">
      <div className="max-w-[100rem] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <Link to={localize('/')} aria-label="Russo NV - Home" className="flex items-center mb-6">
              <Image
                src="/images/logo.png"
                alt="Russo NV Logo"
                width={200}
                height={140}
                className="h-auto"
              />
            </Link>
            <p className="font-paragraph text-sm text-white/80 mb-8 leading-relaxed">
              {t('footer', 'companyDescription')}
            </p>
            <nav aria-label="Social media" className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/russo-nv/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/russo.n.v/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/share/16myRf73Ju/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </nav>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-xl mb-6 text-primary">{t('footer', 'quickLinks')}</h3>
            <nav className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={localize(link.to)}
                  className="block font-paragraph text-sm text-white/80 hover:text-primary transition-colors"
                >
                  {t(link.namespace, link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-xl mb-6 text-primary">{t('footer', 'ourServices')}</h3>
            <nav className="space-y-3">
              {SERVICES.map((item) => (
                <Link
                  key={item.labelKey}
                  to={localize(`/services#${item.anchor}`)}
                  className="block font-paragraph text-sm text-white/80 hover:text-primary transition-colors"
                >
                  {t('footer', item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <address className="lg:col-span-3 not-italic">
            <h3 className="font-heading text-xl mb-6 text-primary">{t('footer', 'contact')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <a
                    href={FOOTER_GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-paragraph text-sm text-white/80 hover:text-primary transition-colors block"
                  >
                    {t('footer', 'location')}
                  </a>
                  <div className="font-paragraph text-sm text-white/60 mt-1">
                    {t('footer', 'servingRegion')}
                  </div>
                  <a
                    href={FOOTER_GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 font-paragraph text-xs text-primary hover:text-primary/80 transition-colors uppercase tracking-wider"
                  >
                    {t('footer', 'locationDirections')} →
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+32475434819"
                  className="font-paragraph text-sm text-white/80 hover:text-primary transition-colors"
                >
                  +32 475 43 48 19
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@russonv.be"
                  className="font-paragraph text-sm text-white/80 hover:text-primary transition-colors"
                >
                  info@russonv.be
                </a>
              </div>
            </div>
          </address>
        </div>

        {/* Certifications */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <h3 className="font-heading text-lg mb-6 text-center">{t('footer', 'certifiedCompliant')}</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {CERTIFICATIONS.map((certKey) => (
              <div
                key={certKey}
                className="font-paragraph text-sm text-white/60 uppercase tracking-wider border border-white/20 px-6 py-3"
              >
                {t('footer', certKey)}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-paragraph text-sm text-white/60 text-center md:text-left">
              <p>© {new Date().getFullYear()} Russo NV. {t('footer', 'allRightsReserved')}</p>
              <p className="text-white/40 mt-1">BTW BE 0453.001.480 · RPR Antwerpen</p>
            </div>
            <div className="flex flex-wrap gap-6 items-center justify-center">
              <Link
                to={localize('/privacy')}
                className="font-paragraph text-sm text-white/60 hover:text-primary transition-colors"
              >
                {t('footer', 'privacyPolicy')}
              </Link>
              <Link
                to={localize('/terms')}
                className="font-paragraph text-sm text-white/60 hover:text-primary transition-colors"
              >
                {t('footer', 'termsOfService')}
              </Link>
              <a
                href="#top"
                onClick={handleBackToTop}
                className="font-paragraph text-sm text-white/60 hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                <ArrowUp className="w-3 h-3" />
                {t('footer', 'backToTop')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

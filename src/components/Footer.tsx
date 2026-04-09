import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

export default function Footer() {
  const { t } = useLanguageStore();

  return (
    <footer className="w-full bg-foreground text-white">
      <div className="max-w-[100rem] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center mb-6">
              <Image
                src="https://static.wixstatic.com/media/3232e5_48e2024c6d3f441e817637ccdd99f28f~mv2.png"
                alt="Russo NV Logo"
                width={200}
                className="h-auto"
              />
            </Link>
            <p className="font-paragraph text-sm text-white/80 mb-8 leading-relaxed">
              {t('footer', 'companyDescription')}
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-xl mb-6 text-primary">{t('footer', 'quickLinks')}</h3>
            <nav className="space-y-3">
              <Link to="/" className="block font-paragraph text-sm text-white/80 hover:text-primary transition-colors">
                {t('nav', 'home')}
              </Link>
              <Link to="/services" className="block font-paragraph text-sm text-white/80 hover:text-primary transition-colors">
                {t('nav', 'services')}
              </Link>
              <Link to="/industries" className="block font-paragraph text-sm text-white/80 hover:text-primary transition-colors">
                {t('footer', 'industrieServed')}
              </Link>
              <Link to="/projects" className="block font-paragraph text-sm text-white/80 hover:text-primary transition-colors">
                {t('nav', 'projects')}
              </Link>
              <Link to="/about" className="block font-paragraph text-sm text-white/80 hover:text-primary transition-colors">
                {t('footer', 'aboutUs')}
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-xl mb-6 text-primary">{t('footer', 'ourServices')}</h3>
            <nav className="space-y-3">
              <div className="font-paragraph text-sm text-white/80">{t('footer', 'industrialPainting')}</div>
              <div className="font-paragraph text-sm text-white/80">{t('footer', 'sandblasting')}</div>
              <div className="font-paragraph text-sm text-white/80">{t('footer', 'fireproofingCoatings')}</div>
              <div className="font-paragraph text-sm text-white/80">{t('footer', 'protectiveCoatings')}</div>
              <div className="font-paragraph text-sm text-white/80">{t('footer', 'surfacePreparation')}</div>
              <div className="font-paragraph text-sm text-white/80">{t('footer', 'coatRemoval')}</div>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-xl mb-6 text-primary">{t('footer', 'contact')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div className="font-paragraph text-sm text-white/80">
                  {t('footer', 'location')}<br />
                  {t('footer', 'servingRegion')}
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
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-white/10 pt-12 mb-12">
          <h4 className="font-heading text-lg mb-6 text-center">{t('footer', 'certifiedCompliant')}</h4>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider border border-white/20 px-6 py-3">
              {t('footer', 'vcaCertified')}
            </div>
            <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider border border-white/20 px-6 py-3">
              {t('footer', 'naceCertified')}
            </div>
            <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider border border-white/20 px-6 py-3">
              {t('footer', 'isoCertified')}
            </div>
            <div className="font-paragraph text-sm text-white/60 uppercase tracking-wider border border-white/20 px-6 py-3">
              {t('footer', 'safetyCompliant')}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-white/60">
              © {new Date().getFullYear()} Russo NV. {t('footer', 'allRightsReserved')}
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="font-paragraph text-sm text-white/60 hover:text-primary transition-colors"
              >
                {t('footer', 'privacyPolicy')}
              </Link>
              <Link
                to="/terms"
                className="font-paragraph text-sm text-white/60 hover:text-primary transition-colors"
              >
                {t('footer', 'termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

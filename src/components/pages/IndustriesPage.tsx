import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { IndustriesServed } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// =============================================================================
// MAPPING — Connect each CMS industry to its translation key prefix.
// The key is a lowercase keyword to match against the industry name from the DB.
// The value is the prefix used in the industriesCms translations.
// =============================================================================
const INDUSTRY_TRANSLATION_MAP: Record<string, string> = {
  'marine': 'marine',
  'food': 'food',
  'power': 'power',
  'manufacturing': 'manufacturing',
  'oil': 'oilgas',
  'chemical': 'chemical',
  'water': 'water',
};

// =============================================================================
// HELPER — Find the translation prefix for a given industry name.
// =============================================================================
function getTranslationPrefix(industryName: string | undefined): string | null {
  if (!industryName) return null;
  const lowerName = industryName.toLowerCase();
  for (const [keyword, prefix] of Object.entries(INDUSTRY_TRANSLATION_MAP)) {
    if (lowerName.includes(keyword)) {
      return prefix;
    }
  }
  return null;
}

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<IndustriesServed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t, language } = useLanguageStore();

  useEffect(() => {
    loadIndustries();
  }, []);

  const loadIndustries = async () => {
    try {
      const result = await BaseCrudService.getAll<IndustriesServed>('industriesserved');
      setIndustries(result.items);
    } catch (error) {
      console.error('Error loading industries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // =============================================================================
  // HELPER — Get translated text for an industry field.
  // Checks if we're in Dutch, finds the translation prefix, and returns
  // the translated text or falls back to the original English CMS content.
  // =============================================================================
  const getIndustryText = (
    industry: IndustriesServed,
    field: string,
    fallback: string | undefined
  ): string => {
    if (language === 'EN') return fallback || '';
    const prefix = getTranslationPrefix(industry.industryName);
    if (!prefix) return fallback || '';
    const translationKey = `${prefix}${field}`;
    const translated = t('industriesCms', translationKey);
    return translated !== translationKey ? translated : (fallback || '');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/3232e5_e2084778206b4542b31b6b4f801078bd~mv2.png?originWidth=1152&originHeight=640"
            alt="Industrial facilities we serve"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/50" />
        </div>

        <div className="relative z-10 w-full max-w-[100rem] mx-auto px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-paragraph text-primary text-sm uppercase tracking-wider">
              {t('industries', 'heroLabel')}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white mt-4 mb-8 leading-tight sm:leading-none uppercase">
              {t('industries', 'heroLine1')}<br />
              <span className="text-primary">{t('industries', 'heroLine2')}</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              {t('industries', 'heroDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-32">
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <LoadingSpinner />
            </div>
          ) : industries.length === 0 ? (
            <div className="text-center py-32">
              <p className="font-paragraph text-lg text-foreground/60">
                {t('industries', 'emptyState')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-[400px] overflow-hidden mb-6">
                    <Image
                      src={industry.industryImage || 'https://static.wixstatic.com/media/3232e5_ee04135720ad4783a7104f3b6a2bfd2e~mv2.png?originWidth=768&originHeight=384'}
                      alt={industry.industryName || 'Industrial sector'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={800}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h2 className="font-heading text-4xl text-white mb-2">
                        {getIndustryText(industry, 'Title', industry.industryName)}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {industry.industryOverview && (
                      <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                        {getIndustryText(industry, 'Overview', industry.industryOverview)}
                      </p>
                    )}

                    {industry.workDescription && (
                      <div className="border-l-4 border-primary pl-6">
                        <h3 className="font-heading text-xl text-foreground mb-3">
                          {t('industries', 'workDescription')}
                        </h3>
                        <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                          {getIndustryText(industry, 'WorkDescription', industry.workDescription)}
                        </p>
                      </div>
                    )}

                    {industry.keyServices && (
                      <div className="bg-dark-grey/5 p-6">
                        <h3 className="font-heading text-xl text-foreground mb-3">
                          {t('industries', 'keyServices')}
                        </h3>
                        <p className="font-paragraph text-sm text-foreground/70 whitespace-pre-line">
                          {getIndustryText(industry, 'KeyServices', industry.keyServices)}
                        </p>
                      </div>
                    )}

                    {industry.typicalClients && (
                      <div>
                        <h3 className="font-heading text-lg text-foreground mb-2">
                          {t('industries', 'typicalClients')}
                        </h3>
                        <p className="font-paragraph text-sm text-foreground/60">
                          {getIndustryText(industry, 'TypicalClients', industry.typicalClients)}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Coverage Map Section */}
      <section className="w-full bg-dark-grey py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight uppercase">
              {t('industries', 'coverageTitleLine1')}{' '}
              <span className="text-primary">{t('industries', 'coverageTitleHighlight')}</span>
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-3xl mx-auto mb-16">
              {t('industries', 'coverageDescription')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {[
                { countryKey: 'countryBelgium', code: 'BE' },
                { countryKey: 'countryNetherlands', code: 'NL' },
                { countryKey: 'countryFrance', code: 'FR' },
                { countryKey: 'countryGermany', code: 'DE' },
                { countryKey: 'countryLuxembourg', code: 'LU' },
              ].map((location, index) => (
                <motion.div
                  key={location.code}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 p-8 hover:border-primary transition-colors"
                >
                  <div className="font-heading text-4xl text-primary mb-3">{location.code}</div>
                  <div className="font-paragraph text-sm text-white/80">
                    {t('industries', location.countryKey)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-foreground py-32">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight uppercase">
              {t('industries', 'ctaTitleLine1')}<br />
              <span className="text-primary">{t('industries', 'ctaTitleHighlight')}</span>
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-12">
              {t('industries', 'ctaDescription')}
            </p>
            <Link to="/contact">
              <button className="bg-primary text-primary-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-primary/90 transition-colors inline-flex items-center gap-3 group">
                {t('industries', 'ctaButton')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

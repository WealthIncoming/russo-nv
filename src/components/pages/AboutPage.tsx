import { Image } from '@/components/ui/image';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { useLocale } from '@/lib/i18n/useLocale';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Target, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const SectionLabel = ({ text, align = 'center' }: { text: string; align?: 'left' | 'center' }) => (
  <div className={`flex items-center gap-3 mb-6 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
    {align === 'center' && <span className="h-[1px] w-12 bg-primary/30" />}
    <span className="font-paragraph text-xs font-bold tracking-[0.2em] text-primary uppercase">{text}</span>
    <span className="h-[1px] w-12 bg-primary/30" />
  </div>
);

export default function AboutPage() {
  const { t } = useLanguageStore();
  // Router-derived locale (deterministic on server + client) — see ProjectsPage.
  const { localize, locale } = useLocale();
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-hero.jpg"
            alt={t('about', 'heroImageAlt')}
            className="w-full h-full object-cover"
            width={1152}
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
              {t('about', 'heroLabel')}
            </span>
            <h1 className={`font-heading text-white mt-4 mb-8 leading-tight sm:leading-none uppercase ${
              locale === 'NL'
                ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
                : 'text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl'
            }`}>
              {t('about', 'heroLine1')}<br />
              <span className="text-primary">{t('about', 'heroLine2')}</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              {t('about', 'heroDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-32 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-16 xl:gap-20 2xl:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0 w-full"
          >
            <div className="relative h-[420px] sm:h-[500px] lg:h-[600px] w-full overflow-hidden">
              <Image
                src="/images/about-story.jpg"
                alt={t('about', 'teamImageAlt')}
                className="absolute inset-0 w-full h-full object-cover"
                width={768}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0 w-full max-w-full space-y-8"
          >
            <div>
              <SectionLabel text={t('about', 'storySectionLabel')} align="left" />
              <div className="border-l-4 border-primary pl-4 sm:pl-8 max-w-full">
                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground leading-[1.1] mb-6 max-w-full uppercase">
                  <span className="block">{t('about', 'storyTitleLine1')}</span>
                  <span className="block text-primary">{t('about', 'storyTitleLine2')}</span>
                </h2>
              </div>
            </div>

            <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed max-w-[65ch]">
              {t('about', 'storyParagraph1')}
            </p>

            <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed max-w-[65ch]">
              {t('about', 'storyParagraph2')}
            </p>

            <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed max-w-[65ch]">
              {t('about', 'storyParagraph3')}
            </p>

            <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed max-w-[65ch]">
              {t('about', 'storyParagraph4')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 mt-4 border-t border-foreground/10 max-w-[32rem]">
              <div className="min-w-0">
                <div className="font-heading text-4xl sm:text-5xl text-primary mb-2">24/7</div>
                <div className="font-paragraph text-sm text-foreground/70 uppercase tracking-wider">
                  {t('about', 'storyResponsiveSupport')}
                </div>
              </div>
              <div className="min-w-0">
                <div className="font-heading text-4xl sm:text-5xl text-primary mb-2">QC</div>
                <div className="font-paragraph text-sm text-foreground/70 uppercase tracking-wider">
                  {t('about', 'storyInspectionQuality')}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="w-full bg-dark-grey py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <SectionLabel text={t('about', 'missionSectionLabel')} />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-6 uppercase leading-tight">
              {t('about', 'missionTitle')} <span className="text-primary">{t('about', 'missionHighlight')}</span>
            </h2>
            <p className="font-paragraph text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
              {t('about', 'missionDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { id: 'expert-team', icon: Users, titleKey: 'valueExpertTeamTitle', descKey: 'valueExpertTeamDesc' },
              { id: 'quality', icon: Target, titleKey: 'valueQualityTitle', descKey: 'valueQualityDesc' },
              { id: 'efficient', icon: Zap, titleKey: 'valueFastTitle', descKey: 'valueFastDesc' },
              { id: 'global', icon: Globe, titleKey: 'valueGlobalTitle', descKey: 'valueGlobalDesc' },
            ].map((value) => (
              <motion.article
                key={value.id}
                id={`value-${value.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 border border-white/10 p-8 hover:border-primary transition-colors scroll-mt-24"
              >
                <value.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="font-heading text-xl sm:text-2xl text-white mb-4">{t('about', value.titleKey)}</h3>
                <p className="font-paragraph text-sm text-white/70 leading-relaxed">{t('about', value.descKey)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <SectionLabel text={t('about', 'expertiseSectionLabel')} />
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-foreground mb-6 uppercase leading-tight">
            {t('about', 'expertiseTitle')} <span className="text-primary">{t('about', 'expertiseHighlight')}</span>
          </h2>
          <p className="font-paragraph text-base sm:text-lg text-foreground/80">
            {t('about', 'expertiseDescription')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 'tank', titleKey: 'expertiseTankTitle', descKey: 'expertiseTankDesc' },
            { id: 'pipeline', titleKey: 'expertisePipelineTitle', descKey: 'expertisePipelineDesc' },
            { id: 'steel', titleKey: 'expertiseSteelTitle', descKey: 'expertiseSteelDesc' },
            { id: 'sandblasting', titleKey: 'expertiseSandblastingTitle', descKey: 'expertiseSandblastingDesc' },
            { id: 'fireproofing', titleKey: 'expertiseFireproofingTitle', descKey: 'expertiseFireproofingDesc' },
            { id: 'protective', titleKey: 'expertiseProtectiveTitle', descKey: 'expertiseProtectiveDesc' },
          ].map((expertise) => (
            <motion.article
              key={expertise.id}
              id={`expertise-${expertise.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-dark-grey/5 border-l-4 border-primary p-8 scroll-mt-24"
            >
              <h3 className="font-heading text-xl sm:text-2xl text-foreground mb-4">{t('about', expertise.titleKey)}</h3>
              <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                {t('about', expertise.descKey)}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Client Types */}
      <section id="clients" className="w-full bg-secondary py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <SectionLabel text={t('about', 'clientsSectionLabel')} />
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-6 uppercase leading-tight">
              {t('about', 'clientsTitle')} <span className="text-primary">{t('about', 'clientsHighlight')}</span>
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-white/80">
              {t('about', 'clientsDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'clientChemicalPlants',
              'clientFoodProduction',
              'clientStorageTerminals',
              'clientTankFarms',
              'clientIndustrialFactories',
              'clientWarehouses',
              'clientPipelineCompanies',
              'clientConstructionFirms',
              'clientManufacturing',
              'clientPetrochemical',
              'clientLogisticsCenters',
              'clientProcessingPlants',
            ].map((clientKey) => (
              <motion.div
                key={clientKey}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 border border-white/10 p-4 text-center hover:border-primary transition-colors"
              >
                <div className="font-paragraph text-xs sm:text-sm text-white/80">{t('about', clientKey)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-background py-32">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight uppercase">
              {t('about', 'ctaTitleLine1')}<br />
              <span className="text-primary">{t('about', 'ctaTitleHighlight')}</span>
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 max-w-2xl mx-auto mb-12">
              {t('about', 'ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to={localize('/contact')}>
                <button className="bg-primary text-primary-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-primary/90 transition-colors inline-flex items-center gap-3 group">
                  {t('about', 'ctaButton')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to={localize('/projects')}>
                <button className="bg-transparent text-foreground border-2 border-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-foreground hover:text-white transition-colors">
                  {t('about', 'ctaSecondaryButton')}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

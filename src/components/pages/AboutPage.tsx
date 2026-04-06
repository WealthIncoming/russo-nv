import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Target, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const { t } = useLanguageStore();
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/3232e5_5b13ff3f27794050a136372ba7d7e289~mv2.png?originWidth=1152&originHeight=640"
            alt="Russo NV industrial coating company"
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
              {t('about', 'heroLabel')}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-white mt-4 mb-8 leading-none uppercase">
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
                src="https://static.wixstatic.com/media/3232e5_023a500fd54f44c4a9f17d757eb2abdb~mv2.png?originWidth=768&originHeight=576"
                alt="Russo NV team at work"
                className="absolute inset-0 w-full h-full object-cover"
                width={800}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0 w-full max-w-full space-y-8"
          >
            <div className="border-l-4 border-primary pl-4 sm:pl-8 max-w-full">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] 2xl:text-[4rem] text-foreground leading-[0.95] tracking-tight mb-6 max-w-full uppercase overflow-hidden">
                <span className="block">{t('about', 'storyTitleLine1')}</span>
                <span className="block text-primary">{t('about', 'storyTitleLine2')}</span>
              </h2>
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

            <div className="grid grid-cols-2 gap-8 pt-8 max-w-[32rem]">
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
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl text-white mb-6 uppercase">
              {t('about', 'missionTitle')} <span className="text-primary">{t('about', 'missionHighlight')}</span>
            </h2>
            <p className="font-paragraph text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              {t('about', 'missionDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
            {[
              { icon: Users, titleKey: 'valueExpertTeamTitle', descKey: 'valueExpertTeamDesc' },
              { icon: Target, titleKey: 'valueQualityTitle', descKey: 'valueQualityDesc' },
              { icon: Zap, titleKey: 'valueFastTitle', descKey: 'valueFastDesc' },
              { icon: Globe, titleKey: 'valueGlobalTitle', descKey: 'valueGlobalDesc' },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 hover:border-primary transition-colors"
              >
                <value.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="font-heading text-2xl text-white mb-4">{t('about', value.titleKey)}</h3>
                <p className="font-paragraph text-sm text-white/70 leading-relaxed">{t('about', value.descKey)}</p>
              </motion.div>
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
          className="text-center mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-foreground mb-6 uppercase">
            {t('about', 'expertiseTitle')} <span className="text-primary">{t('about', 'expertiseHighlight')}</span>
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
            {t('about', 'expertiseDescription')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { titleKey: 'expertiseTankTitle', descKey: 'expertiseTankDesc' },
            { titleKey: 'expertisePipelineTitle', descKey: 'expertisePipelineDesc' },
            { titleKey: 'expertiseSteelTitle', descKey: 'expertiseSteelDesc' },
            { titleKey: 'expertiseSandblastingTitle', descKey: 'expertiseSandblastingDesc' },
            { titleKey: 'expertiseFireproofingTitle', descKey: 'expertiseFireproofingDesc' },
            { titleKey: 'expertiseProtectiveTitle', descKey: 'expertiseProtectiveDesc' },
          ].map((expertise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-grey/5 border-l-4 border-primary p-8"
            >
              <h3 className="font-heading text-2xl text-foreground mb-4">{t('about', expertise.titleKey)}</h3>
              <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                {t('about', expertise.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Client Types */}
      <section className="w-full bg-secondary py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-5xl md:text-6xl text-white mb-6 uppercase">
              {t('about', 'clientsTitle')} <span className="text-primary">{t('about', 'clientsHighlight')}</span>
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-3xl mx-auto">
              {t('about', 'clientsDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
            ].map((clientKey, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 p-6 text-center hover:border-primary transition-colors"
              >
                <div className="font-paragraph text-sm text-white/80">{t('about', clientKey)}</div>
              </motion.div>
            ))}
          </div>
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
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight uppercase">
              {t('about', 'ctaTitleLine1')}<br />
              <span className="text-primary">{t('about', 'ctaTitleHighlight')}</span>
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-12">
              {t('about', 'ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact">
                <button className="bg-primary text-primary-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-primary/90 transition-colors inline-flex items-center gap-3 group">
                  {t('about', 'ctaButton')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/projects">
                <button className="bg-transparent text-white border-2 border-white font-paragraph font-bold uppercase px-8 py-4 hover:bg-white hover:text-secondary transition-colors">
                  {t('about', 'ctaSecondaryButton')}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

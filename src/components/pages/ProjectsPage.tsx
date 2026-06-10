import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ProjectPortfolio } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { useLocale } from '@/lib/i18n/useLocale';
import { serializeJsonLd, toIsoDateOrUndefined } from '@/lib/json-ld';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// =============================================================================
// MAPPING — Connect each CMS project to its translation key prefix.
// =============================================================================
const PROJECT_TRANSLATION_MAP: Record<string, string> = {
  'highway bridge': 'bridge',
  'pipeline': 'pipeline',
  'water treatment': 'water',
  'refinery': 'refinery',
  'storage tank': 'tank',
  'steel structure': 'steel',
  'tank refurbishment': 'seaTank',
  'new build coating': 'gts',
  'crane refurbishment': 'csp',
  'food storage': 'bnfw',
  'anti-slip': 'itcRubis',
};

// =============================================================================
// HELPER — Find the translation prefix for a given project title.
// =============================================================================
function getTranslationPrefix(projectTitle: string | undefined): string | null {
  if (!projectTitle) return null;
  const lowerTitle = projectTitle.toLowerCase();
  for (const [keyword, prefix] of Object.entries(PROJECT_TRANSLATION_MAP)) {
    if (lowerTitle.includes(keyword)) {
      return prefix;
    }
  }
  return null;
}

// Per-project image overrides. The first entry whose `match` substring
// appears in the lowercased CMS project title wins. `secondary` is
// optional — if provided it forces the 2-column layout.
const PROJECT_IMAGE_OVERRIDES: Array<{ match: string; main: string; secondary?: string }> = [
  {
    match: 'new build coating',
    main: '/images/gts1.jpg',
    secondary: '/images/gts3.jpg',
  },
  {
    match: 'tank refurbishment',
    main: '/images/stt3.jpg',
    secondary: '/images/stt2.jpg',
  },
  {
    match: 'crane refurbishment',
    main: '/images/csp1.jpg',
    secondary: '/images/csp2.jpg',
  },
  {
    match: 'food storage',
    main: '/images/kiwi1.jpg',
    secondary: '/images/kiwi2.jpg',
  },
  {
    match: 'anti-slip',
    main: '/images/itc1.jpg',
    secondary: '/images/itc2.jpg',
  },
];

function getProjectImageOverride(projectTitle: string | undefined) {
  if (!projectTitle) return undefined;
  const lower = projectTitle.toLowerCase();
  return PROJECT_IMAGE_OVERRIDES.find(o => lower.includes(o.match));
}

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 mb-6 justify-center">
    <span className="h-[1px] w-12 bg-primary/30" />
    <span className="font-paragraph text-xs font-bold tracking-[0.2em] text-primary uppercase">{text}</span>
    <span className="h-[1px] w-12 bg-primary/30" />
  </div>
);

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectPortfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t, language } = useLanguageStore();
  const { localize } = useLocale();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const result = await BaseCrudService.getAll<ProjectPortfolio>('projectportfolio');
      setProjects(result.items);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // =============================================================================
  // HELPER — Get translated text for a project field. translations.ts is the
  // source of truth for both EN and NL when a prefix mapping exists; the CMS
  // fallback is only used for unmapped projects.
  // =============================================================================
  const getProjectText = (
    project: ProjectPortfolio,
    field: string,
    fallback: string | undefined
  ): string => {
    const prefix = getTranslationPrefix(project.projectTitle);
    if (!prefix) return fallback || '';
    const translationKey = `${prefix}${field}`;
    const translated = t('projectsCms', translationKey);
    return translated !== translationKey ? translated : (fallback || '');
  };

  // Completion uses the translated date string if present, else falls back to
  // formatting the CMS date with the active locale.
  const getProjectCompletion = (project: ProjectPortfolio): string => {
    const prefix = getTranslationPrefix(project.projectTitle);
    if (prefix) {
      const key = `${prefix}Completed`;
      const translated = t('projectsCms', key);
      if (translated !== key) return translated;
    }
    return formatDate(project.completionDate);
  };

  // =============================================================================
  // Format date with language-aware locale
  // =============================================================================
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'MMMM yyyy', {
        locale: language === 'NL' ? nl : undefined,
      });
    } catch {
      return 'N/A';
    }
  };

  const SITE_URL = 'https://www.russonv.com';
  const collectionUrl = `${SITE_URL}${localize('/projects')}`;
  const collectionSchema = projects.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${collectionUrl}#collection`,
    name: t('projects', 'pageTitle'),
    description: t('projects', 'heroDescription'),
    url: collectionUrl,
    inLanguage: language === 'EN' ? 'en' : 'nl-BE',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    hasPart: projects.map((p) => {
      const completionIso = toIsoDateOrUndefined(p.completionDate);
      return {
        '@type': 'CreativeWork',
        name: getProjectText(p, 'Title', p.projectTitle),
        description: getProjectText(p, 'Description', p.projectDescription),
        provider: { '@id': `${SITE_URL}/#organization` },
        ...(completionIso ? { dateCreated: completionIso } : {}),
      };
    }),
  } : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {collectionSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionSchema) }}
        />
      )}

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/projects-hero.jpg"
            alt={t('projects', 'heroImageAlt')}
            className="w-full h-full object-cover"
            width={1672}
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
              {t('projects', 'heroLabel')}
            </span>
            <h1 className={`font-heading text-white mt-4 mb-8 leading-none uppercase ${
              language === 'NL'
                ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
                : 'text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl'
            }`}>
              {t('projects', 'heroLine1')}<br />
              <span className="text-primary">{t('projects', 'heroLine2')}</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              {t('projects', 'heroDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <SectionLabel text={t('projects', 'gridSectionLabel')} />
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight uppercase">
            {t('projects', 'gridTitleLine1')}{' '}
            <span className="text-primary">{t('projects', 'gridTitleHighlight')}</span>
          </h2>
          <p className="font-paragraph text-base sm:text-lg text-foreground/70 mt-6 leading-relaxed">
            {t('projects', 'gridDescription')}
          </p>
        </motion.div>

        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <LoadingSpinner />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-32">
              <p className="font-paragraph text-lg text-foreground/60">
                {t('projects', 'emptyState')}
              </p>
            </div>
          ) : (
            <div className="space-y-24">
              {projects.map((project, index) => {
                const imageOverride = getProjectImageOverride(project.projectTitle);
                const mainSrc = imageOverride?.main || project.mainProjectImage;
                const secondarySrc = imageOverride?.secondary || project.secondaryProjectImage;
                const hasSecondary = Boolean(secondarySrc);
                const slug = getTranslationPrefix(project.projectTitle) || project._id;
                const translatedTitle = getProjectText(project, 'Title', project.projectTitle);
                const scopeText = getProjectText(project, 'Scope', project.scope);

                return (
                <motion.article
                  key={project._id}
                  id={slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group scroll-mt-24"
                >
                  {/* Project Images */}
                  <div className={`grid grid-cols-1 ${hasSecondary ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-6 mb-8`}>
                    <div className={hasSecondary ? 'lg:col-span-2' : ''}>
                      <div className="relative h-[280px] sm:h-[360px] lg:h-[500px] xl:h-[600px] 2xl:h-[680px] overflow-hidden">
                        <Image
                          src={mainSrc || '/images/project-fallback.jpg'}
                          alt={translatedTitle || 'Industrial project'}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          width={1200}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>

                    {hasSecondary && (
                      <div className="relative h-[280px] sm:h-[360px] lg:h-[500px] xl:h-[600px] 2xl:h-[680px] overflow-hidden">
                        <Image
                          src={secondarySrc!}
                          alt={
                            translatedTitle
                              ? `${translatedTitle} — ${t('projects', 'altAdditionalView')}`
                              : 'Industrial project detail'
                          }
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          width={600}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                      <div className="border-l-4 border-primary pl-8 mb-6">
                        {scopeText && (
                          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-paragraph text-xs font-bold uppercase tracking-wider px-3 py-1.5 mb-4">
                            <Wrench className="w-3.5 h-3.5" />
                            {scopeText}
                          </div>
                        )}
                        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">
                          {translatedTitle}
                        </h2>
                      </div>

                      <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-8">
                        {getProjectText(project, 'Description', project.projectDescription)}
                      </p>

                      <Link
                        to={localize('/contact')}
                        className="inline-flex items-center gap-2 font-paragraph text-sm font-bold uppercase tracking-wider text-primary hover:gap-3 transition-all"
                      >
                        {t('projects', 'cardCta')}
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>

                    <div className="lg:col-span-4">
                      <div className="bg-dark-grey/5 border-l-4 border-primary p-8 space-y-6">
                        <div>
                          <h3 className="font-heading text-xl text-foreground mb-4">
                            {t('projects', 'projectDetails')}
                          </h3>
                        </div>

                        {(() => {
                          const clientText = getProjectText(project, 'Client', project.clientName);
                          return clientText ? (
                            <div>
                              <div className="font-paragraph text-sm text-foreground/60 uppercase tracking-wider mb-2">
                                {t('projects', 'clientName')}
                              </div>
                              <div className="font-paragraph text-base text-foreground font-bold">
                                {clientText}
                              </div>
                            </div>
                          ) : null;
                        })()}

                        {(() => {
                          const locationText = getProjectText(project, 'Location', project.projectLocation);
                          return locationText ? (
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                              <div>
                                <div className="font-paragraph text-sm text-foreground/60 uppercase tracking-wider mb-2">
                                  {t('projects', 'location')}
                                </div>
                                <div className="font-paragraph text-base text-foreground">
                                  {locationText}
                                </div>
                              </div>
                            </div>
                          ) : null;
                        })()}

                        {(() => {
                          const completionText = getProjectCompletion(project);
                          const isOngoing = completionText === t('projects', 'ongoing');
                          return completionText && completionText !== 'N/A' ? (
                            <div className="flex items-start gap-3">
                              <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                              <div>
                                <div className="font-paragraph text-sm text-foreground/60 uppercase tracking-wider mb-2">
                                  {isOngoing ? t('projects', 'statusLabel') : t('projects', 'completionDate')}
                                </div>
                                <div className="font-paragraph text-base text-foreground">
                                  {completionText}
                                </div>
                              </div>
                            </div>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  </div>

                  {index < projects.length - 1 && (
                    <div className="mt-24 border-b border-dark-grey/20" />
                  )}
                </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-secondary py-32">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight uppercase">
              {t('projects', 'ctaTitleLine1')}<br />
              <span className="text-primary">{t('projects', 'ctaTitleHighlight')}</span>
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-12">
              {t('projects', 'ctaDescription')}
            </p>
            <Link to={localize('/contact')}>
              <button className="bg-primary text-primary-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-primary/90 transition-colors inline-flex items-center gap-3 group">
                {t('projects', 'ctaButton')}
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

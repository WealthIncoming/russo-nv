import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Certifications, CompanyValues } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { useLocale } from '@/lib/i18n/useLocale';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { ArrowRight, Award, CheckCircle, FileCheck, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// =============================================================================
// MAPPING — Certifications
// =============================================================================
const CERT_TRANSLATION_MAP: Record<string, string> = {
  'nace': 'nace',
  'iso 14001': 'iso14001',
  'vca': 'vca',
  'iso 9001': 'iso9001',
};

// =============================================================================
// MAPPING — Company Values
// =============================================================================
const VALUE_TRANSLATION_MAP: Record<string, string> = {
  'communication': 'communication',
  'quality': 'quality',
  'expertise': 'expertise',
  'safety first': 'safetyFirst',
};

function getCertPrefix(name: string | undefined): string | null {
  if (!name) return null;
  const lower = name.toLowerCase();
  for (const [keyword, prefix] of Object.entries(CERT_TRANSLATION_MAP)) {
    if (lower.includes(keyword)) return prefix;
  }
  return null;
}

function getValuePrefix(title: string | undefined): string | null {
  if (!title) return null;
  const lower = title.toLowerCase();
  for (const [keyword, prefix] of Object.entries(VALUE_TRANSLATION_MAP)) {
    if (lower.includes(keyword)) return prefix;
  }
  return null;
}

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 mb-6 justify-center">
    <span className="h-[1px] w-12 bg-primary/30" />
    <span className="font-paragraph text-xs font-bold tracking-[0.2em] text-primary uppercase">{text}</span>
    <span className="h-[1px] w-12 bg-primary/30" />
  </div>
);

function isCertExpired(date: Date | string | undefined): boolean {
  if (!date) return false;
  const d = new Date(date);
  return !Number.isNaN(d.getTime()) && d < new Date();
}

export default function SafetyPage() {
  // Seed synchronously from the frozen snapshot so certs + values render into the
  // server HTML (real SSR content) and match on hydration — no loading shell.
  const [certifications] = useState<Certifications[]>(
    () => BaseCrudService.getAllItems<Certifications>('certifications')
  );
  const [companyValues] = useState<CompanyValues[]>(
    () => BaseCrudService.getAllItems<CompanyValues>('companyvalues')
  );
  const isLoading = false;
  const { t } = useLanguageStore();
  // Router-derived locale (deterministic on server + client) — see ProjectsPage.
  const { localize, locale } = useLocale();

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'N/A';
    try {
      return format(new Date(date), 'MMMM yyyy', {
        locale: locale === 'NL' ? nl : undefined,
      });
    } catch {
      return 'N/A';
    }
  };

  const getCertText = (
    cert: Certifications,
    field: string,
    fallback: string | undefined
  ): string => {
    if (locale === 'EN') return fallback || '';
    const prefix = getCertPrefix(cert.certificationName);
    if (!prefix) return fallback || '';
    const key = `${prefix}${field}`;
    const translated = t('safetyCertsCms', key);
    return translated !== key ? translated : (fallback || '');
  };

  const getValueText = (
    value: CompanyValues,
    field: string,
    fallback: string | undefined
  ): string => {
    if (locale === 'EN') return fallback || '';
    const prefix = getValuePrefix(value.valueTitle);
    if (!prefix) return fallback || '';
    const key = `${prefix}${field}`;
    const translated = t('safetyValuesCms', key);
    return translated !== key ? translated : (fallback || '');
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/safety-hero.jpg"
            alt={t('safety', 'heroImageAlt')}
            className="w-full h-full object-cover"
            width={1152}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/50" />
        </div>

        <div className="relative z-10 w-full max-w-[100rem] mx-auto px-8 py-24 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-paragraph text-primary text-sm uppercase tracking-wider">
              {t('safety', 'heroLabel')}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[5.5rem] text-white mt-4 mb-8 leading-tight sm:leading-none uppercase">
              {t('safety', 'heroLine1')}<br />
              <span className="text-primary">{t('safety', 'heroLine2')}</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed">
              {t('safety', 'heroDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <SectionLabel text={t('safety', 'valuesSectionLabel')} />
          <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-foreground mb-6 uppercase leading-tight">
            {t('safety', 'valuesTitle')} <span className="text-primary">{t('safety', 'valuesHighlight')}</span>
          </h2>
          <p className="font-paragraph text-base sm:text-lg text-foreground/80">
            {t('safety', 'valuesDescription')}
          </p>
        </motion.div>

        <div className="min-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <LoadingSpinner />
            </div>
          ) : companyValues.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-foreground/60">
                {t('safety', 'valuesEmptyState')}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {companyValues.map((value) => {
                  const slug = getValuePrefix(value.valueTitle) || value._id;
                  return (
                    <motion.article
                      key={value._id}
                      id={slug}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-dark-grey/5 border-l-4 border-primary p-8 scroll-mt-24"
                    >
                      {value.valueTitle && (
                        <h3 className="font-heading text-2xl sm:text-3xl text-foreground mb-4">
                          {getValueText(value, 'Title', value.valueTitle)}
                        </h3>
                      )}

                      {value.valueDescription && (
                        <p className="font-paragraph text-base text-foreground/80 mb-6 leading-relaxed">
                          {getValueText(value, 'Description', value.valueDescription)}
                        </p>
                      )}

                      <div className="space-y-4">
                        {value.safetyComplianceDetails && (
                          <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <div className="font-paragraph text-sm font-bold text-foreground mb-1">
                                {t('safety', 'safetyCompliance')}
                              </div>
                              <div className="font-paragraph text-sm text-foreground/70">
                                {getValueText(value, 'Safety', value.safetyComplianceDetails)}
                              </div>
                            </div>
                          </div>
                        )}

                        {value.qualityWorkmanship && (
                          <div className="flex items-start gap-3">
                            <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <div className="font-paragraph text-sm font-bold text-foreground mb-1">
                                {t('safety', 'qualityWorkmanship')}
                              </div>
                              <div className="font-paragraph text-sm text-foreground/70">
                                {getValueText(value, 'Quality', value.qualityWorkmanship)}
                              </div>
                            </div>
                          </div>
                        )}

                        {value.clientCommunication && (
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <div className="font-paragraph text-sm font-bold text-foreground mb-1">
                                {t('safety', 'clientCommunication')}
                              </div>
                              <div className="font-paragraph text-sm text-foreground/70">
                                {getValueText(value, 'Client', value.clientCommunication)}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.article>
                  );
                })}
              </div>

              {/* 24/7 callout — single instance, hoisted out of the per-value cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mt-12 max-w-2xl mx-auto text-center bg-primary/10 border-l-4 border-primary p-8"
              >
                <div className="font-heading text-5xl text-primary mb-2">24/7</div>
                <div className="font-paragraph text-sm text-foreground/70 uppercase tracking-wider">
                  {t('safety', 'responsiveSupport')}
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Certifications */}
      <section className="w-full bg-secondary py-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <SectionLabel text={t('safety', 'certsSectionLabel')} />
            <h2 className="font-heading text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white mb-6 uppercase leading-tight">
              {t('safety', 'certsTitle')} <span className="text-primary">{t('safety', 'certsHighlight')}</span>
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-white/80">
              {t('safety', 'certsDescription')}
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <LoadingSpinner />
            </div>
          ) : certifications.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-paragraph text-lg text-white/60">
                {t('safety', 'certsEmptyState')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert) => {
                const slug = getCertPrefix(cert.certificationName) || cert._id;
                const translatedName = getCertText(cert, 'Title', cert.certificationName);
                const expired = isCertExpired(cert.expirationDate);
                return (
                  <motion.article
                    key={cert._id}
                    id={slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/5 border border-white/10 p-8 hover:border-primary transition-colors overflow-hidden flex flex-col scroll-mt-24"
                    style={{ containerType: 'inline-size' }}
                  >
                    {cert.logo && (
                      <div className="mb-6 h-24 flex items-center justify-center">
                        <Image
                          src={cert.logo}
                          alt={translatedName || 'Certification logo'}
                          className="max-h-full w-auto object-contain"
                          width={200}
                        />
                      </div>
                    )}

                    {cert.certificationName && (
                      <h3 className="font-heading text-white mb-3" style={{ fontSize: 'clamp(0.75rem, 5cqi, 1.125rem)' }}>
                        {translatedName}
                      </h3>
                    )}

                    {cert.issuingBody && (
                      <div className="font-paragraph text-sm text-white/60 mb-4">
                        {t('safety', 'issuedBy')}: {getCertText(cert, 'Issuer', cert.issuingBody)}
                      </div>
                    )}

                    {cert.description && (
                      <p className="font-paragraph text-sm text-white/70 mb-6 leading-relaxed line-clamp-4">
                        {getCertText(cert, 'Description', cert.description)}
                      </p>
                    )}

                    <div className="space-y-2 pt-4 border-t border-white/10 mt-auto">
                      {cert.dateIssued && (
                        <div className="flex items-center gap-2">
                          <FileCheck className="w-4 h-4 text-primary" />
                          <span className="font-paragraph text-xs text-white/60">
                            {t('safety', 'dateIssued')}: {formatDate(cert.dateIssued)}
                          </span>
                        </div>
                      )}

                      {cert.expirationDate && (
                        <div className="flex items-center gap-2">
                          <FileCheck className={`w-4 h-4 ${expired ? 'text-destructive' : 'text-primary'}`} />
                          <span className={`font-paragraph text-xs ${expired ? 'text-destructive' : 'text-white/60'}`}>
                            {t('safety', 'expirationDate')}: {formatDate(cert.expirationDate)}
                          </span>
                          {expired && (
                            <span className="font-paragraph text-[0.65rem] font-bold uppercase tracking-wider bg-destructive/20 text-destructive px-2 py-0.5">
                              {t('safety', 'expiredBadge')}
                            </span>
                          )}
                        </div>
                      )}

                      {!cert.dateIssued && !cert.expirationDate && (
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-primary" />
                          <span className="font-paragraph text-xs text-white/60 italic">
                            {t('safety', 'certPendingIssuance')}
                          </span>
                        </div>
                      )}

                      {cert.certificationUrl && (
                        <a
                          href={cert.certificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-paragraph text-xs text-primary hover:text-primary/80 transition-colors mt-2"
                        >
                          {t('safety', 'viewCertificate')}
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Safety Commitment */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel text={t('safety', 'commitmentSectionLabel')} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-8 leading-tight uppercase">
              {t('safety', 'safetyFirstTitle')}<br />
              <span className="text-primary">{t('safety', 'safetyFirstHighlight')}</span> {t('safety', 'safetyFirstSuffix')}
            </h2>
            <div className="space-y-6">
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                {t('safety', 'safetyFirstDesc1')}
              </p>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                {t('safety', 'safetyFirstDesc2')}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                id: 'vca',
                icon: Shield,
                titleKey: 'safetyItemVcaTitle',
                descKey: 'safetyItemVcaDesc',
              },
              {
                id: 'nace',
                icon: Award,
                titleKey: 'safetyItemNaceTitle',
                descKey: 'safetyItemNaceDesc',
              },
              {
                id: 'iso',
                icon: FileCheck,
                titleKey: 'safetyItemIsoTitle',
                descKey: 'safetyItemIsoDesc',
              },
              {
                id: 'reporting',
                icon: CheckCircle,
                titleKey: 'safetyItemReportingTitle',
                descKey: 'safetyItemReportingDesc',
              },
            ].map((item) => (
              <motion.div
                key={item.id}
                id={`safety-${item.id}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-4 bg-dark-grey/5 p-6 border-l-4 border-primary scroll-mt-24"
              >
                <item.icon className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-xl text-foreground mb-2">
                    {t('safety', item.titleKey)}
                  </h3>
                  <p className="font-paragraph text-sm text-foreground/70">
                    {t('safety', item.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
              {t('safety', 'ctaTitleLine1')}<br />
              <span className="text-primary">{t('safety', 'ctaTitleHighlight')}</span> {t('safety', 'ctaTitleSuffix')}
            </h2>
            <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-12">
              {t('safety', 'ctaDescription')}
            </p>
            <Link to={localize('/contact')}>
              <button className="bg-primary text-primary-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-primary/90 transition-colors inline-flex items-center gap-3 group">
                {t('safety', 'ctaButton')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

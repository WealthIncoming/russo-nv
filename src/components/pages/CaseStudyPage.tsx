// Generic case-study renderer: one template for every entry in
// src/data/case-studies.ts. Reached via /projects/<slug>; the route passes the
// study in as a prop (registered from the CASE_STUDIES array in routes.tsx).
// Meta/title live in PAGE_META (generated from the same data); the 3-level
// breadcrumb schema is built in [...slug].astro.
import { Image } from '@/components/ui/image';
import type { CaseStudy } from '@/data/case-studies';
import { useLocale } from '@/lib/i18n/useLocale';
import { serializeJsonLd } from '@/lib/json-ld';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SITE_URL = 'https://www.russonv.com';

export default function CaseStudyPage({ study }: { study: CaseStudy }) {
  const { locale, localize } = useLocale();
  const c = study[locale];
  const pageUrl = `${SITE_URL}${localize(`/projects/${study.slug}`)}`;

  // Matches the CreativeWork items the /projects collection schema exposes.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${pageUrl}#casestudy`,
    name: c.h1,
    headline: c.h1,
    description: c.heroSub,
    url: pageUrl,
    image: `${SITE_URL}${study.heroImage}`,
    dateCreated: study.completion,
    inLanguage: locale === 'EN' ? 'en' : 'nl-BE',
    provider: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />

      {/* Hero */}
      <header className="relative w-full min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={study.heroImage} alt={c.heroAlt} className="w-full h-full object-cover" width={1920} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40" />
        </div>
        <div className="relative z-10 w-full max-w-[100rem] mx-auto px-8 py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-paragraph text-xs sm:text-sm text-white/70">
              <li><Link to={localize('/')} className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-white/40">/</li>
              <li><Link to={localize('/projects')} className="hover:text-primary transition-colors">{c.backToProjects}</Link></li>
              <li className="text-white/40">/</li>
              <li className="text-white/90">{study.breadcrumb[locale]}</li>
            </ol>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="font-paragraph text-xs font-bold tracking-[0.2em] text-primary uppercase">{c.kicker}</span>
            <h1 className="font-heading text-white text-2xl sm:text-3xl md:text-4xl uppercase leading-tight mt-4 max-w-3xl">{c.h1}</h1>
            <p className="font-paragraph text-base sm:text-lg text-white/85 mt-6 max-w-2xl leading-relaxed">{c.heroSub}</p>
          </motion.div>
        </div>
      </header>

      {/* Facts strip */}
      <section className="w-full bg-dark-grey/[0.04] border-b border-dark-grey/10">
        <div className="max-w-[100rem] mx-auto px-8 py-10">
          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
            {c.facts.map((f) => (
              <div key={f.label}>
                <dt className="font-paragraph text-xs text-foreground/60 uppercase tracking-wider mb-1">{f.label}</dt>
                <dd className="font-paragraph text-sm sm:text-base text-foreground font-bold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Story sections */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-16 lg:py-24">
        <div className="max-w-3xl space-y-14">
          {c.sections.map((s, i) => (
            <div key={s.title}>
              <h2 className="font-heading text-2xl sm:text-3xl text-foreground uppercase leading-tight mb-5">{s.title}</h2>
              <div className="space-y-5">
                {s.paragraphs.map((p, j) => (
                  <p key={j} className="font-paragraph text-lg text-foreground/80 leading-relaxed">{p}</p>
                ))}
              </div>
              {i === 0 && study.secondaryImage && (
                <div className="mt-10">
                  <Image
                    src={study.secondaryImage}
                    alt={c.secondaryAlt ?? c.heroAlt}
                    className="w-full h-auto object-cover"
                    width={1200}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Related services */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pb-16 lg:pb-20">
        <h2 className="font-heading text-xl sm:text-2xl text-foreground uppercase mb-8">{c.relatedTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
          {c.related.map((r) => (
            <Link key={r.to} to={localize(r.to)} className="group flex items-center justify-between border border-dark-grey/15 bg-white p-5 hover:border-primary transition-colors">
              <span className="font-paragraph text-sm font-bold text-foreground group-hover:text-primary transition-colors">{r.label}</span>
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </Link>
          ))}
        </div>
        <Link to={localize('/projects')} className="inline-flex items-center gap-2 mt-10 font-paragraph text-sm font-bold uppercase tracking-wider text-primary hover:gap-3 transition-all">
          <ArrowLeft className="w-4 h-4" />
          {c.backToProjects}
        </Link>
      </section>

      {/* CTA */}
      <section className="w-full bg-primary py-24">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white uppercase leading-tight mb-6">{c.ctaTitle}</h2>
          <p className="font-paragraph text-lg text-white/90 max-w-2xl mx-auto mb-10">{c.ctaText}</p>
          <Link to={localize('/contact')} className="inline-flex items-center gap-3 bg-black text-white font-paragraph font-bold uppercase px-10 py-5 hover:bg-white hover:text-black transition-colors group">
            {c.ctaButton}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}

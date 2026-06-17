import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { useLocale } from '@/lib/i18n/useLocale';
import {
  articleUrl,
  findArticle,
  readingMinutes,
  relatedArticles,
  type ArticleBlock,
  type Segment,
} from '@/data/articles';

function formatDate(iso: string, locale: 'NL' | 'EN') {
  return new Date(iso).toLocaleDateString(locale === 'NL' ? 'nl-BE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function ArticlePage() {
  const { slug } = useParams();
  const { t } = useLanguageStore();
  const { locale, localize } = useLocale();
  const article = slug ? findArticle(slug) : undefined;

  // Keep the document title correct on client-side (SPA) navigation. The static
  // HTML already ships the right <title> (built in [...slug].astro), but a SPA
  // hop never reloads the document, so set it here too.
  useEffect(() => {
    if (article) document.title = article[locale].metaTitle;
  }, [article, locale]);

  if (!article) {
    return <Navigate to={localize('/insights')} replace />;
  }

  const c = article[locale];
  const related = relatedArticles(article.slug);

  const renderSegments = (segments: Segment[]) =>
    segments.map((s, i) =>
      typeof s === 'string' ? (
        <span key={i}>{s}</span>
      ) : (
        <Link
          key={i}
          to={localize(s.to)}
          className="text-primary font-medium underline underline-offset-2 hover:text-primary/80"
        >
          {s.text}
        </Link>
      ),
    );

  const renderBlock = (block: ArticleBlock, i: number) => {
    switch (block.type) {
      case 'h2':
        return (
          <h2 key={i} className="font-heading text-2xl sm:text-3xl text-foreground leading-snug mt-12 mb-4">
            {block.text}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={i} className="font-heading text-xl sm:text-2xl text-foreground leading-snug mt-8 mb-3">
            {block.text}
          </h3>
        );
      case 'p':
        return (
          <p key={i} className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed my-5">
            {block.segments ? renderSegments(block.segments) : block.text}
          </p>
        );
      case 'ul':
        return (
          <ul key={i} className="list-disc marker:text-primary pl-6 my-5 space-y-2 font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed">
            {block.items.map((it, j) => (
              <li key={j}>{it}</li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={i} className="list-decimal marker:text-primary marker:font-bold pl-6 my-5 space-y-2 font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed">
            {block.items.map((it, j) => (
              <li key={j}>{it}</li>
            ))}
          </ol>
        );
      case 'quote':
        return (
          <blockquote key={i} className="border-l-4 border-primary pl-6 my-8 font-heading text-xl sm:text-2xl text-foreground leading-snug">
            {block.text}
            {block.cite && <cite className="block mt-3 font-paragraph text-sm not-italic text-foreground/50">{block.cite}</cite>}
          </blockquote>
        );
      case 'image':
        return (
          <figure key={i} className="my-8">
            <Image src={block.src} alt={block.alt} className="w-full h-auto" width={768} />
            {block.caption && (
              <figcaption className="font-paragraph text-sm text-foreground/50 mt-2 text-center">{block.caption}</figcaption>
            )}
          </figure>
        );
      case 'table':
        return (
          <div key={i} className="my-8 overflow-x-auto">
            <table className="w-full border-collapse text-left font-paragraph text-sm sm:text-base">
              <thead>
                <tr className="bg-foreground text-white">
                  {block.headers.map((h, j) => (
                    <th key={j} className="px-4 py-3 font-bold uppercase tracking-wider text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r} className="border-b border-dark-grey/15 even:bg-dark-grey/[0.03]">
                    {row.map((cell, c2) => (
                      <td key={c2} className={`px-4 py-3 text-foreground/80 align-top ${c2 === 0 ? 'font-bold text-foreground whitespace-nowrap' : ''}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {block.caption && (
              <p className="font-paragraph text-xs text-foreground/50 mt-2">{block.caption}</p>
            )}
          </div>
        );
      case 'callout':
        return (
          <aside key={i} className="my-10 bg-dark-grey/[0.04] border-l-4 border-primary p-6 sm:p-8">
            <h3 className="font-heading text-lg sm:text-xl text-foreground mb-4 uppercase tracking-wide">{block.title}</h3>
            <ul className="space-y-3">
              {block.items.map((it, j) => (
                <li key={j} className="flex items-start gap-3 font-paragraph text-base text-foreground/80 leading-relaxed">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </aside>
        );
      case 'faq':
        return (
          <div key={i} className="my-8 border-t border-dark-grey/15">
            {block.items.map((it, j) => (
              <div key={j} className="border-b border-dark-grey/15 py-5">
                <h3 className="font-heading text-lg sm:text-xl text-foreground leading-snug mb-2">{it.q}</h3>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">{it.a}</p>
              </div>
            ))}
          </div>
        );
      case 'cta':
        return (
          <div key={i} className="my-12 bg-foreground text-white p-8 sm:p-10">
            <h3 className="font-heading text-2xl sm:text-3xl uppercase leading-tight mb-4">{block.title}</h3>
            <p className="font-paragraph text-base sm:text-lg text-white/80 leading-relaxed mb-8 max-w-2xl">{block.text}</p>
            <Link
              to={localize(block.to)}
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-primary/90 transition-colors group"
            >
              {block.buttonLabel}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative w-full min-h-[52vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={article.heroImage} alt={article.heroAlt[locale]} className="w-full h-full object-cover" width={1600} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40" />
        </div>
        <div className="relative z-10 w-full max-w-[80rem] mx-auto px-8 py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-paragraph text-xs sm:text-sm text-white/70">
              <li><Link to={localize('/')} className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-white/40">/</li>
              <li><Link to={localize('/insights')} className="hover:text-primary transition-colors">{t('insights', 'kicker')}</Link></li>
            </ol>
          </nav>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-paragraph text-xs font-bold tracking-[0.2em] text-primary uppercase">{c.category}</span>
            <h1 className="font-heading text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase leading-tight mt-4 max-w-3xl">
              {c.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 font-paragraph text-sm text-white/70">
              <span>
                {t('insights', 'by')} {article.author}
                {article.authorRole && <span className="text-white/50">, {article.authorRole[locale]}</span>}
              </span>
              <span className="text-white/30">•</span>
              <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
              <span className="text-white/30">•</span>
              <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4" />{readingMinutes(c)} {t('insights', 'minRead')}</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Body */}
      <article className="w-full">
        <div className="max-w-[44rem] mx-auto px-6 sm:px-8 py-14 lg:py-20">
          <p className="font-paragraph text-lg sm:text-xl text-foreground leading-relaxed border-l-4 border-primary pl-5 mb-10">
            {c.excerpt}
          </p>
          {c.body.map(renderBlock)}

          {/* Author / E-E-A-T */}
          {article.authorBio && (
            <aside className="mt-14 pt-8 border-t border-dark-grey/15">
              <p className="font-paragraph text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                {locale === 'NL' ? 'Over de auteur' : 'About the author'}
              </p>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-foreground text-white font-heading text-lg flex items-center justify-center">
                  {article.author.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <p className="font-heading text-lg text-foreground leading-tight">{article.author}</p>
                  {article.authorRole && (
                    <p className="font-paragraph text-xs font-bold uppercase tracking-wider text-primary mt-0.5">
                      {article.authorRole[locale]}
                    </p>
                  )}
                  <p className="font-paragraph text-sm text-foreground/70 leading-relaxed mt-2 max-w-2xl">
                    {article.authorBio[locale]}
                  </p>
                  {article.authorUrl && (
                    <a
                      href={article.authorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-paragraph text-sm font-bold text-primary hover:text-primary/80 mt-3"
                    >
                      LinkedIn
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </aside>
          )}

          {/* Back link */}
          <div className="mt-14 pt-8 border-t border-dark-grey/15">
            <Link
              to={localize('/insights')}
              className="inline-flex items-center gap-2 font-paragraph text-sm font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('insights', 'backToOverview')}
            </Link>
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="w-full bg-dark-grey/[0.04] border-t border-dark-grey/10">
          <div className="max-w-[100rem] mx-auto px-8 py-16 lg:py-20">
            <h2 className="font-heading text-2xl sm:text-3xl text-foreground uppercase mb-10">{t('insights', 'relatedTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((r) => {
                const rc = r[locale];
                return (
                  <Link
                    key={r.slug}
                    to={localize(articleUrl(r.slug))}
                    className="group flex flex-col border border-dark-grey/15 bg-white hover:border-primary transition-colors"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={r.heroImage} alt={r.heroAlt[locale]} className="w-full h-full object-cover" width={500} />
                    </div>
                    <div className="p-6">
                      <span className="font-paragraph text-xs font-bold text-primary uppercase tracking-wider">{rc.category}</span>
                      <h3 className="font-heading text-lg text-foreground leading-snug mt-2 group-hover:text-primary transition-colors">{rc.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

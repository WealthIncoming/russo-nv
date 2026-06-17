import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { useLocale } from '@/lib/i18n/useLocale';
import { sortedArticles, articleUrl, readingMinutes } from '@/data/articles';

function formatDate(iso: string, locale: 'NL' | 'EN') {
  return new Date(iso).toLocaleDateString(locale === 'NL' ? 'nl-BE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function ArticlesIndexPage() {
  const { t } = useLanguageStore();
  const { locale, localize } = useLocale();
  const articles = sortedArticles();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="w-full bg-foreground text-white">
        <div className="max-w-[100rem] mx-auto px-8 py-24 lg:py-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-12 bg-primary/40" />
            <span className="font-paragraph text-xs font-bold tracking-[0.2em] text-primary uppercase">
              {t('insights', 'kicker')}
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight max-w-4xl">
            {t('insights', 'heroTitle')}
          </h1>
          <p className="font-paragraph text-base sm:text-lg text-white/80 mt-6 max-w-2xl leading-relaxed">
            {t('insights', 'heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-20 lg:py-28">
        {articles.length === 0 ? (
          <p className="font-paragraph text-foreground/60">{t('insights', 'empty')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {articles.map((article, i) => {
              const c = article[locale];
              return (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
                  className="group flex flex-col border border-dark-grey/15 bg-white hover:border-primary transition-colors"
                >
                  <Link to={localize(articleUrl(article.slug))} className="flex flex-col h-full">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.heroImage}
                        alt={article.heroAlt[locale]}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        width={768}
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-6 lg:p-8">
                      <div className="flex items-center gap-3 mb-4 text-xs uppercase tracking-wider">
                        <span className="font-paragraph font-bold text-primary">{c.category}</span>
                        <span className="text-foreground/30">•</span>
                        <time dateTime={article.date} className="font-paragraph text-foreground/50">
                          {formatDate(article.date, locale)}
                        </time>
                      </div>
                      <h2 className="font-heading text-xl lg:text-2xl text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                        {c.title}
                      </h2>
                      <p className="font-paragraph text-sm text-foreground/70 leading-relaxed mb-6 flex-1">
                        {c.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <span className="inline-flex items-center gap-2 font-paragraph text-xs text-foreground/50">
                          <Clock className="w-4 h-4" />
                          {readingMinutes(c)} {t('insights', 'minRead')}
                        </span>
                        <span className="inline-flex items-center gap-2 font-paragraph text-sm font-bold uppercase tracking-wider text-primary">
                          {t('insights', 'readArticle')}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

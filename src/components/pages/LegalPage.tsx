import { scrollBehavior } from '@/lib/motion';
import { useLanguageStore } from '@/lib/i18n/useLanguage';
import { ArrowUp } from 'lucide-react';

interface LegalSection {
  titleKey: string;
  bodyKey: string;
}

interface LegalPageProps {
  /** Translation key (in the `legal` namespace) for the first line of the hero heading. */
  titleKey: string;
  /** Translation key for the highlighted second line of the hero heading. */
  titleHighlightKey: string;
  /** Translation key for the short intro paragraph rendered above the section list. */
  introKey: string;
  /** Section list — each entry maps to a {n}Title / {n}Body translation pair. */
  sections: LegalSection[];
}

/**
 * Shared layout for plain-prose legal pages (Privacy Policy, Terms of Service).
 * Body strings are looked up from the `legal` namespace so EN/NL work without
 * any per-page wiring.
 */
export default function LegalPage({
  titleKey,
  titleHighlightKey,
  introKey,
  sections,
}: LegalPageProps) {
  const { t } = useLanguageStore();

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative w-full max-w-[120rem] mx-auto bg-foreground py-24 md:py-32">
        <div className="max-w-[80rem] mx-auto px-6 sm:px-8">
          <span className="font-paragraph text-primary text-sm uppercase tracking-wider">
            {t('legal', 'heroLabel')}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mt-4 mb-6 leading-tight uppercase">
            {t('legal', titleKey)}{' '}
            <span className="text-primary">{t('legal', titleHighlightKey)}</span>
          </h1>
          <p className="font-paragraph text-sm text-white/60 uppercase tracking-wider">
            {t('legal', 'lastUpdated')}: {t('legal', 'lastUpdatedDate')}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="w-full max-w-[80rem] mx-auto px-6 sm:px-8 py-20 md:py-24">
        <p className="font-paragraph text-base sm:text-lg text-foreground/80 leading-relaxed mb-16 max-w-[70ch]">
          {t('legal', introKey)}
        </p>

        <div className="space-y-12">
          {sections.map((section, index) => {
            const sectionId = section.titleKey.replace(/Title$/, '').toLowerCase();
            return (
              <article
                key={section.titleKey}
                id={sectionId}
                className="scroll-mt-24"
              >
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl text-foreground mb-4 uppercase border-l-4 border-primary pl-4">
                  <span className="text-primary/60 mr-3 font-normal">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  {t('legal', section.titleKey)}
                </h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed max-w-[70ch] pl-5">
                  {t('legal', section.bodyKey)}
                </p>
              </article>
            );
          })}
        </div>

        {/* Back-to-top */}
        <div className="mt-20 pt-12 border-t border-dark-grey/10 flex justify-center">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: scrollBehavior() });
            }}
            className="inline-flex items-center gap-2 font-paragraph text-sm font-bold uppercase tracking-wider text-primary hover:gap-3 transition-all"
          >
            <ArrowUp className="w-4 h-4" />
            {t('legal', 'backToTop')}
          </a>
        </div>
      </section>

    </div>
  );
}

const PRIVACY_SECTIONS: LegalSection[] = Array.from({ length: 12 }, (_, i) => ({
  titleKey: `privacy${i + 1}Title`,
  bodyKey: `privacy${i + 1}Body`,
}));

const TERMS_SECTIONS: LegalSection[] = Array.from({ length: 12 }, (_, i) => ({
  titleKey: `terms${i + 1}Title`,
  bodyKey: `terms${i + 1}Body`,
}));

export function PrivacyPage() {
  return (
    <LegalPage
      titleKey="privacyTitle"
      titleHighlightKey="privacyTitleHighlight"
      introKey="privacyIntro"
      sections={PRIVACY_SECTIONS}
    />
  );
}

export function TermsPage() {
  return (
    <LegalPage
      titleKey="termsTitle"
      titleHighlightKey="termsTitleHighlight"
      introKey="termsIntro"
      sections={TERMS_SECTIONS}
    />
  );
}

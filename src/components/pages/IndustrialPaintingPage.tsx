// Dedicated service "spoke" page targeting the head keyword
// "industriële schilderwerken" (high volume, low difficulty). This is the
// template for future service spokes: bespoke, keyword-optimized content with
// in-body Service + FAQPage JSON-LD. Meta/title live in PAGE_META; the 3-level
// breadcrumb is built in [...slug].astro. Reached via the Services read-more,
// the footer, the homepage card and the Kenniscentrum article.
import { Image } from '@/components/ui/image';
import { useLocale } from '@/lib/i18n/useLocale';
import { serializeJsonLd } from '@/lib/json-ld';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BadgeCheck, ClipboardCheck, MapPin, Phone, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';

const SITE_URL = 'https://www.russonv.com';
const HERO_IMAGE = '/images/services5.jpg';
const PHONE_HREF = '+32475434819';
const ARTICLE_TO = '/insights/steel-surface-preparation';

const RELATED = [
  { to: '/services#sandblastingAbrasive', NL: 'Stralen & oppervlaktevoorbereiding', EN: 'Blasting & surface preparation' },
  { to: '/services#corrosionProtection', NL: 'Corrosiebescherming', EN: 'Corrosion protection' },
  { to: '/services#fireproofingThermal', NL: 'Brandwerende coatings', EN: 'Fireproofing coatings' },
  { to: '/services#coatingInspection', NL: 'Coating-inspectie', EN: 'Coating inspection' },
];

// Sector cards link to the matching section on the Industries page.
// Anchors come from INDUSTRY_TRANSLATION_MAP in IndustriesPage.tsx.
const SECTORS = [
  { to: '/industries#oilgas', NL: 'Petrochemie, olie & gas', EN: 'Petrochemical, oil & gas' },
  { to: '/industries#chemical', NL: 'Chemie', EN: 'Chemical' },
  { to: '/industries#marine', NL: 'Maritiem & haven', EN: 'Marine & port' },
  { to: '/industries#food', NL: 'Voedingsindustrie', EN: 'Food production' },
  { to: '/industries#manufacturing', NL: 'Productie & industrie', EN: 'Manufacturing & industry' },
  { to: '/industries#power', NL: 'Energie & nutsbedrijven', EN: 'Energy & utilities' },
];

const CONTENT = {
  NL: {
    kicker: 'Diensten',
    breadcrumbServices: 'Diensten',
    breadcrumbHere: 'Industriële schilderwerken',
    h1: 'Industriële schilderwerken',
    heroSub: 'Beschermende coatings op staal, tanks, leidingen en installaties. Vakkundig aangebracht op locatie in Antwerpen en heel België. VCA- en ISO-gecertificeerd.',
    ctaPrimary: 'Vraag een offerte aan',
    ctaPhone: 'Bel +32 475 43 48 19',
    intro: [
      'Industriële schilderwerken draaien om bescherming, niet om esthetiek. Een correct opgebouwd coatingsysteem beschermt staal jarenlang tegen corrosie, chemicaliën, hitte en slijtage. Dat begint bij een vakkundige oppervlaktevoorbereiding. Russo NV verzorgt het volledige traject: van stralen en grondlagen tot de afwerkende toplaag, met meetbare kwaliteit op elke stap.',
      'We werken hoofdzakelijk op locatie: in raffinaderijen, op tankterminals, in de haven van Antwerpen en op industriële sites in heel België en de Benelux. Onze ploegen zijn VCA-gecertificeerd en werken volgens ISO 12944 en de specificaties van de coatingfabrikant.',
    ],
    scopeTitle: 'Wat onze industriële schilderwerken omvatten',
    scope: [
      { title: 'Oppervlaktevoorbereiding & stralen', text: 'Stralen tot reinheidsgraad Sa 2½ of Sa 3 met het juiste ankerprofiel. Dit is de basis van elke duurzame coating.' },
      { title: 'Grond- en tussenlagen', text: 'Zinkrijke primers en epoxy tussenlagen die de eerste en belangrijkste corrosiebarrière vormen.' },
      { title: 'Afwerkende toplagen', text: 'Polyurethaan- en epoxy toplagen: kleurvast en bestand tegen UV, chemicaliën en mechanische belasting.' },
      { title: 'Brandwerende coatings', text: 'Intumescente en thermische coatings die de structurele integriteit van staal beschermen bij brand.' },
      { title: 'Corrosiebescherming', text: 'Beschermsystemen op maat van de blootstellingsklasse (ISO 12944), van C2 tot C5 en immersie.' },
      { title: 'Inspectie & laagdiktecontrole', text: 'DFT-metingen, hechtingstesten en rapportage, zodat u zeker bent dat de specificatie gehaald is.' },
    ],
    processTitle: 'Onze werkwijze',
    processIntro: 'Elk project volgt dezelfde gecontroleerde opbouw, want een coating is maar zo sterk als de zwakste stap.',
    process: [
      { step: '01', title: 'Inspectie & voorbereiding', text: 'We beoordelen de ondergrond, bepalen het juiste coatingsysteem en stellen de werkzone veilig.' },
      { step: '02', title: 'Stralen', text: 'Stralen tot de voorgeschreven reinheidsgraad en het juiste straalprofiel.' },
      { step: '03', title: 'Grondlaag', text: 'Aanbrengen van de primer binnen het klimaatvenster, vóór er flash rust ontstaat.' },
      { step: '04', title: 'Coating', text: 'Opbouw van tussen- en toplagen tot de voorgeschreven totale laagdikte.' },
      { step: '05', title: 'Inspectie & oplevering', text: 'Laagdiktemeting, controle en rapportage als bewijs dat de specificatie gehaald is.' },
    ],
    processLink: 'Lees meer: hoe bereid je staal voor op coating',
    sectorsTitle: 'Voor welke sectoren',
    whyTitle: 'Waarom Russo NV',
    why: [
      { icon: BadgeCheck, title: 'Gecertificeerd', text: 'VCA en ISO 9001, werkend volgens NACE/SSPC- en ISO 12944-normen.' },
      { icon: MapPin, title: 'Op locatie', text: 'Wij komen naar uw site, overal in België en de Benelux, ook in productieomgevingen.' },
      { icon: Ruler, title: 'Meetbare kwaliteit', text: 'Reinheidsgraad, straalprofiel en laagdikte worden gemeten en gerapporteerd.' },
      { icon: ClipboardCheck, title: 'Bewezen referenties', text: 'Grootschalige projecten voor o.a. Sea Tank Terminal, Ghent Transport & Storage, CSP terminals, Pfizer en Katoennatie.' },
    ],
    faqTitle: 'Veelgestelde vragen',
    faq: [
      { q: 'Wat zijn industriële schilderwerken?', a: 'Industriële schilderwerken zijn het aanbrengen van beschermende coatingsystemen op staal en industriële installaties. Het doel is bescherming tegen corrosie, chemicaliën, hitte en slijtage, niet louter esthetiek. Een volledig systeem omvat oppervlaktevoorbereiding, een grondlaag, tussenlagen en een afwerkende toplaag.' },
      { q: 'Wat kosten industriële schilderwerken?', a: 'De prijs hangt af van het oppervlak (m²), de staat van de ondergrond, het gekozen coatingsysteem en de bereikbaarheid. Omdat elk project verschilt, maken we een offerte op maat na een korte inspectie of op basis van uw specificatie.' },
      { q: 'Werken jullie op locatie?', a: 'Ja. Het grootste deel van onze industriële schilderwerken voeren we uit op locatie: in raffinaderijen, op tankterminals, in de haven van Antwerpen en op industriële sites in heel België en de Benelux.' },
      { q: 'Welke coatingsystemen gebruiken jullie?', a: 'Afhankelijk van de blootstelling: zinkrijke primers, epoxy tussenlagen, polyurethaan toplagen en intumescente brandwerende coatings. Het systeem wordt gekozen volgens de corrosieklasse (ISO 12944) en de specificatie van de fabrikant.' },
      { q: 'Welke normen en certificeringen volgen jullie?', a: 'We werken VCA- en ISO 9001-gecertificeerd, volgens ISO 8501 (reinheidsgraden), ISO 12944 (corrosiebescherming) en NACE/SSPC-richtlijnen. Inspecties gebeuren met gekalibreerde meetapparatuur.' },
      { q: 'Hoe lang gaat een industriële coating mee?', a: 'Een correct opgebouwd systeem op goed voorbereid staal gaat doorgaans 15 tot 25 jaar mee, afhankelijk van de blootstellingsklasse en het onderhoud. De voorbereiding is daarbij de bepalende factor.' },
    ],
    ctaTitle: 'Klaar voor een offerte?',
    ctaText: 'Bezorg ons uw specificatie of plan een korte inspectie. U krijgt een duidelijke offerte voor uw industriële schilderwerken.',
    relatedTitle: 'Gerelateerde diensten',
  },
  EN: {
    kicker: 'Services',
    breadcrumbServices: 'Services',
    breadcrumbHere: 'Industrial painting',
    h1: 'Industrial painting & coating',
    heroSub: 'Protective coatings on steel, tanks, pipework and installations. Expertly applied on-site in Antwerp and across Belgium. VCA & ISO certified.',
    ctaPrimary: 'Request a quote',
    ctaPhone: 'Call +32 475 43 48 19',
    intro: [
      'Industrial painting is about protection, not aesthetics. A correctly built coating system protects steel for years against corrosion, chemicals, heat and wear. It all starts with expert surface preparation. Russo NV handles the whole process: from blasting and primers to the finishing top coat, with measurable quality at every step.',
      'We work mainly on-site: in refineries, on tank terminals, in the Port of Antwerp and at industrial sites across Belgium and the Benelux. Our crews are VCA-certified and work to ISO 12944 and the coating manufacturer’s specification.',
    ],
    scopeTitle: 'What our industrial painting covers',
    scope: [
      { title: 'Surface preparation & blasting', text: 'Blasting to cleanliness grade Sa 2½ or Sa 3 with the correct anchor profile, the basis of any durable coating.' },
      { title: 'Primers & intermediate coats', text: 'Zinc-rich primers and epoxy intermediates that form the first and most important corrosion barrier.' },
      { title: 'Finishing top coats', text: 'Polyurethane and epoxy top coats: colour-stable and resistant to UV, chemicals and mechanical load.' },
      { title: 'Fireproofing coatings', text: 'Intumescent and thermal coatings that protect the structural integrity of steel in a fire.' },
      { title: 'Corrosion protection', text: 'Protective systems matched to the exposure class (ISO 12944), from C2 to C5 and immersion.' },
      { title: 'Inspection & film-thickness control', text: 'DFT measurements, adhesion tests and reporting, so you know the specification has been met.' },
    ],
    processTitle: 'How we work',
    processIntro: 'Every project follows the same controlled build-up, because a coating is only as strong as its weakest step.',
    process: [
      { step: '01', title: 'Inspection & preparation', text: 'We assess the substrate, select the right coating system and make the work zone safe.' },
      { step: '02', title: 'Blasting', text: 'Blasting to the specified cleanliness grade and the correct surface profile.' },
      { step: '03', title: 'Primer', text: 'Applying the primer within the climate window, before flash rust can form.' },
      { step: '04', title: 'Coating', text: 'Building up intermediate and top coats to the specified total film thickness.' },
      { step: '05', title: 'Inspection & handover', text: 'Film-thickness measurement, checks and reporting as proof the specification was met.' },
    ],
    processLink: 'Read more: how to prepare steel for coating',
    sectorsTitle: 'Sectors we serve',
    whyTitle: 'Why Russo NV',
    why: [
      { icon: BadgeCheck, title: 'Certified', text: 'VCA and ISO 9001, working to NACE/SSPC and ISO 12944 standards.' },
      { icon: MapPin, title: 'On-site', text: 'We come to your site, anywhere in Belgium and the Benelux, including live production environments.' },
      { icon: Ruler, title: 'Measurable quality', text: 'Cleanliness grade, surface profile and film thickness are measured and reported.' },
      { icon: ClipboardCheck, title: 'Proven references', text: 'Large-scale projects for clients including Sea Tank Terminal, Ghent Transport & Storage, CSP terminals, Pfizer and Katoennatie.' },
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'What is industrial painting?', a: 'Industrial painting is the application of protective coating systems to steel and industrial installations. The goal is protection against corrosion, chemicals, heat and wear, not merely aesthetics. A full system includes surface preparation, a primer, intermediate coats and a finishing top coat.' },
      { q: 'What does industrial painting cost?', a: 'The price depends on the surface area (m²), the condition of the substrate, the chosen coating system and accessibility. Because every project differs, we provide a tailored quote after a short inspection or based on your specification.' },
      { q: 'Do you work on-site?', a: 'Yes. We carry out most of our industrial painting on-site: in refineries, on tank terminals, in the Port of Antwerp and at industrial sites across Belgium and the Benelux.' },
      { q: 'Which coating systems do you use?', a: 'Depending on the exposure: zinc-rich primers, epoxy intermediates, polyurethane top coats and intumescent fireproofing coatings. The system is chosen to the corrosion class (ISO 12944) and the manufacturer’s specification.' },
      { q: 'Which standards and certifications do you follow?', a: 'We are VCA and ISO 9001 certified, working to ISO 8501 (cleanliness grades), ISO 12944 (corrosion protection) and NACE/SSPC guidelines. Inspections use calibrated measuring equipment.' },
      { q: 'How long does an industrial coating last?', a: 'A correctly built system on well-prepared steel typically lasts 15 to 25 years, depending on the exposure class and maintenance. Preparation is the decisive factor.' },
    ],
    ctaTitle: 'Ready for a quote?',
    ctaText: 'Send us your specification or schedule a short inspection and you’ll get a clear quote for your industrial painting.',
    relatedTitle: 'Related services',
  },
} as const;

export default function IndustrialPaintingPage() {
  const { locale, localize } = useLocale();
  const c = CONTENT[locale];
  const pageUrl = `${SITE_URL}${localize('/services/industriele-schilderwerken')}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: c.h1,
    serviceType: locale === 'NL' ? 'Industriële schilderwerken' : 'Industrial painting',
    description: c.heroSub,
    url: pageUrl,
    image: `${SITE_URL}${HERO_IMAGE}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'Luxembourg' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const heroAlt = locale === 'NL'
    ? 'Russo NV industriële schilderwerken op staal in de haven van Antwerpen'
    : 'Russo NV industrial painting on steel in the Port of Antwerp';

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />

      {/* Hero */}
      <header className="relative w-full min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={HERO_IMAGE} alt={heroAlt} className="w-full h-full object-cover" width={1920} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40" />
        </div>
        <div className="relative z-10 w-full max-w-[100rem] mx-auto px-8 py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-paragraph text-xs sm:text-sm text-white/70">
              <li><Link to={localize('/')} className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-white/40">/</li>
              <li><Link to={localize('/services')} className="hover:text-primary transition-colors">{c.breadcrumbServices}</Link></li>
              <li className="text-white/40">/</li>
              <li className="text-white/90">{c.breadcrumbHere}</li>
            </ol>
          </nav>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="font-paragraph text-xs font-bold tracking-[0.2em] text-primary uppercase">{c.kicker}</span>
            <h1 className="font-heading text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.95] mt-4 max-w-4xl">{c.h1}</h1>
            <p className="font-paragraph text-base sm:text-lg text-white/85 mt-6 max-w-2xl leading-relaxed">{c.heroSub}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to={localize('/contact')} className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-paragraph font-bold uppercase px-8 py-4 hover:bg-primary/90 transition-colors group">
                {c.ctaPrimary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={`tel:${PHONE_HREF}`} className="inline-flex items-center justify-center gap-3 border border-white/40 text-white font-paragraph font-bold uppercase px-8 py-4 hover:border-white transition-colors">
                <Phone className="w-4 h-4" />
                {c.ctaPhone}
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Intro */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-16 lg:py-24">
        <div className="max-w-3xl space-y-6">
          {c.intro.map((p, i) => (
            <p key={i} className="font-paragraph text-lg sm:text-xl text-foreground/80 leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      {/* Scope */}
      <section className="w-full bg-dark-grey/[0.04] border-y border-dark-grey/10">
        <div className="max-w-[100rem] mx-auto px-8 py-20 lg:py-24">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground uppercase mb-12 max-w-3xl leading-tight">{c.scopeTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dark-grey/10 border border-dark-grey/10">
            {c.scope.map((item) => (
              <div key={item.title} className="bg-background p-8">
                <h3 className="font-heading text-xl text-foreground mb-3">{item.title}</h3>
                <p className="font-paragraph text-base text-foreground/70 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-20 lg:py-28">
        <div className="max-w-3xl mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground uppercase leading-tight mb-4">{c.processTitle}</h2>
          <p className="font-paragraph text-lg text-foreground/70 leading-relaxed">{c.processIntro}</p>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {c.process.map((s) => (
            <li key={s.step} className="border-t-2 border-primary pt-5">
              <span className="font-heading text-primary/40 text-4xl font-black leading-none">{s.step}</span>
              <h3 className="font-heading text-lg text-foreground mt-3 mb-2">{s.title}</h3>
              <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
        <Link to={localize(ARTICLE_TO)} className="inline-flex items-center gap-2 mt-10 font-paragraph text-sm font-bold uppercase tracking-wider text-primary hover:gap-3 transition-all">
          {c.processLink}
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Sectors — each links to its section on the Industries page */}
      <section className="w-full bg-foreground text-white">
        <div className="max-w-[100rem] mx-auto px-8 py-20 lg:py-24">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl uppercase mb-12 leading-tight">{c.sectorsTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {SECTORS.map((s) => (
              <Link key={s.to} to={localize(s.to)} className="group bg-foreground p-8 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                <span className="font-heading text-lg sm:text-xl text-white group-hover:text-primary transition-colors">{s[locale]}</span>
                <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Russo */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-20 lg:py-28">
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground uppercase mb-12 leading-tight">{c.whyTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {c.why.map((w) => (
            <div key={w.title} className="border-l-4 border-primary pl-6">
              <w.icon className="w-9 h-9 text-primary mb-4" />
              <h3 className="font-heading text-xl text-foreground mb-2">{w.title}</h3>
              <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-dark-grey/[0.04] border-y border-dark-grey/10">
        <div className="max-w-[52rem] mx-auto px-8 py-20 lg:py-24">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground uppercase mb-10 leading-tight">{c.faqTitle}</h2>
          <div className="divide-y divide-dark-grey/15 border-y border-dark-grey/15">
            {c.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none font-heading text-lg sm:text-xl text-foreground">
                  <span className="pr-6">{f.q}</span>
                  <span className="text-primary text-2xl leading-none transition-transform group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="font-paragraph text-base text-foreground/75 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-16 lg:py-20">
        <h2 className="font-heading text-xl sm:text-2xl text-foreground uppercase mb-8">{c.relatedTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RELATED.map((r) => (
            <Link key={r.to} to={localize(r.to)} className="group flex items-center justify-between border border-dark-grey/15 bg-white p-5 hover:border-primary transition-colors">
              <span className="font-paragraph text-sm font-bold text-foreground group-hover:text-primary transition-colors">{r[locale]}</span>
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-primary py-24">
        <div className="max-w-[100rem] mx-auto px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white uppercase leading-tight mb-6">{c.ctaTitle}</h2>
          <p className="font-paragraph text-lg text-white/90 max-w-2xl mx-auto mb-10">{c.ctaText}</p>
          <Link to={localize('/contact')} className="inline-flex items-center gap-3 bg-black text-white font-paragraph font-bold uppercase px-10 py-5 hover:bg-white hover:text-black transition-colors group">
            {c.ctaPrimary}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}

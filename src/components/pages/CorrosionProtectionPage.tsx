// Dedicated service "spoke" page targeting "corrosiebescherming / conservering
// staal": the corrosion-protection money keyword. Article #3 (ISO 12944) is the
// cluster support; this page sells the service, the article explains the norm.
// Follows the proven spoke template: bespoke keyword-optimized content with
// in-body Service + FAQPage JSON-LD. Meta/title live in PAGE_META; the 3-level
// breadcrumb is built in [...slug].astro. Reached via the Services read-more
// (corrosion card), the footer, the homepage card and articles #1/#3.
import { Image } from '@/components/ui/image';
import { useLocale } from '@/lib/i18n/useLocale';
import { serializeJsonLd } from '@/lib/json-ld';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BadgeCheck, Factory, History, Phone, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';

const SITE_URL = 'https://www.russonv.com';
const HERO_IMAGE = '/images/article3-hero.jpg';
const PHONE_HREF = '+32475434819';
const ARTICLE_TO = '/insights/corrosion-protection-iso-12944';

const RELATED = [
  { to: '/services/industriele-schilderwerken', NL: 'Industriële schilderwerken', EN: 'Industrial painting' },
  { to: '/services/industrieel-stralen', NL: 'Industrieel stralen', EN: 'Industrial blasting' },
  { to: '/services/tankcoating', NL: 'Tankcoating & tank lining', EN: 'Tank coating & lining' },
  { to: '/services#coatingInspection', NL: 'Coating-inspectie', EN: 'Coating inspection' },
];

// Sector cards link to the matching section on the Industries page.
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
    breadcrumbHere: 'Corrosiebescherming',
    h1: 'Corrosiebescherming & conservering van staal',
    heroSub: 'Complete coatingsystemen volgens ISO 12944, van C2 binnenklimaat tot C5 kust en industrie. Stralen, conserveren en inspecteren in één hand, op locatie in heel België.',
    ctaPrimary: 'Vraag een offerte aan',
    ctaPhone: 'Bel +32 475 43 48 19',
    intro: [
      'Roest stopt nooit uit zichzelf. Elke staalconstructie die onbeschermd buiten staat, in een haven, naast een chemische installatie of gewoon in het Belgische klimaat, levert elk jaar staal in. Corrosiebescherming is de vakdiscipline die dat proces stillegt: het juiste coatingsysteem, op een correct voorbereide ondergrond, in de voorgeschreven laagdiktes.',
      'Russo NV conserveert staal sinds 1994: staalconstructies, tankparken, pijpbruggen, loodsen en installaties, in nieuwbouw en in onderhoud. We bepalen de corrosiviteitsklasse van de omgeving, adviseren het systeem en voeren het volledige traject uit met eigen materieel: stralen, applicatie en inspectie, gedocumenteerd tot en met het opleverdossier.',
    ],
    scopeTitle: 'Wat onze corrosiebescherming omvat',
    scope: [
      { title: 'Complete coatingsystemen', text: 'Primer, tussenlagen en topcoat als één getest systeem, afgestemd op de corrosiviteitsklasse (C2 tot C5) en de gewenste levensduur volgens ISO 12944.' },
      { title: 'Nieuwbouw conservering', text: 'Nieuwe staalconstructies en installaties vanaf de eerste laag goed: straalwerk tot de voorgeschreven reinheid en systeemopbouw volgens specificatie.' },
      { title: 'Onderhoudsschilderwerk & renovatie', text: 'Bestaande structuren met roestvorming: beoordeling van de oude laag, plaatselijk herstel of volledige renovatie, gefaseerd zodat de site blijft draaien.' },
      { title: 'Staalconstructies & installaties', text: 'Pijpbruggen, tankparken (uitwendig), loodsen, bordessen, leidingwerk en apparatuur, ook op hoogte en op operationele terreinen.' },
      { title: 'Advies & klassebepaling', text: 'Vastleggen van de corrosiviteitsklasse en de gewenste levensduur, vertaald naar een systeemkeuze die niet over- of onderbeschermt.' },
      { title: 'Inspectie & dossier', text: 'Laagdiktemetingen (DFT), klimaatregistratie en hechtproeven waar vereist, vastgelegd in een opleverdossier per project.' },
    ],
    processTitle: 'Onze werkwijze',
    processIntro: 'Een coatingsysteem is zo sterk als zijn zwakste stap. Daarom lopen alle stappen bij ons in één hand.',
    process: [
      { step: '01', title: 'Opname & klasse', text: 'Omgeving, staat van het staal en bestaande lagen beoordelen; corrosiviteitsklasse en levensduur vastleggen.' },
      { step: '02', title: 'Systeemkeuze', text: 'Het geteste systeem selecteren dat bij de klasse en het budget past, met datablad en laagdiktes op papier.' },
      { step: '03', title: 'Voorbereiding', text: 'Stralen of mechanisch voorbereiden tot de voorgeschreven reinheidsgraad, met metingen vóór vrijgave.' },
      { step: '04', title: 'Applicatie', text: 'Laag per laag binnen het klimaatvenster, met natte-laagdiktecontroles tijdens het werk.' },
      { step: '05', title: 'Inspectie & dossier', text: 'DFT-metingen per zone, herstel waar nodig en een dossier dat aantoont wat er hangt.' },
    ],
    processLink: 'Lees meer: corrosiebescherming volgens ISO 12944, de volledige gids',
    sectorsTitle: 'Voor welke sectoren',
    whyTitle: 'Waarom Russo NV',
    why: [
      { icon: BadgeCheck, to: '/safety', title: 'Gecertificeerd', text: 'VCA en ISO 9001, systemen en laagdiktes volgens ISO 12944 en de specificatie van de coatingfabrikant.' },
      { icon: History, title: 'Sinds 1994', text: 'Meer dan 30 jaar staal conserveren in de Antwerpse haven en industrie: wij kennen de C5-praktijk van binnenuit.' },
      { icon: Factory, title: 'Eigen materieel', text: 'Eigen straalketels, compressoren en spuitinstallaties: voorbereiding en applicatie zonder onderaannemers ertussen.' },
      { icon: Ruler, title: 'Meetbare kwaliteit', text: 'Reinheid, klimaat en laagdiktes worden gemeten en geregistreerd, van eerste straalbeurt tot opleverdossier.' },
    ],
    faqTitle: 'Veelgestelde vragen',
    faq: [
      { q: 'Wat kost corrosiebescherming per m²?', a: 'De prijs hangt af van de corrosiviteitsklasse, het systeem, de staat van de ondergrond en de bereikbaarheid. Een C3-systeem in een loods is een andere som dan een C5-systeem op hoogte op een operationeel terrein. Omdat elk project verschilt, rekenen we op basis van een inspectie of uw specificatie: zo klopt de offerte met wat er werkelijk moet gebeuren.' },
      { q: 'Hoe lang gaat een coatingsysteem mee?', a: 'ISO 12944 rekent met levensduurklassen tot meer dan 25 jaar voor de zwaarste systemen. In de praktijk bepalen drie dingen de haalbare levensduur: de kwaliteit van de voorbereiding, de systeemkeuze ten opzichte van de werkelijke omgeving en het onderhoud. Een correct aangebracht systeem in de juiste klasse haalt zijn ontwerpverwachting; een gemiste stap in de voorbereiding kost jaren.' },
      { q: 'Welk systeem heeft mijn omgeving nodig?', a: 'Dat volgt uit de corrosiviteitsklasse: van C2 voor droge binnenruimtes tot C5 voor kust- en industriegebieden zoals de Antwerpse haven. Per klasse en gewenste levensduur schrijft ISO 12944 geteste systeemopbouwen voor. Wij bepalen de klasse ter plaatse en adviseren het systeem dat beschermt zonder te veel te kosten.' },
      { q: 'Kan er over bestaande roest of oude verf gecoat worden?', a: 'Niet zomaar. Roest wordt verwijderd tot de reinheidsgraad die het systeem vraagt, en een bestaande verflaag wordt eerst beoordeeld op hechting en verdraagzaamheid met het nieuwe systeem. Vaak is plaatselijk herstel met overlaging mogelijk; bij een versleten of onverenigbare oude laag is volledig stralen de enige duurzame weg. Dat oordeel vellen we vooraf, niet achteraf.' },
      { q: 'Wat is het verschil tussen conserveren en schilderen?', a: 'Schilderen geeft kleur; conserveren beschermt constructief. Bij conservering bepalen de corrosiviteitsklasse en de norm het systeem, de voorbereiding en de laagdiktes, en wordt elke stap gemeten en vastgelegd. Het resultaat oogt als schilderwerk, maar eronder zit een gedocumenteerd systeem dat decennia mee moet.' },
      { q: 'Kunnen jullie ook enkel adviseren of inspecteren?', a: 'Ja. We voeren opnames en klassebepalingen uit, beoordelen bestaande coatingsystemen en meten laagdiktes op bestaand werk. Dat gebeurt ook als second opinion op andermans werk of als nulmeting vóór een onderhoudsprogramma.' },
    ],
    ctaTitle: 'Staal te beschermen?',
    ctaText: 'Bezorg ons uw specificatie of plan een opname. U krijgt een duidelijke offerte met klasse, systeem en aanpak, zonder over- of onderbescherming.',
    relatedTitle: 'Gerelateerde diensten',
  },
  EN: {
    kicker: 'Services',
    breadcrumbServices: 'Services',
    breadcrumbHere: 'Corrosion protection',
    h1: 'Corrosion protection & steel preservation',
    heroSub: 'Complete coating systems to ISO 12944, from C2 indoor to C5 coastal and industrial. Blasting, coating and inspection in one hand, on-site across Belgium.',
    ctaPrimary: 'Request a quote',
    ctaPhone: 'Call +32 475 43 48 19',
    intro: [
      'Rust never stops by itself. Every steel structure standing unprotected outdoors, in a port, next to a chemical plant or simply in the Belgian climate, gives up steel every year. Corrosion protection is the discipline that halts that process: the right coating system, on a correctly prepared substrate, at the specified film thicknesses.',
      'Russo NV has been preserving steel since 1994: structures, tank farms, pipe racks, warehouses and installations, in new-build and in maintenance. We determine the corrosivity category of the environment, advise the system and deliver the complete scope with our own equipment: blasting, application and inspection, documented through to the handover dossier.',
    ],
    scopeTitle: 'What our corrosion protection covers',
    scope: [
      { title: 'Complete coating systems', text: 'Primer, intermediate coats and topcoat as one tested system, matched to the corrosivity category (C2 to C5) and the required durability to ISO 12944.' },
      { title: 'New-build preservation', text: 'New steel structures and installations right from the first coat: blasting to the specified cleanliness and system build-up to specification.' },
      { title: 'Maintenance painting & renovation', text: 'Existing structures with corrosion: assessment of the old coating, local repair or full renovation, phased so the site keeps running.' },
      { title: 'Steel structures & installations', text: 'Pipe racks, tank farms (exterior), warehouses, platforms, piping and equipment, including at height and on operational sites.' },
      { title: 'Advice & category assessment', text: 'Establishing the corrosivity category and required durability, translated into a system choice that neither over- nor under-protects.' },
      { title: 'Inspection & dossier', text: 'Dry film thickness measurements, climate records and adhesion tests where required, recorded in a handover dossier per project.' },
    ],
    processTitle: 'How we work',
    processIntro: 'A coating system is as strong as its weakest step. That is why every step stays in one hand with us.',
    process: [
      { step: '01', title: 'Survey & category', text: 'Assess environment, steel condition and existing coatings; establish corrosivity category and durability.' },
      { step: '02', title: 'System selection', text: 'Select the tested system that fits the category and budget, with data sheet and film thicknesses on paper.' },
      { step: '03', title: 'Preparation', text: 'Blasting or mechanical preparation to the specified cleanliness grade, measured before release.' },
      { step: '04', title: 'Application', text: 'Coat by coat within the climate window, with wet film checks during the work.' },
      { step: '05', title: 'Inspection & dossier', text: 'DFT measurements per zone, repairs where needed and a dossier that proves what is on the steel.' },
    ],
    processLink: 'Read more: corrosion protection to ISO 12944, the complete guide',
    sectorsTitle: 'Sectors we serve',
    whyTitle: 'Why Russo NV',
    why: [
      { icon: BadgeCheck, to: '/safety', title: 'Certified', text: 'VCA and ISO 9001, systems and film thicknesses to ISO 12944 and the coating manufacturer specification.' },
      { icon: History, title: 'Since 1994', text: 'Over 30 years of preserving steel in the port of Antwerp and industry: we know C5 practice from the inside.' },
      { icon: Factory, title: 'Own equipment', text: 'Own blast pots, compressors and spray equipment: preparation and application without subcontractors in between.' },
      { icon: Ruler, title: 'Measurable quality', text: 'Cleanliness, climate and film thicknesses are measured and recorded, from the first blast to the handover dossier.' },
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'What does corrosion protection cost per m²?', a: 'The price depends on the corrosivity category, the system, the condition of the substrate and accessibility. A C3 system in a warehouse is a different calculation than a C5 system at height on an operational site. Because every project differs, we quote from an inspection or your specification, so the price matches what actually has to happen.' },
      { q: 'How long does a coating system last?', a: 'ISO 12944 works with durability ranges up to more than 25 years for the heaviest systems. In practice three things determine the achievable life: the quality of the preparation, the system choice against the real environment and the maintenance. A correctly applied system in the right category meets its design expectation; a missed step in preparation costs years.' },
      { q: 'Which system does my environment need?', a: 'That follows from the corrosivity category: from C2 for dry interiors to C5 for coastal and industrial areas such as the port of Antwerp. Per category and required durability, ISO 12944 prescribes tested system build-ups. We determine the category on site and advise the system that protects without overspending.' },
      { q: 'Can you coat over existing rust or old paint?', a: 'Not just like that. Rust is removed to the cleanliness grade the system demands, and an existing paint layer is first assessed for adhesion and compatibility with the new system. Local repair with an overcoat is often possible; with a worn or incompatible old layer, full blasting is the only durable route. We make that call before the work, not after.' },
      { q: 'What is the difference between preservation and painting?', a: 'Painting provides colour; preservation protects structurally. In preservation work the corrosivity category and the standard govern the system, the preparation and the film thicknesses, and every step is measured and recorded. The result looks like paintwork, but underneath sits a documented system built to last decades.' },
      { q: 'Do you also provide advice or inspections only?', a: 'Yes. We carry out surveys and category assessments, evaluate existing coating systems and measure film thicknesses on existing work. We also do this as a second opinion on work by others, or as a baseline before a maintenance programme.' },
    ],
    ctaTitle: 'Steel to protect?',
    ctaText: 'Send us your specification or schedule a survey. You will receive a clear quote with category, system and approach, without over- or under-protection.',
    relatedTitle: 'Related services',
  },
} as const;

export default function CorrosionProtectionPage() {
  const { locale, localize } = useLocale();
  const c = CONTENT[locale];
  const pageUrl = `${SITE_URL}${localize('/services/corrosiebescherming')}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: c.h1,
    serviceType: locale === 'NL' ? 'Corrosiebescherming en conservering van staal' : 'Corrosion protection and steel preservation',
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
    ? 'Tankwand met afbladderende coating en corrosie, beoordeeld door Russo NV'
    : 'Tank shell with flaking coating and corrosion, assessed by Russo NV';

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

      {/* Sectors */}
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
              {'to' in w ? (
                <Link to={localize(w.to)}>
                  <h3 className="font-heading text-xl text-foreground mb-2 hover:text-primary transition-colors">{w.title}</h3>
                </Link>
              ) : (
                <h3 className="font-heading text-xl text-foreground mb-2">{w.title}</h3>
              )}
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

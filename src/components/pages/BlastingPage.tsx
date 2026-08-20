// Dedicated service "spoke" page targeting "industrieel stralen / gritstralen":
// the surface-preparation money keyword (deliberately NOT "zandstralen", which
// carries consumer intent - the FAQ captures and redirects that search).
// Follows the proven spoke template: bespoke keyword-optimized content with
// in-body Service + FAQPage JSON-LD. Meta/title live in PAGE_META; the 3-level
// breadcrumb is built in [...slug].astro. Reached via the Services read-more
// (sandblasting card), the footer, the homepage card and article #1.
import { Image } from '@/components/ui/image';
import { useLocale } from '@/lib/i18n/useLocale';
import { serializeJsonLd } from '@/lib/json-ld';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BadgeCheck, Factory, Phone, Ruler, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';

const SITE_URL = 'https://www.russonv.com';
const HERO_IMAGE = '/images/services2.jpg';
const PHONE_HREF = '+32475434819';
const ARTICLE_TO = '/insights/steel-surface-preparation';

const RELATED = [
  { to: '/services/industriele-schilderwerken', NL: 'Industriële schilderwerken', EN: 'Industrial painting' },
  { to: '/services/tankcoating', NL: 'Tankcoating & tank lining', EN: 'Tank coating & lining' },
  { to: '/services/corrosiebescherming', NL: 'Corrosiebescherming', EN: 'Corrosion protection' },
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
    breadcrumbHere: 'Industrieel stralen',
    h1: 'Industrieel stralen & oppervlaktevoorbereiding',
    heroSub: 'Gritstralen tot Sa 2½ of Sa 3, op locatie in heel België. Ook vacuümstralen zonder gritverspreiding en straalwerk in besloten ruimtes. VCA- en ISO-gecertificeerd.',
    ctaPrimary: 'Vraag een offerte aan',
    ctaPhone: 'Bel +32 475 43 48 19',
    intro: [
      'Elke duurzame industriële coating begint bij het stralen. De reinheidsgraad en het straalprofiel bepalen hoe goed het systeem hecht, en dus hoe lang het meegaat. Russo NV voert industrieel straalwerk uit met een eigen vloot straalketels, compressoren en nakoelers: van volledige tankwanden tot plaatselijk herstel met vacuümstralen.',
      'We stralen hoofdzakelijk op locatie: op tankterminals, in raffinaderijen, op werven en industriële sites in heel België en de Benelux. Reinheidsgraad, straalprofiel en klimaat worden gemeten en vastgelegd, zodat de opvolgende coating aantoonbaar op een correcte ondergrond staat.',
    ],
    scopeTitle: 'Wat ons straalwerk omvat',
    scope: [
      { title: 'Gritstralen tot Sa 2½ / Sa 3', text: 'Stralen tot de voorgeschreven reinheidsgraad volgens ISO 8501-1, met het ankerprofiel dat het coatingsysteem vraagt.' },
      { title: 'Vacuümstralen (spot repair)', text: 'Plaatselijk stralen zonder gritverspreiding: ideaal voor herstellingen in operationele installaties en op plaatsen waar open stralen niet kan.' },
      { title: 'Besloten ruimtes & tanks', text: 'Straalwerk in tanks en vaten, met ademlucht, gecontroleerd klimaat en continue afzuiging van stof en grit.' },
      { title: 'Straalprofiel op maat', text: 'Grit en druk afgestemd op het datablad: het juiste profiel (Rz) voor de voorgeschreven laagdikte.' },
      { title: 'Metingen & vrijgave', text: 'Reinheidsgraad, stoftest (ISO 8502-3), oplosbare zouten (Bresle) en klimaat, gemeten en gedocumenteerd vóór het coaten.' },
      { title: 'Stralen én coaten in één hand', text: 'Direct aansluitend coaten binnen het klimaatvenster, vóór er vliegroest ontstaat. Geen discussie tussen straler en schilder.' },
    ],
    processTitle: 'Onze werkwijze',
    processIntro: 'Straalwerk is maatwerk: de omgeving, de ondergrond en het coatingsysteem bepalen de aanpak.',
    process: [
      { step: '01', title: 'Opname & plan', text: 'Ondergrond, bereikbaarheid en omgeving beoordelen; afscherming en afzuiging bepalen.' },
      { step: '02', title: 'Afschermen', text: 'De werkzone wordt afgeschermd en installaties in de omgeving worden beschermd.' },
      { step: '03', title: 'Stralen', text: 'Tot de voorgeschreven reinheidsgraad en het juiste profiel, met eigen ketels en compressoren.' },
      { step: '04', title: 'Meten', text: 'Reinheid, profiel, stof, zouten en klimaat worden gecontroleerd en vastgelegd.' },
      { step: '05', title: 'Vrijgave & coaten', text: 'Vrijgave van de ondergrond en direct aansluitend coaten binnen het venster.' },
    ],
    processLink: 'Lees meer: hoe bereid je staal voor op coating',
    sectorsTitle: 'Voor welke sectoren',
    whyTitle: 'Waarom Russo NV',
    why: [
      { icon: BadgeCheck, to: '/safety', title: 'Gecertificeerd', text: 'VCA en ISO 9001, stralen volgens ISO 8501/8502/8503 en de specificatie van de coatingfabrikant.' },
      { icon: Factory, title: 'Eigen materieel', text: 'Eigen vloot straalketels, compressoren, nakoelers en ademluchtfilters: geen wachttijden op onderaannemers of huurmaterieel.' },
      { icon: Wind, title: 'Ook stofarm', text: 'Vacuümstralen voor spot repair en gevoelige omgevingen: geen gritverspreiding, minimale impact op de operatie.' },
      { icon: Ruler, title: 'Meetbare kwaliteit', text: 'Reinheidsgraad, profiel, stof en zouten worden gemeten en gerapporteerd vóór er gecoat wordt.' },
    ],
    faqTitle: 'Veelgestelde vragen',
    faq: [
      { q: 'Wat is het verschil tussen zandstralen en gritstralen?', a: 'In de volksmond heet alles "zandstralen", maar stralen met echt zand is in België al decennia verboden (silicose). Industrieel straalwerk gebeurt met grit: hoekige straalmiddelen zoals staalgrit of smeltslak die het staal reinigen én het ankerprofiel creëren waar de coating zich in vastzet. Voor gevels en meubels bestaan zachtere technieken; ons werk is industrieel stralen van staal.' },
      { q: 'Welke reinheidsgraad heb ik nodig?', a: 'Dat schrijft het coatingsysteem voor. Voor de meeste industriële beschermsystemen is dat Sa 2½ volgens ISO 8501-1; voor immersiedienst zoals tankbekleding vaak Sa 2½ tot Sa 3. Het technische datablad van de coating is altijd leidend; wij stralen en meten tot die graad aantoonbaar gehaald is.' },
      { q: 'Kunnen jullie stralen zonder stofoverlast?', a: 'Ja. Met vacuümstralen wordt het grit aan de kop direct terug afgezogen: geen gritverspreiding en nauwelijks stof. Dat maakt plaatselijk herstel mogelijk in operationele installaties, naast gevoelige apparatuur en op plaatsen waar open stralen verboden is.' },
      { q: 'Wat kost industrieel stralen per m²?', a: 'De prijs hangt af van de reinheidsgraad, de staat van de ondergrond, de bereikbaarheid en of er afscherming of afzuiging nodig is. Open gritstralen van grote oppervlakken is een andere som dan vacuümstralen van herstelzones. Omdat elk project verschilt, maken we een offerte op maat na een inspectie of op basis van uw specificatie.' },
      { q: 'Stralen jullie ook in tanks en besloten ruimtes?', a: 'Ja, dat is een specialiteit. Onze ploegen werken met ademluchtsystemen, gasmetingen, gecontroleerd klimaat en continue afzuiging. Zie ook onze aanpak voor tankcoating en tank lining, waar straalwerk in de tank de eerste stap is.' },
      { q: 'Hoe snel na het stralen moet er gecoat worden?', a: 'Zo snel mogelijk: vers gestraald staal begint bij vocht binnen enkele uren vliegroest te vormen. Wij plannen stralen en coaten als één geheel, zodat de eerste laag binnen het klimaatvenster op een nog perfecte ondergrond staat. Dat is het grote voordeel van stralen en coaten in één hand.' },
    ],
    ctaTitle: 'Straalwerk nodig?',
    ctaText: 'Bezorg ons uw specificatie of plan een inspectie. U krijgt een duidelijke offerte voor het straalwerk, met reinheidsgraad, aanpak en timing.',
    relatedTitle: 'Gerelateerde diensten',
  },
  EN: {
    kicker: 'Services',
    breadcrumbServices: 'Services',
    breadcrumbHere: 'Industrial blasting',
    h1: 'Industrial blasting & surface preparation',
    heroSub: 'Grit blasting to Sa 2½ or Sa 3, on-site across Belgium. Vacuum blasting without grit spread and blasting in confined spaces. VCA & ISO certified.',
    ctaPrimary: 'Request a quote',
    ctaPhone: 'Call +32 475 43 48 19',
    intro: [
      'Every durable industrial coating starts with the blasting. The cleanliness grade and surface profile determine how well the system adheres, and therefore how long it lasts. Russo NV performs industrial blasting with its own fleet of blast pots, compressors and aftercoolers: from complete tank shells to local repair with vacuum blasting.',
      'We blast mainly on-site: on tank terminals, in refineries, on yards and industrial sites across Belgium and the Benelux. Cleanliness grade, surface profile and climate are measured and recorded, so the coating that follows demonstrably sits on a correct substrate.',
    ],
    scopeTitle: 'What our blasting covers',
    scope: [
      { title: 'Grit blasting to Sa 2½ / Sa 3', text: 'Blasting to the specified cleanliness grade to ISO 8501-1, with the anchor profile the coating system demands.' },
      { title: 'Vacuum blasting (spot repair)', text: 'Local blasting without grit spread: ideal for repairs in operational installations and where open blasting is not allowed.' },
      { title: 'Confined spaces & tanks', text: 'Blasting inside tanks and vessels, with breathing air, controlled climate and continuous extraction of dust and grit.' },
      { title: 'Surface profile to spec', text: 'Grit and pressure matched to the data sheet: the correct profile (Rz) for the specified film thickness.' },
      { title: 'Measurements & release', text: 'Cleanliness grade, dust test (ISO 8502-3), soluble salts (Bresle) and climate, measured and documented before coating.' },
      { title: 'Blasting and coating in one hand', text: 'Coating follows directly within the climate window, before flash rust can form. No discussion between blaster and painter.' },
    ],
    processTitle: 'How we work',
    processIntro: 'Blasting is bespoke work: the environment, the substrate and the coating system determine the approach.',
    process: [
      { step: '01', title: 'Survey & plan', text: 'Assess substrate, access and surroundings; determine containment and extraction.' },
      { step: '02', title: 'Containment', text: 'The work zone is shielded and surrounding installations are protected.' },
      { step: '03', title: 'Blasting', text: 'To the specified cleanliness grade and correct profile, with our own pots and compressors.' },
      { step: '04', title: 'Measuring', text: 'Cleanliness, profile, dust, salts and climate are checked and recorded.' },
      { step: '05', title: 'Release & coating', text: 'Substrate release and coating directly after, within the window.' },
    ],
    processLink: 'Read more: how to prepare steel for coating',
    sectorsTitle: 'Sectors we serve',
    whyTitle: 'Why Russo NV',
    why: [
      { icon: BadgeCheck, to: '/safety', title: 'Certified', text: 'VCA and ISO 9001, blasting to ISO 8501/8502/8503 and the coating manufacturer specification.' },
      { icon: Factory, title: 'Own equipment', text: 'Own fleet of blast pots, compressors, aftercoolers and breathing-air filters: no waiting on subcontractors or rental gear.' },
      { icon: Wind, title: 'Dust-free option', text: 'Vacuum blasting for spot repair and sensitive environments: no grit spread, minimal impact on operations.' },
      { icon: Ruler, title: 'Measurable quality', text: 'Cleanliness grade, profile, dust and salts are measured and reported before any coating goes on.' },
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'What is the difference between sandblasting and grit blasting?', a: 'Colloquially everything is called "sandblasting", but blasting with actual sand has been banned in Belgium for decades (silicosis). Industrial blasting uses grit: angular abrasives such as steel grit or slag that clean the steel and create the anchor profile the coating locks into. Softer techniques exist for facades and furniture; our work is industrial blasting of steel.' },
      { q: 'Which cleanliness grade do I need?', a: 'The coating system prescribes it. For most industrial protective systems that is Sa 2½ to ISO 8501-1; for immersion service such as tank linings often Sa 2½ to Sa 3. The technical data sheet is always leading; we blast and measure until that grade is demonstrably reached.' },
      { q: 'Can you blast without dust nuisance?', a: 'Yes. With vacuum blasting the grit is extracted straight back at the head: no grit spread and hardly any dust. That makes local repair possible in operational installations, next to sensitive equipment and where open blasting is prohibited.' },
      { q: 'What does industrial blasting cost per m²?', a: 'The price depends on the cleanliness grade, the condition of the substrate, accessibility and whether containment or extraction is needed. Open grit blasting of large surfaces is a different calculation than vacuum blasting of repair zones. Because every project differs, we quote after an inspection or based on your specification.' },
      { q: 'Do you blast inside tanks and confined spaces?', a: 'Yes, it is a specialty. Our crews work with breathing-air systems, gas measurements, controlled climate and continuous extraction. See also our approach to tank coating and tank lining, where in-tank blasting is the first step.' },
      { q: 'How soon after blasting must coating follow?', a: 'As soon as possible: freshly blasted steel starts forming flash rust within hours in humid conditions. We plan blasting and coating as one whole, so the first coat lands on a still-perfect substrate within the climate window. That is the great advantage of blasting and coating in one hand.' },
    ],
    ctaTitle: 'Need blasting work?',
    ctaText: 'Send us your specification or schedule an inspection. You will receive a clear quote for the blasting work, with cleanliness grade, approach and timing.',
    relatedTitle: 'Related services',
  },
} as const;

export default function BlastingPage() {
  const { locale, localize } = useLocale();
  const c = CONTENT[locale];
  const pageUrl = `${SITE_URL}${localize('/services/industrieel-stralen')}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: c.h1,
    serviceType: locale === 'NL' ? 'Industrieel stralen en oppervlaktevoorbereiding' : 'Industrial blasting and surface preparation',
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
    ? 'Industrieel gritstralen van staal door Russo NV'
    : 'Industrial grit blasting of steel by Russo NV';

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

// Dedicated service "spoke" page targeting "tankcoating / tank lining":
// high-intent commercial keyword where Russo has real terminal references.
// Follows the IndustrialPaintingPage template: bespoke keyword-optimized
// content with in-body Service + FAQPage JSON-LD. Meta/title live in
// PAGE_META; the 3-level breadcrumb is built in [...slug].astro. Reached via
// the Services read-more (corrosion card), the footer, and the tank article.
import { Image } from '@/components/ui/image';
import { useLocale } from '@/lib/i18n/useLocale';
import { serializeJsonLd } from '@/lib/json-ld';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BadgeCheck, ClipboardCheck, Clock, Phone, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';

const SITE_URL = 'https://www.russonv.com';
const HERO_IMAGE = '/images/gts1.jpg';
const PHONE_HREF = '+32475434819';
const ARTICLE_TO = '/insights/tank-coating-lining';

const RELATED = [
  { to: '/services/industriele-schilderwerken', NL: 'Industriële schilderwerken', EN: 'Industrial painting' },
  { to: '/services#sandblastingAbrasive', NL: 'Stralen & oppervlaktevoorbereiding', EN: 'Blasting & surface preparation' },
  { to: '/services#corrosionProtection', NL: 'Corrosiebescherming', EN: 'Corrosion protection' },
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
    breadcrumbHere: 'Tankcoating & tank lining',
    h1: 'Tankcoating & tank lining',
    heroSub: 'Inwendige linings en uitwendige coatings voor opslagtanks. Van straalwerk tot poriëntest, uitgevoerd op terminals in Antwerpen, Gent en Zeebrugge. VCA- en ISO-gecertificeerd.',
    ctaPrimary: 'Vraag een offerte aan',
    ctaPhone: 'Bel +32 475 43 48 19',
    intro: [
      'Tankbescherming is kernactiviteit bij Russo NV. We bekleedden de voorbije jaren tientallen opslagtanks op Belgische terminals: 15 tanks bij Sea Tank Terminal in de haven van Antwerpen, 16 nieuwbouwtanks bij Ghent Transport & Storage en 8 tanks bij ITC Rubis in Zeebrugge. Inwendig én uitwendig, voor brandstoffen, chemicaliën en petroleumproducten.',
      'Een tank lining staat permanent in contact met het opgeslagen product en vergeeft geen fouten. Daarom voeren we het volledige traject in eigen beheer uit, van gasvrij maken en stralen tot de laatste poriëntest, met een volledig meetdossier bij oplevering. Ook terwijl uw terminal gewoon doordraait.',
    ],
    scopeTitle: 'Wat onze tankcoating omvat',
    scope: [
      { title: 'Inwendige tank linings', text: 'Chemisch resistente systemen (epoxy fenolisch, epoxy novolac, glasvlokversterkt) voor immersiedienst, afgestemd op het opgeslagen product.' },
      { title: 'Uitwendige tankcoating', text: 'Meerlaagssystemen tegen corrosie, UV en zeelucht (tot klasse C5, voorheen C5-M), voor tankwanden, daken en staalstructuren.' },
      { title: 'Tankdaken & antislip', text: 'Dakcoatings tegen weersinvloeden en antislipsystemen voor looppaden en toegangszones op de tank.' },
      { title: 'Spot repair & renovatie', text: 'Lokale herstelling van beschadigde linings, onder meer met vacustralen: geen gritverspreiding, minimale impact op de terminal.' },
      { title: 'Straalwerk in besloten ruimte', text: 'Stralen tot Sa 2½ of Sa 3 in de tank, met zout- en stofmetingen (ISO 8502) en gecontroleerd klimaat.' },
      { title: 'Inspectie & meetdossier', text: 'Laagdiktemetingen (ISO 19840), holiday detectie en rapportage: aantoonbare kwaliteit voor eigenaar en inspecteur.' },
    ],
    processTitle: 'Onze werkwijze',
    processIntro: 'Elke tank volgt hetzelfde gecontroleerde traject, want in immersiedienst is één zwakke plek er één te veel.',
    process: [
      { step: '01', title: 'Gasvrij & inspectie', text: 'Metingen, vergunningen en beoordeling van bodem, wand en lasnaden vóór de werken starten.' },
      { step: '02', title: 'Stralen', text: 'Stralen tot de voorgeschreven reinheidsgraad, met zout- en stofcontrole vóór het coaten.' },
      { step: '03', title: 'Klimaatbeheersing', text: 'Droging en ventilatie houden het staal boven het dauwpunt, van straalbeurt tot laatste laag.' },
      { step: '04', title: 'Applicatie', text: 'Stripe coats op lasnaden en hoeken, daarna spuitapplicatie tot de voorgeschreven laagdikte.' },
      { step: '05', title: 'Poriëntest & oplevering', text: 'Holiday detectie, laagdiktecontrole en een volledig meetdossier bij overdracht.' },
    ],
    processLink: 'Lees meer: tankcoating en tank lining, de complete gids',
    sectorsTitle: 'Voor welke sectoren',
    whyTitle: 'Waarom Russo NV',
    why: [
      { icon: BadgeCheck, to: '/safety', title: 'Gecertificeerd', text: 'VCA en ISO 9001, werkend volgens ISO 8501/8502, ISO 19840 en AMPP-inspectienormen.' },
      { icon: ClipboardCheck, title: 'Terminal-referenties', text: '39 tanks bekleed voor Sea Tank Terminal, Ghent Transport & Storage en ITC Rubis, inwendig en uitwendig.' },
      { icon: Ruler, title: 'Meetbare kwaliteit', text: 'Reinheidsgraad, zouten, laagdikte en poriëntest: alles wordt gemeten en gerapporteerd.' },
      { icon: Clock, title: 'Minimale downtime', text: 'Gefaseerde uitvoering in operationele terminals, afgestemd op uw planning en producthandling.' },
    ],
    faqTitle: 'Veelgestelde vragen',
    faq: [
      { q: 'Wat kost een tankcoating?', a: 'De prijs hangt af van het tankoppervlak, de staat van de bestaande coating, het vereiste liningsysteem en de bereikbaarheid. Omdat elke tank verschilt, maken we een offerte op maat na een inspectie of op basis van uw specificatie.' },
      { q: 'Hoe lang is een tank buiten dienst?', a: 'Voor een volledige herbekleding rekent u op enkele weken: gasvrij maken, stralen, coaten in meerdere lagen en chemisch uitharden. We plannen gefaseerd, zodat de rest van de terminal gewoon doordraait.' },
      { q: 'Welke liningsystemen gebruiken jullie?', a: 'Afhankelijk van het opgeslagen product: epoxy, epoxy fenolisch, epoxy novolac of glasvlokversterkte systemen. De resistentielijst van de coatingfabrikant bepaalt de keuze; daar wijken we nooit van af.' },
      { q: 'Werken jullie in operationele terminals?', a: 'Ja. Het grootste deel van onze tankprojecten voeren we uit op actieve terminals, zoals bij Sea Tank Terminal, GTS en ITC Rubis. Veiligheidsprocedures, fasering en afstemming met de terminaloperatie zijn deel van onze standaardaanpak.' },
      { q: 'Wat is een holiday test?', a: 'Een poriëntest die onzichtbare poriën en pinholes in de lining opspoort met een laagspannings- of hoogspanningsdetector. In immersiedienst is deze test essentieel: één gemiste porie volstaat voor lokale doorroesting. Bij ons gaat geen tank in dienst zonder geslaagde test.' },
      { q: 'Herstellen jullie ook bestaande linings?', a: 'Ja. Bij lokale schade straalt ons team de zones plaatselijk (onder meer met vacustralen), herstelt het systeem laag per laag en test de herstelde zones opnieuw. Zo hoeft niet meteen de volledige lining vervangen te worden.' },
    ],
    ctaTitle: 'Een tankproject op de planning?',
    ctaText: 'Bezorg ons uw specificatie of plan een inspectie. U krijgt een duidelijke offerte voor tankcoating of tank lining, met aanpak en timing.',
    relatedTitle: 'Gerelateerde diensten',
  },
  EN: {
    kicker: 'Services',
    breadcrumbServices: 'Services',
    breadcrumbHere: 'Tank coating & lining',
    h1: 'Tank coating & tank lining',
    heroSub: 'Internal linings and external coatings for storage tanks. From blasting to holiday testing, delivered on terminals in Antwerp, Ghent and Zeebrugge. VCA & ISO certified.',
    ctaPrimary: 'Request a quote',
    ctaPhone: 'Call +32 475 43 48 19',
    intro: [
      'Tank protection is core business at Russo NV. In recent years we lined and coated dozens of storage tanks on Belgian terminals: 15 tanks at Sea Tank Terminal in the Port of Antwerp, 16 new-build tanks at Ghent Transport & Storage and 8 tanks at ITC Rubis in Zeebrugge. Internal and external, for fuels, chemicals and petroleum products.',
      'A tank lining is in permanent contact with the stored product and forgives no mistakes. That is why we deliver the entire scope in-house, from gas-freeing and blasting to the final holiday test, with a complete measurement dossier at handover. And your terminal keeps running while we work.',
    ],
    scopeTitle: 'What our tank coating covers',
    scope: [
      { title: 'Internal tank linings', text: 'Chemically resistant systems (epoxy phenolic, epoxy novolac, glass flake reinforced) for immersion service, matched to the stored product.' },
      { title: 'External tank coating', text: 'Multi-coat systems against corrosion, UV and sea air (up to class C5, formerly C5-M), for tank shells, roofs and steel structures.' },
      { title: 'Tank roofs & anti-slip', text: 'Roof coatings against the weather and anti-slip systems for walkways and access zones on the tank.' },
      { title: 'Spot repair & refurbishment', text: 'Local repair of damaged linings, including vacuum blasting: no grit spread, minimal impact on the terminal.' },
      { title: 'Confined-space blasting', text: 'Blasting to Sa 2½ or Sa 3 inside the tank, with salt and dust testing (ISO 8502) and a controlled climate.' },
      { title: 'Inspection & dossier', text: 'Film thickness measurements (ISO 19840), holiday detection and reporting: demonstrable quality for owner and inspector.' },
    ],
    processTitle: 'How we work',
    processIntro: 'Every tank follows the same controlled sequence, because in immersion service one weak spot is one too many.',
    process: [
      { step: '01', title: 'Gas-free & inspection', text: 'Atmospheric testing, permits and assessment of floor, shell and weld seams before work starts.' },
      { step: '02', title: 'Blasting', text: 'Blasting to the specified cleanliness grade, with salt and dust checks before coating.' },
      { step: '03', title: 'Climate control', text: 'Dehumidification and ventilation keep the steel above the dew point, from first blast to final coat.' },
      { step: '04', title: 'Application', text: 'Stripe coats on weld seams and corners, then spray application to the specified film thickness.' },
      { step: '05', title: 'Holiday test & handover', text: 'Holiday detection, film thickness checks and a complete measurement dossier at handover.' },
    ],
    processLink: 'Read more: tank coating and tank lining, the complete guide',
    sectorsTitle: 'Sectors we serve',
    whyTitle: 'Why Russo NV',
    why: [
      { icon: BadgeCheck, to: '/safety', title: 'Certified', text: 'VCA and ISO 9001, working to ISO 8501/8502, ISO 19840 and AMPP inspection standards.' },
      { icon: ClipboardCheck, title: 'Terminal references', text: '39 tanks coated for Sea Tank Terminal, Ghent Transport & Storage and ITC Rubis, internal and external.' },
      { icon: Ruler, title: 'Measurable quality', text: 'Cleanliness grade, salts, film thickness and holiday testing: everything is measured and reported.' },
      { icon: Clock, title: 'Minimal downtime', text: 'Phased execution on live terminals, planned around your operations and product handling.' },
    ],
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'What does tank coating cost?', a: 'The price depends on the tank surface area, the condition of the existing coating, the required lining system and accessibility. Because every tank differs, we provide a tailored quote after an inspection or based on your specification.' },
      { q: 'How long is a tank out of service?', a: 'Allow several weeks for a full reline: gas-freeing, blasting, coating in multiple coats and chemical curing. We phase the work so the rest of the terminal keeps operating.' },
      { q: 'Which lining systems do you use?', a: 'Depending on the stored product: epoxy, epoxy phenolic, epoxy novolac or glass flake reinforced systems. The coating manufacturer’s resistance list determines the choice; we never deviate from it.' },
      { q: 'Do you work on live terminals?', a: 'Yes. Most of our tank projects run on active terminals, as at Sea Tank Terminal, GTS and ITC Rubis. Safety procedures, phasing and coordination with terminal operations are part of our standard approach.' },
      { q: 'What is a holiday test?', a: 'A pinhole test that finds invisible pores in the lining using a low-voltage or high-voltage detector. In immersion service this test is essential: one missed pore is enough for local through-rusting. With us, no tank returns to service without a passed test.' },
      { q: 'Do you repair existing linings?', a: 'Yes. With local damage our team blasts the zones locally (including vacuum blasting), rebuilds the system coat by coat and re-tests the repaired zones. That way the full lining does not need to be replaced right away.' },
    ],
    ctaTitle: 'A tank project coming up?',
    ctaText: 'Send us your specification or schedule an inspection. You will receive a clear quote for tank coating or tank lining, with approach and timing.',
    relatedTitle: 'Related services',
  },
} as const;

export default function TankCoatingPage() {
  const { locale, localize } = useLocale();
  const c = CONTENT[locale];
  const pageUrl = `${SITE_URL}${localize('/services/tankcoating')}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: c.h1,
    serviceType: locale === 'NL' ? 'Tankcoating en tank lining' : 'Tank coating and tank lining',
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
    ? 'Opslagtanks gecoat door Russo NV bij Ghent Transport & Storage'
    : 'Storage tanks coated by Russo NV at Ghent Transport & Storage';

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

      {/* Sectors - each links to its section on the Industries page */}
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

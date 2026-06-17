// Per-route, per-locale page metadata — the single source of truth shared by
// [...slug].astro (static <title>/<meta> in the built HTML) and the router's
// RouteSync (document.title on client-side navigation). Keep both consumers in
// mind when editing: keys are *base* paths without the /en prefix.

export type Locale = 'NL' | 'EN';

export type LocaleMeta = {
  title: string;
  description: string;
  image?: string;
};

export type PageMeta = {
  NL: LocaleMeta;
  EN: LocaleMeta;
  noindex?: boolean;
};

// Routes are keyed by their *base* path (no /en prefix). Each entry holds
// per-locale title/description so Dutch search results show Dutch copy and
// English search results show English copy.
export const PAGE_META: Record<string, PageMeta> = {
  '/': {
    NL: {
      title: 'Industriële Coatings & Stralen in Antwerpen | Russo NV',
      description: 'Specialist in industriële coatings, stralen, brandwerende coatings en corrosiebescherming voor tanks en pijpleidingen. VCA & ISO gecertificeerd, Antwerpen.',
      image: '/images/home-hero.jpg',
    },
    EN: {
      title: 'Industrial Coating & Sandblasting in Antwerp | Russo NV',
      description: 'Specialist industrial coating, blasting, fireproofing and corrosion protection for tanks, pipelines and industrial assets. VCA & ISO certified, Antwerp.',
      image: '/images/home-hero.jpg',
    },
  },
  '/services': {
    NL: {
      title: 'Industriële Coating- & Straaldiensten | Russo NV',
      description: 'Oppervlaktevoorbehandeling en beschermende coatings: industriële coatings, stralen, corrosiebescherming, brandwerende coatings, waterdichting en hogedrukreiniging.',
      image: '/images/services1.jpg',
    },
    EN: {
      title: 'Industrial Coating & Blasting Services | Russo NV',
      description: 'Surface preparation and protective coatings: industrial coating, abrasive blasting, corrosion protection, fireproofing, waterproofing and high-pressure jetting.',
      image: '/images/services1.jpg',
    },
  },
  '/services/industriele-schilderwerken': {
    NL: {
      title: 'Industriële schilderwerken Antwerpen & België | Russo NV',
      description: 'Industriële schilderwerken op staal, tanks en installaties — stralen, corrosiebescherming en beschermende coatings, op locatie in heel België. VCA & ISO gecertificeerd.',
      image: '/images/services5.jpg',
    },
    EN: {
      title: 'Industrial Painting & Coating Services Antwerp | Russo NV',
      description: 'Industrial painting and protective coating of steel, tanks and installations — blasting, corrosion protection and fireproofing, on-site across Belgium. VCA & ISO certified.',
      image: '/images/services5.jpg',
    },
  },
  '/industries': {
    NL: {
      title: 'Sectoren — Petrochemie, Maritiem, Voeding & Industrie | Russo NV',
      description: 'Russo NV levert beschermende coatings en oppervlaktevoorbehandeling voor petrochemie, maritieme sector, voedingsindustrie, productie, olie & gas, chemie en waterzuivering in heel België en de Benelux.',
      image: '/images/industries-hero.jpg',
    },
    EN: {
      title: 'Industries Served — Petrochemical, Marine, Food & Manufacturing | Russo NV',
      description: 'Russo NV delivers protective coating and surface preparation for petrochemical, marine, food production, manufacturing, oil & gas, chemical and water-treatment sectors across Europe.',
      image: '/images/industries-hero.jpg',
    },
  },
  '/projects': {
    NL: {
      title: 'Projectenportfolio — Industriële Coating & Stralen | Russo NV',
      description: 'Een selectie van grootschalige industriële coating-, straal- en beschermingsprojecten in Antwerpen, Gent en Zeebrugge — waaronder Sea Tank Terminal, GTS, CSP Zeebrugge, BNFW en ITC Rubis.',
      image: '/images/projects-hero.jpg',
    },
    EN: {
      title: 'Project Portfolio — Industrial Coating & Blasting | Russo NV',
      description: 'A selection of large-scale industrial coating, blasting and protection projects delivered in Antwerp, Ghent and Zeebrugge — including Sea Tank Terminal, GTS, CSP Zeebrugge, BNFW and ITC Rubis.',
      image: '/images/projects-hero.jpg',
    },
  },
  '/safety': {
    NL: {
      title: 'Veiligheid & Certificeringen — VCA, NACE, ISO Gecertificeerd | Russo NV',
      description: 'Russo NV werkt onder strikte veiligheidsnormen waaronder VCA petrochemie, NACE, SSPC, FROSIO en APAC certificeringen. Onze toewijding aan compliance beschermt elk project.',
      image: '/images/safety-hero.jpg',
    },
    EN: {
      title: 'Safety & Certifications — VCA, NACE, ISO Compliant | Russo NV',
      description: 'Russo NV operates under strict safety standards including VCA petrochemical, NACE, SSPC, FROSIO and APAC certifications. Our commitment to compliance protects every project.',
      image: '/images/safety-hero.jpg',
    },
  },
  '/about': {
    NL: {
      title: 'Over Russo NV — Specialist in Industriële Coatings in Antwerpen',
      description: 'Russo NV is een industrieel coating- en oppervlaktevoorbehandelingsbedrijf in Antwerpen, België, dat petrochemie-, maritieme en industriële klanten in heel Europa bedient met gecertificeerde expertise.',
      image: '/images/about-hero.jpg',
    },
    EN: {
      title: 'About Russo NV — Industrial Coating Specialists in Antwerp',
      description: 'Russo NV is an industrial coating and surface preparation company based in Antwerp, Belgium, serving petrochemical, marine and manufacturing clients across Europe with certified expertise.',
      image: '/images/about-hero.jpg',
    },
  },
  '/contact': {
    NL: {
      title: 'Contacteer Russo NV — Offertes voor Industriële Coatings | Antwerpen',
      description: 'Neem contact op met Russo NV voor offertes voor industriële coatings, stralen en brandwerende coatings. Taxandriastraat 35, 2170 Antwerpen. Bel +32 475 43 48 19 of vraag online een offerte aan.',
      image: '/images/contact-hero.jpg',
    },
    EN: {
      title: 'Contact Russo NV — Industrial Coating Quotes | Antwerp, Belgium',
      description: 'Get in touch with Russo NV for industrial coating, sandblasting and fireproofing quotes. Taxandriastraat 35, 2170 Antwerp. Call +32 475 43 48 19 or request a quote online.',
      image: '/images/contact-hero.jpg',
    },
  },
  '/insights': {
    NL: {
      title: 'Kenniscentrum — Industriële Coatings & Stralen | Russo NV',
      description: 'Praktische gidsen en expertise over industriële coatings, stralen, oppervlaktevoorbereiding en corrosiebescherming — van het team van Russo NV in Antwerpen.',
      image: '/images/services1.jpg',
    },
    EN: {
      title: 'Insights — Industrial Coating & Blasting Knowledge | Russo NV',
      description: 'Practical guides and expertise on industrial coating, blasting, surface preparation and corrosion protection — from the Russo NV team in Antwerp.',
      image: '/images/services1.jpg',
    },
  },
  '/privacy': {
    NL: {
      title: 'Privacybeleid | Russo NV',
      description: 'Hoe Russo NV persoonsgegevens verzamelt, opslaat en verwerkt die via onze website en contactformulieren worden ingediend.',
    },
    EN: {
      title: 'Privacy Policy | Russo NV',
      description: 'How Russo NV collects, stores and processes personal data submitted through our website and contact forms.',
    },
    noindex: true,
  },
  '/terms': {
    NL: {
      title: 'Algemene Voorwaarden | Russo NV',
      description: 'Algemene voorwaarden die van toepassing zijn op het gebruik van de Russo NV-website en onze diensten op het gebied van industriële coatings.',
    },
    EN: {
      title: 'Terms of Service | Russo NV',
      description: 'Terms of service governing the use of the Russo NV website and our industrial coating services.',
    },
    noindex: true,
  },
};

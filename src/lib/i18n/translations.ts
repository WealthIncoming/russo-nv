export type Language = 'EN' | 'NL';

export interface Translations {
  [key: string]: {
    [key: string]: string | { [key: string]: string };
  };
}

export const translations: Record<Language, Translations> = {
  EN: {
    // Navigation
    nav: {
      home: 'Home',
      services: 'Services',
      industries: 'Industries',
      projects: 'Projects',
      safety: 'Safety',
      about: 'About',
      contact: 'Contact',
    },
    // Header
    header: {
      callNow: 'Call Now',
    },
    // Footer
    footer: {
      quickLinks: 'Quick Links',
      ourServices: 'Our Services',
      contact: 'Contact',
      aboutUs: 'About Us',
      industrieServed: 'Industries Served',
      industrialPainting: 'Industrial Painting',
      sandblasting: 'Sandblasting',
      fireproofingCoatings: 'Fireproofing Coatings',
      protectiveCoatings: 'Protective Coatings',
      surfacePreparation: 'Surface Preparation',
      coatRemoval: 'Coat Removal',
      companyDescription: 'Leading industrial coating and surface preparation company serving Belgium and neighboring countries since 1994. Specialized in heavy industry solutions with strict safety compliance.',
      location: 'Antwerp, Belgium',
      servingRegion: 'Serving BE, NL, FR, DE, LU',
      certifiedCompliant: 'Certified & Compliant',
      vcaCertified: 'VCA Certified',
      naceCertified: 'NACE Certified',
      isoCertified: 'ISO Certified',
      safetyCompliant: 'Safety Compliant',
      allRightsReserved: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
    },
  // Home Page
  home: {
    heroTitle: 'Industrial Coating Excellence',
    heroSubtitle: 'Precision surface preparation and protective coatings for heavy industry',
    heroCtaMain: 'Get Started',
    heroCtaSecondary: 'View Portfolio',

    companyProfile: 'Company Profile',

    servicesTitle: 'Our Services',
    servicesSubtitle: 'Comprehensive industrial coating solutions',

    sandblastingTitle: 'Sandblasting',
    sandblastingDesc: 'Complete surface preparation ensuring optimal coating adhesion through advanced abrasive techniques.',

    fireproofingTitle: 'Fireproofing',
    fireproofingDesc: 'Application of intumescent and cementitious coatings to protect structural integrity during thermal exposure.',

    protectiveCoatingsTitle: 'Protective Coatings',
    protectiveCoatingsDesc: 'High-performance barrier systems designed to withstand extreme chemical and environmental aggression.',

    industrialPaintingTitle: 'Industrial Painting',
    industrialPaintingDesc: 'Large-scale aesthetic and functional coating application for factories, terminals, and infrastructure.',

    industrialWaterproofingTitle: 'Industrial Waterproofing',
    industrialWaterproofingDesc: 'Seamless industrial waterproofing using the Kemperol 2K-PUR system to protect containment areas, tank foundations, bund walls, and critical infrastructure from water ingress and harsh environmental exposure.',

    surfaceProfileCreation: 'Surface Profile Creation',
    rustScaleRemoval: 'Rust & Scale Removal',
    contaminantElimination: 'Contaminant Elimination',

    passiveFireProtection: 'Passive Fire Protection',
    hydrocarbonFireDefense: 'Hydrocarbon Fire Defense',
    thermalInsulation: 'Thermal Insulation',

    antiCorrosionSystems: 'Anti-Corrosion Systems',
    chemicalResistance: 'Chemical Resistance',
    uvProtection: 'UV Protection',

    airlessSpraying: 'Airless Spraying',
    corrosionProtection: 'Corrosion Protection',
    maintenancePainting: 'Maintenance Painting',

    bundContainmentSealing: 'Bund & Containment Sealing',
    tankFoundationWaterproofing: 'Tank Foundation Waterproofing',
    seamlessMembraneSystems: 'Seamless Liquid Membrane Systems',

    industriesTitle: 'Industries We Serve',
    industriesSubtitle: 'Trusted by leading companies across sectors',

    chemicalPlants: 'Chemical Plants',
    chemicalPlantsDesc: 'Acid-resistant lining & containment.',

    foodProduction: 'Food Production',
    foodProductionDesc: 'Hygienic, FDA-compliant surfacing.',

    storageTerminals: 'Storage Terminals',
    storageTerminalsDesc: 'Tank lining & exterior protection.',

    industrialConstruction: 'Industrial Construction',
    industrialConstructionDesc: 'Structural steel & pipeline coating.',

    warehouses: 'Warehouses',
    warehousesDesc: 'Floor systems & safety marking.',

    manufacturing: 'Manufacturing',
    manufacturingDesc: 'Heavy machinery & facility maintenance.',

    statsYearsExperience: 'Years Experience',
    statsSince: 'Since 1984',
    statsProjectsPerYear: 'PROJECTS PER YEAR',
    statsAveragePerYear: 'Average annually',
    statsProjectsCompleted: 'Projects Completed',
    statsIndustrialProjects: 'Industrial Projects',
    statsCountriesServed: 'Countries Served',
    statsEuRegion: 'EU Region',
    statsSafetyCertified: 'Safety Certified',
    statsVcaIso: 'VCA • Prevention Advisor',

    whyChooseUs: 'Why Choose Russo NV',
    whyChooseUsDesc: 'Decades of expertise combined with cutting-edge safety standards',

    expertise: 'Expertise',
    expertiseDesc: 'Three decades of specialized industrial coating experience',

    safety: 'Safety First',
    safetyDesc: 'VCA and ISO certified with zero-compromise safety protocols',

    quality: 'Quality Assurance',
    qualityDesc: 'Rigorous testing and compliance with international standards',

    reliability: 'Reliability',
    reliabilityDesc: 'Consistent delivery on time and within specification',

    recentProjects: 'Recent Projects',
    recentProjectsDesc: 'Showcasing our expertise across diverse industrial applications',

    viewProject: 'View Project',
    exploreMore: 'Explore More',

    engineeringDurability: 'LEADERS IN',
    durability: 'CORROSION PROTECTION',

    companyDescription: 'Russo NV stands at the intersection of industrial power and precision engineering. We don\'t just paint; we engineer longevity into the critical infrastructure that powers our world. From storage tanks in Antwerp to pipelines in Germany, our work is the first line of defense against corrosion.',

    safetyFirstTitle: 'Safety First',
    safetyFirstDesc: 'Strict adherence to VCA & NACE protocols ensures zero-incident operations in high-risk environments.',

    ourExpertise: 'Our Expertise',

    coreServices: 'CORE SERVICES',
    coreServicesDesc: 'Comprehensive surface treatment solutions tailored for the most demanding industrial environments.',

    viewAllServices: 'View All Services',

    industriesServed: 'INDUSTRIES SERVED',
    globalReach: 'GLOBAL REACH',
    sectors: 'Sectors',
    builtForHeavyIndustry: 'BUILT FOR HEAVY INDUSTRY',

    featuredProject: 'Featured Project',
    totalTankFarm: 'TOTAL TANK FARM',
    refurbishment: 'REFURBISHMENT',
    antwerpPort: 'ANTWERP PORT',
    duration18Months: 'Duration: 18 Months',

    projectDescription: 'Large-scale refurbishment project involving abrasive blasting, primer application, and a multi-coat epoxy protection system for critical tank farm infrastructure in the Port of Antwerp.',

    scope: 'Scope',
    scopeDesc: 'Full abrasive blasting, primer application, and multi-coat epoxy system for 12 storage tanks.',

    challenge: 'Challenge',
    challengeDesc: 'Strict environmental controls and continuous operation of adjacent facilities.',

    viewCaseStudy: 'View Case Study',

    readyToMobilize: 'READY TO MOBILIZE?',
    ctaDescription: 'Contact our engineering team for a detailed consultation and quote. We respond to all industrial inquiries within 24 hours.',

    requestQuote: 'Request Quote',
    callUsNow: 'Call Us Now',
    scroll: 'Scroll',
  },
    // Services Page
    services: {
      pageTitle: 'Industrial Coating Services',
      pageSubtitle: 'Comprehensive solutions for surface preparation and protective coatings',
      allServices: 'All Services',
      serviceDetails: 'Service Details',
      keyBenefits: 'Key Benefits',
      processOverview: 'Process Overview',
      targetIndustries: 'Target Industries',
      learnMore: 'Learn More',
    },
    // Industries Page
    industries: {
      pageTitle: 'Industries Served',
      pageSubtitle: 'Specialized solutions across diverse industrial sectors',
      industryOverview: 'Industry Overview',
      workDescription: 'Work Description',
      keyServices: 'Key Services',
      typicalClients: 'Typical Clients',
      learnMore: 'Learn More',
    },
    // Projects Page
    projects: {
      pageTitle: 'Project Portfolio',
      pageSubtitle: 'Showcasing our expertise and successful completions',
      projectDetails: 'Project Details',
      clientName: 'Client',
      location: 'Location',
      completionDate: 'Completion Date',
      viewDetails: 'View Details',
    },
    // Safety Page
    safety: {
      pageTitle: 'Safety & Compliance',
      pageSubtitle: 'Our commitment to the highest safety standards',
      safetyProtocols: 'Safety Protocols',
      certifications: 'Certifications',
      complianceStandards: 'Compliance Standards',
    },
    // About Page
    about: {
      pageTitle: 'About Russo NV',
      pageSubtitle: 'Three decades of industrial excellence',
      ourStory: 'Our Story',
      ourMission: 'Our Mission',
      ourValues: 'Our Values',
      learnMore: 'Learn More',
    },
    // Contact Page
    contact: {
      pageTitle: 'Get In Touch',
      pageSubtitle: 'We\'re here to help with your industrial coating needs',
      contactForm: 'Contact Form',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
      contactInfo: 'Contact Information',
      businessHours: 'Business Hours',
      mondayFriday: 'Monday - Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
    },
  },
  NL: {
    // Navigation
    nav: {
      home: 'Home',
      services: 'Diensten',
      industries: 'Industrieën',
      projects: 'Projecten',
      safety: 'Veiligheid',
      about: 'Over Ons',
      contact: 'Contact',
    },
    // Header
    header: {
      callNow: 'Bel Nu',
    },
    // Footer
    footer: {
      quickLinks: 'Snelle Links',
      ourServices: 'Onze Diensten',
      contact: 'Contact',
      aboutUs: 'Over Ons',
      industrieServed: 'Bediende Industrieën',
      industrialPainting: 'Industrieel Schilderen',
      sandblasting: 'Zandstralen',
      fireproofingCoatings: 'Brandwerende Coatings',
      protectiveCoatings: 'Beschermende Coatings',
      surfacePreparation: 'Oppervlaktebehandeling',
      coatRemoval: 'Coatingverwijdering',
      companyDescription: 'Toonaangevend bedrijf in industriële coating en oppervlaktebehandeling dat België en buurlanden sinds 1994 bedient. Gespecialiseerd in zware industrieoplossingen met strikte veiligheidsnaleving.',
      location: 'Antwerpen, België',
      servingRegion: 'Bedient BE, NL, FR, DE, LU',
      certifiedCompliant: 'Gecertificeerd & Conform',
      vcaCertified: 'VCA Gecertificeerd',
      naceCertified: 'NACE Gecertificeerd',
      isoCertified: 'ISO Gecertificeerd',
      safetyCompliant: 'Veiligheidsvoldoende',
      allRightsReserved: 'Alle rechten voorbehouden.',
      privacyPolicy: 'Privacybeleid',
      termsOfService: 'Servicevoorwaarden',
    },
    // Home Page
    home: {
      heroTitle: 'Industriële Coating Excellentie',
      heroSubtitle: 'Nauwkeurige oppervlaktebehandeling en beschermende coatings voor alle industrieën',
      heroCtaMain: 'Offerte aanvragen',
      heroCtaSecondary: 'Onze projecten',
      companyProfile: 'Bedrijfsprofiel',
      servicesTitle: 'Onze Diensten',
      servicesSubtitle: 'Uitgebreide industriële coatingoplossingen',
      sandblastingTitle: 'Zandstralen',
      sandblastingDesc: 'Volledige oppervlaktebehandeling die optimale coatingadhesie garandeert door geavanceerde abrasieve technieken.',
      fireproofingTitle: 'Brandwering',
      fireproofingDesc: 'Toepassing van intumescente en cementeuze coatings ter bescherming van structurele integriteit tijdens thermische blootstelling.',
      protectiveCoatingsTitle: 'Beschermende Coatings',
      protectiveCoatingsDesc: 'Hoogwaardige barrièresystemen ontworpen om extreme chemische en milieuaantasting te weerstaan.',
      industrialPaintingTitle: 'Industrieel Schilderen',
      industrialPaintingDesc: 'Grootschalige esthetische en functionele coatingtoepassing voor fabrieken, terminals en infrastructuur.',
      surfaceProfileCreation: 'Oppervlakteprofiel Creatie',
      rustScaleRemoval: 'Roest- & Schubverwijdering',
      contaminantElimination: 'Verwijdering van Verontreinigingen',
      passiveFireProtection: 'Passieve Brandbeveiliging',
      hydrocarbonFireDefense: 'Koolwaterstofbrandverdediging',
      thermalInsulation: 'Thermische Isolatie',
      antiCorrosionSystems: 'Anti-Corrosie Systemen',
      chemicalResistance: 'Chemische Resistentie',
      uvProtection: 'UV-Bescherming',
      airlessSpraying: 'Spuiten zonder Lucht',
      colorCodingSystems: 'Kleurcoderings Systemen',
      maintenancePainting: 'Onderhoudsschildering',
      industriesTitle: 'Industrieën die we Bedienen',
      industriesSubtitle: 'Vertrouwd door toonaangevende bedrijven in alle sectoren',
      chemicalPlants: 'Chemische Fabrieken',
      chemicalPlantsDesc: 'Zuurbestendig voering & beperking.',
      foodProduction: 'Voedselproductie',
      foodProductionDesc: 'Hygiënische, FDA-conforme oppervlakken.',
      storageTerminals: 'Opslagterminals',
      storageTerminalsDesc: 'Tankafdichting & buitenbescherming.',
      industrialConstruction: 'Industriële Constructie',
      industrialConstructionDesc: 'Constructiestaal & pijpleidingcoating.',
      warehouses: 'Magazijnen',
      warehousesDesc: 'Vloersystemen & veiligheidsmerkering.',
      manufacturing: 'Fabricage',
      manufacturingDesc: 'Zware machinerie & faciliteitsonderhoud.',
      statsYearsExperience: 'Jaren Ervaring',
      statsSince: 'Sinds 1984',
      statsProjectsPerYear: 'PROJECTEN PER JAAR',
      statsAveragePerYear: 'Gemiddeld per jaar',
      statsProjectsCompleted: 'PROJECTEN VOLTOOID',
      statsIndustrialProjects: 'Industriële projecten',
      statsCountriesServed: 'Landen Bediend',
      statsEuRegion: 'EU Regio',
      statsSafetyCertified: 'Veiligheidsgecertificeerd',
      statsVcaIso: 'VCA • Preventieadviseur',
      whyChooseUs: 'Waarom Russo NV Kiezen',
      whyChooseUsDesc: 'Decennia van expertise gecombineerd met geavanceerde veiligheidsnormen',
      expertise: 'Expertise',
      expertiseDesc: 'Drie decennia gespecialiseerde industriële coatingervaring',
      safety: 'Veiligheid Eerst',
      safetyDesc: 'VCA en ISO gecertificeerd met zero-compromise veiligheidsprotocollen',
      quality: 'Kwaliteitsborging',
      qualityDesc: 'Rigoureus testen en naleving van internationale normen',
      reliability: 'Betrouwbaarheid',
      reliabilityDesc: 'Consistente levering op tijd en volgens specificatie',
      recentProjects: 'Recente Projecten',
      recentProjectsDesc: 'Onze expertise tonen in diverse industriële toepassingen',
      viewProject: 'Project Bekijken',
      exploreMore: 'Meer Verkennen',
      engineeringDurability: 'LEIDEND IN',
      durability: 'CORROSIEBESCHERMING',
      companyDescription: 'Russo NV is een toonaangevende specialist in industriële oppervlaktevoorbereiding en hoogwaardige beschermende coatings voor alle soorten industriële oppervlakken. Wij leveren geavanceerde straal- en coatingsoplossingen die kritische installaties beschermen tegen corrosie, slijtage en zware omgevingsinvloeden.',
      safetyFirstTitle: 'Veiligheid Eerst',
      safetyFirstDesc: 'Strikte naleving van VCA- en preventieprotocollen garandeert een veilige uitvoering, zelfs in risicovolle omgevingen.',
      ourExpertise: 'Onze Expertise',
      coreServices: 'KERNSERVICES',
      coreServicesDesc: 'Uitgebreide oppervlaktebehandelingsoplossingen op maat voor de meest veeleisende industriële omgevingen.',
      viewAllServices: 'Alle Diensten Bekijken',
      industriesServed: 'BEDIENDE INDUSTRIEËN',
      globalReach: 'WERELDWIJD BEREIK',
      sectors: 'Sectoren',
      builtForHeavyIndustry: 'GEBOUWD VOOR ZWARE INDUSTRIE',
      featuredProject: 'Uitgelicht Project',
      totalTankFarm: 'TOTALE TANKBOERDERIJ',
      refurbishment: 'RENOVATIE',
      antwerpPort: 'HAVEN VAN ANTWERPEN',
      duration18Months: 'Duur: 18 Maanden',
      projectDescription: 'Grootschalig renovatieproject met abrasieve straling, primertoepassing en een multi-laags epoxyoxidebeschermingssysteem voor kritieke tankboerderijinfrastructuur in de haven van Antwerpen.',
      scope: 'Omvang',
      scopeDesc: 'Volledige abrasieve straling, primertoepassing en multi-laags epoxysysteem voor 12 opslagtanks.',
      challenge: 'Uitdaging',
      challengeDesc: 'Strikte milieucontroles en continue werking van aangrenzende faciliteiten.',
      viewCaseStudy: 'Casestudy Bekijken',
      readyToMobilize: 'KLAAR OM IN TE ZETTEN?',
      ctaDescription: 'Neem contact op met ons engineeringteam voor een gedetailleerd advies en offerte. We reageren op alle industriële vragen binnen 24 uur.',
      requestQuote: 'Offerte Aanvragen',
      callUsNow: 'Bel Ons Nu',
      scroll: 'Scroll',
    },
    // Services Page
    services: {
      pageTitle: 'Industriële Coatingdiensten',
      pageSubtitle: 'Uitgebreide oplossingen voor oppervlaktebehandeling en beschermende coatings',
      allServices: 'Alle Diensten',
      serviceDetails: 'Servicedetails',
      keyBenefits: 'Belangrijkste Voordelen',
      processOverview: 'Procesoverzicht',
      targetIndustries: 'Doelgerichte Industrieën',
      learnMore: 'Meer Informatie',
    },
    // Industries Page
    industries: {
      pageTitle: 'Bediende Industrieën',
      pageSubtitle: 'Gespecialiseerde oplossingen in diverse industriële sectoren',
      industryOverview: 'Industrieoverzicht',
      workDescription: 'Werkbeschrijving',
      keyServices: 'Belangrijkste Diensten',
      typicalClients: 'Typische Klanten',
      learnMore: 'Meer Informatie',
    },
    // Projects Page
    projects: {
      pageTitle: 'Projectportfolio',
      pageSubtitle: 'Onze expertise en succesvolle afronding tonen',
      projectDetails: 'Projectdetails',
      clientName: 'Klant',
      location: 'Locatie',
      completionDate: 'Voltooiingsdatum',
      viewDetails: 'Details Bekijken',
    },
    // Safety Page
    safety: {
      pageTitle: 'Veiligheid & Naleving',
      pageSubtitle: 'Onze inzet voor de hoogste veiligheidsnormen',
      safetyProtocols: 'Veiligheidsprotocollen',
      certifications: 'Certificeringen',
      complianceStandards: 'Nalevingsnormen',
    },
    // About Page
    about: {
      pageTitle: 'Over Russo NV',
      pageSubtitle: 'Drie decennia industriële excellentie',
      ourStory: 'Ons Verhaal',
      ourMission: 'Onze Missie',
      ourValues: 'Onze Waarden',
      learnMore: 'Meer Informatie',
    },
    // Contact Page
    contact: {
      pageTitle: 'Neem Contact Op',
      pageSubtitle: 'We zijn hier om u te helpen met uw industriële coatingbehoeften',
      contactForm: 'Contactformulier',
      name: 'Naam',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      message: 'Bericht',
      send: 'Bericht Verzenden',
      sending: 'Verzenden...',
      contactInfo: 'Contactgegevens',
      businessHours: 'Kantooruren',
      mondayFriday: 'Maandag - Vrijdag',
      saturday: 'Zaterdag',
      sunday: 'Zondag',
    },
  },
};

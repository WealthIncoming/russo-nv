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
      companyDescription:
        'Leading industrial coating and surface preparation company serving Belgium and neighboring countries since 1994. Specialized in heavy industry solutions with strict safety compliance.',
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
      sandblastingDesc:
        'Complete surface preparation ensuring optimal coating adhesion through advanced abrasive techniques.',

      fireproofingTitle: 'Fireproofing',
      fireproofingDesc:
        'Application of intumescent and cementitious coatings to protect structural integrity during thermal exposure.',

      protectiveCoatingsTitle: 'Protective Coatings',
      protectiveCoatingsDesc:
        'High-performance barrier systems designed to withstand extreme chemical and environmental aggression.',

      industrialPaintingTitle: 'Industrial Painting',
      industrialPaintingDesc:
        'Large-scale aesthetic and functional coating application for factories, terminals, and infrastructure.',

      industrialWaterproofingTitle: 'Industrial Waterproofing',
      industrialWaterproofingDesc:
        'Seamless industrial waterproofing using the Kemperol 2K-PUR system to protect containment areas, tank foundations, bund walls, and critical infrastructure from water ingress and harsh environmental exposure.',

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
      chemicalProtection: 'Chemical Protection',

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

      companyDescription:
        "Russo NV stands at the intersection of industrial power and precision engineering. We don't just paint; we engineer longevity into the critical infrastructure that powers our world. From storage tanks in Antwerp to pipelines in Germany, our work is the first line of defense against corrosion.",

      safetyFirstTitle: 'Safety First',
      safetyFirstDesc:
        'Strict adherence to VCA & NACE protocols ensures zero-incident operations in high-risk environments.',

      ourExpertise: 'Our Expertise',

      coreServices: 'CORE SERVICES',
      coreServicesDesc:
        'Comprehensive surface treatment solutions tailored for the most demanding industrial environments.',

      viewAllServices: 'View All Services',

      industriesServed: 'INDUSTRIES SERVED',
      globalReach: 'GLOBAL REACH',
      sectors: 'Sectors',
      builtForHeavyIndustry: 'BUILT FOR ALL INDUSTRY',
      builtFor: 'BUILT FOR',
      allIndustry: 'ALL INDUSTRY',

      featuredProject: 'Featured Project',
      totalTankFarm: 'TOTAL TANK FARM',
      refurbishment: 'REFURBISHMENT',
      antwerpPort: 'ANTWERP PORT',
      duration18Months: 'Duration: 18 Months',

      projectDescription:
        'Large-scale refurbishment project involving abrasive blasting, primer application, and a multi-coat epoxy protection system for critical tank farm infrastructure in the Port of Antwerp.',

      scope: 'Scope',
      scopeDesc:
        'Full abrasive blasting, primer application, and multi-coat epoxy system for 12 storage tanks.',

      challenge: 'Challenge',
      challengeDesc:
        'Strict environmental controls and continuous operation of adjacent facilities.',

      viewCaseStudy: 'View Case Study',

      readyToMobilize: 'READY TO MOBILIZE',
      ctaDescription:
        'Contact our engineering team for a detailed consultation and quote. We respond to all industrial inquiries within 24 hours.',

      requestQuote: 'Request Quote',
      callUsNow: 'Call Us Now',
      scroll: 'Scroll',
    },

    // Services Page UI
    services: {
      pageTitle: 'Industrial Coating Services',
      pageSubtitle: 'Comprehensive solutions for surface preparation and protective coatings',
      allServices: 'All Services',
      serviceDetails: 'Service Details',
      keyBenefits: 'Key Benefits',
      processOverview: 'Process Overview',
      targetIndustries: 'Target Industries',
      learnMore: 'Learn More',
      emptyState: 'No services available at the moment.',
      ctaTitleLine1: 'NEED A',
      ctaTitleHighlight: 'CUSTOM',
      ctaTitleLine2: 'SOLUTION?',
      ctaDescription:
        'Our team can develop tailored coating solutions for your specific industrial requirements',
    },

    // Services CMS Content
    servicesCms: {
      hpwjTitle: 'High-Pressure Water Jetting',
      hpwjDescription:
        'Utilizing state-of-the-art high-pressure water jetting technology, we offer efficient and environmentally friendly solutions for industrial cleaning, surface preparation, and material removal. This method is ideal for descaling, paint stripping, concrete hydro-demolition, and cleaning heat exchangers, tanks, and pipelines, providing a powerful yet non-abrasive alternative to traditional methods.',
      hpwjKeyBenefits:
        'Environmentally friendly (no chemicals), non-damaging to substrates, highly effective for stubborn deposits, precise cleaning, reduces dust and debris, safe for hazardous environments.',
      heroLine1: 'Industrial',
      heroLine2: 'Services',
      hpwjProcessOverview:
        'Safety setup and containment, selection of appropriate pressure and nozzle type, controlled water jetting application, debris collection and disposal, post-cleaning inspection.',
      hpwjTargetIndustries:
        'Refineries, Petrochemical, Marine, Pulp & Paper, Utilities, Food Processing, Construction',

      waterproofingTitle: 'Waterproofing (Kemperol System)',
      waterproofingDescription:
        'Our industrial waterproofing services using the Kemperol 2K-PUR system provide seamless protection for containment areas, tank foundations, bund walls, sumps, and critical infrastructure exposed to water and chemical infiltration. The reinforced liquid membrane forms a fully bonded waterproof barrier that conforms to complex geometries, joints, penetrations, and structural details without seams.\n\nThis cold-applied system offers excellent resistance to standing water, weather exposure, and aggressive industrial environments. By creating a flexible and durable membrane, Kemperol 2K-PUR protects structural substrates from moisture ingress, deterioration, and long-term damage in demanding industrial facilities.',
      waterproofingKeyBenefits:
        'Seamless waterproof protection for containment areas and bunds, excellent adhesion to concrete and steel substrates, highly flexible crack-bridging membrane, resistant to standing water and harsh environmental conditions, long-term protection for industrial infrastructure.',
      waterproofingProcessOverview:
        'Inspection and preparation of concrete or steel substrates, cleaning and repair of damaged areas where necessary, application of primer and reinforcement fleece, installation of Kemperol 2K-PUR liquid membrane to create a seamless bonded system, curing and final inspection for quality assurance.',
      waterproofingTargetIndustries:
        'Oil & Gas, Petrochemical, Tank Storage Terminals, Chemical Processing, Industrial Facilities, Infrastructure, Energy & Utilities',

      industrialCoatingApplicationTitle: 'Industrial Coating Application',
      industrialCoatingApplicationDescription:
        'We specialize in the professional application of high-performance industrial coatings designed to protect assets from corrosion, abrasion, chemical attack, and extreme temperatures. Our expertise covers a broad spectrum of coatings, including epoxies, polyurethanes, zinc-rich primers, and specialized linings, ensuring long-term durability and reduced maintenance costs for critical infrastructure and equipment.',
      industrialCoatingApplicationKeyBenefits:
        'Enhanced asset protection, extended equipment lifespan, reduced maintenance costs, improved operational safety, compliance with industry standards, aesthetic improvement.',
      industrialCoatingApplicationProcessOverview:
        'Comprehensive surface preparation (often via blasting), primer application, intermediate coat application (if required), final topcoat application, quality control checks including film thickness and adhesion testing, curing and final inspection.',
      industrialCoatingApplicationTargetIndustries:
        'Petrochemical, Marine, Food & Beverage, Pharmaceutical, Automotive, Mining, Water Treatment',

      corrosionProtectionTitle: 'Corrosion Protection Services',
      corrosionProtectionDescription:
        'Beyond standard coatings, our specialized corrosion protection services address complex challenges in highly corrosive environments. This includes cathodic protection system installation and maintenance, specialized lining applications for tanks and pipes, and comprehensive corrosion surveys and mitigation strategies. We provide tailored solutions to combat various forms of corrosion, ensuring the long-term integrity of critical assets.',
      corrosionProtectionKeyBenefits:
        'Prevents premature asset failure, extends operational life, reduces costly repairs, ensures regulatory compliance, enhances safety, optimizes asset performance.',
      corrosionProtectionProcessOverview:
        'Detailed corrosion assessment and analysis, development of a customized protection plan, surface preparation, application of specialized protective systems (e.g., linings, wraps, CP components), ongoing monitoring and maintenance.',
      corrosionProtectionTargetIndustries:
        'Oil & Gas Pipelines, Marine Vessels, Chemical Storage, Wastewater Treatment, Infrastructure (bridges, jetties), Mining',

      fireproofingThermalTitle: 'Fireproofing & Thermal Insulation',
      fireproofingThermalDescription:
        'Our fireproofing and thermal insulation services are crucial for protecting structural steel, vessels, and critical equipment from the devastating effects of fire and extreme temperatures. We apply passive fire protection (PFP) materials, such as intumescent coatings and cementitious sprays, to meet stringent fire resistance ratings, and provide thermal insulation solutions to optimize energy efficiency and process control.',
      fireproofingThermalKeyBenefits:
        'Increased structural integrity during fire, enhanced personnel safety, compliance with fire safety regulations, reduced energy consumption, process temperature stability, asset protection from heat.',
      fireproofingThermalProcessOverview:
        'Site assessment and material selection based on fire rating requirements, surface preparation, application of fireproofing or insulation material (spray, trowel, or wrap), curing, thickness verification, and final inspection.',
      fireproofingThermalTargetIndustries:
        'Oil & Gas, Chemical Plants, Commercial Buildings, Power Generation, Manufacturing, Data Centers',

      sandblastingAbrasiveTitle: 'Sandblasting & Abrasive Blasting',
      sandblastingAbrasiveDescription:
        'Our sandblasting and abrasive blasting services provide superior surface preparation for a wide range of industrial applications. We utilize various abrasive media, including sand, grit, and specialized beads, to effectively remove rust, old coatings, scale, and contaminants, creating an optimal profile for subsequent coatings or treatments. This ensures maximum adhesion and longevity of new protective layers.',
      sandblastingAbrasiveKeyBenefits:
        'Achieves optimal surface profile for coating adhesion, removes stubborn contaminants, extends coating lifespan, prepares surfaces for inspection and repair, versatile for various materials.',
      sandblastingAbrasiveProcessOverview:
        'Initial surface assessment and masking of sensitive areas, selection of appropriate abrasive media and pressure, controlled blasting to achieve desired surface profile (e.g., SSPC-SP standards), thorough cleaning and dust removal, final inspection.',
      sandblastingAbrasiveTargetIndustries:
        'Oil & Gas, Marine, Manufacturing, Construction, Infrastructure, Chemical Processing, Power Generation',
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
      pageSubtitle: "We're here to help with your industrial coating needs",
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
      companyDescription:
        'Toonaangevend bedrijf in industriële coating en oppervlaktebehandeling dat België en buurlanden sinds 1994 bedient. Gespecialiseerd in zware industrieoplossingen met strikte veiligheidsnaleving.',
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
      heroTitle: 'Industriële Coatingexpertise',
      heroSubtitle:
        'Nauwkeurige oppervlaktebehandeling en beschermende coatings voor alle industrieën',
      heroCtaMain: 'Offerte aanvragen',
      heroCtaSecondary: 'Onze projecten',

      companyProfile: 'Bedrijfsprofiel',

      servicesTitle: 'Onze Diensten',
      servicesSubtitle: 'Uitgebreide industriële coatingoplossingen',

      sandblastingTitle: 'Zandstralen',
      sandblastingDesc:
        'Volledige oppervlaktevoorbereiding die optimale coatinghechting garandeert met geavanceerde straaltechnieken.',

      fireproofingTitle: 'Brandwering',
      fireproofingDesc:
        'Toepassing van intumescente en cementeuze coatings ter bescherming van de structurele integriteit bij thermische belasting.',

      protectiveCoatingsTitle: 'Beschermende Coatings',
      protectiveCoatingsDesc:
        'Hoogwaardige barrièresystemen ontworpen om extreme chemische belasting en zware omgevingsinvloeden te weerstaan.',

      industrialPaintingTitle: 'Industrieel Schilderwerk',
      industrialPaintingDesc:
        'Grootschalige esthetische en functionele coatingtoepassingen voor fabrieken, terminals en infrastructuur.',

      industrialWaterproofingTitle: 'Industriële Waterdichting',
      industrialWaterproofingDesc:
        'Naadloze industriële waterdichting met het Kemperol 2K-PUR systeem voor bescherming van opvangzones, tankfunderingen, bundwanden en kritische infrastructuur tegen waterinsijpeling en zware omgevingsinvloeden.',

      surfaceProfileCreation: 'Opbouw van Oppervlakteprofiel',
      rustScaleRemoval: 'Roest- en walshuidverwijdering',
      contaminantElimination: 'Verwijdering van Verontreinigingen',

      passiveFireProtection: 'Passieve Brandbescherming',
      hydrocarbonFireDefense: 'Bescherming tegen Koolwaterstofbranden',
      thermalInsulation: 'Thermische Isolatie',

      antiCorrosionSystems: 'Anticorrosiesystemen',
      chemicalResistance: 'Chemische Bestendigheid',
      uvProtection: 'UV-Bescherming',

      airlessSpraying: 'Airless Spuiten',
      corrosionProtection: 'Corrosiebescherming',
      chemicalProtection: 'Chemische Bescherming',

      bundContainmentSealing: 'Afdichting van Bunds en Opvangzones',
      tankFoundationWaterproofing: 'Waterdichting van Tankfunderingen',
      seamlessMembraneSystems: 'Naadloze Vloeibare Membraansystemen',

      industriesTitle: 'Industrieën die Wij Bedienen',
      industriesSubtitle: 'Vertrouwd door toonaangevende bedrijven in diverse sectoren',

      chemicalPlants: 'Chemische Installaties',
      chemicalPlantsDesc: 'Zuurbestendige bekleding en opvangsystemen.',

      foodProduction: 'Voedingsindustrie',
      foodProductionDesc: 'Hygiënische, FDA-conforme oppervlakken.',

      storageTerminals: 'Opslagterminals',
      storageTerminalsDesc: 'Tankbekleding en uitwendige bescherming.',

      industrialConstruction: 'Industriële Bouw',
      industrialConstructionDesc: 'Coatings voor constructiestaal en pijpleidingen.',

      warehouses: 'Magazijnen',
      warehousesDesc: 'Vloersystemen en veiligheidsmarkeringen.',

      manufacturing: 'Productie',
      manufacturingDesc: 'Onderhoud van zware machines en industriële installaties.',

      statsYearsExperience: 'Jaren Ervaring',
      statsSince: 'Sinds 1984',
      statsProjectsPerYear: 'PROJECTEN PER JAAR',
      statsAveragePerYear: 'Gemiddeld per jaar',
      statsProjectsCompleted: 'PROJECTEN VOLTOOID',
      statsIndustrialProjects: 'Industriële projecten',
      statsCountriesServed: 'LANDEN BEDIEND',
      statsEuRegion: 'EU-regio',
      statsSafetyCertified: 'VEILIGHEIDSGECERTIFICEERD',
      statsVcaIso: 'VCA • Preventieadviseur',

      whyChooseUs: 'Waarom Kiezen voor Russo NV',
      whyChooseUsDesc:
        'Technische expertise gecombineerd met geavanceerde veiligheidsnormen',

      expertise: 'Expertise',
      expertiseDesc: 'Gespecialiseerde ervaring in industriële oppervlaktebehandeling en coatings',

      safety: 'Veiligheid Eerst',
      safetyDesc: 'VCA-conforme uitvoering met strikte veiligheidsprotocollen',

      quality: 'Kwaliteitsborging',
      qualityDesc: 'Strenge controles en naleving van industriële normen',

      reliability: 'Betrouwbaarheid',
      reliabilityDesc: 'Consistente uitvoering op tijd en volgens specificatie',

      recentProjects: 'Recente Projecten',
      recentProjectsDesc:
        'Een selectie van projecten die onze expertise in diverse industriële toepassingen tonen',

      viewProject: 'Project Bekijken',
      exploreMore: 'Meer Ontdekken',

      engineeringDurability: 'LEIDEND IN',
      durability: 'CORROSIE\u00ADBESCHERMING',

      companyDescription:
        'Russo NV is een toonaangevende specialist in industriële oppervlaktevoorbereiding en hoogwaardige beschermende coatings voor alle soorten industriële oppervlakken. Wij leveren geavanceerde straal- en coatingsoplossingen die kritische installaties beschermen tegen corrosie, slijtage en zware omgevingsinvloeden.',

      safetyFirstTitle: 'Veiligheid Eerst',
      safetyFirstDesc:
        'Strikte naleving van VCA- en preventieprotocollen garandeert een veilige uitvoering, zelfs in risicovolle omgevingen.',

      ourExpertise: 'Onze Expertise',

      coreServices: 'KERNDIENSTEN',
      coreServicesDesc:
        'Uitgebreide oplossingen voor oppervlaktebehandeling, afgestemd op de meest veeleisende industriële omgevingen.',

      viewAllServices: 'Alle Diensten Bekijken',

      industriesServed: 'BEDIENDE INDUSTRIEËN',
      globalReach: 'WERKTERREIN',
      sectors: 'Sectoren',
      builtForHeavyIndustry: 'VOOR ALLE INDUSTRIËN',
      builtFor: 'VOOR',
      allIndustry: 'ALLE INDUSTRIËN',

      featuredProject: 'Uitgelicht Project',
      totalTankFarm: 'TOTALE TANKPARK',
      refurbishment: 'RENOVATIE',
      antwerpPort: 'HAVEN VAN ANTWERPEN',
      duration18Months: 'Duur: 18 maanden',

      projectDescription:
        'Grootschalig renovatieproject met abrasief stralen, primertoepassing en een meerlaags epoxybeschermingssysteem voor kritieke tankparkinfrastructuur in de haven van Antwerpen.',

      scope: 'Omvang',
      scopeDesc:
        'Volledig abrasief straalwerk, primertoepassing en een meerlaags epoxysysteem voor 12 opslagtanks.',

      challenge: 'Uitdaging',
      challengeDesc:
        'Strikte milieueisen en continue werking van aangrenzende installaties.',

      viewCaseStudy: 'Casestudy Bekijken',

      readyToMobilize: 'KLAAR OM TE STARTEN',
      ctaDescription:
        'Neem contact op met ons engineeringteam voor een gedetailleerd advies en offerte. Wij reageren op alle industriële aanvragen binnen 24 uur.',

      requestQuote: 'Offerte Aanvragen',
      callUsNow: 'Bel Ons Nu',
      scroll: 'Scroll',
    },

    // Services Page UI
    services: {
      pageTitle: 'Industriële Coatingdiensten',
      pageSubtitle:
        'Uitgebreide oplossingen voor oppervlaktebehandeling en beschermende coatings',
      allServices: 'Alle Diensten',
      serviceDetails: 'Servicedetails',
      keyBenefits: 'Belangrijkste Voordelen',
      processOverview: 'Procesoverzicht',
      targetIndustries: 'Doelindustrieën',
      heroLine1: 'Industriële',
      heroLine2: 'Diensten',
      learnMore: 'Meer Informatie',
      emptyState: 'Er zijn momenteel geen diensten beschikbaar.',
      ctaTitleLine1: 'EEN',
      ctaTitleHighlight: 'OPLOSSING',
      ctaTitleLine2: 'OP MAAT NODIG?',
      ctaDescription:
        'Ons team ontwikkelt coatingoplossingen op maat voor uw specifieke industriële vereisten',
    },

    // Services CMS Content
    servicesCms: {
      hpwjTitle: 'Hogedruk Waterjetting',
      hpwjDescription:
        'Met behulp van geavanceerde hogedruk-waterjettingtechnologie bieden wij efficiënte en milieuvriendelijke oplossingen voor industriële reiniging, oppervlaktevoorbereiding en materiaalverwijdering. Deze methode is ideaal voor het verwijderen van kalkaanslag, verf, betonhydrodemolitie en het reinigen van warmtewisselaars, tanks en leidingen, als krachtig maar niet-abrasief alternatief voor traditionele methoden.',
      hpwjKeyBenefits:
        'Milieuvriendelijk (zonder chemicaliën), beschadigt de ondergrond niet, zeer doeltreffend tegen hardnekkige afzettingen, nauwkeurige reiniging, minder stof en afval, veilig voor risicovolle omgevingen.',
      hpwjProcessOverview:
        'Veiligheidsmaatregelen en afscherming, keuze van de juiste druk en nozzle, gecontroleerde waterjettingtoepassing, opvang en afvoer van afval, inspectie na de reiniging.',
      hpwjTargetIndustries:
        'Raffinaderijen, petrochemie, maritieme sector, pulp en papier, nutsvoorzieningen, voedingsindustrie, bouw',

      waterproofingTitle: 'Waterdichting (Kemperol-systeem)',
      waterproofingDescription:
        'Onze industriële waterdichtingsdiensten met het Kemperol 2K-PUR-systeem bieden naadloze bescherming voor opvangzones, tankfunderingen, bundwanden, putten en kritieke infrastructuur die blootgesteld wordt aan water- en chemische indringing. Het versterkte vloeibare membraan vormt een volledig gehechte waterdichte barrière die zich zonder naden aanpast aan complexe vormen, voegen, doorvoeren en constructiedetails.\n\nDit koud aangebrachte systeem biedt uitstekende weerstand tegen stilstaand water, weersinvloeden en agressieve industriële omgevingen. Door een flexibel en duurzaam membraan te creëren, beschermt Kemperol 2K-PUR constructieve ondergronden tegen vochtindringing, aantasting en langdurige schade in veeleisende industriële installaties.',
      waterproofingKeyBenefits:
        'Naadloze waterdichte bescherming voor opvangzones en bunds, uitstekende hechting op beton en staal, zeer flexibel scheuroverbruggend membraan, bestand tegen stilstaand water en zware omgevingsomstandigheden, langdurige bescherming van industriële infrastructuur.',
      waterproofingProcessOverview:
        'Inspectie en voorbereiding van betonnen of stalen ondergronden, reiniging en herstel van beschadigde zones waar nodig, aanbrengen van primer en wapeningsvlies, installatie van het Kemperol 2K-PUR-vloeibaar membraan als naadloos gehecht systeem, uitharding en eindinspectie voor kwaliteitsborging.',
      waterproofingTargetIndustries:
        'Olie en gas, petrochemie, tankopslagterminals, chemische verwerking, industriële installaties, infrastructuur, energie en nutsvoorzieningen',

      industrialCoatingApplicationTitle: 'Industriële Coatingtoepassing',
      industrialCoatingApplicationDescription:
        'Wij zijn gespecialiseerd in de professionele applicatie van hoogwaardige industriële coatings die installaties beschermen tegen corrosie, slijtage, chemische aantasting en extreme temperaturen. Onze expertise omvat een breed gamma coatings, waaronder epoxy’s, polyurethanen, zinkrijke primers en gespecialiseerde linings, met langdurige duurzaamheid en lagere onderhoudskosten voor kritieke infrastructuur en uitrusting als resultaat.',
      industrialCoatingApplicationKeyBenefits:
        'Betere bescherming van installaties, langere levensduur van apparatuur, lagere onderhoudskosten, hogere operationele veiligheid, conformiteit met industrienormen, esthetische verbetering.',
      industrialCoatingApplicationProcessOverview:
        'Volledige oppervlaktevoorbereiding (vaak via stralen), aanbrengen van primer, tussenlaag indien nodig, afwerkingslaag, kwaliteitscontroles zoals laagdiktemeting en hechtingstesten, uitharding en eindinspectie.',
      industrialCoatingApplicationTargetIndustries:
        'Petrochemie, maritieme sector, voeding en dranken, farmaceutische industrie, automotive, mijnbouw, waterbehandeling',

      corrosionProtectionTitle: 'Corrosiebeschermingsdiensten',
      corrosionProtectionDescription:
        'Naast standaardcoatings pakken onze gespecialiseerde corrosiebeschermingsdiensten complexe uitdagingen aan in sterk corrosieve omgevingen. Dit omvat de installatie en het onderhoud van kathodische beschermingssystemen, gespecialiseerde liningtoepassingen voor tanks en leidingen, en uitgebreide corrosie-inspecties en mitigatiestrategieën. Wij bieden oplossingen op maat om verschillende vormen van corrosie te bestrijden en de integriteit van kritieke assets op lange termijn te waarborgen.',
      corrosionProtectionKeyBenefits:
        'Voorkomt vroegtijdig falen van assets, verlengt de operationele levensduur, verlaagt dure herstellingen, garandeert naleving van regelgeving, verhoogt de veiligheid, optimaliseert de prestaties van installaties.',
      corrosionProtectionProcessOverview:
        'Gedetailleerde corrosiebeoordeling en analyse, ontwikkeling van een beschermingsplan op maat, oppervlaktevoorbereiding, applicatie van gespecialiseerde beschermingssystemen (zoals linings, wraps en CP-componenten), voortdurende monitoring en onderhoud.',
      corrosionProtectionTargetIndustries:
        'Olie- en gasleidingen, maritieme vaartuigen, chemische opslag, afvalwaterbehandeling, infrastructuur (bruggen, steigers), mijnbouw',

      fireproofingThermalTitle: 'Brandwering en Thermische Isolatie',
      fireproofingThermalDescription:
        'Onze diensten op het vlak van brandwering en thermische isolatie zijn cruciaal voor de bescherming van constructiestaal, vaten en kritieke apparatuur tegen de verwoestende effecten van brand en extreme temperaturen. Wij brengen passieve brandbeschermingsmaterialen (PFP) aan, zoals intumescente coatings en cementeuze sprays, om te voldoen aan strenge brandweerstandsvereisten, en leveren thermische isolatieoplossingen om energie-efficiëntie en procesbeheersing te optimaliseren.',
      fireproofingThermalKeyBenefits:
        'Hogere structurele integriteit tijdens brand, verbeterde veiligheid van personeel, conformiteit met brandveiligheidsvoorschriften, lager energieverbruik, stabiele procestemperaturen, bescherming van installaties tegen hitte.',
      fireproofingThermalProcessOverview:
        'Sitebeoordeling en materiaalkeuze op basis van de vereiste brandweerstand, oppervlaktevoorbereiding, aanbrengen van brandwerend of isolerend materiaal (spuiten, troffelen of wikkelen), uitharding, diktecontrole en eindinspectie.',
      fireproofingThermalTargetIndustries:
        'Olie en gas, chemische installaties, commerciële gebouwen, energieopwekking, productie, datacenters',

      sandblastingAbrasiveTitle: 'Zandstralen en Abrasief Stralen',
      sandblastingAbrasiveDescription:
        'Onze diensten voor zandstralen en abrasief stralen bieden een hoogwaardige oppervlaktevoorbereiding voor uiteenlopende industriële toepassingen. Wij gebruiken verschillende straalmiddelen, waaronder zand, grit en gespecialiseerde korrels, om roest, oude coatings, walshuid en verontreinigingen doeltreffend te verwijderen en een optimaal profiel te creëren voor daaropvolgende coatings of behandelingen. Dit garandeert maximale hechting en een langere levensduur van nieuwe beschermlagen.',
      sandblastingAbrasiveKeyBenefits:
        'Creëert een optimaal oppervlakteprofiel voor coatinghechting, verwijdert hardnekkige verontreinigingen, verlengt de levensduur van coatings, bereidt oppervlakken voor op inspectie en herstel, veelzijdig inzetbaar voor diverse materialen.',
      sandblastingAbrasiveProcessOverview:
        'Initiële oppervlakbeoordeling en afscherming van gevoelige zones, keuze van het juiste straalmiddel en de juiste druk, gecontroleerd stralen om het gewenste oppervlakteprofiel te bereiken (bijv. volgens SSPC-SP-normen), grondige reiniging en stofverwijdering, eindinspectie.',
      sandblastingAbrasiveTargetIndustries:
        'Olie en gas, maritieme sector, productie, bouw, infrastructuur, chemische verwerking, energieopwekking',
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

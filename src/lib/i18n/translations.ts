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
      heroLine1: 'Industrial',
      heroLine2: 'Services',
    },

    // Services CMS Content
    servicesCms: {
      hpwjTitle: 'High-Pressure Water Jetting',
      hpwjDescription:
        'Utilizing state-of-the-art high-pressure water jetting technology, we offer efficient and environmentally friendly solutions for industrial cleaning, surface preparation, and material removal. This method is ideal for descaling, paint stripping, concrete hydro-demolition, and cleaning heat exchangers, tanks, and pipelines, providing a powerful yet non-abrasive alternative to traditional methods.',
      hpwjKeyBenefits:
        'Environmentally friendly (no chemicals), non-damaging to substrates, highly effective for stubborn deposits, precise cleaning, reduces dust and debris, safe for hazardous environments.',
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

      coatingInspectionTitle: 'Coating Inspection',
      coatingInspectionDescription:
        'Our coating inspection services ensure that all applied protective coatings meet the highest industry standards for quality, performance, and durability. We conduct thorough inspections at every stage of the coating process, from surface preparation to final curing, using certified inspectors and advanced testing equipment. Our services include dry film thickness (DFT) measurement, adhesion testing, holiday detection, and visual inspections to verify compliance with project specifications and international standards such as ISO and NACE.',
      coatingInspectionKeyBenefits:
        'Ensures coating quality and compliance with specifications, prevents premature coating failure, improves asset longevity, supports regulatory and client requirements, reduces costly rework, provides documented quality assurance.',
      coatingInspectionProcessOverview:
        'Pre-inspection planning and review of specifications, verification of surface preparation standards, in-process inspection during coating application, testing (DFT, adhesion, holiday detection), documentation and reporting, final inspection and handover.',
      coatingInspectionTargetIndustries:
        'Oil & Gas, Petrochemical, Marine, Infrastructure, Power Generation, Manufacturing, Water Treatment',
    },

    // Industries Page
    industries: {
      pageTitle: 'Industries Served',
      pageSubtitle: 'Specialized solutions across diverse industrial sectors',
      heroLabel: 'Our Reach',
      heroLine1: 'Industries',
      heroLine2: 'We Serve',
      heroDescription: 'Trusted by major industrial sectors across Europe, delivering specialized coating solutions wherever they are needed',
      industryOverview: 'Industry Overview',
      workDescription: 'Our Work',
      keyServices: 'Key Services',
      typicalClients: 'Typical Clients',
      learnMore: 'Learn More',
      emptyState: 'No industries information available at the moment.',
      coverageTitleLine1: 'European',
      coverageTitleHighlight: 'Coverage',
      coverageDescription: 'Based in Antwerp, Belgium — serving industrial clients across all of Europe with local expertise and international standards',
      coverageHeadquarters: 'Headquarters',
      coverageHeadquartersValue: 'Antwerp, Belgium',
      coverageOperations: 'Operations',
      coverageOperationsValue: 'All of Europe',
      coverageCertifications: 'Certifications',
      coverageCertificationsValue: 'VCA • NACE • ISO',
      coverageAvailability: 'Availability',
      coverageAvailabilityValue: '24/7 Project Support',
      ctaTitleLine1: 'Your Industry',
      ctaTitleHighlight: 'Our Expertise',
      ctaDescription: 'Contact us to discuss how we can support your industrial coating needs — anywhere in Europe',
      ctaButton: 'Get In Touch',
    },

    // Industries CMS Content
    industriesCms: {
      marineTitle: 'Marine & Offshore',
      marineOverview: 'The marine and offshore sector requires robust protection against saltwater corrosion, abrasion, and harsh weather. Our specialized coatings ensure the integrity and longevity of vessels and offshore structures.',
      marineWorkDescription: 'Our services include coating ship hulls, decks, ballast tanks, offshore rigs, and port infrastructure. We utilize advanced anti-fouling coatings, marine epoxies, and tank linings, coupled with ultra-high pressure (UHP) water blasting for superior surface preparation.',
      marineKeyServices: 'Anti-fouling coatings, marine epoxies, ballast tank linings, cargo tank coatings, UHP water blasting, surface preparation to NACE/SSPC standards, deck coatings, splash zone protection.',
      marineTypicalClients: 'Shipyards, commercial shipping companies, offshore drilling companies, port authorities, naval vessels, ferry operators.',

      foodTitle: 'Food & Beverage',
      foodOverview: 'Maintaining hygienic, safe, and durable surfaces is paramount in the food and beverage industry. Our coatings comply with strict regulatory standards, preventing contamination and ensuring operational efficiency.',
      foodWorkDescription: 'We apply FDA-compliant and USDA-approved coatings for floors, walls, ceilings, and processing equipment. Our services focus on creating seamless, easy-to-clean, and chemical-resistant surfaces that withstand frequent washdowns and heavy traffic.',
      foodKeyServices: 'Seamless epoxy flooring systems, antimicrobial coatings, USDA-approved coatings, high-build urethanes, concrete polishing, wall and ceiling coatings, non-slip safety surfaces.',
      foodTypicalClients: 'Dairies, breweries, meat processing plants, bakeries, bottling facilities, commercial kitchens, food storage warehouses.',

      powerTitle: 'Power Generation',
      powerOverview: 'Power plants face unique challenges from extreme temperatures, corrosive chemicals, and constant operational demands. Our protective coatings safeguard critical assets, ensuring reliability and extending service life.',
      powerWorkDescription: 'We provide specialized coating solutions for turbines, cooling towers, structural steel, containment areas, stacks, and other vital components. Our work includes high-temperature coatings, corrosion under insulation (CUI) mitigation, and concrete repair.',
      powerKeyServices: 'High-temperature coatings, CUI solutions, protective linings, concrete repair and coatings, lead abatement, abrasive blasting, stack coatings, cooling tower coatings.',
      powerTypicalClients: 'Coal-fired power plants, nuclear power plants, natural gas power plants, renewable energy facilities (wind, solar), hydroelectric dams.',

      manufacturingTitle: 'Manufacturing & Industrial',
      manufacturingOverview: 'Manufacturing facilities require durable, safe, and aesthetically pleasing surfaces to support continuous operations. Our industrial coatings enhance safety, improve efficiency, and protect valuable assets.',
      manufacturingWorkDescription: 'We offer a wide range of services including heavy-duty floor coatings, machinery painting, structural steel protection, safety line striping, and specialized equipment coatings. Our solutions are designed to withstand heavy traffic, chemical spills, and mechanical wear.',
      manufacturingKeyServices: 'Heavy-duty epoxy floor systems, chemical-resistant coatings, anti-slip coatings, machinery repainting, structural steel coatings, abrasive blasting, safety line striping, concrete sealing.',
      manufacturingTypicalClients: 'Automotive plants, heavy machinery manufacturers, general fabrication shops, warehouses, assembly plants, aerospace facilities.',

      oilgasTitle: 'Oil & Gas',
      oilgasOverview: 'Operating in some of the harshest environments, the oil and gas sector requires superior protection against corrosion, abrasion, and fire. Our solutions extend asset life and enhance operational safety.',
      oilgasWorkDescription: 'Our team provides comprehensive coating and surface preparation services for pipelines, storage tanks, offshore platforms, refineries, and processing facilities. This includes anti-corrosion systems, fireproofing, and insulation coatings designed for extreme conditions.',
      oilgasKeyServices: 'Anti-corrosion coatings, passive fire protection (PFP), thermal insulation coatings, pipeline coatings, abrasive blasting (SSPC standards), tank lining and exterior coating, lead abatement.',
      oilgasTypicalClients: 'Refineries, offshore drilling platforms, pipeline operators, gas processing plants, storage terminal facilities.',

      chemicalTitle: 'Chemical Processing',
      chemicalOverview: 'The chemical processing industry demands robust protective coatings to withstand highly corrosive environments, extreme temperatures, and constant chemical exposure. Our services ensure the longevity and safety of critical infrastructure.',
      chemicalWorkDescription: 'We specialize in applying advanced chemical-resistant coatings and linings to tanks, vessels, secondary containment areas, structural steel, and process equipment. Our work includes surface preparation to stringent standards, ensuring maximum adhesion and performance of specialized coating systems.',
      chemicalKeyServices: 'Acid-resistant coatings, epoxy tank linings, urethane coatings, secondary containment solutions, abrasive blasting, high-pressure water jetting, concrete restoration.',
      chemicalTypicalClients: 'Petrochemical plants, fertilizer manufacturers, specialty chemical producers, pharmaceutical facilities, industrial gas suppliers.',

      waterTitle: 'Water & Wastewater Treatment',
      waterOverview: 'Water and wastewater treatment facilities are constantly exposed to corrosive chemicals, abrasion, and moisture. Our protective coatings are essential for maintaining structural integrity and preventing leaks.',
      waterWorkDescription: 'We specialize in lining clarifiers, digesters, tanks, sumps, and protecting structural components from the harsh conditions prevalent in these environments. Our work ensures long-term performance and compliance with environmental regulations.',
      waterKeyServices: 'Chemical-resistant linings, epoxy coatings, urethane coatings, concrete restoration, containment coatings, secondary containment linings, abrasive blasting, manhole rehabilitation.',
      waterTypicalClients: 'Municipal water treatment plants, industrial wastewater facilities, sewage treatment plants, storm water management facilities, pumping stations.',
    },

    // Projects Page
    projects: {
      pageTitle: 'Project Portfolio',
      pageSubtitle: 'Showcasing our expertise and successful completions',
      heroLabel: 'Our Work',
      heroLine1: 'Project',
      heroLine2: 'Portfolio',
      heroDescription: 'Showcasing our expertise in large-scale industrial coating projects across multiple sectors and countries',
      projectDetails: 'Project Details',
      clientName: 'Client',
      location: 'Location',
      completionDate: 'Completed',
      viewDetails: 'View Details',
      emptyState: 'No projects available at the moment.',
      ctaTitleLine1: 'Start Your',
      ctaTitleHighlight: 'Next Project',
      ctaDescription: 'Let us bring the same level of expertise and quality to your industrial coating needs',
      ctaButton: 'Request Quote',
    },

    // Projects CMS Content
    projectsCms: {
      bridgeTitle: 'Highway Bridge Corrosion Protection',
      bridgeDescription: 'Surface preparation and multi-layer coating application for a major highway bridge. The project aimed to protect the steel structure from environmental degradation, including salt spray and UV radiation. Traffic management and public safety were paramount considerations during execution.',

      pipelineTitle: 'Cross-Country Gas Pipeline Protection',
      pipelineDescription: 'Application of high-performance anti-corrosion coatings to a 50-mile section of a natural gas pipeline. The project involved surface preparation in challenging terrain and the use of advanced coating systems to withstand extreme environmental conditions and abrasive soil. Strict environmental compliance was maintained throughout.',

      waterTitle: 'Municipal Water Treatment Facility Coatings',
      waterDescription: 'Application of specialized coatings to concrete and steel structures within a municipal water treatment plant. This included clarifiers, filter beds, and chemical storage areas, requiring potable water approved coatings and robust chemical resistance. Project completed with minimal disruption to water supply.',

      refineryTitle: 'Petrochemical Refinery Unit Maintenance',
      refineryDescription: 'Specialized coating services for various units within an active petrochemical refinery, including distillation columns, heat exchangers, and piping. The work required adherence to stringent safety protocols and the use of high-temperature resistant coatings to ensure operational integrity.',

      tankTitle: 'Chemical Storage Tank Refurbishment',
      tankDescription: 'Comprehensive internal and external coating application for a series of large chemical storage tanks to enhance corrosion resistance and extend operational lifespan. Challenges included working in a live plant environment and ensuring minimal disruption to operations. Solutions involved specialized fast-cure coatings and phased execution.',

      steelTitle: 'Industrial Plant Steel Structure Painting',
      steelDescription: 'Protective coating of structural steel elements for a new manufacturing plant. This included beams, columns, and support frames, requiring durable coatings to resist chemical exposure and provide long-term aesthetic appeal. Complex access requirements were managed with scaffolding and aerial lifts.',

      seaTankTitle: 'Tank Refurbishment Program',
      seaTankDescription: 'Large-scale refurbishment of 15 storage tanks at Sea Tank Terminal in the Port of Antwerp, one of Europe\'s largest independent tank storage facilities. The project involved deploying advanced hydro-jet robotic technology for exterior surface preparation and coating removal, ensuring precision cleaning with minimal environmental impact. Select tanks also required internal blasting and coating to meet strict chemical storage standards. The scale of the program demanded meticulous project planning, phased execution across multiple tank farms, and continuous coordination with terminal operations to maintain uninterrupted storage capacity throughout the project duration.',

      gtsTitle: 'New Build Coating Program',
      gtsDescription: 'Complete surface preparation and protective coating application for 16 newly constructed storage tanks at Ghent Tank Storage (GTS) in the Port of Ghent. The project encompassed full interior and exterior sandblasting of all tanks, with selected tanks requiring specialized internal lining systems to accommodate a range of chemical and petroleum products. Working on a new-build site presented unique challenges including coordination with ongoing construction activities, strict timeline adherence to meet commissioning deadlines, and ensuring all coatings met the client\'s stringent specifications for long-term corrosion protection and chemical resistance.',

      cspTitle: 'Crane Refurbishment',
      cspDescription: 'Full structural refurbishment and corrosion protection of three large ship-to-shore container cranes at CSP Zeebrugge, a major container handling terminal on the Belgian coast. The project involved comprehensive surface preparation, multi-layer anti-corrosion coating application, and tackling of all structural steel components exposed to the harsh maritime environment. Working at significant heights on active port infrastructure required rigorous safety management, specialized access solutions, and close coordination with terminal operations to minimize disruption to vessel loading and unloading schedules.',

      bnfwTitle: 'Food Storage Refurbishment',
      bnfwDescription: 'Comprehensive interior refurbishment and protective coating application across multiple large food storage warehouse halls at the BNFW facility in Zeebrugge. The project required full surface preparation and application of food-grade coating systems compliant with strict food hygiene regulations and HACCP standards. Each hall underwent complete corrosion treatment and received specialized coatings designed to withstand frequent cleaning cycles, temperature fluctuations, and the demands of an active food storage environment. Phased execution ensured continuous warehouse availability for the client\'s operations throughout the project.',

      itcRubisTitle: 'Anti-Slip & Roof Coating',
      itcRubisDescription: 'Specialized coating project for eight large storage tanks at the ITC Rubis terminal in Zeebrugge, focusing on anti-slip safety coatings for walkways and access areas, and protective coating application on shell roofs exposed to coastal weather conditions. The anti-slip systems were engineered to meet stringent safety standards for personnel working at height on tank surfaces, while the shell roof coatings provided long-term protection against UV degradation, salt spray corrosion, and rainwater infiltration. All work was carried out in an active terminal environment with strict safety and environmental protocols.',
    },

    // Safety Page
    safety: {
      pageTitle: 'Safety & Compliance',
      pageSubtitle: 'Our commitment to the highest safety standards',
      heroLabel: 'Our Commitment',
      heroLine1: 'Safety &',
      heroLine2: 'Certifications',
      heroDescription: 'Maintaining the highest standards of safety compliance and quality assurance in every project we undertake',
      safetyProtocols: 'Safety Protocols',
      certifications: 'Certifications',
      complianceStandards: 'Compliance Standards',
      valuesTitle: 'Our',
      valuesHighlight: 'Values',
      valuesDescription: 'Built on decades of experience and unwavering commitment to excellence',
      safetyCompliance: 'Safety Compliance',
      qualityWorkmanship: 'Quality Workmanship',
      clientCommunication: 'Client Communication',
      yearsOfExperience: 'Years of Experience',
      responsiveSupport: 'Responsive Project Support',
      certsTitle: 'Industry',
      certsHighlight: 'Certifications',
      certsDescription: 'Certified and compliant with international safety and quality standards',
      certsEmptyState: 'Certification information coming soon.',
      issuedBy: 'Issued by',
      dateIssued: 'Issued',
      expirationDate: 'Expires',
      viewCertificate: 'View Certificate',
      safetyFirstTitle: 'Safety',
      safetyFirstHighlight: 'First',
      safetyFirstSuffix: 'Always',
      safetyFirstDesc1: 'At Russo NV, safety is not just a priority—it\'s our foundation. Every project begins and ends with comprehensive safety protocols that protect our team, your facility, and the environment.',
      safetyFirstDesc2: 'Our commitment to safety compliance has earned us industry-leading certifications and the trust of major industrial clients across five countries.',
      safetyItemVcaTitle: 'VCA Certified',
      safetyItemVcaDesc: 'Safety, Health and Environment Checklist for Contractors',
      safetyItemNaceTitle: 'NACE Standards',
      safetyItemNaceDesc: 'International corrosion control and coating standards',
      safetyItemIsoTitle: 'ISO Compliance',
      safetyItemIsoDesc: 'Quality management and environmental standards',
      safetyItemReportingTitle: 'Daily Reporting',
      safetyItemReportingDesc: 'Transparent project updates and safety documentation',
      ctaTitleLine1: 'Work With A',
      ctaTitleHighlight: 'Certified',
      ctaTitleSuffix: 'Partner',
      ctaDescription: 'Experience the difference of working with a fully certified and safety-compliant industrial coating partner',
      ctaButton: 'Request Quote',
    },

    // Safety CMS Content — Certifications
    safetyCertsCms: {
      naceTitle: 'NACE International Coating Inspector Level 2',
      naceIssuer: 'NACE International (now AMPP)',
      naceDescription: 'This certification validates Russo NV\'s expertise in protective coating inspection, ensuring high-quality application and corrosion prevention in industrial settings.',

      iso14001Title: 'ISO 14001:2015 Environmental Management System',
      iso14001Issuer: 'International Organization for Standardization (ISO)',
      iso14001Description: 'ISO 14001:2015 demonstrates Russo NV\'s commitment to environmental responsibility, providing a framework for managing environmental impacts and improving environmental performance.',

      vcaTitle: 'VCA Full (VOL-VCA)',
      vcaIssuer: 'SSVV (Stichting Samenwerken Voor Veiligheid)',
      vcaDescription: 'The VCA (Veiligheid, Gezondheid en Milieu Checklist Aannemers) certification demonstrates that Russo NV meets strict safety, health, and environmental standards for contractors in high-risk environments.',

      iso9001Title: 'ISO 9001:2015 Quality Management System',
      iso9001Issuer: 'International Organization for Standardization (ISO)',
      iso9001Description: 'ISO 9001:2015 certifies that Russo NV consistently provides products and services that meet customer and regulatory requirements, and aims to enhance customer satisfaction through effective system application.',
    },

    // Safety CMS Content — Company Values
    safetyValuesCms: {
      communicationTitle: 'Transparent Client Communication',
      communicationDescription: 'Open and honest communication is the cornerstone of successful partnerships, keeping clients informed and engaged every step of the way.',
      communicationSafety: 'All safety incidents, concerns, or changes in safety protocols are immediately communicated to relevant stakeholders and clients for full transparency.',
      communicationQuality: 'Clear communication about project specifications, material choices, and quality expectations ensures a shared understanding and successful outcome, minimizing misunderstandings.',
      communicationClient: 'Daily updates, weekly progress meetings, detailed project schedules, and 24/7 availability for client inquiries ensure complete transparency and build trust.',

      qualityTitle: 'Uncompromising Quality',
      qualityDescription: 'We deliver superior results through meticulous attention to detail, the use of premium materials, and adherence to the highest industry standards.',
      qualitySafety: 'Quality control procedures are integrated with safety protocols to ensure both excellence in construction and security on site, preventing defects and hazards.',
      qualityQuality: 'From initial design to final execution, every step is performed to the highest industry standards, guaranteeing lasting value, structural integrity, and aesthetic appeal.',
      qualityClient: 'Regular progress reports, quality assurance checks, and material selections are shared with clients, inviting feedback and ensuring alignment with their vision.',

      expertiseTitle: 'Decades of Expertise',
      expertiseDescription: 'With over two decades in the industry, our extensive experience translates into efficient, reliable, and innovative solutions for complex projects.',
      expertiseSafety: 'Our extensive experience has allowed us to develop robust safety management systems and best practices that consistently exceed industry benchmarks.',
      expertiseQuality: 'Years of hands-on experience have honed our skills, enabling us to consistently deliver exceptional workmanship and overcome challenges on even the most complex projects.',
      expertiseClient: 'Our seasoned project managers are adept at communicating complex technical details, project timelines, and potential solutions clearly and concisely to clients.',

      safetyFirstTitle: 'Safety First',
      safetyFirstDescription: 'Our unwavering commitment to safety ensures a secure environment for our team and clients on every project.',
      safetyFirstSafety: 'Adherence to OSHA regulations, regular safety audits, mandatory PPE, and continuous training programs for all personnel. We maintain a zero-incident philosophy.',
      safetyFirstQuality: 'Even with safety as our top priority, we never compromise on the quality and durability of our work, integrating safety into every quality control check.',
      safetyFirstClient: 'Daily safety briefings and incident reports (if any) are communicated to clients, ensuring transparency and peace of mind regarding site conditions.',
    },

    // About Page
    about: {
      pageTitle: 'About Russo NV',
      pageSubtitle: 'Industrial coating expertise across Belgium',
      ourStory: 'Our Story',
      ourMission: 'Our Mission',
      ourValues: 'Our Values',
      learnMore: 'Learn More',
      heroLabel: 'About Us',
      heroLine1: 'Our',
      heroLine2: 'Story',
      heroDescription: 'Specialized industrial coating and surface preparation services — built on practical expertise, safety, and uncompromising quality.',
      storyTitleLine1: 'Built On',
      storyTitleLine2: 'Practical Expertise',
      storyParagraph1: 'Russo NV delivers specialized industrial coating, surface preparation, and asset protection services for demanding environments across Belgium.',
      storyParagraph2: 'We support storage terminals, petrochemical facilities, industrial sites, and infrastructure projects with solutions designed to improve durability, safety, and long-term performance.',
      storyParagraph3: 'Our services include tank refurbishment, abrasive blasting, hydro jetting, coating application, corrosion protection, and related maintenance works. Every project is carried out with a strong focus on safety, quality control, and clear communication from start to finish.',
      storyParagraph4: 'With a hands-on and straightforward approach, we help clients maintain critical assets and complete essential works with confidence.',
      storyResponsiveSupport: 'Responsive Project Support',
      storyInspectionQuality: 'Inspection-Driven Quality',
      missionTitle: 'Our',
      missionHighlight: 'Mission & Values',
      missionDescription: 'To deliver industrial coating solutions of the highest quality while maintaining an unwavering commitment to safety, sustainability, and client satisfaction.',
      valueExpertTeamTitle: 'Expert Team',
      valueExpertTeamDesc: 'Certified professionals with extensive hands-on experience in industrial coating applications across diverse sectors.',
      valueQualityTitle: 'Quality First',
      valueQualityDesc: 'Every project meets the highest industry standards with rigorous quality control at every stage of execution.',
      valueFastTitle: 'Efficient Delivery',
      valueFastDesc: 'Phased project execution and meticulous planning ensure on-time delivery without compromising quality or safety.',
      valueGlobalTitle: 'European Reach',
      valueGlobalDesc: 'Operating across five countries with the flexibility and expertise to handle projects of any scale.',
      expertiseTitle: 'Our',
      expertiseHighlight: 'Expertise',
      expertiseDescription: 'Specialized industrial coating services backed by extensive field experience and industry-leading certifications.',
      expertiseTankTitle: 'Tank Coating',
      expertiseTankDesc: 'Interior and exterior coating systems for storage tanks, including chemical-resistant linings and corrosion protection.',
      expertisePipelineTitle: 'Pipeline Protection',
      expertisePipelineDesc: 'High-performance anti-corrosion coatings for pipelines in challenging terrains and harsh environments.',
      expertiseSteelTitle: 'Steel Structures',
      expertiseSteelDesc: 'Protective coatings for industrial steel structures including beams, columns, cranes, and support frames.',
      expertiseSandblastingTitle: 'Sandblasting',
      expertiseSandblastingDesc: 'Professional surface preparation using advanced abrasive blasting techniques for optimal coating adhesion.',
      expertiseFireproofingTitle: 'Fireproofing',
      expertiseFireproofingDesc: 'Intumescent and cementitious fireproofing systems to protect structural elements from fire damage.',
      expertiseProtectiveTitle: 'Protective Coatings',
      expertiseProtectiveDesc: 'Specialized coating systems including anti-slip, food-grade, and high-temperature resistant applications.',
      clientsTitle: 'Who We',
      clientsHighlight: 'Serve',
      clientsDescription: 'Trusted by leading companies across a wide range of industrial sectors.',
      clientChemicalPlants: 'Chemical Plants',
      clientFoodProduction: 'Food Production',
      clientStorageTerminals: 'Storage Terminals',
      clientTankFarms: 'Tank Farms',
      clientIndustrialFactories: 'Industrial Factories',
      clientWarehouses: 'Warehouses',
      clientPipelineCompanies: 'Pipeline Companies',
      clientConstructionFirms: 'Construction Firms',
      clientManufacturing: 'Manufacturing',
      clientPetrochemical: 'Petrochemical',
      clientLogisticsCenters: 'Logistics Centers',
      clientProcessingPlants: 'Processing Plants',
      ctaTitleLine1: 'Ready To Start Your',
      ctaTitleHighlight: 'Next Project?',
      ctaDescription: 'Let us bring our expertise and quality to your industrial coating needs.',
      ctaButton: 'Request Quote',
      ctaSecondaryButton: 'View Projects',
    },

    // Contact Page
    contact: {
      pageTitle: 'Get In Touch',
      pageSubtitle: "We're here to help with your industrial coating needs",
      heroLabel: 'Get In Touch',
      heroLine1: 'Contact',
      heroLine2: 'Us',
      heroDescription: 'Request a quote or get in touch with our team for your industrial coating project',
      contactForm: 'Contact Form',
      formTitle: 'Request A Quote',
      formDescription: 'Fill out the form below and our team will get back to you within 24 hours',
      name: 'Full Name',
      company: 'Company Name',
      email: 'Email Address',
      phone: 'Phone Number',
      projectType: 'Project Type',
      selectService: 'Select a service',
      sandblasting: 'Sandblasting',
      industrialPainting: 'Industrial Painting',
      fireproofing: 'Fireproofing Coatings',
      protectiveCoatings: 'Protective Coatings',
      coatRemoval: 'Coat Removal',
      tankCoating: 'Tank Coating',
      pipelineCoating: 'Pipeline Coating',
      other: 'Other',
      projectDetails: 'Project Details',
      projectDetailsPlaceholder: 'Please provide details about your project, timeline, and any specific requirements...',
      message: 'Message',
      send: 'Send Request',
      sending: 'Sending...',
      toastTitle: 'Quote Request Received',
      toastDescription: 'Thank you for your interest. Our team will contact you within 24 hours.',
      contactInfo: 'Contact Info',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      locationLabel: 'Location',
      locationValue: 'Antwerp, Belgium',
      servingRegion: 'Serving BE, NL, FR, DE, LU',
      businessHours: 'Business Hours',
      mondayFriday: 'Monday - Friday: 8:00 - 18:00',
      saturday: 'Saturday: 9:00 - 14:00',
      sunday: 'Sunday: Closed',
      emergencyContact: 'Emergency Contact',
      emergencyDescription: 'For urgent project matters outside business hours:',
      coverageTitle: 'Our',
      coverageHighlight: 'Coverage',
      coverageDescription: 'Based in Antwerp with projects across five European countries',
      countryBelgium: 'Belgium',
      countryNetherlands: 'Netherlands',
      countryFrance: 'France',
      countryGermany: 'Germany',
      countryLuxembourg: 'Luxembourg',
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

      coatingInspectionTitle: 'Coatinginspectie',
      coatingInspectionDescription:
        'Onze coatinginspectiediensten garanderen dat alle aangebrachte beschermende coatings voldoen aan de hoogste industrienormen op het vlak van kwaliteit, prestatie en duurzaamheid. Wij voeren grondige inspecties uit in elke fase van het coatingproces, van oppervlaktevoorbereiding tot uiteindelijke uitharding, met gecertificeerde inspecteurs en geavanceerde testapparatuur. Onze diensten omvatten droge laagdiktemeting (DFT), hechtingsproeven, holidaydetectie en visuele inspecties om de conformiteit met projectspecificaties en internationale normen zoals ISO en NACE te verifiëren.',
      coatingInspectionKeyBenefits:
        'Garandeert coatingkwaliteit en conformiteit met specificaties, voorkomt vroegtijdig coatingfalen, verbetert de levensduur van assets, ondersteunt regelgevende en klantvereisten, vermindert kostbaar herwerk, biedt gedocumenteerde kwaliteitsborging.',
      coatingInspectionProcessOverview:
        'Pre-inspectieplanning en beoordeling van specificaties, verificatie van oppervlaktevoorbereidingsnormen, tussentijdse inspectie tijdens coatingapplicatie, testen (DFT, hechting, holidaydetectie), documentatie en rapportage, eindinspectie en oplevering.',
      coatingInspectionTargetIndustries:
        'Olie en gas, petrochemie, maritieme sector, infrastructuur, energieopwekking, productie, waterbehandeling',
    },

    // Industries Page
    industries: {
      pageTitle: 'Bediende Industrieën',
      pageSubtitle: 'Gespecialiseerde oplossingen in diverse industriële sectoren',
      heroLabel: 'Ons Bereik',
      heroLine1: 'Industrieën',
      heroLine2: 'Die Wij Bedienen',
      heroDescription: 'Vertrouwd door grote industriële sectoren in heel Europa, met gespecialiseerde coatingoplossingen waar ze ook nodig zijn',
      industryOverview: 'Industrieoverzicht',
      workDescription: 'Ons Werk',
      keyServices: 'Belangrijkste Diensten',
      typicalClients: 'Typische Klanten',
      learnMore: 'Meer Informatie',
      emptyState: 'Er is momenteel geen informatie over industrieën beschikbaar.',
      coverageTitleLine1: 'Europees',
      coverageTitleHighlight: 'Bereik',
      coverageDescription: 'Gevestigd in Antwerpen, België — wij bedienen industriële klanten in heel Europa met lokale expertise en internationale normen',
      coverageHeadquarters: 'Hoofdkantoor',
      coverageHeadquartersValue: 'Antwerpen, België',
      coverageOperations: 'Werkgebied',
      coverageOperationsValue: 'Heel Europa',
      coverageCertifications: 'Certificeringen',
      coverageCertificationsValue: 'VCA • NACE • ISO',
      coverageAvailability: 'Beschikbaarheid',
      coverageAvailabilityValue: '24/7 Projectondersteuning',
      ctaTitleLine1: 'Uw Industrie',
      ctaTitleHighlight: 'Onze Expertise',
      ctaDescription: 'Neem contact met ons op om te bespreken hoe wij uw industriële coatingbehoeften kunnen ondersteunen — overal in Europa',
      ctaButton: 'Neem Contact Op',
    },

    // Industries CMS Content
    industriesCms: {
      marineTitle: 'Maritiem & Offshore',
      marineOverview: 'De maritieme en offshore sector vereist robuuste bescherming tegen zoutwatercorrosie, slijtage en extreme weersomstandigheden. Onze gespecialiseerde coatings garanderen de integriteit en levensduur van schepen en offshore constructies.',
      marineWorkDescription: 'Onze diensten omvatten het coaten van scheepsrompen, dekken, ballasttanks, offshore platforms en haveninfrastructuur. Wij gebruiken geavanceerde aangroeiwerende coatings, maritieme epoxy\'s en tanklinings, gecombineerd met ultrahoge druk (UHP) waterstralen voor een optimale oppervlaktevoorbereiding.',
      marineKeyServices: 'Aangroeiwerende coatings, maritieme epoxy\'s, ballasttanklinings, vrachtruimcoatings, UHP waterstralen, oppervlaktevoorbereiding volgens NACE/SSPC-normen, dekcoatings, spatzonebescherming.',
      marineTypicalClients: 'Scheepswerven, commerciële rederijen, offshore boorbedrijven, havenautoriteiten, marineschepen, ferrymaatschappijen.',

      foodTitle: 'Voeding & Dranken',
      foodOverview: 'Het handhaven van hygiënische, veilige en duurzame oppervlakken is essentieel in de voedings- en drankenindustrie. Onze coatings voldoen aan strenge regelgeving, voorkomen besmetting en garanderen operationele efficiëntie.',
      foodWorkDescription: 'Wij brengen FDA-conforme en USDA-goedgekeurde coatings aan op vloeren, wanden, plafonds en verwerkingsapparatuur. Onze diensten richten zich op het creëren van naadloze, makkelijk te reinigen en chemisch bestendige oppervlakken die bestand zijn tegen frequente reiniging en zwaar verkeer.',
      foodKeyServices: 'Naadloze epoxyvloersystemen, antimicrobiële coatings, USDA-goedgekeurde coatings, diklaags urethanen, betonpolijsting, wand- en plafondcoatings, antislipvloeren.',
      foodTypicalClients: 'Zuivelfabrieken, brouwerijen, vleesverwerkingsbedrijven, bakkerijen, bottelarijen, grootkeukens, voedselopslagmagazijnen.',

      powerTitle: 'Energieopwekking',
      powerOverview: 'Energiecentrales worden geconfronteerd met unieke uitdagingen door extreme temperaturen, corrosieve chemicaliën en constante operationele eisen. Onze beschermende coatings waarborgen kritieke installaties en verlengen de levensduur.',
      powerWorkDescription: 'Wij leveren gespecialiseerde coatingoplossingen voor turbines, koeltorens, constructiestaal, opvangzones, schoorstenen en andere vitale onderdelen. Ons werk omvat hogetemperatuurcoatings, bestrijding van corrosie onder isolatie (CUI) en betonherstel.',
      powerKeyServices: 'Hogetemperatuurcoatings, CUI-oplossingen, beschermende linings, betonherstel en -coatings, loodverwijdering, abrasief stralen, schoorsteen­coatings, koeltorencoatings.',
      powerTypicalClients: 'Kolencentrales, kerncentrales, aardgascentrales, hernieuwbare energieinstallaties (wind, zon), waterkrachtcentrales.',

      manufacturingTitle: 'Productie & Industrie',
      manufacturingOverview: 'Productie-installaties vereisen duurzame, veilige en esthetisch hoogwaardige oppervlakken ter ondersteuning van continue bedrijfsvoering. Onze industriële coatings verhogen de veiligheid, verbeteren de efficiëntie en beschermen waardevolle assets.',
      manufacturingWorkDescription: 'Wij bieden een breed scala aan diensten, waaronder zware vloercoatings, machineschilderwerk, bescherming van constructiestaal, veiligheidsmarkeringen en gespecialiseerde apparatuurcoatings. Onze oplossingen zijn ontworpen om zwaar verkeer, chemische morsen en mechanische slijtage te weerstaan.',
      manufacturingKeyServices: 'Zware epoxyvloersystemen, chemisch bestendige coatings, antislipcoatings, machinevernissing, constructiestaalcoatings, abrasief stralen, veiligheidsmarkeringen, betonafdichting.',
      manufacturingTypicalClients: 'Autofabrieken, fabrikanten van zware machines, metaalbewerkingsbedrijven, magazijnen, assemblagefabrieken, luchtvaartfaciliteiten.',

      oilgasTitle: 'Olie & Gas',
      oilgasOverview: 'De olie- en gassector opereert in de zwaarste omgevingen en vereist superieure bescherming tegen corrosie, slijtage en brand. Onze oplossingen verlengen de levensduur van assets en verhogen de operationele veiligheid.',
      oilgasWorkDescription: 'Ons team levert uitgebreide coating- en oppervlaktevoorbereidingsdiensten voor pijpleidingen, opslagtanks, offshore platforms, raffinaderijen en verwerkingsinstallaties. Dit omvat anticorrosiesystemen, brandwering en isolatiecoatings ontworpen voor extreme omstandigheden.',
      oilgasKeyServices: 'Anticorrosiecoatings, passieve brandbescherming (PFP), thermische isolatiecoatings, pijpleidingcoatings, abrasief stralen (SSPC-normen), tanklining en exterieurcoating, loodverwijdering.',
      oilgasTypicalClients: 'Raffinaderijen, offshore boorplatforms, pijpleidingbeheerders, gasverwerkingsinstallaties, opslagterminalbedrijven.',

      chemicalTitle: 'Chemische Verwerking',
      chemicalOverview: 'De chemische verwerkingsindustrie vereist robuuste beschermende coatings die bestand zijn tegen sterk corrosieve omgevingen, extreme temperaturen en constante chemische blootstelling. Onze diensten garanderen de levensduur en veiligheid van kritieke infrastructuur.',
      chemicalWorkDescription: 'Wij zijn gespecialiseerd in het aanbrengen van geavanceerde chemisch bestendige coatings en linings op tanks, vaten, secundaire opvangzones, constructiestaal en procesapparatuur. Ons werk omvat oppervlaktevoorbereiding volgens strenge normen, waardoor maximale hechting en prestatie van gespecialiseerde coatingsystemen wordt gegarandeerd.',
      chemicalKeyServices: 'Zuurbestendige coatings, epoxy tanklinings, urethaancoatings, secundaire opvangoplossingen, abrasief stralen, hogedruk waterstralen, betonherstel.',
      chemicalTypicalClients: 'Petrochemische fabrieken, kunstmestproducenten, specialistische chemische producenten, farmaceutische installaties, industriële gasleveranciers.',

      waterTitle: 'Water- & Afvalwaterbehandeling',
      waterOverview: 'Water- en afvalwaterbehandelingsinstallaties worden voortdurend blootgesteld aan corrosieve chemicaliën, slijtage en vocht. Onze beschermende coatings zijn essentieel voor het behoud van de structurele integriteit en het voorkomen van lekkages.',
      waterWorkDescription: 'Wij zijn gespecialiseerd in het bekleden van bezinkers, gistingstanks, opslagtanks, putten en het beschermen van constructieve onderdelen tegen de zware omstandigheden in deze omgevingen. Ons werk garandeert langdurige prestaties en naleving van milieuregelgeving.',
      waterKeyServices: 'Chemisch bestendige linings, epoxycoatings, urethaancoatings, betonherstel, opvangcoatings, secundaire opvanglinings, abrasief stralen, putrehabilitatie.',
      waterTypicalClients: 'Gemeentelijke waterzuiveringsinstallaties, industriële afvalwaterfaciliteiten, rioolwaterzuiveringsinstallaties, regenwaterbeheerinstallaties, pompstations.',
    },

    // Projects Page
    projects: {
      pageTitle: 'Projectportfolio',
      pageSubtitle: 'Onze expertise en succesvolle afronding tonen',
      heroLabel: 'Ons Werk',
      heroLine1: 'Project',
      heroLine2: 'Portfolio',
      heroDescription: 'Een overzicht van onze expertise in grootschalige industriële coatingprojecten in diverse sectoren en landen',
      projectDetails: 'Projectdetails',
      clientName: 'Klant',
      location: 'Locatie',
      completionDate: 'Voltooid',
      viewDetails: 'Details Bekijken',
      emptyState: 'Er zijn momenteel geen projecten beschikbaar.',
      ctaTitleLine1: 'Start Uw',
      ctaTitleHighlight: 'Volgend Project',
      ctaDescription: 'Laat ons dezelfde expertise en kwaliteit inzetten voor uw industriële coatingbehoeften',
      ctaButton: 'Offerte Aanvragen',
    },

    // Projects CMS Content
    projectsCms: {
      bridgeTitle: 'Corrosiebescherming Snelwegbrug',
      bridgeDescription: 'Oppervlaktevoorbereiding en meerlaagse coatingtoepassing voor een grote snelwegbrug. Het project was gericht op de bescherming van de staalconstructie tegen omgevingsdegradatie, waaronder zoutnevel en UV-straling. Verkeersbeheer en openbare veiligheid waren cruciale aandachtspunten tijdens de uitvoering.',

      pipelineTitle: 'Bescherming Langeafstandsgaspijpleiding',
      pipelineDescription: 'Toepassing van hoogwaardige anticorrosiecoatings op een sectie van 80 kilometer van een aardgaspijpleiding. Het project omvatte oppervlaktevoorbereiding in moeilijk terrein en het gebruik van geavanceerde coatingsystemen die bestand zijn tegen extreme omgevingsomstandigheden en abrasieve grond. Strikte milieunaleving werd gedurende het hele project gehandhaafd.',

      waterTitle: 'Coatings Gemeentelijke Waterzuiveringsinstallatie',
      waterDescription: 'Toepassing van gespecialiseerde coatings op beton- en staalconstructies binnen een gemeentelijke waterzuiveringsinstallatie. Dit omvatte bezinkers, filterbedden en chemische opslagzones, waarvoor drinkwatergecertificeerde coatings en robuuste chemische bestendigheid vereist waren. Het project werd voltooid met minimale verstoring van de watervoorziening.',

      refineryTitle: 'Onderhoud Petrochemische Raffinaderij',
      refineryDescription: 'Gespecialiseerde coatingdiensten voor diverse eenheden binnen een actieve petrochemische raffinaderij, waaronder destillatiekolommen, warmtewisselaars en leidingwerk. Het werk vereiste naleving van strenge veiligheidsprotocollen en het gebruik van hogetemperatuurbestendige coatings om de operationele integriteit te waarborgen.',

      tankTitle: 'Renovatie Chemische Opslagtanks',
      tankDescription: 'Uitgebreide interne en externe coatingtoepassing voor een reeks grote chemische opslagtanks om de corrosiebestendigheid te verbeteren en de operationele levensduur te verlengen. Uitdagingen waren onder meer het werken in een actieve fabrieksomgeving en het minimaliseren van de verstoring van de bedrijfsvoering. Oplossingen omvatten gespecialiseerde snelhardende coatings en een gefaseerde uitvoering.',

      steelTitle: 'Schilderwerk Staalconstructie Industriële Fabriek',
      steelDescription: 'Beschermende coating van constructieve staalelementen voor een nieuwe productiefabriek. Dit omvatte balken, kolommen en draagconstructies, waarvoor duurzame coatings nodig waren die bestand zijn tegen chemische blootstelling en een langdurig esthetisch resultaat bieden. Complexe toegangsvereisten werden beheerd met steigers en hoogwerkers.',

      seaTankTitle: 'Tank Renovatie',
      seaTankDescription: 'Grootschalige renovatie van 15 opslagtanks bij Sea Tank Terminal in de Haven van Antwerpen, een van Europa\'s grootste onafhankelijke tankopslagfaciliteiten. Het project omvatte de inzet van geavanceerde hydro-jet robottechnologie voor uitwendige oppervlaktevoorbereiding en coatingverwijdering, met minimale milieu-impact. Geselecteerde tanks vereisten ook inwendige straling en coating om te voldoen aan strenge normen voor chemische opslag. De omvang van het programma vereiste nauwgezette projectplanning, gefaseerde uitvoering over meerdere tankparken en voortdurende coördinatie met de terminaloperaties om ononderbroken opslagcapaciteit te garanderen gedurende het gehele project.',

      gtsTitle: 'Coatingprogramma Nieuwbouw',
      gtsDescription: 'Volledige oppervlaktevoorbereiding en beschermende coatingtoepassing voor 16 nieuw gebouwde opslagtanks bij Ghent Tank Storage (GTS) in de Haven van Gent. Het project omvatte volledige inwendige en uitwendige zandstraling van alle tanks, waarbij geselecteerde tanks gespecialiseerde interne bekledingssystemen vereisten voor een scala aan chemische en petroleumproducten. Werken op een nieuwbouwlocatie bracht unieke uitdagingen met zich mee, waaronder coördinatie met lopende bouwactiviteiten, strikte naleving van de planning om inbedrijfstellingsdeadlines te halen, en het waarborgen dat alle coatings voldeden aan de strenge specificaties van de klant voor langdurige corrosiebescherming en chemische bestendigheid.',

      cspTitle: 'Kraanrenovatie',
      cspDescription: 'Volledige structurele renovatie en corrosiebescherming van drie grote ship-to-shore containerkranen bij CSP Zeebrugge, een belangrijke containeroverslag­terminal aan de Belgische kust. Het project omvatte uitgebreide oppervlaktevoorbereiding, meerlaagse anticorrosie-coatingtoepassing en de behandeling van alle constructieve staalcomponenten die blootgesteld zijn aan het ruwe maritieme klimaat. Werken op aanzienlijke hoogte op actieve haveninfrastructuur vereiste streng veiligheidsbeheer, gespecialiseerde toegangsoplossingen en nauwe coördinatie met de terminaloperaties om verstoring van het laden en lossen van schepen te minimaliseren.',

      bnfwTitle: 'Renovatie Voedselopslagfaciliteit',
      bnfwDescription: 'Uitgebreide inwendige renovatie en beschermende coatingtoepassing in meerdere grote voedselopslaghallen bij de BNFW-faciliteit in Zeebrugge. Het project vereiste volledige oppervlaktevoorbereiding en toepassing van voedselveilige coatingsystemen conform strenge voedselhygiënevoorschriften en HACCP-normen. Elke hal onderging een volledige corrosiebehandeling en ontving gespecialiseerde coatings ontworpen om bestand te zijn tegen frequente reinigingscycli, temperatuurschommelingen en de eisen van een actieve voedselopslagomgeving. Gefaseerde uitvoering garandeerde continue beschikbaarheid van de magazijnen voor de bedrijfsvoering van de klant gedurende het gehele project.',

      itcRubisTitle: 'Antislip- & Dakcoating',
      itcRubisDescription: 'Gespecialiseerd coatingproject voor acht grote opslagtanks bij de ITC Rubis-terminal in Zeebrugge, gericht op antislip-veiligheidscoatings voor looppaden en toegangszones, en beschermende coatingtoepassing op schelpdaken blootgesteld aan kustweersomstandigheden. De antislipsystemen werden ontworpen om te voldoen aan strenge veiligheidsnormen voor personeel dat op hoogte werkt op tankoppervlakken, terwijl de dakcoatings langdurige bescherming boden tegen UV-degradatie, zoutnevelcorrosie en regenwaterinfiltratie. Alle werkzaamheden werden uitgevoerd in een actieve terminalomgeving met strikte veiligheids- en milieuprotocollen.',
    },

    // Safety Page
    safety: {
      pageTitle: 'Veiligheid & Naleving',
      pageSubtitle: 'Onze inzet voor de hoogste veiligheidsnormen',
      heroLabel: 'Onze Toewijding',
      heroLine1: 'Veiligheid &',
      heroLine2: 'Certificeringen',
      heroDescription: 'Het handhaven van de hoogste normen op het gebied van veiligheidsnaleving en kwaliteitsborging bij elk project dat wij uitvoeren',
      safetyProtocols: 'Veiligheidsprotocollen',
      certifications: 'Certificeringen',
      complianceStandards: 'Nalevingsnormen',
      valuesTitle: 'Onze',
      valuesHighlight: 'Waarden',
      valuesDescription: 'Gebouwd op decennia van ervaring en een onwrikbare toewijding aan excellentie',
      safetyCompliance: 'Veiligheidsnaleving',
      qualityWorkmanship: 'Kwaliteitsvakmanschap',
      clientCommunication: 'Klantcommunicatie',
      yearsOfExperience: 'Jaren Ervaring',
      responsiveSupport: 'Responsieve Projectondersteuning',
      certsTitle: 'Industrie',
      certsHighlight: 'Certificeringen',
      certsDescription: 'Gecertificeerd en conform internationale veiligheids- en kwaliteitsnormen',
      certsEmptyState: 'Certificeringsinformatie binnenkort beschikbaar.',
      issuedBy: 'Uitgegeven door',
      dateIssued: 'Uitgegeven',
      expirationDate: 'Verloopt',
      viewCertificate: 'Certificaat Bekijken',
      safetyFirstTitle: 'Veiligheid',
      safetyFirstHighlight: 'Eerst',
      safetyFirstSuffix: 'Altijd',
      safetyFirstDesc1: 'Bij Russo NV is veiligheid niet zomaar een prioriteit — het is ons fundament. Elk project begint en eindigt met uitgebreide veiligheidsprotocollen die ons team, uw installatie en het milieu beschermen.',
      safetyFirstDesc2: 'Onze toewijding aan veiligheidsnaleving heeft ons toonaangevende certificeringen en het vertrouwen van grote industriële klanten in vijf landen opgeleverd.',
      safetyItemVcaTitle: 'VCA Gecertificeerd',
      safetyItemVcaDesc: 'Veiligheid, Gezondheid en Milieu Checklist Aannemers',
      safetyItemNaceTitle: 'NACE Normen',
      safetyItemNaceDesc: 'Internationale normen voor corrosiebeheersing en coatings',
      safetyItemIsoTitle: 'ISO Conformiteit',
      safetyItemIsoDesc: 'Kwaliteitsmanagement en milieunormen',
      safetyItemReportingTitle: 'Dagelijkse Rapportage',
      safetyItemReportingDesc: 'Transparante projectupdates en veiligheidsdocumentatie',
      ctaTitleLine1: 'Werk Met Een',
      ctaTitleHighlight: 'Gecertificeerde',
      ctaTitleSuffix: 'Partner',
      ctaDescription: 'Ervaar het verschil van samenwerken met een volledig gecertificeerde en veiligheidsconforme industriële coatingpartner',
      ctaButton: 'Offerte Aanvragen',
    },

    // Safety CMS Content — Certifications
    safetyCertsCms: {
      naceTitle: 'NACE International Coating Inspector Level 2',
      naceIssuer: 'NACE International (nu AMPP)',
      naceDescription: 'Deze certificering bevestigt de expertise van Russo NV op het gebied van inspectie van beschermende coatings, en garandeert een hoogwaardige toepassing en corrosiepreventie in industriële omgevingen.',

      iso14001Title: 'ISO 14001:2015 Milieumanagementsysteem',
      iso14001Issuer: 'International Organization for Standardization (ISO)',
      iso14001Description: 'ISO 14001:2015 toont de toewijding van Russo NV aan milieuverantwoordelijkheid en biedt een kader voor het beheren van milieu-impact en het verbeteren van milieuprestaties.',

      vcaTitle: 'VCA Volledig (VOL-VCA)',
      vcaIssuer: 'SSVV (Stichting Samenwerken Voor Veiligheid)',
      vcaDescription: 'De VCA-certificering (Veiligheid, Gezondheid en Milieu Checklist Aannemers) toont aan dat Russo NV voldoet aan strenge veiligheids-, gezondheids- en milieunormen voor aannemers in risicovolle omgevingen.',

      iso9001Title: 'ISO 9001:2015 Kwaliteitsmanagementsysteem',
      iso9001Issuer: 'International Organization for Standardization (ISO)',
      iso9001Description: 'ISO 9001:2015 certificeert dat Russo NV consequent producten en diensten levert die voldoen aan klant- en regelgevingsvereisten, en streeft naar verhoging van de klanttevredenheid door effectieve systeemtoepassing.',
    },

    // Safety CMS Content — Company Values
    safetyValuesCms: {
      communicationTitle: 'Transparante Klantcommunicatie',
      communicationDescription: 'Open en eerlijke communicatie is de hoeksteen van succesvolle partnerschappen, waarbij klanten bij elke stap geïnformeerd en betrokken worden gehouden.',
      communicationSafety: 'Alle veiligheidsincidenten, zorgen of wijzigingen in veiligheidsprotocollen worden onmiddellijk gecommuniceerd aan relevante betrokkenen en klanten voor volledige transparantie.',
      communicationQuality: 'Duidelijke communicatie over projectspecificaties, materiaalkeuzes en kwaliteitsverwachtingen garandeert een gedeeld begrip en een succesvol resultaat, met minimale misverstanden.',
      communicationClient: 'Dagelijkse updates, wekelijkse voortgangsvergaderingen, gedetailleerde projectplanningen en 24/7 beschikbaarheid voor klantvragen garanderen volledige transparantie en bouwen vertrouwen op.',

      qualityTitle: 'Compromisloze Kwaliteit',
      qualityDescription: 'Wij leveren superieure resultaten door nauwgezette aandacht voor detail, het gebruik van hoogwaardige materialen en naleving van de hoogste industrienormen.',
      qualitySafety: 'Kwaliteitscontroleprocedures zijn geïntegreerd met veiligheidsprotocollen om zowel excellentie in uitvoering als veiligheid op de werkvloer te garanderen, en defecten en gevaren te voorkomen.',
      qualityQuality: 'Van ontwerp tot oplevering wordt elke stap uitgevoerd volgens de hoogste industrienormen, met een blijvende waarde, structurele integriteit en esthetische uitstraling als resultaat.',
      qualityClient: 'Regelmatige voortgangsrapporten, kwaliteitsborgingscontroles en materiaalselecties worden gedeeld met klanten, waarbij feedback wordt uitgenodigd en afstemming op hun visie wordt gegarandeerd.',

      expertiseTitle: 'Decennia van Expertise',
      expertiseDescription: 'Met meer dan twee decennia ervaring in de sector vertalen onze uitgebreide kennis en ervaring zich in efficiënte, betrouwbare en innovatieve oplossingen voor complexe projecten.',
      expertiseSafety: 'Onze uitgebreide ervaring heeft ons in staat gesteld robuuste veiligheidsmanagementsystemen en best practices te ontwikkelen die consequent de industrienormen overtreffen.',
      expertiseQuality: 'Jarenlange praktijkervaring heeft onze vaardigheden aangescherpt, waardoor wij consequent uitzonderlijk vakmanschap leveren en uitdagingen overwinnen bij zelfs de meest complexe projecten.',
      expertiseClient: 'Onze ervaren projectmanagers communiceren complexe technische details, projecttijdlijnen en mogelijke oplossingen helder en bondig naar klanten.',

      safetyFirstTitle: 'Veiligheid Eerst',
      safetyFirstDescription: 'Onze onwrikbare toewijding aan veiligheid garandeert een veilige omgeving voor ons team en onze klanten bij elk project.',
      safetyFirstSafety: 'Naleving van OSHA-regelgeving, regelmatige veiligheidsaudits, verplichte PBM\'s en continue opleidingsprogramma\'s voor al het personeel. Wij hanteren een nul-incidenten filosofie.',
      safetyFirstQuality: 'Zelfs met veiligheid als topprioriteit doen wij geen concessies aan de kwaliteit en duurzaamheid van ons werk, waarbij veiligheid in elke kwaliteitscontrole wordt geïntegreerd.',
      safetyFirstClient: 'Dagelijkse veiligheidsbriefings en incidentrapporten (indien van toepassing) worden gecommuniceerd naar klanten, voor transparantie en gemoedsrust over de omstandigheden op locatie.',
    },

    // About Page
    about: {
      pageTitle: 'Over Russo NV',
      pageSubtitle: 'Industriële coating-expertise in heel België',
      ourStory: 'Ons Verhaal',
      ourMission: 'Onze Missie',
      ourValues: 'Onze Waarden',
      learnMore: 'Meer Informatie',
      heroLabel: 'Over Ons',
      heroLine1: 'Ons',
      heroLine2: 'Verhaal',
      heroDescription: 'Gespecialiseerde industriële coating- en oppervlaktevoorbereidingsdiensten — gebouwd op praktijkexpertise, veiligheid en compromisloze kwaliteit.',
      storyTitleLine1: 'Gebouwd Op',
      storyTitleLine2: 'Praktijkexpertise',
      storyParagraph1: 'Russo NV levert gespecialiseerde industriële coating-, oppervlaktevoorbereidings- en assetbeschermingsdiensten voor veeleisende omgevingen in heel België.',
      storyParagraph2: 'Wij ondersteunen opslagterminals, petrochemische installaties, industriële locaties en infrastructuurprojecten met oplossingen die zijn ontworpen om duurzaamheid, veiligheid en langetermijnprestaties te verbeteren.',
      storyParagraph3: 'Onze diensten omvatten tankrenovatie, abrasieve straling, hydrojetting, coatingtoepassing, corrosiebescherming en aanverwante onderhoudswerkzaamheden. Elk project wordt uitgevoerd met een sterke focus op veiligheid, kwaliteitscontrole en heldere communicatie van begin tot eind.',
      storyParagraph4: 'Met een hands-on en no-nonsense aanpak helpen wij klanten bij het onderhouden van kritieke assets en het voltooien van essentiële werkzaamheden met vertrouwen.',
      storyResponsiveSupport: 'Responsieve Projectondersteuning',
      storyInspectionQuality: 'Inspectiegestuurde Kwaliteit',
      missionTitle: 'Onze',
      missionHighlight: 'Missie & Waarden',
      missionDescription: 'Het leveren van industriële coatingoplossingen van de hoogste kwaliteit met een onwankelbare toewijding aan veiligheid, duurzaamheid en klanttevredenheid.',
      valueExpertTeamTitle: 'Deskundig Team',
      valueExpertTeamDesc: 'Gecertificeerde professionals met uitgebreide praktijkervaring in industriële coatingtoepassingen in diverse sectoren.',
      valueQualityTitle: 'Kwaliteit Voorop',
      valueQualityDesc: 'Elk project voldoet aan de hoogste industrienormen met strenge kwaliteitscontrole in elke fase van de uitvoering.',
      valueFastTitle: 'Efficiënte Uitvoering',
      valueFastDesc: 'Gefaseerde projectuitvoering en nauwgezette planning garanderen tijdige oplevering zonder concessies aan kwaliteit of veiligheid.',
      valueGlobalTitle: 'Europees Bereik',
      valueGlobalDesc: 'Actief in vijf landen met de flexibiliteit en expertise om projecten van elke omvang aan te pakken.',
      expertiseTitle: 'Onze',
      expertiseHighlight: 'Expertise',
      expertiseDescription: 'Gespecialiseerde industriële coatingdiensten ondersteund door uitgebreide veldervaring en toonaangevende certificeringen.',
      expertiseTankTitle: 'Tankcoating',
      expertiseTankDesc: 'Inwendige en uitwendige coatingsystemen voor opslagtanks, inclusief chemisch bestendige bekledingen en corrosiebescherming.',
      expertisePipelineTitle: 'Pijpleidingbescherming',
      expertisePipelineDesc: 'Hoogwaardige anticorrosiecoatings voor pijpleidingen in uitdagend terrein en ruwe omgevingen.',
      expertiseSteelTitle: 'Staalconstructies',
      expertiseSteelDesc: 'Beschermende coatings voor industriële staalconstructies inclusief balken, kolommen, kranen en draagconstructies.',
      expertiseSandblastingTitle: 'Zandstraling',
      expertiseSandblastingDesc: 'Professionele oppervlaktevoorbereiding met geavanceerde abrasieve straaltechnieken voor optimale coatinghechting.',
      expertiseFireproofingTitle: 'Brandbeveiliging',
      expertiseFireproofingDesc: 'Intumescerende en cementgebonden brandwerende systemen ter bescherming van constructieve elementen tegen brandschade.',
      expertiseProtectiveTitle: 'Beschermende Coatings',
      expertiseProtectiveDesc: 'Gespecialiseerde coatingsystemen waaronder antislip-, voedselveilige en hogetemperatuurbestendige toepassingen.',
      clientsTitle: 'Wie Wij',
      clientsHighlight: 'Bedienen',
      clientsDescription: 'Vertrouwd door toonaangevende bedrijven in een breed scala aan industriële sectoren.',
      clientChemicalPlants: 'Chemische Fabrieken',
      clientFoodProduction: 'Voedselproductie',
      clientStorageTerminals: 'Opslagterminals',
      clientTankFarms: 'Tankparken',
      clientIndustrialFactories: 'Industriële Fabrieken',
      clientWarehouses: 'Magazijnen',
      clientPipelineCompanies: 'Pijpleidingbedrijven',
      clientConstructionFirms: 'Bouwbedrijven',
      clientManufacturing: 'Productie',
      clientPetrochemical: 'Petrochemie',
      clientLogisticsCenters: 'Logistieke Centra',
      clientProcessingPlants: 'Verwerkingsfabrieken',
      ctaTitleLine1: 'Klaar Om Uw',
      ctaTitleHighlight: 'Volgende Project Te Starten?',
      ctaDescription: 'Laat ons onze expertise en kwaliteit inzetten voor uw industriële coatingbehoeften.',
      ctaButton: 'Offerte Aanvragen',
      ctaSecondaryButton: 'Projecten Bekijken',
    },

    // Contact Page
    contact: {
      pageTitle: 'Neem Contact Op',
      pageSubtitle: 'We zijn hier om u te helpen met uw industriële coatingbehoeften',
      heroLabel: 'Neem Contact Op',
      heroLine1: 'Contact',
      heroLine2: 'Opnemen',
      heroDescription: 'Vraag een offerte aan of neem contact op met ons team voor uw industriële coatingproject',
      contactForm: 'Contactformulier',
      formTitle: 'Offerte Aanvragen',
      formDescription: 'Vul het onderstaande formulier in en ons team neemt binnen 24 uur contact met u op',
      name: 'Volledige Naam',
      company: 'Bedrijfsnaam',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      projectType: 'Projecttype',
      selectService: 'Selecteer een dienst',
      sandblasting: 'Zandstralen',
      industrialPainting: 'Industrieel Schilderwerk',
      fireproofing: 'Brandwerende Coatings',
      protectiveCoatings: 'Beschermende Coatings',
      coatRemoval: 'Coatingverwijdering',
      tankCoating: 'Tankcoating',
      pipelineCoating: 'Pijpleidingcoating',
      other: 'Overig',
      projectDetails: 'Projectdetails',
      projectDetailsPlaceholder: 'Geef details over uw project, tijdlijn en eventuele specifieke vereisten...',
      message: 'Bericht',
      send: 'Verzoek Verzenden',
      sending: 'Verzenden...',
      toastTitle: 'Offerteaanvraag Ontvangen',
      toastDescription: 'Bedankt voor uw interesse. Ons team neemt binnen 24 uur contact met u op.',
      contactInfo: 'Contactgegevens',
      phoneLabel: 'Telefoon',
      emailLabel: 'E-mail',
      locationLabel: 'Locatie',
      locationValue: 'Antwerpen, België',
      servingRegion: 'Bedient BE, NL, FR, DE, LU',
      businessHours: 'Kantooruren',
      mondayFriday: 'Maandag - Vrijdag: 8:00 - 18:00',
      saturday: 'Zaterdag: 9:00 - 14:00',
      sunday: 'Zondag: Gesloten',
      emergencyContact: 'Noodcontact',
      emergencyDescription: 'Voor dringende projectzaken buiten kantooruren:',
      coverageTitle: 'Ons',
      coverageHighlight: 'Bereik',
      coverageDescription: 'Gevestigd in Antwerpen met projecten in vijf Europese landen',
      countryBelgium: 'België',
      countryNetherlands: 'Nederland',
      countryFrance: 'Frankrijk',
      countryGermany: 'Duitsland',
      countryLuxembourg: 'Luxemburg',
    },
  },
};

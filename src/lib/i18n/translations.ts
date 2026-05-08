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
      numberCopied: 'Number copied!',
      skipToContent: 'Skip to content',
    },

    // Footer
    footer: {
      quickLinks: 'Quick Links',
      ourServices: 'Our Services',
      contact: 'Contact',
      aboutUs: 'About Us',
      industriesServed: 'Industries Served',
      industrialPainting: 'Industrial Painting',
      sandblasting: 'Sandblasting',
      fireproofingCoatings: 'Fireproofing Coatings',
      protectiveCoatings: 'Protective Coatings',
      surfacePreparation: 'Surface Preparation',
      coatRemoval: 'Coat Removal',
      companyDescription:
        'Leading industrial coating and surface preparation company serving Belgium and neighboring countries since 1994. Specialized in heavy industry solutions with strict safety compliance.',
      location: 'Taxandriastraat 35, 2170 Antwerp',
      locationDirections: 'Open in Google Maps',
      backToTop: 'Back to top',
      servingRegion: 'Serving all of Europe',
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
      heroTitle: 'Industrial Coatings Antwerp',
      heroTitleLine1: 'Industrial',
      heroTitleLine2: 'Coatings',
      heroTitleLine3: 'Antwerp',
      heroLocation: 'Antwerp, Belgium',
      heroSubtitle: 'Industrial coatings, abrasive blasting, fireproofing and corrosion protection for petrochemical, marine and manufacturing clients across Belgium and the Netherlands.',
      heroImageAlt: 'Russo NV industrial coating crew applying protective coatings on a tank in the Port of Antwerp',
      teamImageAlt: 'Russo NV team applying industrial coatings on site in Antwerp',
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

      // --- Home page service-card titles + descriptions ---
      industrialCoatingTitle: 'Industrial Coating',
      industrialCoatingDesc:
        'Large-scale aesthetic and functional coating application for factories, terminals, and infrastructure.',
      sandBlastingTitle: 'Sand Blasting',
      sandBlastingDesc:
        'Complete surface preparation ensuring optimal coating adhesion through advanced abrasive techniques.',
      corrosionProtectionTitle: 'Corrosion Protection',
      corrosionProtectionDesc:
        'High-performance barrier systems designed to withstand extreme chemical and environmental aggression.',
      coatingInspectionTitle: 'Coating Inspection',
      coatingInspectionDesc:
        'Independent inspection and quality assurance of coating systems — verifying surface preparation, dry film thickness, adhesion, and compliance with project specifications.',
      waterjettingTitle: 'Waterjetting',
      waterjettingDesc:
        'Ultra-high-pressure water jetting for non-abrasive surface preparation, coating removal, and cleaning of contaminated industrial surfaces.',
      waterproofingTitle: 'Waterproofing',
      waterproofingDesc:
        'Seamless industrial waterproofing using the Kemperol 2K-PUR system to protect containment areas, tank foundations, bund walls, and critical infrastructure from water ingress and harsh environmental exposure.',

      // Bullets for the new Coating Inspection + Waterjetting cards
      dftVerification: 'DFT Verification',
      adhesionTesting: 'Adhesion Testing',
      complianceReporting: 'Compliance Reporting',
      uhpSurfacePrep: 'UHP Surface Prep',
      coatingStripping: 'Coating Stripping',
      hydroblasting: 'Hydroblasting',

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
      statsProjectUpdates: 'Project Updates',
      statsRealTimeData: 'Real-time Data',
      coreServicesLine1: 'CORE',
      coreServicesLine2: 'SERVICES',
      certVcaPetrochemical: 'VCA-P PETROCHEMICAL',
      certNaceCertified: 'NACE CERTIFIED',
      certSspcStandards: 'SSPC STANDARDS',
      certFrosioInspectors: 'FROSIO INSPECTORS',
      certApacCertification: 'APAC CERTIFICATION',
      certCertifiedSafetyAdvisor: 'CERTIFIED SAFETY ADVISOR',

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

      engineeringDurability: 'PROTECTING',
      durability: 'YOUR ASSETS',

      companyDescription:
        'Industrial coating is only as good as the preparation behind it. At Russo, we protect tanks, piping, steelwork, industrial facilities and so much more with careful surface preparation, quality coating systems and safe, reliable execution on site.',

      safetyFirstTitle: 'Safety First',
      safetyFirstDesc:
        'Strict adherence to VCA & NACE protocols ensures zero-incident operations in high-risk environments.',

      ourExpertise: 'Our Expertise',

      coreServices: 'CORE SERVICES',
      coreServicesDesc:
        'Comprehensive surface treatment solutions tailored for the most demanding industrial environments.',

      viewAllServices: 'View All Services',
      viewService: 'View this service',

      industriesServed: 'INDUSTRIES SERVED',
      globalReach: 'GLOBAL REACH',
      sectors: 'Sectors',
      builtForHeavyIndustry: 'BUILT FOR ALL INDUSTRY',
      builtFor: 'BUILT FOR',
      allIndustry: 'ALL INDUSTRY',

      featuredProject: 'Featured Project',
      totalTankFarm: 'TANK PARK',
      refurbishment: 'REFURBISHMENT',
      antwerpPort: 'ANTWERP PORT',
      duration18Months: 'Duration: 18 Months',

      projectDescription:
        'Large-scale refurbishment of 12 storage tanks at an industrial storage facility in the Port of Antwerp. The work included abrasive blasting, primer application, and a multi-coat epoxy protection system designed for durable corrosion protection.',

      scope: 'Scope',
      scopeDesc:
        'Abrasive blasting, primer application, and protective epoxy coating of 12 storage tanks.',

      challenge: 'Challenge',
      challengeDesc:
        'Working under strict environmental controls while adjacent facilities remained in operation.',

      specTanksLabel: 'Tanks',
      specTanksValue: '12 storage tanks',
      specSystemLabel: 'System',
      specSystemValue: 'Multi-coat epoxy',

      viewCaseStudy: 'View Case Study',

      readyToMobilize: 'READY TO MOBILIZE',
      ctaDescription:
        'Contact our team for a detailed consultation and quote. We respond to all inquiries within 24 hours.',

      requestQuote: 'Request Quote',
      callUsNow: 'Call Us Now',
      scroll: 'Scroll',
    },

    // Services Page UI
    services: {
      pageTitle: 'Industrial Coating Services',
      pageSubtitle: 'Comprehensive solutions for all kind of industries fullfiling all our clients needs',
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
      heroLine1: 'Industrial Coatings',
      heroLine2: '& Blasting',
      heroImageAlt: 'Industrial coating and abrasive blasting services in Antwerp',
    },

    // Services CMS Content
    servicesCms: {
      hpwjTitle: 'High-Pressure Water Jetting',
      hpwjDescription:
        'High-pressure water jetting is used for industrial cleaning, surface preparation, and removal of deposits, coatings, or contamination. It is a controlled method suitable for tanks, pipes, concrete surfaces, floors, and production areas where water-based cleaning is preferred over abrasive methods.',
      hpwjKeyBenefits:
        'Effective removal of dirt, deposits, and loose material; reduced dust compared with abrasive blasting; suitable for sensitive areas when properly controlled; and useful for cleaning, preparation, and maintenance work.',
      hpwjProcessOverview:
        'Site preparation and safety setup, selection of the correct pressure and nozzle, controlled water jetting, collection or management of debris and wastewater where required, and post-cleaning inspection.',
      hpwjTargetIndustries:
        'Refineries, petrochemical, marine, pulp & paper, utilities, food processing, construction, industrial facilities.',

      waterproofingTitle: 'Industrial Waterproofing (Kemperol System)',
      waterproofingDescription:
        'Industrial waterproofing systems are used to protect concrete, steel, containment areas, bund walls, tank foundations, sumps, roofs, and other surfaces exposed to water or chemical infiltration. Kemperol liquid-applied membranes create a seamless, reinforced waterproofing layer that can adapt to complex details, joints, penetrations, and irregular surfaces.',
      waterproofingKeyBenefits:
        'Seamless waterproof protection, strong adhesion to suitable substrates, flexible coverage around details and penetrations, resistance to standing water and weather exposure, and reliable protection for industrial environments.',
      waterproofingProcessOverview:
        'Inspection of the substrate, cleaning and preparation of the surface, repair of damaged areas where needed, primer application, installation of the reinforced Kemperol membrane system, curing, and final inspection.',
      waterproofingTargetIndustries:
        'Oil & gas, petrochemical, tank storage terminals, chemical processing, industrial facilities, infrastructure, energy & utilities.',

      industrialCoatingApplicationTitle: 'Industrial Coating Application',
      industrialCoatingApplicationDescription:
        'Industrial coating systems for steel structures, tanks, piping, machinery, and production environments. Each project starts with the right surface preparation, followed by primer and coating application according to the required specification. The goal is durable protection against corrosion, wear, chemicals, and demanding site conditions.',
      industrialCoatingApplicationKeyBenefits:
        'Durable asset protection, improved resistance to corrosion and wear, cleaner and more consistent finish, support for long-term maintenance planning, and coating systems applied in line with project requirements.',
      industrialCoatingApplicationProcessOverview:
        'Surface assessment, preparation by blasting or cleaning, primer application, intermediate coats where required, final coating application, and quality checks such as film thickness, adhesion, curing, and visual inspection.',
      industrialCoatingApplicationTargetIndustries:
        'Petrochemical, marine, food & beverage, pharmaceutical, automotive, manufacturing, mining, water treatment.',

      corrosionProtectionTitle: 'Corrosion Protection',
      corrosionProtectionDescription:
        'Corrosion protection focuses on preventing deterioration of steel, tanks, piping, and industrial structures exposed to moisture, chemicals, weather, or aggressive operating conditions. Depending on the environment, the work may include surface preparation, protective coating systems, linings, wraps, or targeted repair solutions.',
      corrosionProtectionKeyBenefits:
        'Helps reduce corrosion damage, supports asset reliability, extends the service life of steel surfaces, limits the need for premature repairs, and improves protection in demanding industrial environments.',
      corrosionProtectionProcessOverview:
        'Inspection of the affected surface, assessment of corrosion type and severity, preparation of the substrate, application of the selected protection system, and final checks to confirm coverage, adhesion, and finish quality.',
      corrosionProtectionTargetIndustries:
        'Oil & gas pipelines, marine vessels, chemical storage, wastewater treatment, infrastructure, mining.',

      fireproofingThermalTitle: 'Fireproofing & Thermal Insulation',
      fireproofingThermalDescription:
        'Fireproofing and thermal insulation systems help protect steel structures, vessels, equipment, and process areas from heat exposure and fire-related damage. Depending on the project requirements, this may include passive fire protection materials, intumescent coatings, cementitious sprays, or insulation systems for temperature control.',
      fireproofingThermalKeyBenefits:
        'Improved fire protection for structural and process assets, support for safety and compliance requirements, better temperature control, reduced heat loss where insulation is required, and added protection in high-risk industrial environments.',
      fireproofingThermalProcessOverview:
        'Review of project and fire-rating requirements, surface preparation, material selection, application by spray, trowel, wrap, or coating system, curing, thickness checks, and final inspection.',
      fireproofingThermalTargetIndustries:
        'Oil & gas, chemical plants, commercial buildings, power generation, manufacturing, data centers.',

      sandblastingAbrasiveTitle: 'Abrasive Blasting & Surface Preparation',
      sandblastingAbrasiveDescription:
        'Abrasive blasting is used to prepare steel and other industrial surfaces before coating, repair, or inspection. By removing rust, old coatings, scale, and surface contamination, the process creates the correct surface profile for strong coating adhesion and a longer-lasting finish.',
      sandblastingAbrasiveKeyBenefits:
        'Removes rust, scale, and old coating layers; improves coating adhesion; prepares surfaces for inspection or repair; and creates a clean, consistent profile before protective systems are applied.',
      sandblastingAbrasiveProcessOverview:
        'Initial surface assessment, masking of sensitive areas, selection of the appropriate abrasive and pressure, controlled blasting to the required profile, dust and residue removal, and final surface inspection before coating.',
      sandblastingAbrasiveTargetIndustries:
        'Oil & gas, marine, manufacturing, construction, infrastructure, chemical processing, power generation.',

      coatingInspectionTitle: 'Coating Inspection & Quality Control',
      coatingInspectionDescription:
        'Coating inspection helps confirm that surface preparation and coating application meet the required project specification. Checks can be carried out before, during, and after application to verify surface condition, coating thickness, adhesion, curing, and overall finish quality.',
      coatingInspectionKeyBenefits:
        'Supports consistent coating quality, helps identify issues before handover, reduces the risk of premature coating failure, provides clear project documentation, and gives clients better control over the finished result.',
      coatingInspectionProcessOverview:
        'Review of coating specifications, inspection of surface preparation, in-process checks during application, dry film thickness measurement, adhesion or holiday testing where required, documentation, final inspection, and handover.',
      coatingInspectionTargetIndustries:
        'Oil & gas, petrochemical, marine, infrastructure, power generation, manufacturing, water treatment.',
    },

    // Industries Page
    industries: {
      pageTitle: 'Industries Served',
      pageSubtitle: 'Specialized solutions across diverse industrial sectors',
      heroLabel: 'Our Reach',
      heroLine1: 'Industrial',
      heroLine2: 'Sectors',
      heroDescription: 'Industrial coatings and surface preparation for petrochemical, marine, food production, oil & gas, chemical and water-treatment sectors across Belgium and the Benelux.',
      heroImageAlt: 'Industrial sectors served by Russo NV — petrochemical, marine, manufacturing in Belgium',
      gridSectionLabel: 'Expertise By Sector',
      gridTitleLine1: 'Specialized',
      gridTitleHighlight: 'Solutions',
      gridDescription: 'From corrosive chemical plants to hygienic food processing facilities — every sector demands its own approach to surface preparation and protective coatings.',
      industryOverview: 'Industry Overview',
      workDescription: 'Our Work',
      keyServices: 'Key Services',
      typicalClients: 'Typical Clients',
      cardCta: 'Discuss This Sector',
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
      heroLine1: 'Coating Projects',
      heroLine2: 'in Belgium',
      heroDescription: 'Large-scale industrial coating, blasting and protection projects delivered across Antwerp, Ghent, Zeebrugge and the wider Benelux for petrochemical, marine and industrial clients.',
      heroImageAlt: 'Industrial coating projects delivered by Russo NV in the Port of Antwerp',
      gridSectionLabel: 'Selected Work',
      gridTitleLine1: 'A Look Into',
      gridTitleHighlight: 'Our Projects',
      gridDescription: 'A selection of large-scale coating, blasting and protection projects delivered to our clients - each with its own surface, schedule and constraints.',
      projectDetails: 'Project Details',
      clientName: 'Client',
      location: 'Location',
      completionDate: 'Completed',
      viewDetails: 'View Details',
      cardCta: 'Request a Similar Project',
      altAdditionalView: 'additional view',
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
      seaTankDescription: 'Large-scale refurbishment of 15 storage tanks at Sea Tank Terminal in the Port of Antwerp. The scope included exterior surface preparation, removal of existing coating layers, and application of protective coating systems for tanks used in a demanding chemical storage environment. Work was planned in phases across the storage site, with coordination around terminal operations, access requirements, safety controls, and environmental measures.',
      seaTankClient: 'Sea Tank Terminal',
      seaTankLocation: 'Port of Antwerp, Belgium',
      seaTankCompleted: 'October 2025',

      gtsTitle: 'New Build Coating Program',
      gtsDescription: 'Surface preparation and protective coating application for 16 newly constructed storage tanks at Ghent Tank Storage in the Port of Ghent. The work included interior and exterior preparation, coating application, and selected lining systems for tanks requiring additional chemical protection. The project was coordinated alongside ongoing construction activities and commissioning schedules, with attention to specification compliance and long-term corrosion protection.',
      gtsClient: 'Ghent Tank Storage (GTS)',
      gtsLocation: 'Port of Ghent, Belgium',
      gtsCompleted: 'April 2026',

      cspTitle: 'Crane Refurbishment',
      cspDescription: 'Structural refurbishment and corrosion protection work on three ship-to-shore container cranes at CSP Zeebrugge. The project included surface preparation, protective coating application, and treatment of steel components exposed to harsh maritime conditions. Working at height on active port equipment required careful access planning, safety coordination, and close cooperation with terminal operations.',
      cspClient: 'CSP Zeebrugge',
      cspLocation: 'Zeebrugge, Belgium',
      cspCompleted: 'November 2025',

      bnfwTitle: 'Food Storage Refurbishment',
      bnfwDescription: 'Interior refurbishment and protective coating work across multiple food storage warehouse halls at the BNFW facility in Zeebrugge. The project included surface preparation, corrosion treatment where required, and application of coating systems suitable for food storage environments. Work was planned in phases to support hygiene requirements, reduce disruption, and keep warehouse areas available for the client\'s operations where possible.',
      bnfwClient: 'BNFW',
      bnfwLocation: 'Zeebrugge, Belgium',
      bnfwCompleted: 'May 2025',

      itcRubisTitle: 'Anti-Slip & Roof Coating',
      itcRubisDescription: 'Protective coating project for eight large storage tanks at the ITC Rubis terminal in Zeebrugge. The scope included anti-slip coatings for walkways and access areas, together with protective coating work on tank roof surfaces exposed to coastal weather conditions. The project was carried out in an active terminal environment, with careful planning around safety, access, environmental controls, and ongoing site operations.',
      itcRubisClient: 'ITC Rubis',
      itcRubisLocation: 'Zeebrugge, Belgium',
      itcRubisCompleted: 'August 2025',
    },

    // Safety Page
    safety: {
      pageTitle: 'Safety & Compliance',
      pageSubtitle: 'Our commitment to the highest safety standards',
      heroLabel: 'Our Commitment',
      heroLine1: 'VCA &',
      heroLine2: 'Certifications',
      heroImageAlt: 'Russo NV certified industrial coating crew working under VCA petrochemical safety standards',
      heroDescription: 'Maintaining the highest standards of safety compliance and quality assurance in every project we undertake',
      safetyProtocols: 'Safety Protocols',
      certifications: 'Certifications',
      complianceStandards: 'Compliance Standards',
      valuesSectionLabel: 'How We Work',
      certsSectionLabel: 'Accredited Standards',
      commitmentSectionLabel: 'Our Commitment',
      valuesEmptyState: 'Our company values will be published here shortly.',
      expiredBadge: 'Expired',
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
      safetyFirstDesc2: 'Our commitment to safety compliance is backed by all the certifications and trust from all our clients.',
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
      heroLine1: 'Coating Specialists',
      heroLine2: 'from Antwerp',
      heroDescription: 'Specialized industrial coating and surface preparation services — built on practical expertise, safety, and uncompromising quality.',
      heroImageAlt: 'About Russo NV — industrial coating specialists based in Antwerp, Belgium',
      teamImageAlt: 'Russo NV crew on site — industrial coatings, blasting and fireproofing specialists in Antwerp',
      storySectionLabel: 'About Russo NV',
      missionSectionLabel: 'What Drives Us',
      expertiseSectionLabel: 'Service Areas',
      clientsSectionLabel: 'Who Trusts Us',
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
      heroLine1: 'Contact &',
      heroLine2: 'Quotes',
      heroImageAlt: 'Contact Russo NV in Antwerp for industrial coating, sandblasting and fireproofing quotes',
      heroDescription: 'Request a quote or get in touch with our team for your industrial coating project',
      contactForm: 'Contact Form',
      formSectionLabel: 'Start Your Project',
      formTitle: 'Request A Quote',
      formDescription: 'Fill out the form below and our team will get back to you within 24 hours',
      fieldsetDetails: 'Your details',
      fieldsetMessage: 'Your message',
      name: 'Full Name',
      company: 'Company Name',
      email: 'Email Address',
      phone: 'Phone Number',
      phoneInvalid: 'Please enter a valid phone number.',
      projectType: 'Project Type',
      selectService: 'Select a service',
      coatingApplication: 'Industrial Coating Application',
      sandblasting: 'Sandblasting',
      corrosionProtection: 'Corrosion Protection',
      fireproofing: 'Fireproofing & Thermal Insulation',
      waterproofing: 'Industrial Waterproofing',
      waterJetting: 'High-Pressure Water Jetting',
      coatingInspection: 'Coating Inspection',
      industrialPainting: 'Industrial Painting',
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
      submitErrorTitle: 'Submission Failed',
      submitErrorDescription: 'Something went wrong sending your request. Please try again, or reach us directly at info@russonv.be.',
      sendAnother: 'Send Another Request',
      contactInfo: 'Contact Info',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      locationLabel: 'Location',
      locationValue: 'Taxandriastraat 35, 2170 Antwerp',
      locationDirections: 'Open in Google Maps',
      servingRegion: 'Serving all of Europe',
      businessHours: 'Business Hours',
      mondayFriday: 'Monday - Friday: 8:00 - 18:30',
      saturday: 'Saturday: Closed',
      sunday: 'Sunday: Closed',
      emergencyContact: 'Emergency Contact',
      emergencyDescription: 'For urgent project matters outside business hours:',
      coverageSectionLabel: 'What Sets Us Apart',
      coverageTitle: 'Our',
      coverageHighlight: 'Coverage',
      coverageDescription: 'Based in Antwerp with projects across Europe',
      countryBelgium: 'Belgium',
      countryNetherlands: 'Netherlands',
      countryFrance: 'France',
      countryGermany: 'Germany',
      countryLuxembourg: 'Luxembourg',
      countryUK: 'United Kingdom',
      countryScandinavia: 'Scandinavia',
      countryRestOfEurope: 'Rest of Europe',
      allEurope: 'All of Europe',
      allEuropeDesc: 'Based in Belgium, operating across the continent',
      updatesTitle: 'Project Updates',
      updatesDesc: 'Real-time progress reports and direct communication throughout every project',
      qcTitle: 'Quality Control',
      qcDesc: 'Rigorous inspection at every stage to ensure coating performance and durability',
      safetyTitle: 'Safety Compliance',
      safetyDesc: 'Full adherence to VCA, ISO, and NACE standards on every job site',
    },

    // Legal pages (Privacy Policy and Terms of Service)
    legal: {
      heroLabel: 'Legal',
      lastUpdated: 'Last updated',
      lastUpdatedDate: '5 May 2026',
      backToTop: 'Back to top',

      privacyTitle: 'Privacy',
      privacyTitleHighlight: 'Policy',
      privacyIntro: 'This Privacy Policy explains how Russo NV collects, uses, and protects personal data through this website. We are committed to handling your information transparently and in line with the EU General Data Protection Regulation (GDPR).',

      privacy1Title: 'Who we are',
      privacy1Body: 'Russo NV is a Belgian company specialized in industrial coating and surface preparation services. Our registered office is at Taxandriastraat 35, 2170 Antwerp, Belgium. You can reach us at info@russonv.be or +32 475 43 48 19. For privacy-related questions, contact us using the same details. We act as the data controller for personal data processed through this website.',

      privacy2Title: 'What data we collect',
      privacy2Body: 'We collect personal data that you voluntarily share with us — primarily through the contact form on this website (your name, company, email address, phone number, and the content of your message). We also collect basic technical data automatically when you visit the site (IP address, browser type, pages viewed, referring website) for analytics, security, and to keep the site running properly.',

      privacy3Title: 'How we use your data',
      privacy3Body: 'We use your personal data to respond to your enquiries and prepare quotes; to manage our business relationship if you become a client; to comply with our legal and regulatory obligations; to maintain and improve the website and our services; and to ensure the security of our website and systems.',

      privacy4Title: 'Legal basis for processing',
      privacy4Body: 'We process your personal data on the following legal bases under the GDPR: your consent when you submit the contact form; the necessity of processing to take steps at your request prior to entering into a contract; our legitimate interests in operating, securing and improving our business, except where overridden by your rights and freedoms; and compliance with our legal obligations.',

      privacy5Title: 'Sharing your data',
      privacy5Body: 'We do not sell your personal data. We may share data with service providers who help us operate the website and run our business — including hosting, form processing, email delivery, and analytics — under appropriate contracts and confidentiality obligations. Our website is hosted on the Wix platform, which processes data on our behalf. We may also disclose data to competent authorities when required by law.',

      privacy6Title: 'International transfers',
      privacy6Body: 'Some of our service providers are located outside the European Economic Area. Where personal data is transferred outside the EEA, we rely on appropriate safeguards such as the European Commission\'s Standard Contractual Clauses or equivalent mechanisms to ensure your data remains protected.',

      privacy7Title: 'How long we keep your data',
      privacy7Body: 'We keep contact form submissions for as long as necessary to respond to your enquiry and, where applicable, for the duration of any business relationship that follows. After that, we either delete the data or retain it only as long as required by law (for example, accounting and tax records are typically retained for seven years in Belgium).',

      privacy8Title: 'Your rights',
      privacy8Body: 'Under the GDPR, you have the right to access the personal data we hold about you, to have inaccurate data corrected, to request deletion of your data, to restrict or object to certain processing, and to receive your data in a portable format. You also have the right to lodge a complaint with the Belgian Data Protection Authority (gegevensbeschermingsautoriteit.be) if you believe your rights have been infringed. To exercise these rights, contact us at info@russonv.be.',

      privacy9Title: 'Cookies',
      privacy9Body: 'Our website uses cookies and similar technologies to function correctly, remember your language preference, and understand how visitors use the site. You can manage cookie preferences through your browser settings. We will update this section as our cookie usage evolves.',

      privacy10Title: 'Security',
      privacy10Body: 'We take reasonable technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no system is perfectly secure and we cannot guarantee absolute security. If we become aware of a personal data breach affecting your data, we will notify you and the supervisory authority where required by law.',

      privacy11Title: 'Changes to this policy',
      privacy11Body: 'We may update this Privacy Policy from time to time to reflect changes in our practices, services, or applicable law. The most recent version will always be available on this page, with the "Last updated" date shown at the top. Continued use of the website after changes are posted constitutes acceptance of the updated policy.',

      privacy12Title: 'Contact us',
      privacy12Body: 'For any questions about this Privacy Policy or about how we handle your personal data, please contact us at info@russonv.be or by post at Russo NV, Taxandriastraat 35, 2170 Antwerp, Belgium.',

      termsTitle: 'Terms of',
      termsTitleHighlight: 'Service',
      termsIntro: 'These Terms of Service govern your use of the website russonv.com. By accessing or using the site, you agree to these Terms. If you do not agree, please do not use the site.',

      terms1Title: 'About these terms',
      terms1Body: 'These Terms of Service ("Terms") govern your use of the website russonv.com (the "Site"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site. Russo NV ("we", "us", "our") is a Belgian company with its registered office at Taxandriastraat 35, 2170 Antwerp, Belgium.',

      terms2Title: 'Our services',
      terms2Body: 'The Site provides information about our industrial coating, surface preparation, and related services. The content is for general information only. Any specific commercial relationship — including the scope, pricing, timeline, and terms of work — is governed by a separate written agreement signed between us and our client. Nothing on the Site constitutes a binding offer.',

      terms3Title: 'Acceptable use',
      terms3Body: 'You agree to use the Site only for lawful purposes. You must not use the Site in any way that could damage, disable, overburden, or impair it; attempt to gain unauthorised access to any part of the Site, our systems, or related networks; use any automated means to scrape or harvest content; transmit harmful code or otherwise interfere with normal use of the Site by others; or impersonate another person or misrepresent your affiliation.',

      terms4Title: 'Intellectual property',
      terms4Body: 'All content on the Site — including text, graphics, logos, images, and project photography — is owned by Russo NV or used under licence, and is protected by copyright and other intellectual property laws. You may view and print pages from the Site for your personal or internal business use. Any other use, including reproduction, modification, distribution, or commercial use, requires our prior written consent.',

      terms5Title: 'Project photography',
      terms5Body: 'Photographs of past projects shown on the Site are illustrative of our work. They are protected by copyright and may not be reused without our written permission. Where projects involve client sites, those photos are published with the relevant client\'s consent.',

      terms6Title: 'Third-party links',
      terms6Body: 'The Site may contain links to external websites that we do not operate or control. We are not responsible for the content, privacy practices, or accuracy of any external site, and including a link does not imply our endorsement of that site or its operator.',

      terms7Title: 'Disclaimer',
      terms7Body: 'We make reasonable efforts to keep the Site accurate and up to date, but the information is provided "as is" without warranty of any kind, express or implied. We do not warrant that the Site will be uninterrupted, error-free, or secure. Specific commitments about our services are only those set out in the signed agreement applicable to a given project.',

      terms8Title: 'Limitation of liability',
      terms8Body: 'To the fullest extent permitted by Belgian law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site, including loss of profits, business, or data. Nothing in these Terms excludes or limits liability that cannot be excluded or limited under Belgian law.',

      terms9Title: 'Privacy',
      terms9Body: 'Our handling of personal data is described in our Privacy Policy, available at russonv.com/privacy. By using the Site, you acknowledge that we will process your personal data as described there.',

      terms10Title: 'Governing law',
      terms10Body: 'These Terms and your use of the Site are governed by Belgian law. The courts of Antwerp, Belgium have exclusive jurisdiction over any dispute, except where applicable consumer law gives you the right to bring proceedings in your home jurisdiction.',

      terms11Title: 'Changes to these terms',
      terms11Body: 'We may update these Terms of Service from time to time. The most recent version will always be available on this page, with the "Last updated" date shown at the top. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms.',

      terms12Title: 'Contact us',
      terms12Body: 'For any questions about these Terms, please contact us at info@russonv.be or by post at Russo NV, Taxandriastraat 35, 2170 Antwerp, Belgium.',
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
      numberCopied: 'Nummer gekopieerd!',
      skipToContent: 'Sla over naar inhoud',
    },

    // Footer
    footer: {
      quickLinks: 'Snelle Links',
      ourServices: 'Onze Diensten',
      contact: 'Contact',
      aboutUs: 'Over Ons',
      industriesServed: 'Bediende Industrieën',
      industrialPainting: 'Industrieel Schilderen',
      sandblasting: 'Zandstralen',
      fireproofingCoatings: 'Brandwerende Coatings',
      protectiveCoatings: 'Beschermende Coatings',
      surfacePreparation: 'Oppervlaktebehandeling',
      coatRemoval: 'Coatingverwijdering',
      companyDescription:
        'Toonaangevend bedrijf in industriële coating en oppervlaktebehandeling dat België en buurlanden sinds 1994 bedient. Gespecialiseerd in zware industrieoplossingen met strikte veiligheidsnaleving.',
      location: 'Taxandriastraat 35, 2170 Antwerpen',
      locationDirections: 'Openen in Google Maps',
      backToTop: 'Terug naar boven',
      servingRegion: 'Actief in heel Europa',
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
      heroTitle: 'Industriële Coatings Antwerpen',
      heroTitleLine1: 'Industriële',
      heroTitleLine2: 'Coatings',
      heroTitleLine3: 'Antwerpen',
      heroLocation: 'Antwerpen, België',
      heroSubtitle:
        'Industriële coatings, stralen, brandwerende coatings en corrosiebescherming voor petrochemie, maritieme sector en industrie in heel België en Nederland.',
      heroImageAlt: 'Russo NV-coatingteam past beschermende industriële coatings toe op een tank in de haven van Antwerpen',
      teamImageAlt: 'Team van Russo NV brengt industriële coatings aan op locatie in Antwerpen',
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

      // --- Home page service-card titles + descriptions ---
      industrialCoatingTitle: 'Industriële Coating',
      industrialCoatingDesc:
        'Grootschalige esthetische en functionele coatingapplicaties voor fabrieken, terminals en infrastructuur.',
      sandBlastingTitle: 'Zandstralen',
      sandBlastingDesc:
        'Volledige oppervlaktevoorbereiding voor optimale coatinghechting via geavanceerde abrasieve technieken.',
      corrosionProtectionTitle: 'Corrosiebescherming',
      corrosionProtectionDesc:
        'Hoogwaardige barrièresystemen ontworpen om extreme chemische en milieubelastingen te weerstaan.',
      coatingInspectionTitle: 'Coatinginspectie',
      coatingInspectionDesc:
        'Onafhankelijke inspectie en kwaliteitsborging van coatingsystemen — verificatie van oppervlaktevoorbereiding, droge filmdikte, hechting en naleving van projectspecificaties.',
      waterjettingTitle: 'Waterjetten',
      waterjettingDesc:
        'Ultrahogedruk waterstralen voor niet-abrasieve oppervlaktevoorbereiding, coatingverwijdering en reiniging van vervuilde industriële oppervlakken.',
      waterproofingTitle: 'Waterdichting',
      waterproofingDesc:
        'Naadloze industriële waterdichting met het Kemperol 2K-PUR-systeem om opvangbakken, tankfunderingen, bundwanden en kritische infrastructuur te beschermen tegen waterindringing en zware omgevingsbelastingen.',

      // Bullets for the new Coating Inspection + Waterjetting cards
      dftVerification: 'DFT-controle',
      adhesionTesting: 'Hechtingstest',
      complianceReporting: 'Conformiteitsrapportage',
      uhpSurfacePrep: 'UHP Oppervlaktevoorbereiding',
      coatingStripping: 'Coatingverwijdering',
      hydroblasting: 'Hydroblasten',

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
      statsProjectUpdates: 'Projectupdates',
      statsRealTimeData: 'Realtime data',
      coreServicesLine1: 'KERN',
      coreServicesLine2: 'DIENSTEN',
      certVcaPetrochemical: 'VCA-P PETROCHEMIE',
      certNaceCertified: 'NACE-GECERTIFICEERD',
      certSspcStandards: 'SSPC-NORMEN',
      certFrosioInspectors: 'FROSIO-INSPECTEURS',
      certApacCertification: 'APAC-CERTIFICERING',
      certCertifiedSafetyAdvisor: 'GECERTIFICEERD VEILIGHEIDSADVISEUR',

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

      engineeringDurability: 'BESCHERMING VAN',
      durability: 'UW INSTALLATIES',

      companyDescription:
        'Een industriële coating is maar zo goed als de voorbereiding erachter. Bij Russo beschermen wij tanks, leidingen, staalconstructies, industriële installaties en veel meer met zorgvuldige oppervlaktevoorbereiding, kwalitatieve coatingsystemen en een veilige, betrouwbare uitvoering op de werf.',

      safetyFirstTitle: 'Veiligheid Eerst',
      safetyFirstDesc:
        'Strikte naleving van VCA- en preventieprotocollen garandeert een veilige uitvoering, zelfs in risicovolle omgevingen.',

      ourExpertise: 'Onze Expertise',

      coreServices: 'KERNDIENSTEN',
      coreServicesDesc:
        'Uitgebreide oplossingen voor oppervlaktebehandeling, afgestemd op de meest veeleisende industriële omgevingen.',

      viewAllServices: 'Alle Diensten Bekijken',
      viewService: 'Bekijk deze dienst',

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
        'Grootschalige renovatie van 12 opslagtanks in een industriële opslagfaciliteit in de Haven van Antwerpen. De werkzaamheden omvatten abrasief stralen, primertoepassing en een meerlaags epoxybeschermingssysteem ontworpen voor duurzame corrosiebescherming.',

      scope: 'Omvang',
      scopeDesc:
        'Abrasief stralen, primertoepassing en beschermende epoxycoating van 12 opslagtanks.',

      challenge: 'Uitdaging',
      challengeDesc:
        'Werken onder strikte milieueisen terwijl aangrenzende installaties in bedrijf bleven.',

      specTanksLabel: 'Tanks',
      specTanksValue: '12 opslagtanks',
      specSystemLabel: 'Systeem',
      specSystemValue: 'Meerlaags epoxy',

      viewCaseStudy: 'Casestudy Bekijken',

      readyToMobilize: 'KLAAR OM TE STARTEN',
      ctaDescription:
        'Neem contact op met ons team voor een gedetailleerd advies en offerte. Wij reageren op alle aanvragen binnen 24 uur.',

      requestQuote: 'Offerte Aanvragen',
      callUsNow: 'Bel Ons Nu',
      scroll: 'Scroll',
    },

    // Services Page UI
    services: {
      pageTitle: 'Industriële Coatingdiensten',
      pageSubtitle:
        'Uitgebreide oplossingen voor alle soorten industrieën, afgestemd op de behoeften van onze klanten',
      allServices: 'Alle Diensten',
      serviceDetails: 'Servicedetails',
      keyBenefits: 'Belangrijkste Voordelen',
      processOverview: 'Procesoverzicht',
      targetIndustries: 'Doelindustrieën',
      heroLine1: 'Industriële Coatings',
      heroLine2: '& Stralen',
      heroImageAlt: 'Industriële coatings en stralen in Antwerpen',
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
        'Hogedruk waterjetting wordt gebruikt voor industriële reiniging, oppervlaktevoorbereiding en het verwijderen van afzettingen, coatings of verontreiniging. Het is een gecontroleerde methode die geschikt is voor tanks, leidingen, betonnen oppervlakken, vloeren en productiezones waar waterreiniging de voorkeur krijgt boven abrasieve methoden.',
      hpwjKeyBenefits:
        'Doeltreffende verwijdering van vuil, afzettingen en losse materialen; minder stof in vergelijking met abrasief stralen; geschikt voor gevoelige zones bij correcte controle; en bruikbaar voor reiniging, voorbereiding en onderhoud.',
      hpwjProcessOverview:
        'Voorbereiding van de werkplek en veiligheidsopstelling, keuze van de juiste druk en nozzle, gecontroleerde waterjetting, opvang of beheer van afval en afvalwater waar nodig, en inspectie na de reiniging.',
      hpwjTargetIndustries:
        'Raffinaderijen, petrochemie, maritieme sector, pulp en papier, nutsvoorzieningen, voedingsindustrie, bouw, industriële installaties.',

      waterproofingTitle: 'Industriële Waterdichting (Kemperol-systeem)',
      waterproofingDescription:
        'Industriële waterdichtingssystemen worden gebruikt om beton, staal, opvangzones, bundwanden, tankfunderingen, putten, daken en andere oppervlakken te beschermen tegen water- of chemische indringing. Kemperol vloeibaar aangebrachte membranen vormen een naadloze, gewapende waterdichte laag die zich kan aanpassen aan complexe details, voegen, doorvoeren en onregelmatige oppervlakken.',
      waterproofingKeyBenefits:
        'Naadloze waterdichte bescherming, sterke hechting op geschikte ondergronden, flexibele afwerking rond details en doorvoeren, weerstand tegen stilstaand water en weersinvloeden, en betrouwbare bescherming voor industriële omgevingen.',
      waterproofingProcessOverview:
        'Inspectie van de ondergrond, reiniging en voorbereiding van het oppervlak, herstel van beschadigde zones waar nodig, aanbrengen van primer, installatie van het gewapende Kemperol-membraansysteem, uitharding en eindinspectie.',
      waterproofingTargetIndustries:
        'Olie en gas, petrochemie, tankopslagterminals, chemische verwerking, industriële installaties, infrastructuur, energie en nutsvoorzieningen.',

      industrialCoatingApplicationTitle: 'Industriële Coatingtoepassing',
      industrialCoatingApplicationDescription:
        'Industriële coatingsystemen voor staalconstructies, tanks, leidingen, machines en productieomgevingen. Elk project begint met de juiste oppervlaktevoorbereiding, gevolgd door primer- en coatingapplicatie volgens de vereiste specificatie. Het doel is duurzame bescherming tegen corrosie, slijtage, chemicaliën en veeleisende omstandigheden op de werf.',
      industrialCoatingApplicationKeyBenefits:
        'Duurzame bescherming van installaties, verbeterde weerstand tegen corrosie en slijtage, een schonere en meer uniforme afwerking, ondersteuning bij langetermijnonderhoud en coatingsystemen aangebracht volgens de projectvereisten.',
      industrialCoatingApplicationProcessOverview:
        'Beoordeling van het oppervlak, voorbereiding door stralen of reinigen, aanbrengen van primer, tussenlagen waar nodig, eindcoating en kwaliteitscontroles zoals laagdiktemeting, hechting, uitharding en visuele inspectie.',
      industrialCoatingApplicationTargetIndustries:
        'Petrochemie, maritieme sector, voeding en dranken, farmaceutische industrie, automotive, productie, mijnbouw, waterbehandeling.',

      corrosionProtectionTitle: 'Corrosiebescherming',
      corrosionProtectionDescription:
        'Corrosiebescherming richt zich op het voorkomen van aantasting van staal, tanks, leidingen en industriële constructies die zijn blootgesteld aan vocht, chemicaliën, weersinvloeden of agressieve werkingsomstandigheden. Afhankelijk van de omgeving kan het werk bestaan uit oppervlaktevoorbereiding, beschermende coatingsystemen, linings, wraps of gerichte herstelloplossingen.',
      corrosionProtectionKeyBenefits:
        'Beperkt corrosieschade, ondersteunt de betrouwbaarheid van installaties, verlengt de levensduur van staal, beperkt vroegtijdige herstellingen en verbetert de bescherming in veeleisende industriële omgevingen.',
      corrosionProtectionProcessOverview:
        'Inspectie van het aangetaste oppervlak, beoordeling van het type en de ernst van de corrosie, voorbereiding van de ondergrond, aanbrengen van het gekozen beschermingssysteem en eindcontroles om dekking, hechting en afwerkingskwaliteit te bevestigen.',
      corrosionProtectionTargetIndustries:
        'Olie- en gasleidingen, maritieme vaartuigen, chemische opslag, afvalwaterbehandeling, infrastructuur, mijnbouw.',

      fireproofingThermalTitle: 'Brandwering en Thermische Isolatie',
      fireproofingThermalDescription:
        'Brandwering- en thermische isolatiesystemen helpen staalconstructies, vaten, apparatuur en proceszones te beschermen tegen hittebelasting en brandgerelateerde schade. Afhankelijk van de projectvereisten kunnen passieve brandbeschermingsmaterialen, intumescente coatings, cementeuze sprays of isolatiesystemen voor temperatuurbeheer worden toegepast.',
      fireproofingThermalKeyBenefits:
        'Verbeterde brandbescherming voor structurele en procesgerelateerde activa, ondersteuning voor veiligheids- en conformiteitsvereisten, betere temperatuurbeheersing, minder warmteverlies waar isolatie vereist is, en extra bescherming in risicovolle industriële omgevingen.',
      fireproofingThermalProcessOverview:
        'Beoordeling van project- en brandweerstandsvereisten, oppervlaktevoorbereiding, materiaalkeuze, applicatie via spuiten, troffelen, wikkelen of coatingsysteem, uitharding, diktecontroles en eindinspectie.',
      fireproofingThermalTargetIndustries:
        'Olie en gas, chemische installaties, commerciële gebouwen, energieopwekking, productie, datacenters.',

      sandblastingAbrasiveTitle: 'Abrasief Stralen & Oppervlaktevoorbereiding',
      sandblastingAbrasiveDescription:
        'Abrasief stralen wordt gebruikt om staal en andere industriële oppervlakken voor te bereiden vóór het coaten, herstellen of inspecteren. Door roest, oude coatings, walshuid en oppervlakteverontreiniging te verwijderen, ontstaat het juiste oppervlakteprofiel voor sterke coatinghechting en een langere levensduur van de afwerking.',
      sandblastingAbrasiveKeyBenefits:
        'Verwijdert roest, walshuid en oude coatinglagen; verbetert de coatinghechting; bereidt oppervlakken voor op inspectie of herstel; en creëert een schoon, consistent profiel voordat beschermende systemen worden aangebracht.',
      sandblastingAbrasiveProcessOverview:
        'Initiële oppervlakbeoordeling, afschermen van gevoelige zones, keuze van het juiste straalmiddel en de juiste druk, gecontroleerd stralen tot het vereiste profiel, verwijderen van stof en residu, en eindinspectie van het oppervlak vóór het coaten.',
      sandblastingAbrasiveTargetIndustries:
        'Olie en gas, maritieme sector, productie, bouw, infrastructuur, chemische verwerking, energieopwekking.',

      coatingInspectionTitle: 'Coatinginspectie & Kwaliteitscontrole',
      coatingInspectionDescription:
        'Coatinginspectie helpt te bevestigen dat oppervlaktevoorbereiding en coatingapplicatie voldoen aan de vereiste projectspecificatie. Controles kunnen vóór, tijdens en na de applicatie worden uitgevoerd om de oppervlakteconditie, coatingdikte, hechting, uitharding en algehele afwerkingskwaliteit te verifiëren.',
      coatingInspectionKeyBenefits:
        'Ondersteunt een consistente coatingkwaliteit, helpt problemen te identificeren vóór oplevering, verlaagt het risico op vroegtijdig coatingfalen, levert duidelijke projectdocumentatie en geeft klanten meer controle over het eindresultaat.',
      coatingInspectionProcessOverview:
        'Beoordeling van coatingspecificaties, controle van de oppervlaktevoorbereiding, tussentijdse controles tijdens applicatie, droge laagdiktemeting, hechtings- of holidaytesten waar vereist, documentatie, eindinspectie en oplevering.',
      coatingInspectionTargetIndustries:
        'Olie en gas, petrochemie, maritieme sector, infrastructuur, energieopwekking, productie, waterbehandeling.',
    },

    // Industries Page
    industries: {
      pageTitle: 'Bediende Industrieën',
      pageSubtitle: 'Gespecialiseerde oplossingen in diverse industriële sectoren',
      heroLabel: 'Ons Bereik',
      heroLine1: 'Industriële',
      heroLine2: 'Sectoren',
      heroDescription: 'Industriële coatings en oppervlaktevoorbereiding voor petrochemie, maritieme sector, voedingsindustrie, olie & gas, chemie en waterzuivering in heel België en de Benelux.',
      heroImageAlt: 'Industriële sectoren bediend door Russo NV — petrochemie, maritiem en industrie in België',
      gridSectionLabel: 'Expertise Per Sector',
      gridTitleLine1: 'Gespecialiseerde',
      gridTitleHighlight: 'Oplossingen',
      gridDescription: 'Van corrosieve chemische installaties tot hygiënische voedselverwerkingsfaciliteiten — elke sector vereist een eigen aanpak van oppervlaktevoorbereiding en beschermende coatings.',
      industryOverview: 'Industrieoverzicht',
      workDescription: 'Ons Werk',
      keyServices: 'Belangrijkste Diensten',
      typicalClients: 'Typische Klanten',
      cardCta: 'Bespreek Deze Sector',
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
      heroLine1: 'Coatingprojecten',
      heroLine2: 'in België',
      heroDescription: 'Grootschalige industriële coating-, straal- en beschermingsprojecten gerealiseerd in Antwerpen, Gent, Zeebrugge en de bredere Benelux voor klanten in de petrochemie, maritieme sector en industrie.',
      heroImageAlt: 'Coatingprojecten van Russo NV in de haven van Antwerpen',
      gridSectionLabel: 'Geselecteerd Werk',
      gridTitleLine1: 'Een Kijkje In',
      gridTitleHighlight: 'Onze Projecten',
      gridDescription: 'Een selectie van grootschalige coating-, straal- en beschermingsprojecten geleverd aan onze klanten - elk met zijn eigen oppervlak, planning en uitdagingen.',
      projectDetails: 'Projectdetails',
      clientName: 'Klant',
      location: 'Locatie',
      completionDate: 'Voltooid',
      viewDetails: 'Details Bekijken',
      cardCta: 'Vraag een Vergelijkbaar Project Aan',
      altAdditionalView: 'extra weergave',
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
      seaTankDescription: 'Grootschalige renovatie van 15 opslagtanks bij Sea Tank Terminal in de Haven van Antwerpen. De scope omvatte uitwendige oppervlaktevoorbereiding, verwijdering van bestaande coatinglagen en het aanbrengen van beschermende coatingsystemen voor tanks die worden ingezet in een veeleisende chemische opslagomgeving. Het werk werd in fasen uitgevoerd over de opslagsite, in coördinatie met de terminaloperaties, toegangsvereisten, veiligheidsmaatregelen en milieuvoorschriften.',
      seaTankClient: 'Sea Tank Terminal',
      seaTankLocation: 'Haven van Antwerpen, België',
      seaTankCompleted: 'oktober 2025',

      gtsTitle: 'Coatingprogramma Nieuwbouw',
      gtsDescription: 'Oppervlaktevoorbereiding en aanbrengen van beschermende coatings voor 16 nieuw gebouwde opslagtanks bij Ghent Tank Storage in de Haven van Gent. Het werk omvatte inwendige en uitwendige voorbereiding, coatingapplicatie en geselecteerde liningsystemen voor tanks die extra chemische bescherming vereisten. Het project werd afgestemd op lopende bouwactiviteiten en inbedrijfstellingsschema\'s, met aandacht voor conformiteit met de specificaties en langdurige corrosiebescherming.',
      gtsClient: 'Ghent Tank Storage (GTS)',
      gtsLocation: 'Haven van Gent, België',
      gtsCompleted: 'april 2026',

      cspTitle: 'Kraanrenovatie',
      cspDescription: 'Structurele renovatie en corrosiebescherming van drie ship-to-shore containerkranen bij CSP Zeebrugge. Het project omvatte oppervlaktevoorbereiding, het aanbrengen van beschermende coatings en de behandeling van staalcomponenten blootgesteld aan zware maritieme omstandigheden. Werken op hoogte op actieve havenuitrusting vereiste een zorgvuldige toegangsplanning, veiligheidscoördinatie en nauwe samenwerking met de terminaloperaties.',
      cspClient: 'CSP Zeebrugge',
      cspLocation: 'Zeebrugge, België',
      cspCompleted: 'november 2025',

      bnfwTitle: 'Renovatie Voedselopslagfaciliteit',
      bnfwDescription: 'Inwendige renovatie en beschermende coating-werkzaamheden in meerdere voedselopslaghallen bij de BNFW-faciliteit in Zeebrugge. Het project omvatte oppervlaktevoorbereiding, corrosiebehandeling waar nodig en het aanbrengen van coatingsystemen geschikt voor voedselopslagomgevingen. Het werk werd in fasen gepland om hygiënevereisten te ondersteunen, verstoring te beperken en magazijnzones waar mogelijk beschikbaar te houden voor de bedrijfsvoering van de klant.',
      bnfwClient: 'BNFW',
      bnfwLocation: 'Zeebrugge, België',
      bnfwCompleted: 'mei 2025',

      itcRubisTitle: 'Antislip- & Dakcoating',
      itcRubisDescription: 'Beschermende coating voor acht grote opslagtanks bij de ITC Rubis-terminal in Zeebrugge. De scope omvatte antislipcoatings voor looppaden en toegangszones, samen met beschermende coatings op tankdakoppervlakken die zijn blootgesteld aan kustweersomstandigheden. Het project werd uitgevoerd in een actieve terminalomgeving, met zorgvuldige planning rond veiligheid, toegang, milieucontroles en lopende site-operaties.',
      itcRubisClient: 'ITC Rubis',
      itcRubisLocation: 'Zeebrugge, België',
      itcRubisCompleted: 'augustus 2025',
    },

    // Safety Page
    safety: {
      pageTitle: 'Veiligheid & Naleving',
      pageSubtitle: 'Onze inzet voor de hoogste veiligheidsnormen',
      heroLabel: 'Onze Toewijding',
      heroLine1: 'VCA &',
      heroLine2: 'Certificeringen',
      heroImageAlt: 'VCA-gecertificeerd team van Russo NV werkt volgens petrochemische veiligheidsnormen',
      heroDescription: 'Het handhaven van de hoogste normen op het gebied van veiligheidsnaleving en kwaliteitsborging bij elk project dat wij uitvoeren',
      safetyProtocols: 'Veiligheidsprotocollen',
      certifications: 'Certificeringen',
      complianceStandards: 'Nalevingsnormen',
      valuesSectionLabel: 'Hoe Wij Werken',
      certsSectionLabel: 'Geaccrediteerde Normen',
      commitmentSectionLabel: 'Onze Toewijding',
      valuesEmptyState: 'Onze bedrijfswaarden worden hier binnenkort gepubliceerd.',
      expiredBadge: 'Verlopen',
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
      safetyFirstDesc2: 'Onze toewijding aan veiligheidsnaleving wordt onderbouwd door al onze certificeringen en het vertrouwen van al onze klanten.',
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
      heroLine1: 'Coatingspecialist',
      heroLine2: 'uit Antwerpen',
      heroDescription: 'Gespecialiseerde industriële coating- en oppervlaktevoorbereidingsdiensten — gebouwd op praktijkexpertise, veiligheid en compromisloze kwaliteit.',
      heroImageAlt: 'Over Russo NV — specialist in industriële coatings uit Antwerpen, België',
      teamImageAlt: 'Team van Russo NV op locatie — specialisten in industriële coatings, stralen en brandwering in Antwerpen',
      storySectionLabel: 'Over Russo NV',
      missionSectionLabel: 'Wat Ons Drijft',
      expertiseSectionLabel: 'Vakgebieden',
      clientsSectionLabel: 'Wie Ons Vertrouwt',
      storyTitleLine1: 'Gebouwd Op',
      storyTitleLine2: 'Praktijk Expertise',
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
      heroLine1: 'Contact &',
      heroLine2: 'Offertes',
      heroImageAlt: 'Neem contact op met Russo NV in Antwerpen voor offertes voor industriële coatings, stralen en brandwerende coatings',
      heroDescription: 'Vraag een offerte aan of neem contact op met ons team voor uw industriële coatingproject',
      contactForm: 'Contactformulier',
      formSectionLabel: 'Start Uw Project',
      formTitle: 'Offerte Aanvragen',
      formDescription: 'Vul het onderstaande formulier in en ons team neemt binnen 24 uur contact met u op',
      fieldsetDetails: 'Uw gegevens',
      fieldsetMessage: 'Uw bericht',
      name: 'Volledige Naam',
      company: 'Bedrijfsnaam',
      email: 'E-mailadres',
      phone: 'Telefoonnummer',
      phoneInvalid: 'Voer een geldig telefoonnummer in.',
      projectType: 'Projecttype',
      selectService: 'Selecteer een dienst',
      coatingApplication: 'Industriële Coatingtoepassing',
      sandblasting: 'Zandstralen',
      corrosionProtection: 'Corrosiebescherming',
      fireproofing: 'Brandwerende Coatings & Thermische Isolatie',
      waterproofing: 'Industriële Waterdichting',
      waterJetting: 'Hogedrukwaterstralen',
      coatingInspection: 'Coatinginspectie',
      industrialPainting: 'Industrieel Schilderwerk',
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
      submitErrorTitle: 'Verzending Mislukt',
      submitErrorDescription: 'Er ging iets mis bij het verzenden van uw aanvraag. Probeer het opnieuw of neem direct contact op via info@russonv.be.',
      sendAnother: 'Nieuw Verzoek Verzenden',
      contactInfo: 'Contactgegevens',
      phoneLabel: 'Telefoon',
      emailLabel: 'E-mail',
      locationLabel: 'Locatie',
      locationValue: 'Taxandriastraat 35, 2170 Antwerpen',
      locationDirections: 'Openen in Google Maps',
      servingRegion: 'Actief in heel Europa',
      businessHours: 'Kantooruren',
      mondayFriday: 'Maandag - Vrijdag: 8:00 - 18:30',
      saturday: 'Zaterdag: Gesloten',
      sunday: 'Zondag: Gesloten',
      emergencyContact: 'Noodcontact',
      emergencyDescription: 'Voor dringende projectzaken buiten kantooruren:',
      coverageSectionLabel: 'Wat Ons Onderscheidt',
      coverageTitle: 'Ons',
      coverageHighlight: 'Bereik',
      coverageDescription: 'Gevestigd in Antwerpen met projecten in heel Europa',
      countryBelgium: 'België',
      countryNetherlands: 'Nederland',
      countryFrance: 'Frankrijk',
      countryGermany: 'Duitsland',
      countryLuxembourg: 'Luxemburg',
      countryUK: 'Verenigd Koninkrijk',
      countryScandinavia: 'Scandinavië',
      countryRestOfEurope: 'Rest van Europa',
      allEurope: 'Heel Europa',
      allEuropeDesc: 'Gevestigd in België, actief over het hele continent',
      updatesTitle: 'Updates',
      updatesDesc: 'Realtime voortgangsrapporten en directe communicatie gedurende elk project',
      qcTitle: 'QC Controle',
      qcDesc: 'Strenge inspectie in elke fase voor optimale coatingprestaties en duurzaamheid',
      safetyTitle: 'Veiligheid',
      safetyDesc: 'Volledige naleving van VCA-, ISO- en NACE-normen op elke werklocatie',
    },

    // Legal pages (Privacy Policy and Terms of Service)
    legal: {
      heroLabel: 'Juridisch',
      lastUpdated: 'Laatst bijgewerkt',
      lastUpdatedDate: '5 mei 2026',
      backToTop: 'Terug naar boven',

      privacyTitle: 'Privacy',
      privacyTitleHighlight: 'Beleid',
      privacyIntro: 'Dit Privacybeleid legt uit hoe Russo NV persoonsgegevens verzamelt, gebruikt en beschermt via deze website. Wij verbinden ons ertoe uw informatie transparant te behandelen, in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG / GDPR) van de EU.',

      privacy1Title: 'Wie wij zijn',
      privacy1Body: 'Russo NV is een Belgisch bedrijf gespecialiseerd in industriële coating- en oppervlaktevoorbereidingsdiensten. Onze maatschappelijke zetel bevindt zich op Taxandriastraat 35, 2170 Antwerpen, België. U kunt ons bereiken via info@russonv.be of +32 475 43 48 19. Voor privacygerelateerde vragen kunt u dezelfde gegevens gebruiken. Wij treden op als verwerkingsverantwoordelijke voor de persoonsgegevens die via deze website worden verwerkt.',

      privacy2Title: 'Welke gegevens wij verzamelen',
      privacy2Body: 'Wij verzamelen persoonsgegevens die u vrijwillig met ons deelt — voornamelijk via het contactformulier op deze website (uw naam, bedrijf, e-mailadres, telefoonnummer en de inhoud van uw bericht). Wij verzamelen ook automatisch basale technische gegevens wanneer u de site bezoekt (IP-adres, browsertype, bekeken pagina\'s, verwijzende website) voor analyse, beveiliging en de goede werking van de site.',

      privacy3Title: 'Hoe wij uw gegevens gebruiken',
      privacy3Body: 'Wij gebruiken uw persoonsgegevens om te reageren op uw vragen en offertes op te stellen; om onze zakelijke relatie te beheren als u klant wordt; om te voldoen aan onze wettelijke en regelgevende verplichtingen; om de website en onze diensten te onderhouden en te verbeteren; en om de beveiliging van onze website en systemen te waarborgen.',

      privacy4Title: 'Rechtsgrond voor verwerking',
      privacy4Body: 'Wij verwerken uw persoonsgegevens op de volgende rechtsgronden onder de AVG: uw toestemming wanneer u het contactformulier indient; de noodzaak van verwerking om op uw verzoek stappen te ondernemen vóór het sluiten van een overeenkomst; ons gerechtvaardigd belang bij het exploiteren, beveiligen en verbeteren van onze onderneming, behalve waar dit wordt overschreden door uw rechten en vrijheden; en naleving van onze wettelijke verplichtingen.',

      privacy5Title: 'Delen van uw gegevens',
      privacy5Body: 'Wij verkopen uw persoonsgegevens niet. Wij kunnen gegevens delen met dienstverleners die ons helpen de website en onze onderneming te exploiteren — waaronder hosting, formulierverwerking, e-mailbezorging en analyse — onder passende contracten en geheimhoudingsverplichtingen. Onze website wordt gehost op het Wix-platform, dat gegevens namens ons verwerkt. Wij kunnen ook gegevens vrijgeven aan bevoegde autoriteiten wanneer dit wettelijk vereist is.',

      privacy6Title: 'Internationale doorgifte',
      privacy6Body: 'Sommige van onze dienstverleners bevinden zich buiten de Europese Economische Ruimte. Wanneer persoonsgegevens buiten de EER worden doorgegeven, vertrouwen wij op passende waarborgen zoals de Standaardcontractbepalingen van de Europese Commissie of gelijkwaardige mechanismen om ervoor te zorgen dat uw gegevens beschermd blijven.',

      privacy7Title: 'Hoe lang wij uw gegevens bewaren',
      privacy7Body: 'Wij bewaren contactformulierinzendingen zo lang als nodig is om op uw vraag te reageren en, indien van toepassing, voor de duur van de daaropvolgende zakelijke relatie. Daarna verwijderen wij de gegevens of bewaren wij ze enkel zo lang als wettelijk vereist (bijvoorbeeld boekhoudkundige en fiscale documenten worden in België doorgaans zeven jaar bewaard).',

      privacy8Title: 'Uw rechten',
      privacy8Body: 'Op grond van de AVG heeft u het recht op inzage in de persoonsgegevens die wij over u bewaren, op correctie van onjuiste gegevens, op verwijdering van uw gegevens, op beperking van of bezwaar tegen bepaalde verwerkingen, en op ontvangst van uw gegevens in een overdraagbaar formaat. U heeft ook het recht om een klacht in te dienen bij de Belgische Gegevensbeschermingsautoriteit (gegevensbeschermingsautoriteit.be) als u meent dat uw rechten zijn geschonden. Om deze rechten uit te oefenen, kunt u contact met ons opnemen via info@russonv.be.',

      privacy9Title: 'Cookies',
      privacy9Body: 'Onze website gebruikt cookies en vergelijkbare technologieën om correct te functioneren, uw taalvoorkeur te onthouden en te begrijpen hoe bezoekers de site gebruiken. U kunt cookievoorkeuren beheren via uw browserinstellingen. Wij zullen deze sectie bijwerken naarmate ons cookiegebruik evolueert.',

      privacy10Title: 'Beveiliging',
      privacy10Body: 'Wij nemen redelijke technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen ongeoorloofde toegang, wijziging, openbaarmaking of vernietiging. Geen enkel systeem is echter perfect veilig en wij kunnen geen absolute beveiliging garanderen. Indien wij kennis krijgen van een datalek dat uw gegevens raakt, zullen wij u en de toezichthoudende autoriteit informeren waar dit wettelijk vereist is.',

      privacy11Title: 'Wijzigingen van dit beleid',
      privacy11Body: 'Wij kunnen dit Privacybeleid van tijd tot tijd bijwerken om wijzigingen in onze praktijken, diensten of toepasselijke wetgeving te weerspiegelen. De meest recente versie zal altijd op deze pagina beschikbaar zijn, met de datum "Laatst bijgewerkt" bovenaan. Voortgezet gebruik van de website na publicatie van wijzigingen geldt als aanvaarding van het bijgewerkte beleid.',

      privacy12Title: 'Contact',
      privacy12Body: 'Voor vragen over dit Privacybeleid of over hoe wij uw persoonsgegevens behandelen, kunt u contact met ons opnemen via info@russonv.be of per post aan Russo NV, Taxandriastraat 35, 2170 Antwerpen, België.',

      termsTitle: 'Service',
      termsTitleHighlight: 'Voorwaarden',
      termsIntro: 'Deze Servicevoorwaarden regelen uw gebruik van de website russonv.com. Door de site te bezoeken of te gebruiken, gaat u akkoord met deze Voorwaarden. Indien u niet akkoord gaat, gelieve de site niet te gebruiken.',

      terms1Title: 'Over deze voorwaarden',
      terms1Body: 'Deze Servicevoorwaarden ("Voorwaarden") regelen uw gebruik van de website russonv.com (de "Site"). Door de Site te bezoeken of te gebruiken, gaat u ermee akkoord gebonden te zijn aan deze Voorwaarden. Indien u niet akkoord gaat, gelieve de Site niet te gebruiken. Russo NV ("wij", "ons", "onze") is een Belgisch bedrijf met maatschappelijke zetel op Taxandriastraat 35, 2170 Antwerpen, België.',

      terms2Title: 'Onze diensten',
      terms2Body: 'De Site biedt informatie over onze industriële coating-, oppervlaktevoorbereidings- en aanverwante diensten. De inhoud is uitsluitend bedoeld voor algemene informatie. Elke specifieke commerciële relatie — inclusief de scope, prijs, planning en voorwaarden van het werk — wordt geregeld door een afzonderlijke schriftelijke overeenkomst die tussen ons en onze klant wordt ondertekend. Niets op de Site vormt een bindend aanbod.',

      terms3Title: 'Aanvaardbaar gebruik',
      terms3Body: 'U gaat ermee akkoord de Site uitsluitend voor wettelijke doeleinden te gebruiken. U mag de Site niet gebruiken op een manier die deze kan beschadigen, uitschakelen, overbelasten of aantasten; pogingen ondernemen om ongeoorloofde toegang te krijgen tot enig deel van de Site, onze systemen of gerelateerde netwerken; geautomatiseerde middelen gebruiken om inhoud te scrapen of te oogsten; schadelijke code verzenden of anderszins normaal gebruik door anderen verstoren; of zich voordoen als een andere persoon of uw band met een organisatie verkeerd voorstellen.',

      terms4Title: 'Intellectuele eigendom',
      terms4Body: 'Alle inhoud op de Site — inclusief tekst, afbeeldingen, logo\'s en projectfotografie — is eigendom van Russo NV of wordt onder licentie gebruikt, en wordt beschermd door auteursrecht en andere intellectuele-eigendomsrechten. U mag pagina\'s van de Site bekijken en afdrukken voor persoonlijk of intern zakelijk gebruik. Elk ander gebruik, inclusief reproductie, wijziging, verspreiding of commercieel gebruik, vereist onze voorafgaande schriftelijke toestemming.',

      terms5Title: 'Projectfotografie',
      terms5Body: 'Foto\'s van eerdere projecten op de Site zijn illustratief voor ons werk. Zij zijn beschermd door auteursrecht en mogen niet zonder onze schriftelijke toestemming worden hergebruikt. Wanneer projecten klantlocaties betreffen, worden die foto\'s gepubliceerd met toestemming van de betreffende klant.',

      terms6Title: 'Links naar derden',
      terms6Body: 'De Site kan links bevatten naar externe websites die wij niet exploiteren of beheren. Wij zijn niet verantwoordelijk voor de inhoud, privacypraktijken of nauwkeurigheid van enige externe site, en het opnemen van een link impliceert geen goedkeuring van die site of de exploitant ervan.',

      terms7Title: 'Disclaimer',
      terms7Body: 'Wij doen redelijke inspanningen om de Site nauwkeurig en actueel te houden, maar de informatie wordt verstrekt "zoals ze is" zonder enige uitdrukkelijke of impliciete garantie. Wij garanderen niet dat de Site ononderbroken, foutloos of veilig zal zijn. Specifieke verbintenissen over onze diensten zijn enkel die welke zijn opgenomen in de ondertekende overeenkomst die van toepassing is op een bepaald project.',

      terms8Title: 'Beperking van aansprakelijkheid',
      terms8Body: 'Voor zover wettelijk toegestaan onder Belgisch recht, zijn wij niet aansprakelijk voor enige indirecte, incidentele, bijzondere, gevolg- of strafschade die voortvloeit uit of verband houdt met uw gebruik van de Site, inclusief verlies van winst, omzet of gegevens. Niets in deze Voorwaarden sluit aansprakelijkheid uit of beperkt deze waar dit niet kan worden uitgesloten of beperkt onder Belgisch recht.',

      terms9Title: 'Privacy',
      terms9Body: 'Onze omgang met persoonsgegevens wordt beschreven in ons Privacybeleid, beschikbaar op russonv.com/privacy. Door de Site te gebruiken erkent u dat wij uw persoonsgegevens zullen verwerken zoals daarin beschreven.',

      terms10Title: 'Toepasselijk recht',
      terms10Body: 'Deze Voorwaarden en uw gebruik van de Site worden beheerst door Belgisch recht. De rechtbanken van Antwerpen, België, hebben exclusieve bevoegdheid voor elk geschil, behalve waar toepasselijk consumentenrecht u het recht geeft om procedures aanhangig te maken in uw eigen rechtsgebied.',

      terms11Title: 'Wijzigingen van deze voorwaarden',
      terms11Body: 'Wij kunnen deze Servicevoorwaarden van tijd tot tijd bijwerken. De meest recente versie zal altijd op deze pagina beschikbaar zijn, met de datum "Laatst bijgewerkt" bovenaan. Voortgezet gebruik van de Site na publicatie van wijzigingen geldt als aanvaarding van de bijgewerkte Voorwaarden.',

      terms12Title: 'Contact',
      terms12Body: 'Voor vragen over deze Voorwaarden, kunt u contact met ons opnemen via info@russonv.be of per post aan Russo NV, Taxandriastraat 35, 2170 Antwerpen, België.',
    },
  },
};

// Case studies: full project pages expanding the cards on /projects.
// Data-driven so each new study is an entry here plus zero template work.
// Every claim must be grounded in what the client already approved for
// publication (the /projects card) or facts Bruno supplies explicitly.
// Routing/meta/sitemap all derive from this array, like articles.ts.
import type { Locale } from '@/lib/page-meta';

export interface CaseStudyContent {
  kicker: string;
  h1: string;
  heroSub: string;
  heroAlt: string;
  secondaryAlt?: string;
  facts: { label: string; value: string }[];
  sections: { title: string; paragraphs: string[] }[];
  related: { to: string; label: string }[];
  relatedTitle: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  backToProjects: string;
}

export interface CaseStudy {
  /** Shared URL slug across locales, under /projects/. */
  slug: string;
  client: string;
  completion: string;
  heroImage: string;
  secondaryImage?: string;
  breadcrumb: Record<Locale, string>;
  meta: Record<Locale, { title: string; description: string; image: string }>;
  NL: CaseStudyContent;
  EN: CaseStudyContent;
}

export const CASE_STUDY_BASE = '/projects';
export const caseStudyUrl = (slug: string) => `${CASE_STUDY_BASE}/${slug}`;

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'silo-renovatie-albeton',
    client: 'Albeton',
    completion: '2026-08-01',
    heroImage: '/images/albeton-full.jpg',
    secondaryImage: '/images/albeton1.jpg',
    breadcrumb: { NL: 'Silorenovatie Albeton', EN: 'Albeton silo renovation' },
    meta: {
      NL: {
        title: 'Silorenovatie Albeton, Diemen | Case study | Russo NV',
        description: 'Complete renovatie en herschildering van de cementsilo’s en staalinfrastructuur bij Albeton in Diemen, in 2,5 weken en zonder productiestilstand. Zo pakten we het aan.',
        image: '/images/albeton-full.jpg',
      },
      EN: {
        title: 'Albeton Silo Renovation, Diemen | Case Study | Russo NV',
        description: 'Complete renovation and repainting of the cement silos and steel infrastructure at Albeton in Diemen, in 2.5 weeks and without a production stop. This is how we did it.',
        image: '/images/albeton-full.jpg',
      },
    },
    NL: {
      kicker: 'Case study',
      h1: 'Silorenovatie bij Albeton, Diemen',
      heroSub: 'Complete renovatie en herschildering van de cementsilo’s en omliggende staalinfrastructuur van een draaiende betoncentrale. Opgeleverd in 2,5 weken, zonder één dag productiestilstand.',
      heroAlt: 'Gerenoveerde en herschilderde cementsilo’s van Albeton in Diemen',
      secondaryAlt: 'Detail van de gerenoveerde silo’s en staalstructuur bij Albeton',
      facts: [
        { label: 'Klant', value: 'Albeton' },
        { label: 'Locatie', value: 'Diemen (Amsterdam), Nederland' },
        { label: 'Scope', value: 'Silo’s, draagstructuren, leidingwerk en transportinstallatie' },
        { label: 'Doorlooptijd', value: '2,5 weken' },
        { label: 'Productie', value: 'Centrale bleef volledig in bedrijf' },
        { label: 'Coatingsysteem', value: 'SigmaCover 350 + SigmaDur 550H (PPG)' },
        { label: 'Kleuren', value: 'RAL 5009, RAL 7022, RAL 1003' },
        { label: 'Oplevering', value: 'Augustus 2026' },
      ],
      sections: [
        {
          title: 'De opdracht',
          paragraphs: [
            'Albeton, een betoncentrale in Diemen bij Amsterdam, wilde zijn cementsilo’s en de omliggende staalinfrastructuur volledig laten renoveren en herschilderen. De installatie stond er na jaren dienst zoals je verwacht van staal in weer en wind: corrosieplekken op de silowanden, verweerde verflagen op de draagstructuren en een transportinstallatie die zijn beste kleur kwijt was.',
            'De scope omvatte de behandeling van alle corrosieplekken, het volledig schuren en reinigen van de oppervlakken, plaatselijke bijwerkingen en een complete nieuwe afwerklaag over de silo’s, de draagstructuren, het leidingwerk en de transportinstallatie.',
          ],
        },
        {
          title: 'De uitdaging: schilderen boven een draaiende centrale',
          paragraphs: [
            'Eén voorwaarde stond vast: de centrale kon niet dicht. Betonmixers bleven de hele dag laden ónder de silo’s waar wij aan het werk waren, en de transportbanden bleven in dienst. Al het werk gebeurde bovendien op hoogte.',
            'Dat betekende strakke fasering per zone, strikte veiligheidsmaatregelen en dagelijkse afstemming met de productieplanning: elke ochtend werd vastgelegd welke zones vrijgegeven waren, waar de mixers mochten laden en waar wij konden werken zonder dat iemand onder ons stond.',
          ],
        },
        {
          title: 'De aanpak',
          paragraphs: [
            'We werkten de installatie zone per zone af, telkens in dezelfde volgorde. Eerst het volledige oppervlak grondig reinigen onder hoge druk, roestige zones handmatig ontroesten tot St2/St3 en de bestaande coating volledig opschuren zodat de nieuwe lagen zich kunnen vastzetten. Daarna stofvrij maken, en pas dan verf.',
            'De opbouw was een drielaags PPG Sigma-systeem: kale en geroeste plekken kregen eerst een plaatselijke primer SigmaCover 350 Alu, daarna volgde een volledige tussenlaag SigmaCover 350 en tot slot de polyurethaan eindlaag SigmaDur 550H, per zone in zijn eigen kleur: blauw (RAL 5009) op de silo’s, grijs (RAL 7022) op de onderstellen en geel (RAL 1003) op de accenten. Zo kreeg elke zone zijn volledige systeem voor we naar de volgende schoven, en bleef het aantal ingenomen werkzones op elk moment beperkt.',
            'Door die fasering kon de productie blijven draaien terwijl de installatie zichtbaar vernieuwde: geen grote stilgelegde zones, wel elke week een stuk installatie dat af was.',
          ],
        },
        {
          title: 'Het resultaat',
          paragraphs: [
            'De volledige renovatie werd opgeleverd in twee en een halve week, zonder productiestilstand. De silo’s, draagstructuren, het leidingwerk en de transportinstallatie kregen hun complete nieuwe afwerklaag, en Albeton hield er een installatie aan over die weer jaren tegen het Nederlandse klimaat kan.',
            'Parallel aan Diemen voerde ons team ook straal- en schilderwerken uit op de Albeton-site in Amsterdam, met stralen tot Sa 2,5 en hetzelfde coatingsysteem. Voor ons was dit dubbelproject het bewijs dat onze werkwijze de grens over reist: dezelfde fasering en veiligheidsaanpak die we dagelijks toepassen in de Antwerpse haven, werkt net zo goed op operationele sites in Nederland.',
          ],
        },
      ],
      related: [
        { to: '/services/corrosiebescherming', label: 'Corrosiebescherming & conservering' },
        { to: '/', label: 'Industriële schilderwerken' },
        { to: '/services/industrieel-stralen', label: 'Industrieel stralen' },
      ],
      relatedTitle: 'Diensten in dit project',
      ctaTitle: 'Een gelijkaardig project?',
      ctaText: 'Silo’s, tanks of staalstructuren die aan renovatie toe zijn, terwijl uw site moet blijven draaien? Bezorg ons de situatie en u krijgt een duidelijke aanpak met fasering en offerte.',
      ctaButton: 'Vraag een offerte aan',
      backToProjects: 'Alle projecten',
    },
    EN: {
      kicker: 'Case study',
      h1: 'Silo renovation at Albeton, Diemen',
      heroSub: 'Complete renovation and repainting of the cement silos and surrounding steel infrastructure of an operating concrete plant. Delivered in 2.5 weeks, without a single day of production stop.',
      heroAlt: 'Renovated and repainted cement silos of Albeton in Diemen',
      secondaryAlt: 'Detail of the renovated silos and steel structure at Albeton',
      facts: [
        { label: 'Client', value: 'Albeton' },
        { label: 'Location', value: 'Diemen (Amsterdam), the Netherlands' },
        { label: 'Scope', value: 'Silos, support structures, piping and conveyor installation' },
        { label: 'Duration', value: '2.5 weeks' },
        { label: 'Production', value: 'Plant remained fully operational' },
        { label: 'Coating system', value: 'SigmaCover 350 + SigmaDur 550H (PPG)' },
        { label: 'Colours', value: 'RAL 5009, RAL 7022, RAL 1003' },
        { label: 'Completion', value: 'August 2026' },
      ],
      sections: [
        {
          title: 'The assignment',
          paragraphs: [
            'Albeton, a concrete plant in Diemen near Amsterdam, wanted its cement silos and the surrounding steel infrastructure fully renovated and repainted. After years of service the installation looked the way steel in wind and weather does: corrosion spots on the silo walls, weathered paint on the support structures and a conveyor installation that had lost its best colour.',
            'The scope covered treatment of all corrosion spots, full sanding and cleaning of the surfaces, local touch-ups and a complete new finishing coat across the silos, support structures, piping and conveyor installation.',
          ],
        },
        {
          title: 'The challenge: painting above a running plant',
          paragraphs: [
            'One condition was fixed: the plant could not close. Mixer trucks kept loading all day underneath the silos we were working on, and the conveyor belts stayed in service. On top of that, all work was at height.',
            'That meant tight phasing per zone, strict safety measures and daily coordination with the production planning: every morning it was agreed which zones were released, where the mixers could load and where we could work without anyone standing below us.',
          ],
        },
        {
          title: 'The approach',
          paragraphs: [
            'We worked through the installation zone by zone, each time in the same order. First a thorough high-pressure clean of the full surface, manual derusting of corroded zones to St2/St3 and complete sanding of the existing coating so the new layers can key in. Then dust-free, and only then paint.',
            'The build-up was a three-coat PPG Sigma system: bare and rusted spots first received a local primer of SigmaCover 350 Alu, then a full intermediate coat of SigmaCover 350, and finally the polyurethane topcoat SigmaDur 550H, each zone in its own colour: blue (RAL 5009) on the silos, grey (RAL 7022) on the support structures and yellow (RAL 1003) on the accents. That way every zone received its complete system before we moved to the next one, and the number of occupied work zones stayed limited at any moment.',
            'That phasing let production keep running while the installation visibly renewed: no large shut-down zones, but every week another part of the plant finished.',
          ],
        },
        {
          title: 'The result',
          paragraphs: [
            'The full renovation was delivered in two and a half weeks, without a production stop. The silos, support structures, piping and conveyor installation received their complete new finishing coat, and Albeton kept an installation that can face the Dutch climate for years again.',
            'In parallel with Diemen, our team also carried out blasting and painting works at the Albeton site in Amsterdam, with blasting to Sa 2.5 and the same coating system. For us this double project proved that our way of working travels across the border: the same phasing and safety approach we apply daily in the port of Antwerp works just as well on operational sites in the Netherlands.',
          ],
        },
      ],
      related: [
        { to: '/services/corrosiebescherming', label: 'Corrosion protection & preservation' },
        { to: '/services/industriele-schilderwerken', label: 'Industrial painting' },
        { to: '/services/industrieel-stralen', label: 'Industrial blasting' },
      ],
      relatedTitle: 'Services in this project',
      ctaTitle: 'A similar project?',
      ctaText: 'Silos, tanks or steel structures due for renovation, while your site has to keep running? Send us the situation and you will receive a clear approach with phasing and a quote.',
      ctaButton: 'Request a quote',
      backToProjects: 'All projects',
    },
  },
  {
    slug: 'tankcoating-gts-gent',
    client: 'Ghent Tank Storage (GTS)',
    completion: '2026-04-01',
    heroImage: '/images/gts1.jpg',
    secondaryImage: '/images/gts3.jpg',
    breadcrumb: { NL: 'Tankcoating GTS Gent', EN: 'GTS Ghent tank coating' },
    meta: {
      NL: {
        title: 'Tankcoating in Gent: 16 nieuwbouwtanks bij GTS | Russo NV',
        description: 'Volledige oppervlaktevoorbereiding en coating van 16 nieuwe opslagtanks bij Ghent Tank Storage in de haven van Gent, binnen- en buitenzijde, inclusief inwendige linings.',
        image: '/images/gts1.jpg',
      },
      EN: {
        title: 'Tank Coating in Ghent: 16 New-Build Tanks at GTS | Russo NV',
        description: 'Complete surface preparation and coating of 16 newly built storage tanks at Ghent Tank Storage in the Port of Ghent, inside and out, including internal linings.',
        image: '/images/gts1.jpg',
      },
    },
    NL: {
      kicker: 'Case study',
      h1: 'Tankcoating voor 16 nieuwbouwtanks bij GTS, haven van Gent',
      heroSub: 'Volledige oppervlaktevoorbereiding en beschermende coating van 16 nieuw gebouwde opslagtanks, binnen- en buitenzijde, met gespecialiseerde inwendige linings voor chemische en petroleumproducten. Opgeleverd op een werkende nieuwbouwsite, binnen de commissioningdeadlines.',
      heroAlt: 'Nieuwbouw opslagtanks bij Ghent Tank Storage in de haven van Gent, gecoat door Russo NV',
      secondaryAlt: 'Coatingwerken aan een opslagtank bij GTS in Gent',
      facts: [
        { label: 'Klant', value: 'Ghent Tank Storage (GTS)' },
        { label: 'Locatie', value: 'Haven van Gent, Belgi\u00eb' },
        { label: 'Scope', value: '16 nieuwbouwtanks, binnen- en buitenzijde' },
        { label: 'Specialiteit', value: 'Inwendige linings voor chemie en petroleum' },
        { label: 'Voorbereiding', value: 'Volledig stralen, in- en uitwendig' },
        { label: 'Site', value: 'Actieve nieuwbouwwerf' },
        { label: 'Deadline', value: 'Commissioningplanning gehaald' },
        { label: 'Oplevering', value: 'April 2026' },
      ],
      sections: [
        {
          title: 'De opdracht',
          paragraphs: [
            'Ghent Tank Storage bouwde in de haven van Gent een reeks nieuwe opslagtanks en zocht een partij die de volledige coatingscope in één kon nemen: zestien nieuw geconstrueerde tanks, van kaal staal tot beschermd systeem, zowel de buitenzijde als de binnenzijde.',
            'Een deel van de tanks was bestemd voor chemische en petroleumproducten en vroeg daarom om gespecialiseerde inwendige liningsystemen: bekledingen die naast corrosiebescherming ook chemische resistentie leveren, afgestemd op het opgeslagen product.',
          ],
        },
        {
          title: 'De uitdaging: coaten op een werkende nieuwbouwwerf',
          paragraphs: [
            'Op een nieuwbouwsite ben je nooit alleen. Terwijl wij straalden en coatten, liepen de constructiewerken door en stonden de commissioningdata van de terminal vast. Dat vroeg om strakke coordinatie met de andere aannemers, werkvolgordes per tank en een planning die geen ruimte liet om een tank te laten aanslepen.',
            'Binnenwerk in tanks betekent bovendien werken in besloten ruimte: gecontroleerde toegang, ventilatie, klimaatbeheersing en metingen voor elke stap.',
          ],
        },
        {
          title: 'De aanpak',
          paragraphs: [
            'Elke tank doorliep dezelfde keten. Eerst volledig stralen, binnen en buiten, tot de reinheidsgraad die het coatingsysteem vraagt, met controle van reinheid en straalprofiel voor vrijgave. Daarna de systeemopbouw laag per laag, met klimaatmetingen voor elke coatingactiviteit en laagdiktemetingen na elke laag.',
            'Voor de tanks met inwendige lining werd het systeem afgestemd op het toekomstige product, aangebracht onder gecontroleerde condities en volledig gedocumenteerd. Zo kreeg de terminal per tank een dossier dat aantoont wat er op het staal zit, van straalverslag tot einddiktes.',
          ],
        },
        {
          title: 'Het resultaat',
          paragraphs: [
            'Zestien tanks, binnen en buiten beschermd en klaar voor decennia dienst in het havenklimaat van Gent, opgeleverd binnen de commissioningplanning van de terminal. De combinatie van stralen, coating en lining in één hield de planning strak en de verantwoordelijkheid ondubbelzinnig.',
            'GTS bleef na dit programma een vaste klant: ook voor latere projecten in de haven van Gent staat Russo NV op de terminal aan het werk.',
          ],
        },
      ],
      related: [
        { to: '/services/tankcoating', label: 'Tankcoating & tank lining' },
        { to: '/services/industrieel-stralen', label: 'Industrieel stralen' },
        { to: '/services/corrosiebescherming', label: 'Corrosiebescherming' },
      ],
      relatedTitle: 'Diensten in dit project',
      ctaTitle: 'Tanks te coaten in Gent of elders?',
      ctaText: 'Van nieuwbouwtanks tot renovatie van bestaande tankparken: bezorg ons uw specificatie en u krijgt een duidelijke aanpak met systeemkeuze, planning en offerte.',
      ctaButton: 'Vraag een offerte aan',
      backToProjects: 'Alle projecten',
    },
    EN: {
      kicker: 'Case study',
      h1: 'Tank coating for 16 new-build tanks at GTS, Port of Ghent',
      heroSub: 'Complete surface preparation and protective coating of 16 newly constructed storage tanks, inside and out, with specialized internal linings for chemical and petroleum products. Delivered on an active new-build site, within the commissioning deadlines.',
      heroAlt: 'New-build storage tanks at Ghent Tank Storage in the Port of Ghent, coated by Russo NV',
      secondaryAlt: 'Coating works on a storage tank at GTS in Ghent',
      facts: [
        { label: 'Client', value: 'Ghent Tank Storage (GTS)' },
        { label: 'Location', value: 'Port of Ghent, Belgium' },
        { label: 'Scope', value: '16 new-build tanks, interior and exterior' },
        { label: 'Specialty', value: 'Internal linings for chemicals and petroleum' },
        { label: 'Preparation', value: 'Full blasting, inside and out' },
        { label: 'Site', value: 'Active construction site' },
        { label: 'Deadline', value: 'Commissioning schedule met' },
        { label: 'Completion', value: 'April 2026' },
      ],
      sections: [
        {
          title: 'The assignment',
          paragraphs: [
            'Ghent Tank Storage built a series of new storage tanks in the Port of Ghent and looked for one party to take the complete coating scope in one hand: sixteen newly constructed tanks, from bare steel to protected system, both exterior and interior.',
            'Part of the tanks was destined for chemical and petroleum products and therefore required specialized internal lining systems: coatings that deliver chemical resistance on top of corrosion protection, matched to the stored product.',
          ],
        },
        {
          title: 'The challenge: coating on an active new-build site',
          paragraphs: [
            'On a new-build site you are never alone. While we blasted and coated, construction continued around us and the terminal commissioning dates were fixed. That demanded tight coordination with the other contractors, work sequences per tank and a schedule with no room to let a tank drag.',
            'Interior work in tanks also means confined-space conditions: controlled access, ventilation, climate control and measurements before every step.',
          ],
        },
        {
          title: 'The approach',
          paragraphs: [
            'Every tank went through the same chain. First full blasting, inside and out, to the cleanliness grade the coating system demands, with cleanliness and profile checks before release. Then the system build-up coat by coat, with climate measurements before every coating activity and film thickness measurements after every coat.',
            'For the tanks with internal linings, the system was matched to the future product, applied under controlled conditions and fully documented. The terminal received a dossier per tank proving what sits on the steel, from blasting report to final thicknesses.',
          ],
        },
        {
          title: 'The result',
          paragraphs: [
            'Sixteen tanks, protected inside and out and ready for decades of service in the Ghent port climate, delivered within the terminal commissioning schedule. Blasting, coating and lining in one hand kept the planning tight and the responsibility unambiguous.',
            'GTS remained a regular client after this program: Russo NV keeps working on the terminal in the Port of Ghent on later projects as well.',
          ],
        },
      ],
      related: [
        { to: '/services/tankcoating', label: 'Tank coating & lining' },
        { to: '/services/industrieel-stralen', label: 'Industrial blasting' },
        { to: '/services/corrosiebescherming', label: 'Corrosion protection' },
      ],
      relatedTitle: 'Services in this project',
      ctaTitle: 'Tanks to coat in Ghent or elsewhere?',
      ctaText: 'From new-build tanks to renovation of existing tank farms: send us your specification and you will receive a clear approach with system choice, planning and quote.',
      ctaButton: 'Request a quote',
      backToProjects: 'All projects',
    },
  },
  {
    slug: 'tankrenovatie-sea-tank-terminal-antwerpen',
    client: 'Sea Tank Terminal',
    completion: '2025-10-15',
    heroImage: '/images/stt3.jpg',
    secondaryImage: '/images/stt2.jpg',
    breadcrumb: { NL: 'Tankrenovatie Sea Tank Terminal', EN: 'Sea Tank Terminal tank refurbishment' },
    meta: {
      NL: {
        title: 'Tankrenovatie haven Antwerpen: 15 tanks Sea Tank | Russo NV',
        description: 'Renovatie van 15 opslagtanks bij Sea Tank Terminal in de haven van Antwerpen: robotisch hydrojetten van de buitenzijde, inwendig stralen en coaten, gefaseerd uitgevoerd.',
        image: '/images/stt3.jpg',
      },
      EN: {
        title: 'Tank Refurbishment Port of Antwerp: 15 Tanks | Russo NV',
        description: 'Refurbishment of 15 storage tanks at Sea Tank Terminal in the Port of Antwerp: robotic hydro-jetting of the exterior, internal blasting and coating, carried out in phases.',
        image: '/images/stt3.jpg',
      },
    },
    NL: {
      kicker: 'Case study',
      h1: 'Tankrenovatie in de haven van Antwerpen: 15 opslagtanks bij Sea Tank Terminal',
      heroSub: 'Grootschalige renovatie van 15 opslagtanks op een werkende terminal: robotisch hydrojetten van de buitenzijde, inwendig stralen en coaten waar nodig, en een fasering die de opslagcapaciteit beschikbaar hield.',
      heroAlt: 'Opslagtanks bij Sea Tank Terminal in de haven van Antwerpen tijdens de renovatie door Russo NV',
      secondaryAlt: 'Renovatiewerken aan een opslagtank bij Sea Tank Terminal in Antwerpen',
      facts: [
        { label: 'Klant', value: 'Sea Tank Terminal' },
        { label: 'Locatie', value: 'Haven van Antwerpen, België' },
        { label: 'Scope', value: '15 opslagtanks' },
        { label: 'Buitenzijde', value: 'Robotisch hydrojetten en verwijderen van de oude coating' },
        { label: 'Binnenzijde', value: 'Inwendig stralen en coaten van geselecteerde tanks' },
        { label: 'Uitvoering', value: 'Gefaseerd over meerdere tankparken' },
        { label: 'Oplevering', value: 'Oktober 2025' },
      ],
      sections: [
        {
          title: 'De opdracht',
          paragraphs: [
            'Sea Tank Terminal in de haven van Antwerpen behoort tot de grootste onafhankelijke tankopslagbedrijven van Europa. Voor een renovatieprogramma van 15 opslagtanks zocht de terminal een partij die de voorbereiding, de coating en de planning op een werkende site in één hand kon nemen.',
            'De buitenzijde van de tanks moest volledig worden voorbereid en ontdaan van de oude coating. Een deel van de tanks kreeg daarnaast een inwendige behandeling, afgestemd op de eisen voor chemische opslag.',
          ],
        },
        {
          title: 'De uitdaging: 15 tanks op een terminal die blijft draaien',
          paragraphs: [
            'Een tankterminal kan zijn capaciteit niet zomaar stilleggen. Elke tank die uit dienst gaat, moet passen in de planning van de terminal, en de werken verspreid over meerdere tankparken mogen elkaar niet in de weg zitten.',
            'Daarom draaide dit programma evenveel om fasering en dagelijkse afstemming met de terminal als om het straal- en schilderwerk zelf.',
          ],
        },
        {
          title: 'De aanpak',
          paragraphs: [
            'Voor de voorbereiding van de buitenzijde werd robotische hydrojet-technologie ingezet: nauwkeurig reinigen en verwijderen van de oude coating, met een beperkte impact op de omgeving. Grote tankwanden worden zo gelijkmatig behandeld, zonder dat er straalgrit vrijkomt.',
            'Geselecteerde tanks werden ook inwendig gestraald en gecoat, zodat ze voldoen aan de strenge eisen voor chemische opslag. De uitvoering verliep in fasen, tank per tank en tankpark per tankpark, in voortdurende afstemming met de operaties van de terminal.',
          ],
        },
        {
          title: 'Het resultaat',
          paragraphs: [
            '15 opslagtanks gerenoveerd, terwijl de opslagcapaciteit van de terminal gedurende het hele programma beschikbaar bleef. Het project toont wat Russo NV op een actieve terminal levert: de voorbereiding, de coating en de planning in één hand.',
          ],
        },
      ],
      related: [
        { to: '/services/tankcoating', label: 'Tankcoating & tank lining' },
        { to: '/services/corrosiebescherming', label: 'Corrosiebescherming' },
        { to: '/insights/tank-coating-lining', label: 'Gids: tankcoating en tank lining' },
      ],
      relatedTitle: 'Diensten in dit project',
      ctaTitle: 'Een tankpark te renoveren?',
      ctaText: 'Bezorg ons het aantal tanks, de staat van de bestaande coating en de beschikbaarheid van de terminal. U krijgt een duidelijke aanpak met fasering, systeemkeuze en offerte.',
      ctaButton: 'Vraag een offerte aan',
      backToProjects: 'Alle projecten',
    },
    EN: {
      kicker: 'Case study',
      h1: 'Tank refurbishment in the Port of Antwerp: 15 storage tanks at Sea Tank Terminal',
      heroSub: 'Large-scale refurbishment of 15 storage tanks on an active terminal: robotic hydro-jetting of the exterior, internal blasting and coating where needed, and phasing that kept storage capacity available.',
      heroAlt: 'Storage tanks at Sea Tank Terminal in the Port of Antwerp during refurbishment by Russo NV',
      secondaryAlt: 'Refurbishment works on a storage tank at Sea Tank Terminal in Antwerp',
      facts: [
        { label: 'Client', value: 'Sea Tank Terminal' },
        { label: 'Location', value: 'Port of Antwerp, Belgium' },
        { label: 'Scope', value: '15 storage tanks' },
        { label: 'Exterior', value: 'Robotic hydro-jetting and removal of the old coating' },
        { label: 'Interior', value: 'Internal blasting and coating of selected tanks' },
        { label: 'Execution', value: 'In phases across multiple tank farms' },
        { label: 'Completion', value: 'October 2025' },
      ],
      sections: [
        {
          title: 'The assignment',
          paragraphs: [
            'Sea Tank Terminal in the Port of Antwerp is one of the largest independent tank storage companies in Europe. For a refurbishment program of 15 storage tanks, the terminal looked for one party to take preparation, coating and planning in one hand on an active site.',
            'The tank exteriors had to be fully prepared and stripped of the old coating. Part of the tanks also received internal treatment, matched to the requirements for chemical storage.',
          ],
        },
        {
          title: 'The challenge: 15 tanks on a terminal that keeps running',
          paragraphs: [
            'A tank terminal cannot simply shut down capacity. Every tank taken out of service has to fit the terminal planning, and works spread over multiple tank farms must not get in each other’s way.',
            'This program was therefore as much about phasing and daily coordination with the terminal as about the blasting and painting itself.',
          ],
        },
        {
          title: 'The approach',
          paragraphs: [
            'Robotic hydro-jet technology was used to prepare the exterior: precise cleaning and removal of the old coating, with limited impact on the environment. Large tank walls are treated evenly this way, without releasing blasting grit.',
            'Selected tanks were also blasted and coated internally to meet the strict requirements for chemical storage. Execution ran in phases, tank by tank and tank farm by tank farm, in constant coordination with terminal operations.',
          ],
        },
        {
          title: 'The result',
          paragraphs: [
            '15 storage tanks refurbished, while the terminal’s storage capacity remained available throughout the program. The project shows what Russo NV delivers on an active terminal: preparation, coating and planning in one hand.',
          ],
        },
      ],
      related: [
        { to: '/services/tankcoating', label: 'Tank coating & lining' },
        { to: '/services/corrosiebescherming', label: 'Corrosion protection' },
        { to: '/insights/tank-coating-lining', label: 'Guide: tank coating and tank lining' },
      ],
      relatedTitle: 'Services in this project',
      ctaTitle: 'A tank farm to refurbish?',
      ctaText: 'Send us the number of tanks, the condition of the existing coating and the terminal availability. You will receive a clear approach with phasing, system choice and quote.',
      ctaButton: 'Request a quote',
      backToProjects: 'All projects',
    },
  },
  {
    slug: 'kranen-coating-csp-zeebrugge',
    client: 'CSP Zeebrugge',
    completion: '2025-11-20',
    heroImage: '/images/csp1.jpg',
    secondaryImage: '/images/csp2.jpg',
    breadcrumb: { NL: 'Kranen CSP Zeebrugge', EN: 'CSP Zeebrugge cranes' },
    meta: {
      NL: {
        title: 'Havenkranen coaten: 3 kranen CSP Zeebrugge | Russo NV',
        description: 'Renovatie en corrosiebescherming van drie ship-to-shore containerkranen bij CSP Zeebrugge: voorbereiding, meerlaags anticorrosiesysteem en werken op hoogte op een actieve terminal.',
        image: '/images/csp1.jpg',
      },
      EN: {
        title: 'Port Crane Coating: 3 Cranes CSP Zeebrugge | Russo NV',
        description: 'Refurbishment and corrosion protection of three ship-to-shore container cranes at CSP Zeebrugge: preparation, multi-layer anti-corrosion system and work at height on an active terminal.',
        image: '/images/csp1.jpg',
      },
    },
    NL: {
      kicker: 'Case study',
      h1: 'Havenkranen coaten: 3 ship-to-shore kranen bij CSP Zeebrugge',
      heroSub: 'Renovatie en corrosiebescherming van drie grote containerkranen aan de Belgische kust, met een meerlaags anticorrosiesysteem op al het constructiestaal, op hoogte en op een terminal die bleef laden en lossen.',
      heroAlt: 'Ship-to-shore containerkraan bij CSP Zeebrugge tijdens coatingwerken door Russo NV',
      secondaryAlt: 'Containerkraan aan de kade van CSP Zeebrugge',
      facts: [
        { label: 'Klant', value: 'CSP Zeebrugge' },
        { label: 'Locatie', value: 'Zeebrugge, België' },
        { label: 'Scope', value: '3 ship-to-shore containerkranen' },
        { label: 'Werk', value: 'Oppervlaktevoorbereiding en meerlaags anticorrosiesysteem' },
        { label: 'Omgeving', value: 'Maritiem klimaat aan de kust' },
        { label: 'Toegang', value: 'Werken op hoogte met gespecialiseerde toegang' },
        { label: 'Oplevering', value: 'November 2025' },
      ],
      sections: [
        {
          title: 'De opdracht',
          paragraphs: [
            'CSP Zeebrugge is een belangrijke containerterminal aan de Belgische kust. Drie grote ship-to-shore kranen hadden een volledige structurele renovatie en corrosiebescherming nodig, inclusief al het constructiestaal dat is blootgesteld aan het maritieme klimaat.',
          ],
        },
        {
          title: 'De uitdaging: hoogte, zout en een actieve kade',
          paragraphs: [
            'Een containerkraan staat dag en nacht in zeelucht, en die zoutlast zet staal sneller aan het roesten dan bijna elke andere omgeving. Tegelijk gebeurt het werk op grote hoogte op infrastructuur die in gebruik is.',
            'Dat vroeg om strikt veiligheidsbeheer, gespecialiseerde toegangsoplossingen en nauwe afstemming met de terminal, zodat het laden en lossen van schepen zo weinig mogelijk hinder ondervond.',
          ],
        },
        {
          title: 'De aanpak',
          paragraphs: [
            'De kranen kregen een grondige oppervlaktevoorbereiding, gevolgd door een meerlaags anticorrosiesysteem op alle constructiestalen delen. Zo wordt elke laag aangebracht op een ondergrond die er klaar voor is, en dat is in een maritieme omgeving doorslaggevend voor de levensduur.',
          ],
        },
        {
          title: 'Het resultaat',
          paragraphs: [
            'Drie ship-to-shore kranen opnieuw beschermd tegen het zware kustklimaat, met zo weinig mogelijk hinder voor de scheepsoperaties. Hetzelfde vakwerk passen we toe op kranen, staalconstructies en andere haveninfrastructuur.',
          ],
        },
      ],
      related: [
        { to: '/services/corrosiebescherming', label: 'Corrosiebescherming' },
        { to: '/services/industrieel-stralen', label: 'Industrieel stralen' },
        { to: '/insights/corrosion-protection-iso-12944', label: 'Gids: corrosiebescherming volgens ISO 12944' },
      ],
      relatedTitle: 'Diensten in dit project',
      ctaTitle: 'Kranen of staalconstructies in de haven?',
      ctaText: 'Bezorg ons de constructie, de staat van de coating en de beschikbare stilstand. U krijgt een duidelijke aanpak met toegang, systeemkeuze en offerte.',
      ctaButton: 'Vraag een offerte aan',
      backToProjects: 'Alle projecten',
    },
    EN: {
      kicker: 'Case study',
      h1: 'Port crane coating: 3 ship-to-shore cranes at CSP Zeebrugge',
      heroSub: 'Refurbishment and corrosion protection of three large container cranes on the Belgian coast, with a multi-layer anti-corrosion system on all structural steel, at height and on a terminal that kept loading and unloading.',
      heroAlt: 'Ship-to-shore container crane at CSP Zeebrugge during coating works by Russo NV',
      secondaryAlt: 'Container crane on the quay at CSP Zeebrugge',
      facts: [
        { label: 'Client', value: 'CSP Zeebrugge' },
        { label: 'Location', value: 'Zeebrugge, Belgium' },
        { label: 'Scope', value: '3 ship-to-shore container cranes' },
        { label: 'Work', value: 'Surface preparation and multi-layer anti-corrosion system' },
        { label: 'Environment', value: 'Maritime coastal climate' },
        { label: 'Access', value: 'Work at height with specialized access' },
        { label: 'Completion', value: 'November 2025' },
      ],
      sections: [
        {
          title: 'The assignment',
          paragraphs: [
            'CSP Zeebrugge is a major container terminal on the Belgian coast. Three large ship-to-shore cranes needed full structural refurbishment and corrosion protection, including all structural steel exposed to the maritime climate.',
          ],
        },
        {
          title: 'The challenge: height, salt and an active quay',
          paragraphs: [
            'A container crane stands in sea air day and night, and that salt load makes steel rust faster than almost any other environment. At the same time, the work takes place at great height on infrastructure that is in use.',
            'That demanded strict safety management, specialized access solutions and close coordination with the terminal, so that vessel loading and unloading was disrupted as little as possible.',
          ],
        },
        {
          title: 'The approach',
          paragraphs: [
            'The cranes received thorough surface preparation, followed by a multi-layer anti-corrosion system on all structural steel components. Each coat is applied to a substrate that is ready for it, which is decisive for service life in a maritime environment.',
          ],
        },
        {
          title: 'The result',
          paragraphs: [
            'Three ship-to-shore cranes protected again against the harsh coastal climate, with as little disruption to vessel operations as possible. We apply the same craftsmanship to cranes, steel structures and other port infrastructure.',
          ],
        },
      ],
      related: [
        { to: '/services/corrosiebescherming', label: 'Corrosion protection' },
        { to: '/services/industrieel-stralen', label: 'Industrial blasting' },
        { to: '/insights/corrosion-protection-iso-12944', label: 'Guide: corrosion protection to ISO 12944' },
      ],
      relatedTitle: 'Services in this project',
      ctaTitle: 'Cranes or steel structures in the port?',
      ctaText: 'Send us the structure, the condition of the coating and the available downtime. You will receive a clear approach with access, system choice and quote.',
      ctaButton: 'Request a quote',
      backToProjects: 'All projects',
    },
  },
  {
    slug: 'coating-voedingsopslag-bnfw-zeebrugge',
    client: 'BNFW',
    completion: '2025-05-15',
    heroImage: '/images/kiwi1.jpg',
    secondaryImage: '/images/kiwi2.jpg',
    breadcrumb: { NL: 'Voedingsopslag BNFW Zeebrugge', EN: 'BNFW food storage Zeebrugge' },
    meta: {
      NL: {
        title: 'Coating voedingsindustrie: opslaghallen BNFW | Russo NV',
        description: 'Renovatie en voedingsveilige coating van grote opslaghallen bij BNFW in Zeebrugge: voorbereiding, corrosiebehandeling en gefaseerde uitvoering terwijl het magazijn in gebruik bleef.',
        image: '/images/kiwi1.jpg',
      },
      EN: {
        title: 'Food-Grade Coating: BNFW Storage Halls | Russo NV',
        description: 'Refurbishment and food-grade coating of large storage halls at BNFW in Zeebrugge: preparation, corrosion treatment and phased execution while the warehouse stayed in use.',
        image: '/images/kiwi1.jpg',
      },
    },
    NL: {
      kicker: 'Case study',
      h1: 'Voedingsveilige coating in opslaghallen: BNFW Zeebrugge',
      heroSub: 'Inwendige renovatie en coating van meerdere grote opslaghallen voor voeding, met systemen die bestand zijn tegen frequente reiniging en temperatuurwisselingen, gefaseerd uitgevoerd zodat het magazijn beschikbaar bleef.',
      heroAlt: 'Coatingwerken in een opslaghal voor voeding bij BNFW in Zeebrugge door Russo NV',
      secondaryAlt: 'Werkzaamheden in een opslaghal bij BNFW in Zeebrugge',
      facts: [
        { label: 'Klant', value: 'BNFW' },
        { label: 'Locatie', value: 'Zeebrugge, België' },
        { label: 'Scope', value: 'Meerdere grote opslaghallen voor voeding' },
        { label: 'Systeem', value: 'Voedingsveilige coating, conform hygiënevoorschriften en HACCP' },
        { label: 'Belasting', value: 'Frequente reiniging en temperatuurwisselingen' },
        { label: 'Uitvoering', value: 'Gefaseerd, magazijn bleef beschikbaar' },
        { label: 'Oplevering', value: 'Mei 2025' },
      ],
      sections: [
        {
          title: 'De opdracht',
          paragraphs: [
            'BNFW in Zeebrugge wilde meerdere grote opslaghallen voor voeding inwendig laten renoveren. Elke hal had een volledige oppervlaktevoorbereiding en corrosiebehandeling nodig, gevolgd door een coating die voldoet aan de strenge voorschriften voor voedselhygiëne en HACCP.',
          ],
        },
        {
          title: 'De uitdaging: renoveren in een actieve voedingsomgeving',
          paragraphs: [
            'In een opslag voor voeding is een coating meer dan bescherming. De afwerking moet frequente reinigingscycli en temperatuurwisselingen aankunnen en passen binnen de hygiëne-eisen van de site.',
            'Bovendien moesten de hallen beschikbaar blijven voor de dagelijkse werking. De werken konden dus niet tegelijk over het hele magazijn lopen.',
          ],
        },
        {
          title: 'De aanpak',
          paragraphs: [
            'De hallen werden in fasen behandeld, zodat de klant zijn magazijn kon blijven gebruiken. Per hal volgden de oppervlaktevoorbereiding, de corrosiebehandeling en het aanbrengen van het voedingsveilige coatingsysteem elkaar op.',
          ],
        },
        {
          title: 'Het resultaat',
          paragraphs: [
            'Meerdere opslaghallen opnieuw beschermd met een afwerking die past bij een actieve voedingsomgeving, zonder dat het magazijn stil kwam te liggen.',
          ],
        },
      ],
      related: [
        { to: '/industries#food', label: 'Voedingsindustrie' },
        { to: '/services/corrosiebescherming', label: 'Corrosiebescherming' },
        { to: '/services/industriele-schilderwerken', label: 'Onderhoudsschilderwerken' },
      ],
      relatedTitle: 'Diensten in dit project',
      ctaTitle: 'Een hal of magazijn in de voedingsindustrie?',
      ctaText: 'Bezorg ons de oppervlaktes, de staat van de ondergrond en de beschikbaarheid van de hallen. U krijgt een duidelijke aanpak met fasering, systeemkeuze en offerte.',
      ctaButton: 'Vraag een offerte aan',
      backToProjects: 'Alle projecten',
    },
    EN: {
      kicker: 'Case study',
      h1: 'Food-grade coating in storage halls: BNFW Zeebrugge',
      heroSub: 'Interior refurbishment and coating of several large food storage halls, with systems that withstand frequent cleaning and temperature changes, carried out in phases so the warehouse stayed available.',
      heroAlt: 'Coating works in a food storage hall at BNFW in Zeebrugge by Russo NV',
      secondaryAlt: 'Works in a storage hall at BNFW in Zeebrugge',
      facts: [
        { label: 'Client', value: 'BNFW' },
        { label: 'Location', value: 'Zeebrugge, Belgium' },
        { label: 'Scope', value: 'Several large food storage halls' },
        { label: 'System', value: 'Food-grade coating, in line with hygiene rules and HACCP' },
        { label: 'Load', value: 'Frequent cleaning and temperature changes' },
        { label: 'Execution', value: 'In phases, warehouse stayed available' },
        { label: 'Completion', value: 'May 2025' },
      ],
      sections: [
        {
          title: 'The assignment',
          paragraphs: [
            'BNFW in Zeebrugge wanted several large food storage halls refurbished inside. Each hall needed full surface preparation and corrosion treatment, followed by a coating that meets the strict rules for food hygiene and HACCP.',
          ],
        },
        {
          title: 'The challenge: refurbishing in an active food environment',
          paragraphs: [
            'In food storage, a coating is more than protection. The finish has to withstand frequent cleaning cycles and temperature changes and fit within the hygiene requirements of the site.',
            'The halls also had to stay available for daily operations, so the works could not run across the whole warehouse at once.',
          ],
        },
        {
          title: 'The approach',
          paragraphs: [
            'The halls were treated in phases, so the client could keep using the warehouse. For each hall, surface preparation, corrosion treatment and application of the food-grade coating system followed one another.',
          ],
        },
        {
          title: 'The result',
          paragraphs: [
            'Several storage halls protected again with a finish suited to an active food environment, without the warehouse coming to a standstill.',
          ],
        },
      ],
      related: [
        { to: '/industries#food', label: 'Food industry' },
        { to: '/services/corrosiebescherming', label: 'Corrosion protection' },
        { to: '/services/industriele-schilderwerken', label: 'Maintenance painting' },
      ],
      relatedTitle: 'Services in this project',
      ctaTitle: 'A hall or warehouse in the food industry?',
      ctaText: 'Send us the areas, the condition of the substrate and the availability of the halls. You will receive a clear approach with phasing, system choice and quote.',
      ctaButton: 'Request a quote',
      backToProjects: 'All projects',
    },
  },
  {
    slug: 'antislip-dakcoating-itc-rubis-zeebrugge',
    client: 'ITC Rubis',
    completion: '2025-08-20',
    heroImage: '/images/itc2.jpg',
    secondaryImage: '/images/itc1.jpg',
    breadcrumb: { NL: 'Antislip en dakcoating ITC Rubis', EN: 'ITC Rubis anti-slip and roof coating' },
    meta: {
      NL: {
        title: 'Antislipcoating en tankdaken: ITC Rubis | Russo NV',
        description: 'Antislipcoating op looppaden en beschermende coating op de daken van acht opslagtanks bij ITC Rubis in Zeebrugge, uitgevoerd op een actieve terminal in het kustklimaat.',
        image: '/images/itc2.jpg',
      },
      EN: {
        title: 'Anti-Slip Coating and Tank Roofs: ITC Rubis | Russo NV',
        description: 'Anti-slip coating on walkways and protective coating on the roofs of eight storage tanks at ITC Rubis in Zeebrugge, carried out on an active terminal in the coastal climate.',
        image: '/images/itc2.jpg',
      },
    },
    NL: {
      kicker: 'Case study',
      h1: 'Antislipcoating en dakcoating op 8 opslagtanks: ITC Rubis Zeebrugge',
      heroSub: 'Antislipcoatings voor looppaden en toegangszones en een beschermende coating op de tankdaken, op een actieve terminal aan de kust.',
      heroAlt: 'Gecoat dak van een opslagtank bij ITC Rubis in Zeebrugge',
      secondaryAlt: 'Opslagtanks bij ITC Rubis in Zeebrugge na de coatingwerken',
      facts: [
        { label: 'Klant', value: 'ITC Rubis' },
        { label: 'Locatie', value: 'Zeebrugge, België' },
        { label: 'Scope', value: '8 grote opslagtanks' },
        { label: 'Veiligheid', value: 'Antislipcoating op looppaden en toegangszones' },
        { label: 'Bescherming', value: 'Coating op de tankdaken tegen UV, zout en regenwater' },
        { label: 'Site', value: 'Actieve terminal' },
        { label: 'Oplevering', value: 'Augustus 2025' },
      ],
      sections: [
        {
          title: 'De opdracht',
          paragraphs: [
            'Op de terminal van ITC Rubis in Zeebrugge moesten acht grote opslagtanks worden behandeld op twee punten: de veiligheid van wie op de tanks werkt, en de bescherming van de daken tegen het kustklimaat.',
          ],
        },
        {
          title: 'Twee opgaven op dezelfde tank',
          paragraphs: [
            'Looppaden en toegangszones op een tank zijn werkplekken op hoogte. Een antislipsysteem moet daar voldoen aan strenge veiligheidsnormen, ook als het oppervlak nat is.',
            'De tankdaken vragen iets anders: bescherming op lange termijn tegen UV, zoutnevel en insijpelend regenwater. Een dak is vaak het eerste deel van een tank dat problemen krijgt, omdat er water kan blijven staan.',
          ],
        },
        {
          title: 'De aanpak',
          paragraphs: [
            'Beide systemen werden aangebracht op een terminal in werking, met strikte veiligheids- en milieuprotocollen. Zo bleef de werking van de terminal gewaarborgd terwijl de tanks een voor een werden behandeld.',
          ],
        },
        {
          title: 'Het resultaat',
          paragraphs: [
            'Acht opslagtanks met veiligere looppaden en daken die opnieuw beschermd zijn tegen het kustklimaat van Zeebrugge.',
          ],
        },
      ],
      related: [
        { to: '/services/tankcoating', label: 'Tankcoating & tank lining' },
        { to: '/services/corrosiebescherming', label: 'Corrosiebescherming' },
        { to: '/insights/tank-coating-lining', label: 'Gids: tankcoating en tank lining' },
      ],
      relatedTitle: 'Diensten in dit project',
      ctaTitle: 'Tankdaken of looppaden te behandelen?',
      ctaText: 'Bezorg ons de tankgegevens en de staat van de bestaande coating. U krijgt een duidelijke aanpak met systeemkeuze, planning en offerte.',
      ctaButton: 'Vraag een offerte aan',
      backToProjects: 'Alle projecten',
    },
    EN: {
      kicker: 'Case study',
      h1: 'Anti-slip and roof coating on 8 storage tanks: ITC Rubis Zeebrugge',
      heroSub: 'Anti-slip coatings for walkways and access areas and a protective coating on the tank roofs, on an active terminal on the coast.',
      heroAlt: 'Coated roof of a storage tank at ITC Rubis in Zeebrugge',
      secondaryAlt: 'Storage tanks at ITC Rubis in Zeebrugge after the coating works',
      facts: [
        { label: 'Client', value: 'ITC Rubis' },
        { label: 'Location', value: 'Zeebrugge, Belgium' },
        { label: 'Scope', value: '8 large storage tanks' },
        { label: 'Safety', value: 'Anti-slip coating on walkways and access areas' },
        { label: 'Protection', value: 'Coating on tank roofs against UV, salt and rainwater' },
        { label: 'Site', value: 'Active terminal' },
        { label: 'Completion', value: 'August 2025' },
      ],
      sections: [
        {
          title: 'The assignment',
          paragraphs: [
            'At the ITC Rubis terminal in Zeebrugge, eight large storage tanks had to be treated on two points: the safety of people working on the tanks, and the protection of the roofs against the coastal climate.',
          ],
        },
        {
          title: 'Two tasks on the same tank',
          paragraphs: [
            'Walkways and access areas on a tank are workplaces at height. An anti-slip system there has to meet strict safety standards, including when the surface is wet.',
            'The tank roofs ask for something else: long-term protection against UV, salt spray and rainwater infiltration. A roof is often the first part of a tank to develop problems, because water can stand on it.',
          ],
        },
        {
          title: 'The approach',
          paragraphs: [
            'Both systems were applied on a working terminal, under strict safety and environmental protocols. Terminal operations stayed secured while the tanks were treated one by one.',
          ],
        },
        {
          title: 'The result',
          paragraphs: [
            'Eight storage tanks with safer walkways and roofs protected again against the coastal climate of Zeebrugge.',
          ],
        },
      ],
      related: [
        { to: '/services/tankcoating', label: 'Tank coating & lining' },
        { to: '/services/corrosiebescherming', label: 'Corrosion protection' },
        { to: '/insights/tank-coating-lining', label: 'Guide: tank coating and tank lining' },
      ],
      relatedTitle: 'Services in this project',
      ctaTitle: 'Tank roofs or walkways to treat?',
      ctaText: 'Send us the tank details and the condition of the existing coating. You will receive a clear approach with system choice, planning and quote.',
      ctaButton: 'Request a quote',
      backToProjects: 'All projects',
    },
  },
];

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

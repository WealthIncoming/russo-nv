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
        { to: '/services/industriele-schilderwerken', label: 'Industriële schilderwerken' },
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
];

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

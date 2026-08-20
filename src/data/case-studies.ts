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
            'We werkten de installatie zone per zone af, telkens in dezelfde volgorde: eerst de corrosieplekken behandelen, dan het volledige oppervlak schuren en reinigen, plaatselijk bijwerken waar de ondergrond dat vroeg, en afsluiten met de nieuwe afwerklaag. Zo kreeg elke zone zijn volledige opbouw voor we naar de volgende schoven, en bleef het aantal ingenomen werkzones op elk moment beperkt.',
            'Door die fasering kon de productie blijven draaien terwijl de installatie zichtbaar vernieuwde: geen grote stilgelegde zones, wel elke week een stuk installatie dat af was.',
          ],
        },
        {
          title: 'Het resultaat',
          paragraphs: [
            'De volledige renovatie werd opgeleverd in twee en een halve week, zonder productiestilstand. De silo’s, draagstructuren, het leidingwerk en de transportinstallatie kregen hun complete nieuwe afwerklaag, en Albeton hield er een installatie aan over die weer jaren tegen het Nederlandse klimaat kan.',
            'Voor ons was dit project ook het bewijs dat onze werkwijze de grens over reist: dezelfde fasering en veiligheidsaanpak die we dagelijks toepassen in de Antwerpse haven, werkt net zo goed op een operationele site in Nederland.',
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
            'We worked through the installation zone by zone, each time in the same order: treat the corrosion spots first, then sand and clean the full surface, touch up locally where the substrate required it, and finish with the new topcoat. That way every zone received its complete build-up before we moved to the next one, and the number of occupied work zones stayed limited at any moment.',
            'That phasing let production keep running while the installation visibly renewed: no large shut-down zones, but every week another part of the plant finished.',
          ],
        },
        {
          title: 'The result',
          paragraphs: [
            'The full renovation was delivered in two and a half weeks, without a production stop. The silos, support structures, piping and conveyor installation received their complete new finishing coat, and Albeton kept an installation that can face the Dutch climate for years again.',
            'For us this project also proved that our way of working travels across the border: the same phasing and safety approach we apply daily in the port of Antwerp works just as well on an operational site in the Netherlands.',
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
];

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

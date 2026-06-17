// ---------------------------------------------------------------------------
// Articles ("Kenniscentrum" / "Insights"): single source of truth.
//
// To publish a new article: append ONE entry to the ARTICLES array below.
// Everything else derives from it automatically:
//   - static page generation + routing  (src/pages/[...slug].astro getStaticPaths)
//   - SEO <title>/<meta>/canonical/hreflang + Article JSON-LD ([...slug].astro)
//   - the index grid + article page      (ArticlesIndexPage / ArticlePage)
//   - sitemap entries (with lastmod)     (src/pages/sitemap-feed.ts)
//   - the RSS feed                       (src/pages/insights/rss.xml.ts)
//
// This module is PURE DATA (no React / no browser APIs) so it is safe to import
// both in the Astro frontmatter (server) and in the React components.
//
// Slugs are shared across locales (one URL slug, NL at /insights/<slug>, EN at
// /en/insights/<slug>), matching the site's existing "English slug + localized
// content" pattern (e.g. NL "Diensten" lives at /services). SEO for each market
// is carried by the per-locale title/description/headings/body, not the slug.
//
// House style: do NOT use the em dash in body copy (it reads as AI-generated).
// Use commas, colons or full sentences instead. Compound hyphens in Dutch
// (VCA-gecertificeerd, grond- en tussenlagen) are correct spelling and stay.
// ---------------------------------------------------------------------------

export type Locale = 'NL' | 'EN';

/** A run of text that may contain inline internal links (good for SEO). */
export type Segment = string | { text: string; to: string };

export type ArticleBlock =
  | { type: 'p'; text?: string; segments?: Segment[] }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'image'; src: string; alt: string; caption?: string; width?: number; height?: number }
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { type: 'callout'; title: string; items: string[] }
  | { type: 'faq'; items: { q: string; a: string }[] }
  | { type: 'cta'; title: string; text: string; buttonLabel: string; to: string };

export interface ArticleContent {
  /** H1, also the human headline. */
  title: string;
  /** <title> tag: keep around 60 chars, keyword-first, brand suffix. */
  metaTitle: string;
  /** meta description: around 155 chars, compelling + keyworded. */
  description: string;
  /** Short summary for the index card + the intro lede. */
  excerpt: string;
  /** Localized category label (chip). */
  category: string;
  body: ArticleBlock[];
}

export interface Article {
  /** Shared URL slug across locales. Descriptive, hyphenated, stable. */
  slug: string;
  /** ISO date published. */
  date: string;
  /** ISO date last updated (defaults to `date`). */
  updated?: string;
  /** Byline name. A named, credentialed human strengthens E-E-A-T. */
  author: string;
  /** Author credential / job title, shown in the byline + bio (localized). */
  authorRole?: Record<Locale, string>;
  /** Short author bio for the end-of-article E-E-A-T box (localized). */
  authorBio?: Record<Locale, string>;
  /** Author profile URL (e.g. LinkedIn) → schema.org Person.sameAs. */
  authorUrl?: string;
  /** Author headshot, served from /public/images → bio box + Person.image. */
  authorImage?: string;
  /** Hero image, served from /public/images. Swap for a real job photo. */
  heroImage: string;
  heroAlt: Record<Locale, string>;
  keywords: Record<Locale, string[]>;
  NL: ArticleContent;
  EN: ArticleContent;
}

export const ARTICLE_BASE = '/insights';
export const articleUrl = (slug: string) => `${ARTICLE_BASE}/${slug}`;

// ---------------------------------------------------------------------------
// The articles. Newest belongs anywhere; sortedArticles() orders by date.
// ---------------------------------------------------------------------------

export const ARTICLES: Article[] = [
  {
    slug: 'steel-surface-preparation',
    date: '2026-06-17',
    author: 'Stig Vanmarsenille',
    authorRole: {
      NL: 'NACE Level 2 coating inspector',
      EN: 'NACE Level 2 coating inspector',
    },
    authorBio: {
      NL: 'Stig Vanmarsenille is NACE Level 2 coating inspector bij Russo NV en begeleidde meer dan 70 industriële straal- en coatingprojecten, van tankbekleding tot staalconstructies in de petrochemie.',
      EN: 'Stig Vanmarsenille is a NACE Level 2 coating inspector at Russo NV and has overseen more than 70 industrial blasting and coating projects, from tank lining to structural steel in petrochemicals.',
    },
    authorUrl: 'https://www.linkedin.com/in/stig-vanmarsenille-747176b9/',
    authorImage: '/images/author-stig.jpg',
    heroImage: '/images/article1.jpg',
    heroAlt: {
      NL: 'Industriële straalwerken op staal: oppervlaktevoorbereiding tot reinheidsgraad Sa 2½ door Russo NV in Antwerpen',
      EN: 'Abrasive blasting of steel: surface preparation to cleanliness grade Sa 2½ by Russo NV in Antwerp',
    },
    keywords: {
      NL: ['oppervlaktevoorbereiding', 'staal stralen', 'reinheidsgraad Sa 2½', 'straalprofiel', 'ISO 8501-1', 'industriële coating', 'corrosiebescherming'],
      EN: ['surface preparation', 'abrasive blasting steel', 'cleanliness grade Sa 2½', 'surface profile', 'ISO 8501-1', 'industrial coating', 'corrosion protection'],
    },
    NL: {
      title: 'Staal voorbereiden voor coating',
      metaTitle: 'Staal voorbereiden voor coating: de complete gids | Russo NV',
      description: 'Een coating is maar zo goed als de voorbereiding eronder. Leer hoe je staal correct ontvet, straalt tot reinheidsgraad Sa 2½ en het juiste straalprofiel haalt, volgens ISO 8501-1.',
      excerpt: 'Het overgrote deel van vroegtijdig coatingfalen ontstaat niet door de verf, maar door de voorbereiding eronder. Dit is hoe je het wél goed doet, stap voor stap, volgens de normen die wij dagelijks toepassen.',
      category: 'Oppervlaktevoorbereiding',
      body: [
        {
          type: 'p',
          segments: [
            'Een dure coating op slecht voorbereid staal is weggegooid geld. De voorbereiding bepaalt de hechting, en de hechting bepaalt de levensduur. Bij ',
            { text: 'industriële schilderwerken', to: '/services/industriele-schilderwerken' },
            ' begint kwaliteit dus nooit bij de verf, maar bij het staal eronder.',
          ],
        },
        { type: 'h2', text: 'Waarom voorbereiding bepaalt of je coating slaagt' },
        {
          type: 'p',
          text: 'Een coating hecht mechanisch én chemisch aan de ondergrond. Vet, roest, walshuid (mill scale) en oplosbare zouten verhinderen die hechting. Wordt er over zo’n laag heen gecoat, dan laat de coating na verloop van tijd los: blaarvorming, onderroest, delaminatie. De ondergrond zorgvuldig reinigen en de juiste ruwheid creëren is daarom geen formaliteit, maar de bepalende stap.',
        },
        { type: 'h2', text: 'Stap 1: ontvetten en reinigen' },
        {
          type: 'p',
          text: 'Vóór er ook maar één korrel straalmiddel raakt, moet het oppervlak vrij zijn van olie, vet en vuil. Stralen over vet wrijft de vervuiling net dieper in én besmet je straalmiddel. Let in het bijzonder op:',
        },
        {
          type: 'ul',
          items: [
            'Olie en vet: verwijderen met een geschikt ontvettingsmiddel (conform SSPC-SP 1), niet enkel met water.',
            'Oplosbare zouten (chloriden): onzichtbaar maar berucht. Ze trekken vocht aan onder de coating. Meten en zo nodig stoomreinigen.',
            'Stof, los vuil en oude, loszittende verf: mechanisch verwijderen.',
          ],
        },
        {
          type: 'image',
          src: '/images/step1.jpg',
          width: 1200,
          height: 900,
          alt: 'Olievervuiling op een vers gestraald staaloppervlak',
          caption: 'Olievervuiling op vers gestraald staal: ontvet eerst, anders besmet je de coating én het straalmiddel.',
        },
        { type: 'h2', text: 'Stap 2: stralen tot de juiste reinheidsgraad (ISO 8501-1)' },
        {
          type: 'p',
          text: 'De internationale norm ISO 8501-1 beschrijft visuele reinheidsgraden voor gestraald staal. Welke graad je nodig hebt, schrijft de coatingfabrikant voor in het technische datablad. Voor de meeste industriële beschermsystemen is dat Sa 2½.',
        },
        {
          type: 'table',
          caption: 'Reinheidsgraden voor stralen volgens ISO 8501-1',
          headers: ['Graad', 'Omschrijving', 'Typisch gebruik'],
          rows: [
            ['Sa 1', 'Licht stralen: losse walshuid, roest en verf verwijderd', 'Zelden voldoende voor industriële coatings'],
            ['Sa 2', 'Grondig stralen: bijna alle verontreiniging weg', 'Lichtere beschermsystemen'],
            ['Sa 2½', 'Zeer grondig stralen: enkel lichte schaduwen of strepen toegestaan', 'Standaard voor de meeste industriële & petrochemische systemen'],
            ['Sa 3', 'Stralen tot wit metaal: visueel volledig schoon', 'Zwaarste belasting: immersie, tankbekleding'],
          ],
        },
        {
          type: 'p',
          text: 'Vraag in de praktijk altijd het datablad op: coaten op een te lage graad doet de garantie van de fabrikant vervallen en is de meest voorkomende oorzaak van vroegtijdig falen.',
        },
        {
          type: 'image',
          src: '/images/step2.jpg',
          width: 1200,
          height: 900,
          alt: 'Staal gestraald tot reinheidsgraad Sa 2½',
          caption: 'Zo ziet staal eruit gestraald tot reinheidsgraad Sa 2½.',
        },
        { type: 'h2', text: 'Stap 3: het juiste straalprofiel (ankerprofiel)' },
        {
          type: 'p',
          text: 'Stralen doet meer dan reinigen: het creëert ruwheid, het “ankerprofiel” waarin de coating zich vastzet. Te glad en de coating heeft geen grip; te ruw en de pieken steken door de laagdikte heen en roesten als eerste door.',
        },
        {
          type: 'ul',
          items: [
            'Het vereiste profiel (vaak 30 tot 75 µm Rz) staat in het datablad en hangt af van het coatingsysteem en de laagdikte.',
            'De korrel (grit versus gritmix) en de straaldruk bepalen het profiel. Grover straalmiddel geeft een dieper profiel.',
            'Meet het profiel objectief met profieltape (testex) of een ruwheidsmeter; vertrouw niet op het oog.',
          ],
        },
        {
          type: 'image',
          src: '/images/step3.jpg',
          width: 1200,
          height: 900,
          alt: 'Het straalprofiel meten met een Elcometer-meetklok in µm',
          caption: 'Het profiel objectief meten in µm, niet schatten op het oog.',
        },
        { type: 'h2', text: 'Stap 4: klimaat, dauwpunt en timing' },
        {
          type: 'p',
          text: 'Gestraald staal is chemisch “naakt” en roest verbluffend snel (flash rust). Het klimaat op het moment van stralen én coaten is daarom cruciaal:',
        },
        {
          type: 'ul',
          items: [
            'De staaltemperatuur moet minstens 3 °C boven het dauwpunt liggen, anders condenseert vocht op het oppervlak.',
            'Houd de relatieve luchtvochtigheid in de gaten (richtwaarde onder 85 %).',
            'Coat binnen het door de fabrikant voorgeschreven venster, vaak dezelfde dag, vóór er flash rust ontstaat.',
          ],
        },
        {
          type: 'image',
          src: '/images/step4.jpg',
          width: 1200,
          height: 900,
          alt: 'Elcometer dauwpuntmeter toont luchtvochtigheid, oppervlaktetemperatuur en dauwpunt',
          caption: 'Luchtvochtigheid, oppervlaktetemperatuur en dauwpunt controleren voor het coaten.',
        },
        { type: 'h2', text: 'Stap 5: meten, documenteren en de juiste korrel kiezen' },
        {
          type: 'p',
          text: 'Een goede voorbereiding is meetbaar. Leg elke kritische parameter objectief vast: zo toon je achteraf aan dat er volgens spec gewerkt is en vermijd je discussie bij oplevering.',
        },
        {
          type: 'ul',
          items: [
            'Oplosbare zouten: meet de geleidbaarheid volgens ISO 8502 (bijvoorbeeld de Bresle-methode) voordat je coat.',
            'Straalprofiel: bepaal de ruwheidsklasse volgens ISO 8503 (fijn, medium of grof) met profieltape of een ruwheidsmeter.',
            'Klimaat: log doorlopend staaltemperatuur, luchttemperatuur, relatieve luchtvochtigheid en dauwpunt.',
            'Korrelkeuze: stem het straalmiddel af op het doel. Garnet en staalgrit geven een hoekig, dieper profiel, gladde korrel of straalgrind een ondieper profiel.',
          ],
        },
        {
          type: 'p',
          segments: [
            'Die meetcultuur is precies wat een industriële coating jarenlang laat standhouden. Bekijk onze ',
            { text: 'gerealiseerde projecten', to: '/projects' },
            ' om te zien hoe we deze aanpak in de praktijk toepassen.',
          ],
        },
        {
          type: 'image',
          src: '/images/step5.jpg',
          width: 1200,
          height: 900,
          alt: 'Inspectierapport met ISO 8502 metingen voor klimaat, stof en oplosbare zouten',
          caption: 'Elke meting gedocumenteerd volgens ISO 8502.',
        },
        {
          type: 'callout',
          title: 'Belangrijkste punten',
          items: [
            'Niet de verf maar de voorbereiding bepaalt of een coating standhoudt.',
            'Ontvet eerst; stralen over vet besmet alles.',
            'Sa 2½ is de standaard reinheidsgraad voor de meeste industriële systemen.',
            'Meet het straalprofiel; gok het niet.',
            'Respecteer dauwpunt en overschildertermijn en coat vóór flash rust.',
          ],
        },
        { type: 'h2', text: 'Veelgemaakte fouten' },
        {
          type: 'ul',
          items: [
            'Coaten over flash rust of zichtbare onderroest.',
            'Oplosbare zouten negeren omdat ze onzichtbaar zijn.',
            'Een verkeerd (te glad of te ruw) straalprofiel.',
            'Klimaatcontrole overslaan en bij te hoge vochtigheid doorwerken.',
            'De overschildertermijn van de primer overschrijden.',
          ],
        },
        { type: 'h2', text: 'Veelgestelde vragen' },
        {
          type: 'faq',
          items: [
            {
              q: 'Wat betekent reinheidsgraad Sa 2½?',
              a: 'Sa 2½ is een visuele reinheidsgraad uit ISO 8501-1 voor gestraald staal. Het oppervlak is zeer grondig gestraald: walshuid, roest en oude verf zijn verwijderd, enkel lichte schaduwen of strepen blijven toegelaten. Het is de standaard voor de meeste industriële beschermsystemen.',
            },
            {
              q: 'Hoe lang mag gestraald staal blootliggen voordat je coat?',
              a: 'Zo kort mogelijk. Vers gestraald staal roest snel (flash rust), bij vochtig weer vaak al binnen enkele uren. Coat bij voorkeur dezelfde dag, binnen het venster dat de fabrikant voorschrijft, en altijd voordat er nieuwe roest ontstaat.',
            },
            {
              q: 'Welk straalprofiel heb ik nodig?',
              a: 'Dat staat in het technische datablad van de coating, doorgaans 30 tot 75 µm Rz. Te glad geeft onvoldoende hechting, te ruw laat de pieken door de laagdikte steken. Meet het profiel objectief met profieltape of een ruwheidsmeter, schat het niet op het oog.',
            },
            {
              q: 'Wat is flash rust en hoe voorkom je het?',
              a: 'Flash rust is de dunne roestlaag die ontstaat op vers gestraald, chemisch "naakt" staal zodra het vocht raakt. Coaten over flash rust verzwakt de hechting. Klimaatcontrole (staal boven het dauwpunt houden) en snel overschilderen voorkomen het.',
            },
            {
              q: 'Waarom zijn oplosbare zouten zo belangrijk?',
              a: 'Oplosbare zouten zoals chloriden zijn onzichtbaar, maar trekken vocht aan onder de coating en veroorzaken blaarvorming en onderroest. Stralen alleen verwijdert ze niet betrouwbaar. Meet ze volgens ISO 8502 en stoomreinig waar nodig.',
            },
          ],
        },
        { type: 'h2', text: 'Hulp nodig bij uw project?' },
        {
          type: 'cta',
          title: 'Voorbereiding die wél standhoudt',
          text: 'Russo NV verzorgt stralen, oppervlaktevoorbehandeling en industriële coatings volgens VCA- en ISO-normen, met meetbare reinheidsgraden en gecontroleerde straalprofielen. Vraag vrijblijvend een offerte of advies aan.',
          buttonLabel: 'Vraag een offerte aan',
          to: '/contact',
        },
      ],
    },
    EN: {
      title: 'Preparing steel for coating',
      metaTitle: 'Steel surface preparation: the complete guide | Russo NV',
      description: 'A coating is only as good as the preparation beneath it. Learn how to degrease steel correctly, blast to cleanliness grade Sa 2½ and achieve the right surface profile, to ISO 8501-1.',
      excerpt: 'The vast majority of premature coating failures are caused not by the paint, but by the preparation beneath it. Here is how to get it right, step by step, to the standards we apply every day.',
      category: 'Surface preparation',
      body: [
        {
          type: 'p',
          segments: [
            'An expensive coating on poorly prepared steel is money wasted. Preparation determines adhesion, and adhesion determines service life. With ',
            { text: 'industrial painting', to: '/services/industriele-schilderwerken' },
            ', quality never starts with the paint. It starts with the steel underneath.',
          ],
        },
        { type: 'h2', text: 'Why preparation decides whether your coating succeeds' },
        {
          type: 'p',
          text: 'A coating bonds to the substrate both mechanically and chemically. Grease, rust, mill scale and soluble salts all block that bond. Coat over such a layer and the coating eventually lets go: blistering, under-rust, delamination. Cleaning the substrate thoroughly and creating the right roughness is therefore not a formality; it is the decisive step.',
        },
        { type: 'h2', text: 'Step 1: degrease and clean' },
        {
          type: 'p',
          text: 'Before a single grain of abrasive hits the steel, the surface must be free of oil, grease and dirt. Blasting over grease rubs the contamination in deeper and contaminates your abrasive. Pay particular attention to:',
        },
        {
          type: 'ul',
          items: [
            'Oil and grease: remove with a suitable degreaser (to SSPC-SP 1), not water alone.',
            'Soluble salts (chlorides): invisible but notorious. They draw moisture under the coating. Test and steam-clean where needed.',
            'Dust, loose dirt and old, flaking paint: remove mechanically.',
          ],
        },
        {
          type: 'image',
          src: '/images/step1.jpg',
          width: 1200,
          height: 900,
          alt: 'Oil contamination on a freshly blasted steel surface',
          caption: 'Oil contamination on freshly blasted steel: degrease first, or it contaminates the coating and your abrasive.',
        },
        { type: 'h2', text: 'Step 2: blast to the right cleanliness grade (ISO 8501-1)' },
        {
          type: 'p',
          text: 'The international standard ISO 8501-1 defines visual cleanliness grades for blasted steel. Which grade you need is specified by the coating manufacturer in the technical data sheet. For most industrial protective systems that is Sa 2½.',
        },
        {
          type: 'table',
          caption: 'Blast-cleaning grades to ISO 8501-1',
          headers: ['Grade', 'Description', 'Typical use'],
          rows: [
            ['Sa 1', 'Light blast: loose mill scale, rust and paint removed', 'Rarely sufficient for industrial coatings'],
            ['Sa 2', 'Thorough blast: nearly all contamination removed', 'Lighter protective systems'],
            ['Sa 2½', 'Very thorough blast: only light shadows or streaks allowed', 'Standard for most industrial & petrochemical systems'],
            ['Sa 3', 'Blast to white metal: visually completely clean', 'Most severe service: immersion, tank lining'],
          ],
        },
        {
          type: 'p',
          text: 'In practice, always pull the data sheet: coating to a grade below spec voids the manufacturer’s warranty and is the most common cause of premature failure.',
        },
        {
          type: 'image',
          src: '/images/step2.jpg',
          width: 1200,
          height: 900,
          alt: 'Steel blasted to cleanliness grade Sa 2½',
          caption: 'How steel looks when blasted to cleanliness grade Sa 2½.',
        },
        { type: 'h2', text: 'Step 3: the right surface profile (anchor pattern)' },
        {
          type: 'p',
          text: 'Blasting does more than clean: it creates roughness, the “anchor pattern” the coating grips into. Too smooth and the coating has no grip; too rough and the peaks protrude through the film thickness and rust through first.',
        },
        {
          type: 'ul',
          items: [
            'The required profile (often 30 to 75 µm Rz) is given in the data sheet and depends on the coating system and film thickness.',
            'The abrasive (grit versus grit mix) and blast pressure set the profile. Coarser media give a deeper profile.',
            'Measure the profile objectively with profile tape (Testex) or a roughness gauge; don’t trust the eye.',
          ],
        },
        {
          type: 'image',
          src: '/images/step3.jpg',
          width: 1200,
          height: 900,
          alt: 'Measuring the surface profile with an Elcometer dial gauge in µm',
          caption: 'Measuring the profile objectively in µm, not judging by eye.',
        },
        { type: 'h2', text: 'Step 4: climate, dew point and timing' },
        {
          type: 'p',
          text: 'Freshly blasted steel is chemically “naked” and rusts remarkably fast (flash rust). The climate at the moment of blasting and coating is therefore critical:',
        },
        {
          type: 'ul',
          items: [
            'Steel temperature must be at least 3 °C above the dew point, or moisture condenses on the surface.',
            'Keep an eye on relative humidity (guideline under 85 %).',
            'Coat within the manufacturer’s specified window, often the same day, before flash rust forms.',
          ],
        },
        {
          type: 'image',
          src: '/images/step4.jpg',
          width: 1200,
          height: 900,
          alt: 'Elcometer dew-point meter showing humidity, surface temperature and dew point',
          caption: 'Checking humidity, surface temperature and dew point before coating.',
        },
        { type: 'h2', text: 'Step 5: measure, document and choose the right abrasive' },
        {
          type: 'p',
          text: 'Good preparation is measurable. Record every critical parameter objectively: it proves afterwards that the work met spec and prevents disputes at handover.',
        },
        {
          type: 'ul',
          items: [
            'Soluble salts: measure conductivity to ISO 8502 (for example the Bresle method) before coating.',
            'Surface profile: determine the roughness grade to ISO 8503 (fine, medium or coarse) with profile tape or a roughness gauge.',
            'Climate: continuously log steel temperature, air temperature, relative humidity and dew point.',
            'Abrasive choice: match the media to the goal. Garnet and steel grit give an angular, deeper profile; smoother media or steel shot a shallower one.',
          ],
        },
        {
          type: 'p',
          segments: [
            'That measurement culture is exactly what makes an industrial coating last for years. See our ',
            { text: 'completed projects', to: '/projects' },
            ' for how we apply this approach in the field.',
          ],
        },
        {
          type: 'image',
          src: '/images/step5.jpg',
          width: 1200,
          height: 900,
          alt: 'Inspection report logging ISO 8502 readings for climate, dust and soluble salts',
          caption: 'Every reading documented to ISO 8502.',
        },
        {
          type: 'callout',
          title: 'Key takeaways',
          items: [
            'Not the paint but the preparation determines whether a coating lasts.',
            'Degrease first; blasting over grease contaminates everything.',
            'Sa 2½ is the standard cleanliness grade for most industrial systems.',
            'Measure the surface profile; don’t guess it.',
            'Respect the dew point and recoat window, and coat before flash rust.',
          ],
        },
        { type: 'h2', text: 'Common mistakes' },
        {
          type: 'ul',
          items: [
            'Coating over flash rust or visible under-rust.',
            'Ignoring soluble salts because they are invisible.',
            'A wrong (too smooth or too rough) surface profile.',
            'Skipping climate checks and working on through high humidity.',
            'Exceeding the primer’s recoat window.',
          ],
        },
        { type: 'h2', text: 'Frequently asked questions' },
        {
          type: 'faq',
          items: [
            {
              q: 'What does cleanliness grade Sa 2½ mean?',
              a: 'Sa 2½ is a visual cleanliness grade from ISO 8501-1 for blasted steel. The surface is blasted very thoroughly: mill scale, rust and old paint are removed, with only light shadows or streaks allowed. It is the standard for most industrial protective systems.',
            },
            {
              q: 'How long can blasted steel be left before coating?',
              a: 'As short as possible. Freshly blasted steel rusts quickly (flash rust), often within hours in humid weather. Coat the same day where possible, within the window the manufacturer specifies, and always before new rust forms.',
            },
            {
              q: 'Which surface profile do I need?',
              a: 'It is given in the coating’s technical data sheet, typically 30 to 75 µm Rz. Too smooth gives poor adhesion; too rough lets the peaks protrude through the film. Measure the profile objectively with profile tape or a roughness gauge rather than judging by eye.',
            },
            {
              q: 'What is flash rust and how do you prevent it?',
              a: 'Flash rust is the thin layer of rust that forms on freshly blasted, chemically "naked" steel as soon as it meets moisture. Coating over flash rust weakens adhesion. Climate control (keeping the steel above the dew point) and recoating quickly prevent it.',
            },
            {
              q: 'Why do soluble salts matter so much?',
              a: 'Soluble salts such as chlorides are invisible but draw moisture under the coating, causing blistering and under-rust. Blasting alone does not remove them reliably. Measure them to ISO 8502 and steam-clean where needed.',
            },
          ],
        },
        { type: 'h2', text: 'Need help with your project?' },
        {
          type: 'cta',
          title: 'Preparation that actually lasts',
          text: 'Russo NV delivers blasting, surface preparation and industrial coatings to VCA and ISO standards, with measured cleanliness grades and controlled surface profiles. Request a no-obligation quote or advice.',
          buttonLabel: 'Request a quote',
          to: '/contact',
        },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Helpers (pure)
// ---------------------------------------------------------------------------

export function sortedArticles(): Article[] {
  // Newest first. ISO date strings sort lexicographically.
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(slug: string, limit = 3): Article[] {
  return sortedArticles().filter((a) => a.slug !== slug).slice(0, limit);
}

/** Rough reading time (200 wpm) from a locale's content. */
export function readingMinutes(content: ArticleContent): number {
  let words = `${content.title} ${content.excerpt}`.split(/\s+/).length;
  for (const block of content.body) {
    if (block.type === 'faq') {
      for (const it of block.items) words += `${it.q} ${it.a}`.split(/\s+/).length;
      continue;
    }
    if ('text' in block && block.text) words += block.text.split(/\s+/).length;
    if ('segments' in block && block.segments) {
      for (const s of block.segments) words += (typeof s === 'string' ? s : s.text).split(/\s+/).length;
    }
    if ('items' in block && block.items) words += block.items.join(' ').split(/\s+/).length;
    if ('rows' in block && block.rows) words += block.rows.flat().join(' ').split(/\s+/).length;
  }
  return Math.max(1, Math.round(words / 200));
}

// ---------------------------------------------------------------------------
// Articles ("Kenniscentrum" / "Insights"): single source of truth.
//
// To publish a new article: append ONE entry to the ARTICLES array below.
// Everything else derives from it automatically:
//   - static page generation + routing  (src/pages/[...slug].astro getStaticPaths)
//   - SEO <title>/<meta>/canonical/hreflang + Article JSON-LD ([...slug].astro)
//   - the index grid + article page      (ArticlesIndexPage / ArticlePage)
//   - sitemap entries (with lastmod)     (src/pages/sitemap.xml.ts)
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
    updated: '2026-11-06',
    date: '2026-06-17',
    author: 'Stig Vanmarsenille',
    authorRole: {
      NL: 'NACE Level 2 coating inspector',
      EN: 'NACE Level 2 coating inspector',
    },
    authorBio: {
      NL: 'Stig Vanmarsenille is NACE Level 2 coating inspector bij Russo NV. Hij keurt en begeleidt dagelijks industriële straal- en coatingwerken op de werf, van tankbekleding tot staalconstructies in de petrochemie.',
      EN: 'Stig Vanmarsenille is a NACE Level 2 coating inspector at Russo NV. He inspects and supervises industrial blasting and coating work on site every day, from tank linings to structural steel in petrochemicals.',
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
            { text: 'industriële schilderwerken', to: '/' },
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
          type: 'p',
          segments: [
            'Alle graden, ook St 2 en St 3 voor mechanisch reinigen en de Wa-graden voor waterstralen, staan in ons overzicht van de ',
            { text: 'reinheidsgraden van staal', to: '/insights/reinheidsgraden-staal' },
            '. Hoe het stralen zelf werkt en welk straalmiddel je kiest, lees je in ',
            { text: 'wat is gritstralen', to: '/insights/gritstralen' },
            '.',
          ],
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
        {
          type: 'p',
          segments: [
            'Gaat het om een opslagtank? Dan komt er nog een dimensie bij: immersiedienst. Lees ook onze gids over ',
            { text: 'tankcoating en tank lining', to: '/insights/tank-coating-lining' },
            '.',
          ],
        },
        { type: 'h2', text: 'Hulp nodig bij uw project?' },
        {
          type: 'cta',
          title: 'Voorbereiding die wél standhoudt',
          text: 'Russo NV verzorgt stralen, oppervlaktevoorbehandeling en industriële coatings, uitgevoerd onder VCA-gecertificeerde veiligheidsprocedures en volgens de toepasselijke ISO-normen, met meetbare reinheidsgraden en gecontroleerde straalprofielen. Vraag vrijblijvend een offerte of advies aan.',
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
          type: 'p',
          segments: [
            'All grades, including St 2 and St 3 for mechanical cleaning and the Wa grades for water jetting, are in our overview of ',
            { text: 'steel cleanliness grades', to: '/insights/reinheidsgraden-staal' },
            '. How blasting itself works and which abrasive to choose is covered in ',
            { text: 'what is grit blasting', to: '/insights/gritstralen' },
            '.',
          ],
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
        {
          type: 'p',
          segments: [
            'Working on a storage tank? Then one more dimension applies: immersion service. Also read our guide on ',
            { text: 'tank coating and tank lining', to: '/insights/tank-coating-lining' },
            '.',
          ],
        },
        { type: 'h2', text: 'Need help with your project?' },
        {
          type: 'cta',
          title: 'Preparation that actually lasts',
          text: 'Russo NV delivers blasting, surface preparation and industrial coatings, performed under VCA-certified safety procedures and to the applicable ISO standards, with measured cleanliness grades and controlled surface profiles. Request a no-obligation quote or advice.',
          buttonLabel: 'Request a quote',
          to: '/contact',
        },
      ],
    },
  },
  {
    slug: 'tank-coating-lining',
    date: '2026-08-14',
    updated: '2026-08-19',
    author: 'Stig Vanmarsenille',
    authorRole: {
      NL: 'NACE Level 2 coating inspector',
      EN: 'NACE Level 2 coating inspector',
    },
    authorBio: {
      NL: 'Stig Vanmarsenille is NACE Level 2 coating inspector bij Russo NV. Hij keurt en begeleidt dagelijks industriële straal- en coatingwerken op de werf, van tankbekleding tot staalconstructies in de petrochemie.',
      EN: 'Stig Vanmarsenille is a NACE Level 2 coating inspector at Russo NV. He inspects and supervises industrial blasting and coating work on site every day, from tank linings to structural steel in petrochemicals.',
    },
    authorUrl: 'https://www.linkedin.com/in/stig-vanmarsenille-747176b9/',
    authorImage: '/images/author-stig.jpg',
    heroImage: '/images/tank-lining-hero2.jpg',
    heroAlt: {
      NL: 'Vers afgewerkte tank lining: glanzende gecoate tankbodem met afgeplakte verwarmingsspiralen',
      EN: 'Freshly finished tank lining: glossy coated tank floor with masked heating coils',
    },
    keywords: {
      NL: ['tankcoating', 'tank lining', 'tankbekleding', 'opslagtank coaten', 'epoxy tankcoating', 'holiday detectie', 'ISO 8501-1', 'chemische resistentie'],
      EN: ['tank coating', 'tank lining', 'storage tank coating', 'epoxy tank lining', 'holiday testing', 'ISO 8501-1', 'chemical resistance'],
    },
    NL: {
      title: 'Tankcoating en tank lining: zo wordt een opslagtank duurzaam beschermd',
      metaTitle: 'Tankcoating en tank lining: de complete gids | Russo NV',
      description: 'Praktische gids over tankcoating en tank lining: systeemkeuze, stralen, zout- en stofmetingen, laagdikte en holiday detectie voor opslagtanks.',
      excerpt: 'Een tankbekleding werkt onder de zwaarst denkbare omstandigheden: permanent ondergedompeld in het opgeslagen product. Dit is hoe een professionele tank lining tot stand komt, van voorbereiding tot vonktest, volgens de normen die wij dagelijks toepassen.',
      category: 'Tankbescherming',
      body: [
        {
          type: 'p',
          segments: [
            'Geen enkele coating wordt zwaarder belast dan een tank lining. Waar een gevelcoating af en toe regen ziet, staat een tankbekleding dag en nacht in direct contact met brandstof, chemicaliën of proceswater. Eén zwakke plek volstaat voor corrosie, productvervuiling of een afkeuring bij inspectie. Daarom gelden bij ',
            { text: 'industriële schilderwerken', to: '/' },
            ' aan tanks de strengste eisen van het vak, en begint alles bij de voorbereiding.',
          ],
        },
        { type: 'h2', text: 'Wat is het verschil tussen tankcoating en tank lining?' },
        {
          type: 'p',
          text: 'Tankcoating is de brede term voor elke beschermlaag op een opslagtank, binnen én buiten. Tank lining (of tankbekleding) is specifieker: het inwendige, immersiebestendige systeem dat in direct contact staat met het opgeslagen product. In de praktijk lopen beide termen door elkaar; in dit artikel behandelen we ze allebei, met de nadruk op de lining, want daar liggen de eisen het hoogst.',
        },
        {
          type: 'image',
          src: '/images/tank-coating-exterior.jpg',
          width: 900,
          height: 1200,
          alt: 'Buitenzijde van een opslagtank na tankcoating: wit meerlaagssysteem op tank T 296 van 3.053 m³',
          caption: 'Tankcoating: de buitenzijde van een opslagtank, hier afgewerkt in een wit meerlaagssysteem dat weer, UV en zeelucht moet weerstaan.',
        },
        {
          type: 'image',
          src: '/images/tank-lining-interior.jpg',
          width: 900,
          height: 1200,
          alt: 'Binnenzijde van een opslagtank met lichtblauwe tank lining op wand, dak en verwarmingsspiralen',
          caption: 'Tank lining: de binnenzijde, volledig bekleed met een immersiebestendig systeem dat dag en nacht in contact staat met het opgeslagen product.',
        },
        { type: 'h2', text: 'Waarom een tank de zwaarste omgeving is voor een coating' },
        {
          type: 'p',
          text: 'Bij immersiedienst (permanente onderdompeling) krijgt de coating geen rustpauze. Osmose drijft vocht en opgeloste stoffen door microscopische zwakke plekken, temperatuurwisselingen laten de staalwand werken, en agressieve producten testen de chemische resistentie van elke vierkante centimeter. Fouten die bij een gewone buitencoating jaren onzichtbaar blijven, leiden in een tank binnen maanden tot blaarvorming of onderroest. De norm voor uitvoering en keuring ligt daarom een niveau hoger: reinheidsgraad Sa 2½ tot Sa 3, gecontroleerde laagdiktes en een sluitende poriëntest vóór ingebruikname.',
        },
        { type: 'h2', text: 'Binnenzijde en buitenzijde: twee verschillende opgaven' },
        {
          type: 'p',
          text: 'De binnenzijde (de lining) moet chemisch bestand zijn tegen het opgeslagen product. De buitenzijde vecht tegen een ander front: weer, UV, zeelucht en corrosie onder isolatie. Beide vragen een eigen systeemkeuze:',
        },
        {
          type: 'ul',
          items: [
            'Binnen: chemisch resistente systemen, doorgaans epoxy fenolisch of epoxy novolac. De totale droge laagdikte varieert per product en toepassing van ongeveer 300 µm tot meer dan 1.000 µm; het datablad en de projectspecificatie zijn altijd bepalend.',
            'Buiten: een klassiek meerlaagssysteem met zinkrijke primer, epoxy tussenlaag en polyurethaan toplaag voor kleur- en UV-vastheid.',
            'Tankdaken en looppaden: aanvullend antislip- en dakcoatingwerk, vaak gecombineerd met valbeveiligingszones.',
          ],
        },
        { type: 'h2', text: 'Het juiste liningsysteem kiezen' },
        {
          type: 'p',
          text: 'Het opgeslagen product bepaalt het systeem. De coatingfabrikant publiceert per product een resistentielijst; daar wijk je nooit van af. Als richtlijn:',
        },
        {
          type: 'table',
          caption: 'Typische liningsystemen per opgeslagen product',
          headers: ['Opgeslagen product', 'Typisch liningsysteem', 'Aandachtspunt'],
          rows: [
            ['Diesel, gasolie, stookolie', 'Epoxy (standaard of fenolisch)', 'Geleidbaarheid en statische oplading'],
            ['Chemicaliën en solventen', 'Epoxy novolac of fenolisch', 'Resistentielijst fabrikant is bindend'],
            ['Proceswater, bluswater', 'Epoxy, oplosmiddelvrij', 'Osmosebestendigheid'],
            ['Drinkwater', 'Gecertificeerde epoxy', 'Goedkeuring per land (Belgaqua, KTW, WRAS)'],
            ['Voeding en eetbare oliën', 'Epoxy met voedselcontactgoedkeuring', 'Goedkeuring per product en toepassing'],
            ['Hoge temperatuur of wisselende lading', 'Epoxy novolac, met glasvlokken versterkt', 'Thermische cycli en schokbelasting'],
          ],
        },
        { type: 'h2', text: 'De uitvoering, stap voor stap' },
        { type: 'h3', text: '1. Gasvrij maken, reinigen en inspecteren' },
        {
          type: 'p',
          text: 'Een tank is een besloten ruimte: gasvrijmeting, ventilatie en vergunningen komen vóór alles. Daarna wordt productresidu verwijderd en de staat van bodem, wand en lasnaden beoordeeld. Putcorrosie of bodemvervorming moet nu aan het licht komen, niet na het stralen.',
        },
        {
          type: 'image',
          src: '/images/tank-cleaning.jpg',
          width: 1200,
          height: 900,
          alt: 'Tankwand tijdens de reiniging met krijtmarkeringen die de waszones per aantal wasbeurten aanduiden',
          caption: 'Reiniging van de tankwand: elke zone wordt gemarkeerd en gewassen tot al het productresidu verwijderd is.',
        },
        { type: 'h3', text: '2. Stralen tot Sa 2½ of Sa 3' },
        {
          type: 'p',
          segments: [
            'Voor immersiedienst schrijven fabrikanten reinheidsgraad Sa 2½ tot Sa 3 voor, met een hoekig straalprofiel afgestemd op de laagdikte. Hoe dat stralen precies in zijn werk gaat, van reinheidsgraden tot straalprofiel, lees je in onze gids over ',
            { text: 'staal voorbereiden voor coating', to: '/insights/steel-surface-preparation' },
            '. In een tank komt daar één factor bij: al het straalstof moet er ook weer uit, tot de laatste gram, gecontroleerd met de stoftest volgens ISO 8502-3.',
          ],
        },
        {
          type: 'image',
          src: '/images/tank-blasting.jpg',
          width: 900,
          height: 1200,
          alt: 'Straler aan het werk in een donkere tank, straalnevel in het lamplicht',
          caption: 'Stralen in de tank: zwaar werk in een besloten ruimte, met ademlucht en continue afzuiging.',
        },
        {
          type: 'image',
          src: '/images/tank-blasting-sa25.jpg',
          width: 1200,
          height: 900,
          alt: 'Vers gestraalde onderste wandring in een opslagtank, blank staal tot reinheidsgraad Sa 2½',
          caption: 'Vers gestraald staal onderaan de tankwand: de reinheidsgraad Sa 2½ tekent zich scherp af tegen de nog te stralen wand erboven.',
        },
        { type: 'h3', text: '3. Oplosbare zouten meten' },
        {
          type: 'p',
          text: 'Chloriden en sulfaten op het staal trekken later vocht door de coating heen (osmose) en zijn in immersiedienst dé verborgen faalfactor. We meten ze met de Bresle-methode volgens ISO 8502-6 (of via de geleidbaarheid volgens ISO 8502-9), en reinigen en meten opnieuw tot de waarde onder de grens van de fabrikant ligt, doorgaans 20 tot 50 mg/m² afhankelijk van het product.',
        },
        {
          type: 'image',
          src: '/images/tank-salt-test.jpg',
          width: 900,
          height: 675,
          alt: 'Bresle-test met Elcometer zoutmeter op een gestraalde tankbodem, meetwaarde in mg/m²',
          caption: 'Bresle-meting op een gestraalde tankbodem: pas onder de grenswaarde van de fabrikant mag er gecoat worden.',
        },
        { type: 'h3', text: '4. Klimaatbeheersing' },
        {
          type: 'p',
          text: 'In een gesloten tank bepaal je het klimaat zelf. Met droging en ventilatie houden we de relatieve vochtigheid laag en het staal boven het dauwpunt, zodat er geen vliegroest (flash rust) ontstaat tussen stralen en coaten. Klimaatdata worden doorlopend gelogd, van eerste straalbeurt tot laatste laag.',
        },
        {
          type: 'image',
          src: '/images/tank-dehumidifier.jpg',
          width: 1200,
          height: 900,
          alt: 'Drogings- en ventilatie-opstelling naast de tank tijdens de coatingwerken',
          caption: 'De drooginstallatie draait dag en nacht naast de tank: het klimaat binnen bepaalt de kwaliteit.',
        },
        {
          type: 'image',
          src: '/images/tank-climate-log.jpg',
          width: 900,
          height: 900,
          alt: 'Dauwpuntmeter in een opslagtank: 13,4 procent relatieve vochtigheid en staal 27,4 graden boven het dauwpunt',
          caption: 'De klimaatlogger tijdens de werken: 13,4 % relatieve vochtigheid en staal ruim 27 °C boven het dauwpunt, ver binnen de veilige marge tegen vliegroest.',
        },
        { type: 'h3', text: '5. Stripe coats en applicatie' },
        {
          type: 'p',
          text: 'Lasnaden, hoeken en bouten krijgen eerst een handmatige stripe coat: precies op die plekken trekt een gespoten laag zich dun. Daarna wordt het systeem airless gespoten in gecontroleerde banen tot de voorgeschreven laagdikte, met natte-laagdiktemetingen tijdens het werk en droge-laagdiktemetingen (DFT) na uitharding van elke laag.',
        },
        {
          type: 'image',
          src: '/images/tank-spray.jpg',
          width: 900,
          height: 1200,
          alt: 'Applicateur in beschermpak spuit de lining airless aan in de tank',
          caption: 'Airless applicatie van de lining, in gecontroleerde banen tot de voorgeschreven laagdikte.',
        },
        { type: 'h2', text: 'Kwaliteitscontrole vóór ingebruikname' },
        {
          type: 'ul',
          items: [
            'Droge laagdikte (DFT): gemeten volgens een vast raster over bodem en wand (ISO 19840); het gemiddelde én de minima moeten binnen de projectspecificatie liggen.',
            'Holiday detectie (poriëntest): met een laagspannings- of hoogspanningsdetector, afhankelijk van het systeem en de laagdikte, worden poriën en pinholes in de lining opgespoord. In immersiedienst is één gemiste porie voldoende voor doorroesting, dus deze test is niet onderhandelbaar.',
            'Hechting en uitharding: controle van de uithardingsgraad en, waar voorgeschreven, een hechtingsproef vóór de tank weer in dienst gaat.',
            'Rapportage: alle metingen (klimaat, zouten, profiel, DFT, vonktest) in één inspectiedossier voor eigenaar en inspecteur.',
          ],
        },
        {
          type: 'image',
          src: '/images/tank-finished.jpg',
          width: 900,
          height: 1200,
          alt: 'Afgewerkte tank lining: strak gecoate wanden, dak en leidingwerk',
          caption: 'Het eindresultaat: een strak afgewerkte lining, klaar voor de poriëntest en oplevering.',
        },
        {
          type: 'callout',
          title: 'Belangrijkste punten',
          items: [
            'Een tank lining staat permanent onder de zwaarst mogelijke belasting: immersie.',
            'Het opgeslagen product bepaalt het systeem; de resistentielijst van de fabrikant is bindend.',
            'Sa 2½ tot Sa 3 en een zoutmeting onder de grenswaarde zijn het fundament.',
            'Stripe coats op lasnaden en hoeken voorkomen de klassieke zwakke plekken.',
            'Zonder geslaagde holiday detectie gaat een tank niet in dienst.',
          ],
        },
        { type: 'h2', text: 'Renoveren of volledig herbekleden?' },
        {
          type: 'p',
          segments: [
            'Niet elke tank hoeft meteen volledig opnieuw bekleed te worden. Bij lokale schade kan een lokale reparatie (spot repair) een volwaardige oplossing zijn: de zones worden plaatselijk gestraald (bijvoorbeeld met vacustralen, zonder gritverspreiding), de randen aangeschuurd en het systeem laag per laag hersteld tot de originele laagdikte. Is de lining op leeftijd, op grote schaal onthecht of chemisch aangetast, dan is volledig herbekleden de enige duurzame keuze. Bekijk onze ',
            { text: 'gerealiseerde tankprojecten', to: '/projects' },
            ' om te zien hoe beide aanpakken er in de praktijk uitzien.',
          ],
        },
        {
          type: 'image',
          src: '/images/tank-touchup.jpg',
          width: 900,
          height: 1200,
          alt: 'Plaatselijke herstelling van de lining: afgeplakte zone wordt laag per laag bijgewerkt',
          caption: 'Spot repair in de praktijk: de afgeplakte zone wordt laag per laag hersteld tot de originele laagdikte.',
        },
        { type: 'h2', text: 'Veelgemaakte fouten' },
        {
          type: 'ul',
          items: [
            'Coaten op een te lage reinheidsgraad omdat "het er proper uitziet".',
            'Zoutmetingen overslaan; zouten zijn onzichtbaar maar in immersie fataal.',
            'Stripe coats weglaten op lasnaden, hoeken en boutverbindingen.',
            'De vonktest overslaan of uitvoeren vóór volledige uitharding.',
            'Een systeem kiezen op prijs in plaats van op de resistentielijst van de fabrikant.',
            'De tank te vroeg vullen, vóór de coating chemisch is uitgehard.',
          ],
        },
        { type: 'h2', text: 'Veelgestelde vragen' },
        {
          type: 'faq',
          items: [
            {
              q: 'Hoe lang gaat een tankcoating mee?',
              a: 'Als vuistregel gaat een professioneel aangebrachte tank lining 10 tot 20 jaar mee, maar een universele levensduur bestaat niet: het opgeslagen product, de temperatuur, het reinigingsregime en het aantal productwissels maken het verschil. Periodieke inspectie (visueel en met laagdiktemetingen) verlengt de levensduur, omdat lokale schade dan hersteld wordt vóór er onderroest ontstaat.',
            },
            {
              q: 'Wat is holiday detectie of een vonktest?',
              a: 'Een holiday test spoort onzichtbare poriën en pinholes in een coating op met een laagspannings- of hoogspanningsdetector, afhankelijk van het systeem en de laagdikte; methode en testspanning volgen het datablad en de projectspecificatie. In immersiedienst is deze test essentieel: één gemiste porie volstaat voor lokale doorroesting van de tankwand.',
            },
            {
              q: 'Welke coating is geschikt voor chemicaliënopslag?',
              a: 'Voor chemicaliën en solventen worden doorgaans epoxy novolac of epoxy fenolische systemen gebruikt, die een hogere chemische en temperatuurresistentie hebben dan standaard epoxy. De resistentielijst van de coatingfabrikant bepaalt per product of een systeem geschikt is; daar mag nooit van afgeweken worden.',
            },
            {
              q: 'Hoe lang is een tank buiten dienst voor een nieuwe lining?',
              a: 'Reken voor een volledige herbekleding op enkele weken: gasvrij maken, reinigen, stralen, coaten in meerdere lagen en chemisch uitharden. De uithardingstijd vóór de tank weer gevuld mag worden is productafhankelijk en staat in het datablad; die tijd inkorten is de snelste weg naar vroegtijdig falen.',
            },
            {
              q: 'Kan een beschadigde tank lining plaatselijk hersteld worden?',
              a: 'Ja. Bij lokale schade worden de zones plaatselijk gestraald, de randen van de bestaande coating aangeschuurd en het originele systeem laag per laag hersteld tot de voorgeschreven laagdikte, gevolgd door een nieuwe vonktest op de herstelde zones. Voorwaarde is dat de omliggende lining nog goed hecht.',
            },
          ],
        },
        {
          type: 'p',
          segments: [
            'Benieuwd hoe wij dit als aannemer aanpakken, van straalwerk tot poriëntest? Bekijk onze dienstenpagina over ',
            { text: 'tankcoating en tank lining', to: '/services/tankcoating' },
            '.',
          ],
        },
        { type: 'h2', text: 'Hulp nodig bij uw tankproject?' },
        {
          type: 'cta',
          title: 'Tankbescherming volgens de norm',
          text: 'Russo NV verzorgt tankcoating en tank lining van straalwerk tot poriëntest, uitgevoerd onder VCA-gecertificeerde veiligheidsprocedures en volgens de toepasselijke ISO- en AMPP-inspectienormen, met een volledig meetdossier bij oplevering. Vraag vrijblijvend een offerte of advies aan.',
          buttonLabel: 'Vraag een offerte aan',
          to: '/contact',
        },
      ],
    },
    EN: {
      title: 'Tank coating and tank lining: how storage tanks get lasting protection',
      metaTitle: 'Tank coating and tank lining: the complete guide | Russo NV',
      description: 'A practical guide to tank coating and tank lining: system selection, blasting, salt and dust testing, DFT checks and holiday detection.',
      excerpt: 'A tank lining works under the harshest conditions imaginable: permanently immersed in the stored product. This is how a professional tank lining is built, from preparation to spark testing, following the standards we apply every day.',
      category: 'Tank protection',
      body: [
        {
          type: 'p',
          segments: [
            'No coating works harder than a tank lining. Where a facade coating sees the occasional rain shower, a tank lining is in direct contact with fuel, chemicals or process water day and night. One weak spot is enough for corrosion, product contamination or a failed inspection. That is why ',
            { text: 'industrial painting', to: '/services/industriele-schilderwerken' },
            ' on tanks is held to the most demanding standards in the trade, and why everything starts with preparation.',
          ],
        },
        { type: 'h2', text: 'What is the difference between tank coating and tank lining?' },
        {
          type: 'p',
          text: 'Tank coating is the broad term for any protective layer on a storage tank, inside and out. Tank lining is more specific: the internal, immersion-grade system in direct contact with the stored product. In practice the terms are used interchangeably; this article covers both, with the emphasis on the lining, because that is where the requirements are highest.',
        },
        {
          type: 'image',
          src: '/images/tank-coating-exterior.jpg',
          width: 900,
          height: 1200,
          alt: 'Exterior of a storage tank after tank coating: white multi-coat system on tank T 296 of 3,053 m³',
          caption: 'Tank coating: the exterior of a storage tank, finished here in a white multi-coat system built to withstand weather, UV and sea air.',
        },
        {
          type: 'image',
          src: '/images/tank-lining-interior.jpg',
          width: 900,
          height: 1200,
          alt: 'Interior of a storage tank with a light blue tank lining on shell, roof and heating coils',
          caption: 'Tank lining: the interior, fully lined with an immersion-grade system in contact with the stored product day and night.',
        },
        { type: 'h2', text: 'Why a tank is the harshest environment for any coating' },
        {
          type: 'p',
          text: 'In immersion service the coating never gets a break. Osmosis drives moisture and dissolved substances through microscopic weak spots, temperature swings work the steel shell, and aggressive products test the chemical resistance of every square centimetre. Defects that would stay invisible for years on an ordinary exterior coating lead to blistering or under-rusting inside a tank within months. The bar for execution and inspection is therefore set a level higher: cleanliness grade Sa 2½ to Sa 3, controlled film thicknesses and a conclusive pinhole test before the tank returns to service.',
        },
        { type: 'h2', text: 'Interior and exterior: two different challenges' },
        {
          type: 'p',
          text: 'The interior (the lining) must chemically withstand the stored product. The exterior fights on another front: weather, UV, sea air and corrosion under insulation. Each demands its own system choice:',
        },
        {
          type: 'ul',
          items: [
            'Interior: chemically resistant systems, typically epoxy phenolic or epoxy novolac. Total dry film thickness varies by product and service conditions from roughly 300 µm to more than 1,000 µm; the data sheet and project specification always govern.',
            'Exterior: a classic multi-coat system with zinc-rich primer, epoxy intermediate and polyurethane topcoat for colour and UV stability.',
            'Tank roofs and walkways: additional anti-slip and roof coating work, often combined with fall-protection zones.',
          ],
        },
        { type: 'h2', text: 'Choosing the right lining system' },
        {
          type: 'p',
          text: 'The stored product dictates the system. The coating manufacturer publishes a resistance list per product; you never deviate from it. As a guideline:',
        },
        {
          type: 'table',
          caption: 'Typical lining systems per stored product',
          headers: ['Stored product', 'Typical lining system', 'Key consideration'],
          rows: [
            ['Diesel, gas oil, fuel oil', 'Epoxy (standard or phenolic)', 'Conductivity and static charge'],
            ['Chemicals and solvents', 'Epoxy novolac or phenolic', 'Manufacturer resistance list is binding'],
            ['Process water, firefighting water', 'Solvent-free epoxy', 'Osmosis resistance'],
            ['Drinking water', 'Certified epoxy', 'Approval per country (Belgaqua, KTW, WRAS)'],
            ['Food products and edible oils', 'Epoxy with food-contact approval', 'Approval per product and application'],
            ['High temperature or changing cargo', 'Epoxy novolac, glass flake reinforced', 'Thermal cycling and impact'],
          ],
        },
        { type: 'h2', text: 'The execution, step by step' },
        { type: 'h3', text: '1. Gas-freeing, cleaning and inspection' },
        {
          type: 'p',
          text: 'A tank is a confined space: atmospheric testing to confirm gas-free conditions, ventilation and permits come before anything else. Product residue is then removed and the condition of floor, shell and weld seams is assessed. Pitting corrosion or floor deformation must surface now, not after blasting.',
        },
        {
          type: 'image',
          src: '/images/tank-cleaning.jpg',
          width: 1200,
          height: 900,
          alt: 'Tank shell during cleaning with chalk markings indicating the wash zones and number of wash passes',
          caption: 'Cleaning the tank shell: every zone is marked and washed until all product residue is gone.',
        },
        { type: 'h3', text: '2. Blasting to Sa 2½ or Sa 3' },
        {
          type: 'p',
          segments: [
            'For immersion service, manufacturers specify cleanliness grade Sa 2½ to Sa 3, with an angular blast profile matched to the film thickness. How that blasting works in detail, from cleanliness grades to surface profile, is covered in our guide on ',
            { text: 'preparing steel for coating', to: '/insights/steel-surface-preparation' },
            '. Inside a tank one extra factor applies: every gram of blast dust has to come back out as well, verified with the dust test to ISO 8502-3.',
          ],
        },
        {
          type: 'image',
          src: '/images/tank-blasting.jpg',
          width: 900,
          height: 1200,
          alt: 'Blaster at work in a dark tank, blast mist in the lamp light',
          caption: 'Blasting inside the tank: heavy work in a confined space, with breathing air and continuous extraction.',
        },
        {
          type: 'image',
          src: '/images/tank-blasting-sa25.jpg',
          width: 1200,
          height: 900,
          alt: 'Freshly blasted lower shell ring inside a storage tank, bare steel to cleanliness grade Sa 2½',
          caption: 'Freshly blasted steel at the base of the tank shell: cleanliness grade Sa 2½ stands out sharply against the untreated shell above.',
        },
        { type: 'h3', text: '3. Measuring soluble salts' },
        {
          type: 'p',
          text: 'Chlorides and sulphates on the steel later draw moisture through the coating (osmosis) and are the hidden failure factor in immersion service. We measure them with the Bresle method to ISO 8502-6 (or via conductivity to ISO 8502-9), then clean and re-measure until the value sits below the manufacturer limit, typically 20 to 50 mg/m² depending on the product.',
        },
        {
          type: 'image',
          src: '/images/tank-salt-test.jpg',
          width: 900,
          height: 675,
          alt: 'Bresle test with Elcometer salt meter on a blasted tank floor, reading in mg/m²',
          caption: 'Bresle measurement on a blasted tank floor: coating only starts below the manufacturer limit.',
        },
        { type: 'h3', text: '4. Climate control' },
        {
          type: 'p',
          text: 'Inside a closed tank you set the climate yourself. With dehumidification and ventilation we keep relative humidity low and the steel above the dew point, so no flash rust forms between blasting and coating. Climate data is logged continuously, from the first blast to the final coat.',
        },
        {
          type: 'image',
          src: '/images/tank-dehumidifier.jpg',
          width: 1200,
          height: 900,
          alt: 'Dehumidification and ventilation setup next to the tank during coating works',
          caption: 'The dehumidification rig runs day and night next to the tank: the climate inside determines the quality.',
        },
        {
          type: 'image',
          src: '/images/tank-climate-log.jpg',
          width: 900,
          height: 900,
          alt: 'Dew point meter inside a storage tank: 13.4 percent relative humidity and steel 27.4 degrees above the dew point',
          caption: 'The climate logger during the works: 13.4% relative humidity and steel a full 27 °C above the dew point, well within the safe margin against flash rust.',
        },
        { type: 'h3', text: '5. Stripe coats and application' },
        {
          type: 'p',
          text: 'Weld seams, corners and bolts first receive a manual stripe coat: exactly where a sprayed film pulls thin. The system is then airless-sprayed in controlled passes to the specified thickness, with wet film measurements during the work and dry film thickness (DFT) checks after each coat has cured.',
        },
        {
          type: 'image',
          src: '/images/tank-spray.jpg',
          width: 900,
          height: 1200,
          alt: 'Applicator in protective suit spraying the lining airless inside the tank',
          caption: 'Airless application of the lining, in controlled passes to the specified film thickness.',
        },
        { type: 'h2', text: 'Quality control before the tank returns to service' },
        {
          type: 'ul',
          items: [
            'Dry film thickness (DFT): measured on a fixed grid across floor and shell (ISO 19840); both the average and the minima must be within the project specification.',
            'Holiday detection: low-voltage or high-voltage detection, depending on the coating system and film thickness, traces pores and pinholes in the lining. In immersion service a single missed pore is enough for through-rusting, so this test is non-negotiable.',
            'Adhesion and cure: cure verification and, where specified, adhesion testing before the tank is returned to service.',
            'Reporting: all measurements (climate, salts, profile, DFT, spark test) in one inspection dossier for owner and inspector.',
          ],
        },
        {
          type: 'image',
          src: '/images/tank-finished.jpg',
          width: 900,
          height: 1200,
          alt: 'Finished tank lining: cleanly coated shell, roof and pipework',
          caption: 'The end result: a cleanly finished lining, ready for the holiday test and handover.',
        },
        {
          type: 'callout',
          title: 'Key takeaways',
          items: [
            'A tank lining lives permanently under the heaviest possible load: immersion.',
            'The stored product dictates the system; the manufacturer resistance list is binding.',
            'Sa 2½ to Sa 3 and a salt reading below the limit are the foundation.',
            'Stripe coats on weld seams and corners prevent the classic weak spots.',
            'Without a passed holiday test, a tank does not go back into service.',
          ],
        },
        { type: 'h2', text: 'Repair locally or fully reline?' },
        {
          type: 'p',
          segments: [
            'Not every tank needs a full reline straight away. With local damage, spot repair can be a fully sound solution: the zones are blasted locally (for example vacuum blasting, without spreading grit), the edges are feathered and the system is rebuilt coat by coat to the original thickness. If the lining is aged, widely disbonded or chemically attacked, a full reline is the only durable choice. Have a look at our ',
            { text: 'completed tank projects', to: '/projects' },
            ' to see what both approaches look like in practice.',
          ],
        },
        {
          type: 'image',
          src: '/images/tank-touchup.jpg',
          width: 900,
          height: 1200,
          alt: 'Local lining repair: masked zone being rebuilt coat by coat',
          caption: 'Spot repair in practice: the masked zone is rebuilt coat by coat to the original film thickness.',
        },
        { type: 'h2', text: 'Common mistakes' },
        {
          type: 'ul',
          items: [
            'Coating over an insufficient cleanliness grade because "it looks clean".',
            'Skipping salt measurements; salts are invisible but fatal in immersion.',
            'Leaving out stripe coats on weld seams, corners and bolted connections.',
            'Skipping the spark test, or running it before the coating has fully cured.',
            'Choosing a system on price instead of the manufacturer resistance list.',
            'Filling the tank too early, before the coating has chemically cured.',
          ],
        },
        { type: 'h2', text: 'Frequently asked questions' },
        {
          type: 'faq',
          items: [
            {
              q: 'How long does a tank coating last?',
              a: 'As a rule of thumb, a professionally applied tank lining lasts 10 to 20 years, but there is no universal service life: the stored product, temperature, cleaning regime and number of cargo changes make the difference. Periodic inspection (visual plus film thickness measurements) extends that life, because local damage gets repaired before under-rusting can develop.',
            },
            {
              q: 'What is holiday detection or spark testing?',
              a: 'A holiday test finds invisible pores and pinholes in a coating using a low-voltage or high-voltage detector, depending on the coating system and film thickness; the method and test voltage follow the data sheet and project specification. In immersion service this test is essential: one missed pore is enough for local through-rusting of the tank shell.',
            },
            {
              q: 'Which coating suits chemical storage?',
              a: 'For chemicals and solvents, epoxy novolac or epoxy phenolic systems are typically used, offering higher chemical and temperature resistance than standard epoxy. The coating manufacturer’s resistance list determines suitability per product; it is never deviated from.',
            },
            {
              q: 'How long is a tank out of service for a new lining?',
              a: 'Allow several weeks for a full reline: gas-freeing, cleaning, blasting, coating in multiple coats and chemical curing. The cure time before the tank may be refilled is product-specific and stated in the datasheet; cutting it short is the fastest route to premature failure.',
            },
            {
              q: 'Can a damaged tank lining be repaired locally?',
              a: 'Yes. With local damage the zones are blasted locally, the edges of the existing coating are feathered and the original system is rebuilt coat by coat to the specified thickness, followed by a new holiday test on the repaired zones, provided the surrounding lining still adheres well.',
            },
          ],
        },
        {
          type: 'p',
          segments: [
            'Curious how we handle this as a contractor, from blasting to holiday testing? Have a look at our ',
            { text: 'tank coating and tank lining', to: '/services/tankcoating' },
            ' service page.',
          ],
        },
        { type: 'h2', text: 'Need help with your tank project?' },
        {
          type: 'cta',
          title: 'Tank protection to the standard',
          text: 'Russo NV delivers tank coating and tank lining from blasting to holiday testing, performed under VCA-certified safety procedures and the applicable ISO and AMPP inspection standards, with a complete measurement dossier at handover. Request a no-obligation quote or advice.',
          buttonLabel: 'Request a quote',
          to: '/contact',
        },
      ],
    },
  },
  {
    slug: 'corrosion-protection-iso-12944',
    updated: '2026-11-06',
    date: '2026-08-19',
    updated: '2026-08-19',
    author: 'Stig Vanmarsenille',
    authorRole: {
      NL: 'NACE Level 2 coating inspector',
      EN: 'NACE Level 2 coating inspector',
    },
    authorBio: {
      NL: 'Stig Vanmarsenille is NACE Level 2 coating inspector bij Russo NV. Hij keurt en begeleidt dagelijks industriële straal- en coatingwerken op de werf, van tankbekleding tot staalconstructies in de petrochemie.',
      EN: 'Stig Vanmarsenille is a NACE Level 2 coating inspector at Russo NV. He inspects and supervises industrial blasting and coating work on site every day, from tank linings to structural steel in petrochemicals.',
    },
    authorUrl: 'https://www.linkedin.com/in/stig-vanmarsenille-747176b9/',
    authorImage: '/images/author-stig.jpg',
    heroImage: '/images/article3-hero.jpg',
    heroAlt: {
      NL: 'Russo NV inspecteert een tankwand met afbladderende coating en corrosie in de haven',
      EN: 'Russo NV inspecting a tank shell with flaking coating and corrosion in the port',
    },
    keywords: {
      NL: ['corrosiebescherming', 'ISO 12944', 'corrosiviteitsklasse', 'C5 kustklimaat', 'conservering staal', 'coatingsysteem', 'zinkrijke primer', 'levensduur coating'],
      EN: ['corrosion protection', 'ISO 12944', 'corrosivity category', 'C5 marine', 'steel protection', 'coating system', 'zinc-rich primer', 'coating durability'],
    },
    NL: {
      title: 'Corrosiebescherming volgens ISO 12944: klassen, systemen en levensduur',
      metaTitle: 'Corrosiebescherming volgens ISO 12944: de gids | Russo NV',
      description: 'Hoe kies je het juiste coatingsysteem voor staal? De corrosiviteitsklassen C1 tot CX, levensduurbereiken en systeemopbouw van ISO 12944, praktisch uitgelegd.',
      excerpt: 'Elk staalproject krijgt dezelfde vraag: welk coatingsysteem, hoeveel lagen, welke laagdikte? Het antwoord staat in één norm: ISO 12944. Dit is hoe je hem leest en toepast, zonder dure over- of onderbescherming.',
      category: 'Corrosiebescherming',
      body: [
        {
          type: 'p',
          segments: [
            'Staal roest niet overal even snel. Een loods in de Kempen is een andere wereld dan een kaaimuurconstructie in de haven van Antwerpen, en wie op beide plaatsen hetzelfde verfsysteem zet, betaalt ofwel te veel, ofwel veel te vroeg opnieuw. Daarom bestaat er één internationale kapstok voor ',
            { text: 'industriële schilderwerken', to: '/' },
            ' op staal met verfsystemen: ISO 12944, dé internationale referentie voor dit vakgebied. Wie die norm begrijpt, begrijpt elke offerte, elk bestek en elke garantiediscussie.',
          ],
        },
        { type: 'h2', text: 'Wat is ISO 12944?' },
        {
          type: 'p',
          text: 'ISO 12944 is de internationale norm voor corrosiebescherming van staalconstructies met verfsystemen. De norm bestaat uit meerdere delen die samen het volledige traject afdekken: de omgevingsclassificatie (deel 2), ontwerpprincipes (deel 3), oppervlaktetypes en voorbereiding (deel 4), de verfsystemen zelf (deel 5), laboratoriumtesten (deel 6), uitvoering en toezicht (deel 7) en specificaties voor nieuwbouw en onderhoud (deel 8). Tijdens de herzieningscyclus van 2017 tot 2019 kwam daar deel 9 bij, specifiek voor offshore en andere extreme omstandigheden. In de praktijk draait bijna elke keuze om twee vragen: in welke corrosiviteitsklasse staat de constructie, en hoe lang moet het systeem meegaan?',
        },
        { type: 'h2', text: 'De corrosiviteitsklassen: van C1 tot CX' },
        {
          type: 'p',
          text: 'Deel 2 van de norm deelt omgevingen in volgens hun agressiviteit voor staal. Hoe hoger de klasse, hoe zwaarder het vereiste systeem:',
        },
        {
          type: 'table',
          caption: 'Corrosiviteitsklassen volgens ISO 12944-2',
          headers: ['Klasse', 'Omgeving', 'Typische voorbeelden'],
          rows: [
            ['C1', 'Zeer laag', 'Verwarmde binnenruimtes met droge lucht (kantoren, scholen)'],
            ['C2', 'Laag', 'Onverwarmde loodsen, plattelandsatmosfeer met weinig vervuiling'],
            ['C3', 'Gemiddeld', 'Stedelijke en licht industriële atmosfeer, productiehallen met vocht'],
            ['C4', 'Hoog', 'Industriële zones en kustgebieden met matige zoutbelasting, chemische installaties'],
            ['C5', 'Zeer hoog', 'Industriële omgeving met agressieve atmosfeer, kust- en havengebieden met hoge zoutbelasting'],
            ['CX', 'Extreem', 'Offshore, getijdenzones, extreme industriële omstandigheden (sinds de 2017-revisie)'],
          ],
        },
        {
          type: 'p',
          text: 'Voor constructies onder water of in de bodem gelden aparte immersieklassen:',
        },
        {
          type: 'table',
          caption: 'Immersieklassen volgens ISO 12944-2',
          headers: ['Klasse', 'Blootstelling'],
          rows: [
            ['Im1', 'Zoet water'],
            ['Im2', 'Zee- of brakwater zonder kathodische bescherming'],
            ['Im3', 'Bodem'],
            ['Im4', 'Zee- of brakwater met kathodische bescherming'],
          ],
        },
        {
          type: 'p',
          segments: [
            'Belangrijke nuance: de Im-klassen bepalen niet automatisch het systeem voor de binnenzijde van een opslagtank. ISO 12944 sluit tankinterieurs, pijpleidingen en ingegraven constructies uitdrukkelijk uit; daar wegen het opgeslagen product, de temperatuur, de chemische resistentie en de goedkeuring van de fabrikant. Die wereld behandelen we apart in onze gids over ',
            { text: 'tankcoating en tank lining', to: '/insights/tank-coating-lining' },
            '.',
          ],
        },
        {
          type: 'p',
          text: 'En de klasse zelf? Die hangt af van de werkelijke blootstelling, niet van het adres. In de havens van Antwerpen, Gent en Zeebrugge worden veel constructies beoordeeld als C4 tot C5, maar op terminalprojecten classificeren wij nooit een hele site in één keer: beschut staal onder een luifel, zones met permanente condensatie, buitenstaal in de zeewind en aanlandige spatzones kunnen binnen dezelfde installatie elk een andere beoordeling vragen. De klassebepaling gebeurt per constructie en per blootstellingszone.',
        },
        { type: 'h3', text: 'Wat betekent C3 volgens ISO 12944?' },
        {
          type: 'p',
          text: 'C3 staat voor een gemiddelde corrosiviteit. Buiten gaat het om een stedelijke of licht industriële atmosfeer en kustgebieden met weinig zout, binnen om productieruimtes met vocht, zoals brouwerijen en wasserijen. Onbeschermd koolstofstaal verliest er in het eerste jaar 25 tot 50 µm.',
        },
        { type: 'h3', text: 'Wat betekent C4?' },
        {
          type: 'p',
          text: 'C4 staat voor een hoge corrosiviteit: industriële zones en kustgebieden met matig zout, en binnen bijvoorbeeld chemische installaties. Het staalverlies in het eerste jaar loopt op tot 50 tot 80 µm. Dit is de klasse waar het coatingsysteem duidelijk zwaarder wordt dan een gewone onderhoudsverf.',
        },
        { type: 'h3', text: 'Wat betekent C5?' },
        {
          type: 'p',
          text: 'C5 staat voor een zeer hoge corrosiviteit: industriële zones met hoge vochtigheid en een agressieve atmosfeer, en kustgebieden met veel zout. Het staalverlies bedraagt 80 tot 200 µm in het eerste jaar. Vroeger maakte de norm hier onderscheid tussen C5-I en C5-M, sinds 2017 is dat gewoon C5, met CX als extra klasse voor extreme omgevingen.',
        },
        {
          type: 'p',
          segments: [
            'Welke klasse gebruikelijk is per type locatie, van de kust tot het binnenland, zetten we op een rij in ons overzicht van de ',
            { text: 'corrosieklassen in België', to: '/insights/corrosieklassen-belgie' },
            '. Staat er al roest op het staal? Lees dan eerst over de methodes van ',
            { text: 'corrosiebestrijding', to: '/insights/corrosiebestrijding' },
            '.',
          ],
        },
        {
          type: 'image',
          src: '/images/iso-c5-omgeving.jpg',
          width: 900,
          height: 1200,
          alt: 'Vers gecoat tankdak in de haven: industriële atmosfeer, zeelucht en chemie in één omgeving',
          caption: 'Een klassieke C4/C5-omgeving: industrie, zeelucht en chemie in één beeld. Het vers gecoate dak op de voorgrond is eigen werk.',
        },
        {
          type: 'image',
          src: '/images/iso-pitting.jpg',
          width: 1200,
          height: 900,
          alt: 'Close-up van putcorrosie (pitting) in een stalen oppervlak',
          caption: 'Wat er gebeurt zonder passende bescherming: putcorrosie (pitting) vreet zich lokaal in het staal.',
        },
        { type: 'h2', text: 'Levensduurbereiken: hoe lang moet het systeem meegaan?' },
        {
          type: 'p',
          text: 'De tweede as van de norm is de verwachte levensduur tot het eerste grote onderhoud. ISO 12944 onderscheidt vier bereiken: laag (tot 7 jaar), gemiddeld (7 tot 15 jaar), hoog (15 tot 25 jaar) en, sinds de 2017-revisie, zeer hoog (meer dan 25 jaar). Belangrijk om te weten: dit is geen garantietermijn maar een ontwerpverwachting. De combinatie van corrosiviteitsklasse en levensduurbereik bepaalt samen hoe zwaar het systeem moet zijn. C5 met een hoge levensduurverwachting vraagt een fundamenteel ander pakket dan C3 met een gemiddelde verwachting.',
        },
        { type: 'h2', text: 'Hoe een coatingsysteem is opgebouwd' },
        {
          type: 'p',
          text: 'Eerst een misverstand uit de wereld: ISO 12944 schrijft geen universeel recept voor per klasse. Het systeem wordt gekozen op basis van de klasse, de gewenste levensduur, de ondergrond, de voorbereiding, de blootstelling en de goedgekeurde systeemdocumentatie van de fabrikant. Wat wel altijd terugkomt, is de gelaagde opbouw waarin elke laag een eigen taak heeft:',
        },
        {
          type: 'ul',
          items: [
            'Grondlaag (primer): zorgt voor hechting en de eerste corrosiewering. Afhankelijk van het gekozen systeem is dat een zinkrijke primer (het zink beschermt het staal zelfs bij een beschadiging, kathodische werking) of een primer met een ander beschermingsmechanisme.',
            'Tussenlagen: bouwen de laagdikte op en vormen de barrière tegen vocht en zuurstof. Doorgaans epoxy, vaak met micaceous iron oxide (MIO) voor extra barrièrewerking.',
            'Toplaag: beschermt tegen UV en weer, bepaalt kleur en glans. Meestal polyurethaan; voor extreme UV-eisen polysiloxaan.',
          ],
        },
        {
          type: 'p',
          text: 'De totale droge laagdikte stijgt mee met de klasse. Ter indicatie, en nadrukkelijk geen normwaarden: C3-systemen komen vaak rond 160 tot 200 µm uit, C4 typisch op 200 tot 240 µm en C5 op 260 tot 320 µm of meer, verdeeld over drie of meer lagen. De nominale laagdikte (NDFT) en het aantal lagen volgen altijd uit het complete, geteste systeem en de duurzaamheidsklasse, zoals vastgelegd in deel 5 van de norm en het datablad van de fabrikant; daar wordt nooit van afgeweken.',
        },
        {
          type: 'image',
          src: '/images/iso-second-layer.jpg',
          width: 675,
          height: 1200,
          alt: 'Applicatie van een tweede laag met airless spuitapparatuur vanop een stelling',
          caption: 'Laag per laag opbouwen: de tweede laag gaat erop, elke laag met zijn eigen taak en laagdikte.',
        },
        { type: 'h2', text: 'De voorbereiding bepaalt of het systeem zijn levensduur haalt' },
        {
          type: 'p',
          segments: [
            'ISO 12944 is er duidelijk over: het beste systeem faalt op een slechte ondergrond. Deel 4 verwijst rechtstreeks naar de reinheidsgraden van ISO 8501-1 en het bijbehorende straalprofiel; voor gestraald staal in zware systemen wordt doorgaans Sa 2½ gespecificeerd, maar de vereiste voorbereidingsgraad volgt altijd uit het gekozen systeem en de projectspecificatie. Hoe die voorbereiding er in de praktijk uitziet, van ontvetten tot zoutmeting, lees je stap voor stap in onze gids ',
            { text: 'staal voorbereiden voor coating', to: '/insights/steel-surface-preparation' },
            '. Reken er als vuistregel op dat de helft van de kwaliteit van een corrosiewerend systeem in de voorbereiding zit.',
          ],
        },
        {
          type: 'image',
          src: '/images/iso-spot-blast.jpg',
          width: 900,
          height: 1200,
          alt: 'Plaatselijk gestraalde zone op een geklonken tankbodem, klaar voor herstel',
          caption: 'Plaatselijk gestraald tot op blank staal: zo begint elk duurzaam herstel.',
        },
        { type: 'h2', text: 'Nieuwbouw of onderhoud: twee verschillende sommen' },
        {
          type: 'p',
          segments: [
            'Bij nieuwbouw is de keuze relatief eenvoudig: klasse bepalen, levensduur kiezen, systeem uit deel 5 selecteren. Bij onderhoud komt er een beoordeling bij: hoeveel procent van het oppervlak is aangetast, hecht de bestaande coating nog, en is plaatselijk herstel zinvol of is volledig opnieuw stralen en opbouwen goedkoper over de levensduur bekeken? Die afweging maken we dagelijks op terminals en industriële sites; onze ',
            { text: 'gerealiseerde projecten', to: '/projects' },
            ' tonen beide routes in de praktijk.',
          ],
        },
        { type: 'h2', text: 'Wat moet een volledige ISO 12944-specificatie bevatten?' },
        {
          type: 'p',
          text: '"C5" alleen is geen specificatie. Een volledig bestek volgens ISO 12944 legt minstens dit vast:',
        },
        {
          type: 'ul',
          items: [
            'De corrosiviteitsklasse per constructie(deel) en blootstellingszone.',
            'De duurzaamheidsklasse (laag, gemiddeld, hoog of zeer hoog).',
            'De ondergrond en de vereiste voorbereidingsgraad (bv. Sa 2½) met straalprofiel.',
            'Het coatingsysteem met NDFT per laag en het totale systeem, volgens de goedgekeurde systeemdocumentatie.',
            'Stripe coats op lasnaden, randen en bouten.',
            'De applicatiecondities (klimaatvenster, overschildertermijnen).',
            'De inspectiemethode en acceptatiecriteria bij oplevering.',
          ],
        },
        {
          type: 'p',
          text: 'Ontbreekt een van deze elementen, dan is de kans groot dat aannemer en opdrachtgever bij oplevering over iets anders blijken te spreken. Een compleet bestek beschermt beide partijen.',
        },
        {
          type: 'image',
          src: '/images/iso-dft.jpg',
          width: 900,
          height: 1200,
          alt: 'DFT-meting met een Elcometer op een afgewerkte coating, meetwaarde 385 µm',
          caption: 'Meten is weten: DFT-controle op de afgewerkte coating, hier 385 µm.',
        },
        {
          type: 'callout',
          title: 'Belangrijkste punten',
          items: [
            'ISO 12944 koppelt de omgeving (C1 tot CX en Im) aan de zwaarte van het coatingsysteem.',
            'Veel constructies in de Belgische havens worden beoordeeld als C4 tot C5, per blootstellingszone bepaald.',
            'Levensduurbereik is een ontwerpkeuze: laag, gemiddeld, hoog of zeer hoog (25+ jaar).',
            'Zinkrijke primers, epoxy tussenlagen en PU toplagen vormen de ruggengraat van veel zware systemen.',
            'De helft van de kwaliteit zit in de voorbereiding; de vereiste graad volgt uit systeem en bestek.',
            'De NDFT volgt uit het geteste systeem, niet uit de klasse alleen.',
          ],
        },
        { type: 'h2', text: 'Veelgemaakte fouten' },
        {
          type: 'ul',
          items: [
            'De corrosiviteitsklasse te laag inschatten om de offerte te drukken; het verschil betaal je dubbel bij het eerste onderhoud.',
            'Een C5-systeem specificeren maar besparen op de straalwerken eronder.',
            'Laagdiktes optellen op papier zonder ze per laag te meten tijdens de uitvoering.',
            'De toplaag weglaten "omdat het toch binnen staat" terwijl er condensatie of chemische damp aanwezig is.',
            'Onderhoud uitstellen tot voorbij het punt waar plaatselijk herstel nog mogelijk is.',
          ],
        },
        { type: 'h2', text: 'Veelgestelde vragen' },
        {
          type: 'faq',
          items: [
            {
              q: 'Welke corrosiviteitsklasse geldt in de Antwerpse haven?',
              a: 'Reken op C4 tot C5: een combinatie van industriële atmosfeer, zeelucht en chemische belasting. Voor constructiedelen in de getijdenzone of onder water gelden de Im-klassen of CX. Een correcte klassebepaling per project is altijd de eerste stap; bij twijfel wordt een klasse hoger gekozen.',
            },
            {
              q: 'Hoe lang gaat een coatingsysteem volgens ISO 12944 mee?',
              a: 'De norm werkt met levensduurbereiken tot het eerste grote onderhoud: laag (tot 7 jaar), gemiddeld (7 tot 15), hoog (15 tot 25) en zeer hoog (meer dan 25 jaar). Welk bereik haalbaar is, hangt af van de klasse, het gekozen systeem, de laagdikte en vooral de kwaliteit van voorbereiding en applicatie.',
            },
            {
              q: 'Wanneer is een zinkrijke primer aangewezen?',
              a: 'Zink beschermt staal ook wanneer de coating plaatselijk beschadigd raakt: het offert zichzelf op in plaats van het staal (kathodische bescherming). Daarom kiezen veel goedgekeurde systemen voor zware klassen als C4 en C5 een zinkrijke basis, gecombineerd met epoxy tussenlagen en een UV-vaste toplaag. Verplicht is het niet: het gekozen, geteste systeem bepaalt de primer.',
            },
            {
              q: 'Schrijft ISO 12944 een minimale laagdikte voor?',
              a: 'Nee, niet per klasse. Er bestaat geen laagdikte die automatisch bij C3, C4 of C5 hoort. De nominale droge laagdikte (NDFT) en het aantal lagen volgen uit het complete, geteste systeem en de gekozen duurzaamheidsklasse, zoals vastgelegd in deel 5 en het datablad van de fabrikant. De projectspecificatie legt die waarden vast, samen met de meet- en acceptatiecriteria.',
            },
            {
              q: 'Geldt ISO 12944 ook voor de binnenzijde van opslagtanks?',
              a: 'Nee. Tankinterieurs, pijpleidingen en ingegraven constructies vallen uitdrukkelijk buiten de norm. Voor een tank lining wegen het opgeslagen product, de temperatuur, de chemische resistentie en de goedkeuring van de fabrikant; zie daarvoor onze aparte gids over tankcoating en tank lining.',
            },
            {
              q: 'Wat kost corrosiebescherming per m²?',
              a: 'Dat hangt af van de klasse, het systeem, de laagdikte, de staat van de ondergrond en de bereikbaarheid. Een C3-systeem in een werkplaats is een andere som dan een C5-systeem op hoogte in een actieve terminal. Omdat elk project verschilt, rekenen we op basis van een inspectie of uw bestek.',
            },
            {
              q: 'Welke informatie is nodig voor een accurate offerte?',
              a: 'Minstens: de locatie en omgeving (of de vastgelegde klasse), het te behandelen oppervlak in m², de staat van de bestaande coating of het staal, de gewenste levensduur, de bereikbaarheid (hoogte, stellingen, actieve site) en het bestek of de systeemvoorkeur indien aanwezig. Met die elementen kan een offerte zonder verrassingen opgemaakt worden; ontbreekt er iets, dan plannen we een korte inspectie.',
            },
            {
              q: 'Kan een bestaand coatingsysteem verzwaard worden voor een agressievere omgeving of langere levensduur?',
              a: 'Ja. Na beoordeling van de bestaande coating wordt de constructie gestraald tot de vereiste reinheidsgraad en wordt een zwaarder systeem opgebouwd, passend bij de beoordeelde blootstelling en de gewenste levensduur. Bij gedeeltelijke aantasting kan dat gefaseerd, zodat de site operationeel blijft.',
            },
          ],
        },
        { type: 'h2', text: 'Hulp nodig bij uw project?' },
        {
          type: 'cta',
          title: 'Bescherming op maat van de omgeving',
          text: 'Russo NV bepaalt de corrosiviteitsklasse, adviseert het juiste systeem en voert het volledige traject uit: stralen, applicatie en inspectie, uitgevoerd onder VCA-gecertificeerde veiligheidsprocedures en volgens ISO 12944. Vraag vrijblijvend een offerte of advies aan.',
          buttonLabel: 'Vraag een offerte aan',
          to: '/contact',
        },
      ],
    },
    EN: {
      title: 'Corrosion protection to ISO 12944: categories, systems and durability',
      metaTitle: 'ISO 12944 Corrosion Protection: Categories & Systems | Russo NV',
      description: 'ISO 12944 explained: compare C1 to CX corrosivity categories, durability classes, surface preparation and coating systems for steel.',
      excerpt: 'Every steel project raises the same question: which coating system, how many coats, what film thickness? The answer lives in one standard: ISO 12944. This is how to read and apply it, without paying for over- or under-protection.',
      category: 'Corrosion protection',
      body: [
        {
          type: 'p',
          segments: [
            'Steel does not rust at the same speed everywhere. A warehouse in the Campine countryside is a different world from a quay structure in the Port of Antwerp, and whoever applies the same paint system in both places either pays too much, or repaints far too soon. That is why there is one international framework for ',
            { text: 'industrial painting', to: '/services/industriele-schilderwerken' },
            ' on steel with protective paint systems: ISO 12944, the main international reference for this field. Understand the standard and you understand every quotation, every specification and every warranty discussion.',
          ],
        },
        { type: 'h2', text: 'What is ISO 12944?' },
        {
          type: 'p',
          text: 'ISO 12944 is the international standard for corrosion protection of steel structures by protective paint systems. It consists of several parts that together cover the whole journey: environment classification (part 2), design considerations (part 3), surface types and preparation (part 4), the paint systems themselves (part 5), laboratory testing (part 6), execution and supervision (part 7) and specifications for new work and maintenance (part 8). The 2017 to 2019 revision cycle added part 9, specifically for offshore and other extreme conditions. In practice, almost every choice comes down to two questions: which corrosivity category does the structure sit in, and how long must the system last?',
        },
        { type: 'h2', text: 'The corrosivity categories: from C1 to CX' },
        {
          type: 'p',
          text: 'Part 2 of the standard classifies environments by how aggressive they are to steel. The higher the category, the heavier the required system:',
        },
        {
          type: 'table',
          caption: 'Corrosivity categories to ISO 12944-2',
          headers: ['Category', 'Corrosivity', 'Typical examples'],
          rows: [
            ['C1', 'Very low', 'Heated interior spaces with dry air (offices, schools)'],
            ['C2', 'Low', 'Unheated warehouses, rural atmosphere with little pollution'],
            ['C3', 'Medium', 'Urban and light industrial atmosphere, production halls with humidity'],
            ['C4', 'High', 'Industrial zones and coastal areas with moderate salinity, chemical plants'],
            ['C5', 'Very high', 'Industrial environments with aggressive atmosphere, coastal and port areas with high salinity'],
            ['CX', 'Extreme', 'Offshore, tidal zones, extreme industrial conditions (since the 2017 revision)'],
          ],
        },
        {
          type: 'p',
          text: 'Structures under water or in soil have their own immersion categories:',
        },
        {
          type: 'table',
          caption: 'Immersion categories to ISO 12944-2',
          headers: ['Category', 'Exposure'],
          rows: [
            ['Im1', 'Fresh water'],
            ['Im2', 'Sea or brackish water without cathodic protection'],
            ['Im3', 'Soil'],
            ['Im4', 'Sea or brackish water with cathodic protection'],
          ],
        },
        {
          type: 'p',
          segments: [
            'An important nuance: the Im categories do not automatically determine the system for the inside of a storage tank. ISO 12944 explicitly excludes tank interiors, pipelines and buried structures; there, the stored product, temperature, chemical resistance and manufacturer approval govern. We cover that world separately in our guide on ',
            { text: 'tank coating and tank lining', to: '/insights/tank-coating-lining' },
            '.',
          ],
        },
        {
          type: 'p',
          text: 'And the category itself? It depends on the actual exposure, not the address. In the ports of Antwerp, Ghent and Zeebrugge many structures are assessed as C4 to C5, but on terminal projects we never classify an entire site in one go: sheltered steel under a canopy, zones with permanent condensation, external steel in the sea wind and splash zones can each require a different assessment within the same installation. Classification is done per structure and per exposure zone.',
        },
        { type: 'h3', text: 'What does C3 mean in ISO 12944?' },
        {
          type: 'p',
          text: 'C3 stands for medium corrosivity. Outdoors it covers urban or lightly industrial atmospheres and coastal areas with little salt, indoors production rooms with moisture, such as breweries and laundries. Unprotected carbon steel loses 25 to 50 µm there in the first year.',
        },
        { type: 'h3', text: 'What does C4 mean?' },
        {
          type: 'p',
          text: 'C4 stands for high corrosivity: industrial zones and coastal areas with moderate salt, and indoors for example chemical plants. Steel loss in the first year rises to 50 to 80 µm. This is the class where the coating system becomes clearly heavier than ordinary maintenance paint.',
        },
        { type: 'h3', text: 'What does C5 mean?' },
        {
          type: 'p',
          text: 'C5 stands for very high corrosivity: industrial zones with high humidity and an aggressive atmosphere, and coastal areas with a lot of salt. Steel loss is 80 to 200 µm in the first year. The standard used to distinguish C5-I and C5-M here, since 2017 it is simply C5, with CX as an extra class for extreme environments.',
        },
        {
          type: 'p',
          segments: [
            'Which class is usual per type of location, from the coast to inland, is listed in our overview of ',
            { text: 'corrosivity classes in Belgium', to: '/insights/corrosieklassen-belgie' },
            '. Is there already rust on the steel? Read about the methods of ',
            { text: 'corrosion control', to: '/insights/corrosiebestrijding' },
            ' first.',
          ],
        },
        {
          type: 'image',
          src: '/images/iso-c5-omgeving.jpg',
          width: 900,
          height: 1200,
          alt: 'Freshly coated tank roof in the port: industrial atmosphere, sea air and chemistry in one environment',
          caption: 'A classic C4/C5 environment: industry, sea air and chemistry in one frame. The freshly coated roof in the foreground is our own work.',
        },
        {
          type: 'image',
          src: '/images/iso-pitting.jpg',
          width: 1200,
          height: 900,
          alt: 'Close-up of pitting corrosion in a steel surface',
          caption: 'What happens without proper protection: pitting corrosion eating locally into the steel.',
        },
        { type: 'h2', text: 'Durability ranges: how long must the system last?' },
        {
          type: 'p',
          text: 'The second axis of the standard is the expected life until first major maintenance. ISO 12944 distinguishes four ranges: low (up to 7 years), medium (7 to 15 years), high (15 to 25 years) and, since the 2017 revision, very high (more than 25 years). Important: this is a design expectation, not a guarantee period. The combination of corrosivity category and durability range together determines how heavy the system must be. C5 with a high durability expectation demands a fundamentally different package than C3 with a medium one.',
        },
        { type: 'h2', text: 'How a coating system is built up' },
        {
          type: 'p',
          text: 'First, a misconception to clear up: ISO 12944 does not prescribe one universal recipe per category. The system is selected using the category, the required durability, the substrate, the preparation, the exposure conditions and the manufacturer approved system documentation. What always returns is the layered build-up in which every coat has its own job:',
        },
        {
          type: 'ul',
          items: [
            'Primer: provides adhesion and the first stage of corrosion protection. Depending on the selected system it is zinc-rich (the zinc protects the steel even at a damage point, cathodic action) or uses another protective mechanism.',
            'Intermediate coats: build the film thickness and form the barrier against moisture and oxygen. Typically epoxy, often with micaceous iron oxide (MIO) for extra barrier effect.',
            'Topcoat: protects against UV and weather, provides colour and gloss. Usually polyurethane; polysiloxane for extreme UV demands.',
          ],
        },
        {
          type: 'p',
          text: 'Total dry film thickness rises with the category. As an indication, and explicitly not standard requirements: C3 systems often land around 160 to 200 µm, C4 typically at 200 to 240 µm and C5 at 260 to 320 µm or more, spread over three or more coats. The nominal dry film thickness (NDFT) and the number of coats always follow from the complete, tested system and the durability class, as laid down in part 5 of the standard and the manufacturer data sheet; those are never deviated from.',
        },
        {
          type: 'image',
          src: '/images/iso-second-layer.jpg',
          width: 675,
          height: 1200,
          alt: 'Applying a second coat with airless spray equipment from scaffolding',
          caption: 'Building up coat by coat: the second layer goes on, each coat with its own job and thickness.',
        },
        { type: 'h2', text: 'Preparation decides whether the system reaches its design life' },
        {
          type: 'p',
          segments: [
            'ISO 12944 is explicit: the best system fails on a poor substrate. Part 4 refers directly to the cleanliness grades of ISO 8501-1 and the matching surface profile; Sa 2½ is commonly specified for blast-cleaned steel in high-performance systems, but the required preparation grade always follows from the selected system and the project specification. What that preparation looks like in practice, from degreasing to salt testing, is covered step by step in our guide on ',
            { text: 'preparing steel for coating', to: '/insights/steel-surface-preparation' },
            '. As a rule of thumb, half the quality of a corrosion protection system lives in the preparation.',
          ],
        },
        {
          type: 'image',
          src: '/images/iso-spot-blast.jpg',
          width: 900,
          height: 1200,
          alt: 'Locally blasted zone on a riveted tank floor, ready for repair',
          caption: 'Locally blasted to bare steel: this is how every durable repair starts.',
        },
        { type: 'h2', text: 'New build or maintenance: two different calculations' },
        {
          type: 'p',
          segments: [
            'For new construction the choice is relatively simple: determine the category, choose the durability, select a system from part 5. Maintenance adds an assessment: what percentage of the surface is affected, does the existing coating still adhere, and is local repair worthwhile or is full blasting and rebuilding cheaper over the life of the asset? We make that trade-off daily on terminals and industrial sites; our ',
            { text: 'completed projects', to: '/projects' },
            ' show both routes in practice.',
          ],
        },
        { type: 'h2', text: 'What must a complete ISO 12944 specification contain?' },
        {
          type: 'p',
          text: '"C5" alone is not a specification. A complete specification to ISO 12944 pins down at least the following:',
        },
        {
          type: 'ul',
          items: [
            'The corrosivity category per structure (part) and exposure zone.',
            'The durability class (low, medium, high or very high).',
            'The substrate and the required preparation grade (e.g. Sa 2½) with surface profile.',
            'The coating system with NDFT per coat and in total, according to the approved system documentation.',
            'Stripe coats on weld seams, edges and bolts.',
            'The application conditions (climate window, overcoating intervals).',
            'The inspection method and acceptance criteria at handover.',
          ],
        },
        {
          type: 'p',
          text: 'When one of these elements is missing, contractor and client tend to discover at handover that they were talking about different things. A complete specification protects both parties.',
        },
        {
          type: 'image',
          src: '/images/iso-dft.jpg',
          width: 900,
          height: 1200,
          alt: 'DFT measurement with an Elcometer on a finished coating, reading 385 µm',
          caption: 'Measuring is knowing: DFT check on the finished coating, here 385 µm.',
        },
        {
          type: 'callout',
          title: 'Key takeaways',
          items: [
            'ISO 12944 links the environment (C1 to CX and Im) to the weight of the coating system.',
            'Many structures in the Belgian ports are assessed as C4 to C5, determined per exposure zone.',
            'Durability range is a design choice: low, medium, high or very high (25+ years).',
            'Zinc-rich primers, epoxy intermediates and PU topcoats form the backbone of many heavy-duty systems.',
            'Half the quality lives in the preparation; the required grade follows from system and specification.',
            'The NDFT follows from the tested system, not from the category alone.',
          ],
        },
        { type: 'h2', text: 'Common mistakes' },
        {
          type: 'ul',
          items: [
            'Underestimating the corrosivity category to trim the quotation; you pay the difference twice at the first maintenance.',
            'Specifying a C5 system but saving on the blasting work beneath it.',
            'Adding up film thicknesses on paper without measuring them per coat during execution.',
            'Skipping the topcoat "because it is indoors anyway" while condensation or chemical vapour is present.',
            'Postponing maintenance past the point where local repair is still possible.',
          ],
        },
        { type: 'h2', text: 'Frequently asked questions' },
        {
          type: 'faq',
          items: [
            {
              q: 'Which corrosivity category applies in the Port of Antwerp?',
              a: 'Count on C4 to C5: a combination of industrial atmosphere, sea air and chemical exposure. Structural parts in the tidal zone or under water fall under the Im categories or CX. A correct category assessment per project is always the first step; when in doubt, the higher category is chosen.',
            },
            {
              q: 'How long does a coating system to ISO 12944 last?',
              a: 'The standard works with durability ranges until first major maintenance: low (up to 7 years), medium (7 to 15), high (15 to 25) and very high (more than 25 years). Which range is achievable depends on the category, the chosen system, the film thickness and above all the quality of preparation and application.',
            },
            {
              q: 'When is a zinc-rich primer appropriate?',
              a: 'Zinc protects steel even when the coating is locally damaged: it sacrifices itself instead of the steel (cathodic protection). That is why many approved systems for heavy categories like C4 and C5 use a zinc-rich base, combined with epoxy intermediates and a UV-stable topcoat. It is not compulsory: the selected, tested system determines the primer.',
            },
            {
              q: 'Does ISO 12944 specify a minimum coating thickness?',
              a: 'No, not per category. There is no film thickness that automatically belongs to C3, C4 or C5. The nominal dry film thickness (NDFT) and number of coats follow from the complete, tested system and the chosen durability class, as laid down in part 5 and the manufacturer data sheet. The project specification records those values, together with the measurement and acceptance criteria.',
            },
            {
              q: 'Does ISO 12944 apply to the inside of storage tanks?',
              a: 'No. Tank interiors, pipelines and buried structures fall explicitly outside the standard. For a tank lining, the stored product, temperature, chemical resistance and manufacturer approval govern; see our separate guide on tank coating and tank lining.',
            },
            {
              q: 'What does corrosion protection cost per m²?',
              a: 'That depends on the category, the system, the film thickness, the condition of the substrate and accessibility. A C3 system in a workshop is a different calculation than a C5 system at height on a live terminal. Because every project differs, we quote based on an inspection or your specification.',
            },
            {
              q: 'What information is needed for an accurate quotation?',
              a: 'At minimum: the location and environment (or the specified category), the surface area in m², the condition of the existing coating or steel, the required durability, accessibility (height, scaffolding, live site) and the specification or system preference if available. With those elements a quotation without surprises can be drawn up; if something is missing, we plan a short inspection.',
            },
            {
              q: 'Can an existing coating system be upgraded for a more corrosive environment or longer durability?',
              a: 'Yes. After assessing the existing coating, the structure is blasted to the required cleanliness grade and a heavier system is built up, matched to the assessed exposure and the required durability. With partial degradation this can be phased, so the site stays operational.',
            },
          ],
        },
        { type: 'h2', text: 'Need help with your project?' },
        {
          type: 'cta',
          title: 'Protection matched to the environment',
          text: 'Russo NV determines the corrosivity category, advises the right system and delivers the full scope: blasting, application and inspection, performed under VCA-certified safety procedures and to ISO 12944. Request a no-obligation quote or advice.',
          buttonLabel: 'Request a quote',
          to: '/contact',
        },
      ],
    },
  },
  {
    slug: 'gianna-russo-top-100-tank-storage-influencers',
    date: '2026-08-22',
    author: 'Russo NV',
    heroImage: '/images/tank-finished.jpg',
    heroAlt: {
      NL: 'Afgewerkte opslagtank op een Belgische terminal, gecoat door Russo NV',
      EN: 'Finished storage tank at a Belgian terminal, coated by Russo NV',
    },
    keywords: {
      NL: ['Gianna Russo', 'Top 100 Tank Storage Influencers', 'Storage Terminals Magazine', 'tankopslag', 'Russo NV', 'tankterminal'],
      EN: ['Gianna Russo', 'Top 100 Tank Storage Influencers', 'Storage Terminals Magazine', 'tank storage', 'Russo NV', 'tank terminal'],
    },
    NL: {
      title: 'Gianna Russo opgenomen in de Top 100 Tank Storage Influencers 2027',
      metaTitle: 'Gianna Russo in Top 100 Tank Storage Influencers | Russo NV',
      description: 'CEO Gianna Russo is opgenomen in de Top 100 Tank Storage Influencers Guide 2027 van Storage Terminals Magazine, een internationale erkenning uit de tankopslagsector.',
      excerpt: 'Storage Terminals Magazine nam onze CEO Gianna Russo op in zijn Top 100 Tank Storage Influencers Guide 2027. Een internationale erkenning, en voor ons team een bevestiging van de koers die we samen varen.',
      category: 'Bedrijfsnieuws',
      body: [
        {
          type: 'p',
          text: 'Eind augustus kregen we nieuws binnen waar we stil van werden, en daarna vooral heel trots: onze CEO Gianna Russo is opgenomen in de Top 100 Tank Storage Influencers Guide 2027 van Storage Terminals Magazine. Daarmee staat ze op een internationale lijst van mensen die de tankopslagsector wereldwijd vormgeven.',
        },
        {
          type: 'image',
          src: '/images/gianna-russo-ceo.jpg',
          width: 940,
          height: 940,
          alt: 'Gianna Russo, CEO van Russo NV, met helm en werkkledij op de werf',
          caption: 'Gianna Russo, CEO van Russo NV.',
        },
        { type: 'h2', text: 'Wat is de Top 100 Tank Storage Influencers Guide?' },
        {
          type: 'p',
          text: 'Storage Terminals Magazine is een internationaal vakblad dat zich volledig toelegt op de tankopslagsector: terminals, operatoren, dienstverleners en de technologie daarrond. De redactie stelt de jaarlijkse Top 100 gids samen over een periode van maanden, op basis van gesprekken met operatoren, terminaleigenaars, dienstverleners en experts van over de hele wereld. De gids erkent mensen met een aantoonbare invloed op veiligheid, kennisdeling, professionalisering en de energietransitie binnen de sector, en wordt verspreid op conferenties en beurzen wereldwijd.',
        },
        {
          type: 'quote',
          text: 'De gids zet de mensen in de kijker die innovatie en excellentie in de wereldwijde tankopslag aandrijven.',
          cite: 'Storage Terminals Magazine',
        },
        { type: 'h2', text: 'Waarom deze erkenning telt' },
        {
          type: 'p',
          segments: [
            'De tankopslagsector wordt gedomineerd door grote internationale spelers. Dat een Belgisch familiebedrijf uit Antwerpen op deze lijst staat, naast CEO\'s van wereldwijde terminalgroepen en sectorfederaties, zegt iets over de weg die Russo NV de voorbije jaren heeft afgelegd. Ons team werkt dag in dag uit op opslagtanks op Belgische terminals, van ',
            { text: 'tankcoating en tank lining', to: '/services/tankcoating' },
            ' tot volledige renovaties van tankparken, zoals recent op ',
            { text: 'een terminal in de haven van Gent', to: '/projects/tankcoating-gts-gent' },
            '. Die dagelijkse aanwezigheid op de werf, gecombineerd met meer dan dertig jaar ervaring sinds 1994, is precies het soort praktijkgedreven leiderschap dat de gids wil erkennen.',
          ],
        },
        { type: 'h2', text: 'Uitreiking in Londen' },
        {
          type: 'p',
          text: 'De erkenning wordt gevierd op het Top 100 netwerkevent in Londen, dat traditioneel plaatsvindt tijdens International Energy Week begin volgend jaar. Gianna zal daar aanwezig zijn, tussen collega\'s uit de hele wereld.',
        },
        {
          type: 'p',
          text: 'Vanwege het voltallige team: proficiat, Gianna. Deze erkenning is verdiend.',
        },
        {
          type: 'cta',
          title: 'Werken met een erkend team?',
          text: 'Ontdek hoe Russo NV opslagtanks straalt, coat en renoveert op terminals in heel België.',
          buttonLabel: 'Bekijk onze projecten',
          to: '/projects',
        },
      ],
    },
    EN: {
      title: 'Gianna Russo named in the Top 100 Tank Storage Influencers 2027',
      metaTitle: 'Gianna Russo in Top 100 Tank Storage Influencers | Russo NV',
      description: 'CEO Gianna Russo has been included in the Top 100 Tank Storage Influencers Guide 2027 by Storage Terminals Magazine, an international recognition from the tank storage sector.',
      excerpt: 'Storage Terminals Magazine included our CEO Gianna Russo in its Top 100 Tank Storage Influencers Guide 2027. An international recognition, and for our team a confirmation of the course we are on together.',
      category: 'Company news',
      body: [
        {
          type: 'p',
          text: 'In late August we received news that made us pause, and then made us very proud: our CEO Gianna Russo has been included in the Top 100 Tank Storage Influencers Guide 2027 of Storage Terminals Magazine. That places her on an international list of people shaping the tank storage sector worldwide.',
        },
        {
          type: 'image',
          src: '/images/gianna-russo-ceo.jpg',
          width: 940,
          height: 940,
          alt: 'Gianna Russo, CEO of Russo NV, in helmet and workwear on site',
          caption: 'Gianna Russo, CEO of Russo NV.',
        },
        { type: 'h2', text: 'What is the Top 100 Tank Storage Influencers Guide?' },
        {
          type: 'p',
          text: 'Storage Terminals Magazine is an international trade publication dedicated entirely to the tank storage sector: terminals, operators, service providers and the technology around them. The editorial team compiles the annual Top 100 guide over a period of months, based on conversations with operators, terminal owners, service providers and experts from around the world. The guide recognizes people with a demonstrable influence on safety, knowledge sharing, professionalisation and the energy transition within the sector, and is distributed at conferences and exhibitions worldwide.',
        },
        {
          type: 'quote',
          text: 'The guide spotlights the people driving innovation and excellence in tank storage worldwide.',
          cite: 'Storage Terminals Magazine',
        },
        { type: 'h2', text: 'Why this recognition matters' },
        {
          type: 'p',
          segments: [
            'The tank storage sector is dominated by large international players. That a Belgian family company from Antwerp appears on this list, alongside CEOs of global terminal groups and sector federations, says something about the road Russo NV has travelled in recent years. Our team works on storage tanks at Belgian terminals every single day, from ',
            { text: 'tank coating and tank lining', to: '/services/tankcoating' },
            ' to full tank farm renovations, such as recently at ',
            { text: 'a terminal in the port of Ghent', to: '/projects/tankcoating-gts-gent' },
            '. That daily presence in the field, combined with more than thirty years of experience since 1994, is exactly the kind of hands-on leadership the guide sets out to recognize.',
          ],
        },
        { type: 'h2', text: 'Ceremony in London' },
        {
          type: 'p',
          text: 'The recognition is celebrated at the Top 100 networking event in London, traditionally held during International Energy Week early next year. Gianna will be there, among peers from all over the world.',
        },
        {
          type: 'p',
          text: 'From the entire team: congratulations, Gianna. This recognition is well deserved.',
        },
        {
          type: 'cta',
          title: 'Work with a recognized team?',
          text: 'Discover how Russo NV blasts, coats and renovates storage tanks on terminals across Belgium.',
          buttonLabel: 'View our projects',
          to: '/projects',
        },
      ],
    },
  },
  {
    slug: 'fireproof-coating-steel',
    date: '2026-08-20',
    author: 'Stig Vanmarsenille',
    authorRole: {
      NL: 'NACE Level 2 coating inspector',
      EN: 'NACE Level 2 coating inspector',
    },
    authorBio: {
      NL: 'Stig Vanmarsenille is NACE Level 2 coating inspector bij Russo NV. Hij keurt en begeleidt dagelijks industriële straal- en coatingwerken op de werf, van tankbekleding tot staalconstructies in de petrochemie.',
      EN: 'Stig Vanmarsenille is a NACE Level 2 coating inspector at Russo NV. He inspects and supervises industrial blasting and coating work on site every day, from tank linings to structural steel in petrochemicals.',
    },
    authorUrl: 'https://www.linkedin.com/in/stig-vanmarsenille-747176b9/',
    authorImage: '/images/author-stig.jpg',
    // TEMP hero: reuses article #1's image until Bruno supplies a real fireproofing photo.
    heroImage: '/images/article1.jpg',
    heroAlt: {
      NL: 'Industriële staalstructuur behandeld door Russo NV',
      EN: 'Industrial steel structure treated by Russo NV',
    },
    keywords: {
      NL: ['brandwerende coating', 'brandwerende verf staal', 'intumescerende coating', 'passieve brandbeveiliging', 'brandweerstand R60', 'profielfactor', 'cementgebonden spuitmortel', 'brandwerend schilderwerk'],
      EN: ['fireproof coating', 'intumescent coating', 'passive fire protection', 'fire resistance R60', 'section factor', 'cementitious fireproofing', 'structural steel fire protection'],
    },
    NL: {
      title: 'Brandwerende coating op staal: systemen, laagdiktes en brandweerstand',
      metaTitle: 'Brandwerende coating voor staal: de gids | Russo NV',
      description: 'Hoe haal je R30 tot R120 op een staalstructuur? Intumescerende en cementgebonden systemen, de profielfactor en laagdiktes, praktisch uitgelegd vanaf de werf.',
      excerpt: 'Onbeschermd staal verliest bij brand in enkele minuten zijn draagkracht. Een brandwerende coating koopt de minuten die het verschil maken. Dit is hoe intumescerende en cementgebonden systemen werken, en waar een specificatie op staat of valt.',
      category: 'Brandbeveiliging',
      body: [
        {
          type: 'p',
          text: 'Staal brandt niet, maar het bezwijkt wel. Rond 500 tot 600 °C verliest constructiestaal ongeveer de helft van zijn draagkracht, en bij een volontwikkelde brand worden die temperaturen binnen enkele minuten gehaald. Een onbeschermde ligger of kolom geeft het dan op lang voordat iedereen het gebouw uit is. Daarom eisen de voorschriften voor dragende staalstructuren een brandweerstand, uitgedrukt in minuten: R30, R60, R120.',
        },
        {
          type: 'p',
          segments: [
            'Die minuten haal je met passieve brandbeveiliging: een laag die het staal isoleert van de hitte, zonder dat er iets moet worden geactiveerd. Geen sprinklers of detectie, maar bescherming die er gewoon staat, dag en nacht. In dit artikel leggen we uit hoe de twee belangrijkste coatingfamilies werken, hoe je een specificatie leest en waar het in de praktijk misloopt. ',
            { text: 'Brandwerende systemen zijn een vast onderdeel van ons werkpakket', to: '/services#fireproofingThermal' },
            '.',
          ],
        },
        { type: 'h2', text: 'Waarom minuten tellen: de logica achter R-waarden' },
        {
          type: 'p',
          text: 'De R-waarde uit EN 13501-2 zegt hoeveel minuten een dragend element zijn functie behoudt onder de standaard brandkromme. R60 betekent dus niet dat het gebouw na een uur verloren is, maar dat de constructie minstens 60 minuten gegarandeerd blijft dragen: tijd voor evacuatie en voor de brandweer om binnen te gaan. Welke R-waarde vereist is, volgt uit de Belgische basisnormen voor brandpreventie en het advies van de brandweer of het studiebureau, op basis van het gebouwtype, de hoogte en het gebruik.',
        },
        {
          type: 'p',
          text: 'In de petrochemie ligt de lat anders: daar rekent men vaak met een koolwaterstofbrandkromme, die veel sneller en veel heter stijgt dan een gewone gebouwbrand. Systemen voor die omgevingen zijn daarop getest en gedimensioneerd; een product voor kantoorgebouwen kun je daar niet zomaar inzetten.',
        },
        { type: 'h2', text: 'De families van passieve brandbeveiliging' },
        {
          type: 'table',
          caption: 'De drie meest gebruikte beschermingsvormen voor staal, naast elkaar',
          headers: ['', 'Intumescerende coating', 'Cementgebonden spuitmortel', 'Plaatbekleding'],
          rows: [
            ['Dikte', 'Honderden µm tot enkele mm', 'Centimeters', 'Centimeters'],
            ['Gewicht', 'Verwaarloosbaar', 'Aanzienlijk', 'Beperkt'],
            ['Uitzicht', 'Als geschilderd staal, profiel blijft zichtbaar', 'Ruw, industrieel', 'Kokervormig, profiel verdwijnt'],
            ['Typische toepassing', 'Zichtstaal, gebouwen, retrofit', 'Petrochemie, hoge R-waarden, koolwaterstofbrand', 'Utiliteitsbouw, verborgen staal'],
          ],
        },
        {
          type: 'p',
          text: 'Russo NV past zowel intumescerende als cementgebonden systemen toe. De keuze volgt uit de vereiste brandweerstand, het brandscenario, het gewenste uitzicht en het budget: voor zichtbaar staal in een gebouw is intumescerend meestal de logische keuze, voor een pijpenbrug op een raffinaderij vaak spuitmortel.',
        },
        { type: 'h2', text: 'Hoe een intumescerende coating werkt' },
        {
          type: 'p',
          text: 'Bij kamertemperatuur is een intumescerende coating gewoon een dunne, strakke verflaag. Wordt het oppervlak echter 200 tot 300 °C warm, dan start een chemische reactie: de laag schuimt op tot tientallen keren haar oorspronkelijke dikte en vormt een isolerende koollaag, de char. Die schuimlaag vertraagt de opwarming van het staal en houdt het onder de kritieke temperatuur, minutenlang.',
        },
        {
          type: 'ul',
          items: [
            'Het systeem bestaat altijd uit drie geteste onderdelen: een compatibele primer, de reactieve laag en meestal een afwerklaag die de reactieve laag beschermt tegen vocht.',
            'De reactieve laag is het brandwerende hart; de laagdikte ervan bepaalt de gehaalde R-waarde.',
            'Binnen volstaat soms een systeem zonder afwerklaag; buiten of in vochtige ruimtes is een sealer of topcoat verplicht, anders degradeert de reactieve laag voor de brand er ooit is.',
          ],
        },
        { type: 'h2', text: 'De profielfactor: waarom het ene profiel meer coating vraagt' },
        {
          type: 'p',
          text: 'Twee kolommen met dezelfde R-eis kunnen een totaal verschillende laagdikte nodig hebben. De sleutel is de profielfactor: de verhouding tussen de verhitte omtrek van het profiel en zijn staaldoorsnede. Een zwaar, gedrongen profiel warmt traag op en heeft een lage profielfactor; een slank, dunwandig profiel warmt snel op en heeft een hoge. Hoe hoger de profielfactor, hoe dikker de brandwerende laag moet zijn voor dezelfde R-waarde.',
        },
        {
          type: 'p',
          text: 'Elke fabrikant publiceert daarvoor beladingstabellen: per profielfactor en per R-waarde de vereiste droge laagdikte. Die tabellen zijn het resultaat van de brandproeven waarmee het systeem is beoordeeld, en ze zijn bindend. Een offerte of specificatie die één laagdikte over de hele structuur legt, zonder naar de profielen te kijken, is een rode vlag: op de slanke profielen is dat te weinig, op de zware betaal je te veel.',
        },
        { type: 'h2', text: 'Applicatie: waar het in de praktijk op aankomt' },
        {
          type: 'p',
          segments: [
            'Net als bij elk coatingsysteem begint het bij de ondergrond: ',
            { text: 'gestraald of anderszins correct voorbereid staal', to: '/insights/steel-surface-preparation' },
            ' en een primer die door de fabrikant met de reactieve laag is getest. Daarna is het een kwestie van discipline:',
          ],
        },
        {
          type: 'ul',
          items: [
            'Laagdikte opbouwen in meerdere gangen: intumescerende producten hebben een maximale natte laagdikte per gang, en te dik in één keer aanbrengen geeft zakkers en een laag die niet doordroogt.',
            'Droogtijden tussen de gangen respecteren, zeker bij lage temperaturen en hoge luchtvochtigheid.',
            'Klimaatgrenzen bewaken zoals bij elk verfsysteem: staaltemperatuur boven het dauwpunt, relatieve vochtigheid binnen de grenzen van het datablad.',
            'Aansluitingen, boutverbindingen en randen verdienen extra aandacht: precies daar wordt een laag gauw te dun.',
            'De afwerklaag pas aanbrengen als de reactieve laag zijn dikte en droging heeft; hij beschermt het systeem decennialang tegen vocht en UV.',
          ],
        },
        { type: 'h2', text: 'Kwaliteitscontrole: meten, per profiel, met registratie' },
        {
          type: 'p',
          text: 'Omdat de laagdikte rechtstreeks de brandweerstand bepaalt, is de controle strenger dan bij een gewone verflaag. Per element wordt de droge laagdikte gemeten en vergeleken met de waarde uit de beladingstabel voor dát profiel. De metingen worden geregistreerd per profieltype en locatie, zodat het opleverdossier aantoont dat elke ligger en kolom zijn vereiste dikte heeft. Beschadigingen die tijdens de bouw ontstaan, worden hersteld tot de volledige systeemopbouw, niet gewoon bijgetipt.',
        },
        { type: 'h2', text: 'Brandwerend én corrosiebestendig tegelijk' },
        {
          type: 'p',
          segments: [
            'Een brandwerend systeem is tegelijk een verfsysteem dat jarenlang tegen zijn omgeving moet kunnen. In een droge kantooromgeving is dat eenvoudig; op een buitenstructuur of in de industrie moet de opbouw ook de ',
            { text: 'corrosiviteitsklasse van de omgeving', to: '/insights/corrosion-protection-iso-12944' },
            ' aankunnen. Fabrikanten geven daarvoor per systeem aan tot welke omgevingsklasse het is beoordeeld en welke primer en topcoat daarbij horen. De twee functies vechten om dezelfde vierkante meter: wie ze los van elkaar specificeert, komt op de werf in de problemen.',
          ],
        },
        { type: 'h2', text: 'Zo controleer je een brandwerende specificatie' },
        {
          type: 'callout',
          title: 'Checklist: staat dit in de specificatie?',
          items: [
            'De vereiste R-waarde per element, met de bron van die eis (basisnormen, brandweeradvies, studiebureau).',
            'Het brandscenario: standaard gebouwbrand of koolwaterstofbrand.',
            'Het volledige, geteste systeem: primer, reactieve laag of mortel, afwerklaag, van één fabrikant.',
            'Laagdiktes per profielfactor volgens de beladingstabel, niet één dikte voor alles.',
            'De omgevingsklasse waarin het systeem moet overleven, met bijhorende afwerking.',
            'Meet- en registratie-eisen voor de oplevering, per element.',
            'De herstelmethode voor beschadigingen tijdens en na de bouw.',
          ],
        },
        { type: 'h2', text: 'Veelgestelde vragen' },
        {
          type: 'faq',
          items: [
            {
              q: 'Wat is het verschil tussen brandwerende verf en gewone verf?',
              a: 'Gewone verf beschermt tegen corrosie en geeft kleur; ze doet niets bij brand. Een intumescerende (brandwerende) coating bevat componenten die bij 200 tot 300 °C opschuimen tot een dikke, isolerende koollaag die het staal minutenlang onder zijn kritieke temperatuur houdt. Het is constructieve bescherming die toevallig op verf lijkt, met bijbehorende proeven, beladingstabellen en controle-eisen.',
            },
            {
              q: 'Welke brandweerstand heeft mijn gebouw nodig?',
              a: 'Dat bepaalt niet de schilder maar de regelgeving: de Belgische basisnormen voor brandpreventie leggen per gebouwtype en hoogte vast welke R-waarde de structuur moet halen, en de brandweer of het studiebureau vertaalt dat naar de elementen. Onze rol begint daarna: het systeem en de laagdiktes selecteren die die eis aantoonbaar halen.',
            },
            {
              q: 'Kan een brandwerende coating over bestaande verf worden aangebracht?',
              a: 'Alleen als de bestaande laag compatibel, draagkrachtig en door de fabrikant aanvaard is, en dat is eerder uitzondering dan regel. Meestal wordt de oude verf verwijderd of grondig behandeld tot een ondergrond waarop het geteste systeem mag staan. Een brandwerende laag op een loszittende oude verflaag is bij brand waardeloos: de schuimlaag valt er gewoon af.',
            },
            {
              q: 'Werkt een intumescerende coating ook buiten?',
              a: 'Ja, mits het systeem daarvoor beoordeeld is en de voorgeschreven afwerklaag wordt aangebracht. Vocht is de vijand: een onbeschermde reactieve laag neemt water op en verliest na verloop van tijd zijn werking. Voor buitentoepassingen en industriële omgevingen bestaan systemen met bijpassende topcoats die tegelijk de corrosiebescherming leveren.',
            },
            {
              q: 'Hoe lang gaat een brandwerend systeem mee en welk onderhoud vraagt het?',
              a: 'Correct aangebracht en afgewerkt gaat een systeem decennia mee. Het onderhoud is vooral visueel: periodiek controleren op mechanische beschadiging, vochtschade en aantasting van de afwerklaag, en herstellingen uitvoeren volgens de systeemopbouw. Elke beschadiging is een gat in de brandweerstand, dus herstel hoort bij het beheer van het gebouw.',
            },
            {
              q: 'Wat kost brandwerend schilderwerk per m²?',
              a: 'De prijs wordt gedreven door de vereiste R-waarde, de profielfactoren van de structuur (die de laagdiktes bepalen), het brandscenario, de bereikbaarheid en de staat van de ondergrond. R30 op zware profielen in een loods is een andere som dan R120 op slank zichtstaal. Wij rekenen op basis van de beladingstabellen en een opname of de specificatie, zodat de offerte klopt met wat er werkelijk moet hangen.',
            },
            {
              q: 'Kan brandbeveiliging achteraf op een bestaand gebouw worden aangebracht?',
              a: 'Ja, dat gebeurt vaak: bij herbestemming, na een strengere brandweereis of bij een verkoop. Intumescerende coatings zijn daarvoor de meest gebruikte oplossing omdat ze dun zijn, het uitzicht behouden en zonder zware ingrepen op bestaande profielen kunnen. De ondergrond bepaalt het werk: bestaande verflagen moeten beoordeeld en meestal verwijderd worden.',
            },
          ],
        },
        { type: 'h2', text: 'Hulp nodig bij uw project?' },
        {
          type: 'cta',
          title: 'Brandweerstand die aantoonbaar klopt',
          text: 'Russo NV brengt intumescerende en cementgebonden systemen aan volgens de beladingstabellen van de fabrikant, met laagdiktemetingen en registratie per element. Vraag vrijblijvend een offerte of advies aan.',
          buttonLabel: 'Vraag een offerte aan',
          to: '/contact',
        },
      ],
    },
    EN: {
      title: 'Fireproof coatings for steel: systems, thicknesses and fire ratings',
      metaTitle: 'Fireproof & Intumescent Coatings for Steel | Russo NV',
      description: 'How do you achieve R30 to R120 on a steel structure? Intumescent and cementitious systems, the section factor and film thicknesses, explained from the field.',
      excerpt: 'Unprotected steel loses its load-bearing capacity within minutes in a fire. A fireproof coating buys the minutes that matter. This is how intumescent and cementitious systems work, and where a specification stands or falls.',
      category: 'Fire protection',
      body: [
        {
          type: 'p',
          text: 'Steel does not burn, but it does fail. Around 500 to 600 °C structural steel loses roughly half its load-bearing capacity, and a fully developed fire reaches those temperatures within minutes. An unprotected beam or column then gives up long before everyone is out of the building. That is why regulations demand a fire resistance for load-bearing steel structures, expressed in minutes: R30, R60, R120.',
        },
        {
          type: 'p',
          segments: [
            'Those minutes are bought with passive fire protection: a layer that insulates the steel from the heat without anything needing to be activated. No sprinklers or detection, but protection that is simply there, day and night. In this article we explain how the two main coating families work, how to read a specification and where things go wrong in practice. ',
            { text: 'Fireproofing systems are a core part of our scope', to: '/services#fireproofingThermal' },
            '.',
          ],
        },
        { type: 'h2', text: 'Why minutes count: the logic behind R ratings' },
        {
          type: 'p',
          text: 'The R rating from EN 13501-2 states how many minutes a load-bearing element keeps its function under the standard fire curve. R60 does not mean the building is lost after an hour; it means the structure is guaranteed to keep carrying for at least 60 minutes: time to evacuate and for the fire brigade to go in. Which R rating is required follows from the Belgian basic fire prevention standards and the advice of the fire brigade or the engineering office, based on building type, height and use.',
        },
        {
          type: 'p',
          text: 'In petrochemicals the bar sits elsewhere: there, design is often based on a hydrocarbon fire curve, which rises far faster and hotter than an ordinary building fire. Systems for those environments are tested and dimensioned accordingly; a product intended for office buildings cannot simply be used there.',
        },
        { type: 'h2', text: 'The families of passive fire protection' },
        {
          type: 'table',
          caption: 'The three most common protection forms for steel, side by side',
          headers: ['', 'Intumescent coating', 'Cementitious spray', 'Board cladding'],
          rows: [
            ['Thickness', 'Hundreds of µm to a few mm', 'Centimetres', 'Centimetres'],
            ['Weight', 'Negligible', 'Considerable', 'Limited'],
            ['Appearance', 'Like painted steel, profile stays visible', 'Rough, industrial', 'Boxed in, profile disappears'],
            ['Typical use', 'Visible steel, buildings, retrofit', 'Petrochemicals, high R ratings, hydrocarbon fire', 'Non-residential construction, hidden steel'],
          ],
        },
        {
          type: 'p',
          text: 'Russo NV applies both intumescent and cementitious systems. The choice follows from the required fire resistance, the fire scenario, the desired appearance and the budget: for visible steel in a building, intumescent is usually the logical choice; for a pipe rack on a refinery, often spray-applied mortar.',
        },
        { type: 'h2', text: 'How an intumescent coating works' },
        {
          type: 'p',
          text: 'At room temperature an intumescent coating is simply a thin, neat paint film. But when the surface reaches 200 to 300 °C, a chemical reaction starts: the film foams up to tens of times its original thickness and forms an insulating carbon layer, the char. That foam layer slows the heating of the steel and keeps it below its critical temperature, for minutes on end.',
        },
        {
          type: 'ul',
          items: [
            'The system always consists of three tested parts: a compatible primer, the reactive layer and usually a finish coat that protects the reactive layer from moisture.',
            'The reactive layer is the fireproofing heart; its film thickness determines the achieved R rating.',
            'Indoors a system without a finish coat is sometimes acceptable; outdoors or in humid spaces a sealer or topcoat is mandatory, otherwise the reactive layer degrades long before any fire.',
          ],
        },
        { type: 'h2', text: 'The section factor: why one profile needs more coating than another' },
        {
          type: 'p',
          text: 'Two columns with the same R requirement can need completely different film thicknesses. The key is the section factor: the ratio between the heated perimeter of the profile and its steel cross-section. A heavy, stocky profile heats up slowly and has a low section factor; a slender, thin-walled profile heats up fast and has a high one. The higher the section factor, the thicker the fireproofing layer must be for the same R rating.',
        },
        {
          type: 'p',
          text: 'Every manufacturer publishes loading tables for this: per section factor and per R rating, the required dry film thickness. Those tables are the result of the fire tests the system was assessed with, and they are binding. A quotation or specification that puts one film thickness across the whole structure, without looking at the profiles, is a red flag: too little on the slender profiles, and you overpay on the heavy ones.',
        },
        { type: 'h2', text: 'Application: what it comes down to in practice' },
        {
          type: 'p',
          segments: [
            'As with any coating system it starts with the substrate: ',
            { text: 'blasted or otherwise correctly prepared steel', to: '/insights/steel-surface-preparation' },
            ' and a primer tested by the manufacturer with the reactive layer. After that it is a matter of discipline:',
          ],
        },
        {
          type: 'ul',
          items: [
            'Build the film in multiple passes: intumescent products have a maximum wet film thickness per pass, and applying too thick in one go causes sags and a film that never dries through.',
            'Respect drying times between passes, especially at low temperatures and high humidity.',
            'Guard the climate limits as with any paint system: steel temperature above the dew point, relative humidity within the data sheet limits.',
            'Connections, bolted joints and edges deserve extra attention: exactly there a film easily runs thin.',
            'Apply the finish coat only once the reactive layer has its thickness and drying; it protects the system against moisture and UV for decades.',
          ],
        },
        { type: 'h2', text: 'Quality control: measured, per profile, with records' },
        {
          type: 'p',
          text: 'Because the film thickness directly determines the fire resistance, the control is stricter than for an ordinary paint layer. Per element the dry film thickness is measured and compared with the value from the loading table for that specific profile. The measurements are recorded per profile type and location, so the handover dossier proves that every beam and column carries its required thickness. Damage that occurs during construction is repaired to the full system build-up, not just touched in.',
        },
        { type: 'h2', text: 'Fireproof and corrosion-resistant at the same time' },
        {
          type: 'p',
          segments: [
            'A fireproofing system is at the same time a paint system that must survive its environment for years. In a dry office environment that is simple; on an outdoor structure or in industry the build-up must also handle the ',
            { text: 'corrosivity category of the environment', to: '/insights/corrosion-protection-iso-12944' },
            '. Manufacturers state per system up to which environmental category it has been assessed and which primer and topcoat belong with it. The two functions fight over the same square metre: specify them separately and you will pay for it on site.',
          ],
        },
        { type: 'h2', text: 'How to check a fireproofing specification' },
        {
          type: 'callout',
          title: 'Checklist: is this in the specification?',
          items: [
            'The required R rating per element, with the source of that requirement (basic standards, fire brigade advice, engineering office).',
            'The fire scenario: standard building fire or hydrocarbon fire.',
            'The complete, tested system: primer, reactive layer or mortar, finish coat, from one manufacturer.',
            'Film thicknesses per section factor according to the loading table, not one thickness for everything.',
            'The environmental category the system must survive in, with matching finish.',
            'Measurement and recording requirements for handover, per element.',
            'The repair method for damage during and after construction.',
          ],
        },
        { type: 'h2', text: 'Frequently asked questions' },
        {
          type: 'faq',
          items: [
            {
              q: 'What is the difference between fireproof paint and ordinary paint?',
              a: 'Ordinary paint protects against corrosion and provides colour; it does nothing in a fire. An intumescent (fireproof) coating contains components that foam up at 200 to 300 °C into a thick, insulating char layer that keeps the steel below its critical temperature for minutes on end. It is structural protection that happens to look like paint, with matching tests, loading tables and control requirements.',
            },
            {
              q: 'Which fire resistance does my building need?',
              a: 'That is decided not by the painter but by regulation: the Belgian basic fire prevention standards lay down per building type and height which R rating the structure must achieve, and the fire brigade or engineering office translates that to the elements. Our role starts after that: selecting the system and film thicknesses that demonstrably meet the requirement.',
            },
            {
              q: 'Can a fireproof coating be applied over existing paint?',
              a: 'Only if the existing layer is compatible, sound and accepted by the manufacturer, and that is the exception rather than the rule. Usually the old paint is removed or thoroughly treated down to a substrate the tested system is allowed to sit on. A fireproofing layer on top of a loose old paint film is worthless in a fire: the char simply falls off.',
            },
            {
              q: 'Does an intumescent coating also work outdoors?',
              a: 'Yes, provided the system has been assessed for it and the prescribed finish coat is applied. Moisture is the enemy: an unprotected reactive layer absorbs water and loses its function over time. For outdoor and industrial environments there are systems with matching topcoats that deliver the corrosion protection at the same time.',
            },
            {
              q: 'How long does a fireproofing system last and what maintenance does it need?',
              a: 'Correctly applied and finished, a system lasts for decades. Maintenance is mainly visual: periodically check for mechanical damage, moisture damage and degradation of the finish coat, and carry out repairs to the full system build-up. Every damage is a hole in the fire resistance, so repair belongs to the management of the building.',
            },
            {
              q: 'What does fireproof painting cost per m²?',
              a: 'The price is driven by the required R rating, the section factors of the structure (which set the film thicknesses), the fire scenario, accessibility and the condition of the substrate. R30 on heavy profiles in a warehouse is a different calculation than R120 on slender visible steel. We quote from the loading tables and a survey or your specification, so the price matches what actually has to go on.',
            },
            {
              q: 'Can fire protection be added to an existing building?',
              a: 'Yes, that happens often: at a change of use, after a stricter fire brigade requirement or at a sale. Intumescent coatings are the most used solution for this because they are thin, preserve the appearance and can go onto existing profiles without heavy interventions. The substrate determines the work: existing paint layers must be assessed and usually removed.',
            },
          ],
        },
        { type: 'h2', text: 'Need help with your project?' },
        {
          type: 'cta',
          title: 'Fire resistance that demonstrably adds up',
          text: 'Russo NV applies intumescent and cementitious systems according to the manufacturer loading tables, with film thickness measurements and records per element. Request a no-obligation quote or advice.',
          buttonLabel: 'Request a quote',
          to: '/contact',
        },
      ],
    },
  },
  {
    slug: 'chemische-bestendigheid-coatings',
    date: '2026-11-06',
    author: 'Stig Vanmarsenille',
    authorRole: {
      NL: 'NACE Level 2 coating inspector',
      EN: 'NACE Level 2 coating inspector',
    },
    authorBio: {
      NL: 'Stig Vanmarsenille is NACE Level 2 coating inspector bij Russo NV. Hij keurt en begeleidt dagelijks industriële straal- en coatingwerken op de werf, van tankbekleding tot staalconstructies in de petrochemie.',
      EN: 'Stig Vanmarsenille is a NACE Level 2 coating inspector at Russo NV. He inspects and supervises industrial blasting and coating work on site every day, from tank linings to structural steel in petrochemicals.',
    },
    authorUrl: 'https://www.linkedin.com/in/stig-vanmarsenille-747176b9/',
    authorImage: '/images/author-stig.jpg',
    heroImage: '/images/tank-lining-interior.jpg',
    heroAlt: {
      NL: 'Binnenzijde van een opslagtank met een chemisch bestendige tank lining op wand en verwarmingsspiralen',
      EN: 'Inside of a storage tank with a chemically resistant tank lining on the wall and heating coils',
    },
    keywords: {
      NL: ['chemische bestendigheid coatings', 'chemisch bestendige coating', 'zuurbestendige coating', 'epoxy novolac', 'epoxy fenolisch', 'vinylester coating', 'resistentielijst coating', 'ISO 2812'],
      EN: ['chemical resistance coatings', 'chemical resistant coating', 'acid resistant coating', 'epoxy novolac', 'phenolic epoxy', 'vinyl ester coating', 'coating resistance list', 'ISO 2812'],
    },
    NL: {
      title: 'Chemische bestendigheid van coatings: zo kies je het juiste systeem',
      metaTitle: 'Chemische bestendigheid coatings: praktische gids | Russo NV',
      description: 'Welke coating houdt stand tegen zuren, logen en solventen? Epoxy, novolac, fenolisch en vinylester vergeleken, met de testnormen en de fouten uit de praktijk.',
      excerpt: 'Een coating is nooit zomaar chemisch bestendig. Het hangt af van het product, de concentratie, de temperatuur en de contacttijd. Dit is hoe je de juiste familie kiest, een resistentielijst leest en een specificatie opstelt die op de werf overeind blijft.',
      category: 'Tankbescherming',
      body: [
        {
          type: 'p',
          segments: [
            'De vraag "is deze coating chemisch bestendig?" heeft geen antwoord zolang vier dingen ontbreken: welk product, in welke concentratie, bij welke temperatuur en hoe lang. Een epoxy die jaren goed blijft onder diesel, kan in warm geconcentreerd zuur al na korte tijd zacht worden. Daarom begint elke keuze bij het product en niet bij de coating. Bij ',
            { text: 'industriële schilderwerken', to: '/' },
            ' aan tanks, opvangbakken en procesinstallaties is dat het verschil tussen een lining die decennia meegaat en een lining die bij de eerste inspectie wordt afgekeurd.',
          ],
        },
        { type: 'h2', text: 'Wat betekent chemische bestendigheid precies?' },
        {
          type: 'p',
          text: 'Chemische bestendigheid is het vermogen van een coatingfilm om contact met een stof te doorstaan zonder dat hij zacht wordt, blaasjes vormt, loslaat, verkleurt of de stof doorlaat naar het staal. De belasting is daarbij minstens zo belangrijk als de stof zelf. We onderscheiden in de praktijk drie situaties:',
        },
        {
          type: 'ul',
          items: [
            'Immersie: de coating staat permanent ondergedompeld, zoals bij de binnenzijde van een opslagtank. Dit is de zwaarste belasting.',
            'Spatten en morsen: kortstondig contact dat daarna wordt opgeruimd, zoals in een laad- en losplaats of een opvangbak.',
            'Dampfase: de coating ziet alleen dampen, zoals in het dakgedeelte van een tank. Die zone wordt vaak onderschat, omdat condensaat er sterk geconcentreerd kan zijn.',
          ],
        },
        {
          type: 'p',
          text: 'Een product dat "bestand tegen spatten" scoort, is daarmee dus niet geschikt voor immersie. Die twee kolommen in een resistentielijst worden in de praktijk geregeld door elkaar gehaald.',
        },
        { type: 'h2', text: 'De factoren die de keuze bepalen' },
        {
          type: 'ol',
          items: [
            'Product en concentratie. Verdund zuur en geconcentreerd zuur zijn voor een coating twee verschillende producten, en dat werkt niet altijd in dezelfde richting.',
            'Temperatuur. Als vuistregel uit de chemie verdubbelt de reactiesnelheid grofweg per 10 °C. Rond verwarmingsspiralen ligt de wandtemperatuur bovendien hoger dan de producttemperatuur.',
            'Contacttijd en cyclus. Permanent gevuld, wisselend gevuld of af en toe schoongespoeld: elke cyclus belast de film anders.',
            'Productvolgorde. Sommige coatings nemen een product op en moeten eerst uitdampen voordat het volgende product erin mag. Bij wisselende ladingen hoort die volgorde in de specificatie.',
            'Uitharding en laagdikte. Een te koud of te kort uitgeharde film haalt zijn resistentie uit de lijst niet, hoe goed het product op papier ook is.',
          ],
        },
        { type: 'h2', text: 'De coatingfamilies naast elkaar' },
        {
          type: 'table',
          caption: 'Indicatief overzicht. De resistentielijst van de coatingfabrikant is altijd bindend.',
          headers: ['Familie', 'Sterk tegen', 'Let op', 'Typische toepassing'],
          rows: [
            ['Epoxy (amine-uitgehard)', 'Water, zout water, diesel, veel oliën, logen', 'Sterke zuren en agressieve solventen; verkrijt buiten onder UV', 'Watertanks, brandstoftanks, opvangbakken'],
            ['Epoxy fenolisch', 'Brandstoffen, ruwe olie, veel solventen, hogere temperaturen', 'Vraagt strikte controle op laagdikte en uitharding', 'Opslagtanks voor petroleumproducten'],
            ['Epoxy novolac', 'Veel zuren en solventen, hogere temperaturen', 'Harder en brosser, dus gevoeliger voor scheuren bij bewegende delen', 'Chemietanks, opvangbakken, tanks met wisselende lading'],
            ['Vinylester', 'Sterke zuren en oxiderende media', 'Korte verwerkingstijd, vraagt ervaren applicatie', 'Zuurtanks, rookgasreiniging'],
            ['Zinksilicaat (anorganisch)', 'Veel solventen en neutrale brandstoffen', 'Niet geschikt voor zuren en logen', 'Tanks voor solventen en vliegtuigbrandstof'],
            ['Polyurethaan', 'Weer, UV, morsen van minerale olie', 'Niet bedoeld voor immersie', 'Afwerklaag buitenzijde tanks en leidingen'],
          ],
        },
        {
          type: 'p',
          segments: [
            'Welke familie past bij welk opgeslagen product, leggen we uitgebreider uit in onze ',
            { text: 'gids over tankcoating en tank lining', to: '/insights/tank-coating-lining' },
            '. Voor de zwaarste media bestaan nog gespecialiseerde oplossingen zoals rubberbekleding of thermoplastische linings. Die vallen buiten de meeste verfsystemen en worden vaak al in de ontwerpfase gekozen.',
          ],
        },
        { type: 'h2', text: 'Hoe lees je een resistentielijst?' },
        {
          type: 'p',
          text: 'Elke grote coatingfabrikant publiceert per product een resistentielijst. Zo haal je er het juiste uit:',
        },
        {
          type: 'ol',
          items: [
            'Zoek de exacte stof op, met concentratie. Vind je alleen een verwante stof, vraag dan de fabrikant om een schriftelijk advies.',
            'Controleer of de beoordeling geldt voor immersie, of alleen voor spatten en morsen.',
            'Kijk bij welke temperatuur de beoordeling hoort, en houd rekening met verwarmingsspiralen en warme vullingen.',
            'Let op voorwaarden: de vereiste uitharding, eventuele nabehandeling met warmte en beperkingen bij wisselende producten.',
            'Bewaar het advies in het projectdossier. Bij een latere productwissel is dat het eerste document dat je nodig hebt.',
          ],
        },
        {
          type: 'callout',
          title: 'Wisselt het product in de tank?',
          items: [
            'Een lijst die bij de bouw klopte, zegt niets over het nieuwe product.',
            'Vraag vóór de productwissel een nieuw advies aan de coatingfabrikant, met de oude en de nieuwe stof.',
            'Laat de bestaande lining eerst inspecteren. Lokale schade wordt bij een agressiever product snel een lek.',
          ],
        },
        { type: 'h2', text: 'Welke normen en tests gelden?' },
        {
          type: 'table',
          caption: 'De normen die je in een specificatie het vaakst tegenkomt',
          headers: ['Norm', 'Waarvoor', 'Wanneer'],
          rows: [
            ['ISO 2812', 'Bepaling van de bestendigheid tegen vloeistoffen', 'Laboratoriumtest bij de productkeuze'],
            ['EN 14879', 'Organische coatings en bekledingen voor industriële installaties tegen agressieve media', 'Ontwerp en uitvoering'],
            ['ISO 8501-1', 'Reinheidsgraad na stralen, bijvoorbeeld Sa 2½', 'Voor het coaten'],
            ['ISO 8502-6 en -9', 'Meting van oplosbare zouten met de Bresle-methode', 'Voor het coaten'],
            ['ISO 19840', 'Droge laagdikte op ruwe ondergrond', 'Na het coaten'],
            ['ISO 29601', 'Porositeit van de film met een holiday-test', 'Eindcontrole van de lining'],
            ['ISO 4624', 'Hechtproef met pull-off', 'Waar de specificatie het vraagt'],
          ],
        },
        {
          type: 'p',
          segments: [
            'Let op: ',
            { text: 'ISO 12944', to: '/insights/corrosion-protection-iso-12944' },
            ' gaat over corrosiebescherming in atmosferische omgevingen en onderdompeling in water of grond. Een ISO 12944-classificatie is dus geen bewijs dat een systeem tegen een bepaalde chemische stof bestand is.',
          ],
        },
        { type: 'h2', text: 'De ondergrond bepaalt of de resistentie ook echt gehaald wordt' },
        {
          type: 'p',
          segments: [
            'De resistentie uit de lijst geldt voor een correct aangebrachte film op een correct voorbereide ondergrond. Bij immersie is dat in de meeste specificaties gestraald staal tot minstens Sa 2½, met een ruwheidsprofiel volgens het datablad en oplosbare zouten onder de opgegeven limiet. Op onze tankprojecten is 50 mg/m² een gangbare grens, maar het datablad en het inspectieplan van het project zijn bepalend. Blijven er zouten onder de film achter, dan trekken die vocht aan en ontstaan er osmotische blaasjes. Meer daarover lees je in ons artikel over ',
            { text: 'oppervlaktevoorbereiding van staal', to: '/insights/steel-surface-preparation' },
            '.',
          ],
        },
        {
          type: 'image',
          src: '/images/tank-salt-test.jpg',
          alt: 'Meting van oplosbare zouten op gestraald staal in een opslagtank',
          caption: 'Zoutmeting op gestraald staal, vóór de eerste laag. Blijven zouten achter onder de film, dan is de hoogste chemische resistentie niets waard.',
        },
        { type: 'h2', text: 'Waar het in de praktijk misloopt' },
        {
          type: 'ul',
          items: [
            'De keuze is gemaakt op de productnaam, zonder concentratie en temperatuur.',
            'De kolom voor spatten is gelezen als geschikt voor immersie.',
            'De tank is te vroeg gevuld, voordat de film volledig was uitgehard. Bij lage staaltemperatuur duurt dat fors langer dan het datablad bij 20 °C aangeeft.',
            'Lasnaden en randen hebben geen stripe coat gekregen, waardoor de film daar te dun is. Daar komen de eerste gaatjes en de eerste roest.',
            'Een reparatie is met een ander product uitgevoerd, zonder advies over de overlap en de hechting op de bestaande laag.',
          ],
        },
        { type: 'h2', text: 'Wat zet je in een specificatie?' },
        {
          type: 'callout',
          title: 'Deze gegevens maken een offerte of systeemadvies meteen vergelijkbaar',
          items: [
            'Alle producten die in contact komen met de coating, met concentratie.',
            'Bedrijfstemperatuur, piektemperatuur en eventuele verwarmingsspiralen.',
            'Belasting: immersie, spatten, morsen of dampfase, en de reinigingsmethode.',
            'Te coaten zones met oppervlakte: bodem, wand, dak, inwendige onderdelen.',
            'Staat van de ondergrond: nieuwbouw, of de bestaande coating met het vorige product.',
            'Vereiste inspecties en documenten: inspectieplan, klimaatregistratie, laagdiktes, holiday-test.',
          ],
        },
        { type: 'h2', text: 'Veelgestelde vragen' },
        {
          type: 'faq',
          items: [
            {
              q: 'Is epoxy zuurbestendig?',
              a: 'Dat hangt af van het type epoxy en het zuur. Standaard epoxy verdraagt zuren beperkt. Epoxy novolac en vinylester zijn beter geschikt voor zuren, maar ook daar bepalen de concentratie en de temperatuur of het product in de resistentielijst staat.',
            },
            {
              q: 'Wat is het verschil tussen chemisch bestendig en corrosiebestendig?',
              a: 'Corrosiebestendig zegt dat een systeem het staal beschermt tegen roest, meestal onder weer en vocht. Chemisch bestendig zegt dat de film zelf een bepaalde stof doorstaat. Een systeem kan het eerste uitstekend doen en toch door een solvent worden aangetast.',
            },
            {
              q: 'Hoe lang moet een lining uitharden voordat de tank gevuld mag worden?',
              a: 'Dat staat in het datablad, afhankelijk van het product en de staaltemperatuur, en loopt van enkele dagen tot langer bij lage temperatuur. Sommige systemen vragen een nabehandeling met warmte. Vul nooit op gevoel: de volledige chemische resistentie is pas bereikt na de opgegeven uitharding.',
            },
            {
              q: 'Mag ik een ander product in een tank met een bestaande lining opslaan?',
              a: 'Alleen na controle. Vraag de coatingfabrikant om advies met de oude en de nieuwe stof, en laat de lining inspecteren op schade. Een lining die goed was voor het vorige product, is niet vanzelf geschikt voor het volgende.',
            },
            {
              q: 'Kan een beschadigde lining plaatselijk hersteld worden?',
              a: 'Vaak wel, met een lokale behandeling zoals vacuümstralen, gevolgd door hetzelfde systeem of een door de fabrikant goedgekeurd reparatieproduct, met een overlap op de bestaande laag. Na herstel controleert een holiday-test of de film weer dicht is.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Twijfel over het juiste systeem?',
          text: 'Bezorg ons het product, de concentratie, de temperatuur en de tankgegevens. Wij bekijken samen met de coatingfabrikant welk systeem past en hoe het op de werf wordt uitgevoerd.',
          buttonLabel: 'Vraag een offerte aan',
          to: '/contact',
        },
      ],
    },
    EN: {
      title: 'Chemical resistance of coatings: how to choose the right system',
      metaTitle: 'Chemical resistance of coatings: practical guide | Russo NV',
      description: 'Which coating withstands acids, alkalis and solvents? Epoxy, novolac, phenolic and vinyl ester compared, with the test standards and the mistakes we see on site.',
      excerpt: 'A coating is never simply chemically resistant. It depends on the product, the concentration, the temperature and the contact time. This is how to choose the right family, read a resistance list and write a specification that holds up on site.',
      category: 'Tank protection',
      body: [
        {
          type: 'p',
          segments: [
            'The question "is this coating chemically resistant?" has no answer until four things are known: which product, at what concentration, at what temperature and for how long. An epoxy that performs for years under diesel can soften quickly in hot concentrated acid. That is why every choice starts with the product and not with the coating. In ',
            { text: 'industrial painting', to: '/' },
            ' of tanks, containment areas and process equipment, this is the difference between a lining that lasts for decades and one rejected at the first inspection.',
          ],
        },
        { type: 'h2', text: 'What does chemical resistance actually mean?' },
        {
          type: 'p',
          text: 'Chemical resistance is the ability of a coating film to withstand contact with a substance without softening, blistering, detaching, discolouring or letting the substance through to the steel. The type of exposure matters as much as the substance itself. In practice we distinguish three situations:',
        },
        {
          type: 'ul',
          items: [
            'Immersion: the coating is permanently submerged, as on the inside of a storage tank. This is the heaviest load.',
            'Splash and spill: brief contact that is cleaned up afterwards, as at a loading point or in a containment bund.',
            'Vapour phase: the coating only sees vapours, as in the roof area of a tank. This zone is often underestimated, because condensate can be strongly concentrated there.',
          ],
        },
        {
          type: 'p',
          text: 'A product rated "resistant to splash" is therefore not suitable for immersion. Those two columns of a resistance list are mixed up surprisingly often.',
        },
        { type: 'h2', text: 'The factors that decide the choice' },
        {
          type: 'ol',
          items: [
            'Product and concentration. Dilute acid and concentrated acid are two different products for a coating, and not always in the direction you would expect.',
            'Temperature. As a rule of thumb from chemistry, the reaction rate roughly doubles for every 10 °C. Around heating coils the wall temperature is also higher than the product temperature.',
            'Contact time and cycle. Permanently filled, alternately filled or occasionally rinsed: each cycle loads the film differently.',
            'Product sequence. Some coatings absorb a product and must vent before the next product may go in. With changing cargoes, that sequence belongs in the specification.',
            'Curing and film thickness. A film cured too cold or too briefly will not reach the resistance in the list, however good the product is on paper.',
          ],
        },
        { type: 'h2', text: 'The coating families side by side' },
        {
          type: 'table',
          caption: 'Indicative overview. The coating manufacturer’s resistance list is always binding.',
          headers: ['Family', 'Strong against', 'Watch out for', 'Typical use'],
          rows: [
            ['Epoxy (amine cured)', 'Water, salt water, diesel, many oils, alkalis', 'Strong acids and aggressive solvents; chalks outdoors under UV', 'Water tanks, fuel tanks, containment bunds'],
            ['Phenolic epoxy', 'Fuels, crude oil, many solvents, higher temperatures', 'Needs strict control of film thickness and curing', 'Storage tanks for petroleum products'],
            ['Epoxy novolac', 'Many acids and solvents, higher temperatures', 'Harder and more brittle, so more sensitive to cracking on moving parts', 'Chemical tanks, containment bunds, tanks with changing cargoes'],
            ['Vinyl ester', 'Strong acids and oxidising media', 'Short pot life, needs experienced application', 'Acid tanks, flue gas cleaning'],
            ['Zinc silicate (inorganic)', 'Many solvents and neutral fuels', 'Not suitable for acids and alkalis', 'Tanks for solvents and jet fuel'],
            ['Polyurethane', 'Weather, UV, spills of mineral oil', 'Not intended for immersion', 'Topcoat on tank exteriors and piping'],
          ],
        },
        {
          type: 'p',
          segments: [
            'Which family suits which stored product is covered in more detail in our ',
            { text: 'guide to tank coating and tank lining', to: '/insights/tank-coating-lining' },
            '. For the heaviest media there are specialist solutions such as rubber lining or thermoplastic linings. These fall outside most paint systems and are often chosen at the design stage.',
          ],
        },
        { type: 'h2', text: 'How do you read a resistance list?' },
        {
          type: 'p',
          text: 'Every major coating manufacturer publishes a resistance list per product. This is how to get the right information from it:',
        },
        {
          type: 'ol',
          items: [
            'Look up the exact substance, with its concentration. If you only find a related substance, ask the manufacturer for written advice.',
            'Check whether the rating applies to immersion, or only to splash and spill.',
            'Check the temperature the rating belongs to, and allow for heating coils and warm fills.',
            'Note the conditions: the required cure, any post-cure with heat, and limits on changing products.',
            'Keep the advice in the project file. At a later product change, it is the first document you will need.',
          ],
        },
        {
          type: 'callout',
          title: 'Changing the product in the tank?',
          items: [
            'A list that was right at construction says nothing about the new product.',
            'Before the change, ask the coating manufacturer for new advice, giving the old and the new substance.',
            'Have the existing lining inspected first. Local damage quickly becomes a leak with a more aggressive product.',
          ],
        },
        { type: 'h2', text: 'Which standards and tests apply?' },
        {
          type: 'table',
          caption: 'The standards you will meet most often in a specification',
          headers: ['Standard', 'What for', 'When'],
          rows: [
            ['ISO 2812', 'Determination of resistance to liquids', 'Laboratory test during product selection'],
            ['EN 14879', 'Organic coatings and linings for industrial plant against aggressive media', 'Design and execution'],
            ['ISO 8501-1', 'Cleanliness grade after blasting, for example Sa 2½', 'Before coating'],
            ['ISO 8502-6 and -9', 'Measurement of soluble salts with the Bresle method', 'Before coating'],
            ['ISO 19840', 'Dry film thickness on rough surfaces', 'After coating'],
            ['ISO 29601', 'Porosity of the film with a holiday test', 'Final check of the lining'],
            ['ISO 4624', 'Pull-off adhesion test', 'Where the specification requires it'],
          ],
        },
        {
          type: 'p',
          segments: [
            'Note: ',
            { text: 'ISO 12944', to: '/insights/corrosion-protection-iso-12944' },
            ' covers corrosion protection in atmospheric environments and immersion in water or soil. An ISO 12944 classification is therefore no proof that a system resists a given chemical.',
          ],
        },
        { type: 'h2', text: 'The substrate decides whether the resistance is really achieved' },
        {
          type: 'p',
          segments: [
            'The resistance in the list applies to a correctly applied film on a correctly prepared substrate. For immersion, most specifications call for steel blasted to at least Sa 2½, a roughness profile according to the data sheet and soluble salts below the stated limit. On our tank projects, 50 mg/m² is a common limit, but the data sheet and the project inspection plan decide. Salts left under the film attract moisture and cause osmotic blisters. Read more in our article on ',
            { text: 'steel surface preparation', to: '/insights/steel-surface-preparation' },
            '.',
          ],
        },
        {
          type: 'image',
          src: '/images/tank-salt-test.jpg',
          alt: 'Measuring soluble salts on blasted steel in a storage tank',
          caption: 'Salt test on blasted steel, before the first coat. If salts remain under the film, the highest chemical resistance is worth nothing.',
        },
        { type: 'h2', text: 'Where it goes wrong in practice' },
        {
          type: 'ul',
          items: [
            'The choice was made on the product name, without concentration and temperature.',
            'The splash column was read as suitable for immersion.',
            'The tank was filled too early, before the film had fully cured. At low steel temperature this takes considerably longer than the data sheet states for 20 °C.',
            'Weld seams and edges were not stripe coated, so the film is too thin there. That is where the first pinholes and the first rust appear.',
            'A repair was made with a different product, without advice on the overlap and the adhesion to the existing layer.',
          ],
        },
        { type: 'h2', text: 'What belongs in a specification?' },
        {
          type: 'callout',
          title: 'These details make a quotation or system advice immediately comparable',
          items: [
            'All products that come into contact with the coating, with concentration.',
            'Operating temperature, peak temperature and any heating coils.',
            'Exposure: immersion, splash, spill or vapour phase, and the cleaning method.',
            'Zones to coat with their area: floor, wall, roof, internal parts.',
            'Condition of the substrate: new build, or the existing coating and the previous product.',
            'Required inspections and documents: inspection plan, climate records, film thicknesses, holiday test.',
          ],
        },
        { type: 'h2', text: 'Frequently asked questions' },
        {
          type: 'faq',
          items: [
            {
              q: 'Is epoxy acid resistant?',
              a: 'That depends on the type of epoxy and the acid. Standard epoxy has limited tolerance for acids. Epoxy novolac and vinyl ester are better suited, but there too the concentration and temperature decide whether the product is on the resistance list.',
            },
            {
              q: 'What is the difference between chemically resistant and corrosion resistant?',
              a: 'Corrosion resistant means a system protects the steel against rust, usually under weather and moisture. Chemically resistant means the film itself withstands a given substance. A system can do the first very well and still be attacked by a solvent.',
            },
            {
              q: 'How long must a lining cure before the tank may be filled?',
              a: 'The data sheet states this according to the product and steel temperature, from a few days to longer at low temperature. Some systems need a post-cure with heat. Never fill by feel: full chemical resistance is only reached after the stated cure.',
            },
            {
              q: 'May I store a different product in a tank with an existing lining?',
              a: 'Only after checking. Ask the coating manufacturer for advice with the old and the new substance, and have the lining inspected for damage. A lining that was good for the previous product is not automatically suitable for the next.',
            },
            {
              q: 'Can a damaged lining be repaired locally?',
              a: 'Often yes, with local treatment such as vacuum blasting, followed by the same system or a repair product approved by the manufacturer, overlapping the existing layer. After the repair, a holiday test checks that the film is closed again.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Unsure about the right system?',
          text: 'Send us the product, concentration, temperature and tank details. Together with the coating manufacturer, we look at which system fits and how it is carried out on site.',
          buttonLabel: 'Request a quote',
          to: '/contact',
        },
      ],
    },
  },
  {
    slug: 'corrosiebestrijding',
    date: '2026-11-06',
    author: 'Stig Vanmarsenille',
    authorRole: {
      NL: 'NACE Level 2 coating inspector',
      EN: 'NACE Level 2 coating inspector',
    },
    authorBio: {
      NL: 'Stig Vanmarsenille is NACE Level 2 coating inspector bij Russo NV. Hij keurt en begeleidt dagelijks industriële straal- en coatingwerken op de werf, van tankbekleding tot staalconstructies in de petrochemie.',
      EN: 'Stig Vanmarsenille is a NACE Level 2 coating inspector at Russo NV. He inspects and supervises industrial blasting and coating work on site every day, from tank linings to structural steel in petrochemicals.',
    },
    authorUrl: 'https://www.linkedin.com/in/stig-vanmarsenille-747176b9/',
    authorImage: '/images/author-stig.jpg',
    heroImage: '/images/iso-pitting.jpg',
    heroAlt: {
      NL: 'Close-up van putcorrosie (pitting) in een stalen oppervlak',
      EN: 'Close-up of pitting corrosion in a steel surface',
    },
    keywords: {
      NL: ['corrosiebestrijding', 'corrosie staal voorkomen', 'corrosiebescherming', 'kathodische bescherming', 'thermisch verzinken', 'metalliseren', 'corrosie onder isolatie'],
      EN: ['corrosion control', 'preventing steel corrosion', 'corrosion protection', 'cathodic protection', 'hot-dip galvanizing', 'thermal spray', 'corrosion under insulation'],
    },
    NL: {
      title: 'Corrosiebestrijding van staal: welke methode past wanneer?',
      metaTitle: 'Corrosiebestrijding staal: methodes vergeleken | Russo NV',
      description: 'Coating, thermisch verzinken, metalliseren, kathodische bescherming of rvs? De methodes van corrosiebestrijding naast elkaar, met hun grenzen.',
      excerpt: 'Roest is een chemisch proces dat je niet stopt met een verflaag alleen. Dit zijn de methodes van corrosiebestrijding, hoe ze werken, waar ze ophouden en hoe je kiest voor een bestaande installatie.',
      category: 'Corrosiebescherming',
      body: [
        {
          type: 'p',
          segments: [
            'Staal wil terug naar wat het ooit was: ijzererts. Zolang er ijzer, water en zuurstof samenkomen, loopt dat proces door, en zouten of zuren versnellen het sterk. Corrosiebestrijding is alles wat dat proces vertraagt of onderbreekt. Bij ',
            { text: 'industriële schilderwerken', to: '/' },
            ' is een coatingsysteem de bekendste methode, maar het is lang niet de enige. Welke methode de juiste is, hangt af van het object, de omgeving en of het staal al in dienst staat.',
          ],
        },
        { type: 'h2', text: 'Wat is corrosiebestrijding precies?' },
        {
          type: 'p',
          text: 'Corrosie is een elektrochemische reactie. Op het staaloppervlak ontstaan kleine anodes en kathodes, en vocht fungeert als geleider tussen die twee. Elke vorm van corrosiebestrijding pakt een van die schakels aan:',
        },
        {
          type: 'ul',
          items: [
            'Een barrière tussen staal en omgeving, zoals een coating.',
            'Een metaal dat zichzelf opoffert in plaats van het staal, zoals zink.',
            'Een elektrische sturing van de reactie: kathodische bescherming.',
            'Een ander materiaal dat de reactie veel trager laat verlopen, zoals roestvast staal.',
            'Een omgeving of ontwerp waarin het staal minder lang nat blijft.',
          ],
        },
        {
          type: 'p',
          text: 'Corrosiebestrijding en corrosiebescherming worden in de praktijk door elkaar gebruikt. Wij spreken van bestrijding als er al corrosie aanwezig is en de vraag is hoe je die stopt, en van bescherming als het om het systeem gaat dat herhaling voorkomt.',
        },
        { type: 'h2', text: 'De methodes naast elkaar' },
        {
          type: 'table',
          caption: 'De gangbare methodes voor staal, met hun sterkte en hun grens',
          headers: ['Methode', 'Hoe het werkt', 'Sterk in', 'Grens'],
          rows: [
            ['Coatingsysteem', 'Barrière, soms met een zinkrijke primer', 'Op locatie uitvoerbaar, ook in bedrijf; onderhoudbaar; grote objecten', 'Staat of valt met de voorbereiding en vraagt onderhoud'],
            ['Thermisch verzinken', 'Dompelen in gesmolten zink, zink offert zichzelf op', 'Lange levensduur op nieuwe profielen, hekken en bordessen', 'Alleen in een zinkerij, afmetingen beperkt door het bad'],
            ['Metalliseren', 'Gespoten laag zink of aluminium, meestal met een afdichting', 'Kan ook op locatie; geen warmte-inbreng zoals bij dompelen', 'Vraagt zeer zuiver gestraald staal, doorgaans Sa 3'],
            ['Kathodische bescherming', 'Opofferingsanodes of opgedrukte stroom', 'Ondergedompeld of ingegraven staal: kades, leidingen, tankbodems', 'Werkt niet in de open lucht; vaak gecombineerd met een coating'],
            ['Materiaalkeuze', 'Roestvast staal, duplex of aluminium', 'Procesleidingen en plaatsen die moeilijk bereikbaar zijn', 'Hogere investering; chloriden blijven een risico'],
            ['Ontwerp en omgeving', 'Geen waterzakken, afgeronde randen, ontvochtiging', 'Voorkomt het probleem in plaats van het op te lossen', 'Vooral mogelijk bij nieuwbouw en grote aanpassingen'],
          ],
        },
        {
          type: 'p',
          segments: [
            'De ontwerpregels die corrosie beperken staan in ISO 12944-3. Voor bestaande staalconstructies en tankparken blijft een coatingsysteem bijna altijd de praktische keuze, omdat het op locatie kan en zonder dat de installatie moet worden gedemonteerd. Hoe zo\'n systeem wordt opgebouwd, lees je in onze gids over ',
            { text: 'corrosiebescherming volgens ISO 12944', to: '/insights/corrosion-protection-iso-12944' },
            '.',
          ],
        },
        { type: 'h2', text: 'Hoe kies je de juiste methode?' },
        {
          type: 'ol',
          items: [
            'Bepaal de omgeving. Een loods in het binnenland vraagt iets anders dan een pijpbrug in de haven. Bekijk daarvoor de corrosiviteitsklasse.',
            'Bepaal de gewenste levensduur tot het eerste groot onderhoud, en wat stilstand kost.',
            'Kijk of het object mag bewegen. Past het in een zinkbad, of staat het vast in een installatie?',
            'Bekijk de toegang: hoogte, besloten ruimte, ATEX-zones en werkvergunningen bepalen wat haalbaar is.',
            'Vergelijk de totale kost over de hele levensduur, niet alleen de eerste aanleg.',
          ],
        },
        {
          type: 'p',
          segments: [
            'Twijfel je over de omgeving? In ons overzicht van de ',
            { text: 'corrosieklassen in België', to: '/insights/corrosieklassen-belgie' },
            ' vind je de gebruikelijke klassen per type locatie.',
          ],
        },
        { type: 'h2', text: 'Corrosie stoppen op een bestaande installatie' },
        {
          type: 'p',
          text: 'Bij staal dat al in dienst staat, begint het bij een inspectie. De roestgraad wordt beoordeeld volgens ISO 4628-3, op een schaal van Ri 0 tot Ri 5. Op basis daarvan zijn er drie richtingen:',
        },
        {
          type: 'ul',
          items: [
            'Plaatselijk herstel: alleen de aangetaste plekken worden gereinigd en opgebouwd. Dat is zinvol zolang de bestaande coating nog goed hecht en de roest beperkt blijft.',
            'Overcoaten na reiniging: de oude laag blijft staan en krijgt een nieuwe afwerking. Dat kan alleen als de hechting is gecontroleerd en de lagen compatibel zijn.',
            'Volledige renovatie: alles terug naar het staal, met stralen of waterstralen, en een nieuw systeem.',
          ],
        },
        {
          type: 'image',
          src: '/images/iso-spot-blast.jpg',
          width: 900,
          height: 1200,
          alt: 'Plaatselijk gestraalde zone op een geklonken tankbodem, klaar voor herstel',
          caption: 'Plaatselijk herstel: de aangetaste zone wordt tot op het staal gereinigd, zodat de nieuwe opbouw op een gezonde ondergrond komt.',
        },
        {
          type: 'p',
          segments: [
            'Hoe grondig de ondergrond moet zijn, volgt uit de ',
            { text: 'reinheidsgraden uit ISO 8501-1', to: '/insights/reinheidsgraden-staal' },
            '. Op locatie combineren we die voorbereiding vaak met de planning van de site, zoals bij de ',
            { text: 'kranen van CSP Zeebrugge', to: '/projects/kranen-coating-csp-zeebrugge' },
            ', waar de terminal gewoon bleef werken.',
          ],
        },
        { type: 'h2', text: 'Waar corrosiebestrijding in de praktijk misloopt' },
        {
          type: 'ul',
          items: [
            'Roest wordt overschilderd zonder de oorzaak weg te nemen. De nieuwe laag zit dan op een ondergrond die verder blijft reageren.',
            'Oplosbare zouten blijven achter op het staal. Ze trekken vocht aan onder de film en veroorzaken blaasjes.',
            'Randen, lassen en bouten krijgen geen extra laag. Daar begint de roest meestal als eerste.',
            'Corrosie onder isolatie wordt niet gezien. Isolatie houdt vocht vast tegen warme en koude leidingen, en de schade blijft lang verborgen.',
            'Er is geen onderhoudsplan. Vroeg plaatselijk herstel kost een fractie van een volledige renovatie enkele jaren later.',
          ],
        },
        { type: 'h2', text: 'Veelgestelde vragen' },
        {
          type: 'faq',
          items: [
            {
              q: 'Wat is het verschil tussen corrosiebestrijding en corrosiebescherming?',
              a: 'De termen worden vaak door elkaar gebruikt. Corrosiebestrijding verwijst meestal naar het aanpakken van bestaande of dreigende corrosie, corrosiebescherming naar het systeem dat het staal blijvend beschermt, zoals een coating volgens ISO 12944.',
            },
            {
              q: 'Is thermisch verzinken altijd beter dan schilderen?',
              a: 'Nee. Thermisch verzinken is sterk bij nieuwe onderdelen die in een zinkbad passen. Voor grote of vaste constructies, tanks en installaties in bedrijf is het niet mogelijk, en dan is een coatingsysteem de logische keuze. Beide kunnen ook gecombineerd worden.',
            },
            {
              q: 'Kan ik roest gewoon overschilderen?',
              a: 'Alleen bij lichte vliegroest en met een product dat daarvoor bedoeld is, op advies van de fabrikant. Over actieve roest of losse schilfers schilderen geeft binnen korte tijd opnieuw schade, omdat de corrosie onder de film verdergaat.',
            },
            {
              q: 'Wat is corrosie onder isolatie?',
              a: 'Vocht dat in de isolatie van leidingen of tanks dringt, blijft tegen het staal staan en veroorzaakt daar verborgen corrosie. De schade wordt vaak pas zichtbaar als de isolatie wordt verwijderd. Bij inspecties en renovaties verdient die zone daarom aparte aandacht.',
            },
            {
              q: 'Hoe vaak moet staal opnieuw geschilderd worden?',
              a: 'Dat hangt af van de omgeving, het systeem en de voorbereiding. ISO 12944 werkt met levensduurbereiken als ontwerpverwachting, niet als garantie. Regelmatige inspectie en plaatselijk herstel rekken de levensduur aanzienlijk.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Corrosie op een installatie of staalconstructie?',
          text: 'Stuur ons foto\'s en de omgeving van het object. Wij bekijken of plaatselijk herstel volstaat of dat een renovatie nodig is.',
          buttonLabel: 'Bekijk corrosiebescherming',
          to: '/services/corrosiebescherming',
        },
      ],
    },
    EN: {
      title: 'Corrosion control for steel: which method fits when?',
      metaTitle: 'Corrosion control for steel: methods compared | Russo NV',
      description: 'Coating, hot-dip galvanizing, thermal spray, cathodic protection or stainless steel? The methods of corrosion control side by side, with their limits.',
      excerpt: 'Rust is a chemical process you do not stop with a coat of paint alone. These are the methods of corrosion control, how they work, where they stop and how to choose for an existing installation.',
      category: 'Corrosion protection',
      body: [
        {
          type: 'p',
          segments: [
            'Steel wants to go back to what it once was: iron ore. As long as iron, water and oxygen come together the process continues, and salts or acids speed it up considerably. Corrosion control is everything that slows or interrupts that process. In ',
            { text: 'industrial painting', to: '/' },
            ', a coating system is the best known method, but far from the only one. The right method depends on the object, the environment and whether the steel is already in service.',
          ],
        },
        { type: 'h2', text: 'What exactly is corrosion control?' },
        {
          type: 'p',
          text: 'Corrosion is an electrochemical reaction. Small anodes and cathodes form on the steel surface, and moisture acts as the conductor between them. Every form of corrosion control targets one of those links:',
        },
        {
          type: 'ul',
          items: [
            'A barrier between steel and environment, such as a coating.',
            'A metal that sacrifices itself instead of the steel, such as zinc.',
            'An electrical control of the reaction: cathodic protection.',
            'A different material in which the reaction runs far more slowly, such as stainless steel.',
            'An environment or design in which the steel stays wet for less time.',
          ],
        },
        {
          type: 'p',
          text: 'Corrosion control and corrosion protection are used interchangeably in practice. We speak of control when corrosion is already present and the question is how to stop it, and of protection when it is about the system that prevents it from coming back.',
        },
        { type: 'h2', text: 'The methods side by side' },
        {
          type: 'table',
          caption: 'The common methods for steel, with their strength and their limit',
          headers: ['Method', 'How it works', 'Strong in', 'Limit'],
          rows: [
            ['Coating system', 'Barrier, sometimes with a zinc-rich primer', 'Can be done on site, also in operation; maintainable; large objects', 'Depends on the preparation and needs maintenance'],
            ['Hot-dip galvanizing', 'Dipping in molten zinc; the zinc sacrifices itself', 'Long service life on new sections, fencing and platforms', 'Only in a galvanizing plant, size limited by the bath'],
            ['Thermal spray', 'Sprayed layer of zinc or aluminium, usually with a sealer', 'Also possible on site; no heat input as with dipping', 'Needs very clean blasted steel, usually Sa 3'],
            ['Cathodic protection', 'Sacrificial anodes or impressed current', 'Submerged or buried steel: quays, pipelines, tank floors', 'Does not work in open air; often combined with a coating'],
            ['Material choice', 'Stainless steel, duplex or aluminium', 'Process piping and places that are hard to reach', 'Higher investment; chlorides remain a risk'],
            ['Design and environment', 'No water traps, rounded edges, dehumidification', 'Prevents the problem instead of solving it', 'Mainly possible in new build and major modifications'],
          ],
        },
        {
          type: 'p',
          segments: [
            'The design rules that limit corrosion are in ISO 12944-3. For existing steel structures and tank farms, a coating system is almost always the practical choice, because it can be done on site without dismantling the installation. How such a system is built up is covered in our guide to ',
            { text: 'corrosion protection to ISO 12944', to: '/insights/corrosion-protection-iso-12944' },
            '.',
          ],
        },
        { type: 'h2', text: 'How do you choose the right method?' },
        {
          type: 'ol',
          items: [
            'Determine the environment. A shed inland asks for something different than a pipe bridge in the port. Look at the corrosivity class for this.',
            'Determine the required service life until the first major maintenance, and what downtime costs.',
            'Check whether the object can move. Does it fit in a galvanizing bath, or is it fixed in an installation?',
            'Look at access: height, confined space, ATEX zones and work permits decide what is feasible.',
            'Compare the total cost over the whole service life, not only the first application.',
          ],
        },
        {
          type: 'p',
          segments: [
            'Unsure about the environment? Our overview of ',
            { text: 'corrosivity classes in Belgium', to: '/insights/corrosieklassen-belgie' },
            ' lists the usual classes per type of location.',
          ],
        },
        { type: 'h2', text: 'Stopping corrosion on an existing installation' },
        {
          type: 'p',
          text: 'For steel already in service, it starts with an inspection. The degree of rusting is assessed to ISO 4628-3, on a scale from Ri 0 to Ri 5. That leaves three directions:',
        },
        {
          type: 'ul',
          items: [
            'Local repair: only the affected spots are cleaned and rebuilt. This makes sense as long as the existing coating still adheres well and rust remains limited.',
            'Overcoating after cleaning: the old layer stays and receives a new finish. This is only possible once adhesion has been checked and the layers are compatible.',
            'Full refurbishment: everything back to the steel, by blasting or water jetting, with a new system.',
          ],
        },
        {
          type: 'image',
          src: '/images/iso-spot-blast.jpg',
          width: 900,
          height: 1200,
          alt: 'Locally blasted zone on a riveted tank floor, ready for repair',
          caption: 'Local repair: the affected zone is cleaned down to the steel, so the new build-up sits on a sound substrate.',
        },
        {
          type: 'p',
          segments: [
            'How thorough the preparation must be follows from the ',
            { text: 'cleanliness grades in ISO 8501-1', to: '/insights/reinheidsgraden-staal' },
            '. On site we often combine that preparation with the site planning, as with the ',
            { text: 'cranes at CSP Zeebrugge', to: '/projects/kranen-coating-csp-zeebrugge' },
            ', where the terminal simply kept working.',
          ],
        },
        { type: 'h2', text: 'Where corrosion control goes wrong in practice' },
        {
          type: 'ul',
          items: [
            'Rust is painted over without removing the cause. The new layer then sits on a substrate that keeps reacting.',
            'Soluble salts stay on the steel. They attract moisture under the film and cause blisters.',
            'Edges, welds and bolts get no extra coat. That is usually where the rust starts first.',
            'Corrosion under insulation goes unseen. Insulation holds moisture against hot and cold pipes, and the damage stays hidden for a long time.',
            'There is no maintenance plan. Early local repair costs a fraction of a full refurbishment a few years later.',
          ],
        },
        { type: 'h2', text: 'Frequently asked questions' },
        {
          type: 'faq',
          items: [
            {
              q: 'What is the difference between corrosion control and corrosion protection?',
              a: 'The terms are often used interchangeably. Corrosion control usually refers to dealing with existing or imminent corrosion, corrosion protection to the system that protects the steel permanently, such as a coating to ISO 12944.',
            },
            {
              q: 'Is hot-dip galvanizing always better than painting?',
              a: 'No. Hot-dip galvanizing is strong on new parts that fit in a zinc bath. For large or fixed structures, tanks and installations in service it is not possible, and a coating system is the logical choice. The two can also be combined.',
            },
            {
              q: 'Can I simply paint over rust?',
              a: 'Only with light flash rust and a product meant for it, on the manufacturer’s advice. Painting over active rust or loose flakes gives new damage within a short time, because corrosion continues under the film.',
            },
            {
              q: 'What is corrosion under insulation?',
              a: 'Moisture that enters the insulation of pipes or tanks stays against the steel and causes hidden corrosion there. The damage often only becomes visible when the insulation is removed. That zone therefore deserves separate attention during inspections and refurbishments.',
            },
            {
              q: 'How often does steel need repainting?',
              a: 'That depends on the environment, the system and the preparation. ISO 12944 uses durability ranges as a design expectation, not a guarantee. Regular inspection and local repair extend service life considerably.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Corrosion on an installation or steel structure?',
          text: 'Send us photos and the environment of the object. We will look at whether local repair is enough or a refurbishment is needed.',
          buttonLabel: 'See corrosion protection',
          to: '/services/corrosiebescherming',
        },
      ],
    },
  },
  {
    slug: 'gritstralen',
    date: '2026-11-06',
    author: 'Stig Vanmarsenille',
    authorRole: {
      NL: 'NACE Level 2 coating inspector',
      EN: 'NACE Level 2 coating inspector',
    },
    authorBio: {
      NL: 'Stig Vanmarsenille is NACE Level 2 coating inspector bij Russo NV. Hij keurt en begeleidt dagelijks industriële straal- en coatingwerken op de werf, van tankbekleding tot staalconstructies in de petrochemie.',
      EN: 'Stig Vanmarsenille is a NACE Level 2 coating inspector at Russo NV. He inspects and supervises industrial blasting and coating work on site every day, from tank linings to structural steel in petrochemicals.',
    },
    authorUrl: 'https://www.linkedin.com/in/stig-vanmarsenille-747176b9/',
    authorImage: '/images/author-stig.jpg',
    heroImage: '/images/tank-blasting.jpg',
    heroAlt: {
      NL: 'Straler aan het werk in een donkere tank, straalnevel in het lamplicht',
      EN: 'Blaster at work in a dark tank, blasting mist in the lamp light',
    },
    keywords: {
      NL: ['gritstralen', 'wat is gritstralen', 'zandstralen', 'straalgrit', 'straalmiddel', 'staal stralen', 'stralen op locatie', 'vacuümstralen'],
      EN: ['grit blasting', 'what is grit blasting', 'sandblasting', 'blasting abrasive', 'steel grit', 'blasting steel', 'on-site blasting', 'vacuum blasting'],
    },
    NL: {
      title: 'Wat is gritstralen? Het verschil met zandstralen uitgelegd',
      metaTitle: 'Wat is gritstralen? Verschil met zandstralen | Russo NV',
      description: 'Gritstralen reinigt staal en geeft het een ruw profiel voor de coating. Het verschil met zandstralen, de straalmiddelen en hoe het op locatie gaat.',
      excerpt: 'In de volksmond heet alles zandstralen, maar in de industrie stralen we met grit. Dit is wat gritstralen doet, welke straalmiddelen er zijn, wat er met het gebruikte grit gebeurt en wanneer je beter een andere methode kiest.',
      category: 'Oppervlaktevoorbereiding',
      body: [
        {
          type: 'p',
          segments: [
            'Gritstralen is het reinigen en opruwen van een oppervlak met een harde, korrelige straalstof die met perslucht op hoge snelheid wordt weggeschoten. Het haalt roest, walshuid en oude coating weg en laat een ruw profiel achter waar de nieuwe laag zich aan kan vastzetten. Bij ',
            { text: 'industriële schilderwerken', to: '/' },
            ' aan tanks en staalconstructies is het de standaardmethode om staal klaar te maken voor een coatingsysteem.',
          ],
        },
        { type: 'h2', text: 'Wat is het verschil tussen gritstralen en zandstralen?' },
        {
          type: 'p',
          text: 'In de volksmond heet alles zandstralen, maar industrieel gebeurt het niet met zand. Droog stralen met korrels die meer dan 1% vrij kristallijn silica bevatten, is in België volledig verboden, ook in afgesloten systemen. Het stof dat daarbij vrijkomt, tast de longen aan. Industrieel straalwerk gebeurt daarom met grit: minerale slakken, granaat, korund of staalgrit. Het principe is hetzelfde, het straalmiddel niet.',
        },
        { type: 'h2', text: 'Welk straalmiddel kies je?' },
        {
          type: 'table',
          caption: 'De gangbare straalmiddelen in de industrie. De normen ISO 11126 en ISO 11124 leggen de eisen vast.',
          headers: ['Straalmiddel', 'Hergebruik', 'Typisch gebruik'],
          rows: [
            ['Minerale slak of aluminiumsilicaat', 'Eenmalig', 'Open stralen op locatie: tanks, staalconstructies'],
            ['Granaat', 'Beperkt, met terugwinning', 'Waar stof en hoeveelheid afval beperkt moeten blijven'],
            ['Staalgrit', 'Vele keren, met terugwinning', 'Straalateliers en werven met een terugwinsysteem'],
            ['Korund (aluminiumoxide)', 'Meerdere keren', 'Hard en scherp: roestvast staal, ateliers'],
            ['Glasparels', 'Meerdere keren', 'Reinigen zonder ruw profiel, niet voor coatingvoorbereiding'],
          ],
        },
        {
          type: 'p',
          text: 'De keuze hangt af van het vereiste profiel, de plaats en wat er met het afval moet gebeuren. Op een werf waar het grit niet kan worden teruggewonnen, is een eenmalig mineraal straalmiddel meestal de logische keuze. Korrelgrootte en druk stemmen we af op het ruwheidsprofiel dat het datablad vraagt.',
        },
        { type: 'h2', text: 'Hoe verloopt gritstralen op locatie?' },
        {
          type: 'ol',
          items: [
            'Voorbereiding: afdekken van wat niet geraakt mag worden, afscherming van de omgeving en reinigen van vet en olie. Stralen verwijdert vet niet, het smeert het uit.',
            'Klimaat meten: de staaltemperatuur moet minstens 3 °C boven het dauwpunt liggen, anders vormt zich vliegroest op het verse staal.',
            'Stralen: de straler werkt met een straalketel, compressor en droge perslucht, met een helm op ademlucht.',
            'Controle: reinheidsgraad volgens ISO 8501-1, ruwheid volgens ISO 8503, stof volgens ISO 8502-3 en oplosbare zouten met de Bresle-methode.',
            'Afzuigen en vrijgeven: grit en stof worden verwijderd, en het staal gaat zo snel mogelijk onder de eerste laag.',
          ],
        },
        {
          type: 'image',
          src: '/images/tank-blasting-sa25.jpg',
          width: 1200,
          height: 900,
          alt: 'Vers gestraalde onderste wandring in een opslagtank, blank staal tot reinheidsgraad Sa 2½',
          caption: 'Na het gritstralen: egaal staal met een ruw profiel. De reinheidsgraad wordt beoordeeld volgens ISO 8501-1.',
        },
        {
          type: 'p',
          segments: [
            'Wat de reinheidsgraden Sa 2½ en Sa 3 precies betekenen, lees je in ons artikel over ',
            { text: 'reinheidsgraden van staal', to: '/insights/reinheidsgraden-staal' },
            '. De volledige keten van reinigen tot vrijgeven beschrijven we in onze gids over ',
            { text: 'oppervlaktevoorbereiding', to: '/insights/steel-surface-preparation' },
            '.',
          ],
        },
        { type: 'h2', text: 'Wat gebeurt er met het gebruikte grit?' },
        {
          type: 'p',
          text: 'Gebruikt grit is afval, en het bevat alles wat er van het staal is gehaald, inclusief oude coating. Oude verfsystemen kunnen zware metalen bevatten, en dan gelden andere regels voor de afvoer. Daarom hoort de afvoer van het straalgrit vooraf in de planning en in de offerte thuis, met duidelijke afspraken over wie wat regelt. Op grote projecten is de hoeveelheid grit vaak een van de grootste logistieke posten.',
        },
        { type: 'h2', text: 'Wanneer kies je geen gritstralen?' },
        {
          type: 'ul',
          items: [
            'Op plaatsen waar open stralen niet mag of de installatie in bedrijf blijft: daar is vacuümstralen een optie, waarbij het grit aan de kop direct wordt afgezogen.',
            'Op oude coatings die verwijderd moeten worden zonder grote hoeveelheden besmet grit: daar kan waterstralen beter passen.',
            'Bij lichte, plaatselijke reiniging van naden en lassen, waar mechanisch reinigen tot St 2 of St 3 volstaat als het coatingsysteem dat toelaat.',
          ],
        },
        {
          type: 'p',
          segments: [
            'Meer over de alternatieve methode lees je in ons artikel over ',
            { text: 'UHP-waterstralen', to: '/insights/uhp-waterstralen' },
            '. Voor uitvoering op locatie kun je terecht bij onze dienst ',
            { text: 'industrieel stralen', to: '/services/industrieel-stralen' },
            '.',
          ],
        },
        { type: 'h2', text: 'Veelgestelde vragen' },
        {
          type: 'faq',
          items: [
            {
              q: 'Is zandstralen verboden in België?',
              a: 'Droog stralen met zand of andere korrels met meer dan 1% vrij kristallijn silica is in België volledig verboden, ook in afgesloten systemen. Dat volgt uit de Codex over het welzijn op het werk. Wat men vandaag zandstralen noemt, gebeurt in de praktijk met andere straalmiddelen, zoals minerale slakken of granaat.',
            },
            {
              q: 'Wat is straalgrit?',
              a: 'Straalgrit is de harde, korrelige straalstof waarmee staal wordt gereinigd en opgeruwd. Het kan een mineraal product zijn, zoals een slak of granaat, of een metallisch product, zoals staalgrit. ISO 11126 en ISO 11124 leggen de eisen vast.',
            },
            {
              q: 'Hoe ruw moet staal zijn na het stralen?',
              a: 'Dat bepaalt het datablad van de coating, met een waarde in µm Rz of een klasse uit ISO 8503, zoals Medium G. Dikkere systemen en tank linings vragen meestal een ruwer profiel dan dunne systemen. Meet het profiel met een comparator of een meter, schat het niet op het oog.',
            },
            {
              q: 'Kan er gestraald worden in een werkende installatie?',
              a: 'Dat kan, met afscherming en de juiste vergunningen. In gevoelige zones gebruiken we vacuümstralen, waarbij het grit direct wordt afgezogen. In ATEX-zones en naast draaiende installaties wordt de methode altijd vooraf met de site afgestemd.',
            },
            {
              q: 'Kan gritstralen ook op beton?',
              a: 'Ja, grit wordt ook gebruikt om beton op te ruwen en cementhuid te verwijderen, met een aangepaste druk en korrel. Daarna is de ondergrond open en draagkrachtig voor een coating of herstelmortel.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Staal te stralen op locatie?',
          text: 'Bezorg ons het object, de oppervlakte en de gevraagde reinheidsgraad. U krijgt een duidelijke aanpak met methode, planning en offerte.',
          buttonLabel: 'Bekijk industrieel stralen',
          to: '/services/industrieel-stralen',
        },
      ],
    },
    EN: {
      title: 'What is grit blasting? The difference with sandblasting explained',
      metaTitle: 'What is grit blasting? Difference with sandblasting | Russo NV',
      description: 'Grit blasting cleans steel and gives it a rough profile for the coating. The difference with sandblasting, the abrasives and how it works on site.',
      excerpt: 'People call everything sandblasting, but in industry we blast with grit. This is what grit blasting does, which abrasives exist, what happens to the spent grit and when another method is the better choice.',
      category: 'Surface preparation',
      body: [
        {
          type: 'p',
          segments: [
            'Grit blasting is cleaning and roughening a surface with a hard, granular abrasive fired at high speed by compressed air. It removes rust, mill scale and old coating and leaves a rough profile that the new layer can key into. In ',
            { text: 'industrial painting', to: '/' },
            ' of tanks and steel structures, it is the standard method for getting steel ready for a coating system.',
          ],
        },
        { type: 'h2', text: 'What is the difference between grit blasting and sandblasting?' },
        {
          type: 'p',
          text: 'People call everything sandblasting, but industrial blasting does not use sand. Dry blasting with grains containing more than 1% free crystalline silica is fully banned in Belgium, even in enclosed systems. The dust it releases damages the lungs. Industrial blasting therefore uses grit: mineral slags, garnet, corundum or steel grit. The principle is the same, the abrasive is not.',
        },
        { type: 'h2', text: 'Which abrasive do you choose?' },
        {
          type: 'table',
          caption: 'The common abrasives in industry. The standards ISO 11126 and ISO 11124 set the requirements.',
          headers: ['Abrasive', 'Reuse', 'Typical use'],
          rows: [
            ['Mineral slag or aluminium silicate', 'Single use', 'Open blasting on site: tanks, steel structures'],
            ['Garnet', 'Limited, with recovery', 'Where dust and waste volume must stay limited'],
            ['Steel grit', 'Many times, with recovery', 'Blasting shops and sites with a recovery system'],
            ['Corundum (aluminium oxide)', 'Several times', 'Hard and sharp: stainless steel, workshops'],
            ['Glass beads', 'Several times', 'Cleaning without a rough profile, not for coating preparation'],
          ],
        },
        {
          type: 'p',
          text: 'The choice depends on the required profile, the location and what must happen to the waste. On a site where the grit cannot be recovered, a single-use mineral abrasive is usually the logical choice. We match grain size and pressure to the roughness profile the data sheet asks for.',
        },
        { type: 'h2', text: 'How does grit blasting work on site?' },
        {
          type: 'ol',
          items: [
            'Preparation: masking what must not be hit, shielding the surroundings and removing grease and oil. Blasting does not remove grease, it smears it.',
            'Measuring the climate: the steel temperature must be at least 3 °C above the dew point, or flash rust forms on the fresh steel.',
            'Blasting: the blaster works with a blast pot, compressor and dry compressed air, wearing a helmet on breathing air.',
            'Inspection: cleanliness grade to ISO 8501-1, roughness to ISO 8503, dust to ISO 8502-3 and soluble salts with the Bresle method.',
            'Vacuuming and release: grit and dust are removed, and the steel goes under the first coat as soon as possible.',
          ],
        },
        {
          type: 'image',
          src: '/images/tank-blasting-sa25.jpg',
          width: 1200,
          height: 900,
          alt: 'Freshly blasted lower wall ring in a storage tank, bare steel to cleanliness grade Sa 2½',
          caption: 'After grit blasting: even steel with a rough profile. The cleanliness grade is assessed to ISO 8501-1.',
        },
        {
          type: 'p',
          segments: [
            'What the grades Sa 2½ and Sa 3 mean exactly is covered in our article on ',
            { text: 'steel cleanliness grades', to: '/insights/reinheidsgraden-staal' },
            '. The full chain from cleaning to release is described in our guide to ',
            { text: 'surface preparation', to: '/insights/steel-surface-preparation' },
            '.',
          ],
        },
        { type: 'h2', text: 'What happens to the spent grit?' },
        {
          type: 'p',
          text: 'Spent grit is waste, and it contains everything taken off the steel, including old coating. Old paint systems can contain heavy metals, and then different disposal rules apply. That is why disposal of the grit belongs in the planning and the quotation from the start, with clear agreements on who arranges what. On large projects, the volume of grit is often one of the biggest logistics items.',
        },
        { type: 'h2', text: 'When do you not choose grit blasting?' },
        {
          type: 'ul',
          items: [
            'Where open blasting is not allowed or the installation stays in operation: vacuum blasting is an option there, with the grit extracted straight at the head.',
            'On old coatings that must be removed without large volumes of contaminated grit: water jetting may fit better.',
            'For light, local cleaning of seams and welds, where mechanical cleaning to St 2 or St 3 is enough if the coating system allows it.',
          ],
        },
        {
          type: 'p',
          segments: [
            'Read more about the alternative in our article on ',
            { text: 'UHP water jetting', to: '/insights/uhp-waterstralen' },
            '. For work on site, see our ',
            { text: 'industrial blasting', to: '/services/industrieel-stralen' },
            ' service.',
          ],
        },
        { type: 'h2', text: 'Frequently asked questions' },
        {
          type: 'faq',
          items: [
            {
              q: 'Is sandblasting banned in Belgium?',
              a: 'Dry blasting with sand or other grains containing more than 1% free crystalline silica is fully banned in Belgium, even in enclosed systems. This follows from the Belgian code on well-being at work. What people call sandblasting today in practice uses other abrasives, such as mineral slags or garnet.',
            },
            {
              q: 'What is blasting grit?',
              a: 'Blasting grit is the hard, granular abrasive used to clean and roughen steel. It can be a mineral product, such as a slag or garnet, or a metallic product, such as steel grit. ISO 11126 and ISO 11124 set the requirements.',
            },
            {
              q: 'How rough must steel be after blasting?',
              a: 'The coating data sheet decides, with a value in µm Rz or a class from ISO 8503, such as Medium G. Thicker systems and tank linings usually ask for a rougher profile than thin systems. Measure the profile with a comparator or a gauge, do not judge it by eye.',
            },
            {
              q: 'Can blasting be done in a working installation?',
              a: 'Yes, with shielding and the right permits. In sensitive zones we use vacuum blasting, with the grit extracted directly. In ATEX zones and next to running equipment, the method is always agreed with the site beforehand.',
            },
            {
              q: 'Can grit blasting also be used on concrete?',
              a: 'Yes, grit is also used to roughen concrete and remove laitance, with adjusted pressure and grain size. The surface is then open and sound for a coating or repair mortar.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Steel to blast on site?',
          text: 'Send us the object, the area and the required cleanliness grade. You will receive a clear approach with method, planning and quotation.',
          buttonLabel: 'See industrial blasting',
          to: '/services/industrieel-stralen',
        },
      ],
    },
  },
  {
    slug: 'reinheidsgraden-staal',
    date: '2026-11-06',
    author: 'Stig Vanmarsenille',
    authorRole: {
      NL: 'NACE Level 2 coating inspector',
      EN: 'NACE Level 2 coating inspector',
    },
    authorBio: {
      NL: 'Stig Vanmarsenille is NACE Level 2 coating inspector bij Russo NV. Hij keurt en begeleidt dagelijks industriële straal- en coatingwerken op de werf, van tankbekleding tot staalconstructies in de petrochemie.',
      EN: 'Stig Vanmarsenille is a NACE Level 2 coating inspector at Russo NV. He inspects and supervises industrial blasting and coating work on site every day, from tank linings to structural steel in petrochemicals.',
    },
    authorUrl: 'https://www.linkedin.com/in/stig-vanmarsenille-747176b9/',
    authorImage: '/images/author-stig.jpg',
    heroImage: '/images/step2.jpg',
    heroAlt: {
      NL: 'Staal gestraald tot reinheidsgraad Sa 2½ volgens ISO 8501-1',
      EN: 'Steel blasted to cleanliness grade Sa 2½ to ISO 8501-1',
    },
    keywords: {
      NL: ['reinheidsgraad staal', 'Sa 2,5', 'Sa 2½', 'St 2', 'St 3', 'verschil St2 en St3', 'ISO 8501-1', 'ISO 8501-4', 'Wa 2½'],
      EN: ['steel cleanliness grade', 'Sa 2.5', 'Sa 2½', 'St 2', 'St 3', 'difference St2 and St3', 'ISO 8501-1', 'ISO 8501-4', 'Wa 2½'],
    },
    NL: {
      title: 'Reinheidsgraden van staal: Sa 2½, St 2 en St 3 uitgelegd',
      metaTitle: 'Reinheidsgraden staal: Sa 2,5, St 2 en St 3 | Russo NV',
      description: 'Wat betekent Sa 2,5? Wat is het verschil tussen St 2 en St 3? De reinheidsgraden uit ISO 8501-1, wanneer je welke vraagt en wat de norm niet meet.',
      excerpt: 'Een coatingspecificatie staat of valt met een korte code: Sa 2½, St 3 of Wa 2. Dit is wat die codes betekenen, wanneer je welke graad nodig hebt en waarom een mooi gestraald oppervlak nog niet schoon genoeg hoeft te zijn.',
      category: 'Oppervlaktevoorbereiding',
      body: [
        {
          type: 'p',
          segments: [
            'De reinheidsgraad zegt hoe grondig staal is gereinigd voordat de eerste laag erop komt. De norm is ISO 8501-1: een reeks foto\'s en omschrijvingen waarmee je op de werf visueel beoordeelt wat er nog op het staal zit. Bij ',
            { text: 'industriële schilderwerken', to: '/' },
            ' staat die code in elke specificatie, omdat de levensduur van een coating sterk afhangt van de ondergrond.',
          ],
        },
        { type: 'h2', text: 'Wat betekenen de reinheidsgraden?' },
        {
          type: 'table',
          caption: 'De reinheidsgraden uit ISO 8501-1, samengevat. Sa staat voor stralen, St voor handmatig of mechanisch reinigen.',
          headers: ['Graad', 'Omschrijving', 'Wat je ziet'],
          rows: [
            ['Sa 1', 'Licht stralen', 'Losse walshuid, roest en verf weg; vastzittende resten blijven'],
            ['Sa 2', 'Grondig stralen', 'Meeste walshuid, roest en verf weg; wat overblijft zit vast'],
            ['Sa 2½', 'Zeer grondig stralen', 'Alleen nog lichte schaduwen of strepen'],
            ['Sa 3', 'Stralen tot visueel schoon staal', 'Egaal metalen uiterlijk, geen resten'],
            ['St 2', 'Grondig handmatig of mechanisch', 'Geen losse roest, verf of walshuid meer'],
            ['St 3', 'Zeer grondig handmatig of mechanisch', 'Als St 2, maar verder gereinigd tot een metallische glans'],
          ],
        },
        {
          type: 'p',
          text: 'De norm beoordeelt ook de beginstaat van het staal, met roestgraden A tot D. Die letter hoort bij de foto: Sa 2½ op staal met walshuid ziet er anders uit dan Sa 2½ op staal met putcorrosie. Op de werf vergelijk je dus altijd met de foto van dezelfde beginstaat.',
        },
        { type: 'h2', text: 'Wat betekent Sa 2,5?' },
        {
          type: 'p',
          text: 'Sa 2,5, ook geschreven als Sa 2½, is de meest gevraagde graad in de industrie. Het staal is zeer grondig gestraald: walshuid, roest en coating zijn weg, en wat overblijft zijn hooguit lichte schaduwen of strepen. Bij inwendige tank linings en zware industriële systemen is dit doorgaans het minimum. Sa 3 gaat nog een stap verder en wordt vooral gevraagd voor metalliseren en sommige hoogwaardige linings. Het kost merkbaar meer tijd dan Sa 2½, dus vraag het alleen als het datablad het nodig heeft.',
        },
        {
          type: 'image',
          src: '/images/tank-blasting-sa25.jpg',
          width: 1200,
          height: 900,
          alt: 'Vers gestraalde onderste wandring in een opslagtank, blank staal tot reinheidsgraad Sa 2½',
          caption: 'Vers gestraald staal onderaan een tankwand: Sa 2½ tekent zich scherp af tegen de nog te stralen wand erboven.',
        },
        { type: 'h2', text: 'Wat is het verschil tussen St 2 en St 3?' },
        {
          type: 'p',
          text: 'Beide graden gelden voor handmatig of mechanisch reinigen, met onder meer schraapgereedschap, staalborstels of schuurschijven. St 2 vraagt dat alle losse walshuid, roest en verf weg zijn. St 3 vraagt hetzelfde, maar veel grondiger, tot het staal een metallische glans krijgt. Let op: mechanisch reinigen maakt het staal niet ruw zoals stralen. Een coating die een straalprofiel nodig heeft, hecht dus niet automatisch op St 3.',
        },
        { type: 'h2', text: 'Welke graad vraag je wanneer?' },
        {
          type: 'table',
          caption: 'Veelvoorkomende toepassingen. Het datablad en de projectspecificatie zijn altijd bepalend.',
          headers: ['Toepassing', 'Gebruikelijke graad'],
          rows: [
            ['Inwendige tank lining', 'Sa 2½, soms Sa 3'],
            ['Nieuwbouw staalconstructie in zware omgeving', 'Sa 2½'],
            ['Metalliseren', 'Sa 3'],
            ['Onderhoud buitenzijde, plaatselijk herstel', 'St 2 of St 3, of plaatselijk stralen'],
            ['Naden en lassen bij renovatie met een tolerant systeem', 'St 2, als het systeem dat toelaat'],
          ],
        },
        { type: 'h2', text: 'En waterstralen? De Wa-graden' },
        {
          type: 'p',
          segments: [
            'Voor reiniging met water onder hoge druk bestaat ISO 8501-4, met de graden Wa 1, Wa 2 en Wa 2½. Daarbovenop komt een graad voor de vliegroest die na het drogen ontstaat: L (licht), M (matig) of H (zwaar). In Amerikaanse specificaties zie je hetzelfde idee als WJ-1 tot WJ-4. Welke vliegroest een primer verdraagt, staat in het datablad. Meer daarover lees je in ons artikel over ',
            { text: 'UHP-waterstralen', to: '/insights/uhp-waterstralen' },
            '.',
          ],
        },
        { type: 'h2', text: 'Wat de reinheidsgraad niet zegt' },
        {
          type: 'p',
          text: 'ISO 8501-1 is een visuele norm. Staal kan er perfect uitzien en toch niet klaar zijn voor de coating. Daarom horen er andere metingen bij:',
        },
        {
          type: 'ul',
          items: [
            'Oplosbare zouten: onzichtbaar, gemeten met de Bresle-methode volgens ISO 8502-6 en -9.',
            'Stof: volgens ISO 8502-3, met een tape op het oppervlak.',
            'Ruwheid: volgens ISO 8503, met een comparator of een meter.',
            'Lassen en randen: de kwaliteit van de voorbereiding volgens ISO 8501-3, met de graden P1 tot P3.',
            'Klimaat: de staaltemperatuur moet minstens 3 °C boven het dauwpunt liggen.',
          ],
        },
        {
          type: 'p',
          segments: [
            'De hele keten leggen we uit in onze gids over ',
            { text: 'oppervlaktevoorbereiding van staal', to: '/insights/steel-surface-preparation' },
            '. Hoe het op de werf gaat, lees je in ',
            { text: 'wat is gritstralen', to: '/insights/gritstralen' },
            '.',
          ],
        },
        { type: 'h2', text: 'Veelgestelde vragen' },
        {
          type: 'faq',
          items: [
            {
              q: 'Wat is de beste reinheidsgraad?',
              a: 'Er is geen beste graad, alleen de graad die het coatingsysteem vraagt. Sa 3 is de zuiverste, maar het kost meer tijd. Voor de meeste zware systemen is Sa 2½ de eis, en bij sommige tolerante onderhoudssystemen volstaat St 2.',
            },
            {
              q: 'Wie controleert de reinheidsgraad?',
              a: 'Dat gebeurt door de eigen kwaliteitscontroleur van de aannemer, vaak aangevuld met een inspecteur van de opdrachtgever of de coatingfabrikant. In het inspectieplan staat wie op welk moment moet tekenen voor vrijgave.',
            },
            {
              q: 'Hoe lang mag gestraald staal blijven liggen voor het coaten?',
              a: 'Zo kort mogelijk. Vers gestraald staal roest snel zodra het vocht ziet. Coat binnen dezelfde shift als dat kan en controleer vlak voor het coaten of de reinheidsgraad nog klopt. Is er vliegroest ontstaan, dan moet er opnieuw gestraald worden.',
            },
            {
              q: 'Geldt ISO 8501-1 ook voor bestaande coatings?',
              a: 'De norm is opgesteld voor onbehandeld staal en staal waarvan de coating volledig is verwijderd. Voor gedeeltelijke voorbereiding van bestaande coatings is er ISO 8501-2, met graden zoals P Sa 2½ en P St 3.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Twijfel over de juiste reinheidsgraad?',
          text: 'Bezorg ons het datablad of de specificatie. Wij bekijken wat er haalbaar is op uw object en hoe we dat aantoonbaar opleveren.',
          buttonLabel: 'Bekijk industrieel stralen',
          to: '/services/industrieel-stralen',
        },
      ],
    },
    EN: {
      title: 'Steel cleanliness grades: Sa 2½, St 2 and St 3 explained',
      metaTitle: 'Steel cleanliness grades: Sa 2.5, St 2 and St 3 | Russo NV',
      description: 'What does Sa 2.5 mean? What is the difference between St 2 and St 3? The cleanliness grades from ISO 8501-1 and when to ask for which.',
      excerpt: 'A coating specification stands or falls with a short code: Sa 2½, St 3 or Wa 2. This is what those codes mean, when you need which grade and why a nicely blasted surface is not necessarily clean enough.',
      category: 'Surface preparation',
      body: [
        {
          type: 'p',
          segments: [
            'The cleanliness grade states how thoroughly steel has been cleaned before the first coat goes on. The standard is ISO 8501-1: a set of photographs and descriptions used on site to judge visually what is still on the steel. In ',
            { text: 'industrial painting', to: '/' },
            ', this code is in every specification, because the service life of a coating depends heavily on the substrate.',
          ],
        },
        { type: 'h2', text: 'What do the cleanliness grades mean?' },
        {
          type: 'table',
          caption: 'The cleanliness grades from ISO 8501-1, summarised. Sa stands for blasting, St for hand or power tool cleaning.',
          headers: ['Grade', 'Description', 'What you see'],
          rows: [
            ['Sa 1', 'Light blast cleaning', 'Loose mill scale, rust and paint gone; firmly adhering residues remain'],
            ['Sa 2', 'Thorough blast cleaning', 'Most mill scale, rust and paint gone; what remains adheres firmly'],
            ['Sa 2½', 'Very thorough blast cleaning', 'Only light shadows or streaks remain'],
            ['Sa 3', 'Blast cleaning to visually clean steel', 'Uniform metallic appearance, no residues'],
            ['St 2', 'Thorough hand or power tool cleaning', 'No loose rust, paint or mill scale left'],
            ['St 3', 'Very thorough hand or power tool cleaning', 'As St 2, but cleaned further to a metallic sheen'],
          ],
        },
        {
          type: 'p',
          text: 'The standard also rates the initial condition of the steel, with rust grades A to D. That letter belongs to the photograph: Sa 2½ on steel with mill scale looks different from Sa 2½ on pitted steel. On site you therefore always compare with the photograph of the same initial condition.',
        },
        { type: 'h2', text: 'What does Sa 2.5 mean?' },
        {
          type: 'p',
          text: 'Sa 2.5, also written Sa 2½, is the most requested grade in industry. The steel has been blasted very thoroughly: mill scale, rust and coating are gone, and what remains is at most light shadows or streaks. For internal tank linings and heavy industrial systems, this is usually the minimum. Sa 3 goes a step further and is mainly requested for thermal spray and some high-end linings. It takes noticeably more time than Sa 2½, so only ask for it when the data sheet needs it.',
        },
        {
          type: 'image',
          src: '/images/tank-blasting-sa25.jpg',
          width: 1200,
          height: 900,
          alt: 'Freshly blasted lower wall ring in a storage tank, bare steel to cleanliness grade Sa 2½',
          caption: 'Freshly blasted steel at the bottom of a tank wall: Sa 2½ stands out sharply against the wall above, still to be blasted.',
        },
        { type: 'h2', text: 'What is the difference between St 2 and St 3?' },
        {
          type: 'p',
          text: 'Both grades apply to hand or power tool cleaning, with scrapers, steel brushes or sanding discs among others. St 2 requires all loose mill scale, rust and paint to be gone. St 3 requires the same but much more thoroughly, until the steel takes on a metallic sheen. Note: mechanical cleaning does not roughen the steel the way blasting does. A coating that needs a blast profile therefore does not automatically adhere on St 3.',
        },
        { type: 'h2', text: 'Which grade do you ask for when?' },
        {
          type: 'table',
          caption: 'Common applications. The data sheet and project specification always decide.',
          headers: ['Application', 'Usual grade'],
          rows: [
            ['Internal tank lining', 'Sa 2½, sometimes Sa 3'],
            ['New-build steel structure in a heavy environment', 'Sa 2½'],
            ['Thermal spray', 'Sa 3'],
            ['Exterior maintenance, local repair', 'St 2 or St 3, or local blasting'],
            ['Seams and welds in refurbishment with a tolerant system', 'St 2, if the system allows it'],
          ],
        },
        { type: 'h2', text: 'And water jetting? The Wa grades' },
        {
          type: 'p',
          segments: [
            'For cleaning with high-pressure water, there is ISO 8501-4, with grades Wa 1, Wa 2 and Wa 2½. On top of that comes a grade for the flash rust that forms after drying: L (light), M (medium) or H (heavy). American specifications express the same idea as WJ-1 to WJ-4. The flash rust a primer tolerates is stated in its data sheet. Read more in our article on ',
            { text: 'UHP water jetting', to: '/insights/uhp-waterstralen' },
            '.',
          ],
        },
        { type: 'h2', text: 'What the cleanliness grade does not tell you' },
        {
          type: 'p',
          text: 'ISO 8501-1 is a visual standard. Steel can look perfect and still not be ready for coating. That is why other measurements belong with it:',
        },
        {
          type: 'ul',
          items: [
            'Soluble salts: invisible, measured with the Bresle method to ISO 8502-6 and -9.',
            'Dust: to ISO 8502-3, with tape on the surface.',
            'Roughness: to ISO 8503, with a comparator or a gauge.',
            'Welds and edges: the quality of preparation to ISO 8501-3, with grades P1 to P3.',
            'Climate: the steel temperature must be at least 3 °C above the dew point.',
          ],
        },
        {
          type: 'p',
          segments: [
            'We explain the whole chain in our guide to ',
            { text: 'steel surface preparation', to: '/insights/steel-surface-preparation' },
            '. How it works on site is covered in ',
            { text: 'what is grit blasting', to: '/insights/gritstralen' },
            '.',
          ],
        },
        { type: 'h2', text: 'Frequently asked questions' },
        {
          type: 'faq',
          items: [
            {
              q: 'What is the best cleanliness grade?',
              a: 'There is no best grade, only the grade the coating system asks for. Sa 3 is the cleanest, but takes more time. For most heavy systems Sa 2½ is the requirement, and for some tolerant maintenance systems St 2 is enough.',
            },
            {
              q: 'Who checks the cleanliness grade?',
              a: 'The contractor’s own quality controller, often joined by an inspector from the client or the coating manufacturer. The inspection plan states who must sign for release at which moment.',
            },
            {
              q: 'How long can blasted steel wait before coating?',
              a: 'As briefly as possible. Freshly blasted steel rusts quickly once it sees moisture. Coat within the same shift if you can, and check just before coating that the grade still holds. If flash rust has formed, it has to be blasted again.',
            },
            {
              q: 'Does ISO 8501-1 also apply to existing coatings?',
              a: 'The standard was written for uncoated steel and steel with the coating fully removed. For partial preparation of existing coatings there is ISO 8501-2, with grades such as P Sa 2½ and P St 3.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Unsure about the right cleanliness grade?',
          text: 'Send us the data sheet or the specification. We will look at what is feasible on your object and how we deliver it demonstrably.',
          buttonLabel: 'See industrial blasting',
          to: '/services/industrieel-stralen',
        },
      ],
    },
  },
  {
    slug: 'corrosieklassen-belgie',
    date: '2026-11-06',
    author: 'Stig Vanmarsenille',
    authorRole: {
      NL: 'NACE Level 2 coating inspector',
      EN: 'NACE Level 2 coating inspector',
    },
    authorBio: {
      NL: 'Stig Vanmarsenille is NACE Level 2 coating inspector bij Russo NV. Hij keurt en begeleidt dagelijks industriële straal- en coatingwerken op de werf, van tankbekleding tot staalconstructies in de petrochemie.',
      EN: 'Stig Vanmarsenille is a NACE Level 2 coating inspector at Russo NV. He inspects and supervises industrial blasting and coating work on site every day, from tank linings to structural steel in petrochemicals.',
    },
    authorUrl: 'https://www.linkedin.com/in/stig-vanmarsenille-747176b9/',
    authorImage: '/images/author-stig.jpg',
    heroImage: '/images/iso-c5-omgeving.jpg',
    heroAlt: {
      NL: 'Vers gecoat tankdak in de haven: industriële atmosfeer, zeelucht en chemie in één omgeving',
      EN: 'Freshly coated tank roof in the port: industrial atmosphere, sea air and chemicals in one environment',
    },
    keywords: {
      NL: ['corrosieklasse België', 'corrosieklasse C5', 'corrosiviteitsklasse', 'ISO 12944-2', 'C3 C4 C5', 'corrosieklasse haven', 'wat is C5 coating'],
      EN: ['corrosivity class Belgium', 'corrosivity class C5', 'ISO 12944-2', 'C3 C4 C5', 'corrosivity class port', 'what is C5 coating'],
    },
    NL: {
      title: 'Corrosieklassen in België: welke klasse geldt op jouw locatie?',
      metaTitle: 'Corrosieklassen België: C3, C4 en C5 per locatie | Russo NV',
      description: 'Welke corrosieklasse volgens ISO 12944 geldt aan de kust, in de haven, in de stad of in het binnenland? Een praktisch overzicht voor België.',
      excerpt: 'De corrosieklasse bepaalt welk coatingsysteem je nodig hebt, maar de norm kent geen kaart van België. Dit is wat wij op de werf gebruiken: de gebruikelijke klasse per type locatie, de waarden uit ISO 12944-2 en wat een locatie zwaarder maakt dan ze lijkt.',
      category: 'Corrosiebescherming',
      body: [
        {
          type: 'p',
          segments: [
            'De corrosieklasse is de eerste keuze in elke specificatie voor staal. Ze bepaalt hoe zwaar het coatingsysteem moet zijn, en dus de kost en de levensduur. Bij ',
            { text: 'industriële schilderwerken', to: '/' },
            ' in België krijgen we vaak dezelfde vraag: welke klasse geldt hier? ISO 12944-2 geeft de definities, maar geen kaart. Daarom zetten we hier op een rij wat op de gebruikelijke Belgische locaties wordt aangehouden.',
          ],
        },
        { type: 'h2', text: 'De corrosieklassen uit ISO 12944-2' },
        {
          type: 'p',
          text: 'De norm deelt de atmosfeer in op basis van hoeveel staal er in het eerste jaar verloren gaat. Dat is dus een meetbare grootheid, geen inschatting:',
        },
        {
          type: 'table',
          caption: 'Massaverlies en diktevermindering van koolstofstaal in het eerste jaar, volgens ISO 12944-2.',
          headers: ['Klasse', 'Corrosiviteit', 'Massaverlies (g/m²)', 'Diktevermindering (µm)', 'Voorbeeld buiten'],
          rows: [
            ['C1', 'Zeer laag', 'Tot 10', 'Tot 1,3', 'Niet van toepassing, alleen binnen'],
            ['C2', 'Laag', '10 tot 200', '1,3 tot 25', 'Lage vervuiling, vooral landelijk'],
            ['C3', 'Gemiddeld', '200 tot 400', '25 tot 50', 'Stad en lichte industrie, kust met weinig zout'],
            ['C4', 'Hoog', '400 tot 650', '50 tot 80', 'Industrie en kust met matig zout'],
            ['C5', 'Zeer hoog', '650 tot 1.500', '80 tot 200', 'Zware industrie en kust met veel zout'],
            ['CX', 'Extreem', '1.500 tot 5.500', '200 tot 700', 'Offshore en extreme industrie'],
          ],
        },
        {
          type: 'p',
          text: 'Voor staal dat ondergedompeld is of in de grond zit, gelden de klassen Im1 tot Im4. Die gaan over water en grond, niet over chemische stoffen in tanks.',
        },
        { type: 'h2', text: 'Welke klasse op welke locatie in België?' },
        {
          type: 'table',
          caption: 'Indicatief overzicht op basis van onze werfervaring. De werkelijke klasse hangt af van het microklimaat en wordt per object vastgelegd.',
          headers: ['Type locatie', 'Gebruikelijke klasse', 'Waarom'],
          rows: [
            ['Kust en haven van Zeebrugge', 'C5', 'Zout uit de zeelucht, veel vocht'],
            ['Haven van Antwerpen', 'C4 tot C5', 'Brak water, vocht en industriële emissies'],
            ['Haven van Gent en kanaalzone', 'C4', 'Industriële omgeving met vocht, hoger bij chemie'],
            ['Chemische sites, ongeacht de regio', 'C5', 'Emissies en lokale condensatie'],
            ['Industriezones in het binnenland', 'C3 tot C4', 'Afhankelijk van de activiteiten rondom'],
            ['Steden, zoals Brussel of Antwerpen buiten de haven', 'C3', 'Stedelijke atmosfeer'],
            ['Landelijk gebied', 'C2 tot C3', 'Lage vervuiling, wel vocht'],
            ['Binnen, verwarmd', 'C1', 'Droog en schoon'],
            ['Binnen, onverwarmd', 'C2', 'Mogelijk condensatie'],
            ['Binnen, productie met vocht', 'C3 tot C4', 'Brouwerijen, wasserijen, voeding'],
          ],
        },
        {
          type: 'image',
          src: '/images/tank-coating-exterior.jpg',
          width: 900,
          height: 1200,
          alt: 'Buitenzijde van een opslagtank na tankcoating, afgewerkt in een wit meerlaagssysteem',
          caption: 'Een tank in de haven staat in een zware omgeving. De buitenzijde krijgt daarom doorgaans een systeem voor C4 of C5.',
        },
        { type: 'h2', text: 'Wat maakt een locatie zwaarder dan ze lijkt?' },
        {
          type: 'ul',
          items: [
            'Afstand tot zee en heersende wind: zout reist mee met de westenwind.',
            'Beschutte zones: regen spoelt zout weg. Onder een dak of een overstek blijft het juist liggen, en daar is de belasting vaak hoger.',
            'Condensatie: koud staal in een warme, vochtige omgeving staat lang nat.',
            'Naburige emissies: een schoorsteen of een laadplaats kan de klasse lokaal een stap verhogen.',
            'Spatwater en kanalen: zones die regelmatig nat worden, vragen een aparte beoordeling.',
          ],
        },
        { type: 'h2', text: 'Hoe bepaal je de klasse echt?' },
        {
          type: 'ol',
          items: [
            'Begin bij de omschrijvingen uit ISO 12944-2 en het type locatie.',
            'Beoordeel elk deel van het object apart. Een dak, een onderzijde en een pijpbrug kunnen verschillen.',
            'Kijk naar wat er al staat. Corrosie op bestaand staal in de buurt is een goede praktijktest.',
            'Twijfel je op een belangrijk project? Dan kun je de corrosiviteit meten met proefplaatjes volgens ISO 9226, zoals ISO 9223 beschrijft. Dat duurt wel een jaar.',
            'Houd bij twijfel de zwaardere klasse aan: het verschil in systeemkost is meestal klein vergeleken met vroegtijdig herschilderen.',
          ],
        },
        {
          type: 'p',
          segments: [
            'Welk systeem bij welke klasse hoort, met laagdiktes en levensduur, leggen we uit in onze gids over ',
            { text: 'corrosiebescherming volgens ISO 12944', to: '/insights/corrosion-protection-iso-12944' },
            '.',
          ],
        },
        { type: 'h2', text: 'Veelgestelde vragen' },
        {
          type: 'faq',
          items: [
            {
              q: 'Wat is een C5-coating?',
              a: 'Dat is een coatingsysteem dat volgens ISO 12944 is getest en opgebouwd voor een omgeving met zeer hoge corrosiviteit, zoals de kust of zware industrie. C5 zegt iets over de omgeving en het systeem samen, en de levensduur hangt ook af van het gekozen levensduurbereik.',
            },
            {
              q: 'Wat betekent C5-M?',
              a: 'C5-M en C5-I zijn oudere aanduidingen voor maritiem en industrieel. Sinds de herziening van 2017 spreekt ISO 12944 gewoon van C5. In oudere specificaties en databladen kom je de oude aanduidingen nog tegen.',
            },
            {
              q: 'Welke corrosieklasse heeft Antwerpen?',
              a: 'Dat hangt af van de plaats. De haven ligt doorgaans op C4 tot C5, door vocht, brak water en industriële emissies. De stad buiten de haven ligt meestal rond C3. Voor een echt object bepaalt het microklimaat de klasse.',
            },
            {
              q: 'Geldt de corrosieklasse ook binnen in een tank?',
              a: 'Nee. De C-klassen gelden voor de atmosfeer. Binnen in een tank bepaalt het opgeslagen product de keuze, en dan kijk je naar de chemische resistentie van de lining, niet naar de corrosieklasse.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Welke klasse en welk systeem voor uw object?',
          text: 'Bezorg ons de locatie, foto\'s en de gewenste levensduur. Wij stellen een systeem voor dat past bij de omgeving en bij de praktijk op de site.',
          buttonLabel: 'Bekijk corrosiebescherming',
          to: '/services/corrosiebescherming',
        },
      ],
    },
    EN: {
      title: 'Corrosivity classes in Belgium: which class applies to your site?',
      metaTitle: 'Corrosivity classes Belgium: C3, C4, C5 by location | Russo NV',
      description: 'Which ISO 12944 corrosivity class applies on the coast, in the port, in the city or inland? A practical overview for Belgium, with the values from the standard.',
      excerpt: 'The corrosivity class decides which coating system you need, but the standard has no map of Belgium. This is what we use on site: the usual class per type of location, the values from ISO 12944-2 and what makes a location heavier than it looks.',
      category: 'Corrosion protection',
      body: [
        {
          type: 'p',
          segments: [
            'The corrosivity class is the first choice in any specification for steel. It decides how heavy the coating system must be, and so the cost and the service life. In ',
            { text: 'industrial painting', to: '/' },
            ' in Belgium we often get the same question: which class applies here? ISO 12944-2 gives the definitions, but no map. So here we list what is commonly used at typical Belgian locations.',
          ],
        },
        { type: 'h2', text: 'The corrosivity classes from ISO 12944-2' },
        {
          type: 'p',
          text: 'The standard classifies the atmosphere by how much steel is lost in the first year. So it is a measurable quantity, not an estimate:',
        },
        {
          type: 'table',
          caption: 'Mass loss and thickness loss of carbon steel in the first year, according to ISO 12944-2.',
          headers: ['Class', 'Corrosivity', 'Mass loss (g/m²)', 'Thickness loss (µm)', 'Outdoor example'],
          rows: [
            ['C1', 'Very low', 'Up to 10', 'Up to 1.3', 'Not applicable, indoors only'],
            ['C2', 'Low', '10 to 200', '1.3 to 25', 'Low pollution, mainly rural'],
            ['C3', 'Medium', '200 to 400', '25 to 50', 'Urban and light industry, coast with low salt'],
            ['C4', 'High', '400 to 650', '50 to 80', 'Industry and coast with moderate salt'],
            ['C5', 'Very high', '650 to 1,500', '80 to 200', 'Heavy industry and coast with high salt'],
            ['CX', 'Extreme', '1,500 to 5,500', '200 to 700', 'Offshore and extreme industry'],
          ],
        },
        {
          type: 'p',
          text: 'For submerged or buried steel, classes Im1 to Im4 apply. Those concern water and soil, not chemicals in tanks.',
        },
        { type: 'h2', text: 'Which class at which location in Belgium?' },
        {
          type: 'table',
          caption: 'Indicative overview based on our site experience. The actual class depends on the microclimate and is set per object.',
          headers: ['Type of location', 'Usual class', 'Why'],
          rows: [
            ['Coast and Port of Zeebrugge', 'C5', 'Salt from sea air, much moisture'],
            ['Port of Antwerp', 'C4 to C5', 'Brackish water, moisture and industrial emissions'],
            ['Port of Ghent and canal zone', 'C4', 'Industrial environment with moisture, higher near chemicals'],
            ['Chemical sites, whatever the region', 'C5', 'Emissions and local condensation'],
            ['Inland industrial zones', 'C3 to C4', 'Depends on the activities around'],
            ['Cities, such as Brussels or Antwerp outside the port', 'C3', 'Urban atmosphere'],
            ['Rural areas', 'C2 to C3', 'Low pollution, but moisture'],
            ['Indoors, heated', 'C1', 'Dry and clean'],
            ['Indoors, unheated', 'C2', 'Possible condensation'],
            ['Indoors, production with moisture', 'C3 to C4', 'Breweries, laundries, food'],
          ],
        },
        {
          type: 'image',
          src: '/images/tank-coating-exterior.jpg',
          width: 900,
          height: 1200,
          alt: 'Exterior of a storage tank after tank coating, finished in a white multi-coat system',
          caption: 'A tank in the port stands in a heavy environment. The exterior therefore usually gets a system for C4 or C5.',
        },
        { type: 'h2', text: 'What makes a location heavier than it looks?' },
        {
          type: 'ul',
          items: [
            'Distance to the sea and prevailing wind: salt travels with the westerly wind.',
            'Sheltered zones: rain washes salt away. Under a roof or an overhang it stays put, and the load there is often higher.',
            'Condensation: cold steel in a warm, humid environment stays wet for a long time.',
            'Nearby emissions: a stack or a loading point can raise the class locally by a step.',
            'Splash water and canals: zones that get wet regularly need a separate assessment.',
          ],
        },
        { type: 'h2', text: 'How do you really determine the class?' },
        {
          type: 'ol',
          items: [
            'Start with the descriptions in ISO 12944-2 and the type of location.',
            'Assess each part of the object separately. A roof, an underside and a pipe bridge can differ.',
            'Look at what is already there. Corrosion on existing steel nearby is a good practical test.',
            'In doubt on an important project? You can measure corrosivity with test coupons to ISO 9226, as ISO 9223 describes. That does take a year.',
            'When in doubt, keep to the heavier class: the difference in system cost is usually small compared with early repainting.',
          ],
        },
        {
          type: 'p',
          segments: [
            'Which system belongs to which class, with film thicknesses and service life, is covered in our guide to ',
            { text: 'corrosion protection to ISO 12944', to: '/insights/corrosion-protection-iso-12944' },
            '.',
          ],
        },
        { type: 'h2', text: 'Frequently asked questions' },
        {
          type: 'faq',
          items: [
            {
              q: 'What is a C5 coating?',
              a: 'A coating system tested and built up to ISO 12944 for an environment with very high corrosivity, such as the coast or heavy industry. C5 says something about the environment and the system together, and the service life also depends on the chosen durability range.',
            },
            {
              q: 'What does C5-M mean?',
              a: 'C5-M and C5-I are older designations for marine and industrial. Since the 2017 revision, ISO 12944 simply speaks of C5. You will still meet the old designations in older specifications and data sheets.',
            },
            {
              q: 'Which corrosivity class does Antwerp have?',
              a: 'It depends on the place. The port is usually C4 to C5, because of moisture, brackish water and industrial emissions. The city outside the port is mostly around C3. For a real object, the microclimate decides the class.',
            },
            {
              q: 'Does the corrosivity class apply inside a tank?',
              a: 'No. The C classes apply to the atmosphere. Inside a tank the stored product decides the choice, and you look at the chemical resistance of the lining, not at the corrosivity class.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Which class and system for your object?',
          text: 'Send us the location, photos and the required service life. We will propose a system that suits the environment and the practice on site.',
          buttonLabel: 'See corrosion protection',
          to: '/services/corrosiebescherming',
        },
      ],
    },
  },
  {
    slug: 'uhp-waterstralen',
    date: '2026-11-06',
    author: 'Stig Vanmarsenille',
    authorRole: {
      NL: 'NACE Level 2 coating inspector',
      EN: 'NACE Level 2 coating inspector',
    },
    authorBio: {
      NL: 'Stig Vanmarsenille is NACE Level 2 coating inspector bij Russo NV. Hij keurt en begeleidt dagelijks industriële straal- en coatingwerken op de werf, van tankbekleding tot staalconstructies in de petrochemie.',
      EN: 'Stig Vanmarsenille is a NACE Level 2 coating inspector at Russo NV. He inspects and supervises industrial blasting and coating work on site every day, from tank linings to structural steel in petrochemicals.',
    },
    authorUrl: 'https://www.linkedin.com/in/stig-vanmarsenille-747176b9/',
    authorImage: '/images/author-stig.jpg',
    heroImage: '/images/uhp-robot.jpg',
    heroAlt: {
      NL: 'Waterstraalrobot met afzuigslang, op de grens tussen de oude coating en het gereinigde oppervlak',
      EN: 'Water jetting robot with extraction hose, on the line between the old coating and the cleaned surface',
    },
    keywords: {
      NL: ['UHP waterstralen', 'hogedruk waterstralen', 'wat is UHP', 'waterjetting', 'coating verwijderen', 'vliegroest', 'hydrojetten', 'Wa 2½'],
      EN: ['UHP water jetting', 'high-pressure water jetting', 'what is UHP', 'hydroblasting', 'coating removal', 'flash rust', 'WJ-2', 'Wa 2½'],
    },
    NL: {
      title: 'UHP-waterstralen: coating verwijderen zonder grit',
      metaTitle: 'UHP-waterstralen: coating verwijderen zonder grit | Russo NV',
      description: 'Wat is UHP-waterstralen, wanneer is het beter dan gritstralen en wat betekent vliegroest voor de primer? De methode, de normen en de robots.',
      excerpt: 'Met water onder extreem hoge druk haal je oude coating en zouten van staal, zonder grit en zonder stof. Dit is hoe UHP-waterstralen werkt, wanneer het de betere keuze is en waar je op moet letten bij de primer.',
      category: 'Oppervlaktevoorbereiding',
      body: [
        {
          type: 'p',
          segments: [
            'UHP staat voor ultra high pressure: water onder een druk van ruim 2.000 bar, dat oude coating, roest en vervuiling van het staal blaast zonder straalmiddel. Bij ',
            { text: 'industriële schilderwerken', to: '/' },
            ' aan bestaande tanks en constructies is het een volwaardig alternatief voor gritstralen, vooral waar stof en afval een probleem zijn.',
          ],
        },
        { type: 'h2', text: 'Wat is het verschil tussen de drukklassen?' },
        {
          type: 'table',
          caption: 'Veelgebruikte indeling. Vanaf 700 bar spreekt men van waterstralen. Waar UHP begint, verschilt per norm en fabrikant: je vindt grenzen van 1.400 tot 2.100 bar.',
          headers: ['Methode', 'Druk', 'Waarvoor'],
          rows: [
            ['Reinigen onder lage druk', 'Tot ongeveer 340 bar', 'Zout, vuil en losse delen afspoelen'],
            ['Hogedruk waterreinigen', 'Ongeveer 340 tot 700 bar', 'Grondig reinigen, losse coating verwijderen'],
            ['Hogedruk waterstralen', 'Vanaf 700 bar', 'Vastzittende coating verwijderen, roest deels'],
            ['UHP-waterstralen', 'Ruim 2.000 bar', 'Harde coatings en roest verwijderen tot op het staal'],
          ],
        },
        { type: 'h2', text: 'Wanneer is waterstralen beter dan gritstralen?' },
        {
          type: 'table',
          caption: 'De twee methodes naast elkaar',
          headers: ['', 'UHP-waterstralen', 'Gritstralen'],
          rows: [
            ['Afval', 'Water en coatingresten, geen grit', 'Grote hoeveelheid grit met coatingresten'],
            ['Stof', 'Vrijwel geen', 'Afscherming en afzuiging nodig'],
            ['Oplosbare zouten', 'Wast ze ook uit putjes', 'Kan zouten achterlaten of inslaan'],
            ['Ruwheidsprofiel', 'Maakt geen nieuw profiel, gebruikt het bestaande', 'Maakt een nieuw profiel'],
            ['Nieuw staal met walshuid', 'Niet geschikt', 'Geschikt'],
            ['Vliegroest', 'Ontstaat na het drogen, wordt beoordeeld', 'Te vermijden, opnieuw stralen'],
          ],
        },
        {
          type: 'p',
          segments: [
            'Waterstralen is dus vooral sterk bij renovatie: staal dat al eerder gestraald is, een oude coating die weg moet en een omgeving waar grit moeilijk ligt. Voor nieuwbouwstaal met walshuid of een systeem dat een nieuw profiel vraagt, blijft ',
            { text: 'gritstralen', to: '/insights/gritstralen' },
            ' de juiste methode.',
          ],
        },
        { type: 'h2', text: 'Welke normen gelden, en wat betekent WJ-2?' },
        {
          type: 'p',
          segments: [
            'ISO 8501-4 beschrijft waterstralen met de graden Wa 1, Wa 2 en Wa 2½, vergelijkbaar met de ',
            { text: 'reinheidsgraden voor stralen', to: '/insights/reinheidsgraden-staal' },
            '. Amerikaanse specificaties, die je ook in Europa tegenkomt, gebruiken WJ-1 tot WJ-4, waarbij WJ-1 de zuiverste is. Daarbij hoort telkens een graad voor de vliegroest: L, M of H.',
          ],
        },
        { type: 'h2', text: 'Vliegroest: de grootste valkuil' },
        {
          type: 'p',
          text: 'Nat gereinigd staal roest licht zodra het droogt. Dat is normaal en die vliegroest wordt beoordeeld, maar de primer moet er wel tegen kunnen. Het datablad zegt welke graad is toegestaan: de ene primer vraagt L, de andere verdraagt M. Als de graad op de werf hoger is dan de primer toelaat, heb je een probleem dat je pas later ziet. Plan daarom de primer vlak achter het waterstralen, controleer de vliegroest voor het aanbrengen en leg dit vast in het inspectieplan.',
        },
        {
          type: 'callout',
          title: 'Controlepunten vlak voor de primer',
          items: [
            'Graad volgens de specificatie, bijvoorbeeld Wa 2½ of WJ-2.',
            'Vliegroest niet hoger dan het datablad toelaat, op de zwaarste plek.',
            'Staal droog en minstens 3 °C boven het dauwpunt.',
            'Oplosbare zouten gemeten en onder de limiet.',
            'Geen losse coatingresten aan randen en overlappen.',
          ],
        },
        { type: 'h2', text: 'Met de hand of met een robot?' },
        {
          type: 'p',
          segments: [
            'Grote, vlakke tankwanden lenen zich goed voor een robot die zich met magneten op de staalwand vastzet. Dat werkt gelijkmatig, houdt de operator op afstand en vangt een deel van het water op. Lassen, hoeken, verstevigingen en aansluitingen blijven doorgaans handwerk met de lans, door opgeleide operators. Robotisch hydrojetten zetten we onder meer in voor de buitenzijde bij de ',
            { text: 'tankrenovatie van Sea Tank Terminal in Antwerpen', to: '/projects/tankrenovatie-sea-tank-terminal-antwerpen' },
            ': 15 opslagtanks op een terminal die bleef draaien.',
          ],
        },
        { type: 'h2', text: 'Waar moet je verder op letten?' },
        {
          type: 'ul',
          items: [
            'Water: het afvalwater bevat coatingresten. Afspraken over opvang en afvoer horen in de planning.',
            'Veiligheid: de terugslag en de waterstraal zelf zijn gevaarlijk. Werk met opgeleide operators, afgebakende zones en een vergunning van de site.',
            'Aangrenzende installaties: elektrische kasten, isolatie en leidingen moeten worden afgeschermd.',
            'Weer: wind en koude bepalen hoe snel het staal droogt, en dus hoeveel vliegroest er ontstaat.',
          ],
        },
        { type: 'h2', text: 'Veelgestelde vragen' },
        {
          type: 'faq',
          items: [
            {
              q: 'Wat is UHP?',
              a: 'UHP staat voor ultra high pressure. Het gaat om waterstralen onder zeer hoge druk, doorgaans boven 2.000 bar, waarmee harde coatings en roest worden verwijderd zonder straalmiddel. De exacte ondergrens verschilt per norm en fabrikant.',
            },
            {
              q: 'Verwijdert waterstralen ook zouten?',
              a: 'Ja, en dat is een van de grootste voordelen. Water lost zouten op, ook in putjes waar stralen ze soms achterlaat. Ook na het waterstralen meten we de oplosbare zouten, omdat de limiet uit de specificatie gehaald moet worden.',
            },
            {
              q: 'Hecht een coating op waterstraalwerk?',
              a: 'Ja, als het staal al een ruwheidsprofiel heeft en de primer geschikt is voor waterstraalwerk en de optredende vliegroest. Dat staat in het datablad van de primer en wordt het best vooraf met de fabrikant afgestemd.',
            },
            {
              q: 'Is UHP-waterstralen goedkoper dan gritstralen?',
              a: 'Dat hangt af van het project. De uitvoering vraagt specifiek materieel, maar er is geen grit om aan te voeren en af te voeren. Op grote renovaties met oude coatings kan dat in de totale kost een groot verschil maken.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Een oude coating te verwijderen?',
          text: 'Bezorg ons de staat van de bestaande coating, de oppervlakte en het nieuwe systeem. Wij bekijken welke methode past, gritstralen of waterstralen, en wat dat betekent voor de planning.',
          buttonLabel: 'Bekijk tankcoating',
          to: '/services/tankcoating',
        },
      ],
    },
    EN: {
      title: 'UHP water jetting: removing coatings without grit',
      metaTitle: 'UHP water jetting: removing coatings without grit | Russo NV',
      description: 'What is UHP water jetting, when is it better than grit blasting and what does flash rust mean for the primer? The method, the standards and the robots.',
      excerpt: 'Water at extremely high pressure strips old coating and salts from steel, without grit and without dust. This is how UHP water jetting works, when it is the better choice and what to watch for with the primer.',
      category: 'Surface preparation',
      body: [
        {
          type: 'p',
          segments: [
            'UHP stands for ultra high pressure: water at well over 2,000 bar that blasts old coating, rust and contamination off the steel without any abrasive. In ',
            { text: 'industrial painting', to: '/' },
            ' of existing tanks and structures, it is a full alternative to grit blasting, especially where dust and waste are a problem.',
          ],
        },
        { type: 'h2', text: 'What is the difference between the pressure classes?' },
        {
          type: 'table',
          caption: 'Commonly used division. From 700 bar it is called water jetting. Where UHP starts differs per standard and manufacturer: you will find limits from 1,400 to 2,100 bar.',
          headers: ['Method', 'Pressure', 'What for'],
          rows: [
            ['Low-pressure cleaning', 'Up to about 340 bar', 'Rinsing off salt, dirt and loose parts'],
            ['High-pressure water cleaning', 'About 340 to 700 bar', 'Thorough cleaning, removing loose coating'],
            ['High-pressure water jetting', 'From 700 bar', 'Removing firmly adhering coating, partly rust'],
            ['UHP water jetting', 'Well over 2,000 bar', 'Removing hard coatings and rust down to the steel'],
          ],
        },
        { type: 'h2', text: 'When is water jetting better than grit blasting?' },
        {
          type: 'table',
          caption: 'The two methods side by side',
          headers: ['', 'UHP water jetting', 'Grit blasting'],
          rows: [
            ['Waste', 'Water and coating residue, no grit', 'Large volume of grit with coating residue'],
            ['Dust', 'Virtually none', 'Shielding and extraction needed'],
            ['Soluble salts', 'Washes them out of pits as well', 'Can leave or drive in salts'],
            ['Roughness profile', 'Creates no new profile, uses the existing one', 'Creates a new profile'],
            ['New steel with mill scale', 'Not suitable', 'Suitable'],
            ['Flash rust', 'Forms after drying, is assessed', 'To be avoided, blast again'],
          ],
        },
        {
          type: 'p',
          segments: [
            'Water jetting is therefore mainly strong in refurbishment: steel that has been blasted before, an old coating that has to go and an environment where grit is difficult. For new steel with mill scale or a system that needs a new profile, ',
            { text: 'grit blasting', to: '/insights/gritstralen' },
            ' remains the right method.',
          ],
        },
        { type: 'h2', text: 'Which standards apply, and what does WJ-2 mean?' },
        {
          type: 'p',
          segments: [
            'ISO 8501-4 describes water jetting with grades Wa 1, Wa 2 and Wa 2½, comparable with the ',
            { text: 'cleanliness grades for blasting', to: '/insights/reinheidsgraden-staal' },
            '. American specifications, which you also meet in Europe, use WJ-1 to WJ-4, with WJ-1 the cleanest. Each comes with a grade for the flash rust: L, M or H.',
          ],
        },
        { type: 'h2', text: 'Flash rust: the biggest pitfall' },
        {
          type: 'p',
          text: 'Wet-cleaned steel rusts lightly as soon as it dries. That is normal and the flash rust is assessed, but the primer has to be able to handle it. The data sheet states the permitted grade: one primer asks for L, another tolerates M. If the grade on site is higher than the primer allows, you have a problem you only see later. So plan the primer right behind the water jetting, check the flash rust before application and record this in the inspection plan.',
        },
        {
          type: 'callout',
          title: 'Checkpoints just before the primer',
          items: [
            'Grade according to the specification, for example Wa 2½ or WJ-2.',
            'Flash rust no higher than the data sheet allows, at the worst spot.',
            'Steel dry and at least 3 °C above the dew point.',
            'Soluble salts measured and below the limit.',
            'No loose coating residue at edges and overlaps.',
          ],
        },
        { type: 'h2', text: 'By hand or with a robot?' },
        {
          type: 'p',
          segments: [
            'Large, flat tank walls lend themselves well to a robot that holds onto the steel wall with magnets. It works evenly, keeps the operator at a distance and captures part of the water. Welds, corners, stiffeners and connections usually remain hand work with the lance, by trained operators. We used robotic hydro-jetting for the exterior in the ',
            { text: 'tank refurbishment at Sea Tank Terminal in Antwerp', to: '/projects/tankrenovatie-sea-tank-terminal-antwerpen' },
            ': 15 storage tanks on a terminal that kept running.',
          ],
        },
        { type: 'h2', text: 'What else should you watch for?' },
        {
          type: 'ul',
          items: [
            'Water: the waste water contains coating residue. Agreements on collection and disposal belong in the planning.',
            'Safety: the recoil and the water jet itself are dangerous. Work with trained operators, marked-off zones and a site permit.',
            'Adjacent installations: electrical cabinets, insulation and piping have to be shielded.',
            'Weather: wind and cold decide how quickly the steel dries, and so how much flash rust forms.',
          ],
        },
        { type: 'h2', text: 'Frequently asked questions' },
        {
          type: 'faq',
          items: [
            {
              q: 'What is UHP?',
              a: 'UHP stands for ultra high pressure. It means water jetting at very high pressure, usually above 2,000 bar, which removes hard coatings and rust without an abrasive. The exact lower limit differs per standard and manufacturer.',
            },
            {
              q: 'Does water jetting also remove salts?',
              a: 'Yes, and that is one of its biggest advantages. Water dissolves salts, also in pits where blasting sometimes leaves them. We still measure soluble salts after water jetting, because the limit in the specification has to be met.',
            },
            {
              q: 'Does a coating adhere to water-jetted steel?',
              a: 'Yes, if the steel already has a roughness profile and the primer is suitable for water jetting and the flash rust that occurs. That is stated in the primer data sheet and is best agreed with the manufacturer beforehand.',
            },
            {
              q: 'Is UHP water jetting cheaper than grit blasting?',
              a: 'That depends on the project. It needs specific equipment, but there is no grit to bring in and dispose of. On large refurbishments with old coatings, that can make a big difference in the total cost.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'An old coating to remove?',
          text: 'Send us the condition of the existing coating, the area and the new system. We will look at which method fits, grit blasting or water jetting, and what that means for the planning.',
          buttonLabel: 'See tank coating',
          to: '/services/tankcoating',
        },
      ],
    },
  },
  {
    slug: 'soorten-industriele-coatings',
    date: '2026-11-06',
    author: 'Stig Vanmarsenille',
    authorRole: {
      NL: 'NACE Level 2 coating inspector',
      EN: 'NACE Level 2 coating inspector',
    },
    authorBio: {
      NL: 'Stig Vanmarsenille is NACE Level 2 coating inspector bij Russo NV. Hij keurt en begeleidt dagelijks industriële straal- en coatingwerken op de werf, van tankbekleding tot staalconstructies in de petrochemie.',
      EN: 'Stig Vanmarsenille is a NACE Level 2 coating inspector at Russo NV. He inspects and supervises industrial blasting and coating work on site every day, from tank linings to structural steel in petrochemicals.',
    },
    authorUrl: 'https://www.linkedin.com/in/stig-vanmarsenille-747176b9/',
    authorImage: '/images/author-stig.jpg',
    heroImage: '/images/tank-spray.jpg',
    heroAlt: {
      NL: 'Applicateur in beschermpak spuit een coating airless aan in een tank',
      EN: 'Applicator in a protective suit spraying a coating airless in a tank',
    },
    keywords: {
      NL: ['soorten industriële coatings', 'industriële coatings', 'coating voor staal', 'epoxy coating', 'polyurethaan coating', 'zinksilicaat', 'polysiloxaan', 'zinkrijke primer'],
      EN: ['types of industrial coatings', 'industrial coatings', 'coating for steel', 'epoxy coating', 'polyurethane coating', 'zinc silicate', 'polysiloxane', 'zinc-rich primer'],
    },
    NL: {
      title: 'Soorten industriële coatings: epoxy, polyurethaan, zink en meer',
      metaTitle: 'Soorten industriële coatings: welke voor staal? | Russo NV',
      description: 'Epoxy, polyurethaan, zinksilicaat, polysiloxaan of vinylester? De soorten industriële coatings naast elkaar, met hun sterktes en zwaktes.',
      excerpt: 'Een industriële coating is geen emmer verf maar een keuze per laag. Dit zijn de gangbare soorten, waar elk type sterk in is, waar het faalt en hoe je tot een systeem komt dat past bij de omgeving en de ondergrond.',
      category: 'Coatings',
      body: [
        {
          type: 'p',
          segments: [
            'Een industriële coating is een laag die staal of beton moet beschermen tegen corrosie, chemie, slijtage of hitte. Kleur is daarbij bijzaak. Bij ',
            { text: 'industriële schilderwerken', to: '/' },
            ' kies je daarom niet één product, maar een opbouw van lagen die elk een eigen taak hebben. Welk type waar past, hangt af van de omgeving, de ondergrond en wat er tijdens de uitvoering haalbaar is.',
          ],
        },
        { type: 'h2', text: 'De soorten naast elkaar' },
        {
          type: 'table',
          caption: 'De gangbare soorten industriële coatings. Het datablad van het gekozen product blijft bepalend.',
          headers: ['Type', 'Sterk in', 'Zwak in', 'Typische plaats'],
          rows: [
            ['Zinkrijke epoxy', 'Zink offert zich op bij beschadiging; goede hechting', 'Vraagt goed gestraald staal; geen eindlaag', 'Primer in zware omgevingen'],
            ['Zinksilicaat', 'Hard, slijtvast en bestand tegen hoge temperaturen', 'Kritische uitharding; poreus, dus een hechtlaag bij overlagen', 'Primer op leidingen en warme delen'],
            ['Epoxy', 'Hechting, water en chemie', 'Verkrijt onder UV; hardt traag uit bij kou', 'Tussenlaag, binnenzijde, onder water'],
            ['Epoxy mastic', 'Verdraagt een minder perfecte ondergrond; dik in één gang', 'Minder belastbaar dan een systeem op Sa 2½', 'Onderhoud waar stralen niet kan'],
            ['Epoxy fenolisch of novolac', 'Solventen, zuren en hogere temperaturen', 'Strikte applicatie, soms nabehandeling met warmte', 'Tank linings'],
            ['Polyurethaan', 'Kleur en glans onder UV; slijtvast', 'Vochtgevoelig bij applicatie; isocyanaten vragen bescherming', 'Eindlaag buiten'],
            ['Polysiloxaan', 'Zeer lang kleur- en glansbehoud', 'Hogere prijs; vraagt ervaring', 'Eindlaag waar onderhoud duur is'],
            ['Alkyd', 'Eenvoudig en voordelig, één component', 'Niet voor chemie, onderdompeling of zware omgevingen', 'Lichte omgevingen'],
            ['Acryl op waterbasis', 'Weinig oplosmiddel, droogt snel', 'Beperkte belastbaarheid', 'Binnen en lichte omgevingen buiten'],
            ['Vinylester en glasvlok', 'Zware chemische en mechanische belasting', 'Hoge eisen aan voorbereiding en applicatie', 'Zware chemie, tankbodems'],
            ['Brandwerende coating', 'Zwelt op bij brand en vertraagt de opwarming van staal', 'Geen corrosiebescherming op zich', 'Constructiestaal'],
          ],
        },
        { type: 'h2', text: 'Waarom een coating altijd een systeem is' },
        {
          type: 'p',
          text: 'Elke laag heeft een eigen taak. De primer zorgt voor hechting en, bij zinkrijke types, voor actieve bescherming. De tussenlaag bouwt de dikte op en vormt de barrière. De eindlaag vangt het weer, de UV en de mechanische belasting op. Daarom testen fabrikanten systemen als geheel. Een laag vervangen door een ander product of merk is niet zonder risico: de lagen moeten compatibel zijn en binnen het overlaaginterval worden aangebracht.',
        },
        {
          type: 'p',
          segments: [
            'Een voorbeeld uit de praktijk: bij de ',
            { text: 'silorenovatie van Albeton', to: '/projects/silo-renovatie-albeton' },
            ' kregen kale en geroeste plekken eerst een plaatselijke primer, daarna volgde een volledige tussenlaag en tot slot een polyurethaan eindlaag.',
          ],
        },
        { type: 'h2', text: 'Hoe kies je de juiste coating?' },
        {
          type: 'ol',
          items: [
            'Omgeving: bepaal de corrosieklasse van de atmosfeer, of het product waarmee de coating in contact komt.',
            'Temperatuur: gewone systemen houden op bij hogere bedrijfstemperaturen. Leidingen en warme tanks vragen een aparte keuze.',
            'Ondergrond: kan er gestraald worden, of blijft het bij mechanisch reinigen? Dat beperkt de keuze meteen.',
            'Uitvoering: seizoen, luchtvochtigheid, overlaagtijden en de toegang op de site beslissen mee over welk product haalbaar is.',
            'Levensduur en onderhoud: een duurder systeem verdient zich terug op plaatsen waar stilstand of toegang veel kost.',
          ],
        },
        {
          type: 'p',
          segments: [
            'Voor de atmosfeer vertrek je van de ',
            { text: 'corrosieklassen in België', to: '/insights/corrosieklassen-belgie' },
            '. Voor contact met producten kijk je naar de ',
            { text: 'chemische bestendigheid van coatings', to: '/insights/chemische-bestendigheid-coatings' },
            '. En voor de ondergrond bepalen de ',
            { text: 'reinheidsgraden van staal', to: '/insights/reinheidsgraden-staal' },
            ' wat er mogelijk is.',
          ],
        },
        { type: 'h2', text: 'De fouten die we het vaakst zien' },
        {
          type: 'ul',
          items: [
            'Epoxy als eindlaag buiten gebruiken. De bescherming blijft, maar de laag verkrijt en verkleurt snel in de zon.',
            'Een zware coating op een slechte ondergrond zetten. Het duurste product kan geen slechte voorbereiding goedmaken.',
            'De overlaagtijd overschrijden. De volgende laag hecht dan onvoldoende, tenzij er eerst wordt opgeruwd of gereinigd.',
            'Merken en types mengen zonder de compatibiliteit te controleren.',
            'Alleen naar de prijs per liter kijken. De kost zit in de uitvoering en in de levensduur, niet in het blik.',
          ],
        },
        { type: 'h2', text: 'Veelgestelde vragen' },
        {
          type: 'faq',
          items: [
            {
              q: 'Wat is het verschil tussen een coating en verf?',
              a: 'In de industrie wordt met coating een technische beschermlaag bedoeld, met een getest systeem, voorgeschreven laagdiktes en een controle. Verf verwijst meestal naar een afwerking met vooral een esthetisch doel. Chemisch lopen ze deels in elkaar over, het verschil zit in de eisen.',
            },
            {
              q: 'Wat is de beste coating voor staal?',
              a: 'Die bestaat niet los van de toepassing. Buiten in een zware omgeving is een zinkrijke primer met een epoxy tussenlaag en een polyurethaan eindlaag een veelgebruikte opbouw. Binnen in een tank gelden andere regels, want daar bepaalt het opgeslagen product de keuze.',
            },
            {
              q: 'Waarom krijgt epoxy buiten een poederige laag?',
              a: 'UV-straling breekt het oppervlak van epoxy af, waardoor het gaat verkrijten en verkleuren. De bescherming eronder blijft meestal intact, maar het ziet er niet goed uit en de volgende laag moet op een gereinigd oppervlak komen. Daarom krijgt epoxy buiten doorgaans een UV-bestendige eindlaag.',
            },
            {
              q: 'Hoe lang gaat een industriële coating mee?',
              a: 'Dat hangt af van de omgeving, het systeem en de voorbereiding. ISO 12944 werkt met levensduurbereiken tot meer dan 25 jaar voor de zwaarste systemen, als ontwerpverwachting en niet als garantie. Inspectie en plaatselijk herstel rekken die periode.',
            },
            {
              q: 'Kan een coating ook op beton?',
              a: 'Ja, maar beton vraagt andere voorbereiding en vaak andere producten dan staal. Vocht in het beton, cementhuid en scheuren bepalen de aanpak, en bij silo\'s of tankputten komt daar vaak herstel van het beton zelf bij.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Welke coating past bij uw object?',
          text: 'Bezorg ons de omgeving, de ondergrond en de gewenste levensduur. Wij stellen een systeem voor dat in de praktijk uitvoerbaar is op uw site.',
          buttonLabel: 'Bekijk onze diensten',
          to: '/services',
        },
      ],
    },
    EN: {
      title: 'Types of industrial coatings: epoxy, polyurethane, zinc and more',
      metaTitle: 'Types of industrial coatings: which for steel? | Russo NV',
      description: 'Epoxy, polyurethane, zinc silicate, polysiloxane or vinyl ester? The types of industrial coatings side by side, with their strengths and weaknesses.',
      excerpt: 'An industrial coating is not a bucket of paint but a choice per layer. These are the common types, what each is strong at, where it fails and how to arrive at a system that suits the environment and the substrate.',
      category: 'Coatings',
      body: [
        {
          type: 'p',
          segments: [
            'An industrial coating is a layer that has to protect steel or concrete against corrosion, chemicals, wear or heat. Colour is secondary. In ',
            { text: 'industrial painting', to: '/' },
            ' you therefore do not choose one product, but a build-up of layers that each have their own job. Which type fits where depends on the environment, the substrate and what is feasible during application.',
          ],
        },
        { type: 'h2', text: 'The types side by side' },
        {
          type: 'table',
          caption: 'The common types of industrial coatings. The data sheet of the chosen product always decides.',
          headers: ['Type', 'Strong in', 'Weak in', 'Typical place'],
          rows: [
            ['Zinc-rich epoxy', 'Zinc sacrifices itself on damage; good adhesion', 'Needs well-blasted steel; no finish coat', 'Primer in heavy environments'],
            ['Zinc silicate', 'Hard, wear-resistant and heat-resistant', 'Critical curing; porous, so a tie coat when overcoating', 'Primer on piping and hot parts'],
            ['Epoxy', 'Adhesion, water and chemicals', 'Chalks under UV; cures slowly in the cold', 'Intermediate coat, interiors, submerged'],
            ['Epoxy mastic', 'Tolerates a less perfect substrate; thick in one pass', 'Less resistant than a system on Sa 2½', 'Maintenance where blasting is not possible'],
            ['Phenolic or novolac epoxy', 'Solvents, acids and higher temperatures', 'Strict application, sometimes post-curing with heat', 'Tank linings'],
            ['Polyurethane', 'Colour and gloss under UV; wear-resistant', 'Moisture-sensitive during application; isocyanates need protection', 'Finish coat outdoors'],
            ['Polysiloxane', 'Very long colour and gloss retention', 'Higher price; needs experience', 'Finish coat where maintenance is expensive'],
            ['Alkyd', 'Simple and affordable, one component', 'Not for chemicals, immersion or heavy environments', 'Light environments'],
            ['Waterborne acrylic', 'Little solvent, dries quickly', 'Limited resistance', 'Indoors and light outdoor environments'],
            ['Vinyl ester and glass flake', 'Heavy chemical and mechanical load', 'High demands on preparation and application', 'Heavy chemicals, tank floors'],
            ['Fireproof coating', 'Swells in a fire and slows the heating of steel', 'No corrosion protection in itself', 'Structural steel'],
          ],
        },
        { type: 'h2', text: 'Why a coating is always a system' },
        {
          type: 'p',
          text: 'Every layer has its own job. The primer provides adhesion and, with zinc-rich types, active protection. The intermediate coat builds thickness and forms the barrier. The finish coat takes the weather, UV and mechanical load. That is why manufacturers test systems as a whole. Replacing a layer with another product or brand is not without risk: the layers have to be compatible and applied within the overcoating interval.',
        },
        {
          type: 'p',
          segments: [
            'An example from practice: in the ',
            { text: 'Albeton silo renovation', to: '/projects/silo-renovatie-albeton' },
            ', bare and rusted spots first received a local primer, followed by a full intermediate coat and finally a polyurethane finish coat.',
          ],
        },
        { type: 'h2', text: 'How do you choose the right coating?' },
        {
          type: 'ol',
          items: [
            'Environment: determine the corrosivity class of the atmosphere, or the product the coating comes into contact with.',
            'Temperature: ordinary systems stop at higher operating temperatures. Piping and hot tanks need a separate choice.',
            'Substrate: can it be blasted, or is it limited to mechanical cleaning? That narrows the choice straight away.',
            'Application: season, humidity, overcoating times and access on site help decide which product is feasible.',
            'Service life and maintenance: a more expensive system pays for itself where downtime or access costs a lot.',
          ],
        },
        {
          type: 'p',
          segments: [
            'For the atmosphere, start from the ',
            { text: 'corrosivity classes in Belgium', to: '/insights/corrosieklassen-belgie' },
            '. For contact with products, look at the ',
            { text: 'chemical resistance of coatings', to: '/insights/chemische-bestendigheid-coatings' },
            '. And for the substrate, the ',
            { text: 'steel cleanliness grades', to: '/insights/reinheidsgraden-staal' },
            ' determine what is possible.',
          ],
        },
        { type: 'h2', text: 'The mistakes we see most often' },
        {
          type: 'ul',
          items: [
            'Using epoxy as a finish coat outdoors. The protection stays, but the layer chalks and discolours quickly in the sun.',
            'Putting a heavy coating on a poor substrate. The most expensive product cannot make up for poor preparation.',
            'Exceeding the overcoating time. The next layer then does not adhere well enough, unless it is first roughened or cleaned.',
            'Mixing brands and types without checking compatibility.',
            'Looking only at the price per litre. The cost is in the application and the service life, not in the can.',
          ],
        },
        { type: 'h2', text: 'Frequently asked questions' },
        {
          type: 'faq',
          items: [
            {
              q: 'What is the difference between a coating and paint?',
              a: 'In industry, a coating means a technical protective layer, with a tested system, specified film thicknesses and inspection. Paint usually refers to a finish with a mainly aesthetic purpose. Chemically they partly overlap, the difference is in the requirements.',
            },
            {
              q: 'What is the best coating for steel?',
              a: 'It does not exist apart from the application. Outdoors in a heavy environment, a zinc-rich primer with an epoxy intermediate coat and a polyurethane finish is a widely used build-up. Inside a tank other rules apply, because the stored product decides the choice.',
            },
            {
              q: 'Why does epoxy get a powdery layer outdoors?',
              a: 'UV radiation breaks down the surface of epoxy, so it chalks and discolours. The protection underneath usually stays intact, but it does not look good and the next layer has to go on a cleaned surface. That is why epoxy outdoors usually gets a UV-resistant finish coat.',
            },
            {
              q: 'How long does an industrial coating last?',
              a: 'That depends on the environment, the system and the preparation. ISO 12944 uses durability ranges up to more than 25 years for the heaviest systems, as a design expectation and not a guarantee. Inspection and local repair extend that period.',
            },
            {
              q: 'Can a coating also go on concrete?',
              a: 'Yes, but concrete needs different preparation and often different products than steel. Moisture in the concrete, laitance and cracks determine the approach, and silos or tank pits often also need repair of the concrete itself.',
            },
          ],
        },
        {
          type: 'cta',
          title: 'Which coating suits your object?',
          text: 'Send us the environment, the substrate and the required service life. We will propose a system that is feasible in practice on your site.',
          buttonLabel: 'See our services',
          to: '/services',
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

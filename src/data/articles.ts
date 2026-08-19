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
    heroImage: '/images/tank-lining-hero.jpg',
    heroAlt: {
      NL: 'Binnenzijde van een opslagtank tijdens tankliningwerken: gestraalde tankbodem en afgeschermde zones door Russo NV',
      EN: 'Inside a storage tank during tank lining works: blasted tank floor and protected zones by Russo NV',
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
            { text: 'industriële schilderwerken', to: '/services/industriele-schilderwerken' },
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
            { text: 'industriële schilderwerken', to: '/services/industriele-schilderwerken' },
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

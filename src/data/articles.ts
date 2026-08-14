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
          text: 'Russo NV delivers blasting, surface preparation and industrial coatings to VCA and ISO standards, with measured cleanliness grades and controlled surface profiles. Request a no-obligation quote or advice.',
          buttonLabel: 'Request a quote',
          to: '/contact',
        },
      ],
    },
  },
  {
    slug: 'tank-coating-lining',
    date: '2026-08-14',
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
    heroImage: '/images/tank-lining-hero.jpg',
    heroAlt: {
      NL: 'Binnenzijde van een opslagtank tijdens tank lining werken: gestraalde tankbodem en afgeschermde zones door Russo NV',
      EN: 'Inside a storage tank during tank lining works: blasted tank floor and protected zones by Russo NV',
    },
    keywords: {
      NL: ['tankcoating', 'tank lining', 'tankbekleding', 'opslagtank coaten', 'epoxy tankcoating', 'holiday detectie', 'ISO 8501-1', 'chemische resistentie'],
      EN: ['tank coating', 'tank lining', 'storage tank coating', 'epoxy tank lining', 'holiday testing', 'ISO 8501-1', 'chemical resistance'],
    },
    NL: {
      title: 'Tankcoating en tank lining: zo wordt een opslagtank duurzaam beschermd',
      metaTitle: 'Tankcoating en tank lining: de complete gids | Russo NV',
      description: 'Hoe wordt een opslagtank vanbinnen en vanbuiten beschermd? Van straalwerk en zoutmetingen tot het liningsysteem, laagdiktes en holiday detectie, volgens ISO en NACE.',
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
            'Binnen: chemisch resistente systemen, doorgaans epoxy fenolisch of epoxy novolac, aangebracht in een of twee lagen tot 300 à 500 µm droge laagdikte.',
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
            ['Voeding en drinkwater', 'Gecertificeerde epoxy (o.a. KTW, WRAS)', 'Certificaat en volledige uitharding'],
            ['Hoge temperatuur of wisselende lading', 'Epoxy novolac, glass flake versterkt', 'Thermische cycli en schokbelasting'],
          ],
        },
        { type: 'h2', text: 'De uitvoering, stap voor stap' },
        { type: 'h3', text: '1. Gasvrij maken, reinigen en inspecteren' },
        {
          type: 'p',
          text: 'Een tank is een besloten ruimte: gasvrijmeting, ventilatie en vergunningen komen vóór alles. Daarna wordt productresidu verwijderd en de staat van bodem, wand en lasnaden beoordeeld. Putcorrosie of bodemvervorming moet nu aan het licht komen, niet na het stralen.',
        },
        { type: 'h3', text: '2. Stralen tot Sa 2½ of Sa 3' },
        {
          type: 'p',
          segments: [
            'Voor immersiedienst schrijven fabrikanten reinheidsgraad Sa 2½ tot Sa 3 voor, met een hoekig straalprofiel afgestemd op de laagdikte. Hoe dat stralen precies in zijn werk gaat, van reinheidsgraden tot straalprofiel, lees je in onze gids over ',
            { text: 'staal voorbereiden voor coating', to: '/insights/steel-surface-preparation' },
            '. In een tank komt daar één factor bij: al het straalstof moet er ook weer uit, tot de laatste gram.',
          ],
        },
        { type: 'h3', text: '3. Oplosbare zouten meten' },
        {
          type: 'p',
          text: 'Chloriden en sulfaten op het staal trekken later vocht door de coating heen (osmose) en zijn in immersiedienst dé verborgen faalfactor. We meten ze met de Bresle-methode volgens ISO 8502, en reinigen en meten opnieuw tot de waarde onder de grens van de fabrikant ligt, doorgaans 20 tot 50 mg/m² afhankelijk van het product.',
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
          text: 'In een gesloten tank bepaal je het klimaat zelf. Met droging en ventilatie houden we de relatieve vochtigheid laag en het staal boven het dauwpunt, zodat er geen flash rust ontstaat tussen stralen en coaten. Klimaatdata worden doorlopend gelogd, van eerste straalbeurt tot laatste laag.',
        },
        { type: 'h3', text: '5. Stripe coats en applicatie' },
        {
          type: 'p',
          text: 'Lasnaden, hoeken en bouten krijgen eerst een handmatige stripe coat: precies op die plekken trekt een gespoten laag zich dun. Daarna wordt het systeem airless gespoten in gecontroleerde banen tot de voorgeschreven laagdikte, met natte-laagdiktemetingen tijdens het werk en droge-laagdiktemetingen (DFT) na uitharding van elke laag.',
        },
        { type: 'h2', text: 'Kwaliteitscontrole vóór ingebruikname' },
        {
          type: 'ul',
          items: [
            'Droge laagdikte (DFT): gemeten volgens een vast raster over bodem en wand; het gemiddelde én de minima moeten binnen spec liggen.',
            'Holiday detectie (vonktest): een hoogspanningstest die elke porie of pinhole in de lining opspoort. In immersiedienst is één gemiste porie voldoende voor doorroest, dus deze test is niet onderhandelbaar.',
            'Hechting en uitharding: adhesietesten en controle van de uithardingsgraad vóór de tank weer in dienst gaat.',
            'Rapportage: alle metingen (klimaat, zouten, profiel, DFT, vonktest) in één inspectiedossier voor eigenaar en inspecteur.',
          ],
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
            'Niet elke tank hoeft meteen volledig opnieuw bekleed te worden. Bij lokale schade kan spotrepair een volwaardige oplossing zijn: de zones worden plaatselijk gestraald (bijvoorbeeld met vacustralen, zonder gritverspreiding), de randen aangeschuurd en het systeem laag per laag hersteld tot de originele laagdikte. Is de lining op leeftijd, breed onthecht of chemisch aangetast, dan is volledig herbekleden de enige duurzame keuze. Bekijk onze ',
            { text: 'gerealiseerde tankprojecten', to: '/projects' },
            ' om te zien hoe beide aanpakken er in de praktijk uitzien.',
          ],
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
              a: 'Een professioneel aangebrachte tank lining gaat doorgaans 10 tot 20 jaar mee, afhankelijk van het opgeslagen product, de temperatuur en het aantal productwissels. Periodieke inspectie (visueel en met laagdiktemetingen) verlengt de levensduur, omdat lokale schade dan hersteld wordt vóór er onderroest ontstaat.',
            },
            {
              q: 'Wat is holiday detectie of een vonktest?',
              a: 'Een holiday test spoort onzichtbare poriën en pinholes in een coating op met een hoogspanningselektrode. Op elke plek waar de lining onderbroken is, slaat een vonk over naar het geleidende staal. In immersiedienst is deze test essentieel: één gemiste porie volstaat voor lokale doorroest van de tankwand.',
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
        { type: 'h2', text: 'Hulp nodig bij uw tankproject?' },
        {
          type: 'cta',
          title: 'Tankbescherming volgens de norm',
          text: 'Russo NV verzorgt tankcoating en tank lining van straalwerk tot vonktest, volgens VCA- en ISO-normen en met een volledig meetdossier bij oplevering. Vraag vrijblijvend een offerte of advies aan.',
          buttonLabel: 'Vraag een offerte aan',
          to: '/contact',
        },
      ],
    },
    EN: {
      title: 'Tank coating and tank lining: how storage tanks get lasting protection',
      metaTitle: 'Tank coating and tank lining: the complete guide | Russo NV',
      description: 'How is a storage tank protected inside and out? From blasting and salt testing to lining systems, film thickness and holiday testing, to ISO and NACE standards.',
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
            'Interior: chemically resistant systems, typically epoxy phenolic or epoxy novolac, applied in one or two coats to 300 to 500 µm dry film thickness.',
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
          headers: ['Stored product', 'Typical lining system', 'Point of attention'],
          rows: [
            ['Diesel, gas oil, fuel oil', 'Epoxy (standard or phenolic)', 'Conductivity and static charge'],
            ['Chemicals and solvents', 'Epoxy novolac or phenolic', 'Manufacturer resistance list is binding'],
            ['Process water, firefighting water', 'Solvent-free epoxy', 'Osmosis resistance'],
            ['Food and drinking water', 'Certified epoxy (e.g. KTW, WRAS)', 'Certification and full cure'],
            ['High temperature or changing cargo', 'Epoxy novolac, glass flake reinforced', 'Thermal cycling and impact'],
          ],
        },
        { type: 'h2', text: 'The execution, step by step' },
        { type: 'h3', text: '1. Gas-freeing, cleaning and inspection' },
        {
          type: 'p',
          text: 'A tank is a confined space: gas-free measurement, ventilation and permits come before anything else. Product residue is then removed and the condition of floor, shell and weld seams is assessed. Pitting corrosion or floor deformation must surface now, not after blasting.',
        },
        { type: 'h3', text: '2. Blasting to Sa 2½ or Sa 3' },
        {
          type: 'p',
          segments: [
            'For immersion service, manufacturers specify cleanliness grade Sa 2½ to Sa 3, with an angular blast profile matched to the film thickness. How that blasting works in detail, from cleanliness grades to surface profile, is covered in our guide on ',
            { text: 'preparing steel for coating', to: '/insights/steel-surface-preparation' },
            '. Inside a tank one extra factor applies: every gram of blast dust has to come back out as well.',
          ],
        },
        { type: 'h3', text: '3. Measuring soluble salts' },
        {
          type: 'p',
          text: 'Chlorides and sulphates on the steel later draw moisture through the coating (osmosis) and are the hidden failure factor in immersion service. We measure them with the Bresle method to ISO 8502, then clean and re-measure until the value sits below the manufacturer limit, typically 20 to 50 mg/m² depending on the product.',
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
        { type: 'h3', text: '5. Stripe coats and application' },
        {
          type: 'p',
          text: 'Weld seams, corners and bolts first receive a manual stripe coat: exactly where a sprayed film pulls thin. The system is then airless-sprayed in controlled passes to the specified thickness, with wet film measurements during the work and dry film thickness (DFT) checks after each coat has cured.',
        },
        { type: 'h2', text: 'Quality control before the tank returns to service' },
        {
          type: 'ul',
          items: [
            'Dry film thickness (DFT): measured on a fixed grid across floor and shell; both the average and the minima must be within spec.',
            'Holiday detection (spark testing): a high-voltage test that finds every pore or pinhole in the lining. In immersion service a single missed pore is enough for through-rusting, so this test is non-negotiable.',
            'Adhesion and cure: adhesion tests and cure verification before the tank is returned to service.',
            'Reporting: all measurements (climate, salts, profile, DFT, spark test) in one inspection dossier for owner and inspector.',
          ],
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
              a: 'A professionally applied tank lining typically lasts 10 to 20 years, depending on the stored product, temperature and the number of cargo changes. Periodic inspection (visual plus film thickness measurements) extends that life, because local damage gets repaired before under-rusting can develop.',
            },
            {
              q: 'What is holiday detection or spark testing?',
              a: 'A holiday test finds invisible pores and pinholes in a coating using a high-voltage electrode. Wherever the lining is interrupted, a spark jumps to the conductive steel. In immersion service this test is essential: one missed pore is enough for local through-rusting of the tank shell.',
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
              a: 'Yes. With local damage the zones are blasted locally, the edges of the existing coating are feathered and the original system is rebuilt coat by coat to the specified thickness, followed by a new spark test on the repaired zones. The condition is that the surrounding lining still adheres well.',
            },
          ],
        },
        { type: 'h2', text: 'Need help with your tank project?' },
        {
          type: 'cta',
          title: 'Tank protection to the standard',
          text: 'Russo NV delivers tank coating and tank lining from blasting to spark testing, to VCA and ISO standards, with a complete measurement dossier at handover. Request a no-obligation quote or advice.',
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

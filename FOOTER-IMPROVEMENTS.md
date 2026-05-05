# Footer — Pending Improvements

Audit list captured during the contact-page polish session. Saved here so the
list survives across conversations. Each item links to the file/line where the
issue lives.

## Bugs / dead links

1. **Privacy Policy and Terms of Service link to non-existent routes** —
   `src/components/Footer.tsx:162,168`. RESOLVED in the same session that saved
   this list — `/privacy` and `/terms` now exist as placeholder pages. Remove
   this item once pages have lawyer-reviewed content.
2. **Social links go to generic homepages** — `src/components/Footer.tsx:28,37,46`.
   `https://facebook.com`, `https://linkedin.com`, `https://instagram.com` are
   scaffolding placeholders. Replace with the company's real profile URLs, or
   hide the social block until profiles exist.
3. **Footer location is stale** — `src/components/Footer.tsx:108-111`. Shows
   "Antwerp" via `t('footer', 'location')`. The HQ address was updated to
   "Taxandriastraat 35, 2170 Antwerp" on the contact page. Footer should match.
4. **Translation key typo** — `src/components/Footer.tsx:68` uses
   `industrieServed` (missing the s). Should be `industriesServed`.

## Higher-impact

5. **Wix-hosted logo** — `src/components/Footer.tsx:17`. Same pattern we've
   migrated everywhere else. Logo loads on every page (header + footer); local
   optimized version saves a request from every page load.
6. **`/safety` missing from Quick Links** — `src/components/Footer.tsx:60-76`.
   Route exists, header nav has it, footer skips it.
7. **Contact details hardcoded and duplicated** —
   `src/components/Footer.tsx:106,115,119,128`. Phone `+32 475 43 48 19` and
   email `info@russonv.be` are duplicated in `ContactPage.tsx` constants. Move
   to a shared `src/lib/contact.ts` so changes in one place propagate everywhere.

## Lower-impact / polish

8. **Three duplicate service anchors** — `src/components/Footer.tsx:88-89`. Three
   of the six entries point to `sandblastingAbrasive` because the ServicesPage
   doesn't have dedicated entries for "surface preparation" or "coat removal".
   Either drop the duplicates or add real services to the CMS.
9. **Footer location not linked to Google Maps** —
   `src/components/Footer.tsx:108-111`. Made clickable on `/contact` already;
   same affordance here lets visitors get directions from any page.
10. **Contact column not wrapped in `<address>`** —
    `src/components/Footer.tsx:103-132`. Done on `/contact`; same semantic
    upgrade applies here.
11. **Certifications are 4 hardcoded divs** —
    `src/components/Footer.tsx:139-150`. Should be a `.map()` over a data array.
12. **Logo `<Image>` missing `height`** — `src/components/Footer.tsx:16-21`.
    Has `width={200}` but no height; browser can't reserve space → CLS on slow
    connections.
13. **Mixed heading levels** — `src/components/Footer.tsx`. Section titles use
    `<h3>` but the certifications heading uses `<h4>`. Should all be `<h3>`.
14. **Social icons not grouped semantically** —
    `src/components/Footer.tsx:26-54`. Three `<a>` tags inside a `<div>`. Should
    live inside `<nav aria-label="Social media">` or a `<ul>`.
15. **No "Back to top" button** — optional polish for long pages
    (Industries, Projects).
16. **Logo `<Link>` has no `aria-label`** —
    `src/components/Footer.tsx:15`. Screen readers fall back to the inner
    image's alt; explicit `aria-label="Russo NV - Home"` is clearer.

## Suggested batch when revisiting

Routine batch (low risk, all match patterns we've established elsewhere):
**#3, #4, #5, #6, #7, #10, #11, #12, #13, #14**.

Confirm before touching:
- **#1** is partially resolved (pages now exist; full resolution = lawyer-
  reviewed content).
- **#2** needs the actual social profile URLs from the user.
- **#9** is trivial once confirmed the user wants it.
- **#15** is purely optional polish.

# Footer — Improvements Tracker

Audit list captured during the contact-page polish session.

## ✅ Resolved

1. ~~Privacy Policy and Terms of Service link to non-existent routes~~ —
   `/privacy` and `/terms` placeholder pages now exist.
2. ~~Social links go to generic homepages~~ — LinkedIn and Instagram now
   point at the real Russo NV profiles. Facebook removed (no profile yet).
3. ~~Footer location is stale~~ — now shows
   "Taxandriastraat 35, 2170 Antwerp" and matches `/contact`.
4. ~~Translation key typo `industrieServed`~~ — renamed to
   `industriesServed` (EN + NL).
5. ~~Wix-hosted logo~~ — migrated to local `/images/logo.png` (12KB,
   400x279 from a 4167x2902 source).
6. ~~`/safety` missing from Quick Links~~ — added.
9. ~~Footer location not linked to Google Maps~~ — clickable, plus a
   dedicated "Open in Google Maps →" affordance.
10. ~~Contact column not wrapped in `<address>`~~ — wrapped with
    `not-italic` to override the UA italic styling.
11. ~~Certifications hardcoded as 4 divs~~ — now a `.map()` over a
    static array.
12. ~~Logo `<Image>` missing height~~ — set to `height={140}` based on
    the source image's 1.49:1 aspect ratio at width=200.
13. ~~Mixed heading levels~~ — certifications heading is now `<h3>`
    matching the four section titles.
14. ~~Social icons not in `<nav>`~~ — wrapped in
    `<nav aria-label="Social media">`.
15. ~~No "Back to top" button~~ — added to the bottom bar alongside
    the privacy / terms links.
16. ~~Logo `<Link>` missing `aria-label`~~ — set to "Russo NV - Home".

## 🟡 Kept as-is by user choice

7. **Phone + email duplicated from ContactPage** — user prefers them
   duplicated rather than centralized in `src/lib/contact.ts`. Skipped.
8. **Three service entries link to the same `sandblastingAbrasive`
   anchor** — user wants to keep the duplicate links in the footer
   service list. Skipped.

## 📋 Still open

_(empty — every flagged item has either been resolved or explicitly
deferred by the user.)_

## Header logo

Note: the Header still uses a separate Wix-hosted JPG
(`3232e5_648f8bcac8bf401c8bdff7a7ca3f4923~mv2.jpg`) — different
file from the footer logo. Worth migrating in the same pattern when
revisiting the header.

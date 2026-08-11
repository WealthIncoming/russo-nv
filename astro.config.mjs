// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// Self-hosted build: standard Astro, static output, no Wix tooling.
// https://astro.build/config
export default defineConfig({
  output: "static",
  // Emit pages as `path.html` instead of `path/index.html`. Cloudflare Pages
  // then serves /path directly (and 308s /path/ → /path), which finally agrees
  // with the canonicals, hreflang and sitemap that have always said no-slash.
  // Before this, Pages 308'd no-slash → slash while the page's canonical said
  // no-slash: a circular signal Google flagged in GSC as competing URLs.
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [tailwind(), react()],
  image: {
    // CMS images still reference the Wix CDN until we localise them.
    domains: ["static.wixstatic.com"],
  },
});

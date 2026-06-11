// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// Self-hosted build: standard Astro, static output, no Wix tooling.
// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [tailwind(), react()],
  image: {
    // CMS images still reference the Wix CDN until we localise them.
    domains: ["static.wixstatic.com"],
  },
});

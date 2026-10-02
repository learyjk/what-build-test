import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  // Leave `base` unset. Webflow Cloud injects the environment mount path
  // at build time; local development and Codespaces use "/".
  output: "server",
  compressHTML: true,
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  })
});

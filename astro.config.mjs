// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// `site` is what the sitemap and canonical URLs are built from, so it must be
// the real deployed origin. Override it with SITE_URL when deploying to a
// different host (a preview deployment, a custom domain).
const site = process.env.SITE_URL ?? 'https://astro-portfolio-oy77-inc-cryps-projects.vercel.app';

// https://astro.build/config
export default defineConfig({
  base: '/',
  site,
  integrations: [react(), tailwind(), sitemap()],
  prefetch: true,

  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
});

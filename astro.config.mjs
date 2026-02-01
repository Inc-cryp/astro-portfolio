// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
  base: '/',
  site: 'https://yourdomain.com', // Replace with your actual domain
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
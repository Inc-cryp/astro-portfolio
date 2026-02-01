// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourdomain.com', // Replace with your actual domain
  integrations: [react(), sitemap()],
  prefetch: true,

  vite: {
    plugins: [tailwindcss()]
  }
});
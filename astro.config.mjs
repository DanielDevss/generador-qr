// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  vite: {
    resolve: {
      alias: {
        "@components": '/src/components',
        "@layouts": '/src/layouts',
        "@assets" : "/src/assets",
        "@icons" : "/src/icons",
      }
    }
  }
});
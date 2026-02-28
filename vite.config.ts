import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Quantenphysik LK Dashboard',
        short_name: 'QuantenLK',
        description: 'Interaktive Lernumgebung für das Quantenphysik LK Abitur',
        theme_color: '#0a0a0f',
        background_color: '#0a0a0f',
        display: 'standalone',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
});

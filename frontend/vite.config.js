// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [commonjs()],
  server: {
    proxy: {
      '/api': {
        target: 'https://evently-km2e.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['@react-oauth/google'],
    },
  },
});




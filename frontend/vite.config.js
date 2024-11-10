import { defineConfig } from 'vite';

export default defineConfig({
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
      external: [
        'firebase/auth', // If you're providing Firebase externally
        '@react-oauth/google', // If using OAuth externally or via CDN
      ],
    },
  },
});





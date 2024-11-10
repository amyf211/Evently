import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';

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
      external: [
        'firebase/auth', // If you're providing Firebase externally
        '@react-oauth/google', // If using OAuth externally or via CDN
      ],
    },
  },
});






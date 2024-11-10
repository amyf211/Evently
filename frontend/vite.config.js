// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://evently-km2e.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
};



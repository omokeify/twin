import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This tells Vite to replace 'process.env.API_KEY' with the actual value 
    // from the Vercel build environment during the build process.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
  },
});
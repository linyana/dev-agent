import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => ({
  plugins: [react()],
  clearScreen: false,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
      '@constants': path.resolve(__dirname, './src/constants'),
    },
  },
  server: {
    port: 48326,
    strictPort: true,
    host: host || false,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
}));

import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '~': path.join(__dirname, './src'),
      '@app-info': path.join(__dirname, './app-info.json'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "~/styles/mixins";@import "~/styles/variables";',
      },
    },
  },
});

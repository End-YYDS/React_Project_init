import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: '0.0.0.0',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/App.tsx'),
      name: process.env.LIB_NAME || 'MyLibrary',
      fileName: process.env.LIB_NAME || 'MyLibrary',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    copyPublicDir: false,
  },
  resolve: {
    alias: {
      '@site': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/Components'),
      '@assets': resolve(__dirname, 'src/Assets'),
      '@constants': resolve(__dirname, 'src/Constants'),
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import federation from '@originjs/vite-plugin-federation';
const exposeName = process.env.LIB_NAME || 'RemoteEntry';
const getExposes = () => {
  return {
    [`./${exposeName}`]: './src/App.tsx',
  };
};
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: process.env.LIB_NAME || 'plugin',
      filename: 'RemoteEntry.js',
      exposes: getExposes(),
      shared: ['react', 'react-dom', 'tailwindcss'],
    }),
  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: false,
    emptyOutDir: true,
    rollupOptions: {
      // input: [], // 不生成 index.html
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names && assetInfo.names[0].endsWith('.css')) {
            return 'assets/[name].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
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

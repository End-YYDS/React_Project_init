import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import federation from '@originjs/vite-plugin-federation';
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
const exposeName = env.VITE_LIB_NAME;
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
      name: `${exposeName}`,
      filename: `${exposeName}.js`,
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
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (
          warning.message.includes('Module "fs" has been externalized') ||
          warning.message.includes('Module "path" has been externalized') ||
          warning.message.includes('Module "os" has been externalized') ||
          warning.message.includes('Module "crypto" has been externalized') ||
          warning.message.includes('Module "util" has been externalized') ||
          warning.message.includes('Module "stream" has been externalized') ||
          warning.message.includes('Module "url" has been externalized') ||
          warning.message.includes('Module "assert" has been externalized') ||
          warning.message.includes('Module "module" has been externalized') ||
          warning.message.includes('Module "process" has been externalized') ||
          warning.message.includes('Module "tty" has been externalized') ||
          warning.message.includes('Module "v8" has been externalized') ||
          warning.message.includes('Module "events" has been externalized') ||
          warning.message.includes('Module "perf_hooks" has been externalized') ||
          warning.message.includes('Module "vm" has been externalized')
        ) {
          return;
        }
        defaultHandler(warning);
      },
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

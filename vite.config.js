import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
//import babel from '@qubit-ltd/vite-plugin-babel';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.js',
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
      script: {
        babelParserPlugins: ['decorators'],
      },
    }),
    //babel(),
  ],
  server: {
    host: 'localhost',
    port: 5173,
    hmr: {
        host: 'localhost',
    },
  },
});

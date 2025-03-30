import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
//import babel from '@qubit-ltd/vite-plugin-babel';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.js',
      // ssr: 'resources/js/ssr.js',
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          ...transformAssetUrls,
          base: null,
          includeAbsolute: false,
        },
      },
      script: {
        babelParserPlugins: ['decorators'],
      },
    }),
    vuetify({ 
      // styles: { 
      //   configFile: 'resources/js/settings.scss'
      // },
      autoImport: { 
        labs: true,
        ignore: [
        ]
      }
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

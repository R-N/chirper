import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
// import babel from 'vite-plugin-babel';
// import commonjsRollup from '@rollup/plugin-commonjs';

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
        babelParserPlugins: ['decorators-legacy'],
      },
    }),
    // // this causes 'require' error
    // babel({
    //   babelConfig: babelConfig
    // }),
  ],
});

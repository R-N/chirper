import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
// import babel from 'vite-plugin-babel';
// import commonjsRollup from '@rollup/plugin-commonjs';
// import commonjsVite from 'vite-plugin-commonjs';
// import babelConfig from './babel.config.cjs';

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
    // // this causes app.css and bootstrap.js no default import warning
    // commonjsVite(),
  ],
  // resolve: {
  //   alias: {
  //     '@': '/resources/js',
  //   },
  // },
  // // this doesn't help
  // optimizeDeps: {
  //   include: ['@inertiajs/vue3', 'dayjs', 'vue-facing-decorator'],
  //   exclude: ['vue'],
  // },
  // // this is unnecessary
  // build: {
  //   outDir: 'public/build',
  //   publicDir: 'public',
  //   // // this causes build to not have manifest.json, error
  //   //manifest: true,
  //   rollupOptions: {
  //     input: 'resources/js/app.js',  // Update the path if needed
  //     external: [],
  //     plugins: [
  //       // // this causes critical import error (openBLock thing) do not use 
  //       // commonjsRollup(), 
  //     ],
  //   },
  // },
  // // this doesn't help
  // esbuildOptions: {
  //   plugins: [
  //     {
  //       name: 'cjs-interop',
  //       setup(build) {
  //         build.onResolve({ filter: /.*/ }, (args) => {
  //           if (args.path.endsWith('.cjs')) {
  //             return { path: args.path, external: true };
  //           }
  //         });
  //       },
  //     },
  //   ],
  // },
});

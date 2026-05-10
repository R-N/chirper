import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import vueDevTools from "vite-plugin-vue-devtools";
import { execSync } from "child_process";
import path from 'path'
import { fileURLToPath, URL } from "url";
//import babel from '@qubit-ltd/vite-plugin-babel';

execSync("php artisan lang:export");
execSync("php artisan validation:export");
execSync("php artisan columns:export");

export default defineConfig(({ command }) => ({
  root: __dirname,
  // base: command === "build" ? "/chirper/" : "/",
  plugins: [
    laravel({
      input: "resources/js/app.js",
      // ssr: 'resources/js/ssr.js',
      refresh: true
    }),
    vue({
      template: {
        transformAssetUrls: {
          ...transformAssetUrls,
          base: null,
          includeAbsolute: false
        }
      },
      script: {
        babelParserPlugins: ["decorators"]
      }
    }),
    vuetify({
      // styles: {
      //   configFile: 'resources/js/settings.scss'
      // },
      autoImport: {
        labs: true,
        ignore: []
      }
    }),
    //babel(),
    vueDevTools()
  ],
  resolve: {
    alias: [
      { find: '/@/', replacement: fileURLToPath(new URL('./resources/js', import.meta.url)) },
      { find: '@', replacement: fileURLToPath(new URL('./resources/js', import.meta.url)) }
      // { find: '/@/', replacement: '/resources/js' },
      // { find: '@', replacement: '/resources/js' }
    ],
  },
  server: {
    host: "localhost",
    port: 5173,
    hmr: {
      host: "localhost"
    }
  },
  build: {
    minify: false,
    sourcemap: true
  }
}));

import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import vueDevTools from "vite-plugin-vue-devtools";
import { execSync } from "child_process";
//import babel from '@qubit-ltd/vite-plugin-babel';

execSync("php artisan lang:export");
execSync("php artisan validation:export");

export default defineConfig({
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
});

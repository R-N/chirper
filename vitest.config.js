import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vue()],
  test: {
    // Default to node; component specs opt into jsdom via a per-file
    // `// @vitest-environment jsdom` docblock.
    environment: "node",
    include: ["resources/js/**/*.spec.js"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./resources/js", import.meta.url)),
      "/@/": fileURLToPath(new URL("./resources/js/", import.meta.url)),
    },
  },
});

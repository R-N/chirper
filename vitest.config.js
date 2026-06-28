import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
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

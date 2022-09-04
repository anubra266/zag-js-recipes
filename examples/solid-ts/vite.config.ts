import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  plugins: [solid()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  resolve: {
    alias: [
      {
        find: /^@zag-js-recipes\/(.*)$/,
        replacement: path.resolve("./node_modules/@zag-js-recipes/$1/src"),
      },
    ],
  },
});

import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import { createRequire } from "node:module";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import remarkMermaidSvg from "./src/lib/remark-mermaid-svg.mjs";
import remarkObsidianCallouts from "./src/lib/remark-obsidian-callouts.mjs";

const require = createRequire(import.meta.url);
const picomatchEntry = createRequire(require.resolve("astro/package.json")).resolve(
  "picomatch",
);

export default defineConfig({
  output: "static",
  site: "https://m-pkw.com",
  vite: {
    plugins: [
      {
        // Astro 7's content sync inlines this CommonJS dependency under Vite 8.
        name: "astro-content-picomatch-interop",
        enforce: "pre",
        resolveId(id) {
          if (id === "picomatch") {
            return "\0astro-content-picomatch-interop";
          }
        },
        load(id) {
          if (id === "\0astro-content-picomatch-interop") {
            return `import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const picomatch = require(${JSON.stringify(picomatchEntry)});
export default picomatch;`;
          }
        },
      },
    ],
  },
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkMermaidSvg, remarkObsidianCallouts],
      rehypePlugins: [[rehypeKatex, { strict: false }]],
    }),
  },
});

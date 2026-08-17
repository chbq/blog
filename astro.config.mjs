import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import remarkObsidianCallouts from "./src/lib/remark-obsidian-callouts.mjs";

export default defineConfig({
  output: "static",
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkObsidianCallouts],
      rehypePlugins: [[rehypeKatex, { strict: false }]],
    }),
  },
});

# Personal Technical Blog

This repository is the implementation workspace for a reading-first personal
technical blog. It is an independent sibling of `personal-knowledge-lab` and
`blog-writing`. The knowledge repository is private reference material;
`blog-writing` is the private Obsidian mother-draft repository.

## Current phase

The repository now renders the first local article projection from `content/`.
The homepage is one chronological writing stream, and article pages support the
Markdown features already used by the mother draft: math and Obsidian-style
callouts. The visual system remains an early reading prototype rather than a
finished site design.

## Authoring and publishing boundary

The repositories have a one-way relationship:

```text
personal-knowledge-lab -> blog-writing -> blog
```

Mother drafts are written in the private `../blog-writing` Obsidian vault. Only
explicitly reviewed Markdown and public assets are copied into this repository.
There is no automatic vault synchronization, knowledge-base publishing, Git
submodule, or symlink between them.

Published articles will form one chronological writing stream. Descriptive
keywords may connect related articles, but the site will not initially divide
writing into research, life, notes, thoughts, or similar sections. The first
version will not include comments or a guestbook.

## Baseline

- Astro 7 with static output
- pnpm 11
- Node.js 22.12 or newer
- no UI framework, CMS, database, authentication, or deployment adapter

This keeps the default output small and content-oriented while leaving room for
isolated interactive diagrams or demos when a real article requires them.

## Commands

```powershell
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Structure

```text
content/
  writing/              # explicitly projected public-preview Markdown
  assets/               # approved public article assets
src/
  content.config.ts     # article metadata and content loader
  layouts/
    BaseLayout.astro
  lib/
    remark-obsidian-callouts.mjs
    writing.ts
  pages/
    index.astro
    writing/[...slug].astro
  styles/
    foundation.css
```

Drafts appear during `pnpm dev`. Production builds omit entries with
`draft: true`; use `pnpm exec astro build --mode preview` when a local static
build should include drafts.

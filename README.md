# Personal Technical Blog

This repository is the implementation workspace for a reading-first personal
technical blog. It is an independent sibling of `personal-knowledge-lab` and
`blog-writing`. The knowledge repository is private reference material;
`blog-writing` is the private Obsidian mother-draft repository.

## Current phase

The repository has a static Astro baseline and a deliberately neutral smoke
page. A public content receiving area now exists under `content/`, but Astro
does not consume it yet. Site design, article rendering, MDX, deployment, and
real posts remain intentionally unimplemented.

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
  writing/              # approved public Markdown; not wired to Astro yet
  assets/               # approved public article assets
src/
  pages/
    index.astro       # temporary build and browser smoke page
  styles/
    foundation.css    # neutral baseline only; not the visual design
```

Add rendering structure only when the first real page or article makes the
requirement concrete.

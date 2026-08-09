# Personal Technical Blog

This repository is the implementation workspace for a reading-first personal
technical blog. It is an independent sibling of `personal-knowledge-lab`; the
knowledge repository is reference material, not a publishing source.

## Current phase

Foundation only. The repository has a static Astro baseline and a deliberately
neutral smoke page. Site design, article structure, content collections, MDX,
deployment, and real posts remain intentionally undecided.

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
src/
  pages/
    index.astro       # temporary build and browser smoke page
  styles/
    foundation.css    # neutral baseline only; not the visual design
```

Add structure only when the first real page or article makes the requirement
concrete.

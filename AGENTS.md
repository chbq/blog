# AGENTS.md

## Scope

This is the independent implementation repository for the personal technical
blog. Work from this repository root for website development.

`../personal-knowledge-lab` is read-only reference unless the user explicitly
requests a change there. Never copy or publish knowledge-lab content
automatically. Prefer the user's current instructions and recent public-facing
materials over older knowledge-repository notes.

## Current phase

The repository contains only a runnable foundation. Do not invent posts,
sections, taxonomy, publishing workflows, CMS features, databases, login,
deployment infrastructure, or speculative abstractions without an explicit
request.

Project Notes and Essays remain two content scales, not separate systems, until
real content proves a need for different handling.

## Commands

- `pnpm dev`: local development server
- `pnpm build`: production build
- `pnpm preview`: preview the production build

## Working rules

- Inspect `git status` before changes and keep unrelated work untouched.
- Add dependencies only for a current, demonstrated requirement.
- Keep the default site static; add client-side JavaScript only where it adds
  real explanatory value.
- Run `pnpm build` after implementation changes.
- Treat `src/pages/index.astro` as a temporary smoke page, not an approved
  homepage design.

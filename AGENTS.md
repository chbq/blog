# AGENTS.md

## Scope

This is the independent implementation repository for the personal technical
blog. Work from this repository root for website development.

`../personal-knowledge-lab` is read-only reference unless the user explicitly
requests a change there. `../blog-writing` is the private Obsidian mother-draft
repository. Never copy or publish content from either repository automatically.
Prefer the user's current instructions and recent public-facing materials over
older knowledge-repository notes.

A Vault manuscript may remain `draft: true` after an earlier version has been
published. The public repository stores only explicitly approved snapshots:
`date` is the immutable first-publication date, `updated` is the latest public
content update, and the public copy uses `draft: false`. Do not derive either
date from filesystem timestamps or Git commits.

## Responsibilities

Website work has two related but distinct responsibilities:

- Site design and implementation owns information architecture, homepage and
  navigation structure, visual language, reading experience, responsive
  behavior, and reusable presentation features.
- Snapshot integration and publication owns importing only an explicitly
  approved public snapshot, translating its routes, metadata, media, and links,
  verifying the real site, and carrying out Git or deployment actions only
  when the user requests them.

If snapshot integration exposes a narrow rendering requirement, implement the
smallest reusable support needed here. Route broader changes to the site's
structure or visual identity back through site-design work instead of letting
publication silently redesign the website.

## Snapshot intake

- Accept only the files and public scope named in the handoff; do not inspect or
  import other private manuscripts for convenience.
- Treat handoff notes as instructions and validation evidence, not as website
  content.
- Preserve explicitly supplied routes and publication dates. Do not silently
  rewrite article substance while adapting Obsidian-specific syntax.
- After integration, verify the production build and the affected pages,
  including metadata, links, formulas, callouts, media, and responsive layout
  as applicable.
- Do not commit, push, or deploy unless the current task explicitly includes
  that action.

## Current phase

The repository contains a runnable reading prototype and a public-preview
content area at `content/`. Do not invent posts, sections, taxonomy, publishing
automation, CMS features, databases, login, deployment infrastructure, or
speculative abstractions without an explicit request.

All articles remain one flat chronological writing stream. Project Notes and
Essays are content scales, not separate systems. Use descriptive keywords
instead of hard sections, and do not add comments or a guestbook to the first
version.

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
- Treat the current homepage and reading styles as the first real-content
  prototype, not a finished visual design.

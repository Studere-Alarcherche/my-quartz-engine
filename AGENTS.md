# AGENTS.md

Canonical Codex operating rules for the Proustian 2.0 Obsidian + Quartz course-garden.

This repository is not a blog, not a generic syllabus, and not a file archive. It is a reader-facing public reading garden built from a private Obsidian working layer.

## Repository Shape

- Repository root: `Proustian/`
- Obsidian opens: `Proustian/content/`
- Quartz publishes from: `Proustian/content/`
- Codex works from the repository root: `Proustian/`
- Canonical Codex instruction file: `AGENTS.md` at repository root.
- Lightweight Obsidian-facing pointer: `content/Codex-Operating-Rules.md`

## Current Route

Path A+ = index-first / open-root / early atlas visibility.

Use flat-file / block-first / packet-based organization for public-facing course pages. Keep the structure open for now.

Do not create a folder-first structure.
Do not create a heavy folder hierarchy.
Do not create nested folders for secondary concepts.
Do not lock secondary concepts into folders.
Do not restructure the whole repo.

## Non-Negotiable Rules

- The Quartz homepage must remain `content/index.md`.
- The filename must be lowercase: `index.md`.
- Do not create `Index.md`.
- Do not create `INDEX.md`.
- Do not create a repo-root `index.md`.
- Do not rename `content/index.md`.
- Do not delete existing content unless explicitly asked.
- Do not rename old files unless necessary and explicitly justified.
- Do not introduce large HTML blocks.
- Do not use inline CSS.
- Do not introduce a folder hierarchy for public course material.

## Public Site Principles

- Proust is the center.
- Deleuze is a method lens, not a top-level topic.
- French is a language precision layer, not a separate course unit.
- Quartz is the public reading garden.
- Obsidian is the private thinking and building layer.
- The site is reader-facing, not student-facing.
- Use reader / visitor / fellow reader / reading path language.
- Avoid student / teacher / classroom / instructor language in public-facing files.
- Public-facing course pages should be in English.
- Internal planning notes may remain in Chinese.

## Content Rules

- Keep Markdown-first.
- Preserve Obsidian wiki links.
- Prefer flat Markdown files under `content/` for public course pages.
- Secondary concepts should be wiki links, not folders.
- Do not rewrite core theoretical claims without approval.
- Do not decide the intellectual thesis.
- Do not turn drafts into polished essays unless asked.
- Do not delete files without approval.

## Current Public Entry Files

These root-level `content/` files are the current public-first V0.1 structure:

- `content/index.md`
- `content/Proustian-2.0.md`
- `content/Course-Thesis.md`
- `content/Six-Units.md`
- `content/Reading-Map.md`
- `content/Question-Gradient.md`
- `content/Minimal-Reading-Packet.md`
- `content/Build-Log.md`
- `content/Constellations.md`
- `content/New-Tendrils.md`
- `content/Warburg-Image-Memory.md`
- `content/Levi-Strauss-Structure-Myth.md`
- `content/Codex-Operating-Rules.md`
- `content/Literature-Importance-Ranking-V0.1.md`
- `content/NotebookLM-Evidence-Packet-Plan.md`

## Keep But Do Not Treat As Public-First

These areas may contain useful working material, older structures, essays, or private planning. Do not delete, move, or promote them without explicit approval:

- `content/00-HQ/`
- `content/01-Atlas/`
- `content/02-Course/`
- `content/03-Modules/`
- `content/04-Readings/`
- `content/05-Constellations/`
- `content/06-Logs/`
- `content/07-Aesthetic/`
- `content/90-Essays/`
- `content/99-Archive/`

## Codex Role

Codex is a structural organizer.

Codex may:
- audit files
- create missing flat scaffold files under `content/`
- normalize simple frontmatter
- update links
- detect duplicate or wrong index files
- suggest archive candidates
- run build checks
- lightly adjust Quartz config and custom.scss when explicitly asked

Codex must not:
- decide the intellectual thesis
- create a heavy folder system
- rewrite the course soul
- delete files
- turn drafts into polished essays unless asked
- change deployment settings unless explicitly requested or clearly safe

## Verification Habits

Before finishing structural work, Codex should check:

- `content/index.md` still exists.
- No `Index.md`, `INDEX.md`, or repo-root `index.md` was created.
- No new folders were created unless explicitly requested.
- Homepage wiki links resolve where possible.
- Public-facing files remain English.
- Public-facing files avoid student / teacher / classroom / instructor language.
- Quartz build passes, or the exact build error is reported.

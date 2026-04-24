# Project Guidelines

## Code Style

- Use TypeScript with path alias `@/*` for imports from `src/*`.
- Prefer named exports and const arrow-function components.
- Keep formatting aligned with Prettier config (single quotes, no semicolons) and Tailwind class ordering.
- Preserve server/client boundaries: default to Server Components, add `'use client'` only when hooks/browser APIs are required.

## Architecture

- Follow clean boundaries in `src/core`:
  - `domain`: models and repository contracts
  - `use-cases`: business logic
  - `infrastructure/notion`: Notion API adapter and mappers
  - `container.ts`: dependency wiring
- Keep Next.js server actions in `src/actions` thin: orchestrate use cases, validate input, and revalidate cache tags.
- Prefer feature-scoped UI in `src/features/*` and shared primitives in `src/components/*`.

## Build And Validation

- Install: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Format check: `npm run format:check`
- Build (also catches many type issues): `npm run build`
- No dedicated test script is currently defined; do not invent one.

## Notion Integration Conventions

- Keep property names/types aligned with the schema in `README.md`.
- `NOTION_DATABASE_ID` must be the database ID from the URL path, not the `v=` view ID.
- If Notion returns `object_not_found`, verify both database ID and integration sharing.
- When extracting Notion create-property builders, annotate return types with `CreatePageProperties` to avoid literal type widening.

## Docs

- Use `README.md` as the source of truth for environment setup, scripts, and database schema.
- Link to existing docs instead of duplicating long instructions.

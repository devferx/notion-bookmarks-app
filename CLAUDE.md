# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Start development server (port 3000)
npm run build         # Production build (also catches type errors)
npm run lint          # Run ESLint
npm run format        # Format with Prettier
npm run format:check  # Check formatting without writing
```

No test framework is configured — do not invent one. Use `npm run build` and `npm run lint` for validation.

## Architecture

This is a Next.js 16 (App Router) bookmark manager that uses **Notion as the primary database** and **Supabase for auth user storage**.

### Clean Architecture in `src/core/`

```
src/core/
├── domain/          # TypeScript models, repository interfaces, custom errors
├── use-cases/       # Business logic orchestration (bookmarks/, auth/)
├── infrastructure/  # External adapters
│   ├── notion/      # Notion API client, repository implementation, mappers
│   └── supabase/    # Supabase auth adapter
└── container.ts     # Dependency injection — wires repositories to use cases
```

**Data flow**: Server action → use case (from `container.ts`) → Notion repository → Notion API.

Server actions (`src/actions/`) must stay thin: validate input, call a use case, revalidate cache tags. Business logic belongs in use cases, not actions.

### Feature Structure

- `src/features/` — feature-scoped UI, hooks, and utilities (auth, bookmarks, navigation)
- `src/components/` — shared primitives (ui/, icons/)
- `src/store/` — Redux Toolkit (sidebar open/close state only)
- `src/actions/` — Next.js server actions

### Auth

NextAuth v5 (beta) with Credentials provider. Config in [src/auth.ts](src/auth.ts). Middleware at [middleware.ts](middleware.ts) protects `/(bookmarks)` routes and redirects unauthenticated users to `/sign-in`. Passwords are hashed with bcryptjs; user records live in Supabase via a custom `get_auth_user_by_email` RPC.

### Notion Integration

Bookmarks map 1:1 to Notion database pages. See `README.md` for the required Notion database schema (properties: Title, URL, Description, Tags, Pinned, Archived, VisitCount, LastVisited, CreatedTime).

- `NOTION_DATABASE_ID` must be the ID from the URL path, not the `v=` view ID.
- Keep Notion property names aligned with the schema in `README.md`.
- When creating Notion page properties, annotate return types with `CreatePageProperties` to prevent literal type widening.
- If Notion returns `object_not_found`, check both the database ID and that the integration has been shared with the database.

## Code Conventions

- **TypeScript path alias**: use `@/*` for all imports from `src/*`.
- **Named exports** and `const` arrow-function components throughout.
- **Server Components by default**; add `'use client'` only when hooks or browser APIs are required.
- Prettier config: single quotes, no semicolons, Tailwind class ordering (`prettier-plugin-tailwindcss`).
- Remote images from `www.gravatar.com/avatar/**` are allowed in `next.config.ts`.

## Required Environment Variables

```
NOTION_API_KEY
NOTION_DATABASE_ID
AUTH_SECRET
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

See `README.md` for full setup instructions and Notion database schema.

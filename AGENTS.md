<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# mavenwifey-next

PWA-style personal website ("Nadita's personal website") with a mobile-first public face and an admin dashboard for blog management.

## Commands

| Command | Action |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint (flat config, v9) |

There is no test runner, no typecheck script, no codegen script.

## Architecture

- **App Router** with two route groups: `src/app/(public)/` (mobile-first PWA) and `src/app/admin/` (dashboard).
- **Supabase** is the backend: auth, database (Postgres), storage.
- **TipTap** rich text editor with custom UI primitives in `src/components/tiptap-*`.
- **shadcn/ui** (`radix-nova` style) — components in `src/components/ui/`, added via `pnpm shadcn add`.
- **Tailwind CSS v4** — uses `@tailwindcss/postcss` (not the legacy PostCSS plugin).
- **Assets** are imported from `src/assets/` (webp, png, jpg for icons/backgrounds).

## Supabase client patterns

Three clients in `src/lib/supabase/`:
- `client.ts` — browser client (`@supabase/ssr`), singleton.
- `server.ts` — server client (`@supabase/ssr`), create per-request (not global).
- `admin.ts` — service-role admin client (`@supabase/supabase-js`), singleton. Uses `SUPABASE_SERVICE_ROLE_KEY`.

Auth middleware in `src/lib/middleware.ts` (called via `src/proxy.ts` with `matcher: ["/admin", "/admin/blog"]`).

Generated type definitions in `src/lib/supabase/supabase-typegen.ts`.

## Key conventions

- **Path alias**: `@/*` → `./src/*`
- **Style helper**: `cn()` from `@/lib/utils` (clsx + tailwind-merge)
- **Enviroment**: `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **SCSS**: global SCSS files in `src/styles/`, declared via `src/scss.d.ts`.
- **CSS**: `globals.css` uses `@import "tailwindcss"` + `@import "tw-animate-css"` + `@import "shadcn/tailwind.css"`.
- **Radius**: set to `0` (sharp corners) in CSS variables.

## Supabase local dev

```bash
supabase start       # start local stack (studio on :54323)
supabase db diff     # generate migration from local changes
supabase migration up # apply pending migrations
```

Supabase config: `supabase/config.toml` (DB v17, local ports 54321-54324).

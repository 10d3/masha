# Portfolio (Next.js + shadcn/ui)

A modern portfolio app scaffold built with:
- Next.js 16 (Turbopack)
- React 19
- TypeScript
- shadcn/ui component system
- Tailwind CSS v4
- Drizzle ORM + PostgreSQL
- Uploadthing file uploads
- TipTap rich editor + markdown/blog integration
- Auth via Better-Auth + bcryptjs
- Responsive layout + fixed top navbar

## Project structure

- `app/` — Next.js app routes and layouts
  - `(public)/layout.tsx` — public site layout includes `Navbar`
  - `dashboard/` — authenticated dashboard pages
  - `api/` — backend API routes:
    - `auth/[...all]` (auth handlers)
    - `posts/` and `projects/` (CRUD REST API)
    - `uploadthing/` (file upload route)
- `components/` — UI components and layout
  - `layout/nav-bar.tsx` — fixed top navbar
  - `shared/` — content sections, blog components, TipTap extensions
  - `ui/` — shadcn/ui components (button, popover, tabs, etc.)
- `lib/` — utilities and auth helpers
  - `auth.ts`, `auth-client.ts`, `auth-guard.ts`
  - `db/` utilities
- `drizzle/` — SQL schema and migrations
- `types/` — TypeScript domain definitions
- `public/` — static assets
- `app/globals.css` — global styles

## Features

- Fixed, sticky top navbar in `components/layout/nav-bar.tsx`
  - `position: fixed`
  - `top: 0`
  - `z-50`
- Navigation links with icon tooltips
- Social icon links
- Blog system with markdown parsing via remark/rehype
- TipTap editor with custom image placeholder block extension
- Drizzle ORM for database models and queries
- Auth and protected routes in dashboard
- Uploadthing route for file uploads
- Light/dark mode support (via next-themes)

## Requirements

- Node.js >= 20
- pnpm 9+
- PostgreSQL database

## Installation

1. Clone repository

```bash
git clone <repo-url>
cd maken
```

2. Install dependencies

```bash
pnpm install
```

3. Configure `.env` variables

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `UPLOADTHING_SECRET` (if used)

4. Setup database

```bash
pnpm db:migrate
```

5. Run development server

```bash
pnpm dev
```

## Scripts

- `pnpm dev` — start development server
- `pnpm build` — production build
- `pnpm start` — production start
- `pnpm lint` — run ESLint
- `pnpm format` — run Prettier
- `pnpm typecheck` — run TypeScript type check
- `pnpm db:generate` — drizzle-kit generate
- `pnpm db:migrate` — drizzle-kit migrate
- `pnpm db:push` — drizzle-kit push
- `pnpm db:studio` — drizzle-kit studio

## Key files to edit

- `components/layout/nav-bar.tsx` — navbar policies and fixed behavior
- `lib/auth.ts` / `lib/auth-guard.ts` — authentication rules
- `lib/db/schema.ts` — database models
- `app/api/posts/route.ts` and `app/api/projects/route.ts` — API handlers
- `components/shared/blog/extensions/image-placeholder.tsx` — image placeholder behavior

## Development notes

- `Navbar` uses Tailwind CSS classes for fixed positioning and z-index.
- `PopoverContent` should not receive `onPointerDownOutside` or `onEscapeKeyDown`; these are managed by the `Popover` wrapper.

## Git workflow advice

If you have many commits and want to push in chunks:

1. Create a feature branch

```bash
git checkout -b feature/partial-sync
```

2. Commit subsets of files

```bash
git add path/one path/two
git commit -m "feat: add part of the project"
```

3. Repeat for separate changes
4. Push the branch once ready

```bash
git push origin feature/partial-sync
```

5. Merge into `master` with PR.


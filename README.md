# AviatorYapp

App built by Camilo Osorio (`camiloosorio2394`) and Nico (`MGN14`).

## Stack

- **Frontend:** Vite 8 + React 19 + TypeScript + Tailwind v4 + shadcn v4 (Radix / Nova preset, Lucide icons, Geist font)
- **Backend:** Supabase (Postgres + Auth + Storage + Edge Functions)
- **Hosting:** Vercel (auto-deploy from GitHub `main`)

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
```

You need a `.env.local` with:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

The fastest way to populate it: `vercel link` (once) then `vercel env pull`.

## Useful commands

```bash
npm run build                       # type-check + production build
npm run lint                        # eslint
npx shadcn@latest add <component>   # add a shadcn/ui component
supabase db push                    # apply local migrations to remote
vercel deploy --prod                # one-off prod deploy from CLI
```

## Workflow

- Branch off `main` for every feature: `git checkout -b feat/<name>`.
- Open PRs (`gh pr create`); merge with squash.
- Vercel deploys a unique preview URL for every PR.

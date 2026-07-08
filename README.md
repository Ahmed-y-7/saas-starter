# SaaS Starter — Next.js 16 + Prisma + Auth.js

A production-shaped starter: real email/password authentication, a
PostgreSQL-backed dashboard, and settings.

Stack: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Prisma 6 +
PostgreSQL, Auth.js (NextAuth v5) with bcrypt-hashed passwords.

## Setup

1. **Database** — have PostgreSQL running (local or hosted).
2. **Environment** — copy `.env.example` to `.env` and set both values:
   - `DATABASE_URL` — your Postgres connection string.
   - `AUTH_SECRET` — any long random string (one is provided below, or run
     `npx auth secret`).
3. **Install & initialize:**

   ```bash
   npm install          # installs deps + runs prisma generate
   npm run db:migrate    # create tables (name it "init")
   npm run db:seed       # sample users, projects, tickets, activity
   npm run dev           # http://localhost:3000
   ```

## Signing in

Seeded accounts all use the password **`password123`**, e.g.:

- `sara@example.com` / `password123`

Or click **Create one** on the sign-in page to register a new account —
it hashes the password, stores the user in Postgres, and signs you in.

## How auth works

- `auth.ts` — Auth.js config with a **Credentials** provider. `authorize()`
  looks up the user by email and verifies the password with `bcrypt.compare`.
- Sessions use the **JWT** strategy (no session table needed).
- `app/api/auth/[...nextauth]/route.ts` — the Auth.js HTTP handlers.
- `app/actions.ts` — `login`, `register`, and `logout` server actions.
- `app/(app)/layout.tsx` — calls `auth()` and redirects to `/login` if there
  is no session, protecting every page in the group.

## Data model (`prisma/schema.prisma`)

User (now with a hashed `password`), Project, Ticket (OPEN/CLOSED), Activity.
`lib/data.ts` derives the dashboard stats and activity feed from these tables.

## Scripts

| Command              | What it does                       |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Start the dev server               |
| `npm run build`      | Production build                   |
| `npm run db:migrate` | Create/apply migrations            |
| `npm run db:seed`    | Seed sample data                   |
| `npm run db:studio`  | Open Prisma Studio                 |

## Next steps

- Add OAuth providers (Google/GitHub) via Auth.js.
- Add Zod validation to the server actions.
- Make the dashboard interactive (create projects/tickets from the UI).
- Deploy to Vercel with a pooled Postgres connection.

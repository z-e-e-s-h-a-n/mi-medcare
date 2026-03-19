# Mi MedCare

Mi MedCare is a medical billing and revenue-cycle management platform with:

- a NestJS backend in `server`
- an admin dashboard in `apps/dashboard`
- a marketing website in `apps/web`
- shared contracts, SDK, UI, templates, and database packages in `packages/*`

## Product Scope

The delivered product currently covers:

- admin and author user management
- email-first authentication with MFA support
- business profile management
- media management via Cloudinary
- content management for posts, categories, and tags
- a public-facing website for marketing, services, specialties, blog, and contact flows
- lead capture for contact messages, consultation requests, and newsletter subscribers
- audit logs, notifications, traffic sources, and dashboard analytics

## Workspace Structure

- `apps/web` - Next.js public website
- `apps/dashboard` - Next.js admin dashboard
- `server` - NestJS API
- `packages/contracts` - shared schemas and API contracts
- `packages/sdk` - frontend API client
- `packages/db` - Prisma schema, migrations, and seed data
- `packages/templates` - email templates
- `packages/ui` - shared UI components

## Prerequisites

- Node.js `24+`
- `pnpm` `10+`
- PostgreSQL
- Cloudinary account
- SMTP credentials for email delivery

Optional integrations:

- Google OAuth
- Facebook OAuth
- Firebase Cloud Messaging for push notifications

## Local Setup

1. Install dependencies.

```bash
pnpm install
```

2. Create the server env file from [server/.env.example](/d:/mi-medcare/server/.env.example) and fill in the required values.

3. Create `apps/dashboard/.env.local` and `apps/web/.env.local` with the API base URL.

```env
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

4. Run database setup.

```bash
pnpm --filter @workspace/db prisma:generate
pnpm --filter @workspace/db prisma:migrate
pnpm --filter @workspace/db prisma:seed
```

5. Start the backend and frontend apps you need.

```bash
pnpm --filter server dev
pnpm --filter web dev
pnpm --filter dashboard dev
```

The default local endpoints are:

- API: `http://localhost:4000`
- Website: `http://localhost:3000`
- Dashboard: `http://localhost:3001`

## Useful Commands

```bash
pnpm --filter server check-types
pnpm --filter web check-types
pnpm --filter dashboard check-types
pnpm lint
pnpm --filter @workspace/contracts build
pnpm --filter @workspace/sdk check-types
pnpm --filter @workspace/db build
```

## Seed Data

The seed creates realistic demo data for dashboard review, including:

- admin and author users
- business profile
- media library
- categories and tags
- posts with view activity
- contact, consultation, and newsletter leads
- audit logs and notifications

Use the seeded data to validate dashboard cards, charts, activity feeds, and detail pages.

## Handover Checklist

Before handing the project to a client, confirm all of the following:

- `server/.env` is filled with real production values
- Vercel production env for `apps/web` contains `NEXT_PUBLIC_API_URL`
- Vercel production env for `apps/dashboard` contains `NEXT_PUBLIC_API_URL`
- PostgreSQL database is created and Prisma migrations are applied
- Cloudinary credentials are valid and uploads work
- SMTP credentials are valid and email templates send successfully
- OAuth values are filled only if Google/Facebook login is intended
- Firebase values are filled only if push notifications are intended
- an initial admin account exists, either from seed data or `pnpm --filter server admin:bootstrap`
- the latest type checks and lint pass

## Production Notes

- Auth is email-first. Phone is retained only as profile/contact data, not as a login identifier.
- Push notifications are optional. If Firebase env values are left blank, push delivery is skipped.
- OAuth is optional. If provider env values are blank, those strategies are not registered.
- `apps/dashboard` and `apps/web` are expected to build and deploy through Vercel.

## Validation

The main pre-handover checks for this repo are:

- `pnpm check-types`
- `pnpm lint`

Backend smoke tests exist in `server/src/**/*.spec.ts`, but they are optional for routine handover unless you specifically want to run them.

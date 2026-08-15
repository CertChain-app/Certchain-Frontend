# CertChain — Frontend

Web frontend for CertChain, an event platform where organizers run events and
issue verifiable certificates to the people who attend them.

The app serves three audiences from one Next.js codebase:

- **Attendees** — browse and book events, join event chats, and collect
  certificates in a personal dashboard.
- **Organizers** — a dashboard to create and edit events, manage and ban
  attendees, mark events complete, and issue or revoke certificates.
- **Organizer subdomains** — each organizer can serve their own branded event
  page on a custom domain, resolved at the edge by middleware.

## Stack

| | |
|---|---|
| Framework | Next.js (App Router) with TypeScript |
| UI | Mantine, Tailwind CSS, Tabler + Lucide icons |
| Data | TanStack Query over axios and Ky clients |
| Forms | React Hook Form with Zod schemas |
| Realtime | socket.io-client |
| Certificates | `@vercel/og` for shareable certificate images |

## Getting started

```bash
yarn install
cp .env.example .env.local   # then fill in the values
yarn dev
```

The dev server runs on [http://localhost:3001](http://localhost:3001) — port
3001 rather than 3000, because the subdomain middleware matches on
`*.localhost:3001`.

This project standardises on **yarn**; the other lockfiles are ignored.

### Environment

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | yes | Base URL of the CertChain API. |
| `NEXT_PUBLIC_BASE_URL` | — | Fallback used when `NEXT_PUBLIC_API_URL` is unset. |
| `NEXT_PUBLIC_ASSETS_URL` | yes | Base URL for uploaded assets (logos, event images). |
| `NEXT_PUBLIC_ROOT_DOMAIN` | — | Root domain for organizer subdomains. When unset, subdomain routing is skipped, which is what preview deployments rely on. |

Requests authenticate with credentialed cookies against the API, so the API
must allow credentials from this origin.

## Scripts

| Command | Description |
|---|---|
| `yarn dev` | Dev server with Turbopack on port 3001 |
| `yarn build` | Production build |
| `yarn start` | Serve the production build |
| `yarn lint` | ESLint |

## Project layout

```
src/
  api/
    clients/      one client per resource (user + organizer sides)
    templates/    BaseClient / CrudClient and their Ky equivalents
    fetcher.ts    configured axios + ky instances
  app/
    (routes)/(users)/        attendee-facing routes
    (routes)/(organizers)/   organizer-facing routes
    internal/[domain]/       rendered for organizer custom domains
  modules/
    core/                 shared components, hooks and providers
    types/                shared domain models
    users/                auth, landing, events, user-events, dashboard
    chats/                event conversations
    organizer/            organizer marketing site and auth
    organizer-dashboard/  organizer dashboard, events, certificates, profile
    organizer-domain/     tenant pages served on custom domains
  middleware.ts           resolves an organizer from the hostname
```

Each module under `src/modules` follows the same internal shape —
`templates/` for page-level composition, `components/`, `forms/` with colocated
Zod schemas, and `queries/` + `mutations/` wrapping TanStack Query.

### Signing in

`/auth/login` and `/auth/register` serve attendees and organizers alike — a
segmented control switches between them, and `?as=organizer` opens straight on
the organizer side. `/organizers/auth/login` and `/organizers/auth/register`
redirect there, so older links keep working.

Choosing *organizing* on the sign-in page asks for the organization's CertChain
address and hands off to `/organizers/<id>/auth/login`, which is where the
credentials are actually entered.

### Guest mode

Both sides offer a one-click guest sign-in that lands on a pre-seeded demo
account, so the app can be explored without registering. The dashboards show a
banner for the duration; a guest is recognised by comparing the session email
against `NEXT_PUBLIC_GUEST_USER_EMAIL` / `NEXT_PUBLIC_GUEST_ORGANIZER_EMAIL`.
The API rebuilds that demo data daily, so nothing a guest changes sticks.

### Certificate verification

`/verify` takes a certificate ID — or a pasted certificate link — and sends the
visitor to `/certificates/<id>`, which reads the public verification endpoint
and shows who the certificate was issued to, for which event, by whom and when.
No account is involved on either page.

### Routing and multi-tenancy

`src/middleware.ts` inspects the request hostname. Requests to the root domain
or to a preview URL pass straight through. Anything on a subdomain is looked up
against the API and rewritten to `/internal/<hostname>`, which renders that
organizer's branded page. A failed lookup redirects to `/404` rather than
erroring, so an unknown subdomain degrades gracefully.

## Deployment

Pushing to `main` triggers `.github/workflows/cd.yml`, which SSHes to the
application host and runs `publish.sh` — pull, `yarn`, `yarn build`, then a pm2
restart of the `cc-app` process defined in `pm2-prod.config.js`.

The deploy workflow reads `HOST`, `USERNAME` and `PASSWORD` from GitHub Actions
secrets. Do not commit any of them.

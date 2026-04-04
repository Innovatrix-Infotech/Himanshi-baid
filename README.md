# Himanshi-baid

Next.js (App Router) frontend configured to work with Directus as CMS backend.

## Run locally

```bash
yarn dev
```

App runs on port `9090`.

## Environment

Copy `.env.example` to `.env.local` and fill secrets:

- `DIRECTUS_URL`
- `DIRECTUS_STATIC_TOKEN`
- `DIRECTUS_REVALIDATE_SECRET`
- `DIRECTUS_TIMEOUT_MS` (optional)

## Routes

- `/`
- `/about`
- `/blog`
- `/blog/[slug]`
- `/publications`
- `/conferences`
- `/contact`

## API routes

- `POST /api/contact`
- `GET /api/assets/[id]`

## Quality checks

```bash
yarn lint
yarn typecheck
yarn test
yarn build
```

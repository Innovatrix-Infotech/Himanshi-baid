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
- `NEXT_PUBLIC_SITE_URL` (canonical production origin used by metadata, JSON-LD, robots, and sitemap)

Footer main links and SMTP credentials are configured in Directus `hb_site_config`.
Use `footer_links` for the footer navigation JSON array and the `smtp_*` fields
for contact-form notification email delivery. Academic content for awards,
conferences, certifications, and thesis supervision is managed through the
`hb_awards`, `hb_conferences`, `hb_certifications`, and `hb_thesis` collections.
The app needs `DIRECTUS_STATIC_TOKEN` at runtime to read private Directus
collections; without it, CMS-backed sections render their empty states.

## Routes

- `/`
- `/about`
- `/blog`
- `/blog/[slug]`
- `/publications`
- `/conferences`
- `/contact`

## SEO surface

The App Router metadata layer is centralized in `lib/seo.tsx` and powers:

- page titles, descriptions, canonical URLs, Open Graph, and Twitter cards
- generated `/icon`, `/apple-icon`, `/opengraph-image`, and `/twitter-image`
- `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest`
- server-rendered JSON-LD for Person, WebSite, WebPage, BlogPosting, ItemList, Event, and ScholarlyArticle entities

Set `NEXT_PUBLIC_SITE_URL` to the final production domain before launch so
absolute URLs in search metadata resolve to the live site.

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

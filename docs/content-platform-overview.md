# Content Platform Overview

## Route Surface

- `/` Home page composed from CMS site config, counts, education, experience, awards, and latest posts
- `/about` About profile sections + certifications
- `/blog` Paginated blog listing
- `/blog/[slug]` Blog detail page with related/trending posts
- `/publications` Publication listing
- `/conferences` Conference listing
- `/contact` Contact page with submission form

## API Surface

- `POST /api/contact`
  - Validates payload and applies IP-based submission limits
  - Writes records to `hb_contact_submissions` in Directus
- `GET /api/assets/[id]`
  - Proxies Directus assets
  - Preserves key response headers (`content-type`, `cache-control`, `content-length`)

## Data Layer

- `lib/cms/directus-client.ts`
  - Directus client setup, timeout wrapper, and asset URL helpers
- `lib/cms/queries.ts`
  - Typed query functions for site content and collections
  - Tagged caching with revalidation
- `lib/cms/mappers.ts`
  - Defensive mapping from raw CMS payloads to domain types
- `lib/cms/types.ts`
  - Shared TypeScript contracts for all CMS-backed entities

## Environment Variables

- `DIRECTUS_URL`
- `DIRECTUS_STATIC_TOKEN`
- `DIRECTUS_REVALIDATE_SECRET`
- `DIRECTUS_TIMEOUT_MS`

## Testing Snapshot

- Component tests for key home sections
- Route handler tests for:
  - contact validation, persistence, rate limiting, and failure handling
  - asset proxy validation, upstream failure propagation, and header forwarding

# Content Platform Overview

## Route Surface

- `/` Home page composed from CMS site config, counts, education, experience, awards, and latest posts
- `/about` About profile sections, thesis supervision records, and certifications
- `/blog` Paginated blog listing
- `/blog/[slug]` Blog detail page with related/trending posts
- `/publications` Publication listing
- `/conferences` Conference listing
- `/contact` Contact page with submission form

## API Surface

- `POST /api/contact`
  - Validates payload and applies IP-based submission limits
  - Writes records to `hb_contact_submissions` in Directus
  - Sends a notification email when SMTP settings are configured in `hb_site_config`
- `GET /api/assets/[id]`
  - Proxies Directus assets
  - Preserves key response headers (`content-type`, `cache-control`, `content-length`)

## Data Layer

- `hb_site_config`
  - Controls site identity, profile links, public contact email, footer links, SEO fields, and SMTP settings
  - `seo_title`, `seo_description`, `og_image`, `profile_photo`, and profile links feed the rendered metadata and JSON-LD schema
  - `footer_links` is a JSON array of `{ "label": string, "href": string }` items used by the footer main links
  - SMTP fields: `smtp_host`, `smtp_port`, `smtp_secure`, `smtp_user`, `smtp_password`, `smtp_from_email`, `smtp_to_email`
- `lib/seo.tsx`
  - Centralizes canonical URL generation, route metadata, sitemap entries, and JSON-LD schema builders
- `hb_awards`, `hb_conferences`, `hb_certifications`, `hb_thesis`
  - Own the academic recognition, event, credential, and thesis-supervision content shown on the public site
  - Empty collections render neutral empty states instead of production records embedded in React components
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
  - Required when the `hb_*` collections are private; otherwise academic sections render empty states
- `DIRECTUS_REVALIDATE_SECRET`
- `DIRECTUS_TIMEOUT_MS`
- `NEXT_PUBLIC_SITE_URL`
  - Required for production SEO; used by canonical URLs, Open Graph, Twitter cards, JSON-LD, `robots.txt`, and `sitemap.xml`

SMTP credentials are managed in Directus `hb_site_config`, not environment variables.

## SEO and Search Metadata

- `/robots.txt` allows public crawling and points crawlers to `/sitemap.xml`
- `/sitemap.xml` includes all public static routes and published blog posts
- `/manifest.webmanifest`, `/icon`, and `/apple-icon` provide install/search surface assets
- Root layout emits Person and WebSite JSON-LD from `hb_site_config`
- Public pages emit page-specific JSON-LD; blog detail pages emit BlogPosting schema

## Testing Snapshot

- Component tests for key home sections
- CMS-backed section tests for awards, certifications, conferences, and thesis supervision
- Mapper/query tests for Directus thesis records
- Route handler tests for:
  - contact validation, persistence, rate limiting, and failure handling
  - asset proxy validation, upstream failure propagation, and header forwarding

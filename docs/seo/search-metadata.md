# Search Metadata

## Canonical Origin

Set `NEXT_PUBLIC_SITE_URL` to the production origin before launch. This value
is used for canonical URLs, Open Graph URLs, Twitter image URLs, JSON-LD entity
IDs, `robots.txt`, and `sitemap.xml`.

Default local fallback:

```bash
NEXT_PUBLIC_SITE_URL=https://himanshibaid.com
```

## Generated Routes

- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- `/icon`
- `/apple-icon`
- `/opengraph-image`
- `/twitter-image`

## Structured Data

The site renders JSON-LD in the initial server HTML:

- `Person` and `WebSite` from the root layout
- `ProfilePage`, `AboutPage`, `ContactPage`, and collection page schemas
- `BlogPosting` for blog detail pages
- `ItemList` for blog, publication, and conference collections
- `ScholarlyArticle` entries for publications
- `Event` entries for conferences

Keep `hb_site_config` fields current in Directus because profile photo, public
email, profile links, SEO title, SEO description, and OG image all feed search
metadata.

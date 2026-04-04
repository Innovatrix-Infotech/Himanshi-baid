# ADR-002: Content-Driven Routing and Fallback Strategy

- Status: Accepted
- Date: 2026-04-04

## Context

The initial project scaffold only included a basic homepage and minimal data integration.
The portfolio now requires:

- Multiple App Router pages (`/about`, `/blog`, `/publications`, `/conferences`, `/contact`)
- Route handlers for contact submissions and Directus asset proxying
- Reusable section components fed by Directus data
- Graceful rendering when CMS content is missing or unavailable

The team also needs predictable caching behavior for CMS reads while preserving the ability to revalidate and expand to richer content models later.

## Decision

Adopt a content-driven architecture where each page composes dedicated section components backed by typed CMS query utilities in `lib/cms/*`, with bounded fallback content to prevent empty states during partial CMS population.

Additionally:

- Use App Router route handlers for:
  - Contact submissions to `hb_contact_submissions`
  - Asset proxying through `/api/assets/[id]`
- Cache CMS reads with tagged caching and short revalidation windows
- Keep fallback constants as temporary continuity mechanisms, tracked explicitly in the Tech Debt Register

## Consequences

- Faster delivery of a complete portfolio experience with resilient rendering
- Cleaner module boundaries between data access, mapping, and UI sections
- Introduces temporary debt due to fallback constants and in-memory rate limiting, tracked as:
  - `TDR-002` (issue #2)
  - `TDR-003` (issue #4)

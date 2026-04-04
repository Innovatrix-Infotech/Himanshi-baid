# ADR-001: Use Directus as Headless CMS

- Status: Accepted
- Date: 2026-04-04

## Context

The frontend requires a CMS backend that is already deployed and maintained.
Directus is currently running on EC2 and accessible via secure URL.

## Decision

Use Directus as the only CMS backend for this Next.js application.
The app consumes Directus via `DIRECTUS_URL`, `DIRECTUS_STATIC_TOKEN`, and `DIRECTUS_REVALIDATE_SECRET`.

## Consequences

- Faster delivery due to existing backend
- Single source of truth for content
- Requires secure handling of static token and revalidation secret

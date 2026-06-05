# ADR-003: Directus-Configured SMTP Contact Email

- Status: Accepted
- Date: 2026-06-05

## Context

The contact form already stores submissions in Directus. The site also needs
notification email delivery with SMTP credentials managed by Directus so footer
and contact settings stay in the same content operations surface.

## Decision

Use `nodemailer` from the Next.js route handler to send contact notifications.
Read SMTP settings from the `hb_site_config` singleton fields:
`smtp_host`, `smtp_port`, `smtp_secure`, `smtp_user`, `smtp_password`,
`smtp_from_email`, and `smtp_to_email`.

The route sends email only when the complete SMTP settings are present.

## Consequences

- Contact notification delivery can be changed from Directus without a deploy
- SMTP credentials remain server-side and are not exposed to the browser
- The app has one focused runtime dependency for SMTP transport

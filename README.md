# Mahlangu Online Solutions

**Career & Personal Branding Studio — Pretoria, South Africa**

Production website for [mahlangusolutions.online](https://www.mahlangusolutions.online): a Next.js 16 application for a South African studio offering career documents, personal brand systems and digital services.

> "Talented people deserve documents and brands as strong as their work."

---

## Overview

The site presents five service disciplines, a portfolio, pricing, a written resource library and a server-validated enquiry flow that degrades gracefully to WhatsApp and email when no delivery endpoint is configured.

| | |
|---|---|
| **Framework** | Next.js 16 (App Router, React 19, Server Components) |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS v4 + custom design tokens (`src/styles/tokens.css`) |
| **Fonts** | DM Sans + Manrope Variable (self-hosted via Fontsource) |
| **Icons** | lucide-react |
| **Motion** | Custom canvas ambient field + scroll-driven CSS motion layer |
| **Package manager** | pnpm 10 |
| **Deployment** | Vercel |

---

## Getting started

Requires **Node.js 20.9+** and **pnpm 10+**.

```bash
pnpm install
cp .env.example .env.local
pnpm dev          # http://127.0.0.1:3000
```

### Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Local development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (`eslint-config-next`) |
| `pnpm typecheck` | `next typegen` + `tsc --noEmit` |
| `pnpm test` | Compile and run the enquiry validation tests |

Run `pnpm lint && pnpm typecheck && pnpm test && pnpm build` before every deploy.

---

## Environment variables

Copy `.env.example` to `.env.local`. Never prefix a secret with `NEXT_PUBLIC_`.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical origin, used for metadata, sitemap and robots. |
| `SITE_INDEXABLE` | Yes | Keep `false` until content, domain, legal pages and the enquiry endpoint are reviewed. |
| `ENQUIRY_WEBHOOK_URL` | For the form | Server-only HTTPS endpoint accepting JSON (e.g. a Firebase HTTPS Function). |
| `ENQUIRY_WEBHOOK_TOKEN` | Optional | Bearer token sent server-side with the enquiry payload. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional | Cloudflare Turnstile bot protection — configure with the secret below. |
| `TURNSTILE_SECRET_KEY` | Optional | Turnstile server key. |

Without `ENQUIRY_WEBHOOK_URL`, the form stays visible but tells visitors to use WhatsApp or email instead of failing silently.

---

## Project structure

```
src/
  app/               App Router routes, route handlers, robots.ts, sitemap.ts
    api/enquiry/     Server-side enquiry validation and webhook delivery
    work/[slug]/     Portfolio case-study pages
    resources/[slug]/ Article pages
  components/        UI components (navigation, hero, forms, motion layers)
  content/           All site copy and records — the single source of truth
  lib/               Enquiry validation, ambient-field logic
  styles/            Design tokens and the motion layer
public/images/       Optimised WebP imagery
docs/                Extended documentation (see below)
preview/             Standalone static motion prototype
tests/               Node test-runner unit tests
```

### Editing content

No page component holds copy. Everything editable lives in `src/content/`:

| File | Controls |
|---|---|
| `site.ts` | Studio details, contact, founder bio, stats, home-page copy |
| `services.ts` | The service catalogue and its three groups |
| `pricing.ts` | All prices |
| `portfolio.ts` | Case studies |
| `resources.ts` | Articles |
| `testimonials.ts` | Client reviews (verified only) |
| `navigation.ts` | Menu and footer |
| `seo.ts` | Per-page titles and descriptions |

---

## Documentation

Deeper reference lives in [`docs/`](./docs):

[`BRAND.md`](docs/BRAND.md) · [`DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) · [`COMPONENTS.md`](docs/COMPONENTS.md) · [`CONTENT.md`](docs/CONTENT.md) · [`SERVICES.md`](docs/SERVICES.md) · [`PORTFOLIO.md`](docs/PORTFOLIO.md) · [`DEVELOPMENT.md`](docs/DEVELOPMENT.md) · [`DEPLOYMENT.md`](docs/DEPLOYMENT.md) · [`SEO.md`](docs/SEO.md) · [`PERFORMANCE.md`](docs/PERFORMANCE.md) · [`ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) · [`QA.md`](docs/QA.md)

`AGENTS.md` holds conventions for AI coding assistants working in this repository.

---

## Deployment

Deploy to Vercel. Set `NEXT_PUBLIC_SITE_URL`, `SITE_INDEXABLE`, `ENQUIRY_WEBHOOK_URL` and any optional keys in the project's environment settings.

**Launch checklist**

- [ ] Enquiry delivery tested end to end
- [ ] Privacy Policy and Terms reviewed
- [ ] Founder portrait replaced with the final image
- [ ] Social links confirmed (currently empty in `site.ts`)
- [ ] Portfolio usage permissions cleared
- [ ] Only verified client reviews published
- [ ] `SITE_INDEXABLE=true` and sitemap submitted to Google Search Console

---

## Accessibility and privacy

The interface targets WCAG 2.2 AA: a skip link to `#main-content`, visible focus states, semantic landmarks and full `prefers-reduced-motion` support across the ambient and scroll motion layers. The enquiry form asks visitors not to submit identity numbers, passwords or sensitive documents, and collects only what is needed to reply — in line with POPIA.

---

## Contact

**Musa Njabulo Mahlangu** — Founder & Lead Consultant
Pretoria, Gauteng, South Africa
[musamahlangu1977@gmail.com](mailto:musamahlangu1977@gmail.com) · [+27 63 141 3009](tel:+27631413009) · [WhatsApp](https://wa.me/27631413009)

---

## License

© 2023–2026 Mahlangu Online Solutions. All rights reserved.

This repository is published for reference. The source code, brand assets, imagery and written content are proprietary and may not be reused, redistributed or deployed without written permission.

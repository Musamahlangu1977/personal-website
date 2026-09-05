# Mahlangu Online Solutions

Production-ready Next.js website for a South African career, personal branding, design and digital-services studio.

## Setup

Requires Node.js 20.9+ and pnpm 10+.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Site copy and records live in `src/content/`. Prices are controlled by `src/content/pricing.ts`.

## Checks and production

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

The form requires `ENQUIRY_WEBHOOK_URL`, a server endpoint that accepts JSON. An optional bearer token is sent from the server. Without a handler, visitors receive WhatsApp and email alternatives. A Firebase HTTPS Function can connect at this boundary without a client SDK.

Keep `SITE_INDEXABLE=false` until the content, domain, privacy page and delivery endpoint are reviewed.

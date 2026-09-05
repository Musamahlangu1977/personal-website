# Mahlangu Online Solutions Website Instructions

Read this file and all relevant files in `docs/` before modifying the project. The owner’s current instructions take precedence.

## Non-negotiable rules

1. Never destroy or substantially change a working feature without approval.
2. Preserve the brand identity in `docs/BRAND.md`.
3. Do not introduce generic AI-looking UI, default SaaS sections or stock-template patterns.
4. Never publish fake testimonials; require verification and consent.
5. Never invent business information, outcomes, qualifications, clients, awards or claims.
6. Mobile layouts from 320 px upward are mandatory.
7. Accessibility is mandatory.
8. Manage public copy and repeatable records in `src/content/`.
9. Keep components reusable and focused.
10. Run `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` before completion.
11. Check every route and major flow after material changes.
12. Never expose API keys or server tokens.
13. Avoid unnecessary dependencies.
14. Optimise images and use `next/image`.
15. Maintain visual consistency across every page.
16. Ask before changing the framework, content model or delivery architecture.

Use strict TypeScript and two-space indentation. Shared UI belongs in `src/components`, content in `src/content`, logic in `src/lib`, tokens in `src/styles`, optimised images in `public/images`, meaningful tests in `tests`, and guidance in `docs`. Prefer semantic HTML and server components. Keep credentials, personal information, source portfolios, build output and temporary renders out of Git.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

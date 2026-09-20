# Performance

Aim for Lighthouse 90+ Performance and 95+ Accessibility, Best Practices and SEO. Prefer server components, local variable fonts and CSS transitions. Keep client code to real interactions. Use `next/image`, accurate `sizes`, reserved ratios and WebP artwork. Avoid broad animation libraries, duplicate trackers and unnecessary third-party scripts.

## Mobile motion budget (2026-09)

- The hero film only loads at 901 px and wider, and never on data-saver or 2G connections (`src/components/hero-video.tsx`); phones keep the poster image. This removes the largest first-load download and the per-frame video filtering during scroll.
- At 900 px and below: `mix-blend-mode` drops to `normal` on the ambient layers, film grain and one ribbon are removed, `backdrop-filter` is dropped from the header, hero eyebrow and hero cards, the pointer spotlight and scene-backdrop blur/parallax are off, and the particle canvas runs at DPR 1 with roughly a third of the particles.
- `home-motion.tsx` skips per-scene `getBoundingClientRect()` reads on every scroll frame below 901 px, and binds pointer listeners only for fine pointers.
- Rules of thumb: never animate `filter: blur()`; avoid full-screen blend modes and `backdrop-filter` on phones; keep scroll handlers free of layout reads.

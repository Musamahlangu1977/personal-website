# Design System

The three-layer tokens in `src/styles/tokens.css` contain primitive values, semantic roles and component aliases. Components reference semantic or component tokens.

Inter is the display and reading face. Instrument Serif italic provides selective editorial emphasis in major headlines. Headings use tight leading and deliberate line breaks. Body copy stays at 16 px or larger.

The interface uses black `#000000`, near black `#050505`, soft white `#F7F7F7`, silver `#DEDEDE` and muted grey `#999999`. Use gradients only to suggest metal, depth or controlled light. Do not use green or gold as website interface colours.

Layouts use generous scene spacing, fine grid lines, subtle corners, high contrast and controlled asymmetry. Page heroes should feel like cinematic scenes. Content cards use quiet depth, a narrow reflective sweep and restrained hover movement. Motion must support the experience, remain smooth, and respect reduced-motion preferences.

## Motion layers

- Site-wide (`src/styles/motion.css`, `src/components/ambient-field.tsx`, `src/lib/ambient-field.ts`): canvas dust field in three depths, pointer-led constellation lines (a wandering focus on touch screens), occasional light streaks, scroll-velocity stretch, two extra ribbons (light pillar, halo ring), slow aurora and fine film grain.
- Homepage (`src/app/home-motion.css`, `src/components/home-motion.tsx`): receding doorway portal behind the hero headline, swaying beams and scanline, light pulses on guide lines, serif headline sheen, scene-edge light sweeps, orbiting sigil points, card tilt with glare, magnetic hero/CTA buttons, count-up stats, cursor halo and breathing door rings in the final CTA.
- All motion pauses in hidden tabs and falls back to a static composition under `prefers-reduced-motion`. Avoid animating `filter: blur()`; prefer soft gradients.

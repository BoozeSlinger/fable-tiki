# CLAUDE.md

## Project: "Luna Lagoon" — Tiki Dive-Bar on the Moon (immersive 3D landing site)

> AI assistants: read this fully before editing. This is an original creative project. Do NOT copy art, characters, copy, or code from any existing reference site. Generate original assets/wording only.

### Concept
A single-page, scroll-driven, immersive site for a fictional/branded **tiki dive-bar located on the moon**. Mood: retro-tropical kitsch meets sci-fi noir. Warm torch glow against cold lunar dark. Playful, a little surreal, premium-feeling. Everything should feel **3D and alive** — layered depth, floating props, particles, parallax.

### Art Direction
- **Palette (tokens in 'globals.css'):**
  - '--bg' deep space charcoal '#0A0A12'
  - '--torch' warm tiki-orange '#FF7A33'
  - '--lagoon' moon-cyan '#46E0D0'
  - '--neon' hot-pink sign '#FF3D7F'
  - '--sand' warm bone text '#E9E2D6'
  - Nebula glows: torch-orange + lagoon-cyan radial gradients.
- **Fonts:** one loud retro-tiki display face for H1s (e.g. a chunky brush/tiki slab), a clean grotesk for body, a wide letter-spaced face for eyebrow labels. (Pick final faces; expose as CSS vars.)
- **Texture:** subtle film grain overlay; bamboo/rattan motifs; cracked-moon-rock surfaces; flickering neon "OPEN" sign.

### Recurring Characters (original — design these yourself)
- A **moon-tiki idol** with glowing torch eyes (alpha .webm, slow flicker).
- A **floating astronaut bartender** drifting in low gravity.
- **Bubbling cocktail** with rising ember/spark bubbles.
- **Drifting palm fronds** and paper umbrellas in zero-G.
- A **crescent-moon "host"** with a lei.
> Deliver as alpha '.webm' loops (animated) or PNG/WebP cutouts (static drift). Provide small/medium renditions.

### Section Map
1. Sticky header — logo + pill nav + "Reserve a Pod" CTA.
2. Hero — scramble headline ("HAPPY HOUR IS OUT OF THIS WORLD" / your own), floating tiki idol + bartender + bubbles.
3. The Vibe — about the bar; parallax lunar-lagoon scene.
4. The Menu — rotated, drifting cocktail cards (horizontal scroll, pinned).
5. Live Tonight — events; neon-sign scene.
6. Find Us — "Dock at Crater 7" location/CTA.
7. Reserve form + footer (socials, hours, legal).

### Tech Stack
- **Next.js 15 App Router** + TypeScript (migrated from Vite; do NOT revert to Vite).
- Package manager: **pnpm**. Scripts: `pnpm dev` (turbopack), `pnpm build`, `pnpm start`.
- **Lenis** (smooth scroll), **GSAP** + ScrollTrigger + SplitText + MotionPathPlugin + `@gsap/react`.
- **react-three-fiber + drei** for the fixed WebGL atmosphere (lazy-loaded via `next/dynamic({ ssr: false })`).
- **Tailwind v4** via `@tailwindcss/postcss`; tokens in `app/globals.css`.
- **Fonts:** `next/font/google` — Rye (display), Space Grotesk (body), Oswald (eyebrow), Monoton (neon). CSS vars set on `<html>`.
- Honor `prefers-reduced-motion` everywhere.

### File Structure
\`\`\`
/app
  layout.tsx       (root layout — fonts, metadata, imports globals.css)
  page.tsx         (renders <App /> client component)
  globals.css      (Tailwind v4 @theme tokens, keyframes, Lenis classes)
/src
  App.tsx          ("use client" — wires Lenis + GSAP, renders all sections)
  /components      Header Hero Vibe MenuCards Events FindUs ReserveForm Footer SplitHeading Reveal
  /three           Atmosphere.tsx Embers.tsx FogGlow.tsx ScrollCamera.tsx
  /lib             lenis.ts gsapSetup.ts useParallax.ts useScramble.ts usePointerTilt.ts
  /assets          /webm /images /fonts
next.config.ts
postcss.config.mjs
\`\`\`

### Next.js Conventions
- All `src/` files that use React hooks or browser APIs must have `"use client"` at the top.
- Three.js components must be loaded via `next/dynamic(..., { ssr: false })` — they access `document`/`window` at module eval time.
- `import.meta.env.DEV` → `process.env.NODE_ENV === "development"` (Next.js/webpack, not Vite).
- No `src/main.tsx` or `index.html` — entry is `app/layout.tsx` + `app/page.tsx`.

### Conventions
- Layer depth via 'data-depth' (0 far → 1 near) and 'data-tilt' for pointer parallax.
- All motion lives in hooks ('useParallax', 'useScramble') — keep components declarative.
- One GSAP context per section; clean up on unmount ('ctx.revert()').
- Assets lazy-loaded; nothing offscreen autoplays.

### Definition of Done (per feature)
- Works with reduced-motion ON (graceful static fallback).
- 60fps on a mid laptop; particle count scales down on mobile.
- WCAG AA contrast for all text.
- No copied third-party art/copy; all assets original.

### Guardrails for the AI assistant
- Ask before adding new heavy dependencies.
- Never hardcode secrets; never commit large binaries without noting it.
- Prefer editing tokens/hooks over duplicating animation logic.
- Keep the SKILL.md recipe ('immersive-3d-themed-landing') as the source of truth for animation patterns.

# Luna Lagoon — Handoff

**Last updated:** 2026-06-17  
**Project dir:** `~/Desktop/web-dev/fable-tiki/`  
**Dev server:** `pnpm dev` → http://localhost:3000

---

## What This Is

Single-page immersive 3D landing site for "Luna Lagoon" — a fictional tiki dive-bar on the moon. Retro-tropical kitsch meets sci-fi noir. Fixed WebGL atmosphere (embers + nebula glows) lives behind all scroll content.

---

## Current State

### Done
- [x] Full **Vite → Next.js 15 App Router** migration (all files updated, tests clean)
- [x] `pnpm build` passes with zero type errors
- [x] Dev server boots (`pnpm dev --turbopack`, returns 200)
- [x] All 14 component/three files have `"use client"`
- [x] `next/dynamic({ ssr: false })` on `Atmosphere.tsx` (Three.js SSR-safe)
- [x] `next/font/google` — Rye, Space Grotesk, Oswald, Monoton; CSS vars on `<html>`
- [x] Tailwind v4 via `@tailwindcss/postcss`; design tokens in `app/globals.css`
- [x] WebGL atmosphere: `Embers`, `FogGlow`, `ScrollCamera` all wired
- [x] GSAP + ScrollTrigger + Lenis wired in `src/App.tsx`
- [x] All hooks: `useParallax`, `useScramble`, `usePointerTilt`, `Reveal`, `SplitHeading`
- [x] All 7 section scaffolds: Header, Hero, Vibe, MenuCards, Events, FindUs, ReserveForm + Footer

### Not Started / In Progress
- [ ] **Hero assets** — tiki idol, astronaut bartender, bubbling cocktail (need alpha .webm or PNG/WebP)
- [ ] **Section content** — all sections are scaffolded but contain placeholder copy/layout
- [ ] **ScrollTrigger animations** — hooks are in place; section-level timelines not built out
- [ ] **MenuCards** — horizontal pinned scroll not yet implemented
- [ ] **Characters** — crescent-moon host, drifting palm fronds, paper umbrellas
- [ ] **Neon "OPEN" sign** flicker effect in Events section
- [ ] **ReserveForm** — functional form submission (email or API)
- [ ] **Vercel deploy**

---

## Architecture

```
/app
  layout.tsx        Root layout — next/font, metadata, imports globals.css
  page.tsx          Server component — renders <App /> client component
  globals.css       Tailwind v4 @theme tokens + keyframes + Lenis overrides

/src
  App.tsx           "use client" — Lenis init, GSAP ScrollTrigger refresh, section order

  /components
    Header.tsx      Sticky nav + "Reserve a Pod" CTA pill
    Hero.tsx        Scramble headline + character stage
    Vibe.tsx        About section, parallax lunar-lagoon scene
    MenuCards.tsx   Pinned horizontal scroll cocktail cards
    Events.tsx      Live Tonight — neon sign scene
    FindUs.tsx      Dock at Crater 7 — location CTA
    ReserveForm.tsx Reservation form
    Footer.tsx      Socials, hours, legal
    SplitHeading.tsx  GSAP SplitText headline component
    Reveal.tsx        Staggered scroll-reveal wrapper

  /three
    Atmosphere.tsx  Canvas wrapper — lazy-loaded via next/dynamic({ ssr: false })
    Embers.tsx      Rising ember particles (additive blending, torch/lagoon colors)
    FogGlow.tsx     Two drifting nebula glows (torch-orange + moon-cyan)
    ScrollCamera.tsx  Dolly + drift camera tied to page scroll

  /lib
    gsapSetup.ts    Registers ScrollTrigger, SplitText, MotionPathPlugin; exports helpers
    lenis.ts        Lenis init + GSAP ticker integration
    useParallax.ts  data-depth parallax hook
    useScramble.ts  Text scramble effect hook
    usePointerTilt.ts  Pointer-following tilt hook
```

---

## Key Conventions

| Rule | Detail |
|------|--------|
| `"use client"` | Required on every file in `src/` that uses hooks or browser APIs |
| Three.js | Always `next/dynamic(..., { ssr: false })` — never import directly in server components |
| Env check | `process.env.NODE_ENV === "development"` not `import.meta.env.DEV` |
| Tokens | Edit `app/globals.css` `@theme` block — never hardcode color/font values |
| Motion | All animation in hooks/lib — components stay declarative |
| GSAP cleanup | One `gsap.context()` per section, `ctx.revert()` on unmount |
| Reduced motion | Check `prefersReducedMotion()` from `gsapSetup.ts` before any animation |
| Assets | Nothing offscreen autoplays; lazy-load everything in `/assets` |

---

## Design Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--color-bg` | `#0A0A12` | Deep space charcoal — page background |
| `--color-torch` | `#FF7A33` | Warm tiki-orange — primary accent, ember glow |
| `--color-lagoon` | `#46E0D0` | Moon-cyan — secondary accent, nebula |
| `--color-neon` | `#FF3D7F` | Hot-pink — neon sign, CTA highlights |
| `--color-sand` | `#E9E2D6` | Warm bone — body text |
| `--font-display` | Rye | H1s, logo |
| `--font-body` | Space Grotesk | Body copy |
| `--font-eyebrow` | Oswald | Section labels, eyebrows |
| `--font-neon` | Monoton | Neon sign text |

---

## Commands

```bash
pnpm dev        # Turbopack dev server → localhost:3000
pnpm build      # Production build (run before calling done)
pnpm start      # Serve production build
```

---

## Gotchas

- **iCloud Drive eviction** — project is on macOS Desktop (iCloud). If `pnpm install` fails with `ETIMEDOUT`, check `stat -f "%Xf" package.json`. Flag `0x40000060` = files evicted to iCloud. Wait for sync or force-download before running install.
- **WebGL on mobile** — `Atmosphere` scales down to 280 particles on `window.innerWidth < 768`; DPR capped at 1.5. Don't remove these guards.
- **GSAP SplitText** — requires fonts to be loaded first. `ScrollTrigger.refresh()` is called in `App.tsx` inside `document.fonts.ready.then(...)`.

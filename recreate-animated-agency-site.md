# Recreating an "Astronomically Creative" Animated Agency Site (on Your Own Branding)

> Reverse-engineered structural & animation guide based on analysis of a single-page, heavily-animated digital-agency site (cosmic/space theme with hand-drawn surreal "scout" characters). This document describes **techniques and architecture only** — every illustration, character, color, and word below should be replaced with **your own original designs and brand assets**. Do not copy the source site's artwork, characters, or copy.

---

## 1. High-Level Overview

The reference site is a **single long-scroll landing page** with a dark "outer-space" backdrop. Its personality comes from three layered systems working together:

1. **A persistent WebGL star/particle background** fixed behind everything ('position:fixed; z-index:-1').
2. **Floating illustrated characters** (eyeball creatures, an astronaut-octopus kid, robots, parachuting gift boxes, a kid standing on a globe, a top-hat eyeball, a rocket "motel" monster). These are PNG/WebP cutouts and looping transparent **.webm videos** that drift along **GSAP MotionPaths** and parallax as you scroll.
3. **Scroll-triggered text & section reveals** — headlines whose letters start scattered/wavy and "snap" into place, wide letter-spaced "eyebrow" labels, and a horizontally drifting row of rotated testimonial cards.

### Tech stack detected
| Concern | Library used on reference | Notes |
|---|---|---|
| Framework | React (React Router / Remix-style; 'data-discover' hydration) | Any React or even vanilla works |
| Smooth scroll | **Lenis** ('class="lenis"', 'data-lenis-prevent') | Inertia/eased scrolling |
| Scroll animation | **GSAP + ScrollTrigger** | Pin, scrub, reveal |
| Path motion | **GSAP MotionPathPlugin** ('.motion-path', MotionPathHelper) | Characters follow curves |
| UI components | **Radix UI** ('data-radix-*', dropdowns) | Nav dropdown menus |
| Styling | **Tailwind CSS** (utility classes everywhere) | Plus arbitrary values e.g. 'z-[100]' |
| CMS / assets | Storyblok ('a.storyblok.com') + media CDN for .webm | Optional |
| Background | **WebGL canvas** | Starfield/particles |

### Fonts
- **Display headlines:** 'Oi' (ultra-chunky slab display), UPPERCASE, accent-yellow.
- **Body:** 'Space Grotesk'.
- **"Eyebrow" mini-labels:** 'LeMurmure' with very wide letter-spacing (~15px), coral-red.
- Also loaded: 'Big Shoulders', 'FKGroteskNeue'.
> Swap these for YOUR brand's display + body pairing. The *effect* (one loud display face + one clean grotesk + a wide-tracked label face) is what matters.

### Color palette (replace with your brand)
| Role | Reference value | Your value |
|---|---|---|
| Page background | near-black (#000 with radial glows) | |
| Body text | warm grey #BEBAB7 | |
| Accent / buttons | coral-red #F65F4E | |
| Headline highlight | yellow #DBCC47 | |
| Section glows | deep blue / maroon radial gradients | |

---

## 2. Page Section Map (top → bottom)

1. **Sticky header** — logo (left), centered pill nav with Radix dropdowns (Services / Projects / Industries / Insights / About), and a coral **"Let's Talk"** pill button with a tiny icon that slides in on hover.
2. **Hero** — eyebrow label + giant scramble headline + intro paragraph + CTA pill. Floating eyeballs, robots, parachuting gifts and falling astronaut-kids drift around the text.
3. **"Astronomically Creative / Exceptionally Effective"** — surreal "thinking outside the box" creature (looping .webm) above a services intro; three rotated, semi-transparent **service cards** (Marketing / Design / Development) sitting on a hand-drawn globe with a kid standing on it.
4. **"Partners in Growth"** — intro copy on the right; a horizontally scrolling band of **brightly-colored, slightly-rotated testimonial cards** that drift as you scroll. Robots & gift confetti float in the margins.
5. **"Data Driven Results"** — punk "boombox kid" character flanked by retro radios with lightning bolts; CTA to case studies.
6. **"The Latest Insights"** — planets/Saturn parallax scene with a **top-hat eyeball professor at a chalkboard**; CTA to blog.
7. **"Got a Vision? / Shoot for the Moon"** — closing CTA.
8. **Free SEO Audit form** + footer — rocket-riding monster ("MOTEL" sign), astronaut, social icons, legal links.

---

## 3. Rebuilding Each System

### 3.1 WebGL Starfield Background
A full-viewport '<canvas>' fixed behind all content:
```html
<canvas id="bg" style="position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none;"></canvas>
```
Two easy routes:
- **Three.js**: a 'THREE.Points' cloud of a few thousand particles with a soft circular sprite; slowly rotate + drift; optionally couple rotation to scroll progress.
- **Plain canvas 2D** (lighter): array of stars '{x,y,z,r}', drawn each frame with a subtle parallax/twinkle. Good enough and cheap.
Add CSS **radial-gradient glows** (blue, maroon) on section backgrounds for the nebula feel — these are separate from the canvas.

### 3.2 Smooth Scroll (Lenis) + GSAP wiring
```js
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```
Use 'data-lenis-prevent' on any inner scroll area (e.g. dropdown) that should NOT be hijacked.

### 3.3 Scramble / Wave Headline
The headline is split into ~34 individual letter '<span>'s, each animated from a randomized offset/rotation into place on scroll-enter.
```js
const h = document.querySelector('.hero h1');
h.innerHTML = [...h.textContent].map(c =>
  c === ' ' ? ' ' : '<span class="ltr">'+c+'</span>').join('');
gsap.from('.hero .ltr', {
  scrollTrigger: { trigger: '.hero', start: 'top 80%' },
  y: () => gsap.utils.random(-60,60),
  x: () => gsap.utils.random(-40,40),
  rotation: () => gsap.utils.random(-45,45),
  opacity: 0, duration: 0.8, ease: 'back.out(2)',
  stagger: { each: 0.02, from: 'random' }
});
```
For the "settling/jitter" idle look, add a tiny looping 'gsap.to' with random y on each letter.

### 3.4 Floating Characters on Motion Paths
Each character is an absolutely-positioned cutout (PNG/WebP) or a transparent looping '.webm' ('autoplay muted loop playsinline'). Wrap in '.motion-path' and tween along an SVG/array path, scrubbed to scroll:
```js
gsap.to('.eyeball-1', {
  scrollTrigger: { trigger: '#hero', start:'top top', end:'bottom top', scrub: 1 },
  motionPath: { path:[{x:0,y:0},{x:120,y:-80},{x:40,y:60}], curviness:1.5 },
  rotation: 360, ease:'none'
});
```
For simpler drift, use parallax instead: 'gsap.to(el,{ y:-150, scrollTrigger:{scrub:true}})' with different distances per layer for depth. Use MotionPathHelper during dev to draw the curves visually.

### 3.5 Transparent Looping Character Videos (.webm)
Hand-drawn animated creatures are delivered as alpha '.webm' (VP9 with alpha) for smooth frame animation that PNGs can't do:
```html
<video autoplay muted loop playsinline preload="auto"
       class="absolute inset-0 w-full h-full object-cover">
  <source src="/media/your-creature.webm" type="video/webm">
</video>
```
Provide 'small/medium' renditions and lazy-load offscreen ones. Export YOUR illustrations as alpha WebM (e.g. from After Effects / Rive / Lottie-to-video). A 'mix-blend-multiply' full-screen video is used once as an intro transition overlay.

### 3.6 Rotated Drifting Testimonial Cards
Brightly colored cards, each with a slight 'rotate(-6deg..6deg)', laid in a horizontal row that translates on scroll:
```js
gsap.to('.cards-row', {
  xPercent: -50,
  scrollTrigger:{ trigger:'.testimonials', start:'top top', end:'+=1500', scrub:1, pin:true }
});
```
Optionally pin the section so cards slide horizontally while the page is "held."

### 3.7 Eyebrow Labels & Buttons
- Eyebrow: 'text-transform:uppercase; letter-spacing:0.9em; color:var(--accent); font-family:YourLabelFont'.
- Buttons: rounded-full coral pills with a small icon; on hover an icon container expands ('w-0 → w-4', 'transition-all duration-300 overflow-hidden').

---

## 4. Replace-With-Your-Branding Checklist
- [ ] Swap cosmic theme for YOUR visual world (keep the *layered floating-character* idea, invent your own characters — do NOT reuse the eyeballs, astronaut-kids, top-hat eyeball, boombox kid, or rocket-monster).
- [ ] Replace 'Oi'/'Space Grotesk'/'LeMurmure' with your brand fonts.
- [ ] Replace #F65F4E / #DBCC47 with your accent + highlight colors.
- [ ] Re-author all copy/headlines.
- [ ] Produce your own alpha '.webm' character loops + cutout PNG/WebP layers.
- [ ] Build your own star/particle background or a brand-appropriate equivalent.

## 5. Performance & Accessibility Notes
- Respect 'prefers-reduced-motion': disable scramble/parallax/auto-playing loops.
- Lazy-load offscreen videos & large images; ship multiple renditions.
- 'will-change: transform, opacity' on animated layers (used on reference) but sparingly.
- Keep the WebGL particle count modest on mobile; pause RAF when tab hidden.
- Ensure text contrast over the dark/gradient background meets WCAG.

## 6. Suggested File Structure
```
/app
  /components  Hero, ServicesCards, Testimonials, InsightsScene, AuditForm, Footer, Header
  /lib         lenis.ts, gsapSetup.ts, useMotionPath.ts, Starfield.tsx
  /assets      /webm  /images  /fonts
```

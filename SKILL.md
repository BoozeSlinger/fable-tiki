---
name: immersive-3d-themed-landing
description: Build an immersive, scroll-driven, 3D-feeling single-page site with a fixed WebGL background, floating themed character layers on motion paths, scramble headlines, and smooth inertia scroll. Theme-agnostic recipe (example theme: "Tiki Dive-Bar on the Moon").
when_to_use: Use when building a high-personality marketing/landing/agency site that needs depth, parallax, animated characters, and a strong art-directed mood.
stack: React (or vanilla) + Lenis + GSAP (ScrollTrigger + MotionPathPlugin) + Three.js (or react-three-fiber) + Tailwind.
---

# SKILL: Immersive 3D Themed Scroll Landing

A reusable recipe for an art-directed, depth-heavy single-page site. Theme is swappable; the **systems** below stay the same.

## Core Mental Model — 4 Layers (back → front)
1. **L0 Atmosphere (fixed, z-[-1])**: WebGL canvas — particles/3D scene that subtly reacts to scroll & pointer. Sells "3D/immersive."
2. **L1 Scenery (parallax)**: large mid-ground 3D props / gradient nebula glows that move slower than scroll.
3. **L2 Characters (motion paths)**: cutout PNG/WebP + alpha .webm loops that drift along GSAP MotionPaths.
4. **L3 Content (reveals)**: headlines (per-letter scramble), body copy, cards, CTAs.

> Depth illusion = different translate speeds per layer + blur/scale on far layers + real perspective on the WebGL layer.

## Setup: Smooth Scroll + GSAP
\`\`\`js
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
\`\`\`

## Recipe A — WebGL Atmosphere (react-three-fiber)
\`\`\`jsx
// <Atmosphere/> fixed full-screen behind everything
function Atmosphere(){
  return (
    <Canvas style={{position:'fixed',inset:0,zIndex:-1}} camera={{fov:60,position:[0,0,6]}}>
      <Stars/>            {/* instanced points: dust / floating tiki embers */}
      <FogGlow/>          {/* radial nebula via shader/gradient sprite */}
      <ScrollCamera/>     {/* lerp camera.position.z to scrollProgress */}
    </Canvas>
  );
}
\`\`\`
**Tiki-moon flavor:** swap generic stars for slow-rising **ember/spark particles** + faint **lunar-dust haze**; tint fog with torch-orange + moon-cyan.

## Recipe B — Floating Characters on Motion Paths
\`\`\`js
gsap.to('.char--torch-tiki', {
  scrollTrigger:{ trigger:'#hero', start:'top top', end:'bottom top', scrub:1 },
  motionPath:{ path:[{x:0,y:0},{x:140,y:-90},{x:60,y:70}], curviness:1.5 },
  rotation: 12, ease:'none'
});
\`\`\`
Use **alpha .webm** ('autoplay muted loop playsinline') for characters that need real frame animation (flickering torch, swaying palm, blinking moon-tiki). Use PNG/WebP for static cutouts you only drift/parallax.

## Recipe C — Scramble / Assemble Headline
\`\`\`js
const h=document.querySelector('h1');
h.innerHTML=[...h.textContent].map(c=>c===' '?' ':\`<span class="ltr">\${c}</span>\`).join('');
gsap.from('.ltr',{
  scrollTrigger:{trigger:h,start:'top 80%'},
  y:()=>gsap.utils.random(-60,60), rotation:()=>gsap.utils.random(-45,45),
  opacity:0, ease:'back.out(2)', stagger:{each:.02,from:'random'}
});
\`\`\`

## Recipe D — Parallax Depth Helper
\`\`\`js
document.querySelectorAll('[data-depth]').forEach(el=>{
  const d=parseFloat(el.dataset.depth);           // 0=far .. 1=near
  gsap.to(el,{ yPercent:-40*(1-d), ease:'none',
    scrollTrigger:{trigger:el.closest('section'),scrub:true} });
});
\`\`\`

## Recipe E — Pointer Parallax (adds "3D")
\`\`\`js
window.addEventListener('pointermove',e=>{
  const nx=(e.clientX/innerWidth-.5), ny=(e.clientY/innerHeight-.5);
  gsap.to('[data-tilt]',{ x:i=>nx*30, y:ny*20, duration:.6 });
});
\`\`\`

## Performance & A11y (non-negotiable)
- Honor 'prefers-reduced-motion': kill scrubs, scramble, pointer-tilt, auto-loops.
- Lazy-load offscreen .webm/images; ship small/medium renditions.
- Cap particle count on mobile; pause RAF on 'visibilitychange'.
- 'will-change:transform,opacity' only on actively animating layers.
- Maintain WCAG contrast over dark/animated backgrounds.

## Build Order (do in this sequence)
1. Static layout + fonts + color tokens (no motion).
2. Lenis + GSAP wiring.
3. WebGL atmosphere.
4. Parallax depth on scenery.
5. Character motion paths + .webm.
6. Headline scramble + section reveals.
7. Pointer tilt polish.
8. Reduced-motion + perf pass.

import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsapSetup";

/**
 * Boot Lenis smooth scroll wired into the GSAP ticker so ScrollTrigger and
 * inertia scroll share one RAF loop. Returns a cleanup fn (or null when
 * reduced-motion is on — we leave native scrolling untouched).
 */
export function initLenis(): (() => void) | null {
  if (typeof window === "undefined") return null;
  if (prefersReducedMotion()) return null;

  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);

  if (process.env.NODE_ENV === "development") {
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
  }

  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
  };
}

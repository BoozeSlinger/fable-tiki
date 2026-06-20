import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

let registered = false;

/** Register GSAP plugins exactly once (idempotent across HMR / remounts). */
export function setupGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, SplitText, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, MotionPathPlugin, SplitText, useGSAP };

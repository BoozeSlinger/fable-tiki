import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsapSetup";

/**
 * Scrubbed parallax for any descendant carrying `data-depth` (0 = far, 1 = near).
 * Far layers travel further → depth illusion. Scope to a section via the
 * returned ref. No-op under reduced-motion. Cleanup handled by useGSAP.
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;

      gsap.utils
        .toArray<HTMLElement>(root.querySelectorAll("[data-depth]"))
        .forEach((el) => {
          const d = parseFloat(el.dataset.depth ?? "0");
          gsap.to(el, {
            yPercent: -45 * (1 - d),
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: el.closest("section") ?? root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
    },
    { scope: ref },
  );

  return ref;
}

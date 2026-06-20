import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsapSetup";

/**
 * Pointer-driven parallax tilt. Descendants with `data-tilt="<strength>"`
 * drift toward the cursor. Uses one reused `quickTo` per element (perf) and a
 * `contextSafe` handler so the listener is tracked + cleaned up by useGSAP.
 * Disabled for reduced-motion and coarse (touch) pointers.
 */
export function usePointerTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    (_context, contextSafe) => {
      const root = ref.current;
      if (!root || !contextSafe || prefersReducedMotion()) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;

      const setters = gsap.utils
        .toArray<HTMLElement>(root.querySelectorAll("[data-tilt]"))
        .map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power2.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power2.out" }),
          strength: parseFloat(el.dataset.tilt || "1"),
        }));
      if (!setters.length) return;

      const onMove = contextSafe((e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        for (const s of setters) {
          s.x(nx * 30 * s.strength);
          s.y(ny * 20 * s.strength);
        }
      });

      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: ref },
  );

  return ref;
}

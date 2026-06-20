import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsapSetup";

/**
 * Splits a heading into per-letter spans (grouped by word so words never break
 * mid-letter) and scatters → snaps them into place on scroll-enter. Sets
 * aria-label so screen readers read the full text. Reduced-motion: static.
 */
export function useScramble<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const text = (el.dataset.text ?? el.textContent ?? "").trim();
      el.setAttribute("aria-label", text);
      el.innerHTML = text
        .split(" ")
        .map(
          (word) =>
            `<span class="word">${[...word]
              .map((c) => `<span class="ltr" aria-hidden="true">${c}</span>`)
              .join("")}</span>`,
        )
        .join(" ");

      if (prefersReducedMotion()) return;

      gsap.from(".ltr", {
        scrollTrigger: { trigger: el, start: "top 85%" },
        y: () => gsap.utils.random(-70, 70),
        x: () => gsap.utils.random(-40, 40),
        rotation: () => gsap.utils.random(-50, 50),
        opacity: 0,
        duration: 0.9,
        ease: "back.out(2)",
        stagger: { each: 0.025, from: "random" },
      });
    },
    { scope: ref },
  );

  return ref;
}

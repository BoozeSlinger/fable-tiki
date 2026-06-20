"use client";
import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "../lib/gsapSetup";

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** ScrollTrigger start. Default reveals as the heading enters the viewport. */
  start?: string;
  /** Scrub to scroll instead of a one-shot play. */
  scrub?: boolean;
};

/**
 * Masked, line-by-line headline reveal (GSAP SplitText). Each line slides up
 * from behind an overflow-hidden mask as it scrolls into view. Responsive via
 * autoSplit; reduced-motion renders the text statically.
 */
export function SplitHeading({
  as = "h2",
  className = "",
  children,
  start = "top 82%",
  scrub = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { autoAlpha: 1 });
        return;
      }

      let split: SplitText | undefined;
      const build = () => {
        gsap.set(el, { autoAlpha: 1 });
        split = SplitText.create(el, {
          type: "words,lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 120,
              opacity: 0,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: el,
                start,
                end: scrub ? "bottom 60%" : undefined,
                scrub: scrub ? 1 : false,
                toggleActions: scrub ? undefined : "play none none reverse",
              },
            }),
        });
      };

      // Fonts must be loaded before splitting or line measurements are wrong.
      if (document.fonts?.status === "loaded") build();
      else document.fonts.ready.then(build);

      return () => split?.revert();
    },
    { scope: ref },
  );

  return createElement(as, { ref, className: `pre-reveal ${className}` }, children);
}

"use client";
import { createElement, useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsapSetup";

type Props = {
  children: ReactNode;
  className?: string;
  /** Element to render as the wrapper (e.g. "ul"). Default "div". */
  as?: ElementType;
  /** Stagger between child reveals (seconds). */
  stagger?: number;
  /** Initial Y offset (px). */
  y?: number;
  start?: string;
  /** Animate the wrapper itself instead of its children. */
  self?: boolean;
};

/**
 * Staggered scroll reveal for a group. By default each direct child slides up
 * and fades in as the group enters the viewport; `self` animates the wrapper.
 * No-ops under reduced-motion (content stays visible).
 */
export function Reveal({
  children,
  className = "",
  as = "div",
  stagger = 0.12,
  y = 28,
  start = "top 84%",
  self = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const targets = self
        ? [el]
        : gsap.utils.toArray<HTMLElement>(el.children);
      if (!targets.length) return;

      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref },
  );

  return createElement(as, { ref, className }, children);
}

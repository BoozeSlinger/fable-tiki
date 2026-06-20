"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/gsapSetup";

const NAV = [
  { label: "The Diagnostic", href: "#diagnostic" },
  { label: "Selected Works", href: "#work" },
  { label: "The Foundation", href: "#foundation" },
  { label: "The Tabs", href: "#engines" },
];

export function Header() {
  const ref = useRef<HTMLElement>(null);

  // Hide on scroll-down, reveal on scroll-up — but always show over the hero.
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const showAnim = gsap
        .from(el, { yPercent: -120, paused: true, duration: 0.35, ease: "power2.out" })
        .progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (self.scroll() < window.innerHeight * 0.6) {
            showAnim.play();
            return;
          }
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        },
      });
    },
    { scope: ref },
  );

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6"
    >
      {/* Fluid glass island — detached from the top edge */}
      <div className="flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 bg-bg/55 py-2.5 pl-4 pr-2.5 shadow-[0_0_60px_-20px_rgba(70,224,208,0.25),inset_0_1px_1px_rgba(255,255,255,0.08)] backdrop-blur-xl sm:pl-5">
        <a href="#hero" className="flex shrink-0 items-center gap-2.5">
          <img
            src="/assets/lcc-logo.png"
            alt="Last Call Collective"
            className="h-9 w-auto opacity-95 sm:h-10"
            draggable={false}
          />
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-[0.82rem] text-sand/70 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/10 hover:text-sand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#reserve"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-torch py-1.5 pl-5 pr-1.5 text-sm font-semibold text-[#1a0d05] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_0_30px_-4px_var(--color-torch)] active:scale-[0.97]"
        >
          Open a Tab
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a0d05]/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-px group-hover:translate-x-0.5">
            ↗
          </span>
        </a>
      </div>
    </header>
  );
}

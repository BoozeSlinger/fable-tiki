"use client";
import { SplitHeading } from "./SplitHeading";
import { Reveal } from "./Reveal";

export function FindUs() {
  return (
    <section id="find-us" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow mb-4">Find Us</p>
        <SplitHeading className="font-display text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.95] text-sand">
          Dock at Crater&nbsp;7
        </SplitHeading>

        <Reveal stagger={0.14}>
          <p className="mt-6 font-mono text-sm tracking-wide text-lagoon">
            Sea of Tranquility · 0.674° N, 23.472° E · Sublevel −2
          </p>
          <p className="mx-auto mt-6 max-w-md text-sand/70">
            Bring your own oxygen, we will handle the ice. Airlock opens at dusk
            (Earth time, roughly). Look for the flickering sign — it is the only
            warm light for 384,000 kilometers.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-sand/60">
            <span>Tue – Sun · 18:00 → late</span>
            <span aria-hidden="true" className="text-sand/20">|</span>
            <span>Closed on full Earth</span>
          </div>
          <a
            href="#reserve"
            className="mt-12 inline-block rounded-full bg-torch px-8 py-4 text-sm font-semibold text-[#1a0d05] shadow-[0_0_36px_-6px_var(--color-torch)] transition-transform hover:scale-105"
          >
            Reserve a Pod
          </a>
        </Reveal>
      </div>
    </section>
  );
}

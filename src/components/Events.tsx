"use client";
import { SplitHeading } from "./SplitHeading";
import { Reveal } from "./Reveal";

export function Events() {
  return (
    <section id="last-call" className="relative overflow-hidden py-28 sm:py-40">
      <div className="nebula-torch pointer-events-none absolute left-1/2 top-1/4 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-25" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow mb-6">The Reckoning</p>
        <p className="neon-sign text-[clamp(2.6rem,12vw,8rem)] leading-none">
          LAST CALL
        </p>
        <SplitHeading className="mt-8 font-display text-[clamp(1.9rem,5vw,3.2rem)] leading-[1.02] text-sand">
          Still leaking cash?
        </SplitHeading>

        <Reveal>
          <p className="mx-auto mt-6 max-w-xl text-sand/75">
            If you&apos;re seeing 15%+ shrinkage or dead weeknights, you&apos;re
            not just slowing down — you&apos;re bleeding. Tired of renting
            traffic and ready to own your market? Let&apos;s talk numbers before
            it&apos;s last call for good.
          </p>
        </Reveal>

        <Reveal self y={18}>
          <a
            href="#reserve"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-torch py-2 pl-7 pr-2 text-sm font-semibold text-[#1a0d05] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_0_40px_-6px_var(--color-torch)] active:scale-[0.98]"
          >
            Book Your Audit
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a0d05]/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-px group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

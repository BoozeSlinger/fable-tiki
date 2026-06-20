"use client";
import { useState } from "react";
import { SplitHeading } from "./SplitHeading";
import { Reveal } from "./Reveal";

const FIELD =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sand placeholder:text-sand/35 outline-none transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus:border-lagoon/60";

export function ReserveForm() {
  const [sent, setSent] = useState(false);

  return (
    <section id="reserve" className="relative overflow-hidden py-28 sm:py-40">
      <div className="nebula-lagoon pointer-events-none absolute -right-20 top-10 h-[360px] w-[360px] rounded-full opacity-25" />
      <div className="relative mx-auto max-w-xl px-6">
        <div className="text-center">
          <p className="eyebrow mb-4">Open a Tab</p>
          <SplitHeading className="font-display text-[clamp(2.2rem,5.4vw,3.6rem)] text-sand">
            Let&apos;s talk numbers
          </SplitHeading>
          <Reveal>
            <p className="mx-auto mt-4 max-w-md text-sand/70">
              Tell us about your venue. We&apos;ll run the free express audit and
              come back with exactly where you&apos;re leaking — and what it&apos;s
              worth to plug it.
            </p>
          </Reveal>
        </div>

        {sent ? (
          <div className="mt-10 rounded-[2rem] border border-lagoon/30 bg-lagoon/[0.06] p-1.5">
            <div className="rounded-[calc(2rem-0.375rem)] bg-bg/40 p-10 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
              <p className="font-display text-2xl text-lagoon">
                Tab&apos;s open 🍸
              </p>
              <p className="mt-3 text-sand/75">
                We got it. Expect your audit and a straight-talk reply within one
                business day — no AI slop, just numbers.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-10"
          >
            <Reveal className="grid gap-4" stagger={0.08}>
              <input className={FIELD} placeholder="Your name" required aria-label="Name" />
              <input
                className={FIELD}
                type="email"
                placeholder="Email"
                required
                aria-label="Email"
              />
              <input
                className={FIELD}
                placeholder="Venue name + city"
                required
                aria-label="Venue"
              />
              <select
                className={FIELD}
                defaultValue=""
                aria-label="What you need"
                required
              >
                <option value="" disabled>
                  What are you after?
                </option>
                <option>The $97 AI Truth Audit</option>
                <option>The Foundation (Phase 1 build)</option>
                <option>A monthly engine (Phase 2)</option>
                <option>Honestly, just talking</option>
              </select>
              <button
                type="submit"
                className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-torch py-3.5 text-sm font-semibold text-[#1a0d05] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_0_40px_-6px_var(--color-torch)] active:scale-[0.99]"
              >
                Send it over
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </Reveal>
          </form>
        )}
      </div>
    </section>
  );
}

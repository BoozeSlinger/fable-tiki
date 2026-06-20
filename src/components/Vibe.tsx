"use client";
import { useParallax } from "../lib/useParallax";
import { SplitHeading } from "./SplitHeading";
import { Reveal } from "./Reveal";

const STATS = [
  { k: "You own", v: "100%" },
  { k: "Directories synced", v: "20+" },
  { k: "Review response", v: "<48h" },
];

export function Vibe() {
  const ref = useParallax<HTMLDivElement>();

  return (
    <section id="vibe" className="relative overflow-hidden py-28 sm:py-40">
      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <div
          data-depth="0.05"
          className="nebula-lagoon pointer-events-none absolute -right-24 -top-10 h-[460px] w-[460px] rounded-full opacity-50"
        />
        <div
          data-depth="0.2"
          className="nebula-torch pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full opacity-40"
        />

        <div className="relative grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow mb-4">Why the House</p>
            <SplitHeading className="font-display text-[clamp(2rem,5.4vw,3.8rem)] leading-[1.04] text-sand">
              We&apos;ve been in the weeds on a Saturday night
            </SplitHeading>

            <Reveal stagger={0.15}>
              <p className="mt-6 max-w-md text-sand/75">
                Stop paying agencies that post AI slop and have never closed out
                a bar at 2 a.m. We&apos;ve poured the drinks, run the floor, and
                counted the till. Then we learned to build the websites,
                automations, and AI visibility that turn a slow Tuesday into a
                line out the door.
              </p>

              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
                {STATS.map((s) => (
                  <div key={s.k}>
                    <dt className="text-xs uppercase tracking-[0.2em] text-sand/45">
                      {s.k}
                    </dt>
                    <dd className="font-display text-2xl text-torch">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Double-bezel manifesto card */}
          <div
            data-depth="0.6"
            className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md"
          >
            <div className="relative rounded-[calc(2rem-0.375rem)] bg-bg/40 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <div className="nebula-lagoon pointer-events-none absolute inset-0 rounded-[calc(2rem-0.375rem)] opacity-20" />
              <Reveal stagger={0.15} y={20}>
                <p className="relative font-display text-xl leading-snug text-lagoon">
                  &ldquo;When someone asks Siri where to grab a drink, you should
                  be the answer — not invisible.&rdquo;
                </p>
                <p className="relative mt-4 text-sm leading-relaxed text-sand/70">
                  We build the machine that makes you a top recommendation in AI
                  and local search, then we keep the lights flickering so the
                  whole galaxy knows you&apos;re open. Fine ideas, good results.
                </p>
                <p className="relative mt-6 text-xs uppercase tracking-[0.25em] text-sand/40">
                  — Last Call Collective · Your Local Creative
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

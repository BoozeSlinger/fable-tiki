"use client";
import { useParallax } from "../lib/useParallax";
import { SplitHeading } from "./SplitHeading";
import { Reveal } from "./Reveal";

const FEATURES = [
  {
    n: "01",
    title: "High-Converting Website",
    desc: "A custom build tuned for AEO, SEO, and GEO so you show up as the top recommendation in AI and local search.",
    span: "md:col-span-3 md:row-span-2",
    accent: "torch",
  },
  {
    n: "02",
    title: "2-Hour Content Studio",
    desc: "50 edited photos + 5 high-impact short-form videos. We make your $6 cocktail look like $15.",
    span: "md:col-span-3",
    accent: "lagoon",
  },
  {
    n: "03",
    title: "Digital Infrastructure",
    desc: "Sync across Google, Yelp, Apple Maps, and 20+ directories. Total algorithmic trust.",
    span: "md:col-span-3",
    accent: "neon",
  },
  {
    n: "04",
    title: "The Equity Vault",
    desc: "A custom landing page and database. You own your customers' info — not Yelp, not Instagram.",
    span: "md:col-span-2",
    accent: "lagoon",
  },
  {
    n: "05",
    title: "Custom Asset Design",
    desc: "On-brand QR designs and physical hooks that capture guest data automatically in the venue.",
    span: "md:col-span-2",
    accent: "torch",
  },
  {
    n: "06",
    title: "Missed-Call Text-Back",
    desc: "An automated safety net that texts guests back to book the second you're too slammed to answer.",
    span: "md:col-span-2",
    accent: "neon",
  },
] as const;

const ACCENT: Record<string, string> = {
  torch: "text-torch",
  lagoon: "text-lagoon",
  neon: "text-neon",
};

export function Foundation() {
  const ref = useParallax<HTMLDivElement>();

  return (
    <section id="foundation" className="relative overflow-hidden py-28 sm:py-40">
      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <div
          data-depth="0.08"
          className="nebula-torch pointer-events-none absolute -right-28 top-10 h-[460px] w-[460px] rounded-full opacity-30"
        />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">Phase 1 · The Digital Renovation</p>
            <SplitHeading className="font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98] text-sand">
              The Foundation
            </SplitHeading>
            <Reveal>
              <p className="mt-5 max-w-xl text-sand/70">
                We build the machine that makes you a top recommendation. Stop
                losing customers to the bar down the street before they ever
                walk in.
              </p>
            </Reveal>
          </div>

          <Reveal self y={20} className="shrink-0">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl text-sand/35 line-through">
                $2,500
              </span>
              <span className="font-display text-5xl text-torch [text-shadow:0_0_30px_rgba(255,122,51,0.4)]">
                $1,500
              </span>
            </div>
            <p className="mt-1 text-right text-xs uppercase tracking-[0.2em] text-lagoon">
              Partner case-study pricing
            </p>
          </Reveal>
        </div>

        {/* Asymmetric bento — double-bezel cards */}
        <div className="relative mt-14 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-5 md:grid-cols-6">
          {FEATURES.map((f) => (
            <Reveal
              key={f.n}
              self
              y={26}
              className={`reveal-card ${f.span}`}
            >
              <article className="group h-full rounded-[2rem] border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/20">
                <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] bg-bg/40 p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                  <span className={`font-display text-2xl ${ACCENT[f.accent]} opacity-75`}>
                    {f.n}
                  </span>
                  <h3 className="mt-3 font-display text-xl text-sand">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-sand/65">
                    {f.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal self y={18}>
          <div className="mt-12 text-center">
            <a
              href="#reserve"
              className="group inline-flex items-center gap-2 rounded-full bg-torch py-2 pl-7 pr-2 text-sm font-semibold text-[#1a0d05] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_0_40px_-6px_var(--color-torch)] active:scale-[0.98]"
            >
              Start the Renovation
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a0d05]/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-px group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

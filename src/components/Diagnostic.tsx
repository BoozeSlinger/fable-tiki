"use client";
import { useParallax } from "../lib/useParallax";
import { usePointerTilt } from "../lib/usePointerTilt";
import { SplitHeading } from "./SplitHeading";
import { Reveal } from "./Reveal";

const INSPECT = [
  {
    n: "01",
    title: "AI Visibility Score",
    desc: "Do ChatGPT, Siri, and Gemini actually recommend you when a thirsty stranger asks where to drink? We score exactly how visible you are.",
    accent: "lagoon",
  },
  {
    n: "02",
    title: "Digital Plumbing Check",
    desc: "Broken links, wrong hours, and data leaks quietly killing your ranking across the map. We find every leak before it drains a Saturday.",
    accent: "torch",
  },
  {
    n: "03",
    title: "Competitor Spy Report",
    desc: "Exactly who is stealing your traffic, what they're doing, and how to take it back. The bar down the street isn't smarter — just louder.",
    accent: "neon",
  },
] as const;

const RING: Record<string, string> = {
  lagoon: "text-lagoon",
  torch: "text-torch",
  neon: "text-neon",
};

export function Diagnostic() {
  const ref = useParallax<HTMLDivElement>();
  const tiltRef = usePointerTilt<HTMLDivElement>();

  return (
    <section id="diagnostic" className="relative overflow-hidden py-28 sm:py-40">
      <div ref={ref} className="relative mx-auto max-w-6xl px-6">
        <div
          data-depth="0.1"
          className="nebula-torch pointer-events-none absolute -left-20 top-0 h-[420px] w-[420px] rounded-full opacity-30"
        />

        <div className="relative grid items-end gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow mb-4">The Diagnostic</p>
            <SplitHeading className="font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98] text-sand">
              The AI Truth Audit
            </SplitHeading>
            <Reveal>
              <p className="mt-6 max-w-xl text-lg text-sand/75">
                When someone asks Siri or ChatGPT where to grab a drink, are you
                the answer — or are you invisible? In one scan we&apos;ll show
                you the truth.
              </p>
            </Reveal>
          </div>

          {/* Price chip — double-bezel */}
          <Reveal self y={24} className="md:justify-self-end">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md">
              <div className="rounded-[calc(1.75rem-0.375rem)] bg-bg/40 px-7 py-6 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <p className="text-xs uppercase tracking-[0.25em] text-sand/45">
                  Flat rate
                </p>
                <p className="font-display text-5xl text-torch [text-shadow:0_0_30px_rgba(255,122,51,0.4)]">
                  $97
                </p>
                <p className="mt-1 text-xs text-lagoon">credited back 100%</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* What we inspect — tilting double-bezel cards */}
        <div
          ref={tiltRef}
          className="relative mt-16 grid gap-6 md:grid-cols-3"
        >
          {INSPECT.map((item) => (
            <article
              key={item.n}
              data-tilt={0.4}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] bg-bg/40 p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                <span
                  className={`font-display text-3xl ${RING[item.accent]} opacity-80`}
                >
                  {item.n}
                </span>
                <h3 className="mt-4 font-display text-2xl text-sand">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sand/65">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Guarantee bar */}
        <Reveal self y={20}>
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-full border border-lagoon/25 bg-lagoon/[0.05] px-7 py-5 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-sand/80">
              <span className="font-semibold text-lagoon">The guarantee:</span>{" "}
              move forward with the Foundation and the $97 is credited back, 100%.
              You pay nothing for the truth.
            </p>
            <a
              href="#reserve"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-torch py-2 pl-6 pr-2 text-sm font-semibold text-[#1a0d05] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_0_30px_-4px_var(--color-torch)] active:scale-[0.97]"
            >
              Get the Truth
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a0d05]/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-px group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

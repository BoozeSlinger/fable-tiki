"use client";
import { SplitHeading } from "./SplitHeading";
import { Reveal } from "./Reveal";

type Tier = {
  name: string;
  price: string;
  blurb: string;
  features: string[];
  accent: "lagoon" | "torch" | "neon";
  popular?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "The Well",
    price: "$449",
    blurb: "The insurance policy. Protect your reputation without the busywork.",
    accent: "lagoon",
    features: [
      "Reputation defense — every review answered within 48 hours",
      "The active signal — weekly Google Profile updates + monthly local blog",
      "Listing maintenance — 24/7 sync of hours and menu details",
      "Equity Vault management — your database, you own the info",
    ],
  },
  {
    name: "The Call",
    price: "$1,149",
    blurb: "The 'fill the seats' button. The engine that drives revenue.",
    accent: "torch",
    popular: true,
    features: [
      "Everything in The Well",
      "Liquid Asset System — 12 SMS activations + 'The Pour' email campaign",
      "Missed-call recovery — full text-back management",
      "Group Revenue Engine — automated birthday & anniversary bookings",
      "Social autopilot — 12 strategic posts a month",
      "6 local influencers / month + monthly ROI review",
    ],
  },
  {
    name: "Top Shelf",
    price: "$2,449",
    blurb: "The household name. For the venue that wants to be #1 in the city.",
    accent: "neon",
    features: [
      "Everything in The Call",
      "Monthly Content Studio — 2-hour shoot (50 photos + 5 reels)",
      "Daily social management — 5–7 posts a week with lead capture",
      "Aggressive outreach — 10+ local influencers a month",
      "Priority VIP access — direct 24/7 text line to the owner",
    ],
  },
];

const ACCENT: Record<Tier["accent"], { text: string; ring: string; glow: string }> = {
  lagoon: {
    text: "text-lagoon",
    ring: "border-lagoon/25",
    glow: "shadow-[0_0_80px_-30px_var(--color-lagoon)]",
  },
  torch: {
    text: "text-torch",
    ring: "border-torch/40",
    glow: "shadow-[0_0_90px_-24px_var(--color-torch)]",
  },
  neon: {
    text: "text-neon",
    ring: "border-neon/25",
    glow: "shadow-[0_0_80px_-30px_var(--color-neon)]",
  },
};

export function Engines() {
  return (
    <section id="engines" className="relative overflow-hidden py-28 sm:py-40">
      <div className="nebula-lagoon pointer-events-none absolute left-1/2 top-0 h-[460px] w-[460px] -translate-x-1/2 rounded-full opacity-20" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="eyebrow mb-4">Phase 2 · Revenue Engines</p>
          <SplitHeading className="mx-auto font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.98] text-sand">
            Build the bar, then fill it
          </SplitHeading>
          <Reveal>
            <p className="mx-auto mt-5 max-w-xl text-sand/70">
              Most agencies sell clicks. We deal in revenue and regulars. Choose
              your engine — every tier sits on a Foundation renovation.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {TIERS.map((t) => {
            const a = ACCENT[t.accent];
            return (
              <Reveal
                key={t.name}
                self
                y={30}
                className={t.popular ? "lg:-mt-6 lg:mb-6" : ""}
              >
                <article
                  className={`group relative h-full rounded-[2rem] border bg-white/[0.04] p-1.5 backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 ${a.ring} ${t.popular ? a.glow : ""}`}
                >
                  {t.popular && (
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-torch px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#1a0d05]">
                      ★ Most Popular
                    </span>
                  )}
                  <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] bg-bg/50 p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                    <h3 className={`font-display text-3xl ${a.text}`}>
                      {t.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="font-display text-4xl text-sand">
                        {t.price}
                      </span>
                      <span className="text-sm text-sand/45">/ month</span>
                    </div>
                    <p className="mt-3 text-sm italic text-sand/60">{t.blurb}</p>

                    <ul className="mt-7 space-y-3 text-sm text-sand/75">
                      {t.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <span className={`mt-px shrink-0 ${a.text}`}>→</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#reserve"
                      className={`group/btn mt-8 inline-flex items-center justify-between gap-2 rounded-full py-2 pl-6 pr-2 text-sm font-semibold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${t.popular ? "bg-torch text-[#1a0d05] hover:shadow-[0_0_30px_-4px_var(--color-torch)]" : "border border-white/15 text-sand hover:bg-white/10"}`}
                    >
                      Inquire
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/btn:-translate-y-px group-hover/btn:translate-x-0.5 ${t.popular ? "bg-[#1a0d05]/15" : "bg-white/10"}`}
                      >
                        ↗
                      </span>
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal self>
          <p className="mt-10 text-center text-xs uppercase tracking-[0.2em] text-sand/40">
            Month-to-month · cancel anytime with 30 days&apos; notice · you own
            everything we build
          </p>
        </Reveal>
      </div>
    </section>
  );
}

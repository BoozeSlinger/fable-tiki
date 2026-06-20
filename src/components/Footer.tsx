"use client";
import { Reveal } from "./Reveal";

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Book a call", href: "#reserve" },
  { label: "FAQ", href: "https://lastcall.marketing/faq" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-16">
      <Reveal
        className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-3"
        stagger={0.12}
      >
        <div>
          <img
            src="/assets/lcc-badge.png"
            alt="Last Call Collective"
            className="h-20 w-20 rounded-full"
            draggable={false}
          />
          <p className="mt-4 max-w-xs text-sm text-sand/55">
            By the industry, for the industry. We build the revenue engine that
            puts asses in your barstools. Fine ideas &amp; good results.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-sand/40">
            The House
          </p>
          <ul className="mt-3 space-y-1 text-sm text-sand/70">
            <li>$97 AI Truth Audit</li>
            <li>The Foundation · from $1,500</li>
            <li>Revenue engines · from $449/mo</li>
            <li>You own everything we build</li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-sand/40">Signal</p>
          <ul className="mt-3 space-y-1 text-sm">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="text-sand/70 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-lagoon"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-2 px-6 text-xs text-sand/35 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Last Call Collective · Your Local Creative</p>
        <p>Month-to-month · cancel anytime · no AI slop</p>
      </div>
    </footer>
  );
}

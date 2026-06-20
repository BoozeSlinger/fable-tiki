"use client";
import { useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  prefersReducedMotion,
} from "../lib/gsapSetup";
import { SplitHeading } from "./SplitHeading";

type Work = {
  name: string;
  tag: string;
  desc: string;
  img: string;
  accent: "torch" | "lagoon" | "neon";
  rot: number;
};

const WORK: Work[] = [
  {
    name: "Gra Pow Riverside",
    tag: "AEO · AI Receptionist",
    desc: "A Thai restaurant-bar that now answers its own phone and shows up first when AI gets asked where to eat in Riverside.",
    img: "/assets/work/grapow.png",
    accent: "torch",
    rot: -3,
  },
  {
    name: "Killer Queens Social House",
    tag: "Design · Marketing",
    desc: "Full visual identity and a content engine that turned Thursday-night martinis and beer-pong nights into a packed room.",
    img: "/assets/work/killer-queens.png",
    accent: "neon",
    rot: 2.5,
  },
  {
    name: "Happy Dad Hard Seltzer",
    tag: "Local Marketing",
    desc: "On-the-ground activation work for a national seltzer brand — local reach without the national agency price tag.",
    img: "/assets/work/happy-dad.jpg",
    accent: "lagoon",
    rot: -1.5,
  },
  {
    name: "Proabition",
    tag: "CRM · Automation",
    desc: "Missed-call text-back, group-booking automations, and an equity vault so they own their guests — not Yelp.",
    img: "/assets/work/proabition.jpg",
    accent: "torch",
    rot: 3,
  },
];

const ACCENT: Record<Work["accent"], string> = {
  torch: "border-torch/30 shadow-[0_0_70px_-24px_var(--color-torch)]",
  lagoon: "border-lagoon/30 shadow-[0_0_70px_-24px_var(--color-lagoon)]",
  neon: "border-neon/30 shadow-[0_0_70px_-24px_var(--color-neon)]",
};

const ACCENT_TEXT: Record<Work["accent"], string> = {
  torch: "text-torch",
  lagoon: "text-lagoon",
  neon: "text-neon",
};

export function MenuCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || reduced) return;

      const distance = () => track.scrollWidth - window.innerWidth;

      // 1) Pinned horizontal scroll — the track moves left as the page scrolls.
      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current)
              gsap.set(progressRef.current, { scaleX: self.progress });
          },
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".menu-card");

      // 2) Each card rises + fades in as it enters the horizontal viewport.
      cards.forEach((card) => {
        gsap.from(card, {
          autoAlpha: 0,
          yPercent: 16,
          scale: 0.92,
          ease: "power2.out",
          scrollTrigger: {
            containerAnimation: scrollTween,
            trigger: card,
            start: "left 95%",
            end: "left 55%",
            scrub: true,
          },
        });
      });

      // 3) Velocity skew — cards lean into fast scrolls, then settle.
      const skewSetter = gsap.quickSetter(cards, "skewX", "deg");
      const clamp = gsap.utils.clamp(-10, 10);
      const proxy = { skew: 0 };
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + distance(),
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -320);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-28"
    >
      <div className="mx-auto mb-12 max-w-6xl px-6">
        <p className="eyebrow mb-3">Selected Works</p>
        <SplitHeading className="font-display text-[clamp(2rem,5.4vw,3.8rem)] text-sand">
          The regulars
        </SplitHeading>
        <p className="mt-4 max-w-xl text-sand/65">
          Real venues. Real revenue. We build the bar, then we fill it.
        </p>
      </div>

      <div
        ref={trackRef}
        className={
          reduced
            ? "flex flex-wrap justify-center gap-8 px-6"
            : "flex gap-8 px-[8vw] will-change-transform"
        }
      >
        {WORK.map((w) => (
          <article
            key={w.name}
            style={{ rotate: `${w.rot}deg` }}
            className={`menu-card flex w-[82vw] max-w-[380px] shrink-0 flex-col overflow-hidden rounded-[2rem] border bg-white/[0.04] p-1.5 backdrop-blur-md transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:!rotate-0 sm:w-[380px] ${ACCENT[w.accent]}`}
          >
            <div className="overflow-hidden rounded-[calc(2rem-0.375rem)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(2rem-0.375rem)] rounded-b-none">
                <img
                  src={w.img}
                  alt={w.name}
                  draggable={false}
                  className="h-full w-full select-none object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
              </div>
              <div className="bg-bg/40 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                <span
                  className={`text-[0.7rem] uppercase tracking-[0.25em] ${ACCENT_TEXT[w.accent]}`}
                >
                  {w.tag}
                </span>
                <h3 className="mt-2 font-display text-2xl leading-tight text-sand">
                  {w.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sand/65">
                  {w.desc}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!reduced && (
        <div className="mx-auto mt-12 h-px w-[60%] max-w-md overflow-hidden rounded-full bg-white/10">
          <div
            ref={progressRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-torch via-lagoon to-neon"
          />
        </div>
      )}
    </section>
  );
}

"use client";
import { type CSSProperties } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsapSetup";
import { useScramble } from "../lib/useScramble";
import { usePointerTilt } from "../lib/usePointerTilt";

type FloatVars = CSSProperties & {
  "--floaty-dur"?: string;
  "--floaty-delay"?: string;
  "--floaty-rot"?: string;
};

export function Hero() {
  const headingRef = useScramble<HTMLHeadingElement>();
  const sceneRef = usePointerTilt<HTMLDivElement>();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".hero-reveal", {
        y: 34,
        autoAlpha: 0,
        filter: "blur(8px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });

      const drift = (
        sel: string,
        path: { x: number; y: number }[],
        rotation: number,
      ) =>
        gsap.to(sel, {
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
          motionPath: { path, curviness: 1.5 },
          rotation,
          ease: "none",
        });

      drift(".char--idol", [
        { x: 0, y: 0 },
        { x: 50, y: -50 },
        { x: 14, y: 70 },
      ], 6);
      drift(".char--bartender", [
        { x: 0, y: 0 },
        { x: -70, y: 50 },
        { x: -18, y: 130 },
      ], -8);
      drift(".char--cocktail", [
        { x: 0, y: 0 },
        { x: 44, y: 64 },
        { x: -12, y: 150 },
      ], 12);
    },
    { scope: sceneRef },
  );

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      <div ref={sceneRef} className="absolute inset-0">
        {/* L2 — floating characters (each: motion-path → tilt → idle-float) */}
        <Character
          className="char--idol right-[2%] top-[12%] z-0 w-[46vmin] max-w-[460px] sm:right-[5%]"
          src="/assets/idol.webp"
          tilt={0.5}
          glow="glow-torch"
          floaty={{ "--floaty-dur": "8s" }}
        />
        <Character
          className="char--bartender left-[-5%] top-[18%] z-10 hidden w-[34vmin] max-w-[340px] sm:left-[1%] sm:block"
          src="/assets/bartender.webp"
          tilt={0.9}
          glow="glow-lagoon"
          floaty={{ "--floaty-dur": "6.5s", "--floaty-delay": "-1.5s", "--floaty-rot": "-3deg" }}
        />
        <Character
          className="char--cocktail bottom-[10%] right-[12%] z-30 w-[19vmin] max-w-[190px]"
          src="/assets/cocktail.webp"
          tilt={1.4}
          glow="glow-neon"
          floaty={{ "--floaty-dur": "5.5s", "--floaty-delay": "-0.8s", "--floaty-rot": "4deg" }}
        />
      </div>

      {/* L3 — content */}
      <div className="relative z-20 mx-auto w-full max-w-5xl px-6 text-center">
        <p className="eyebrow hero-reveal mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-lagoon shadow-[0_0_10px_var(--color-lagoon)]" />
          By the industry · For the industry
        </p>
        <h1
          ref={headingRef}
          data-text="THE HOUSE STANDARD"
          className="hero-reveal font-display text-[clamp(3rem,12vw,8.5rem)] leading-[0.9] text-sand [text-shadow:0_0_50px_rgba(255,122,51,0.28)]"
        >
          THE HOUSE STANDARD
        </h1>
        <p className="hero-reveal mx-auto mt-8 max-w-2xl text-base leading-relaxed text-sand/75 sm:text-lg">
          We have experience in the bar and behind the bar — not just behind a
          screen. We build the revenue engine that puts asses in your barstools:
          high-converting sites, AI visibility, and content that makes your $6
          cocktail look like $15.
        </p>
        <div className="hero-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#diagnostic"
            className="group inline-flex items-center gap-2 rounded-full bg-torch py-2 pl-7 pr-2 text-sm font-semibold text-[#1a0d05] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_0_40px_-6px_var(--color-torch)] active:scale-[0.98]"
          >
            Get the Truth — $97
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a0d05]/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-px group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
          <a
            href="#work"
            className="rounded-full border border-lagoon/40 px-7 py-3.5 text-sm font-semibold text-lagoon transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-lagoon/10"
          >
            See the Work
          </a>
        </div>
      </div>

      {/* scroll cue */}
      <div className="hero-reveal pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[0.7rem] tracking-[0.4em] text-sand/40">
        SCROLL TO ENTER
      </div>
    </section>
  );
}

function Character({
  className,
  src,
  tilt,
  glow,
  floaty,
}: {
  className: string;
  src: string;
  tilt: number;
  glow: string;
  floaty: FloatVars;
}) {
  return (
    <div className={`char pointer-events-none absolute ${className}`}>
      <div data-tilt={tilt}>
        <div className="floaty" style={floaty}>
          <img
            src={src}
            alt=""
            draggable={false}
            className={`w-full select-none ${glow}`}
          />
        </div>
      </div>
    </div>
  );
}

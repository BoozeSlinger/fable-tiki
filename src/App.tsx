"use client";
import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { setupGsap, ScrollTrigger } from "./lib/gsapSetup";
import { initLenis } from "./lib/lenis";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Vibe } from "./components/Vibe";
import { Diagnostic } from "./components/Diagnostic";
import { MenuCards } from "./components/MenuCards";
import { Foundation } from "./components/Foundation";
import { Engines } from "./components/Engines";
import { Events } from "./components/Events";
import { ReserveForm } from "./components/ReserveForm";
import { Footer } from "./components/Footer";

// Lazy-load the WebGL atmosphere so Three.js is split out of the initial
// bundle — the hero content paints first, the fixed background fades in after.
// ssr:false is required: r3f uses document/window at module evaluation time.
const Atmosphere = dynamic(
  () => import("./three/Atmosphere").then((m) => ({ default: m.Atmosphere })),
  { ssr: false },
);

setupGsap();

export function App() {
  useEffect(() => initLenis() ?? undefined, []);

  // Recompute trigger positions once web fonts settle so SplitText line
  // measurements are correct and any reveal already in view fires.
  useEffect(() => {
    if (typeof document === "undefined" || !document.fonts) return;
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <Atmosphere />
      </Suspense>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Vibe />
        <Diagnostic />
        <MenuCards />
        <Foundation />
        <Engines />
        <Events />
        <ReserveForm />
      </main>
      <Footer />
    </>
  );
}

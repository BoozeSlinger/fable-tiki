"use client";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { Embers } from "./Embers";
import { FogGlow } from "./FogGlow";
import { ScrollCamera } from "./ScrollCamera";

/**
 * Fixed full-screen WebGL atmosphere living behind all content (z-index -1).
 * Particle count scales down on mobile; all motion stills under reduced-motion.
 */
export function Atmosphere() {
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    [],
  );
  const count = isMobile ? 280 : 700;

  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
      camera={{ fov: 60, position: [0, 0, 6] }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <FogGlow reduced={reduced} />
      <Embers count={count} reduced={reduced} />
      <ScrollCamera reduced={reduced} />
    </Canvas>
  );
}

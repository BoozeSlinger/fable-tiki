"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TORCH = new THREE.Color("#ff7a33");
const LAGOON = new THREE.Color("#46e0d0");
const WHITE = new THREE.Color("#ffffff");

/** Rising tiki embers / lunar dust as an additive points cloud. */
export function Embers({ count = 700, reduced = false }: { count?: number; reduced?: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, speeds, sprite } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      c.copy(Math.random() > 0.45 ? TORCH : LAGOON).lerp(WHITE, Math.random() * 0.3);
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      speeds[i] = 0.12 + Math.random() * 0.55;
    }

    const cnv = document.createElement("canvas");
    cnv.width = cnv.height = 64;
    const ctx = cnv.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(cnv);

    return { positions, colors, speeds, sprite };
  }, [count]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    if (!reduced) {
      const t = state.clock.elapsedTime;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += speeds[i] * delta;
        arr[i * 3 + 0] += Math.sin(t * 0.3 + i) * 0.0015;
        if (arr[i * 3 + 1] > 8) arr[i * 3 + 1] = -8;
      }
      attr.needsUpdate = true;
      pts.rotation.y += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.085}
        map={sprite}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

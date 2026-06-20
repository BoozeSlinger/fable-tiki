"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function radialTexture(color: string) {
  const cnv = document.createElement("canvas");
  cnv.width = cnv.height = 256;
  const ctx = cnv.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(cnv);
}

/** Two drifting nebula glows — torch-orange + moon-cyan — behind the embers. */
export function FogGlow({ reduced = false }: { reduced?: boolean }) {
  const torchRef = useRef<THREE.Mesh>(null);
  const lagoonRef = useRef<THREE.Mesh>(null);
  const torchTex = useMemo(() => radialTexture("rgba(255,122,51,0.5)"), []);
  const lagoonTex = useMemo(() => radialTexture("rgba(70,224,208,0.42)"), []);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    if (torchRef.current) {
      torchRef.current.position.x = -3 + Math.sin(t * 0.1) * 0.7;
      torchRef.current.position.y = -1.5 + Math.cos(t * 0.13) * 0.5;
    }
    if (lagoonRef.current) {
      lagoonRef.current.position.x = 3.6 + Math.cos(t * 0.08) * 0.7;
      lagoonRef.current.position.y = 1.6 + Math.sin(t * 0.11) * 0.5;
    }
  });

  return (
    <group position={[0, 0, -3]}>
      <mesh ref={torchRef} position={[-3, -1.5, 0]}>
        <planeGeometry args={[13, 13]} />
        <meshBasicMaterial map={torchTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={lagoonRef} position={[3.6, 1.6, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshBasicMaterial map={lagoonTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

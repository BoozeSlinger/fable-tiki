"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

/**
 * Couples the WebGL camera to page scroll: a gentle dolly-in plus lateral
 * drift as you descend, giving the fixed atmosphere real parallax depth.
 */
export function ScrollCamera({ reduced = false }: { reduced?: boolean }) {
  const { camera } = useThree();
  const progress = useRef(0);

  useFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    progress.current += (p - progress.current) * 0.06;
    const cur = progress.current;

    if (reduced) {
      camera.position.set(0, 0, 6);
      camera.lookAt(0, 0, 0);
      return;
    }

    const targetZ = 6 - cur * 2.4;
    const targetX = (cur - 0.5) * 1.4;
    const targetY = -cur * 1.0;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

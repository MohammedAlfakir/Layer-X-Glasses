"use client";

import { useRef } from "react";
import gsap from "gsap";

/**
 * Fires an animated glowing orb that arcs from `startEl` to `endEl`.
 */
export function useLightTrailAnimation() {
  const orbRef = useRef<HTMLDivElement | null>(null);

  const fire = (
    startEl: HTMLElement | null,
    endEl: HTMLElement | null,
    onComplete?: () => void
  ) => {
    if (!startEl || !endEl) {
      onComplete?.();
      return;
    }

    // Ensure orb exists in DOM
    if (!orbRef.current) {
      const orb = document.createElement("div");
      orb.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: radial-gradient(circle, #ffffff 0%, #cbb592 50%, rgba(203,181,146,0) 100%);
        box-shadow: 0 0 14px 5px rgba(203, 181, 146, 0.8), 0 0 28px 10px rgba(203, 181, 146, 0.3);
        pointer-events: none;
        z-index: 99999;
        display: none;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(orb);
      orbRef.current = orb;
    }

    const orb = orbRef.current;
    const sR = startEl.getBoundingClientRect();
    const eR = endEl.getBoundingClientRect();

    const startX = sR.left + sR.width / 2;
    const startY = sR.top + sR.height / 2;
    const endX = eR.left + eR.width / 2;
    const endY = eR.top + eR.height / 2;

    // Arc control point above the midpoint
    const ctrlX = (startX + endX) / 2;
    const ctrlY = Math.min(startY, endY) - 100;

    gsap.set(orb, { display: "block", left: 0, top: 0, opacity: 1, scale: 1 });

    // Animate along quadratic bezier using a proxy object
    const proxy = { t: 0 };
    gsap.to(proxy, {
      t: 1,
      duration: 0.65,
      ease: "power2.inOut",
      onUpdate() {
        const t = proxy.t;
        // Quadratic Bezier: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
        const inv = 1 - t;
        const x = inv * inv * startX + 2 * inv * t * ctrlX + t * t * endX;
        const y = inv * inv * startY + 2 * inv * t * ctrlY + t * t * endY;
        gsap.set(orb, { left: x, top: y });
      },
      onComplete() {
        // Burst at destination
        gsap.to(orb, {
          scale: 3,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete() {
            gsap.set(orb, { display: "none", scale: 1, opacity: 1 });
            onComplete?.();
          },
        });
      },
    });
  };

  return { fire };
}

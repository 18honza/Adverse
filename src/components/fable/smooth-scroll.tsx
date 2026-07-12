"use client";

import { ReactLenis } from "lenis/react";

/**
 * Lenis smooth scrolling, mounted only on the /fable route. Drives the
 * native window scroll (sticky positioning keeps working), it just eases
 * the wheel input so scroll-tied scenes feel liquid instead of stepped.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}

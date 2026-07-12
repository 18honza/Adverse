"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Small red dot trailing the pointer with a springy lag. It complements
 * (never replaces) the native cursor, so usability stays intact for the
 * non-technical 30–50 audience. A pale outline keeps it visible on
 * paper, ink and red surfaces alike. Desktop fine-pointer only.
 */
export function CursorDot() {
  const [enabled, setEnabled] = useState(false);
  const [seen, setSeen] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.55 });
  const sy = useSpring(y, { stiffness: 320, damping: 28, mass: 0.55 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setSeen(true);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fable-cursor-dot pointer-events-none fixed top-0 left-0 z-[90] h-2.5 w-2.5 rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: "var(--f-red)",
        boxShadow: "0 0 0 1.5px rgba(251,247,240,0.85)",
        opacity: seen ? 1 : 0,
      }}
    />
  );
}

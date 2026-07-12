"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

/**
 * Scroll-velocity marquee: a strip of outlined display type that drifts
 * on its own, accelerates with your scroll speed, and reverses direction
 * when you scroll back up. The page literally answers your hand.
 */
export function VelocityMarquee({
  text = "Výsledky ✺ Data ✺ Osobní přístup ✺ ",
}: {
  text?: string;
}) {
  return (
    <section
      aria-hidden="true"
      data-fable-tone="ink"
      className="overflow-hidden bg-[color:var(--f-paper)] py-[7vh] select-none"
    >
      <MarqueeRow text={text} baseVelocity={-1.6} />
    </section>
  );
}

function MarqueeRow({
  text,
  baseVelocity,
}: {
  text: string;
  baseVelocity: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 380,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4.5], {
    clamp: false,
  });

  // Four copies rendered; wrap keeps x inside one copy's width (-25%..0)
  // so the loop is seamless.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const direction = useRef(baseVelocity < 0 ? -1 : 1);

  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * Math.abs(baseVelocity) * (delta / 1000);

    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;

    moveBy += direction.current * Math.abs(moveBy) * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <motion.div
      style={{ x }}
      className="flex whitespace-nowrap font-display font-bold uppercase leading-none tracking-tight text-[clamp(3rem,9vw,8rem)]"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="fable-stroke-ink shrink-0 pr-4">
          {text}
        </span>
      ))}
    </motion.div>
  );
}

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

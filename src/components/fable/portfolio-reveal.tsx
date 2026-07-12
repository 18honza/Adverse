"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioItems } from "@/lib/portfolio";
import { cn } from "@/lib/cn";

/**
 * Editorial index of selected work on the ink surface. Desktop: hovering
 * a row floats a preview plate that trails the cursor on springs (the
 * classic expensive-agency move). Touch / small screens: the rows carry
 * inline thumbnails instead, nothing is hover-gated.
 */

const WORK = portfolioItems.slice(0, 6);

export function PortfolioReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 160, damping: 20, mass: 0.4 });
  const py = useSpring(my, { stiffness: 160, damping: 20, mass: 0.4 });

  return (
    <section
      data-fable-tone="paper"
      className="bg-[color:var(--f-ink)] px-[6vw] py-[14vh] text-[color:var(--f-white)]"
    >
      <span className="block text-[11px] font-bold uppercase tracking-[3px] text-[color:var(--f-red)] mb-10">
        (04) Vybraná práce
      </span>

      <div
        ref={ref}
        className="relative"
        onMouseEnter={(e) => {
          // Teleport (no spring) to the entry point so the plate appears
          // at the cursor instead of flying in from the corner.
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          mx.jump(e.clientX - rect.left);
          my.jump(e.clientY - rect.top);
        }}
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          mx.set(e.clientX - rect.left);
          my.set(e.clientY - rect.top);
        }}
        onMouseLeave={() => setActive(null)}
      >
        <ul>
          {WORK.map((item, i) => (
            <li key={item.slug} className="border-t border-[color:var(--f-hairline-light)] last:border-b">
              <Link
                href="/portfolio"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-8 py-5 sm:py-7"
              >
                <span
                  className={cn(
                    "text-[11px] font-bold tracking-[2px] transition-colors duration-200",
                    active === i
                      ? "text-[color:var(--f-red)]"
                      : "text-[color:var(--f-white)]/40",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0">
                  <span
                    className={cn(
                      "block font-display font-bold uppercase leading-tight tracking-tight",
                      "text-[clamp(1.3rem,3.4vw,2.6rem)]",
                      "transition-transform duration-300 ease-out",
                      active === i && "sm:translate-x-3",
                    )}
                  >
                    {item.client}
                  </span>
                  <span className="mt-1 block text-xs sm:text-sm text-[color:var(--f-white)]/50">
                    {item.title}
                  </span>
                </span>

                <span className="flex items-center gap-3">
                  <span className="hidden sm:block text-[10px] font-bold uppercase tracking-[2.5px] text-[color:var(--f-white)]/55">
                    {item.tag}
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "h-4 w-4 transition-all duration-300",
                      active === i
                        ? "text-[color:var(--f-red)] rotate-45"
                        : "text-[color:var(--f-white)]/40",
                    )}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Floating preview plate — fine pointers only */}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.88, rotate: active % 2 ? 3 : -3 }}
              animate={{ opacity: 1, scale: 1, rotate: active % 2 ? 2 : -2 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: px, y: py }}
              className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
            >
              <div
                className="relative -translate-x-[40%] -translate-y-[115%] h-48 w-72 overflow-hidden border border-[color:var(--f-hairline-light)]"
                style={{ backgroundImage: WORK[active].gradient }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="block text-[10px] font-bold uppercase tracking-[2px] text-[color:var(--f-red)]">
                    {WORK[active].tag}
                  </span>
                  <span className="block font-display font-bold uppercase text-sm text-[color:var(--f-white)] mt-0.5">
                    {WORK[active].title}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12">
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[2.5px] text-[color:var(--f-white)] border-b border-[color:var(--f-white)]/30 pb-1 transition-colors hover:border-[color:var(--f-red)] hover:text-[color:var(--f-red)]"
        >
          Celé portfolio
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-45" />
        </Link>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/cn";

/**
 * Vertical infinite scrolling column of testimonials. Adapted from
 * sshahaider's testimonials-columns-1 component on 21st.dev — visual
 * styling reworked to match the Adverse brand (squared corners, brand
 * typography, brand divider color).
 */
export function TestimonialsColumn({
  className,
  testimonials,
  duration = 15,
}: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) {
  return (
    <div className={cn("shrink-0", className)}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, dupIdx) => (
          <React.Fragment key={dupIdx}>
            {testimonials.map((t, i) => (
              <article
                key={`${dupIdx}-${i}`}
                className={cn(
                  "p-8 md:p-9 max-w-xs w-80",
                  "border border-divider bg-bg",
                  "transition-colors duration-200 hover:border-text/30",
                )}
              >
                <span className="text-xs font-bold uppercase tracking-[2px] text-accent block mb-4">
                  {t.industry}
                </span>
                <p className="text-text leading-relaxed">{t.quote}</p>
                <div className="flex items-center gap-3 mt-6">
                  <Avatar name={t.name} src={t.image} />
                  <div>
                    <div className="font-bold tracking-tight leading-5 text-text text-sm">
                      {t.name}
                    </div>
                    <div className="text-text-muted leading-5 tracking-tight text-xs">
                      {t.context}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover bg-surface-alt shrink-0"
      />
    );
  }
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      aria-hidden="true"
      className="h-10 w-10 rounded-full bg-text text-white flex items-center justify-center font-bold text-xs tracking-wide shrink-0"
    >
      {initials}
    </div>
  );
}

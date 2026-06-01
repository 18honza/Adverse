"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioFlipCard } from "@/components/portfolio-flip-card";
import {
  filterLabels,
  portfolioItems,
  type PortfolioCategory,
} from "@/lib/portfolio";
import { cn } from "@/lib/cn";

type Filter = "all" | PortfolioCategory;

const filters: Filter[] = ["all", "web", "ad", "grafika", "video", "soc"];

export function PortfolioFilter() {
  const [active, setActive] = useState<Filter>("all");
  // Only one card may be flipped open at a time. We track the open card's
  // slug here (lifted out of the card) so opening a second card closes the
  // first automatically.
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const visible =
    active === "all"
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === active);

  return (
    <>
      <div
        className="flex flex-wrap justify-center gap-2 px-6 my-12"
        role="tablist"
        aria-label="Filtr portfolia"
      >
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            onClick={() => {
              setActive(f);
              // Changing filter closes any open card.
              setOpenSlug(null);
            }}
            className={cn(
              "text-xs font-bold uppercase tracking-[2px] px-6 py-3 border transition-all duration-150 cursor-pointer",
              active === f
                ? "bg-accent border-accent text-white"
                : "bg-transparent border-divider text-text hover:border-text",
            )}
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-(--container-default) px-6 mb-24">
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.div
                key={item.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="aspect-[4/3]"
              >
                <PortfolioFlipCard
                  item={item}
                  flipped={openSlug === item.slug}
                  onOpen={() => setOpenSlug(item.slug)}
                  onClose={() => setOpenSlug(null)}
                  className="w-full h-full"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}

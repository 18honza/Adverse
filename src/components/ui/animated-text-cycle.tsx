"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

/**
 * Cycling word with blur + slide enter/exit (thimows / 21st.dev).
 * Adapted: hardcoded `font-bold` removed (brand inherits weight from
 * parent heading), measurement wrapper uses `<span>` instead of `<div>`
 * so this can be embedded inside an `<h2>` without breaking HTML semantics.
 */
export default function AnimatedTextCycle({
  words,
  interval = 3500,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState<string>("auto");
  const measureRef = useRef<HTMLSpanElement>(null);

  // Measure width of the current word so the container can animate to it
  useEffect(() => {
    if (measureRef.current) {
      const els = measureRef.current.children;
      if (els.length > currentIndex) {
        const newWidth = els[currentIndex].getBoundingClientRect().width;
        setWidth(`${newWidth}px`);
      }
    }
  }, [currentIndex]);

  // Cycle through words
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval, words.length]);

  const variants = {
    hidden: { y: -20, opacity: 0, filter: "blur(8px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
    exit: {
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: { duration: 0.3, ease: "easeIn" as const },
    },
  };

  return (
    <>
      {/* Hidden measurement span — measures every word ahead of time */}
      <span
        ref={measureRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={className}>
            {word}
          </span>
        ))}
      </span>

      {/* Visible animated word — width spring-eases to the new word's width */}
      <motion.span
        className="relative inline-block"
        animate={{
          width,
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 1.2,
          },
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block ${className}`}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}

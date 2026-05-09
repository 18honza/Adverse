import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Composable animated card primitives — adapted from
 * aghasisahakyan1/animated-card-1 (21st.dev). Original used `rounded-xl`,
 * a fixed 356px width and a default shadow; here we drop the radius and
 * shadow to match our squared, no-shadow card language and let consumers
 * size the card via className. The `group/animated-card` hook is preserved
 * so child elements can react to hover via Tailwind group variants.
 */

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function AnimatedCard({ className, ...props }: DivProps) {
  return (
    <div
      role="region"
      className={cn(
        "relative w-full overflow-hidden border border-divider bg-bg",
        "group/animated-card transition-colors duration-200 hover:border-text/30",
        className,
      )}
      {...props}
    />
  );
}

export function CardVisual({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden w-full aspect-[2/1] border-b border-divider",
        className,
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: DivProps) {
  return (
    <div
      role="group"
      className={cn("flex flex-col gap-2 p-6", className)}
      {...props}
    />
  );
}

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

export function CardTitle({ className, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(
        "text-lg font-display font-black uppercase tracking-tight text-text",
        className,
      )}
      {...props}
    />
  );
}

type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;

export function CardDescription({ className, ...props }: ParagraphProps) {
  return (
    <p
      className={cn("text-sm text-text-muted leading-relaxed", className)}
      {...props}
    />
  );
}

import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-[2px] rounded-sm transition-all duration-150 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover",
        outline:
          "bg-transparent text-text border-2 border-text hover:bg-text hover:text-white",
        ghost:
          "bg-transparent text-text border-2 border-divider hover:border-text",
      },
      size: {
        md: "px-6 py-3",
        lg: "px-8 py-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface BaseProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  type?: never;
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { className, variant, size, children } = props;
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

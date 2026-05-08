import Link from "next/link";
import type { PortfolioItem } from "@/lib/portfolio";
import { cn } from "@/lib/cn";

export function PortfolioTile({
  item,
  className,
  href = "/portfolio",
  ariaLabel,
}: {
  item: PortfolioItem;
  className?: string;
  href?: string;
  ariaLabel?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel ?? item.title}
      className={cn(
        "group relative block overflow-hidden border border-divider bg-surface-alt",
        className,
      )}
      style={item.image ? undefined : { backgroundImage: item.gradient }}
    >
      {/* Image (with gradient fallback already on parent) */}
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      )}
      {/* Overlay */}
      <div className="relative z-10 flex flex-col justify-end h-full bg-gradient-to-t from-black/85 via-black/0 to-transparent p-5 text-white">
        <span className="text-xs uppercase tracking-[2px] font-bold text-accent">
          {item.tag}
        </span>
        <h3 className="text-base text-white mt-1">{item.title}</h3>
      </div>
    </Link>
  );
}

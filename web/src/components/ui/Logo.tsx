"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { useAnchorScroll } from "@/lib/use-anchor-scroll";

/**
 * Text-set wordmark in Instrument Sans, replacing the old Fraunces-script
 * logo image so the nav stays inside the single-typeface system.
 *
 * Client component so the "#top" link routes through Lenis like every
 * other in-page link — previously it hard-jumped while the rest glided.
 */
export function Logo({
  light = false,
  className,
}: {
  light?: boolean;
  className?: string;
}) {
  const onAnchorClick = useAnchorScroll();

  return (
    <Link
      href="#top"
      onClick={onAnchorClick}
      className={cn(
        "leading-none tracking-tight",
        light ? "text-on-dark" : "text-ink",
        className
      )}
      aria-label="Marci Metzger Homes — home"
    >
      <span className="block text-[0.95rem] font-medium tracking-[0.02em]">
        Marci Metzger
      </span>
      <span
        className={cn(
          "block text-[0.7rem] tracking-[0.18em] uppercase",
          light ? "text-on-dark-muted" : "text-muted"
        )}
      >
        Homes
      </span>
    </Link>
  );
}

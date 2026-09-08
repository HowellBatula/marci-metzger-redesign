"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { useAnchorScroll } from "@/lib/use-anchor-scroll";

const LOGO_ASPECT = 2560 / 798;

/**
 * Marci's real wordmark. The source PNG is black artwork on transparency, so
 * `brightness-0 invert` turns it white for the dark nav pill; drop `light` to
 * render it as-is on a pale surface.
 *
 * Client component so the "#top" link routes through Lenis like every other
 * in-page link — previously it hard-jumped while the rest glided.
 */
export function Logo({
  light = false,
  height = 30,
  className,
  priority = false,
  forceScroll = false,
}: {
  light?: boolean;
  height?: number;
  className?: string;
  priority?: boolean;
  /** Pass true when rendering inside a component that may have Lenis
   *  stopped at click time (the open mobile menu) — see use-anchor-scroll.ts. */
  forceScroll?: boolean;
}) {
  const onAnchorClick = useAnchorScroll(forceScroll);

  return (
    <Link
      href="#top"
      onClick={onAnchorClick}
      aria-label="Marci Metzger Homes — home"
      className={cn("block w-fit", className)}
    >
      <Image
        src="/img/logo-marci-metzger-header.png"
        alt="Marci Metzger Homes"
        width={Math.round(height * LOGO_ASPECT)}
        height={height}
        priority={priority}
        sizes={`${Math.round(height * LOGO_ASPECT)}px`}
        className={cn(
          // max-w-none: the global img reset (`max-width:100%`, for fluid
          // content images) was clamping this logo's explicit pixel width
          // down to its grid column's track width on any viewport narrower
          // than roughly 3x the wordmark's natural width — mobile, mainly;
          // wide desktop tracks never hit it, which is why it went
          // unnoticed. A percentage max-width has no business on an image
          // we're deliberately sizing to a fixed pixel box in the first
          // place, inside a nav pill that isn't meant to be fluid.
          "max-w-none",
          // The wordmark sits directly on photography rather than in a pill,
          // so it carries its own soft shadow to stay legible over a bright
          // sky or a pale section without needing a plate behind it.
          light && "brightness-0 invert drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]"
        )}
        style={{ height, width: Math.round(height * LOGO_ASPECT) }}
      />
    </Link>
  );
}

"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { useAnchorScroll } from "@/lib/use-anchor-scroll";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  /** camelCase on purpose. Kebab-case keys here collide with Tailwind's
   *  class scanner, which reads raw file text and would emit a dead
   *  outline-colour utility for each one. */
  variant?: "solid" | "outlineLight" | "outlineDark";
  icon?: boolean;
  className?: string;
  target?: string;
  rel?: string;
};

// Both glass — see the .glass comment in globals.css for why a dark tint,
// not an accent-colored one, is what stays contrast-safe over photography.
// outlineDark (unused currently, kept for a future button on a light panel)
// stays a plain bordered treatment since glass reads as a dark chip and
// would look like a mistake sitting directly on a light background.
const variants = {
  solid: "glass glass--accent text-on-dark",
  outlineLight: "glass text-on-dark",
  outlineDark: "border border-line text-ink hover:bg-ink hover:text-on-dark",
};

export function Button({
  href,
  children,
  variant = "solid",
  icon = true,
  className,
  target,
  rel,
}: ButtonProps) {
  const onAnchorClick = useAnchorScroll();
  const isHash = href.startsWith("#");

  // Default external links to noopener noreferrer. Modern browsers imply
  // noopener on target=_blank already — the real gain here is noreferrer,
  // which stops the referrer header leaking this URL to the destination.
  // Plain string join, deliberately not cn(): twMerge is a Tailwind class
  // merger and rel tokens are not Tailwind classes.
  const relValue =
    target === "_blank"
      ? Array.from(
          new Set([
            "noopener",
            "noreferrer",
            ...(rel?.split(/\s+/).filter(Boolean) ?? []),
          ])
        ).join(" ")
      : rel;

  return (
    <Link
      href={href}
      target={target}
      rel={relValue}
      onClick={isHash ? onAnchorClick : undefined}
      className={cn(
        "pill inline-flex items-center gap-2 px-6 py-3.5 text-sm tracking-wide transition-colors duration-300",
        variants[variant],
        className
      )}
    >
      <span>{children}</span>
      {icon && <ArrowUpRight size={16} strokeWidth={1.75} />}
    </Link>
  );
}

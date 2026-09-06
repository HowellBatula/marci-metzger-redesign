"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { useAnchorScroll } from "@/lib/use-anchor-scroll";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline-light" | "outline-dark";
  icon?: boolean;
  className?: string;
  target?: string;
  rel?: string;
};

const variants = {
  solid: "bg-accent text-on-dark hover:bg-ink",
  "outline-light": "border border-line-dark text-on-dark hover:bg-white/10",
  "outline-dark": "border border-line text-ink hover:bg-ink hover:text-on-dark",
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

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
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

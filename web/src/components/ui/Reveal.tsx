"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

/**
 * Scroll-triggered reveal wrapper. Adds `.is-visible` (see globals.css
 * `.reveal` rule) once the element crosses into the viewport, then
 * unobserves — same one-shot behavior the previous IntersectionObserver
 * implementation had, just driven by GSAP ScrollTrigger.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      el.classList.add("is-visible");
      return;
    }

    const { ScrollTrigger } = getGsap();
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        window.setTimeout(() => el.classList.add("is-visible"), delay * 90);
      },
    });

    return () => trigger.kill();
  }, [delay]);

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={cn("reveal", className)}>
      {children}
    </Component>
  );
}

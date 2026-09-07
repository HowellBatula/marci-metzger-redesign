"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { getGsap } from "@/lib/gsap";

/**
 * Smooth inertial scroll, matching the reference site's scroll feel.
 * No-ops under prefers-reduced-motion so users who've asked for less
 * motion get plain native scrolling instead.
 *
 * ScrollTrigger is subscribed to Lenis's scroll event so reveals fire against
 * the smoothed scroll position, and the rAF loop tracks its pending frame id
 * so it can actually be cancelled on unmount.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const { ScrollTrigger } = getGsap();

    // The half of this that matters: ScrollTrigger otherwise only updates on
    // native scroll events, which fire at a different cadence than Lenis's
    // interpolated position — that mismatch is what made reveals fire
    // early/late and appear to jitter.
    lenis.on("scroll", ScrollTrigger.update);

    // `rafId` is reassigned every frame, so cleanup cancels the frame that is
    // actually pending. The previous implementation captured only the first id
    // in a const, so every subsequent frame scheduled an id nothing tracked and
    // the loop outlived unmount, still calling raf() on a destroyed instance.
    //
    // (gsap.ticker.add is the other common way to drive Lenis and would also be
    // correct; a single self-owned loop is kept here because its lifecycle is
    // easier to reason about alongside the destroy() below.)
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Trigger positions below the fold are computed before images have laid
    // out, so recompute once everything has settled.
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", onLoad);
    }

    // expose for in-page anchor links and the scroll lock
    window.__lenis = lenis;

    return () => {
      window.removeEventListener("load", onLoad);
      cancelAnimationFrame(rafId);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

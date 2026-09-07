"use client";

import { useEffect } from "react";

/**
 * Freezes background scrolling while an overlay is open.
 *
 * `document.body.style.overflow = "hidden"` on its own is not enough here:
 * Lenis drives scroll position itself, independent of the overflow property,
 * so the page kept moving behind the open menu. Stopping Lenis is the part
 * that actually works; the overflow assignment covers the reduced-motion
 * case, where Lenis is never instantiated and native scrolling applies.
 *
 * Restores the previous overflow value rather than clearing it, so nesting
 * two locks can't leave the body in the wrong state.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.__lenis?.start();
    };
  }, [locked]);
}

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Registers ScrollTrigger exactly once, client-side only. Not a React
 * hook (no "use" prefix on purpose) — it's called from inside effect
 * callbacks, which the rules-of-hooks lint rule would otherwise flag.
 */
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

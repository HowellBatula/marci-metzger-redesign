"use client";

/**
 * Scrolls an element into view through Lenis when it's mounted (smooth
 * inertial scroll matching the rest of the site), falling back to native
 * scrollIntoView otherwise — e.g. under reduced-motion, where LenisProvider
 * intentionally never instantiates Lenis.
 *
 * Shared by in-page anchor links and by the search results, so both use one
 * implementation and behave identically.
 */
export function scrollToElement(target: Element, offset = -24) {
  if (window.__lenis) {
    window.__lenis.scrollTo(target as HTMLElement, { offset });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Click handler for in-page hash links. */
export function useAnchorScroll() {
  return function onAnchorClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    scrollToElement(target);
    history.pushState(null, "", href);
  };
}

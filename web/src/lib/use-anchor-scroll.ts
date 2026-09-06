"use client";

/**
 * Click handler for in-page hash links. Routes through Lenis when it's
 * mounted (smooth inertial scroll matching the rest of the site), and
 * falls back to native scrollIntoView otherwise (e.g. reduced-motion,
 * where LenisProvider intentionally never instantiates Lenis).
 */
export function useAnchorScroll() {
  return function onAnchorClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    if (window.__lenis) {
      window.__lenis.scrollTo(target as HTMLElement, { offset: -24 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    history.pushState(null, "", href);
  };
}

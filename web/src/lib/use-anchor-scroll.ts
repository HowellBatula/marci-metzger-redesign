"use client";

/**
 * Scrolls an element into view through Lenis when it's mounted (smooth
 * inertial scroll matching the rest of the site), falling back to native
 * scrollIntoView otherwise — e.g. under reduced-motion, where LenisProvider
 * intentionally never instantiates Lenis.
 *
 * `force` matters specifically for callers inside an active scroll lock
 * (the mobile menu): opening the menu calls `lenis.stop()`, and Lenis's own
 * `scrollTo()` silently no-ops while stopped unless `force: true` is passed
 * — confirmed in its source (`scrollTo() { if ((this.isStopped ...) &&
 * !force) return; }`). Without it, clicking a menu link fired a scroll
 * request that Lenis dropped on the floor, then the menu closed and
 * restarted Lenis a beat later with nothing left to animate to — the page
 * just stayed put. That was the "menu doesn't scroll to the section" bug.
 *
 * Shared by in-page anchor links and by the search results, so both use one
 * implementation and behave identically.
 *
 * `force: true` gets a scroll animation *started* while Lenis is stopped,
 * but starting it isn't enough on its own inside the mobile menu: closing
 * the menu unlocks scroll a beat later via `useScrollLock`'s cleanup, which
 * calls `lenis.start()` — and `start()` internally calls `reset()`, which
 * unconditionally sets `animatedScroll = targetScroll = actualScroll`,
 * wiping out whatever target this call just set. The menu would close but
 * the page would stay put. Calling `start()` here first, synchronously,
 * before `scrollTo()`, means that later `start()` call finds Lenis already
 * running and no-ops instead of resetting — regardless of which handler
 * (the link's own, or an ancestor's onClose) fires first. `start()` is
 * itself a no-op when Lenis isn't stopped, so this is free outside overlays.
 */
export function scrollToElement(
  target: Element,
  offset = -24,
  force = false
) {
  if (window.__lenis) {
    window.__lenis.start();
    window.__lenis.scrollTo(target as HTMLElement, { offset, force });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Click handler for in-page hash links. Pass `force: true` when the link
 *  lives inside a component that may have Lenis stopped at click time. */
export function useAnchorScroll(force = false) {
  return function onAnchorClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    scrollToElement(target, -24, force);
    history.pushState(null, "", href);
  };
}

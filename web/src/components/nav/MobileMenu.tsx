"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/nav-links";
import { useAnchorScroll } from "@/lib/use-anchor-scroll";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { cn } from "@/lib/cn";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const onAnchorClick = useAnchorScroll();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useFocusTrap(open, panelRef, onClose);
  useScrollLock(open);

  return (
    <div
      id="site-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      // `inert` removes descendants from the tab order AND the accessibility
      // tree. The panel stays mounted for its fade, and opacity-0 alone left
      // 8 invisible controls tabbable — focus vanished off-screen with no
      // indication where it went. `invisible` is the CSS-level backstop:
      // visibility:hidden also removes focusability, so this is covered twice.
      inert={!open || undefined}
      className={cn(
        "fixed inset-0 z-[80] flex flex-col bg-dark text-on-dark",
        "transition-[opacity,visibility] duration-500",
        open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
      )}
    >
      <div className="container-page flex items-center justify-end py-6">
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="pill flex h-11 w-11 items-center justify-center border border-line-dark"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      <nav
        aria-label="Site"
        className="container-page flex flex-1 flex-col justify-center gap-2"
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              onAnchorClick(e);
              onClose();
            }}
            className="h2 border-b border-line-dark py-4 text-on-dark transition-colors hover:text-accent-light"
          >
            {/* Two transition scopes on purpose: colour stays on the anchor so
                hover is instant, and the entrance stagger lives here. The delay
                used to sit on the anchor's transition-colors, where its only
                effect was to lag hover by up to 200ms. */}
            <span
              className={cn(
                "block transition-[opacity,transform] duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              )}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            >
              {link.label}
            </span>
          </a>
        ))}
      </nav>

      <div className="container-page pb-10">
        <a
          href={PHONE_HREF}
          className="inline-flex min-h-11 items-center text-lg tracking-wide text-on-dark-muted hover:text-on-dark"
        >
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}

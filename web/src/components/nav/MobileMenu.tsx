"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/nav-links";
import { SOCIAL_LINKS } from "@/lib/social-links";
import { useAnchorScroll } from "@/lib/use-anchor-scroll";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { cn } from "@/lib/cn";

export function MobileMenu({
  open,
  onClose,
  activeId,
}: {
  open: boolean;
  onClose: () => void;
  activeId?: string | null;
}) {
  const onAnchorClick = useAnchorScroll();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Focus the dismiss control rather than the first child, which is the logo.
  useFocusTrap(open, panelRef, onClose, closeRef);
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
      <div className="container-page grid w-full grid-cols-3 items-center py-5">
        <span className="justify-self-start" />
        {/* Dismisses the menu too — otherwise it scrolls to the top behind an
            overlay that stays open. */}
        <div className="justify-self-center" onClick={onClose}>
          <Logo light height={44} />
        </div>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close menu"
          className="pill flex h-11 w-11 items-center justify-center justify-self-end border border-line-dark transition-colors hover:bg-white/10"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      <nav
        aria-label="Site"
        className="container-page flex w-full flex-1 flex-col justify-center"
      >
        {NAV_LINKS.map((link, i) => {
          const isActive = activeId === link.href.slice(1);
          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive ? "location" : undefined}
              onClick={(e) => {
                onAnchorClick(e);
                onClose();
              }}
              className="group flex items-baseline gap-5 border-b border-line-dark py-4 transition-colors sm:gap-8"
            >
              {/* Two transition scopes on purpose: colour stays on the anchor
                  so hover is instant, and the entrance stagger lives on the
                  inner span. The delay used to sit on the anchor's
                  transition-colors, where its only effect was to lag hover. */}
              <span
                className={cn(
                  "block font-mono text-xs tracking-[0.2em] transition-[opacity,transform,color] duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  isActive ? "text-accent-light" : "text-on-dark-muted"
                )}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "h2 block transition-[opacity,transform,color] duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  isActive
                    ? "text-accent-light"
                    : "text-on-dark group-hover:text-accent-light"
                )}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              >
                {link.label}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="container-page flex w-full flex-wrap items-center justify-between gap-4 pb-10">
        <a
          href={PHONE_HREF}
          className="inline-flex min-h-11 items-center text-lg tracking-wide text-on-dark-muted transition-colors hover:text-on-dark"
        >
          {PHONE_DISPLAY}
        </a>
        <div className="flex gap-5">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-xs tracking-[0.14em] text-on-dark-muted uppercase transition-colors hover:text-on-dark"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

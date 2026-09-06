"use client";

import { X } from "lucide-react";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/nav-links";
import { useAnchorScroll } from "@/lib/use-anchor-scroll";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const onAnchorClick = useAnchorScroll();

  return (
    <div
      className={`fixed inset-0 z-[80] flex flex-col bg-dark text-on-dark transition-all duration-500 ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="container flex items-center justify-end py-6">
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="pill flex h-11 w-11 items-center justify-center border border-line-dark"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      <nav
        aria-label="Mobile"
        className="container flex flex-1 flex-col justify-center gap-2"
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
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="container pb-10">
        <a
          href={PHONE_HREF}
          className="text-lg tracking-wide text-on-dark-muted hover:text-on-dark"
        >
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/nav-links";
import { cn } from "@/lib/cn";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tracks whichever section owns the middle band of the viewport, so the
  // overlay menu can mark where you currently are.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.href.slice(1))
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // One shared surface treatment so the three pills read as a set.
  const pill = cn(
    "pill backdrop-blur-md transition-colors duration-300",
    scrolled ? "bg-dark/85" : "bg-dark/50"
  );

  return (
    <>
      <header
        id="siteNav"
        className={cn(
          "fixed inset-x-0 top-0 z-[70] px-[var(--gutter)] transition-[padding] duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        {/* Three equal columns rather than flex/justify-between: it keeps the
            wordmark optically centred regardless of how wide the side items
            get, which flex alone would not guarantee. */}
        <div className="grid grid-cols-3 items-center">
          <div className="justify-self-start">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className={cn(
                pill,
                "group flex h-11 items-center gap-2.5 pr-5 pl-4 text-on-dark"
              )}
            >
              <Menu
                size={18}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <span className="hidden text-sm tracking-wide sm:inline">
                Menu
              </span>
            </button>
          </div>

          <div className="justify-self-center">
            {/* Constant height at every scroll position — it shrank on scroll
                before, which read as inconsistent rather than refined. Sized
                for legibility: a two-line wordmark with a script sub-line
                turns to mush much below ~36px, so 44 stays fixed throughout. */}
            <Logo light priority height={44} />
          </div>

          <div className="justify-self-end">
            <a
              href={PHONE_HREF}
              className={cn(
                pill,
                "flex h-11 items-center px-5 text-sm tracking-wide text-on-dark"
              )}
            >
              <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={activeId}
      />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/nav-links";
import { useAnchorScroll } from "@/lib/use-anchor-scroll";
import { cn } from "@/lib/cn";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const onAnchorClick = useAnchorScroll();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section owns the middle band of the viewport.
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

  const surface = scrolled ? "bg-dark/85" : "bg-dark/55";

  return (
    <>
      <header
        id="siteNav"
        className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between gap-3 px-[var(--gutter)] py-5"
      >
        <div
          className={cn(
            "pill flex items-center px-5 py-2.5 backdrop-blur-md transition-colors duration-300",
            surface
          )}
        >
          <Logo light />
        </div>

        {/* Inline nav from lg up, not md: at 768px the six links need roughly
            700px and only ~466px is left once the logo, hamburger and gutters
            are accounted for. Below lg the same links live in the overlay. */}
        <nav
          aria-label="Primary"
          className={cn(
            "pill hidden items-center gap-1 p-1.5 backdrop-blur-md transition-colors duration-300 lg:flex",
            surface
          )}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={onAnchorClick}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "pill px-4 py-2.5 text-sm tracking-wide transition-colors",
                  isActive
                    ? "bg-white/15 text-on-dark"
                    : "text-on-dark-muted hover:text-on-dark"
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className={cn(
              "pill hidden items-center px-5 py-3 text-sm tracking-wide text-on-dark backdrop-blur-md transition-colors duration-300 xl:flex",
              surface
            )}
          >
            {PHONE_DISPLAY}
          </a>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className={cn(
              "pill flex h-[46px] w-[46px] items-center justify-center text-on-dark backdrop-blur-md transition-colors duration-300 lg:hidden",
              surface
            )}
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

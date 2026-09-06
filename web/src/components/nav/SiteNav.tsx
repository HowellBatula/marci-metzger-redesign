"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/nav-links";
import { cn } from "@/lib/cn";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <header
        id="siteNav"
        className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-[var(--gutter)] py-5"
      >
        <div
          className={cn(
            "pill flex items-center px-5 py-2.5 backdrop-blur-md transition-colors duration-300",
            scrolled ? "bg-dark/85" : "bg-dark/55"
          )}
        >
          <Logo light />
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className={cn(
              "pill hidden items-center px-5 py-3 text-sm tracking-wide text-on-dark backdrop-blur-md transition-colors duration-300 sm:flex",
              scrolled ? "bg-dark/85" : "bg-dark/55"
            )}
          >
            {PHONE_DISPLAY}
          </a>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className={cn(
              "pill flex h-[46px] w-[46px] items-center justify-center text-on-dark backdrop-blur-md transition-colors duration-300",
              scrolled ? "bg-dark/85" : "bg-dark/55"
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

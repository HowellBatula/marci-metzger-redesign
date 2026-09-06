"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mm_cookies_accepted";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // localStorage unavailable — still show the banner, just won't persist
    }
    const id = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  function accept() {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore — banner just reappears next visit in this tab
    }
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[9000] flex flex-col items-center justify-between gap-3 bg-dark px-[var(--gutter)] py-4 text-on-dark shadow-2xl sm:flex-row"
    >
      <p className="text-sm text-on-dark-muted">
        <strong className="text-on-dark">This website uses cookies.</strong>{" "}
        We use cookies to analyze website traffic and optimize your website
        experience.
      </p>
      <button
        onClick={accept}
        className="pill shrink-0 bg-accent px-5 py-2.5 text-sm text-on-dark transition-colors hover:bg-white hover:text-ink"
      >
        Accept
      </button>
    </div>
  );
}

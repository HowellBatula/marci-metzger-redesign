"use client";

import { useConsent, setConsent } from "@/lib/use-consent";

export function CookieBanner() {
  const consent = useConsent();

  if (consent !== null) return null;

  return (
    // role="region" + a polite status message, not role="dialog": a dialog is
    // not a live region, and pairing the two is contradictory. Focus is
    // deliberately NOT moved here — an unsolicited focus jump on load is worse
    // than the problem it would solve.
    //
    // z-[60] keeps it below the nav (70) and the menu overlay (80); at its old
    // z-[9000] it floated on top of the full-screen menu.
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center justify-between gap-3 bg-dark px-[var(--gutter)] py-4 text-on-dark shadow-2xl sm:flex-row"
    >
      <p role="status" className="text-sm text-on-dark-muted">
        <strong className="text-on-dark">This website uses cookies.</strong> We
        use cookies to analyze website traffic and optimize your website
        experience.
      </p>
      <div className="flex shrink-0 gap-3">
        <button
          onClick={() => setConsent("declined")}
          className="pill border border-line-dark px-5 py-2.5 text-sm text-on-dark transition-colors hover:bg-white/10"
        >
          Decline
        </button>
        <button
          onClick={() => setConsent("accepted")}
          className="pill bg-accent px-5 py-2.5 text-sm text-on-dark transition-colors hover:bg-white hover:text-ink"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

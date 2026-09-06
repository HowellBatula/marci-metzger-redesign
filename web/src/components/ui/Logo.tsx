import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Text-set wordmark in Instrument Sans, replacing the old Fraunces-script
 * logo image so the nav stays inside the single-typeface system.
 */
export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link
      href="#top"
      className={cn(
        "leading-none tracking-tight",
        light ? "text-on-dark" : "text-ink",
        className
      )}
      aria-label="Marci Metzger Homes — home"
    >
      <span className="block text-[0.95rem] font-medium tracking-[0.02em]">
        Marci Metzger
      </span>
      <span
        className={cn(
          "block text-[0.7rem] tracking-[0.18em] uppercase",
          light ? "text-on-dark-muted" : "text-muted"
        )}
      >
        Homes
      </span>
    </Link>
  );
}

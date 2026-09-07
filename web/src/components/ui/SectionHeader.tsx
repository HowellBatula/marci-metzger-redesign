import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeaderProps = {
  /** Two-digit section index. Runs 01–06 across the page, once. */
  number: string;
  eyebrow: string;
  title: string;
  /** Set on the h2 so the parent <section> can aria-labelledby it. */
  titleId?: string;
  tone?: "light" | "dark";
};

/**
 * Section lockup: giant ghost numeral + eyebrow label + h2.
 *
 * The numeral lives here rather than inside SplitPanel so the page has a
 * single 01–06 sequence. Previously the eyebrows counted 02–06 (About had
 * no number at all) while SplitPanel's numerals restarted at 01 in both
 * "Get It Sold" and "Our Services" — the largest numbers on the page were
 * the ones that repeated.
 *
 * Renders header content only; each section supplies its own wrapper so it
 * keeps control of background and padding.
 */
export function SectionHeader({
  number,
  eyebrow,
  title,
  titleId,
  tone = "light",
}: SectionHeaderProps) {
  const isDark = tone === "dark";

  return (
    <>
      <Reveal>
        <div className="mb-5 flex items-baseline gap-5">
          <span
            aria-hidden="true"
            className={cn("ghost-numeral", isDark && "ghost-numeral--light")}
          >
            {number}
          </span>
          <span className={cn("eyebrow", isDark && "eyebrow--light")}>
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={1}>
        <h2 id={titleId} className={cn("h2", isDark && "text-on-dark")}>
          {title}
        </h2>
      </Reveal>
    </>
  );
}

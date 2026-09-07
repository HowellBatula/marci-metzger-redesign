import Image from "next/image";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

type SplitPanelProps = {
  tone: "light" | "dark";
  eyebrow?: string;
  /**
   * Omit when the section already carries its heading in a SectionHeader
   * above the panel (About) — otherwise the title would appear twice.
   */
  title?: string;
  /**
   * Heading tag only — the visual scale stays `.h3` either way. Panels
   * nested under a section's own h2 keep the default "h3".
   */
  titleAs?: "h2" | "h3";
  body: React.ReactNode;
  image: {
    src: string;
    alt: string;
    /**
     * CSS object-position for the crop. Defaults to "center", which is wrong
     * for portraits: the panel gets wider without getting taller, so
     * object-cover crops more off the top and bottom the larger the screen
     * gets, and a face in the upper third rides out of frame. Give those a
     * focal point nearer the top.
     */
    position?: string;
  };
  mediaSide?: "left" | "right";
  extra?: React.ReactNode;
};

/**
 * Full-bleed alternating light/dark panel — the primitive behind
 * "Get It Sold" and "Services", modeled on the reference site's
 * "Prime Midtown Location / Modern Amenities" pattern.
 *
 * The giant ghost numeral used to live here and restarted at 01 in every
 * section, contradicting the 01–06 section numbering in the eyebrows.
 * It now belongs to the section header instead, so there is one sequence.
 */
export function SplitPanel({
  tone,
  eyebrow,
  title,
  titleAs: Heading = "h3",
  body,
  image,
  mediaSide = "right",
  extra,
}: SplitPanelProps) {
  const isDark = tone === "dark";

  const copy = (
    <div
      className={cn(
        // justify-center, not justify-between: the ghost numeral used to be
        // the bottom anchor of this column, so without it justify-between
        // would strand the copy at the top of the tall panels.
        "flex flex-col justify-center px-[var(--gutter)] py-16 md:py-24",
        isDark ? "bg-dark text-on-dark" : "bg-paper-2 text-ink"
      )}
    >
      <div>
        {eyebrow && (
          <Reveal>
            <p className={cn("eyebrow mb-6", isDark && "eyebrow--light")}>
              {eyebrow}
            </p>
          </Reveal>
        )}
        {title && (
          <Reveal delay={1}>
            <Heading className="h3 mb-5">{title}</Heading>
          </Reveal>
        )}
        {body && (
          <Reveal delay={2}>
            <div
              className={cn(
                "max-w-md text-base leading-relaxed",
                isDark ? "text-on-dark-muted" : "text-muted"
              )}
            >
              {body}
            </div>
          </Reveal>
        )}
        {extra && <Reveal delay={3}>{extra}</Reveal>}
      </div>
    </div>
  );

  const media = (
    // The height grows with the viewport instead of staying fixed, so the
    // crop stays roughly proportional as the column widens. With a flat
    // 520px the box got relatively shorter the wider the screen, which is
    // what pushed the portrait's face out of frame on large displays.
    <div className="relative min-h-[320px] md:min-h-[clamp(520px,40vw,720px)]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
        style={{ objectPosition: image.position ?? "center" }}
      />
    </div>
  );

  return (
    <div className="grid md:grid-cols-2">
      {mediaSide === "left" ? (
        <>
          {media}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {media}
        </>
      )}
    </div>
  );
}

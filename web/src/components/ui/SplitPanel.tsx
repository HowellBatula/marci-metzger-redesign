import Image from "next/image";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

type SplitPanelProps = {
  tone: "light" | "dark";
  number: string;
  eyebrow?: string;
  title: string;
  body: React.ReactNode;
  image: { src: string; alt: string };
  mediaSide?: "left" | "right";
  extra?: React.ReactNode;
};

/**
 * Full-bleed alternating light/dark panel with a giant ghost numeral —
 * the primitive behind "Get It Sold" and "Services", modeled on the
 * reference site's "Prime Midtown Location / Modern Amenities" pattern.
 */
export function SplitPanel({
  tone,
  number,
  eyebrow,
  title,
  body,
  image,
  mediaSide = "right",
  extra,
}: SplitPanelProps) {
  const isDark = tone === "dark";

  const copy = (
    <div
      className={cn(
        "flex flex-col justify-between px-[var(--gutter)] py-16 md:py-24",
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
        <Reveal delay={1}>
          <h3 className="h3 mb-5">{title}</h3>
        </Reveal>
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
      <p
        className={cn(
          "ghost-numeral mt-16",
          isDark && "ghost-numeral--light"
        )}
        aria-hidden="true"
      >
        {number}
      </p>
    </div>
  );

  const media = (
    <div className="relative min-h-[320px] md:min-h-[520px]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
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

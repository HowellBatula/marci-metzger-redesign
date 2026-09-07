"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/gallery/Lightbox";
import { cn } from "@/lib/cn";
import type { Photo } from "@/components/gallery/photos";

/**
 * Horizontal scroll-snap filmstrip, replacing the previous 2-column grid.
 *
 * The old grid stacked 7 photos into 4 rows (~2,000px of vertical space at a
 * typical container width). This holds every photo in one row at a fixed
 * height regardless of count — adding an 8th photo extends the strip, not
 * the page. Bleeds past the section's right edge on purpose: the trailing
 * tile peeks in, cut off, to signal there's more without a text hint.
 */
export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(photos.length <= 1);

  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);

  function close() {
    const trigger = openIndex !== null ? triggers.current[openIndex] : null;
    setOpenIndex(null);
    // Restore focus to the tile that opened the viewer rather than letting
    // it fall back to the top of the document.
    trigger?.focus();
  }

  // Tracks which tile is currently "current" (for the counter and progress
  // rule) and whether either edge of the strip is reachable (for the arrow
  // disabled states and the fade mask). One observer with two thresholds
  // does both jobs: >=0.6 picks the dominant tile, >0 is enough to know the
  // first/last tile is at least partly in view.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ratios = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = tiles.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) ratios.set(index, entry.intersectionRatio);
        });

        const dominant = [...ratios.entries()]
          .filter(([, ratio]) => ratio >= 0.6)
          .sort((a, b) => a[0] - b[0])[0];
        if (dominant) setActiveIndex(dominant[0]);

        setAtStart((ratios.get(0) ?? 0) > 0);
        setAtEnd((ratios.get(photos.length - 1) ?? 0) > 0);
      },
      { root: track, threshold: [0, 0.6] }
    );

    tiles.current.forEach((tile) => tile && observer.observe(tile));
    return () => observer.disconnect();
  }, [photos.length]);

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(photos.length - 1, index));
    // "smooth" here is subject to the same global reduced-motion override
    // as the rest of the site (globals.css forces scroll-behavior: auto),
    // so this needs no separate prefers-reduced-motion check.
    tiles.current[clamped]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }

  const fadeClass = atEnd
    ? "gallery-fade--end"
    : atStart
      ? "gallery-fade"
      : "gallery-fade--mid";

  return (
    <>
      <div className="mb-6 flex items-end justify-between gap-4">
        <p className="font-mono text-xs tracking-[0.08em] text-muted tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(photos.length).padStart(2, "0")}
        </p>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            disabled={atStart}
            aria-label="Previous photo"
            className="pill flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            disabled={atEnd}
            aria-label="Next photo"
            className="pill flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Photo gallery, scrollable"
        className={cn(
          "no-scrollbar -mr-[var(--gutter)] flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scroll-padding-inline-start:var(--gutter)]",
          fadeClass
        )}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            ref={(el) => {
              tiles.current[i] = el;
            }}
            className="w-[85vw] shrink-0 snap-start sm:w-[480px] lg:w-[600px]"
          >
            <Reveal className="block h-full">
              <div className="group relative aspect-[4/3] h-full overflow-hidden">
                <button
                  type="button"
                  ref={(el) => {
                    triggers.current[i] = el;
                  }}
                  onClick={() => setOpenIndex(i)}
                  aria-haspopup="dialog"
                  aria-label={`View photo ${i + 1} of ${photos.length}: ${photo.alt}`}
                  className="absolute inset-0 h-full w-full cursor-pointer"
                >
                  {/* Decorative: the button's aria-label already carries the
                      description, so a second one here would double-announce. */}
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 600px, (min-width: 640px) 480px, 85vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <ArrowUpRight size={18} strokeWidth={1.75} />
                  </span>
                </button>
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      {/* Hairline progress rule — the same device as the section eyebrows and
          ghost numerals, applied to scroll position instead of a section
          index. */}
      <div className="mt-4 h-px w-full bg-line">
        <div
          className="h-px bg-accent transition-[width] duration-300"
          style={{ width: `${((activeIndex + 1) / photos.length) * 100}%` }}
        />
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={close}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}

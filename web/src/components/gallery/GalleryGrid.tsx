"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Lightbox } from "@/components/gallery/Lightbox";
import type { Photo } from "@/components/gallery/photos";

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);

  function close() {
    const trigger = openIndex !== null ? triggers.current[openIndex] : null;
    setOpenIndex(null);
    // Restore focus to the tile that opened the viewer rather than letting it
    // fall back to the top of the document.
    trigger?.focus();
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {photos.map((photo, i) => (
          <Reveal
            key={photo.src}
            delay={(i % 4) + 1}
            className="group relative aspect-[4/3] overflow-hidden"
          >
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
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <ArrowUpRight size={18} strokeWidth={1.75} />
              </span>
            </button>
          </Reveal>
        ))}
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

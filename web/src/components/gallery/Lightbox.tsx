"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { useScrollLock } from "@/lib/use-scroll-lock";
import type { Photo } from "@/components/gallery/photos";

type LightboxProps = {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

/**
 * Full-screen photo viewer.
 *
 * Mounted only while open, so — unlike the nav overlay — it structurally
 * cannot leave focusable controls stranded in the tab order when closed.
 */
export function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  useFocusTrap(true, panelRef, onClose);
  useScrollLock(true);

  const total = photos.length;
  const photo = photos[index];

  function go(delta: number) {
    onNavigate((index + delta + total) % total);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      onNavigate(0);
    } else if (event.key === "End") {
      event.preventDefault();
      onNavigate(total - 1);
    }
  }

  // No SSR guard needed: this component is only ever rendered in response to
  // a click, so document.body is always present by the time it mounts.
  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-caption"
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[200] flex flex-col bg-dark/97 backdrop-blur-sm"
    >
      <div className="flex items-center justify-end p-[var(--gutter)] pb-4">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="pill glass flex h-11 w-11 items-center justify-center text-on-dark"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Backdrop click closes, but only when the click both starts and ends
          on the backdrop itself — otherwise dragging off the image closes it. */}
      <div
        className="relative flex flex-1 items-center justify-center px-[var(--gutter)]"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="relative h-full max-h-[70vh] w-full max-w-5xl">
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 p-[var(--gutter)] pt-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="pill glass flex h-11 w-11 shrink-0 items-center justify-center text-on-dark"
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>

        {/* Single live region: arrow-key navigation swaps the image without
            moving focus, so this is what announces the change. */}
        <p
          id="lightbox-caption"
          role="status"
          aria-live="polite"
          className="text-center text-sm text-on-dark-muted"
        >
          <span className="text-on-dark">
            {index + 1} / {total}
          </span>{" "}
          &mdash; {photo.alt}
        </p>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="pill glass flex h-11 w-11 shrink-0 items-center justify-center text-on-dark"
        >
          <ArrowRight size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>,
    document.body
  );
}

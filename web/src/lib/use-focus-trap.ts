"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Modal focus management: moves focus in on open, cycles Tab within the
 * container, closes on Escape, and restores focus to whatever was focused
 * before on close.
 *
 * `onEscape` is deliberately held in a ref and kept out of the dependency
 * array. If it were a dependency, a caller passing an inline arrow would
 * tear down and re-run this effect on every parent render — which re-steals
 * focus to the first element mid-interaction and, worse, re-captures
 * `previouslyFocused` as an element inside the dialog, breaking restore.
 */
export function useFocusTrap(
  active: boolean,
  ref: React.RefObject<HTMLElement | null>,
  onEscape?: () => void,
  /**
   * Where focus should land on open. Defaults to the first focusable child,
   * which is only the right answer when that child is the dismiss control.
   */
  initialFocusRef?: React.RefObject<HTMLElement | null>
) {
  const escapeRef = useRef(onEscape);

  // Kept in sync via its own effect rather than assigned during render.
  // The keydown handler reads it lazily at event time, long after this has
  // flushed, so the trap effect below never needs onEscape in its deps.
  useEffect(() => {
    escapeRef.current = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );

    (initialFocusRef?.current ?? focusables()[0] ?? node).focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        escapeRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    node.addEventListener("keydown", onKeyDown);
    return () => {
      node.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [active, ref, initialFocusRef]);
}

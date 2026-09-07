"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "mm_cookie_consent";

export type Consent = "accepted" | "declined" | null;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep other tabs in sync.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Consent {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

/** Server render has no localStorage, so it always reports "not yet asked". */
function getServerSnapshot(): Consent {
  return null;
}

export function setConsent(consent: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // Non-persistent session — the banner reappears next visit.
  }
  emit();
}

/**
 * Reads consent from localStorage without a hydration mismatch.
 *
 * useSyncExternalStore is the right primitive here: localStorage is an
 * external store, and this avoids the setState-in-effect pattern that
 * causes a cascading render on every page load.
 */
export function useConsent(): Consent {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

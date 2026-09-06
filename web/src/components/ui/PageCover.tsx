"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Prevents a flash of unrevealed/unstyled content on first paint. */
export function PageCover() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setHidden(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn("cover", hidden && "is-hidden")}
    />
  );
}

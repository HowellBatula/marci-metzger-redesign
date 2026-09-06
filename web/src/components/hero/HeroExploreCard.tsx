"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useAnchorScroll } from "@/lib/use-anchor-scroll";

/**
 * Floating CTA card in the hero's bottom-right corner, mirroring the
 * reference site's "Explore Offices" card.
 */
export function HeroExploreCard() {
  const onAnchorClick = useAnchorScroll();

  return (
    <motion.a
      href="#search"
      onClick={onAnchorClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="pill absolute bottom-24 right-[var(--gutter)] hidden items-center gap-4 bg-paper py-2 pl-2 pr-5 shadow-2xl md:flex"
    >
      <span className="relative block h-14 w-14 overflow-hidden rounded-full">
        <Image
          src="/img/banner-find-your-dream-home.jpg"
          alt=""
          fill
          sizes="56px"
          className="object-cover"
        />
      </span>
      <span className="flex flex-col text-ink">
        <span className="text-sm leading-tight">Search</span>
        <span className="text-sm leading-tight">Listings</span>
      </span>
      <ArrowUpRight size={18} strokeWidth={1.75} className="text-ink" />
    </motion.a>
  );
}

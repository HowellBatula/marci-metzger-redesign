import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const LOGOS = [
  { src: "/img/logo-ridge-realty-group-circle.png", alt: "The Ridge Realty Group" },
  { src: "/img/badge-equal-housing-opportunity.png", alt: "Equal Housing Opportunity" },
  { src: "/img/badge-realtor-pin.jpg", alt: "REALTOR®" },
  { src: "/img/badge-pahrump-chamber.jpg", alt: "Pahrump Valley Chamber of Commerce" },
];

/**
 * Deliberately dark: this strip is the only thing breaking up four
 * consecutive light/paper sections (Search → Affiliations → Gallery →
 * Services) that used to run together with no tonal reset in between.
 * Two of the four source badges are opaque JPGs (a white rectangle would
 * show through on a dark ground), so each logo sits on its own paper
 * chip rather than directly on the section background — that also turns
 * "logo strip" into something closer to a set of seals/plaques.
 */
export function AffiliationsSection() {
  return (
    <section
      aria-label="Affiliations and memberships"
      className="bg-dark border-y border-line-dark py-14 md:py-16"
    >
      <Reveal as="div" className="container-page">
        <p className="eyebrow eyebrow--light mb-8 text-center">
          Affiliated With
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          {LOGOS.map((logo) => (
            <div
              key={logo.src}
              className="flex h-20 w-32 items-center justify-center rounded-md bg-paper p-4 opacity-90 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0"
            >
              <div className="relative h-full w-full">
                <Image src={logo.src} alt={logo.alt} fill sizes="96px" className="object-contain" />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const LOGOS = [
  { src: "/img/logo-ridge-realty-group-circle.png", name: "The Ridge Realty Group" },
  { src: "/img/badge-equal-housing-opportunity.png", name: "Equal Housing Opportunity" },
  { src: "/img/badge-realtor-pin.jpg", name: "REALTOR®" },
  { src: "/img/badge-pahrump-chamber.jpg", name: "Pahrump Valley Chamber of Commerce" },
];

/**
 * Deliberately dark: this strip is the only thing breaking up four
 * consecutive light/paper sections (Search → Affiliations → Gallery →
 * Services) that used to run together with no tonal reset in between.
 * Two of the four source badges are opaque JPGs (a white rectangle would
 * show through on a dark ground), so each logo sits on its own paper
 * chip rather than directly on the section background — that also turns
 * "logo strip" into something closer to a set of seals/plaques.
 *
 * Named, not just shown: a small unlabeled icon reads as filler you'd
 * have to already recognize to mean anything. A visible caption under
 * each mark makes the affiliation itself the content, not the logo —
 * the img's alt is empty since the caption right below it says the same
 * thing to a screen reader too, and doubling it up would just be noise.
 * Shown in true color at rest, not grayscale-until-hover, for the same
 * reason: these are meant to be noticed, not sit as muted trivia.
 */
export function AffiliationsSection() {
  return (
    <section
      aria-label="Affiliations and memberships"
      className="bg-dark border-y border-line-dark py-16 md:py-20"
    >
      <Reveal as="div" className="container-page">
        <p className="eyebrow eyebrow--light mb-10 text-center">
          Affiliated With
        </p>
        <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-10 sm:gap-x-14">
          {LOGOS.map((logo) => (
            <div key={logo.src} className="flex w-32 flex-col items-center gap-4 sm:w-40">
              <div className="flex h-24 w-full items-center justify-center rounded-md bg-paper p-4 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1 sm:h-28">
                <div className="relative h-full w-full">
                  <Image src={logo.src} alt="" fill sizes="160px" className="object-contain" />
                </div>
              </div>
              <p className="text-center text-xs leading-snug tracking-wide text-on-dark-muted">
                {logo.name}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

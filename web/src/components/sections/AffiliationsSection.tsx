import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

const LOGOS = [
  { src: "/img/logo-ridge-realty-group-circle.png", alt: "The Ridge Realty Group" },
  { src: "/img/badge-equal-housing-opportunity.png", alt: "Equal Housing Opportunity" },
  { src: "/img/badge-realtor-pin.jpg", alt: "REALTOR®" },
  { src: "/img/badge-pahrump-chamber.jpg", alt: "Pahrump Valley Chamber of Commerce" },
];

export function AffiliationsSection() {
  return (
    <section
      aria-label="Affiliations and memberships"
      className="border-y border-line py-12"
    >
      <Reveal
        as="div"
        className="container-page flex flex-wrap items-center justify-center gap-x-14 gap-y-8"
      >
        {LOGOS.map((logo) => (
          <div key={logo.src} className="relative h-12 w-24 opacity-60 grayscale transition-opacity hover:opacity-100">
            <Image src={logo.src} alt={logo.alt} fill sizes="96px" className="object-contain" />
          </div>
        ))}
      </Reveal>
    </section>
  );
}

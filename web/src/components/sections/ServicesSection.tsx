import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServicesBento } from "@/components/sections/ServicesBento";

export function ServicesSection() {
  return (
    // bg-paper-2 + border-t: Gallery above sits directly on the page's base
    // --paper with no background of its own, so back-to-back the two
    // sections were pixel-identical with nothing marking where one ends
    // and the other begins. paper-2 is the same token SplitPanel's "light"
    // tone already uses elsewhere — a small, established step down from
    // --paper, not a new color — plus a hairline to make the seam explicit
    // rather than relying on the tonal shift alone to read as intentional.
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-paper-2 border-t border-line"
    >
      <div className="container-page pt-24 pb-14 md:pt-32">
        <SectionHeader
          number="05"
          eyebrow="What We Do"
          title="Our Services"
          titleId="services-heading"
        />
      </div>

      <div className="pb-24 md:pb-32">
        <ServicesBento />
      </div>
    </section>
  );
}

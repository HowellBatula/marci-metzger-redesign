import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServicesBento } from "@/components/sections/ServicesBento";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading">
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

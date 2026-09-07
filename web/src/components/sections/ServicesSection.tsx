import { SplitPanel } from "@/components/ui/SplitPanel";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading">
      <div className="px-[var(--gutter)] pb-14 pt-24 md:pt-32">
        <SectionHeader
          number="05"
          eyebrow="What We Do"
          title="Our Services"
          titleId="services-heading"
        />
      </div>

      <SplitPanel
        tone="light"
        title="Real Estate Done Right"
        mediaSide="right"
        image={{ src: "/img/services-real-estate-done-right.jpg", alt: "Styled living room" }}
        body="Nervous about your property adventure? Don't be. Whether you're getting ready to buy or sell your residence, looking at investment properties, or just curious about the market, our team ensures you get the best experience possible."
      />
      <SplitPanel
        tone="dark"
        title="Commercial & Residential"
        mediaSide="left"
        image={{ src: "/img/services-commercial-residential.jpg", alt: "Modern villa on a hillside with lap pool" }}
        body="Large or small, condo or mansion, we can find it and get it at the price that's right. Fixer-uppers? Luxury? We can help with all of it — we live, work, and play in this community."
      />
      <SplitPanel
        tone="light"
        title="Rely on Expertise"
        mediaSide="right"
        image={{ src: "/img/services-rely-on-expertise.jpg", alt: "Handshake across a table with a smiling couple" }}
        body="Questions about affordability, credit, and loan options? Trust us to connect you with the right people to get the answers you need, so you feel confident every step of the way."
      />
    </section>
  );
}

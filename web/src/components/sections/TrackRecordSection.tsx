import { SplitPanel } from "@/components/ui/SplitPanel";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function TrackRecordSection() {
  return (
    <section id="sold" aria-labelledby="sold-heading">
      <div className="bg-dark px-[var(--gutter)] pb-14 pt-24 text-on-dark md:pt-32">
        <SectionHeader
          number="02"
          eyebrow="Track Record"
          title="Get It Sold"
          titleId="sold-heading"
          tone="dark"
        />
      </div>

      <SplitPanel
        tone="dark"
        title="Top Residential Sales Last 5 Years"
        mediaSide="right"
        image={{
          src: "/img/getitsold-top-residential-sales.jpg",
          alt: "Luxury open-plan kitchen with marble waterfall island",
        }}
        body="Our team works hard every day to grow and learn, so that we may continue to excel in our market. Our clients deserve our best, and we want to make sure our best is better every year."
        extra={
          <div className="mt-8 flex gap-10">
            <div>
              <p className="h3 mb-1">90</p>
              <p className="text-sm text-on-dark-muted">
                clients helped in 2021
              </p>
            </div>
            <div>
              <p className="h3 mb-1">$28.5M</p>
              <p className="text-sm text-on-dark-muted">in closed sales</p>
            </div>
          </div>
        }
      />

      <SplitPanel
        tone="light"
        title="Don't Just List It…"
        mediaSide="left"
        image={{
          src: "/img/getitsold-dont-just-list-it.jpg",
          alt: "Spanish-style home at dusk with lit loggia and curved pool",
        }}
        body="Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips of every possible buyer — getting you top dollar for your home."
      />

      <SplitPanel
        tone="dark"
        title="Guide to Buyers"
        mediaSide="right"
        image={{
          src: "/img/getitsold-guide-to-buyers.jpg",
          alt: "House keys with a red house-shaped keyring on barn wood",
        }}
        body="Nobody knows the market like we do. Enjoy having a pro at your service — market analysis, upgrade lists, contractors on speed dial, and more."
      />
    </section>
  );
}

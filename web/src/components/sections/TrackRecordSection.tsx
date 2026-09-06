import { Reveal } from "@/components/ui/Reveal";
import { SplitPanel } from "@/components/ui/SplitPanel";

export function TrackRecordSection() {
  return (
    <section id="sold">
      <div className="bg-dark px-[var(--gutter)] pb-14 pt-24 text-on-dark md:pt-32">
        <Reveal>
          <p className="eyebrow eyebrow--light mb-6">02 &nbsp;/&nbsp; Track Record</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="h2">Get It Sold</h2>
        </Reveal>
      </div>

      <SplitPanel
        tone="dark"
        number="01"
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
        number="02"
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
        number="03"
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

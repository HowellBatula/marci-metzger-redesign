import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Side-by-side like every other section (heading + copy in one column,
 * photo in the other), for the same left-right rhythm the rest of the page
 * uses — but not SplitPanel: that primitive's image fills the column
 * full-bleed top-to-bottom, which is right for a supporting kitchen or
 * pool photo and wrong for a face, stretching or cropping it as the
 * column's proportions change. The portrait keeps its own fixed 2:3 box
 * and hairline gold frame instead, sized to sit comfortably inside the
 * column rather than fill it.
 */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="container-page grid items-center gap-12 py-24 md:grid-cols-2 md:py-32">
        <div>
          <SectionHeader
            number="01"
            eyebrow="Meet Your Agent"
            title="Marci Metzger"
            titleId="about-heading"
          />
          <Reveal delay={2} className="mt-8">
            <p className="mb-4 text-lg text-ink">
              Realtor for Nearly 3 Decades
            </p>
            <p className="text-muted">
              Licensed broker in Seattle for over twenty years, now serving
              Southern Nevada as Pahrump&rsquo;s go-to real estate agent —
              Marci brings big-market experience to a close-knit desert
              community, and treats every client like a neighbor.
            </p>
            <a
              href="tel:12069196886"
              className="mt-6 inline-flex min-h-11 items-center border-b border-ink text-sm tracking-wide text-ink"
            >
              206-919-6886
            </a>
          </Reveal>
        </div>

        <Reveal delay={1} className="relative w-full max-w-[320px] md:justify-self-end">
          <div
            aria-hidden="true"
            className="absolute -inset-4 border border-accent/35"
          />
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <Image
              src="/img/about-marci-portrait.jpg"
              alt="Portrait of Marci Metzger"
              fill
              priority
              sizes="(min-width: 768px) 320px, (min-width: 640px) 300px, 260px"
              className="object-cover"
              // A 2:3 box matches the source photo's own proportions, so the
              // crop stays put at every width instead of the old fixed-height
              // panel, which cropped progressively more off the top and
              // bottom as the column got wider than it was tall.
              style={{ objectPosition: "50% 20%" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

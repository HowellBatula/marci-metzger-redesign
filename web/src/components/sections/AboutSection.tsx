import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * The only section that doesn't use SplitPanel. Every other section is
 * about a topic (sales record, search, services) with a supporting photo
 * alongside it as one of two equal halves — About is about Marci herself,
 * so the generic 50/50 grid made her portrait no more prominent than a
 * kitchen photo three sections down. This centers it instead: one large
 * portrait carrying the section, copy stacked underneath rather than
 * beside it.
 *
 * The frame line echoes the "matted" treatment on the Contact map — the
 * same idea (a hairline border standing off from a photo) applied to a
 * person instead of a place.
 */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="container-page pt-24 pb-14 md:pt-32">
        <SectionHeader
          number="01"
          eyebrow="Meet Your Agent"
          title="Marci Metzger"
          titleId="about-heading"
        />
      </div>

      <div className="container-page grid justify-items-center gap-12 pb-24 text-center md:pb-32">
        <Reveal className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-4 border border-accent/35"
          />
          <div className="relative aspect-[2/3] w-[260px] overflow-hidden sm:w-[300px] md:w-[360px]">
            <Image
              src="/img/about-marci-portrait.jpg"
              alt="Portrait of Marci Metzger"
              fill
              priority
              sizes="(min-width: 768px) 360px, (min-width: 640px) 300px, 260px"
              className="object-cover"
              // A 2:3 box matches the source photo's own proportions, so the
              // crop stays put at every width instead of the old fixed-height
              // panel, which cropped progressively more off the top and
              // bottom as the column got wider than it was tall.
              style={{ objectPosition: "50% 20%" }}
            />
          </div>
        </Reveal>

        {/* Her own voice, not the site's — set apart in the display serif
            rather than folded into the (third-person) bio paragraph below,
            the way a magazine profile pulls one line out of the copy and
            gives it room. Carries the emotional register so the bio
            underneath is free to stay purely factual. */}
        <Reveal delay={1} className="max-w-md">
          <p className="h3 text-ink">
            &ldquo;I treat every client like a neighbor — because in a town
            this size, that&rsquo;s exactly what you are.&rdquo;
          </p>
        </Reveal>

        <Reveal delay={2} className="max-w-lg">
          <p className="mb-4 text-lg text-ink">
            Realtor for Nearly 3 Decades
          </p>
          <p className="text-muted">
            Licensed broker in Seattle for over twenty years, now serving
            Southern Nevada as Pahrump&rsquo;s go-to real estate agent —
            Marci brings big-market experience to a close-knit desert
            community.
          </p>
          <a
            href="tel:12069196886"
            className="mt-6 inline-flex min-h-11 items-center border-b border-ink text-sm tracking-wide text-ink"
          >
            206-919-6886
          </a>
        </Reveal>
      </div>
    </section>
  );
}

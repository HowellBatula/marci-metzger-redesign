import { SplitPanel } from "@/components/ui/SplitPanel";

export function AboutSection() {
  return (
    <section id="about">
      <SplitPanel
        tone="light"
        number="01"
        eyebrow="Meet Your Agent"
        title="Marci Metzger"
        mediaSide="left"
        image={{
          src: "/img/about-marci-portrait.jpg",
          alt: "Portrait of Marci Metzger",
        }}
        body={
          <>
            <p className="mb-4 text-lg text-ink">
              Realtor for Nearly 3 Decades
            </p>
            <p>
              Licensed broker in Seattle for over twenty years, now serving
              Southern Nevada as Pahrump&rsquo;s go-to real estate agent —
              Marci brings big-market experience to a close-knit desert
              community, and treats every client like a neighbor.
            </p>
          </>
        }
        extra={
          <a
            href="tel:12069196886"
            className="mt-6 inline-block border-b border-ink text-sm tracking-wide text-ink"
          >
            206-919-6886
          </a>
        }
      />
    </section>
  );
}

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PHONE_HREF } from "@/lib/nav-links";
import { HeroExploreCard } from "@/components/hero/HeroExploreCard";

export function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-dark">
      <div className="absolute inset-0">
        <Image
          src="/img/hero-mountain-falls-pond.jpg"
          alt="Mountain Falls golf community at dusk, pond and fountains framed by desert mountains"
          fill
          priority
          sizes="100vw"
          className="animate-[kenburns_22s_ease-in-out_infinite_alternate] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/40" />
      </div>

      <div className="container relative flex h-full flex-col justify-end pb-32 pt-32 md:pb-28">
        <Reveal>
          <p className="eyebrow eyebrow--light mb-6">
            Marci Metzger &mdash; The Ridge Realty Group
          </p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="h1 text-on-dark">
            Pahrump
            <br />
            Realtor.
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="body-lg mt-6 max-w-lg text-on-dark-muted">
            Nearly three decades finding the right key for the right door in
            Southern Nevada.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={PHONE_HREF} variant="solid">
              Call Now
            </Button>
            <Button href="#search" variant="outline-light">
              Search Homes
            </Button>
          </div>
        </Reveal>
      </div>

      <HeroExploreCard />

      <div
        aria-hidden="true"
        className="absolute bottom-10 left-[var(--gutter)] hidden flex-col items-start gap-3 text-on-dark-muted md:flex"
      >
        <span className="text-[0.7rem] tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="h-12 w-px bg-line-dark" />
      </div>
    </section>
  );
}

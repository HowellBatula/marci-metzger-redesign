import Image from "next/image";
import { KeyRound, Building2, HeartHandshake, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Service = {
  icon: LucideIcon;
  title: string;
  body: string;
  image: { src: string; alt: string };
};

const SERVICES: Service[] = [
  {
    icon: KeyRound,
    title: "Real Estate Done Right",
    body: "Nervous about your property adventure? Don't be. Whether you're getting ready to buy or sell your residence, looking at investment properties, or just curious about the market, our team ensures you get the best experience possible.",
    image: {
      src: "/img/services-real-estate-done-right.jpg",
      alt: "Styled living room",
    },
  },
  {
    icon: Building2,
    title: "Commercial & Residential",
    body: "Large or small, condo or mansion, we can find it and get it at the price that's right. Fixer-uppers? Luxury? We can help with all of it — we live, work, and play in this community.",
    image: {
      src: "/img/services-commercial-residential.jpg",
      alt: "Modern villa on a hillside with lap pool",
    },
  },
  {
    icon: HeartHandshake,
    title: "Rely on Expertise",
    body: "Questions about affordability, credit, and loan options? Trust us to connect you with the right people to get the answers you need, so you feel confident every step of the way.",
    image: {
      src: "/img/services-rely-on-expertise.jpg",
      alt: "Handshake across a table with a smiling couple",
    },
  },
];

/**
 * Asymmetric bento grid — deliberately not the SplitPanel full-bleed,
 * alternating-row treatment TrackRecordSection ("Get It Sold") uses one
 * section up. One large feature card plus two supporting cards, each
 * self-contained with its own photo and a glass caption plate, on one
 * shared background rather than three stacked 50/50 light/dark rows.
 */
export function ServicesBento() {
  const [feature, ...rest] = SERVICES;

  return (
    <div className="container-page grid gap-6 md:h-[38rem] md:grid-cols-2 md:grid-rows-2">
      <BentoCard service={feature} large />
      {rest.map((service) => (
        <BentoCard key={service.title} service={service} />
      ))}
    </div>
  );
}

function BentoCard({ service, large = false }: { service: Service; large?: boolean }) {
  const Icon = service.icon;

  return (
    <Reveal
      className={cn(
        "group relative isolate overflow-hidden",
        large ? "aspect-[4/5] md:row-span-2 md:aspect-auto" : "aspect-[5/4] sm:aspect-[4/3] md:aspect-auto"
      )}
    >
      <Image
        src={service.image.src}
        alt={service.image.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <div className="glass absolute inset-x-4 bottom-4 p-4 sm:p-5 md:inset-x-6 md:bottom-6 md:p-6">
        <Icon size={20} strokeWidth={1.5} className="mb-2 text-accent-light sm:mb-3" />
        <h3 className="mb-1 font-serif text-xl leading-tight tracking-tight text-on-dark sm:mb-2 sm:text-2xl md:text-[1.75rem]">
          {service.title}
        </h3>
        <p className="line-clamp-2 max-w-sm text-sm leading-snug text-on-dark-muted sm:line-clamp-none sm:leading-relaxed">
          {service.body}
        </p>
      </div>
    </Reveal>
  );
}

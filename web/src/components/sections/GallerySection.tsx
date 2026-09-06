import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const PHOTOS = [
  { src: "/img/gallery-1-4460-roseworthy-52.jpg", alt: "Aerial view of Mountain Falls golf course and fountain pond" },
  { src: "/img/gallery-2-5570-ailanto-14.jpg", alt: "Sunroom with views onto desert landscaping" },
  { src: "/img/gallery-3-5570-ailanto-45.jpg", alt: "Aerial view of a tile-roof home on a cul-de-sac with pool" },
  { src: "/img/gallery-4-5570-ailanto-50.jpg", alt: "Aerial rear view of a pool and spa beside a golf greenbelt" },
  { src: "/img/gallery-5-4787-e-beacon-ridge-54.jpg", alt: "Community amenity center with courts and clubhouse" },
  { src: "/img/gallery-6-4787-e-beacon-ridge-53.jpg", alt: "Amenity center with courts, clubhouse and golf pond" },
  { src: "/img/gallery-7-4787-e-beacon-ridge-41.jpg", alt: "Streetscape of new homes backing onto a golf course" },
];

export function GallerySection() {
  return (
    <section id="gallery" className="container py-24 md:py-32">
      <Reveal>
        <p className="eyebrow mb-6">04 &nbsp;/&nbsp; Recent Work</p>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="h2 mb-14">Photo Gallery</h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {PHOTOS.map((photo, i) => (
          <Reveal key={photo.src} delay={(i % 4) + 1} className="group relative aspect-[4/3] overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
              <ArrowUpRight size={18} strokeWidth={1.75} />
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { SectionHeader } from "@/components/ui/SectionHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GALLERY_PHOTOS } from "@/components/gallery/photos";

/**
 * Server component — only the interactive grid below is client-side, so the
 * section heading stays server-rendered.
 */
export function GallerySection() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="container-page py-24 md:py-32"
    >
      <div className="mb-14">
        <SectionHeader
          number="04"
          eyebrow="Recent Work"
          title="Photo Gallery"
          titleId="gallery-heading"
        />
      </div>

      <GalleryGrid photos={GALLERY_PHOTOS} />
    </section>
  );
}

import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { TrackRecordSection } from "@/components/sections/TrackRecordSection";
import { SearchSection } from "@/components/sections/SearchSection";
import { AffiliationsSection } from "@/components/sections/AffiliationsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SiteFooter } from "@/components/footer/SiteFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <TrackRecordSection />
      <SearchSection />
      <AffiliationsSection />
      <GallerySection />
      <ServicesSection />
      <ContactSection />
      <SiteFooter />
    </>
  );
}

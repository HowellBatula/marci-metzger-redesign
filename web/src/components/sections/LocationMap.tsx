import { MapPin } from "lucide-react";
import { NEARBY_PLACES, OFFICE_QUERY, nearbyPlaceHref } from "@/lib/nearby-places";

const OFFICE_HREF = `https://www.google.com/maps?q=${OFFICE_QUERY}`;

/**
 * Real Google Maps embed, "matted" like a framed print rather than dropped
 * in edge-to-edge: a dark border stands in for a mat board, and a hairline
 * gold ring frames the glass itself. `saturate`+`contrast`+`brightness` pull
 * Google's default blue/yellow palette down to something that sits next to
 * warm ivory and brass instead of fighting it — enough to harmonize without
 * the flat full-grayscale treatment this used to have, which desaturated
 * street labels into illegibility.
 *
 * No custom pins overlaid on top: a plain embed (no maps API key) doesn't
 * expose its own pan/zoom state, so anything drawn on top only lines up
 * with the view at load and silently drifts the moment a visitor drags it.
 * The numbered directory stays a real, working list instead.
 */
export function LocationMap() {
  return (
    <div className="grid md:grid-cols-[minmax(0,1fr)_2fr]">
      <div className="bg-dark px-[var(--gutter)] py-12 text-on-dark md:py-16">
        <p className="eyebrow eyebrow--light mb-6">Nearby</p>
        <ul>
          {NEARBY_PLACES.map((place, i) => (
            <li key={place.name} className="border-b border-line-dark">
              <a
                href={nearbyPlaceHref(place.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline gap-4 py-3 text-on-dark-muted transition-colors hover:text-on-dark"
              >
                <span className="font-mono text-xs text-accent-light tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{place.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-dark p-3 md:p-5">
        <div className="relative h-[320px] ring-1 ring-accent-light/25 md:h-full md:min-h-[420px]">
          <iframe
            title="Map to 3190 HW-160, Suite F, Pahrump, Nevada"
            src={`https://www.google.com/maps?q=${OFFICE_QUERY}&z=13&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 [filter:saturate(0.55)_contrast(1.1)_brightness(1.03)]"
          />
          {/* Top corner, not bottom: Google's own zoom/Street-View controls
              and the required attribution strip live along the bottom
              edge, and covering either would collide with them (the
              attribution can't be covered at all, per Google's terms). */}
          <a
            href={OFFICE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="pill glass glass--accent absolute top-5 right-5 flex items-center gap-2 px-5 py-3 text-sm text-on-dark"
          >
            <MapPin size={15} strokeWidth={1.5} className="text-accent-light" />
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}

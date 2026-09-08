/**
 * Real, well-known Pahrump-area landmarks for the "Nearby" directory beside
 * the map — the format 360lexingtonave.com uses (a numbered list, not
 * hardcoded pin coordinates we don't have real geodata for). Each links to
 * a Google Maps search rather than a fixed lat/long, so it's always
 * accurate regardless of the exact walking distance.
 *
 * Demo content for this preview, same footing as the sample MLS dataset —
 * verify with the client before this goes live.
 */
export const NEARBY_PLACES = [
  "Mountain Falls Golf Club",
  "Pahrump Valley Winery",
  "Petrack Park",
  "Terrible's Town Casino & Bingo",
  "Pahrump Valley Museum",
  "Spring Mountain Motor Resort & Country Club",
] as const;

export function nearbyPlaceHref(place: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place} Pahrump NV`
  )}`;
}

/**
 * Real, well-known Pahrump-area landmarks for the "Nearby" directory beside
 * the map — the format 360lexingtonave.com uses. Links to a Google Maps
 * search per place rather than a fixed lat/long, so it stays accurate
 * regardless of exact distance.
 *
 * Demo content for this preview, same footing as the sample MLS dataset —
 * verify with the client before this goes live.
 */
export const NEARBY_PLACES = [
  { name: "Mountain Falls Golf Club" },
  { name: "Pahrump Valley Winery" },
  { name: "Petrack Park" },
  { name: "Terrible's Town Casino & Bingo" },
  { name: "Pahrump Valley Museum" },
  { name: "Spring Mountain Motor Resort & Country Club" },
] as const;

export const OFFICE_QUERY = "36.184402445333134,-115.95528754494798";

export function nearbyPlaceHref(place: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${place} Pahrump NV`
  )}`;
}

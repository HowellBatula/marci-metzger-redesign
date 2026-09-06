import listingsData from "@/data/listings.json";

export type Listing = {
  id: string;
  title: string;
  location: string;
  type: string;
  beds: number;
  baths: number;
  price: number;
  sqft: number | null;
  image: string;
};

export type ListingFilters = {
  location?: string;
  type?: string;
  beds?: string; // "3+" etc.
  baths?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
};

const ALL_LISTINGS = listingsData as Listing[];

function minFromPlus(value: string | undefined): number | null {
  if (!value) return null;
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? null : n;
}

/**
 * Filters + sorts the local MLS-ready dataset. This is the single swap
 * point for a real IDX/RESO feed later — same signature, same return
 * shape, just backed by a live API call instead of listings.json.
 */
export function filterListings(filters: ListingFilters): Listing[] {
  const minBeds = minFromPlus(filters.beds);
  const minBaths = minFromPlus(filters.baths);

  let results = ALL_LISTINGS.filter((listing) => {
    if (filters.location && listing.location !== filters.location) return false;
    if (filters.type && listing.type !== filters.type) return false;
    if (minBeds !== null && listing.beds < minBeds) return false;
    if (minBaths !== null && listing.baths < minBaths) return false;
    if (filters.minPrice !== undefined && listing.price < filters.minPrice)
      return false;
    if (filters.maxPrice !== undefined && listing.price > filters.maxPrice)
      return false;
    return true;
  });

  switch (filters.sort) {
    case "Newest":
      results = [...results].reverse();
      break;
    case "Oldest":
      // dataset order is already oldest-first
      break;
    case "Price: Low to High":
      results = [...results].sort((a, b) => a.price - b.price);
      break;
    case "Price: High to Low":
      results = [...results].sort((a, b) => b.price - a.price);
      break;
    case "Bedrooms: Low to High":
      results = [...results].sort((a, b) => a.beds - b.beds);
      break;
    case "Bedrooms: High to Low":
      results = [...results].sort((a, b) => b.beds - a.beds);
      break;
    case "Bathrooms: Low to High":
      results = [...results].sort((a, b) => a.baths - b.baths);
      break;
    case "Bathrooms: High to Low":
      results = [...results].sort((a, b) => b.baths - a.baths);
      break;
    default:
      break;
  }

  return results;
}

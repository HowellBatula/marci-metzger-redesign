import { NextRequest, NextResponse } from "next/server";
import { filterListings } from "@/lib/listings";

/**
 * MLS-ready placeholder endpoint. Filters the local data/listings.json
 * dataset server-side. Swap the body of this handler for a real IDX/RESO
 * feed call later — filterListings()'s signature (filters in, Listing[]
 * out) is the seam a real vendor SDK should slot into.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const minPriceRaw = params.get("minPrice");
  const maxPriceRaw = params.get("maxPrice");

  const results = filterListings({
    location: params.get("location") || undefined,
    type: params.get("type") || undefined,
    beds: params.get("beds") || undefined,
    baths: params.get("baths") || undefined,
    minPrice: minPriceRaw ? Number(minPriceRaw) : undefined,
    maxPrice: maxPriceRaw ? Number(maxPriceRaw) : undefined,
    sort: params.get("sort") || undefined,
  });

  return NextResponse.json({ count: results.length, listings: results });
}

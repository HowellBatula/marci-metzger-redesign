import { NextRequest, NextResponse } from "next/server";
import { filterListings } from "@/lib/listings";

/**
 * MLS-ready placeholder endpoint. Filters the local data/listings.json
 * dataset server-side. Swap the body of this handler for a real IDX/RESO
 * feed call later — filterListings()'s signature (filters in, Listing[]
 * out) is the seam a real vendor SDK should slot into.
 */

/**
 * Treats "no preference" values as absent. The UI sends "" for these, but the
 * endpoint shouldn't depend on its only caller behaving — a direct request for
 * `?location=Any location` previously matched nothing and returned an empty
 * set rather than everything.
 */
function cleanParam(value: string | null): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  if (trimmed === "—" || /^any\b/i.test(trimmed)) return undefined;
  return trimmed;
}

/** Rejects unparseable prices instead of passing NaN into a comparison,
 *  where `price < NaN` is always false and silently disables the filter. */
function cleanPrice(value: string | null): number | undefined {
  const digits = value?.replace(/\D/g, "");
  if (!digits) return undefined;
  const parsed = Number(digits);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const results = filterListings({
    location: cleanParam(params.get("location")),
    type: cleanParam(params.get("type")),
    beds: cleanParam(params.get("beds")),
    baths: cleanParam(params.get("baths")),
    minPrice: cleanPrice(params.get("minPrice")),
    maxPrice: cleanPrice(params.get("maxPrice")),
    sort: cleanParam(params.get("sort")),
  });

  return NextResponse.json({ count: results.length, listings: results });
}

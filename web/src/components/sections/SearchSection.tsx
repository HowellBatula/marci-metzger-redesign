"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { scrollToElement } from "@/lib/use-anchor-scroll";
import type { Listing } from "@/lib/listings";

type FormValues = {
  location: string;
  type: string;
  sort: string;
  beds: string;
  baths: string;
  minPrice: string;
  maxPrice: string;
};

// One sentinel convention for "no preference": the empty string. Previously
// location/type used "" while beds/baths used the literal "Any Number", which
// forced a startsWith("Any") hack in the submit handler and meant the API
// returned zero results if called directly with the display string.
const defaultValues: FormValues = {
  location: "",
  type: "",
  sort: "",
  beds: "",
  baths: "",
  minPrice: "",
  maxPrice: "",
};

/** "$450,000" -> "450000". Number("$450,000") is NaN, and `price < NaN` is
 *  always false, so an unparsed value silently disabled the filter. */
function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function SearchSection() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({ defaultValues });
  const [results, setResults] = useState<Listing[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // Bring the results into view once they've actually rendered. Running this
  // as an effect rather than inside the submit handler means the DOM node
  // exists by the time we reach for it, with no requestAnimationFrame dance.
  useEffect(() => {
    if (results && resultsRef.current) {
      scrollToElement(resultsRef.current, -80);
    }
  }, [results]);

  async function onSubmit(values: FormValues) {
    setError(null);
    try {
      const params = new URLSearchParams();
      Object.entries(values).forEach(([key, value]) => {
        const clean =
          key === "minPrice" || key === "maxPrice" ? digitsOnly(value) : value;
        if (clean) params.set(key, clean);
      });

      const res = await fetch(`/api/listings?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResults(Array.isArray(data.listings) ? data.listings : []);
    } catch {
      setError("Couldn't load listings just now. Please try again.");
      setResults(null);
    }
  }

  const status = isSubmitting
    ? "Searching…"
    : error
      ? error
      : results
        ? `${results.length} ${results.length === 1 ? "listing" : "listings"} found`
        : "";

  return (
    <section id="search" aria-labelledby="search-heading" className="relative">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/img/banner-find-your-dream-home.jpg"
            alt="Modern villa at sunset with an infinity pool"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/72" />
        </div>

        <div className="container-page relative py-24 md:py-32">
          <SectionHeader
            number="03"
            eyebrow="Start Looking"
            title="Find Your Dream Home"
            titleId="search-heading"
            tone="dark"
          />

          <Reveal delay={2}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-10 rounded-md bg-paper/95 p-6 backdrop-blur md:p-8"
            >
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
                <Field label="Location">
                  <select {...register("location")} className="field-input">
                    <option value="">Any location</option>
                    <option>Pahrump Valley</option>
                    <option>Mountain Falls</option>
                    <option>Blagg Road</option>
                    <option>Manse</option>
                    <option>Homestead</option>
                    <option>Calvada Valley</option>
                  </select>
                </Field>
                <Field label="Type">
                  <select {...register("type")} className="field-input">
                    <option value="">Any type</option>
                    <option>Single Family</option>
                    <option>Manufactured</option>
                    <option>Land / Lot</option>
                    <option>Multi-Family</option>
                    <option>Commercial</option>
                  </select>
                </Field>
                <Field label="Sort By">
                  <select {...register("sort")} className="field-input">
                    <option value="">Default</option>
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Bedrooms: Low to High</option>
                    <option>Bedrooms: High to Low</option>
                    <option>Bathrooms: Low to High</option>
                    <option>Bathrooms: High to Low</option>
                  </select>
                </Field>
                <Field label="Bedrooms">
                  <select {...register("beds")} className="field-input">
                    <option value="">Any number</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                    <option>5+</option>
                  </select>
                </Field>
                <Field label="Baths">
                  <select {...register("baths")} className="field-input">
                    <option value="">Any number</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                  </select>
                </Field>
                <Field label="Min Price">
                  <input
                    {...register("minPrice")}
                    type="text"
                    inputMode="numeric"
                    placeholder="$0"
                    className="field-input"
                  />
                </Field>
                <Field label="Max Price">
                  <input
                    {...register("maxPrice")}
                    type="text"
                    inputMode="numeric"
                    placeholder="No max"
                    className="field-input"
                  />
                </Field>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="pill bg-ink px-6 py-3.5 text-sm tracking-wide text-on-dark transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Searching…" : "Search Now"}
                </button>

                {/* The only live region in this form — a second one on the
                    results block would make every search announce twice. */}
                <p
                  role="status"
                  aria-live="polite"
                  className="text-sm text-muted"
                >
                  {status}
                </p>
              </div>
            </form>
          </Reveal>

          {results && (
            <div ref={resultsRef} data-results className="pt-16">
              <p className="mb-8 text-sm text-on-dark-muted">
                Sample data for this preview — connect a real MLS/IDX feed to go
                live.
              </p>
              {results.length === 0 ? (
                <p className="text-on-dark-muted">
                  No matches. Try widening your filters.
                </p>
              ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs tracking-wide text-muted">
      <span>{label}</span>
      {children}
    </label>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  const priceLabel = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(listing.price);

  return (
    <article className="text-on-dark">
      <div className="relative mb-4 aspect-[4/3] overflow-hidden">
        {/* Decorative: the title is rendered as visible text directly below. */}
        <Image
          src={listing.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <p className="text-lg">{listing.title}</p>
      <p className="mb-2 text-sm text-on-dark-muted">{listing.location}</p>
      <p className="text-sm">
        {priceLabel}
        {listing.beds > 0 && (
          <>
            {" "}
            &middot; {listing.beds} bd &middot; {listing.baths} ba
          </>
        )}
      </p>
    </article>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Reveal } from "@/components/ui/Reveal";
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

const defaultValues: FormValues = {
  location: "",
  type: "",
  sort: "",
  beds: "Any Number",
  baths: "Any Number",
  minPrice: "",
  maxPrice: "",
};

export function SearchSection() {
  const { register, handleSubmit } = useForm<FormValues>({ defaultValues });
  const [results, setResults] = useState<Listing[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: FormValues) {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value && !value.startsWith("Any")) params.set(key, value);
    });

    const res = await fetch(`/api/listings?${params.toString()}`);
    const data = await res.json();
    setResults(data.listings as Listing[]);
    setLoading(false);
  }

  return (
    <section id="search" className="relative">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/img/banner-find-your-dream-home.jpg"
            alt="Modern villa at sunset with infinity pool overlooking the desert"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="container relative py-24 md:py-32">
          <Reveal>
            <p className="eyebrow eyebrow--light mb-6">03 &nbsp;/&nbsp; Start Looking</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="h2 mb-10 text-on-dark">Find Your Dream Home</h2>
          </Reveal>

          <Reveal delay={2}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-md bg-paper/95 p-6 backdrop-blur md:p-8"
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
                    <option value="">—</option>
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
                    <option>Any Number</option>
                    <option>1+</option>
                    <option>2+</option>
                    <option>3+</option>
                    <option>4+</option>
                    <option>5+</option>
                  </select>
                </Field>
                <Field label="Baths">
                  <select {...register("baths")} className="field-input">
                    <option>Any Number</option>
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

              <button
                type="submit"
                className="pill mt-6 bg-ink px-6 py-3.5 text-sm tracking-wide text-on-dark transition-colors hover:bg-accent"
              >
                {loading ? "Searching…" : "Search Now"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>

      {results && (
        <div className="container py-16">
          <p className="mb-8 text-sm text-muted">
            {results.length}{" "}
            {results.length === 1 ? "listing" : "listings"} found — sample
            data for this preview; connect a real MLS/IDX feed to go live.
          </p>
          {results.length === 0 ? (
            <p className="text-muted">
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
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
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
    <article>
      <div className="relative mb-4 aspect-[4/3] overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <p className="text-lg text-ink">{listing.title}</p>
      <p className="mb-2 text-sm text-muted">{listing.location}</p>
      <p className="text-sm text-ink">
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

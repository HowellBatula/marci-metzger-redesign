"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SOCIAL_LINKS } from "@/lib/social-links";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/nav-links";
import { OFFICE_HOURS } from "@/lib/office-hours";
import { contactSchema, type ContactValues } from "@/lib/contact-schema";

const MAP_QUERY = "36.184402445333134,-115.95528754494798";

export function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });
  const [note, setNote] = useState<string | null>(null);

  // UI-only for now, per project decision — no network call. See
  // src/app/api/contact/route.ts for the scaffolded (unwired) endpoint.
  function onSubmit() {
    setNote(
      `Thanks — this demo form isn't wired to an inbox yet. Call ${PHONE_DISPLAY} in the meantime.`
    );
    reset();
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-dark text-on-dark"
    >
      <div className="container-page grid gap-16 py-24 md:grid-cols-2 md:py-32">
        <Reveal>
          <SectionHeader
            number="06"
            eyebrow="Get in Touch"
            title="Call or Visit"
            titleId="contact-heading"
            tone="dark"
          />

          {/* noValidate keeps `required` in the accessibility tree while
              suppressing the browser's native bubble, so react-hook-form +
              zod stay the single source of validation truth. */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-10 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className="text-xs tracking-wide text-on-dark-muted"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                {...register("name")}
                className="field-input field-input--dark"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                className="text-xs tracking-wide text-on-dark-muted"
              >
                Email <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
                {...register("email")}
                className="field-input field-input--dark"
              />
              {errors.email && (
                // Icon + "Error:" prefix so the failure isn't signalled by
                // colour alone. Sibling of the label, not a child — nesting it
                // inside folded the message into the field's accessible name.
                <p
                  id="contact-email-error"
                  className="flex items-center gap-1.5 text-xs text-accent-light"
                >
                  <AlertCircle size={14} aria-hidden="true" />
                  <span>
                    <span className="sr-only">Error: </span>
                    {errors.email.message}
                  </span>
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                className="text-xs tracking-wide text-on-dark-muted"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                {...register("message")}
                className="field-input field-input--dark resize-none"
              />
            </div>

            <button
              type="submit"
              className="pill mt-2 self-start border border-line-dark px-6 py-3.5 text-sm tracking-wide text-on-dark transition-colors hover:bg-white/10"
            >
              Send
            </button>

            {note && (
              <p
                role="status"
                aria-live="polite"
                className="text-sm text-on-dark-muted"
              >
                {note}
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={1}>
          <h3 className="h3 mb-6">Marci Metzger — The Ridge Realty Group</h3>
          <address className="text-on-dark-muted not-italic">
            3190 HW-160, Suite F
            <br />
            Pahrump, Nevada 89048
            <br />
            United States
          </address>
          <a
            href={PHONE_HREF}
            className="mt-4 inline-flex min-h-11 items-center border-b border-line-dark text-on-dark"
          >
            {PHONE_DISPLAY}
          </a>

          <div className="mt-10">
            <h4 className="mb-2 text-sm text-on-dark">Office Hours</h4>
            {/* Was "Open today · …", which asserted a live fact the page can't
                know and duplicated the line below it. */}
            <p className="text-sm text-on-dark-muted">
              {OFFICE_HOURS.displayDays} &middot; {OFFICE_HOURS.displayOpens}{" "}
              &ndash; {OFFICE_HOURS.displayCloses}
            </p>
            <p className="mt-2 text-sm text-on-dark-muted">
              Appointments outside office hours available upon request. Just
              call.
            </p>
          </div>

          <div className="mt-10 flex gap-5">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-xs tracking-[0.14em] text-on-dark-muted uppercase hover:text-on-dark"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal as="div" className="relative h-[420px]">
        <iframe
          title="Map to 3190 HW-160, Suite F, Pahrump, Nevada"
          src={`https://www.google.com/maps?q=${MAP_QUERY}&z=14&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 contrast-125 grayscale"
        />
        <a
          href={`https://www.google.com/maps?q=${MAP_QUERY}`}
          target="_blank"
          rel="noopener noreferrer"
          className="pill absolute right-6 bottom-6 bg-accent px-5 py-3 text-sm text-on-dark"
        >
          Get Directions
        </a>
      </Reveal>
    </section>
  );
}

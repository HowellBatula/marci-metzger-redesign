"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Reveal } from "@/components/ui/Reveal";
import { SOCIAL_LINKS } from "@/lib/social-links";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/nav-links";

const contactSchema = z.object({
  name: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  message: z.string().optional(),
});

type ContactValues = z.infer<typeof contactSchema>;

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
      "Thanks — this demo form isn't wired to an inbox yet. Call (206) 919-6886 in the meantime."
    );
    reset();
  }

  return (
    <section id="contact" className="bg-dark text-on-dark">
      <div className="container grid gap-16 py-24 md:grid-cols-2 md:py-32">
        <Reveal>
          <p className="eyebrow eyebrow--light mb-6">06 &nbsp;/&nbsp; Get in Touch</p>
          <h2 className="h2 mb-10">Call or Visit</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <label className="flex flex-col gap-1.5 text-xs tracking-wide text-on-dark-muted">
              <span>Name</span>
              <input {...register("name")} type="text" autoComplete="name" className="field-input field-input--dark" />
            </label>
            <label className="flex flex-col gap-1.5 text-xs tracking-wide text-on-dark-muted">
              <span>Email *</span>
              <input {...register("email")} type="email" autoComplete="email" className="field-input field-input--dark" />
              {errors.email && (
                <span className="text-xs text-accent-light">{errors.email.message}</span>
              )}
            </label>
            <label className="flex flex-col gap-1.5 text-xs tracking-wide text-on-dark-muted">
              <span>Message</span>
              <textarea {...register("message")} rows={4} className="field-input field-input--dark resize-none" />
            </label>
            <button
              type="submit"
              className="pill mt-2 self-start border border-line-dark px-6 py-3.5 text-sm tracking-wide text-on-dark transition-colors hover:bg-white/10"
            >
              Send
            </button>
            {note && (
              <p role="status" aria-live="polite" className="text-sm text-on-dark-muted">
                {note}
              </p>
            )}
          </form>
        </Reveal>

        <Reveal delay={1}>
          <h3 className="h3 mb-6">Marci Metzger — The Ridge Realty Group</h3>
          <address className="not-italic text-on-dark-muted">
            3190 HW-160, Suite F
            <br />
            Pahrump, Nevada 89048
            <br />
            United States
          </address>
          <a href={PHONE_HREF} className="mt-4 inline-block border-b border-line-dark text-on-dark">
            {PHONE_DISPLAY}
          </a>

          <div className="mt-10">
            <h4 className="mb-2 text-sm text-on-dark">Office Hours</h4>
            <p className="text-sm text-on-dark-muted">
              Open today &middot; 8:00&nbsp;AM &ndash; 7:00&nbsp;PM
            </p>
            <p className="text-sm text-on-dark-muted">
              Open daily &middot; 8:00&nbsp;AM &ndash; 7:00&nbsp;PM
            </p>
            <p className="mt-2 text-sm text-on-dark-muted/70">
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
                rel="noopener"
                className="text-xs tracking-[0.14em] text-on-dark-muted uppercase hover:text-on-dark"
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
          src="https://www.google.com/maps?q=36.184402445333134,-115.95528754494798&z=14&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 grayscale contrast-125"
        />
        <a
          href="https://www.google.com/maps?q=36.184402445333134,-115.95528754494798"
          target="_blank"
          rel="noopener"
          className="pill absolute bottom-6 right-6 bg-accent px-5 py-3 text-sm text-on-dark"
        >
          Get Directions
        </a>
      </Reveal>
    </section>
  );
}

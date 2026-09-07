import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { PHONE_DISPLAY } from "@/lib/nav-links";

/**
 * Contact form endpoint — scaffolded but NOT wired up to the UI yet
 * (deferred per project decision: UI first, email delivery later).
 *
 * To go live: install `resend` (or `nodemailer`), add RESEND_API_KEY to
 * .env.local (see .env.example), and replace the log below with an actual
 * send call. Then point ContactSection's onSubmit at this route.
 */
export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    // Without this guard a malformed body became an unhandled rejection,
    // surfacing as a 500 with a stack trace rather than a 400.
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Validation failed." },
      { status: 422 }
    );
  }

  // Metadata only — never log the submitted name, email or message. Those
  // would land in the hosting provider's function logs verbatim.
  console.log("[contact] submission received", {
    hasName: Boolean(parsed.data.name),
    messageLength: parsed.data.message?.length ?? 0,
  });

  return NextResponse.json({
    ok: true,
    message: `Thanks — this demo form isn't wired to an inbox yet. Call ${PHONE_DISPLAY} in the meantime.`,
  });
}

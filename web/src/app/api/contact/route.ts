import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form endpoint — scaffolded but NOT wired up to the UI yet
 * (deferred per project decision: UI first, email delivery later).
 *
 * To go live: install `resend` (or `nodemailer`), add RESEND_API_KEY to
 * .env.local (see .env.example), and replace the console.log below with
 * an actual send call. Then point ContactSection's onSubmit at this route.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();

  // TODO: validate `body` with the same zod schema ContactSection uses,
  // then send via Resend/Nodemailer instead of logging.
  console.log("[contact] submission received (not yet emailed):", body);

  return NextResponse.json({
    ok: true,
    message:
      "Thanks — this demo form isn't wired to an inbox yet. Call (206) 919-6886 in the meantime.",
  });
}

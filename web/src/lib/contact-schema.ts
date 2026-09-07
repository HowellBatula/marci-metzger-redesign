import { z } from "zod";

/**
 * Shared by the contact form and POST /api/contact so client and server
 * validate against one definition rather than drifting apart.
 */
export const contactSchema = z.object({
  name: z.string().max(120).optional(),
  email: z.email("Enter a valid email"),
  message: z.string().max(4000).optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;

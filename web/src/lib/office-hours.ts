/**
 * Single source of truth for opening hours — rendered in the contact section
 * and emitted as schema.org openingHoursSpecification in the root layout.
 *
 * Deliberately static. The page previously claimed "Open today · 8:00 AM –
 * 7:00 PM" regardless of the actual day or time; a live open/closed badge
 * would need timezone handling and would risk a hydration mismatch between
 * the server clock and the visitor's, for one line of copy.
 */
export const OFFICE_HOURS = {
  opens: "08:00",
  closes: "19:00",
  displayOpens: "8:00 AM",
  displayCloses: "7:00 PM",
  displayDays: "Open daily",
  days: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
} as const;

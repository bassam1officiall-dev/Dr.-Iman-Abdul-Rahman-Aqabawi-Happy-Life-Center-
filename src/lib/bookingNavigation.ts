export interface BookingFocusDetail {
  branchId?: "badrashein" | "faisal" | "online";
  audience?: string;
  focus?: string;
}

export const BOOKING_FOCUS_EVENT = "happylife:focus-booking";

export function navigateToBookingForm(detail?: BookingFocusDetail): void {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<BookingFocusDetail>(BOOKING_FOCUS_EVENT, {
      detail: detail ?? {},
    })
  );

  const el = document.getElementById("triage");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

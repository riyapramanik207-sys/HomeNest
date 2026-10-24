import { apiGet, apiPost } from "./api";

export function createBooking(bookingData) {
  return apiPost("/bookings", bookingData);
}

export function getBookingsByEmail(email) {
  return apiGet(`/bookings?email=${encodeURIComponent(email)}`);
}

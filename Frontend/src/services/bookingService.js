
import { apiGet, apiPost } from "./api";

export function createBooking(bookingData) {
  return apiPost("/bookings", bookingData);
}

export function getBookingsByEmail(email) {
  // The backend identifies the user from the login session.
  // The email parameter is retained for compatibility with existing callers.
  return apiGet("/bookings");
}

export function getBookingDetails(bookingId) {
  return apiGet(`/bookings/${bookingId}`);
}

export function cancelBooking(bookingId) {
  return apiPost(`/bookings/${bookingId}/cancel`, {});
}

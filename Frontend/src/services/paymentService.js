import { apiGet, apiPost } from "./api";

export function createPayment(paymentData) {
  return apiPost("/payments", paymentData);
}

export function getPaymentsForBooking(bookingId) {
  return apiGet(`/payments/booking/${bookingId}`);
}

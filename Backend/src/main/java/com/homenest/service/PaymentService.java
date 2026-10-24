
package com.homenest.service;

import com.homenest.dto.PaymentDTO;
import com.homenest.model.Booking;
import com.homenest.model.Payment;
import com.homenest.model.Property;
import com.homenest.repository.BookingRepository;
import com.homenest.repository.PaymentRepository;
import com.homenest.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final PropertyRepository propertyRepository;

    public PaymentService(
            PaymentRepository paymentRepository,
            BookingRepository bookingRepository,
            PropertyRepository propertyRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
        this.propertyRepository = propertyRepository;
    }

    @Transactional
    public Payment createPayment(PaymentDTO dto, String userEmail) {
        Booking booking = getOwnedBooking(dto.getBookingId(), userEmail);

        if ("CANCELLED".equalsIgnoreCase(booking.getStatus())) {
            throw new IllegalArgumentException(
                    "A cancelled booking cannot be paid for.");
        }
if (paymentRepository.existsByBookingIdAndStatusIgnoreCase(
        booking.getId(), "PENDING")) {
    throw new IllegalArgumentException(
            "A payment is already pending for this booking. "
            + "Please check your payment history.");
}
        Property property = propertyRepository.findById(booking.getPropertyId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Property not found."));

        if (property.getRent() == null || property.getRent().signum() <= 0) {
            throw new IllegalArgumentException("Property rent is invalid.");
        }

        if (dto.getPaymentMethod() == null
                || dto.getPaymentMethod().isBlank()) {
            throw new IllegalArgumentException("Payment method is required.");
        }

        String method = dto.getPaymentMethod().trim().toUpperCase(Locale.ROOT);

        if (!List.of("UPI", "CARD", "NET_BANKING", "CASH").contains(method)) {
            throw new IllegalArgumentException(
                    "Payment method must be UPI, CARD, NET_BANKING, or CASH.");
        }

        Payment payment = new Payment();
        payment.setBookingId(booking.getId());
        payment.setAmount(property.getRent());
        payment.setPaymentMethod(method);
        payment.setStatus("PENDING");

        return paymentRepository.save(payment);
    }

    public List<Payment> getPaymentsForBooking(Long bookingId, String userEmail) {
        getOwnedBooking(bookingId, userEmail);
        return paymentRepository.findByBookingIdOrderByCreatedAtDesc(bookingId);
    }

    public Payment getPaymentById(Long paymentId, String userEmail) {
        if (paymentId == null || paymentId <= 0) {
            throw new IllegalArgumentException("A valid payment ID is required.");
        }

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Payment not found."));

        getOwnedBooking(payment.getBookingId(), userEmail);
        return payment;
    }

    private Booking getOwnedBooking(Long bookingId, String userEmail) {
        if (bookingId == null || bookingId <= 0) {
            throw new IllegalArgumentException("A valid booking ID is required.");
        }

        if (userEmail == null || userEmail.isBlank()) {
            throw new IllegalArgumentException("You must be logged in.");
        }

        return bookingRepository
                .findByIdAndEmailIgnoreCase(bookingId, userEmail)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Booking not found for your account."));
    }
}

package com.homenest.service;

import com.homenest.dto.PaymentDTO;
import com.homenest.model.Payment;
import com.homenest.repository.BookingRepository;
import com.homenest.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    public PaymentService(
            PaymentRepository paymentRepository,
            BookingRepository bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    @Transactional
    public Payment createPayment(PaymentDTO dto) {
        if (dto.getBookingId() == null || dto.getBookingId() <= 0) {
            throw new IllegalArgumentException("A valid booking ID is required");
        }

        if (!bookingRepository.existsById(dto.getBookingId())) {
            throw new IllegalArgumentException("Booking not found: " + dto.getBookingId());
        }

        if (dto.getAmount() == null || dto.getAmount().signum() <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }

        String method = dto.getPaymentMethod().trim().toUpperCase(Locale.ROOT);
        List<String> allowedMethods =
                List.of("UPI", "CARD", "NET_BANKING", "CASH");

        if (!allowedMethods.contains(method)) {
            throw new IllegalArgumentException(
                    "Payment method must be UPI, CARD, NET_BANKING, or CASH");
        }

        Payment payment = new Payment();
        payment.setBookingId(dto.getBookingId());
        payment.setAmount(dto.getAmount());
        payment.setPaymentMethod(method);
        payment.setStatus("PENDING");

        return paymentRepository.save(payment);
    }

    public List<Payment> getPaymentsForBooking(Long bookingId) {
        if (bookingId == null || bookingId <= 0) {
            throw new IllegalArgumentException("A valid booking ID is required");
        }

        if (!bookingRepository.existsById(bookingId)) {
            throw new IllegalArgumentException("Booking not found: " + bookingId);
        }

        return paymentRepository.findByBookingIdOrderByCreatedAtDesc(bookingId);
    }

    public Payment getPaymentById(Long paymentId) {
        if (paymentId == null || paymentId <= 0) {
            throw new IllegalArgumentException("A valid payment ID is required");
        }

        return paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new IllegalArgumentException("Payment not found: " + paymentId));
    }
}

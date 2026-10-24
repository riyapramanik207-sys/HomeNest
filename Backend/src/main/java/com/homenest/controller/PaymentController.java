
package com.homenest.controller;

import com.homenest.dto.PaymentDTO;
import com.homenest.model.Payment;
import com.homenest.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<?> createPayment(
            @Valid @RequestBody PaymentDTO dto,
            Authentication authentication) {
        try {
            Payment payment = paymentService.createPayment(
                    dto, authentication.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body(payment);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<?> getPaymentsForBooking(
            @PathVariable Long bookingId,
            Authentication authentication) {
        try {
            List<Payment> payments = paymentService.getPaymentsForBooking(
                    bookingId, authentication.getName());
            return ResponseEntity.ok(payments);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<?> getPaymentById(
            @PathVariable Long paymentId,
            Authentication authentication) {
        try {
            return ResponseEntity.ok(
                    paymentService.getPaymentById(
                            paymentId, authentication.getName()));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", ex.getMessage()));
        }
    }
}


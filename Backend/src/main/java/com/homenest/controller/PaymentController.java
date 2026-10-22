package com.homenest.controller;

import com.homenest.dto.PaymentDTO;
import com.homenest.model.Payment;
import com.homenest.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    public ResponseEntity<?> createPayment(@Valid @RequestBody PaymentDTO dto) {
        try {
            Payment payment = paymentService.createPayment(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(payment);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<?> getPaymentsForBooking(@PathVariable Long bookingId) {
        try {
            List<Payment> payments = paymentService.getPaymentsForBooking(bookingId);
            return ResponseEntity.ok(payments);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", ex.getMessage()));
        }
    }

    @GetMapping("/{paymentId}")
    public ResponseEntity<?> getPaymentById(@PathVariable Long paymentId) {
        try {
            return ResponseEntity.ok(paymentService.getPaymentById(paymentId));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", ex.getMessage()));
        }
    }
}


package com.homenest.controller;

import com.homenest.dto.BookingDTO;
import com.homenest.model.Booking;
import com.homenest.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174"
})
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @Valid @RequestBody BookingDTO dto,
            Authentication authentication) {

        Booking booking = new Booking();
        booking.setPropertyId(dto.getPropertyId());
        booking.setFullName(dto.getFullName());
        booking.setEmail(authentication.getName());
        booking.setPhone(dto.getPhone());
        booking.setMoveInDate(dto.getMoveInDate());
        booking.setDuration(dto.getDuration());
        booking.setOccupants(dto.getOccupants());
        booking.setFoodPreference(dto.getFoodPreference());
        booking.setIdProofType(dto.getIdProofType());

        Booking savedBooking = bookingService.createBooking(booking);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBooking);
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getMyBookings(
            Authentication authentication) {
        return ResponseEntity.ok(
                bookingService.getBookingsByEmail(authentication.getName())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingDetails(
            @PathVariable Long id,
            Authentication authentication) {
        return ResponseEntity.ok(
                bookingService.getBookingByIdForUser(
                        id, authentication.getName()
                )
        );
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(
            @PathVariable Long id,
            Authentication authentication) {
        return ResponseEntity.ok(
                bookingService.cancelBooking(id, authentication.getName())
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleBadRequest(
            IllegalArgumentException exception) {
        return ResponseEntity.badRequest().body(
                Map.of("error", exception.getMessage())
        );
    }
}



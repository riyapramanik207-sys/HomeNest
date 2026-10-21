
package com.homenest.service;

import com.homenest.model.Booking;
import com.homenest.model.Property;
import com.homenest.repository.BookingRepository;
import com.homenest.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final PropertyRepository propertyRepository;

    public BookingService(
            BookingRepository bookingRepository,
            PropertyRepository propertyRepository) {
        this.bookingRepository = bookingRepository;
        this.propertyRepository = propertyRepository;
    }

    @Transactional
    public Booking createBooking(Booking booking) {
        if (booking.getPropertyId() == null) {
            throw new IllegalArgumentException("Property ID is required.");
        }

        Property property = propertyRepository.findById(booking.getPropertyId())
                .orElseThrow(() ->
                        new IllegalArgumentException("Selected PG was not found."));

        if (!property.isAvailable()) {
            throw new IllegalArgumentException("This PG is not currently available.");
        }

        if (booking.getFullName() == null || booking.getFullName().isBlank()
                || booking.getEmail() == null || booking.getEmail().isBlank()
                || booking.getPhone() == null || booking.getPhone().isBlank()
                || booking.getMoveInDate() == null
                || booking.getDuration() == null || booking.getDuration().isBlank()
                || booking.getOccupants() == null || booking.getOccupants() < 1
                || booking.getFoodPreference() == null || booking.getFoodPreference().isBlank()
                || booking.getIdProofType() == null || booking.getIdProofType().isBlank()) {
            throw new IllegalArgumentException("Please provide all required booking details.");
        }

        booking.setId(null);
        booking.setPropertyName(property.getName());
        booking.setStatus("PENDING");

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email is required.");
        }
        return bookingRepository.findByEmailIgnoreCaseOrderByCreatedAtDesc(email);
    }
}


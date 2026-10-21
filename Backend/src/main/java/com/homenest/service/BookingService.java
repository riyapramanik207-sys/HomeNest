
package com.homenest.service;

import com.homenest.model.Booking;
import com.homenest.model.Property;
import com.homenest.repository.BookingRepository;
import com.homenest.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.Set;
import java.util.regex.Pattern;

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
     
if (booking.getPropertyId() == null || booking.getPropertyId() <= 0) {
    throw new IllegalArgumentException("A valid Property ID is required.");
}

if (booking.getEmail() == null || !booking.getEmail().matches(
        "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
    throw new IllegalArgumentException("Please enter a valid email.");
}

if (booking.getPhone() == null || !booking.getPhone().replaceAll("[\\s-]", "")
        .matches("^(?:\\+91)?[6-9]\\d{9}$")) {
    throw new IllegalArgumentException("Please enter a valid Indian phone number.");
}

if (booking.getMoveInDate() == null
        || booking.getMoveInDate().isBefore(LocalDate.now())) {
    throw new IllegalArgumentException("Please select a valid move-in date.");
}

if (booking.getDuration() == null || !Set.of(
        "1 Month", "3 Months", "6 Months", "12 Months"
).contains(booking.getDuration())) {
    throw new IllegalArgumentException("Please select a valid booking duration.");
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


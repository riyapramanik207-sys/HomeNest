
import React from "react";
import "./PropertyCard.css";

function PropertyCard({ property, onBook }) {
  const {
    id,
    name,
    location,
    city,
    price,
    type,
    roomType,
    gender,
    image,
    rating,
    amenities = [],
    food,
    wifi,
    attachedBathroom,
  } = property;

  return (
    <div className="property-card">
      {/* Property Image */}
      <div className="property-image-container">
        <img
          src={
            image ||
            "https://placehold.co/600x400?text=Property+Image"
          }
          alt={name}
          className="property-image"
          loading="lazy"
        />

        <span className="property-type">{type}</span>
      </div>

      {/* Property Information */}
      <div className="property-details">
        <div className="property-heading">
          <h3>{name}</h3>

          {rating != null && (
            <span className="property-rating">
              ⭐ {rating}
            </span>
          )}
        </div>

        <p className="property-location">
          📍 {location || city}
        </p>

        <p className="property-room">
          <strong>Room:</strong> {roomType || "Not specified"}
        </p>

        <p className="property-gender">
          <strong>Suitable for:</strong> {gender || "All"}
        </p>

        {/* Amenities */}
        <div className="property-amenities">
          {amenities.map((amenity, index) => (
            <span key={`${amenity}-${index}`} className="amenity-tag">
              {amenity}
            </span>
          ))}

          {food && <span className="amenity-tag">🍽️ Food</span>}
          {wifi && <span className="amenity-tag">📶 Wi-Fi</span>}

          {attachedBathroom && (
            <span className="amenity-tag">🚿 Attached Bathroom</span>
          )}
        </div>

        {/* Price and Booking */}
        <div className="property-footer">
          <div className="property-price">
            <h3>₹{Number(price).toLocaleString("en-IN")}</h3>
            <span>/ month</span>
          </div>

          <button
            className="property-book-btn"
            onClick={() => onBook?.(property)}
            type="button"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;


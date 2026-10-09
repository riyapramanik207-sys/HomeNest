
import React from "react";
import "./ReviewCard.css";

function ReviewCard({ review }) {
  const {
    name,
    profileImage,
    rating = 0,
    comment,
    date,
    propertyName,
  } = review;

  const validRating = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <div className="review-card">
      {/* Reviewer Information */}
      <div className="review-header">
        <img
          src={
            profileImage ||
            "https://placehold.co/80x80?text=User"
          }
          alt={`${name || "Reviewer"}'s profile`}
          className="review-profile-image"
          loading="lazy"
        />

        <div className="review-user-info">
          <h3>{name || "Anonymous User"}</h3>

          {propertyName && (
            <p className="review-property-name">
              {propertyName}
            </p>
          )}

          {date && (
            <p className="review-date">
              {new Date(date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>

      {/* Star Rating */}
      <div
        className="review-stars"
        role="img"
        aria-label={`${validRating} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= validRating
                ? "star filled"
                : "star"
            }
          >
            ★
          </span>
        ))}

        <span className="review-rating-number">
          {validRating.toFixed(1)}/5
        </span>
      </div>

      {/* Review Comment */}
      <p className="review-comment">
        {comment || "No review comment provided."}
      </p>
    </div>
  );
}

export default ReviewCard;


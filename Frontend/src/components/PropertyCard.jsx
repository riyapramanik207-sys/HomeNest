
import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  const {
    id,
    name,
    city,
    address,
    monthlyRent,
    imageUrl,
    rating,
    amenities = []
  } = property;

  return (
    <article className="card property-card h-100 border-0 shadow-sm">
      <img
        src={imageUrl || "/pg1.jpg"}
        className="card-img-top property-image"
        alt={name}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src =
            "https://placehold.co/600x400?text=HomeNest+PG";
        }}
      />

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between gap-2">
          <h2 className="h5 fw-bold">{name}</h2>
          {rating != null && (
            <span className="text-warning">★ {rating}</span>
          )}
        </div>

        <p className="text-secondary mb-2">
          {address ? `${address}, ` : ""}
          {city}
        </p>

        <p className="small text-secondary">
          {amenities.length ? amenities.join(" · ") : "PG accommodation"}
        </p>

        <p className="mt-auto mb-3">
          <strong className="text-success fs-5">
            ₹{Number(monthlyRent).toLocaleString("en-IN")}
          </strong>
          <span className="text-secondary"> / month</span>
        </p>

        <Link
          to={`/property/${id}`}
          className="btn btn-outline-success w-100"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}



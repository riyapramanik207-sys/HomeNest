import { Link } from "react-router-dom";
export default function Favorites() {
  // TODO: Fetch the current user's saved properties from the backend.
  const favorites = [];

  return (
    <main className="container py-4">
      <h1>My Favorite PGs</h1>

      {favorites.length === 0 ? (
        <div className="alert alert-info mt-3">
          You haven't saved any PGs yet.{" "}
          <Link to="/listings">Browse properties</Link>
        </div>
      ) : (
        <div className="row g-3">
          {favorites.map((property) => (
            <div className="col-md-4" key={property.id}>
              <div className="card h-100">
                <img
                  src={property.imageUrl}
                  alt={property.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5>{property.name}</h5>
                  <p>{property.city}</p>
                  <p>₹{property.monthlyRent} / month</p>
                  <Link
                    to={`/property/${property.id}`}
                    className="btn btn-primary"
                  >
                    View PG
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

import { Link } from "react-router-dom";
export default function Account() {
  // TODO: Load the logged-in user's profile from the backend.
  const user = {
    name: "HomeNest User",
    email: "user@example.com",
    role: "Student / Professional",
  };
return (
    <main className="container py-4">
      <h1>My Account</h1>
      <div className="card card-body mt-3" style={{ maxWidth: 600 }}>
        <h4>{user.name}</h4>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <Link to="/booking-history" className="btn btn-outline-primary mb-2">
          My Bookings
        </Link>
        <Link to="/favorites" className="btn btn-outline-secondary">
          My Favorites
        </Link>
      </div>
    </main>
  );
}

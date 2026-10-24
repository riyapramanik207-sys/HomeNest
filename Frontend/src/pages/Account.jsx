
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../services/api";

export default function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    getCurrentUser()
      .then((data) => {
        if (!data.authenticated) {
          throw new Error("Please log in to view your account.");
        }
        if (!cancelled) {
          setUser(data);
          setError("");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Could not load your profile.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogout() {
    try {
      await logoutUser();
      window.location.href = "/login";
    } catch (err) {
      setMessage(err.message || "Logout failed. Please try again.");
    }
  }

  if (loading) {
    return <main className="container py-4"><p>Loading your profile...</p></main>;
  }

  if (error) {
    return (
      <main className="container py-4">
        <h1>My Account</h1>
        <p className="alert alert-warning">{error}</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
        <Link to="/" className="btn btn-outline-secondary ms-2">Home</Link>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <h1>My Account</h1>

      <div className="card card-body mt-3" style={{ maxWidth: 600 }}>
        <h4>{user.name}</h4>
        <p>Email: {user.email}</p>

        <Link to="/bookings" className="btn btn-outline-primary mb-2">
          My Bookings
        </Link>

        <Link to="/" className="btn btn-outline-secondary mb-2">
          Browse PGs
        </Link>

        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

        {message && <p className="alert alert-danger mt-3 mb-0">{message}</p>}
      </div>
    </main>
  );
}

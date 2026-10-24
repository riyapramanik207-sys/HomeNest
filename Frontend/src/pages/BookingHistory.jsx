import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/api";
import { getBookingsByEmail } from "../services/bookingService";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadBookings() {
      try {
        const user = await getCurrentUser();

        if (!user?.email) {
          throw new Error("Please log in to view your booking history.");
        }

        const data = await getBookingsByEmail(user.email);

        if (!cancelled) {
          setBookings(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Could not load your booking history."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadBookings();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="container py-4">
      <h1>Booking History</h1>
      <p className="text-secondary">
        View your PG booking requests and their current status.
      </p>

      {loading && <p>Loading your bookings...</p>}

      {error && (
        <div className="alert alert-danger">
          {error}
          <div className="mt-2">
            <Link to="/login">Go to Login</Link>
          </div>
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="alert alert-info mt-3">
          You have no bookings yet.{" "}
          <Link to="/#properties">Explore PGs</Link>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="table-responsive mt-3">
          <table className="table table-bordered table-striped align-middle">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Property</th>
                <th>Move-in Date</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.propertyName || "PG property"}</td>
                  <td>{booking.moveInDate || "Not specified"}</td>
                  <td>{booking.duration || "Not specified"}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {booking.status || "PENDING"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/" className="btn btn-outline-primary mt-3">
        Back to HomeNest
      </Link>
    </main>
  );
}

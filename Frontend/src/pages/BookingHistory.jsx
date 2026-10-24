
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/api";
import {
  getBookingsByEmail,
  getBookingDetails,
  cancelBooking,
} from "../services/bookingService";
import { getPaymentsForBooking } from "../services/paymentService";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [details, setDetails] = useState({});
  const [busyId, setBusyId] = useState(null);
  const [payments, setPayments] = useState({});
const [paymentLoadingId, setPaymentLoadingId] = useState(null);
const [paymentErrors, setPaymentErrors] = useState({});

  async function loadBookings() {
    const user = await getCurrentUser();

    if (!user?.authenticated || !user?.email) {
      throw new Error("Please log in to view your booking history.");
    }

    const data = await getBookingsByEmail(user.email);
    setBookings(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const user = await getCurrentUser();

        if (!user?.authenticated || !user?.email) {
          throw new Error("Please log in to view your booking history.");
        }

        const data = await getBookingsByEmail(user.email);

        if (!cancelled) {
          setBookings(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Could not load your booking history.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleViewDetails(bookingId) {
    setError("");
    setMessage("");

    if (expandedId === bookingId) {
      setExpandedId(null);
      return;
    }

    try {
      setBusyId(bookingId);
      const booking = await getBookingDetails(bookingId);
      setDetails((previous) => ({ ...previous, [bookingId]: booking }));
      setExpandedId(bookingId);
    } catch (err) {
      setError(err.message || "Could not load booking details.");
    } finally {
      setBusyId(null);
    }
  }
async function handleViewPayments(bookingId) {
  setPaymentLoadingId(bookingId);

  setPaymentErrors((previous) => ({
    ...previous,
    [bookingId]: "",
  }));

  try {
    const data = await getPaymentsForBooking(bookingId);

    setPayments((previous) => ({
      ...previous,
      [bookingId]: Array.isArray(data) ? data : [],
    }));
  } catch (err) {
    setPaymentErrors((previous) => ({
      ...previous,
      [bookingId]:
        err.message || "Could not load payment history.",
    }));
  } finally {
    setPaymentLoadingId(null);
  }
}
  async function handleCancel(bookingId) {
    const confirmed = window.confirm(
      `Cancel booking #${bookingId}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      setBusyId(bookingId);
      const updated = await cancelBooking(bookingId);

      setBookings((previous) =>
        previous.map((booking) =>
          booking.id === bookingId ? updated : booking
        )
      );

      setDetails((previous) => ({
        ...previous,
        [bookingId]: updated,
      }));

      setMessage(`Booking #${bookingId} was cancelled successfully.`);
    } catch (err) {
      setError(err.message || "Could not cancel this booking.");
    } finally {
      setBusyId(null);
    }
  }

  function statusClass(status) {
    switch ((status || "PENDING").toUpperCase()) {
      case "CONFIRMED":
        return "bg-success";
      case "CANCELLED":
        return "bg-danger";
      case "REJECTED":
        return "bg-dark";
      default:
        return "bg-warning text-dark";
    }
  }

  return (
    <main className="container py-4">
      <h1>My Bookings</h1>
      <p className="text-secondary">
        View your booking requests, check their details, and cancel pending
        requests.
      </p>

      {loading && <p>Loading your bookings...</p>}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
          {error.toLowerCase().includes("log in") && (
            <div className="mt-2">
              <Link to="/login">Go to Login</Link>
            </div>
          )}
        </div>
      )}

      {message && (
        <div className="alert alert-success" role="status">
          {message}
        </div>
      )}

      {!loading && !error && bookings.length === 0 && (
        <div className="alert alert-info mt-3">
          You have no bookings yet.{" "}
          <Link to="/#properties">Explore PGs</Link>
        </div>
      )}

      {!loading && bookings.length > 0 && (
        <div className="table-responsive mt-3">
          <table className="table table-bordered table-striped align-middle">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Property</th>
                <th>Move-in Date</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const status = (booking.status || "PENDING").toUpperCase();
                const isBusy = busyId === booking.id;

                return (
                  <>
                    <tr key={booking.id}>
                      <td>#{booking.id}</td>
                      <td>{booking.propertyName || "PG property"}</td>
                      <td>{booking.moveInDate || "Not specified"}</td>
                      <td>{booking.duration || "Not specified"}</td>
                      <td>
                        <span className={`badge ${statusClass(status)}`}>
                          {status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-2">
                          
{(booking.status || "PENDING").toUpperCase() !== "CANCELLED" && (
  <Link
    to={`/payment?bookingId=${booking.id}&propertyId=${booking.propertyId}`}
    className="btn btn-sm btn-success"
  >
    Pay Now
  </Link>
)}

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            disabled={isBusy}
                            onClick={() => handleViewDetails(booking.id)}
                          >
                            {isBusy
                              ? "Please wait..."
                              : expandedId === booking.id
                                ? "Hide Details"
                                : "View Details"}
                          </button>

                          {status === "PENDING" && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              disabled={isBusy}
                              onClick={() => handleCancel(booking.id)}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {expandedId === booking.id && details[booking.id] && (
                      <tr key={`${booking.id}-details`}>
                        <td colSpan={6}>
                          <h6>Booking Details</h6>
                          <dl className="row mb-0">
                            <dt className="col-sm-3">Full Name</dt>
                            <dd className="col-sm-9">
                              {details[booking.id].fullName || "—"}
                            </dd>

                            <dt className="col-sm-3">Email</dt>
                            <dd className="col-sm-9">
                              {details[booking.id].email || "—"}
                            </dd>

                            <dt className="col-sm-3">Phone</dt>
                            <dd className="col-sm-9">
                              {details[booking.id].phone || "—"}
                            </dd>

                            <dt className="col-sm-3">Occupants</dt>
                            <dd className="col-sm-9">
                              {details[booking.id].occupants ?? "—"}
                            </dd>

                            <dt className="col-sm-3">Food Preference</dt>
                            <dd className="col-sm-9">
                              {details[booking.id].foodPreference || "—"}
                            </dd>

                            <dt className="col-sm-3">ID Proof Type</dt>
                            <dd className="col-sm-9">
                              {details[booking.id].idProofType || "—"}
                            </dd>

                            <dt className="col-sm-3">Created At</dt>
                            <dd className="col-sm-9">
                              {details[booking.id].createdAt
                                ? new Date(
                                    details[booking.id].createdAt
                                  ).toLocaleString()
                                : "—"}
                            </dd>
                          
                          </dl>

                          <hr className="my-3" />

                          <h6>Payment History</h6>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-success"
                            disabled={paymentLoadingId === booking.id}
onClick={() => handleViewPayments(booking.id)}
                          >
                            {paymentLoadingId === booking.id
                              ? "Loading payments..."
                              : "View Payment History"}
                          </button>

                          {paymentErrors[booking.id] && (
                            <div className="alert alert-danger mt-2">
                              {paymentErrors[booking.id]}
                            </div>
                          )}

                          {Object.prototype.hasOwnProperty.call(
                            payments,
                            booking.id
                          ) && (
                            payments[booking.id].length === 0 ? (
                              <p className="text-muted mt-2">
                                No payment records found for this booking.
                              </p>
                            ) : (
                              <div className="table-responsive mt-3">
                                <table className="table table-sm table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Payment ID</th>
                                      <th>Amount</th>
                                      <th>Method</th>
                                      <th>Status</th>
                                      <th>Payment Date</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {payments[booking.id].map((payment) => (
                                      <tr key={payment.id}>
                                        <td>#{payment.id}</td>
                                        <td>
                                          ₹{Number(payment.amount).toLocaleString("en-IN")}
                                        </td>
                                        <td>{payment.paymentMethod || "—"}</td>
                                        <td>{payment.status || "PENDING"}</td>
                                        <td>
                                          {payment.createdAt
                                            ? new Date(
                                                payment.createdAt
                                              ).toLocaleString()
                                            : "—"}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )
                          )}
                        </td>
                      </tr>

                    )}
                  </>
                );
              })}
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


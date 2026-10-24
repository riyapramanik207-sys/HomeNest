import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProperties } from "../services/pgService";
import { createPayment } from "../services/paymentService";

export default function Payment() {
  const [params] = useSearchParams();

  const bookingId = params.get("bookingId");
  const propertyId = params.get("propertyId");

  const [property, setProperty] = useState(null);
  const [method, setMethod] = useState("UPI");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadProperty() {
      if (!bookingId || !propertyId) {
        setError("Booking information is missing. Please start again from the PG listings.");
        setLoading(false);
        return;
      }

      try {
        const properties = await getProperties();
        const found = properties.find(
          (item) => Number(item.id) === Number(propertyId)
        );

        if (!found) {
          throw new Error("The selected property could not be found.");
        }

        if (active) {
          setProperty(found);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Could not load property details.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProperty();

    return () => {
      active = false;
    };
  }, [bookingId, propertyId]);

  async function handlePayment(event) {
    event.preventDefault();
    setError("");
    setPayment(null);

    if (!bookingId || !property || !Number.isFinite(Number(property.rent))) {
      setError("Valid booking and property details are required.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await createPayment({
        bookingId: Number(bookingId),
        amount: Number(property.rent),
        paymentMethod: method,
      });

      setPayment(result);
    } catch (err) {
      setError(
        err.message ||
          "Could not create the payment record. Please check your login and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <main className="container py-4">Loading payment details...</main>;
  }

  return (
    <main className="container py-4" style={{ maxWidth: 600 }}>
      <h1>Payment</h1>

      {error && <p className="alert alert-danger">{error}</p>}

      {property && !payment && (
        <>
          <div className="card card-body mb-3">
            <h2 className="h5">{property.name}</h2>
            <p className="mb-1">Booking ID: {bookingId}</p>
            <p className="mb-1">Property ID: {property.id}</p>
            <p className="mb-1">City: {property.city}</p>
            <p className="mb-0">
              Monthly rent: <strong>₹{Number(property.rent).toLocaleString("en-IN")}</strong>
            </p>
          </div>

          <form onSubmit={handlePayment} className="card card-body">
            <label htmlFor="paymentMethod" className="form-label">
              Select payment method
            </label>

            <select
              id="paymentMethod"
              className="form-select mb-3"
              value={method}
              onChange={(event) => setMethod(event.target.value)}
            >
              <option value="UPI">UPI</option>
              <option value="CARD">Debit/Credit Card</option>
              <option value="NET_BANKING">Net Banking</option>
            </select>

            <p className="text-muted">
              Demo only: this submits the monthly rent as a pending payment
              record. It does not transfer money.
            </p>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Create Payment Record"}
            </button>
          </form>
        </>
      )}

      {payment && (
        <section className="card card-body mt-3">
          <h2 className="h5">Payment record created</h2>
          <p>Payment ID: {payment.id}</p>
          <p>Booking ID: {payment.bookingId}</p>
          <p>
            Amount: ₹
            {Number(payment.amount).toLocaleString("en-IN")}
          </p>
          <p>Method: {payment.paymentMethod}</p>
          <p>
            Status: <strong>{payment.status}</strong>
          </p>
          <p className="alert alert-info mb-0">
            This is a simulated payment record. No real money was charged.
          </p>
        </section>
      )}

      <Link to="/" className="d-inline-block mt-3">
        Back to HomeNest
      </Link>
    </main>
  );
}

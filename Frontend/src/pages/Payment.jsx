import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
export default function Payment() {
  const [params] = useSearchParams();
  const [method, setMethod] = useState("UPI");
  const [message, setMessage] = useState("");
  const propertyId = params.get("propertyId") || "";
  const roomId = params.get("roomId") || "";

  const handlePayment = (event) => {
    event.preventDefault();
    setMessage(
      "Demo only: connect a payment gateway and backend before accepting payments."
    );
  };

  return (
    <main className="container py-4" style={{ maxWidth: 600 }}>
      <h1>Payment</h1>
      <p>Property ID: {propertyId || "Not specified"}</p>
      <p>Room ID: {roomId || "Not specified"}</p>

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
          <option value="Card">Debit/Credit Card</option>
          <option value="Net Banking">Net Banking</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Continue to Payment
        </button>
      </form>

      {message && <p className="alert alert-info mt-3">{message}</p>}
      <Link to="/booking" className="d-inline-block mt-3">
        Back to booking
      </Link>
    </main>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AddProperty() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    monthlyRent: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const property = {
      ...form,
      monthlyRent: Number(form.monthlyRent),
    };

    // TODO: POST property to the Spring Boot property API.
    console.log("Property submission:", property);
    setMessage("Property API is not connected yet.");
  };

  return (
    <main className="container py-4" style={{ maxWidth: 700 }}>
      <h1>Add a PG Property</h1>
      <form onSubmit={handleSubmit} className="card card-body gap-3">
        <label htmlFor="name">Property name</label>
        <input
          id="name"
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          className="form-control"
          value={form.city}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Full address</label>
        <input
          id="address"
          name="address"
          className="form-control"
          value={form.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="monthlyRent">Monthly rent (₹)</label>
        <input
          id="monthlyRent"
          name="monthlyRent"
          type="number"
          min="1"
          className="form-control"
          value={form.monthlyRent}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          className="form-control"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary">
          Submit Property
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate("/owner/dashboard")}
        >
          Cancel
        </button>
      </form>

      {message && <p className="alert alert-info mt-3">{message}</p>}
    </main>
  );
}

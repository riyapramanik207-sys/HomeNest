import { useState } from "react";
import { Link } from "react-router-dom";
export default function OwnerRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Send owner details to your backend.
    console.log("Owner registration submitted:", {
      ...form,
      password: "[hidden]",
    });
    setMessage("Owner registration API is not connected yet.");
  };

  return (
    <main className="container py-4" style={{ maxWidth: 600 }}>
      <h1>Register as a PG Owner</h1>
      <form onSubmit={handleSubmit} className="card card-body gap-3">
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="form-control"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={8}
          className="form-control"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary" type="submit">
          Register as Owner
        </button>
      </form>

      {message && <p className="alert alert-info mt-3">{message}</p>}
      <p className="mt-3">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}

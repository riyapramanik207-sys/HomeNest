
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      setMessage("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container py-5" style={{ maxWidth: 550 }}>
      <h1>Create a HomeNest Account</h1>

      <form onSubmit={handleSubmit} className="card card-body gap-3">
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
          maxLength={100}
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

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={8}
          maxLength={72}
          className="form-control"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="role">Register as</label>
        <select
          id="role"
          name="role"
          className="form-select"
          value={form.role}
          onChange={handleChange}
        >
          <option value="STUDENT">Student / Professional</option>
          <option value="OWNER">PG Owner</option>
        </select>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {message && <p className="alert alert-success mt-3">{message}</p>}
      {error && <p className="alert alert-danger mt-3">{error}</p>}

      <p className="mt-3">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: POST form to the Spring Boot registration endpoint.
    console.log("Registration form submitted:", {
      ...form,
      password: "[hidden]",
    });
    setMessage("Registration API is not connected yet.");
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

        <button type="submit" className="btn btn-primary">
          Create Account
        </button>
      </form>
      {message && <p className="alert alert-info mt-3">{message}</p>}
      <p className="mt-3">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}

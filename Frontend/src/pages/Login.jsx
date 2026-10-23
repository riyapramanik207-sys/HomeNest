import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    // TODO: Authenticate with your Spring Boot API.
    console.log("Login form submitted for:", email);
    setError("Login API is not connected yet.");
  };

  return (
    <main className="container py-5" style={{ maxWidth: 500 }}>
      <h1>Login to HomeNest</h1>
      <form onSubmit={handleSubmit} className="card card-body gap-3">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-danger mb-0">{error}</p>}
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
      <p className="mt-3">
        New to HomeNest? <Link to="/register">Create an account</Link>
      </p>
    </main>
  );
}

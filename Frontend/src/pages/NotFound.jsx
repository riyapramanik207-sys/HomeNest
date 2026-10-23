import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <main className="container text-center py-5">
      <h1 className="display-1 fw-bold">404</h1>
      <h2>Page Not Found</h2>
      <p className="text-muted">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary mt-2">
        Back to Home
      </Link>
    </main>
  );
}

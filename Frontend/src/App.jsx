
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import BookingForm from "./components/BookingForm";
import { getProperties } from "./services/pgService";
import {
  apiPost,
  getCurrentUser,
  logoutUser,
} from "./services/api";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function HomePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [roomType, setRoomType] = useState("All");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [availability, setAvailability] = useState("All");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getProperties()
      .then((data) => {
        if (!cancelled) {
          setProperties(Array.isArray(data) ? data : []);
          setError("");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err.message ||
              "Could not connect to the backend. Check that Spring Boot is running."
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const roomTypes = useMemo(
    () => [...new Set(properties.map((pg) => pg.roomType).filter(Boolean))],
    [properties]
  );

  const filteredProperties = useMemo(() => {
    return properties.filter((pg) => {
      const matchesCity = (pg.city || "")
        .toLowerCase()
        .includes(city.trim().toLowerCase());

      const matchesRoom = roomType === "All" || pg.roomType === roomType;
      const rent = Number(pg.rent) || 0;
      const matchesMin = minRent === "" || rent >= Number(minRent);
      const matchesMax = maxRent === "" || rent <= Number(maxRent);
      const matchesAvailability =
        availability === "All" ||
        (availability === "Available" && pg.available === true) ||
        (availability === "Unavailable" && pg.available === false);

      return (
        matchesCity &&
        matchesRoom &&
        matchesMin &&
        matchesMax &&
        matchesAvailability
      );
    });
  }, [properties, city, roomType, minRent, maxRent, availability]);
  useEffect(() => {
  let cancelled = false;

  getCurrentUser()
    .then((user) => {
      if (!cancelled) setCurrentUser(user);
    })
    .catch(() => {
      if (!cancelled) setCurrentUser(null);
    });

  return () => {
    cancelled = true;
  };
}, []);

  function resetFilters() {
    setCity("");
    setRoomType("All");
    setMinRent("");
    setMaxRent("");
    setAvailability("All");
  }

  async function handleBookingSubmit(formData) {
    setBookingSubmitting(true);
    setBookingMessage("");
    setBookingError("");

    try {
      await apiPost("/bookings", formData);
      setBookingMessage(
        "Your booking request was submitted successfully."
      );
      setSelectedProperty(null);
    } catch (err) {
      setBookingError(
        err.message || "Could not submit your booking request."
      );
    } finally {
      setBookingSubmitting(false);
    }
  }
  async function handleLogout() {
  try {
    await logoutUser();
    setCurrentUser(null);
  } catch (err) {
    setError(err.message || "Logout failed. Please try again.");
  }
}

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3 px-lg-5">
        <a className="navbar-brand fw-bold" href="#home">
          HomeNest
        </a>
        {currentUser ? (
  <>
    <span className="text-secondary">
      Welcome, {currentUser.name || currentUser.email}
    </span>
    <button
      type="button"
      className="btn btn-outline-danger btn-sm"
      onClick={handleLogout}
    >
      Logout
    </button>
  </>
) : (
  <>
    <a href="#properties">Find PGs</a>
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </>
)}
      </nav>

      <main id="home">
        <section className="container py-5">
          <div className="p-4 p-md-5 rounded-4 bg-light">
            <p className="text-uppercase fw-semibold text-primary">
              Find your place to belong
            </p>
            <h1 className="display-5 fw-bold">
              Find Your Perfect PG with HomeNest
            </h1>
            <p className="lead">
              Discover comfortable and affordable accommodation for students
              and working professionals.
            </p>
            <a className="btn btn-primary" href="#properties">
              Explore PGs
            </a>
          </div>
        </section>

        <section id="properties" className="container pb-5">
          <h2 className="mb-3">Find Your Stay</h2>
          <p>Search and filter PG accommodations to match your needs.</p>

          <div className="card card-body mb-4">
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  id="city"
                  className="form-control"
                  placeholder="Search by city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="roomType" className="form-label">
                  Room type
                </label>
                <select
                  id="roomType"
                  className="form-select"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <option value="All">All room types</option>
                  {roomTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="availability" className="form-label">
                  Availability
                </label>
                <select
                  id="availability"
                  className="form-select"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="minRent" className="form-label">
                  Minimum monthly rent (₹)
                </label>
                <input
                  id="minRent"
                  type="number"
                  min="0"
                  className="form-control"
                  value={minRent}
                  onChange={(e) => setMinRent(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="maxRent" className="form-label">
                  Maximum monthly rent (₹)
                </label>
                <input
                  id="maxRent"
                  type="number"
                  min="0"
                  className="form-control"
                  value={maxRent}
                  onChange={(e) => setMaxRent(e.target.value)}
                />
              </div>

              <div className="col-md-4 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={resetFilters}
                >
                  Reset filters
                </button>
              </div>
            </div>
          </div>

          {loading && <p>Loading PG properties...</p>}
          {error && <p className="alert alert-danger">{error}</p>}
          {bookingMessage && (
            <p className="alert alert-success">{bookingMessage}</p>
          )}
          {bookingError && (
            <p className="alert alert-danger">{bookingError}</p>
          )}

          {!loading && !error && filteredProperties.length === 0 && (
            <p>No PG properties match your filters.</p>
          )}

          <div className="row g-4">
            {filteredProperties.map((pg) => (
              <div className="col-md-6 col-lg-4" key={pg.id}>
                <article className="card h-100 shadow-sm">
                  <div className="card-body">
                    <span
                      className={`badge ${
                        pg.available ? "bg-success" : "bg-secondary"
                      } mb-2`}
                    >
                      {pg.available ? "Available" : "Unavailable"}
                    </span>
                    <h3 className="h5">{pg.name}</h3>
                    <p className="text-secondary mb-2">
                      {pg.city}
                      {pg.address ? ` · ${pg.address}` : ""}
                    </p>
                    <p className="mb-2">
                      Room type: {pg.roomType || "Not specified"}
                    </p>
                    <p className="fs-5 fw-bold">
                      ₹{pg.rent} <small className="text-secondary">/ month</small>
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={!pg.available}
                      onClick={() => {
                        setBookingMessage("");
                        setBookingError("");
                        setSelectedProperty(pg);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-top py-4 text-center text-secondary">
        HomeNest — Find a place to call home.
      </footer>

      {selectedProperty && (
        <BookingForm
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onSubmit={handleBookingSubmit}
          isSubmitting={bookingSubmitting}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

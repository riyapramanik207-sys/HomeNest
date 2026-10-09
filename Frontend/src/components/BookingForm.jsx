
import { useState } from "react";
import {
  CalendarDays,
  UserRound,
  Phone,
  Mail,
  Upload,
  CheckCircle,
  House,
  Clock,
  Users,
  FileText
} from "lucide-react";
import "./BookingForm.css";

function BookingForm({ property = null, onBookingSubmit }) {
  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    pgName: property?.name || "",
    roomType: "Single",
    checkInDate: "",
    duration: "6",
    occupants: "1",
    specialRequirements: "",
    agreeToTerms: false
  });

  const [idProof, setIdProof] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: ""
    }));

    setSuccessMessage("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setIdProof(null);
    setErrors((previous) => ({ ...previous, idProof: "" }));
    setSuccessMessage("");

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png"
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((previous) => ({
        ...previous,
        idProof: "Upload a PDF, JPG or PNG file."
      }));
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((previous) => ({
        ...previous,
        idProof: "File size must be 5 MB or less."
      }));
      event.target.value = "";
      return;
    }

    setIdProof(file);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.pgName.trim()) {
      newErrors.pgName = "Please enter the PG name.";
    }

    if (!formData.checkInDate) {
      newErrors.checkInDate = "Please select a check-in date.";
    } else if (formData.checkInDate < localToday) {
      newErrors.checkInDate = "Check-in date cannot be in the past.";
    }

    if (!idProof) {
      newErrors.idProof = "Please upload your ID proof.";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "Please accept the booking declaration.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) return;

    const bookingData = {
      ...formData,
      occupants: Number(formData.occupants),
      durationMonths: Number(formData.duration),
      idProof
    };

    // Connect this callback to your backend integration later.
    if (onBookingSubmit) {
      onBookingSubmit(bookingData);
    } else {
      setSuccessMessage(
        "Form validated successfully! Connect the backend to save your booking."
      );
    }
  };

  return (
    <section className="booking-section">
      <div className="container">
        <div className="booking-card">

          <div className="booking-header">
            <div className="booking-header-icon">
              <House size={28} />
            </div>

            <div>
              <span className="booking-eyebrow">
                HOMENEST RESERVATION
              </span>
              <h2>Book Your PG</h2>
              <p>
                Complete your details to request your preferred room.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            <h5 className="booking-group-title">
              <UserRound size={19} />
              Personal Information
            </h5>

            <div className="row g-3">

              <div className="col-md-6">
                <label htmlFor="fullName" className="form-label">
                  Full Name *
                </label>
                <div className="booking-input-wrap">
                  <UserRound size={18} />
                  <input
                    id="fullName"
                    name="fullName"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.fullName)}
                  />
                </div>
                {errors.fullName && (
                  <small className="booking-error">
                    {errors.fullName}
                  </small>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone Number *
                </label>
                <div className="booking-input-wrap">
                  <Phone size={18} />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    className="form-control"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(event) => {
                      const value = event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

                      setFormData((previous) => ({
                        ...previous,
                        phone: value
                      }));
                      setErrors((previous) => ({
                        ...previous,
                        phone: ""
                      }));
                    }}
                    autoComplete="tel-national"
                    required
                    aria-invalid={Boolean(errors.phone)}
                  />
                </div>
                {errors.phone && (
                  <small className="booking-error">
                    {errors.phone}
                  </small>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <div className="booking-input-wrap">
                  <Mail size={18} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                  />
                </div>
                {errors.email && (
                  <small className="booking-error">
                    {errors.email}
                  </small>
                )}
              </div>

            </div>

            <hr className="booking-divider" />

            <h5 className="booking-group-title">
              <House size={19} />
              Booking Details
            </h5>

            <div className="row g-3">

              <div className="col-12">
                <label htmlFor="pgName" className="form-label">
                  PG / Property Name *
                </label>
                <div className="booking-input-wrap">
                  <House size={18} />
                  <input
                    id="pgName"
                    name="pgName"
                    className="form-control"
                    placeholder="e.g. Student Nest PG"
                    value={formData.pgName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.pgName && (
                  <small className="booking-error">
                    {errors.pgName}
                  </small>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="roomType" className="form-label">
                  Room Type *
                </label>
                <select
                  id="roomType"
                  name="roomType"
                  className="form-select"
                  value={formData.roomType}
                  onChange={handleChange}
                >
                  <option value="Single">Single Room</option>
                  <option value="Double">Double Sharing</option>
                  <option value="Triple">Triple Sharing</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="checkInDate" className="form-label">
                  Check-in / Move-in Date *
                </label>
                <div className="booking-input-wrap">
                  <CalendarDays size={18} />
                  <input
                    id="checkInDate"
                    name="checkInDate"
                    type="date"
                    className="form-control"
                    min={localToday}
                    value={formData.checkInDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.checkInDate && (
                  <small className="booking-error">
                    {errors.checkInDate}
                  </small>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="duration" className="form-label">
                  Duration of Stay *
                </label>
                <div className="booking-input-wrap">
                  <Clock size={18} />
                  <select
                    id="duration"
                    name="duration"
                    className="form-select"
                    value={formData.duration}
                    onChange={handleChange}
                  >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="occupants" className="form-label">
                  Number of Occupants *
                </label>
                <div className="booking-input-wrap">
                  <Users size={18} />
                  <select
                    id="occupants"
                    name="occupants"
                    className="form-select"
                    value={formData.occupants}
                    onChange={handleChange}
                  >
                    <option value="1">1 Occupant</option>
                    <option value="2">2 Occupants</option>
                    <option value="3">3 Occupants</option>
                  </select>
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="idProof" className="form-label">
                  ID Proof Upload *
                </label>
                <div className="booking-upload">
                  <Upload size={24} />
                  <p>
                    {idProof
                      ? idProof.name
                      : "Upload your ID proof"}
                  </p>
                  <small>PDF, JPG or PNG · Maximum 5 MB</small>
                  <input
                    id="idProof"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    aria-describedby="idProofHelp"
                  />
                  <label
                    htmlFor="idProof"
                    className="booking-upload-button"
                  >
                    Choose File
                  </label>
                </div>
                <small id="idProofHelp" className="text-secondary">
                  Submit only the identification document required by
                  the property. Uploads are not stored by this demo.
                </small>
                {errors.idProof && (
                  <small className="booking-error d-block">
                    {errors.idProof}
                  </small>
                )}
              </div>

              <div className="col-12">
                <label
                  htmlFor="specialRequirements"
                  className="form-label"
                >
                  Special Requirements (Optional)
                </label>
                <textarea
                  id="specialRequirements"
                  name="specialRequirements"
                  className="form-control booking-textarea"
                  rows="4"
                  maxLength={1000}
                  placeholder="Any room preferences or additional requirements?"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="booking-terms">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeToTerms">
                I confirm that the details provided are accurate and
                agree to the property's booking rules.
              </label>
            </div>

            {errors.agreeToTerms && (
              <small className="booking-error d-block">
                {errors.agreeToTerms}
              </small>
            )}

            {successMessage && (
              <div className="booking-success" role="status">
                <CheckCircle size={20} />
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              className="booking-submit-button"
            >
              <CheckCircle size={19} />
              Submit Booking Request
            </button>

            <p className="booking-note">
              Your booking is not confirmed until the property or
              booking system confirms availability.
            </p>

          </form>
        </div>
      </div>
    </section>
  );
}

export default BookingForm;
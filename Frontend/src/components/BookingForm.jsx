
import { useState } from 'react'

function BookingForm({
  property,
  onClose,
  onSubmit,
  isSubmitting = false,
}) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    moveInDate: '',
    duration: '6 Months',
    occupants: '1',
    foodPreference: 'Vegetarian',
    idProofType: 'Aadhaar Card',
  })

  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (form.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid phone number.')
      return
    }

    setError('')

    onSubmit({
      ...form,
      propertyId: property.id,
      propertyName: property.name,
    })
  }

  if (!property) return null

  const today = new Date().toLocaleDateString('en-CA')

  return (
    <div className="booking-overlay" onClick={onClose}>
      <section
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="booking-close"
          type="button"
          onClick={onClose}
          aria-label="Close booking form"
        >
          ×
        </button>

        <h2 id="booking-title">Book Your Stay</h2>
        <p className="booking-property">
          {property.name} · {property.city}
        </p>
        <p>
          Monthly rent: <strong>₹{property.rent}</strong>
        </p>

        <form onSubmit={handleSubmit} className="booking-form">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            maxLength={100}
            autoComplete="name"
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            maxLength={20}
            autoComplete="tel"
          />

          <label htmlFor="moveInDate">Move-in Date</label>
          <input
            id="moveInDate"
            name="moveInDate"
            type="date"
            min={today}
            value={form.moveInDate}
            onChange={handleChange}
            required
          />

          <label htmlFor="duration">Booking Duration</label>
          <select
            id="duration"
            name="duration"
            value={form.duration}
            onChange={handleChange}
          >
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>12 Months</option>
          </select>

          <label htmlFor="occupants">Number of Occupants</label>
          <select
            id="occupants"
            name="occupants"
            value={form.occupants}
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <label htmlFor="foodPreference">Food Preference</label>
          <select
            id="foodPreference"
            name="foodPreference"
            value={form.foodPreference}
            onChange={handleChange}
          >
            <option>Vegetarian</option>
            <option>Non-Vegetarian</option>
            <option>No Preference</option>
          </select>

          <label htmlFor="idProofType">ID Proof Type</label>
          <select
            id="idProofType"
            name="idProofType"
            value={form.idProofType}
            onChange={handleChange}
          >
            <option>Aadhaar Card</option>
            <option>Passport</option>
            <option>Driving Licence</option>
            <option>Voter ID</option>
          </select>

          {error && <p className="error-message">{error}</p>}

          <p className="booking-note">
            This is a booking request form. Do not upload or enter your ID
            number here. Your details will not be saved to the database yet.
          </p>

          <button
  className="book-submit"
  type="submit"
  disabled={isSubmitting}
>
  {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
</button>

          <button
            className="booking-cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </section>
    </div>
  )
}

export default BookingForm

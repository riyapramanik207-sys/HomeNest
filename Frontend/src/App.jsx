
import { useEffect, useMemo, useState } from 'react'
import './App.css'
import BookingForm from './components/BookingForm'

function App() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [city, setCity] = useState('')
  const [roomType, setRoomType] = useState('All')
  const [minRent, setMinRent] = useState('')
  const [maxRent, setMaxRent] = useState('')
  const [availability, setAvailability] = useState('All')
  const [selectedProperty, setSelectedProperty] = useState(null)
const [bookingMessage, setBookingMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:8080/api/properties')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load PG listings')
        }
        return response.json()
      })
      .then((data) => {
        setProperties(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setError(
          'Could not connect to the backend. Check that Spring Boot is running.'
        )
        setLoading(false)
      })
  }, [])

  const roomTypes = useMemo(
    () => [...new Set(properties.map((pg) => pg.roomType).filter(Boolean))],
    [properties]
  )

  const filteredProperties = useMemo(() => {
    return properties.filter((pg) => {
      const matchesCity = (pg.city || '')
        .toLowerCase()
        .includes(city.trim().toLowerCase())

      const matchesRoom =
        roomType === 'All' || pg.roomType === roomType

      const rent = Number(pg.rent) || 0
      const matchesMin = minRent === '' || rent >= Number(minRent)
      const matchesMax = maxRent === '' || rent <= Number(maxRent)

      const matchesAvailability =
        availability === 'All' ||
        (availability === 'Available' && pg.available === true) ||
        (availability === 'Unavailable' && pg.available === false)

      return (
        matchesCity &&
        matchesRoom &&
        matchesMin &&
        matchesMax &&
        matchesAvailability
      )
    })
  }, [properties, city, roomType, minRent, maxRent, availability])

  function resetFilters() {
    setCity('')
    setRoomType('All')
    setMinRent('')
    setMaxRent('')
    setAvailability('All')
  }

  return (
    <div className="homenest">
      <header className="navbar">
        <h2>HomeNest</h2>
        <nav>
          <a href="#home">Home</a>
          <a href="#properties">PG Listings</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <p className="tagline">FIND YOUR PLACE TO BELONG</p>
          <h1>Find Your Perfect PG with HomeNest</h1>
          <p>
            Discover comfortable and affordable accommodation
            for students and working professionals.
          </p>
          <a className="explore-btn" href="#properties">
            Explore PGs
          </a>
        </section>

        <section className="properties" id="properties">
          <h2>Find Your Stay</h2>
          <p>Search and filter PG accommodations to match your needs.</p>

          <div className="filter-panel">
            <div className="filter-field">
              <label htmlFor="city">Search by city</label>
              <input
                id="city"
                type="text"
                placeholder="e.g. Kolkata"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="filter-field">
              <label htmlFor="roomType">Room type</label>
              <select
                id="roomType"
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

            <div className="filter-field">
              <label htmlFor="minRent">Minimum rent (₹/month)</label>
              <input
                id="minRent"
                type="number"
                min="0"
                placeholder="0"
                value={minRent}
                onChange={(e) => setMinRent(e.target.value)}
              />
            </div>

            <div className="filter-field">
              <label htmlFor="maxRent">Maximum rent (₹/month)</label>
              <input
                id="maxRent"
                type="number"
                min="0"
                placeholder="Any budget"
                value={maxRent}
                onChange={(e) => setMaxRent(e.target.value)}
              />
            </div>

            <div className="filter-field">
              <label htmlFor="availability">Availability</label>
              <select
                id="availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                <option value="All">All PGs</option>
                <option value="Available">Available only</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            <button
              className="reset-button"
              type="button"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>

          <p className="results-count">
            {loading
              ? 'Loading PG listings...'
              : `Showing ${filteredProperties.length} of ${properties.length} PGs`}
          </p>

          {error && <p className="error-message">{error}</p>}

          {!loading && !error && filteredProperties.length === 0 && (
            <div className="no-results">
              <h3>No matching PGs found</h3>
              <p>Try another city or adjust your filters.</p>
              <button type="button" onClick={resetFilters}>
                Clear Filters
              </button>
            </div>
          )}

          <div className="property-grid">
            {filteredProperties.map((pg) => (
              <article className="property-card" key={pg.id}>
                {pg.imageUrl && (
                  <img
                    className="property-image"
                    src={pg.imageUrl}
                    alt={pg.name || 'PG accommodation'}
                    
                  />
                  
                )}

                <div className="property-details">
                  <h3>{pg.name}</h3>
                  <p><strong>City:</strong> {pg.city || 'Not specified'}</p>
                  <p><strong>Address:</strong> {pg.address || 'Not specified'}</p>
                  <p><strong>Room:</strong> {pg.roomType || 'Not specified'}</p>
                  <p className="rent">
                    ₹{pg.rent ?? 'Not specified'}
                    <span> / month</span>
                  </p>
                  <p>{pg.description}</p>
                  <p className={pg.available ? 'available' : 'unavailable'}>
                    {pg.available ? 'Available' : 'Not available'}
                  </p>
                  <button
  type="button"
  className="book-now-button"
  disabled={!pg.available}
  onClick={() => {
    setBookingMessage('')
    setSelectedProperty(pg)
  }}
>
  Book Now
</button>
                  
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about" id="about">
          <h2>About HomeNest</h2>
          <p>
            A PG rental and booking platform designed to make finding
            accommodation easier, safer, and more convenient.
          </p>
        </section>
      </main>
{bookingMessage && (
  <p className="booking-success" role="status">
    {bookingMessage}
  </p>
)}

{selectedProperty && (
  <BookingForm
    property={selectedProperty}
    onClose={() => setSelectedProperty(null)}
    onSubmit={(booking) => {
      console.log('Booking request preview:', booking)
      setSelectedProperty(null)
      setBookingMessage(
        'Booking form submitted successfully for ' +
        booking.propertyName +
        '. This is a demo; the booking has not been saved.'
      )
    }}
  />
)}
      <footer>
        © 2026 HomeNest — Find a place to call home.
      </footer>
    </div>
  )
}

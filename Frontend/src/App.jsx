import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import BookingForm from './components/BookingForm'
import { getProperties } from './services/pgService';
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
const [bookingError, setBookingError] = useState('')
const [bookingSubmitting, setBookingSubmitting] = useState(false)
const [historyEmail, setHistoryEmail] = useState('')
const [bookingHistory, setBookingHistory] = useState([])
const [historyLoading, setHistoryLoading] = useState(false)
const [historyError, setHistoryError] = useState('')
const [historySearched, setHistorySearched] = useState(false)

 
useEffect(() => {
  let cancelled = false;

  getProperties()
    .then((data) => {
      if (!cancelled) {
        setProperties(Array.isArray(data) ? data : []);
        setLoading(false);
      }
    })
    .catch((error) => {
      console.error('Failed to load properties:', error);

      if (!cancelled) {
        setError(
          'Could not connect to the backend. Check that Spring Boot is running.'
        );
        setLoading(false);
      }
    });

  return () => {
    cancelled = true;
  };
}, []);


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
  
async function loadBookingHistory(event) {
  event.preventDefault()
  setHistoryLoading(true)
  setHistoryError('')
  setBookingHistory([])
  setHistorySearched(false)

  try {
    const response = await fetch(
      `http://localhost:8080/api/bookings?email=${encodeURIComponent(historyEmail.trim())}`
    )

    const data = await response.json().catch(() => [])

    if (!response.ok) {
      throw new Error(data.error || 'Unable to load booking history.')
    }

    setBookingHistory(Array.isArray(data) ? data : [])
    setHistorySearched(true)
  } catch (error) {
    setHistoryError(error.message || 'Could not connect to the backend.')
  } finally {
    setHistoryLoading(false)
  }
}


  function resetFilters() {
    setCity('')
    setRoomType('All')
    setMinRent('')
    setMaxRent('')
    setAvailability('All')
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App


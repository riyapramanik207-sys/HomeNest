import { useState } from "react";
import {
  Search,
  Sparkles,
  MapPin,
  SlidersHorizontal
} from "lucide-react";

function SearchPanel() {
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [roomType, setRoomType] = useState("");
  const [gender, setGender] = useState("");
  const [food, setFood] = useState("");
  const [wifi, setWifi] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [distance, setDistance] = useState("");
  const [message, setMessage] = useState("");

  // Normal Search
  const handleSearch = (e) => {
    e.preventDefault();

    setMessage(
      `Searching PGs ${
        location ? `in ${location}` : "near you"
      }${budget ? ` under ₹${budget}` : ""}...`
    );

    console.log({
      location,
      budget,
      propertyType,
      roomType,
      gender,
      food,
      wifi,
      bathroom,
      distance
    });
  };

  // AI Search
  const handleAISearch = () => {
    setMessage(
      "✨ AI Search activated! Finding PGs that best match your preferences..."
    );

    console.log({
      location,
      budget,
      propertyType,
      roomType,
      gender,
      food,
      wifi,
      bathroom,
      distance
    });
  };

  // Reset Filters
  const handleReset = () => {
    setLocation("");
    setBudget("");
    setPropertyType("");
    setRoomType("");
    setGender("");
    setFood("");
    setWifi("");
    setBathroom("");
    setDistance("");
    setMessage("");
  };

  return (
    <section className="search-section" id="search">

      <div className="container">

        <div className="search-box">

          {/* HEADER */}

          <div className="search-header">

            <div className="search-title">

              <div className="search-icon">
                <Search size={22} />
              </div>

              <div>
                <span className="search-subtitle">
                  SMART PG DISCOVERY
                </span>

                <h2>Find Your Perfect PG</h2>

                <p>
                  Search verified PGs according to your
                  location, budget and preferences.
                </p>
              </div>

            </div>

            <div className="filter-icon">
              <SlidersHorizontal size={25} />
            </div>

          </div>


          {/* SEARCH FORM */}

          <form onSubmit={handleSearch}>

            <div className="row g-3">


              {/* LOCATION */}

              <div className="col-md-6 col-lg-3">

                <label>Location / City</label>

                <div className="input-icon-wrapper">

                  <MapPin size={18} />

                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Kolkata"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                  />

                </div>

              </div>


              {/* BUDGET */}

              <div className="col-md-6 col-lg-3">

                <label>Maximum Budget</label>

                <select
                  className="form-select"
                  value={budget}
                  onChange={(e) =>
                    setBudget(e.target.value)
                  }
                >

                  <option value="">
                    Select Budget
                  </option>

                  <option value="5000">
                    ₹5,000 / month
                  </option>

                  <option value="7000">
                    ₹7,000 / month
                  </option>

                  <option value="10000">
                    ₹10,000 / month
                  </option>

                  <option value="15000">
                    ₹15,000 / month
                  </option>

                  <option value="20000">
                    ₹20,000+ / month
                  </option>

                </select>

              </div>


              {/* PROPERTY TYPE */}

              <div className="col-md-6 col-lg-3">

                <label>Property Type</label>

                <select
                  className="form-select"
                  value={propertyType}
                  onChange={(e) =>
                    setPropertyType(e.target.value)
                  }
                >

                  <option value="">
                    Select Property
                  </option>

                  <option value="PG">
                    PG
                  </option>

                  <option value="Hostel">
                    Hostel
                  </option>

                  <option value="Flat">
                    Flat
                  </option>

                </select>

              </div>


              {/* ROOM TYPE */}

              <div className="col-md-6 col-lg-3">

                <label>Room Type</label>

                <select
                  className="form-select"
                  value={roomType}
                  onChange={(e) =>
                    setRoomType(e.target.value)
                  }
                >

                  <option value="">
                    Select Room
                  </option>

                  <option value="Single">
                    Single Room
                  </option>

                  <option value="Double">
                    Double Room
                  </option>

                  <option value="Triple">
                    Triple Room
                  </option>

                </select>

              </div>


              {/* GENDER */}

              <div className="col-md-6 col-lg-3">

                <label>Gender</label>

                <select
                  className="form-select"
                  value={gender}
                  onChange={(e) =>
                    setGender(e.target.value)
                  }
                >

                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              {/* FOOD */}

              <div className="col-md-6 col-lg-3">

                <label>Food</label>

                <select
                  className="form-select"
                  value={food}
                  onChange={(e) =>
                    setFood(e.target.value)
                  }
                >

                  <option value="">
                    Select Food
                  </option>

                  <option value="Required">
                    Required
                  </option>

                  <option value="Not Required">
                    Not Required
                  </option>

                </select>

              </div>


              {/* WIFI */}

              <div className="col-md-6 col-lg-3">

                <label>Wi-Fi</label>

                <select
                  className="form-select"
                  value={wifi}
                  onChange={(e) =>
                    setWifi(e.target.value)
                  }
                >

                  <option value="">
                    Select Wi-Fi
                  </option>

                  <option value="Required">
                    Required
                  </option>

                  <option value="Not Required">
                    Not Required
                  </option>

                </select>

              </div>


              {/* BATHROOM */}

              <div className="col-md-6 col-lg-3">

                <label>Attached Bathroom</label>

                <select
                  className="form-select"
                  value={bathroom}
                  onChange={(e) =>
                    setBathroom(e.target.value)
                  }
                >

                  <option value="">
                    Select
                  </option>

                  <option value="Yes">
                    Yes
                  </option>

                  <option value="No">
                    No
                  </option>

                </select>

              </div>


              {/* DISTANCE */}

              <div className="col-md-6 col-lg-3">

                <label>Distance</label>

                <select
                  className="form-select"
                  value={distance}
                  onChange={(e) =>
                    setDistance(e.target.value)
                  }
                >

                  <option value="">
                    Any Distance
                  </option>

                  <option value="1">
                    Within 1 km
                  </option>

                  <option value="3">
                    Within 3 km
                  </option>

                  <option value="5">
                    Within 5 km
                  </option>

                  <option value="10">
                    Within 10 km
                  </option>

                </select>

              </div>

            </div>


            {/* BUTTONS */}

            <div className="search-buttons">

              <button
                type="submit"
                className="search-main-button"
              >

                <Search size={19} />

                Search PG

              </button>


              <button
                type="button"
                className="ai-search-button"
                onClick={handleAISearch}
              >

                <Sparkles size={19} />

                AI Search

              </button>


              <button
                type="button"
                className="reset-button"
                onClick={handleReset}
              >

                Reset Filters

              </button>

            </div>

          </form>


          {/* SEARCH MESSAGE */}

          {message && (

            <div className="search-result-message">

              <Sparkles size={18} />

              <span>{message}</span>

            </div>

          )}

        </div>

      </div>

    </section>
  );
}

export default SearchPanel;
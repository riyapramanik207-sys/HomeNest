
import { useState } from "react";
import {
  MapPin,
  IndianRupee,
  Home,
  Users,
  BedDouble,
  Utensils,
  Wifi,
  Bath,
  Car,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import "./FilterPanel.css";

const initialFilters = {
  location: "",
  maxBudget: "",
  propertyType: "",
  gender: "",
  roomType: "",
  food: "",
  wifi: "",
  attachedBathroom: "",
  distance: "",
  facilities: [],
};

function FilterPanel({ onFilterChange = () => {} }) {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = (name, value) => {
    setFilters((previous) => {
      const updated = { ...previous, [name]: value };
      return updated;
    });
  };

  const handleFacilityChange = (facility) => {
    setFilters((previous) => {
      const facilities = previous.facilities.includes(facility)
        ? previous.facilities.filter((item) => item !== facility)
        : [...previous.facilities, facility];

      return { ...previous, facilities };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({ ...initialFilters, facilities: [] });
    onFilterChange({ ...initialFilters, facilities: [] });
  };

  return (
    <section className="filter-panel">
      <div className="filter-heading">
        <div className="filter-heading-icon">
          <SlidersHorizontal size={23} />
        </div>

        <div>
          <h2>Find Your Perfect Stay</h2>
          <p>Customize your search with HomeNest</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="filter-grid">
          {/* Location */}
          <div className="filter-field">
            <label htmlFor="location">
              <MapPin size={17} /> Location / City
            </label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Kolkata, New Town"
              value={filters.location}
              onChange={(e) =>
                updateFilter("location", e.target.value)
              }
            />
          </div>

          {/* Budget */}
          <div className="filter-field">
            <label htmlFor="maxBudget">
              <IndianRupee size={17} /> Maximum Monthly Budget
            </label>
            <input
              id="maxBudget"
              type="number"
              min="0"
              placeholder="e.g. 8000"
              value={filters.maxBudget}
              onChange={(e) =>
                updateFilter("maxBudget", e.target.value)
              }
            />
          </div>

          {/* Property Type */}
          <div className="filter-field">
            <label htmlFor="propertyType">
              <Home size={17} /> Property Type
            </label>
            <select
              id="propertyType"
              value={filters.propertyType}
              onChange={(e) =>
                updateFilter("propertyType", e.target.value)
              }
            >
              <option value="">All Properties</option>
              <option value="PG">PG</option>
              <option value="Hostel">Hostel</option>
              <option value="Flat">Flat</option>
            </select>
          </div>

          {/* Gender */}
          <div className="filter-field">
            <label htmlFor="gender">
              <Users size={17} /> Preferred Accommodation
            </label>
            <select
              id="gender"
              value={filters.gender}
              onChange={(e) =>
                updateFilter("gender", e.target.value)
              }
            >
              <option value="">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Any">Any Gender</option>
            </select>
          </div>

          {/* Room Type */}
          <div className="filter-field">
            <label htmlFor="roomType">
              <BedDouble size={17} /> Room Type
            </label>
            <select
              id="roomType"
              value={filters.roomType}
              onChange={(e) =>
                updateFilter("roomType", e.target.value)
              }
            >
              <option value="">All Room Types</option>
              <option value="Single">Single Sharing</option>
              <option value="Double">Double Sharing</option>
              <option value="Triple">Triple Sharing</option>
            </select>
          </div>

          {/* Food */}
          <div className="filter-field">
            <label htmlFor="food">
              <Utensils size={17} /> Food Availability
            </label>
            <select
              id="food"
              value={filters.food}
              onChange={(e) =>
                updateFilter("food", e.target.value)
              }
            >
              <option value="">Any</option>
              <option value="Required">Food Required</option>
              <option value="Not Required">Food Not Required</option>
            </select>
          </div>

          {/* Wi-Fi */}
          <div className="filter-field">
            <label htmlFor="wifi">
              <Wifi size={17} /> Wi-Fi
            </label>
            <select
              id="wifi"
              value={filters.wifi}
              onChange={(e) =>
                updateFilter("wifi", e.target.value)
              }
            >
              <option value="">Any</option>
              <option value="Required">Wi-Fi Required</option>
              <option value="Not Required">Not Required</option>
            </select>
          </div>

          {/* Attached Bathroom */}
          <div className="filter-field">
            <label htmlFor="attachedBathroom">
              <Bath size={17} /> Attached Bathroom
            </label>
            <select
              id="attachedBathroom"
              value={filters.attachedBathroom}
              onChange={(e) =>
                updateFilter("attachedBathroom", e.target.value)
              }
            >
              <option value="">Any</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Distance */}
          <div className="filter-field">
            <label htmlFor="distance">
              <Car size={17} /> Distance from Main Area
            </label>
            <select
              id="distance"
              value={filters.distance}
              onChange={(e) =>
                updateFilter("distance", e.target.value)
              }
            >
              <option value="">Any Distance</option>
              <option value="1">Within 1 km</option>
              <option value="3">Within 3 km</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
            </select>
          </div>
        </div>

        {/* Additional Facilities */}
        <div className="filter-facilities">
          <h3>Additional Facilities</h3>

          <div className="facility-options">
            {["Parking", "Laundry", "Air Conditioning", "CCTV", "Power Backup"].map(
              (facility) => (
                <label className="facility-option" key={facility}>
                  <input
                    type="checkbox"
                    checked={filters.facilities.includes(facility)}
                    onChange={() => handleFacilityChange(facility)}
                  />
                  <span>{facility}</span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="filter-actions">
          <button type="button" className="reset-filter-btn" onClick={handleReset}>
            <RotateCcw size={17} />
            Reset Filters
          </button>

          <button type="submit" className="apply-filter-btn">
            <Search size={18} />
            Search Properties
          </button>
        </div>
      </form>
    </section>
  );
}

export default FilterPanel;
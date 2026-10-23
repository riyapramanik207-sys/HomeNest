import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import FilterPanel from "../components/FilterPanel";
const properties = [
  {
    id: 1,
    name: "Comfort Living PG",
    city: "Kolkata",
    address: "Salt Lake, Sector V",
    monthlyRent: 6500,
    rating: 4.5,
    imageUrl: "/pg1.jpg",
    amenities: ["Wi-Fi", "Meals", "Laundry"],
  },
  {
    id: 2,
    name: "Green Nest PG",
    city: "Kolkata",
    address: "New Town",
    monthlyRent: 7500,
    rating: 4.3,
    imageUrl: "/pg2.jpg",
    amenities: ["AC", "Wi-Fi", "Security"],
  },
  {
    id: 3,
    name: "Student Stay",
    city: "Kolkata",
    address: "Garia",
    monthlyRent: 5000,
    rating: 4.2,
    imageUrl: "/pg3.jpg",
    amenities: ["Wi-Fi", "Meals"],
  },
];

export default function Listings() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city") || "";
  const maxRent = Number(searchParams.get("maxRent")) || Infinity;

  const filteredProperties = useMemo(
    () =>
      properties.filter(
        (property) =>
          property.city.toLowerCase().includes(city.toLowerCase()) &&
          property.monthlyRent <= maxRent
      ),
    [city, maxRent]
  );

  return (
    <main className="container py-4">
      <h1>Find Your PG</h1>
      <p>Browse available paying guest accommodations.</p>

      <FilterPanel
        onFilter={(filters) => console.log("Apply filters:", filters)}
      />

      <div className="row g-4 mt-2">
        {filteredProperties.length ? (
          filteredProperties.map((property) => (
            <div className="col-md-4" key={property.id}>
              <PropertyCard property={property} />
            </div>
          ))
        ) : (
          <p>No PGs match your search. Try a different city or budget.</p>
        )}
      </div>
    </main>
  );
}

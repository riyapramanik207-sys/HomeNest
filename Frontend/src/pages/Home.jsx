import { Link } from "react-router-dom";
import SearchPanel from "../components/SearchPanel";
import PropertyCard from "../components/PropertyCard";
const featuredProperties = [
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

export default function Home() {
  return (
    <main className="container py-4">
      <section className="p-4 p-md-5 mb-4 bg-light rounded-4">
        <h1>Find Your Perfect PG with HomeNest</h1>
        <p>
          Discover, compare, and book comfortable PG accommodation
          for students and working professionals.
        </p>
        <SearchPanel />
        <Link to="/listings" className="btn btn-primary mt-3">
          Explore All PGs
        </Link>
      </section>

      <section className="my-5">
        <h2>Featured PGs</h2>
        <div className="row g-4 mt-2">
          {featuredProperties.map((property) => (
            <div className="col-md-4" key={property.id}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-4">
        <h2>Why Choose HomeNest?</h2>
        <p>
          Smart property discovery, easy comparisons, online booking,
          and AI-assisted recommendations.
        </p>
      </section>
    </main>
  );
}

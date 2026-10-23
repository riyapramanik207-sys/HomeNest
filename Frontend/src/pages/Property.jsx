import { Link, useParams } from "react-router-dom";
const sampleProperties = [
  {
    id: 1,
    name: "Comfort Living PG",
    city: "Kolkata",
    address: "Salt Lake, Sector V",
    monthlyRent: 6500,
    rating: 4.5,
    imageUrl: "/pg1.jpg",
    amenities: ["Wi-Fi", "Meals", "Laundry", "24/7 Security"],
    description: "A comfortable PG for students and working professionals.",
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
    description: "A convenient stay with essential modern facilities.",
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
    description: "An affordable accommodation option for students.",
  },
];

export default function Property() {
  const { id } = useParams();
  const property = sampleProperties.find((item) => item.id === Number(id));

  if (!property) {
    return (
      <main className="container py-5">
        <h2>Property not found</h2>
        <Link to="/listings">Back to listings</Link>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <img
        src={property.imageUrl}
        alt={property.name}
        className="img-fluid rounded mb-4"
        style={{ maxHeight: 400, width: "100%", objectFit: "cover" }}
      />
      <h1>{property.name}</h1>
      <p>{property.address}, {property.city}</p>
      <h3>₹{property.monthlyRent.toLocaleString("en-IN")} / month</h3>
      <p>Rating: ⭐ {property.rating}</p>
      <p>{property.description}</p>

      <h4>Amenities</h4>
      <ul>
        {property.amenities.map((amenity) => (
          <li key={amenity}>{amenity}</li>
        ))}
      </ul>

      <Link to={`/booking?propertyId=${property.id}`} className="btn btn-primary">
        Book This PG
      </Link>
    </main>
  );
}

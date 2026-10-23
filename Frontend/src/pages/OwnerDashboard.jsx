import { Link } from "react-router-dom";
export default function OwnerDashboard() {
  // Replace these demo counts with data from the owner dashboard API.
  const stats = [
    { label: "My Properties", value: 0 },
    { label: "Total Bookings", value: 0 },
    { label: "Pending Requests", value: 0 },
  ];

  return (
    <main className="container py-4">
      <h1>Owner Dashboard</h1>
      <p>Manage your properties and booking requests.</p>

      <div className="row g-3 my-3">
        {stats.map((stat) => (
          <div className="col-md-4" key={stat.label}>
            <div className="card card-body h-100">
              <h5>{stat.label}</h5>
              <h2>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex gap-2 flex-wrap">
        <Link to="/owner/add-property" className="btn btn-primary">
          Add Property
        </Link>
        <Link to="/owner/manage-properties" className="btn btn-outline-primary">
          Manage Properties
        </Link>
      </div>
    </main>
  );
}

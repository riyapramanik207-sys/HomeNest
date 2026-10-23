export default function AdminDashboard() {
  // TODO: Fetch real statistics from secured admin API endpoints.
  const stats = [
    { label: "Registered Users", value: 0 },
    { label: "Listed Properties", value: 0 },
    { label: "Total Bookings", value: 0 },
    { label: "Pending Approvals", value: 0 },
  ];

  return (
    <main className="container py-4">
      <h1>Admin Dashboard</h1>
      <p>Monitor HomeNest platform activity.</p>

      <div className="row g-3 mt-2">
        {stats.map((stat) => (
          <div className="col-sm-6 col-lg-3" key={stat.label}>
            <div className="card card-body h-100">
              <h6>{stat.label}</h6>
              <h2>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-4">
        <h4>Administration</h4>
        <p>
          User management, property approval, booking monitoring, and reports
          can be added here.
        </p>
      </section>
    </main>
  );
}

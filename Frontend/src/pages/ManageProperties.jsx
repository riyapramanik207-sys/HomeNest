import { Link } from "react-router-dom";
export default function ManageProperties() {
  // TODO: Fetch properties belonging to the logged-in owner.
  const properties = [];

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h1>Manage Properties</h1>
        <Link to="/owner/add-property" className="btn btn-primary">
          + Add Property
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="alert alert-info mt-4">
          You haven't listed any properties yet. Add your first PG property.
        </div>
      ) : (
        <div className="table-responsive mt-4">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Monthly Rent</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.name}</td>
                  <td>{property.city}</td>
                  <td>₹{property.monthlyRent}</td>
                  <td>{property.status}</td>
                  <td>
                    <Link
                      to={`/property/${property.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

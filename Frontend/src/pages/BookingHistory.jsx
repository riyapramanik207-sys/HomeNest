import { Link } from "react-router-dom";
export default function BookingHistory() {
  // Replace this sample array with bookingService.js API data.
  const bookings = [];

  return (
    <main className="container py-4">
      <h1>Booking History</h1>

      {bookings.length === 0 ? (
        <div className="alert alert-info mt-3">
          You have no bookings yet. <Link to="/listings">Explore PGs</Link>
        </div>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Property</th>
                <th>Start Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.propertyName}</td>
                  <td>{booking.startDate}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

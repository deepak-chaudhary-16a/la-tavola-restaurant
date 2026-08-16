import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const statusColor = {
  pending: "text-gold",
  confirmed: "text-green-400",
  cancelled: "text-accent2",
};

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/reservations/mine")
      .then((res) => setReservations(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-20">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-3">Your Bookings</p>
        <h1 className="font-display text-5xl text-cream">My Reservations</h1>
      </div>

      {loading && <p className="text-center text-muted">Loading...</p>}

      {!loading && reservations.length === 0 && (
        <div className="text-center">
          <p className="text-muted mb-6">You haven't made any reservations yet.</p>
          <Link to="/reserve" className="bg-accent hover:bg-accent2 transition-colors px-6 py-3 rounded font-semibold">
            Reserve a Table
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {reservations.map((r) => (
          <div key={r._id} className="bg-panel border border-white/5 rounded-lg p-6 flex flex-wrap justify-between gap-4">
            <div>
              <p className="text-cream font-semibold">{r.date} at {r.time}</p>
              <p className="text-muted text-sm mt-1">{r.guests} guests</p>
              {r.specialRequests && <p className="text-muted text-sm mt-1">"{r.specialRequests}"</p>}
            </div>
            <span className={`font-semibold capitalize ${statusColor[r.status]}`}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

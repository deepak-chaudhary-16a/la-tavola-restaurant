import { useEffect, useState } from "react";
import api from "../../api/axios";

const statusOptions = ["pending", "confirmed", "cancelled"];
const statusColor = {
  pending: "text-gold border-gold/40",
  confirmed: "text-green-400 border-green-400/40",
  cancelled: "text-accent2 border-accent2/40",
};

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const load = () => {
    setLoading(true);
    api
      .get("/reservations", { params: filter ? { status: filter } : {} })
      .then((res) => setReservations(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  const updateStatus = async (id, status) => {
    await api.put(`/reservations/${id}/status`, { status });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this reservation?")) return;
    await api.delete(`/reservations/${id}`);
    load();
  };

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {["", ...statusOptions].map((s) => (
          <button
            key={s || "all"}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border capitalize transition-colors ${
              filter === s ? "bg-accent border-accent text-cream" : "border-white/15 text-muted hover:text-cream"
            }`}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      {loading && <p className="text-muted">Loading...</p>}
      {!loading && reservations.length === 0 && <p className="text-muted">No reservations found.</p>}

      <div className="space-y-3">
        {reservations.map((r) => (
          <div key={r._id} className="bg-panel border border-white/5 rounded-lg p-5 flex flex-wrap justify-between gap-4 items-center">
            <div>
              <p className="text-cream font-semibold">{r.name} · {r.guests} guests</p>
              <p className="text-muted text-sm mt-0.5">{r.date} at {r.time}</p>
              <p className="text-muted text-xs mt-0.5">{r.email} · {r.phone}</p>
              {r.specialRequests && <p className="text-muted text-xs mt-1 italic">"{r.specialRequests}"</p>}
            </div>
            <div className="flex items-center gap-3">
              <select
                value={r.status}
                onChange={(e) => updateStatus(r._id, e.target.value)}
                className={`bg-panel2 border rounded px-3 py-1.5 text-xs capitalize focus:outline-none ${statusColor[r.status]}`}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button onClick={() => remove(r._id)} className="text-xs px-3 py-1.5 border border-white/15 rounded hover:border-accent2 hover:text-accent2">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

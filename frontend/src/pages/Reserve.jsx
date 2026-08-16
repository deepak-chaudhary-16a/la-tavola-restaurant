import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import api from "../api/axios";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "",
  specialRequests: "",
};

const timeSlots = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"];

export default function Reserve() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    ...initialForm,
    name: user?.name || "",
    email: user?.email || "",
  });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      await api.post("/reservations", { ...form, guests: Number(form.guests) });
      setStatus({ state: "success", message: "" });
      showToast("Reservation requested! We'll confirm by email shortly.", "success");
    } catch (err) {
      const msg = err.response?.data?.message || "Could not submit reservation. Please try again.";
      setStatus({
        state: "error",
        message: msg,
      });
      showToast(msg, "error");
    }
  };

  if (status.state === "success") {
    return (
      <div className="max-w-xl mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-4xl text-cream mb-4">Reservation Requested</h1>
        <p className="text-muted">We'll confirm your reservation via email within 2 hours.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-20">
      <div className="text-center mb-4">
        <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-3">Book a Table</p>
        <h1 className="font-display text-5xl text-cream mb-4">Make a Reservation</h1>
        <p className="text-muted">
          Join us for an unforgettable dining experience. Or call us directly at{" "}
          <span className="text-cream">+91 1234567890</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-panel border border-white/5 rounded-lg p-8 mt-10 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
          <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 1234567890" />
        </div>
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Date" name="date" type="date" value={form.date} onChange={handleChange} required />
          <div>
            <label className="block text-sm text-cream/80 mb-1.5">Time</label>
            <select
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="w-full bg-panel2 border border-white/10 rounded px-4 py-3 text-cream focus:outline-none focus:ring-1 focus:ring-accent2"
            >
              <option value="">Select time</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm text-cream/80 mb-1.5">Number of Guests</label>
          <select
            name="guests"
            value={form.guests}
            onChange={handleChange}
            required
            className="w-full bg-panel2 border border-white/10 rounded px-4 py-3 text-cream focus:outline-none focus:ring-1 focus:ring-accent2"
          >
            <option value="">Select guests</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-cream/80 mb-1.5">Special Requests</label>
          <textarea
            name="specialRequests"
            value={form.specialRequests}
            onChange={handleChange}
            rows={4}
            placeholder="Dietary restrictions, celebrations, seating preferences..."
            className="w-full bg-panel2 border border-white/10 rounded px-4 py-3 text-cream placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent2"
          />
        </div>

        {status.state === "error" && <p className="text-accent2 text-sm">{status.message}</p>}

        <button
          type="submit"
          disabled={status.state === "loading"}
          className="w-full bg-accent hover:bg-accent2 transition-colors py-3.5 rounded font-semibold disabled:opacity-60"
        >
          {status.state === "loading" ? "Submitting..." : "Request Reservation"}
        </button>
        <p className="text-center text-muted text-xs">We'll confirm your reservation via email within 2 hours.</p>
      </form>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", required = false, placeholder = "" }) {
  return (
    <div>
      <label className="block text-sm text-cream/80 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-panel2 border border-white/10 rounded px-4 py-3 text-cream placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent2"
      />
    </div>
  );
}
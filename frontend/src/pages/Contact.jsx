import { useState } from "react";
import api from "../api/axios";

const initialForm = { name: "", email: "", subject: "", message: "" };

const hours = [
  ["Monday", "Closed"],
  ["Tuesday", "5:00 PM - 10:00 PM"],
  ["Wednesday", "5:00 PM - 10:00 PM"],
  ["Thursday", "5:00 PM - 10:00 PM"],
  ["Friday", "5:00 PM - 11:00 PM"],
  ["Saturday", "12:00 PM - 11:00 PM"],
  ["Sunday", "12:00 PM - 9:00 PM"],
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      await api.post("/contact", form);
      setStatus({ state: "success", message: "Message sent. We'll get back to you soon." });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        state: "error",
        message: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-20">
      <div className="text-center mb-12">
        <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-3">Get in Touch</p>
        <h1 className="font-display text-5xl text-cream">Contact Us</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <form onSubmit={handleSubmit} className="bg-panel border border-white/5 rounded-lg p-8 space-y-5 h-fit">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
            <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} />
          <div>
            <label className="block text-sm text-cream/80 mb-1.5">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full bg-panel2 border border-white/10 rounded px-4 py-3 text-cream placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent2"
              placeholder="How can we help?"
            />
          </div>

          {status.state === "error" && <p className="text-accent2 text-sm">{status.message}</p>}
          {status.state === "success" && <p className="text-green-400 text-sm">{status.message}</p>}

          <button
            type="submit"
            disabled={status.state === "loading"}
            className="w-full bg-accent hover:bg-accent2 transition-colors py-3 rounded font-semibold disabled:opacity-60"
          >
            {status.state === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="space-y-6">
          <div className="bg-panel border border-white/5 rounded-lg p-8">
            <h3 className="font-display text-xl text-cream mb-5">Hours of Operation</h3>
            <ul className="space-y-2.5 text-sm">
              {hours.map(([day, time]) => (
                <li key={day} className="flex justify-between gap-6">
                  <span className="text-cream/80">{day}</span>
                  <span className={time === "Closed" ? "text-accent2 font-medium" : "text-cream/60"}>{time}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 mt-5 pt-5 text-sm text-muted space-y-1">
              <p>📞 91 9528827736</p>
              <p>✉️ chaudharydeepak88224@gmail.com</p>
              <p>📍 pathauli,AGRA,Uttar Pradesh,283105</p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-white/10 aspect-[4/3]">
            <iframe
              title="La Tavola location map"
              className="w-full h-full"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4294%2C37.7735%2C-122.4194%2C37.7835&layer=mapnik&marker=37.7785%2C-122.4244"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="block text-sm text-cream/80 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-panel2 border border-white/10 rounded px-4 py-3 text-cream placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent2"
      />
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const hours = [
  ["Monday", "Closed"],
  ["Tuesday", "5:00 PM - 10:00 PM"],
  ["Wednesday", "5:00 PM - 10:00 PM"],
  ["Thursday", "5:00 PM - 10:00 PM"],
  ["Friday", "5:00 PM - 11:00 PM"],
  ["Saturday", "12:00 PM - 11:00 PM"],
  ["Sunday", "12:00 PM - 9:00 PM"],
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const res = await api.post("/newsletter", { email });
      setStatus({ state: "success", message: res.data.message });
      setEmail("");
    } catch (err) {
      setStatus({
        state: "error",
        message: err.response?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <footer className="bg-panel border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="font-display text-2xl italic text-cream">
            — 🍁𝕯𝖊𝖊𝖕𝖆𝖐 𝕾𝖎𝖓𝖌𝖍🍁 —
          </Link>
          <p className="text-muted mt-4 text-sm">Authentic Italian Cuisine</p>
          <p className="text-cream/80 mt-3 text-sm">📞 +91 9528827736</p>
          <p className="text-cream/80 mt-1 text-sm">✉️ chaudharydeepak88224@gmail.com</p>
          <p className="text-cream/80 mt-1 text-sm">📍 Pathauli,AGRA,Uttar Pradesh,283105</p>
          <div className="flex gap-3 mt-5">
            {["IG", "FB", "TW"].map((s) => (
              <span
                key={s}
                className="w-9 h-9 rounded-full bg-panel2 border border-white/10 flex items-center justify-center text-xs text-cream/70 hover:text-accent2 hover:border-accent2 transition-colors cursor-pointer"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest text-muted mb-4">QUICK LINKS</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-cream/80 hover:text-accent2">Home</Link></li>
            <li><Link to="/menu" className="text-cream/80 hover:text-accent2">Menu</Link></li>
            <li><Link to="/about" className="text-cream/80 hover:text-accent2">About</Link></li>
            <li><Link to="/gallery" className="text-cream/80 hover:text-accent2">Gallery</Link></li>
            <li><Link to="/contact" className="text-cream/80 hover:text-accent2">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest text-muted mb-4">HOURS</h4>
          <ul className="space-y-2 text-sm">
            {hours.map(([day, time]) => (
              <li key={day} className="flex justify-between gap-6">
                <span className="text-cream/80">{day}</span>
                <span className={time === "Closed" ? "text-accent2" : "text-cream/60"}>{time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-widest text-muted mb-4">NEWSLETTER</h4>
          <p className="text-sm text-cream/70 mb-4">Subscribe for special offers and seasonal menu updates.</p>
          <form className="flex gap-2" onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 min-w-0 bg-panel2 border border-white/10 rounded px-3 py-2 text-sm text-cream placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent2"
            />
            <button
              type="submit"
              disabled={status.state === "loading"}
              className="bg-accent hover:bg-accent2 transition-colors px-4 py-2 rounded text-sm font-semibold disabled:opacity-60"
            >
              {status.state === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
          {status.state === "success" && <p className="text-green-400 text-xs mt-2">{status.message}</p>}
          {status.state === "error" && <p className="text-accent2 text-xs mt-2">{status.message}</p>}
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-wrap justify-between items-center gap-3 text-xs text-muted">
          <span>© {new Date().getFullYear()} Created by Deepak Singh.</span>
          <div className="flex gap-5">
            <span className="hover:text-cream cursor-pointer">Privacy Policy</span>
            <span className="hover:text-cream cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
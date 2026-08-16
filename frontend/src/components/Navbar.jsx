import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `text-sm font-medium tracking-wide transition-colors hover:text-accent2 ${
      isActive ? "text-accent2" : "text-cream/90"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl italic text-cream">
          <span className="text-accent2">⁂</span> 🍁𝕯𝖊𝖊𝖕𝖆𝖐 𝕾𝖎𝖓𝖌𝖍🍁 <span className="text-accent2">⁂</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-sm font-medium text-gold hover:text-accent2 transition-colors"
                >
                  Admin Panel
                </Link>
              )}
              <Link to="/my-reservations" className="text-sm font-medium text-cream/90 hover:text-accent2">
                My Reservations
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-sm font-medium text-cream/70 hover:text-accent2"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="text-sm font-medium text-cream/90 hover:text-accent2">
              Login
            </Link>
          )}
          <Link
            to="/reserve"
            className="bg-accent hover:bg-accent2 transition-colors text-cream text-sm font-semibold px-5 py-2.5 rounded"
          >
            Reserve a Table
          </Link>
        </div>

        <button
          className="md:hidden text-cream text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-panel border-t border-white/10 px-5 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin" className="text-gold" onClick={() => setOpen(false)}>
                  Admin Panel
                </Link>
              )}
              <Link to="/my-reservations" className="text-cream/90" onClick={() => setOpen(false)}>
                My Reservations
              </Link>
              <button
                className="text-left text-cream/70"
                onClick={() => {
                  logout();
                  setOpen(false);
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-cream/90" onClick={() => setOpen(false)}>
              Login
            </Link>
          )}
          <Link
            to="/reserve"
            onClick={() => setOpen(false)}
            className="bg-accent text-center text-cream text-sm font-semibold px-5 py-2.5 rounded"
          >
            Reserve a Table
          </Link>
        </div>
      )}
    </header>
  );
}

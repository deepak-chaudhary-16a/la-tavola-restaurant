import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      showToast(`Welcome back, ${user.name}!`, "success");
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 py-24">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl text-cream mb-2">Welcome Back</h1>
        <p className="text-muted text-sm">Log in to manage your reservations.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-panel border border-white/5 rounded-lg p-8 space-y-5">
        <div>
          <label className="block text-sm text-cream/80 mb-1.5">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-panel2 border border-white/10 rounded px-4 py-3 text-cream focus:outline-none focus:ring-1 focus:ring-accent2"
          />
        </div>
        <div>
          <label className="block text-sm text-cream/80 mb-1.5">Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-panel2 border border-white/10 rounded px-4 py-3 text-cream focus:outline-none focus:ring-1 focus:ring-accent2"
          />
        </div>
        {error && <p className="text-accent2 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent2 transition-colors py-3 rounded font-semibold disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
        <p className="text-center text-sm text-muted">
          Don't have an account?{" "}
          <Link to="/signup" className="text-accent2 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
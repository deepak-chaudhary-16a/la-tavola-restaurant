import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await signup(form.name, form.email, form.password, form.phone);
      showToast(`Account created! Welcome, ${user.name}.`, "success");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed. Please try again.";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 py-24">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl text-cream mb-2">Create an Account</h1>
        <p className="text-muted text-sm">Sign up to track your reservations.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-panel border border-white/5 rounded-lg p-8 space-y-5">
        <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
        <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Field label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
        {error && <p className="text-accent2 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent2 transition-colors py-3 rounded font-semibold disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link to="/login" className="text-accent2 hover:underline">Log in</Link>
        </p>
      </form>
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
        className="w-full bg-panel2 border border-white/10 rounded px-4 py-3 text-cream focus:outline-none focus:ring-1 focus:ring-accent2"
      />
    </div>
  );
}
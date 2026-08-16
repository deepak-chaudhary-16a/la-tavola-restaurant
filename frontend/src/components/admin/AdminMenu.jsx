import { useEffect, useState } from "react";
import api from "../../api/axios";

const categories = ["Antipasti", "Primi", "Secondi", "Dolci"];
const emptyForm = { name: "", description: "", price: "", category: "Antipasti", isAvailable: true, isFeatured: false };

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    api
      .get("/menu/all")
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = { ...form, price: Number(form.price) };
    try {
      if (editingId) {
        await api.put(`/menu/${editingId}`, payload);
      } else {
        await api.post("/menu", payload);
      }
      resetForm();
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save menu item.");
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      isAvailable: item.isAvailable,
      isFeatured: item.isFeatured,
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this menu item?")) return;
    await api.delete(`/menu/${id}`);
    load();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit} className="bg-panel border border-white/5 rounded-lg p-6 space-y-4 h-fit">
        <h3 className="font-display text-xl text-cream">{editingId ? "Edit Item" : "Add Menu Item"}</h3>
        <div>
          <label className="block text-xs text-muted mb-1">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-panel2 border border-white/10 rounded px-3 py-2 text-sm text-cream focus:outline-none focus:ring-1 focus:ring-accent2"
          />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="w-full bg-panel2 border border-white/10 rounded px-3 py-2 text-sm text-cream focus:outline-none focus:ring-1 focus:ring-accent2"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-muted mb-1">Price ($)</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full bg-panel2 border border-white/10 rounded px-3 py-2 text-sm text-cream focus:outline-none focus:ring-1 focus:ring-accent2"
            />
          </div>
          <div>
            <label className="block text-xs text-muted mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-panel2 border border-white/10 rounded px-3 py-2 text-sm text-cream focus:outline-none focus:ring-1 focus:ring-accent2"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-5">
          <label className="flex items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={form.isAvailable}
              onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
            />
            Available
          </label>
          <label className="flex items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            />
            Featured on home page
          </label>
        </div>
        {error && <p className="text-accent2 text-xs">{error}</p>}
        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-accent hover:bg-accent2 transition-colors py-2.5 rounded text-sm font-semibold">
            {editingId ? "Save Changes" : "Add Item"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="px-4 py-2.5 rounded text-sm border border-white/15 text-muted hover:text-cream">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="lg:col-span-2">
        {loading && <p className="text-muted">Loading...</p>}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item._id} className="bg-panel border border-white/5 rounded-lg p-4 flex justify-between items-center gap-4">
              <div>
                <p className="text-cream font-semibold">
                  {item.name} <span className="text-accent2">${item.price}</span>
                </p>
                <p className="text-muted text-xs mt-0.5">
                  {item.category} {!item.isAvailable && <span className="text-accent2">· Unavailable</span>} {item.isFeatured && <span className="text-gold">· Featured</span>}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleEdit(item)} className="text-xs px-3 py-1.5 border border-white/15 rounded hover:border-accent2 hover:text-accent2">
                  Edit
                </button>
                <button onClick={() => handleDelete(item._id)} className="text-xs px-3 py-1.5 border border-white/15 rounded hover:border-accent2 hover:text-accent2">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

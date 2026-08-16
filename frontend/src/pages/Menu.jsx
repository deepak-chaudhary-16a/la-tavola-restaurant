import { useEffect, useState } from "react";
import api from "../api/axios";
import SmartImage from "../components/SmartImage";
import { getDishVisual } from "../utils/dishVisuals";

const categories = [
  { name: "Antipasti", subtitle: "Starters" },
  { name: "Primi", subtitle: "First courses" },
  { name: "Secondi", subtitle: "Main courses" },
  { name: "Dolci", subtitle: "Desserts" },
];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("Antipasti");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/menu")
      .then((res) => setItems(res.data))
      .catch(() => setError("Could not load the menu. Please try again shortly."))
      .finally(() => setLoading(false));
  }, []);

  const activeCategory = categories.find((c) => c.name === active);
  const filtered = items.filter((i) => i.category === active);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[380px] flex items-center">
        <div className="absolute inset-0">
          <SmartImage src="/images/hero-menu.jpg" alt="" gradient={getDishVisual("menu-hero").gradient} icon="🍝" />
          <div className="absolute inset-0 bg-ink/30" />
        </div>
        <div className="relative max-w-4xl mx-auto px-5 md:px-8 py-20 text-center w-full">
          <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-4">Our Menu</p>
          <h1 className="font-display text-5xl md:text-6xl text-cream mb-5">Authentic Italian Cuisine</h1>
          <p className="text-cream/80 max-w-xl mx-auto">
            Every dish is crafted with the finest ingredients, traditional techniques, and a
            passion for authentic Italian flavors.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => setActive(c.name)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                active === c.name
                  ? "bg-accent border-accent text-cream"
                  : "border-white/15 text-muted hover:border-accent2 hover:text-accent2"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="font-display text-3xl text-cream">{activeCategory.name}</h2>
          <p className="text-muted text-sm mt-1">{activeCategory.subtitle}</p>
        </div>

        {loading && <p className="text-center text-muted">Loading menu...</p>}
        {error && <p className="text-center text-accent2">{error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-muted">No items in this category yet.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <div key={item._id} className="bg-panel border border-white/5 rounded-lg p-6 relative hover:border-accent/40 transition-colors">
              {item.isFeatured && (
                <span className="absolute -top-3 left-6 bg-accent text-cream text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                  Chef's Pick
                </span>
              )}
              <div className="flex justify-between items-start gap-3 mb-2">
                <h3 className="font-display text-lg text-cream leading-snug">{item.name}</h3>
                <span className="text-accent2 font-semibold whitespace-nowrap">${item.price}</span>
              </div>
              <p className="text-muted text-sm mb-3">{item.description}</p>
              {item.tag && (
                <span className="inline-block bg-panel2 border border-white/10 text-gold text-xs px-2.5 py-1 rounded">
                  {item.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
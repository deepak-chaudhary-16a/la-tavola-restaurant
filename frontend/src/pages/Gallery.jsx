import { useState } from "react";
import SmartImage from "../components/SmartImage";
import { getDishVisual } from "../utils/dishVisuals";

const photos = [
  { src: "/images/image5.jpg", key: "image5", icon: "🏛️", category: "Interior" },
  { src: "/images/image6.png", key: "image6", icon: "🍕", category: "Food" },
  { src: "/images/image26.jpg", key: "image7", icon: "🍷", category: "Drinks" },
  { src: "/images/image24.jpg", key: "image8", icon: "🍝", category: "Food" },
  { src: "/images/image7.jpg", key: "image9", icon: "🕯️", category: "Interior" },
  { src: "/images/image22.jpg", key: "image10", icon: "🍹", category: "Drinks" },
  { src: "/images/image25.jpg", key: "image11", icon: "🥖", category: "Food" },
  { src: "/images/image10.jpg", key: "image12", icon: "🪑", category: "Interior" },
  { src: "/images/image23.jpg", key: "image13", icon: "☕", category: "Drinks" },
];

const filters = ["All", "Interior", "Food", "Drinks"];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? photos : photos.filter((p) => p.category === active);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[380px] flex items-center">
        <div className="absolute inset-0">
          <SmartImage src="/images/image.jpg" alt="" gradient={getDishVisual("gallery-hero").gradient} icon="📷" />
          <div className="absolute inset-0 bg-ink/30" />
        </div>
        <div className="relative max-w-4xl mx-auto px-5 md:px-8 py-20 text-center w-full">
          <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-4">Photo Gallery</p>
          <h1 className="font-display text-5xl md:text-6xl text-cream mb-5">A Visual Journey</h1>
          <p className="text-cream/80 max-w-xl mx-auto">
            Explore our restaurant through images — from our beautifully plated dishes to
            our warm, inviting atmosphere.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                active === f
                  ? "bg-accent border-accent text-cream"
                  : "border-white/15 text-muted hover:border-accent2 hover:text-accent2"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div key={p.key} className="aspect-square rounded-lg overflow-hidden border border-white/10">
              <SmartImage src={p.src} alt={`${p.category} at La Tavola`} gradient={getDishVisual(p.key).gradient} icon={p.icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import AdminMenu from "../components/admin/AdminMenu";
import AdminReservations from "../components/admin/AdminReservations";
import AdminMessages from "../components/admin/AdminMessages";

const tabs = [
  { id: "menu", label: "Menu Items" },
  { id: "reservations", label: "Reservations" },
  { id: "messages", label: "Messages" },
];

export default function Admin() {
  const [tab, setTab] = useState("menu");

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-16">
      <div className="mb-10">
        <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-3">Admin Panel</p>
        <h1 className="font-display text-4xl text-cream">Manage La Tavola</h1>
      </div>

      <div className="flex gap-2 mb-8 border-b border-white/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              tab === t.id ? "border-accent2 text-accent2" : "border-transparent text-muted hover:text-cream"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "menu" && <AdminMenu />}
      {tab === "reservations" && <AdminReservations />}
      {tab === "messages" && <AdminMessages />}
    </div>
  );
}

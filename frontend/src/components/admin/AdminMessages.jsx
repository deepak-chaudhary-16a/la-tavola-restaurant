import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .get("/contact")
      .then((res) => setMessages(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const markRead = async (id) => {
    await api.put(`/contact/${id}/read`);
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this message?")) return;
    await api.delete(`/contact/${id}`);
    load();
  };

  return (
    <div>
      {loading && <p className="text-muted">Loading...</p>}
      {!loading && messages.length === 0 && <p className="text-muted">No messages yet.</p>}

      <div className="space-y-3">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`bg-panel border rounded-lg p-5 flex flex-wrap justify-between gap-4 ${
              m.isRead ? "border-white/5" : "border-accent2/40"
            }`}
          >
            <div className="max-w-xl">
              <p className="text-cream font-semibold">
                {m.name} {!m.isRead && <span className="text-accent2 text-xs ml-2">● New</span>}
              </p>
              <p className="text-muted text-xs mt-0.5">{m.email}{m.subject ? ` · ${m.subject}` : ""}</p>
              <p className="text-cream/80 text-sm mt-2">{m.message}</p>
              <p className="text-muted text-xs mt-2">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-2 shrink-0 items-start">
              {!m.isRead && (
                <button onClick={() => markRead(m._id)} className="text-xs px-3 py-1.5 border border-white/15 rounded hover:border-accent2 hover:text-accent2">
                  Mark Read
                </button>
              )}
              <button onClick={() => remove(m._id)} className="text-xs px-3 py-1.5 border border-white/15 rounded hover:border-accent2 hover:text-accent2">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

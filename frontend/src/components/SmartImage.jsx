import { useState } from "react";

// Tries to load a real photo from /public/images/. If the file doesn't exist yet
// (or fails to load for any reason), it falls back to a nice gradient + icon instead
// of a broken image icon — so the site always looks finished.
export default function SmartImage({ src, alt = "", gradient, icon = "🍽️" }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ background: gradient }}>
        <span className="text-5xl">{icon}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

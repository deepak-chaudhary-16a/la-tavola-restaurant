// Deterministic, dependency-free visual style per dish/category —
// no external images or APIs, so this always renders instantly with zero network risk.
const PALETTES = [
  ["#c8262c", "#7a1418"],
  ["#c9a24b", "#8a6a1f"],
  ["#3a7d5c", "#1f4a35"],
  ["#5b4a8a", "#332452"],
  ["#b0562e", "#6e3316"],
  ["#2a6f8e", "#123a4d"],
];

const ICONS = {
  Antipasti: "🫒",
  Primi: "🍝",
  Secondi: "🐟",
  Dolci: "🍰",
  pizza: "🍕",
  pasta: "🍝",
  dessert: "🍰",
  wine: "🍷",
  bread: "🥖",
  default: "🍽️",
};

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getDishVisual(key = "") {
  const h = hashString(key);
  const [c1, c2] = PALETTES[h % PALETTES.length];
  const icon = ICONS[key] || ICONS.default;
  return {
    icon,
    gradient: `linear-gradient(135deg, ${c1}, ${c2})`,
  };
}

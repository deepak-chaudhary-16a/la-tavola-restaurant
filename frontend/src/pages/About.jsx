import SmartImage from "../components/SmartImage";
import { getDishVisual } from "../utils/dishVisuals";

const team = [
  {
    name: "Marco Rossi",
    role: "Executive Chef & Owner",
    bio: "With over 25 years of culinary experience across Italy and the US, Chef Marco brings authentic Tuscan traditions to every dish.",
    photo: "/images/image12.jpg",
    key: "image12",
  },
  {
    name: "Sofia Bianchi",
    role: "Head Pastry Chef",
    bio: "Trained in Rome, Sofia creates our house-made desserts using traditional recipes passed down through three generations.",
    photo: "/images/image13.jpg",
    key: "image13",
  },
  {
    name: "Alessandro Romano",
    role: "Sommelier",
    bio: "Our certified sommelier curates an award-winning wine list featuring the finest selections from Italy's renowned regions.",
    photo: "/images/image14.jpg",
    key: "image14",
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[420px] flex items-center">
        <div className="absolute inset-0">
          <SmartImage src="/images/image10.jpg" alt="" gradient={getDishVisual("about-hero").gradient} icon="🍷" />
          <div className="absolute inset-0 bg-ink/30" />
        </div>
        <div className="relative max-w-4xl mx-auto px-5 md:px-8 py-24 text-center w-full">
          <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-4">Our Story</p>
          <h1 className="font-display text-5xl md:text-6xl text-cream mb-5">A Legacy of Flavor</h1>
          <p className="text-cream/80 max-w-xl mx-auto">
            Since 1987, we've been bringing the heart of Italy to every plate we serve.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-5 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10">
            <SmartImage src="/images/image11.jpg" alt="La Tavola" gradient={getDishVisual("about-story").gradient} icon="👨‍🍳" />
          </div>
          <div>
            <h2 className="font-display text-3xl text-cream mb-4">From Nonna's Kitchen to Yours</h2>
            <p className="text-muted mb-4">
              La Tavola began in 1987, when the Moretti family opened a six-table trattoria
              with one rule: nothing leaves the kitchen that wasn't made from scratch that day.
            </p>
            <p className="text-muted">
              Three generations later, the same rule still holds — hand-rolled pasta, slow-simmered
              sauces, and a wine list sourced directly from small producers across Italy.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-20">
          {[
            { title: "1987", desc: "Founded as a six-table family trattoria" },
            { title: "100%", desc: "Pasta made fresh, in-house, every day" },
            { title: "3", desc: "Generations of the same family behind the stove" },
          ].map((s) => (
            <div key={s.title} className="bg-panel border border-white/5 rounded-lg p-8">
              <p className="font-display text-4xl text-accent2 mb-2">{s.title}</p>
              <p className="text-muted text-sm">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-3">Meet the Team</p>
          <h2 className="font-display text-4xl text-cream">The People Behind La Tavola</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.key} className="bg-panel border border-white/5 rounded-lg overflow-hidden">
              <div className="aspect-square">
                <SmartImage src={member.photo} alt={member.name} gradient={getDishVisual(member.key).gradient} icon="🧑‍🍳" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-cream">{member.name}</h3>
                <p className="text-accent2 text-sm mt-0.5 mb-3">{member.role}</p>
                <p className="text-muted text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

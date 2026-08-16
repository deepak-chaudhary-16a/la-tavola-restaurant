import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const dishes = [
    {
      name: "Burrata al Parma",
      price: 18,
      image: "/images/image2.jpg",
      description:
        "Creamy burrata with prosciutto di Parma, fresh arugula and aged balsamic.",
    },
    {
      name: "Spaghetti alla Carbonara",
      price: 16,
      image: "/images/image3.jpg",
      description:
        "Classic Roman pasta with guanciale, egg yolk and Pecorino Romano.",
    },
    {
      name: "Branzino al Forno",
      price: 26,
      image: "/images/image4.png",
      description:
        "Roasted Mediterranean sea bass with herbs, lemon and extra virgin olive oil.",
    },
    {
      name: "Tiramisu",
      price: 9,
      image: "/images/image5.jpg",
      description:
        "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone.",
    },
  ];

  return (
    <div className="bg-ink text-cream">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden min-h-[650px] flex items-center">

        <div className="absolute inset-0">
          <img
            src="/images/image1.jpg"
            alt="La Tavola Italian Cuisine"
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/35" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-24 md:py-32 text-center w-full">

          <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-5">
            Welcome to La Tavola
          </p>

          <h1 className="font-display text-5xl md:text-7xl leading-tight text-cream mb-6">
            Authentic{" "}
            <span className="italic text-accent2">
              Italian
            </span>{" "}
            Cuisine
          </h1>

          <p className="text-white/90 max-w-xl mx-auto mb-10">
            Experience the finest Italian traditions, crafted with love and
            served with passion since 1987.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">

            <Link
              to="/reserve"
              className="bg-accent hover:bg-accent2 transition-colors px-8 py-3.5 rounded font-semibold"
            >
              Reserve a Table
            </Link>

            <Link
              to="/menu"
              className="border border-white/40 hover:border-accent2 hover:text-accent2 transition-colors px-8 py-3.5 rounded font-semibold"
            >
              View Our Menu
            </Link>

          </div>
        </div>
      </section>


      {/* =====================================================
          FEATURED DISHES
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">

        <div className="text-center mb-14">

          <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-3">
            Chef's Selection
          </p>

          <h2 className="font-display text-4xl text-cream">
            Signature Dishes
          </h2>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {dishes.map((dish, index) => (

            <div
              key={dish.name}
              className="bg-panel border border-white/5 rounded-lg overflow-hidden hover:border-accent/40 transition-colors"
            >

              <div className="relative aspect-[4/3] overflow-hidden">

                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />

                {index === 0 && (
                  <span className="absolute top-3 right-3 bg-accent text-cream text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full">
                    Chef's Pick
                  </span>
                )}

              </div>

              <div className="p-5">

                <div className="flex justify-between items-start mb-2 gap-2">

                  <h3 className="font-display text-lg text-cream leading-snug">
                    {dish.name}
                  </h3>

                  <span className="text-accent2 font-semibold whitespace-nowrap">
                    ${dish.price}
                  </span>

                </div>

                <p className="text-muted text-sm">
                  {dish.description}
                </p>

              </div>

            </div>

          ))}

        </div>

        <div className="text-center mt-12">

          <Link
            to="/menu"
            className="text-accent2 font-semibold hover:underline"
          >
            View Full Menu →
          </Link>

        </div>

      </section>


      {/* =====================================================
          OUR STORY
      ====================================================== */}
      <section className="bg-panel border-y border-white/5">

        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div>

            <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-3">
              Our Story
            </p>

            <h2 className="font-display text-4xl text-cream mb-5">
              Three Generations, One Recipe Book
            </h2>

            <p className="text-muted mb-4">
              La Tavola opened in 1987 as a six-table trattoria. Today the
              same family recipes — passed down, never franchised — still
              leave the kitchen every night, made from scratch by hand.
            </p>

            <Link
              to="/about"
              className="text-accent2 font-semibold hover:underline"
            >
              Read Our Story →
            </Link>

          </div>

          <div className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10">

            <img
              src="/images/image9.jpg"
              alt="La Tavola Restaurant"
              className="w-full h-full object-cover"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          REVIEWS
      ====================================================== */}
      <section className="bg-panel border-y border-white/5">

        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20">

          <div className="text-center mb-14">

            <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-3">
              Reviews & Testimonials
            </p>

            <h2 className="font-display text-4xl text-cream">
              What Our Guests Say
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              {
                name: "Sarah M.",
                source: "Yelp · January 2025",
                quote:
                  "The best Italian food I've had outside of Italy. The carbonara is absolutely authentic and the service is impeccable.",
              },
              {
                name: "Michael R.",
                source: "Google · December 2024",
                quote:
                  "We celebrated our anniversary here and it was perfect. The ambiance, the food and the wine selection were excellent.",
              },
              {
                name: "Jennifer L.",
                source: "TripAdvisor · November 2024",
                quote:
                  "La Tavola has become our go-to spot for special occasions. The burrata appetizer is a must-try.",
              },
            ].map((review) => (

              <div
                key={review.name}
                className="bg-ink border border-white/5 rounded-lg p-6"
              >

                <div className="text-gold text-sm mb-3">
                  ★★★★★
                </div>

                <p className="text-cream/80 text-sm mb-5">
                  "{review.quote}"
                </p>

                <p className="text-cream font-semibold text-sm">
                  {review.name}
                </p>

                <p className="text-muted text-xs mt-0.5">
                  {review.source}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          LAST PHOTO
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">

        <div className="text-center mb-10">

          <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-3">
            From Our Kitchen
          </p>

          <h2 className="font-display text-4xl text-cream">
            A Taste of La Tavola
          </h2>

        </div>

        <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[16/7]">

          <img
            src="/images/image23.jpg"
            alt="La Tavola Italian Cuisine"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/35" />

          <div className="absolute inset-0 flex items-center justify-center text-center">

            <div>

              <h3 className="font-display text-4xl md:text-5xl text-white mb-3">
                Made With Passion
              </h3>

              <p className="text-white/90">
                Traditional Italian flavours, served with love.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INSTAGRAM + CONTACT
      ====================================================== */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-20 text-center">

        <p className="uppercase tracking-[0.3em] text-accent2 text-xs font-semibold mb-6">
          Connect With Us
        </p>

        <div className="flex flex-col items-center gap-3 text-accent2 font-display text-xl mb-8">

          {/* Instagram */}
          <a
            href="https://instagram.com/ch.deepak.a"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faInstagram} />
            @ch.deepak.a
          </a>

          {/* Call */}
          <a
            href="tel:+911234567890"
            className="flex items-center justify-center gap-2 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faPhone} />
            +91 9528827736
          </a>

          {/* Email */}
          <a
            href="mailto:hello@latavola.com"
            className="flex items-center justify-center gap-2 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            chaudharydeepak88224@gmail.com
          </a>

          {/* Address */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=New+Delhi+India"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-center hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faLocationDot} />
            Pathauli, AGRA, Uttar Pradesh, 283105
          </a>

        </div>

        <p className="text-muted mb-6">
          Follow us on Instagram for daily specials, behind-the-scenes
          content, and more delicious inspiration.
        </p>

        <a
          href="https://instagram.com/ch.deepak.a"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-accent to-gold text-cream px-8 py-3 rounded font-semibold hover:opacity-90 transition-opacity"
        >
          Follow on Instagram
        </a>

      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24 text-center">

        <h2 className="font-display text-4xl text-cream mb-4">
          Join Us for an Unforgettable Evening
        </h2>

        <p className="text-muted mb-8 max-w-lg mx-auto">
          Tables fill quickly on weekends — reserve yours in under a minute.
        </p>

        <Link
          to="/reserve"
          className="bg-accent hover:bg-accent2 transition-colors px-10 py-4 rounded font-semibold inline-block"
        >
          Reserve a Table
        </Link>

      </section>

    </div>
  );
}
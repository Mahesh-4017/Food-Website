import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════
   DESIGN TOKENS — edit everything from here
═══════════════════════════════════════════════ */
const T = {
  // Brand accent
  gold:         "text-[#c8a050]",
  goldBg:       "bg-[#c8a050]",
  goldBorder:   "border-[#c8a050]",
  goldHoverBg:  "hover:bg-[#c8a050]",
  goldShadow:   "hover:shadow-[0_0_48px_rgba(200,160,80,0.4)]",
  goldRing:     "ring-[#c8a050]",

  // Surfaces
  pageBg:       "bg-[#050505]",
  surfaceBg:    "bg-[#0c0c0c]",
  cardBg:       "bg-[#111111]",
  cardBorder:   "border-[#1e1e1e]",

  // Text
  textPrimary:   "text-white",
  textSecondary: "text-white/50",
  textMuted:     "text-white/25",

  // Borders
  border:        "border-white/10",
  borderSubtle:  "border-white/[0.06]",

  // Radii
  radiusCard:    "rounded-[2rem]",
  radiusBadge:   "rounded-full",
  radiusChip:    "rounded-2xl",

  // Fonts
  serif: "font-['Playfair_Display',Georgia,serif]",
  sans:  "font-['Cormorant_Garamond',Georgia,serif]",
};

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const mealsData = [
  {
    title: "Truffle Pasta",
    category: "Italian",
    price: "$32",
    desc: "Hand-rolled pappardelle tossed in black truffle butter, aged pecorino, and 24k gold leaf.",
    badge: "Chef's Pick",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Wagyu Steak",
    category: "Japanese",
    price: "$68",
    desc: "A5 Japanese Wagyu, seared tableside with charcoal ash butter and seasonal microgreens.",
    badge: "Signature",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Royal Biryani",
    category: "Indian",
    price: "$24",
    desc: "Slow-cooked Mughlai biryani layered with saffron, dum-sealed for maximum aroma.",
    badge: "Heritage",
    image: "https://w0.peakpx.com/wallpaper/760/294/HD-wallpaper-republic-day-brunching-chennai-chefs-roll-out-dishes-from-every-indian-state-and-tri-coloured-dess-north-indian-food.jpg",
  },
  {
    title: "Seafood Delight",
    category: "Mediterranean",
    price: "$44",
    desc: "Atlantic lobster, king prawn, and scallop medley in a saffron bouillabaisse reduction.",
    badge: "Seasonal",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Chocolate Lava",
    category: "Dessert",
    price: "$18",
    desc: "Valrhona 72% dark chocolate fondant with salted caramel core and vanilla bean ice cream.",
    badge: "Sweet",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Signature Sushi",
    category: "Japanese",
    price: "$38",
    desc: "Omakase selection of bluefin toro, uni, and ikura over seasoned Koshihikari rice.",
    badge: "Omakase",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1974&auto=format&fit=crop",
  },
];

const filters = ["All", "Italian", "Japanese", "Indian", "Mediterranean", "Dessert"];

const highlights = [
  { icon: "🌿", title: "100% Organic", desc: "Sourced from certified farms across 6 continents." },
  { icon: "🔥", title: "Live Kitchen", desc: "Open-theatre cooking — watch every dish come alive." },
  { icon: "🍷", title: "Wine Pairing", desc: "Expert sommelier pairing for every course." },
];

/* ═══════════════════════════════════════════════
   SMALL HELPERS
═══════════════════════════════════════════════ */
const GoldLine = ({ className = "" }) => (
  <div className={`h-px bg-gradient-to-r from-[#c8a050] to-transparent ${className}`} />
);

const Label = ({ children }) => (
  <p className={`uppercase tracking-[0.4em] ${T.gold} text-[11px]`}>{children}</p>
);

function Counter({ to }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const seen = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !seen.current) {
        seen.current = true;
        const num = parseInt(to);
        if (isNaN(num)) { setVal(to); return; }
        let v = 0; const step = num / 80;
        const id = setInterval(() => {
          v += step;
          if (v >= num) { setVal(num); clearInterval(id); }
          else setVal(Math.floor(v));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{typeof val === "number" ? val : to}</span>;
}

const MarqueeStrip = () => {
  const items = ["Truffle Pasta", "Wagyu", "Biryani", "Sushi", "Chocolate Lava", "Seafood", "Fine Dining"];
  return (
    <div className={`overflow-hidden py-5 border-y ${T.borderSubtle} ${T.surfaceBg}`}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`text-[10px] tracking-[0.45em] uppercase ${T.textMuted} flex items-center gap-12`}>
            {item} <span className={T.gold}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MEAL CARD
═══════════════════════════════════════════════ */
function MealCard({ meal, i }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.85, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden ${T.radiusCard} ${T.cardBg} border ${T.cardBorder} flex flex-col`}
    >
      {/* Badge */}
      <div className={`absolute top-4 left-4 z-20 ${T.goldBg} text-black text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 ${T.radiusBadge} font-semibold`}>
        {meal.badge}
      </div>

      {/* Image */}
      <div className="relative overflow-hidden h-[280px] sm:h-[320px]">
        <motion.img
          src={meal.image}
          alt={meal.title}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

        {/* Hover overlay label */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-4 right-4 border ${T.border} backdrop-blur-sm bg-black/40 px-4 py-2 ${T.radiusChip}`}
        >
          <span className={`text-[10px] tracking-[0.2em] uppercase ${T.textSecondary}`}>View Details →</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className={`${T.gold} text-[10px] uppercase tracking-[0.25em] mb-2`}>{meal.category}</p>
            <h2 className={`text-2xl sm:text-3xl font-light ${T.serif} leading-tight`}>{meal.title}</h2>
          </div>
          <motion.span
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className={`${T.gold} text-2xl w-9 h-9 pb-1 flex items-center justify-center border ${T.goldBorder} ${T.radiusBadge} flex-shrink-0 mt-1`}
          >
            +
          </motion.span>
        </div>

        <p className={`${T.textMuted} text-sm leading-relaxed mb-5 flex-1`}>{meal.desc}</p>

        <GoldLine className="mb-5 opacity-30" />

        <div className="flex items-center justify-between">
          <div>
            <p className={`text-[10px] tracking-[0.2em] uppercase ${T.textMuted} mb-1`}>Price</p>
            <p className={`text-2xl font-light ${T.gold}`}>{meal.price}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`border ${T.goldBorder} px-6 py-2.5 ${T.radiusBadge} text-[11px] tracking-[0.25em] uppercase ${T.goldHoverBg} hover:text-black transition-all duration-300`}
          >
            Order
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
export default function Meals() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [navVisible, setNavVisible] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const fn = () => setNavVisible(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const filtered = activeFilter === "All"
    ? mealsData
    : mealsData.filter(m => m.category === activeFilter);

  return (
    <div className={`${T.pageBg} ${T.textPrimary} min-h-screen overflow-x-hidden ${T.sans}`}>

      {/* ── NAVBAR ── */}
      <motion.nav
        animate={navVisible ? { y: 0, opacity: 1 } : { y: -72, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4 border-b ${T.borderSubtle} backdrop-blur-xl bg-black/80`}
      >
        <span className={`${T.gold} tracking-[0.45em] text-[14px] uppercase`}>Lumine</span>
        <div className="hidden md:flex gap-10">
          {["Menu", "Experience", "Reserve"].map(n => (
            <button key={n} className={`${T.textMuted} hover:text-white text-[11px] tracking-[0.25em] uppercase transition-colors duration-300`}>{n}</button>
          ))}
        </div>
        <div className="h-px w-10 bg-[#c8a050]" />
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')",
              opacity: 0.32,
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-[#050505]/40" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-5 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ duration: 2, delay: 0.2 }}
          >
            <Label>Lumine · Signature Collection</Label>
          </motion.div>

          <div className="mt-8 mb-5 overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`text-[clamp(3.5rem,11vw,8.5rem)] font-extralight leading-none tracking-tight ${T.serif}`}
            >
              Luxury<span className={`italic ${T.gold}`}> Meals</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className={`${T.textSecondary} text-base sm:text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12`}
          >
            Discover handcrafted dishes inspired by global flavors, premium
            ingredients, and elevated fine dining experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`${T.goldBg} text-black px-7 py-3.5 ${T.radiusBadge} text-[13px] tracking-[0.3em] uppercase font-extrabold ${T.goldShadow} transition-all duration-500`}
            >
              Explore Menu
            </motion.button>
            <button className={`${T.textSecondary} text-[11px] tracking-[0.25em] uppercase flex items-center gap-3 hover:text-white transition-colors`}>
              Reserve Table <span className={T.gold}>→</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-px h-14 bg-gradient-to-b from-[#c8a050] to-transparent mx-auto"
          />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className={`${T.surfaceBg} border-y ${T.borderSubtle} py-14`}>
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 50, suffix: "+", label: "Signature Dishes" },
            { value: 4,  suffix: "★", label: "Michelin Stars" },
            { value: 12, suffix: "",  label: "Years of Craft" },
            { value: 98, suffix: "%", label: "Guest Satisfaction" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`text-4xl sm:text-5xl font-extralight ${T.gold} leading-none`}>
                <Counter to={s.value} />{s.suffix}
              </div>
              <div className={`text-[10px] tracking-[0.25em] uppercase ${T.textMuted} mt-3`}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <MarqueeStrip />

      {/* ── FILTERS + GRID ── */}
      <section className="py-24 sm:py-32 px-5 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <GoldLine className="w-16 mb-5" />
              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-light leading-tight ${T.serif}`}>
                Our<br /><span className={`italic ${T.gold}`}>Menu</span>
              </h2>
            </div>
            <p className={`${T.textMuted} text-[11px] tracking-[0.2em] uppercase leading-loose max-w-[200px]`}>
              {filtered.length} dish{filtered.length !== 1 ? "es" : ""} available
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-3 mb-14 pb-4">
            {filters.map((f, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveFilter(f)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`px-6 py-2.5 ${T.radiusBadge} text-[11px] tracking-[0.2em] uppercase transition-all duration-300 border
                  ${activeFilter === f
                    ? `${T.goldBg} text-black border-transparent font-semibold`
                    : `border-white/10 ${T.textSecondary} hover:border-[#c8a050] hover:text-[#c8a050]`
                  }`}
              >
                {f}
              </motion.button>
            ))}
          </div>

          {/* Cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
            >
              {filtered.map((meal, i) => (
                <MealCard key={meal.title} meal={meal} i={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── EXPERIENCE SECTION ── */}
      <section className={`${T.surfaceBg} py-24 sm:py-32 px-5 sm:px-10 lg:px-20`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Label>Fine Dining Experience</Label>
              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mt-5 mb-8 ${T.serif}`}>
                Crafted To<br /><span className={`italic ${T.gold}`}>Impress</span>
              </h2>
              <p className={`${T.textSecondary} text-base sm:text-lg leading-relaxed mb-12 max-w-md`}>
                Every meal at LUMINE is prepared with artistry, passion, and premium
                ingredients — delivering unforgettable dining moments.
              </p>

              {/* Highlights */}
              <div className="space-y-4 mb-12">
                {highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    className={`flex gap-5 p-5 ${T.cardBg} border ${T.borderSubtle} ${T.radiusChip} hover:border-[#c8a050]/30 transition-colors duration-400`}
                  >
                    <span className="text-2xl flex-shrink-0">{h.icon}</span>
                    <div>
                      <h4 className="text-sm font-light tracking-wide mb-1">{h.title}</h4>
                      <p className={`text-[13px] ${T.textMuted} leading-relaxed`}>{h.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`border ${T.goldBorder} px-9 py-3.5 ${T.radiusBadge} text-[11px] tracking-[0.3em] uppercase ${T.goldHoverBg} hover:text-black transition-all duration-400`}
              >
                Reserve Table
              </motion.button>
            </motion.div>

            {/* Right image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Decorative ring */}
              <div className={`absolute -top-8 -right-8 w-48 h-48 rounded-full border ${T.borderSubtle} pointer-events-none`} />

              <img
                src="https://w0.peakpx.com/wallpaper/441/84/HD-wallpaper-cocktails-drinks-other.jpg"
                alt="Fine dining"
                className={`${T.radiusCard} h-[480px] sm:h-[600px] w-full object-cover`}
              />

              {/* Stat badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className={`absolute -bottom-6 -left-6 ${T.goldBg} text-black p-7 rounded-[1.5rem] shadow-2xl`}
              >
                <p className="text-4xl font-light leading-none">50+</p>
                <p className="uppercase tracking-[0.2em] text-[10px] mt-2 opacity-80">Signature Dishes</p>
              </motion.div>

              {/* Year chip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className={`absolute top-6 -left-5 ${T.cardBg} border ${T.border} px-5 py-3 ${T.radiusChip} backdrop-blur-sm`}
              >
                <p className={`text-[10px] tracking-[0.2em] uppercase ${T.textMuted} mb-1`}>Est.</p>
                <p className={`${T.gold} text-lg font-light`}>2012</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 sm:py-40 px-5 text-center relative overflow-hidden">
        {/* Spinning rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border ${T.borderSubtle} pointer-events-none`}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-[#c8a050]/[0.07] pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <Label>Reserve Your Experience</Label>
          <h2 className={`text-[clamp(2.8rem,9vw,6rem)] font-light leading-none mt-6 mb-8 ${T.serif}`}>
            Taste Beyond<br /><span className={`italic ${T.gold}`}>Expectations</span>
          </h2>
          <p className={`${T.textMuted} text-[11px] tracking-[0.3em] uppercase mb-12`}>
            Wednesday — Sunday · From 6 pm
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className={`${T.goldBg} text-black px-14 py-4 ${T.radiusBadge} text-[11px] tracking-[0.35em] uppercase font-bold ${T.goldShadow} transition-all duration-500`}
          >
            Book Dining
          </motion.button>

          <div className={`flex justify-center gap-10 mt-16 ${T.textMuted} text-[10px] tracking-[0.3em] uppercase flex-wrap`}>
            <span>Instagram</span>
            <span className={T.gold}>·</span>
            <span>Reservations</span>
            <span className={T.gold}>·</span>
            <span>Private Events</span>
          </div>
          <p className="mt-8 text-white/[0.07] text-[10px] tracking-[0.3em]">© 2026 LUMINE · ALL RIGHTS RESERVED</p>
        </motion.div>
      </section>
    </div>
  );
}
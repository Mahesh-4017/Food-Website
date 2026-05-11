import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════
   DESIGN TOKENS  — change everything from here
═══════════════════════════════════════════════ */
const T = {
  // Brand accent
  gold:        "text-[#c8a050]",
  goldBg:      "bg-[#c8a050]",
  goldBorder:  "border-[#c8a050]",
  goldHoverBg: "hover:bg-[#c8a050]",
  goldShadow:  "hover:shadow-[0_0_48px_rgba(200,160,80,0.45)]",

  // Surfaces
  pageBg:      "bg-[#050505]",
  surfaceBg:   "bg-[#0c0c0c]",
  cardBg:      "bg-[#111111]",

  // Text
  textPrimary:   "text-white",
  textSecondary: "text-white/50",
  textMuted:     "text-white/25",

  // Borders
  border:        "border-white/10",
  borderSubtle:  "border-white/[0.06]",

  // Radius
  radiusCard:    "rounded-[2rem]",
  radiusBadge:   "rounded-full",

  // Font
  serif:  "font-['Playfair_Display',Georgia,serif]",
  sans:   "font-['Cormorant_Garamond',Georgia,serif]",
};

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const cuisines = [
  {
    name: "Italian",
    origin: "Mediterranean Soul",
    tag: "Pasta · Truffle · Barolo",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    desc: "Handcrafted pasta, wood-fired flavors, and timeless Neapolitan elegance perfected over centuries.",
    stat: "300+", statLabel: "Recipes",
    color: "from-amber-900/60",
  },
  {
    name: "Japanese",
    origin: "Eastern Precision",
    tag: "Omakase · Wagyu · Sake",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1974&auto=format&fit=crop",
    desc: "Precision, balance, and refined culinary artistry rooted in centuries of Zen philosophy.",
    stat: "A5", statLabel: "Wagyu Grade",
    color: "from-red-900/60",
  },
  {
    name: "French",
    origin: "Parisian Heritage",
    tag: "Foie Gras · Burgundy · Soufflé",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
    desc: "Luxury dining inspired by Parisian sophistication — the gold standard of classical technique.",
    stat: "★★★", statLabel: "Michelin",
    color: "from-sky-900/50",
  },
  {
    name: "Indian",
    origin: "Royal Mughal Legacy",
    tag: "Spice · Biryani · Saffron",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1974&auto=format&fit=crop",
    desc: "Bold spices, royal heritage, and unforgettable aromas drawn from 5,000 years of civilization.",
    stat: "80+", statLabel: "Spice Blends",
    color: "from-orange-900/60",
  },
];

const stats = [
  { value: "25+", label: "Global Cuisines" },
  { value: "4", label: "Michelin Stars" },
  { value: "12", label: "Years of Craft" },
  { value: "98%", label: "Guest Satisfaction" },
];

const experiences = [
  { icon: "🌿", title: "Farm to Table", desc: "Ingredients sourced directly from 40+ partner farms across six continents." },
  { icon: "🍷", title: "Sommelier Guided", desc: "Each course paired with rare vintage selections by our master sommelier." },
  { icon: "🎭", title: "Theatre Dining", desc: "An open kitchen stage where every plate is a performance in motion." },
];

/* ═══════════════════════════════════════════════
   SMALL COMPONENTS
═══════════════════════════════════════════════ */
const GoldLine = ({ className = "" }) => (
  <div className={`h-px bg-gradient-to-r from-[#c8a050] to-transparent ${className}`} />
);

const Label = ({ children }) => (
  <p className={`uppercase tracking-[0.4em] ${T.gold} text-[11px] font-light`}>{children}</p>
);

const Tag = ({ children }) => (
  <span className={`text-[10px] tracking-[0.2em] uppercase ${T.textMuted} border ${T.borderSubtle} px-3 py-1 ${T.radiusBadge}`}>
    {children}
  </span>
);

/* Animated counter */
function Counter({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const seen = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !seen.current) {
        seen.current = true;
        const num = parseInt(to);
        if (isNaN(num)) { setVal(to); return; }
        let v = 0;
        const step = num / 80;
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

  return (
    <span ref={ref}>
      {typeof val === "number" ? val + suffix : val}
    </span>
  );
}

/* Marquee */
const MarqueeStrip = () => {
  const items = ["Italian", "Japanese", "French", "Indian", "Mexican", "Thai", "Peruvian", "Lebanese"];
  return (
    <div className={`overflow-hidden py-5 border-y ${T.borderSubtle} ${T.surfaceBg}`}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-14 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`text-[10px] tracking-[0.45em] uppercase ${T.textMuted} flex items-center gap-14`}>
            {item} <span className={T.gold}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   CUISINE CARD
═══════════════════════════════════════════════ */
function CuisineCard({ item, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group ${T.radiusCard} overflow-hidden cursor-pointer h-[480px] sm:h-[540px]`}
      onClick={() => setOpen(!open)}
    >
      {/* BG image */}
      <motion.img
        src={item.image}
        alt={item.name}
        animate={{ scale: open ? 1.08 : 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${item.color} via-black/20 to-transparent opacity-80`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Top row */}
      <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
        <span className={`text-[10px] tracking-[0.35em] uppercase ${T.textSecondary} ${T.border} border px-3 py-1.5 ${T.radiusBadge} backdrop-blur-sm bg-black/30`}>
          {item.origin}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-9 h-9 rounded-full ${T.border} border backdrop-blur-sm bg-black/20 flex items-center justify-center ${T.gold} text-xl`}
        >
          +
        </motion.div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {item.tag.split("·").map((t, i) => <Tag key={i}>{t.trim()}</Tag>)}
        </div>

        <div className="flex justify-between items-end">
          <div>
            <h2 className={`text-4xl sm:text-5xl font-light ${T.serif} leading-none mb-2`}>{item.name}</h2>
            <AnimatePresence>
              {!open && (
                <motion.p
                  initial={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`${T.textSecondary} text-sm leading-relaxed max-w-xs line-clamp-2`}
                >
                  {item.desc}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          {/* Stat badge */}
          <div className={`${T.goldBg} text-black px-4 py-3 rounded-2xl text-center flex-shrink-0 ml-4`}>
            <div className="text-xl font-light leading-none">{item.stat}</div>
            <div className="text-[9px] tracking-[0.15em] uppercase mt-1 opacity-80">{item.statLabel}</div>
          </div>
        </div>

        {/* Expandable desc */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <GoldLine className="my-4 opacity-40" />
              <p className={`${T.textSecondary} text-sm leading-relaxed`}>{item.desc}</p>
              <button className={`mt-5 text-[11px] tracking-[0.3em] uppercase ${T.gold} flex items-center gap-3`}>
                Explore Cuisine <span>→</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
export default function Worldcuisine() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const [navVisible, setNavVisible] = useState(false);
  useEffect(() => {
    const fn = () => setNavVisible(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div className={`${T.pageBg} ${T.textPrimary} min-h-screen overflow-x-hidden ${T.sans}`}>

      {/* ── NAV ── */}
      <motion.nav
        animate={navVisible ? { y: 0, opacity: 1 } : { y: -72, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4 border-b ${T.borderSubtle} backdrop-blur-xl bg-black/80`}
      >
        <span className={`${T.gold} tracking-[0.45em] text-[11px] uppercase`}>Lumine</span>
        <div className="hidden md:flex gap-10">
          {["Cuisines", "Experience", "Reserve"].map(n => (
            <button key={n} className={`${T.textMuted} hover:text-white text-[11px] tracking-[0.25em] uppercase transition-colors duration-300`}>{n}</button>
          ))}
        </div>
        <div className={`h-px w-10 bg-[#c8a050]`} />
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')", opacity: 0.35 }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/40 via-transparent to-[#050505]/40" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-5 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ duration: 2, delay: 0.2 }}
          >
            <Label>Lumine · Culinary Journey</Label>
          </motion.div>

          <div className="mt-8 mb-6 overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={`text-[clamp(3.5rem,11vw,8.5rem)] font-extralight leading-none tracking-tight ${T.serif}`}
            >
              World<span className={`italic ${T.gold}`}> Cuisine</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className={`${T.textSecondary} text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12`}
          >
            Discover authentic flavors from across the globe — elevated with modern
            presentation and luxurious dining experiences.
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
              className={`${T.goldBg} text-black px-10 py-4 ${T.radiusBadge} text-[11px] tracking-[0.3em] uppercase font-bold ${T.goldShadow} transition-all duration-500`}
            >
              Explore Experiences
            </motion.button>
            <button className={`${T.textSecondary} text-[11px] tracking-[0.25em] uppercase flex items-center gap-3 hover:text-white transition-colors`}>
              View Menu <span className={T.gold}>↓</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll pulse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className={`w-px h-14 bg-gradient-to-b from-[#c8a050] to-transparent mx-auto`}
          />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className={`${T.surfaceBg} border-y ${T.borderSubtle} py-14`}>
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`text-4xl sm:text-5xl font-extralight ${T.gold} leading-none`}>
                <Counter to={s.value} />
              </div>
              <div className={`text-[10px] tracking-[0.25em] uppercase ${T.textMuted} mt-3`}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <MarqueeStrip />

      {/* ── CUISINES GRID ── */}
      <section className="py-24 sm:py-32 px-5 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <GoldLine className="w-16 mb-5" />
              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-light leading-tight ${T.serif}`}>
                Signature<br />
                <span className={`italic ${T.gold}`}>Destinations</span>
              </h2>
            </div>
            <p className={`${T.textMuted} text-[11px] tracking-[0.22em] uppercase leading-loose max-w-[200px]`}>
              Four corners of the world. One table.
            </p>
          </div>

          {/* Responsive grid: 1 col mobile, 2 col tablet+ */}
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-7">
            {cuisines.map((item, i) => (
              <CuisineCard key={i} item={item} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE SECTION ── */}
      <section className={`${T.surfaceBg} py-24 sm:py-32 px-5 sm:px-10 lg:px-20`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Label>Luxury Dining</Label>
              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mt-5 mb-8 ${T.serif}`}>
                Crafted For<br />
                <span className={`italic ${T.gold}`}>Explorers</span>
              </h2>
              <p className={`${T.textSecondary} text-base sm:text-lg leading-relaxed mb-12 max-w-md`}>
                Every dish tells a story inspired by global culture, premium
                ingredients, and unforgettable fine dining moments.
              </p>

              {/* Feature list */}
              <div className="space-y-6 mb-12">
                {experiences.map((ex, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    className={`flex gap-5 p-5 ${T.cardBg} border ${T.borderSubtle} rounded-2xl hover:border-[#c8a050]/30 transition-colors duration-400`}
                  >
                    <span className="text-2xl flex-shrink-0">{ex.icon}</span>
                    <div>
                      <h4 className={`text-sm font-light tracking-wide mb-1`}>{ex.title}</h4>
                      <p className={`text-[13px] ${T.textMuted} leading-relaxed`}>{ex.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`border ${T.goldBorder} px-9 py-3.5 ${T.radiusBadge} text-[11px] tracking-[0.3em] uppercase ${T.goldHoverBg} hover:text-black transition-all duration-400`}
              >
                Reserve Experience
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
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2070&auto=format&fit=crop"
                alt="Dining experience"
                className={`${T.radiusCard} h-[480px] sm:h-[600px] w-full object-cover`}
              />
              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className={`absolute -bottom-6 -left-6 ${T.goldBg} text-black p-7 rounded-[1.5rem] shadow-2xl`}
              >
                <p className="text-4xl font-light leading-none">25+</p>
                <p className="uppercase tracking-[0.2em] text-[10px] mt-2 opacity-80">Global Flavors</p>
              </motion.div>

              {/* Second floating chip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className={`absolute top-6 -left-5 ${T.cardBg} border ${T.border} px-5 py-3 rounded-2xl backdrop-blur-sm`}
              >
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">Est.</p>
                <p className={`${T.gold} text-lg font-light`}>2012</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL STRIP ── */}
      <section className="py-20 px-5 sm:px-10 border-y border-white/[0.05]">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`text-5xl ${T.gold} opacity-20 ${T.serif} font-light mb-6 leading-none`}>"</div>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-xl sm:text-2xl font-light italic ${T.textSecondary} leading-relaxed mb-8 ${T.serif}`}
          >
            "Each course was a revelation — flavors that transported us somewhere entirely new, beautifully composed and masterfully executed."
          </motion.blockquote>
          <GoldLine className="w-16 mx-auto mb-5" />
          <p className={`text-[11px] tracking-[0.35em] uppercase ${T.textMuted}`}>Élodie Marchais · Paris, 2024</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 sm:py-40 px-5 text-center relative overflow-hidden">
        {/* Animated rings */}
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
          <Label>Reserve Your Seat</Label>
          <h2 className={`text-[clamp(2.8rem,9vw,6rem)] font-light leading-none mt-6 mb-8 ${T.serif}`}>
            Taste The<br />
            <span className={`italic ${T.gold}`}>World</span>
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
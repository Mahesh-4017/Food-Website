import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";

const courses = [
  {
    id: 1,
    number: "01",
    title: "Golden Truffle Soup",
    subtitle: "First Movement",
    desc: "Wild mushroom velouté with black truffle essence, topped with 24k gold leaf and chive oil.",
    pairing: "Chardonnay, Napa Valley",
    note: "Rich, buttery with notes of citrus and oak.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071",
    tag: "Liquid"
  },
  {
    id: 2,
    number: "02",
    title: "Smoked Salmon",
    subtitle: "Second Movement",
    desc: "Cold-smoked Atlantic salmon, citrus glaze, dill oil, and crispy capers on a bed of creme fraiche.",
    pairing: "Sauvignon Blanc, Marlborough",
    note: "Zesty and herbaceous with a mineral finish.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1974",
    tag: "Ocean"
  },
  {
    id: 3,
    number: "03",
    title: "Wagyu Experience",
    subtitle: "Third Movement",
    desc: "Japanese A5 Wagyu served with charcoal-grilled seasonal vegetables and a red wine reduction.",
    pairing: "Cabernet Sauvignon, Bordeaux",
    note: "Full-bodied with dark fruit and earthy tannins.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=2062",
    tag: "Earth"
  },
  {
    id: 4,
    number: "04",
    title: "Chocolate Sphere",
    subtitle: "Fourth Movement",
    desc: "A dark chocolate shell that melts under warm salted caramel to reveal a vanilla bean core.",
    pairing: "Vintage Port, Douro Valley",
    note: "Sweet dried fruit with velvety tannins and spice.",
    image: "https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?q=80&w=1974",
    tag: "Sweet"
  }
];

/* ─── Animated Counter ─── */
function Counter({ to, duration = 1.5 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (duration * 60);
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, to, duration]);
  return <span ref={ref}>{val}</span>;
}

/* ─── Magnetic Button ─── */
function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.3;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    setPos({ x, y });
  };
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}


/* ─── Reveal Text (char-by-char) ─── */
function RevealText({ text, className, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const chars = text.split("");
  return (
    <span ref={ref} className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Noise texture overlay ─── */
const NoiseOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[100] opacity-[0.025]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      backgroundSize: "128px"
    }}
  />
);

/* ─── Main Component ─── */
export default function TastingMenu() {
  const [expandedId, setExpandedId] = useState(null);
  const [activeNav, setActiveNav] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Navbar show on scroll
  useEffect(() => {
    const onScroll = () => setActiveNav(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#c8a050] selection:text-black overflow-x-hidden"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", }}>

      <NoiseOverlay />

      {/* ── FLOATING NAV ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={activeNav ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/5"
        style={{ backdropFilter: "blur(20px)", background: "rgba(5,5,5,0.85)" }}
      >
        <span className="text-[#c8a050] tracking-[0.4em] text-xs uppercase">Lumine</span>
        <div className="hidden md:flex gap-10">
          {["Menu", "Chef", "Reserve"].map(item => (
            <button key={item} className="text-white/50 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors duration-300">
              {item}
            </button>
          ))}
        </div>
        <div className="h-[1px] w-12 bg-[#c8a050]" />
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0 bg-cover bg-center"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://w0.peakpx.com/wallpaper/760/294/HD-wallpaper-republic-day-brunching-chennai-chefs-roll-out-dishes-from-every-indian-state-and-tri-coloured-dess-north-indian-food.jpg')", opacity: 0.45 }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/30 via-transparent to-[#050505]/30" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.6em" }}
            transition={{ duration: 2, delay: 0.2 }}
            className="block uppercase text-[#c8a050] mb-8 text-xs md:text-sm"
          >
            The Art of Gastronomy · Est. 2014
          </motion.span>

          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(4rem,12vw,9rem)] font-extralight leading-none tracking-tight"
            >
              LUMINE
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-12">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2rem,7vw,5rem)] font-light italic text-[#c8a050]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Tasting Experience
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="max-w-xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed italic mb-14"
          >
            "A sensory journey across continents, distilled into four movements."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex items-center justify-center gap-8 flex-wrap"
          >
            <MagneticButton className="bg-[#c8a050] text-black px-10 py-4 text-xs tracking-[0.3em] uppercase font-bold rounded-full hover:shadow-[0_0_40px_rgba(200,160,80,0.5)] transition-shadow duration-500">
              Reserve Tonight
            </MagneticButton>
            <button className="text-white/60 text-xs tracking-[0.25em] uppercase flex items-center gap-3 hover:text-white transition-colors">
              Explore Menu <span className="text-[#c8a050]">↓</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-[1px] h-14 bg-gradient-to-b from-[#c8a050] to-transparent"
          />
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-16 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="relative max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: 12, label: "Years of Excellence", suffix: "+" },
            { num: 4, label: "Michelin Stars", suffix: "★" },
            { num: 28, label: "Seasonal Dishes", suffix: "" },
            { num: 96, label: "Wine Selections", suffix: "+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col gap-1"
            >
              <div className="text-4xl md:text-5xl font-extralight text-[#c8a050]">
                <Counter to={stat.num} />{stat.suffix}
              </div>
              <div className="text-xs text-white/40 tracking-[0.2em] uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MENU SECTION ── */}
      <section className="py-32 px-6 md:px-16 lg:px-24 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
          <div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-[1px] w-20 bg-[#c8a050] mb-6 origin-left"
            />
            <h2 className="text-4xl md:text-6xl font-light leading-tight">
              Signature<br />
              <span className="text-[#c8a050] italic" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Progression
              </span>
            </h2>
          </div>
          <p className="text-white/30 max-w-xs text-xs tracking-[0.25em] uppercase leading-loose">
            Each dish is paired with a vintage selection to enhance the flavour notes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-28">
          {courses.map((item, i) => (
            <CourseCard key={item.id} item={item} i={i} expandedId={expandedId} setExpandedId={setExpandedId} />
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-6 border-y border-white/5 bg-[#0a0a0a]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap"
        >
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="text-xs tracking-[0.4em] uppercase text-white/20 flex items-center gap-16">
              Lumine Restaurant <span className="text-[#c8a050]">✦</span> Fine Dining <span className="text-[#c8a050]">✦</span> Seasonal Menu <span className="text-[#c8a050]">✦</span> Wine Pairing <span className="text-[#c8a050]">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── CHEF SECTION ── */}
      <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.03] -mr-64 pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/[0.03] -mr-32 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-0 items-center">
          <div className="md:col-span-7 z-10">
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#111] p-10 md:p-16 border border-white/5 shadow-2xl relative"
            >
              <div className="absolute top-8 right-8 text-[#c8a050]/10 text-8xl font-serif leading-none select-none">"</div>
              <span className="text-[#c8a050] tracking-widest text-xs uppercase">The Visionary</span>
              <h2 className="text-4xl md:text-6xl mt-4 mb-8 font-light italic leading-tight">
                Art of the<br />
                <span className="text-[#c8a050] not-italic" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Ingredient
                </span>
              </h2>
              <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 italic">
                "We do not just cook; we compose. Every plate is a balance of silence and sound, texture and colour — a meditation made edible."
              </p>

              {/* Chef detail row */}
              <div className="flex items-center gap-6 mb-10 border-t border-white/5 pt-8">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[#c8a050]/30">
                  <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=200" className="w-full h-full object-cover grayscale" alt="Chef" />
                </div>
                <div>
                  <p className="text-sm font-light">Chef Émile Renard</p>
                  <p className="text-xs text-white/40 tracking-[0.15em] uppercase">Executive Chef · Paris · Tokyo</p>
                </div>
              </div>

              <motion.button
                whileHover={{ gap: "20px" }}
                className="flex items-center gap-4 text-[#c8a050] tracking-[0.2em] uppercase text-xs transition-all duration-300"
              >
                The Philosophy
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >→</motion.span>
              </motion.button>
            </motion.div>
          </div>

          <div className="md:col-span-5 md:-ml-12 mt-10 md:mt-0">
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070"
                className="w-full h-[500px] md:h-[620px] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                alt="Chef at work"
              />
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-6 -left-6 bg-[#c8a050] text-black p-6 text-center"
              >
                <div className="text-3xl font-light">4</div>
                <div className="text-xs tracking-widest uppercase">Stars</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RESERVATION / FOOTER ── */}
      <footer className="py-40 text-center relative border-t border-white/5 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.025] pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#c8a050]/[0.06] pointer-events-none"
        />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent to-[#c8a050]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 px-6"
        >
          <p className="text-xs tracking-[0.5em] text-white/30 uppercase mb-8">Experience Awaits</p>
          <h2 className="text-5xl md:text-8xl font-light italic mb-6 leading-none"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Reserved<br />
            <span className="text-[#c8a050]">for You.</span>
          </h2>
          <p className="text-white/30 text-sm mb-16 tracking-widest uppercase">Tasting menus available Wednesday — Sunday</p>

          <MagneticButton className="bg-[#c8a050] text-black px-16 py-5 text-xs tracking-[0.3em] uppercase font-bold rounded-full hover:shadow-[0_0_50px_rgba(200,160,80,0.4)] transition-all duration-500 mb-20">
            Secure a Table
          </MagneticButton>

          <div className="flex justify-center gap-12 text-white/20 text-xs tracking-widest uppercase mt-4">
            <span>Instagram</span>
            <span className="text-[#c8a050]">·</span>
            <span>Reservations</span>
            <span className="text-[#c8a050]">·</span>
            <span>Private Events</span>
          </div>
          <p className="mt-12 text-white/10 text-xs tracking-[0.3em]">© 2026 LUMINE · ALL RIGHTS RESERVED</p>
        </motion.div>
      </footer>
    </div>
  );
}

/* ─── Course Card ─── */
function CourseCard({ item, i, expandedId, setExpandedId }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group ${i % 2 !== 0 ? "md:mt-28" : ""}`}
    >
      {/* Floating course number */}
      <motion.span
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: i * 0.12 + 0.3 }}
        className="absolute -top-5 -left-2 text-[#c8a050]/20 font-light select-none pointer-events-none"
        style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1 }}
      >
        {item.number}
      </motion.span>

      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: i * 0.12 + 0.4 }}
        className="absolute top-4 right-4 z-10 bg-black/50 border border-white/10 px-3 py-1 text-[10px] tracking-[0.25em] uppercase text-white/50"
        style={{ backdropFilter: "blur(10px)" }}
      >
        {item.tag}
      </motion.div>

      {/* Image */}
      <div
        className="relative aspect-[4/5] overflow-hidden mb-8"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.img
          src={item.image}
          alt={item.title}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />

        {/* Hover reveal subtitle */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-5 left-5 text-white/70 text-xs tracking-[0.25em] uppercase"
        >
          {item.subtitle}
        </motion.div>
      </div>

      {/* Text */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-light" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {item.title}
          </h3>
        </div>
        <motion.button
          onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
          animate={{ rotate: expandedId === item.id ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#c8a050] rounded-full pb-1 text-3xl w-9 h-9 flex items-center justify-center border border-[#c8a050]/30 hover:bg-[#c8a050]/10 transition-colors flex-shrink-0"
          aria-label="Expand details"
        >
          +
        </motion.button>
      </div>

      <p className="text-white/40 text-sm leading-relaxed italic mb-4 line-clamp-2">
        {item.desc}
      </p>

      {/* Gold separator line (animated) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: i * 0.12 + 0.5 }}
        className="h-[1px] bg-gradient-to-r from-[#c8a050]/50 to-transparent mb-4 origin-left"
      />

      {/* Expandable */}
      <AnimatePresence>
        {expandedId === item.id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-4">
              <div>
                <p className="text-[10px] tracking-[0.3em] text-[#c8a050]/60 uppercase mb-1">Sommelier's Pairing</p>
                <p className="text-white text-lg font-light italic">{item.pairing}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-1">Tasting Note</p>
                <p className="text-white/50 text-sm italic">{item.note}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
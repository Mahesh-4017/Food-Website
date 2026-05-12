import { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/* ── SVG brand icons ── */
const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const IconTwitter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l16 16M4 20 20 4" />
    <path d="M20 4h-5l-5 6-5-6H4l7.5 9L4 20h5l5-6 5 6h1l-7.5-9Z" />
  </svg>
);
const IconTiktok = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.55a8.16 8.16 0 0 0 4.77 1.52V7.64a4.85 4.85 0 0 1-1-.95z" />
  </svg>
);

/* ── Magnetic Button ── */
function MagneticLink({ children, href = "#" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="block text-[#8b8478] hover:text-[#e8d5b0] transition-colors duration-300 text-sm tracking-wide"
    >
      {children}
    </motion.a>
  );
}

/* ── Marquee ── */
function Marquee({ items, speed = 40, reverse = false }) {
  const count = 6;
  return (
    <div className="overflow-hidden whitespace-nowrap select-none">
      <motion.div
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="inline-flex gap-0"
      >
        {Array.from({ length: count }).map((_, i) =>
          items.map((item, j) => (
            <span
              key={`${i}-${j}`}
              className="inline-flex items-center gap-6 px-6 font-serif italic text-4xl md:text-5xl"
              style={{ color: i % 2 === 0 ? "#3a3027" : "#e8d5b0" }}
            >
              {item}
              <span className="inline-block w-2 h-2 rounded-full bg-[#c9a84c] mx-2" />
            </span>
          ))
        )}
      </motion.div>
    </div>
  );
}

/* ── Newsletter ── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
  };

  return (
    <div className="relative">
      <p
        className="text-[11px] uppercase tracking-[0.35em] mb-4"
        style={{ color: "#c9a84c" }}
      >
        Stay in the loop
      </p>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm"
            style={{ color: "#c9a84c" }}
          >
            ✓ You're on the list.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-stretch h-11 max-w-xs"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-b border-[#3a3027] focus:border-[#c9a84c] outline-none text-sm text-[#e8d5b0] placeholder:text-[#4a4035] flex-1 pr-3 transition-colors duration-300"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[10px] uppercase tracking-[0.3em] font-bold px-4 ml-2"
              style={{ background: "#c9a84c", color: "#1a140e", borderRadius: "2px" }}
            >
              Join
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Animated Counter ── */
function Counter({ to, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-5xl md:text-6xl" style={{ color: "#e8d5b0" }}>
        {count.toLocaleString()}
        <span style={{ color: "#c9a84c" }}>+</span>
      </div>
      <p className="text-[10px] uppercase tracking-[0.35em] mt-2" style={{ color: "#5a5045" }}>
        {label}
      </p>
    </div>
  );
}

/* ── Main Footer ── */
export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const NAV = [
    {
      title: "Taste",
      links: ["Seasonal Menu", "Tasting Menu", "Wine Cellar", "Cocktails", "Chef's Table"],
    },
    {
      title: "Visit",
      links: ["Reservations", "Hours & Location", "Private Dining", "Dress Code", "Gift Cards"],
    },
    {
      title: "House",
      links: ["Our Story", "The Team", "Philosophy", "Press", "Careers"],
    },
  ];

  const SOCIALS = [
    { Icon: IconInstagram, label: "Instagram" },
    { Icon: IconTwitter, label: "X / Twitter" },
    { Icon: IconTiktok, label: "TikTok" },
  ];

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#110d09", fontFamily: "'Georgia', serif" }}
    >
      {/* ── Thin gold rule top ── */}
      <div className="w-full h-px" style={{ background: "linear-gradient(90deg, transparent, #c9a84c 30%, #c9a84c 70%, transparent)" }} />

      {/* ── MARQUEE BAND ── */}
      <div
        className="py-6 border-b"
        style={{ borderColor: "#2a2018", background: "#0d0a06" }}
      >
        <Marquee
          items={["Reserve the Night", "Fire & Artistry", "Michelin ★★★", "Paris 2018"]}
          speed={50}
        />
      </div>

      {/* ── STATS ROW ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-3 border-b divide-x"
        style={{ borderColor: "#2a2018", divideColor: "#2a2018" }}
      >
        {[
          { to: 25000, label: "Guests Welcomed" },
          { to: 6, label: "Years of Excellence" },
          { to: 9, label: "Course Tasting Menu" },
        ].map((item) => (
          <div
            key={item.label}
            className="py-10 px-6"
            style={{ borderRight: "1px solid #2a2018" }}
          >
            <Counter {...item} />
          </div>
        ))}
      </motion.div>

      {/* ── MAIN BODY ── */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-16 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16">

          {/* LEFT — brand column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="flex flex-col justify-between gap-12"
          >
            {/* Logotype */}
            <div>
              <div
                className="text-[72px] leading-none tracking-[-0.04em] font-serif"
                style={{ color: "#e8d5b0" }}
              >
                LU<span style={{ color: "#c9a84c" }}>MI</span>NE
              </div>
              <p
                className="mt-4 text-sm leading-7 max-w-xs"
                style={{ fontFamily: "sans-serif", color: "#6b6055" }}
              >
                A cinematic dining experience built around fire, artistry, rare wines,
                and unforgettable evenings in the heart of Paris.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ y: -4, borderColor: "#c9a84c", color: "#c9a84c" }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    border: "1px solid #2e2518",
                    color: "#5a5045",
                    background: "transparent",
                  }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <Newsletter />

            {/* Award chips */}
            <div className="flex flex-wrap gap-2">
              {["★★★ Michelin", "#7 World's 50 Best", "19/20 Gault&Millau"].map((a) => (
                <span
                  key={a}
                  className="text-[10px] tracking-[0.25em] uppercase px-3 py-1.5"
                  style={{
                    border: "1px solid #2e2518",
                    color: "#8b7a60",
                    fontFamily: "sans-serif",
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — nav grid + contact */}
          <div>
            {/* Nav columns */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9 }}
              className="grid grid-cols-3 gap-8 border-b pb-12"
              style={{ borderColor: "#2a2018" }}
            >
              {NAV.map((col, ci) => (
                <div key={col.title}>
                  <p
                    className="text-[10px] uppercase tracking-[0.4em] mb-6"
                    style={{ color: "#c9a84c", fontFamily: "sans-serif" }}
                  >
                    {col.title}
                  </p>
                  <ul className="space-y-4">
                    {col.links.map((link, li) => (
                      <motion.li
                        key={link}
                        initial={{ opacity: 0, x: 12 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.05 * li + 0.1 * ci }}
                      >
                        <MagneticLink>{link}</MagneticLink>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* Contact row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10"
            >
              {[
                {
                  label: "Address",
                  value: "12 Rue de la Paix",
                  sub: "Paris, France",
                },
                {
                  label: "Hours",
                  value: "Tue – Sat",
                  sub: "7PM – 11PM",
                },
                {
                  label: "Contact",
                  value: "contact@lumine.fr",
                  sub: "+33 1 42 60 00 00",
                },
              ].map((item) => (
                <div key={item.label} className="group">
                  <p
                    className="text-[10px] uppercase tracking-[0.35em] mb-2"
                    style={{ color: "#5a5045", fontFamily: "sans-serif" }}
                  >
                    {item.label}
                  </p>
                  <p className="text-sm" style={{ color: "#b8a888" }}>
                    {item.value}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#5a5045", fontFamily: "sans-serif" }}>
                    {item.sub}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM MARQUEE — reverse ── */}
      <div
        className="mt-16 py-5 border-t border-b overflow-hidden"
        style={{ borderColor: "#2a2018", background: "#0d0a06" }}
      >
        <Marquee
          items={["Fine Dining", "Seasonal Harvest", "Rare Vintages", "Open Flame"]}
          speed={60}
          reverse
        />
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        className="mx-auto max-w-7xl px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ fontFamily: "sans-serif" }}
      >
        <p className="text-xs" style={{ color: "#3a3027" }}>
          © {new Date().getFullYear()} Lumine. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Legal", "Accessibility"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs transition-colors duration-300 hover:text-[#e8d5b0]"
              style={{ color: "#3a3027" }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
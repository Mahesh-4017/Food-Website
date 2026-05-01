import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ─── CONSTANTS ─── */
const PACKAGES = [
  {
    id: "soiree",
    name: "La Soirée",
    subtitle: "Intimate Gathering",
    guests: "8 – 14",
    price: "€220",
    per: "per person",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80",
    features: [
      "Private dining room with candlelight setting",
      "5-course curated tasting menu",
      "Sommelier-led wine pairing",
      "Personalised menu cards",
      "Dedicated service team of 3",
    ],
    accent: "#c8822a",
  },
  {
    id: "prestige",
    name: "Le Prestige",
    subtitle: "Signature Experience",
    guests: "15 – 30",
    price: "€310",
    per: "per person",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80",
    features: [
      "Exclusive use of the Grand Salon",
      "8-course chef's table menu",
      "Champagne & Caviar welcome reception",
      "Live classical string quartet",
      "Bespoke floral arrangement",
      "Personalised keepsake menus",
    ],
    accent: "#e8913a",
    featured: true,
  },
  {
    id: "royale",
    name: "Le Royale",
    subtitle: "Full Venue Buyout",
    guests: "30 – 80",
    price: "POA",
    per: "bespoke pricing",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=80",
    features: [
      "Complete venue exclusivity",
      "Fully bespoke menu designed with Chef",
      "Live cooking stations",
      "Premium spirits & rare wine cellar access",
      "Event coordinator & concierge team",
      "Branded menus & custom décor",
    ],
    accent: "#d4a060",
  },
];

const OCCASIONS = [
  { icon: "💍", label: "Proposals" },
  { icon: "🎂", label: "Birthdays" },
  { icon: "💼", label: "Corporate" },
  { icon: "🥂", label: "Anniversaries" },
  { icon: "🎓", label: "Graduations" },
  { icon: "🤝", label: "Client Events" },
];

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", span: "wide" },
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80", span: "tall" },
  { src: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80", span: "normal" },
  { src: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&q=80", span: "normal" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80", span: "wide" },
];

const TESTIMONIALS = [
  {
    text: "Lumine transformed our anniversary into an unforgettable chapter of our lives. Every detail — the candlelight, the bespoke menu, the music — was orchestrated to perfection.",
    author: "Isabelle & Marc D.",
    occasion: "25th Anniversary",
  },
  {
    text: "Our client dinner at Lumine secured the deal. The Le Prestige package created an environment of effortless luxury that words cannot fully capture.",
    author: "Thomas H.",
    occasion: "Corporate Dinner, JP Morgan",
  },
  {
    text: "He proposed over the final course and I said yes before the dessert arrived. Lumine's team knew before I did.",
    author: "Camille R.",
    occasion: "Engagement Evening",
  },
];

/* ─── HELPERS ─── */
function SectionEyebrow({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, justifyContent: "center" }}>
      <div style={{ width: 36, height: 0.5, background: "#e8913a" }} />
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 11, letterSpacing: "0.4em",
        textTransform: "uppercase", color: "#e8913a",
      }}>{children}</span>
      <div style={{ width: 36, height: 0.5, background: "#e8913a" }} />
    </div>
  );
}

function useReveal(margin = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView];
}

/* ─── HERO ─── */
function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Parallax BG */}
      <motion.div style={{
        position: "absolute", inset: "-15%",
        backgroundImage: "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1600&q=80')",
        backgroundSize: "cover", backgroundPosition: "center", y,
      }} />

      {/* Layered overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,4,2,0.55) 0%, rgba(5,4,2,0.25) 45%, rgba(5,4,2,0.75) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,4,2,0.6) 100%)" }} />

      {/* Grain overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.08,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        pointerEvents: "none",
      }} />

      {/* Decorative diagonal lines */}
      {[15, 35, 65, 85].map((x, i) => (
        <motion.div key={i}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.07, duration: 1.4 }}
          style={{
            position: "absolute", left: `${x}%`, top: 0, bottom: 0,
            width: 0.5, background: "rgba(232,145,58,0.07)",
            transformOrigin: "top",
          }}
        />
      ))}

      <motion.div
        style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", marginBottom: 32 }}
        >
          <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: "#e8913a" }}>
            Exclusively Yours
          </span>
          <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
        </motion.div>

        {/* Headline staggered reveal */}
        {["Private", "Dining"].map((word, i) => (
          <div key={word} style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.35 + i * 0.13, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(64px, 12vw, 144px)",
                fontWeight: 700, lineHeight: 0.95,
                color: i === 0 ? "#f5efe6" : "#e8913a",
                fontStyle: i === 1 ? "italic" : "normal",
                letterSpacing: i === 0 ? "-0.02em" : "0.01em",
                margin: 0,
              }}
            >
              {word}
            </motion.h1>
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(16px, 2.2vw, 21px)",
            color: "rgba(240,236,228,0.55)",
            maxWidth: 500, margin: "28px auto 48px",
            lineHeight: 1.75, letterSpacing: "0.02em",
          }}
        >
          Curated evenings for those who demand the extraordinary.
          An intimate world, entirely your own.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.a
            href="#packages"
            whileHover={{ scale: 1.04, background: "#f5a348" }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13, letterSpacing: "0.25em",
              textTransform: "uppercase", fontWeight: 700,
              color: "#0c0c0c", background: "#e8913a",
              border: "none", padding: "16px 44px",
              cursor: "pointer", textDecoration: "none",
              transition: "background 0.25s", display: "inline-block",
            }}
          >
            View Packages
          </motion.a>
          <motion.a
            href="#enquire"
            whileHover={{ scale: 1.04, borderColor: "#f5efe6", color: "#f5efe6" }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13, letterSpacing: "0.25em",
              textTransform: "uppercase", fontWeight: 600,
              color: "rgba(240,236,228,0.6)", background: "transparent",
              border: "0.5px solid rgba(240,236,228,0.25)",
              padding: "16px 44px", cursor: "pointer",
              textDecoration: "none", display: "inline-block",
              transition: "all 0.25s",
            }}
          >
            Enquire
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
      >
        <span style={{ fontFamily: "sans-serif", fontSize: 9, letterSpacing: "0.35em", color: "#4a3a2a", textTransform: "uppercase" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          style={{ width: 0.5, height: 44, background: "linear-gradient(to bottom, #e8913a, transparent)" }}
        />
      </motion.div>
    </section>
  );
}

/* ─── OCCASIONS STRIP ─── */
function OccasionsStrip() {
  const [ref, inView] = useReveal();
  return (
    <section ref={ref} style={{ background: "#0a0804", borderTop: "0.5px solid rgba(232,145,58,0.08)", borderBottom: "0.5px solid rgba(232,145,58,0.08)", padding: "32px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 20 }}>
        {OCCASIONS.map((o, i) => (
          <motion.div
            key={o.label}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            style={{ textAlign: "center" }}
          >
            <div style={{ fontSize: 26, marginBottom: 6 }}>{o.icon}</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 11, letterSpacing: "0.3em",
              textTransform: "uppercase", color: "#5a4a3a",
            }}>
              {o.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── INTRO SPLIT ─── */
function IntroSplit() {
  const [ref, inView] = useReveal();
  return (
    <section ref={ref} style={{ background: "#0a0804", padding: "120px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        {/* Image stack */}
        <div style={{ position: "relative" }}>
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80"
              alt="Private dining room"
              style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
            />
          </motion.div>
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.18, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "absolute", bottom: -36, right: -36, width: "52%",
              border: "8px solid #0a0804",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&q=80"
              alt="Table setting"
              style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }}
            />
          </motion.div>
          {/* Amber corner accent */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              position: "absolute", top: -16, left: -16,
              width: 80, height: 80,
              border: "0.5px solid rgba(232,145,58,0.4)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Text */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <SectionEyebrow>The Experience</SectionEyebrow>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700,
            color: "#f5efe6", lineHeight: 1.1, marginBottom: 24, textAlign: "left",
          }}>
            A Stage Set<br />
            <em style={{ color: "#e8913a", fontStyle: "italic" }}>Only for You</em>
          </h2>
          {[
            "Our private dining rooms are sanctuaries — spaces removed from the world, designed to make extraordinary occasions feel timeless.",
            "Each evening is curated from the first correspondence. Your guest list, dietary preferences, wine philosophy, and even preferred table configuration are discussed weeks in advance.",
            "On the evening itself, a dedicated team — your maître d', sommelier, and chef's liaison — ensures every moment flows with effortless precision.",
          ].map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.6 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 17, color: "#6a5a4a",
                lineHeight: 1.85, marginBottom: 16,
              }}
            >
              {p}
            </motion.p>
          ))}

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{
              display: "flex", gap: 0, marginTop: 36,
              borderTop: "0.5px solid rgba(232,145,58,0.12)", paddingTop: 28,
            }}
          >
            {[["500+", "Private Events"], ["12", "Dedicated Staff"], ["3", "Unique Rooms"]].map(([num, label], i, arr) => (
              <div key={label} style={{
                flex: 1, paddingRight: i < arr.length - 1 ? 24 : 0,
                borderRight: i < arr.length - 1 ? "0.5px solid rgba(232,145,58,0.1)" : "none",
                paddingLeft: i > 0 ? 24 : 0,
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: "#e8913a" }}>{num}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "#4a3a2a", letterSpacing: "0.08em", marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PACKAGES ─── */
function PackageCard({ pkg, index }) {
  const [ref, inView] = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.34, 1.1, 0.64, 1] }}
      whileHover="hover"
      style={{
        background: pkg.featured ? "rgba(232,145,58,0.04)" : "#141414",
        border: `0.5px solid ${pkg.featured ? "rgba(232,145,58,0.3)" : "rgba(255,255,255,0.05)"}`,
        borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column",
        position: "relative",
      }}
    >
      {pkg.featured && (
        <div style={{
          position: "absolute", top: 20, right: -28,
          background: "#e8913a", color: "#0c0c0c",
          fontFamily: "sans-serif", fontSize: 9, letterSpacing: "0.2em",
          textTransform: "uppercase", fontWeight: 700,
          padding: "5px 36px", transform: "rotate(45deg)",
          transformOrigin: "center", zIndex: 3,
        }}>
          Popular
        </div>
      )}

      {/* Image */}
      <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
        <motion.img
          src={pkg.image}
          alt={pkg.name}
          variants={{ hover: { scale: 1.07 } }}
          transition={{ duration: 0.65 }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,20,20,0.9) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#e8913a", marginBottom: 4 }}>
            {pkg.subtitle}
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#f5efe6" }}>
            {pkg.name}
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Guests + Price */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: "#4a3a2a", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3 }}>Guests</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#f5efe6" }}>{pkg.guests}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: pkg.accent }}>{pkg.price}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: "#4a3a2a", letterSpacing: "0.1em" }}>{pkg.per}</div>
          </div>
        </div>

        {/* Features */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {pkg.features.map(f => (
            <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ color: pkg.accent, fontSize: 12, marginTop: 3, flexShrink: 0 }}>✦</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#6a5a4a", lineHeight: 1.5 }}>{f}</span>
            </li>
          ))}
        </ul>

        <motion.a
          href="#enquire"
          whileHover={{ background: pkg.featured ? "#f5a348" : "rgba(232,145,58,0.15)", borderColor: pkg.accent }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "block", textAlign: "center",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 12, letterSpacing: "0.25em",
            textTransform: "uppercase", fontWeight: 700,
            color: pkg.featured ? "#0c0c0c" : "#e8913a",
            background: pkg.featured ? "#e8913a" : "transparent",
            border: `0.5px solid ${pkg.featured ? "#e8913a" : "rgba(232,145,58,0.25)"}`,
            padding: "13px 0", cursor: "pointer",
            textDecoration: "none", transition: "all 0.25s",
          }}
        >
          Enquire About This Package →
        </motion.a>
      </div>
    </motion.div>
  );
}

function Packages() {
  const [ref, inView] = useReveal();
  return (
    <section id="packages" ref={ref} style={{ background: "#0d0b07", padding: "100px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <SectionEyebrow>Our Packages</SectionEyebrow>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700,
            color: "#f5efe6", margin: 0, letterSpacing: "-0.02em",
          }}>
            Choose Your <em style={{ color: "#e8913a", fontStyle: "italic" }}>Occasion</em>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {PACKAGES.map((pkg, i) => <PackageCard key={pkg.id} pkg={pkg} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── GALLERY ─── */
function Gallery() {
  const [ref, inView] = useReveal();
  return (
    <section ref={ref} style={{ background: "#0a0804", padding: "100px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: "center", marginBottom: 52 }}
        >
          <SectionEyebrow>The Rooms</SectionEyebrow>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700,
            color: "#f5efe6", margin: 0,
          }}>
            Our <em style={{ color: "#e8913a", fontStyle: "italic" }}>Private Spaces</em>
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "auto auto",
          gap: 10,
        }}>
          {GALLERY.map((img, i) => {
            const colSpan = img.span === "wide" ? 4 : img.span === "tall" ? 2 : 2;
            const rowSpan = img.span === "tall" ? 2 : 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover="hover"
                style={{
                  gridColumn: `span ${colSpan}`,
                  gridRow: `span ${rowSpan}`,
                  overflow: "hidden",
                  borderRadius: 2,
                  aspectRatio: img.span === "tall" ? "3/4" : "16/9",
                }}
              >
                <motion.img
                  src={img.src}
                  alt=""
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.6 }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
function Testimonials() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useReveal();

  return (
    <section ref={ref} style={{ background: "#0d0b07", padding: "100px 40px", position: "relative", overflow: "hidden" }}>
      {/* Big ambient quote */}
      <div style={{
        position: "absolute", top: 20, left: 40,
        fontFamily: "'Playfair Display', serif", fontSize: 280,
        color: "rgba(232,145,58,0.03)", lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
      }}>"</div>

      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ marginBottom: 52 }}>
          <SectionEyebrow>Guest Stories</SectionEyebrow>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700,
            color: "#f5efe6", margin: 0,
          }}>
            Moments <em style={{ color: "#e8913a", fontStyle: "italic" }}>Remembered</em>
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(18px, 2.5vw, 24px)",
              color: "#8a7a6a", lineHeight: 1.75,
              fontStyle: "italic", marginBottom: 32,
            }}>
              "{TESTIMONIALS[active].text}"
            </p>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#f5efe6", marginBottom: 4 }}>
              {TESTIMONIALS[active].author}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", color: "#e8913a" }}>
              {TESTIMONIALS[active].occasion}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 40 }}>
          {TESTIMONIALS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.3 }}
              style={{
                width: i === active ? 28 : 6, height: 6,
                borderRadius: 3, border: "none",
                background: i === active ? "#e8913a" : "rgba(232,145,58,0.2)",
                cursor: "pointer", transition: "all 0.3s",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ENQUIRY FORM ─── */
function EnquiryForm() {
  const [ref, inView] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", occasion: "", guests: "", date: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const submit = (e) => { e.preventDefault(); if (form.name && form.email) setSent(true); };

  const inputStyle = {
    width: "100%", padding: "13px 16px",
    background: "rgba(255,255,255,0.03)",
    border: "0.5px solid rgba(232,145,58,0.12)",
    color: "#d0b890", fontFamily: "'Cormorant Garamond', serif",
    fontSize: 15, outline: "none", borderRadius: 2,
    transition: "border-color 0.2s",
  };

  const focusIn = (e) => e.target.style.borderColor = "rgba(232,145,58,0.45)";
  const focusOut = (e) => e.target.style.borderColor = "rgba(232,145,58,0.12)";

  return (
    <section id="enquire" ref={ref} style={{ background: "#0a0804", padding: "100px 40px 120px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: "center", marginBottom: 56 }}>
          <SectionEyebrow>Get in Touch</SectionEyebrow>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 700,
            color: "#f5efe6", margin: "0 0 14px",
          }}>
            Begin Your <em style={{ color: "#e8913a", fontStyle: "italic" }}>Enquiry</em>
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#4a3a2a", maxWidth: 460, margin: "0 auto" }}>
            Our private dining team will respond within 24 hours to begin crafting your evening.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: "center", padding: "64px 40px",
                background: "rgba(232,145,58,0.04)",
                border: "0.5px solid rgba(232,145,58,0.2)",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                style={{ fontSize: 48, marginBottom: 20 }}
              >
                ✦
              </motion.div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#e8913a", marginBottom: 12 }}>
                Enquiry Received
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: "#6a5a4a" }}>
                Our private dining team will be in touch within 24 hours.<br />We look forward to crafting your evening.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6 }}
              onSubmit={submit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#4a3a2a", display: "block", marginBottom: 8 }}>Full Name *</label>
                  <input style={inputStyle} value={form.name} onChange={e => handle("name", e.target.value)} onFocus={focusIn} onBlur={focusOut} required />
                </div>
                <div>
                  <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#4a3a2a", display: "block", marginBottom: 8 }}>Email Address *</label>
                  <input type="email" style={inputStyle} value={form.email} onChange={e => handle("email", e.target.value)} onFocus={focusIn} onBlur={focusOut} required />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#4a3a2a", display: "block", marginBottom: 8 }}>Occasion</label>
                  <select style={{ ...inputStyle, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%235a4a3a' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", appearance: "none" }}
                    value={form.occasion} onChange={e => handle("occasion", e.target.value)} onFocus={focusIn} onBlur={focusOut}
                  >
                    <option value="">Select…</option>
                    {OCCASIONS.map(o => <option key={o.label} value={o.label}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#4a3a2a", display: "block", marginBottom: 8 }}>No. of Guests</label>
                  <input type="number" min="2" max="80" placeholder="e.g. 12" style={inputStyle} value={form.guests} onChange={e => handle("guests", e.target.value)} onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div>
                  <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#4a3a2a", display: "block", marginBottom: 8 }}>Preferred Date</label>
                  <input type="date" style={{ ...inputStyle, colorScheme: "dark" }} value={form.date} onChange={e => handle("date", e.target.value)} onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>

              <div>
                <label style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#4a3a2a", display: "block", marginBottom: 8 }}>Your Vision</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about the occasion, any special requests, dietary requirements or themes you have in mind…"
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                  value={form.message}
                  onChange={e => handle("message", e.target.value)}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, background: "#f5a348" }}
                whileTap={{ scale: 0.98 }}
                style={{
                  alignSelf: "center",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 13, letterSpacing: "0.28em",
                  textTransform: "uppercase", fontWeight: 700,
                  color: "#0c0c0c", background: "#e8913a",
                  border: "none", padding: "16px 56px",
                  cursor: "pointer", marginTop: 8,
                  transition: "background 0.25s",
                }}
              >
                Send Enquiry
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── MAIN EXPORT ─── */
const Private = () => {
  return (
    <div style={{ background: "#0a0804", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0804; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.3) sepia(1) saturate(2) hue-rotate(10deg); opacity: 0.5; }
        input::placeholder, textarea::placeholder { color: #2a1a0a; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0804; }
        ::-webkit-scrollbar-thumb { background: rgba(232,145,58,0.25); border-radius: 2px; }
        @media (max-width: 768px) {
          .split-grid { grid-template-columns: 1fr !important; }
          .pkg-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Hero />
      <OccasionsStrip />
      <IntroSplit />
      <Packages />
      <Gallery />
      <Testimonials />
      <EnquiryForm />
    </div>
  );
};

export default Private;
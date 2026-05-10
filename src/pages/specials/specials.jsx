import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";

// ─── Data ───────────────────────────────────────────────────────────────────

const chefSpecials = [
  {
    id: 1,
    number: "01",
    name: "Seared Scallops",
    subtitle: "cauliflower velouté · black truffle · hazelnut soil",
    chef: "Chef Antoine Moreau",
    tag: "Signature",
    price: "£38",
    available: 6,
    bg: "#1a0e08",
    accent: "#d4956a",
  },
  {
    id: 2,
    number: "02",
    name: "Wagyu Tenderloin",
    subtitle: "aged 45 days · bone marrow butter · morel jus",
    chef: "Chef Antoine Moreau",
    tag: "Chef's Pick",
    price: "£72",
    available: 4,
    bg: "#0d1208",
    accent: "#7ab87a",
  },
  {
    id: 3,
    number: "03",
    name: "Lobster Bisque",
    subtitle: "cognac cream · coral oil · brioche croutons",
    chef: "Chef Isabelle Chen",
    tag: "Seasonal",
    price: "£28",
    available: 8,
    bg: "#0f0a14",
    accent: "#a07ad4",
  },
  {
    id: 4,
    number: "04",
    name: "Truffle Risotto",
    subtitle: "périgord truffle · aged parmesan · chive oil",
    chef: "Chef Isabelle Chen",
    tag: "Vegetarian",
    price: "£32",
    available: 10,
    bg: "#0e0e0a",
    accent: "#c8a050",
  },
];

const cocktailSpecials = [
  {
    id: 1,
    name: "Midnight Garden",
    base: "Hendrick's gin · elderflower · cucumber mist · activated charcoal",
    glass: "Coupe",
    price: "£18",
    tag: "New",
    color: "#4a7fa0",
  },
  {
    id: 2,
    name: "Ember & Smoke",
    base: "Mezcal · smoked maple · cardamom bitters · orange peel",
    glass: "Rocks",
    price: "£16",
    tag: "Bar Favourite",
    color: "#c8a050",
  },
  {
    id: 3,
    name: "La Rose Noire",
    base: "Champagne · blackberry shrub · rose water · gold leaf",
    glass: "Flute",
    price: "£22",
    tag: "Seasonal",
    color: "#b06090",
  },
];

const tastingCourses = [
  { num: "I", name: "Amuse-Bouche", desc: "Chef's welcome bite" },
  { num: "II", name: "Cold Starter", desc: "Oscietra caviar · crème fraîche" },
  { num: "III", name: "Warm Starter", desc: "Foie gras torchon · brioche" },
  { num: "IV", name: "Fish Course", desc: "Turbot · beurre blanc · samphire" },
  { num: "V", name: "Pre-Main Sorbet", desc: "Champagne & yuzu palate cleanser" },
  { num: "VI", name: "Main Course", desc: "Venison · celeriac · game jus" },
  { num: "VII", name: "Cheese Course", desc: "Affinage selection · honeycomb" },
  { num: "VIII", name: "Dessert", desc: "Valrhona chocolate sphere · praline" },
  { num: "IX", name: "Mignardises", desc: "Petit fours with coffee" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Divider({ label }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 20,
      margin: "0 0 56px",
    }}>
      <div style={{ flex: 1, height: 1, background: "rgba(200,160,80,0.15)" }} />
      <span style={{
        fontSize: 10, letterSpacing: "0.35em", color: "#c8a050",
        textTransform: "uppercase", fontFamily: "var(--font-serif, 'Cormorant Garamond', Georgia, serif)",
        whiteSpace: "nowrap",
      }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(200,160,80,0.15)" }} />
    </div>
  );
}

function Countdown() {
  const getTimeLeft = () => {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 0, 0, 0);
    const diff = end - now;
    if (diff <= 0) return { h: "00", m: "00", s: "00" };
    const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    return { h, m, s };
  };
  const [time, setTime] = useState(getTimeLeft());
  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      background: "rgba(200,160,80,0.06)",
      border: "1px solid rgba(200,160,80,0.18)",
      borderRadius: 10, padding: "10px 18px",
    }}>
      <span style={{ fontSize: 10, color: "#887a68", letterSpacing: "0.15em", textTransform: "uppercase", marginRight: 6 }}>
        Available until
      </span>
      {[time.h, time.m, time.s].map((unit, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={unit}
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 22, fontWeight: 300,
                color: "#c8a050", lineHeight: 1, minWidth: 28, textAlign: "center",
              }}
            >
              {unit}
            </motion.span>
          </AnimatePresence>
          {i < 2 && <span style={{ color: "rgba(200,160,80,0.4)", fontSize: 18 }}>:</span>}
        </span>
      ))}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function Specials() {
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredDish, setHoveredDish] = useState(null);

  const tabs = ["all", "food", "cocktails", "tasting"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080603",
      color: "#f0e8d8",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      paddingTop: 100,
      overflowX: "hidden",
    }}>

      {/* ── Hero ── */}
      <section style={{ padding: "60px 48px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{
            fontSize: 10, letterSpacing: "0.4em", color: "#c8a050",
            textTransform: "uppercase", marginBottom: 20,
          }}>
            ✦ &nbsp; Today's Specials &nbsp; ✦
          </p>
          <h1 style={{
            fontSize: "clamp(52px, 8vw, 110px)",
            fontWeight: 300, lineHeight: 0.9,
            letterSpacing: "-0.01em",
            color: "#f0e8d8",
            marginBottom: 32,
          }}>
            What's<br />
            <em style={{ color: "#c8a050", fontStyle: "italic" }}>Exceptional</em><br />
            Tonight
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <Countdown />
            <p style={{ fontSize: 14, color: "#887a68", maxWidth: 320, lineHeight: 1.7 }}>
              Our kitchen team curates a new selection each morning. These dishes exist only for today.
            </p>
          </div>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            background: "linear-gradient(to right, rgba(200,160,80,0.5), rgba(200,160,80,0.05))",
            marginTop: 56,
            transformOrigin: "left",
          }}
        />
      </section>

      {/* ── Filter Tabs ── */}
      <section style={{ padding: "0 48px 64px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? "rgba(200,160,80,0.12)" : "transparent",
                  border: `1px solid ${activeTab === tab ? "rgba(200,160,80,0.5)" : "rgba(200,160,80,0.12)"}`,
                  borderRadius: 8,
                  padding: "9px 22px",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: activeTab === tab ? "#c8a050" : "#6a5f50",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                {tab === "all" ? "All Specials" : tab === "food" ? "Chef's Dishes" : tab === "cocktails" ? "Bar Specials" : "Tasting Menu"}
              </button>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Chef Specials ── */}
      <AnimatePresence>
        {(activeTab === "all" || activeTab === "food") && (
          <motion.section
            key="food"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ padding: "0 48px 100px", maxWidth: 1200, margin: "0 auto" }}
          >
            <FadeIn>
              <Divider label="Chef's Creations" />
            </FadeIn>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 2,
            }}>
              {chefSpecials.map((dish, i) => (
                <FadeIn key={dish.id} delay={i * 0.08}>
                  <motion.div
                    onHoverStart={() => setHoveredDish(dish.id)}
                    onHoverEnd={() => setHoveredDish(null)}
                    style={{
                      background: dish.bg,
                      border: `1px solid ${hoveredDish === dish.id ? `${dish.accent}40` : "rgba(255,255,255,0.04)"}`,
                      borderRadius: 18,
                      padding: "36px 28px",
                      cursor: "pointer",
                      transition: "border-color 0.3s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Background number watermark */}
                    <div style={{
                      position: "absolute", top: -10, right: 16,
                      fontSize: 120, fontWeight: 300,
                      color: `${dish.accent}08`,
                      lineHeight: 1, userSelect: "none",
                      transition: "color 0.3s",
                    }}>
                      {dish.number}
                    </div>

                    <div style={{ position: "relative" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                        <span style={{
                          fontSize: 9, letterSpacing: "0.25em",
                          color: dish.accent, textTransform: "uppercase",
                          background: `${dish.accent}15`,
                          padding: "4px 10px", borderRadius: 20,
                        }}>
                          {dish.tag}
                        </span>
                        <span style={{ fontSize: 22, fontWeight: 300, color: dish.accent }}>
                          {dish.price}
                        </span>
                      </div>

                      <h3 style={{ fontSize: 28, fontWeight: 300, letterSpacing: "0.02em", marginBottom: 10, color: "#f0e8d8" }}>
                        {dish.name}
                      </h3>
                      <p style={{ fontSize: 13, color: "#7a6e60", lineHeight: 1.6, marginBottom: 28 }}>
                        {dish.subtitle}
                      </p>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "#5a5040", letterSpacing: "0.05em" }}>
                          {dish.chef}
                        </span>
                        <span style={{
                          fontSize: 10, color: dish.available <= 4 ? "#c87050" : "#6a8060",
                          letterSpacing: "0.1em",
                        }}>
                          {dish.available} left
                        </span>
                      </div>
                    </div>

                    {/* Hover accent line */}
                    <motion.div
                      animate={{ scaleX: hoveredDish === dish.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        height: 2, background: dish.accent,
                        transformOrigin: "left",
                      }}
                    />
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Cocktail Specials ── */}
      <AnimatePresence>
        {(activeTab === "all" || activeTab === "cocktails") && (
          <motion.section
            key="cocktails"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ padding: "0 48px 100px", maxWidth: 1200, margin: "0 auto" }}
          >
            <FadeIn>
              <Divider label="Bar Specials" />
            </FadeIn>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
              {cocktailSpecials.map((c, i) => (
                <FadeIn key={c.id} delay={i * 0.1}>
                  <div style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 20,
                    overflow: "hidden",
                  }}>
                    {/* Colour band */}
                    <div style={{
                      height: 120,
                      background: `radial-gradient(ellipse at 30% 60%, ${c.color}30 0%, transparent 70%), #0e0b08`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative",
                    }}>
                      {/* Glass silhouette */}
                      <svg width="44" height="64" viewBox="0 0 44 64" fill="none">
                        <path d="M6 4 L22 36 L38 4 Z" stroke={c.color} strokeWidth="1.2" strokeLinejoin="round" fill={`${c.color}10`} />
                        <line x1="22" y1="36" x2="22" y2="54" stroke={c.color} strokeWidth="1.2" />
                        <line x1="14" y1="54" x2="30" y2="54" stroke={c.color} strokeWidth="1.2" />
                      </svg>
                      <div style={{
                        position: "absolute", top: 12, right: 14,
                        fontSize: 9, letterSpacing: "0.2em", color: c.color,
                        textTransform: "uppercase",
                        background: `${c.color}18`,
                        padding: "3px 10px", borderRadius: 20,
                      }}>
                        {c.tag}
                      </div>
                    </div>

                    <div style={{ padding: "22px 22px 24px", background: "#0e0b08" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 300, color: "#f0e8d8" }}>{c.name}</h3>
                        <span style={{ fontSize: 18, fontWeight: 300, color: c.color }}>{c.price}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "#6a5f50", lineHeight: 1.65, marginBottom: 16 }}>{c.base}</p>
                      <span style={{ fontSize: 10, color: "#4a4035", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                        {c.glass} glass
                      </span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Tasting Menu ── */}
      <AnimatePresence>
        {(activeTab === "all" || activeTab === "tasting") && (
          <motion.section
            key="tasting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ padding: "0 48px 120px", maxWidth: 1200, margin: "0 auto" }}
          >
            <FadeIn>
              <Divider label="Seasonal Tasting Menu" />
            </FadeIn>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
              {/* Course list */}
              <div>
                {tastingCourses.map((course, i) => (
                  <FadeIn key={course.num} delay={i * 0.06}>
                    <motion.div
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 20,
                        padding: "18px 0",
                        borderBottom: "1px solid rgba(200,160,80,0.07)",
                        cursor: "default",
                      }}
                    >
                      <span style={{
                        fontSize: 11, color: "#c8a050", fontStyle: "italic",
                        minWidth: 28, paddingTop: 2,
                      }}>
                        {course.num}
                      </span>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 400, color: "#e8dece", marginBottom: 3 }}>
                          {course.name}
                        </div>
                        <div style={{ fontSize: 12, color: "#6a5f50" }}>{course.desc}</div>
                      </div>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>

              {/* Info card */}
              <FadeIn delay={0.3}>
                <div style={{
                  position: "sticky", top: 120,
                  background: "#0e0b07",
                  border: "1px solid rgba(200,160,80,0.15)",
                  borderRadius: 22, padding: "40px 36px",
                }}>
                  <p style={{ fontSize: 10, letterSpacing: "0.35em", color: "#c8a050", textTransform: "uppercase", marginBottom: 16 }}>
                    Nine Courses
                  </p>
                  <h3 style={{ fontSize: 36, fontWeight: 300, lineHeight: 1.1, marginBottom: 20, color: "#f0e8d8" }}>
                    The Full<br /><em style={{ fontStyle: "italic", color: "#c8a050" }}>LUMINE</em><br />Experience
                  </h3>
                  <p style={{ fontSize: 14, color: "#6a5f50", lineHeight: 1.8, marginBottom: 32 }}>
                    A journey through the season's finest ingredients, crafted by our team and paired with wines selected by our sommelier.
                  </p>

                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    padding: "18px 0", borderTop: "1px solid rgba(200,160,80,0.1)",
                    borderBottom: "1px solid rgba(200,160,80,0.1)", marginBottom: 28,
                  }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#5a5040", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Per person</div>
                      <div style={{ fontSize: 32, fontWeight: 300, color: "#c8a050" }}>£145</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 10, color: "#5a5040", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>With wine</div>
                      <div style={{ fontSize: 32, fontWeight: 300, color: "#c8a050" }}>£220</div>
                    </div>
                  </div>

                  <Link
                    to="/book"
                    style={{
                      display: "block", textAlign: "center",
                      padding: "15px",
                      background: "rgba(200,160,80,0.1)",
                      border: "1px solid rgba(200,160,80,0.35)",
                      borderRadius: 10,
                      color: "#c8a050",
                      textDecoration: "none",
                      fontSize: 11, letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "rgba(200,160,80,0.18)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "rgba(200,160,80,0.1)"}
                  >
                    Reserve Your Table
                  </Link>

                  <p style={{ fontSize: 11, color: "#3a3028", textAlign: "center", marginTop: 14, letterSpacing: "0.05em" }}>
                    Available Tue – Sat · From 7pm
                  </p>
                </div>
              </FadeIn>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Bottom CTA ── */}
      <FadeIn>
        <section style={{
          textAlign: "center",
          padding: "60px 48px 100px",
          borderTop: "1px solid rgba(200,160,80,0.08)",
        }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", color: "#c8a050", textTransform: "uppercase", marginBottom: 16 }}>
            Join us this evening
          </p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 300, marginBottom: 32, color: "#f0e8d8" }}>
            Every dish tells a story.<br />
            <em style={{ fontStyle: "italic", color: "#c8a050" }}>Come hear yours.</em>
          </h2>
          <Link
            to="/book"
            style={{
              display: "inline-block",
              padding: "14px 40px",
              background: "rgba(200,160,80,0.1)",
              border: "1px solid rgba(200,160,80,0.4)",
              borderRadius: 10,
              color: "#c8a050",
              textDecoration: "none",
              fontSize: 11, letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Book a Table
          </Link>
        </section>
      </FadeIn>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import VideoPlayer from "../../../components/VideoPlayer";
import Breadcrumbs from "../../../components/Breadcrumbs";

export default function CocktailDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("ingredients");

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  useEffect(() => {
    setLoading(true);
    setDrink(null);
    setImgLoaded(false);
    async function fetchDrink() {
      try {
        const res = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setDrink(data.drinks?.[0] ?? null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDrink();
  }, [id]);

  const ingredients = [];
  if (drink) {
    for (let i = 1; i <= 15; i++) {
      const name = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];
      if (name?.trim()) ingredients.push({ name: name.trim(), measure: measure?.trim() || "" });
    }
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#080608", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{GLOBAL_CSS}</style>
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          style={{ textAlign: "center" }}
        >
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            border: "1px solid rgba(196,140,80,0.2)",
            borderTop: "1px solid #c48c50",
            margin: "0 auto 20px",
            animation: "spin 1s linear infinite",
          }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, letterSpacing: "0.3em", color: "#4a3a2a", textTransform: "uppercase" }}>
            Preparing your cocktail
          </p>
        </motion.div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ── Not found ── */
  if (!drink) {
    return (
      <div style={{ minHeight: "100vh", background: "#080608", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <style>{GLOBAL_CSS}</style>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#f0ece4" }}>Cocktail Not Found</p>
        <BackButton onClick={() => navigate(-1)} />
      </div>
    );
  }

  const isAlcoholic = drink.strAlcoholic === "Alcoholic";
  const tags = drink.strTags?.split(",").map(t => t.trim()).filter(Boolean) || [];
  

  return (
    <div style={{ minHeight: "100vh",padding:"4%", background: "#080608", overflowX: "hidden" }}>
      <style>{GLOBAL_CSS}</style>
      <Breadcrumbs />
      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        {/* Parallax image */}
        <motion.div style={{
          position: "absolute", inset: "-15%",
          backgroundImage: `url(${drink.strDrinkThumb})`,
          backgroundSize: "cover", backgroundPosition: "center",
          y: heroY,
          filter: imgLoaded ? "none" : "blur(20px)",
          transition: "filter 0.6s",
        }}>
          {/* Preload trigger */}
          <img src={drink.strDrinkThumb} alt="" onLoad={() => setImgLoaded(true)} style={{ display: "none" }} />
        </motion.div>

        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,6,8,0.3) 0%, rgba(8,6,8,0.15) 35%, rgba(8,6,8,0.9) 80%, #080608 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 40%, transparent, rgba(8,6,8,0.5))" }} />

        {/* Grain */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: GRAIN_SVG, pointerEvents: "none" }} />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{ position: "absolute", top: 28, left: 32, zIndex: 10 }}
        >
          <BackButton onClick={() => navigate(-1)} />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ position: "relative", zIndex: 2, width: "100%", padding: "0 48px 72px", opacity: heroOpacity }}
        >
          {/* Category pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}
          >
            <Pill label={drink.strCategory} color="#c48c50" />
            <Pill label={drink.strAlcoholic} color={isAlcoholic ? "#a06040" : "#4a8060"} />
            {tags.map(t => <Pill key={t} label={t} color="#4a3a5a" />)}
          </motion.div>

          {/* Name */}
          <div style={{ overflow: "hidden", marginBottom: 8 }}>
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(48px, 8vw, 108px)",
                fontWeight: 700, lineHeight: 0.95,
                color: "#f0ece4", letterSpacing: "-0.02em", margin: 0,
              }}
            >
              {drink.strDrink}
            </motion.h1>
          </div>

          {/* Glass */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 16, letterSpacing: "0.2em",
              color: "#6a5a4a", textTransform: "uppercase",
              display: "flex", alignItems: "center", gap: 10,
            }}
          >
            <span style={{ fontSize: 18 }}>🥃</span>
            {drink.strGlass}
          </motion.p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ position: "absolute", bottom: 28, right: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          <span style={{ fontFamily: "sans-serif", fontSize: 9, letterSpacing: "0.3em", color: "#3a2a1a", textTransform: "uppercase" }}>scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 0.5, height: 40, background: "linear-gradient(to bottom, #c48c50, transparent)" }} />
        </motion.div>
      </section>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 40px 100px" }}>

        {/* ── INGREDIENT COUNT STATS ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex", gap: 0,
            borderTop: "0.5px solid rgba(196,140,80,0.12)",
            borderBottom: "0.5px solid rgba(196,140,80,0.12)",
            marginBottom: 72, padding: "28px 0",
          }}
        >
          {[
            { num: ingredients.length, label: "Ingredients" },
            { num: drink.strCategory, label: "Category" },
            { num: drink.strGlass, label: "Glassware" },
            { num: isAlcoholic ? "Yes" : "No", label: "Alcoholic" },
          ].map((s, i, arr) => (
            <div key={s.label} style={{
              flex: 1, textAlign: "center",
              borderRight: i < arr.length - 1 ? "0.5px solid rgba(196,140,80,0.08)" : "none",
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: typeof s.num === "number" ? 36 : 20, fontWeight: 700, color: "#c48c50", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#3a2a1a", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── TABS ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ display: "flex", gap: 0, borderBottom: "0.5px solid rgba(196,140,80,0.1)", marginBottom: 48 }}
        >
          {["ingredients", "instructions", "video"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13, letterSpacing: "0.2em",
                textTransform: "uppercase", fontWeight: activeTab === tab ? 600 : 400,
                color: activeTab === tab ? "#c48c50" : "#3a2a1a",
                background: "none", border: "none",
                borderBottom: activeTab === tab ? "1px solid #c48c50" : "1px solid transparent",
                padding: "10px 28px", cursor: "pointer",
                marginBottom: -0.5, transition: "all 0.25s",
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ── INGREDIENTS TAB ── */}
          {activeTab === "ingredients" && (
            <motion.div
              key="ingredients"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 12,
              }}>
                {ingredients.map((ing, i) => (
                  <motion.div
                    key={ing.name}
                    initial={{ opacity: 0, y: 16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    whileHover={{ borderColor: "rgba(196,140,80,0.4)", y: -2 }}
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "0.5px solid rgba(196,140,80,0.1)",
                      borderRadius: 4, padding: "16px 18px",
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", gap: 12,
                      transition: "border-color 0.2s, transform 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <img
                        src={`https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(ing.name)}-Small.png`}
                        alt={ing.name}
                        style={{ width: 36, height: 36, objectFit: "contain", opacity: 0.85 }}
                        onError={e => { e.target.style.display = "none"; }}
                      />
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 15, fontWeight: 500, color: "#d0b890",
                      }}>
                        {ing.name}
                      </span>
                    </div>
                    {ing.measure && (
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 12, color: "#4a3a2a",
                        whiteSpace: "nowrap", letterSpacing: "0.05em",
                      }}>
                        {ing.measure}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── INSTRUCTIONS TAB ── */}
          {activeTab === "instructions" && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
              style={{ maxWidth: 720 }}
            >
              {drink.strInstructions
                ?.split(/(?<=[.!?])\s+/)
                .filter(s => s.trim().length > 10)
                .map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    style={{
                      display: "flex", gap: 20, alignItems: "flex-start",
                      marginBottom: 24, paddingBottom: 24,
                      borderBottom: "0.5px solid rgba(196,140,80,0.06)",
                    }}
                  >
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 28, fontWeight: 700,
                      color: "rgba(196,140,80,0.2)",
                      lineHeight: 1, flexShrink: 0, width: 36,
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 18, color: "#7a6a58",
                      lineHeight: 1.8, margin: 0,
                    }}>
                      {step.trim()}
                    </p>
                  </motion.div>
                ))}
            </motion.div>
          )}

          {/* ── VIDEO TAB ── */}
          {activeTab === "video" && (
            <motion.div
              key="video"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
            >
              {drink.strVideo ? (
                <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: 4, overflow: "hidden", background: "#111" }}>
                  <VideoPlayer url={drink.strVideo} />
                </div>
              ) : (
                <div style={{
                  border: "0.5px solid rgba(196,140,80,0.1)",
                  borderRadius: 4, padding: "60px 0",
                  textAlign: "center",
                }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#3a2a1a" }}>
                    No video available for this cocktail
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── FULL-WIDTH IMAGE FEATURE ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: 80, position: "relative", overflow: "hidden", borderRadius: 4 }}
        >
          <img
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            style={{ width: "100%", height: 420, objectFit: "cover", display: "block", filter: "brightness(0.5)" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(8,6,8,0.85) 0%, transparent 60%)",
            display: "flex", alignItems: "center", padding: "0 56px",
          }}>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.4em", textTransform: "uppercase", color: "#c48c50", marginBottom: 12 }}>
                The {drink.strCategory}
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700, color: "#f0ece4", margin: "0 0 20px", lineHeight: 1.05 }}>
                {drink.strDrink}
              </h2>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {tags.map(t => <Pill key={t} label={t} color="#c48c50" />)}
                <Pill label={drink.strAlcoholic} color={isAlcoholic ? "#a06040" : "#4a8060"} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── SOURCE LINK ── */}
        {drink.strSource && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginTop: 64 }}
          >
            <motion.a
              href={drink.strSource}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, color: "#c48c50" }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13, letterSpacing: "0.25em",
                textTransform: "uppercase", color: "#3a2a1a",
                textDecoration: "none", display: "inline-flex",
                alignItems: "center", gap: 10, transition: "color 0.2s",
              }}
            >
              View Original Recipe
              <svg width="36" height="8" viewBox="0 0 36 8" fill="none">
                <line x1="0" y1="4" x2="32" y2="4" stroke="currentColor" strokeWidth="0.5" />
                <path d="M30 1 L34 4 L30 7" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </svg>
            </motion.a>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */
function BackButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, borderColor: "rgba(196,140,80,0.5)" }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "rgba(8,6,8,0.7)", backdropFilter: "blur(12px)",
        border: "0.5px solid rgba(240,236,228,0.1)", color: "#d0b890",
        padding: "9px 18px", borderRadius: 24,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 13, letterSpacing: "0.1em", cursor: "pointer",
        transition: "border-color 0.25s",
      }}
    >
      ← Back
    </motion.button>
  );
}

function Pill({ label, color }) {
  return (
    <span style={{
      fontFamily: "sans-serif", fontSize: 10,
      letterSpacing: "0.15em", textTransform: "uppercase",
      padding: "4px 12px", borderRadius: 20, fontWeight: 500,
      background: `${color}18`, border: `0.5px solid ${color}55`,
      color: color,
    }}>
      {label}
    </span>
  );
}

/* ─── Styles ─── */
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:wght@400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080608; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #080608; }
  ::-webkit-scrollbar-thumb { background: rgba(196,140,80,0.25); border-radius: 2px; }
  ::selection { background: rgba(196,140,80,0.2); color: #f0ece4; }
`;
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getRandomMeal } from "@/services/mealApi";
import Breadcrumbs from "@/components/Breadcrumbs";

const ACCENT = "#e8913a";
const BG = "#080808";

/* ── Ingredient pill list ── */
function Ingredients({ meal }) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) ingredients.push({ ing, measure: measure?.trim() || "" });
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
      {ingredients.slice(0, 10).map(({ ing, measure }) => (
        <span
          key={ing}
          style={{
            background: "rgba(232,145,58,0.08)",
            border: "1px solid rgba(232,145,58,0.18)",
            color: "#b87a42",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 11,
            letterSpacing: 2,
            padding: "5px 10px",
            borderRadius: 2,
            textTransform: "uppercase",
          }}
        >
          {measure && <span style={{ color: ACCENT }}>{measure} </span>}
          {ing}
        </span>
      ))}
      {ingredients.length > 10 && (
        <span
          style={{
            color: "#3a3028",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 11,
            letterSpacing: 2,
            padding: "5px 4px",
          }}
        >
          +{ingredients.length - 10} MORE
        </span>
      )}
    </div>
  );
}

/* ── Skeleton ── */
function Skeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "clamp(200px, 38%, 480px) 1fr",
        gap: "clamp(24px, 4vw, 56px)",
        alignItems: "start",
      }}
    >
      <motion.div
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ aspectRatio: "1/1", borderRadius: 6, background: "#111" }}
      />
      <div style={{ paddingTop: 8, display: "flex", flexDirection: "column", gap: 14 }}>
        {[80, 40, 100, 100, 60].map((w, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.12 }}
            style={{
              height: i === 0 ? 44 : i === 1 ? 18 : 14,
              width: `${w}%`,
              borderRadius: 3,
              background: "#111",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function RandomMealPage() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();

  const fetchRandom = async (isRefresh = false) => {
    if (isRefresh) setSpinning(true);
    setLoading(true);
    try {
      const data = await getRandomMeal();
      setMeal(data);
    } catch (err) {
      console.error("Failed to fetch random meal", err);
    } finally {
      setLoading(false);
      setSpinning(false);
    }
  };

  useEffect(() => { fetchRandom(); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        body { background: ${BG}; margin: 0; }
        * { box-sizing: border-box; }
        .btn-primary { transition: opacity 0.2s, transform 0.15s; }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-primary:active { transform: scale(0.97); }
        .btn-ghost { transition: border-color 0.2s, color 0.2s, transform 0.15s; }
        .btn-ghost:hover { border-color: rgba(232,145,58,0.4) !important; color: ${ACCENT} !important; transform: translateY(-1px); }
        .btn-ghost:active { transform: scale(0.97); }
        @media (max-width: 640px) {
          .meal-grid { grid-template-columns: 1fr !important; }
          .meal-image { max-width: 100% !important; width: 100% !important; aspect-ratio: 4/3 !important; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          minHeight: "100vh",
          background: BG,
          padding: "clamp(24px, 5vw, 50px) clamp(16px, 4vw, 40px) 80px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Breadcrumbs />

          {/* ── Header ── */}
          <div style={{ marginBottom: "clamp(32px, 5vw, 56px)", marginTop: 20 }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: 1,
                background: `linear-gradient(to right, ${ACCENT}, transparent)`,
                marginBottom: 28,
                transformOrigin: "left",
              }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              style={{
                color: ACCENT,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 12,
                letterSpacing: "0.4em",
                marginBottom: 10,
                textTransform: "uppercase",
              }}
            >
              Chef's Recommendation
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                color: "#f5f0e8",
                fontSize: "clamp(38px, 8vw, 72px)",
                margin: 0,
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: 2,
                lineHeight: 1,
              }}
            >
              Random Chef Pick
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              style={{
                color: "#4a3c2e",
                fontSize: "clamp(13px, 1.8vw, 17px)",
                fontFamily: "'Cormorant Garamond', serif",
                marginTop: 10,
              }}
            >
              Our chefs recommend this dish for you today
            </motion.p>
          </div>

          {/* ── Content ── */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Skeleton />
              </motion.div>
            ) : meal ? (
              <motion.div
                key={meal.idMeal}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="meal-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "clamp(200px, 38%, 460px) 1fr",
                    gap: "clamp(24px, 4vw, 56px)",
                    alignItems: "start",
                  }}
                >
                  {/* ── Image ── */}
                  <div
                    className="meal-image"
                    style={{ position: "relative", borderRadius: 6, overflow: "hidden" }}
                  >
                    <motion.img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      layoutId="meal-thumb"
                      style={{
                        width: "100%",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        display: "block",
                        filter: "brightness(0.9) saturate(0.8)",
                      }}
                    />
                    {/* Gradient bottom fade */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "40%",
                        background: "linear-gradient(transparent, rgba(8,8,8,0.85))",
                        pointerEvents: "none",
                      }}
                    />
                    {/* Area badge */}
                    {meal.strArea && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 14,
                          left: 14,
                          background: "rgba(0,0,0,0.75)",
                          border: `1px solid rgba(232,145,58,0.25)`,
                          color: ACCENT,
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 11,
                          letterSpacing: 3,
                          padding: "5px 12px",
                          borderRadius: 2,
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        {meal.strArea} Cuisine
                      </div>
                    )}
                  </div>

                  {/* ── Info ── */}
                  <div style={{ paddingTop: 4 }}>
                    {/* Category tag */}
                    <div style={{ marginBottom: 16 }}>
                      <span
                        style={{
                          color: "#3a3028",
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 11,
                          letterSpacing: "0.4em",
                          textTransform: "uppercase",
                        }}
                      >
                        {meal.strCategory}
                      </span>
                    </div>

                    {/* Accent line */}
                    <div style={{ width: 32, height: 2, background: ACCENT, marginBottom: 16 }} />

                    {/* Title */}
                    <h2
                      style={{
                        color: "#f5f0e8",
                        fontSize: "clamp(26px, 4vw, 48px)",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 700,
                        margin: "0 0 20px",
                        lineHeight: 1.1,
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {meal.strMeal}
                    </h2>

                    {/* Divider */}
                    <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 20 }} />

                    {/* Description */}
                    <p
                      style={{
                        color: "#4e4036",
                        lineHeight: 1.85,
                        fontSize: "clamp(13px, 1.4vw, 15px)",
                        fontFamily: "Georgia, serif",
                        marginBottom: 24,
                      }}
                    >
                      {meal.strInstructions?.slice(0, 280)}…
                    </p>

                    {/* Ingredients */}
                    <p
                      style={{
                        color: "#2e2820",
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 11,
                        letterSpacing: "0.4em",
                        marginBottom: 10,
                        textTransform: "uppercase",
                      }}
                    >
                      Key Ingredients
                    </p>
                    <Ingredients meal={meal} />

                    {/* Divider */}
                    <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "28px 0" }} />

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      <button
                        className="btn-primary"
                        onClick={() => navigate(`/meal/${meal.idMeal}`)}
                        style={{
                          padding: "clamp(10px, 2vw, 14px) clamp(18px, 3vw, 28px)",
                          borderRadius: 2,
                          border: "none",
                          background: ACCENT,
                          color: "#1a0e05",
                          cursor: "pointer",
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 13,
                          letterSpacing: 3,
                          textTransform: "uppercase",
                        }}
                      >
                        View Full Recipe →
                      </button>

                      <button
                        className="btn-ghost"
                        onClick={() => fetchRandom(true)}
                        disabled={spinning}
                        style={{
                          padding: "clamp(10px, 2vw, 14px) clamp(18px, 3vw, 28px)",
                          borderRadius: 2,
                          border: "1px solid rgba(255,255,255,0.08)",
                          background: "transparent",
                          color: "#6a5a48",
                          cursor: "pointer",
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: 13,
                          letterSpacing: 3,
                          textTransform: "uppercase",
                          opacity: spinning ? 0.4 : 1,
                        }}
                      >
                        {spinning ? "Picking…" : "↻ New Pick"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <p style={{ color: "#555", fontFamily: "Georgia, serif" }}>No meal found.</p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
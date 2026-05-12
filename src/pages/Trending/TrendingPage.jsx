import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { searchMealByLetter } from "@/services/mealApi";
import Breadcrumbs from "@/components/Breadcrumbs";

const LETTERS = ["a", "b", "c", "d", "e", "f"];
const ACCENT = "#e8913a";
const BG = "#080808";

/* ── Scrolling ticker ── */
function Ticker({ meals }) {
  const items = [...meals.slice(0, 12), ...meals.slice(0, 12)];
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "9px 0",
        marginBottom: "clamp(32px, 5vw, 60px)",
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 40, width: "max-content" }}
      >
        {items.map((m, i) => (
          <span
            key={i}
            style={{
              color: i % 2 === 0 ? "#2a2a2a" : ACCENT,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 13,
              letterSpacing: 4,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {m.strMeal} ✦
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <motion.div
      animate={{ opacity: [0.25, 0.5, 0.25] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{ borderRadius: 6, overflow: "hidden", background: "#111", aspectRatio: "3/4" }}
    />
  );
}

/* ── Unique Meal Card ── */
function MealCard({ meal, onClick, index }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    rotateX.set(y);
    rotateY.set(x);
  };

  const handleLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const tag = meal.strCategory || meal.strArea || "World";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: (index % 12) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{
        perspective: 900,
        cursor: "pointer",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          borderRadius: 6,
          overflow: "hidden",
          border: `1px solid ${hovered ? "rgba(232,145,58,0.25)" : "rgba(255,255,255,0.06)"}`,
          transition: "border-color 0.3s",
          background: "#0d0d0d",
          position: "relative",
        }}
      >
        {/* ── Image container ── */}
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
          <motion.img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: hovered ? "brightness(0.5) saturate(0.7)" : "brightness(0.75) saturate(0.7)",
              transition: "filter 0.5s",
            }}
          />

          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 40%, rgba(8,8,8,0.95) 100%)",
            }}
          />

          {/* Index badge */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 14,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 42,
              lineHeight: 1,
              color: "rgba(255,255,255,0.08)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Category tag */}
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: "rgba(0,0,0,0.7)",
              border: `1px solid rgba(232,145,58,0.3)`,
              color: ACCENT,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 10,
              letterSpacing: 3,
              padding: "4px 10px",
              borderRadius: 2,
              backdropFilter: "blur(4px)",
            }}
          >
            {tag}
          </div>

          {/* Hover: centered "View Recipe" pill */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: ACCENT,
                  color: "#1a0e05",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 13,
                  letterSpacing: 3,
                  padding: "10px 22px",
                  borderRadius: 2,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                VIEW RECIPE →
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Text block ── */}
        <div style={{ padding: "16px 18px 18px" }}>
          {/* Animated accent line */}
          <motion.div
            animate={{ width: hovered ? 40 : 20 }}
            transition={{ duration: 0.3 }}
            style={{ height: 2, background: ACCENT, marginBottom: 10 }}
          />

          <h3
            style={{
              color: "#f5f0e8",
              fontSize: "clamp(15px, 1.6vw, 17px)",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.25,
              letterSpacing: "-0.2px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {meal.strMeal}
          </h3>

          {meal.strArea && (
            <p
              style={{
                color: "#444",
                fontSize: 11,
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: 3,
                marginTop: 8,
                textTransform: "uppercase",
              }}
            >
              {meal.strArea} Cuisine
            </p>
          )}
        </div>

        {/* Shine sweep on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ x: "-100%", skewX: "-15deg" }}
              animate={{ x: "220%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ── Page ── */
export default function TrendingPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const results = await Promise.all(
          LETTERS.map((letter) => searchMealByLetter(letter))
        );
        setMeals(results.flat().filter(Boolean));
      } catch (err) {
        console.error("Failed to load meals", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        body { background: ${BG}; margin: 0; }
        * { box-sizing: border-box; }
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
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <Breadcrumbs />

          {/* ── Header ── */}
          <div style={{ marginBottom: "clamp(28px, 4vw, 48px)", marginTop: 20 }}>
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

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
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
                  Trending Meals
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{
                    color: "#4a3c2e",
                    fontSize: "clamp(13px, 1.8vw, 17px)",
                    fontFamily: "'Cormorant Garamond', serif",
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  Explore trending meals from different categories
                </motion.p>
              </div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  color: ACCENT,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 14,
                  letterSpacing: 4,
                  paddingBottom: 4,
                }}
              >
                {!loading && `${meals.length} MEALS`}
              </motion.span>
            </div>
          </div>

          {/* ── Ticker ── */}
          {!loading && meals.length > 0 && <Ticker meals={meals} />}

          {/* ── Grid ── */}
          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(clamp(150px, 28vw, 270px), 1fr))",
                gap: "clamp(10px, 2vw, 20px)",
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(clamp(150px, 28vw, 270px), 1fr))",
                gap: "clamp(10px, 2vw, 20px)",
              }}
            >
              {meals.map((meal, i) => (
                <MealCard
                  key={meal.idMeal}
                  meal={meal}
                  index={i}
                  onClick={() => navigate(`/meal/${meal.idMeal}`)}
                />
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
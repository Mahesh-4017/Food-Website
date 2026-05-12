import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "@/services/mealApi";
import Breadcrumbs from "@/components/Breadcrumbs";

const ACCENT = "#e8913a";
const BG = "#080808";

function CategoryStrip({ categories }) {
  const items = [...categories, ...categories];
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: `1px solid rgba(255,255,255,0.07)`,
        borderBottom: `1px solid rgba(255,255,255,0.07)`,
        padding: "10px 0",
        marginBottom: 40,
        position: "relative",
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 40, width: "max-content" }}
      >
        {items.map((cat, i) => (
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
            {cat.strCategory} ✦
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function CategoryCard({ category, index, onClick }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const isEven = index % 2 === 0;

  /* ── Mobile layout: stacked card ── */
  if (isMobile) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        onClick={onClick}
        style={{
          cursor: "pointer",
          borderRadius: 6,
          overflow: "hidden",
          border: `1px solid rgba(255,255,255,0.06)`,
          position: "relative",
          background: "#0d0d0d",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
          <img
            src={category.strCategoryThumb}
            alt={category.strCategory}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "brightness(0.55) saturate(0.6)",
            }}
          />
          {/* Number overlay */}
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 14,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 56,
              lineHeight: 1,
              color: "rgba(255,255,255,0.1)",
              pointerEvents: "none",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background: "linear-gradient(transparent, #0d0d0d)",
            }}
          />
        </div>

        {/* Text */}
        <div style={{ padding: "20px 20px 24px" }}>
          <div style={{ width: 24, height: 2, background: ACCENT, marginBottom: 14 }} />
          <h3
            style={{
              color: "#f5f0e8",
              fontSize: 24,
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {category.strCategory}
          </h3>
          <p
            style={{
              color: "#555",
              fontSize: 14,
              lineHeight: 1.7,
              marginTop: 10,
              fontFamily: "Georgia, serif",
            }}
          >
            {category.strCategoryDescription.slice(0, 90)}…
          </p>
          <div
            style={{
              marginTop: 16,
              color: ACCENT,
              fontSize: 11,
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: 3,
            }}
          >
            EXPLORE →
          </div>
        </div>
      </motion.div>
    );
  }

  /* ── Tablet/Desktop layout: horizontal split ── */
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      onClick={onClick}
      style={{
        display: "grid",
        gridTemplateColumns: isEven ? "1fr 1.2fr" : "1.2fr 1fr",
        gap: 0,
        cursor: "pointer",
        borderRadius: 4,
        overflow: "hidden",
        border: `1px solid rgba(255,255,255,0.06)`,
        height: "clamp(200px, 25vw, 290px)",
        position: "relative",
      }}
    >
      {/* Image side */}
      <motion.div
        style={{
          order: isEven ? 1 : 2,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <motion.img
          src={category.strCategoryThumb}
          alt={category.strCategory}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            filter: hovered
              ? "brightness(0.95)"
              : "brightness(0.65) saturate(0.6)",
            transition: "filter 0.5s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 16,
            left: isEven ? "auto" : 16,
            right: isEven ? 16 : "auto",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 5vw, 64px)",
            lineHeight: 1,
            color: "rgba(255,255,255,0.1)",
            pointerEvents: "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </motion.div>

      {/* Text side */}
      <motion.div
        style={{
          order: isEven ? 2 : 1,
          background: hovered ? "#111" : "#0d0d0d",
          transition: "background 0.3s",
          padding: "clamp(20px, 3vw, 32px) clamp(20px, 3vw, 36px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <motion.div
            animate={{ width: hovered ? "48px" : "24px" }}
            transition={{ duration: 0.3 }}
            style={{ height: 2, background: ACCENT, marginBottom: 18 }}
          />
          <h3
            style={{
              color: "#f5f0e8",
              fontSize: "clamp(20px, 2.2vw, 28px)",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.5px",
            }}
          >
            {category.strCategory}
          </h3>
          <p
            style={{
              color: "#555",
              fontSize: "clamp(13px, 1.4vw, 18px)",
              lineHeight: 1.7,
              marginTop: 12,
              fontFamily: "Georgia, serif",
            }}
          >
            {category.strCategoryDescription.slice(0, 100)}…
          </p>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: ACCENT,
                fontSize: 12,
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: 3,
              }}
            >
              EXPLORE →
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data || []);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:wght@400;600;700&display=swap');
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

          {/* Header */}
          <div style={{ marginBottom: 36, marginTop: 20 }}>
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
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  color: "#f5f0e8",
                  fontSize: "clamp(40px, 9vw, 72px)",
                  margin: 0,
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: 2,
                  lineHeight: 1,
                }}
              >
                Categories
              </motion.h1>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  color: ACCENT,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 14,
                  letterSpacing: 4,
                  paddingBottom: 6,
                }}
              >
                {categories.length} TOTAL
              </motion.span>
            </div>
          </div>

          {/* Scrolling ticker */}
          {!loading && categories.length > 0 && (
            <CategoryStrip categories={categories} />
          )}

          {/* Cards */}
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                  style={{ height: 220, background: "#111", borderRadius: 4 }}
                />
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.idCategory}
                  category={category}
                  index={index}
                  onClick={() => navigate(`/category/${category.strCategory}`)}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
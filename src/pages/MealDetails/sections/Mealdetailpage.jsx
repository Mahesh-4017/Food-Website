import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import VideoPlayer from "../../../components/VideoPlayer";

export default function MealDetailPage() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((r) => r.json())
      .then((d) => setMeal(d.meals?.[0] || null))
      .catch(() => setMeal(null))
      .finally(() => setLoading(false));
  }, [id]);

  // Build ingredients list
  const ingredients = [];
  if (meal) {
    for (let i = 1; i <= 20; i++) {
      const name = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (name?.trim()) ingredients.push({ name, measure: measure?.trim() || "" });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {loading ? (
        <DetailSkeleton onBack={() => navigate(-1)} />
      ) : !meal ? (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <p style={{ color: "#5a4a3a", fontFamily: "serif", fontSize: 18 }}>
            Recipe not found
          </p>
          <BackButton onClick={() => navigate(-1)} />
        </div>
      ) : (
        <>
          {/* Hero image */}
          <div
            style={{ position: "relative", height: 340, overflow: "hidden" }}
          >
            <motion.img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "brightness(0.55)",
              }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, #0c0c0c 0%, rgba(12,12,12,0.4) 60%, transparent 100%)",
              }}
            />

            {/* Back button */}
            <div style={{ position: "absolute", top: 20, left: 20 }}>
              <BackButton onClick={() => navigate(-1)} />
            </div>

            {/* Category badge on hero */}
            {meal.strCategory && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  background: "#e8913a",
                  color: "#0c0c0c",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 11,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  fontWeight: 600,
                }}
              >
                {meal.strCategory}
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div
            style={{
              maxWidth: 860,
              margin: "0 auto",
              padding: "0 28px 60px",
              marginTop: -32,
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Title + meta */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(28px, 5vw, 52px)",
                  fontWeight: 700,
                  color: "#f0ece4",
                  lineHeight: 1.1,
                  marginBottom: 14,
                }}
              >
                {meal.strMeal}
              </h1>

              {/* Tags row */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 32,
                }}
              >
                {meal.strArea && <Badge label={meal.strArea} variant="outline" />}
                {meal.strTags
                  ?.split(",")
                  .filter(Boolean)
                  .map((t) => (
                    <Badge key={t} label={t.trim()} variant="subtle" />
                  ))}
              </div>
            </motion.div>

            {/* Two-col layout */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.6fr",
                gap: 40,
                alignItems: "start",
              }}
              className="detail-grid"
            >
              {/* Ingredients */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                <SectionTitle>Ingredients</SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {ingredients.map((ing, i) => (
                    <motion.div
                      key={ing.name}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.03 }}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 12px",
                        background: "#161616",
                        borderRadius: 8,
                        borderLeft: "2px solid rgba(232,145,58,0.25)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 14,
                          color: "#d0c0a8",
                          fontWeight: 500,
                        }}
                      >
                        {ing.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: 12,
                          color: "#5a4a3a",
                        }}
                      >
                        {ing.measure}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <SectionTitle>Instructions</SectionTitle>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 16,
                    color: "#7a6a58",
                    lineHeight: 1.85,
                    whiteSpace: "pre-line",
                  }}
                >
                  {meal.strInstructions}
                </p>

                {/* Links */}
                {(meal.strYoutube || meal.strSource) && (
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      marginTop: 32,
                      flexWrap: "wrap",
                    }}
                  >
                    {meal.strYoutube && (
                      <LinkButton
                        href={meal.strYoutube}
                        variant="primary"
                        icon="▶"
                      >
                        Watch on YouTube
                      </LinkButton>
                    )}
                    {meal.strSource && (
                      <LinkButton href={meal.strSource} variant="outline" icon="↗">
                        Full Recipe
                      </LinkButton>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
            <VideoPlayer url={meal?.strYoutube} />
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ── Sub-components ── */

function BackButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, borderColor: "rgba(232,145,58,0.5)" }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(12,12,12,0.75)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(240,236,228,0.12)",
        color: "#f0ece4",
        padding: "9px 18px",
        borderRadius: 24,
        fontSize: 12,
        letterSpacing: "0.1em",
        cursor: "pointer",
        fontFamily: "'Cormorant Garamond', serif",
        transition: "border-color 0.3s",
      }}
    >
      ← Back to Kitchen
    </motion.button>
  );
}

function SectionTitle({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
      }}
    >
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 13,
          fontWeight: 700,
          color: "#e8913a",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: "rgba(232,145,58,0.12)",
        }}
      />
    </div>
  );
}

function Badge({ label, variant }) {
  const styles =
    variant === "outline"
      ? {
        background: "transparent",
        border: "1px solid rgba(232,145,58,0.35)",
        color: "#e8913a",
      }
      : {
        background: "rgba(240,236,228,0.06)",
        border: "1px solid rgba(240,236,228,0.08)",
        color: "#6a5a4a",
      };

  return (
    <span
      style={{
        ...styles,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 11,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        padding: "4px 12px",
        borderRadius: 20,
        fontWeight: 500,
      }}
    >
      {label}
    </span>
  );
}

function LinkButton({ href, children, variant, icon }) {
  const isPrimary = variant === "primary";
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2, opacity: 0.9 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "11px 22px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 500,
        fontFamily: "'Cormorant Garamond', serif",
        letterSpacing: "0.08em",
        textDecoration: "none",
        cursor: "pointer",
        background: isPrimary ? "#e8913a" : "transparent",
        color: isPrimary ? "#0c0c0c" : "#f0ece4",
        border: isPrimary ? "none" : "1px solid rgba(240,236,228,0.18)",
        transition: "opacity 0.2s",
      }}
    >
      <span>{icon}</span>
      {children}
    </motion.a>
  );
}

function DetailSkeleton({ onBack }) {
  return (
    <div>
      <div
        style={{
          height: 340,
          background: "#161616",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 20, left: 20 }}>
          <BackButton onClick={onBack} />
        </div>
      </div>
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "24px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {[280, 180, 220, 160, 200].map((w, i) => (
          <div
            key={i}
            style={{
              height: 18,
              width: w,
              borderRadius: 6,
              background:
                "linear-gradient(90deg,#181818 25%,#242424 50%,#181818 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          />
        ))}
        <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
      </div>
    </div>
  );
}
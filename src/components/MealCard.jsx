import { motion } from "framer-motion";

export default function MealCard({ meal, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover="hover"
      style={{
        width: 210,
        flexShrink: 0,
        background: "#161616",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer", 
        border: "1px solid rgba(240,236,228,0.06)",
        transition: "border-color 0.3s",
      }}
      variants={{
        hover: { y: -6, scale: 1.03, borderColor: "rgba(232,145,58,0.35)" },
      }}
      transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Image */}
      <div style={{ height: 140, overflow: "hidden", position: "relative" }}>
        <motion.img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
          variants={{ hover: { scale: 1.08 } }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Hover overlay */}
        <motion.div
          variants={{ hover: { opacity: 1 } }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(12,12,12,0.85) 0%, transparent 60%)",
            display: "flex",
            alignItems: "flex-end",
            padding: "10px 12px",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#e8913a",
            }}
          >
            View Recipe →
          </span>
        </motion.div>

        {/* Area badge */}
        {meal.strArea && (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(12,12,12,0.7)",
              backdropFilter: "blur(6px)",
              fontFamily: "sans-serif",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#8a7a6a",
              padding: "3px 8px",
              borderRadius: 10,
            }}
          >
            {meal.strArea}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "12px 14px 14px" }}>
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 14,
            fontWeight: 700,
            color: "#f0ece4",
            marginBottom: 4,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.3,
          }}
        >
          {meal.strMeal}
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 11,
              color: "#5a4a3a",
              letterSpacing: "0.05em",
            }}
          >
            {meal.strCategory}
          </span>
        </div>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          whileHover={{ background: "#f5a348" }}
          whileTap={{ scale: 0.97 }}
          style={{
            width: "100%",
            background: "#e8913a",
            color: "#0c0c0c",
            border: "none",
            padding: "8px 0",
            borderRadius: 8,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          Explore
        </motion.button>
      </div>
    </motion.div>
  );
}
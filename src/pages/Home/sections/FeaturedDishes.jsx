import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const dishes = [
  {
    id: 1,
    name: "Saffron Bouillabaisse",
    desc: "Traditional Provençal fish stew with rouille and croutons",
    price: "€42",
    tag: "Chef's Pick",
    img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80",
    color: "#e8913a",
  },
  {
    id: 2,
    name: "Duck Confit",
    desc: "72-hour slow-cooked duck leg with cherry gastrique",
    price: "€38",
    tag: "Signature",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    color: "#c4602a",
  },
  {
    id: 3,
    name: "Truffle Risotto",
    desc: "Arborio rice with black truffle shavings and aged parmesan",
    price: "€34",
    tag: "Seasonal",
    img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80",
    color: "#8a5a2a",
  },
];

function DishCard({ dish, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      whileHover="hover"
      style={{ position: "relative", cursor: "pointer", overflow: "hidden" }}
    >
      {/* Image */}
      <div style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
        <motion.img
          variants={{ hover: { scale: 1.08 } }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          src={dish.img}
          alt={dish.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Overlay on hover */}
        <motion.div
          variants={{ hover: { opacity: 1 } }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,8,4,0.9) 0%, rgba(10,8,4,0.2) 60%, transparent 100%)",
          }}
        />

        {/* Tag */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: dish.color,
            color: "#0a0804",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "5px 12px",
            fontWeight: 600,
          }}
        >
          {dish.tag}
        </div>

        {/* Hover CTA */}
        <motion.div
          variants={{ hover: { y: 0, opacity: 1 } }}
          initial={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
          }}
        >
          <Link to="/menu" className="no-underline">
            
          <motion.button
            whileHover={{ background: "#f5a048" }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: "100%",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 12,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#0a0804",
              background: "#e8913a",
              border: "none",
              padding: "12px 0",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Order Now
          </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Info */}
      <div style={{ paddingTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 22,
            fontWeight: 600,
            color: "#f5efe6",
            margin: 0,
          }}>
            {dish.name}
          </h3>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 20,
            color: "#e8913a",
            fontWeight: 600,
          }}>
            {dish.price}
          </span>
        </div>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 15,
          color: "#6a5a4a",
          margin: 0,
          lineHeight: 1.6,
        }}>
          {dish.desc}
        </p>

        {/* Animated underline */}
        <motion.div
          variants={{ hover: { scaleX: 1 } }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            height: 0.5,
            background: dish.color,
            marginTop: 16,
            transformOrigin: "left",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function FeaturedDishes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section style={{ padding: "120px 48px", background: "#0a0804" }} id="menu">
      {/* Section header */}
      <div ref={ref} style={{ textAlign: "center", marginBottom: 80 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 12,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#e8913a",
          }}>
            Featured Selections
          </span>
          <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
        </motion.div>

        <div style={{ overflow: "hidden" }}>
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 700,
              color: "#f5efe6",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Our Signature <em style={{ color: "#e8913a", fontStyle: "italic" }}>Dishes</em>
          </motion.h2>
        </div>
      </div>

      {/* Dish grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 48,
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        {dishes.map((dish, i) => (
          <DishCard key={dish.id} dish={dish} index={i} />
        ))}
      </div>

      {/* View all */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        style={{ textAlign: "center", marginTop: 72 }}
      >
        <motion.button
          whileHover={{ scale: 1.04, color: "#e8913a" }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 14,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#6a5a4a",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            transition: "color 0.3s",
          }}
          onClick={() => navigate("/categories")}
        >
          View Full Menu
          <svg width="40" height="8" viewBox="0 0 40 8" fill="none">
            <line x1="0" y1="4" x2="36" y2="4" stroke="currentColor" strokeWidth="0.5" />
            <path d="M34 1 L38 4 L34 7" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
}

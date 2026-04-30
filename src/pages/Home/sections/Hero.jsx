import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image with parallax */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-20%",
          backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y,
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(10,8,4,0.5) 0%, rgba(10,8,4,0.3) 50%, rgba(10,8,4,0.85) 100%)",
        }}
      />

      {/* Amber horizontal accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(232,145,58,0.3), transparent)",
          transformOrigin: "left",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900, padding: "0 24px", y: textY, opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 13,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "#e8913a",
          }}>
            Est. 2018 · Paris
          </span>
          <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
        </motion.div>

        {/* Main headline */}
        <div style={{ overflow: "hidden" }}>
          {["Where Every", "Dish Tells", "A Story"].map((line, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(52px, 9vw, 110px)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  margin: 0,
                  color: i === 1 ? "#e8913a" : "#f5efe6",
                  letterSpacing: "-0.01em",
                }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(16px, 2.5vw, 22px)",
            color: "#8a7a6a",
            maxWidth: 540,
            margin: "28px auto 48px",
            lineHeight: 1.7,
            letterSpacing: "0.02em",
          }}
        >
          A symphony of flavors crafted with seasonal ingredients,
          time-honored techniques, and passionate artistry.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link to="/menu" className="no-underline">

            <motion.button
              whileHover={{ scale: 1.04, background: "#f5a048" }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 14,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#0a0804",
                background: "#e8913a",
                border: "none",
                padding: "16px 40px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Explore Menu
            </motion.button>
          </Link>

          <Link to="/Book" className="no-underline">
            <motion.button
              whileHover={{ scale: 1.04, borderColor: "#f5efe6", color: "#f5efe6" }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#9a8a7a",
              background: "transparent",
              border: "0.5px solid rgba(154,138,122,0.5)",
              padding: "16px 40px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            Reserve a Table
          </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontFamily: "sans-serif", fontSize: 10, letterSpacing: "0.3em", color: "#5a4a3a", textTransform: "uppercase" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: 0.5, height: 40, background: "linear-gradient(to bottom, #e8913a, transparent)" }}
        />
      </motion.div>
    </section>
  );
}

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { num: "15+", label: "Years of Excellence" },
  { num: "3", label: "Michelin Stars" },
  { num: "200+", label: "Curated Dishes" },
  { num: "50K+", label: "Happy Guests" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "120px 48px",
        background: "#0d0b07",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative diagonal lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: i * 0.1 }}
          style={{
            position: "absolute",
            right: -100 + i * 80,
            top: 0,
            bottom: 0,
            width: 0.5,
            background: "rgba(232,145,58,0.06)",
            transform: "rotate(15deg)",
          }}
        />
      ))}

      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }}>
        {/* Left: image stack */}
        <div style={{ position: "relative" }}>
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: "relative", zIndex: 2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80"
              alt="Restaurant interior"
              style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
            />
          </motion.div>

          {/* Offset second image */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "absolute",
              bottom: -40,
              right: -40,
              width: "55%",
              zIndex: 3,
              border: "8px solid #0d0b07",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&q=80"
              alt="Chef cooking"
              style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }}
            />
          </motion.div>

          {/* Award badge */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              zIndex: 4,
              width: 90,
              height: 90,
              borderRadius: "50%",
              background: "#e8913a",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#0a0804", lineHeight: 1 }}>★★★</span>
            <span style={{ fontFamily: "sans-serif", fontSize: 8, letterSpacing: "0.1em", color: "#0a0804", marginTop: 2 }}>MICHELIN</span>
          </motion.div>
        </div>

        {/* Right: text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}
          >
            <div style={{ width: 32, height: 0.5, background: "#e8913a" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.4em", textTransform: "uppercase", color: "#e8913a" }}>
              Our Story
            </span>
          </motion.div>

          <div style={{ overflow: "hidden", marginBottom: 16 }}>
            <motion.h2
              initial={{ y: "100%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 700,
                color: "#f5efe6",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Crafting Memories,<br />
              <em style={{ color: "#e8913a" }}>One Plate at a Time</em>
            </motion.h2>
          </div>

          {["Founded in 2018 by Chef Marco Laurent, Lumine was born from a singular vision: to create a dining experience where food becomes memory, where every course tells a story of provenance, passion, and precision.",
            "We source exclusively from small-scale farms and artisan producers within 200km of our kitchen. Our menu evolves with the seasons, guided by what nature offers at its peak."].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.7 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 17,
                color: "#6a5a4a",
                lineHeight: 1.8,
                marginTop: 20,
                marginBottom: 0,
              }}
            >
              {text}
            </motion.p>
          ))}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
              marginTop: 48,
              borderTop: "0.5px solid rgba(232,145,58,0.15)",
              paddingTop: 32,
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{ paddingRight: 20, borderRight: i < stats.length - 1 ? "0.5px solid rgba(232,145,58,0.1)" : "none", paddingLeft: i > 0 ? 20 : 0 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#e8913a" }}>{s.num}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "#5a4a3a", letterSpacing: "0.05em", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const reviews = [
  {
    text: "An ethereal experience. Each dish arrived as a work of art, and the flavors were transformative. The duck confit alone was worth the journey from London.",
    author: "Sophia M.",
    source: "Michelin Guide",
    stars: 5,
  },
  {
    text: "Lumine transcends mere dining. Chef Laurent's saffron bouillabaisse is perhaps the finest I've tasted in twenty years of restaurant reviewing.",
    author: "Jean-Paul D.",
    source: "Le Monde",
    stars: 5,
  },
  {
    text: "The truffle risotto changed my understanding of what rice could be. The wine pairing by the sommelier was nothing short of inspired.",
    author: "Claire T.",
    source: "The Guardian",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        padding: "120px 48px",
        background: "#0d0b07",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large decorative quote mark */}
      <div style={{
        position: "absolute",
        top: 40,
        left: 60,
        fontFamily: "'Playfair Display', serif",
        fontSize: 300,
        color: "rgba(232,145,58,0.03)",
        lineHeight: 1,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        "
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", marginBottom: 20 }}
          >
            <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: "0.4em", textTransform: "uppercase", color: "#e8913a" }}>
              Press & Guests
            </span>
            <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
          </motion.div>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: 700,
              color: "#f5efe6",
              margin: 0,
            }}
          >
            What They <em style={{ color: "#e8913a" }}>Say</em>
          </motion.h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              style={{
                background: "rgba(232,145,58,0.03)",
                border: "0.5px solid rgba(232,145,58,0.1)",
                padding: "36px 32px",
                position: "relative",
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
                {[...Array(r.stars)].map((_, si) => (
                  <span key={si} style={{ color: "#e8913a", fontSize: 12 }}>★</span>
                ))}
              </div>

              <p style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 17,
                color: "#8a7a6a",
                lineHeight: 1.8,
                margin: "0 0 28px",
                fontStyle: "italic",
              }}>
                "{r.text}"
              </p>

              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#f5efe6", fontWeight: 600 }}>{r.author}</div>
                <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#e8913a", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>{r.source}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

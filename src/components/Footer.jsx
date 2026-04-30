import { motion } from "framer-motion";

export default function Footer() {
  return (
    <>
      {/* Reservation CTA band */}
      <section style={{
        padding: "100px 48px",
        background: "#e8913a",
        textAlign: "center",
      }}>
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 700,
            color: "#0a0804",
            margin: "0 0 16px",
          }}
        >
          Reserve Your Evening
        </motion.h2>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "rgba(10,8,4,0.6)", marginBottom: 40 }}>
          Tables fill quickly. We recommend booking 2 weeks in advance.
        </p>
        <motion.button
          whileHover={{ scale: 1.04, background: "#0a0804", color: "#e8913a" }}
          whileTap={{ scale: 0.97 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 14,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#e8913a",
            background: "#0a0804",
            border: "none",
            padding: "18px 52px",
            cursor: "pointer",
            transition: "all 0.3s",
            fontWeight: 600,
          }}
        >
          Book a Table
        </motion.button>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "60px 48px",
        background: "#070503",
        borderTop: "0.5px solid rgba(232,145,58,0.1)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}>
              <span style={{ color: "#f5efe6" }}>LU</span>
              <span style={{ color: "#e8913a" }}>MI</span>
              <span style={{ color: "#f5efe6" }}>NE</span>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#3a2a1a", letterSpacing: "0.15em" }}>
              12 Rue de la Paix, Paris 75002
            </p>
          </div>

          <div style={{ display: "flex", gap: 40 }}>
            {["Menu", "About", "Reservations", "Press", "Contact"].map((link) => (
              <a key={link} href="#" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#3a2a1a",
                textDecoration: "none",
              }}>
                {link}
              </a>
            ))}
          </div>

          <p style={{ fontFamily: "sans-serif", fontSize: 11, color: "#2a1a0a", letterSpacing: "0.05em" }}>
            © 2024 Lumine. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

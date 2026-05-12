import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LuxuryCTA() {
  return (
    <section
      style={{
        position: "relative",
        background: "#070503",
        overflow: "hidden",
        padding: "90px 20px",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(232,145,58,0.05)",
          filter: "blur(120px)",
          top: -180,
          right: -120,
          pointerEvents: "none",
        }}
      />

      {/* Small particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "rgba(232,145,58,0.7)",
          }}
        />
      ))}

      {/* MAIN WRAPPER */}
      <div
        className="luxury-cta-wrapper"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 50,
          alignItems: "center",
        }}
      >
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* TOP LABEL */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 40,
                height: 1,
                background: "#e8913a",
              }}
            />

            <span
              style={{
                color: "#e8913a",
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Fine Dining Experience
            </span>
          </div>

          {/* HEADING */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(44px, 6vw, 88px)",
              lineHeight: 0.95,
              color: "#f5efe6",
              fontWeight: 700,
              marginBottom: 24,
              letterSpacing: "-0.03em",
            }}
          >
            Reserve Your
            <br />

            <span
              style={{
                color: "#e8913a",
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              Evening
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p
            style={{
              color: "#8b7560",
              fontSize: "clamp(15px, 2vw, 18px)",
              lineHeight: 1.9,
              maxWidth: 520,
              marginBottom: 38,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            A modern tasting experience crafted around fire,
            seasonality, and elegant storytelling —
            designed for unforgettable evenings.
          </p>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <Link to="/book">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  background: "#f5a348",
                }}
                whileTap={{ scale: 0.96 }}
                style={{
                  border: "none",
                  background: "#e8913a",
                  color: "#090603",
                  padding: "16px 34px",
                  borderRadius: 14,
                  fontSize: 12,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Book Table
              </motion.button>
            </Link>

            <motion.button
              whileHover={{
                borderColor: "#fff",
                color: "#fff",
              }}
              whileTap={{ scale: 0.96 }}
              style={{
                border: "1px solid rgba(255,255,255,0.14)",
                background: "transparent",
                color: "#7b6652",
                padding: "16px 32px",
                borderRadius: 14,
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "0.3s",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              View Menu
            </motion.button>
          </div>

          {/* INFO ROW */}
          <div
            style={{
              display: "flex",
              gap: 28,
              flexWrap: "wrap",
              marginTop: 42,
            }}
          >
            {[
              ["Michelin", "★★★"],
              ["Guests", "500+"],
              ["Experience", "Luxury"],
            ].map(([label, value]) => (
              <div key={label}>
                <div
                  style={{
                    color: "#e8913a",
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {value}
                </div>

                <div
                  style={{
                    color: "#685542",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            position: "relative",
          }}
        >
          {/* Floating card */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: -20,
              left: -20,
              zIndex: 5,
              background: "rgba(15,10,5,0.92)",
              border: "1px solid rgba(232,145,58,0.16)",
              borderRadius: 20,
              padding: "14px 18px",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                color: "#e8913a",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              ★★★
            </div>

            <div
              style={{
                color: "#7d6956",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              Michelin Guide
            </div>
          </motion.div>

          {/* IMAGE BOX */}
          <div
            style={{
              position: "relative",
              borderRadius: 30,
              overflow: "hidden",
              height: 520,
              border: "1px solid rgba(232,145,58,0.12)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            }}
          >
            {/* IMAGE */}
            <motion.img
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.7 }}
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1400"
              alt="Restaurant"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* OVERLAY */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.75), transparent 55%)",
              }}
            />

            {/* BOTTOM TEXT */}
            <div
              style={{
                position: "absolute",
                left: 30,
                bottom: 28,
                right: 30,
              }}
            >
              <p
                style={{
                  color: "#e8913a",
                  fontSize: 10,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Signature Experience
              </p>

              <h3
                style={{
                  color: "#fff",
                  fontSize: "clamp(28px, 3vw, 46px)",
                  fontWeight: 600,
                  lineHeight: 1,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Chef's Table
              </h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RESPONSIVE */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Cormorant+Garamond:wght@400;500;600;700&display=swap');

        *{
          box-sizing:border-box;
        }

        @media (max-width: 950px){

          .luxury-cta-wrapper{
            grid-template-columns:1fr !important;
            gap:50px !important;
          }

        }

        @media (max-width: 700px){

          section{
            padding:70px 18px !important;
          }

        }

        @media (max-width: 600px){

          .luxury-cta-wrapper{
            gap:38px !important;
          }

        }

      `}</style>
    </section>
  );
}
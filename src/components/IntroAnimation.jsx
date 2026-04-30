import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["SAVOR", "TASTE", "INDULGE", "DELIGHT"];

export default function IntroAnimation({ onComplete }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("words"); // words | reveal | exit
useEffect(() => {
  // stop body scroll
  document.body.style.overflow = "hidden";

  return () => {
    // enable scroll again when intro removed
    document.body.style.overflow = "auto";
  };
}, []);

  useEffect(() => {
    let timeout;
    if (phase === "words") {
      if (wordIndex < words.length - 1) {
        timeout = setTimeout(() => setWordIndex((i) => i + 1), 500);
      } else {
        timeout = setTimeout(() => setPhase("reveal"), 600);
      }
    } else if (phase === "reveal") {
      timeout = setTimeout(() => setPhase("exit"), 1400);
    } else if (phase === "exit") {
      timeout = setTimeout(() => onComplete(), 900);
    }
    return () => clearTimeout(timeout);
  }, [phase, wordIndex, onComplete]);

  return (
    <motion.div
      key="intro"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0a0804",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Animated grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Radial glow */}
      <motion.div
        animate={phase === "reveal" ? { scale: [0, 3], opacity: [0, 0.15, 0] } : {}}
        transition={{ duration: 1.4, ease: "easeOut" }}
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, #e8913a 0%, transparent 70%)",
        }}
      />

      {/* Horizontal lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.04 }}
          transition={{ delay: i * 0.05, duration: 1 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 1,
            background: "#e8913a",
            top: `${10 + i * 11}%`,
            transformOrigin: "left",
          }}
        />
      ))}

      {/* Word cycling */}
      <AnimatePresence mode="wait">
        {phase === "words" && (
          <motion.div
            key={wordIndex}
            initial={{ y: 60, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -60, opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(60px, 12vw, 140px)",
              fontWeight: 700,
              color: "#f5efe6",
              letterSpacing: "0.08em",
              textAlign: "center",
            }}
          >
            {words[wordIndex]}
          </motion.div>
        )}

        {phase !== "words" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ textAlign: "center" }}
          >
            {/* Logo icon */}
            <motion.div
              initial={{ rotate: -15, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}
            >
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" stroke="#e8913a" strokeWidth="1.5" />
                <path d="M20 44 C20 44 22 24 32 20 C42 24 44 44 44 44" stroke="#e8913a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M26 44 C26 38 28 30 32 28 C36 30 38 38 38 44" stroke="#e8913a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="32" cy="18" r="3" fill="#e8913a" />
              </svg>
            </motion.div>

            <motion.div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(40px, 8vw, 88px)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                lineHeight: 1,
              }}
            >
              {["L","U","M","I","N","E"].map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  style={{ color: i % 2 === 0 ? "#f5efe6" : "#e8913a", display: "inline-block" }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 14,
                letterSpacing: "0.35em",
                color: "#8a7a6a",
                textTransform: "uppercase",
                marginTop: 10,
              }}
            >
              Fine Dining Experience
            </motion.p>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ marginTop: 40, display: "flex", justifyContent: "center" }}
            >
              <div style={{ width: 120, height: 1, background: "#2a2218", position: "relative", overflow: "hidden" }}>
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 0.9, delay: 0.5, ease: "linear" }}
                  style={{ position: "absolute", inset: 0, background: "#e8913a" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

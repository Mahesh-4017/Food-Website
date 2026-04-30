import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "World Cuisine", path: "/country" },
    { name: "Trending", path: "/trending" },
    { name: "Random", path: "/random" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? "16px 48px" : "32px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(10, 8, 4, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "0.5px solid rgba(232,145,58,0.1)" : "0.5px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div 
        onClick={() => navigate("/")}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.1em",
          cursor: "pointer",
        }}
      >
        <span style={{ color: "#f5efe6" }}>LU</span>
        <span style={{ color: "#e8913a" }}>MI</span>
        <span style={{ color: "#f5efe6" }}>NE</span>
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f5efe6",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseOver={(e) => e.currentTarget.style.color = "#e8913a"}
            onMouseOut={(e) => e.currentTarget.style.color = "#f5efe6"}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}

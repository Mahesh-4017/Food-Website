import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = {
    Meals: [
      { name: "Home Meals", path: "/" },
      { name: "Categories", path: "/categories" },
      { name: "World Cuisine", path: "/country" },
      { name: "Trending Meals", path: "/trending" },
    ],
    Cocktails: [
      { name: "Cocktail Home", path: "/home" },
      { name: "Latest Cocktails", path: "/cocktail" },
      { name: "Random Cocktail", path: "/random" },
    ],
    Tools: [
      { name: "Search Meals", path: "/search" },
      { name: "Search Cocktails", path: "/cocktail-search" },
    ],
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? "14px 40px" : "28px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(10,8,4,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(232,145,58,0.15)"
          : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      {/* LOGO */}
      <div
        onClick={() => navigate("/")}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        <span style={{ color: "#f5efe6" }}>LU</span>
        <span style={{ color: "#e8913a" }}>MI</span>
        <span style={{ color: "#f5efe6" }}>NE</span>
      </div>

      {/* MENU */}
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {Object.keys(menu).map((key) => (
          <div
            key={key}
            style={{ position: "relative" }}
            onMouseEnter={() => setOpenMenu(key)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            {/* Main Button */}
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#f5efe6",
                cursor: "pointer",
              }}
            >
              {key}
            </span>

            {/* Dropdown */}
            <AnimatePresence>
              {openMenu === key && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: 0,
                    background: "rgba(20,18,12,0.95)",
                    border: "1px solid rgba(232,145,58,0.15)",
                    borderRadius: 12,
                    padding: "10px",
                    minWidth: 180,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {menu[key].map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      style={{
                        display: "block",
                        padding: "10px 12px",
                        fontSize: 13,
                        color: "#f5efe6",
                        textDecoration: "none",
                        borderRadius: 8,
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(232,145,58,0.1)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.nav>
  );
}
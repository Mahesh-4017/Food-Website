import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = {
    Meals: [
      { name: "Home", path: "/" },
      { name: "Categories", path: "/categories" },
      { name: "Category Page", path: "/category" },
      { name: "World Cuisine", path: "/country" },
      { name: "Trending Meals", path: "/trending" },
      { name: "Random Meal", path: "/random" },
    ],

    Cocktails: [
      { name: "Cocktail Home", path: "/home" },
      { name: "Latest Cocktails", path: "/cocktail" },
      { name: "Cocktail Details", path: "/cocktail/11007" },
      { name: "Random Cocktail", path: "/random" },
    ],

    Search: [
      { name: "Search Meals", path: "/search" },
      { name: "Search Cocktails", path: "/search" },
    ],

    Booking: [
      { name: "Book Table", path: "/book" },
      { name: "Menu", path: "/menu" },
      { name: "Private Dining", path: "/private" },
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
        padding: scrolled ? "14px 20px" : "24px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(10,8,4,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(11px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(232,145,58,0.15)"
          : "1px solid transparent",
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
          zIndex: 200,
        }}
      >
        <span style={{ color: "#f5efe6" }}>LU</span>
        <span style={{ color: "#e8913a" }}>MI</span>
        <span style={{ color: "#f5efe6" }}>NE</span>
      </div>

      {/* DESKTOP MENU */}
      <div
        className="hidden md:flex"
        style={{
          gap: 26,
          alignItems: "center",
        }}
      >
        {Object.keys(menu).map((key) => (
          <div
            key={key}
            style={{ position: "relative" }}
            onMouseEnter={() => setOpenMenu(key)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <span
              style={{
                fontSize: 13,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#f5efe6",
                cursor: "pointer",
              }}
            >
              {key}
            </span>

            <AnimatePresence>
              {openMenu === key && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  style={{
                    position: "absolute",
                    top: 38,
                    left: 50,
                    background: "rgba(15,12,8,0.98)",
                    border: "1px solid rgba(232,145,58,0.2)",
                    borderRadius: 14,
                    padding: 10,
                    minWidth: 180,
                  }}
                >
                  {menu[key].map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      style={{
                        display: "block",
                        padding: "10px 12px",
                        color: "#f5efe6",
                        textDecoration: "none",
                        borderRadius: 8,
                      }}
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

      {/* MOBILE BUTTON */}
      <div
        onClick={() => setMobileOpen(!mobileOpen)}
        className="flex md:hidden"
        style={{
          flexDirection: "column",
          gap: 4,
          cursor: "pointer",
          zIndex: 200,
        }}
      >
        <span
          style={{
            width: 24,
            height: 2,
            background: "#fff",
          }}
        />
        <span
          style={{
            width: 24,
            height: 2,
            background: "#fff",
          }}
        />
        <span
          style={{
            width: 24,
            height: 2,
            background: "#fff",
          }}
        />
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "85%",
              maxWidth: 350,
              height: "100vh",
              background: "#0a0804",
              padding: "100px 30px",
              display: "flex",
              flexDirection: "column",
              gap: 30,
              zIndex: 150,
              overflowY: "auto",
            }}
          >
            {Object.keys(menu).map((section) => (
              <div key={section}>
                <h3
                  style={{
                    color: "#e8913a",
                    marginBottom: 12,
                    fontSize: 14,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                  }}
                >
                  {section}
                </h3>

                {menu[section].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      color: "#fff",
                      textDecoration: "none",
                      padding: "10px 0",
                      fontSize: 15,
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
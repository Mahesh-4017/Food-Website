import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

const menu = {
  Discover: {
    icon: "✦",
    featured: {
      label: "Today's Special",
      desc: "Truffle Risotto — Chef's pick",
      path: "/specials",
    },
    links: [
      { name: "Home", desc: "Back to start", path: "/", icon: "⌂" },
      {
        name: "Our Menu",
        desc: "Full seasonal menu",
        path: "/menu",
        icon: "◈",
      },
      {
        name: "Chef's Table",
        desc: "Exclusive 8-course experience",
        path: "/chefs-table",
        icon: "◉",
      },
      {
        name: "Daily Specials",
        desc: "What's fresh today",
        path: "/specials",
        icon: "✦",
      },
      {
        name: "Tasting Menu",
        desc: "Journey through flavours",
        path: "/tasting",
        icon: "◇",
      },
    ],
  },
  Cuisine: {
    icon: "◈",
    featured: {
      label: "World Flavours",
      desc: "Explore 40+ regional cuisines",
      path: "/world-cuisine",
    },
    links: [
      {
        name: "Meals Explorer",
        desc: "Browse by ingredient or dish",
        path: "/meal",
        icon: "◈",
      },
      {
        name: "World Cuisine",
        desc: "Dishes from every continent",
        path: "/world-cuisine",
        icon: "◯",
      },
      {
        name: "Categories",
        desc: "Starters, mains, desserts",
        path: "/categories",
        icon: "▦",
      },
      {
        name: "Trending Now",
        desc: "Most ordered this month",
        path: "/trending",
        icon: "↑",
      },
      {
        name: "Surprise Me",
        desc: "Random chef's recommendation",
        path: "/random",
        icon: "?",
      },
    ],
  },
  Cocktails: {
    icon: "◇",
    featured: {
      label: "Signature Serve",
      desc: "Smoked Negroni — bar favourite",
      path: "/cocktail",
    },
    links: [
      {
        name: "Cocktail Bar",
        desc: "Full drinks menu",
        path: "/home",
        icon: "◇",
      },
      {
        name: "New Arrivals",
        desc: "Latest seasonal pours",
        path: "/cocktails/new",
        icon: "✦",
      },
      {
        name: "Classic Cocktails",
        desc: "Timeless recipes",
        path: "/cocktails/classics",
        icon: "◯",
      },
      {
        name: "Mocktails",
        desc: "Zero-proof creations",
        path: "/cocktails/mocktails",
        icon: "◈",
      },
      {
        name: "Random Pour",
        desc: "Let us choose for you",
        path: "/random-cocktail",
        icon: "?",
      },
    ],
  },
  Reserve: {
    icon: "◉",
    featured: {
      label: "Private Dining",
      desc: "Exclusive rooms for up to 20",
      path: "/private",
    },
    links: [
      {
        name: "Book a Table",
        desc: "Reserve your evening",
        path: "/book",
        icon: "◉",
      },
      {
        name: "Private Dining",
        desc: "Events & celebrations",
        path: "/private",
        icon: "✦",
      },
      {
        name: "Wine Pairing",
        desc: "Sommelier-curated flights",
        path: "/wine-pairing",
        icon: "◇",
      },
      {
        name: "Gift Vouchers",
        desc: "Give the gift of LUMINE",
        path: "/vouchers",
        icon: "◈",
      },
      {
        name: "Contact Us",
        desc: "Speak to our team",
        path: "/contact",
        icon: "◯",
      },
    ],
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const closeTimer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  const handleEnter = (key) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "10px 40px" : "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: scrolled
            ? "rgba(8,6,3,0.95)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,160,80,0.12)" : "",
          transition: "padding 0.4s ease, background 0.5s ease",
        }}
      >
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          style={{
            fontFamily:
              "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: 26,
            fontWeight: 300,
            letterSpacing: "0.3em",
            cursor: "pointer",
            userSelect: "none",
            zIndex: 200,
          }}
        >
          <span style={{ color: "#f0e8d8" }}>LU</span>
          <span style={{ color: "#c8a050" }}>MI</span>
          <span style={{ color: "#f0e8d8" }}>NE</span>
        </div>

        {/* DESKTOP NAV */}
        <div
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
          }}
          className="hidden md:flex"
        >
          {Object.keys(menu).map((key) => (
            <div
              key={key}
              style={{ position: "relative" }}
              onMouseEnter={() => handleEnter(key)}
              onMouseLeave={handleLeave}
            >
              <motion.button
                whileHover={{ color: "#c8a050" }}
                style={{
                  background: "none",
                  border: "none",
                  padding: "8px 16px",
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: openMenu === key ? "#c8a050" : "#e8dece",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  transition: "color 0.2s",
                }}
              >
                {key}
                <motion.span
                  animate={{ rotate: openMenu === key ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: 8, opacity: 0.6 }}
                >
                  ▼
                </motion.span>
              </motion.button>

              {/* MEGA DROPDOWN */}
              <AnimatePresence>
                {openMenu === key && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => clearTimeout(closeTimer.current)}
                    onMouseLeave={handleLeave}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 460,
                      background: "rgba(10,8,4,0.98)",
                      border: "1px solid rgba(200,160,80,0.18)",
                      borderRadius: 18,
                      overflow: "hidden",
                      boxShadow:
                        "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,160,80,0.06)",
                    }}
                  >
                    {/* Featured Banner */}
                    <Link
                      to={menu[key].featured.path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 20px",
                        background: "rgba(200,160,80,0.08)",
                        borderBottom: "1px solid rgba(200,160,80,0.1)",
                        textDecoration: "none",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(200,160,80,0.14)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(200,160,80,0.08)")
                      }
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 10,
                            letterSpacing: "0.2em",
                            color: "#c8a050",
                            textTransform: "uppercase",
                            marginBottom: 2,
                          }}
                        >
                          {menu[key].featured.label}
                        </div>
                        <div style={{ fontSize: 13, color: "#d8ccbc" }}>
                          {menu[key].featured.desc}
                        </div>
                      </div>
                      <span style={{ color: "#c8a050", fontSize: 16 }}>→</span>
                    </Link>

                    {/* Links Grid */}
                    <div
                      style={{
                        padding: "10px 12px 12px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 4,
                      }}
                    >
                      {menu[key].links.map((item, i) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link
                            to={item.path}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 10,
                              padding: "10px 12px",
                              borderRadius: 10,
                              textDecoration: "none",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(200,160,80,0.07)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <span
                              style={{
                                fontSize: 14,
                                color: "#c8a050",
                                marginTop: 1,
                                minWidth: 14,
                              }}
                            >
                              {item.icon}
                            </span>
                            <div>
                              <div
                                style={{
                                  fontSize: 13,
                                  color: "#f0e8d8",
                                  fontWeight: 500,
                                  letterSpacing: "0.02em",
                                }}
                              >
                                {item.name}
                              </div>
                              <div
                                style={{
                                  fontSize: 11,
                                  color: "#887a68",
                                  marginTop: 1,
                                }}
                              >
                                {item.desc}
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE — SEARCH + CTA */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 14 }}
          className="hidden md:flex"
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate("/search")}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(200,160,80,0.3)",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onHoverStart={(e) => {
              e.target.style.borderColor = "rgba(200,160,80,0.7)";
              e.target.style.background = "rgba(200,160,80,0.08)";
            }}
            onHoverEnd={(e) => {
              e.target.style.borderColor = "rgba(200,160,80,0.3)";
              e.target.style.background = "transparent";
            }}
          >
            {" "}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c8a050"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {" "}
              <circle cx="11" cy="11" r="7" />{" "}
              <line x1="16.5" y1="16.5" x2="22" y2="22" />{" "}
            </svg>{" "}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, background: "rgba(200,160,80,0.18)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/book")}
            style={{
              background: "rgba(200,160,80,0.1)",
              border: "1px solid rgba(200,160,80,0.35)",
              borderRadius: 8,
              padding: "9px 20px",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#c8a050",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.2s, border 0.2s",
            }}
          >
            Reserve
          </motion.button>
        </div>

        {/* MOBILE HAMBURGER */}
        <motion.button
          className="flex md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            zIndex: 200,
            flexDirection: "column",
            gap: 5,
          }}
          whileTap={{ scale: 0.9 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                mobileOpen
                  ? i === 1
                    ? { opacity: 0, scaleX: 0 }
                    : i === 0
                      ? { rotate: 45, y: 9 }
                      : { rotate: -45, y: -9 }
                  : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.25 }}
              style={{
                display: "block",
                width: 24,
                height: 1.5,
                background: "#c8a050",
                borderRadius: 2,
              }}
            />
          ))}
        </motion.button>
      </motion.nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                zIndex: 140,
                backdropFilter: "blur(4px)",
              }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "min(360px, 90vw)",
                height: "100dvh",
                background: "#0a0804",
                borderLeft: "1px solid rgba(200,160,80,0.12)",
                padding: "80px 0 40px",
                zIndex: 150,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Mobile Logo accent */}
              <div
                style={{
                  padding: "0 28px 24px",
                  borderBottom: "1px solid rgba(200,160,80,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    color: "#887a68",
                    textTransform: "uppercase",
                  }}
                >
                  Fine Dining · Since 2018
                </div>
              </div>

              {/* Mobile Sections */}
              <div style={{ flex: 1, padding: "16px 0" }}>
                {Object.keys(menu).map((section, si) => (
                  <motion.div
                    key={section}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: si * 0.06 }}
                  >
                    <button
                      onClick={() =>
                        setMobileSection(
                          mobileSection === section ? null : section,
                        )
                      }
                      style={{
                        width: "100%",
                        background: "none",
                        border: "none",
                        padding: "14px 28px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        color:
                          mobileSection === section ? "#c8a050" : "#e8dece",
                        fontSize: 13,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        fontFamily: "inherit",
                        transition: "color 0.2s",
                      }}
                    >
                      {section}
                      <motion.span
                        animate={{
                          rotate: mobileSection === section ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ fontSize: 9, opacity: 0.5 }}
                      >
                        ▼
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {mobileSection === section && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{
                            overflow: "hidden",
                            background: "rgba(200,160,80,0.03)",
                          }}
                        >
                          {menu[section].links.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={() => setMobileOpen(false)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "12px 28px 12px 36px",
                                textDecoration: "none",
                                borderBottom: "1px solid rgba(200,160,80,0.05)",
                              }}
                            >
                              <span style={{ color: "#c8a050", fontSize: 12 }}>
                                {item.icon}
                              </span>
                              <div>
                                <div style={{ color: "#f0e8d8", fontSize: 14 }}>
                                  {item.name}
                                </div>
                                <div
                                  style={{
                                    color: "#887a68",
                                    fontSize: 11,
                                    marginTop: 1,
                                  }}
                                >
                                  {item.desc}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Mobile CTA */}
              <div style={{ padding: "20px 28px" }}>
                <Link
                  to="/book"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "14px",
                    background: "rgba(200,160,80,0.1)",
                    border: "1px solid rgba(200,160,80,0.3)",
                    borderRadius: 10,
                    color: "#c8a050",
                    textDecoration: "none",
                    fontSize: 12,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  Reserve a Table
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

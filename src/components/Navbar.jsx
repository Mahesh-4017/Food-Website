import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

const menu = {
  Discover: {
    links: [
      { name: "Home", desc: "Back to start", path: "/" },
      { name: "Our Menu", desc: "Full seasonal menu", path: "/menu" },
      { name: "Chef's Table", desc: "Exclusive experience", path: "/chefs-table" },
      { name: "Daily Specials", desc: "Fresh today", path: "/specials" },
      { name: "Tasting Menu", desc: "Journey through flavours", path: "/tasting" },
    ],
  },

  Cuisine: {
    links: [
      { name: "Meals Explorer", desc: "Browse meals", path: "/meals" },
      { name: "World Cuisine", desc: "Global dishes", path: "/world-cuisine" },
      { name: "Categories", desc: "Food categories", path: "/categories" },
      { name: "Trending", desc: "Most popular", path: "/trending" },
      { name: "Random", desc: "Surprise meal", path: "/random" },
    ],
  },

  Cocktails: {
    links: [
      { name: "Cocktail Bar", desc: "Drinks menu", path: "/home" },
      { name: "New Arrivals", desc: "Seasonal pours", path: "/cocktails/new" },
      { name: "Classic Cocktails", desc: "Timeless recipes", path: "/cocktails/classics" },
      { name: "Mocktails", desc: "Zero-proof drinks", path: "/cocktails/mocktails" },
      { name: "Random Pour", desc: "Surprise cocktail", path: "/random-cocktail" },
    ],
  },

  Reserve: {
    links: [
      { name: "Book a Table", desc: "Reserve your evening", path: "/book" },
      { name: "Private Dining", desc: "Events & parties", path: "/private" },
      { name: "Wine Pairing", desc: "Curated flights", path: "/wine-pairing" },
      { name: "Gift Vouchers", desc: "Give LUMINE", path: "/vouchers" },
      { name: "Contact", desc: "Reach us", path: "/contact" },
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

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
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
    }, 100);
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding:
            window.innerWidth < 768
              ? "14px 18px"
              : scrolled
                ? "12px 38px"
                : "16px 34px",
          background: scrolled
            ? "rgba(8,6,3,0.95)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)",
          backdropFilter: "blur(14px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "none",
        }}
      >
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          style={{
            fontSize: window.innerWidth < 768 ? 22 : 26,
            fontWeight: 300,
            letterSpacing: "0.22em",
            cursor: "pointer",
            color: "#f5efe4",
            zIndex: 1200,
            userSelect: "none",
            fontFamily:
              "'Cormorant Garamond', 'Playfair Display', serif",
          }}
        >
          LU<span style={{ color: "#c8a050" }}>MI</span>NE
        </div>

        {/* DESKTOP MENU */}
        <div
          className="desktop-nav"
          style={{
            display: window.innerWidth < 1024 ? "none" : "flex",
            gap: 6,
            alignItems: "center",
          }}
        >
          {Object.keys(menu).map((key) => (
            <div
              key={key}
              style={{ position: "relative" }}
              onMouseEnter={() => handleEnter(key)}
              onMouseLeave={handleLeave}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: openMenu === key ? "#c8a050" : "#eee",
                  cursor: "pointer",
                  padding: "10px 16px",
                  fontSize: 13,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {key}
              </button>

              <AnimatePresence>
                {openMenu === key && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 420,
                      background: "#0d0b08",
                      borderRadius: 18,
                      padding: 14,
                      border: "1px solid rgba(200,160,80,0.14)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 8,
                      }}
                    >
                      {menu[key].links.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          style={{
                            textDecoration: "none",
                            padding: "12px",
                            borderRadius: 12,
                            transition: "0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              "rgba(200,160,80,0.08)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <div
                            style={{
                              color: "#f4eee2",
                              fontSize: 14,
                              marginBottom: 3,
                            }}
                          >
                            {item.name}
                          </div>

                          <div
                            style={{
                              color: "#857968",
                              fontSize: 11,
                            }}
                          >
                            {item.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* SEARCH */}
          <button
            onClick={() => navigate("/search")}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "1px solid rgba(200,160,80,0.25)",
              background: "transparent",
              cursor: "pointer",
              display: window.innerWidth < 768 ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c8a050"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </button>

          {/* RESERVE BUTTON */}
          <button
            onClick={() => navigate("/book")}
            style={{
              display: window.innerWidth < 768 ? "none" : "block",
              padding: "10px 18px",
              borderRadius: 8,
              background: "rgba(200,160,80,0.12)",
              border: "1px solid rgba(200,160,80,0.25)",
              color: "#c8a050",
              cursor: "pointer",
              letterSpacing: "0.12em",
              fontSize: 11,
              textTransform: "uppercase",
            }}
          >
            Reserve
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: window.innerWidth >= 1024 ? "none" : "flex",
              flexDirection: "column",
              gap: 5,
              padding: 4,
            }}
          >
            <span
              style={{
                width: 24,
                height: 2,
                background: "#c8a050",
              }}
            />
            <span
              style={{
                width: 24,
                height: 2,
                background: "#c8a050",
              }}
            />
            <span
              style={{
                width: 24,
                height: 2,
                background: "#c8a050",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                zIndex: 999,
              }}
            />

            {/* SIDEBAR */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "88%",
                maxWidth: 360,
                height: "100vh",
                background: "#0b0906",
                zIndex: 1000,
                overflowY: "auto",
                padding: "90px 0 30px",
                boxShadow: "-10px 0 40px rgba(0,0,0,0.4)",
              }}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setMobileOpen(false)}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid rgba(200,160,80,0.2)",
                  background: "transparent",
                  color: "#c8a050",
                  fontSize: 22,
                  cursor: "pointer",
                }}
              >
                ×
              </button>

              {/* SEARCH MOBILE */}
              <div style={{ padding: "0 24px 24px" }}>
                <button
                  onClick={() => {
                    navigate("/search");
                    setMobileOpen(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: 12,
                    border: "1px solid rgba(200,160,80,0.18)",
                    background: "rgba(200,160,80,0.06)",
                    color: "#f4eee2",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  Search
                </button>
              </div>

              {/* MENU ITEMS */}
              {Object.keys(menu).map((section) => (
                <div key={section}>
                  <button
                    onClick={() =>
                      setMobileSection(
                        mobileSection === section ? null : section
                      )
                    }
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      color: "#f3eee2",
                      padding: "16px 24px",
                      textAlign: "left",
                      fontSize: 15,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {section}

                    <span
                      style={{
                        transform:
                          mobileSection === section
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "0.2s",
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  <AnimatePresence>
                    {mobileSection === section && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{
                          overflow: "hidden",
                        }}
                      >
                        {menu[section].links.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            style={{
                              display: "block",
                              padding: "12px 38px",
                              textDecoration: "none",
                              borderBottom:
                                "1px solid rgba(255,255,255,0.04)",
                            }}
                          >
                            <div
                              style={{
                                color: "#f3eee2",
                                fontSize: 14,
                              }}
                            >
                              {item.name}
                            </div>

                            <div
                              style={{
                                color: "#7f7567",
                                fontSize: 11,
                                marginTop: 2,
                              }}
                            >
                              {item.desc}
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* CTA */}
              <div style={{ padding: 24 }}>
                <Link
                  to="/book"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "15px",
                    borderRadius: 12,
                    background: "rgba(200,160,80,0.1)",
                    border: "1px solid rgba(200,160,80,0.2)",
                    color: "#c8a050",
                    textDecoration: "none",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontSize: 12,
                  }}
                >
                  Reserve Table
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

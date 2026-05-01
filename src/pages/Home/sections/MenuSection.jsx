import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const categories = ["Starters", "Mains", "Desserts", "Wine Pairings"];

const menuItems = {
  Starters: [
    { name: "Oysters Rockefeller", desc: "Spinach, Pernod, hollandaise", price: "€18", note: "6 pieces" },
    { name: "Foie Gras Torchon", desc: "Brioche, Sauternes gelée, fig jam", price: "€28" },
    { name: "Lobster Bisque", desc: "Cognac cream, chive oil, tarragon", price: "€22", note: "Seasonal" },
    { name: "Burrata & Heirloom Tomato", desc: "Aged balsamic, micro basil", price: "€19" },
    { name: "Scallop Carpaccio", desc: "Yuzu dressing, salmon roe, shiso", price: "€24" },
    { name: "Wild Mushroom Velouté", desc: "Truffle foam, hazelnuts, chives", price: "€16", note: "Vegan" },
  ],
  Mains: [
    { name: "Wagyu Beef Tenderloin", desc: "Bordelaise, potato gratin, haricot vert", price: "€68", note: "A5 Grade" },
    { name: "Sea Bass en Papillote", desc: "Fennel, tomato, Provençal herbs", price: "€45" },
    { name: "Duck Confit", desc: "72-hour leg, cherry gastrique, lentils", price: "€38", note: "Signature" },
    { name: "Truffle Risotto", desc: "Carnaroli, black truffle, aged Parmesan", price: "€34", note: "Vegetarian" },
    { name: "Lamb Rack", desc: "Rosemary crust, dauphinoise, ratatouille", price: "€52" },
    { name: "Saffron Bouillabaisse", desc: "Market fish, rouille, sourdough crouton", price: "€42", note: "Chef's Pick" },
  ],
  Desserts: [
    { name: "Soufflé au Chocolat", desc: "Valrhona 70%, vanilla Chantilly", price: "€16", note: "18 min" },
    { name: "Tarte Tatin", desc: "Caramelized apple, crème fraîche sorbet", price: "€14" },
    { name: "Crème Brûlée", desc: "Madagascan vanilla, praline", price: "€12", note: "Classic" },
    { name: "Mille-Feuille", desc: "Seasonal fruit, pastry cream, caramel", price: "€15" },
    { name: "Cheese Trolley", desc: "Selection of 7 French cheeses", price: "€22" },
    { name: "Île Flottante", desc: "Poached meringue, crème anglaise, caramel", price: "€13" },
  ],
  "Wine Pairings": [
    { name: "Burgundy Pinot Noir 2019", desc: "Domaine Leroy, subtle tannins, cherry", price: "€95", note: "Paired with Duck" },
    { name: "Sancerre Blanc 2021", desc: "Henri Bourgeois, crisp mineral finish", price: "€55" },
    { name: "Château Margaux 2015", desc: "Bordeaux blend, full-bodied, classic", price: "€280", note: "Reserve" },
    { name: "Champagne Krug NV", desc: "Multi-vintage, toasty, complex", price: "€180" },
    { name: "Sauternes 2018", desc: "Château d'Yquem, golden, honeyed", price: "€120", note: "Dessert" },
    { name: "Sommelier Pairing Menu", desc: "4 curated glasses for your meal", price: "€85", note: "Per person" },
  ],
};

export default function MenuSection() {
  const [active, setActive] = useState("Starters");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="menu-full"
      ref={ref}
      style={{
        padding: isMobile ? "90px 20px" : "120px 48px",
        background: "#0a0804",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 42 : 64 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 12,
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#e8913a",
              }}
            >
              À La Carte
            </span>
            <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
          </motion.div>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: 700,
              color: "#f5efe6",
              margin: 0,
            }}
          >
            The Full <em style={{ color: "#e8913a" }}>Menu</em>
          </motion.h2>
        </div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "0.5px solid rgba(232,145,58,0.15)",
            marginBottom: isMobile ? 36 : 56,
            justifyContent: isMobile ? "flex-start" : "center",
            overflowX: isMobile ? "auto" : "visible",
            whiteSpace: "nowrap",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: isMobile ? 12 : 14,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: active === cat ? "#e8913a" : "#5a4a3a",
                background: "transparent",
                border: "none",
                borderBottom:
                  active === cat
                    ? "1px solid #e8913a"
                    : "1px solid transparent",
                padding: isMobile ? "12px 18px" : "12px 28px",
                cursor: "pointer",
                transition: "all 0.3s",
                marginBottom: -0.5,
                flexShrink: 0,
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "0" : "0 60px",
            }}
          >
            {menuItems[active].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexDirection: isMobile ? "column" : "row",
                  padding: "22px 0",
                  borderBottom: "0.5px solid rgba(232,145,58,0.07)",
                  gap: 12,
                }}
              >
                <div style={{ flex: 1, width: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 4,
                      flexWrap: "wrap",
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: isMobile ? 15 : 17,
                        fontWeight: 600,
                        color: "#f5efe6",
                        margin: 0,
                      }}
                    >
                      {item.name}
                    </h4>

                    {item.note && (
                      <span
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: 9,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#e8913a",
                          border: "0.5px solid rgba(232,145,58,0.4)",
                          padding: "2px 7px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.note}
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: isMobile ? 13 : 14,
                      color: "#5a4a3a",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>

                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: isMobile ? 16 : 18,
                    color: "#c47a30",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    marginTop: isMobile ? 8 : 0,
                  }}
                >
                  {item.price}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
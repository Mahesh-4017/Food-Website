import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "../../components/Breadcrumbs";     

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const menuData = {
  Starters: [
    {
      id: "s1",
      name: "Oysters Rockefeller",
      desc: "Half-shell oysters baked with spinach, Pernod cream and gruyère breadcrumbs.",
      price: 18,
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
      tags: ["Seafood", "Gluten-Free"],
      popular: true,
    },
    {
      id: "s2",
      name: "Foie Gras Torchon",
      desc: "Silky duck liver with brioche toast, Sauternes gelée and fig preserve.",
      price: 28,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      tags: ["Signature"],
      popular: false,
    },
    {
      id: "s3",
      name: "Burrata & Heirloom Tomato",
      desc: "Pugliese burrata, heirloom tomatoes, aged balsamic reduction, micro basil.",
      price: 19,
      image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&q=80",
      tags: ["Vegetarian", "Gluten-Free"],
      popular: true,
    },
    {
      id: "s4",
      name: "Wild Mushroom Velouté",
      desc: "Earthy cep and chanterelle soup, truffle foam, toasted hazelnuts, chive oil.",
      price: 16,
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80",
      tags: ["Vegan", "Gluten-Free"],
      popular: false,
    },
    {
      id: "s5",
      name: "Scallop Carpaccio",
      desc: "Hand-dived scallops, yuzu dressing, salmon roe, shiso leaf, sesame.",
      price: 24,
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80",
      tags: ["Seafood", "Gluten-Free"],
      popular: false,
    },
    {
      id: "s6",
      name: "Lobster Bisque",
      desc: "Cognac-flamed bisque with cream, tarragon oil and a whole claw garnish.",
      price: 22,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
      tags: ["Seafood", "Seasonal"],
      popular: true,
    },
  ],
  Mains: [
    {
      id: "m1",
      name: "Wagyu Beef Tenderloin",
      desc: "A5-grade wagyu, bone-marrow bordelaise, potato gratin, haricot vert.",
      price: 68,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
      tags: ["Signature", "Gluten-Free"],
      popular: true,
    },
    {
      id: "m2",
      name: "Duck Confit",
      desc: "72-hour duck leg, cherry gastrique, du Puy lentils, crispy duck skin.",
      price: 38,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
      tags: ["Signature", "Gluten-Free"],
      popular: true,
    },
    {
      id: "m3",
      name: "Truffle Risotto",
      desc: "Carnaroli rice, black truffle shavings, aged Parmigiano-Reggiano, chives.",
      price: 34,
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80",
      tags: ["Vegetarian", "Chef's Pick"],
      popular: false,
    },
    {
      id: "m4",
      name: "Lamb Rack",
      desc: "Herb-crusted lamb, Provençal dauphinoise, ratatouille, rosemary jus.",
      price: 52,
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
      tags: ["Gluten-Free"],
      popular: false,
    },
    {
      id: "m5",
      name: "Sea Bass en Papillote",
      desc: "Wild sea bass, fennel, heirloom tomatoes, Provençal herbs, olive oil.",
      price: 45,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
      tags: ["Seafood", "Gluten-Free"],
      popular: false,
    },
    {
      id: "m6",
      name: "Saffron Bouillabaisse",
      desc: "Market fish, mussels and clams in saffron broth, rouille, sourdough croutons.",
      price: 42,
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
      tags: ["Seafood", "Chef's Pick"],
      popular: true,
    },
  ],
  Desserts: [
    {
      id: "d1",
      name: "Soufflé au Chocolat",
      desc: "Valrhona 70% dark chocolate soufflé, vanilla Chantilly, cocoa nibs.",
      price: 16,
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80",
      tags: ["Vegetarian", "Signature"],
      popular: true,
    },
    {
      id: "d2",
      name: "Tarte Tatin",
      desc: "Caramelised Braeburn apple, rough puff pastry, crème fraîche sorbet.",
      price: 14,
      image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&q=80",
      tags: ["Vegetarian"],
      popular: false,
    },
    {
      id: "d3",
      name: "Crème Brûlée",
      desc: "Madagascan vanilla bean custard, caramelised sugar crust, praline tuile.",
      price: 12,
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
      tags: ["Vegetarian", "Gluten-Free"],
      popular: true,
    },
    {
      id: "d4",
      name: "Île Flottante",
      desc: "Poached meringue island, crème anglaise, caramel, toasted flaked almonds.",
      price: 13,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
      tags: ["Vegetarian", "Gluten-Free"],
      popular: false,
    },
    {
      id: "d5",
      name: "Cheese Board",
      desc: "Seven curated French cheeses, walnut bread, quince, honeycomb.",
      price: 22,
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80",
      tags: ["Vegetarian"],
      popular: false,
    },
  ],
  Drinks: [
    {
      id: "dr1",
      name: "Sommelier's Wine Pairing",
      desc: "Four curated glasses matched to your courses by our head sommelier.",
      price: 85,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80",
      tags: ["Pairing", "Signature"],
      popular: true,
    },
    {
      id: "dr2",
      name: "Krug Grande Cuvée NV",
      desc: "Prestige Champagne — toasty brioche, citrus, complex and persistent.",
      price: 48,
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
      tags: ["Champagne"],
      popular: false,
    },
    {
      id: "dr3",
      name: "Château Margaux 2015",
      desc: "Grand Cru Classé Bordeaux — blackcurrant, cedar, silky and profound.",
      price: 280,
      image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&q=80",
      tags: ["Red Wine", "Reserve"],
      popular: false,
    },
    {
      id: "dr4",
      name: "Seedlip Botanical Collins",
      desc: "Non-alcoholic Seedlip Spice 94, cucumber, elderflower, tonic.",
      price: 12,
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80",
      tags: ["Non-Alcoholic", "Cocktail"],
      popular: false,
    },
    {
      id: "dr5",
      name: "Espresso Martini",
      desc: "Cold-brew espresso, Kahlúa, vanilla vodka, sugar syrup, coffee foam.",
      price: 18,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
      tags: ["Cocktail"],
      popular: true,
    },
  ],
};

const ALL_CATEGORIES = ["All", ...Object.keys(menuData)];
const ALL_TAGS = ["All", "Vegetarian", "Vegan", "Gluten-Free", "Seafood", "Signature", "Chef's Pick", "Seasonal", "Non-Alcoholic"];

const TAG_COLORS = {
  Vegetarian:    { bg: "rgba(74,180,100,0.12)", border: "rgba(74,180,100,0.35)", color: "#4ab464" },
  Vegan:         { bg: "rgba(74,180,100,0.12)", border: "rgba(74,180,100,0.35)", color: "#4ab464" },
  "Gluten-Free": { bg: "rgba(120,180,240,0.1)", border: "rgba(120,180,240,0.3)", color: "#78b4f0" },
  Seafood:       { bg: "rgba(80,160,220,0.1)",  border: "rgba(80,160,220,0.3)",  color: "#50a0dc" },
  Signature:     { bg: "rgba(232,145,58,0.12)", border: "rgba(232,145,58,0.35)", color: "#e8913a" },
  "Chef's Pick": { bg: "rgba(232,145,58,0.12)", border: "rgba(232,145,58,0.35)", color: "#e8913a" },
  Seasonal:      { bg: "rgba(200,160,80,0.1)",  border: "rgba(200,160,80,0.3)",  color: "#c8a050" },
  Pairing:       { bg: "rgba(180,120,200,0.1)", border: "rgba(180,120,200,0.3)", color: "#b478c8" },
  Champagne:     { bg: "rgba(240,200,80,0.1)",  border: "rgba(240,200,80,0.3)",  color: "#f0c850" },
  "Red Wine":    { bg: "rgba(200,80,80,0.1)",   border: "rgba(200,80,80,0.3)",   color: "#c85050" },
  Reserve:       { bg: "rgba(200,80,80,0.1)",   border: "rgba(200,80,80,0.3)",   color: "#c85050" },
  Cocktail:      { bg: "rgba(180,120,200,0.1)", border: "rgba(180,120,200,0.3)", color: "#b478c8" },
  "Non-Alcoholic":{ bg: "rgba(120,200,180,0.1)",border: "rgba(120,200,180,0.3)", color: "#78c8b4" },
};

/* ─────────────────────────────────────────
   TAG PILL
───────────────────────────────────────── */
function TagPill({ label, small }) {
  const s = TAG_COLORS[label] || { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)", color: "#6a5a4a" };
  return (
    <span style={{
      background: s.bg,
      border: `0.5px solid ${s.border}`,
      color: s.color,
      fontSize: small ? 9 : 10,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: small ? "2px 7px" : "3px 9px",
      borderRadius: 20,
      fontWeight: 500,
      whiteSpace: "nowrap",
      fontFamily: "sans-serif",
    }}>
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────
   MENU ITEM CARD
───────────────────────────────────────── */
function MenuCard({ item, index, onAdd }) {
  const [qty, setQty] = useState(0);

  const handleAdd = () => {
    setQty(q => q + 1);
    onAdd(item);
  };
  const handleRemove = () => {
    if (qty > 0) {
      setQty(q => q - 1);
      onAdd(item, -1);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: index * 0.04, duration: 0.45, ease: [0.34, 1.1, 0.64, 1] }}
      whileHover="hover"
      style={{
        background: "#141414",
        borderRadius: 18,
        overflow: "hidden",
        border: "0.5px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Popular badge */}
      {item.popular && (
        <div style={{
          position: "absolute", top: 12, left: 12, zIndex: 3,
          background: "#e8913a", color: "#0c0c0c",
          fontFamily: "sans-serif", fontSize: 9,
          letterSpacing: "0.15em", textTransform: "uppercase",
          padding: "3px 10px", borderRadius: 20, fontWeight: 700,
        }}>
          Popular
        </div>
      )}

      {/* Image */}
      <div style={{ height: 180, overflow: "hidden", position: "relative", flexShrink: 0 }}>
        <motion.img
          src={item.image}
          alt={item.name}
          variants={{ hover: { scale: 1.06 } }}
          transition={{ duration: 0.55 }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(20,20,20,0.7) 0%, transparent 55%)",
        }} />
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Tags */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
          {item.tags.map(t => <TagPill key={t} label={t} small />)}
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 18, fontWeight: 700, color: "#f5efe6",
          lineHeight: 1.2, marginBottom: 6,
        }}>
          {item.name}
        </h3>

        {/* Desc */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 14, color: "#6a5a4a", lineHeight: 1.65,
          flex: 1, marginBottom: 16,
        }}>
          {item.desc}
        </p>

        {/* Price + qty controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20, fontWeight: 700, color: "#e8913a",
          }}>
            €{item.price}
          </span>

          <AnimatePresence mode="wait">
            {qty === 0 ? (
              <motion.button
                key="add"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                whileHover={{ background: "#f5a348" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdd}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "#e8913a", color: "#0c0c0c",
                  border: "none", padding: "8px 16px", borderRadius: 8,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 13, fontWeight: 600, letterSpacing: "0.1em",
                  cursor: "pointer", transition: "background 0.2s",
                }}
              >
                <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add
              </motion.button>
            ) : (
              <motion.div
                key="counter"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                style={{
                  display: "flex", alignItems: "center", gap: 0,
                  background: "rgba(232,145,58,0.1)",
                  border: "0.5px solid rgba(232,145,58,0.3)",
                  borderRadius: 8, overflow: "hidden",
                }}
              >
                <button onClick={handleRemove} style={{
                  width: 34, height: 34, background: "none", border: "none",
                  color: "#e8913a", fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(232,145,58,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >−</button>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 15, fontWeight: 700, color: "#e8913a",
                  minWidth: 24, textAlign: "center",
                }}>
                  {qty}
                </span>
                <button onClick={handleAdd} style={{
                  width: 34, height: 34, background: "none", border: "none",
                  color: "#e8913a", fontSize: 18, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(232,145,58,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}
                >+</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   CART DRAWER
───────────────────────────────────────── */
function CartDrawer({ cart, onClose, onClear }) {
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
          zIndex: 200, backdropFilter: "blur(4px)",
        }}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(400px, 100vw)",
          background: "#0f0f0f",
          borderLeft: "0.5px solid rgba(232,145,58,0.12)",
          zIndex: 201, display: "flex", flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "24px 24px 20px",
          borderBottom: "0.5px solid rgba(255,255,255,0.05)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22, fontWeight: 700, color: "#f5efe6", margin: 0,
            }}>
              Your Order
            </h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13, color: "#4a3a2a", margin: "2px 0 0",
            }}>
              {cart.reduce((s, i) => s + i.qty, 0)} items
            </p>
          </div>
          <button onClick={onClose} style={{
            background: "rgba(255,255,255,0.05)", border: "none",
            color: "#6a5a4a", width: 36, height: 36, borderRadius: "50%",
            cursor: "pointer", fontSize: 18, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 60 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🍽️</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#3a2a1a" }}>
                Your order is empty
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {cart.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{
                    display: "flex", gap: 14, alignItems: "center",
                    padding: "14px 0",
                    borderBottom: "0.5px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <img src={item.image} alt={item.name} style={{
                    width: 52, height: 52, borderRadius: 10,
                    objectFit: "cover", flexShrink: 0,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 14, fontWeight: 600, color: "#f5efe6",
                      margin: "0 0 2px",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {item.name}
                    </p>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 13, color: "#4a3a2a", margin: 0,
                    }}>
                      €{item.price} × {item.qty}
                    </p>
                  </div>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 15, fontWeight: 700, color: "#e8913a",
                  }}>
                    €{(item.price * item.qty).toFixed(0)}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{
            padding: "20px 24px 28px",
            borderTop: "0.5px solid rgba(255,255,255,0.05)",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#6a5a4a" }}>
                Total
              </span>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontWeight: 700, color: "#f5efe6",
              }}>
                €{total.toFixed(0)}
              </span>
            </div>
            <motion.button
              whileHover={{ background: "#f5a348" }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%", background: "#e8913a", color: "#0c0c0c",
                border: "none", padding: "14px 0", borderRadius: 10,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 14, fontWeight: 700, letterSpacing: "0.15em",
                textTransform: "uppercase", cursor: "pointer", marginBottom: 10,
              }}
            >
              Reserve & Confirm →
            </motion.button>
            <button onClick={onClear} style={{
              width: "100%", background: "none",
              border: "0.5px solid rgba(255,255,255,0.07)",
              color: "#3a2a1a", padding: "10px 0", borderRadius: 10,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13, letterSpacing: "0.1em", cursor: "pointer",
            }}>
              Clear Order
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

/* ─────────────────────────────────────────
   MAIN MENU PAGE
───────────────────────────────────────── */
const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item, delta = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        const newQty = existing.qty + delta;
        if (newQty <= 0) return prev.filter(i => i.id !== item.id);
        return prev.map(i => i.id === item.id ? { ...i, qty: newQty } : i);
      }
      if (delta < 0) return prev;
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const allItems = useMemo(() =>
    Object.entries(menuData).flatMap(([cat, items]) =>
      items.map(item => ({ ...item, category: cat }))
    ), []);

  const filtered = useMemo(() => {
    let list = activeCategory === "All"
      ? allItems
      : allItems.filter(i => i.category === activeCategory);

    if (activeTag !== "All")
      list = list.filter(i => i.tags.includes(activeTag));

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.desc.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, activeTag, search, allItems]);

  // Group by category for section headers when "All"
  const grouped = useMemo(() => {
    if (activeCategory !== "All" || activeTag !== "All" || search.trim()) {
      return [{ label: null, items: filtered }];
    }
    return Object.entries(menuData).map(([cat, items]) => ({ label: cat, items }));
  }, [activeCategory, activeTag, search, filtered]);

  return (
    <div style={{ minHeight: "100vh", background: "#0c0c0c", color: "#f5efe6" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #2a1a0a; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0c0c0c; }
        ::-webkit-scrollbar-thumb { background: rgba(232,145,58,0.2); border-radius: 2px; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 28px 80px" }}>
        <Breadcrumbs />
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 16,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 28, height: 0.5, background: "#e8913a" }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#e8913a",
              }}>
                À La Carte
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 700,
              color: "#f5efe6", lineHeight: 1.05, letterSpacing: "-0.5px",
            }}>
              Our <em style={{ color: "#e8913a", fontStyle: "italic" }}>Menu</em>
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 16, color: "#4a3a2a", marginTop: 8, maxWidth: 440,
            }}>
              Seasonal ingredients, time-honoured techniques, and a passion for perfection.
            </p>
          </div>

          {/* Cart button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setCartOpen(true)}
            style={{
              position: "relative",
              display: "flex", alignItems: "center", gap: 10,
              background: cartCount > 0 ? "#e8913a" : "rgba(232,145,58,0.08)",
              border: "0.5px solid rgba(232,145,58,0.3)",
              color: cartCount > 0 ? "#0c0c0c" : "#e8913a",
              padding: "12px 22px", borderRadius: 12,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20, fontWeight: 800, letterSpacing: "0.1em",
              cursor: "pointer", transition: "all 0.3s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1h2l2 8h7l2-5H4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="13" r="1" fill="currentColor"/>
              <circle cx="12" cy="13" r="1" fill="currentColor"/>
            </svg>
            View Order
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                style={{
                  background: cartCount > 0 ? "#0c0c0c" : "#e8913a",
                  color: cartCount > 0 ? "#e8913a" : "#0c0c0c",
                  borderRadius: "50%", width: 22, height: 22,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  paddingBottom: 4,
                  fontSize: 16, fontWeight: 900,
                }}
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </motion.div>

        {/* ── Search ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ position: "relative", maxWidth: 500, marginBottom: 28 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#3a2a1a", pointerEvents: "none" }}>
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
            <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search dishes…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "12px 16px 12px 36px",
              background: "rgba(255,255,255,0.03)",
              border: "0.5px solid rgba(255,255,255,0.07)",
              borderRadius: 10, color: "#d0b890",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15, outline: "none",
            }}
            onFocus={e => e.target.style.borderColor = "rgba(232,145,58,0.4)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.07)"}
          />
        </motion.div>

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}
        >
          {ALL_CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 18px", borderRadius: 20, border: "none",
                background: activeCategory === cat ? "#e8913a" : "rgba(255,255,255,0.04)",
                color: activeCategory === cat ? "#0c0c0c" : "#5a4a3a",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13, fontWeight: activeCategory === cat ? 700 : 400,
                letterSpacing: "0.08em", cursor: "pointer",
                transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Dietary tag filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: "flex", gap: 6, marginBottom: 48,
            overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none",
          }}
        >
          {ALL_TAGS.map(tag => {
            const active = activeTag === tag;
            const s = tag === "All" ? null : TAG_COLORS[tag];
            return (
              <motion.button
                key={tag}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: "5px 13px", borderRadius: 20,
                  border: active
                    ? (s ? `0.5px solid ${s.border}` : "0.5px solid rgba(232,145,58,0.5)")
                    : "0.5px solid rgba(255,255,255,0.06)",
                  background: active
                    ? (s ? s.bg : "rgba(232,145,58,0.1)")
                    : "rgba(255,255,255,0.02)",
                  color: active ? (s ? s.color : "#e8913a") : "#3a2a1a",
                  fontFamily: "sans-serif", fontSize: 10,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  cursor: "pointer", transition: "all 0.2s",
                  whiteSpace: "nowrap", flexShrink: 0,
                }}
              >
                {tag}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Menu sections ── */}
        <AnimatePresence mode="wait">
          <motion.div key={`${activeCategory}-${activeTag}-${search}`}>
            {grouped.map(({ label, items }) => (
              <div key={label || "all"} style={{ marginBottom: label ? 64 : 0 }}>
                {/* Section title */}
                {label && (
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 16, marginBottom: 28,
                    }}
                  >
                    <h2 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 28, fontWeight: 700, color: "#f5efe6",
                      whiteSpace: "nowrap",
                    }}>
                      {label}
                    </h2>
                    <div style={{ flex: 1, height: 0.5, background: "rgba(232,145,58,0.12)" }} />
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 12, color: "#3a2a1a", letterSpacing: "0.1em",
                    }}>
                      {items.length} dishes
                    </span>
                  </motion.div>
                )}

                {/* Cards grid */}
                {items.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 0", color: "#3a2a1a" }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20 }}>No dishes found</p>
                  </div>
                ) : (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 20,
                  }}>
                    <AnimatePresence>
                      {items.map((item, i) => (
                        <MenuCard key={item.id} item={item} index={i} onAdd={handleAddToCart} />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Cart Drawer ── */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            cart={cart}
            onClose={() => setCartOpen(false)}
            onClear={() => setCart([])}
          />
        )}
      </AnimatePresence>
      {/* Floating Order Button */}
{!cartOpen && (
  <motion.button
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setCartOpen(true)}
    style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      zIndex: 300,
      background: "#e8913a",
      color: "#0c0c0c",
      border: "none",
      borderRadius: 20,
      width: 60,
      height: 60,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      boxShadow: "0 8px 200px rgba(232,145,58,0.35)",
      position: "fixed",
    }}
  >
    <span style={{ fontSize: 22, lineHeight: 1 }}><img width={28} height={25} src="/grocery-cart.png" alt="cart" /></span>
    <span style={{
      fontSize: 9,
      fontWeight: 900,
      fontFamily: "sans-serif",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      opacity: 0.7,
    }}>
      Order
    </span>

    {cartCount > 0 && (
      <span style={{
        position: "absolute",
        top: -5,
        right: -5,
        width: 20,
        height: 20,
        background: "#f5efe6",
        color: "#0c0c0c",
        borderRadius: "50%",
        fontSize: 11,
        fontWeight: 700,
        fontFamily: "sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {cartCount}
      </span>
    )}
  </motion.button>
)}
    </div>
  );
};

export default Menu;
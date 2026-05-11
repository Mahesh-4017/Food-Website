import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { restaurants } from "../../data/BookData";
import Breadcrumbs from "../../components/Breadcrumbs";

const CONTINENTS = ["All", "Americas", "Europe", "Asia", "Oceania"];
const CUISINES = ["All", "Seafood", "Indian", "Japanese", "Italian", "Mexican", "Nordic", "Australian", "North Indian", "Peruvian"];
const PRICE_RANGES = ["All", "$", "$$", "$$$", "$$$$"];
const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "rating_desc", label: "Highest Rated" },
  { value: "stars_desc", label: "Most Stars" },
  { value: "name_asc", label: "Name A–Z" },
  { value: "founded_asc", label: "Oldest First" },
];

function StarBadge({ count }) {
  if (!count) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      background: "rgba(232,145,58,0.12)", border: "0.5px solid rgba(232,145,58,0.35)",
      color: "#e8913a", fontSize: 10, letterSpacing: "0.1em",
      padding: "3px 8px", borderRadius: 20, fontWeight: 600,
    }}>
      {"★".repeat(count)} Michelin
    </span>
  );
}

function PriceBadge({ price }) {
  return (
    <span style={{ fontSize: 12, color: "#6a5a4a", letterSpacing: "0.05em" }}>
      {price}
    </span>
  );
}

function RatingDot({ rating }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#c0a880" }}>
      <span style={{ color: "#e8913a", fontSize: 11 }}>★</span>
      {rating.toFixed(1)}
    </span>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      style={{
        padding: "6px 14px",
        borderRadius: 20,
        border: active ? "0.5px solid rgba(232,145,58,0.6)" : "0.5px solid rgba(255,255,255,0.07)",
        background: active ? "rgba(232,145,58,0.12)" : "rgba(255,255,255,0.03)",
        color: active ? "#e8913a" : "#5a4a3a",
        fontSize: 12,
        letterSpacing: "0.08em",
        cursor: "pointer",
        fontFamily: "'Cormorant Garamond', serif",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {label}
    </motion.button>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "0.5px solid rgba(255,255,255,0.08)",
        color: "#a09080",
        fontSize: 12,
        padding: "8px 32px 8px 12px",
        borderRadius: 8,
        cursor: "pointer",
        outline: "none",
        fontFamily: "'Cormorant Garamond', serif",
        letterSpacing: "0.08em",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%235a4a3a' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
      }}
    >
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}
          style={{ background: "#1a1410", color: "#d0b890" }}>
          {o.label ?? o}
        </option>
      ))}
    </select>
  );
}

function RestaurantCard({ restaurant, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.34, 1.1, 0.64, 1] }}
      whileHover="hover"
      style={{
        background: "#141414",
        borderRadius: 20,
        overflow: "hidden",
        border: "0.5px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s",
        cursor: "default",
      }}
    >
      {/* Image */}
      <div style={{ height: 200, overflow: "hidden", position: "relative", flexShrink: 0 }}>
        <motion.img
          src={restaurant.image}
          alt={restaurant.name}
          variants={{ hover: { scale: 1.06 } }}
          transition={{ duration: 0.6 }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(20,20,20,0.85) 0%, transparent 55%)",
        }} />
        {/* Founded year */}
        <div style={{
          position: "absolute", top: 12, right: 12,
          background: "rgba(12,12,12,0.75)", backdropFilter: "blur(8px)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 10, letterSpacing: "0.2em", color: "#6a5a4a",
          padding: "4px 10px", borderRadius: 20,
        }}>
          Est. {restaurant.founded}
        </div>
        {/* Star badge bottom-left */}
        <div style={{ position: "absolute", bottom: 12, left: 12 }}>
          <StarBadge count={restaurant.stars} />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Meta row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#e8913a",
          }}>
            {restaurant.cuisine}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <RatingDot rating={restaurant.rating} />
            <PriceBadge price={restaurant.priceRange} />
          </div>
        </div>

        {/* Name + city */}
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 20, fontWeight: 700, color: "#f5efe6",
          lineHeight: 1.2, marginBottom: 4,
        }}>
          {restaurant.name}
        </h2>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 12, color: "#5a4a3a", letterSpacing: "0.08em", marginBottom: 10,
        }}>
          {restaurant.city}, {restaurant.country}
        </p>

        {/* Description — expandable */}
        <AnimatePresence initial={false}>
          <motion.p
            animate={{ height: expanded ? "auto" : 48, opacity: 1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 14, color: "#7a6a58", lineHeight: 1.7,
              overflow: "hidden", marginBottom: 6,
            }}
          >
            {restaurant.description}
          </motion.p>
        </AnimatePresence>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 11, letterSpacing: "0.15em", color: "#4a3a2a",
            textTransform: "uppercase", marginBottom: 14,
            alignSelf: "flex-start", transition: "color 0.2s",
          }}
          onMouseEnter={e => e.target.style.color = "#e8913a"}
          onMouseLeave={e => e.target.style.color = "#4a3a2a"}
        >
          {expanded ? "Show less ↑" : "Read more ↓"}
        </button>

        {/* Tags */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16, marginTop: "auto" }}>
          {restaurant.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "sans-serif", fontSize: 10,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "#4a3a2a", border: "0.5px solid rgba(255,255,255,0.06)",
              padding: "3px 8px", borderRadius: 4,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href={restaurant.website}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ background: "#f5a348" }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "#e8913a", color: "#0c0c0c",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 13, fontWeight: 600, letterSpacing: "0.15em",
            textTransform: "uppercase", textDecoration: "none",
            padding: "11px 0", borderRadius: 10,
            transition: "background 0.2s",
          }}
        >
          <span>Reserve a Table</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Book() {
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("All");
  const [cuisine, setCuisine] = useState("All");
  const [price, setPrice] = useState("All");
  const [sort, setSort] = useState("default");
  const [michelinOnly, setMichelinOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...restaurants];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.country.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q)
      );
    }
    if (continent !== "All") list = list.filter(r => r.continent === continent);
    if (cuisine !== "All") list = list.filter(r => r.cuisine === cuisine);
    if (price !== "All") list = list.filter(r => r.priceRange === price);
    if (michelinOnly) list = list.filter(r => r.stars > 0);

    switch (sort) {
      case "rating_desc": list.sort((a, b) => b.rating - a.rating); break;
      case "stars_desc": list.sort((a, b) => b.stars - a.stars); break;
      case "name_asc": list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "founded_asc": list.sort((a, b) => a.founded - b.founded); break;
      default: break;
    }
    return list;
  }, [search, continent, cuisine, price, sort, michelinOnly]);

  return (
    <div style={{ minHeight: "100vh", background: "#0c0c0c", color: "#f5efe6", fontFamily: "sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #3a2a1a; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 28px 80px" }}>
        <Breadcrumbs />
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", marginBottom: 16 }}>
            <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#e8913a" }}>
              Worldwide Dining
            </span>
            <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(32px, 6vw, 72px)", fontWeight: 700,
            color: "#f5efe6", letterSpacing: "-0.5px", lineHeight: 1.1, marginBottom: 14,
          }}>
            Explore <em style={{ color: "#e8913a", fontStyle: "italic" }}>Extraordinary</em> Restaurants
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 18, color: "#5a4a3a", maxWidth: 560, margin: "0 auto", lineHeight: 1.7,
          }}>
            Discover the world's finest tables — from Michelin-starred temples to beloved neighbourhood icons.
          </p>
        </motion.div>

        {/* ── Search ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          style={{ position: "relative", marginBottom: 24, maxWidth: 560, margin: "0 auto 24px" }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#4a3a2a", pointerEvents: "none" }}>
            <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, city, cuisine…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "13px 16px 13px 38px",
              background: "rgba(255,255,255,0.04)",
              border: "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: 12, color: "#d0b890",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15, outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "rgba(232,145,58,0.4)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
          />
        </motion.div>

        {/* ── Filters bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ marginBottom: 40 }}
        >
          {/* Continent pills */}
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 12, scrollbarWidth: "none" }}>
            {CONTINENTS.map(c => (
              <FilterPill key={c} label={c} active={continent === c} onClick={() => setContinent(c)} />
            ))}
          </div>

          {/* Second row: dropdowns + toggle */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <Select value={cuisine} onChange={setCuisine}
              options={CUISINES.map(v => ({ value: v, label: v === "All" ? "All Cuisines" : v }))} />
            <Select value={price} onChange={setPrice}
              options={PRICE_RANGES.map(v => ({ value: v, label: v === "All" ? "Any Price" : v }))} />
            <Select value={sort} onChange={setSort} options={SORT_OPTIONS} />

            {/* Michelin toggle */}
            <motion.button
              onClick={() => setMichelinOnly(!michelinOnly)}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "8px 14px", borderRadius: 8,
                border: michelinOnly ? "0.5px solid rgba(232,145,58,0.6)" : "0.5px solid rgba(255,255,255,0.08)",
                background: michelinOnly ? "rgba(232,145,58,0.12)" : "rgba(255,255,255,0.03)",
                color: michelinOnly ? "#e8913a" : "#5a4a3a",
                fontSize: 12, fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.08em", cursor: "pointer", transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: 11 }}>★</span>
              Michelin Only
            </motion.button>

            {/* Result count */}
            <span style={{
              marginLeft: "auto",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13, color: "#3a2a1a", letterSpacing: "0.05em",
            }}>
              {filtered.length} {filtered.length === 1 ? "restaurant" : "restaurants"}
            </span>
          </div>
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: "center", padding: "80px 0" }}
            >
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#3a2a1a", marginBottom: 8 }}>
                No restaurants found
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "#2a1a0a" }}>
                Try adjusting your filters or search term
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              layout
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              <AnimatePresence>
                {filtered.map((r, i) => (
                  <RestaurantCard key={r.id} restaurant={r} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
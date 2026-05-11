import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import Breadcrumbs from "../../../components/Breadcrumbs";
/* ── helpers ── */
function getIngredients(drink) {
  const ings = [];
  for (let i = 1; i <= 15; i++) {
    const ing = drink[`strIngredient${i}`];
    if (ing && ing.trim()) ings.push(ing.trim());
  }
  return ings;
}

/* ── Detail Drawer ── */
function Drawer({ drink, onClose }) {
  useEffect(() => {
    document.body.style.overflow = drink ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [drink, onClose]);

  return (
    <AnimatePresence>
      {drink && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 50 }}
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, width: "min(480px,100vw)",
              background: "#0e0e0e", borderLeft: "1px solid rgba(212,175,55,0.2)",
              zIndex: 51, overflowY: "auto", display: "flex", flexDirection: "column",
            }}
          >
            {/* Hero */}
            <div style={{ position: "relative", height: 280, flexShrink: 0 }}>
              <img src={drink.strDrinkThumb} alt={drink.strDrink}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,#0e0e0e 0%,transparent 55%)" }} />
              <button onClick={onClose}
                style={{
                  position: "absolute", top: 14, right: 14,
                  background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "50%", width: 36, height: 36, color: "#fff", fontSize: 20,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                }}>×</button>
            </div>

            <div style={{ padding: "1.5rem 2rem 3rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#d4af37", margin: "0 0 6px" }}>
                  {drink.strAlcoholic} · {drink.strCategory}
                </p>
                <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "2rem", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.1 }}>
                  {drink.strDrink}
                </h2>
              </div>

              {/* Glass */}
              {drink.strGlass && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "rgba(212,175,55,0.07)", borderRadius: 10, border: "1px solid rgba(212,175,55,0.15)" }}>
                  <span style={{ fontSize: 18 }}>🥂</span>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.55)" }}>Serve in</span>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#d4af37" }}>{drink.strGlass}</span>
                </div>
              )}

              {/* Ingredients */}
              <div>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 12px" }}>Ingredients</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {getIngredients(drink).map((ing, i) => (
                    <motion.span key={i}
                      initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      style={{
                        background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.22)",
                        borderRadius: 999, padding: "5px 14px",
                        fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#d4af37",
                      }}>{ing}</motion.span>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 10px" }}>Method</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.85, margin: 0 }}>
                  {drink.strInstructions || "No instructions available."}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Timeline Item ── */
function TimelineItem({ drink, index, onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 48px 1fr",
        alignItems: "start",
        marginBottom: "3.5rem",
        gap: "0 0",
      }}
    >
      {/* Left slot */}
      <div style={{ paddingRight: "2rem", textAlign: "right" }}>
        {isEven ? <TimelineCard drink={drink} onOpen={onOpen} align="right" /> : <div />}
      </div>

      {/* Center dot */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20 }}>
        <motion.div
          initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          style={{
            width: 16, height: 16, borderRadius: "50%",
            background: "#d4af37",
            boxShadow: "0 0 0 4px rgba(212,175,55,0.15), 0 0 0 8px rgba(212,175,55,0.05)",
            flexShrink: 0,
          }}
        />
      </div>

      {/* Right slot */}
      <div style={{ paddingLeft: "2rem" }}>
        {!isEven ? <TimelineCard drink={drink} onOpen={onOpen} align="left" /> : <div />}
      </div>
    </motion.div>
  );
}

/* ── Card ── */
function TimelineCard({ drink, onOpen, align }) {
  const [hovered, setHovered] = useState(false);
  const ings = getIngredients(drink).slice(0, 3);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={() => onOpen(drink)}
      style={{
        background: "#111",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.45)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 18, overflow: "hidden", cursor: "pointer",
        transition: "border-color 0.3s",
        boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.7)" : "none",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: 180 }}>
        <motion.img
          src={drink.strDrinkThumb} alt={drink.strDrink}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 60%)" }} />

        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.35)",
          }}
        >
          <span style={{
            fontFamily: "'DM Mono',monospace", fontSize: 12, letterSpacing: 2,
            textTransform: "uppercase", color: "#d4af37",
            border: "1px solid rgba(212,175,55,0.5)", borderRadius: 999,
            padding: "8px 20px", background: "rgba(0,0,0,0.5)",
          }}>View Recipe</span>
        </motion.div>
      </div>

      {/* Body */}
      <div style={{ padding: "1.25rem 1.5rem" }}>
        <p style={{
          fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: 3,
          textTransform: "uppercase", color: "#d4af37", margin: "0 0 6px",
        }}>{drink.strCategory || "Cocktail"}</p>

        <h3 style={{
          fontFamily: "'Playfair Display',Georgia,serif",
          fontSize: "1.2rem", fontWeight: 700, color: "#fff",
          margin: "0 0 10px", lineHeight: 1.2,
        }}>{drink.strDrink}</h3>

        {/* Ingredient chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {ings.map((ing, i) => (
            <span key={i} style={{
              fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.45)",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 999, padding: "3px 10px",
            }}>{ing}</span>
          ))}
          {getIngredients(drink).length > 3 && (
            <span style={{
              fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(212,175,55,0.6)",
              background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)",
              borderRadius: 999, padding: "3px 10px",
            }}>+{getIngredients(drink).length - 3} more</span>
          )}
        </div>

        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: 12,
          color: "rgba(255,255,255,0.35)", margin: 0, lineHeight: 1.7,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{drink.strInstructions}</p>
      </div>
    </motion.div>
  );
}

/* ── Skeleton ── */
function Skeleton() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 48px 1fr", gap: 0, marginBottom: "3.5rem" }}>
      <div style={{ paddingRight: "2rem" }}>
        <div style={{ height: 280, borderRadius: 18, background: "rgba(255,255,255,0.04)", animation: "shimmer 1.5s infinite" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
        <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(212,175,55,0.2)" }} />
      </div>
      <div />
    </div>
  );
}

/* ── Main Page ── */
export default function Latest() {
  const [drinks, setDrinks] = useState([]);
  const [random, setRandom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Fetch latest drinks
  useEffect(() => {
    (async () => {
      try {
        let list = [];
        const res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/latest.php");
        const data = await res.json();
        list = data.drinks || [];
        if (!list.length) {
          const fb = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=martini");
          const fd = await fb.json();
          list = fd.drinks || [];
        }
        setDrinks(list);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    })();
  }, []);

  // Fetch 6 random drinks
  useEffect(() => {
    (async () => {
      try {
        const results = await Promise.all(
          Array.from({ length: 16 }, () =>
            fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
              .then(r => r.json())
              .then(d => d.drinks?.[0])
          )
        );
        setRandom(results.filter(Boolean));
      } catch (err) { console.error(err); }
    })();
  }, []);

  return (
    <div style={{ minHeight: "100vh",padding: "65px 20px", background: "#080808", color: "#fff", overflowX: "hidden" }}>
      <Breadcrumbs />
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes shimmer { 0%{opacity:.6} 50%{opacity:1} 100%{opacity:.6} }
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 4px; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ height: "70vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(212,175,55,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.04) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Radial glow */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%,rgba(212,175,55,0.08) 0%,transparent 70%)" }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity, position: "relative", textAlign: "center", padding: "0 1.5rem" }}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "1.5rem" }}
          >
            <span style={{ width: 32, height: 1, background: "rgba(212,175,55,0.5)", display: "inline-block" }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#d4af37" }}>
              Fresh from the bar
            </span>
            <span style={{ width: 32, height: 1, background: "rgba(212,175,55,0.5)", display: "inline-block" }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(3rem,9vw,7rem)", fontWeight: 900, lineHeight: 1, color: "#fff", letterSpacing: -2 }}
          >
            Latest<br />
            <em style={{ color: "#d4af37", fontStyle: "italic" }}>Cocktails</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: "rgba(255,255,255,0.4)", marginTop: "1.25rem", maxWidth: 420, margin: "1.25rem auto 0" }}
          >
            Freshly added recipes from TheCocktailDB — explore the newest arrivals
          </motion.p>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            style={{ marginTop: "3rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              style={{ width: 1, height: 40, background: "linear-gradient(to bottom,transparent,rgba(212,175,55,0.6))" }}
            />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>scroll</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 1.5rem 8rem", position: "relative" }}>

        {/* Vertical line */}
        <div style={{
          position: "absolute", left: "50%", top: 0, bottom: 0,
          width: 1, background: "linear-gradient(to bottom,transparent,rgba(212,175,55,0.2) 10%,rgba(212,175,55,0.2) 90%,transparent)",
          transform: "translateX(-50%)",
        }} />

        {/* Count badge */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              textAlign: "center", marginBottom: "3rem", position: "relative", zIndex: 1,
            }}
          >
            <span style={{
              fontFamily: "'DM Mono',monospace", fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
              color: "#d4af37", background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.2)", borderRadius: 999,
              padding: "8px 24px",
            }}>
              {drinks.length + random.length} recipes found
            </span>
          </motion.div>
        )}

        {/* Loading skeletons */}
        {loading && [0,1,2,3].map(i => <Skeleton key={i} />)}

        {/* Latest + Random — unified timeline */}
        {!loading && [...drinks, ...random].map((drink, i) => (
          <TimelineItem key={`${drink.idDrink}-${i}`} drink={drink} index={i} onOpen={setSelected} />
        ))}

        {/* End marker */}
        {!loading && (drinks.length + random.length) > 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ textAlign: "center", position: "relative", zIndex: 1 }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              fontFamily: "'DM Mono',monospace", fontSize: 11, letterSpacing: 3,
              textTransform: "uppercase", color: "rgba(255,255,255,0.2)",
            }}>
              <span style={{ width: 40, height: 1, background: "rgba(255,255,255,0.1)", display: "inline-block" }} />
              End of list
              <span style={{ width: 40, height: 1, background: "rgba(255,255,255,0.1)", display: "inline-block" }} />
            </div>
          </motion.div>
        )}
      </section>

      {/* ── DRAWER ── */}
      <Drawer drink={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
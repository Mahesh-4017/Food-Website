import { useEffect, useState, useRef } from "react";

const MARQUEE_ITEMS = [
  "Margarita","Mojito","Old Fashioned","Negroni","Cosmopolitan",
  "Daiquiri","Aperol Spritz","Whiskey Sour","Moscow Mule","Espresso Martini"
];

// Fetch drinks by multiple search terms and deduplicate by idDrink
async function fetchAllDrinks() {
  const terms = [
    "margarita","mojito","daiquiri","negroni","cosmopolitan",
    "old fashioned","whiskey","rum","vodka","gin","tequila","brandy"
  ];
  const results = await Promise.allSettled(
    terms.map(t =>
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(t)}`)
        .then(r => r.json())
        .then(d => d.drinks || [])
    )
  );
  const all = results.flatMap(r => r.status === "fulfilled" ? r.value : []);
  const seen = new Set();
  return all.filter(d => { if (seen.has(d.idDrink)) return false; seen.add(d.idDrink); return true; });
}

function useCountUp(target, duration = 1500, suffix = "") {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setValue(target); clearInterval(timer); return; }
      setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value + suffix;
}

function getIngredients(drink) {
  const ings = [];
  for (let i = 1; i <= 15; i++) {
    const ing = drink[`strIngredient${i}`];
    const meas = drink[`strMeasure${i}`];
    if (ing && ing.trim()) ings.push((meas ? meas.trim() + " " : "") + ing.trim());
  }
  return ings;
}

function StarRating({ seed }) {
  const count = 3 + (seed % 2);
  return (
    <span style={{ color: "#c9a84c", fontSize: 13 }}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

function Modal({ drink, onClose }) {
  const ingredients = drink ? getIngredients(drink) : [];

  useEffect(() => {
    document.body.style.overflow = drink ? "hidden" : "";
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [drink, onClose]);

  if (!drink) return null;

  // Split "1 1/2 oz Tequila" → { amount: "1 1/2 oz", name: "Tequila" }
  const parseIngredient = (str) => {
    const match = str.match(/^([\d\s\/]+(?:oz|ml|cl|tsp|tbsp|dash|cup|part)?\.?\s*)/i);
    return match
      ? { amount: match[1].trim(), name: str.replace(match[1], "").trim() }
      : { amount: "", name: str };
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.82)",
        zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem", animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        style={{
          background: "#141414",
          border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: 20,
          width: "100%",
          maxWidth: 860,
          maxHeight: "90vh",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          animation: "scaleIn 0.25s ease",
        }}
      >
        {/* ── LEFT: Image panel ── */}
        <div style={{ position: "relative", minHeight: 500 }}>
          <img
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          {/* Dark gradient over image bottom */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)",
            pointerEvents: "none",
          }} />

          {/* Title overlay */}
          <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem" }}>
            <span style={{
              background: "rgba(201,168,76,0.18)",
              border: "1px solid rgba(201,168,76,0.4)",
              borderRadius: 999, padding: "4px 14px",
              fontFamily: "Helvetica Neue,sans-serif",
              fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#c9a84c",
            }}>
              {drink.strAlcoholic}{drink.strCategory ? ` · ${drink.strCategory}` : ""}
            </span>
            <h2 style={{
              margin: "0.6rem 0 0",
              fontFamily: "Georgia,serif", fontSize: "2rem",
              fontWeight: 400, color: "#fff", lineHeight: 1.1,
            }}>
              {drink.strDrink}
            </h2>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 12, right: 12,
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50%", width: 34, height: 34,
              color: "#fff", fontSize: 18, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >×</button>
        </div>

        {/* ── RIGHT: Details panel ── */}
        <div style={{
          padding: "2rem", overflowY: "auto", maxHeight: "90vh",
          display: "flex", flexDirection: "column", gap: "1.5rem",
        }}>

          {/* Meta chips */}
          <div style={{ display: "flex", gap: "1rem" }}>
            {[
              { label: "Glass", value: drink.strGlass || "—" },
              { label: "Rating", value: "★★★★☆", isStars: true },
            ].map(({ label, value, isStars }) => (
              <div key={label} style={{
                flex: 1, background: "rgba(201,168,76,0.07)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 12, padding: "0.9rem 1rem", textAlign: "center",
              }}>
                <div style={{ fontFamily: "Helvetica Neue,sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>
                  {label}
                </div>
                <div style={{ fontFamily: isStars ? "inherit" : "Georgia,serif", fontSize: "0.95rem", color: isStars ? "#c9a84c" : "#fff" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Ingredients list */}
          <div>
            <div style={{ fontFamily: "Helvetica Neue,sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>
              Ingredients
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {ingredients.map((ing, i) => {
                const { amount, name } = parseIngredient(ing);
                return (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "8px 12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10,
                  }}>
                    <span style={{ fontFamily: "Helvetica Neue,sans-serif", fontSize: 13, color: "#fff" }}>{name}</span>
                    {amount && (
                      <span style={{
                        fontFamily: "Helvetica Neue,sans-serif", fontSize: 12, color: "#c9a84c",
                        background: "rgba(201,168,76,0.1)", padding: "2px 10px", borderRadius: 999,
                      }}>{amount}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <div style={{ fontFamily: "Helvetica Neue,sans-serif", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.75rem" }}>
              Instructions
            </div>
            <p style={{ fontFamily: "Helvetica Neue,sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.8}}>
              {drink.strInstructions || "No instructions available."}
            </p>
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: "auto", paddingTop: "0.5rem" }}>
            <button
              style={{
                flex: 1, background: "#c9a84c", color: "#000", border: "none",
                borderRadius: 999, padding: "12px", cursor: "pointer",
                fontFamily: "Helvetica Neue,sans-serif", fontSize: 13,
                fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#e8c878"}
              onMouseLeave={e => e.currentTarget.style.background = "#c9a84c"}
            >Save Recipe</button>
            <button
              style={{
                flex: 1, background: "transparent", color: "#c9a84c",
                border: "1px solid rgba(201,168,76,0.35)", borderRadius: 999,
                padding: "12px", cursor: "pointer",
                fontFamily: "Helvetica Neue,sans-serif", fontSize: 13,
                fontWeight: 600, letterSpacing: 1, textTransform: "uppercase",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >Share</button>
          </div>

        </div>
      </div>
    </div>
  );
}

function DrinkCard({ drink, index, onOpen }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(drink)}
      style={{
        background: "#141414", borderRadius: 20, overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.05)"}`,
        cursor: "pointer", transition: "all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.6)" : "none",
        animation: `cardIn 0.6s ${index * 0.07}s ease both`
      }}
    >
      <div style={{ overflow: "hidden", position: "relative" }}>
        <img src={drink.strDrinkThumb} alt={drink.strDrink}
          style={{ width: "100%", height: 240, objectFit: "cover", display: "block", transition: "transform 0.6s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }} />
        <span style={{
          position: "absolute", top: 12, right: 12,
          background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(201,168,76,0.3)", padding: "4px 12px",
          borderRadius: 999, fontFamily: "Helvetica Neue,sans-serif", fontSize: 11,
          letterSpacing: 1, color: "#c9a84c", textTransform: "uppercase"
        }}>{drink.strAlcoholic || "Classic"}</span>
      </div>

      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ fontFamily: "Georgia,serif", fontSize: "1.25rem", fontWeight: 400, color: "#fff", marginBottom: 4 }}>
          {drink.strDrink}
        </h3>
        <p style={{ fontFamily: "Helvetica Neue,sans-serif", fontSize: 12, letterSpacing: 1, textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1.25rem" }}>
          {drink.strCategory || "Cocktail"}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(drink); }}
            style={{
              fontFamily: "Helvetica Neue,sans-serif", fontSize: 12, fontWeight: 600,
              letterSpacing: 1.5, textTransform: "uppercase", color: "#c9a84c",
              background: "none", border: "1px solid rgba(201,168,76,0.3)",
              padding: "8px 18px", borderRadius: 999, cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#c9a84c"; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#c9a84c"; }}
          >
            View Recipe
          </button>
          <StarRating seed={parseInt(drink.idDrink) % 2} />
        </div>
      </div>
    </div>
  );
}

export default function CocktailApp() {
  const [drinks, setDrinks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [visible, setVisible] = useState(12);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [categories, setCategories] = useState(["All"]);

  const recipes = useCountUp(500, 1600, "+");
  const spirits = useCountUp(120, 1600, "+");
  const mixers  = useCountUp(50,  1600, "K");
  const experts = useCountUp(48,  1600);

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchAllDrinks();
        setDrinks(list);
        setFiltered(list);
        setCategories(["All", ...new Set(list.map(d => d.strAlcoholic || "Other"))]);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    })();
  }, []);

  const handleFilter = (cat) => {
    setActiveFilter(cat);
    setVisible(12);
    setFiltered(cat === "All" ? drinks : drinks.filter(d => (d.strAlcoholic || "Other") === cat));
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => { setVisible(v => v + 12); setLoadingMore(false); }, 600);
  };

  const marqueeList = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "Georgia,serif" }}>

      {/* ── CSS KEYFRAMES ── */}
      <style>{`
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn  { from{transform:scale(0.94)} to{transform:scale(1)} }
        @keyframes cardIn   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse    { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.1);opacity:1} }
        @keyframes float    { 0%,100%{transform:translateY(-50%) rotate(-5deg)} 50%{transform:translateY(-53%) rotate(5deg)} }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes scrollDrop {
          0%   { transform:scaleY(0); transform-origin:top }
          50%  { transform:scaleY(1); transform-origin:top }
          51%  { transform:scaleY(1); transform-origin:bottom }
          100% { transform:scaleY(0); transform-origin:bottom }
        }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .skeleton {
          background: linear-gradient(90deg,#1a1a1a 25%,#242424 50%,#1a1a1a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 16px;
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", position: "relative", display: "flex",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "2rem 1.5rem", overflow: "hidden",
        background: "radial-gradient(ellipse at 70% 40%,#3a1a00 0%,#1a0a00 40%,#0a0a0a 70%)"
      }}>
        {/* Orbs */}
        {[
          { w:600, h:600, top:-100, right:-100, delay:0 },
          { w:400, h:400, bottom:-50, left:-50, delay:-2 }
        ].map((o,i) => (
          <div key={i} style={{
            position:"absolute", borderRadius:"50%", pointerEvents:"none",
            background:"radial-gradient(circle,rgba(201,168,76,.15) 0%,transparent 70%)",
            width:o.w, height:o.h, top:o.top, right:o.right, bottom:o.bottom, left:o.left,
            animation:`pulse 4s ${o.delay}s ease-in-out infinite`
          }} />
        ))}

        {/* Floating emoji */}
        <div style={{
          position:"absolute", right:"5%", top:"50%", fontSize:"16rem", lineHeight:1,
          opacity:.08, pointerEvents:"none", userSelect:"none",
          animation:"float 6s ease-in-out infinite"
        }}>🍹</div>

        <div style={{ position:"relative", zIndex:1, animation:"fadeUp 0.8s ease both" }}>
          {/* Badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            border:"1px solid rgba(201,168,76,.4)", borderRadius:999,
            padding:"6px 16px", marginBottom:"2rem",
            fontFamily:"Helvetica Neue,sans-serif", fontSize:11, letterSpacing:3,
            textTransform:"uppercase", color:"#c9a84c"
          }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#c9a84c", animation:"blink 2s infinite", display:"inline-block" }} />
            Est. 2024 · Premium Craft Bar
          </div>

          <h1 style={{ fontSize:"clamp(3rem,8vw,6.5rem)", fontWeight:400, lineHeight:1.05, letterSpacing:-2, color:"#fff" }}>
            Craft the{" "}
            <em style={{ color:"#c9a84c" }}>Perfect</em>
            <br />Cocktail Experience
          </h1>

          <p style={{
            maxWidth:520, margin:"1.5rem auto 0",
            fontFamily:"Helvetica Neue,sans-serif", fontSize:16,
            color:"rgba(255,255,255,.5)", lineHeight:1.7
          }}>
            From classic margaritas to exotic blends — discover the art of mixology with over 500 handcrafted recipes.
          </p>

          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap", marginTop:"2.5rem" }}>
            <button
              onClick={() => document.getElementById("cocktails")?.scrollIntoView({ behavior:"smooth" })}
              style={{
                background:"#c9a84c", color:"#000", padding:"14px 32px", borderRadius:999,
                border:"none", cursor:"pointer", fontFamily:"Helvetica Neue,sans-serif",
                fontSize:14, fontWeight:600, letterSpacing:1, textTransform:"uppercase", transition:"all .3s"
              }}
              onMouseEnter={e => { e.currentTarget.style.background="#e8c878"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="#c9a84c"; e.currentTarget.style.transform="translateY(0)"; }}
            >Explore Cocktails</button>

            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior:"smooth" })}
              style={{
                background:"transparent", color:"#fff", padding:"14px 32px", borderRadius:999,
                border:"1px solid rgba(255,255,255,.2)", cursor:"pointer",
                fontFamily:"Helvetica Neue,sans-serif", fontSize:14, letterSpacing:1,
                textTransform:"uppercase", transition:"all .3s"
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.5)"; e.currentTarget.style.background="rgba(255,255,255,.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.2)"; e.currentTarget.style.background="transparent"; }}
            >Our Philosophy</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position:"absolute", bottom:"2rem", left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:8,
          color:"rgba(255,255,255,.3)", fontFamily:"Helvetica Neue,sans-serif",
          fontSize:11, letterSpacing:2, textTransform:"uppercase",
          animation:"fadeUp 0.8s 1s ease both"
        }}>
          <span>Scroll</span>
          <div style={{ width:1, height:40, background:"linear-gradient(to bottom,rgba(201,168,76,.6),transparent)", animation:"scrollDrop 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{
        background:"#141414", borderTop:"1px solid rgba(201,168,76,.1)", borderBottom:"1px solid rgba(201,168,76,.1)",
        display:"flex", justifyContent:"space-around", flexWrap:"wrap", padding:"2rem 1rem", gap:"1rem"
      }}>
        {[
          { num: recipes, label: "Cocktail Recipes" },
          { num: spirits, label: "Spirit Varieties" },
          { num: mixers,  label: "Monthly Mixers" },
          { num: experts, label: "Expert Bartenders" }
        ].map(({ num, label }) => (
          <div key={label} style={{ textAlign:"center", minWidth:100 }}>
            <div style={{ fontSize:"2.5rem", color:"#c9a84c", fontWeight:300, letterSpacing:-1 }}>{num}</div>
            <div style={{ fontFamily:"Helvetica Neue,sans-serif", fontSize:11, letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,.4)", marginTop:4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── MARQUEE ── */}
      <div style={{ background:"#111", borderBottom:"1px solid rgba(201,168,76,.1)", padding:"1.25rem 0", overflow:"hidden" }}>
        <div style={{ display:"flex", gap:"3rem", animation:"marquee 20s linear infinite", whiteSpace:"nowrap" }}>
          {marqueeList.map((item, i) => (
            <span key={i}>
              <span style={{ fontFamily:"Helvetica Neue,sans-serif", fontSize:13, letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,.2)" }}>{item}</span>
              <span style={{ color:"#c9a84c", margin:"0 1.5rem" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── COCKTAILS SECTION ── */}
      <section id="cocktails" style={{ maxWidth:1200, margin:"0 auto", padding:"5rem 1.5rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"3rem", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <div style={{ fontFamily:"Helvetica Neue,sans-serif", fontSize:11, letterSpacing:3, textTransform:"uppercase", color:"#c9a84c", marginBottom:"0.75rem" }}>Featured Collection</div>
            <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:400, lineHeight:1.1 }}>
              Signature <em style={{ color:"rgba(255,255,255,.35)" }}>Margaritas</em>
            </h2>
          </div>
          <span style={{ fontFamily:"Helvetica Neue,sans-serif", fontSize:13, color:"rgba(255,255,255,.4)", borderBottom:"1px solid rgba(255,255,255,.15)", paddingBottom:2, cursor:"pointer" }}>
            View all recipes →
          </span>
        </div>

        {/* Filter pills */}
        <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap", marginBottom:"3rem" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => handleFilter(cat)}
              style={{
                fontFamily:"Helvetica Neue,sans-serif", fontSize:13, padding:"8px 20px",
                borderRadius:999, border:"1px solid rgba(255,255,255,.12)", cursor:"pointer",
                transition:"all .2s",
                background: activeFilter === cat ? "#c9a84c" : "transparent",
                color: activeFilter === cat ? "#000" : "rgba(255,255,255,.6)",
                borderColor: activeFilter === cat ? "#c9a84c" : "rgba(255,255,255,.12)"
              }}
            >{cat}</button>
          ))}
        </div>

        {/* Cards */}
        {loading ? (
          <div style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap", justifyContent:"center", padding:"2rem 0" }}>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} className="skeleton" style={{ width:280, height:380, animationDelay:`${i*0.1}s` }} />
            ))}
          </div>
        ) : (
          <>
            {/* Results count */}
            <div style={{ fontFamily:"Helvetica Neue,sans-serif", fontSize:13, color:"rgba(255,255,255,.3)", marginBottom:"1.5rem" }}>
              Showing <span style={{ color:"#c9a84c" }}>{Math.min(visible, filtered.length)}</span> of <span style={{ color:"#c9a84c" }}>{filtered.length}</span> cocktails
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1.5rem" }}>
              {filtered.slice(0, visible).map((drink, i) => (
                <DrinkCard key={drink.idDrink} drink={drink} index={i % 12} onOpen={setSelectedDrink} />
              ))}
              {/* Skeleton placeholders while loading more */}
              {loadingMore && [0,1,2].map(i => (
                <div key={`sk-${i}`} className="skeleton" style={{ height:380, animationDelay:`${i*0.1}s` }} />
              ))}
            </div>

            {/* Load More button */}
            {visible < filtered.length && !loadingMore && (
              <div style={{ textAlign:"center", marginTop:"3rem" }}>
                <button
                  onClick={handleLoadMore}
                  style={{
                    background:"transparent", color:"#c9a84c",
                    border:"1px solid rgba(201,168,76,.4)", borderRadius:999,
                    padding:"14px 40px", cursor:"pointer",
                    fontFamily:"Helvetica Neue,sans-serif", fontSize:14,
                    fontWeight:600, letterSpacing:1.5, textTransform:"uppercase",
                    transition:"all .3s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background="#c9a84c"; e.currentTarget.style.color="#000"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#c9a84c"; }}
                >
                  Load More · {filtered.length - visible} remaining
                </button>
              </div>
            )}

            {/* All loaded message */}
            {visible >= filtered.length && filtered.length > 12 && (
              <div style={{ textAlign:"center", marginTop:"3rem", fontFamily:"Helvetica Neue,sans-serif", fontSize:13, color:"rgba(255,255,255,.2)", letterSpacing:2, textTransform:"uppercase" }}>
                ✦ All {filtered.length} cocktails loaded ✦
              </div>
            )}
          </>
        )}
      </section>

      {/* ── ABOUT / FEATURES ── */}
      <section id="about" style={{
        background:"#111", borderRadius:24, padding:"4rem 2rem",
        maxWidth:1200, margin:"0 auto 4rem"
      }}>
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <div style={{ fontFamily:"Helvetica Neue,sans-serif", fontSize:11, letterSpacing:3, textTransform:"uppercase", color:"#c9a84c", marginBottom:"0.75rem" }}>Why Choose Us</div>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3rem)", fontWeight:400 }}>
            The Art <em style={{ color:"rgba(255,255,255,.35)" }}>Behind</em> Every Pour
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"2rem" }}>
          {[
            { icon:"🌿", title:"Fresh Ingredients", desc:"Only the finest fresh-squeezed citrus, artisanal spirits, and handpicked herbs." },
            { icon:"📖", title:"Expert Recipes",    desc:"Curated by world-class bartenders with decades of mixology experience." },
            { icon:"🔥", title:"Trending Mixes",    desc:"Stay ahead of cocktail culture with weekly drops of trending new flavors." },
            { icon:"🎓", title:"Learn & Create",    desc:"Step-by-step tutorials for beginners and advanced mixologists alike." }
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{
              background:"#141414", borderRadius:16, padding:"2rem 1.5rem",
              border:"1px solid rgba(255,255,255,.05)", transition:"border-color .3s"
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor="rgba(201,168,76,.2)"}
              onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,.05)"}
            >
              <div style={{ fontSize:"2rem", marginBottom:"1rem" }}>{icon}</div>
              <div style={{ fontSize:"1rem", fontWeight:400, marginBottom:"0.5rem" }}>{title}</div>
              <div style={{ fontFamily:"Helvetica Neue,sans-serif", fontSize:13, color:"rgba(255,255,255,.4)", lineHeight:1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <div style={{
        background:"linear-gradient(135deg,#1a0e00,#0d0a00)", borderRadius:24,
        padding:"4rem 2rem", textAlign:"center", maxWidth:1200, margin:"0 1.5rem 4rem",
        border:"1px solid rgba(201,168,76,.2)", marginLeft:"auto", marginRight:"auto"
      }}>
        <div style={{ fontFamily:"Helvetica Neue,sans-serif", fontSize:11, letterSpacing:3, textTransform:"uppercase", color:"#c9a84c", marginBottom:"1rem" }}>Join the Club</div>
        <h2 style={{ fontSize:"clamp(2rem,4vw,3.5rem)", fontWeight:400, marginBottom:"1rem" }}>
          Ready to Master <em style={{ color:"#c9a84c" }}>Mixology?</em>
        </h2>
        <p style={{ fontFamily:"Helvetica Neue,sans-serif", color:"rgba(255,255,255,.45)", fontSize:16, maxWidth:480, margin:"0 auto 2.5rem", lineHeight:1.6 }}>
          Join 50,000+ cocktail enthusiasts and unlock exclusive recipes, techniques, and premium content.
        </p>
        <button style={{
          background:"#c9a84c", color:"#000", padding:"14px 36px", borderRadius:999,
          border:"none", cursor:"pointer", fontFamily:"Helvetica Neue,sans-serif",
          fontSize:14, fontWeight:600, letterSpacing:1, textTransform:"uppercase"
        }}
          onMouseEnter={e => e.currentTarget.style.background="#e8c878"}
          onMouseLeave={e => e.currentTarget.style.background="#c9a84c"}
        >Get Started Free</button>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop:"1px solid rgba(255,255,255,.06)", padding:"2.5rem 1.5rem",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        flexWrap:"wrap", gap:"1rem", fontFamily:"Helvetica Neue,sans-serif",
        fontSize:13, color:"rgba(255,255,255,.25)", maxWidth:1200, margin:"0 auto"
      }}>
        <div style={{ fontSize:"1.25rem", color:"#c9a84c", letterSpacing:2, textTransform:"uppercase" }}>Mixology Co.</div>
        <div>© 2024 · All rights reserved</div>
        <div style={{ display:"flex", gap:"1.5rem" }}>
          {["Privacy","Terms","Contact"].map(link => (
            <span key={link} style={{ cursor:"pointer", transition:"color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color="#c9a84c"}
              onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,.25)"}
            >{link}</span>
          ))}
        </div>
      </footer>

      {/* ── MODAL ── */}
      <Modal drink={selectedDrink} onClose={() => setSelectedDrink(null)} />
    </div>
  );
}
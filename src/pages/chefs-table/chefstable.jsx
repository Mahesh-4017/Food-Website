import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const chef = {
  name: "Antoine Moreau",
  title: "Executive Chef & Founder",
  bio: "Trained under three Michelin-starred kitchens across Lyon, Tokyo, and Copenhagen, Antoine returned to London with a singular vision: to dissolve the boundary between guest and kitchen. Every evening at the Chef's Table is a live performance — unscripted, unrepeatable.",
  accolades: ["2 Michelin Stars", "AA 5 Rosettes", "No. 4 UK's Best Restaurants 2024"],
};

const courses = [
  { num: "I",    name: "Land & Sea Opening", desc: "Oyster leaf, sea urchin, Cornish seaweed butter, frozen dashi", wine: "2021 Chablis Premier Cru, Domaine Laroche", note: "A breath of coastal air to open the palate." },
  { num: "II",   name: "Root & Earth",        desc: "Heritage beetroot textures, aged goat's cheese snow, walnut crumb, sorrel oil", wine: "2020 Sancerre Rouge, Henri Bourgeois", note: "The garden in winter — austere, honest, alive." },
  { num: "III",  name: "The River",           desc: "Smoked eel, apple consommé, compressed cucumber, horseradish cream", wine: "2022 Grüner Veltliner Smaragd, Domäne Wachau", note: "A cold, clear morning on the Thames." },
  { num: "IV",   name: "Fire & Fat",          desc: "Foie gras parfait, brioche feuilletée, Sauternes gel, black pepper caramel", wine: "2018 Château d'Yquem, Sauternes", note: "Excess, perfectly contained." },
  { num: "V",    name: "The Deep",            desc: "Wild turbot, beurre blanc with champagne, sea vegetables, caviar beurre noisette", wine: "2019 Puligny-Montrachet, Louis Jadot", note: "The ocean floor brought to the surface." },
  { num: "VI",   name: "Heart of the Moor",  desc: "Aged Dartmoor venison, celeriac purée, juniper jus, charred leek ash", wine: "2016 Chambolle-Musigny, Georges Roumier", note: "A walk through moorland at dusk." },
  { num: "VII",  name: "The Cellar",         desc: "Comté 36-month, Époisses, Stichelton blue — each with its own accompaniment", wine: "2015 Château Pichon Baron, Pauillac", note: "Time, fermented and refined." },
  { num: "VIII", name: "Darkness & Light",   desc: "Valrhona Guanaja 70% sphere, hazelnut praline, gold leaf, smoked salt", wine: "NV Dow's 20-Year Tawny Port", note: "The evening's final act of contrast." },
];

const details = [
  { label: "Guests",       value: "Up to 8" },
  { label: "Duration",     value: "3½ – 4 hrs" },
  { label: "Price",        value: "£285 p/p" },
  { label: "Wine pairing", value: "+£140" },
  { label: "Evenings",     value: "Fri & Sat" },
  { label: "Sittings",     value: "7:00 pm only" },
];

const faqs = [
  { q: "Can dietary requirements be accommodated?", a: "Yes. We ask that you inform us of all dietary requirements at the time of booking. Antoine designs a bespoke menu around your needs — nothing is an afterthought." },
  { q: "What is the cancellation policy?", a: "Full refund up to 72 hours before your reservation. Within 72 hours, a £75 per person charge applies. No-shows are charged in full." },
  { q: "Is the Chef's Table suitable for celebrations?", a: "It's designed for exactly that. We offer bespoke cake arrangements, personalised menus, and private champagne receptions. Please mention your occasion at booking." },
  { q: "Will Chef Antoine be present?", a: "Antoine personally leads every Chef's Table service. On rare occasions a senior sous chef may host — you will be informed in advance." },
];

function FadeIn({ children, delay = 0, y = 28, x = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}

function SectionLabel({ children }) {
  const font = "'Cormorant Garamond', Georgia, serif";
  return (
    <p style={{ fontSize: 10, letterSpacing: "0.4em", color: "#c8a050", textTransform: "uppercase", marginBottom: 20, fontFamily: font }}>
      ✦ &nbsp;{children}&nbsp; ✦
    </p>
  );
}

function Rule() {
  return <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(200,160,80,0.25), transparent)", margin: "80px 0" }} />;
}

export default function ChefsTable() {
  const [activeCourse, setActiveCourse] = useState(0);
  const [openFaq, setOpenFaq]           = useState(null);
  const [mousePos, setMousePos]         = useState({ x: 0, y: 0 });
  const font = "'Cormorant Garamond', Georgia, serif";

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#060503", color: "#f0e8d8", fontFamily: font, overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <motion.div
          animate={{ x: mousePos.x * 0.04, y: mousePos.y * 0.04 }}
          transition={{ type: "spring", stiffness: 40, damping: 30 }}
          style={{ position: "absolute", top: "20%", left: "40%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,160,80,0.06) 0%, transparent 70%)", pointerEvents: "none" }}
        />
        <motion.div
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", left: 48, top: "15%", bottom: "15%", width: 1, background: "linear-gradient(to bottom, transparent, rgba(200,160,80,0.3), transparent)", transformOrigin: "top" }}
        />
        <div style={{ padding: "120px 48px 100px 88px", maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
            <p style={{ fontSize: 10, letterSpacing: "0.5em", color: "#c8a050", textTransform: "uppercase", marginBottom: 32 }}>✦ &nbsp; An Intimate Evening &nbsp; ✦</p>
            <h1 style={{ fontSize: "clamp(60px, 10vw, 140px)", fontWeight: 300, lineHeight: 0.88, letterSpacing: "-0.02em", marginBottom: 40 }}>
              The<br /><span style={{ paddingLeft: "0.12em" }}>Chef's</span><br /><em style={{ color: "#c8a050", fontStyle: "italic", paddingLeft: "0.2em" }}>Table</em>
            </h1>
            <div style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
              <p style={{ fontSize: 16, color: "#9a8e7e", lineHeight: 1.8, maxWidth: 440, fontWeight: 300 }}>
                Eight courses. One kitchen. No barriers between the cook and the guest. The Chef's Table at LUMINE is not a meal — it is a conversation.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {details.slice(0, 3).map((d) => (
                  <div key={d.label} style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                    <span style={{ fontSize: 10, color: "#5a5040", letterSpacing: "0.2em", textTransform: "uppercase", minWidth: 70 }}>{d.label}</span>
                    <span style={{ fontSize: 20, fontWeight: 300, color: "#c8a050" }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            style={{ position: "absolute", bottom: 40, left: 88, display: "flex", alignItems: "center", gap: 12 }}>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ width: 1, height: 40, background: "rgba(200,160,80,0.4)" }} />
            <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "#5a5040", textTransform: "uppercase" }}>Scroll</span>
          </motion.div>
        </div>
      </section>

      {/* ── CHEF ── */}
      <section style={{ padding: "0 48px 100px 88px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "center" }}>
            <div style={{ position: "relative", aspectRatio: "3/4" }}>
              <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(200,160,80,0.15)", borderRadius: 4, background: "linear-gradient(145deg, #0e0b07, #16110a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="120" height="140" viewBox="0 0 120 140" fill="none" opacity="0.3">
                  <circle cx="60" cy="42" r="28" stroke="#c8a050" strokeWidth="0.8" />
                  <path d="M20 140 Q20 100 60 95 Q100 100 100 140" stroke="#c8a050" strokeWidth="0.8" fill="none" />
                  <circle cx="60" cy="42" r="18" stroke="#c8a050" strokeWidth="0.4" strokeDasharray="3 4" />
                </svg>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 28px 28px", background: "linear-gradient(to top, rgba(6,5,3,0.9), transparent)" }}>
                  <p style={{ fontSize: 10, color: "#c8a050", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 6 }}>Executive Chef</p>
                  <p style={{ fontSize: 28, fontWeight: 300, color: "#f0e8d8" }}>{chef.name}</p>
                </div>
              </div>
              <div style={{ position: "absolute", top: -8, left: -8, width: 24, height: 24, borderTop: "1px solid #c8a050", borderLeft: "1px solid #c8a050" }} />
              <div style={{ position: "absolute", bottom: -8, right: -8, width: 24, height: 24, borderBottom: "1px solid #c8a050", borderRight: "1px solid #c8a050" }} />
            </div>
            <div>
              <SectionLabel>The Architect</SectionLabel>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 300, lineHeight: 1.05, marginBottom: 28, color: "#f0e8d8" }}>
                Antoine<br /><em style={{ color: "#c8a050", fontStyle: "italic" }}>Moreau</em>
              </h2>
              <p style={{ fontSize: 16, color: "#8a7e6e", lineHeight: 1.9, marginBottom: 36 }}>{chef.bio}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {chef.accolades.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#c8a050", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#6a5f50", letterSpacing: "0.08em" }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <Rule />

      {/* ── COURSES ── */}
      <section style={{ padding: "0 48px 100px 88px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Eight Courses</SectionLabel>
          <h2 style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, marginBottom: 64, color: "#f0e8d8" }}>
            Tonight's<br /><em style={{ color: "#c8a050", fontStyle: "italic" }}>Journey</em>
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 0 }}>
          <div style={{ borderRight: "1px solid rgba(200,160,80,0.1)" }}>
            {courses.map((c, i) => (
              <FadeIn key={c.num} delay={i * 0.05}>
                <button onClick={() => setActiveCourse(i)} style={{
                  width: "100%", background: activeCourse === i ? "rgba(200,160,80,0.06)" : "transparent",
                  border: "none", borderLeft: `2px solid ${activeCourse === i ? "#c8a050" : "transparent"}`,
                  padding: "18px 24px", textAlign: "left", cursor: "pointer", transition: "all 0.25s",
                  display: "flex", alignItems: "center", gap: 16,
                }}>
                  <span style={{ fontSize: 11, fontStyle: "italic", color: activeCourse === i ? "#c8a050" : "#4a4030", minWidth: 20, transition: "color 0.25s", fontFamily: font }}>{c.num}</span>
                  <span style={{ fontSize: 15, fontWeight: 300, color: activeCourse === i ? "#f0e8d8" : "#7a6e5e", transition: "color 0.25s", fontFamily: font }}>{c.name}</span>
                </button>
              </FadeIn>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeCourse}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ padding: "28px 48px" }}
            >
              <span style={{ fontSize: 10, color: "#5a5040", letterSpacing: "0.3em", textTransform: "uppercase" }}>Course {courses[activeCourse].num}</span>
              <h3 style={{ fontSize: 42, fontWeight: 300, color: "#f0e8d8", margin: "12px 0 20px", lineHeight: 1.05 }}>{courses[activeCourse].name}</h3>
              <p style={{ fontSize: 16, color: "#8a7e6e", lineHeight: 1.8, marginBottom: 32, maxWidth: 480 }}>{courses[activeCourse].desc}</p>
              <div style={{ borderLeft: "2px solid rgba(200,160,80,0.3)", paddingLeft: 20, marginBottom: 32 }}>
                <p style={{ fontSize: 13, color: "#5a5040", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Chef's note</p>
                <p style={{ fontSize: 18, fontStyle: "italic", color: "#9a8e7e", fontWeight: 300, lineHeight: 1.6 }}>"{courses[activeCourse].note}"</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", background: "rgba(200,160,80,0.04)", border: "1px solid rgba(200,160,80,0.1)", borderRadius: 10, maxWidth: 480 }}>
                <svg width="18" height="22" viewBox="0 0 18 28" fill="none">
                  <path d="M3 2 Q3 14 9 18 Q15 14 15 2 Z" stroke="#c8a050" strokeWidth="0.9" fill="rgba(200,160,80,0.06)" />
                  <line x1="9" y1="18" x2="9" y2="26" stroke="#c8a050" strokeWidth="0.9" />
                  <line x1="5" y1="26" x2="13" y2="26" stroke="#c8a050" strokeWidth="0.9" />
                </svg>
                <div>
                  <p style={{ fontSize: 10, color: "#5a5040", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 3 }}>Wine pairing</p>
                  <p style={{ fontSize: 13, color: "#9a8878", fontStyle: "italic" }}>{courses[activeCourse].wine}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
                {[["← Prev", () => setActiveCourse(p => Math.max(0, p - 1)), activeCourse === 0],
                  ["Next →", () => setActiveCourse(p => Math.min(courses.length - 1, p + 1)), activeCourse === courses.length - 1]
                ].map(([label, fn, disabled]) => (
                  <button key={label} onClick={fn} disabled={disabled} style={{
                    background: "none", border: "1px solid rgba(200,160,80,0.18)", borderRadius: 7,
                    padding: "8px 20px", color: disabled ? "#3a3028" : "#c8a050",
                    cursor: disabled ? "default" : "pointer", fontSize: 12, letterSpacing: "0.12em",
                    fontFamily: font, transition: "all 0.2s",
                  }}>{label}</button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Rule />

      {/* ── DETAILS GRID ── */}
      <section style={{ padding: "0 48px 100px 88px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid rgba(200,160,80,0.1)", borderRadius: 16, overflow: "hidden" }}>
            {details.map((d, i) => (
              <div key={d.label} style={{
                padding: "32px 28px", background: "#0a0805",
                borderRight: i % 3 !== 2 ? "1px solid rgba(200,160,80,0.08)" : "none",
                borderBottom: i < 3 ? "1px solid rgba(200,160,80,0.08)" : "none",
              }}>
                <p style={{ fontSize: 10, color: "#5a5040", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>{d.label}</p>
                <p style={{ fontSize: 28, fontWeight: 300, color: "#c8a050" }}>{d.value}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "0 48px 100px 88px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Questions</SectionLabel>
          <h2 style={{ fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 300, marginBottom: 52, color: "#f0e8d8" }}>
            Before You<br /><em style={{ color: "#c8a050", fontStyle: "italic" }}>Arrive</em>
          </h2>
        </FadeIn>
        <div style={{ maxWidth: 720 }}>
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div style={{ borderBottom: "1px solid rgba(200,160,80,0.08)" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: "100%", background: "none", border: "none", padding: "22px 0",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  cursor: "pointer", textAlign: "left", gap: 20, fontFamily: font,
                }}>
                  <span style={{ fontSize: 18, fontWeight: 300, color: "#e8dece" }}>{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.25 }}
                    style={{ color: "#c8a050", fontSize: 22, flexShrink: 0, lineHeight: 1 }}>+</motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: "hidden" }}>
                      <p style={{ fontSize: 15, color: "#7a6e5e", lineHeight: 1.85, padding: "0 0 22px" }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── BOOKING CTA ── */}
      <FadeIn>
        <section style={{ margin: "0 48px 80px 88px", border: "1px solid rgba(200,160,80,0.15)", borderRadius: 24, padding: "72px 64px", background: "#0a0805", position: "relative", overflow: "hidden" }}>
          {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
            <div key={`${v}${h}`} style={{ position: "absolute", [v]: 20, [h]: 20, width: 32, height: 32,
              borderTop: v==="top" ? "1px solid rgba(200,160,80,0.35)" : "none",
              borderBottom: v==="bottom" ? "1px solid rgba(200,160,80,0.35)" : "none",
              borderLeft: h==="left" ? "1px solid rgba(200,160,80,0.35)" : "none",
              borderRight: h==="right" ? "1px solid rgba(200,160,80,0.35)" : "none",
            }} />
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <SectionLabel>Reserve</SectionLabel>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 58px)", fontWeight: 300, lineHeight: 1.05, color: "#f0e8d8", marginBottom: 20 }}>
                Secure Your<br /><em style={{ color: "#c8a050", fontStyle: "italic" }}>Seat at the Table</em>
              </h2>
              <p style={{ fontSize: 15, color: "#7a6e5e", lineHeight: 1.8 }}>
                The Chef's Table accommodates no more than eight guests per evening. Availability is extremely limited — we recommend booking at least three weeks in advance.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Link to="/book?experience=chefs-table" style={{
                display: "block", textAlign: "center", padding: "18px",
                background: "rgba(200,160,80,0.1)", border: "1px solid rgba(200,160,80,0.4)",
                borderRadius: 12, color: "#c8a050", textDecoration: "none",
                fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: font,
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(200,160,80,0.18)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(200,160,80,0.1)"}
              >Book the Chef's Table</Link>
              <Link to="/contact" style={{
                display: "block", textAlign: "center", padding: "16px",
                background: "transparent", border: "1px solid rgba(200,160,80,0.12)",
                borderRadius: 12, color: "#6a5f50", textDecoration: "none",
                fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: font,
              }}
                onMouseEnter={e => { e.currentTarget.style.color="#c8a050"; e.currentTarget.style.borderColor="rgba(200,160,80,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.color="#6a5f50"; e.currentTarget.style.borderColor="rgba(200,160,80,0.12)"; }}
              >Speak to Our Team</Link>
              <p style={{ fontSize: 11, color: "#3a3028", textAlign: "center", letterSpacing: "0.06em" }}>Or call +44 20 7946 0958 · Mon–Sat 10am–10pm</p>
            </div>
          </div>
        </section>
      </FadeIn>

    </div>
  );
}
import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

/* ─── data ─── */
const NAV_COLS = [
  {
    heading: "Discover",
    links: ["Our Menu", "Cocktails", "Wine Cellar", "Private Dining", "Chef's Table"],
  },
  {
    heading: "Visit",
    links: ["Reservations", "Location & Hours", "Dress Code", "Accessibility", "Gift Cards"],
  },
  {
    heading: "About",
    links: ["Our Story", "The Team", "Philosophy", "Press & Awards", "Careers"],
  },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "TripAdvisor",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.26 0 2.45.29 3.5.81L13.41 8H10.6L8.5 5.81C9.55 5.29 10.74 5 12 5zM7 12a2 2 0 110-4 2 2 0 010 4zm10 0a2 2 0 110-4 2 2 0 010 4zm-5 5c-2.67 0-5-1.34-5-3h10c0 1.66-2.33 3-5 3z" />
      </svg>
    ),
  },
];

const AWARDS = [
  { label: "Michelin", value: "★★★" },
  { label: "World's 50 Best", value: "#7" },
  { label: "Gault & Millau", value: "19/20" },
];

/* ─── floating particles ─── */
function Particles() {
  const pts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    dur: Math.random() * 12 + 8,
    delay: Math.random() * 6,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {pts.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(232,145,58,0.6)",
          }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── CTA section ─── */
function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} style={{ position: "relative", overflow: "hidden", minHeight: 560 }}>
      {/* Parallax BG image */}
      <motion.div
        style={{
          position: "absolute", inset: "-14%",
          backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80')",
          backgroundSize: "cover", backgroundPosition: "center",
          y: bgY,
        }}
      />
      {/* Dark overlay with amber gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(10,8,4,0.93) 0%, rgba(60,30,5,0.85) 70%, rgba(10,8,4,0.95) 100%)",
      }} />

      {/* Decorative diagonal lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={inView ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ delay: i * 0.07, duration: 1.2 }}
          style={{
            position: "absolute",
            left: `${10 + i * 22}%`,
            top: 0, bottom: 0,
            width: 0.5,
            background: "rgba(232,145,58,0.06)",
            transform: "rotate(12deg)",
            transformOrigin: "top",
          }}
        />
      ))}

      <Particles />

      {/* Large ambient text */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(80px, 18vw, 220px)",
        fontWeight: 700, color: "rgba(232,145,58,0.04)",
        letterSpacing: "-0.02em", whiteSpace: "nowrap",
        userSelect: "none", pointerEvents: "none",
      }}>
        LUMINE
      </div>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        minHeight: 560, padding: "80px 40px", textAlign: "center",
      }}>
        {/* Awards row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ display: "flex", gap: 32, marginBottom: 40, justifyContent: "center", flexWrap: "wrap" }}
        >
          {AWARDS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ textAlign: "center" }}
            >
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: a.label === "Michelin" ? 18 : 22,
                color: "#e8913a", fontWeight: 700, lineHeight: 1,
                padding: "6px 12px",
              }}>{a.value}</div>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 10, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#8e7c6aff", marginTop: 4,
              }}>{a.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}
        >
          <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 12, letterSpacing: "0.4em",
            textTransform: "uppercase", color: "#e8913a",
          }}>
            Est. 2018 · Paris
          </span>
          <div style={{ width: 40, height: 0.5, background: "#e8913a" }} />
        </motion.div>

        {/* Headline */}
        <div style={{ overflow: "hidden", marginBottom: 8 }}>
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(38px, 6vw, 80px)",
              fontWeight: 700, color: "#f5efe6",
              letterSpacing: "-0.02em", lineHeight: 1, margin: 0,
            }}
          >
            Reserve Your
          </motion.h2>
        </div>
        <div style={{ overflow: "hidden", marginBottom: 28 }}>
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ delay: 0.33, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(38px, 6vw, 80px)",
              fontWeight: 700, fontStyle: "italic",
              color: "#e8913a", letterSpacing: "-0.02em",
              lineHeight: 1, margin: 0,
            }}
          >
            Evening
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(15px, 2vw, 19px)",
            color: "#988169ff", maxWidth: 480,
            lineHeight: 1.75, marginBottom: 44,
          }}
        >
          Tables fill quickly — we recommend reserving at least two weeks in advance.
          Private dining available for groups of 8 or more.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.48, duration: 0.6 }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link to="/Book">
          <motion.button
            whileHover={{ scale: 1.04, background: "#f5a348" }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13, letterSpacing: "0.25em",
              textTransform: "uppercase", fontWeight: 700,
              color: "#0a0804", background: "#e8913a",
              border: "none", padding: "17px 48px",
              cursor: "pointer", transition: "background 0.3s",
            }}
          >
            Book a Table
          </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.04, borderColor: "#f5efe6", color: "#f5efe6" }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 13, letterSpacing: "0.25em",
              textTransform: "uppercase", fontWeight: 600,
              color: "#6a5a4a", background: "transparent",
              border: "0.5px solid rgba(154,138,122,0.3)",
              padding: "17px 48px", cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            Private Dining
          </motion.button>
        </motion.div>

        {/* Phone */}
        <motion.a
          href="tel:+33123456789"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 13, color: "#3a2a1a",
            letterSpacing: "0.2em", marginTop: 24,
            textDecoration: "none", display: "flex",
            alignItems: "center", gap: 8,
            transition: "color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#e8913a"}
          onMouseLeave={e => e.currentTarget.style.color = "#3a2a1a"}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.0 2.18a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7 2 2 0 011.72 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          +33 1 23 45 67 89
        </motion.a>
      </div>
    </section>
  );
}

/* ─── Newsletter ─── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) { setSent(true); setEmail(""); }
  };

  return (
    <div style={{
      background: "rgba(232,145,58,0.04)",
      border: "0.5px solid rgba(232,145,58,0.1)",
      borderRadius: 2, padding: "32px 36px",
    }}>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 17, fontWeight: 700, color: "#f5efe6",
        marginBottom: 6,
      }}>
        The Lumine Letter
      </p>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 14, color: "#68523bff", lineHeight: 1.6, marginBottom: 20,
      }}>
        Seasonal menus, private events, and rare wine drops — delivered quarterly.
      </p>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 14, color: "#e8913a",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <span>✓</span> Thank you — you're on the list.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: 0 }}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1, padding: "11px 14px",
                background: "transparent",
                border: "0.5px solid rgba(232,145,58,0.2)",
                borderRight: "none",
                color: "#e49f49ff",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 14, outline: "none",
                borderRadius: "2px 0 0 2px",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(232,145,58,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(232,145,58,0.2)"}
            />
            <motion.button
              type="submit"
              whileHover={{ background: "#f5a348" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "#e8913a", border: "none",
                color: "#0a0804", padding: "11px 18px",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 12, letterSpacing: "0.2em",
                textTransform: "uppercase", fontWeight: 900,
                cursor: "pointer", borderRadius: "0 2px 2px 0",
                transition: "background 0.2s",
              }}
            >
              Join
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── main footer ─── */
function FooterMain() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  

  return (
    <footer
      ref={ref}
      style={{
        background: "#070503",
        borderTop: "0.5px solid rgba(232,145,58,0.08)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Subtle vertical lines */}
      {[...Array(3)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", top: 0, bottom: 0,
          left: `${25 + i * 25}%`, width: 0.5,
          background: "rgba(232,145,58,0.025)",
          pointerEvents: "none",
        }} />
      ))}

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 40px 0" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1.4fr",
          gap: 48, marginBottom: 64,
        }}>

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 30, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 4,
            }}>
              <span style={{ color: "#f5efe6" }}>LU</span>
              <span style={{ color: "#e8913a" }}>MI</span>
              <span style={{ color: "#f5efe6" }}>NE</span>
            </div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 11, letterSpacing: "0.25em",
              textTransform: "uppercase", color: "#663f19ff",
              marginBottom: 20,
            }}>
              Fine Dining · Paris
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 14, color: "#614e3aff", lineHeight: 1.75,
              marginBottom: 28, maxWidth: 240,
            }}>
              Where every dish tells a story — crafted with seasonal ingredients and passionate artistry since 2018.
            </p>

            {/* Socials */}
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIALS.map(s => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  whileHover={{ y: -3, color: "#e18b35ff", borderColor: "rgba(232,145,58,0.4)" }}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    border: "0.5px solid rgba(255,255,255,0.07)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#4a3a2a", textDecoration: "none",
                    transition: "all 0.25s",
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav columns */}
          {NAV_COLS.map((col, ci) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 + ci * 0.07, duration: 0.6 }}
            >
              <h4 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 10, letterSpacing: "0.35em",
                textTransform: "uppercase", color: "#e8913a",
                marginBottom: 20, fontWeight: 600,
              }}>
                {col.heading}
              </h4>
              <ul style={{ listStyle: "none", margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                {col.links.map(link => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4, color: "#c0a880" }}
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 14, color: "hsla(29, 22%, 37%, 1.00)",
                        textDecoration: "none", letterSpacing: "0.03em",
                        display: "inline-block", transition: "color 0.2s",
                      }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Newsletter />

            {/* Contact block */}
            <div style={{ marginTop: 28 }}>
              {[
                { icon: "📍", text: "12 Rue de la Paix, Paris 75002" },
                { icon: "🕐", text: "Tue–Sat, 19:00 – 23:00" },
                { icon: "✉️", text: "contact@lumine.fr" },
              ].map(item => (
                <div key={item.text} style={{
                  display: "flex", gap: 10, alignItems: "flex-start",
                  marginBottom: 10,
                }}>
                  <span style={{ fontSize: 12, marginTop: 2 }}>{item.icon}</span>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 13, color: "#6c5845ff", lineHeight: 1.5,
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            borderTop: "0.5px solid rgba(255,255,255,0.04)",
            padding: "20px 0 28px",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: 12,
          }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 12, color: "#2a1a0a", letterSpacing: "0.08em",
          }}>
            © {new Date().getFullYear()} Lumine SAS · All rights reserved · Paris, France
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Legal Notice"].map(l => (
              <a key={l} href="#" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 11, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#2a1a0a",
                textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = "#4a3a2a"}
                onMouseLeave={e => e.currentTarget.style.color = "#2a1a0a"}
              >
                {l}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

/* ─── export ─── */
export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; }
        input::placeholder { color: #2a1a0a; }
      `}</style>
      <CTASection />
      <FooterMain />
    </>
  );
}
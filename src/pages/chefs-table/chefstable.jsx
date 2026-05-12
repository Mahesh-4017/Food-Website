import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import img from "../../assets/Types-of-Chefs.png";

const chef = {
  name: "Antoine Moreau",
  title: "Executive Chef & Founder",
  bio: "Trained under three Michelin-starred kitchens across Lyon, Tokyo, and Copenhagen, Antoine returned to London with a singular vision: to dissolve the boundary between guest and kitchen.",
  accolades: [
    "2 Michelin Stars",
    "AA 5 Rosettes",
    "No. 4 UK's Best Restaurants 2024",
  ],
};

const courses = [
  {
    num: "I",
    name: "Land & Sea Opening",
    desc: "Oyster leaf, sea urchin, Cornish seaweed butter, frozen dashi",
    wine: "2021 Chablis Premier Cru",
    note: "A breath of coastal air to open the palate.",
  },
  {
    num: "II",
    name: "Root & Earth",
    desc: "Heritage beetroot textures, goat cheese snow",
    wine: "2020 Sancerre Rouge",
    note: "The garden in winter.",
  },
  {
    num: "III",
    name: "The River",
    desc: "Smoked eel, apple consommé",
    wine: "2022 Grüner Veltliner",
    note: "A cold morning on the Thames.",
  },
];

const details = [
  { label: "Guests", value: "Up to 8" },
  { label: "Duration", value: "3½ – 4 hrs" },
  { label: "Price", value: "£285 p/p" },
  { label: "Wine pairing", value: "+£140" },
  { label: "Evenings", value: "Fri & Sat" },
  { label: "Sittings", value: "7:00 pm only" },
   { label: "Guests", value: "Up to 8" },
  { label: "Duration", value: "3½ – 4 hrs" },
  { label: "Price", value: "£285 p/p" },
  { label: "Wine pairing", value: "+£140" },
  { label: "Evenings", value: "Fri & Sat" },
  { label: "Sittings", value: "7:00 pm only" },
];

const faqs = [
  {
    q: "Can dietary requirements be accommodated?",
    a: "Yes. Inform us during booking.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Full refund up to 72 hours before.",
  },
  {
    q: "Can dietary requirements be accommodated?",
    a: "Yes. Inform us during booking.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Full refund up to 72 hours before.",
  },{
    q: "Can dietary requirements be accommodated?",
    a: "Yes. Inform us during booking.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Full refund up to 72 hours before.",
  },{
    q: "Can dietary requirements be accommodated?",
    a: "Yes. Inform us during booking.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Full refund up to 72 hours before.",
  },{
    q: "Can dietary requirements be accommodated?",
    a: "Yes. Inform us during booking.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Full refund up to 72 hours before.",
  },
];

function FadeIn({ children, delay = 0, y = 28 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function ChefsTable() {
  const [activeCourse, setActiveCourse] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const font = "'Cormorant Garamond', serif";

  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth < 1100;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060503",
        color: "#f0e8d8",
        fontFamily: font,
        overflowX: "hidden",
      }}
    >
      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* GOLD LINE */}
        <div
          style={{
            position: "absolute",
            left: isMobile ? 18 : 48,
            top: "15%",
            bottom: "15%",
            width: 1,
            background:
              "linear-gradient(to bottom, transparent, rgba(200,160,80,0.3), transparent)",
            display: isMobile ? "none" : "block",
          }}
        />

        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: isMobile
              ? "110px 20px 70px"
              : isTablet
                ? "120px 40px 90px"
                : "120px 48px 100px 88px",
            boxSizing: "border-box",
          }}
        >
          <FadeIn>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.45em",
                color: "#c8a050",
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              ✦ An Intimate Evening ✦
            </p>

            <h1
              style={{
                fontSize: isMobile
                  ? "58px"
                  : "clamp(60px, 10vw, 140px)",
                lineHeight: 0.9,
                fontWeight: 300,
                marginBottom: 36,
              }}
            >
              The
              <br />
              Chef's
              <br />
              <em style={{ color: "#c8a050" }}>Table</em>
            </h1>

            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? 26 : 48,
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  maxWidth: 480,
                  color: "#8f8373",
                }}
              >
                Eight courses. One kitchen. No barriers between guest and chef.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {details.slice(0, 3).map((d) => (
                  <div
                    key={d.label}
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        minWidth: 70,
                        color: "#5a5040",
                        textTransform: "uppercase",
                        letterSpacing: "0.2em",
                      }}
                    >
                      {d.label}
                    </span>

                    <span
                      style={{
                        fontSize: 20,
                        color: "#c8a050",
                      }}
                    >
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CHEF */}
      <section
        style={{
          width: "100%",
          boxSizing: "border-box",
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile
            ? "0 20px 70px"
            : isTablet
              ? "0 40px 90px"
              : "0 48px 100px 88px",
        }}
      >
        <FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isTablet
                ? "1fr"
                : "1fr 1.2fr",
              gap: isMobile ? 40 : 80,
              alignItems: "center",
            }}
          >
            {/* IMAGE */}
<div
  style={{
    width: "100%",
    aspectRatio: "3/4",
    border: "1px solid rgba(200,160,80,0.12)",
    borderRadius: 18,
    background: "linear-gradient(145deg, #0e0b07, #16110a)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    maxWidth: "100%",
  }}
>
  {/* IMAGE */}
  <img
    src={img}
    alt="Chef"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.6s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.06)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}
  />

  {/* DARK OVERLAY */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, rgba(0,0,0,0.92) 8%, rgba(0,0,0,0.25) 45%, transparent 70%)",
    }}
  />

  {/* GOLD GLOW */}
  <div
    style={{
      position: "absolute",
      top: "-20%",
      right: "-20%",
      width: "220px",
      height: "220px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(200,160,80,0.14), transparent 70%)",
      pointerEvents: "none",
    }}
  />

  {/* CONTENT */}
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "clamp(18px, 4vw, 32px)",
      zIndex: 2,
    }}
  >
    <p
      style={{
        fontSize: "clamp(9px, 1vw, 11px)",
        letterSpacing: "0.28em",
        color: "#c8a050",
        textTransform: "uppercase",
        marginBottom: 8,
      }}
    >
      Executive Chef
    </p>

    <h3
      style={{
        fontSize: "clamp(24px, 4vw, 38px)",
        lineHeight: 1,
        fontWeight: 300,
        color: "#f5ede0",
        margin: 0,
      }}
    >
      {chef.name}
    </h3>

    <p
      style={{
        marginTop: 10,
        color: "#b7a690",
        fontSize: "clamp(12px, 2vw, 15px)",
        lineHeight: 1.6,
        maxWidth: 420,
      }}
    >
      Executive Chef & Founder
    </p>
  </div>

  {/* CORNER DESIGN */}
  <div
    style={{
      position: "absolute",
      top: 14,
      left: 14,
      width: 30,
      height: 30,
      borderTop: "1px solid rgba(200,160,80,0.5)",
      borderLeft: "1px solid rgba(200,160,80,0.5)",
      zIndex: 2,
    }}
  />

  <div
    style={{
      position: "absolute",
      bottom: 14,
      right: 14,
      width: 30,
      height: 30,
      borderBottom: "1px solid rgba(200,160,80,0.5)",
      borderRight: "1px solid rgba(200,160,80,0.5)",
      zIndex: 2,
    }}
  />
</div>

            {/* TEXT */}
            <div>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.35em",
                  color: "#c8a050",
                  marginBottom: 20,
                  textTransform: "uppercase",
                }}
              >
                ✦ The Architect ✦
              </p>

              <h2
                style={{
                  fontSize: "clamp(38px, 5vw, 68px)",
                  lineHeight: 1,
                  fontWeight: 300,
                  marginBottom: 24,
                }}
              >
                Antoine
                <br />
                <em style={{ color: "#c8a050" }}>Moreau</em>
              </h2>

              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.9,
                  color: "#8c7f70",
                  marginBottom: 36,
                }}
              >
                {chef.bio}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {chef.accolades.map((a) => (
                  <div
                    key={a}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#c8a050",
                      }}
                    />

                    <span
                      style={{
                        color: "#776b5b",
                        fontSize: 14,
                      }}
                    >
                      {a}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* COURSES */}
      <section
        style={{
          width: "100%",
          boxSizing: "border-box",
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile
            ? "0 20px 70px"
            : isTablet
              ? "0 40px 90px"
              : "0 48px 100px 88px",
        }}
      >
        <FadeIn>
          <h2
            style={{
              fontSize: "clamp(42px, 6vw, 80px)",
              fontWeight: 300,
              marginBottom: 50,
            }}
          >
            Tonight's
            <br />
            <em style={{ color: "#c8a050" }}>Journey</em>
          </h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isTablet
              ? "1fr"
              : "280px 1fr",
          }}
        >
          {/* LEFT */}
          <div
            style={{
              borderRight: isTablet
                ? "none"
                : "1px solid rgba(200,160,80,0.1)",
            }}
          >
            {courses.map((c, i) => (
              <button
                key={c.num}
                onClick={() => setActiveCourse(i)}
                style={{
                  width: "100%",
                  padding: "18px 22px",
                  background:
                    activeCourse === i
                      ? "rgba(200,160,80,0.06)"
                      : "transparent",
                  border: "none",
                  borderLeft:
                    activeCourse === i
                      ? "2px solid #c8a050"
                      : "2px solid transparent",
                  textAlign: "left",
                  cursor: "pointer",
                  color:
                    activeCourse === i
                      ? "#f0e8d8"
                      : "#7d7060",
                }}
              >
                {c.num} — {c.name}
              </button>
            ))}
          </div>

          {/* RIGHT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCourse}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                padding: isMobile
                  ? "24px 0"
                  : "28px 48px",
              }}
            >
              <h3
                style={{
                  fontSize: 42,
                  fontWeight: 300,
                  marginBottom: 18,
                }}
              >
                {courses[activeCourse].name}
              </h3>

              <p
                style={{
                  color: "#8b7f6f",
                  lineHeight: 1.8,
                  marginBottom: 28,
                }}
              >
                {courses[activeCourse].desc}
              </p>

              <blockquote
                style={{
                  borderLeft:
                    "2px solid rgba(200,160,80,0.3)",
                  paddingLeft: 18,
                  color: "#a49584",
                  fontStyle: "italic",
                  marginBottom: 28,
                }}
              >
                "{courses[activeCourse].note}"
              </blockquote>

              <div
                style={{
                  padding: 18,
                  borderRadius: 10,
                  border:
                    "1px solid rgba(200,160,80,0.12)",
                  background:
                    "rgba(200,160,80,0.03)",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    color: "#5a5040",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    marginBottom: 6,
                  }}
                >
                  Wine Pairing
                </p>

                <p style={{ color: "#bba58b" }}>
                  {courses[activeCourse].wine}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* DETAILS */}
      <section
        style={{
          width: "100%",
          boxSizing: "border-box",
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile
            ? "0 20px 70px"
            : isTablet
              ? "0 40px 90px"
              : "0 48px 100px 88px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
                ? "1fr 1fr"
                : "repeat(3,1fr)",
            border:
              "1px solid rgba(200,160,80,0.1)",
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          {details.map((d, i) => (
            <div
              key={d.label}
              style={{
                padding: "34px 28px",
                borderRight:
                  !isMobile && i % 3 !== 2
                    ? "1px solid rgba(200,160,80,0.08)"
                    : "none",
                borderBottom:
                  i !== details.length - 1
                    ? "1px solid rgba(200,160,80,0.08)"
                    : "none",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "#5a5040",
                  marginBottom: 12,
                }}
              >
                {d.label}
              </p>

              <p
                style={{
                  fontSize: 28,
                  color: "#c8a050",
                }}
              >
                {d.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          width: "100%",
          boxSizing: "border-box",
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile
            ? "0 20px 70px"
            : isTablet
              ? "0 40px 90px"
              : "0 48px 100px 88px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(40px,5vw,70px)",
            marginBottom: 46,
            fontWeight: 300,
          }}
        >
          Before You
          <br />
          <em style={{ color: "#c8a050" }}>Arrive</em>
        </h2>

        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              borderBottom:
                "1px solid rgba(200,160,80,0.08)",
            }}
          >
            <button
              onClick={() =>
                setOpenFaq(openFaq === i ? null : i)
              }
              style={{
                width: "100%",
                background: "none",
                border: "none",
                padding: "24px 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#f0e8d8",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: 18 }}>
                {faq.q}
              </span>

              <span
                style={{
                  fontSize: 24,
                  color: "#c8a050",
                }}
              >
                {openFaq === i ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence>
              {openFaq === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    style={{
                      paddingBottom: 22,
                      color: "#827565",
                      lineHeight: 1.8,
                    }}
                  >
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>
    </div>
  );
}
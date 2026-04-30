import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllAreas } from "../../services/mealApi";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CountriesPage() {
  const navigate = useNavigate();

  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data = await getAllAreas();
        setAreas(data || []);
      } catch (error) {
        console.error("Failed to fetch areas", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        padding: "60px 40px",
      }}
    >
      <Breadcrumbs />
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 50 }}>
          <h1
            style={{
              fontSize: 48,
              color: "#f5efe6",
              fontFamily: "'Playfair Display', serif",
              marginBottom: 12,
            }}
          >
            World Cuisine
          </h1>

          <p
            style={{
              color: "#8a7a6a",
              fontSize: 18,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Explore meals from different countries and cultures
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <p style={{ color: "#777" }}>Loading countries...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 24,
            }}
          >
            {areas.map((area, index) => (
              <motion.div
                key={area.strArea}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                onClick={() =>
                  navigate(`/country/${area.strArea}`)
                }
                style={{
                  cursor: "pointer",
                  background: "#141414",
                  borderRadius: 24,
                  border: "1px solid rgba(255,255,255,0.05)",
                  padding: "32px 24px",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glow */}
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(232,145,58,0.18), transparent 70%)",
                  }}
                />

                {/* Country Icon */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(232,145,58,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                    fontSize: 22,
                  }}
                >
                  🌍
                </div>

                {/* Country Name */}
                <h2
                  style={{
                    color: "#f5efe6",
                    fontSize: 24,
                    marginBottom: 10,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {area.strArea}
                </h2>

                {/* Description */}
                <p
                  style={{
                    color: "#8a7a6a",
                    fontSize: 14,
                    lineHeight: 1.7,
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  Explore traditional dishes from {area.strArea}.
                </p>

                {/* CTA */}
                <div
                  style={{
                    marginTop: 18,
                    color: "#e8913a",
                    fontSize: 13,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  View Cuisine →
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
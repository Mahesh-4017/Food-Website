import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getRandomMeal } from "@/services/mealApi";
import Breadcrumbs from "@/components/Breadcrumbs";


export default function RandomMealPage() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchRandom = async () => {
    setLoading(true);

    try {
      const data = await getRandomMeal();
      setMeal(data);
    } catch (error) {
      console.error("Failed to fetch random meal", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        padding: "90px 40px",
      }}
    >
      <Breadcrumbs />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1
          style={{
            color: "#f0ece4",
            fontSize: 42,
            marginBottom: 10,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Random Chef Pick
        </h1>

        <p
          style={{
            color: "#6a5a4a",
            marginBottom: 40,
            fontSize: 18,
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Our chefs recommend this dish for you today
        </p>

        {loading ? (
          <p style={{ color: "#777" }}>Loading recommendation...</p>
        ) : meal ? (
          <div
            style={{
              display: "flex",
              gap: 40,
              background: "#14120d",
              borderRadius: 24,
              padding: 40,
              alignItems: "center",
            }}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{
                width: "35%",
                borderRadius: 20,
                objectFit: "cover",
                boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
              }}
            />

            <div>
              <h2
                style={{
                  color: "#f0ece4",
                  fontSize: 36,
                  marginBottom: 12,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {meal.strMeal}
              </h2>

              <p
                style={{
                  color: "#e8913a",
                  marginBottom: 20,
                  letterSpacing: "0.08em",
                }}
              >
                {meal.strCategory} • {meal.strArea}
              </p>

              <p
                style={{
                  color: "#7a6a58",
                  lineHeight: 1.8,
                  marginBottom: 28,
                }}
              >
                {meal.strInstructions?.slice(0, 350)}...
              </p>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  onClick={() => navigate(`/meal/${meal.idMeal}`)}
                  style={{
                    padding: "14px 26px",
                    borderRadius: 12,
                    border: "none",
                    background: "#e8913a",
                    color: "#0c0c0c",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  View Full Recipe
                </button>

                <button
                  onClick={fetchRandom}
                  style={{
                    padding: "14px 26px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "transparent",
                    color: "#f0ece4",
                    cursor: "pointer",
                  }}
                >
                  New Random Meal
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ color: "#777" }}>No meal found.</p>
        )}
      </div>
    </motion.div>
  );
}
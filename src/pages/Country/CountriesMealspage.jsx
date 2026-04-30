import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import MealCard from "../../components/Mealcard";
import { getMealsByArea } from "../../services/mealApi";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function CountriesMealspage() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);

      const data = await getMealsByArea(name);
      setMeals(data || []);

      setLoading(false);
    };

    fetchMeals();
  }, [name]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        padding: "60px 40px",
      }}
    >
      <Breadcrumbs />
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <h1
          style={{
            color: "#f5efe6",
            fontSize: 48,
            marginBottom: 30,
          }}
        >
          {name} Meals
        </h1>

        <button
          onClick={() => navigate(-1)}
          style={{
            marginBottom: 30,
            padding: "10px 20px",
            background: "#141414",
            border: "none",
            color: "white",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        {loading ? (
          <p style={{ color: "#777" }}>Loading meals...</p>
        ) : meals.length === 0 ? (
          <p style={{ color: "#777" }}>No meals found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {meals.map((meal) => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
                onClick={() => navigate(`/meal/${meal.idMeal}`)}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
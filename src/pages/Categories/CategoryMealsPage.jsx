import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MealCard from "@/components/MealCard";
import { getMealsByCategory } from "@/services/mealApi";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CategoryMealsPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const data = await getMealsByCategory(category);
        setMeals(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [category]);

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
        <h1
          style={{
            color: "#f5efe6",
            fontSize: 42,
            marginBottom: 10,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {category} Meals
        </h1>

        <p
          style={{
            color: "#8a7a6a",
            marginBottom: 40,
            fontSize: 18,
          }}
        >
          Discover delicious meals in this category
        </p>

        {loading ? (
          <p style={{ color: "#777" }}>Loading meals...</p>
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
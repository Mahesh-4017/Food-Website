import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MealCard from "@/components/MealCard";
import { searchMealByLetter } from "@/services/mealApi";

const LETTERS = ["a", "b", "c", "d", "e", "f"];

export default function TrendingPage() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const results = await Promise.all(
                    LETTERS.map((letter) => searchMealByLetter(letter))
                );

                const mergedMeals = results.flat().filter(Boolean);
                setMeals(mergedMeals);
            } catch (error) {
                console.error("Failed to load meals", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
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
            <div style={{ maxWidth: 1300, margin: "0 auto" }}>
                <h1
                    style={{
                        color: "#f0ece4",
                        fontSize: 42,
                        marginBottom: 10,
                        fontFamily: "'Playfair Display', serif",
                    }}
                >
                    Trending Meals
                </h1>

                <p
                    style={{
                        color: "#6a5a4a",
                        marginBottom: 40,
                        fontSize: 18,
                        fontFamily: "'Cormorant Garamond', serif",
                    }}
                >
                    Explore trending meals from different categories
                </p>

                {loading ? (
                    <p style={{ color: "#777" }}>Loading meals...</p>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
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
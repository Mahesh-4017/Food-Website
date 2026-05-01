import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MealCard from "@/components/MealCard";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const searchMealByName = async (name) => {
    const res = await fetch(`${BASE_URL}/search.php?s=${name}`);
    const data = await res.json();
    return data.meals;
};

export const searchCocktailByName = async (name) => {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await res.json();
    return data.drinks;
};

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setSuggestions([]);
        try {
            const mealResults = await searchMealByName(query);
            const cocktailResults = await searchCocktailByName(query);

            const formattedCocktails = (cocktailResults || []).map((drink) => ({
                idMeal: drink.idDrink,
                strMeal: drink.strDrink,
                strMealThumb: drink.strDrinkThumb,
                isCocktail: true,
            }));

            const combinedResults = [
                ...(mealResults || []),
                ...formattedCocktails,
            ];

            setMeals(combinedResults);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }


    };


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
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <h1
                    style={{
                        color: "#f0ece4",
                        fontSize: "42px",
                        marginBottom: 12,
                        fontFamily: "'Playfair Display', serif",
                    }}
                >
                    Search Recipes
                </h1>

                <p
                    style={{
                        color: "#6a5a4a",
                        marginBottom: 32,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 18,
                    }}
                >
                    Find meals from around the world
                </p>

                {/* Search Box */}
                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        marginBottom: 40,
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search meal name..."
                        value={query}
                        onChange={async (e) => {
                            const value = e.target.value;
                            setQuery(value);

                            if (value.trim().length > 0) {
                                const mealResults = await searchMealByName(value);
                                const cocktailResults = await searchCocktailByName(value);

                                const formattedCocktails = (cocktailResults || []).map((drink) => ({
                                    idMeal: drink.idDrink,
                                    strMeal: drink.strDrink,
                                    strMealThumb: drink.strDrinkThumb,
                                    isCocktail: true,
                                }));

                                const combinedSuggestions = [
                                    ...(mealResults || []),
                                    ...formattedCocktails,
                                ];

                                setSuggestions(combinedSuggestions.slice(0, 5));
                            } else {
                                setSuggestions([]);
                            }
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        style={{
                            flex: 1,
                            padding: "14px 18px",
                            borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "#141414",
                            color: "#f0ece4",
                            outline: "none",
                            fontSize: 15,
                        }}
                    />

                    <button
                        onClick={handleSearch}
                        style={{
                            padding: "14px 28px",
                            borderRadius: 12,
                            border: "none",
                            background: "#e8913a",
                            color: "#0c0c0c",
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                    >
                        Search
                    </button>
                </div>

                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                    <div
                        style={{
                            background: "#141414",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: 12,
                            overflow: "hidden",
                            marginTop: -29,
                            marginBottom: 30,
                            maxWidth: 500,
                        }}
                    >
                        {suggestions.map((meal) => (
                            <div
                                key={meal.idMeal}
                                onClick={() => {
                                    setQuery(meal.strMeal);
                                    setSuggestions([]);
                                    setMeals([meal]);
                                }}
                                style={{
                                    padding: "12px 16px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                                    color: "#f0ece4",
                                    transition: "background 0.2s",
                                }}
                            >
                                {meal.strMeal}
                            </div>
                        ))}
                    </div>
                )}

                {/* Results */}
                {loading ? (
                    <p style={{ color: "#777" }}>Searching for recipes and cocktails...</p>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                            gap: 24,
                        }}
                    >
                        {meals.map((meal) => (
                            <MealCard
                                key={meal.idMeal}
                                meal={meal}
                                onClick={() => {
                                    if (meal.isCocktail) {
                                        navigate(`/cocktail/${meal.idMeal}`);
                                    } else {
                                        navigate(`/meal/${meal.idMeal}`);
                                    }
                                }}
                            />
                        ))}
                    </div>
                )}

                {!loading && meals.length === 0 && query && (
                    <p
                        style={{
                            color: "#6a5a4a",
                            marginTop: 24,
                            fontFamily: "serif",
                        }}
                    >
                        No recipes or cocktails found.
                    </p>
                )}
            </div>
        </motion.div>
    );
}
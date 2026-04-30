import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FoodCarouselPage() {
    const meals = [
        {
            idMeal: "52768",
            strMeal: "Apple Frangipan Tart",
            strMealThumb:
                "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
            strCategory: "Dessert",
            strArea: "British",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 text-center">
                    Food Carousel Slider
                </h1>
                <p className="text-gray-400 text-center mb-10">
                    Auto-scrolling food cards using TheMealDB API
                </p>

                <FoodSlider />
            </div>
        </div>
    );
}

function FoodSlider() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
            .then((res) => res.json())
            .then((data) => {
                setFoods(data.meals || []);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="relative overflow-hidden w-full">
            <motion.div
                className="flex gap-6 w-max justify-center items-center"
                animate={{ x: ["10%", "40%"] }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                }}
            >
                {[...foods, ...foods].map((meal, index) => (
                    <div
                        key={`${meal.idMeal}-${index}`}
                        className="min-w-[300px] bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-gray-800 hover:scale-105 transition-transform"
                    >
                        <img
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            className="w-full h-56 object-cover"
                        />

                        <div className="p-5">
                            <h2 className="text-xl font-semibold mb-2">
                                {meal.strMeal}
                            </h2>

                            <div className="flex justify-between text-sm text-gray-400 mb-4">
                                <span>{meal.strCategory}</span>
                                <span>{meal.strArea}</span>
                            </div>

                            <button className="w-full bg-white text-black py-2 rounded-xl font-medium hover:opacity-90">
                                View Recipe
                            </button>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

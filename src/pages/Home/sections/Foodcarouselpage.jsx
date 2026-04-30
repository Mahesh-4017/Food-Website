import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MealCard from "@/components/MealCard";
import { useNavigate } from "react-router-dom";

const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function FoodCarouselPage({ onSelectMeal }) {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const results = await Promise.all(
                    LETTERS.map((l) =>
                        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
                            .then((r) => r.json())
                            .then((d) => d.meals || [])
                            .catch(() => [])
                    )
                );
                setMeals(results.flat());
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const half = Math.ceil(meals.length / 2);
    const row1 = meals.slice(0, half);
    const row2 = meals.slice(half);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            style={{
                minHeight: "100vh",
                background: "#0c0c0c",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            {/* Header */}
            <div style={{ padding: "32px 40px 24px", flexShrink: 0 }}>
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 1 }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            marginBottom: 6,
                        }}
                    >
                        <div style={{ width: 32, height: 1, background: "#e8913a" }} />
                        <span
                            style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: 11,
                                letterSpacing: "0.4em",
                                textTransform: "uppercase",
                                color: "#e8913a",
                            }}
                        >
                            Live from MealDB
                        </span>
                    </div>
                    <h1
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "clamp(28px, 4vw, 48px)",
                            fontWeight: 700,
                            color: "#f0ece4",
                            letterSpacing: "-0.5px",
                            lineHeight: 1,
                        }}
                    >
                        World{" "}
                        <em style={{ color: "#e8913a", fontStyle: "italic" }}>Kitchen</em>
                    </h1>
                    <p
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 15,
                            color: "#5a4a3a",
                            marginTop: 6,
                        }}
                    >
                        Click any dish to explore the full recipe
                    </p>
                </motion.div>
            </div>

            {/* Rows */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 16,
                    overflow: "hidden",
                    position: "relative",
                    padding: "8px 0 24px",
                }}
            >
                {/* Edge fades */}
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: 80,
                        background: "linear-gradient(to right, #0c0c0c, transparent)",
                        zIndex: 10,
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: 80,
                        background: "linear-gradient(to left, #0c0c0c, transparent)",
                        zIndex: 10,
                        pointerEvents: "none",
                    }}
                />

                {loading ? (
                    <>
                        <SkeletonRow />
                        <SkeletonRow />
                    </>
                ) : (
                    <>
                        <ScrollRow meals={row1} direction="left" speed={160} onSelect={(id) => navigate(`/meal/${id}`)} />
                        <ScrollRow meals={row2} direction="right" speed={160} onSelect={(id) => navigate(`/meal/${id}`)} />
                    </>
                )}
            </div>
        </motion.div>
    );
}

function ScrollRow({ meals, direction, speed, onSelect }) {
    if (!meals.length) return null;
    const doubled = [...meals, ...meals];

    return (
        <div style={{ overflow: "hidden" }}>
            <motion.div
                style={{ display: "flex", gap: 14, width: "max-content" }}
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                whileHover={{ animationPlayState: "paused" }}
            >
                {doubled.map((meal, i) => (
                    <MealCard
                        key={`${meal.idMeal}-${i}`}
                        meal={meal}
                        onClick={() => onSelect(meal.idMeal)}
                    />
                ))}
            </motion.div>
        </div>
    );
}

function SkeletonRow() {
    return (
        <div style={{ display: "flex", gap: 14, padding: "0 40px", overflow: "hidden" }}>
            {Array(6)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: 210,
                            height: 220,
                            flexShrink: 0,
                            borderRadius: 16,
                            background:
                                "linear-gradient(90deg,#181818 25%,#242424 50%,#181818 75%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 1.5s infinite",
                        }}
                    />
                ))}
            <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
        </div>
    );
}
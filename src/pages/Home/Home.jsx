import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./sections/Hero";
import FeaturedDishes from "./sections/FeaturedDishes";
import AboutSection from "./sections/AboutSection";
import MenuSection from "./sections/MenuSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import FoodCarouselPage from "./sections/Foodcarouselpage";
import MealDetailPage from "../MealDetails/sections/Mealdetailpage";

export default function Home() {
  const [selectedMealId, setSelectedMealId] = useState(null);

  return (
    <div style={{ background: "#0a0804", minHeight: "100vh", overflowX: "hidden" }}>
      <Hero />
      <FeaturedDishes />
      <AnimatePresence mode="wait">
          <FoodCarouselPage
            key="carousel"
            onSelectMeal={(id) => setSelectedMealId(id)}
          />
      </AnimatePresence>
      <AboutSection />
      <MenuSection />
      <TestimonialsSection />
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroAnimation from "./components/IntroAnimation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import MealDetail from "./pages/MealDetails/MealDetails";
import SearchPage from "./pages/Search/search";    
import TrendingPage from "./pages/Trending/TrendingPage";
import RandomMealPage from "./pages/RandomMeal/RandomMealPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import ScrollToTop from "./components/ScrollToTop";
import CategoryMealsPage from "./pages/Categories/CategoryMealsPage";
import Category from "./pages/Categories/Category";
import CountriesPage from "./pages/Country/CountriesPage";
import CountriesMealspage from "./pages/Country/CountriesMealspage";
import Book from "./pages/BookTable/Book";
import Menu from "./pages/Menu/Menu";
import Private from "./pages/PrivateDinner/Private";
import HomeCocktail from "./pages/Cocktails/Home/home";
import CocktailDetails from "./pages/Cocktails/CocktailDetails/CocktailDetails";
import Latest from "./pages/Cocktails/Cocktail/Cocktail";
import NotFound from "./pages/NotFound/NotFound";
import Specials from "./pages/specials/specials";
import Chefstable from "./pages/chefs-table/chefstable";
import Tasting from "./pages/tasting/tasting";
import Worldcuisine from "./pages/world-cuisine/Worldcuisine";
import Meals from "./pages/meals/meals";
import Cursor from "./components/Cursor";
import New from "./pages/Cocktails/new/new";
import Classics from "./pages/Cocktails/classics/Classics";
import Mocktails from "./pages/Cocktails/mocktails/Mocktails";
import RandomCocktail from "./pages/Cocktails/random/randomCocktail"; 

export default function App() {
    const [introComplete, setIntroComplete] = useState(false);

  return (
        <div style={{ background: "#0a0804", minHeight: "100vh", overflowX: "hidden" }}>

    <AnimatePresence>
  {!introComplete && (
    <IntroAnimation
      onComplete={() => {
        localStorage.setItem("introPlayed", "true");
        setIntroComplete(true);
      }}
    />
  )}
</AnimatePresence>
    <BrowserRouter>
     <ScrollToTop />
      <Navbar />
      <Cursor />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/random" element={<RandomMealPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/category/:category" element={<CategoryMealsPage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/country" element={<CountriesPage />} />
        <Route path="/country/:name" element={<CountriesMealspage />} />
        <Route path="/book" element={<Book />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/private" element={<Private />} />
        <Route path="/home" element={<HomeCocktail />} />
        <Route path="/cocktail/:id" element={<CocktailDetails />} />
        <Route path="/cocktail" element={<Latest />} />
        <Route path="/specials" element={<Specials/>} />
        <Route path="/chefs-table" element={<Chefstable/>} />
        <Route path="/tasting" element={<Tasting/>} />
        <Route path="/world-cuisine" element={<Worldcuisine/>} />
        <Route path="/meals" element={<Meals/>} />
        <Route path="/cocktails/new" element={<New/>} />
        <Route path="/cocktails/classics" element={<Classics/>} />
        <Route path="/cocktails/mocktails" element={<Mocktails/>} />
        <Route path="/random-cocktail" element={<RandomCocktail/>} />
        <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />
    </BrowserRouter>
    </div>
  );
}
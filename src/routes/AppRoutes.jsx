import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import Home from "@/pages/Home/Home";
import CategoriesPage from "@/pages/Categories/CategoriesPage";
import MealDetail from "@/pages/MealDetail/MealDetail";
import SearchPage from "@/pages/Search/SearchPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/meal/:id" element={<MealDetail />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
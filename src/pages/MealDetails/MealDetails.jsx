import React from 'react'
import MealDetailPage from './sections/Mealdetailpage';
import { useParams } from 'react-router-dom';
import CategoriesSection from './sections/CategoriesSection';
import Breadcrumbs from "@/components/Breadcrumbs";

const MealDetails = () => {
  const params = useParams();
  const mealId = params.id;

  return (
    <div style={{ padding: "60px 20px 20px 20px" }}>
      <>
      <Breadcrumbs/>
      <MealDetailPage mealId={mealId} />
      <CategoriesSection />
      </>
    </div>
  )
}

export default MealDetails
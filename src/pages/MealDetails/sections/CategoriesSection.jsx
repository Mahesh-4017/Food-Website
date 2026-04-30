import { useEffect, useState } from "react";
import { getAllCategories } from "@/services/mealApi";
import { Link } from "react-router-dom";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategories();
      setCategories(data?.slice(0, 15) || []);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "60px 40px", background: "#0c0c0c" }}>
      <h2 style={{ color: "#f0ece4", marginBottom: 30 }}>
        Popular Categories
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {categories.map((category) => (
          < Link
            key={category.idCategory}
            to={`/meal/${category.strCategory}`}
            style={{
              background: "#141414",
              borderRadius: 16,
              overflow: "hidden",
              textDecoration: "none",
            }}
          >
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              style={{ width: "100%" }}
            />

            <div style={{ padding: 19, textAlign: "center", fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif;' }}>
              <p style={{ color: "#f0ece4" }}>
                {category.strCategory}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "@/services/mealApi";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data || []);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        padding: "60px 40px",
      }}
    >
        <Breadcrumbs />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1
          style={{
            color: "#f0ece4",
            fontSize: 42,
            marginBottom: 10,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Categories
        </h1>

        <p
          style={{
            color: "#6a5a4a",
            marginBottom: 40,
            fontSize: 18,
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          Explore recipes by category
        </p>

        {loading ? (
          <p style={{ color: "#777" }}>Loading categories...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {categories.map((category) => (
              <motion.div
                key={category.idCategory}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate(`/category/${category.strCategory}`)}
                style={{
                  background: "#141414",
                  borderRadius: 18,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  style={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: 20 }}>
                  <h3
                    style={{
                      color: "#f0ece4",
                      marginBottom: 10,
                      fontSize: 24,
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {category.strCategory}
                  </h3>

                  <p
                    style={{
                      color: "#6a5a4a",
                      lineHeight: 1.7,
                      fontSize: 14,
                    }}
                  >
                    {category.strCategoryDescription.slice(0, 120)}...
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
    </> 
  );
}
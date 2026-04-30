import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllCategories } from "@/services/mealApi";

export default function Category() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        padding: "60px 40px",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 50 }}>
          <h1
            style={{
              fontSize: 48,
              color: "#f5efe6",
              fontFamily: "'Playfair Display', serif",
              marginBottom: 12,
            }}
          >
            Meal Categories
          </h1>

          <p
            style={{
              color: "#8a7a6a",
              fontSize: 18,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Browse meals by category
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <p style={{ color: "#888" }}>Loading categories...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.idCategory}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() =>
                  navigate(`/category/${category.strCategory}`)
                }
                style={{
                  cursor: "pointer",
                  background: "#141414",
                  borderRadius: 24,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    height: 220,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: 24 }}>
                  <h2
                    style={{
                      color: "#f5efe6",
                      fontSize: 28,
                      marginBottom: 12,
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {category.strCategory}
                  </h2>

                  <p
                    style={{
                      color: "#8a7a6a",
                      lineHeight: 1.7,
                      fontSize: 15,
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    {category.strCategoryDescription.slice(0, 120)}...
                  </p>

                  <div
                    style={{
                      marginTop: 18,
                      color: "#e8913a",
                      fontSize: 14,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Explore Category →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
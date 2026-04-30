import { motion } from "framer-motion";
import { getYoutubeId } from "../services/mealApi";

export default function VideoPlayer({ url }) {
  const videoId = getYoutubeId(url);

  if (!videoId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        marginTop: 40,
        borderRadius: 24,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "#141414",
      }}
    >
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <h2
          style={{
            color: "#f5efe6",
            fontSize: 28,
            margin: 0,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Recipe Video
        </h2>

        <p
          style={{
            color: "#8a7a6a",
            marginTop: 8,
            fontSize: 15,
          }}
        >
          Watch how this recipe is prepared
        </p>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Recipe Video"
          allowFullScreen
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>
    </motion.div>
  );
}
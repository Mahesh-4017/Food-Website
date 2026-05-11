// components/Cursor.jsx

"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const Cursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);

  const springX = useSpring(pos.x, {
    stiffness: 120,
    damping: 18,
  });

  const springY = useSpring(pos.y, {
    stiffness: 120,
    damping: 18,
  });

  useEffect(() => {
    const move = (e) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const over = (e) => {
      if (
        e.target.closest(
          "button,a,img,input,textarea,[data-cursor]"
        )
      ) {
        setHovered(true);
      }
    };

    const out = () => {
      setHovered(false);
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        style={{
          left: springX,
          top: springY,
        }}
        animate={{
          width: hovered ? 52 : 12,
          height: hovered ? 52 : 12,
          opacity: hovered ? 0.35 : 0.9,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          fixed
          pointer-events-none
          z-[9999]
          rounded-full
          bg-[#c8a050]
          -translate-x-1/2
          -translate-y-1/2
          mix-blend-difference
          hidden lg:block
        "
      />

      {/* Dot Cursor */}
      <motion.div
        style={{
          left: pos.x,
          top: pos.y,
        }}
        className="
          fixed
          pointer-events-none
          z-[9998]
          w-1.5
          h-1.5
          rounded-full
          bg-white
          -translate-x-1/2
          -translate-y-1/2
          hidden lg:block
        "
      />
    </>
  );
};

export default Cursor;
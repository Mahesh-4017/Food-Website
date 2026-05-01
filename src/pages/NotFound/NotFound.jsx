import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0804] flex items-center justify-center px-6">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] rounded-full bg-orange-500/20 blur-[140px]" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] rounded-full bg-amber-400/10 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* TV Container */}
        <motion.div
          animate={{ rotate: [0, 1, -1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="relative mb-12"
        >
          {/* 404 Background */}
          <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-10 select-none">
            <span className="text-[120px] md:text-[180px] font-black text-white">4</span>
            <span className="text-[120px] md:text-[180px] font-black text-white">0</span>
            <span className="text-[120px] md:text-[180px] font-black text-white">4</span>
          </div>

          {/* Antenna */}
          <div className="mx-auto w-20 h-20 rounded-full bg-orange-500 border-4 border-black relative z-10 mb-[-40px]">
            <div className="absolute w-1 h-28 bg-black rotate-[-25deg] left-[-40px] top-[-80px] rounded-full" />
            <div className="absolute w-1 h-28 bg-black rotate-[25deg] right-[-40px] top-[-80px] rounded-full" />
          </div>

          {/* TV */}
          <div className="relative bg-orange-600 border-4 border-[#1d0e01] rounded-[30px] w-[300px] md:w-[380px] h-[190px] md:h-[220px] shadow-[inset_6px_6px_0px_#e69635] flex items-center justify-center">
            {/* Screen */}
            <div className="bg-black border-4 border-black rounded-2xl w-[70%] h-[70%] flex items-center justify-center overflow-hidden relative">
              <motion.div
                animate={{ opacity: [0.85, 1, 0.9, 1] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05),transparent)]"
              />

              <motion.div
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-white text-sm md:text-base tracking-[0.3em] font-bold"
              >
                PAGE NOT FOUND
              </motion.div>
            </div>

            {/* Side Buttons */}
            <div className="absolute right-3 flex flex-col gap-4">
              <div className="w-8 h-8 rounded-full bg-[#7f5934] border-2 border-black" />
              <div className="w-8 h-8 rounded-full bg-[#7f5934] border-2 border-black" />
            </div>
          </div>

          {/* TV Legs */}
          <div className="flex justify-center gap-24 mt-1">
            <div className="w-8 h-4 bg-gray-700 rounded-sm" />
            <div className="w-8 h-4 bg-gray-700 rounded-sm" />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-[#f5efe6] mb-4 font-serif">
            Oops! Page Missing
          </h1>

          <p className="text-[#f5efe6]/60 leading-8 text-sm md:text-base mb-8 px-2">
            Looks like this recipe page disappeared from the kitchen. Let's bring you back home.
          </p>

          <Link to="/" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 35px",
                background: "linear-gradient(to right, #f97316, #f59e0b)",
                color: "#fff",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 40px rgba(232, 145, 58, 0.3)",
                transition: "all 0.3s ease",
              }}
            >
              Back Home
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const wines = [
  {
    id: 1,
    year: "2018",
    name: "Château Lumière",
    type: "French Red Wine",
    note: "Dark berries • Oak • Velvet finish",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 2,
    year: "2020",
    name: "Golden Estate",
    type: "Luxury White Wine",
    note: "Pear • Citrus • Floral aroma",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 3,
    year: "2016",
    name: "Velvet Noir",
    type: "Premium Aged Wine",
    note: "Chocolate • Cherry • Smoke",
    image:
      "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 4,
    year: "2019",
    name: "Rosé Infinity",
    type: "Sparkling Rosé",
    note: "Rose petals • Strawberry • Fresh",
    image:
      "https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1974&auto=format&fit=crop",
  },
];

const pairings = [
  {
    food: "Steak & Red Wine",
    wine: "Velvet Noir",
    desc: "Rich smoky notes elevate grilled premium cuts.",
  },
  {
    food: "Seafood & White Wine",
    wine: "Golden Estate",
    desc: "Fresh citrus tones pair beautifully with seafood.",
  },
  {
    food: "Dessert & Rosé",
    wine: "Rosé Infinity",
    desc: "Light sweetness creates a balanced luxury finish.",
  },
];

export default function WinePairing() {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-[#050505] text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24">

        {/* Background */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-25"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

        {/* Blur */}
        <div className="absolute top-20 left-20 w-[300px] h-[300px] rounded-full bg-[#c8a050]/10 blur-[140px]" />
        <div className="absolute bottom-20 right-20 w-[250px] h-[250px] rounded-full bg-orange-500/10 blur-[140px]" />

        {/* Vertical Text */}
        <div className="hidden lg:flex absolute right-10 top-0 h-full items-center">
          <h1
            className="text-[140px] font-light text-white/5 tracking-[0.3em]"
            style={{
              writingMode: "vertical-rl",
            }}
          >
            WINE
          </h1>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="uppercase tracking-[0.5em] text-[#c8a050] text-xs md:text-sm mb-6">
              Curated Wine Experience
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[120px] font-light leading-none">
              Wine
              <span className="block italic text-[#c8a050]">
                Pairing
              </span>
            </h1>

            <p className="mt-8 text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
              Discover elegant wine pairings crafted to elevate every dish,
              every flavor, and every luxurious dining moment.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-[#c8a050] text-black px-8 md:px-10 py-4 rounded-full hover:scale-105 transition duration-300">
                Explore Collection
              </button>

              <button className="border border-white/15 bg-white/[0.03] backdrop-blur-xl px-8 md:px-10 py-4 rounded-full hover:bg-white hover:text-black transition duration-300">
                Reserve Table
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg">
              {[
                ["120+", "Wine Labels"],
                ["18", "Luxury Regions"],
                ["5★", "Fine Dining"],
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h2 className="text-3xl md:text-5xl font-light text-[#c8a050]">
                    {item[0]}
                  </h2>

                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2">
                    {item[1]}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT IMAGE STACK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[700px] hidden lg:block"
          >
            {wines.map((wine, i) => (
              <motion.div
                key={wine.id}
                whileHover={{
                  y: -20,
                  rotate: 0,
                }}
                onClick={() => setActive(i)}
                className={`absolute cursor-pointer overflow-hidden rounded-[40px] border transition-all duration-500 ${
                  active === i
                    ? "border-[#c8a050] z-30"
                    : "border-white/10"
                }`}
                style={{
                  width: "320px",
                  height: "480px",
                  top: `${i * 45}px`,
                  left: `${i * 50}px`,
                  rotate: `${-8 + i * 4}deg`,
                }}
              >
                <img
                  src={wine.image}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-0 p-8">
                  <p className="uppercase tracking-[0.3em] text-[#c8a050] text-xs mb-3">
                    {wine.type}
                  </p>

                  <h2 className="text-4xl font-light mb-2">
                    {wine.name}
                  </h2>

                  <p className="text-gray-300 text-sm">
                    {wine.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= PAIRINGS ================= */}
      <section className="py-28 px-6 md:px-12 lg:px-24">

        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-4 mb-20">
            <div className="w-20 h-[1px] bg-[#c8a050]" />

            <p className="uppercase tracking-[0.3em] text-[#c8a050] text-sm">
              Signature Pairings
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">

            {pairings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                }}
                className="relative p-10 rounded-[35px] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl"
              >

                {/* Number */}
                <h1 className="absolute top-6 right-6 text-7xl font-light text-white/5">
                  0{i + 1}
                </h1>

                <p className="uppercase tracking-[0.3em] text-[#c8a050] text-xs mb-5">
                  {item.wine}
                </p>

                <h2 className="text-4xl font-light mb-6 leading-tight">
                  {item.food}
                </h2>

                <p className="text-gray-400 leading-relaxed mb-8">
                  {item.desc}
                </p>

                <button className="border border-[#c8a050]/40 px-6 py-3 rounded-full hover:bg-[#c8a050] hover:text-black transition duration-300">
                  Discover Pairing
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURE SECTION ================= */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#080808]">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop"
              className="rounded-[40px] h-[700px] w-full object-cover"
            />

            <div className="absolute -bottom-10 -right-10 bg-[#c8a050] text-black p-8 rounded-[35px]">
              <h1 className="text-5xl font-light">18+</h1>

              <p className="uppercase tracking-[0.2em] text-xs mt-3">
                Global Vineyards
              </p>
            </div>
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[0.4em] text-[#c8a050] text-sm mb-6">
              Sommelier Selection
            </p>

            <h2 className="text-5xl md:text-7xl font-light leading-tight mb-10">
              Taste
              <span className="italic text-[#c8a050]">
                {" "}Refined Luxury
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Our sommeliers carefully select wines from world-renowned
              vineyards to complement every texture, aroma, and culinary detail.
            </p>

            <div className="space-y-5">
              {[
                "Premium Imported Wines",
                "Luxury Food Pairings",
                "Exclusive Reserve Collection",
                "Expert Sommelier Recommendations",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <div className="w-3 h-3 rounded-full bg-[#c8a050]" />

                  <p className="text-gray-300">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>

            <button className="mt-10 border border-[#c8a050] px-10 py-4 rounded-full hover:bg-[#c8a050] hover:text-black transition duration-300">
              View Wine Menu
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-32 px-6 text-center relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-t from-[#c8a050]/10 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <p className="uppercase tracking-[0.4em] text-[#c8a050] text-sm mb-6">
            Reserve Your Experience
          </p>

          <h2 className="text-5xl md:text-7xl font-light leading-tight mb-10">
            A Journey
            <span className="italic text-[#c8a050]">
              {" "}Through Wine
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Experience luxury dining and expertly curated wine pairings
            designed to transform every evening into a celebration.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-[#c8a050] text-black px-10 py-4 rounded-full hover:scale-105 transition duration-300">
              Book Wine Table
            </button>

            <button className="border border-white/15 bg-white/[0.03] px-10 py-4 rounded-full hover:bg-white hover:text-black transition duration-300">
              Contact Sommelier
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
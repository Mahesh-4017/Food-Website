"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cocktails = [
  {
    name: "Golden Velvet",
    type: "Luxury Signature",
    desc: "Smoked vanilla, citrus essence, and golden shimmer.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Midnight Smoke",
    type: "Dark Whiskey Blend",
    desc: "Oak-aged whiskey infused with spice and smoke.",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Ocean Breeze",
    type: "Fresh Tropical Fusion",
    desc: "Blue citrus fusion with icy mint freshness.",
    image:
      "https://images.unsplash.com/photo-1560508179-b2c9a2f8f8d6?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Rose Crystal",
    type: "Elegant Floral Mix",
    desc: "Rose petals, sparkling infusion, and luxury finish.",
    image:
      "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?q=80&w=1974&auto=format&fit=crop",
  },
];

const staggerChildren = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
    },
  },
};

const RandomCocktail = () => {
  const [current, setCurrent] = useState(0);

  const randomDrink = () => {
    const random = Math.floor(Math.random() * cocktails.length);
    setCurrent(random);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      randomDrink();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative">
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-20 left-20 w-80 h-80 bg-[#c8a050]/10 blur-[150px] rounded-full"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.12, 0.1],
        }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-orange-500/10 blur-[150px] rounded-full"
      />

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-20 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
            variants={staggerChildren}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
              }}
              className="uppercase tracking-[0.5em] text-[#c8a050] text-sm mb-6"
            >
              LUMINE Discovery
            </motion.p>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-5xl md:text-7xl lg:text-8xl font-light leading-none mb-8"
            >
              Random
              <span className="block italic text-[#c8a050]">
                Cocktail
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10"
            >
              Discover a new handcrafted cocktail experience every
              time. Luxury flavors, premium presentation, and artistic
              mixology.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={randomDrink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#c8a050] text-black px-10 py-4 rounded-full"
              >
                Generate Cocktail
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="border border-white/20 px-10 py-4 rounded-full hover:bg-white hover:text-black transition"
              >
                Explore Menu
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <div className="relative h-[700px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="absolute w-full"
              >
                <div className="relative overflow-hidden rounded-[45px] border border-white/10 bg-[#0a0a0a]">
                  <div className="h-[700px] overflow-hidden">
                    <img
                      src={cocktails[current].image}
                      alt={cocktails[current].name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute top-8 right-8">
                    <h1 className="text-[120px] text-white/10 font-light leading-none">
                      0{current + 1}
                    </h1>
                  </div>

                  <div className="absolute bottom-0 p-10 w-full">
                    <p className="uppercase tracking-[0.3em] text-[#c8a050] text-sm mb-4">
                      {cocktails[current].type}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-4xl md:text-5xl font-light mb-4">
                          {cocktails[current].name}
                        </h2>

                        <p className="text-gray-300 max-w-md">
                          {cocktails[current].desc}
                        </p>
                      </div>

                      <motion.span
                        whileHover={{ rotate: 45, scale: 1.1 }}
                        className="text-[#c8a050] text-5xl cursor-pointer"
                      >
                        +
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* MINI CARDS */}
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-14">
            <div className="w-16 h-[1px] bg-[#c8a050]" />

            <p className="uppercase tracking-[0.3em] text-[#c8a050] text-sm">
              More Discoveries
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-100px 0px -100px 0px" }}
            variants={staggerChildren}
            className="grid md:grid-cols-4 gap-6"
          >
            {cocktails.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  y: -10,
                }}
                onClick={() => setCurrent(i)}
                className={`group relative overflow-hidden rounded-[30px] cursor-pointer border ${
                  current === i
                    ? "border-[#c8a050] shadow-lg shadow-[#c8a050]/20"
                    : "border-white/10"
                }`}
              >
                <div className="h-[300px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                <div className="absolute bottom-0 p-6">
                  <p className="uppercase tracking-[0.2em] text-[#c8a050] text-xs mb-2">
                    {item.type}
                  </p>

                  <h3 className="text-2xl font-light">
                    {item.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 px-6 md:px-20 bg-gradient-to-b from-black to-[#0a0a0a]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Ready for Your Next
            <span className="text-[#c8a050] italic">
              {" "}
              Experience
            </span>
          </h2>

          <p className="text-gray-400 text-lg mb-10">
            Join our VIP list and receive exclusive cocktail recipes,
            limited-time events, and behind-the-bar stories.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-[#c8a050] text-black px-10 py-4 rounded-full"
            >
              Sign Up
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              className="border border-white/20 px-10 py-4 rounded-full hover:bg-white hover:text-black transition"
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default RandomCocktail;
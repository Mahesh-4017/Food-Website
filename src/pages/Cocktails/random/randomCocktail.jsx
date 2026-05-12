"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const cocktails = [
  {
    title: "Berry Glow",
    subtitle: "Fresh Berries • Mint • Sparkling Ice",
    category: "Signature Fresh",
    price: "$18",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Tropical Gold",
    subtitle: "Mango • Citrus • Pineapple",
    category: "Tropical Fusion",
    price: "$22",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Rose Crystal",
    subtitle: "Rose Syrup • Sparkling Water",
    category: "Elegant Floral",
    price: "$19",
    image:
      "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Velvet Sunset",
    subtitle: "Orange • Peach • Gold Dust",
    category: "Luxury Sunset",
    price: "$24",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Emerald Splash",
    subtitle: "Kiwi • Lime • Basil",
    category: "Green Fresh",
    price: "$21",
    image:
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Frozen Pearl",
    subtitle: "Coconut • Vanilla • Cream Foam",
    category: "Creamy Luxe",
    price: "$23",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Ruby Passion",
    subtitle: "Pomegranate • Cherry • Smoke",
    category: "Dark Fusion",
    price: "$26",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Golden Mirage",
    subtitle: "Passionfruit • Honey • Citrus",
    category: "Golden Edition",
    price: "$25",
    image:
      "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Crystal Bloom",
    subtitle: "Lavender • Rose • Lemon",
    category: "Floral Signature",
    price: "$22",
    image:
      "https://images.unsplash.com/photo-1461823385004-d7660947a7c0?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Night Spark",
    subtitle: "Blackberry • Cola Foam • Mint",
    category: "Midnight Edition",
    price: "$27",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Aurora Chill",
    subtitle: "Blueberry • Ice Lemon • Soda",
    category: "Ice Collection",
    price: "$20",
    image:
      "https://images.unsplash.com/photo-1514361892635-eae31ec8d1fc?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function LuxuryCocktailPage() {
  const [current, setCurrent] = useState(0);

  const randomDrink = () => {
    const random = Math.floor(Math.random() * cocktails.length);
    setCurrent(random);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      randomDrink();
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll();

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div className="bg-[#050505] text-white overflow-hidden">

      {/* NOISE */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* BACKGROUND GLOW */}
      <motion.div
        style={{ rotate }}
        className="
          fixed
          top-[-20%]
          left-[-10%]
          w-[900px]
          h-[900px]
          rounded-full
          bg-[#c8a050]/10
          blur-[180px]
          z-0
        "
      />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-32">

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1fr_0.9fr] gap-16 items-center">

          {/* LEFT */}
          <div className="relative z-10">

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="
                uppercase
                tracking-[0.45em]
                text-[#c8a050]
                text-xs
                mb-8
              "
            >
              Luxury Cocktail Experience
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="
                text-6xl
                md:text-8xl
                lg:text-[9rem]
                leading-[0.9]
                font-light
                mb-10
              "
            >
              Liquid
              <span className="block italic text-[#c8a050]">
                Artistry
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="
                text-gray-400
                text-lg
                md:text-xl
                leading-relaxed
                max-w-xl
                mb-12
              "
            >
              Discover elevated cocktails crafted through smoke,
              rare ingredients, modern mixology, and unforgettable
              luxury presentation.
            </motion.p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5">

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={randomDrink}
                className="
                  bg-[#c8a050]
                  text-black
                  px-10
                  py-5
                  rounded-full
                  text-sm
                  uppercase
                  tracking-[0.25em]
                  font-medium
                "
              >
                Random Cocktail
              </motion.button>

              <motion.button
                whileHover={{
                  backgroundColor: "#fff",
                  color: "#000",
                }}
                className="
                  border
                  border-white/15
                  px-10
                  py-5
                  rounded-full
                  uppercase
                  text-sm
                  tracking-[0.25em]
                  transition
                "
              >
                Reserve Lounge
              </motion.button>
            </div>

            {/* STATS */}
            <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg">

              {[
                ["40+", "Signature Drinks"],
                ["12", "Master Mixologists"],
                ["5★", "Luxury Experience"],
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h2 className="text-4xl text-[#c8a050] font-light mb-2">
                    {item[0]}
                  </h2>

                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
                    {item[1]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-[700px] lg:h-[900px]">

            {/* ROTATING RING */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 30,
                ease: "linear",
              }}
              className="
                absolute
                inset-0
                rounded-full
                border
                border-white/5
              "
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: -6,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                transition={{
                  duration: 1,
                }}
                className="
                  absolute
                  inset-0
                  rounded-[50px]
                  overflow-hidden
                  border
                  border-white/10
                "
              >

                <img
                  src={cocktails[current].image}
                  alt=""
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* TOP */}
                <div className="absolute top-10 left-10">

                  <p className="uppercase tracking-[0.3em] text-[#c8a050] text-xs mb-4">
                    {cocktails[current].type}
                  </p>

                  <h1 className="text-[90px] md:text-[120px] text-white/10 font-light leading-none">
                    0{current + 1}
                  </h1>
                </div>

                {/* BOTTOM */}
                <div className="absolute bottom-0 left-0 p-10 md:p-14 w-full">

                  <div className="flex items-end justify-between gap-8">

                    <div>
                      <h2 className="text-5xl md:text-7xl font-light mb-5">
                        {cocktails[current].name}
                      </h2>

                      <p className="text-gray-300 max-w-lg text-lg leading-relaxed">
                        {cocktails[current].desc}
                      </p>
                    </div>

                    <div className="hidden md:block">
                      <p className="text-[#c8a050] text-2xl">
                        {cocktails[current].year}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* VERTICAL SHOWCASE */}
      <section className="relative py-40 px-6 md:px-12 lg:px-20">

        <div className="max-w-7xl mx-auto">

          <div className="mb-24 text-center">

            <p className="uppercase tracking-[0.4em] text-[#c8a050] text-xs mb-6">
              Curated Collection
            </p>

            <h2 className="text-5xl md:text-7xl font-light">
              Featured
              <span className="italic text-[#c8a050]">
                {" "}Experiences
              </span>
            </h2>
          </div>

          <div className="space-y-40">

            {cocktails.map((item, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 100,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1,
                }}
                viewport={{
                  once: true,
                }}
                className={`
                  grid
                  lg:grid-cols-2
                  gap-16
                  items-center
                  ${i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}
                `}
              >

                {/* IMAGE */}
                <div className="relative group">

                  <div className="
                    absolute
                    -top-10
                    -left-4
                    text-[120px]
                    md:text-[170px]
                    text-white/[0.04]
                    font-light
                    z-10
                  ">
                    0{i + 1}
                  </div>

                  <div className="
                    relative
                    h-[500px]
                    md:h-[700px]
                    overflow-hidden
                    rounded-[40px]
                  ">

                    <img
                      src={item.image}
                      alt=""
                      className="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-110
                        transition
                        duration-[1500ms]
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  </div>
                </div>

                {/* CONTENT */}
                <div>

                  <p className="uppercase tracking-[0.4em] text-[#c8a050] text-xs mb-6">
                    {item.type}
                  </p>

                  <h2 className="text-5xl md:text-7xl font-light leading-[0.95] mb-8">
                    {item.name}
                  </h2>

                  <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-12">

                    {[
                      "Luxury Blend",
                      "Crystal Glass",
                      "Premium Ice",
                    ].map((tag, idx) => (
                      <div
                        key={idx}
                        className="
                          px-5
                          py-3
                          rounded-full
                          border
                          border-white/10
                          bg-white/[0.03]
                          text-sm
                          text-gray-300
                        "
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="
                      border
                      border-[#c8a050]
                      px-8
                      py-4
                      rounded-full
                      hover:bg-[#c8a050]
                      hover:text-black
                      transition
                    "
                  >
                    Explore Cocktail
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-40 px-6 overflow-hidden">

        <div className="
          absolute
          inset-0
          bg-gradient-to-b
          from-transparent
          via-[#c8a050]/5
          to-transparent
        " />

        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{
            once: true,
          }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >

          <p className="uppercase tracking-[0.4em] text-[#c8a050] text-xs mb-8">
            Reserve Your Experience
          </p>

          <h2 className="
            text-5xl
            md:text-7xl
            lg:text-8xl
            font-light
            leading-[0.95]
            mb-10
          ">
            Taste The
            <span className="italic text-[#c8a050]">
              {" "}Extraordinary
            </span>
          </h2>

          <p className="
            text-gray-400
            text-lg
            md:text-xl
            leading-relaxed
            max-w-3xl
            mx-auto
            mb-14
          ">
            Step into a world of handcrafted cocktails,
            immersive atmosphere, and unforgettable luxury moments.
          </p>

          <div className="flex flex-wrap justify-center gap-5">

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              className="
                bg-[#c8a050]
                text-black
                px-12
                py-5
                rounded-full
                uppercase
                tracking-[0.25em]
                text-sm
              "
            >
              Book Lounge
            </motion.button>

            <motion.button
              whileHover={{
                backgroundColor: "#fff",
                color: "#000",
              }}
              className="
                border
                border-white/15
                px-12
                py-5
                rounded-full
                uppercase
                tracking-[0.25em]
                text-sm
                transition
              "
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
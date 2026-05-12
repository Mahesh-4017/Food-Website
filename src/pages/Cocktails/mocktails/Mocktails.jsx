import React from "react";
import { motion } from "framer-motion";

const mocktails = [
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
  {
    title: "Ocean Mist",
    subtitle: "Blue Fusion • Lime • Mint Foam",
    category: "Luxury Chill",
    price: "$20",
    image:
      "https://images.unsplash.com/photo-1560508179-b2c9a2f8f8d6?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function MocktailsLuxury() {
  return (
    <div className="bg-[#050505] text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen border-b border-white/5">

        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
            }}
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-20"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/60 to-black" />
        </div>

        {/* GRID LINES */}
        <div className="absolute inset-0 opacity-[0.04]">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-[1px] bg-white"
              style={{
                left: `${i * 10}%`,
              }}
            />
          ))}
        </div>

        {/* BLUR LIGHTS */}
        <div className="absolute top-40 left-20 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-[#c8a050]/10 rounded-full blur-[180px]" />

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 lg:px-20 py-32">

          {/* TOP */}
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >

              {/* SMALL TAG */}
              <div className="flex items-center gap-5 mb-10">
                <div className="w-20 h-[1px] bg-[#c8a050]" />

                <p className="uppercase tracking-[0.5em] text-[#c8a050] text-xs">
                  Luxury Mocktail Bar
                </p>
              </div>

              {/* HUGE TITLE */}
              <div className="relative">

                <h1 className="text-[5rem] sm:text-[7rem] md:text-[9rem] xl:text-[11rem] font-black leading-[0.85] tracking-[-0.08em]">
                  Liquid
                </h1>

                <h1 className="italic text-[#c8a050] text-[5rem] sm:text-[7rem] md:text-[9rem] xl:text-[11rem] font-black leading-[0.85] tracking-[-0.08em] pl-10">
                  Artistry
                </h1>

                {/* STROKE TEXT */}
                <h1
                  className="
                  absolute top-10 left-10
                  text-[5rem] sm:text-[7rem] md:text-[9rem] xl:text-[11rem]
                  font-black
                  text-transparent
                  [-webkit-text-stroke:1px_rgba(255,255,255,0.06)]
                  pointer-events-none
                "
                >
                  Mocktails
                </h1>
              </div>

              {/* DESC */}
              <p className="mt-10 max-w-2xl text-gray-400 text-lg md:text-xl leading-9">
                Discover a modern luxury mocktail experience featuring
                handcrafted drinks, smoke infusions, fresh botanicals,
                crystal ice, and unforgettable presentation.
              </p>

              {/* BUTTONS */}
              <div className="mt-14 flex flex-wrap gap-5">

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="
                    group relative overflow-hidden
                    bg-[#c8a050]
                    text-black
                    px-10 py-5
                    rounded-full
                    uppercase
                    tracking-[0.25em]
                    text-sm
                    font-semibold
                  "
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Explore Menu
                    <span className="group-hover:translate-x-1 transition">
                      →
                    </span>
                  </span>

                  <div className="absolute inset-0 bg-white/30 translate-x-[-120%] group-hover:translate-x-[120%] skew-x-12 transition duration-700" />
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                  className="
                    border border-white/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                    px-10 py-5
                    rounded-full
                    uppercase
                    tracking-[0.25em]
                    text-sm
                  "
                >
                  Reserve Lounge
                </motion.button>
              </div>

              {/* STATS */}
              <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl">

                {[
                  ["40+", "Luxury Drinks"],
                  ["12k", "Happy Guests"],
                  ["100%", "Fresh Ingredients"],
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="border-l border-white/10 pl-5"
                  >
                    <h2 className="text-4xl md:text-5xl font-light text-[#c8a050]">
                      {item[0]}
                    </h2>

                    <p className="uppercase tracking-[0.2em] text-xs text-gray-500 mt-2">
                      {item[1]}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2 }}
              className="relative h-[900px] hidden lg:block"
            >

              {/* MAIN IMAGE */}
              <div className="absolute top-0 left-0 w-[70%] h-[500px] rounded-[40px] overflow-hidden">
                <img
                  src={mocktails[0].image}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              </div>

              {/* SECOND */}
              <div className="absolute top-32 right-0 w-[45%] h-[320px] rounded-[30px] overflow-hidden">
                <img
                  src={mocktails[1].image}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* THIRD */}
              <div className="absolute bottom-20 left-10 w-[55%] h-[300px] rounded-[30px] overflow-hidden">
                <img
                  src={mocktails[2].image}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* FLOAT CARD */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                className="
                  absolute bottom-10 right-10
                  bg-black/40
                  backdrop-blur-2xl
                  border border-white/10
                  rounded-[30px]
                  p-8
                  w-[280px]
                "
              >
                <p className="uppercase tracking-[0.3em] text-[#c8a050] text-xs mb-3">
                  Featured Drink
                </p>

                <h3 className="text-4xl font-light mb-4">
                  Ocean Mist
                </h3>

                <p className="text-gray-400 leading-7">
                  Citrus fusion with luxury crystal presentation.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= HORIZONTAL SHOWCASE ================= */}

      <section className="py-32 border-t border-white/5">

        {/* <div className="px-6 md:px-10 lg:px-20 mb-16 flex items-center justify-between flex-wrap gap-5">

          <div>
            <p className="uppercase tracking-[0.4em] text-[#c8a050] text-xs mb-4">
              Signature Collection
            </p>

            <h2 className="text-5xl md:text-7xl font-light">
              Crafted
              <span className="italic text-[#c8a050]">
                {" "}Fresh
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-gray-500 leading-8">
            Every drink is designed with luxury aesthetics,
            handcrafted ingredients, and immersive presentation.
          </p>
        </div> */}

        {/* EDITORIAL MOCKTAIL SECTION */}
<section className="relative py-32 bg-[#050505] overflow-hidden">

  {/* Background Blur */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#c8a050]/10 blur-[180px] rounded-full" />

  <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-20">

    {/* Heading */}
    <div className="mb-24 text-center">
      <p className="uppercase tracking-[0.45em] text-[#c8a050] text-xs mb-6">
        Signature Collection
      </p>

      <h2 className="text-5xl md:text-7xl lg:text-8xl font-light leading-none">
        Crafted
        <span className="italic text-[#c8a050]"> Mocktails</span>
      </h2>
    </div>

    {/* Cards */}
    <div className="space-y-32">

      {mocktails.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className={`
            grid lg:grid-cols-2 gap-14 items-center
            ${i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""}
          `}
        >

          {/* IMAGE SIDE */}
          <div className="relative group">

            {/* Number */}
            <h1 className="absolute -top-10 left-0 text-[120px] md:text-[170px] font-light text-white/[0.04] z-10">
              0{i + 1}
            </h1>

            {/* Image */}
            <div className="relative overflow-hidden rounded-[35px] h-[500px] md:h-[650px]">

              <img
                src={item.image}
                alt={item.title}
                className="
                  w-full h-full object-cover
                  group-hover:scale-110
                  transition duration-[1400ms]
                "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

              {/* Floating Glass Effect */}
              <div className="
                absolute bottom-6 left-6
                backdrop-blur-xl
                bg-white/[0.06]
                border border-white/10
                rounded-full
                px-6 py-3
              ">
                <p className="uppercase tracking-[0.3em] text-[10px] text-[#c8a050]">
                  Premium Blend
                </p>
              </div>
            </div>
          </div>

          {/* CONTENT SIDE */}
          <div className="max-w-xl">

            <p className="uppercase tracking-[0.45em] text-[#c8a050] text-xs mb-6">
              {item.category}
            </p>

            <h2 className="text-5xl md:text-7xl font-light leading-[0.95] mb-8">
              {item.title}
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              {item.subtitle}. Crafted with luxury ingredients,
              crystal presentation, and elevated modern refreshment.
            </p>

            {/* Bottom Row */}
            <div className="flex items-center gap-6 flex-wrap">

              <button
                className="
                  bg-[#c8a050]
                  text-black
                  px-8 py-4
                  rounded-full
                  hover:scale-105
                  transition
                "
              >
                Discover Drink
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-[1px] bg-white/20" />

                <span className="text-2xl text-[#c8a050] font-light">
                  {item.price}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="mt-12 flex flex-wrap gap-4">

              {[
                "Fresh Fruits",
                "Luxury Ice",
                "Premium Syrups",
              ].map((tag, idx) => (
                <div
                  key={idx}
                  className="
                    border border-white/10
                    bg-white/[0.03]
                    px-5 py-2
                    rounded-full
                    text-sm text-gray-300
                  "
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      </section>
    </div>
  );
}
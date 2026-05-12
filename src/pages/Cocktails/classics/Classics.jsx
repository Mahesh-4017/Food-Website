import React from "react";
import { motion } from "framer-motion";

const classics = [
  {
    name: "Old Fashioned",
    year: "1880",
    desc: "Bourbon, bitters, orange peel, smoked sugar cube.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Negroni",
    year: "1919",
    desc: "Gin, Campari, sweet vermouth with citrus aroma.",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Martini",
    year: "1925",
    desc: "Dry gin, vermouth, olive essence, crystal chilled.",
    image:
      "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function Classics() {
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      
      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 md:px-20">
        
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2070&auto=format&fit=crop')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40" />

        {/* Decorative Blur */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#c8a050]/10 blur-[150px] rounded-full" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full">
          
          {/* LEFT */}
<motion.div
  initial={{ opacity: 0, y: 100 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 1.2,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative z-10 max-w-3xl"
>
  {/* TOP LABEL */}
  <div className="mb-8 flex items-center gap-5">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 80 }}
      transition={{ delay: 0.4, duration: 1 }}
      className="h-[1px] bg-[#c8a050]"
    />

    <p className="text-[11px] uppercase tracking-[0.45em] text-[#c8a050]">
      Timeless Collection
    </p>
  </div>

  {/* HEADING */}
  <div className="overflow-hidden">
    <motion.h1
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{
        delay: 0.2,
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-black leading-[0.9] tracking-[-0.06em] text-white"
    >
      Cocktail
    </motion.h1>
  </div>

  <div className="overflow-hidden">
    <motion.h1
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{
        delay: 0.35,
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="pl-1 text-[4rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] font-black italic leading-[0.9] tracking-[-0.06em] text-[#c8a050]"
    >
      Classics
    </motion.h1>
  </div>

  {/* DESC */}
  <motion.p
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.55,
      duration: 1,
    }}
    className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl leading-8 md:leading-9 text-gray-300"
  >
    Legendary cocktails elevated through rare ingredients,
    theatrical presentation, and refined contemporary mixology
    crafted for unforgettable nights.
  </motion.p>

  {/* BUTTONS */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.7,
      duration: 1,
    }}
    className="mt-12 flex flex-col gap-4 sm:flex-row"
  >
    {/* PRIMARY BTN */}
    <motion.button
      whileHover={{
        scale: 1.05,
        y: -3,
      }}
      whileTap={{
        scale: 0.96,
      }}
      className="group relative overflow-hidden rounded-full bg-[#c8a050] px-10 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-black"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        Explore Classics

        <motion.span
          whileHover={{ x: 4, y: -4 }}
          className="text-lg"
        >
          ↗
        </motion.span>
      </span>

      {/* Shine */}
      <motion.div
        initial={{ x: "-120%" }}
        whileHover={{ x: "120%" }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 skew-x-12 bg-white/30"
      />
    </motion.button>

    {/* SECONDARY BTN */}
    <motion.button
      whileHover={{
        scale: 1.05,
        borderColor: "#fff",
        backgroundColor: "rgba(255,255,255,0.08)",
      }}
      whileTap={{
        scale: 0.96,
      }}
      className="rounded-full border border-white/15 bg-white/[0.03] px-10 py-5 text-sm uppercase tracking-[0.25em] text-white backdrop-blur-xl transition"
    >
      Reserve Lounge
    </motion.button>
  </motion.div>

  {/* FLOATING INFO */}
  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
    }}
    className="mt-14 flex w-fit items-center gap-5 rounded-full border border-white/10 bg-white/[0.03] px-6 py-4 backdrop-blur-2xl"
  >
    <div className="flex -space-x-3">
      {[1, 2, 3].map((i) => (
        <img
          key={i}
          src={`https://i.pravatar.cc/100?img=${i + 10}`}
          alt=""
          className="h-10 w-10 rounded-full border-2 border-black object-cover"
        />
      ))}
    </div>

    <div>
      <p className="text-sm text-white">
        12k+ Luxury Guests
      </p>

      <p className="text-xs uppercase tracking-[0.2em] text-[#c8a050]">
        Worldwide Experience
      </p>
    </div>
  </motion.div>
</motion.div>

          {/* RIGHT BIG NUMBER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.08, scale: 1 }}
            transition={{ duration: 1.4 }}
            className="hidden lg:flex justify-center"
          >
            <h1 className="text-[320px] font-light leading-none text-[#c8a050]">
              01
            </h1>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-32 px-6 md:px-20 relative">
        
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden lg:block" />

        <div className="max-w-6xl mx-auto space-y-32">
          {classics.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                i % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              
              {/* IMAGE */}
              <div className="relative group">
                <div className="overflow-hidden rounded-[40px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[550px] object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                {/* Year Badge */}
                <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full">
                  <p className="text-[#c8a050] tracking-[0.2em] text-sm">
                    {item.year}
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <div>
                <p className="uppercase tracking-[0.3em] text-[#c8a050] text-sm mb-5">
                  Signature Classic
                </p>

                <h2 className="text-5xl md:text-6xl font-light mb-8">
                  {item.name}
                </h2>

                <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                  {item.desc}
                </p>

                <div className="flex items-center gap-6">
                  <button className="border border-[#c8a050] px-8 py-3 rounded-full hover:bg-[#c8a050] hover:text-black transition">
                    Discover
                  </button>

                  <span className="text-[#c8a050] text-4xl hover:rotate-45 transition duration-300 cursor-pointer">
                    +
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="py-32 px-6 md:px-20 bg-[#0a0a0a] relative overflow-hidden">
        
        <div className="absolute inset-0 opacity-10">
          <h1 className="text-[300px] text-center text-[#c8a050] font-light">
            LUMINE
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <p className="uppercase tracking-[0.4em] text-[#c8a050] text-sm mb-8">
            Crafted Philosophy
          </p>

          <h2 className="text-4xl md:text-6xl font-light leading-relaxed">
            “A perfect cocktail is not just a drink —
            <span className="italic text-[#c8a050]">
              {" "}it is an experience.”
            </span>
          </h2>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[0.3em] text-[#c8a050] text-sm mb-6">
            Luxury Cocktail Lounge
          </p>

          <h2 className="text-5xl md:text-7xl font-light leading-tight mb-10">
            Sip The
            <span className="italic text-[#c8a050]">
              {" "}Classics
            </span>
          </h2>

          <button className="bg-[#c8a050] text-black px-12 py-4 rounded-full text-lg hover:scale-105 transition">
            Reserve Experience
          </button>
        </motion.div>
      </section>
    </div>
  );
}
import React from "react";
import { motion } from "framer-motion";

const mocktails = [
  {
    title: "Berry Glow",
    flavor: "Fresh Berries • Mint",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Tropical Gold",
    flavor: "Mango • Pineapple • Citrus",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Ocean Mist",
    flavor: "Blue Curaçao Style • Lime",
    image:
      "https://images.unsplash.com/photo-1560508179-b2c9a2f8f8d6?q=80&w=1974&auto=format&fit=crop",
  },
  {
    title: "Rose Crystal",
    flavor: "Rose Syrup • Sparkling Water",
    image:
      "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?q=80&w=1974&auto=format&fit=crop",
  },
];

export default function Mocktails() {
  return (
    <div className="bg-[#050505] text-white min-h-screen overflow-hidden">
      
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        
        {/* Animated Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#050505]" />

        {/* Blur Lights */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-pink-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#c8a050]/10 blur-[150px] rounded-full" />

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="absolute top-32 right-32 hidden lg:block"
        >
          <div className="w-24 h-24 rounded-full border border-white/10 backdrop-blur-md" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-5xl"
        >
          <p className="uppercase tracking-[0.5em] text-[#c8a050] text-sm mb-6">
            Fresh • Vibrant • Luxury
          </p>

          <h1 className="text-6xl md:text-8xl font-light leading-none mb-8">
            Signature
            <span className="block italic text-[#c8a050]">
              Mocktails
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Refreshing handcrafted drinks infused with fruits, herbs,
            sparkling textures, and elegant presentation.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button className="bg-[#c8a050] text-black px-10 py-4 rounded-full hover:scale-105 transition">
              Explore Drinks
            </button>

            <button className="border border-white/20 px-10 py-4 rounded-full hover:bg-white hover:text-black transition">
              Reserve Lounge
            </button>
          </div>
        </motion.div>
      </section>

      {/* FEATURED CARDS */}
      <section className="py-32 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center gap-4 mb-20">
            <div className="w-16 h-[1px] bg-[#c8a050]" />

            <p className="uppercase tracking-[0.3em] text-[#c8a050] text-sm">
              Premium Collection
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {mocktails.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[35px] bg-[#0c0c0c] border border-white/5 hover:border-[#c8a050]/40 transition"
              >
                
                {/* Image */}
                <div className="overflow-hidden h-[450px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                {/* Floating Number */}
                <div className="absolute top-6 right-6">
                  <h1 className="text-6xl text-white/10 font-light">
                    0{i + 1}
                  </h1>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 p-8 w-full">
                  <p className="uppercase tracking-[0.2em] text-[#c8a050] text-xs mb-3">
                    {item.flavor}
                  </p>

                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-light">
                      {item.title}
                    </h2>

                    <span className="text-[#c8a050] text-3xl group-hover:rotate-45 transition duration-300">
                      +
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIAL EXPERIENCE */}
      <section className="py-32 px-6 md:px-20 bg-[#0a0a0a] relative overflow-hidden">
        
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <h1 className="text-[220px] font-light text-[#c8a050]">
            FRESH
          </h1>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=1974&auto=format&fit=crop"
              alt="Mocktail"
              className="rounded-[40px] h-[700px] w-full object-cover"
            />

            {/* Floating Card */}
            <div className="absolute -bottom-10 -right-10 bg-[#c8a050] text-black p-8 rounded-[35px] backdrop-blur-md">
              <p className="text-5xl font-light">100%</p>

              <p className="uppercase tracking-[0.2em] text-sm mt-3">
                Alcohol Free
              </p>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[0.4em] text-[#c8a050] text-sm mb-6">
              Elevated Refreshment
            </p>

            <h2 className="text-5xl md:text-7xl font-light leading-tight mb-10">
              Art In
              <span className="italic text-[#c8a050]">
                {" "}Every Sip
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Designed for sophisticated taste without alcohol — combining
              handcrafted syrups, fresh fruits, herbs, smoke effects,
              sparkling infusions, and luxury presentation.
            </p>

            <div className="space-y-5 mb-10">
              {[
                "Fresh Ingredients",
                "Luxury Glass Presentation",
                "Natural Fruit Infusions",
                "Signature Ice Designs",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4"
                >
                  <div className="w-3 h-3 rounded-full bg-[#c8a050]" />

                  <p className="text-gray-300">{item}</p>
                </div>
              ))}
            </div>

            <button className="border border-[#c8a050] px-10 py-4 rounded-full hover:bg-[#c8a050] hover:text-black transition">
              Discover Experience
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center relative">
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#c8a050]/5 to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <p className="uppercase tracking-[0.3em] text-[#c8a050] text-sm mb-6">
            Refresh Your Evening
          </p>

          <h2 className="text-5xl md:text-7xl font-light leading-tight mb-10">
            Taste The
            <span className="italic text-[#c8a050]">
              {" "}Freshness
            </span>
          </h2>

          <button className="bg-[#c8a050] text-black px-12 py-4 rounded-full text-lg hover:scale-105 transition">
            Book Lounge
          </button>
        </motion.div>
      </section>
    </div>
  );
}
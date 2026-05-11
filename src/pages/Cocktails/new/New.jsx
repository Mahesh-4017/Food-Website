import React from "react";
import { motion } from "framer-motion";

const cocktails = [
  {
    name: "Golden Velvet",
    type: "Signature Cocktail",
    price: "$24",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Midnight Smoke",
    type: "Whiskey Blend",
    price: "$28",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Rose Paradise",
    type: "Luxury Rosé",
    price: "$22",
    image:
      "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Ocean Breeze",
    type: "Tropical Fusion",
    price: "$26",
    image:
      "https://images.unsplash.com/photo-1560508179-b2c9a2f8f8d6?q=80&w=1974&auto=format&fit=crop",
  },
];

const New = () => {
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      
      {/* HERO */}
      <section className="relative h-[95vh] flex items-center justify-center px-6">
        
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2070&auto=format&fit=crop')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />

        {/* Floating Blur */}
        <div className="absolute top-32 left-20 w-72 h-72 bg-[#c8a050]/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#c8a050]/10 blur-[140px] rounded-full" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-5xl"
        >
          <p className="uppercase tracking-[0.4em] text-[#c8a050] text-sm mb-6">
            LUMINE Cocktail Experience
          </p>

          <h1 className="text-5xl md:text-8xl font-light leading-tight mb-8">
            Crafted
            <span className="italic text-[#c8a050]"> Cocktails</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Explore handcrafted luxury cocktails designed with premium spirits,
            rare ingredients, and unforgettable presentation.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <button className="px-10 py-4 bg-[#c8a050] text-black rounded-full hover:scale-105 transition">
              Explore Drinks
            </button>

            <button className="px-10 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition">
              Reserve Lounge
            </button>
          </div>
        </motion.div>
      </section>

      {/* FEATURED COCKTAILS */}
      <section className="py-28 px-6 md:px-20">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-4 mb-16">
            <div className="w-16 h-[1px] bg-[#c8a050]" />

            <p className="uppercase tracking-[0.3em] text-[#c8a050] text-sm">
              Signature Collection
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {cocktails.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[40px] h-[500px]"
              >
                
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 p-10 w-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="uppercase tracking-[0.2em] text-[#c8a050] text-sm mb-2">
                        {item.type}
                      </p>

                      <h2 className="text-4xl font-light">
                        {item.name}
                      </h2>
                    </div>

                    <span className="text-[#c8a050] text-4xl group-hover:rotate-45 transition duration-300">
                      +
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <p className="text-2xl font-light">
                      {item.price}
                    </p>

                    <button className="border border-[#c8a050] px-5 py-2 rounded-full hover:bg-[#c8a050] hover:text-black transition">
                      Order
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="py-28 px-6 md:px-20 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="uppercase tracking-[0.3em] text-[#c8a050] text-sm mb-5">
              Mixology Art
            </p>

            <h2 className="text-5xl md:text-6xl font-light leading-tight mb-8">
              Beyond
              <span className="italic text-[#c8a050]"> Ordinary</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Our mixologists combine flavor, aroma, smoke, fire, and luxury
              presentation to create unforgettable cocktail experiences.
            </p>

            <button className="border border-[#c8a050] px-8 py-3 rounded-full hover:bg-[#c8a050] hover:text-black transition">
              Meet Mixologists
            </button>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2070&auto=format&fit=crop"
              alt="Cocktail"
              className="rounded-[40px] h-[650px] w-full object-cover"
            />

            <div className="absolute -bottom-8 -left-8 bg-[#c8a050] text-black p-8 rounded-[30px]">
              <p className="text-5xl font-light">40+</p>

              <p className="uppercase tracking-[0.2em] text-sm mt-2">
                Signature Drinks
              </p>
            </div>
          </motion.div>
        </div>
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
            Reserve Your Night
          </p>

          <h2 className="text-5xl md:text-7xl font-light leading-tight mb-10">
            Sip The
            <span className="italic text-[#c8a050]"> Luxury</span>
          </h2>

          <button className="bg-[#c8a050] text-black px-12 py-4 rounded-full text-lg hover:scale-105 transition">
            Book Cocktail Lounge
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default New;
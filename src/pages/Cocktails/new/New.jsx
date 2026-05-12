import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Martini,
  Wine,
} from "lucide-react";

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
      "https://c4.wallpaperflare.com/wallpaper/151/778/448/cocktails-4k-full-hd-wallpaper-preview.jpg",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const New = () => {
  return (
    <div className="overflow-hidden bg-[#050505] text-white">
      {/* ================= HERO ================= */}

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 sm:px-8 lg:px-14">
        {/* BG IMAGE */}
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2070&auto=format&fit=crop')",
            }}
          />
        </motion.div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/70" />

        {/* GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#050505]" />

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* GLOW */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8a050]/20 blur-[140px]" />

        {/* FLOATING ICONS */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="absolute left-[8%] top-[20%] hidden rounded-full border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:flex"
        >
          <Martini className="text-[#c8a050]" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute right-[8%] bottom-[20%] hidden rounded-full border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:flex"
        >
          <Wine className="text-[#c8a050]" />
        </motion.div>

        {/* CONTENT */}
        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#c8a050]/20 bg-white/5 px-5 py-2 backdrop-blur-xl">
              <Sparkles
                size={15}
                className="text-[#c8a050]"
              />

              <span className="text-[10px] uppercase tracking-[0.35em] text-[#c8a050] sm:text-xs">
                Luxury Cocktail Experience
              </span>
            </div>

            <h1 className="mx-auto flex items-center justify-center gap-2 max-w-5xl text-[2.8rem] font-bold leading-none sm:text-[5rem] md:text-[7rem] lg:text-[12rem]">
              Crafted
              <span className="italic text-[#c8a050]">
                Cocktails
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl px-2 text-base leading-8 text-gray-300 sm:text-lg md:text-xl">
              Discover handcrafted signature cocktails infused with
              luxury spirits, rare ingredients, and cinematic
              presentation.
            </p>

            {/* BUTTONS */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#c8a050] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-black sm:w-auto"
              >
                Explore Drinks

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="w-full rounded-full border border-white/15 bg-white/[0.03] px-10 py-4 text-sm uppercase tracking-[0.2em] text-white backdrop-blur-xl transition hover:bg-white hover:text-black sm:w-auto"
              >
                Reserve Lounge
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* SCROLL */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center md:flex"
        >
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gray-400">
            Scroll
          </p>

          <div className="flex h-14 w-8 justify-center rounded-full border border-white/20">
            <motion.div
              animate={{
                y: [0, 18, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="mt-2 h-2 w-2 rounded-full bg-[#c8a050]"
            />
          </div>
        </motion.div>
      </section>

      {/* ================= COCKTAIL GRID ================= */}

      <section className="relative px-5 py-24 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-7xl">
          {/* TOP */}
          <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-5 flex items-center gap-4">
                <div className="h-px w-16 bg-[#c8a050]" />

                <p className="text-xs uppercase tracking-[0.35em] text-[#c8a050]">
                  Signature Collection
                </p>
              </div>

              <h2 className="text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
                Featured
                <span className="italic text-[#c8a050]">
                  {" "}
                  Cocktails
                </span>
              </h2>
            </div>

            <p className="max-w-md text-base leading-8 text-gray-400">
              Every cocktail is designed as an immersive visual and
              flavor experience.
            </p>
          </div>

          {/* GRID */}
          <div className="grid gap-7 md:grid-cols-2">
            {cocktails.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.08,
                }}
                className={`group relative overflow-hidden rounded-[35px] border border-white/10 ${
                  i === 0 || i === 3
                    ? "md:h-[620px]"
                    : "md:h-[520px]"
                } h-[450px]`}
              >
                {/* IMAGE */}
                <motion.img
                  whileHover={{
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 0.9,
                  }}
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
                  {/* TOP */}
                  <div className="flex items-start justify-between">
                    <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-xl">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-[#c8a050] sm:text-xs">
                        {item.type}
                      </p>
                    </div>

                    <motion.div
                      whileHover={{
                        rotate: 45,
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/30 backdrop-blur-xl"
                    >
                      <ArrowUpRight />
                    </motion.div>
                  </div>

                  {/* BOTTOM */}
                  <div>
                    <h3 className="text-3xl font-light sm:text-5xl">
                      {item.name}
                    </h3>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <p className="text-2xl text-[#c8a050] sm:text-3xl">
                        {item.price}
                      </p>

                      <motion.button
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        className="rounded-full border border-[#c8a050]/40 bg-black/30 px-5 py-3 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-xl transition hover:bg-[#c8a050] hover:text-black sm:px-7"
                      >
                        Order Now
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}

      <section className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-14">
        {/* BG */}
        <div className="absolute inset-0 bg-[#080808]" />

        {/* GLOW */}
        <div className="absolute left-0 top-0 h-[400px] w-[400px] bg-[#c8a050]/10 blur-[120px]" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="overflow-hidden rounded-[40px] border border-white/10">
              <motion.img
                whileHover={{
                  scale: 1.06,
                }}
                transition={{
                  duration: 1,
                }}
                src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2070&auto=format&fit=crop"
                alt=""
                className="h-[500px] w-full object-cover sm:h-[650px]"
              />
            </div>

            {/* FLOAT CARD */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute -bottom-5 right-5 rounded-[30px] border border-white/10 bg-black/40 p-6 backdrop-blur-2xl sm:-bottom-10 sm:right-10 sm:p-10"
            >
              <p className="text-4xl font-light text-[#c8a050] sm:text-6xl">
                40+
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-gray-300 sm:text-xs">
                Signature Drinks
              </p>
            </motion.div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="mb-5 flex items-center gap-4">
              <div className="h-px w-16 bg-[#c8a050]" />

              <p className="text-xs uppercase tracking-[0.35em] text-[#c8a050]">
                Mixology Art
              </p>
            </div>

            <h2 className="text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
              Beyond
              <span className="italic text-[#c8a050]">
                {" "}
                Ordinary
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-9 text-gray-400">
              Our mixologists combine smoke, aroma, fire, luxury
              presentation, and handcrafted techniques to create
              unforgettable cocktail experiences.
            </p>

            {/* STATS */}
            <div className="mt-12 grid grid-cols-2 gap-5">
              {[
                ["40+", "Signature Drinks"],
                ["12", "Master Mixologists"],
                ["4.9★", "Guest Reviews"],
                ["24/7", "Luxury Lounge"],
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
                >
                  <p className="text-3xl text-[#c8a050]">
                    {item[0]}
                  </p>

                  <p className="mt-2 text-sm text-gray-400">
                    {item[1]}
                  </p>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="mt-12 rounded-full border border-[#c8a050]/30 bg-[#c8a050] px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-black"
            >
              Meet Mixologists
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="relative overflow-hidden px-5 py-32 text-center sm:px-8">
        {/* BG GLOW */}
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8a050]/10 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-5xl"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#c8a050]">
            Reserve Your Night
          </p>

          <h2 className="text-5xl font-light leading-tight sm:text-6xl md:text-8xl">
            Sip The
            <span className="block italic text-[#c8a050]">
              Luxury
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-400">
            Reserve your private cocktail lounge experience and enjoy
            cinematic luxury crafted for unforgettable nights.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <motion.button
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="group flex items-center gap-2 rounded-full bg-[#c8a050] px-10 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-black"
            >
              Book Cocktail Lounge

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="rounded-full border border-white/10 bg-white/[0.03] px-10 py-5 text-sm uppercase tracking-[0.25em] text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
            >
              Explore Menu
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default New;
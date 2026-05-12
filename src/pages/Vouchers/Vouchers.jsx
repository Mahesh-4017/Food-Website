"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const vouchers = [
  {
    id: 1,
    title: "Luxury Dinner",
    amount: "$120",
    desc: "An elegant multi-course fine dining experience.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    color: "from-[#c8a050] to-[#8a6427]",
  },
  {
    id: 2,
    title: "Cocktail Night",
    amount: "$80",
    desc: "Signature cocktails & premium lounge access.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop",
    color: "from-[#ff9966] to-[#ff5e62]",
  },
  {
    id: 3,
    title: "Wine Experience",
    amount: "$150",
    desc: "Curated wine pairing with sommelier selections.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop",
    color: "from-[#9b5de5] to-[#5f0f99]",
  },
  {
    id: 4,
    title: "Private Lounge",
    amount: "$250",
    desc: "Exclusive luxury lounge reservation for VIP guests.",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2070&auto=format&fit=crop",
    color: "from-[#00c6ff] to-[#0072ff]",
  },
];

const perks = [
  "Instant Digital Delivery",
  "Luxury Dining Access",
  "VIP Lounge Reservations",
  "Perfect Premium Gift",
];

export default function Vouchers() {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-[#050505] text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-20">

        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={vouchers[active].image}
            className="w-full h-full object-cover opacity-20 scale-110"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40" />

        {/* Animated Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute top-20 left-10 w-[350px] h-[350px] rounded-full bg-[#c8a050]/20 blur-[160px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-orange-500/10 blur-[160px]"
        />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center w-full">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >

            <p className="uppercase tracking-[0.5em] text-[#c8a050] text-xs md:text-sm mb-6">
              Luxury Gift Experience
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[110px] font-light leading-none">
              Gift
              <span className="block italic text-[#c8a050]">
                Vouchers
              </span>
            </h1>

            <p className="mt-8 text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
              Share unforgettable fine dining, handcrafted cocktails,
              exclusive wine experiences, and luxury evenings with
              beautifully curated premium vouchers.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-[#c8a050] text-black px-10 py-4 rounded-full hover:scale-105 transition duration-300">
                Buy Voucher
              </button>

              <button className="border border-white/10 bg-white/[0.03] backdrop-blur-xl px-10 py-4 rounded-full hover:bg-white hover:text-black transition duration-300">
                Explore Packages
              </button>
            </div>

            {/* Features */}
            <div className="mt-16 grid sm:grid-cols-2 gap-5">
              {perks.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-3 h-3 rounded-full bg-[#c8a050]" />

                  <p className="text-gray-300">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT STACKED CARDS */}
          <div className="relative h-[720px] hidden lg:flex items-center justify-center">

            <AnimatePresence mode="wait">

              <motion.div
                key={active}
                initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="relative w-[520px] h-[650px]"
              >

                {/* Glass Card */}
                <div className="absolute inset-0 rounded-[45px] overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-2xl">

                  {/* Background */}
                  <img
                    src={vouchers[active].image}
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                  />

                  <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/90" />

                  {/* Large Amount */}
                  <div className="absolute top-8 right-8">
                    <h1 className="text-[120px] font-light text-white/10 leading-none">
                      {vouchers[active].amount}
                    </h1>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 p-10">

                    <p className="uppercase tracking-[0.3em] text-[#c8a050] text-xs mb-4">
                      Exclusive Experience
                    </p>

                    <h2 className="text-5xl font-light mb-5">
                      {vouchers[active].title}
                    </h2>

                    <p className="text-gray-300 leading-relaxed mb-8 max-w-md">
                      {vouchers[active].desc}
                    </p>

                    <button className="border border-white/15 bg-white/[0.05] backdrop-blur-xl px-8 py-3 rounded-full hover:bg-[#c8a050] hover:text-black transition duration-300">
                      Purchase Now
                    </button>
                  </div>

                  {/* Decorative */}
                  <div
                    className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${vouchers[active].color}`}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating Small Cards */}
            <div className="absolute -left-10 top-20 space-y-5">
              {vouchers.map((item, i) => (
                <motion.div
                  key={item.id}
                  whileHover={{ x: 10 }}
                  onClick={() => setActive(i)}
                  className={`cursor-pointer w-[180px] rounded-[25px] overflow-hidden border transition-all duration-300 ${
                    active === i
                      ? "border-[#c8a050]"
                      : "border-white/10"
                  }`}
                >
                  <div className="h-[120px] relative">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute bottom-0 p-4">
                      <h3 className="text-lg font-light">
                        {item.title}
                      </h3>

                      <p className="text-[#c8a050] text-sm">
                        {item.amount}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= COLLECTION ================= */}
      <section className="py-32 px-6 md:px-10 lg:px-20">

        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-4 mb-20">
            <div className="w-20 h-[1px] bg-[#c8a050]" />

            <p className="uppercase tracking-[0.3em] text-[#c8a050] text-sm">
              Curated Collections
            </p>
          </div>

          {/* Bento Layout */}
          <div className="grid lg:grid-cols-4 gap-6 auto-rows-[280px]">

            {vouchers.map((item, i) => (
              <motion.div
                key={item.id}
                whileHover={{
                  y: -10,
                }}
                className={`relative overflow-hidden rounded-[35px] group ${
                  i === 0
                    ? "lg:col-span-2 lg:row-span-2"
                    : ""
                }`}
              >

                <img
                  src={item.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-0 p-8">

                  <p className="uppercase tracking-[0.25em] text-[#c8a050] text-xs mb-3">
                    Premium Voucher
                  </p>

                  <h2 className="text-3xl md:text-5xl font-light mb-3">
                    {item.title}
                  </h2>

                  <div className="flex items-center justify-between">
                    <p className="text-xl text-gray-300">
                      {item.amount}
                    </p>

                    <button className="border border-white/15 bg-white/[0.05] px-5 py-2 rounded-full hover:bg-[#c8a050] hover:text-black transition duration-300">
                      View
                    </button>
                  </div>
                </div>

                {/* Number */}
                <h1 className="absolute top-6 right-6 text-7xl font-light text-white/10">
                  0{i + 1}
                </h1>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section className="py-32 px-6 md:px-10 lg:px-20 bg-[#080808]">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >

            <p className="uppercase tracking-[0.4em] text-[#c8a050] text-sm mb-6">
              Premium Benefits
            </p>

            <h2 className="text-5xl md:text-7xl font-light leading-tight mb-10">
              Luxury
              <span className="italic text-[#c8a050]">
                {" "}Gift Moments
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Surprise someone with unforgettable fine dining, luxury cocktails,
              wine tasting, and elegant lounge experiences.
            </p>

            <div className="space-y-5">
              {[
                "Instant Email Delivery",
                "VIP Dining Access",
                "Luxury Event Invitations",
                "Exclusive Seasonal Experiences",
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
              Explore Benefits
            </button>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2070&auto=format&fit=crop"
              className="rounded-[45px] h-[720px] w-full object-cover"
            />

            <div className="absolute -bottom-10 -left-10 bg-[#c8a050] text-black p-8 rounded-[35px]">
              <h1 className="text-5xl font-light">VIP</h1>

              <p className="uppercase tracking-[0.2em] text-xs mt-3">
                Exclusive Access
              </p>
            </div>
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
            Share Luxury
          </p>

          <h2 className="text-5xl md:text-7xl font-light leading-tight mb-10">
            Gift An
            <span className="italic text-[#c8a050]">
              {" "}Experience
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Elegant vouchers designed for unforgettable dining,
            luxury evenings, and premium celebrations.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-[#c8a050] text-black px-10 py-4 rounded-full hover:scale-105 transition duration-300">
              Buy Voucher
            </button>

            <button className="border border-white/10 bg-white/[0.03] px-10 py-4 rounded-full hover:bg-white hover:text-black transition duration-300">
              Contact Team
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
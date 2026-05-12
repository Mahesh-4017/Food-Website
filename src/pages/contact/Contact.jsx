"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const contactCards = [
  {
    title: "Reservations",
    desc: "Book luxury dining and exclusive lounge experiences.",
    value: "+33 1 23 45 67 89",
  },
  {
    title: "Email Address",
    desc: "Reach our concierge and hospitality team directly.",
    value: "hello@lumine.com",
  },
  {
    title: "Location",
    desc: "Visit our signature fine dining destination.",
    value: "12 Rue Lumière, Paris",
  },
];

const socials = [
  "Instagram",
  "Facebook",
  "Pinterest",
  "TikTok",
];

const Contact = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="bg-[#050505] text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center px-6 md:px-10 lg:px-20 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-20 scale-105"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40" />

        {/* Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute top-10 left-10 w-[320px] h-[320px] rounded-full bg-[#c8a050]/20 blur-[150px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="absolute bottom-0 right-0 w-[280px] h-[280px] rounded-full bg-orange-500/10 blur-[150px]"
        />

        {/* Vertical Text */}
        <div className="hidden xl:flex absolute right-10 top-0 h-full items-center">
          <h1
            className="text-[130px] font-light text-white/[0.04] tracking-[0.3em]"
            style={{
              writingMode: "vertical-rl",
            }}
          >
            CONTACT
          </h1>
        </div>

        {/* MAIN */}
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center w-full">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >

            <p className="uppercase tracking-[0.5em] text-[#c8a050] text-xs md:text-sm mb-6">
              Get In Touch
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[110px] font-light leading-none">
              Let’s
              <span className="block italic text-[#c8a050]">
                Connect
              </span>
            </h1>

            <p className="mt-8 text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
              Whether you're reserving a table, planning a private event,
              or exploring luxury experiences — our team is ready to assist you.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-[#c8a050] text-black px-10 py-4 rounded-full hover:scale-105 transition duration-300">
                Book Experience
              </button>

              <button className="border border-white/10 bg-white/[0.03] backdrop-blur-xl px-10 py-4 rounded-full hover:bg-white hover:text-black transition duration-300">
                Call Concierge
              </button>
            </div>

            {/* CONTACT INFO */}
            <div className="mt-16 grid sm:grid-cols-2 gap-6">

              {contactCards.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -8,
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7"
                >

                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-[#c8a050]/10 to-transparent transition duration-500 ${
                      hovered === i ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <div className="relative z-10">

                    <p className="uppercase tracking-[0.3em] text-[#c8a050] text-xs mb-4">
                      {item.title}
                    </p>

                    <h3 className="text-2xl font-light mb-4">
                      {item.value}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >

            {/* MAIN GLASS CARD */}
            <div className="relative overflow-hidden rounded-[45px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 md:p-10">

              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
                  className="w-full h-full object-cover opacity-20"
                />
              </div>

              <div className="absolute inset-0 bg-black/40" />

              {/* FORM */}
              <div className="relative z-10">

                <p className="uppercase tracking-[0.3em] text-[#c8a050] text-xs mb-6">
                  Send Message
                </p>

                <h2 className="text-4xl md:text-5xl font-light mb-10">
                  Contact
                  <span className="italic text-[#c8a050]">
                    {" "}Concierge
                  </span>
                </h2>

                <form className="space-y-6">

                  <div className="grid md:grid-cols-2 gap-6">

                    <input
                      type="text"
                      placeholder="Your Name"
                      className="bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 outline-none focus:border-[#c8a050] transition"
                    />

                    <input
                      type="email"
                      placeholder="Email Address"
                      className="bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 outline-none focus:border-[#c8a050] transition"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 outline-none focus:border-[#c8a050] transition"
                  />

                  <textarea
                    rows="6"
                    placeholder="Write your message..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-[30px] px-6 py-5 outline-none focus:border-[#c8a050] transition resize-none"
                  />

                  <button
                    type="submit"
                    className="bg-[#c8a050] text-black px-10 py-4 rounded-full hover:scale-105 transition duration-300"
                  >
                    Send Message
                  </button>
                </form>

                {/* SOCIALS */}
                <div className="mt-14 flex flex-wrap gap-4">

                  {socials.map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{
                        y: -5,
                      }}
                      className="border border-white/10 bg-white/[0.03] px-6 py-3 rounded-full cursor-pointer hover:border-[#c8a050] transition"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* FLOATING CARD */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute -bottom-10 -left-10 bg-[#c8a050] text-black p-8 rounded-[35px] hidden md:block"
            >

              <h1 className="text-5xl font-light">
                24/7
              </h1>

              <p className="uppercase tracking-[0.2em] text-xs mt-3">
                Concierge Support
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= SECOND SECTION ================= */}
      <section className="py-32 px-6 md:px-10 lg:px-20 bg-[#080808]">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

          {[
            {
              number: "01",
              title: "Private Events",
              desc: "Luxury celebrations, private dining, and VIP experiences.",
            },
            {
              number: "02",
              title: "Reservations",
              desc: "Book exclusive tables and curated fine dining evenings.",
            },
            {
              number: "03",
              title: "Collaborations",
              desc: "Partner with our luxury brand for premium experiences.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="relative overflow-hidden rounded-[35px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10"
            >

              <h1 className="absolute top-6 right-6 text-7xl font-light text-white/5">
                {item.number}
              </h1>

              <p className="uppercase tracking-[0.3em] text-[#c8a050] text-xs mb-6">
                Premium Service
              </p>

              <h2 className="text-4xl font-light mb-6">
                {item.title}
              </h2>

              <p className="text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
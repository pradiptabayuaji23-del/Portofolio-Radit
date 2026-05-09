"use client";

import React from "react";
// PENTING: Import 'Variants' untuk menghindari error TypeScript
import { motion, Variants } from "framer-motion";

// Daftar Teknologi & URL Icon
const TECH_TAGS = [
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Bootstrap", icon: "https://cdn.simpleicons.org/bootstrap/7952B3" },
  { name: "PHP", icon: "https://cdn.simpleicons.org/php/777BB4" },
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/000000" },
  { name: "Cloudflare", icon: "https://cdn.simpleicons.org/cloudflare/F38020" },
];

// FIX: Tambahkan tipe ': Variants' di sini
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// FIX: Tambahkan tipe ': Variants' di sini juga
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  },
};

export default function TechStack() {
  return (
    <section className="py-10 px-6">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-3">
            Tech Ecosystem
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-sm md:text-base">
            Tools dan teknologi yang saya gunakan untuk membangun solusi digital.
          </p>
        </motion.div>

        {/* Tags Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-3"
        >
          {TECH_TAGS.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-default group"
            >
              {/* Icon Image */}
              <div className="w-4 h-4 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              
              {/* Text Name */}
              <span className="text-xs md:text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
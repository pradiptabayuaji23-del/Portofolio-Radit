"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link"; 

const PROFILE_IMAGE_URL = "/logo/profile.jpg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const footerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.footer
      id="footer"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative bg-neutral-950 text-neutral-300 py-16 md:py-20 px-6 overflow-hidden"
    >
      {/* Background blobs */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div
        animate={{ scale: [1, 0.95, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 md:gap-8">
        {/* --- Column 1 --- */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-400/50 shadow-lg">
              <img src={PROFILE_IMAGE_URL} alt="Radit Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/30 to-transparent" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">Radit</p>
              <p className="text-sm text-neutral-400">Full Stack Developer</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Crafting beautiful and functional web experiences. Let's build something amazing together.
          </p>
        </motion.div>

        {/* --- Column 2 --- */}
        <motion.div variants={itemVariants}>
          <h4 className="text-lg font-semibold text-white mb-5">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link href="#about" className="hover:text-white transition-colors flex items-center group">
                About <ArrowUpRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-x-0.5 transition-all" />
              </Link>
            </li>
            <li>
              <Link href="#experience" className="hover:text-white transition-colors flex items-center group">
                Experience <ArrowUpRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-x-0.5 transition-all" />
              </Link>
            </li>
            <li>
              <Link href="#projects" className="hover:text-white transition-colors flex items-center group">
                Projects <ArrowUpRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-x-0.5 transition-all" />
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-white transition-colors flex items-center group">
                Contact <ArrowUpRight size={16} className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 -translate-x-0.5 transition-all" />
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* --- Column 3 --- */}
        <motion.div variants={itemVariants}>
          <h4 className="text-lg font-semibold text-white mb-5">Connect</h4>
          <ul className="space-y-3">
            <li>
              <Link href="#" className="flex items-center gap-3 hover:text-white transition-colors">
                <Github size={20} /> GitHub
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 hover:text-white transition-colors">
                <Linkedin size={20} /> LinkedIn
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-3 hover:text-white transition-colors">
                <Twitter size={20} /> Twitter
              </Link>
            </li>
            <li>
              <Link href="mailto:email@example.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail size={20} /> Email
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* --- Column 4 --- */}
        <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-1">
          <h4 className="text-lg font-semibold text-white mb-5">Stay Updated</h4>
          <p className="text-sm text-neutral-400 mb-4">
            Subscribe to my newsletter for the latest updates.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2.5 rounded-full bg-neutral-800 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500"
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-full transition-colors text-sm flex-shrink-0">
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="max-w-7xl mx-auto border-t border-neutral-800 mt-16 md:mt-20 pt-8 text-center">
        <p className="text-sm text-neutral-500">
          © {currentYear} Radit. All rights reserved.
        </p>
      </motion.div>
    </motion.footer>
  );
}
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Loader2, CheckCircle2, ArrowRight, Mail, MapPin } from "lucide-react";

const PROFILE_IMAGE_URL = "/logo/profile.jpg"; // Updated image path

// --- ANIMATION VARIANTS (Fixed Types) ---
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const formStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setFormStatus("success");
    setTimeout(() => setFormStatus("idle"), 3000);
  };

  return (
    <div className="flex items-center justify-center bg-transparent relative overflow-hidden py-10 px-4"> 
      
      {/* --- UNIFIED CARD CONTAINER --- */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        // Added shadow-2xl and shadow-black/20 for stronger shadow
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden flex flex-col md:flex-row min-h-[550px]"
      >
        
        {/* --- KOLOM KIRI: IMAGE SIDEBAR --- */}
        <div className="relative w-full md:w-[40%] bg-neutral-900 text-white p-8 flex flex-col justify-between overflow-hidden">
            
            {/* Background Image */}
            <div className="absolute inset-0 opacity-60">
                <motion.img 
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  src={PROFILE_IMAGE_URL}
                  alt="Background" 
                  className="w-full h-full object-cover grayscale mix-blend-overlay opacity-50" 
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/80 to-neutral-900/90" />
            
            {/* Content */}
            <div className="relative z-10">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="h-16 w-16 rounded-full border-2 border-white/20 overflow-hidden mb-6 shadow-lg shadow-black/30" // Added shadow to profile image
                >
                    <img src={PROFILE_IMAGE_URL} alt="Profile" className="w-full h-full object-cover" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h3 className="text-3xl font-bold tracking-tight">Let's build something great.</h3>
                  <p className="text-neutral-400 mt-2 text-sm leading-relaxed">
                      I'm currently available for freelance projects. If you have an idea, let's discuss it.
                  </p>
                </motion.div>
            </div>

            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="relative z-10 space-y-4 mt-8 md:mt-0"
            >
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm shadow-sm"> {/* Added shadow */}
                        <Mail size={16} />
                    </div>
                    <span>raditbayuaji23@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                    <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm shadow-sm"> {/* Added shadow */}
                        <MapPin size={16} />
                    </div>
                    <span>Jakarta, Indonesia</span>
                </div>
            </motion.div>

            {/* Decorative Circle */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" 
            />
        </div>

        {/* --- KOLOM KANAN: FORM AREA --- */}
        <div className="w-full md:w-[60%] p-8 md:p-12 bg-white flex flex-col justify-center relative z-20"> {/* Added z-20 */}
            
            <motion.div 
              variants={formStaggerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="mb-8">
                  <h2 className="text-2xl font-bold text-neutral-900">Send me a message</h2>
                  <p className="text-neutral-500 text-sm mt-1">I usually respond within 24 hours.</p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased spacing */}
                  <div className="grid grid-cols-2 gap-6"> {/* Increased gap */}
                      <motion.div variants={itemVariants}>
                        <ModernInput id="name" label="Name" type="text" />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <ModernInput id="email" label="Email" type="email" />
                      </motion.div>
                  </div>
                  
                  <motion.div variants={itemVariants}>
                    <ModernInput id="subject" label="Subject" type="text" />
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative mt-2">
                      <textarea 
                          id="message" 
                          required 
                          rows={3} 
                          className="peer w-full border-b border-neutral-300 bg-transparent py-3 text-neutral-900 placeholder-transparent focus:border-neutral-900 focus:outline-none transition-colors resize-none text-sm leading-relaxed" 
                          placeholder="Message" 
                      />
                      <label 
                          htmlFor="message" 
                          className="absolute left-0 -top-3.5 text-xs text-neutral-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-neutral-900"
                      >
                          Tell me about your project
                      </label>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-4"> {/* Increased top padding */}
                      <button 
                          type="submit" 
                          disabled={formStatus === 'submitting' || formStatus === 'success'}
                          // Added shadow-lg and shadow-neutral-900/20 to button
                          className="group relative flex items-center justify-center gap-3 px-8 py-3 bg-neutral-900 text-white rounded-full font-medium text-sm hover:bg-neutral-800 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto shadow-lg shadow-neutral-900/20 hover:shadow-xl hover:shadow-neutral-900/30"
                      >
                          <AnimatePresence mode="wait">
                              {formStatus === 'submitting' ? (
                                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                      <Loader2 className="animate-spin" size={16} /> Sending
                                  </motion.div>
                              ) : formStatus === 'success' ? (
                                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                      <CheckCircle2 size={16} className="text-green-400" /> Sent!
                                  </motion.div>
                              ) : (
                                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                                      Send Message <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                  </motion.div>
                              )}
                          </AnimatePresence>
                      </button>
                  </motion.div>
              </form>
            </motion.div>
        </div>

      </motion.div>
    </div>
  );
}

function ModernInput({ id, label, type }: { id: string, label: string, type: string }) {
  return (
    <div className="relative">
      <input 
        type={type} 
        id={id} 
        required 
        placeholder={label} 
        className="peer w-full border-b border-neutral-300 bg-transparent py-3 text-neutral-900 placeholder-transparent focus:border-neutral-900 focus:outline-none transition-colors text-sm" 
      />
      <label 
        htmlFor={id} 
        className="absolute left-0 -top-3.5 text-xs text-neutral-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-neutral-900"
      >
        {label}
      </label>
    </div>
  );
}
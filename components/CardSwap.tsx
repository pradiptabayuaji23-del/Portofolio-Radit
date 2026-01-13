"use client";

import { useState, useEffect, Children, ReactNode } from "react";
import { motion } from "framer-motion";

// Wrapper Card: Overflow hidden penting agar konten tidak bocor saat rounded
export function Card({ children, customClass }: { children: ReactNode; customClass?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${customClass || ""}`}>
      {children}
    </div>
  );
}

export default function CardSwap({ children, delay = 3500 }: { children: ReactNode; delay?: number }) {
  const cards = Children.toArray(children);
  const [frontIndex, setFrontIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrontIndex((prev) => (prev + 1) % cards.length);
    }, delay);
    return () => clearInterval(interval);
  }, [cards.length, delay]);

  return (
    <div className="relative w-[300px] h-[380px] perspective-1000">
      {cards.map((child, index) => {
        // Hitung offset: 0 (Depan), 1 (Tengah), 2 (Belakang)
        const offset = (index - frontIndex + cards.length) % cards.length;
        
        // Apakah ini kartu yang sedang dibuang ke belakang?
        const isSwapping = offset === cards.length - 1;

        // --- KONFIGURASI VISUAL ---
        const xDist = 20; // Jarak geser kanan (stacking)
        const yDist = 20; // Jarak turun (stacking)
        const scaleDist = 0.05; // Pengecilan per kartu

        return (
          <motion.div
            key={index}
            layout
            animate={{
              // LOGIKA POSISI (X, Y)
              // Jika Swapping: Gerak melengkung (Posisi 0 -> Kanan Atas -> Posisi Belakang)
              // Jika Diam: Geser ke posisi offset-nya
              x: isSwapping ? [0, 180, offset * xDist] : offset * xDist,
              y: isSwapping 
                 ? [0, -60, offset * yDist] // Naik dulu (-60) biar kayak dilempar (Arc)
                 : offset * yDist,
              
              // LOGIKA SKALA & ROTASI
              scale: isSwapping ? [1, 1.1, 1 - offset * scaleDist] : 1 - offset * scaleDist,
              rotate: isSwapping ? [0, 15, 0] : 0, // Miring saat terbang
              
              // LOGIKA TUMPUKAN (Z-INDEX)
              // Tahan zIndex tinggi (4) sampai animasi lemparan selesai setengah jalan, baru turun ke 0
              zIndex: isSwapping ? [4, 4, 0] : 4 - offset,
              
              // LOGIKA OPACITY/BAYANGAN
              // Kartu belakang agak gelap/transparan dikit biar fokus ke depan (opsional, set 1 kalau mau solid)
              opacity: 1, 
            }}
            transition={{
              // KUNCI KEHALUSAN (SMOOTHNESS)
              duration: 0.7, // Sedikit diperlambat biar 'feel' beratnya dapat
              ease: [0.32, 0.72, 0, 1], // Custom Bezier Curve (Cepat di awal, lembut di akhir)
              
              // Timing spesifik untuk properti tertentu
              x: isSwapping ? { times: [0, 0.6, 1], duration: 0.7, ease: "easeInOut" } : { type: "spring", stiffness: 300, damping: 30 },
              y: isSwapping ? { times: [0, 0.5, 1], duration: 0.7 } : { type: "spring", stiffness: 300, damping: 30 },
              zIndex: { times: [0, 0.5, 1] } // Z-Index berubah tepat di tengah jalan
            }}
            // Style dasar kartu
            className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl origin-top-left will-change-transform bg-[#1e1e1e]"
            style={{
              // Tambahkan shadow statis agar tumpukan terlihat nyata
              boxShadow: offset === 0 
                ? "0 20px 50px -12px rgba(0, 0, 0, 0.5)" // Shadow besar untuk kartu depan
                : "0 10px 15px -3px rgba(0, 0, 0, 0.1)"  // Shadow kecil untuk kartu belakang
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}
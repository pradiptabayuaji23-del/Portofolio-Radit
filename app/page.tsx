"use client";

import { DATA } from "@/lib/data";
import CardSwap, { Card } from "@/components/CardSwap";
import FadeIn from "@/components/FadeIn";
import Navbar from "@/components/Navbar";
import { ArrowUpRight, Github, Linkedin, Mail, ExternalLink, User } from "lucide-react";
import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack"; 

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white overflow-x-hidden">
      {/* --- Navbar --- */}
      <Navbar />

      {/* KONTAINER UTAMA */}
      <div className="max-w-6xl mx-auto px-5 md:px-12 pt-24 md:pt-32 pb-12 md:pb-20 space-y-24 md:space-y-32">
        
        {/* --- 1. BERANDA / HERO SECTION --- */}
        <section
          id="home"
          className="scroll-mt-32 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center"
        >
          {/* KOLOM KIRI (TEKS) - Order 1 di Mobile */}
          <div className="space-y-6 flex flex-col justify-center order-1">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-4 md:mb-6 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Siap Bekerja
              </div>

              <div className="min-h-[80px] md:min-h-[140px] flex items-center">
                 <SplitText
                  text={`Halo, Saya ${DATA.name}.`}
                  className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-neutral-900 leading-tight"
                  delay={500}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-lg md:text-2xl text-neutral-600 leading-relaxed max-w-lg font-light">
                Pengembang Full Stack yang berfokus membangun pengalaman digital yang cepat, modern, dan mudah digunakan.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4} className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
              <a href="#contact" className="px-5 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-lg shadow-neutral-900/20 text-sm md:text-base">
                Hubungi Saya <ArrowUpRight size={18} />
              </a>
              <a href="#about" className="px-5 py-3 bg-white border border-neutral-200 text-neutral-900 rounded-full font-medium hover:bg-neutral-50 transition-all flex items-center gap-2 text-sm md:text-base">
                Tentang Saya <User size={18} />
              </a>
            </FadeIn>
            
            <FadeIn delay={0.5} className="flex gap-4 pt-2">
              <SocialLink icon={<Github size={20} />} href="https://github.com/pradiptabayuaji23-del" label="GitHub" />
              <SocialLink icon={<Linkedin size={20} />} href="https://www.linkedin.com/in/pradipta-bayuaji-9b7b62391" label="LinkedIn" />
              <SocialLink icon={<Mail size={20} />} href="mailto:raditbayuaji23@gmail.com" label="Email" />
            </FadeIn>
          </div>

          {/* KOLOM KANAN (VISUAL) - Order 2 di Mobile */}
          <div className="order-2 w-full flex justify-center items-center mt-6 md:mt-0 h-[300px] md:h-[420px]">
            <div className="relative w-full h-full flex items-center justify-center">
              <CardSwap delay={3500}>
                  <Card customClass="bg-[#1e1e1e] border border-neutral-700 rounded-xl overflow-hidden shadow-2xl w-full max-w-[320px] md:max-w-none">
                    <CodeHeader title="index.html" />
                    <div className="p-4 md:p-5 font-mono text-[10px] md:text-xs text-gray-300 leading-relaxed">
                      <div className="opacity-50 mb-2">&lt;!-- Struktur --&gt;</div>
                      <div><span className="text-blue-400">&lt;div</span> <span className="text-sky-300">class</span>=<span className="text-orange-300">"hero"</span><span className="text-blue-400">&gt;</span></div>
                      <div className="pl-4"><span className="text-blue-400">&lt;h1&gt;</span><span className="text-white">Halo Dunia</span><span className="text-blue-400">&lt;/h1&gt;</span></div>
                      <div><span className="text-blue-400">&lt;/div&gt;</span></div>
                    </div>
                  </Card>
                  <Card customClass="bg-[#1e1e1e] border border-neutral-700 rounded-xl overflow-hidden shadow-2xl w-full max-w-[320px] md:max-w-none">
                    <CodeHeader title="styles.css" />
                    <div className="p-4 md:p-5 font-mono text-[10px] md:text-xs text-gray-300 leading-relaxed">
                      <div className="opacity-50 mb-2">/* Gaya */</div>
                      <div><span className="text-yellow-300">.hero</span> <span className="text-yellow-500">&#123;</span></div>
                      <div className="pl-4"><span className="text-sky-300">display</span>: <span className="text-orange-300">grid</span>;</div>
                      <div><span className="text-yellow-500">&#125;</span></div>
                    </div>
                  </Card>
              </CardSwap>
            </div>
          </div>
        </section>

        {/* --- 2. BAGIAN TENTANG SAYA (DIPERBAIKI) --- */}
        <section id="about" className="scroll-mt-32 w-full">
           <FadeIn>
            {/* Grid layout: 1 kolom di Mobile, 2 kolom di Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                
                {/* KOLOM KIRI (TEKS) */}
                {/* Perbaikan: 'sticky' dihapus di mobile (default relative), hanya aktif di lg */}
                <div className="space-y-6 md:space-y-8 relative lg:sticky lg:top-32 order-1">
                    <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 leading-tight">
                        Membangun produk digital dengan fokus pada <span className="text-blue-600">pengalaman pengguna</span> dan kode yang bersih.
                    </h2>
                    
                    <div className="space-y-4 text-base md:text-lg text-neutral-600 leading-relaxed font-light">
                        <p>
                            Perjalanan saya di dunia teknologi dimulai dari rasa ingin tahu sederhana: "Bagaimana cara kerja website ini?". Rasa penasaran itu membawa saya menyelami baris demi baris kode, mengubah logika abstrak menjadi antarmuka visual yang hidup.
                        </p>
                        <p>
                            {DATA.about}
                        </p>
                        <p>
                            Di luar coding, saya percaya pada keseimbangan hidup. Anda mungkin menemukan saya sedang membaca buku tentang desain, menikmati kopi seduh manual, atau sekadar berjalan-jalan mencari inspirasi visual baru.
                        </p>
                    </div>

                    <div className="pt-2 md:pt-4">
                        <p className="font-serif italic text-xl md:text-2xl text-neutral-400">Pradipta Bayuaji.</p>
                    </div>
                </div>

                {/* KOLOM KANAN (KARTU STATISTIK) */}
                {/* Order 2 memastikan ini di bawah teks pada tampilan mobile */}
                <div className="relative order-2 mt-8 lg:mt-0 w-full">
                    {/* Background Blur */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl -z-10 opacity-60"></div>
                    
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {/* Kartu 1: Pengalaman */}
                        <motion.div 
                            whileHover={{ y: -5 }} 
                            className="p-5 md:p-6 bg-white border border-neutral-100 rounded-2xl shadow-xl shadow-neutral-100 flex flex-col justify-between aspect-square hover:border-blue-100 transition-colors"
                        >
                            {/* Ukuran font disesuaikan agar tidak pecah di HP */}
                            <span className="text-3xl md:text-4xl font-bold text-neutral-900">3+</span>
                            <span className="text-xs md:text-sm text-neutral-500 font-medium mt-2">Tahun Pengalaman</span>
                        </motion.div>

                        {/* Kartu 2: Proyek */}
                        <motion.div 
                            whileHover={{ y: -5 }} 
                            className="p-5 md:p-6 bg-neutral-900 text-white rounded-2xl shadow-xl shadow-neutral-400/20 flex flex-col justify-between aspect-square mt-6 md:mt-8"
                        >
                            <span className="text-3xl md:text-4xl font-bold">12+</span>
                            <span className="text-xs md:text-sm text-neutral-400 font-medium mt-2">Proyek Selesai</span>
                        </motion.div>

                        {/* Kartu 3: Kepuasan */}
                        <motion.div 
                            whileHover={{ y: -5 }} 
                            className="p-5 md:p-6 bg-white border border-neutral-100 rounded-2xl shadow-xl shadow-neutral-100 flex flex-col justify-between aspect-square hover:border-blue-100 transition-colors"
                        >
                            <span className="text-3xl md:text-4xl font-bold text-neutral-900">100%</span>
                            <span className="text-xs md:text-sm text-neutral-500 font-medium mt-2">Kepuasan Klien</span>
                        </motion.div>

                        {/* Kartu 4: Gambar */}
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="relative overflow-hidden rounded-2xl mt-6 md:mt-8 shadow-lg aspect-square group cursor-pointer"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop" 
                                alt="Ruang Kerja" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-[10px] uppercase font-medium tracking-wider">Workspace</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
           </FadeIn>
        </section>

        {/* --- 3. BAGIAN TEKNOLOGI --- */}
        <section id="skills" className="w-full scroll-mt-32">
           <TechStack />
        </section>

        {/* --- 4. BAGIAN PENGALAMAN --- */}
        <section id="experience" className="w-full scroll-mt-32">
          <FadeIn>
            <h2 className="text-xl md:text-2xl font-semibold mb-10 md:mb-16 border-l-4 border-neutral-900 pl-4">
              Pengalaman Profesional
            </h2>
          </FadeIn>
          <div className="space-y-2 md:space-y-0">
            {DATA.experiences.map((exp, index) => (
              <ExperienceWithTrail
                key={index}
                data={exp}
                isLast={index === DATA.experiences.length - 1}
              />
            ))}
          </div>
        </section>

        {/* --- 5. BAGIAN PROYEK --- */}
        <section id="projects" className="w-full scroll-mt-32">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12">
              <div className="w-full md:w-auto">
                <h2 className="text-xl md:text-2xl font-semibold border-l-4 border-neutral-900 pl-4 mb-2">
                  Proyek Terpilih
                </h2>
                <p className="text-neutral-500 ml-5 text-sm md:text-base">
                  Beberapa hasil karya terbaik saya.
                </p>
              </div>
              <a href="#" className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors mt-6 md:mt-0 px-4 md:px-0 whitespace-nowrap">
                Lihat Semua Proyek <ArrowUpRight size={16} />
              </a>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {DATA.projects.map((project, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <InteractiveProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* --- 6. BAGIAN KONTAK --- */}
        <section id="contact" className="w-full scroll-mt-32 pb-8">
          <FadeIn>
            <ContactSection />
          </FadeIn>
        </section>
      </div>

      {/* --- Footer --- */}
      <Footer />
    </main>
  );
}

// --- SUB KOMPONEN PENDUKUNG ---

function CodeHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 bg-[#2d2d2d] border-b border-neutral-700">
      <div className="flex gap-1.5 md:gap-2">
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-[10px] md:text-xs text-neutral-400 font-mono">{title}</span>
      <div className="w-6 md:w-8" /> 
    </div>
  );
}

function InteractiveProjectCard({ project }: { project: any }) {
  return (
    <div className="group relative bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-neutral-200/50 transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-video overflow-hidden bg-neutral-100">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <a href={project.link} className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 px-6 py-2 bg-white text-neutral-900 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-neutral-100">
            Lihat Proyek <ExternalLink size={14} />
          </a>
        </div>
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-neutral-900 mb-2 md:mb-3">{project.title}</h3>
        <p className="text-neutral-600 text-sm mb-4 md:mb-6 line-clamp-3">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.tech.map((t: string) => (
            <span key={t} className="px-2.5 py-1 text-[10px] uppercase font-semibold bg-neutral-100 text-neutral-600 rounded-md border border-neutral-200">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceWithTrail({ data, isLast }: { data: any; isLast: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="group">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
        
        {/* GAMBAR PENGALAMAN */}
        <div className="md:col-span-4 relative py-2 md:py-4">
          <div className="relative aspect-[21/9] md:aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
            <img src={data.image} alt={data.company} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
          </div>
        </div>

        {/* TIMELINE DOTS (Hanya Desktop) */}
        <div className="hidden md:flex md:col-span-1 flex-col items-center relative">
          <div className={`w-[1px] bg-neutral-200 absolute top-4 ${isLast ? "h-full bg-gradient-to-b from-neutral-200 to-transparent" : "h-[150%] bottom-0"}`} />
          <div className="relative w-4 h-4 rounded-full bg-white border-[3px] border-neutral-300 group-hover:border-blue-600 group-hover:scale-125 transition-all duration-500 z-10 mt-[2.5rem]" />
        </div>

        {/* DESKRIPSI PENGALAMAN */}
        <div className="md:col-span-7 py-2 md:py-4 pb-8 md:pb-16 border-l-2 md:border-l-0 border-neutral-200 pl-4 md:pl-0 ml-2 md:ml-0">
           <div className="flex flex-col gap-2 md:gap-3">
            <span className="w-fit px-3 py-1 rounded-full text-[10px] md:text-xs font-mono font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">{data.period}</span>
            <div>
              <h3 className="text-lg md:text-2xl font-bold text-neutral-900">{data.role}</h3>
              <p className="text-base md:text-lg font-medium text-neutral-500 mt-1">{data.company}</p>
            </div>
            <p className="text-neutral-600 leading-relaxed text-sm md:text-base">{data.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SocialLink({ icon, href, label }: { icon: any, href: string, label: string }) {
  return <a href={href} aria-label={label} className="p-2 border border-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-900 hover:text-white transition-all">{icon}</a>;
}
"use client";

import { DATA } from "@/lib/data";
import CardSwap, { Card } from "@/components/CardSwap";
import FadeIn from "@/components/FadeIn";
import Navbar from "@/components/Navbar";
import { ArrowUpRight, Github, Linkedin, Mail, ExternalLink, Download, User } from "lucide-react";
import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack"; 

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* --- Navbar --- */}
      <Navbar />

      {/* KONTAINER UTAMA */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-20 space-y-32">
        
        {/* --- 1. BERANDA / HERO SECTION --- */}
        <section
          id="home"
          className="scroll-mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]"
        >
          {/* KOLOM KIRI */}
          <div className="space-y-6 order-2 md:order-1 flex flex-col justify-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold mb-6 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Siap Bekerja
              </div>

              <div className="min-h-[100px] md:min-h-[140px] flex items-center">
                 <SplitText
                  text={`Halo, Saya ${DATA.name}.`}
                  className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-900 leading-tight"
                  delay={500}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed max-w-lg font-light">
                Pengembang Full Stack yang berfokus membangun pengalaman digital yang cepat, modern, dan mudah digunakan.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4} className="flex flex-wrap gap-4 pt-4">
              <a href="#contact" className="px-6 py-3 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all flex items-center gap-2 shadow-lg shadow-neutral-900/20">
                Hubungi Saya <ArrowUpRight size={18} />
              </a>
              <a href="#about" className="px-6 py-3 bg-white border border-neutral-200 text-neutral-900 rounded-full font-medium hover:bg-neutral-50 transition-all flex items-center gap-2">
                Tentang Saya <User size={18} />
              </a>
            </FadeIn>
            
            <FadeIn delay={0.5} className="flex gap-4 pt-2">
              <SocialLink icon={<Github size={20} />} href="#" label="GitHub" />
              <SocialLink icon={<Linkedin size={20} />} href="#" label="LinkedIn" />
              <SocialLink icon={<Mail size={20} />} href="mailto:email@example.com" label="Email" />
            </FadeIn>
          </div>

          {/* KOLOM KANAN */}
          <div className="order-1 md:order-2 relative h-[420px] w-full flex justify-center items-center">
            <div className="relative w-full h-full flex items-center justify-center">
              <CardSwap delay={3500}>
                  <Card customClass="bg-[#1e1e1e] border border-neutral-700 rounded-xl overflow-hidden shadow-2xl">
                    <CodeHeader title="index.html" />
                    <div className="p-5 font-mono text-xs text-gray-300 leading-relaxed">
                      <div className="opacity-50 mb-2">&lt;!-- Struktur --&gt;</div>
                      <div><span className="text-blue-400">&lt;div</span> <span className="text-sky-300">class</span>=<span className="text-orange-300">"hero"</span><span className="text-blue-400">&gt;</span></div>
                      <div className="pl-4"><span className="text-blue-400">&lt;h1&gt;</span><span className="text-white">Halo Dunia</span><span className="text-blue-400">&lt;/h1&gt;</span></div>
                      <div><span className="text-blue-400">&lt;/div&gt;</span></div>
                    </div>
                  </Card>
                  <Card customClass="bg-[#1e1e1e] border border-neutral-700 rounded-xl overflow-hidden shadow-2xl">
                    <CodeHeader title="styles.css" />
                    <div className="p-5 font-mono text-xs text-gray-300 leading-relaxed">
                      <div className="opacity-50 mb-2">/* Gaya */</div>
                      <div><span className="text-yellow-300">.hero</span> <span className="text-yellow-500">&#123;</span></div>
                      <div className="pl-4"><span className="text-sky-300">display</span>: <span className="text-orange-300">grid</span>;</div>
                      <div><span className="text-yellow-500">&#125;</span></div>
                    </div>
                  </Card>
                  <Card customClass="bg-[#1e1e1e] border border-neutral-700 rounded-xl overflow-hidden shadow-2xl">
                    <CodeHeader title="App.tsx" />
                    <div className="p-5 font-mono text-xs text-gray-300 leading-relaxed">
                      <div className="opacity-50 mb-2">// Logika</div>
                      <div><span className="text-purple-400">const</span> <span className="text-yellow-300">Hero</span> = () <span className="text-purple-400">=&gt;</span> (</div>
                      <div className="pl-4"><span className="text-blue-400">&lt;Grid</span> <span className="text-sky-300">cols</span>=<span className="text-yellow-500">&#123;</span>2<span className="text-yellow-500">&#125;</span> <span className="text-blue-400">/&gt;</span></div>
                      <div>);</div>
                    </div>
                  </Card>
              </CardSwap>
            </div>
          </div>
        </section>

        {/* --- 2. BAGIAN TENTANG SAYA --- */}
        <section id="about" className="scroll-mt-32 w-full">
           <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                
                {/* KOLOM KIRI */}
                <div className="space-y-8 sticky top-32">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 leading-tight">
                        Membangun produk digital dengan fokus pada <span className="text-blue-600">pengalaman pengguna</span> dan kode yang bersih.
                    </h2>
                    
                    <div className="space-y-6 text-lg text-neutral-600 leading-relaxed font-light">
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

                    {/* Tanda Tangan */}
                    <div className="pt-4">
                        <p className="font-serif italic text-2xl text-neutral-400">Raditya.</p>
                    </div>
                </div>

                {/* KOLOM KANAN */}
                <div className="relative">
                    {/* Dekorasi Latar Belakang */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl -z-10 opacity-60"></div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        {/* Kartu Statistik 1 */}
                        <motion.div 
                            whileHover={{ y: -5 }} 
                            className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-xl shadow-neutral-100 flex flex-col justify-between aspect-square hover:border-blue-100 transition-colors"
                        >
                            <span className="text-4xl font-bold text-neutral-900">3+</span>
                            <span className="text-sm text-neutral-500 font-medium">Tahun Pengalaman</span>
                        </motion.div>

                        {/* Kartu Statistik 2 */}
                        <motion.div 
                            whileHover={{ y: -5 }} 
                            className="p-6 bg-neutral-900 text-white rounded-2xl shadow-xl shadow-neutral-400/20 flex flex-col justify-between aspect-square mt-8"
                        >
                            <span className="text-4xl font-bold">12+</span>
                            <span className="text-sm text-neutral-400 font-medium">Proyek Selesai</span>
                        </motion.div>

                        {/* Kartu Statistik 3 */}
                        <motion.div 
                            whileHover={{ y: -5 }} 
                            className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-xl shadow-neutral-100 flex flex-col justify-between aspect-square hover:border-blue-100 transition-colors"
                        >
                            <span className="text-4xl font-bold text-neutral-900">100%</span>
                            <span className="text-sm text-neutral-500 font-medium">Kepuasan Klien</span>
                        </motion.div>

                        {/* Gambar Visual */}
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="relative overflow-hidden rounded-2xl mt-8 shadow-lg aspect-square group cursor-pointer"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop" 
                                alt="Ruang Kerja Coding" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-xs font-medium tracking-wider uppercase">Ruang Kerja Saya</p>
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
            <h2 className="text-2xl font-semibold mb-16 border-l-4 border-neutral-900 pl-4">
              Pengalaman Profesional
            </h2>
          </FadeIn>
          <div className="space-y-0">
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
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-4 md:px-0">
              <div className="w-full md:w-auto">
                <h2 className="text-2xl font-semibold border-l-4 border-neutral-900 pl-4 mb-2">
                  Proyek Terpilih
                </h2>
                <p className="text-neutral-500 ml-5">
                  Beberapa hasil karya terbaik saya.
                </p>
              </div>
              <a href="#" className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors mt-4 md:mt-0 whitespace-nowrap">
                Lihat Semua Proyek <ArrowUpRight size={16} />
              </a>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DATA.projects.map((project, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <InteractiveProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        </section>

        {/* --- 6. BAGIAN KONTAK --- */}
        <section id="contact" className="w-full scroll-mt-32">
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
    <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-neutral-700">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <span className="text-xs text-neutral-400 font-mono">{title}</span>
      <div className="w-8" /> 
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
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-neutral-900 mb-3">{project.title}</h3>
        <p className="text-neutral-600 text-sm mb-6 line-clamp-3">{project.description}</p>
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 relative py-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
            <img src={data.image} alt={data.company} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
          </div>
        </div>
        <div className="hidden md:flex md:col-span-1 flex-col items-center relative">
          <div className={`w-[1px] bg-neutral-200 absolute top-4 ${isLast ? "h-full bg-gradient-to-b from-neutral-200 to-transparent" : "h-[150%] bottom-0"}`} />
          <div className="relative w-4 h-4 rounded-full bg-white border-[3px] border-neutral-300 group-hover:border-blue-600 group-hover:scale-125 transition-all duration-500 z-10 mt-[2.5rem]" />
        </div>
        <div className="md:col-span-7 py-4 pb-16 pl-4 md:pl-0 border-l md:border-l-0 border-neutral-200">
           <div className="flex flex-col gap-3">
            <span className="w-fit px-3 py-1 rounded-full text-xs font-mono font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">{data.period}</span>
            <div><h3 className="text-2xl font-bold text-neutral-900">{data.role}</h3><p className="text-lg font-medium text-neutral-500 mt-1">{data.company}</p></div>
            <p className="text-neutral-600 leading-relaxed text-base">{data.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SocialLink({ icon, href, label }: { icon: any, href: string, label: string }) {
  return <a href={href} className="p-2 border border-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-900 hover:text-white transition-all">{icon}</a>;
}
// src/lib/data.ts

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Project {
  title: string;
  tech: string[];
  description: string;
  link: string;
  image: string;
}

export const DATA = {
  name: "Radit",
  title: "Software Engineer & Consultant",
  about: "A professional dedicated to building scalable and efficient digital solutions. Focused on clean system architecture and intuitive user experiences.",
  experiences: [
    {
      company: "MTSN 2 TEGAL",
      role: "Pelajar",
      period: "2020 - 2024",
      description: "MTS NGAPAIN SIH GW ?",
      image: "/logo/mts.jpg"
    },
    {
      company: "SMKN 1 SLAWI",
      role: "Pelajar",
      period: "2024 - Sekarang",
      description: "Mempelajari pemrograman dasar, pengembangan aplikasi web (HTML, CSS, JavaScript, framework), pengelolaan basis data (database), desain antarmuka (UI/UX), pengembangan aplikasi mobile, dan pengujian perangkat lunak, serta dibekali keterampilan seperti manajemen proyek, keamanan siber, dan pemahaman logika/algoritma untuk menciptakan software, aplikasi.",
      image: "/logo/smk.jpeg"
    }
  ] as unknown as Experience[],
  projects: [
    {
      title: "Enterprise Dashboard",
      tech: ["Next.js", "TypeScript", "GraphQL"],
      description: "Dashboard analitik real-time untuk pemantauan logistik global dengan jutaan data point.",
      link: "#",
      // Tambahkan URL gambar (bebas ambil dari unsplash atau assets sendiri)
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
      title: "AI Content Generator",
      tech: ["Python", "FastAPI", "OpenAI"],
      description: "Platform SaaS untuk generate konten marketing otomatis menggunakan AI.",
      link: "#",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    }
  ] as Project[]
};
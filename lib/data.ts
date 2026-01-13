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
      company: "Tech Corp Indonesia",
      role: "Senior Frontend Engineer",
      period: "2021 - Sekarang",
      description: "Memimpin tim pengembangan antarmuka untuk aplikasi fintech dengan lebih dari 1 juta pengguna aktif.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80"
    },
    {
      company: "Digital Solutions",
      role: "Fullstack Developer",
      period: "2019 - 2021",
      description: "Mengembangkan sistem manajemen inventaris berbasis cloud untuk klien enterprise.",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80"
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
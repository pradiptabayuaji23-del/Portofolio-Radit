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
      description: "Menempuh pendidikan menengah pertama dengan kurikulum berbasis keislaman. Mempelajari ilmu pengetahuan alam, matematika, bahasa, serta pendidikan agama Islam yang menjadi fondasi dalam membentuk karakter, disiplin, dan pola pikir analitis untuk jenjang pendidikan selanjutnya.",
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
      title: "Degrave",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      description: "Website company profile modern dengan desain elegan dan performa tinggi untuk kebutuhan branding digital.",
      link: "https://degravestudio.com/",
      image: "/project/degrave.png"
    },
    {
      title: "Vodeco",
      tech: ["WordPress", "PHP", "CSS", "JavaScript"],
      description: "Website Digital Marketing Agency & IT Consultant dengan fitur lengkap termasuk landing page, portofolio, dan sistem konsultasi online.",
      link: "https://vodeco.co.id",
      image: "/project/vodeco.png"
    },
    {
      title: "WordPress Custom Plugin",
      tech: ["PHP", "JavaScript", "AJAX", "WordPress API"],
      description: "Plugin kustom WordPress terintegrasi dengan antarmuka tematik. Fitur utama mencakup sistem upload multi-file (hingga 15MB) yang mendukung berbagai format dokumen seperti PDF dan DOCX, dilengkapi dengan pratinjau dan validasi berkas.",
      link: "https://github.com/pradiptabayuaji23-del/Project-Comment-Wordpress.git",
      image: "/project/plugin.png"
    }
  ] as Project[]
};
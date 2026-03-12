import project1 from "../assets/projects/project-1.png";
import project2 from "../assets/projects/project-2.png";
import project3 from "../assets/projects/project-3.png";
import project4 from "../assets/projects/project-4.png";
import project5 from "../assets/projects/project-5.png";
import project6 from "../assets/projects/project-6.png";
import project7 from "../assets/projects/project-7.png";
import project8 from "../assets/projects/project-8.png";

export const HERO_CONTENT = `Tech enthusiast specializing in Mobile and Web development with proven experience in full-stack development. Demonstrated expertise in building responsive web applications and mobile solutions. Strong foundation in Web development with growing proficiency in Mobile apps creation through hands-on projects. Proactive problem-solver with excellent adaptability in dynamic software environments.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack & mobile apps developer with a passion for creating efficient and user-friendly applications. I have worked with a variety of technologies, including React, Angular, Nest, Node.js, MySQL, MongoDB, Swift, Java and Dart. My journey in Web and Mobile development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, playing video games, and spending time with my family.`;

export const EXPERIENCES = [
  {
    year: "February 2025 - August 2025",
    role: "Full Stack Mobile Developer Intern",
    company: "PlaySoft",
    description: `Designed and developed a mobile application for smart maintenance management using Flutter, NestJS and GraphQL. Implemented features for booking, tracking, and reporting issues. Integrated real-time notifications, Real-time chat, Localizations and a chatbot for easy tickets creation and categorization.`,
    technologies: ["Flutter", "NestJS", "GraphQL", "MySQL", "Firebase", "Socket.IO"],
    color: "#00E5FF",
  },
  {
    year: "June 2024 - August 2024",
    role: "Software Engineer Intern",
    company: "Tagamuta Valley",
    description: `Developed the user interfaces for a laboration management web application using Angular, PrimeNG and PrimeFlex. Collaborated with stakeholders to define project requirements and timelines.`,
    technologies: ["TypeScript", "Angular", "PrimeNG", "PrimeFlex"],
    color: "#FF3CAC",
  },
  {
    year: "January 2022 - May 2022",
    role: "Software Developer Intern",
    company: "Branper",
    description: `Designed and developed 'Sentinel', a web scraping application, utilizing object detection and OCR technologies. Implemented frontend interfaces using React for visualizing scraped data. Integrated computer vision algorithms for automated data extraction.`,
    technologies: ["ReactJs", "MUI", "MongoDB", "Django", "Express", "Selenium"],
    color: "#7B2FFF",
  },
  {
    year: "July 2021 - August 2021",
    role: "Technical Intern",
    company: "Tunisian Post Office",
    description: `Designed and developed a comprehensive Postal Depot Management System using Angular and FastAPI. Implemented automated workflows and real-time tracking features to streamline depot operations.`,
    technologies: ["Python", "FastAPI", "Angular", "MySQL"],
    color: "#00E5FF",
  },
];

export const PROJECTS = [
  {
    title: "Repairy",
    image: project8,
    description:
      "Repairy is a smart mobile application designed to simplify the process of booking repair services using AI. Built with Flutter, NestJS, MySQL, GraphQL, and Firebase.",
    technologies: ["Flutter", "Dart", "NestJS", "MySQL", "GraphQL", "Firebase"],
    githubRepo: "https://github.com/maminebnr/repairy-mobile",
    status: "private",
    emoji: "🔧",
    tag: "Mobile",
    accent: "#FF3CAC",
  },
  {
    title: "Deliverini",
    image: project1,
    description:
      "Comprehensive carpooling and object transportation application connecting users for shared rides and delivery services. Built with Angular, Express, and MongoDB.",
    technologies: ["HTML", "CSS", "Angular", "Express", "MongoDB"],
    githubRepo: "https://github.com/YassineElkefi/Deliverini",
    status: "public",
    emoji: "🚗",
    tag: "Web",
    accent: "#00E5FF",
  },
  {
    title: "CoTEK",
    image: project2,
    description:
      "Advanced project management platform for team collaboration and productivity. Built with Angular, SpringBoot, and MySQL.",
    technologies: ["HTML", "CSS", "Angular", "SpringBoot", "MySQL"],
    githubRepo: "https://github.com/Hiba-Bahri/PI",
    status: "public",
    emoji: "📋",
    tag: "Web",
    accent: "#7B2FFF",
  },
  {
    title: "Expense Tracking System",
    image: project3,
    description:
      "Intuitive application to manage and track personal finances with NestJS, Angular, and MongoDB.",
    technologies: ["NestJS", "Angular", "MongoDB"],
    githubRepo: "https://github.com/YassineElkefi/Expense-Tracking-System",
    status: "public",
    emoji: "💸",
    tag: "Web",
    accent: "#FFD700",
  },
  {
    title: "Real Estate Mobile App",
    image: project4,
    description:
      "Android app for buying, selling, and renting properties with map integration, photo galleries, and real-time listings.",
    technologies: ["Java", "Android SDK", "Firebase Realtime Database", "Firebase Auth"],
    githubRepo: "https://github.com/Hiba-Bahri/Android-Project",
    status: "public",
    emoji: "🏠",
    tag: "Mobile",
    accent: "#FF3CAC",
  },
];

export const PERSONAL_PROJECTS = [
  {
    title: "Portfolio Website",
    image: project5,
    description:
      "A personal portfolio website to showcase my skills, projects, and experiences. Built with Vite and Tailwind CSS.",
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    githubRepo: "https://github.com/YassineElkefi/Yassineelkefidev-portfolio",
    status: "public",
    emoji: "🖥️",
    tag: "Web",
    accent: "#00E5FF",
  },
  {
    title: "Islami",
    image: project6,
    description:
      "Mobile application providing the Quran, prayer times, and the Qibla. Built with SwiftUI with Arabic and English support.",
    technologies: ["SwiftUI", "Xcode", "iOS"],
    githubRepo: "https://github.com/YassineElkefi/Islami",
    status: "public",
    emoji: "☪️",
    tag: "iOS",
    accent: "#00E5FF",
  },
  {
    title: "Foody",
    image: project7,
    description:
      "Modern minimalist recipe blog app built with Flutter and GraphQL, featuring role-based access and persistent authentication.",
    technologies: ["Flutter", "Dart", "GraphQL", "ExpressJS", "MongoDB"],
    githubRepo: "https://github.com/YassineElkefi/Foody",
    status: "public",
    emoji: "🍜",
    tag: "Mobile",
    accent: "#7B2FFF",
  },
];

export const CONTACT = {
  address: "El Mourouj 3, Ben Arous, Tunisia, 2074",
  phoneNo: ["+216 58 804 932", "+216 29 478 595", "+216 53 504 391"],
  email: "yassine.elkefi6@gmail.com",
};
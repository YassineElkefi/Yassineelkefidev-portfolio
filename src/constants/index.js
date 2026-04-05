import project1 from "../assets/projects/project-1.png";
import project2 from "../assets/projects/project-2.png";
import project3 from "../assets/projects/project-3.png";
import project4 from "../assets/projects/project-4.png";
import project5 from "../assets/projects/project-5.png";
import project6 from "../assets/projects/project-6.png";
import project7 from "../assets/projects/project-7.png";
import project8 from "../assets/projects/project-8.png";
import project9 from "../assets/projects/project-9.png";
import project10 from "../assets/projects/project-10.png";
import project11 from "../assets/projects/project-11.png";
import project12 from "../assets/projects/project-12.png";

import screenshotIslami1 from "../assets/screenshots/islami/islami-1.png";
import screenshotIslami2 from "../assets/screenshots/islami/islami-2.png";
import screenshotIslami3 from "../assets/screenshots/islami/islami-3.png";
import screenshotIslami4 from "../assets/screenshots/islami/islami-4.png";
import screenshotIslami5 from "../assets/screenshots/islami/islami-5.png";
import screenshotIslami6 from "../assets/screenshots/islami/islami-6.png";

 
import screenshotFoody1 from "../assets/screenshots/foody/foody-1.png";
import screenshotFoody2 from "../assets/screenshots/foody/foody-2.png";
import screenshotFoody3 from "../assets/screenshots/foody/foody-3.png";
import screenshotFoody4 from "../assets/screenshots/foody/foody-4.png";
import screenshotFoody5 from "../assets/screenshots/foody/foody-5.png";
import screenshotFoody6 from "../assets/screenshots/foody/foody-6.png";
import screenshotFoody7 from "../assets/screenshots/foody/foody-7.png";
import screenshotFoody8 from "../assets/screenshots/foody/foody-8.png";
import screenshotFoody9 from "../assets/screenshots/foody/foody-9.png";

import screenshotGaraji1 from "../assets/screenshots/garaji/garaji-1.png";
import screenshotGaraji2 from "../assets/screenshots/garaji/garaji-2.png";
import screenshotGaraji3 from "../assets/screenshots/garaji/garaji-3.png";
import screenshotGaraji4 from "../assets/screenshots/garaji/garaji-4.png";
import screenshotGaraji5 from "../assets/screenshots/garaji/garaji-5.png";
import screenshotGaraji6 from "../assets/screenshots/garaji/garaji-6.png";
import screenshotGaraji7 from "../assets/screenshots/garaji/garaji-7.png";
import screenshotGaraji8 from "../assets/screenshots/garaji/garaji-8.png";
import screenshotGaraji9 from "../assets/screenshots/garaji/garaji-9.png";
import screenshotGaraji10 from "../assets/screenshots/garaji/garaji-10.png";
import screenshotGaraji11 from "../assets/screenshots/garaji/garaji-11.png";


 
import screenshotHomeSpot1 from "../assets/screenshots/homespot/homespot-1.png";
import screenshotHomeSpot2 from "../assets/screenshots/homespot/homespot-2.png";
import screenshotHomeSpot3 from "../assets/screenshots/homespot/homespot-3.png";
import screenshotHomeSpot4 from "../assets/screenshots/homespot/homespot-4.png";
import screenshotHomeSpot5 from "../assets/screenshots/homespot/homespot-5.png";
import screenshotHomeSpot6 from "../assets/screenshots/homespot/homespot-6.png";
import screenshotHomeSpot7 from "../assets/screenshots/homespot/homespot-7.png";

export const HERO_CONTENT = `Tech enthusiast specializing in Mobile and Web development with proven experience in full-stack development. Demonstrated expertise in building responsive web applications and mobile solutions. Strong foundation in Web development with growing proficiency in Mobile apps creation through hands-on projects. Proactive problem-solver with excellent adaptability in dynamic software environments.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack & mobile apps developer with a passion for creating efficient and user-friendly applications. I have worked with a variety of technologies, including React, Angular, Nest, Node.js, MySQL, MongoDB, Swift, Java and Dart. My journey in Web and Mobile development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, playing video games, and spending time with my family.`;

export const EXPERIENCES = [
  {
    year: "February 2026 - Present",
    role: "Full Stack Developer",
    company: "PlaySoft",
    description: `Contributing to the developement of Instalab, a new Interactive IT Labs Platform. Implementing New Features and delivering high quality service for end users.`,
    technologies: ["Next.js", "Tailwindcss", "NestJS", "GraphQL", "Postgres"],
    color: "#D4A017",
  },
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
    accent: "#D4A017",
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
    demo: "live",                                    
    demoUrl: "https://yassineelkefidev-portfolio.vercel.app/",
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
    demo: "slideshow",                           
    screenshots: [screenshotIslami1, screenshotIslami2, screenshotIslami3, screenshotIslami4, screenshotIslami5, screenshotIslami6],
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
    demo: "slideshow",
    screenshots: [screenshotFoody1, screenshotFoody2, screenshotFoody3, screenshotFoody4, screenshotFoody5, screenshotFoody6, screenshotFoody7, screenshotFoody8, screenshotFoody9],
  },
  {
    title: "Garaji",
    image: project12,
    description:
      "A sleek, user-friendly mobile application for personal vehicle management. Effortlessly track your vehicles, log maintenance activities, and stay ahead with smart health insights. Built with Flutter for seamless cross-platform experience on iOS and Android.",
    technologies: ["Flutter", "Dart", "LocalDB", "Offline"],
    githubRepo: "https://github.com/YassineElkefi/Garaji",
    status: "public",
    emoji: "🚗",
    tag: "Mobile",
    accent: "#7B2FFF",
    demo: "slideshow",
    screenshots: [screenshotGaraji1, screenshotGaraji2, screenshotGaraji3, screenshotGaraji4, screenshotGaraji5, screenshotGaraji6, screenshotGaraji7, screenshotGaraji8, screenshotGaraji9, screenshotGaraji10, screenshotGaraji11],
  },
  {
    title: "HomeSpot",
    image: project9,
    description:
      "Modern & minimalist real-estate agency application for posting houses, Appartments or Fields adverts and contacting estate agencies.",
    technologies: ["Flutter", "Dart", "NestJS", "MySQL", "GraphQL"],
    githubRepo: "https://github.com/YassineElkefi/HomeSpot",
    status: "public",
    emoji: "🏡",
    tag: "Mobile",
    accent: "#FF3CAC",
    demo: "slideshow",
    screenshots: [screenshotHomeSpot1, screenshotHomeSpot2, screenshotHomeSpot3, screenshotHomeSpot4, screenshotHomeSpot5, screenshotHomeSpot6, screenshotHomeSpot7],
  },
  {
    title: "NumiX",
    image: project10,
    description:
      "A Wordle-style game where you guess an 8-digit Tunisian phone number.",
    technologies: ["Next.js", "Tailwindcss"],
    githubRepo: "https://github.com/YassineElkefi/NumiX",
    status: "public",
    emoji: "🎲",
    tag: "Web",
    accent: "#FF3CAC",
    demo: "live",
    demoUrl: "https://yassineelkefi.github.io/NumiX",
  },
  {
    title: "Hangman",
    image: project11,
    description:
      "Hangman Javascript fun game - developer edition. Test your skills in software engineering.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubRepo: "https://github.com/YassineElkefi/Hangman-Game",
    status: "public",
    emoji: "🎮",
    tag: "Web",
    accent: "#336791",
    demo: "live",                                   
    demoUrl: "https://yassineelkefi.github.io/Hangman-Game",
  },
];

export const CONTACT = {
  address: "El Mourouj 3, Ben Arous, Tunisia, 2074",
  phoneNo: ["+216 58 804 932", "+216 29 478 595", "+216 53 504 391"],
  email: "yassine.elkefi6@gmail.com",
};
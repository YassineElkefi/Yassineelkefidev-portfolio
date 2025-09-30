import { title } from "framer-motion/client";
import project1 from "../assets/projects/project-1.png";
import project2 from "../assets/projects/project-2.png";
import project3 from "../assets/projects/project-3.png";
import project4 from "../assets/projects/project-4.png";
import project5 from "../assets/projects/project-5.png";
import project6 from "../assets/projects/project-6.png";
import project7 from "../assets/projects/project-7.png";
import project8 from "../assets/projects/project-8.png";

export const HERO_CONTENT = `Tech enthusiast specializing in Mobile and Web development with proven experience in full-stack development. Demonstrated expertise in building responsive web applications and mobile solutions. Strong foundation in Web development with growing proficiency in Mobile apps creation through hands-on projects. Proactive problem-solver with excellent adaptability in dynamic software environments.`;

export const ABOUT_TEXT = `I am a dedicated and versatile full stack & mobile apps developer with a passion for creating efficient and user-friendly web applications. I have worked with a variety of technologies, including React, Angular, Nest, Node.js, MySQL, MongoDB, Swift, Java and Dart. My journey in Web and Mobile development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, playing video games, and spending time with my family.`;

export const EXPERIENCES = [
  {
    year: "February 2025 - August 2025",
    role: "Full Stack Mobile Developer Intern",
    company: "PlaySoft",
    description: `Designed and developed a mobile application for smart maintenance management using Flutter, NestJS and GraphQL. Implemented features for booking, tracking, and reporting issues. Integrated real-time notifications, Real-time chat, Localizations and a chatbot for easy tickets creation and categorization.`,
    technologies: ["Flutter", "NestJS", "GraphQL", "MySQL", "Firebase", "Socket.IO"],
  },
  {
    year: "June 2024 - August 2024",
    role: "Software Engineer Intern",
    company: "Tagamuta Valley",
    description: ` Developed the user interfaces for a laboration management web application using Angular, PrimeNG annd PrimeFlex. Collaborated with stakeholders to define project requirements and timelines.`,
    technologies: ["TypeScript", "Angular", "PrimeNG", "PrimeFlex"],
  },
  {
    year: "January 2022 - May 2022",
    role: "Software Developer Intern",
    company: "Branper",
    description: `Designed and developed 'Sentinel', a web scraping application, utilizing object detection and OCR technologies. Implemented frontend interfaces using React for visualizing scraped data. Integrated computer vision algorithms for automated data extraction and collaborated with the team to optimize scraping accuracy.`,
    technologies: ["ReactJs", "MUI", "MongoDB", "Django","Express","Selenuim"],
  },
  {
    year: "July 2021 - August 2021",
    role: "Technical Intern",
    company: "Tunisian Post Office",
    description: `Designed and developed a comprehensive Postal Depot Management System using Angular and FastAPI. Implemented automated workflows and real-time tracking features to streamline depot operations. Created RESTful APIs using Python to handle inventory management and shipment processing, resulting in improved operational efficiency and reduced manual workload.`,
    technologies: ["Python", "FastAPI", "Angular", "MySQL"],
  },
];

export const PROJECTS = [
  {
    title: "Repairy",
    image: project8,
    description:
      "Repairy is a smart mobile application designed to simplify the process of booking repair services using AI. Built with Flutter, NestJS, MySQL, GraphQL, and Firebase, the app allows users to easily and book repair tickets. The AI integration helps in accurately categorizing repair issues, ensuring a seamless user experience.",
    technologies: ["Flutter", "Dart", "NestJS", "MySQL", "GraphQL", "Firebase"],
    githubRepo: "https://github.com/maminebnr/repairy-mobile",
    status: "private"
  },
  {
    title: "Deliverini",
    image: project1,
    description:
      "Deliverini is a comprehensive carpooling and object transportation application designed to connect users for shared rides and delivery services. Built with Angular for the frontend, Express for the backend, and MongoDB for data management, the app allows users to easily book rides, track deliveries, and manage their transportation needs efficiently.",
    technologies: ["HTML", "CSS", "Angular", "Express", "MongoDB"],
    githubRepo: "https://github.com/YassineElkefi/Deliverini",
    status: "public"
  },
  {
    title: "CoTEK",
    image: project2,
    description:
      "CoTEK is an advanced project management platform aimed at improving team collaboration and productivity. Built with Angular on the frontend, SpringBoot for robust backend services, and MySQL for data storage, the platform enables users to create, assign, and track tasks, while also providing powerful reporting and progress tracking features for better project oversight.",
    technologies: ["HTML", "CSS", "Angular", "SpringBoot", "MySQL"],
    githubRepo: "https://github.com/Hiba-Bahri/PI",
    status: "public"
  },
  {
    title: "Expense Tracking System",
    image: project3,
    description:
      "The Expense Tracking System is an intuitive application designed to help users manage and track their personal finances. Made with Next.js for its fast server-side rendering capabilities, Angular for the frontend, and MongoDB for database storage, the system allows users to easily record and categorize their expenses, providing them with insightful reports and a clear overview of their financial health.",
    technologies: ["Next.js", "Angular", "MongoDB"],
    githubRepo: "https://github.com/YassineElkefi/Expense-Tracking-System",
    status: "public"
  },
  {
    title: "Real Estate Mobile App",
    image: project4,
    description:
      "The Real Estate mobile app is designed to facilitate the buying, selling, and renting of properties. Developed using Java and the Android SDK, the app allows users to browse listings, view property details, and connect with agents or other buyers. Features include map integration, photo galleries, and real-time updates for the latest listings, offering a seamless mobile experience for real estate transactions.",
    technologies: ["Java", "Android SDK", "Firebase Realtime Database","Firebase Auth"],
    githubRepo: "https://github.com/Hiba-Bahri/Android-Project",
    status: "public"
  },
];

export const PERSONAL_PROJECTS = [
  {
    title: "Portfolio Website",
    image: project5,
    description:
      "A personal portfolio website to showcase my skills, projects, and experiences. Built with Vite and Tailwind CSS, the website features a modern design, responsive layout, and smooth animations using Framer Motion. It includes sections for about me, projects, experience, and contact information.",
    technologies: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    githubRepo: "https://github.com/YassineElkefi/Yassineelkefidev-portfolio",
    status: "public"
  },
  {
    title: "Islami",
    image: project6,
    description:
      "Islami is a mobile application that provides users with access to the Quran, prayer times, and the Qibla. Built using SwiftUI, the app features a clean and intuitive interface, the ability to read and listen to the Quran in Arabic and English, and a prayer times calculator based on the user's location.",
    technologies: ["SwiftUI", "Xcode", "iOS"],
    githubRepo: "https://github.com/YassineElkefi/Islami",
    status: "public"
  },
  {
    title: 'Foody',
    image: project7,
    description:
      "Foody is a modern, minimalist Recipe blog application built with Flutter and GraphQL. Foody provides a seamless experience for Posting your favorite recipes with role-based access control and persistent authentication.",
    technologies: ["Flutter", "Dart", "GraphQL", "ExpressJS", "MongoDB"],
    githubRepo: "https://github.com/YassineElkefi/Foody",
    status: "public"
  }
];

export const CONTACT = {
  address: "El Mourouj 3, Ben Arous, Tunisia, 2074",
  phoneNo: ["+216 58 804 932", "+216 29 478 595", "+216 53 504 391"],
  email: "yassine.elkefi6@gmail.com",
};

export const site = {
  name: "Dwiresti Puspita Rahmi",
  role: "Full-Stack Developer",
  location: "Berlin, Germany",
  availability: "Open to full-stack / backend / frontend roles — September 2026",
  email: "dwirestipr@gmail.com",
  // shell handle used for the terminal prompt in the hero
  handle: "ami",
  tagline: "Full-Stack Developer, working across frontend and backend, building smooth interfaces up front and reliable systems behind the scenes.",
  hashtag: "# always learning, always building, one tab too many open",
};

export const social = [
  { label: "GitHub", href: "https://github.com/dwirestiprahmi" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dwiresti-puspita-rahmi/" },
];

export const about = [
  "I'm a full-stack developer who enjoys connecting the pretty parts with the powerful parts. Buttons, APIs, databases - I like when everything talks to everthing else nicely.",
  "Right now, I'm exploring machine learning and LLMs, and figuring out how to ship them to the cloud without setting anything on fire.",
];

export type SkillGroup = { category: string; accent: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    category: "Programming Language",
    accent: "#8A4B42", // rosewood
    items: ["C", "C++", "Java", "Python", "PHP", "TypeScript", "JavaScript"],
  },
  {
    category: "Frontend-Technologies",
    accent: "#A9762F", // ochre
    items: ["HTML", "CSS", "ReactJS", "VueJS", "Angular", "NuxtJS"],
  },
  {
    category: "Backend-Technologies & Frameworks",
    accent: "#6E7A4B", // olive
    items: ["Node.js", "ExpressJS", "Spring Boot"],
  },
  {
    category: "Mobile Development",
    accent: "#3F7A74", // teal
    items: ["Java (Android)", "React Native"],
  },
  {
    category: "Databases",
    accent: "#4E6A94", // dusty blue
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    category: "Tools & DevOps",
    accent: "#8A5A78", // mauve
    items: [
      "Docker",
      "Git",
      "GitLab CI/CD",
      "WebSockets",
      "Power BI",
      "Camunda BPM",
      "MS Office",
      "FFmpeg",
    ],
  },
];

export type Project = {
  index: string; // e.g. "01"
  title: string;
  summary: string;
  role: string;
  year: string;
  stack: string[];
  href: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Reveal.me",
    summary:
      "Dating website with a blur function for the person's image until a certain number of messages is reached.",
    role: "Creator",
    year: "2023",
    stack: ["JavaScript/TypeScript", "Express.js", "React.js", "TailwindUI", "Cypress", "MongoDB"],
    href: "https://github.com/dwirestiprahmi/reveal.me",
  },
  {
    index: "02",
    title: "Coworking Space",
    summary:
      "Android app for renting coworking rooms and managing rooms for rent as a place to work.",
    role: "Author",
    year: "2025",
    stack: ["Java (Android)"],
    href: "https://github.com/dwirestiprahmi/coworking-space",
  },
  {
    index: "03",
    title: "Recipe Website",
    summary:
      "Website for sharing cooking recipes, with features for creating, editing, deleting, and searching recipes.",
    role: "Author & maintainer",
    year: "2024",
    stack: ["Express.js", "TypeScript", "PostgreSQL", "Node.js", "React.js", "CSS"],
    href: "https://github.com/dwirestiprahmi/recipe-website",
  },
  {
    index: "04",
    title: "Money Giggle",
    summary: "Personal money management app to track expenses, manage budgets, and visualize spending habits.",
    role: "Contributor",
    year: "2023",
    stack: ["Java", "Spring Boot", "React Native", "PostgreSQL"],
    href: "https://github.com/dwirestiprahmi/money-giggle",
  },
  {
    index: "05",
    title: "Portfolio",
    summary: "My personal portfolio website, showcasing my skills, projects, and experience (which is what you're looking at right now :D). Implemented RAG ( Retrieval-Augmented Generation ) to answer questions about my CV using LLM.",
    role: "Contributor",
    year: "2023",
    stack: ["TypeScript", "Next.js", "TailwindCSS", "React.js", "RAG", "shadcn/ui"],
    href: "#top",
  }
];

export type Role = {
  period: string; 
  role: string;
  company: string;
  location: string;
  highlights: string[];
  tags?: string[];
  logo?: string;
};

export const workExperience: Role[] = [
  {
    period: "Feb 2024 — Present",
    role: "Research Assistant",
    company: "Fraunhofer FOKUS FAME",
    location: "Berlin, Germany",
    highlights: [
      "Re-developerd the Per-Title-Encoding UI, migrating the codebase to TypeScript anad Vue.js to improve user experience, maintainability, and performance.",
      "Built the UI for Measurement Framework for the Green Streaming project using TypeScript, Nuxt.js, Vite, and Docker that enables users to create, schedule, and execute energy consumption measurement jobs for video encoding and streaming across end-devices.",
      "Developed a Grafana dashboard management tool built with TypeScript and Nuxt.js, enabling seamless upload, download, and transfer of dashboards between servers.",
      "Developed a real-time live prediction of energy consumption visualisation UI using TypeScript, Nuxt.js, and Chart.js, displaying live predictions for the energy consumption of video streaming through interactive, dynamic charts.",
      "Built a metric worker service using TypeScript and Express to extract video metadata via FFprobe, analyse encoding complexity with VCA tool, and compute video quality metrics comparing raw and encoded content, saving results to a MongoDB database.",
    ],
    tags: ["TypeScript", "Node.js", "Python", "Vue.js", "PostgreSQL", "Nuxt.js", "Vite", "Docker", "Git", "GitLab CI/CD", "Grafana", "Express.js", "FFprobe", "Chart.js", "MongoDB"],
    logo: "/fraunhofer-fokus-logo.png",
  },
  {
    period: "Oct 2023 — Nov 2023",
    role: "Working Student Software Developer",
    company: "neXenio GmbH (HPI Spin-Off)",
    location: "Berlin, Germany",
    highlights: [
      "Work on the neXboard project on the frontend side with React.js, Typescript and development of tests with Jest",
    ],
    tags: ["React.js", "TypeScript", "Vite", "Jest"],
    logo: "/nexenio_logo.png"
  },
  {
    period: "Sep 2022 - Mar 2023",
    role: "Internship Software Developer",
    company: "PROSTEP AG",
    location: "Darmstadt, Germany",
    highlights: [
      "Creating internal training for the use of BPMN in the OpenPDM environment with process examples for the orchestration of microservices in the context of OpenPDM.",
      "Further developing the OpenPDM interface with JavaScript and Java.",
      "Fixing bugs in the OpenPDM interface.",
      "Development and implementation of “Customer WebApp”, a full-stack web application for tracking and tracing data between PLM system and the ALM system, using Spring Boot, React.js, and PostgreSQL in a RESTful microservices architecture."
    ],
    tags: ["Camunda BPM", "JavaScript", "Java", "Spring Boot", "React.js", "PostgreSQL"],
    logo: "/prostep.png"
  },
];

export type Study = {
  period: string;
  degree: string;
  school: string;
  detail?: string;
  type?: string;
};

export const education: Study[] = [
  {
    period: "Oct 2023 - Apr 2026",
    degree: "Msc - Applied Computer Science",
    school: "HTW Berlin",
    detail: "Expanded knowledge in image processing, machine learning, and full-stack development. Gained practical experience in training machine learning models, and implementing RAG for LLMs. Completed a thesis on the identification and analysis of key contributing factors to energy consumption in video encoding.",
    type: "M.Sc"
  },
  {
    period: "Apr 2020 - Apr 2023",
    degree: "Bsc - Computer Science",
    school: "Hochschule Darmstadt",
    detail: "Focus on software engineering and web development. Learned about OOP and design patterns, algorithms and data structures, databases, and web technologies. Completed a thesis on the development of a full-stack web application for tracking and tracing data between PLM and ALM systems.",
    type: "B.Sc"
  },
];

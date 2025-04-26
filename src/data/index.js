import {
  ibm,
  deloitte,
} from "../assets";

export const navLinks = [
  {
    id: "hero",
    title: "Home",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const experiences = [
  {
    title: "Software Engineer",
    company_name: "IBM ISL (Indian software Labs)",
    icon: ibm,
    date: "2024 - Present",
    details: [
      "Built custom enterprise applications for a Fortune 500 company as a full-stack software engineer.",
      "Developed and maintained scalable backend services, ensuring high availability for critical business applications.",
      "Collaborated with a team to design and implement front-end interfaces.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "Deloitte",
    icon: deloitte,
    date: "2021 - 2024",
    details: [
      "Developed and delivered custom interdisciplinary coding portfolio for clients including Nvidia, Hostinger, and Amazon.",
      "Designed and developed innovative AI applications and interactive websites.",
      "Managed full project lifecycle from concept to deployment in successful and timely project completions.",
      
    ],
  },
  {
    title: "Computer Science",
    company_name: "Parul University",
    icon: null,
    date: "2016 - 2020",
    details: [
      "Built a computer science foundation learning theory, computer architecture, and software engineering.",
      "Worked and interned at NASA and Norfolk Southern Railway to gain practical experience in the field of data analysis.",
      "Acted as a member of the Association for Computing Machinery (ACM).",
    ],
  },
];


export { experiences };


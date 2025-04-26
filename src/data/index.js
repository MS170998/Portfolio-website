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
      "Working for IBM App Connect, modernizing the platform from a monolithic architecture to a hybrid-cloud ready solution for AWS, IBM Cloud, and OpenShift.",
      "IBM App Connect (https://www.ibm.com/products/app-connect) enables users to build integration flows connecting SaaS and on-premise systems — a next-generation offering evolving from traditional IBM Integration Bus (IIB) and App Connect Enterprise.",
      "Contributed to the development of IBM App Connect APIs, integration engines, and connectors that support millions of endpoints and run highly scalable integrations across distributed systems.",
      "Developed and maintained React.js-based user interfaces for App Connect, delivering intuitive and responsive experiences for flow design, monitoring, and configuration tasks.",
      "Also contributed to the Operator Framework, enabling App Connect to be deployed as an operand on Kubernetes and OpenShift, powering its availability as a Cloud Pak offering for hybrid cloud environments.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "Deloitte",
    icon: deloitte,
    date: "2021 - 2024",
    details: [
      "Built React.js applications with advanced global state management, delivering scalable solutions for a Fortune 500 healthcare client.",
      "Primarily focused on frontend development while collaborating closely with backend teams (Node.js) to gain a deeper understanding of the overall system architecture.",
      "Developed role-based authentication systems using Redux, managing different user types like administrators and standard users.",
      "Optimized application performance with techniques like useMemo, React.lazy, and Suspense, achieving page load times consistently under 1.5 seconds.",
      "Ensured high responsiveness and fast load times for 300–400 daily users by implementing performance best practices across the application.",
      "Regularly participated in performance audits and optimization sprints to maintain high standards of UX and reliability.",
    ],
  },
  {
    title: "Computer Science",
    company_name: "Parul University",
    icon: null,
    date: "2016 - 2020",
    details: [
      "Built a strong foundation in Computer Science, focusing on core concepts such as JavaScript, Java, Data Structures & Algorithms (DSA), Operating Systems, and Database Management Systems (DBMS), gaining both theoretical knowledge and practical skills.",
      "Developed a React-based website as part of a college hackathon project, applying real-world frontend development practices.",
      "Secured 3rd place at the Gujarat Hackathon, demonstrating strong problem-solving and technical execution under competitive conditions.",
    ],
  },
];


export { experiences };


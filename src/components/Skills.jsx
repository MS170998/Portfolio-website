import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const SkillCard = ({ index, name, icon, description }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("show");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className="flex flex-col items-center bg-tertiary rounded-xl p-3 w-[calc(50%-8px)] sm:w-[calc(33.333%-12px)] md:w-[calc(25%-12px)] lg:w-[calc(16.666%-12px)] h-[250px] hover:shadow-[0_0_20px_rgba(0,200,255,0.4)] hover:-translate-y-2 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.15)",
        backdropFilter: "blur(10px)",
        background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      
      {/* Glow effect */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at center, rgba(0,200,255,0.1) 0%, transparent 70%)",
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      <div 
        className="w-full h-[110px] relative flex items-center justify-center z-10"
      >
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 relative"
          animate={{ 
            rotateY: isHovered ? 360 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ 
            rotateY: {
              duration: 1.5,
              ease: "easeInOut"
            },
            scale: {
              duration: 0.3,
              ease: "easeOut"
            }
          }}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
            transformOrigin: "center center",
          }}
        >
          <motion.img 
            src={icon} 
            alt={name} 
            className="w-full h-full object-contain"
            onLoad={() => setIsLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isLoaded ? 1 : 0,
            }}
            style={{
              filter: `drop-shadow(0 5px 8px rgba(0,0,0,0.25))`,
            }}
            transition={{ 
              opacity: { duration: 0.5 },
            }}
          />
        </motion.div>
      </div>

      <h3 className="text-white font-bold text-[16px] text-center mt-2 z-10">
        {name}
      </h3>
      
      <p className="mt-1 text-secondary text-[12px] text-center max-w-[140px] leading-tight z-10">
        {description}
      </p>
    </motion.div>
  );
};

const Skills = () => {
  const skills = [
    {
      name: "HTML",
      icon: "https://cdn-icons-png.flaticon.com/512/1216/1216733.png",
      description: "Semantic markup for web content",
    },
    {
      name: "CSS",
      icon: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
      description: "Styling and layout for websites",
    },
    {
      name: "JavaScript",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
      description: "Dynamic programming for interactivity",
    },
    {
      name: "TypeScript",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
      description: "Strongly typed JavaScript for scale",
    },
    {
      name: "React JS",
      icon: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
      description: "UI library for modern interfaces",
    },
    {
      name: "Redux",
      icon: "https://img.icons8.com/?size=100&id=b6vIINYN0kfW&format=png&color=000000",
      description: "State management for React apps",
    },
    {
      name: "Tailwind CSS",
      icon: "https://img.icons8.com/?size=100&id=CIAZz2CYc6Kc&format=png&color=000000",
      description: "Utility-first CSS framework",
    },
    {
      name: "MySQL",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968313.png",
      description: "Relational database system",
    },
    {
      name: "MongoDB",
      icon: "https://img.icons8.com/?size=100&id=74402&format=png&color=000000",
      description: "NoSQL document database",
    },
    {
      name: "Node JS",
      icon: "https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000",
      description: "JavaScript runtime environment",
    },
    {
      name: "Docker",
      icon: "https://img.icons8.com/?size=100&id=LdUzF8b5sz2R&format=png&color=000000",
      description: "Container platform for apps",
    },
    {
      name: "Kubernetes",
      icon: "https://img.icons8.com/?size=100&id=cvzmaEA4kC0o&format=png&color=000000",
      description: "Container orchestration system",
    },
    {
      name: "AWS",
      icon: "https://img.icons8.com/?size=100&id=33039&format=png&color=000000",
      description: "Cloud computing platform",
    },
  ];

  return (
    <div className="text-center md:text-left px-4 md:px-8 lg:px-12 relative">
      {/* Background pattern for the entire section */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      
      <motion.div variants={textVariant()} className="relative z-10">
        <h2 className={`${styles.sectionText}`}>Skills</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[16px] max-w-3xl leading-[28px] relative z-10"
      >
        Here are the technologies I've worked with. 
      </motion.p>

      <motion.div 
        className="mt-14 flex flex-wrap gap-4 justify-center relative z-10"
        variants={fadeIn("", "", 0.1, 1)}
      >
        {skills.map((skill, index) => (
          <SkillCard key={`skill-${index}`} index={index} {...skill} />
        ))}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Skills, "skills"); 
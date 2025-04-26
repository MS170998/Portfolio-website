import { motion } from "framer-motion";
import React, { useState } from "react";

import { experiences } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

// Optimized experience component with performance improvements
const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background blur elements - reduced size and blur for better performance */}
      <div className="absolute inset-0 -z-10 will-change-transform">
        <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-blue-500/10 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-cyan-500/10 rounded-full filter blur-2xl"></div>
      </div>
      
      {/* Section title */}
      <motion.div className="mb-16 relative" variants={textVariant()}>
        <h2 className={`${styles.sectionText} text-center`}>
          Experience
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        </h2>
      </motion.div>
      
      {/* Tab navigation */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="flex justify-center">
          <div className="inline-flex bg-tertiary/50 backdrop-blur-sm p-1 rounded-full border border-slate-700/50">
            {experiences.map((exp, index) => (
              <button
                key={`tab-${index}`}
                className={`px-5 py-2 rounded-full transition-colors duration-300 ${
                  activeTab === index 
                    ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20 text-cyan-300 font-medium" 
                    : "text-white/70 hover:text-white"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {exp.title}
                {activeTab === index && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Experience cards - optimized rendering */}
      <div className="max-w-6xl mx-auto px-4">
        {experiences.map((experience, index) => (
          <div
            key={`experience-${index}`}
            className={`relative transition-opacity duration-300 ${activeTab === index ? 'opacity-100' : 'opacity-0 hidden'}`}
          >
            <div 
              className="bg-tertiary/70 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden"
              style={{
                boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.3)"
              }}
            >
              {/* Card edge highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              
              <div className="p-8 md:p-10">
                {/* Card header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-10">
                  <div className="flex items-center">
                    {experience.icon ? (
                      <div className="flex-shrink-0 mr-4 h-14 w-14 bg-white rounded-full p-2 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <img 
                          src={experience.icon} 
                          alt={experience.company_name}
                          className="h-9 w-9 object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 mr-4 h-14 w-14 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full flex items-center justify-center border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                        <span className="text-xl font-bold text-cyan-300">{experience.company_name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-3xl text-cyan-300 font-bold mb-2 flex items-center">
                        {experience.title}
                      </h3>
                      <p className="text-xl text-white/80">{experience.company_name}</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 px-4 py-2 bg-[#011627]/80 border border-slate-700/70 rounded-lg">
                    <p className="text-lg font-mono text-cyan-300">{experience.date}</p>
                  </div>
                </div>
                
                {/* Improved Detail grid with better styling - static rendering for performance */}
                <div className="grid grid-cols-1 gap-4">
                  {experience.details.map((detail, detailIndex) => (
                    <div key={`detail-${index}-${detailIndex}`}>
                      <div className="relative bg-[#011f38]/40 rounded-lg border border-slate-700/60 hover:border-cyan-500/30 group px-5 py-3.5 transition-colors duration-300">
                        {/* Left indicator bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/40 to-blue-600/10 rounded-l-lg"></div>
                        
                        {/* Content */}
                        <p 
                          className="text-white/90 text-[15px] leading-relaxed pl-2"
                          dangerouslySetInnerHTML={{ __html: detail.replace(
                            /(Nvidia|Hostinger|Amazon|Fortune 500 company|scalable backend services|NASA|Norfolk Southern Railway|computer science foundation|Association for Computing Machinery)/g, 
                            '<span class="text-cyan-300 font-medium">$1</span>'
                          ) }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Optimized Skills section */}
                <div className="mt-8 pt-5 border-t border-slate-700/30">
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {[
                      "React", 
                      "TypeScript", 
                      "Next.js", 
                      "TailwindCSS", 
                      index === 0 ? "UI/UX" : index === 1 ? "Node.js" : "JavaScript"
                    ].map((skill, skillIndex) => (
                      <div
                        key={`skill-${index}-${skillIndex}`}
                        className="px-3 py-1 rounded-full bg-blue-900/30 border border-cyan-500/20 text-cyan-300/90 text-sm"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative corner elements */}
            <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-md"></div>
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-cyan-500/30 rounded-br-md"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Experience, "experience"); 
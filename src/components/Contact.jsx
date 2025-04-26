import React from "react";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";

const SocialLink = ({ url, icon, title, color, description }) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-4 bg-tertiary backdrop-blur-sm p-4 rounded-lg hover:scale-105 transition-transform duration-300 group"
      style={{ border: `1px solid ${color}30` }}
    >
      <div 
        className="w-12 h-12 flex items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}20`, border: `1px solid ${color}50` }}
      >
        <div dangerouslySetInnerHTML={{ __html: icon }} className="w-6 h-6" />
      </div>
      <div className="flex flex-col">
        <span className="text-white font-medium text-lg group-hover:text-cyan-300 transition-colors duration-300">{title}</span>
        <span className="text-slate-300 text-sm">{description}</span>
      </div>
    </a>
  );
};

const Contact = () => {
  // Social media data with SVG icons
  const socialLinks = [
    {
      url: "https://linkedin.com/in/mayanksingh17",
      title: "LinkedIn",
      description: "Let's connect professionally",
      color: "#0077B5",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0077B5"><path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/></svg>`
    },
    {
      url: "https://github.com/MS170998",
      title: "GitHub",
      description: "Check out my code repositories",
      color: "#6e5494",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`
    },
    {
      url: "mailto:smayankanand3@gmail.com",
      title: "Email",
      description: "Email me for any Job Opportunities",
      color: "#D44638",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D44638"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>`
    },
    {
      url: "https://twitter.com/MS17092",
      title: "Twitter",
      description: "Follow me for updates",
      color: "#1DA1F2",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1DA1F2"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`
    }
  ];

  return (
    <div className="md:m-12 md:px-48 flex flex-col gap-10 overflow-hidden relative">
      {/* Background elements - simplified for performance */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-cyan-500/20 rounded-full filter blur-2xl"></div>
      </div>
      
      <div className='flex-[0.8] pb-20 mx-4 sm:mx-auto relative'>
        <h3 className={`${styles.sectionText} mb-10 relative`}>
          Get In Touch
          <div className="absolute bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {socialLinks.map((link, index) => (
            <div key={index}>
              <SocialLink {...link} />
            </div>
          ))}
        </div>

        <div className="text-center mt-16 bg-tertiary backdrop-blur-sm p-8 rounded-lg border border-slate-700/50 relative">
          <h4 className="text-xl font-medium text-white mb-4">I'm Open to Opportunities</h4>
          <p className="text-slate-300 max-w-lg mx-auto leading-relaxed">
            Whether you're looking for a developer, have a question, or just want to connect,
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          {/* Decorative elements */}
          <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-500/50"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-500/50"></div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
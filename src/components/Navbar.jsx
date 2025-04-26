import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { close, menu } from "../assets";
import { navLinks } from "../data";

const Navbar = () => {
  const [active, setActive] = useState("hero");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.querySelector('.wrapper')?.scrollTop || window.scrollY;
      setScrolled(scrollTop > 100);
    };

    const scrollableElement = document.querySelector('.wrapper') || window;
    scrollableElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollableElement.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSectionVisibility = () => {
      const scrollableElement = document.querySelector('.wrapper');
      if (!scrollableElement) return;
      
      // Create a more direct approach to determining visible section
      const determineActiveSection = () => {
        const scrollPosition = scrollableElement.scrollTop + (scrollableElement.clientHeight / 3);
        
        // Get all section elements and their positions
        const sections = navLinks.map(link => {
          const element = document.getElementById(link.id);
          if (!element) return null;
          
          const rect = element.getBoundingClientRect();
          const scrollTop = scrollableElement.scrollTop;
          const offsetTop = rect.top + scrollTop - scrollableElement.offsetTop;
          
          return {
            id: link.id,
            offsetTop,
            offsetBottom: offsetTop + rect.height
          };
        }).filter(Boolean);
        
        // Sort sections by position
        sections.sort((a, b) => a.offsetTop - b.offsetTop);
        
        // Handle top of page (hero section)
        if (scrollableElement.scrollTop < 100) {
          if (active !== "hero") setActive("hero");
          return;
        }
        
        // Handle bottom of page (last section)
        if (scrollableElement.scrollTop + scrollableElement.clientHeight >= 
            scrollableElement.scrollHeight - 100) {
          const lastSection = sections[sections.length - 1];
          if (active !== lastSection.id) setActive(lastSection.id);
          return;
        }
        
        // Find the current section
        for (const section of sections) {
          if (scrollPosition >= section.offsetTop && 
              scrollPosition < section.offsetBottom) {
            if (active !== section.id) setActive(section.id);
            return;
          }
        }
      };
      
      // Add scroll event handler directly for more responsive updates
      const handleScroll = () => {
        // Use requestAnimationFrame for smoother performance
        window.requestAnimationFrame(determineActiveSection);
      };
      
      scrollableElement.addEventListener('scroll', handleScroll, { passive: true });
      
      // Run once to set initial state
      determineActiveSection();
      
      return () => {
        scrollableElement.removeEventListener('scroll', handleScroll);
      };
    };
    
    // Setup with short delay to ensure DOM is ready
    const timer = setTimeout(handleSectionVisibility, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, [active]);

  return (
    <nav
      className="w-full flex items-center bg-gradient-to-b from-black sm:bg-none p-8 sm:px-16 sm:py-10 fixed z-40 pointer-events-none"
    >
      <div className='w-full flex justify-between items-start mx-auto'>
        <Link
          to='/'
          className='flex items-start'
          onClick={() => {
            setActive("hero");
            const scrollableElement = document.querySelector('.wrapper');
            if (scrollableElement) {
              scrollableElement.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            } else {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }
          }}
        >
          <p className='text-white text-[26px] lg:text-[36px] font-bold pointer-events-auto cursor-pointer flex'>
            MS
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-col gap-5'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`relative flex items-center ${
                active === nav.id ? "text-white" : "text-slate-500"
              } hover:text-white text-[18px] lg:text-[24px] font-bold pointer-events-auto cursor-pointer transition-colors duration-300`}
            >
              {active === nav.id && (
                <div className="fixed right-10 w-2 h-6 lg:h-8 bg-quaternary"></div>
              )}
              <a 
                href={`#${nav.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(nav.id);
                  const element = document.getElementById(nav.id);
                  if (element) {
                    const scrollableElement = document.querySelector('.wrapper');
                    if (scrollableElement) {
                      const offsetTop = element.offsetTop;
                      scrollableElement.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                      });
                    } else {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              >
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain pointer-events-auto cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-30 rounded-xl bg-black bg-opacity-80 backdrop-blur-md`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "text-cyan-400" : "text-secondary"
                  } transition-colors duration-300`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.id);
                    const element = document.getElementById(nav.id);
                    if (element) {
                      const scrollableElement = document.querySelector('.wrapper');
                      if (scrollableElement) {
                        const offsetTop = element.offsetTop;
                        scrollableElement.scrollTo({
                          top: offsetTop,
                          behavior: 'smooth'
                        });
                      } else {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

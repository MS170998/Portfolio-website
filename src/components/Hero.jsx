import { SpacemanCanvas } from ".";
import Position from "./Position";
import { useEffect, useRef, useState } from "react";

const Hero = ({ scrollContainer }) => {
  const parallaxRef = useRef(null);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const taglineRef = useRef(null);
  
  const taglines = [
    <>With over 4 years of frontend expertise, I transform complex challenges into elegant, high-performance solutions.</>,
    <>Architecting seamless user experiences with React and TypeScript, backed by 4+ years of production-grade innovation.</>,
    <>Specializing in responsive UI/UX design, delivering performance-optimized interfaces that drive real-world results over 4+ years.</>,
    <>Leveraging 4+ years of frontend mastery to build scalable, accessible applications that exceed user expectations.</>,
    <>Delivering pixel-perfect designs and clean, maintainable code, solving complex frontend challenges with 4+ years of hands-on experience.</>,
    <>From concept to deployment, turning visions into exceptional digital experiences with over 4 years of proven success.</>
  ];
  
  useEffect(() => {
    const taglineInterval = setInterval(() => {
      if (taglineRef.current) {
        // Start fade out
        setIsFading(true);
        
        // Change content after fade out
        setTimeout(() => {
          setTaglineIndex(prev => (prev + 1) % taglines.length);
          // Start fade in
          setIsFading(false);
        }, 800); // Match with CSS transition duration
      }
    }, 6000); // Change tagline every 6 seconds (faster rotation to show more options)
    
    return () => clearInterval(taglineInterval);
  }, [taglines.length]);
  
  const elementsRef = useRef({
    stars: null,
    planets: null,
    sun: null,
    mountain1: null,
    mountain2: null,
    crater: null,
    content: null
  });

  // Check if browser supports animation-timeline
  useEffect(() => {
    // Feature detection for animation-timeline support
    const supportsScrollTimeline = CSS.supports('animation-timeline: scroll()');
    
    if (!supportsScrollTimeline && parallaxRef.current && scrollContainer.current) {
      // Get all parallax elements
      elementsRef.current = {
        stars: parallaxRef.current.querySelector('.parallax__stars'),
        planets: parallaxRef.current.querySelector('.parallax__planets'),
        sun: parallaxRef.current.querySelector('.parallax__sun'),
        mountain1: parallaxRef.current.querySelector('.parallax__mountain1'),
        mountain2: parallaxRef.current.querySelector('.parallax__mountain2'),
        crater: parallaxRef.current.querySelector('.parallax__crater'),
        content: parallaxRef.current.querySelector('.parallax__content')
      };
      
      // Apply js-parallax class for CSS transitions
      Object.values(elementsRef.current).forEach(el => {
        if (el) el.classList.add('js-parallax');
      });
      
      // Throttled scroll handler for performance
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollTop = scrollContainer.current.scrollTop;
            const maxScroll = scrollContainer.current.scrollHeight - window.innerHeight;
            const scrollProgress = scrollTop / maxScroll;
            
            // Apply transforms based on scroll position
            if (elementsRef.current.stars) {
              elementsRef.current.stars.style.transform = 
                `translateY(${scrollProgress * 320}vh) translateZ(0)`;
            }
            if (elementsRef.current.planets) {
              elementsRef.current.planets.style.transform = 
                `translateY(${scrollProgress * 290}vh) translateZ(0)`;
            }
            if (elementsRef.current.sun) {
              elementsRef.current.sun.style.transform = 
                `translateY(${scrollProgress * 270}vh) translateZ(0)`;
            }
            if (elementsRef.current.mountain1) {
              elementsRef.current.mountain1.style.transform = 
                `translateY(${scrollProgress * 250}vh) translateZ(0)`;
            }
            if (elementsRef.current.mountain2) {
              elementsRef.current.mountain2.style.transform = 
                `translateY(${scrollProgress * 140}vh) translateZ(0)`;
            }
            if (elementsRef.current.content) {
              elementsRef.current.content.style.transform = 
                `translateY(${scrollProgress * 210}vh) translateZ(0)`;
            }
            
            ticking = false;
          });
          ticking = true;
        }
      };
      
      // Add passive scroll listener for performance
      scrollContainer.current.addEventListener('scroll', handleScroll, { passive: true });
      
      // Initial positioning
      handleScroll();
      
      return () => {
        if (scrollContainer.current) {
          scrollContainer.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [scrollContainer]);

  return (
    <section className="parallax" ref={parallaxRef}>
      <div className='parallax__content absolute top-[5%] sm:top-[12%] lg:top-[18%] w-full mx-auto lg:pl-[38vh] lg:pr-[30vh] xl:pl-96 xl:pr-72 2xl:px-40 3xl:px-60 flex flex-col lg:flex-row items-start z-10'>
        <div className="flex-1 lg:mb-0">
          <h1 className='font-medium text-white text-[40px] xs:text-[50px] sm:text-[68px] md:text-[80px] lg:text-[100px] 2xl:text-[180px] leading-[110px] 2xl:leading-[160px] text-shadow-lg mb-0'>
            MAYANK SINGH
          </h1>
          <div className="ml-1 md:ml-2 2xl:ml-4 mt-0">
            <Position />
          </div>
        </div>
        <div className="flex-1 flex justify-start lg:justify-end mt-4 sm:mt-12 ml-8 xs:ml-[-4vh] sm:ml-[-14vh] md:ml-[-22vh] lg:mt-8 2xl:mt-2">
          <div 
            ref={taglineRef}
            className={`font-medium text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] 2xl:text-[36px] sm:leading-[28px] md:leading-[34px] lg:leading-[40px] 2xl:leading-[50px] streaky-glow max-w-sm 2xl:max-w-lg text-white text-left text-shadow-md tagline-transition ${isFading ? 'fadeout' : ''}`}
          >
            {taglines[taglineIndex]}
          </div>
        </div>
      </div>

      <img className="parallax__stars" src="./parallax/1Stars.svg" alt="" />
      <img className="parallax__planets" src="./parallax/2Planets.svg" alt="" />
      <img className="parallax__mountain1" src="./parallax/3Mountain.svg" alt="" />
      <img className="parallax__mountain2" src="./parallax/4Mountain.svg" alt="" />
      <img className="parallax__crater" src="./parallax/5Crater.svg" alt="" />
      {/* Sun removed to improve tagline visibility */}

      <SpacemanCanvas scrollContainer={scrollContainer} />
    </section>
  );
};

export default Hero;

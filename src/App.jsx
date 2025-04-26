import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components";

// Lazy load components for better performance
const Hero = lazy(() => import('./components/Hero'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Contact = lazy(() => import('./components/Contact'));

// Loading placeholder
const LoadingPlaceholder = () => (
  <div className="w-full h-screen flex items-center justify-center bg-primary">
    <div className="canvas-loader"></div>
  </div>
);

const App = () => {
  const wrapperRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    
    let scrollTimeout;
    let lastScrollTop = 0;
    let scrollDirection = '';
    
    // Optimize scroll handling with debounce and direction detection
    const handleScroll = () => {
      const scrollTop = wrapper.scrollTop;
      
      // Detect scroll direction
      if (scrollTop > lastScrollTop) {
        if (scrollDirection !== 'down') {
          scrollDirection = 'down';
          wrapper.classList.remove('scrolling-up');
          wrapper.classList.add('scrolling-down');
        }
      } else if (scrollTop < lastScrollTop) {
        if (scrollDirection !== 'up') {
          scrollDirection = 'up';
          wrapper.classList.remove('scrolling-down');
          wrapper.classList.add('scrolling-up');
        }
      }
      
      lastScrollTop = scrollTop;
      
      // Mark as scrolling for performance optimizations
      if (!isScrolling) {
        setIsScrolling(true);
        wrapper.classList.add('is-scrolling');
      }
      
      // Reset scrolling state after scrolling stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        wrapper.classList.remove('is-scrolling', 'scrolling-up', 'scrolling-down');
      }, 150);
    };
    
    // Add passive listener for better performance
    wrapper.addEventListener('scroll', handleScroll, { passive: true });
    
    // Optimize images after load
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.complete) {
          img.onload = () => {
            img.style.opacity = '1';
          };
        } else {
          img.style.opacity = '1';
        }
      });
    };
    
    // Run optimization after page load
    window.addEventListener('load', optimizeImages);
    
    return () => {
      wrapper.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', optimizeImages);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolling]);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <Navbar />
        <div className='wrapper' ref={wrapperRef}>
          <Suspense fallback={<LoadingPlaceholder />}>
          <div id="hero" className='z-10'>
            <Hero scrollContainer={wrapperRef} />
          </div>
          <div id="skills" className='relative z-30 bg-primary mt-[-2px]'>
            <Skills />
          </div>
          <div id="experience" className='relative z-30 bg-primary'>
            <Experience />
          </div>
          <div id="contact" className='relative z-30 bg-primary'>
            <Contact />
          </div>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

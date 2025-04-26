import React, { useEffect, useState } from 'react';

const Position = () => {
  const [typed, setTyped] = useState("");
  const fullText = "Software Engineer";
  
  useEffect(() => {
    // Function to simulate typing
    const typeText = () => {
      let index = 0;
      let currentText = "";
      const typingInterval = setInterval(() => {
        if (index < fullText.length) {
          currentText += fullText.charAt(index);
          setTyped(currentText);
          index++;
        } else {
          clearInterval(typingInterval);
          // Add blinking cursor at the end
          setTimeout(() => {
            const blinkInterval = setInterval(() => {
              setTyped(prev => prev.endsWith("_") ? fullText : fullText + "_");
            }, 500);
            
            // Clean up blink interval
            return () => clearInterval(blinkInterval);
          }, 500);
        }
      }, 100);
      
      // Clean up typing interval
      return () => clearInterval(typingInterval);
    };
    
    // Start typing after a short delay
    const startTimeout = setTimeout(typeText, 800);
    
    // Clean up timeout
    return () => clearTimeout(startTimeout);
  }, []);
  
  return (
    <div className="relative cursor-default font-medium text-white text-[16px] xs:text-[20px] sm:text-[30px] md:text-[36px] 2xl:text-[66px] leading-[32px] 2xl:leading-[40px] w-full flex items-center text-shadow-md">
      <div className="relative">
        <span className="inline-block text-shadow-glow">
          {typed}
        </span>
      </div>
    </div>
  );
};

export default Position;
